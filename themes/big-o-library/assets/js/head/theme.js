// Aplica o tema salvo ANTES da pintura da página (evita o "flash" claro/escuro).
// Este arquivo NÃO pode ir para core/theme.js: lá o script roda tarde demais.
// localStorage pode lançar erro (modo anônimo, cookies bloqueados, navegadores
// embutidos de apps); por isso todo acesso passa por try/catch.
(function () {
  var DEFAULT = '{{ site.Params.theme.default | default `system` }}';

  function readTheme() {
    try {
      return localStorage.getItem("color-theme") || DEFAULT;
    } catch (e) {
      return DEFAULT;
    }
  }

  window.setTheme = function (theme) {
    var root = document.documentElement;
    if (theme !== "light" && theme !== "dark") {
      theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  };

  window.setTheme(readTheme());
})();
