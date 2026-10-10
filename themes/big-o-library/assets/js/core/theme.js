// Seletor de tema (Claro / Escuro / Sistema).
// Autocontido: não depende de funções de outros arquivos e posiciona o menu
// pelo retângulo do botão (position: fixed), sem cálculos com window.innerHeight,
// que erram em celulares quando a barra de endereço aparece/some.
(function () {
  var DEFAULT = '{{ site.Params.theme.default | default `system` }}';
  var THEMES = ["light", "dark"];
  var HIDDEN = "hx:hidden";

  function readStored() {
    try { return localStorage.getItem("color-theme") || DEFAULT; } catch (e) { return DEFAULT; }
  }
  function writeStored(value) {
    try { localStorage.setItem("color-theme", value); } catch (e) { /* armazenamento bloqueado: o tema vale só nesta visita */ }
  }
  function applyClass(theme) {
    if (typeof window.setTheme === "function") {
      window.setTheme(theme);
      return;
    }
    // Plano B caso o script do <head> não tenha rodado.
    var root = document.documentElement;
    var resolved = THEMES.indexOf(theme) !== -1
      ? theme
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  }

  var toggles = Array.prototype.slice.call(document.querySelectorAll(".hextra-theme-toggle"));
  if (!toggles.length) return;

  function menuOf(toggle) { return toggle.nextElementSibling; }
  function optionsOf(menu) { return Array.prototype.slice.call(menu.querySelectorAll("button[role=menuitemradio]")); }

  function reflect(theme) {
    theme = THEMES.indexOf(theme) !== -1 ? theme : "system";
    toggles.forEach(function (toggle) {
      var wrapper = toggle.parentElement;
      var menu = menuOf(toggle);
      wrapper.dataset.theme = theme;
      if (menu) menu.dataset.theme = theme;
      if (menu) {
        optionsOf(menu).forEach(function (option) {
          option.setAttribute("aria-checked", option.dataset.item === theme ? "true" : "false");
        });
      }
    });
    return theme;
  }

  function choose(theme) {
    theme = THEMES.indexOf(theme) !== -1 ? theme : "system";
    applyClass(theme);
    reflect(theme);
    writeStored(theme);
  }

  function place(toggle) {
    var menu = menuOf(toggle);
    var rect = toggle.getBoundingClientRect();
    var rtl = document.documentElement.dir === "rtl";
    menu.style.position = "fixed";
    menu.style.margin = "0";
    menu.style.minWidth = Math.max(rect.width, 120) + "px";
    var width = menu.offsetWidth;
    var left = rtl ? rect.left : rect.right - width;
    left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
    menu.style.top = Math.round(rect.bottom + 6) + "px";
    menu.style.left = Math.round(left) + "px";
    menu.style.right = "auto";
    menu.style.bottom = "auto";
    menu.style.transform = "none";
  }

  function close(toggle, returnFocus) {
    var menu = menuOf(toggle);
    toggle.dataset.state = "closed";
    toggle.setAttribute("aria-expanded", "false");
    if (menu) menu.classList.add(HIDDEN);
    if (returnFocus) toggle.focus();
  }

  function open(toggle, focusFirst) {
    toggles.forEach(function (other) { if (other !== toggle) close(other, false); });
    var menu = menuOf(toggle);
    menu.classList.remove(HIDDEN);
    toggle.dataset.state = "open";
    toggle.setAttribute("aria-expanded", "true");
    place(toggle);
    if (focusFirst) {
      var items = optionsOf(menu);
      var checked = items.filter(function (i) { return i.getAttribute("aria-checked") === "true"; })[0];
      (checked || items[0]).focus();
    }
  }

  // Estado inicial
  reflect(readStored());

  toggles.forEach(function (toggle) {
    var menu = menuOf(toggle);

    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (toggle.dataset.state === "open") close(toggle, false);
      else open(toggle, e.detail === 0); // foco no menu só quando aberto pelo teclado
    });

    toggle.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); open(toggle, true); }
    });

    if (!menu) return;

    optionsOf(menu).forEach(function (option) {
      option.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        choose(option.dataset.item);
        close(toggle, true);
      });
    });

    menu.addEventListener("keydown", function (e) {
      var items = optionsOf(menu);
      var i = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
      else if (e.key === "Home") { e.preventDefault(); items[0].focus(); }
      else if (e.key === "End") { e.preventDefault(); items[items.length - 1].focus(); }
      else if (e.key === "Escape") { e.preventDefault(); close(toggle, true); }
      else if (e.key === "Tab") { close(toggle, false); }
    });
  });

  // Fecha ao clicar/tocar fora
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".hextra-theme-toggle, .hextra-theme-toggle-options")) return;
    toggles.forEach(function (t) { close(t, false); });
  });

  // Reposiciona (ou fecha) ao redimensionar/rolar a tela
  window.addEventListener("resize", function () {
    toggles.forEach(function (t) { if (t.dataset.state === "open") place(t); });
  });
  window.addEventListener("orientationchange", function () {
    toggles.forEach(function (t) { close(t, false); });
  });

  // Mudança do tema do sistema: só reage se o usuário escolheu "Sistema"
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onSystemChange = function () { if (readStored() === "system") applyClass("system"); };
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  // Sincroniza entre abas abertas
  window.addEventListener("storage", function (e) {
    if (e.key === "color-theme") {
      var value = e.newValue || DEFAULT;
      applyClass(value);
      reflect(value);
    }
  });
})();
