/*
 * Graficador (/lab/graficador/): curvas y = f(x), polares e paramétricas, controles deslizantes,
 * soma de Riemann, área, volume e comprimento de arco. Usa o interpretador de expr.js (carregado antes).
 */
(function () {
  'use strict';

  const raiz = document.getElementById('bo-graf');
  if (!raiz) return;

  const NOMES = ['f', 'g', 'h', 'p', 'q', 's'];
  const TIPOS = { y: 'y = f(x)', polar: 'polar r(θ)', param: 'paramétrica' };
  const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EXEMPLOS = JSON.parse(document.getElementById('gf-exemplos').textContent);

  const $ = (seletor, ctx = raiz) => ctx.querySelector(seletor);
  const $$ = (seletor, ctx = raiz) => Array.from(ctx.querySelectorAll(seletor));
  const limitar = (v, a, b) => Math.min(b, Math.max(a, v));
  const num = texto => parseFloat(String(texto).replace(',', '.').replace('−', '-'));
  const visivel = nome => (nome === 'theta' ? 'θ' : nome);

  const cv = $('.gf-canvas');
  const g2 = cv.getContext('2d');
  const amb = { P: {}, F: {} };

  let linhas = [], params = {}, seq = 0;
  let A = {};                       // configuração da análise
  let vista = null, janelaBase = null, prop = false;
  let L = 0, Alt = 0, dpr = 1;      // tamanho do canvas em pixels de CSS
  let traco = null, R = null, cores = {}, pedido = 0, adiado = 0, proxLimite = 'a', ultimoCampo = null;
  const animando = new Set();
  let malha;                        // malha do sólido (undefined = precisa recalcular)

  /* ---------- coordenadas ---------- */
  const px = x => L / 2 + (x - vista.cx) * vista.sx;
  const py = y => Alt / 2 - (y - vista.cy) * vista.sy;
  const ix = X => vista.cx + (X - L / 2) / vista.sx;
  const iy = Y => vista.cy - (Y - Alt / 2) / vista.sy;

  function ajustarJanela() {
    const [x0, x1, y0, y1] = janelaBase;
    let sx = L / (x1 - x0), sy = Alt / (y1 - y0);
    if (prop) sx = sy = Math.min(sx, sy);
    vista = { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, sx, sy };
  }

  function janelaAtual() {
    return [ix(0), ix(L), iy(Alt), iy(0)].map(v => +v.toPrecision(6));
  }

  /* ---------- curvas ---------- */
  const nomeLivre = () => NOMES.find(n => !linhas.some(l => l.nome === n));

  function novaLinha(d = {}) {
    const nome = NOMES.includes(d.nome) && !linhas.some(l => l.nome === d.nome) ? d.nome : nomeLivre();
    return {
      id: ++seq, nome, cor: NOMES.indexOf(nome), tipo: TIPOS[d.tipo] ? d.tipo : 'y',
      f: String(d.f || '').slice(0, 200), g: String(d.g || '').slice(0, 200),
      t0: String(d.t0 || '0').slice(0, 30), t1: String(d.t1 || '2pi').slice(0, 30),
      vis: d.vis !== false, c: { erro: '', lido: '', vazio: true, fx: null, fy: null, t0: 0, t1: 0 }, pars: [], refs: new Set(), segs: []
    };
  }

  const normalizar = s => s.toLowerCase().replace(/[\s·*]/g, '').replace(/,/g, '.').replace(/²/g, '^2').replace(/³/g, '^3')
    .replace(/pi/g, 'π').replace(/theta/g, 'θ').replace(/√/g, 'sqrt');

  function compilarLinha(l, nomes) {
    const c = { erro: '', lido: '', vazio: false, fx: null, fy: null, t0: 0, t1: 0 };
    const campos = l.tipo === 'param'
      ? [['x(t): ', l.f, 't'], ['y(t): ', l.g, 't']]
      : [[l.tipo === 'polar' ? 'r(θ): ' : '', l.f, l.tipo === 'polar' ? 'theta' : 'x']];
    const fns = [], lidos = [], pars = new Set(), refs = new Set();
    let divergiu = false;
    try {
      campos.forEach(([rotulo, texto, variavel]) => {
        if (!texto.trim()) { c.vazio = true; return; }
        try {
          const r = Expr.analisar(texto, { variavel, linhas: nomes });
          r.params.forEach(n => pars.add(n));
          r.chamadas.forEach(n => refs.add(n));
          fns.push(Expr.compilar(r.ast, amb));
          const lido = Expr.str(r.ast);
          lidos.push(lido);
          if (normalizar(lido) !== normalizar(texto)) divergiu = true;
        } catch (e) {
          if (e.amigavel) e.message = rotulo + e.message;
          throw e;
        }
      });
      if (l.tipo !== 'y' && !c.vazio) {
        try { c.t0 = Expr.constante(l.t0); c.t1 = Expr.constante(l.t1); }
        catch (e) { if (e.amigavel) e.message = 'Intervalo: ' + e.message; throw e; }
        if (!Number.isFinite(c.t0) || !Number.isFinite(c.t1) || c.t0 === c.t1) throw Object.assign(new Error('Intervalo: use dois valores diferentes.'), { amigavel: true });
      }
      if (!c.vazio) { c.fx = fns[0]; c.fy = fns[1] || null; }
      c.lido = divergiu ? lidos.join(' ; ') : '';
      l.pars = Array.from(pars);
      l.refs = refs;
    } catch (e) {
      c.erro = e.amigavel ? e.message : 'Não consegui ler esta expressão.';
    }
    l.c = c;
  }

  function temCiclo(l, caminho = []) {
    if (caminho.includes(l.nome)) return true;
    return Array.from(l.refs).some(n => {
      const o = linhas.find(k => k.nome === n && k.tipo === 'y');
      return o && temCiclo(o, caminho.concat(l.nome));
    });
  }

  function compilarTudo() {
    const nomesY = linhas.filter(l => l.tipo === 'y').map(l => l.nome);
    linhas.forEach(l => compilarLinha(l, nomesY.filter(n => n !== l.nome)));
    linhas.forEach(l => {
      if (l.c.fx && temCiclo(l)) { l.c.fx = null; l.c.erro = 'Referência circular: uma curva não pode depender de si mesma.'; }
    });
    amb.F = {};
    linhas.forEach(l => { if (l.tipo === 'y' && l.c.fx) amb.F[l.nome] = l.c.fx; });
    const usados = new Set(linhas.flatMap(l => l.pars));
    Object.keys(params).forEach(n => { if (!usados.has(n)) { delete params[n]; delete amb.P[n]; } });
    usados.forEach(n => { if (!params[n]) params[n] = { v: 1, min: -5, max: 5 }; amb.P[n] = params[n].v; });
  }

  /* ---------- lista de curvas na tela ---------- */
  const PLACEHOLDER = { y: 'ex.: x^2 - 3x', polar: 'ex.: 1 + cos(θ)', param: 'ex.: cos(t)' };

  function montarLinhas() {
    const ol = $('.gf-linhas');
    ol.innerHTML = '';
    linhas.forEach(l => {
      const li = document.createElement('li');
      li.className = 'gf-linha';
      li.dataset.id = l.id;
      li.innerHTML =
        '<div class="gf-l1">' +
          '<label class="gf-vis"><input type="checkbox"><span class="gf-cor"></span><span class="gf-so"></span></label>' +
          '<span class="gf-nome"></span>' +
          '<input class="gf-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done">' +
          '<button type="button" class="gf-del">×</button>' +
        '</div>' +
        '<div class="gf-l2">' +
          '<input class="gf-in2" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done">' +
          '<div class="gf-faixa"><span class="gf-ft"></span><input class="gf-t0" type="text" autocomplete="off" spellcheck="false" aria-label="Início do intervalo"><span>até</span><input class="gf-t1" type="text" autocomplete="off" spellcheck="false" aria-label="Fim do intervalo"></div>' +
          '<select class="gf-tipo" aria-label="Tipo da curva"></select>' +
        '</div>' +
        '<p class="gf-erro" role="status"></p><p class="gf-lido"></p>';
      const em = (s) => $(s, li);
      em('.gf-cor').style.setProperty('--cor', 'var(--gf-c' + l.cor + ')');
      em('.gf-vis input').checked = l.vis;
      em('.gf-so').textContent = 'Mostrar curva ' + l.nome;
      em('.gf-nome').textContent = l.tipo === 'y' ? l.nome + '(x) =' : l.tipo === 'polar' ? 'r(θ) =' : 'x(t) =';
      em('.gf-in').value = l.f;
      em('.gf-in').placeholder = PLACEHOLDER[l.tipo];
      em('.gf-in').setAttribute('aria-label', l.tipo === 'y' ? 'Função ' + l.nome + ' de x' : l.tipo === 'polar' ? 'Raio r em função de θ' : 'x em função de t');
      em('.gf-del').setAttribute('aria-label', 'Remover curva ' + l.nome);
      em('.gf-in2').value = l.g;
      em('.gf-in2').placeholder = 'y(t) = ex.: sen(t)';
      em('.gf-in2').setAttribute('aria-label', 'y em função de t');
      em('.gf-in2').hidden = l.tipo !== 'param';
      em('.gf-faixa').hidden = l.tipo === 'y';
      em('.gf-ft').textContent = l.tipo === 'polar' ? 'θ de' : 't de';
      em('.gf-t0').value = l.t0;
      em('.gf-t1').value = l.t1;
      Object.keys(TIPOS).forEach(k => em('.gf-tipo').append(new Option(TIPOS[k], k)));
      em('.gf-tipo').value = l.tipo;
      ol.append(li);
    });
    $('[data-acao=add]').disabled = linhas.length >= NOMES.length;
    atualizarErros();
  }

  function atualizarErros() {
    linhas.forEach(l => {
      const li = $('.gf-linha[data-id="' + l.id + '"]');
      if (!li) return;
      const erro = $('.gf-erro', li), id = 'gf-erro-' + l.id;
      erro.id = id;
      erro.textContent = l.c.erro;
      $('.gf-lido', li).textContent = l.c.lido ? 'lido como: ' + l.c.lido : '';
      [$('.gf-in', li), $('.gf-in2', li)].forEach(inp => {
        inp.setAttribute('aria-invalid', l.c.erro ? 'true' : 'false');
        if (l.c.erro) inp.setAttribute('aria-describedby', id); else inp.removeAttribute('aria-describedby');
      });
    });
  }

  const linhaDe = el => linhas.find(l => String(l.id) === el.closest('.gf-linha').dataset.id);

  $('.gf-linhas').addEventListener('input', e => {
    const l = linhaDe(e.target), el = e.target;
    if (el.matches('.gf-in')) l.f = el.value;
    else if (el.matches('.gf-in2')) l.g = el.value;
    else if (el.matches('.gf-t0')) l.t0 = el.value;
    else if (el.matches('.gf-t1')) l.t1 = el.value;
    else if (el.matches('.gf-vis input')) l.vis = el.checked;
    else return;
    editou();
  });
  $('.gf-linhas').addEventListener('change', e => {
    if (!e.target.matches('.gf-tipo')) return;
    linhaDe(e.target).tipo = e.target.value;
    montarLinhas();
    editou();
  });
  $('.gf-linhas').addEventListener('click', e => {
    if (!e.target.matches('.gf-del')) return;
    const l = linhaDe(e.target);
    linhas = linhas.filter(k => k !== l);
    montarLinhas();
    editou();
  });
  $('.gf-linhas').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('input')) e.target.blur(); });
  raiz.addEventListener('focusin', e => { if (e.target.matches('.gf-in, .gf-in2')) ultimoCampo = e.target; });

  /* teclado matemático: insere no campo onde você estava digitando */
  $('.gf-teclas').addEventListener('pointerdown', e => e.preventDefault());
  $('.gf-teclas').addEventListener('click', e => {
    const b = e.target.closest('[data-ins]');
    if (!b) return;
    const campo = ultimoCampo && document.body.contains(ultimoCampo) && !ultimoCampo.hidden ? ultimoCampo : $('.gf-in');
    if (!campo) return;
    campo.focus();
    const ins = b.dataset.ins, abre = ins.endsWith('('), ini = campo.selectionStart, fim = campo.selectionEnd;
    campo.value = campo.value.slice(0, ini) + ins + (abre ? ')' : '') + campo.value.slice(fim);
    const pos = ini + ins.length;
    campo.setSelectionRange(pos, pos);
    campo.dispatchEvent(new Event('input', { bubbles: true }));
  });

  /* ---------- parâmetros (controles deslizantes) ---------- */
  function montarParams() {
    const nomes = Object.keys(params), lista = $('.gf-plist');
    $('.gf-params').hidden = !nomes.length;
    if (nomes.join() === lista.dataset.sig) return;
    lista.dataset.sig = nomes.join();
    lista.innerHTML = '';
    nomes.forEach(n => {
      const d = document.createElement('div');
      d.className = 'gf-p';
      d.dataset.nome = n;
      d.innerHTML = '<b></b><input type="range" step="0.01"><input type="number" step="any"><button type="button" class="gf-btn" aria-pressed="false">▶</button>';
      $('b', d).textContent = visivel(n);
      $('[type=range]', d).setAttribute('aria-label', 'Valor de ' + visivel(n));
      $('[type=number]', d).setAttribute('aria-label', 'Valor de ' + visivel(n) + ' (digitando)');
      const bt = $('button', d);
      bt.setAttribute('aria-label', 'Animar ' + visivel(n));
      if (calmo) { bt.disabled = true; bt.title = 'Animação desligada: o sistema pede menos movimento.'; }
      lista.append(d);
      mostrarParam(n);
    });
  }

  function mostrarParam(n) {
    const d = $('.gf-p[data-nome="' + n + '"]'), p = params[n];
    if (!d) return;
    const r = $('[type=range]', d), campo = $('[type=number]', d);
    r.min = p.min; r.max = p.max; r.value = p.v;
    if (document.activeElement !== campo) campo.value = +p.v.toFixed(4);
  }

  function definirParam(n, v) {
    const p = params[n];
    if (!p || !Number.isFinite(v)) return;
    p.v = v;
    if (v < p.min) p.min = Math.floor(v);
    if (v > p.max) p.max = Math.ceil(v);
    amb.P[n] = v;
    mostrarParam(n);
  }

  $('.gf-plist').addEventListener('input', e => {
    const n = e.target.closest('.gf-p').dataset.nome;
    definirParam(n, num(e.target.value));
    moveuParam();
  });
  $('.gf-plist').addEventListener('click', e => {
    const bt = e.target.closest('button');
    if (!bt) return;
    const n = bt.closest('.gf-p').dataset.nome, liga = !animando.has(n);
    if (liga) { animando.add(n); params[n].dir = 1; } else animando.delete(n);
    bt.setAttribute('aria-pressed', liga);
    bt.textContent = liga ? '❚❚' : '▶';
    if (liga && animando.size === 1) requestAnimationFrame(quadro);
  });

  let tAnt = 0;
  function quadro(t) {
    const dt = tAnt ? Math.min(0.05, (t - tAnt) / 1000) : 0;
    tAnt = animando.size ? t : 0;
    if (!animando.size) return;
    animando.forEach(n => {
      const p = params[n];
      if (!p) { animando.delete(n); return; }
      let v = p.v + (p.dir || 1) * (p.max - p.min) / 4 * dt;
      if (v > p.max) { v = p.max; p.dir = -1; } else if (v < p.min) { v = p.min; p.dir = 1; }
      definirParam(n, v);
    });
    moveuParam();
    requestAnimationFrame(quadro);
  }

  /* ---------- análise: integral, área, volume, arco ---------- */
  const padraoA = { linha: '', contra: 'eixo', a: '0', b: '1', n: 8, metodo: 'nenhum', sombra: true, deriv: false, x0: '' };

  function popularSelects() {
    const ys = linhas.filter(l => l.tipo === 'y');
    const preencher = (el, itens, atual) => {
      el.innerHTML = '';
      itens.forEach(([v, t]) => el.append(new Option(t, v)));
      el.value = itens.some(i => i[0] === atual) ? atual : itens[0][0];
      return el.value;
    };
    A.linha = preencher($('[data-a=linha]'), ys.length ? ys.map(l => [l.nome, l.nome + '(x)']) : [['', '—']], A.linha);
    A.contra = preencher($('[data-a=contra]'), [['eixo', 'o eixo x']].concat(ys.filter(l => l.nome !== A.linha).map(l => [l.nome, l.nome + '(x)'])), A.contra);
  }

  function escreverA() {
    $$('[data-a]').forEach(el => {
      const k = el.dataset.a;
      if (el.tagName === 'SELECT' && (k === 'linha' || k === 'contra')) return;
      if (el.type === 'checkbox') el.checked = !!A[k]; else el.value = A[k];
    });
    $('.gf-n output').textContent = A.n;
  }

  $('.gf-analise').addEventListener('input', e => {
    const k = e.target.dataset.a;
    if (!k) return;
    A[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.type === 'range' ? +e.target.value : e.target.value;
    if (k === 'linha') popularSelects();
    if (k === 'n') $('.gf-n output').textContent = A.n;
    calcular();
    pedir();
    adiarSalvar();
  });

  function resultado(itens, msg) {
    const dl = $('.gf-res');
    dl.innerHTML = '';
    if (msg) {
      const p = document.createElement('p');
      p.className = 'gf-msg';
      p.textContent = msg;
      dl.append(p);
      return;
    }
    itens.forEach(([rotulo, valor]) => {
      const dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = rotulo;
      dd.textContent = Number.isNaN(valor) ? 'sem resultado' : Expr.formatar(valor);
      dl.append(dt, dd);
    });
  }

  function calcular() {
    R = null;
    malha = undefined;
    $('.gf-x0-res').textContent = '';
    const lf = linhas.find(l => l.nome === A.linha && l.tipo === 'y' && l.c.fx);
    if (!lf) { resultado(null, 'Escreva uma função y = f(x).'); atualizarPontos(); return; }
    const lg = A.contra === 'eixo' ? null : linhas.find(l => l.nome === A.contra && l.tipo === 'y' && l.c.fx);
    let a, b;
    try { a = Expr.constante(A.a); b = Expr.constante(A.b); }
    catch (e) { resultado(null, 'Limites: ' + (e.amigavel ? e.message : 'não consegui ler.')); atualizarPontos(); return; }
    if (!Number.isFinite(a) || !Number.isFinite(b)) { resultado(null, 'Os limites precisam ser números.'); atualizarPontos(); return; }
    const lo = Math.min(a, b), hi = Math.max(a, b);
    const f = lf.c.fx, g = lg ? lg.c.fx : () => 0, nf = lf.nome, ng = lg ? lg.nome : '0';
    R = { lf, lg, f, g, lo, hi, n: A.n, metodo: A.metodo, sombra: A.sombra, deriv: A.deriv, pts: [] };

    const I = fn => Expr.integrar(fn, lo, hi);
    const df = x => Expr.derivada(f, x);
    const dif = lg ? '(' + nf + ' − ' + ng + ')' : nf;
    const vol = {
      x: Math.PI * I(x => { const [Re, ri] = raios(x); return Re * Re - ri * ri; }),
      y: 2 * Math.PI * I(x => Math.abs(x) * Math.abs(f(x) - g(x)))
    };
    R.vol = vol;
    const itens = [['∫ ' + dif + ' dx', I(x => f(x) - g(x))], ['Área', I(x => Math.abs(f(x) - g(x)))]];
    if (!lg) itens.push(['Valor médio', lo === hi ? NaN : I(f) / (hi - lo)]);
    if (!lg && A.metodo !== 'nenhum') {
      const h = (hi - lo) / A.n, desloc = A.metodo === 'esq' ? 0 : A.metodo === 'dir' ? 1 : 0.5;
      let soma = 0;
      for (let i = 0; i < A.n; i++) soma += f(lo + (i + desloc) * h) * h;
      itens.push(['Soma de Riemann', soma], ['Erro', Math.abs(soma - I(f))]);
    }
    itens.push(
      ['Volume (discos, eixo x)', vol.x],
      ['Volume (cascas, eixo y)', vol.y],
      ['Comprimento do arco', I(x => Math.sqrt(1 + df(x) ** 2))],
      ['Área de superfície', 2 * Math.PI * I(x => Math.abs(f(x)) * Math.sqrt(1 + df(x) ** 2))]
    );
    resultado(itens);

    if (A.x0.trim()) {
      try {
        const x0 = Expr.constante(A.x0), y0 = f(x0);
        $('.gf-x0-res').textContent = Number.isFinite(y0)
          ? nf + '(' + Expr.formatar(x0) + ') = ' + Expr.formatar(y0) + '  ·  ' + nf + '′ = ' + Expr.formatar(df(x0))
          : nf + ' não está definida em x = ' + Expr.formatar(x0) + '.';
      } catch (e) { $('.gf-x0-res').textContent = 'x: ' + (e.amigavel ? e.message : 'não consegui ler.'); }
    }
    atualizarPontos();
    if (modo3d) sincronizar3d();
  }

  /* pontos onde as curvas se encontram (ou onde f cruza o eixo): clique para usar como limite */
  function atualizarPontos() {
    const caixa = $('.gf-pontos');
    if (!R || !vista) { caixa.hidden = true; return; }
    const centro = (ix(0) + ix(L)) / 2;
    R.pts = Expr.raizes(x => R.f(x) - R.g(x), ix(0), ix(L))
      .sort((p, q) => Math.abs(p - centro) - Math.abs(q - centro)).slice(0, 8).sort((p, q) => p - q);
    const sig = R.pts.map(x => x.toPrecision(8)).join() + A.contra + A.linha;
    caixa.hidden = !R.pts.length;
    if (caixa.dataset.sig === sig) return;
    caixa.dataset.sig = sig;
    $('.gf-pontos-t').textContent = R.lg ? R.lf.nome + ' e ' + R.lg.nome + ' se cruzam em' : 'Raízes de ' + R.lf.nome;
    const chips = $('.gf-pontos .gf-chips');
    chips.innerHTML = '';
    R.pts.forEach(x => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'gf-chip';
      b.textContent = 'x = ' + Expr.formatar(x);
      b.dataset.x = String(+x.toPrecision(12));
      b.title = 'Usar como limite (alterna a e b)';
      chips.append(b);
    });
  }

  $('.gf-pontos').addEventListener('click', e => {
    const b = e.target.closest('[data-x]');
    if (!b) return;
    A[proxLimite] = b.dataset.x;
    $('[data-a=' + proxLimite + ']').value = A[proxLimite];
    proxLimite = proxLimite === 'a' ? 'b' : 'a';
    calcular();
    pedir();
    adiarSalvar();
  });

  /* ---------- desenho ---------- */
  function lerCores() {
    const s = getComputedStyle(raiz), v = n => s.getPropertyValue(n).trim();
    cores = { fundo: v('--card'), grade: v('--line'), eixo: v('--mute'), mute: v('--mute'), txt: v('--txt'), ac: v('--ac'), curvas: NOMES.map((_, i) => v('--gf-c' + i)) };
  }

  function passo(escala) {
    const bruto = 90 / escala, m = Math.pow(10, Math.floor(Math.log10(bruto))), r = bruto / m;
    return (r < 1.5 ? 1 : r < 3.5 ? 2 : r < 7.5 ? 5 : 10) * m;
  }

  function rotular(t, x, y) { g2.strokeText(t, x, y); g2.fillText(t, x, y); }

  function desenharGrade() {
    const dx = passo(vista.sx), dy = passo(vista.sy);
    const k0 = Math.ceil(ix(0) / dx), k1 = Math.floor(ix(L) / dx), j0 = Math.ceil(iy(Alt) / dy), j1 = Math.floor(iy(0) / dy);
    g2.lineWidth = 1;
    g2.strokeStyle = cores.grade;
    g2.beginPath();
    for (let k = k0; k <= k1; k++) { const X = Math.round(px(k * dx)) + 0.5; g2.moveTo(X, 0); g2.lineTo(X, Alt); }
    for (let j = j0; j <= j1; j++) { const Y = Math.round(py(j * dy)) + 0.5; g2.moveTo(0, Y); g2.lineTo(L, Y); }
    g2.stroke();
    const X0 = px(0), Y0 = py(0);
    g2.strokeStyle = cores.eixo;
    g2.lineWidth = 1.5;
    g2.beginPath();
    if (X0 >= 0 && X0 <= L) { g2.moveTo(X0, 0); g2.lineTo(X0, Alt); }
    if (Y0 >= 0 && Y0 <= Alt) { g2.moveTo(0, Y0); g2.lineTo(L, Y0); }
    g2.stroke();
    g2.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
    g2.fillStyle = cores.mute;
    g2.strokeStyle = cores.fundo;
    g2.lineWidth = 3;
    g2.lineJoin = 'round';
    const yRot = limitar(Y0 + 15, 14, Alt - 5), xRot = limitar(X0 - 6, 44, L - 4);
    g2.textAlign = 'center';
    for (let k = k0; k <= k1; k++) if (k) rotular(Expr.formatar(k * dx), px(k * dx), yRot);
    g2.textAlign = 'right';
    for (let j = j0; j <= j1; j++) if (j) rotular(Expr.formatar(j * dy), xRot, py(j * dy) + 4);
  }

  /* junta os pontos em trechos contínuos; quebra nas assíntotas e onde a função não existe */
  function coletor() {
    const trechos = [];
    let seg = [];
    const fechar = () => { if (seg.length > 1) trechos.push(seg); seg = []; };
    return {
      por(x, y) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) return fechar();
        const X = px(x), Y = py(y);
        if (Math.abs(X) > 5e4 || Math.abs(Y) > 5e4) return fechar();
        const ant = seg[seg.length - 1];
        if (ant && Math.abs(Y - ant[1]) > 3 * Alt) fechar();
        seg.push([X, Y, x, y]);
      },
      fim() { fechar(); return trechos; }
    };
  }

  function amostrarY(fn) {
    const c = coletor();
    for (let i = 0; i <= L; i++) { const x = ix(i); c.por(x, fn(x)); }
    return c.fim();
  }

  function amostrar(l) {
    const { fx, fy, t0, t1 } = l.c;
    if (l.tipo === 'y') return amostrarY(fx);
    const c = coletor(), n = Math.min(8000, 1500 + Math.ceil(Math.abs(t1 - t0) * 120));
    for (let i = 0; i <= n; i++) {
      const t = t0 + (t1 - t0) * i / n;
      if (l.tipo === 'polar') { const r = fx(t); c.por(r * Math.cos(t), r * Math.sin(t)); } else c.por(fx(t), fy(t));
    }
    return c.fim();
  }

  function tracar(trechos) {
    g2.beginPath();
    trechos.forEach(s => {
      g2.moveTo(s[0][0], s[0][1]);
      for (let i = 1; i < s.length; i++) g2.lineTo(s[i][0], s[i][1]);
    });
    g2.stroke();
  }

  function desenharRegiao() {
    if (!R) return;
    g2.fillStyle = g2.strokeStyle = cores.curvas[R.lf.cor];
    if (R.metodo !== 'nenhum' && !R.lg) {
      const h = (R.hi - R.lo) / R.n, desloc = R.metodo === 'esq' ? 0 : R.metodo === 'dir' ? 1 : 0.5, Y0 = py(0);
      g2.lineWidth = 1;
      for (let i = 0; i < R.n; i++) {
        const x = R.lo + i * h, y = R.f(x + desloc * h);
        if (!Number.isFinite(y)) continue;
        const X = px(x), larg = px(x + h) - X, Y = py(y);
        g2.globalAlpha = 0.28;
        g2.fillRect(X, Math.min(Y, Y0), larg, Math.abs(Y - Y0));
        if (larg > 4) { g2.globalAlpha = 0.9; g2.strokeRect(X + 0.5, Math.min(Y, Y0), larg - 1, Math.abs(Y - Y0)); }
      }
      g2.globalAlpha = 1;
    } else if (R.sombra) {
      const xa = Math.max(0, Math.floor(px(R.lo))), xb = Math.min(L, Math.ceil(px(R.hi)));
      if (xb <= xa) return;
      const topo = [], base = [];
      for (let X = xa; X <= xb; X++) {
        const x = ix(X), yf = R.f(x), yg = R.g(x);
        if (!Number.isFinite(yf) || !Number.isFinite(yg)) return;
        topo.push([X, limitar(py(yf), -1e5, 1e5)]);
        base.push([X, limitar(py(yg), -1e5, 1e5)]);
      }
      g2.beginPath();
      topo.concat(base.reverse()).forEach((p, i) => (i ? g2.lineTo(p[0], p[1]) : g2.moveTo(p[0], p[1])));
      g2.closePath();
      g2.globalAlpha = 0.25;
      g2.fill();
      g2.globalAlpha = 1;
    }
  }

  function desenharCurva(l) {
    l.segs = [];
    if (!l.vis || !l.c.fx || (l.tipo === 'param' && !l.c.fy)) return;
    l.segs = amostrar(l);
    g2.strokeStyle = cores.curvas[l.cor];
    g2.lineWidth = 2.5;
    g2.lineJoin = g2.lineCap = 'round';
    tracar(l.segs);
  }

  function desenharDerivada() {
    if (!R || !R.deriv) return;
    g2.strokeStyle = cores.curvas[R.lf.cor];
    g2.lineWidth = 2;
    g2.setLineDash([7, 5]);
    tracar(amostrarY(x => Expr.derivada(R.f, x)));
    g2.setLineDash([]);
  }

  function desenharPontos() {
    if (!R) return;
    atualizarPontos();
    g2.lineWidth = 2;
    g2.strokeStyle = cores.txt;
    g2.fillStyle = cores.fundo;
    R.pts.forEach(x => {
      g2.beginPath();
      g2.arc(px(x), py(R.f(x)), 5, 0, 2 * Math.PI);
      g2.fill();
      g2.stroke();
    });
  }

  const rotuloCurva = l => (l.tipo === 'y' ? l.nome + '(x)' : 'curva ' + l.nome);

  function desenharTraco() {
    const leitura = $('.gf-leitura');
    let melhor = null, d2 = 32 * 32;
    if (traco) linhas.forEach(l => l.segs.forEach(s => s.forEach(p => {
      const d = (p[0] - traco.x) ** 2 + (p[1] - traco.y) ** 2;
      if (d < d2) { d2 = d; melhor = { l, p }; }
    })));
    if (!melhor) { leitura.textContent = 'Toque no gráfico para ler valores.'; return; }
    const { l, p } = melhor;
    g2.fillStyle = cores.curvas[l.cor];
    g2.strokeStyle = cores.fundo;
    g2.lineWidth = 3;
    g2.beginPath();
    g2.arc(p[0], p[1], 6, 0, 2 * Math.PI);
    g2.stroke();
    g2.fill();
    leitura.textContent = l.tipo === 'y'
      ? l.nome + '(' + Expr.formatar(p[2]) + ') = ' + Expr.formatar(p[3]) + '  ·  ' + l.nome + '′ = ' + Expr.formatar(Expr.derivada(l.c.fx, p[2]))
      : rotuloCurva(l) + ': x = ' + Expr.formatar(p[2]) + ', y = ' + Expr.formatar(p[3]);
  }

  function descrever() {
    const ativas = linhas.filter(l => l.vis && l.c.fx);
    const lista = ativas.map(l => rotuloCurva(l) + ' = ' + (l.tipo === 'param' ? l.f + ' ; ' + l.g : l.f));
    return 'Gráfico cartesiano, x de ' + Expr.formatar(ix(0)) + ' a ' + Expr.formatar(ix(L)) + ', y de ' + Expr.formatar(iy(Alt)) + ' a ' + Expr.formatar(iy(0)) +
      '. ' + (lista.length ? 'Curvas: ' + lista.join('; ') + '.' : 'Nenhuma curva desenhada.');
  }

  function atualizarTabela() {
    const corpo = $('.gf-tab-corpo'), ys = linhas.filter(l => l.tipo === 'y' && l.vis && l.c.fx);
    if (!ys.length) { corpo.textContent = 'Nenhuma curva y = f(x) visível.'; return; }
    const x0 = ix(0), x1 = ix(L);
    let html = '<table><caption>Valores na janela atual</caption><thead><tr><th scope="col">x</th>' + ys.map(l => '<th scope="col">' + l.nome + '(x)</th>').join('') + '</tr></thead><tbody>';
    for (let i = 0; i <= 8; i++) {
      const x = x0 + (x1 - x0) * i / 8;
      html += '<tr><th scope="row">' + Expr.formatar(x) + '</th>' + ys.map(l => '<td>' + Expr.formatar(l.c.fx(x)) + '</td>').join('') + '</tr>';
    }
    corpo.innerHTML = html + '</tbody></table>';
  }

  function desenhar() {
    pedido = 0;
    if (modo3d) return desenhar3d();
    if (!L || !vista) return;
    g2.setTransform(dpr, 0, 0, dpr, 0, 0);
    g2.fillStyle = cores.fundo;
    g2.fillRect(0, 0, L, Alt);
    desenharGrade();
    desenharRegiao();
    linhas.forEach(desenharCurva);
    desenharDerivada();
    desenharPontos();
    desenharTraco();
    const desc = descrever();
    if (cv.getAttribute('aria-label') !== desc) cv.setAttribute('aria-label', desc);
    if ($('.gf-tab').open) atualizarTabela();
  }

  const pedir = () => { if (!pedido) pedido = requestAnimationFrame(desenhar); };
  $('.gf-tab').addEventListener('toggle', pedir);

  /* ---------- gestos: arrastar, pinça, roda e teclado ---------- */
  function mover(dx, dy) {
    vista.cx -= dx / vista.sx;
    vista.cy += dy / vista.sy;
    mudouVista();
  }

  function zoom(fator, X = L / 2, Y = Alt / 2, eixo) {
    const wx = ix(X), wy = iy(Y);
    if (eixo !== 'y') vista.sx = limitar(vista.sx * fator, 1e-4, 1e7);
    if (eixo !== 'x') vista.sy = limitar(vista.sy * fator, 1e-4, 1e7);
    if (prop) vista.sy = vista.sx;
    vista.cx = wx - (X - L / 2) / vista.sx;
    vista.cy = wy + (Y - Alt / 2) / vista.sy;
    mudouVista();
  }

  function mudouVista() { pedir(); adiarSalvar(); }

  const toques = new Map();
  let movido = 0, pinca = null;
  const posicao = (e, el = cv) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

  cv.addEventListener('pointerdown', e => {
    cv.setPointerCapture(e.pointerId);
    toques.set(e.pointerId, posicao(e));
    movido = 0;
    pinca = null;
    cv.classList.add('is-arrastando');
  });
  cv.addEventListener('pointermove', e => {
    const p = posicao(e), ant = toques.get(e.pointerId);
    if (!ant) { if (e.pointerType === 'mouse') { traco = p; pedir(); } return; }
    toques.set(e.pointerId, p);
    if (toques.size === 1) {
      movido += Math.abs(p.x - ant.x) + Math.abs(p.y - ant.y);
      mover(p.x - ant.x, p.y - ant.y);
    } else if (toques.size === 2) {
      const [a, b] = Array.from(toques.values()), d = Math.hypot(a.x - b.x, a.y - b.y), c = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      if (pinca && pinca.d > 0) { zoom(d / pinca.d, c.x, c.y); mover(c.x - pinca.c.x, c.y - pinca.c.y); }
      pinca = { d, c };
      movido += 10;
    }
  });
  const soltar = toque => e => {
    if (toque && toques.size === 1 && movido < 6) { traco = posicao(e); pedir(); }
    toques.delete(e.pointerId);
    pinca = null;
    if (!toques.size) cv.classList.remove('is-arrastando');
  };
  cv.addEventListener('pointerup', soltar(true));
  cv.addEventListener('pointercancel', soltar(false));
  cv.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse' && !toques.size) { traco = null; pedir(); } });
  cv.addEventListener('dblclick', () => acao('reset'));
  cv.addEventListener('wheel', e => {
    e.preventDefault();
    const p = posicao(e), dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    zoom(Math.exp(-dy * 0.0015), p.x, p.y, e.shiftKey && !prop ? 'x' : undefined);
  }, { passive: false });
  cv.addEventListener('keydown', e => {
    const f = e.shiftKey ? 0.4 : 0.1;
    const teclas = {
      ArrowLeft: () => mover(L * f, 0), ArrowRight: () => mover(-L * f, 0),
      ArrowUp: () => mover(0, Alt * f), ArrowDown: () => mover(0, -Alt * f),
      '+': () => zoom(1.25), '=': () => zoom(1.25), '-': () => zoom(0.8), _: () => zoom(0.8), 0: () => acao('reset')
    };
    if (!teclas[e.key]) return;
    e.preventDefault();
    teclas[e.key]();
  });

  /* ---------- sólido de revolução (3D) ---------- */
  const cv3 = $('.gf-canvas3d'), g3 = cv3.getContext('2d');
  const ctl3 = $('.gf-ctl3d');
  const cam = { yaw: -0.7, pit: 0.4, zoom: 1 };
  const s3 = { ang: 360, modo: 'solido', n: 12, sel: 1, tocando: false };
  const PASSOS = 60;   // quantos passos angulares formam a volta inteira
  const FOLGA = 0.92;  // fração da largura que cada fatia ocupa, para as fatias aparecerem separadas
  const GRAU = Math.PI / 180;
  let modo3d = false, eixo3d = 'x';

  function rgb(hex) {
    const m = /^#([0-9a-f]{6})$/i.exec(hex.trim()), n = m ? parseInt(m[1], 16) : 0x888888;
    return [n >> 16, (n >> 8) & 255, n & 255];
  }

  /** Raios externo e interno do giro em torno do eixo x: anel se f e g têm o mesmo sinal, disco se não. */
  function raios(x) {
    const yf = R.f(x), yg = R.g(x), a = Math.abs(yf), b = Math.abs(yg);
    return yf * yg > 0 ? [Math.max(a, b), Math.min(a, b)] : [Math.max(a, b), 0];
  }

  const nomeFatia = () => (eixo3d === 'y' ? 'cascas' : R && R.lg ? 'anéis' : 'discos');

  /**
   * Monta o sólido a partir de perfis (curvas no plano da região) e seções (a região em si).
   * Cada perfil, girado, vira uma superfície; as seções aparecem quando o giro ainda não fechou a volta.
   */
  function montarMalha() {
    malha = null;
    if (!R) return;
    const { f, g, lo, hi } = R, noX = eixo3d === 'x', fatias = s3.modo === 'fatias';
    const n = fatias ? s3.n : 40, w = (hi - lo) / n, d = 2 * Math.PI / PASSOS;
    const pecas = [], secoes = [], info = [];
    let vN = 0;
    const finito = p => Number.isFinite(p[0]) && Number.isFinite(p[1]);
    const peca = (pl, i) => {
      let trecho = [];
      pl.concat([[NaN, NaN]]).forEach(p => {
        if (finito(p)) trecho.push(p);
        else { if (trecho.length > 1) pecas.push({ pl: trecho, i }); trecho = []; }
      });
    };
    const secao = (poly, i) => { if (poly.every(finito)) secoes.push({ poly, i }); };

    if (!fatias) {
      const xs = Array.from({ length: n + 1 }, (_, k) => lo + w * k);
      const topo = xs.map(x => (noX ? [x, raios(x)[0]] : [x, f(x)])), base = xs.map(x => (noX ? [x, raios(x)[1]] : [x, g(x)]));
      peca(topo, -1);
      if (!noX || base.some(p => p[1] > 1e-9)) peca(base, -1);
      [lo, hi].forEach(x => peca([base[x === lo ? 0 : n], topo[x === lo ? 0 : n]], -1));
      for (let k = 0; k < n; k++) secao([base[k], topo[k], topo[k + 1], base[k + 1]], -1);
    } else {
      for (let i = 0; i < n; i++) {
        const xm = lo + w * (i + 0.5), xa = xm - w * FOLGA / 2, xb = xm + w * FOLGA / 2;
        if (noX) {
          const [Re, ri] = raios(xm);
          if (!Number.isFinite(Re)) continue;
          peca([[xa, Re], [xb, Re]], i);
          peca([[xa, ri], [xa, Re]], i);
          peca([[xb, ri], [xb, Re]], i);
          if (ri > 0) peca([[xa, ri], [xb, ri]], i);
          secao([[xa, ri], [xa, Re], [xb, Re], [xb, ri]], i);
          vN += Math.PI * (Re * Re - ri * ri) * w;
          info[i] = { x: xm, texto: (ri > 0 ? 'anel' : 'disco') + ' · raio ' + Expr.formatar(Re) + (ri > 0 ? ' e ' + Expr.formatar(ri) : '') + ' · área ' + Expr.formatar(Math.PI * (Re * Re - ri * ri)) };
        } else {
          const yg = g(xm), yf = f(xm);
          if (!Number.isFinite(yg) || !Number.isFinite(yf)) continue;
          peca([[xb, yg], [xb, yf]], i);
          peca([[xa, yg], [xa, yf]], i);
          peca([[xa, yf], [xb, yf]], i);
          peca([[xa, yg], [xb, yg]], i);
          secao([[xa, yg], [xa, yf], [xb, yf], [xb, yg]], i);
          vN += 2 * Math.PI * Math.abs(xm) * Math.abs(yf - yg) * w;
          info[i] = { x: xm, texto: 'casca · raio ' + Expr.formatar(Math.abs(xm)) + ' · altura ' + Expr.formatar(Math.abs(yf - yg)) + ' · área ' + Expr.formatar(2 * Math.PI * Math.abs(xm) * Math.abs(yf - yg)) };
        }
      }
    }
    if (!pecas.length) return;

    const girar = (u, v, fi) => (noX ? [u, v * Math.cos(fi), v * Math.sin(fi)] : [u * Math.cos(fi), v, u * Math.sin(fi)]);
    const faces = [];
    pecas.forEach(({ pl, i }) => {
      for (let k = 0; k < pl.length - 1; k++) {
        const a = pl[k], b = pl[k + 1];
        for (let j = 0; j < PASSOS; j++) {
          faces.push({ a, b, j, i, p: [girar(a[0], a[1], j * d), girar(b[0], b[1], j * d), girar(b[0], b[1], (j + 1) * d), girar(a[0], a[1], (j + 1) * d)] });
        }
      }
    });
    const todos = pecas.flatMap(pc => pc.pl);
    const eixoU = todos.map(p => p[0]), eixoV = todos.map(p => p[1]);
    const lim = noX ? Math.max(...eixoV.map(Math.abs)) : Math.max(...eixoU.map(Math.abs));
    const min = noX ? [Math.min(...eixoU), -lim, -lim] : [-lim, Math.min(...eixoV), -lim];
    const max = noX ? [Math.max(...eixoU), lim, lim] : [lim, Math.max(...eixoV), lim];
    const centro = min.map((v, k) => (v + max[k]) / 2);
    malha = { faces, secoes, girar, d, min, max, centro, vN, info, raio: Math.max(1e-9, Math.hypot(...max.map((v, k) => v - centro[k]))) };
  }

  function desenhar3d() {
    if (!L) return;
    g3.setTransform(dpr, 0, 0, dpr, 0, 0);
    g3.fillStyle = cores.fundo;
    g3.fillRect(0, 0, L, Alt);
    const leitura = $('.gf-leitura');
    if (malha === undefined) montarMalha();
    if (!malha) {
      g3.fillStyle = cores.mute;
      g3.font = '14px system-ui, sans-serif';
      g3.textAlign = 'center';
      g3.fillText('Escreva uma função y = f(x) para ver o sólido.', L / 2, Alt / 2);
      leitura.textContent = '';
      return;
    }
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pit), sp = Math.sin(cam.pit);
    const esc = Math.min(L, Alt) * 0.44 / malha.raio * cam.zoom, C = malha.centro;
    const girado = v => {
      const x = v[0] - C[0], y = v[1] - C[1], z = v[2] - C[2], z1 = -x * sy + z * cy;
      return [x * cy + z * sy, y * cp - z1 * sp, y * sp + z1 * cp];
    };
    const tela = q => [L / 2 + q[0] * esc, Alt / 2 - q[1] * esc];
    const base = rgb(cores.curvas[R.lf.cor]), destaque = rgb(cores.ac), luz = [0.35, 0.55, 0.75];
    const fatias = s3.modo === 'fatias', ang = s3.ang * GRAU, d = malha.d;
    const cheios = Math.floor(ang / d + 1e-9), parcial = ang - cheios * d;

    // eixo de giro, atrás do sólido
    const ponta = sinal => { const v = C.slice(), k = eixo3d === 'x' ? 0 : 1; v[k] = (sinal < 0 ? malha.min[k] : malha.max[k]) + sinal * malha.raio * 0.25; return v; };
    const e0 = tela(girado(ponta(-1))), e1 = tela(girado(ponta(1)));
    g3.strokeStyle = cores.mute;
    g3.lineWidth = 1.5;
    g3.setLineDash([6, 5]);
    g3.beginPath();
    g3.moveTo(e0[0], e0[1]);
    g3.lineTo(e1[0], e1[1]);
    g3.stroke();
    g3.setLineDash([]);

    const lista = [];
    const juntar = (p, i, secao) => {
      const q = p.map(girado);
      const u = [q[2][0] - q[0][0], q[2][1] - q[0][1], q[2][2] - q[0][2]], w = [q[3][0] - q[1][0], q[3][1] - q[1][1], q[3][2] - q[1][2]];
      const n = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]], m = Math.hypot(n[0], n[1], n[2]) || 1;
      const lum = 0.4 + 0.6 * Math.abs((n[0] * luz[0] + n[1] * luz[1] + n[2] * luz[2]) / m);
      const marcada = fatias && i === s3.sel - 1;
      const tom = (marcada ? destaque : base).map(c => c * lum * (fatias && i % 2 && !marcada ? 0.88 : 1));
      const cor = tom.map(c => Math.round(secao ? c + (255 - c) * 0.4 : c));
      lista.push({ q, z: (q[0][2] + q[1][2] + q[2][2] + q[3][2]) / 4, cor: 'rgb(' + cor.join(',') + ')' });
    };
    malha.faces.forEach(fc => {
      if (fc.j < cheios) juntar(fc.p, fc.i, false);
      else if (fc.j === cheios && parcial > 1e-6) {
        const gi = malha.girar, f0 = cheios * d;
        juntar([gi(fc.a[0], fc.a[1], f0), gi(fc.b[0], fc.b[1], f0), gi(fc.b[0], fc.b[1], ang), gi(fc.a[0], fc.a[1], ang)], fc.i, false);
      }
    });
    // a própria região, no começo e no fim do giro: é a função "girando"
    if (s3.ang < 359.99) {
      [0, ang].forEach((fi, k) => {
        if (k && !ang) return;
        malha.secoes.forEach(sc => juntar(sc.poly.map(v => malha.girar(v[0], v[1], fi)), sc.i, true));
      });
    }
    lista.sort((a, b) => a.z - b.z);
    g3.lineWidth = 0.8;
    g3.lineJoin = 'round';
    lista.forEach(it => {
      g3.fillStyle = g3.strokeStyle = it.cor;
      g3.beginPath();
      it.q.forEach((v, k) => { const t = tela(v); if (k) g3.lineTo(t[0], t[1]); else g3.moveTo(t[0], t[1]); });
      g3.closePath();
      g3.fill();
      g3.stroke();
    });

    g3.fillStyle = cores.txt;
    g3.font = '13px ui-monospace, SFMono-Regular, Menlo, monospace';
    g3.textAlign = 'left';
    g3.fillText(eixo3d, e1[0] + 6, e1[1] + 4);

    const exato = R.vol[eixo3d], f2 = Expr.formatar;
    let texto;
    if (fatias) {
      const inf = malha.info[s3.sel - 1];
      texto = (inf ? 'Fatia ' + s3.sel + ' de ' + s3.n + ' · x = ' + f2(inf.x) + ' · ' + inf.texto + '. ' : '') + 'Soma das fatias = ' + f2(malha.vN) + ' (exato ' + f2(exato) + ')';
    } else {
      texto = 'Giro de ' + s3.ang + '° em torno do eixo ' + eixo3d + ': V = ' + (Number.isNaN(exato) ? 'sem resultado' : f2(exato * s3.ang / 360)) + (s3.ang < 360 ? ' (volta inteira: ' + f2(exato) + ')' : '');
    }
    leitura.textContent = texto;
    const desc = 'Sólido de revolução da região entre ' + (R.lg ? R.lf.nome + ' e ' + R.lg.nome : R.lf.nome + ' e o eixo x') + ' de ' + f2(R.lo) + ' a ' + f2(R.hi) + ', em torno do eixo ' + eixo3d + '. ' + texto + '.';
    if (cv3.getAttribute('aria-label') !== desc) cv3.setAttribute('aria-label', desc);
  }

  function sincronizar3d() {
    const campo = k => $('[data-g3="' + k + '"]'), saida = k => campo(k).parentElement.querySelector('output');
    s3.sel = limitar(s3.sel, 1, s3.n);
    campo('sel').max = s3.n;
    ['ang', 'n', 'sel'].forEach(k => { campo(k).value = s3[k]; saida(k).textContent = k === 'ang' ? s3.ang + '°' : s3[k]; });
    $$('[data-g3modo]').forEach(b => b.setAttribute('aria-pressed', b.dataset.g3modo === s3.modo));
    $$('.gf-so-fatias', ctl3).forEach(el => { el.hidden = s3.modo !== 'fatias'; });
    const girar = $('[data-acao=girar]');
    girar.setAttribute('aria-pressed', s3.tocando);
    girar.textContent = s3.tocando ? '❚❚' : '▶';
    $('[data-acao=eixo]').textContent = 'Eixo ' + eixo3d + ' · ' + nomeFatia();
  }

  function reiniciar3d() { Object.assign(cam, { yaw: -0.7, pit: 0.4, zoom: 1 }); pedir(); }

  function ligar3d(ligado) {
    modo3d = ligado;
    s3.tocando = false;
    cv.hidden = ligado;
    cv3.hidden = !ligado;
    ctl3.hidden = !ligado;
    $$('[data-so="2d"]').forEach(b => { b.hidden = ligado; });
    $$('[data-so="3d"]').forEach(b => { b.hidden = !ligado; });
    $('[data-acao="3d"]').setAttribute('aria-pressed', ligado);
    sincronizar3d();
    medir();
    pedir();
  }

  let tGiro = 0;
  function girando(t) {
    if (!s3.tocando) { tGiro = 0; return; }
    const dt = tGiro ? Math.min(0.05, (t - tGiro) / 1000) : 0;
    tGiro = t;
    s3.ang = Math.min(360, s3.ang + 90 * dt);
    if (s3.ang >= 360) s3.tocando = false;
    s3.ang = Math.round(s3.ang);
    sincronizar3d();
    pedir();
    requestAnimationFrame(girando);
  }

  ctl3.addEventListener('input', e => {
    const k = e.target.dataset.g3;
    if (!k) return;
    s3[k] = +e.target.value;
    if (k === 'ang') s3.tocando = false;
    if (k === 'n') malha = undefined;
    sincronizar3d();
    pedir();
  });
  ctl3.addEventListener('click', e => {
    const b = e.target.closest('[data-g3modo]');
    if (!b) return;
    s3.modo = b.dataset.g3modo;
    malha = undefined;
    sincronizar3d();
    pedir();
  });
  const bGirar = $('[data-acao=girar]');
  if (calmo) { bGirar.disabled = true; bGirar.title = 'Animação desligada: o sistema pede menos movimento.'; }

  const toques3 = new Map();
  let pinca3 = 0;
  cv3.addEventListener('pointerdown', e => {
    cv3.setPointerCapture(e.pointerId);
    toques3.set(e.pointerId, posicao(e, cv3));
    pinca3 = 0;
    cv3.classList.add('is-arrastando');
  });
  cv3.addEventListener('pointermove', e => {
    const p = posicao(e, cv3), ant = toques3.get(e.pointerId);
    if (!ant) return;
    toques3.set(e.pointerId, p);
    if (toques3.size === 1) {
      cam.yaw += (p.x - ant.x) * 0.01;
      cam.pit = limitar(cam.pit + (p.y - ant.y) * 0.01, -1.5, 1.5);
    } else if (toques3.size === 2) {
      const [a, b] = Array.from(toques3.values()), dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinca3 > 0) cam.zoom = limitar(cam.zoom * dist / pinca3, 0.3, 6);
      pinca3 = dist;
    }
    pedir();
  });
  const soltar3 = e => { toques3.delete(e.pointerId); pinca3 = 0; if (!toques3.size) cv3.classList.remove('is-arrastando'); };
  cv3.addEventListener('pointerup', soltar3);
  cv3.addEventListener('pointercancel', soltar3);
  cv3.addEventListener('dblclick', reiniciar3d);
  cv3.addEventListener('wheel', e => {
    e.preventDefault();
    cam.zoom = limitar(cam.zoom * Math.exp(-(e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY) * 0.0015), 0.3, 6);
    pedir();
  }, { passive: false });
  cv3.addEventListener('keydown', e => {
    const zoom3 = f => { cam.zoom = limitar(cam.zoom * f, 0.3, 6); };
    const teclas = {
      ArrowLeft: () => { cam.yaw -= 0.1; }, ArrowRight: () => { cam.yaw += 0.1; },
      ArrowUp: () => { cam.pit = limitar(cam.pit - 0.1, -1.5, 1.5); }, ArrowDown: () => { cam.pit = limitar(cam.pit + 0.1, -1.5, 1.5); },
      '+': () => zoom3(1.25), '=': () => zoom3(1.25), '-': () => zoom3(0.8), _: () => zoom3(0.8),
      0: () => Object.assign(cam, { yaw: -0.7, pit: 0.4, zoom: 1 })
    };
    if (!teclas[e.key]) return;
    e.preventDefault();
    teclas[e.key]();
    pedir();
  });

  /* ---------- botões ---------- */
  const avisar = msg => { $('.gf-status').textContent = msg; };

  function acao(nome) {
    if (nome === 'mais' || nome === 'menos') {
      const fator = nome === 'mais' ? 1.25 : 0.8;
      if (modo3d) { cam.zoom = limitar(cam.zoom * fator, 0.3, 6); pedir(); } else zoom(fator);
    }
    else if (nome === 'reset') { if (modo3d) reiniciar3d(); else { ajustarJanela(); traco = null; mudouVista(); } }
    else if (nome === '3d') ligar3d(!modo3d);
    else if (nome === 'eixo') { eixo3d = eixo3d === 'x' ? 'y' : 'x'; malha = undefined; sincronizar3d(); pedir(); }
    else if (nome === 'girar') {
      if (s3.tocando) s3.tocando = false;
      else { if (s3.ang >= 360) s3.ang = 0; s3.tocando = true; requestAnimationFrame(girando); }
      sincronizar3d();
      pedir();
    }
    else if (nome === 'prop') {
      prop = !prop;
      $('[data-acao=prop]').setAttribute('aria-pressed', prop);
      if (prop) vista.sx = vista.sy = Math.min(vista.sx, vista.sy);
      mudouVista();
    } else if (nome === 'png') {
      desenhar();
      (modo3d ? cv3 : cv).toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'graficador.png';
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      });
    } else if (nome === 'link') {
      salvarHash();
      const url = location.href;
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject())
        .then(() => avisar('Link copiado.'), () => window.prompt('Copie o link:', url));
    } else if (nome === 'add' && linhas.length < NOMES.length) {
      linhas.push(novaLinha());
      montarLinhas();
      editou();
      const campos = $$('.gf-in');
      campos[campos.length - 1].focus();
    }
  }
  raiz.addEventListener('click', e => {
    const b = e.target.closest('[data-acao]');
    if (b) acao(b.dataset.acao);
    const ex = e.target.closest('[data-ex]');
    if (ex) abrirExemplo(ex.dataset.ex, true);
  });

  /* ---------- estado e link compartilhável ---------- */
  function serializar() {
    const p = {};
    Object.keys(params).forEach(n => { p[n] = [+params[n].v.toPrecision(8), params[n].min, params[n].max]; });
    return {
      l: linhas.map(l => ({ tipo: l.tipo, f: l.f, g: l.g, t0: l.t0, t1: l.t1, nome: l.nome, vis: l.vis })),
      p, a: A, j: janelaAtual(), r: prop
    };
  }

  function desserializar(d) {
    if (!d || !Array.isArray(d.l) || !d.l.length || !Array.isArray(d.j) || d.j.length !== 4 || !d.j.every(Number.isFinite)) return null;
    if (d.j[0] >= d.j[1] || d.j[2] >= d.j[3]) return null;
    return { linhas: d.l, params: d.p || {}, analise: d.a || {}, janela: d.j, prop: !!d.r };
  }

  function deExemplo(ex) {
    const nomes = NOMES.slice(0, ex.linhas.length), a = Object.assign({}, ex.analise);
    if (ex.analise) {
      a.linha = nomes[ex.analise.linha];
      a.contra = ex.analise.contra === 'eixo' ? 'eixo' : nomes[ex.analise.contra];
    }
    return { linhas: ex.linhas.map((l, i) => Object.assign({ nome: nomes[i] }, l)), params: {}, analise: a, janela: ex.janela, prop: !!ex.prop, v3: ex.vista3d };
  }

  function salvarHash() {
    clearTimeout(adiado);
    try { history.replaceState(null, '', '#g=' + encodeURIComponent(JSON.stringify(serializar()))); }
    catch (e) { /* o navegador pode bloquear replaceState (ex.: página aberta como arquivo); o gráfico funciona igual */ }
  }
  function adiarSalvar() { clearTimeout(adiado); adiado = setTimeout(salvarHash, 400); }

  function lerHash() {
    const h = location.hash.slice(1);
    try {
      if (h.startsWith('ex=')) {
        const ex = EXEMPLOS.find(x => x.id === decodeURIComponent(h.slice(3)));
        return ex ? deExemplo(ex) : null;
      }
      if (h.startsWith('g=')) return desserializar(JSON.parse(decodeURIComponent(h.slice(2))));
    } catch (e) { /* link quebrado: cai no exemplo inicial */ }
    return null;
  }

  function carregar(est) {
    linhas = [];
    params = {};
    amb.P = {};
    animando.clear();
    seq = 0;
    est.linhas.slice(0, NOMES.length).forEach(d => linhas.push(novaLinha(Object(d))));
    A = Object.assign({}, padraoA, est.analise);
    A.n = limitar(Math.round(+A.n) || 8, 1, 200);
    A.a = String(A.a); A.b = String(A.b); A.x0 = String(A.x0 || '');
    janelaBase = est.janela;
    prop = est.prop;
    $('[data-acao=prop]').setAttribute('aria-pressed', prop);
    compilarTudo();
    Object.keys(est.params).forEach(n => {
      const q = est.params[n];
      if (params[n] && Array.isArray(q) && q.every(Number.isFinite)) { params[n] = { v: q[0], min: q[1], max: q[2] }; amb.P[n] = q[0]; }
    });
    $('.gf-plist').dataset.sig = '';
    montarLinhas();
    montarParams();
    popularSelects();
    escreverA();
    calcular();
    traco = null;
    if (L) ajustarJanela();
    const v3 = est.v3 || {};
    eixo3d = v3.eixo || 'x';
    Object.assign(s3, { ang: v3.ang === undefined ? 360 : v3.ang, modo: v3.modo || 'solido', n: v3.n || 12 });
    s3.sel = Math.ceil(s3.n / 2); // a fatia em destaque começa no meio, onde ela é maior
    Object.assign(cam, { yaw: -0.7, pit: 0.4, zoom: 1 });
    ligar3d(!!est.v3);
  }

  function abrirExemplo(id, rolar) {
    const ex = EXEMPLOS.find(x => x.id === id);
    if (!ex) return;
    carregar(deExemplo(ex));
    adiarSalvar();
    const r = cv.getBoundingClientRect();
    if (rolar && (r.top < 0 || r.bottom > window.innerHeight)) cv.scrollIntoView({ block: 'center', behavior: calmo ? 'auto' : 'smooth' });
  }

  /* ---------- fluxo de edição ---------- */
  function editou() {
    compilarTudo();
    atualizarErros();
    montarParams();
    popularSelects();
    calcular();
    pedir();
    adiarSalvar();
  }
  function moveuParam() { calcular(); pedir(); adiarSalvar(); }

  /* ---------- início ---------- */
  function medir() {
    const r = (modo3d ? cv3 : cv).getBoundingClientRect();
    if (!r.width) return;
    dpr = window.devicePixelRatio || 1;
    L = Math.round(r.width);
    Alt = Math.round(r.height);
    [cv, cv3].forEach(c => { c.width = L * dpr; c.height = Alt * dpr; });
    if (!vista && janelaBase) ajustarJanela();
    atualizarPontos();
    pedir();
  }

  lerCores();
  new MutationObserver(() => { lerCores(); pedir(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  const ro = new ResizeObserver(medir);
  ro.observe(cv);
  ro.observe(cv3);
  window.addEventListener('hashchange', () => { const est = lerHash(); if (est) carregar(est); });
  carregar(lerHash() || deExemplo(EXEMPLOS[0]));
  medir();
})();
