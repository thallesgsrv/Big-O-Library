document.addEventListener("DOMContentLoaded", scrollToActiveItem);

function scrollToActiveItem() {
  const sidebarScrollbar = document.querySelector("aside.hextra-sidebar-container > .hextra-scrollbar");
  if (!sidebarScrollbar) return;

  const visibleActiveItem = Array.from(document.querySelectorAll(".hextra-sidebar-active-item"))
    .find(function (item) { return item.getBoundingClientRect().height > 0; });
  if (!visibleActiveItem) return;

  const yDistance = visibleActiveItem.getBoundingClientRect().top - sidebarScrollbar.getBoundingClientRect().top;
  sidebarScrollbar.scrollTo({ behavior: "instant", top: yDistance - visibleActiveItem.clientHeight });
}
