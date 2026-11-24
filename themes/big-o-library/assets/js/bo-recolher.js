(function () {
  var CTA = /^contribui/;
  var roots = document.querySelectorAll('[data-bo-fold]');
  if (!roots.length) return;
  var all = [];

  roots.forEach(function (root) {
    /* O Hugo já entrega o HTML dobrado (layouts/_partials/bo-fold.html): só adotamos as seções.
       O código abaixo é o plano B, para HTML sem <details>. */
    var prontas = root.querySelectorAll(':scope > details.bo-sec');
    if (prontas.length) {
      Array.prototype.forEach.call(prontas, function (d) { all.push(d); });
      return;
    }
    var body = null;
    Array.prototype.slice.call(root.children).forEach(function (el) {
      if (el.tagName === 'H2') {
        var d = document.createElement('details');
        d.className = 'bo-sec' + (CTA.test(el.id) ? ' bo-sec-cta' : '');
        if (all.length === 0) d.open = true;

        var s = document.createElement('summary');
        var cmd = document.createElement('span');
        cmd.className = 'bo-cmd';
        cmd.setAttribute('aria-hidden', 'true');
        cmd.textContent = '$ cat ' + (el.id || el.textContent).trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '') + '.md';

        el.querySelectorAll('a.subheading-anchor').forEach(function (a) { a.remove(); });

        root.insertBefore(d, el);
        s.appendChild(cmd);
        s.appendChild(el);
        d.appendChild(s);
        body = document.createElement('div');
        body.className = 'bo-sec-body';
        d.appendChild(body);
        all.push(d);
      } else if (body) {
        body.appendChild(el);
      }
    });
  });
  if (!all.length) return;

  function reveal() {
    if (!location.hash) return;
    var t;
    try { t = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) { return; }
    var d = t && t.closest('details.bo-sec');
    if (d && !d.open) { d.open = true; t.scrollIntoView(); }
  }
  reveal();
  window.addEventListener('hashchange', reveal);

  var was = [];
  window.addEventListener('beforeprint', function () {
    was = all.map(function (d) { return d.open; });
    all.forEach(function (d) { d.open = true; });
  });
  window.addEventListener('afterprint', function () {
    all.forEach(function (d, i) { d.open = was[i]; });
  });

  /* Marca como rolável (tabindex + aria) só o que de fato transborda. Medir tudo ao abrir a seção
     forçava um layout gigante e travava o celular; agora cada item é medido uma vez, quando chega perto da tela. */
  function marcar(el) {
    if (el.scrollWidth <= el.clientWidth + 1) return;
    el.tabIndex = 0;
    if (el.tagName === 'TABLE') {
      el.setAttribute('aria-label', el.getAttribute('aria-label') || 'Tabela, role na horizontal para ver tudo');
    } else {
      el.setAttribute('role', 'group');
      el.setAttribute('aria-label', 'Equação, role na horizontal para ver tudo');
    }
  }
  var visto = typeof WeakSet === 'function' ? new WeakSet() : null;
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      marcar(e.target);
    });
  }, { rootMargin: '300px 0px' }) : null;
  function marcarRolagem(root) {
    var itens = root.querySelectorAll('table, .katex-display');
    for (var i = 0; i < itens.length; i++) {
      var el = itens[i];
      if (visto) { if (visto.has(el)) continue; visto.add(el); }
      if (io) io.observe(el); else marcar(el);
    }
  }
  all.forEach(function (d) {
    d.addEventListener('toggle', function () { if (d.open) marcarRolagem(d); });
  });
  var ocioso = window.requestIdleCallback || function (f) { return setTimeout(f, 200); };
  window.addEventListener('load', function () {
    ocioso(function () { all.forEach(function (d) { if (d.open) marcarRolagem(d); }); });
  });
})();
