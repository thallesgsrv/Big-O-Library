// Breadcrumb rolável: mantém o fim do caminho visível e mostra as sombras de overflow
// (atributos data-more-l / data-more-r) quando há conteúdo escondido de cada lado.
document.querySelectorAll('.bo-crumbs').forEach(function (nav) {
  const list = nav.querySelector('.bo-crumbs-list');
  if (!list) return;

  function update() {
    const overflow = list.scrollWidth > list.clientWidth + 1;
    nav.toggleAttribute('data-more-l', overflow && list.scrollLeft > 1);
    nav.toggleAttribute('data-more-r', overflow && list.scrollLeft + list.clientWidth < list.scrollWidth - 1);
  }
  function scrollToEnd() {
    list.scrollLeft = list.scrollWidth;
    update();
  }

  scrollToEnd();
  list.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  addEventListener('load', scrollToEnd);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scrollToEnd);
});
