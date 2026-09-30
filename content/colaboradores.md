---
title: Colaboradores
hideEdit: true
---

<div class="bo-colaboradores-page">
<div id="bo-contributors" class="bo-people" aria-live="polite" aria-busy="true">
  <span class="bo-small">Carregando colaboradores...</span>
</div>
<p class="bo-small">Lista gerada a partir dos <a href="https://github.com/thallesgsrv/Big-O-Library/graphs/contributors" target="_blank" rel="noopener">contribuidores do repositório</a>.</p>
</div>

<script>
(function () {
  var REPO = "thallesgsrv/Big-O-Library";
  var OWNER = "thallesgsrv";
  var CACHE_KEY = "bo-contributors-v1";
  var CACHE_MS = 10 * 60 * 1000;
  var container = document.getElementById("bo-contributors");

  function esc(v) {
    return String(v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render(list) {
    var people = list.filter(function (p) { return p.type !== "Bot"; });
    if (!people.length) { fail(); return; }
    container.innerHTML = people.map(function (p) {
      var role = p.login === OWNER ? "Criador e mantenedor" : "Contribuidor";
      var label = p.contributions === 1 ? "contribuição" : "contribuições";
      var sep = p.avatar_url.indexOf("?") > -1 ? "&" : "?";
      return '<a class="bo-person" href="' + esc(p.html_url) + '" target="_blank" rel="noopener">' +
        '<img src="' + esc(p.avatar_url + sep + "s=96") + '" alt="" width="48" height="48" loading="lazy">' +
        '<span class="bo-person-text"><strong>' + esc(p.login) + '</strong><span>' + role + '</span></span>' +
        '<span class="bo-person-count"><b>' + esc(p.contributions) + '</b><small>' + label + '</small></span>' +
        '</a>';
    }).join("");
    container.setAttribute("aria-busy", "false");
  }

  function fail() {
    container.innerHTML = '<span class="bo-small">Não foi possível carregar agora (a API do GitHub limita requisições). ' +
      'Veja a lista completa em <a href="https://github.com/' + REPO + '/graphs/contributors" target="_blank" rel="noopener">github.com/' + REPO + '</a>.</span>';
    container.setAttribute("aria-busy", "false");
  }

  // cache de sessão: evita estourar o limite da API anônima (60 req/h por IP)
  try {
    var c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
    if (c && Date.now() - c.t < CACHE_MS) { render(c.d); return; }
  } catch (e) {}

  fetch("https://api.github.com/repos/" + REPO + "/contributors?per_page=100")
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: data })); } catch (e) {}
      render(data);
    })
    .catch(fail);
})();
</script>
