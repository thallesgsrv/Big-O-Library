/* Quiz interativo: motor de {{< quiz >}} / {{< questao >}}. Guia: .github/GUIA-QUIZ.md
   O HTML das questões já vem pronto do Hugo (com fórmulas); aqui só mostramos, escondemos e corrigimos. */
(function () {
  "use strict";
  var LET = "ABCDEFGHIJ";
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var $ = function (r, s) { return r.querySelector(s); };
  var $$ = function (r, s) { return [].slice.call(r.querySelectorAll(s)); };
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };

  function init(root) {
    var qs = $$(root, ".bo-qz-q");
    var body = $(root, ".bo-qz-body");
    if (!qs.length || !body) return;
    var lista = root.getAttribute("data-modo") === "lista";
    var emb = root.getAttribute("data-emb") === "1";
    var titulo = root.getAttribute("data-titulo") || "quiz";
    var conselho = root.getAttribute("data-conselho") || "";
    var sages = []; try { sages = JSON.parse(root.getAttribute("data-sages") || "[]"); } catch (e) { sages = []; }
    var N = qs.length, cur = 0, acertos = 0, res = [];

    /* moldura: linha de comando, placar e barra de progresso */
    var top = document.createElement("div"); top.className = "bo-qz-top";
    top.innerHTML = '<span class="bo-qz-cmd" aria-hidden="true"></span><span class="bo-qz-score"></span>';
    var bar = document.createElement("div"); bar.className = "bo-qz-bar";
    bar.setAttribute("role", "progressbar"); bar.setAttribute("aria-label", "Progresso do quiz");
    bar.setAttribute("aria-valuemin", "0"); bar.setAttribute("aria-valuemax", String(N)); bar.innerHTML = "<i></i>";
    var panel = document.createElement("div"); panel.className = "bo-qz-result"; panel.hidden = true;
    root.insertBefore(top, body); root.insertBefore(bar, body); root.appendChild(panel);
    var solo = N === 1; /* questão avulsa: sem barra, placar nem tela de resultado */
    if (solo) lista = true;
    root.classList.add("is-on", lista ? "is-lista" : "is-single");
    if (solo) root.classList.add("is-solo");
    var cmd = $(top, ".bo-qz-cmd"), score = $(top, ".bo-qz-score"), barI = $(bar, "i");

    qs.forEach(function (q, i) { $(q, ".bo-qz-n").textContent = "questão " + (i + 1) + " de " + N; });

    function letters(q) { $$(q, ".bo-qz-opt").forEach(function (b, i) { $(b, "kbd").textContent = LET[i]; }); }

    function paint(done) {
      var shown = lista ? done : cur;
      cmd.textContent = "$ ./quiz " + titulo + (solo ? "" : lista ? " --questoes " + N : " --questao " + Math.min(cur + 1, N) + "/" + N);
      score.textContent = "acertos: " + acertos + (lista ? "/" + N : "");
      barI.style.width = (shown / N * 100) + "%";
      bar.setAttribute("aria-valuenow", String(shown));
    }
    function answered() { return res.filter(function (r) { return r !== null && r !== undefined; }).length; }

    function reset(focus) {
      cur = 0; acertos = 0; res = qs.map(function () { return null; });
      qs.forEach(function (q, i) {
        var opts = $(q, ".bo-qz-opts");
        var bs = $$(q, ".bo-qz-opt");
        if (emb && !q.hasAttribute("data-fixa")) shuffle(bs).forEach(function (b) { opts.appendChild(b); });
        $$(q, ".bo-qz-opt").forEach(function (b) {
          b.disabled = false; b.classList.remove("is-ok", "is-bad", "is-sel", "is-miss");
          if (q.getAttribute("data-multi") === "1") b.setAttribute("aria-pressed", "false");
        });
        letters(q);
        var chk = $(q, ".bo-qz-check"); if (chk) chk.disabled = true;
        var fb = $(q, ".bo-qz-fb"); fb.hidden = true; fb.className = "bo-qz-fb";
        $$(fb, ".bo-qz-next").forEach(function (n) { n.remove(); });
        q.hidden = !lista && i !== 0;
        q.removeAttribute("data-done");
      });
      panel.hidden = true; panel.innerHTML = ""; body.hidden = false;
      paint(0);
      if (focus) { var st = $(qs[0], ".bo-qz-stem"); if (lista) root.scrollIntoView({ block: "start" }); st.focus({ preventScroll: lista }); }
    }

    function correct(q) { return $$(q, ".bo-qz-opt").filter(function (b) { return b.getAttribute("data-ok") === "1"; }); }
    function names(bs) { return bs.map(function (b) { return $(b, "kbd").textContent; }).join(", "); }

    function conclude(q, i, ok) {
      q.setAttribute("data-done", "1");
      res[i] = ok; if (ok) acertos++;
      var fb = $(q, ".bo-qz-fb"), cs = correct(q);
      fb.className = "bo-qz-fb " + (ok ? "is-ok" : "is-bad"); fb.hidden = false;
      $(fb, ".bo-qz-verd").textContent = ok ? "// certo" : "// errou: " + (cs.length > 1 ? "as certas eram " : "a certa era ") + names(cs);
      paint(answered());
      if (solo) {
        var rb = document.createElement("button");
        rb.type = "button"; rb.className = "bo-b2 bo-qz-next"; rb.textContent = "tentar de novo ↻";
        rb.addEventListener("click", function () { reset(false); $(qs[0], ".bo-qz-opt").focus({ preventScroll: true }); });
        fb.appendChild(rb);
        fb.setAttribute("tabindex", "-1"); fb.focus({ preventScroll: true });
      } else if (lista) {
        fb.setAttribute("tabindex", "-1"); fb.focus({ preventScroll: true });
        if (answered() === N) finish();
      } else {
        var last = i === N - 1;
        var nb = document.createElement("button");
        nb.type = "button"; nb.className = "bo-b1 bo-qz-next"; nb.textContent = (last ? "ver resultado" : "próxima") + " →";
        nb.addEventListener("click", function () { if (last) finish(); else go(i + 1); });
        fb.appendChild(nb); nb.focus();
      }
    }

    function go(i) {
      cur = i;
      qs.forEach(function (q, k) { q.hidden = k !== i; });
      paint(0);
      $(qs[i], ".bo-qz-stem").focus();
    }

    function pickSingle(q, i, b) {
      if (q.hasAttribute("data-done")) return;
      var ok = b.getAttribute("data-ok") === "1";
      $$(q, ".bo-qz-opt").forEach(function (o) {
        o.disabled = true;
        if (o.getAttribute("data-ok") === "1") o.classList.add("is-ok");
        else if (o === b) o.classList.add("is-bad");
      });
      conclude(q, i, ok);
    }

    function toggle(q, b) {
      if (q.hasAttribute("data-done")) return;
      var on = !b.classList.contains("is-sel");
      b.classList.toggle("is-sel", on); b.setAttribute("aria-pressed", on ? "true" : "false");
      $(q, ".bo-qz-check").disabled = !$$(q, ".bo-qz-opt.is-sel").length;
    }

    function check(q, i) {
      if (q.hasAttribute("data-done")) return;
      var ok = true;
      $$(q, ".bo-qz-opt").forEach(function (o) {
        var want = o.getAttribute("data-ok") === "1", sel = o.classList.contains("is-sel");
        if (want !== sel) ok = false;
        o.disabled = true; o.classList.remove("is-sel");
        if (want && sel) o.classList.add("is-ok");
        else if (want) o.classList.add("is-miss");
        else if (sel) o.classList.add("is-bad");
      });
      $(q, ".bo-qz-check").disabled = true;
      conclude(q, i, ok);
    }

    function finish() {
      var pct = acertos / N;
      var c = pct === 1 ? 1 : pct >= 0.7 ? 3 : pct >= 0.4 ? 5 : 8;
      var h = pct === 1 ? "Gabaritou." : pct >= 0.7 ? "Muito bem." : pct >= 0.4 ? "Quase lá." : "Vale reler a seção.";
      var t = pct === 1 ? "Todas certas. Tente de novo mais tarde para conferir que não foi sorte."
        : pct >= 0.7 ? "Poucos erros. Releia as explicações das que errou e tente de novo."
        : pct >= 0.4 ? "Você está no caminho. Releia a seção e confira as explicações das que errou."
        : "Sem problema: volte à teoria, leia com calma e tente de novo. Errar aqui é parte do treino.";
      var pips = '<li style="--c:var(--p1)"><span class="bo-rs-k">questões</span><span class="bo-rs-p" aria-label="' + acertos + ' de ' + N + '">' +
        res.map(function (o) { return o ? "●" : "○"; }).join("") + "</span></li>";
      var s = sages.length ? sages[Math.floor(Math.random() * sages.length)] : null;
      var card = "";
      if (s) {
        card = '<p class="bo-small bo-rs-note">Uma frase do Conselho dos Sábios para a próxima tentativa:</p>' +
          '<a class="bo-rs-sage" style="--c:var(--p' + s.n + ')" href="' + esc(conselho) + '#sabio-' + esc(s.slug) + '">' +
          '<span class="bo-av" aria-hidden="true"><span>' + esc(s.ini) + "</span>" + (s.img ? '<img src="' + esc(s.img) + '" alt="" width="240" height="240" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.remove()">' : "") + "</span>" +
          '<span class="bo-rs-who"><span class="bo-rs-q">“' + esc(s.frase) + '”</span><span class="bo-rs-name">' + esc(s.nome) + "</span>" + (s.titulo ? '<span class="bo-rs-title">' + esc(s.titulo) + "</span>" : "") +
          '</span><span class="bo-rs-go" aria-hidden="true">ver card →</span></a>';
      }
      cmd.textContent = "$ ./quiz " + titulo + " --resultado";
      score.textContent = acertos + "/" + N;
      barI.style.width = "100%"; bar.setAttribute("aria-valuenow", String(N));
      panel.innerHTML = '<div class="bo-rs" style="--c:var(--p' + c + ')"><p class="bo-rs-o" aria-hidden="true">' + acertos + "/" + N + "</p>" +
        '<h3 class="bo-rs-h">' + h + '</h3><p class="bo-rs-t">' + t + "</p>" + card +
        '<ul class="bo-rs-pips" aria-label="Resultado por questão">' + pips + "</ul>" +
        '<div class="bo-btns"><button type="button" class="bo-b1 bo-qz-again">tentar de novo ↻</button></div></div>';
      panel.hidden = false;
      if (!lista) body.hidden = true;
      $(panel, ".bo-qz-again").addEventListener("click", function () { reset(true); });
      if (!lista) $(panel, ".bo-qz-again").focus();
    }

    /* cliques e teclado (letras A–J ou números 1–9, só com o foco dentro do quiz) */
    qs.forEach(function (q, i) {
      var multi = q.getAttribute("data-multi") === "1";
      $$(q, ".bo-qz-opt").forEach(function (b) {
        b.addEventListener("click", function () { if (multi) toggle(q, b); else pickSingle(q, i, b); });
      });
      var chk = $(q, ".bo-qz-check"); if (chk) chk.addEventListener("click", function () { check(q, i); });
    });
    root.addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
      var k = e.key.toUpperCase(), n = /^[1-9]$/.test(k) ? +k - 1 : LET.indexOf(k);
      if (n < 0) return;
      var q = e.target.closest ? e.target.closest(".bo-qz-q") : null;
      if (!q) return;
      var b = $$(q, ".bo-qz-opt")[n];
      if (b && !b.disabled) { e.preventDefault(); b.click(); }
    });

    reset(false);
  }

  var start = function () { $$(document, ".bo-qz").forEach(init); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
