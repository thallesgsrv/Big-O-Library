document.querySelectorAll('.content li > input[type="checkbox"]').forEach(function (cb) {
  if (cb.hasAttribute('aria-label') || cb.hasAttribute('aria-labelledby') || (cb.labels && cb.labels.length)) return;
  var li = cb.closest('li');
  var texto = li ? (li.textContent || '').replace(/\s+/g, ' ').trim() : '';
  if (texto) cb.setAttribute('aria-label', texto);
});
