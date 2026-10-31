// Pequenos ajustes de acessibilidade que o Markdown não permite fazer no texto.
// 1) Listas de tarefas (- [ ] item): o Hugo gera <input type="checkbox" disabled> sem rótulo.
//    O texto do próprio item vira o nome acessível da caixa.
document.querySelectorAll('.content li > input[type="checkbox"]').forEach(function (cb) {
  if (cb.hasAttribute('aria-label') || cb.hasAttribute('aria-labelledby') || (cb.labels && cb.labels.length)) return;
  var li = cb.closest('li');
  var texto = li ? (li.textContent || '').replace(/\s+/g, ' ').trim() : '';
  if (texto) cb.setAttribute('aria-label', texto);
});
