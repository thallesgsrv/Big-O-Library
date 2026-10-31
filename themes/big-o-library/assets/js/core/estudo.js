var KEY = 'bo:estudado', LAST = 'bo:ultimo';
function ler(k, padrao) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : padrao; } catch (e) { return padrao; } }
function gravar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
var feito = ler(KEY, {});

function marcarCards() {
  document.querySelectorAll('a.bo-card[href]').forEach(function (a) {
    var on = !!feito[a.getAttribute('href')], m = a.querySelector('.bo-done');
    if (on && !m) {
      m = document.createElement('span');
      m.className = 'bo-done';
      m.innerHTML = '✓<span class="bo-sr"> (já estudado)</span>';
      a.appendChild(m);
    } else if (!on && m) { m.remove(); }
  });
}

var area = document.querySelector('[data-bo-study]');
var btn = area && area.querySelector('.bo-study-btn');
if (btn) {
  var path = btn.getAttribute('data-path');
  var desenhar = function () {
    var on = !!feito[path];
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.classList.toggle('is-on', on);
    btn.querySelector('.bo-study-t').textContent = on ? 'Estudado' : 'Marcar como estudado';
  };
  desenhar();
  area.hidden = false;
  btn.addEventListener('click', function () {
    if (feito[path]) delete feito[path]; else feito[path] = Date.now();
    gravar(KEY, feito);
    desenhar();
  });
  gravar(LAST, { p: path, t: btn.getAttribute('data-title'), at: Date.now() });
}
marcarCards();

var caixa = document.querySelector('[data-bo-continue]');
if (caixa) {
  var u = ler(LAST, null);
  if (u && u.p && u.t) {
    caixa.setAttribute('href', u.p);
    caixa.querySelector('.bo-cont-t').textContent = u.t;
    caixa.hidden = false;
  }
}
