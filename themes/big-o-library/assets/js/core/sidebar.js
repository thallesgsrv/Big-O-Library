document.addEventListener("DOMContentLoaded", function () {
  scrollToActiveItem();
  syncInertWithDrawer();
});

// O menu lateral fechado (mobile) só sai da tela por transform, então seus links continuariam
// na ordem de Tab e no leitor de tela. Enquanto estiver fechado, recebe `inert`.
// Se o mecanismo de abertura mudar, o clique no botão do menu ainda remove o `inert`.
function syncInertWithDrawer() {
  const drawer = document.querySelector(".hextra-sidebar-container");
  if (!drawer) return;

  function sync() {
    if (drawer.className.indexOf("translate3d(0,-100%,0)") > -1) drawer.setAttribute("inert", "");
    else drawer.removeAttribute("inert");
  }
  sync();
  new MutationObserver(sync).observe(drawer, { attributes: true, attributeFilter: ["class"] });

  const button = document.querySelector(".hextra-hamburger-menu");
  if (button) button.addEventListener("click", function () { drawer.removeAttribute("inert"); });
}

function scrollToActiveItem() {
  const sidebarScrollbar = document.querySelector("aside.hextra-sidebar-container > .hextra-scrollbar");
  const activeItems = document.querySelectorAll(".hextra-sidebar-active-item");
  const visibleActiveItem = Array.from(activeItems).find(function (activeItem) {
    return activeItem.getBoundingClientRect().height > 0;
  });

  if (!visibleActiveItem) {
    return;
  }

  const yOffset = visibleActiveItem.clientHeight;
  const yDistance = visibleActiveItem.getBoundingClientRect().top - sidebarScrollbar.getBoundingClientRect().top;
  sidebarScrollbar.scrollTo({
    behavior: "instant",
    top: yDistance - yOffset
  });
}
