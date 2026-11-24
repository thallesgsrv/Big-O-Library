// Copy button for code blocks

document.addEventListener('DOMContentLoaded', function () {
  const getCopyIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    `;
    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    return svg;
  }

  const getSuccessIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    `;
    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    return svg;
  }

  // Make scrollable code blocks focusable for keyboard users.
  // Medir todos os <pre> de uma vez (scrollWidth) força um layout síncrono da página inteira, e isso
  // se repetia a cada 'resize' — que no celular dispara sempre que a barra de endereço aparece ou
  // some durante a rolagem. Agora cada bloco é medido uma vez, quando chega perto da tela, e o
  // 'resize' só remede se a LARGURA mudou.
  const codeBlocks = document.querySelectorAll('.hextra-code-block pre, .highlight pre');
  const measureCodeBlock = (pre) => {
    if (pre.scrollWidth > pre.clientWidth) {
      pre.setAttribute('tabindex', '0');
    } else {
      pre.removeAttribute('tabindex');
    }
  };
  const codeIO = 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          codeIO.unobserve(entry.target);
          measureCodeBlock(entry.target);
        });
      }, { rootMargin: '300px 0px' })
    : null;
  codeBlocks.forEach(function (pre) { codeIO ? codeIO.observe(pre) : measureCodeBlock(pre); });

  let lastWidth = window.innerWidth;
  let resizeRaf;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return; // só a barra de endereço mexeu: nada a remedir
    lastWidth = window.innerWidth;
    if (resizeRaf) {
      cancelAnimationFrame(resizeRaf);
    }
    resizeRaf = requestAnimationFrame(function () {
      codeBlocks.forEach(function (pre) {
        if (codeIO) { codeIO.unobserve(pre); codeIO.observe(pre); } else { measureCodeBlock(pre); }
      });
    });
  });

  document.querySelectorAll('.hextra-code-copy-btn').forEach(function (button) {
    // Add copy and success icons
    button.querySelector('.hextra-copy-icon')?.appendChild(getCopyIcon());
    button.querySelector('.hextra-success-icon')?.appendChild(getSuccessIcon());

    // Add click event listener for copy button
    button.addEventListener('click', function (e) {
      e.preventDefault();
      // Get the code target
      const target = button.parentElement.previousElementSibling;
      let codeElement;
      if (target.tagName === 'CODE') {
        codeElement = target;
      } else {
        // Select the last code element in case line numbers are present
        const codeElements = target.querySelectorAll('code');
        codeElement = codeElements[codeElements.length - 1];
      }
      if (codeElement) {
        let code = codeElement.innerText;
        // Replace double newlines with single newlines in the innerText
        if ("lang" in codeElement.dataset) {
          code = code.replace(/\n\n/g, '\n');
        }
        navigator.clipboard.writeText(code).then(function () {
          button.classList.add('copied');
          var originalLabel = button.getAttribute('aria-label');
          var copiedLabel = button.dataset.copiedLabel || 'Copied!';
          button.setAttribute('aria-label', copiedLabel);
          setTimeout(function () {
            button.classList.remove('copied');
            button.setAttribute('aria-label', originalLabel);
          }, 1000);
        }).catch(function (err) {
          console.error('Failed to copy text: ', err);
        });
      } else {
        console.error('Target element not found');
      }
    });
  });
});
