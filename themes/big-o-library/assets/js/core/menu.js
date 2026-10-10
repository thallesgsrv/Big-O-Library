// Menu hambúrguer (navegação lateral no celular).
// Roda no "DOMContentLoaded" e é tolerante a páginas sem barra lateral.
document.addEventListener('DOMContentLoaded', function () {
  const menu = document.querySelector('.hextra-hamburger-menu');
  const sidebarContainer = document.querySelector('.hextra-sidebar-container');
  if (!menu || !sidebarContainer) return;

  const icon = menu.querySelector('svg');
  const mobileQuery = window.matchMedia('(max-width: 767px)');
  const CLOSED = 'hx:max-md:[transform:translate3d(0,-100%,0)]';
  const OPEN = 'hx:max-md:[transform:translate3d(0,0,0)]';

  // Fonte única da verdade: o atributo aria-expanded do botão.
  function isMenuOpen() {
    return menu.getAttribute('aria-expanded') === 'true';
  }

  // No celular, a barra lateral fechada fica fora da tela: esconde-a de leitores de tela.
  function syncAria() {
    if (mobileQuery.matches) {
      sidebarContainer.setAttribute('aria-hidden', isMenuOpen() ? 'false' : 'true');
    } else {
      sidebarContainer.removeAttribute('aria-hidden');
    }
  }

  function setOpen(open, options) {
    const focusOnOpen = !options || options.focusOnOpen !== false;
    if (open === isMenuOpen()) return;

    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (icon) icon.classList.toggle('open', open);

    sidebarContainer.classList.remove(open ? CLOSED : OPEN);
    sidebarContainer.classList.add(open ? OPEN : CLOSED);

    // Menu aberto: trava a rolagem do fundo (só no celular).
    document.body.classList.toggle('hx:overflow-hidden', open);
    document.body.classList.toggle('hx:md:overflow-auto', open);

    syncAria();

    if (open) {
      if (focusOnOpen) {
        const first = sidebarContainer.querySelector('a, button, input, [tabindex="0"]');
        if (first) first.focus();
      }
    } else {
      menu.focus();
    }
  }

  // Estado inicial consistente (fechado), mesmo que o HTML venha com a classe trocada.
  menu.setAttribute('aria-expanded', 'false');
  if (icon) icon.classList.remove('open');
  sidebarContainer.classList.remove(OPEN);
  sidebarContainer.classList.add(CLOSED);
  syncAria();

  menu.addEventListener('click', function (e) {
    e.preventDefault();
    // Toque/clique com ponteiro não deve mandar o foco para o campo de busca
    // (abriria o teclado do celular). Só move o foco quando acionado pelo teclado.
    setOpen(!isMenuOpen(), { focusOnOpen: e.detail === 0 });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    const dialog = document.getElementById('hextra-search-dialog');
    if (dialog && dialog.open) return;
    if (mobileQuery.matches && isMenuOpen()) setOpen(false);
  });

  // Ao ampliar a tela para o layout de desktop, fecha o menu e libera a rolagem.
  function onBreakpointChange() {
    if (!mobileQuery.matches && isMenuOpen()) {
      setOpen(false, { focusOnOpen: false });
    } else {
      syncAria();
    }
  }
  if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', onBreakpointChange);
  else if (mobileQuery.addListener) mobileQuery.addListener(onBreakpointChange);

  // Fecha o menu ao tocar em um link da barra lateral que aponta para âncora da mesma página.
  sidebarContainer.addEventListener('click', function (e) {
    const link = e.target.closest && e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href && href.charAt(0) === '#' && mobileQuery.matches && isMenuOpen()) {
      setOpen(false, { focusOnOpen: false });
    }
  });
});
