// Barra de progresso de leitura + botão "voltar ao topo" (só em páginas de conteúdo).
if (document.querySelector(".bo-doc")) {
  var bar = document.createElement("div");
  bar.className = "bo-prog"; bar.setAttribute("aria-hidden", "true");
  var top = document.createElement("button");
  top.type = "button"; top.className = "bo-top"; top.hidden = true;
  top.setAttribute("aria-label", "Voltar ao topo"); top.textContent = "↑";
  document.body.append(bar, top);
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches, tick = false;
  var update = function () {
    tick = false;
    var h = document.documentElement, max = h.scrollHeight - innerHeight, y = scrollY;
    bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    top.hidden = y < innerHeight * 1.2;
  };
  addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  top.addEventListener("click", function () { scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  update();
}
