// Breadcrumb em uma linha só: rola até o final (página atual) e mostra um
// esmaecido nas bordas quando ainda há caminho para arrastar.
document.querySelectorAll('.bo-crumbs-list').forEach(function (lista) {
  function atualiza() {
    var max = lista.scrollWidth - lista.clientWidth;
    lista.classList.toggle('has-l', lista.scrollLeft > 2);
    lista.classList.toggle('has-r', lista.scrollLeft < max - 2);
  }
  function vaiParaFim() {
    lista.scrollLeft = lista.scrollWidth;
    atualiza();
  }
  vaiParaFim();
  lista.addEventListener('scroll', atualiza, { passive: true });
  window.addEventListener('resize', atualiza);
  window.addEventListener('load', vaiParaFim);
});
