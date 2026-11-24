/*
 * Graficador (/lab/graficador/): curvas y = f(x), polares e paramétricas, controles deslizantes,
 * soma de Riemann, área, volume e comprimento de arco, mais as abas de limites e derivadas. Usa o interpretador de expr.js (carregado antes).
 */
(function () {
  'use strict';

  const raiz = document.getElementById('bo-graf');
  if (!raiz) return;

  const NOMES = ['f', 'g', 'h', 'p', 'q', 's'];
  const MODOS = ['funcoes', 'limite', 'derivada', 'integral', 'solido'];
  const TIPOS = { y: 'y = f(x)', polar: 'polar r(θ)', param: 'paramétrica' };
  const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EXEMPLOS = JSON.parse(document.getElementById('gf-exemplos').textContent);

  const $ = (seletor, ctx = raiz) => ctx.querySelector(seletor);
  const $$ = (seletor, ctx = raiz) => Array.from(ctx.querySelectorAll(seletor));
  const limitar = (v, a, b) => Math.min(b, Math.max(a, v));
  const num = texto => parseFloat(String(texto).replace(',', '.').replace('−', '-'));
  const visivel = nome => (nome === 'theta' ? 'θ' : nome);
  const DICAS = {
    funcoes: 'Escreva uma ou mais funções. Arraste o gráfico para mover e use a roda do mouse para aproximar.',
    limite: 'Mova “Distância” para ver x chegando perto de a. Toque no gráfico para escolher o ponto a.',
    derivada: 'Arraste o ponto sobre a curva, ou toque no gráfico: a reta tangente mostra a inclinação f′(x₀).',
    integral: 'Área entre a curva e o eixo, de a até b. Ligue os retângulos para ver a soma de Riemann.',
    solido: 'Escolha o que estudar: volume por revolução (discos, anéis, cascas), volume por seções ou área de superfície.'
  };

  const cv = $('.gf-canvas');
  const g2 = cv.getContext('2d');
  const amb = { P: {}, F: {} };

  let linhas = [], params = {}, seq = 0;
  let A = {};                       // configuração da análise
  let vista = null, janelaBase = null, prop = false;
  let L = 0, Alt = 0, dpr = 1;      // tamanho do canvas em pixels de CSS
  let traco = null, R = null, cores = {}, pedido = 0, adiado = 0, proxLimite = 'a', ultimoCampo = null;
  const animando = new Set();
  let modo = 'funcoes', proj = false, animSec = false, ver3d = true, arrasto = null;
  const esp = () => (proj ? 1.5 : 1);   // espessura: em tela cheia o traço engrossa para ler de longe
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

  /* ---------- análise: limites, derivadas, integrais e sólidos ---------- */
  const padraoA = {
    linha: '', contra: 'eixo', a: '0', b: '1', n: 8, metodo: 'nenhum', sombra: true,
    ltipo: 'valor', la: '0', lado: 'ambos', lk: 1,
    dx0: '1', dtan: true, dsec: false, dk: 0, d1: false, d2: false,
    tipo3: 'rev', eixo: 'x', ek: '0', sec: 'quad'
  };
  let LIM = null, DER = null, nYs = 0;   // resultado do assunto em foco (limite ou derivada)

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
    // com uma curva só não há o que escolher: esconde a pergunta
    $('[data-sel=linha]').hidden = ys.length < 2;
    $('[data-sel=linha]').parentElement.toggleAttribute('data-vazio', ys.length < 2);
    nYs = ys.length;
    atualizarVisibilidade();
  }

  const fmtH = k => Expr.formatar(Math.pow(10, -k));

  function atualizarSaidas() {
    const saida = k => $('[data-a=' + k + ']').parentElement.querySelector('output');
    saida('n').textContent = A.n;
    saida('lk').textContent = A.ltipo === 'valor' ? 'h = ' + fmtH(A.lk) : 'x = ' + (A.ltipo === 'mais' ? '' : '−') + Expr.formatar(Math.pow(10, A.lk + 1));
    saida('dk').textContent = 'h = ' + fmtH(A.dk);
  }

  const DICAS_TIPO = {
    rev: 'Gira a região em torno de um eixo. Se sobra um buraco no meio, cada fatia vira um anel (arruela); se não, um disco. Eixo vertical: cascas.',
    sec: 'A região é a base e não gira. Cada corte perpendicular ao eixo x é um quadrado, semicírculo ou triângulo apoiado nela.',
    sup: 'Só a curva gira: o resultado é a “casca” do sólido, sem tampas. Use o corte para ver que é oca.'
  };

  function atualizarVisibilidade() {
    $$('[data-so-valor]').forEach(el => { el.hidden = A.ltipo !== 'valor'; });
    $('.gf-rng-sec').hidden = !A.dsec;
    $('[data-sel=contra]').hidden = nYs < 2 || (modo === 'solido' && A.tipo3 === 'sup');
    $$('[data-so-eixo]').forEach(el => { el.hidden = A.tipo3 === 'sec'; });
    $$('[data-so-k]').forEach(el => { el.hidden = A.eixo !== 'h' && A.eixo !== 'v'; });
    $$('[data-so-sec]').forEach(el => { el.hidden = A.tipo3 !== 'sec'; });
    $$('[data-so-giro]').forEach(el => { el.hidden = A.tipo3 === 'sec'; });
    $('.gf-dica-tipo').textContent = DICAS_TIPO[A.tipo3] || '';
  }

  function escreverA() {
    $$('[data-a]').forEach(el => {
      const k = el.dataset.a;
      if (k === 'dx0r' || (el.tagName === 'SELECT' && (k === 'linha' || k === 'contra'))) return;
      if (el.type === 'checkbox') el.checked = !!A[k]; else el.value = A[k];
    });
    atualizarSaidas();
    atualizarVisibilidade();
  }

  $('.gf-painel').addEventListener('input', e => {
    const el = e.target, k = el.dataset.a;
    if (!k) return;
    const v = el.type === 'checkbox' ? el.checked : el.type === 'range' ? +el.value : el.value;
    if (k === 'dx0r') { A.dx0 = String(+v.toPrecision(5)); $('[data-a=dx0]').value = A.dx0; } else A[k] = v;
    if (k === 'linha') popularSelects();
    if (k === 'dsec' && !v) pararSecante();
    atualizarSaidas();
    atualizarVisibilidade();
    calcular();
    pedir();
    adiarSalvar();
  });

  function resultado(itens, msg, nota) {
    const dl = $('.gf-res'), aviso = $('.gf-resmsg');
    dl.innerHTML = '';
    aviso.textContent = msg || nota || '';
    if (msg) return;
    (itens || []).forEach(([rotulo, valor]) => {
      const dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = rotulo;
      dd.textContent = typeof valor === 'string' ? valor : Number.isNaN(valor) ? 'sem resultado' : Expr.formatar(valor);
      dl.append(dt, dd);
    });
  }

  function textoLim(r) {
    if (r.tipo === 'num') {
      const f = Expr.formatar(r.v), t = r.texto.replace(/-/g, '−');
      return !t ? '≈ ' + f : t === f ? f : t + ' (≈ ' + f + ')';
    }
    if (r.tipo === 'inf') return r.s > 0 ? '+∞' : '−∞';
    return r.tipo === 'indef' ? 'f não existe aí' : 'não existe';
  }

  function reta(m, b) {
    const f = Expr.formatar, ma = Math.abs(m) < 1e-9 ? '' : (Math.abs(m - 1) < 1e-9 ? '' : Math.abs(m + 1) < 1e-9 ? '−' : f(m)) + 'x';
    if (!ma) return 'y = ' + f(b);
    return 'y = ' + ma + (Math.abs(b) < 1e-9 ? '' : (b < 0 ? ' − ' : ' + ') + f(Math.abs(b)));
  }

  function calcular() {
    R = null; LIM = null; DER = null;
    malha = undefined;
    const lf = linhas.find(l => l.nome === A.linha && l.tipo === 'y' && l.c.fx);
    if (modo === 'funcoes') { resultado([]); atualizarPontos(); return; }
    if (!lf) { resultado(null, 'Escreva uma função y = f(x).'); atualizarPontos(); atualizarTabLim(); return; }
    if (modo === 'limite') calcLimite(lf);
    else if (modo === 'derivada') calcDerivada(lf);
    else calcIntegral(lf);
    atualizarPontos();
  }

  function calcLimite(lf) {
    const f = lf.c.fx, tipo = A.ltipo;
    let a = tipo === 'mais' ? Infinity : -Infinity;
    if (tipo === 'valor') {
      try { a = Expr.constante(A.la); }
      catch (e) { resultado(null, 'Valor: ' + (e.amigavel ? e.message : 'não consegui ler.')); atualizarTabLim(); return; }
      if (!Number.isFinite(a)) { resultado(null, 'O valor precisa ser um número.'); atualizarTabLim(); return; }
    }
    LIM = { lf, f, a, tipo, h: tipo === 'valor' ? Math.pow(10, -A.lk) : Math.pow(10, A.lk + 1), lado: A.lado };
    const itens = [];
    let nota = '';
    if (tipo === 'valor') {
      const b = LIM.b = Expr.limiteBilateral(f, a), fa = f(a);
      if (A.lado === 'ambos') {
        itens.push(['Pela esquerda (x → a⁻)', textoLim(b.esq)], ['Pela direita (x → a⁺)', textoLim(b.dir)], ['Limite', textoLim(b.bi)]);
        if (b.bi.tipo === 'nao') nota = 'O limite não existe: ' + b.bi.motivo + '.';
        LIM.alvos = b.bi.tipo === 'num' ? [b.bi] : [b.esq, b.dir].filter(r => r.tipo === 'num');
      } else {
        const r = A.lado === 'esq' ? b.esq : b.dir;
        itens.push([A.lado === 'esq' ? 'Limite pela esquerda' : 'Limite pela direita', textoLim(r)]);
        LIM.alvos = r.tipo === 'num' ? [r] : [];
      }
      itens.push(['f(a)', Number.isFinite(fa) ? fa : 'não existe']);
    } else {
      const r = Expr.limite(f, a, 1);
      itens.push([tipo === 'mais' ? 'Limite quando x → +∞' : 'Limite quando x → −∞', textoLim(r)]);
      LIM.alvos = r.tipo === 'num' ? [r] : [];
    }
    resultado(itens, null, nota);
    atualizarTabLim();
  }

  /* tabela de aproximação: x chegando perto de a, e o que f(x) faz */
  function atualizarTabLim() {
    const corpo = $('.gf-lim-tab');
    if (!LIM) { corpo.textContent = ''; return; }
    const { f, a, tipo } = LIM, F = Expr.formatar, lado = LIM.lado;
    let cab, linhasT = [];
    if (tipo === 'valor') {
      const esq = lado !== 'dir', dir = lado !== 'esq';
      cab = (esq ? '<th scope="col">x → a⁻</th><th scope="col">f(x)</th>' : '') + (dir ? '<th scope="col">x → a⁺</th><th scope="col">f(x)</th>' : '');
      for (let k = 0; k <= 5; k++) {
        const h = Math.pow(10, -k);
        linhasT.push((esq ? '<td>' + F(a - h) + '</td><td>' + F(f(a - h)) + '</td>' : '') + (dir ? '<td>' + F(a + h) + '</td><td>' + F(f(a + h)) + '</td>' : ''));
      }
    } else {
      const s = Math.sign(a);
      cab = '<th scope="col">x</th><th scope="col">f(x)</th>';
      for (let k = 1; k <= 6; k++) linhasT.push('<td>' + F(s * Math.pow(10, k)) + '</td><td>' + F(f(s * Math.pow(10, k))) + '</td>');
    }
    corpo.innerHTML = '<table><caption>Valores de f perto do ponto</caption><thead><tr>' + cab + '</tr></thead><tbody>' +
      linhasT.map(t => '<tr>' + t + '</tr>').join('') + '</tbody></table>';
  }

  function calcDerivada(lf) {
    let x0;
    try { x0 = Expr.constante(A.dx0); }
    catch (e) { resultado(null, 'x₀: ' + (e.amigavel ? e.message : 'não consegui ler.')); return; }
    if (!Number.isFinite(x0)) { resultado(null, 'x₀ precisa ser um número.'); return; }
    const f = lf.c.fx, nf = lf.nome, y0 = f(x0);
    R = { lf, lg: null, f, g: () => 0, lo: x0, hi: x0, deriv: A.d1, deriv2: A.d2, pts: [] };
    if (!Number.isFinite(y0)) { resultado(null, nf + ' não está definida em x = ' + Expr.formatar(x0) + '.'); return; }
    const m = Expr.derivada(f, x0), h = Math.pow(10, -A.dk), y1 = f(x0 + h);
    DER = { lf, f, x0, y0, m, h, y1, ms: (y1 - y0) / h };
    const itens = [[nf + '(x₀)', y0], [nf + '′(x₀): inclinação', m]];
    if (Number.isFinite(m)) itens.push(['Reta tangente', reta(m, y0 - m * x0)]);
    itens.push([nf + '″(x₀)', Expr.derivada2(f, x0)]);
    if (A.dsec) itens.push(['Inclinação da secante', DER.ms]);
    if (Number.isFinite(m)) itens.push(['Comportamento', Math.abs(m) < 1e-4 ? 'ponto crítico (f′ = 0)' : m > 0 ? 'crescente' : 'decrescente']);
    resultado(itens);
  }

  const NOMES_SEC = { quad: 'quadrados', semi: 'semicírculos', tri: 'triângulos equiláteros' };
  const secArea = (s, tipo) => (tipo === 'semi' ? Math.PI * s * s / 8 : tipo === 'tri' ? Math.sqrt(3) / 4 * s * s : s * s);
  const kDoEixo = () => (A.eixo === 'h' || A.eixo === 'v' ? Expr.constante(A.ek) : 0);

  function calcIntegral(lf) {
    const solido = modo === 'solido', tipo3 = solido ? A.tipo3 : null, sup = tipo3 === 'sup';
    const lg = A.contra === 'eixo' || sup ? null : linhas.find(l => l.nome === A.contra && l.tipo === 'y' && l.c.fx);
    let a, b, kk = 0;
    try { a = Expr.constante(A.a); b = Expr.constante(A.b); if (solido) kk = kDoEixo(); }
    catch (e) { resultado(null, 'Valor inválido: ' + (e.amigavel ? e.message : 'não consegui ler.')); return; }
    if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(kk)) { resultado(null, 'Os limites e o valor de k precisam ser números.'); return; }
    const lo = Math.min(a, b), hi = Math.max(a, b);
    const f = lf.c.fx, g = lg ? lg.c.fx : () => 0, nf = lf.nome, ng = lg ? lg.nome : '0';
    const integral = modo === 'integral', horiz = A.eixo === 'x' || A.eixo === 'h';
    R = { lf, lg, f, g, lo, hi, n: A.n, metodo: integral ? A.metodo : 'nenhum', sombra: integral ? A.sombra : !sup, pts: [], kk, horiz, tipo3, sec: A.sec };

    const I = fn => Expr.integrar(fn, lo, hi);
    const poligonal = peso => {
      let t = 0, xa = lo, ya = f(lo);
      for (let i = 1; i <= 6000; i++) { const xb = lo + (hi - lo) * i / 6000, yb = f(xb); t += peso(xa, ya, xb, yb); xa = xb; ya = yb; }
      return t;
    };
    // arco e superfície somam segmentos finos (troncos de cone): não dependem da derivada, que falha onde a tangente é vertical
    const arco = poligonal((xa, ya, xb, yb) => Math.hypot(xb - xa, yb - ya));
    let itens, nota = '';
    if (integral) {
      const dif = lg ? '(' + nf + ' − ' + ng + ')' : nf;
      itens = [['∫ ' + dif + ' dx', I(x => f(x) - g(x))], ['Área', I(x => Math.abs(f(x) - g(x)))]];
      if (!lg) itens.push(['Valor médio', lo === hi ? NaN : I(f) / (hi - lo)]);
      if (!lg && A.metodo !== 'nenhum') {
        const h = (hi - lo) / A.n, desloc = A.metodo === 'esq' ? 0 : A.metodo === 'dir' ? 1 : 0.5;
        let soma = 0;
        for (let i = 0; i < A.n; i++) soma += f(lo + (i + desloc) * h) * h;
        itens.push(['Soma de Riemann', soma], ['Erro', Math.abs(soma - I(f))]);
      }
      if (!lg) itens.push(['Comprimento do arco', arco]);
    } else if (tipo3 === 'rev') {
      let anel = false;
      for (let k = 0; k <= 200 && horiz; k++) if (raios(lo + (hi - lo) * k / 200)[1] > 1e-9) { anel = true; break; }
      R.anel = anel;
      if (horiz) {
        R.valor = Math.PI * I(x => { const [Re, ri] = raios(x); return Re * Re - ri * ri; });
        itens = [[anel ? 'Volume (anéis)' : 'Volume (discos)', R.valor]];
      } else {
        R.valor = 2 * Math.PI * I(x => Math.abs(x - kk) * Math.abs(f(x) - g(x)));
        itens = [['Volume (cascas)', R.valor]];
        if (kk > lo && kk < hi) nota = 'A reta x = ' + Expr.formatar(kk) + ' passa por dentro da região: as cascas dos dois lados se sobrepõem e o volume não vale. Use uma região de um lado só da reta.';
      }
    } else if (tipo3 === 'sec') {
      R.valor = I(x => secArea(Math.abs(f(x) - g(x)), A.sec));
      itens = [['Volume (cortes: ' + NOMES_SEC[A.sec] + ')', R.valor], ['Área da base', I(x => Math.abs(f(x) - g(x)))]];
    } else {
      R.valor = poligonal((xa, ya, xb, yb) => Math.PI * (raioSup(xa, ya) + raioSup(xb, yb)) * Math.hypot(xb - xa, yb - ya));
      itens = [['Área de superfície', R.valor], ['Comprimento da curva', arco]];
    }
    resultado(itens, null, nota);
    if (solido) { atualizarPassos(); if (modo3d) sincronizar3d(); }
  }

  /* distância da curva ao eixo de giro (raio da faixa da superfície) */
  function raioSup(x, y) {
    return R.horiz ? Math.abs((y === undefined ? R.f(x) : y) - R.kk) : Math.abs(x - R.kk);
  }

  /** Raios externo e interno do giro em torno de uma reta horizontal: anel se f e g ficam do mesmo lado da reta, disco se não. */
  function raios(x) {
    const yf = R.f(x) - R.kk, yg = R.g(x) - R.kk, a = Math.abs(yf), b = Math.abs(yg);
    return yf * yg > 0 ? [Math.max(a, b), Math.min(a, b)] : [Math.max(a, b), 0];
  }

  /**
   * O "elemento" do cálculo: a i-ésima de n fatias finas da região, com tudo que a fórmula usa.
   * Serve ao desenho 2D, ao sólido 3D e ao passo a passo.
   */
  function fatia(i, n = s3.n) {
    if (!R || !R.tipo3) return null;
    const w = (R.hi - R.lo) / n, xa = R.lo + w * i, xb = xa + w, xm = xa + w / 2, F = Expr.formatar;
    const yf = R.f(xm), yg = R.g(xm), o = { i, n, w, xa, xb, xm, yf, yg, ok: false, d: NaN, texto: '' };
    if (R.tipo3 === 'sup') {
      const ya = R.f(xa), yb = R.f(xb), ra = raioSup(xa, ya), rb = raioSup(xb, yb);
      o.ds = Math.hypot(w, yb - ya);
      o.r = (ra + rb) / 2;
      o.d = Math.PI * (ra + rb) * o.ds;   // área do tronco de cone
      o.ok = Number.isFinite(o.d);
      o.texto = 'faixa · raio médio ' + F(o.r) + ' · comprimento ' + F(o.ds) + ' · área 2π·r·ds = ' + F(o.d);
    } else if (!Number.isFinite(yf) || !Number.isFinite(yg)) {
      return o;
    } else if (R.tipo3 === 'sec') {
      o.s = Math.abs(yf - yg);
      o.area = secArea(o.s, R.sec);
      o.d = o.area * w;
      o.ok = true;
      o.texto = 'corte · base s = ' + F(o.s) + ' · área ' + F(o.area);
    } else if (R.horiz) {
      const [Re, ri] = raios(xm);
      o.R = Re; o.r = ri;
      o.area = Math.PI * (Re * Re - ri * ri);
      o.d = o.area * w;
      o.ok = Number.isFinite(o.d);
      o.texto = (ri > 0 ? 'anel' : 'disco') + ' · R = ' + F(Re) + (ri > 0 ? ' · r = ' + F(ri) : '') + ' · área π(R² − r²) = ' + F(o.area);
    } else {
      o.rho = Math.abs(xm - R.kk); o.h = Math.abs(yf - yg);
      o.area = 2 * Math.PI * o.rho * o.h;
      o.d = o.area * w;
      o.ok = Number.isFinite(o.d);
      o.texto = 'casca · raio ' + F(o.rho) + ' · altura ' + F(o.h) + ' · área 2π·raio·altura = ' + F(o.area);
    }
    return o;
  }

  /* painel "Como se calcula": passo a passo da conta, com os números do elemento escolhido */
  function atualizarPassos() {
    const corpo = $('.gf-passos-corpo');
    corpo.textContent = '';
    if (modo !== 'solido' || !R || !R.tipo3) return;
    const F = Expr.formatar, { lf, lg, lo, hi, kk, horiz, tipo3 } = R, nf = lf.nome, ng = lg ? lg.nome : '0', gx = lg ? ng + '(x)' : '0';
    const e = fatia(limitar(s3.sel, 1, s3.n) - 1);
    const eixoNome = A.eixo === 'x' ? 'o eixo x' : A.eixo === 'y' ? 'o eixo y' : A.eixo === 'h' ? 'a reta y = ' + F(kk) : 'a reta x = ' + F(kk);
    const reg = lg ? 'a região entre ' + nf + '(x) = ' + lf.f + ' e ' + ng + '(x) = ' + lg.f : 'a região entre ' + nf + '(x) = ' + lf.f + ' e o eixo x';
    const dist = c => '|' + c + (kk === 0 ? '' : kk < 0 ? ' + ' + F(-kk) : ' − ' + F(kk)) + '|';
    const de = 'de x = ' + F(lo) + ' até x = ' + F(hi);
    let passos, formula;
    if (tipo3 === 'rev' && horiz) {
      passos = [
        'Gire ' + reg + ', ' + de + ', em torno d' + eixoNome.replace(/^o /, 'o ').replace(/^a /, 'a ') + '.',
        'Corte a região em fatias finas, perpendiculares ao eixo de giro. Cada fatia, ao girar, vira ' + (R.anel ? 'um anel (a arruela, com um buraco no meio)' : 'um disco') + '.',
        'R(x) é a distância do eixo até a curva mais afastada: ' + dist(nf + '(x)') + ' ou ' + dist(gx) + '. r(x) é até a mais próxima (r = 0 quando a região encosta no eixo: aí a fatia é um disco).',
        'Área da fatia: A(x) = π·R(x)² − π·r(x)². Volume da fatia: A(x)·dx.'
      ];
      formula = 'V = π ∫ [R(x)² − r(x)²] dx = ' + F(R.valor);
    } else if (tipo3 === 'rev') {
      passos = [
        'Gire ' + reg + ', ' + de + ', em torno d' + eixoNome + '.',
        'Corte a região em tiras finas, paralelas ao eixo de giro. Cada tira, ao girar, vira uma casca cilíndrica.',
        'Raio da casca: ρ(x) = |x' + (kk === 0 ? '' : kk < 0 ? ' + ' + F(-kk) : ' − ' + F(kk)) + '| (distância da tira ao eixo). Altura: h(x) = |' + nf + '(x) − ' + gx + '|.',
        'Abrindo a casca, ela vira um retângulo de base 2π·ρ e altura h. Volume da casca: 2π·ρ·h·dx.'
      ];
      formula = 'V = 2π ∫ ρ(x)·h(x) dx = ' + F(R.valor);
    } else if (tipo3 === 'sec') {
      const forma = { quad: 'um quadrado', semi: 'um semicírculo', tri: 'um triângulo equilátero' }[R.sec], lado = R.sec === 'semi' ? 'diâmetro' : 'lado';
      passos = [
        reg.charAt(0).toUpperCase() + reg.slice(1) + ', ' + de + ', é a BASE do sólido (ela não gira).',
        'Em cada x, um corte perpendicular ao eixo x é ' + forma + ' apoiado na base, com ' + lado + ' s(x) = |' + nf + '(x) − ' + gx + '|.',
        'Área do corte: A(x) = ' + (R.sec === 'semi' ? 'π·s²/8' : R.sec === 'tri' ? '(√3/4)·s²' : 's²') + '. Volume da fatia: A(x)·dx.'
      ];
      formula = 'V = ∫ A(x) dx = ' + F(R.valor);
    } else {
      passos = [
        'Só a curva y = ' + lf.f + ', ' + de + ', gira em torno d' + eixoNome + '. A superfície é a "casca" do sólido, sem as tampas.',
        'Um pedacinho da curva tem comprimento ds = √(1 + ' + nf + '′(x)²)·dx. Ao girar, vira uma faixa estreita de raio r(x) = ' + (horiz ? dist(nf + '(x)') : dist('x')) + '.',
        'Área da faixa = comprimento da circunferência × ds = 2π·r·ds.'
      ];
      formula = 'S = 2π ∫ r(x)·√(1 + ' + nf + '′(x)²) dx = ' + F(R.valor);
    }
    const ol = document.createElement('ol');
    ol.className = 'gf-passos-lista';
    passos.forEach(t => { const li = document.createElement('li'); li.textContent = t; ol.append(li); });
    const fm = document.createElement('p');
    fm.className = 'gf-formula';
    fm.textContent = formula;
    corpo.append(ol, fm);
    if (e && e.ok) {
      const p = document.createElement('p');
      p.className = 'gf-elem';
      p.textContent = (tipo3 === 'sup' ? 'Faixa ' : 'Fatia ') + (e.i + 1) + ' de ' + e.n + ' (x = ' + F(e.xm) + '): ' + e.texto + '. ' +
        (tipo3 === 'sup' ? 'Soma de todas as faixas ≈ ' : 'Soma de todas as fatias ≈ ') + F(somaFatias()) + '.';
      corpo.append(p);
    }
  }

  const somaFatias = () => { let t = 0; for (let i = 0; i < s3.n; i++) { const o = fatia(i); if (o && o.ok) t += o.d; } return t; };

  /* pontos de interesse na janela: onde as curvas se encontram (integral) ou onde f′ = 0 (derivada); clique para usar */
  function atualizarPontos() {
    const crit = modo === 'derivada', caixa = $('[data-pts=' + (crit ? 'crit' : 'int') + ']');
    $$('[data-pts]').forEach(c => { if (c !== caixa) c.hidden = true; });
    if (!R || !vista || modo === 'funcoes' || modo === 'limite') { caixa.hidden = true; R && (R.pts = []); return; }
    const centro = (ix(0) + ix(L)) / 2;
    const achados = crit ? Expr.raizes(x => Expr.derivada(R.f, x), ix(0), ix(L)) : Expr.raizes(x => R.f(x) - R.g(x), ix(0), ix(L));
    R.pts = achados.sort((p, q) => Math.abs(p - centro) - Math.abs(q - centro)).slice(0, 8).sort((p, q) => p - q);
    const sig = R.pts.map(x => x.toPrecision(8)).join() + A.contra + A.linha + modo;
    caixa.hidden = !R.pts.length;
    if (caixa.dataset.sig === sig) return;
    caixa.dataset.sig = sig;
    $('.gf-pontos-t', caixa).textContent = crit ? 'Pontos críticos de ' + R.lf.nome + ' (f′ = 0)' : R.lg ? R.lf.nome + ' e ' + R.lg.nome + ' se cruzam em' : 'Raízes de ' + R.lf.nome;
    const chips = $('.gf-chips', caixa);
    chips.innerHTML = '';
    R.pts.forEach(x => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'gf-chip';
      b.textContent = 'x = ' + Expr.formatar(x);
      b.dataset.x = String(+x.toPrecision(12));
      b.title = crit ? 'Mover o ponto para cá' : 'Usar como limite (alterna a e b)';
      chips.append(b);
    });
  }

  $$('.gf-pontos').forEach(caixa => caixa.addEventListener('click', e => {
    const b = e.target.closest('[data-x]');
    if (!b) return;
    if (modo === 'derivada') { A.dx0 = b.dataset.x; $('[data-a=dx0]').value = A.dx0; }
    else {
      A[proxLimite] = b.dataset.x;
      $('[data-a=' + proxLimite + ']').value = A[proxLimite];
      proxLimite = proxLimite === 'a' ? 'b' : 'a';
    }
    calcular();
    pedir();
    adiarSalvar();
  }));

  /* animação da secante: h vai diminuindo até quase zero */
  let tSec = 0;
  function pararSecante() { animSec = false; const b = $('[data-acao=secante]'); b.setAttribute('aria-pressed', 'false'); b.textContent = '▶'; }
  function quadroSecante(t) {
    if (!animSec) { tSec = 0; return; }
    const dt = tSec ? Math.min(0.05, (t - tSec) / 1000) : 0;
    tSec = t;
    A.dk = Math.min(3.5, A.dk + 0.7 * dt);
    $('[data-a=dk]').value = A.dk;
    if (A.dk >= 3.5) pararSecante();
    atualizarSaidas();
    calcular();
    pedir();
    adiarSalvar();
    if (animSec) requestAnimationFrame(quadroSecante);
  }

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
    g2.font = (proj ? 15 : 11) + 'px ui-monospace, SFMono-Regular, Menlo, monospace';
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
    g2.lineWidth = 2.5 * esp();
    g2.lineJoin = g2.lineCap = 'round';
    tracar(l.segs);
  }

  const aux = i => (i === (DER || R || { lf: { cor: -1 } }).lf.cor ? cores.curvas[5] : cores.curvas[i]);

  function desenharDerivada() {
    if (!R) return;
    g2.lineWidth = 2 * esp();
    if (R.deriv) {
      g2.strokeStyle = aux(2);
      g2.setLineDash([7, 5]);
      tracar(amostrarY(x => Expr.derivada(R.f, x)));
    }
    if (R.deriv2) {
      g2.strokeStyle = aux(4);
      g2.setLineDash([2, 5]);
      tracar(amostrarY(x => Expr.derivada2(R.f, x)));
    }
    g2.setLineDash([]);
  }

  function anel(x, y, cor, raio = 6) {
    g2.fillStyle = cor;
    g2.strokeStyle = cores.fundo;
    g2.lineWidth = 3;
    g2.beginPath();
    g2.arc(x, y, raio * esp(), 0, 2 * Math.PI);
    g2.stroke();
    g2.fill();
  }

  function retaNaTela(y0, m, x0, cor, larg, tracejada) {
    g2.strokeStyle = cor;
    g2.lineWidth = larg * esp();
    g2.setLineDash(tracejada || []);
    g2.beginPath();
    g2.moveTo(0, py(y0 + m * (ix(0) - x0)));
    g2.lineTo(L, py(y0 + m * (ix(L) - x0)));
    g2.stroke();
    g2.setLineDash([]);
  }

  /* ponto sobre a curva, reta tangente e (se ligada) a secante com o triângulo de h */
  function desenharTangente() {
    const leitura = $('.gf-leitura');
    if (!DER) { leitura.textContent = ''; return; }
    const { x0, y0, m, h, y1 } = DER, F = Expr.formatar;
    if (A.dtan && Number.isFinite(m)) retaNaTela(y0, m, x0, aux(1), 2.5);
    if (A.dsec && Number.isFinite(y1)) {
      retaNaTela(y0, DER.ms, x0, aux(3), 2, [8, 5]);
      g2.strokeStyle = aux(3);
      g2.lineWidth = 1.2 * esp();
      g2.setLineDash([3, 4]);
      g2.beginPath();
      g2.moveTo(px(x0), py(y0));
      g2.lineTo(px(x0 + h), py(y0));
      g2.lineTo(px(x0 + h), py(y1));
      g2.stroke();
      g2.setLineDash([]);
      anel(px(x0 + h), py(y1), aux(3), 5);
    }
    anel(px(x0), py(y0), cores.curvas[DER.lf.cor], 7);
    leitura.textContent = DER.lf.nome + '(' + F(x0) + ') = ' + F(y0) + '  ·  ' + DER.lf.nome + '′(' + F(x0) + ') = ' + F(m) +
      (A.dsec ? '  ·  secante: ' + F(DER.ms) : '');
  }

  /* sólidos (desenho 2D): o eixo de giro e o elemento da conta, com R, r, h ou ds marcados */
  function desenharElemento() {
    const leitura = $('.gf-leitura');
    if (!R || !R.tipo3) { leitura.textContent = ''; return; }
    const { kk, horiz, tipo3 } = R, cor = cores.ac, e = fatia(limitar(s3.sel, 1, s3.n) - 1), F = Expr.formatar;
    g2.font = (proj ? 16 : 13) + 'px ui-monospace, SFMono-Regular, Menlo, monospace';
    g2.textAlign = 'left';
    g2.lineJoin = 'round';
    const texto = (t, x, y) => { g2.lineWidth = 3; g2.strokeStyle = cores.fundo; g2.fillStyle = cor; rotular(t, x, y); };
    const seg = (x0, y0, x1, y1, larg, tracejado) => {
      g2.strokeStyle = cor;
      g2.lineWidth = larg * esp();
      g2.setLineDash(tracejado || []);
      g2.beginPath();
      g2.moveTo(x0, y0);
      g2.lineTo(x1, y1);
      g2.stroke();
      g2.setLineDash([]);
    };
    if (tipo3 !== 'sec') {   // eixo de giro
      if (horiz) { seg(0, py(kk), L, py(kk), 2, [10, 6]); texto('eixo de giro', 8, py(kk) - 8); }
      else { seg(px(kk), 0, px(kk), Alt, 2, [10, 6]); texto('eixo de giro', px(kk) + 8, 18); }
    }
    if (!e || !e.ok) { leitura.textContent = ''; return; }
    const X0 = px(e.xa), X1 = px(e.xb), XM = px(e.xm), larg = Math.max(X1 - X0, 3);
    if (tipo3 === 'sup') {
      g2.beginPath();
      for (let k = 0; k <= 12; k++) { const x = e.xa + (e.xb - e.xa) * k / 12; (k ? g2.lineTo : g2.moveTo).call(g2, px(x), py(R.f(x))); }
      g2.strokeStyle = cor;
      g2.lineWidth = 6 * esp();
      g2.stroke();
      const ym = R.f(e.xm);
      if (horiz) seg(XM, py(kk), XM, py(ym), 2, [4, 4]); else seg(px(kk), py(ym), XM, py(ym), 2, [4, 4]);
      texto('r', horiz ? XM + 6 : (px(kk) + XM) / 2, horiz ? (py(kk) + py(ym)) / 2 : py(ym) - 7);
      texto('ds', XM + 8, py(ym) - 10);
    } else {
      const yt = Math.min(py(e.yf), py(e.yg)), yb = Math.max(py(e.yf), py(e.yg));
      g2.fillStyle = cor;
      g2.globalAlpha = 0.35;
      g2.fillRect(X0, yt, larg, yb - yt);
      g2.globalAlpha = 1;
      g2.strokeStyle = cor;
      g2.lineWidth = 1.5 * esp();
      g2.strokeRect(X0 + 0.5, yt, larg, yb - yt);
      if (tipo3 === 'sec') texto('s', XM + larg / 2 + 6, (yt + yb) / 2 + 4);
      else if (horiz) {
        const longe = Math.abs(e.yf - kk) >= Math.abs(e.yg - kk) ? e.yf : e.yg, perto = longe === e.yf ? e.yg : e.yf;
        seg(XM, py(kk), XM, py(longe), 2.5);
        texto('R', XM + 6, (py(kk) + py(longe)) / 2);
        if (e.r > 0) { seg(XM - 4, py(kk), XM - 4, py(perto), 2.5, [4, 3]); texto('r', XM - 18, (py(kk) + py(perto)) / 2); }
      } else {
        const ym = (e.yf + e.yg) / 2;
        seg(px(kk), py(ym), XM, py(ym), 2.5);
        texto('ρ', (px(kk) + XM) / 2, py(ym) - 7);
        texto('h', XM + larg / 2 + 6, (yt + yb) / 2 + 4);
      }
    }
    leitura.textContent = (tipo3 === 'sup' ? 'Faixa ' : 'Fatia ') + (e.i + 1) + ' de ' + e.n + ': ' + e.texto + '. Toque no gráfico para escolher outra.';
  }

  /* limite: guias do ponto a, valor para onde f vai e as sondas x = a ± h */
  function desenharLimite() {
    const leitura = $('.gf-leitura');
    if (!LIM) { leitura.textContent = ''; return; }
    const { f, a, h, tipo, lf } = LIM, cor = cores.curvas[lf.cor], F = Expr.formatar;
    g2.setLineDash([6, 5]);
    g2.lineWidth = 1.5 * esp();
    g2.strokeStyle = cores.mute;
    if (tipo === 'valor') { g2.beginPath(); g2.moveTo(px(a), 0); g2.lineTo(px(a), Alt); g2.stroke(); }
    LIM.alvos.forEach(r => {
      g2.strokeStyle = cor;
      g2.beginPath();
      g2.moveTo(0, py(r.v));
      g2.lineTo(L, py(r.v));
      g2.stroke();
    });
    g2.setLineDash([]);
    g2.font = (proj ? 16 : 13) + 'px ui-monospace, SFMono-Regular, Menlo, monospace';
    g2.textAlign = 'right';
    g2.strokeStyle = cores.fundo;
    g2.lineWidth = 3;
    g2.fillStyle = cor;
    LIM.alvos.forEach(r => rotular('L = ' + F(r.v), L - 8, py(r.v) - 7));
    if (tipo === 'valor') {   // círculo vazio: o limite não depende de f(a) existir
      g2.lineWidth = 2.5 * esp();
      g2.strokeStyle = cor;
      g2.fillStyle = cores.fundo;
      LIM.alvos.forEach(r => {
        g2.beginPath();
        g2.arc(px(a), py(r.v), 6 * esp(), 0, 2 * Math.PI);
        g2.fill();
        g2.stroke();
      });
    }
    if (tipo === 'valor') {
      const fa = f(a);
      if (Number.isFinite(fa)) anel(px(a), py(fa), cores.txt, 5);
    }
    const sondas = tipo === 'valor'
      ? [LIM.lado !== 'dir' ? a - h : null, LIM.lado !== 'esq' ? a + h : null].filter(v => v !== null)
      : [Math.sign(a) * h];
    const partes = [];
    sondas.forEach(x => {
      const y = f(x);
      partes.push('x = ' + F(x) + ' → f = ' + F(y));
      if (!Number.isFinite(y)) return;
      g2.strokeStyle = cor;
      g2.lineWidth = 1.2 * esp();
      g2.setLineDash([3, 4]);
      g2.beginPath();
      g2.moveTo(px(x), Math.min(Math.max(py(0), 0), Alt));
      g2.lineTo(px(x), py(y));
      g2.lineTo(Math.min(Math.max(px(0), 0), L), py(y));
      g2.stroke();
      g2.setLineDash([]);
      anel(px(x), py(y), cor, 6);
    });
    leitura.textContent = partes.join('  ·  ');
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
    const corpo = $('.gf-tab-vals .gf-tab-corpo'), ys = linhas.filter(l => l.tipo === 'y' && l.vis && l.c.fx);
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
    if (modo === 'integral' || modo === 'solido') desenharRegiao();
    linhas.forEach(desenharCurva);
    if (modo === 'derivada') { desenharDerivada(); desenharTangente(); }
    if (modo === 'solido') desenharElemento();
    if (modo === 'limite') desenharLimite();
    if (modo === 'derivada' || modo === 'integral' || modo === 'solido') desenharPontos();
    if (modo === 'funcoes' || modo === 'integral') desenharTraco();
    if (modo === 'derivada') sincX0();
    const desc = descrever();
    if (cv.getAttribute('aria-label') !== desc) cv.setAttribute('aria-label', desc);
    if ($('.gf-tab-vals').open) atualizarTabela();
  }

  /* o controle deslizante de x₀ acompanha a janela e o ponto */
  function sincX0() {
    const r = $('[data-a=dx0r]'), t = $('[data-a=dx0]');
    if (!DER) return;
    const lo = Math.min(ix(0), DER.x0), hi = Math.max(ix(L), DER.x0);
    r.min = +lo.toPrecision(6); r.max = +hi.toPrecision(6); r.step = (hi - lo) / 500;
    if (document.activeElement !== r) r.value = DER.x0;
    if (document.activeElement !== t) t.value = A.dx0;
  }

  const pedir = () => { if (!pedido) pedido = requestAnimationFrame(desenhar); };
  $('.gf-tab-vals').addEventListener('toggle', pedir);

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

  /* tocar no gráfico escolhe x₀ (derivada) ou o ponto a (limite), arredondado para um valor fácil de ler */
  function escolherPonto(X, fino) {
    const d = passo(vista.sx) / (modo === 'derivada' ? (fino ? 50 : 10) : 2);
    const x = +(Math.round(ix(X) / d) * d).toPrecision(8);
    if (modo === 'derivada') A.dx0 = String(x); else { A.ltipo = 'valor'; A.la = String(x); }
    escreverA();
    calcular();
    pedir();
    adiarSalvar();
  }

  /* no desenho 2D dos sólidos, tocar escolhe qual fatia aparece destacada */
  function escolherFatia(X) {
    const i = Math.floor((ix(X) - R.lo) / ((R.hi - R.lo) / s3.n));
    s3.sel = limitar(i + 1, 1, s3.n);
    sincronizar3d();
    pedir();
  }

  const toques = new Map();
  let movido = 0, pinca = null;
  const posicao = (e, el = cv) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

  cv.addEventListener('pointerdown', e => {
    cv.setPointerCapture(e.pointerId);
    const pos = posicao(e);
    toques.set(e.pointerId, pos);
    movido = 0;
    pinca = null;
    // na aba Derivadas, pegar o ponto da curva e arrastar move x₀ em vez de mover o gráfico
    if (modo === 'derivada' && DER && Math.hypot(px(DER.x0) - pos.x, py(DER.y0) - pos.y) < 26) arrasto = e.pointerId;
    cv.classList.add('is-arrastando');
  });
  cv.addEventListener('pointermove', e => {
    const p = posicao(e), ant = toques.get(e.pointerId);
    if (!ant) { if (e.pointerType === 'mouse') { traco = p; pedir(); } return; }
    toques.set(e.pointerId, p);
    if (arrasto === e.pointerId) { movido += 10; escolherPonto(p.x, true); return; }
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
    if (toque && toques.size === 1 && movido < 6) {
      if (modo === 'solido' && R && R.tipo3) escolherFatia(posicao(e).x);
      else if (modo === 'derivada' || modo === 'limite') escolherPonto(posicao(e).x);
      else { traco = posicao(e); pedir(); }
    }
    if (arrasto === e.pointerId) arrasto = null;
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
  let modo3d = false;
  /* Nível de detalhe: enquanto a pessoa arrasta, dá zoom ou o giro anima, as faces angulares vizinhas são
     juntadas (menos caminhos no canvas: era a rasterização de milhares de polígonos que travava o celular).
     Parou há ~170 ms: redesenha em qualidade total, idêntica à de antes. */
  const SALTO_RAPIDO = 4;   // divide PASSOS
  let rapidoAte = 0, tRapido = 0;
  const rapido3 = () => {
    rapidoAte = performance.now() + 150;
    clearTimeout(tRapido);
    tRapido = setTimeout(() => pedir(), 170);
  };

  function rgb(hex) {
    const m = /^#([0-9a-f]{6})$/i.exec(hex.trim()), n = m ? parseInt(m[1], 16) : 0x888888;
    return [n >> 16, (n >> 8) & 255, n & 255];
  }

  /**
   * Monta o sólido a partir de peças. Revolução e superfície: perfis (curvas no plano da região) que giram em torno do eixo.
   * Seções: polígonos fixos (os cortes) ligados de um x ao próximo. As "seções" da malha são a região em si, mostrada nas bordas do giro.
   */
  function montarMalha() {
    malha = null;
    if (!R || !R.tipo3) return;
    const { f, g, lo, hi, kk, horiz, tipo3 } = R, fatias = s3.modo === 'fatias';
    const n = fatias ? s3.n : tipo3 === 'sup' ? 80 : 40, w = (hi - lo) / n, d = 2 * Math.PI / PASSOS;
    const pecas = [], secoes = [], solidas = [], info = [];
    let vN = 0;
    const finito = p => Number.isFinite(p[0]) && Number.isFinite(p[1]);
    const peca = (pl, i, k = 'ext') => {
      let trecho = [];
      pl.concat([[NaN, NaN]]).forEach(p => {
        if (finito(p)) trecho.push(p);
        else { if (trecho.length > 1) pecas.push({ pl: trecho, i, k }); trecho = []; }
      });
    };
    const secao = (poly, i) => { if (poly.every(finito)) secoes.push({ poly, i }); };
    const lado = (x, y) => [x, y];
    // se a região fica abaixo da reta de giro, o giro começa por baixo: o sólido é o mesmo, mas a região "girando" fica fiel
    const meio = (lo + hi) / 2, sg = (f(meio) + g(meio)) / 2 - kk < 0 ? -1 : 1;

    if (fatias) for (let i = 0; i < n; i++) { const o = fatia(i, n); info[i] = o; if (o && o.ok) vN += o.d; }

    if (tipo3 === 'sec') {
      const M = 14;
      const poly = x => {
        const yf = f(x), yg = g(x);
        if (!Number.isFinite(yf) || !Number.isFinite(yg)) return null;
        const y0 = Math.min(yf, yg), y1 = Math.max(yf, yg), s = y1 - y0, yc = (y0 + y1) / 2;
        if (R.sec === 'semi') return Array.from({ length: M + 1 }, (_, k) => { const t = Math.PI * k / M; return [yc + s / 2 * Math.cos(t), s / 2 * Math.sin(t)]; });
        if (R.sec === 'tri') return [[y0, 0], [y1, 0], [yc, s * Math.sqrt(3) / 2]];
        return [[y0, 0], [y1, 0], [y1, s], [y0, s]];
      };
      const P3 = (x, q) => [x, q[0], q[1]];
      const tampa = (x, pl, i) => {
        const c = pl.reduce((t, q) => [t[0] + q[0] / pl.length, t[1] + q[1] / pl.length], [0, 0]);
        pl.forEach((q, k) => solidas.push({ p: [P3(x, c), P3(x, q), P3(x, pl[(k + 1) % pl.length])], i, k: 'tampa' }));
      };
      const bloco = (xa, pa, xb, pb, i) => {
        pa.forEach((q, k) => { const k2 = (k + 1) % pa.length; solidas.push({ p: [P3(xa, q), P3(xa, pa[k2]), P3(xb, pb[k2]), P3(xb, pb[k])], i, k: 'ext' }); });
      };
      if (fatias) {
        for (let i = 0; i < n; i++) {
          const xm = lo + w * (i + 0.5), xa = xm - w * FOLGA / 2, xb = xm + w * FOLGA / 2, p = poly(xm);
          if (!p) continue;
          bloco(xa, p, xb, p, i);
          tampa(xa, p, i);
          tampa(xb, p, i);
        }
      } else {
        const xs = Array.from({ length: n + 1 }, (_, k) => lo + w * k), ps = xs.map(poly);
        for (let k = 0; k < n; k++) if (ps[k] && ps[k + 1]) bloco(xs[k], ps[k], xs[k + 1], ps[k + 1], -1);
        if (ps[0]) tampa(xs[0], ps[0], -1);
        if (ps[n]) tampa(xs[n], ps[n], -1);
      }
    } else if (tipo3 === 'sup') {
      const perfil = x => lado(x, R.horiz ? Math.abs(f(x) - kk) : f(x));
      if (!fatias) peca(Array.from({ length: n + 1 }, (_, k) => perfil(lo + w * k)), -1);
      else for (let i = 0; i < n; i++) {
        const xm = lo + w * (i + 0.5);
        peca([perfil(xm - w * FOLGA / 2), perfil(xm + w * FOLGA / 2)], i);
      }
    } else if (!fatias) {
      const xs = Array.from({ length: n + 1 }, (_, k) => lo + w * k);
      const topo = xs.map(x => (horiz ? [x, raios(x)[0]] : [x, f(x)])), base = xs.map(x => (horiz ? [x, raios(x)[1]] : [x, g(x)]));
      peca(topo, -1);
      if (!horiz || base.some(p => p[1] > 1e-9)) peca(base, -1, horiz || R.lg ? 'int' : 'ext');
      [0, n].forEach(k => peca([base[k], topo[k]], -1, 'tampa'));
      for (let k = 0; k < n; k++) secao([base[k], topo[k], topo[k + 1], base[k + 1]], -1);
    } else {
      for (let i = 0; i < n; i++) {
        const xm = lo + w * (i + 0.5), xa = xm - w * FOLGA / 2, xb = xm + w * FOLGA / 2;
        if (horiz) {
          const [Re, ri] = raios(xm);
          if (!Number.isFinite(Re)) continue;
          peca([[xa, Re], [xb, Re]], i);
          peca([[xa, ri], [xa, Re]], i, 'tampa');
          peca([[xb, ri], [xb, Re]], i, 'tampa');
          if (ri > 0) peca([[xa, ri], [xb, ri]], i, 'int');
          secao([[xa, ri], [xa, Re], [xb, Re], [xb, ri]], i);
        } else {
          const yg = g(xm), yf = f(xm);
          if (!Number.isFinite(yg) || !Number.isFinite(yf)) continue;
          peca([[xb, yg], [xb, yf]], i, 'tampa');
          peca([[xa, yg], [xa, yf]], i, 'tampa');
          peca([[xa, yf], [xb, yf]], i);
          peca([[xa, yg], [xb, yg]], i, R.lg ? 'int' : 'ext');
          secao([[xa, yg], [xa, yf], [xb, yf], [xb, yg]], i);
        }
      }
    }
    if (!pecas.length && !solidas.length) return;

    const girar = (u, v, fi) => (horiz ? [u, kk + sg * v * Math.cos(fi), sg * v * Math.sin(fi)] : [kk + (u - kk) * Math.cos(fi), v, (u - kk) * Math.sin(fi)]);
    const faces = [];
    pecas.forEach(({ pl, i, k }) => {
      for (let q = 0; q < pl.length - 1; q++) {
        const a = pl[q], b = pl[q + 1];
        for (let j = 0; j < PASSOS; j++) {
          faces.push({ a, b, j, i, k, p: [girar(a[0], a[1], j * d), girar(b[0], b[1], j * d), girar(b[0], b[1], (j + 1) * d), girar(a[0], a[1], (j + 1) * d)] });
        }
      }
    });
    const pontos = faces.flatMap(fc => fc.p).concat(solidas.flatMap(fc => fc.p));
    const min = [0, 1, 2].map(k => Math.min(...pontos.map(p => p[k]))), max = [0, 1, 2].map(k => Math.max(...pontos.map(p => p[k])));
    const centro = min.map((v, k) => (v + max[k]) / 2);
    malha = { faces, solidas, secoes, girar, d, min, max, centro, vN, info, raio: Math.max(1e-9, Math.hypot(...max.map((v, k) => v - centro[k]))) };
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
    const { horiz, kk, tipo3 } = R, sup = tipo3 === 'sup';
    const base = rgb(cores.curvas[R.lf.cor]), destaque = rgb(cores.ac), luz = [0.35, 0.55, 0.75];
    const interior = base.map((c, k) => c * 0.4 + destaque[k] * 0.6);   // por dentro (buraco, parede interna): outra cor
    const fatias = s3.modo === 'fatias', ang = s3.ang * GRAU, d = malha.d;
    const cheios = Math.floor(ang / d + 1e-9), parcial = ang - cheios * d;

    // eixo de giro, atrás do sólido
    const ponta = sinal => (horiz ? [(sinal < 0 ? malha.min[0] : malha.max[0]) + sinal * malha.raio * 0.25, kk, 0] : [kk, (sinal < 0 ? malha.min[1] : malha.max[1]) + sinal * malha.raio * 0.25, 0]);
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
    // p: vértices; k: 'ext' (por fora), 'int' (parede de dentro), 'tampa' (extremidades); fundoVisto: lado de dentro de uma superfície
    const juntar = (p, i, k, ghost, dentro) => {
      const q = p.map(girado);
      let nx = 0, ny = 0, nz = 0;
      for (let a = 0; a < q.length; a++) {   // normal pelo método de Newell: vale para qualquer polígono
        const u = q[a], v = q[(a + 1) % q.length];
        nx += (u[1] - v[1]) * (u[2] + v[2]);
        ny += (u[2] - v[2]) * (u[0] + v[0]);
        nz += (u[0] - v[0]) * (u[1] + v[1]);
      }
      const m = Math.hypot(nx, ny, nz) || 1;
      const lum = 0.4 + 0.6 * Math.abs((nx * luz[0] + ny * luz[1] + nz * luz[2]) / m);
      const marcada = fatias && i === s3.sel - 1;
      const paleta = marcada ? destaque : k === 'int' || dentro ? interior : base;
      const tom = paleta.map(c => c * lum * (fatias && i % 2 && !marcada ? 0.88 : 1));
      const claro = ghost ? 0.4 : k === 'tampa' ? 0.22 : 0;
      const cor = tom.map(c => Math.round(c + (255 - c) * claro));
      lista.push({ q, z: q.reduce((t, v) => t + v[2], 0) / q.length, cor: 'rgb(' + cor.join(',') + ')' });
    };
    // numa superfície aberta, o lado de dentro é o que está virado para trás
    const eDentro = p => {
      if (!sup) return false;
      const c = [0, 1, 2].map(k => (p[0][k] + p[1][k] + p[2][k] + p[3][k]) / 4);
      const eixoPt = horiz ? [c[0], kk, 0] : [kk, c[1], 0];
      return girado(c)[2] - girado(eixoPt)[2] < 0;
    };
    const salto = s3.tocando || performance.now() < rapidoAte ? SALTO_RAPIDO : 1, fcs = malha.faces;
    for (let ix = 0; ix < fcs.length; ix++) {
      const fc = fcs[ix];
      if (salto > 1 && fc.j % salto === 0 && fc.j + salto <= cheios && ix + salto - 1 < fcs.length && fcs[ix + salto - 1].j === fc.j + salto - 1) {
        // junta 'salto' faces seguidas: A_j…A_(j+salto), depois B_(j+salto)…B_j
        const ult = fcs[ix + salto - 1], poly = [];
        for (let k = 0; k < salto; k++) poly.push(fcs[ix + k].p[0]);
        poly.push(ult.p[3], ult.p[2]);
        for (let k = salto - 1; k >= 0; k--) poly.push(fcs[ix + k].p[1]);
        juntar(poly, fc.i, fc.k, false, eDentro(fc.p));
        ix += salto - 1;
      } else if (fc.j < cheios) juntar(fc.p, fc.i, fc.k, false, eDentro(fc.p));
      else if (fc.j === cheios && parcial > 1e-6) {
        const gi = malha.girar, f0 = cheios * d, pp = [gi(fc.a[0], fc.a[1], f0), gi(fc.b[0], fc.b[1], f0), gi(fc.b[0], fc.b[1], ang), gi(fc.a[0], fc.a[1], ang)];
        juntar(pp, fc.i, fc.k, false, eDentro(pp));
      }
    }
    malha.solidas.forEach(fc => juntar(fc.p, fc.i, fc.k, false, false));
    // a própria região, no começo e no fim do giro: é a função "girando"
    if (s3.ang < 359.99 && tipo3 === 'rev') {
      [0, ang].forEach((fi, k) => {
        if (k && !ang) return;
        malha.secoes.forEach(sc => juntar(sc.poly.map(v => malha.girar(v[0], v[1], fi)), sc.i, 'ext', true, false));
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
      if (salto === 1) g3.stroke();
    });

    const f2 = Expr.formatar;
    g3.fillStyle = cores.txt;
    g3.font = '13px ui-monospace, SFMono-Regular, Menlo, monospace';
    g3.textAlign = 'left';
    g3.fillText(rotuloEixo(), e1[0] + 6, e1[1] + 4);

    const q = sup ? 'S' : 'V', exato = R.valor, unid = sup ? 'faixa' : tipo3 === 'sec' ? 'corte' : 'fatia';
    let texto;
    if (fatias) {
      const inf = malha.info[s3.sel - 1];
      texto = (inf && inf.ok ? unid[0].toUpperCase() + unid.slice(1) + ' ' + s3.sel + ' de ' + s3.n + ' · x = ' + f2(inf.xm) + ' · ' + inf.texto + '. ' : '') +
        'Soma d' + (sup ? 'as faixas' : 'as fatias') + ' = ' + f2(malha.vN) + ' (exato ' + f2(exato) + ')';
    } else if (tipo3 === 'sec') {
      texto = 'Cortes em forma de ' + NOMES_SEC[R.sec] + ' sobre a base: V = ' + f2(exato);
    } else {
      texto = 'Giro de ' + s3.ang + '° em torno ' + (A.eixo === 'x' ? 'do eixo x' : A.eixo === 'y' ? 'do eixo y' : 'da ' + rotuloEixo()) + ': ' + q + ' = ' +
        (Number.isNaN(exato) ? 'sem resultado' : f2(exato * s3.ang / 360)) + (s3.ang < 360 ? ' (volta inteira: ' + f2(exato) + ')' : '');
    }
    leitura.textContent = texto;
    const desc = (sup ? 'Superfície de revolução da curva ' + R.lf.nome : tipo3 === 'sec' ? 'Sólido com cortes em forma de ' + NOMES_SEC[R.sec] + ' sobre a região' : 'Sólido de revolução da região') +
      (sup ? '' : ' entre ' + (R.lg ? R.lf.nome + ' e ' + R.lg.nome : R.lf.nome + ' e o eixo x')) + ' de ' + f2(R.lo) + ' a ' + f2(R.hi) + '. ' + texto + '.';
    if (cv3.getAttribute('aria-label') !== desc) cv3.setAttribute('aria-label', desc);
  }

  const rotuloEixo = () => (A.eixo === 'h' ? 'reta y = ' + Expr.formatar(R.kk) : A.eixo === 'v' ? 'reta x = ' + Expr.formatar(R.kk) : A.eixo);

  function sincronizar3d() {
    const campo = k => $('[data-g3="' + k + '"]'), saida = k => campo(k).parentElement.querySelector('output');
    s3.sel = limitar(s3.sel, 1, s3.n);
    campo('sel').max = s3.n;
    ['ang', 'n', 'sel'].forEach(k => { campo(k).value = s3[k]; saida(k).textContent = k === 'ang' ? s3.ang + '°' : s3[k]; });
    $$('[data-g3modo]').forEach(b => b.setAttribute('aria-pressed', b.dataset.g3modo === s3.modo));
    // os nomes dos botões acompanham o assunto: anéis, cascas, faixas...
    const sup = A.tipo3 === 'sup', horiz = A.eixo === 'x' || A.eixo === 'h';
    $('[data-g3modo=solido]').textContent = sup ? 'Superfície' : 'Sólido';
    $('[data-g3modo=fatias]').textContent = sup ? 'Faixas' : A.tipo3 === 'sec' ? 'Cortes' : horiz ? (R && R.anel ? 'Anéis' : 'Discos') : 'Cascas';
    $$('.gf-so-fatias', ctl3).forEach(el => { el.hidden = s3.modo !== 'fatias'; });
    const girar = $('[data-acao=girar]');
    girar.setAttribute('aria-pressed', s3.tocando);
    girar.textContent = s3.tocando ? '❚❚' : '▶';
    $('[data-acao=corte]').setAttribute('aria-pressed', s3.ang < 360);
    $$('[data-tipo3]').forEach(b => b.setAttribute('aria-pressed', b.dataset.tipo3 === A.tipo3));
    $$('[data-vista]').forEach(b => b.setAttribute('aria-pressed', (b.dataset.vista === '3d') === ver3d));
    atualizarPassos();
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
    rapido3();
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
  raiz.addEventListener('click', e => {
    const bt = e.target.closest('[data-tipo3]'), bv = e.target.closest('[data-vista]');
    if (bt) { A.tipo3 = bt.dataset.tipo3; atualizarVisibilidade(); malha = undefined; calcular(); sincronizar3d(); pedir(); adiarSalvar(); }
    if (bv) { ver3d = bv.dataset.vista === '3d'; ligar3d(modo === 'solido' && ver3d); adiarSalvar(); }
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
    rapido3();
    pedir();
  });
  const soltar3 = e => { toques3.delete(e.pointerId); pinca3 = 0; if (!toques3.size) cv3.classList.remove('is-arrastando'); };
  cv3.addEventListener('pointerup', soltar3);
  cv3.addEventListener('pointercancel', soltar3);
  cv3.addEventListener('dblclick', reiniciar3d);
  cv3.addEventListener('wheel', e => {
    e.preventDefault();
    cam.zoom = limitar(cam.zoom * Math.exp(-(e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY) * 0.0015), 0.3, 6);
    rapido3();
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
    rapido3();
    pedir();
  });

  /* ---------- botões ---------- */
  const avisar = msg => { $('.gf-status').textContent = msg; };

  /* tela cheia para projetar: usa a API do navegador quando existe e, se não, cobre a janela com a própria página */
  function telaCheia(liga) {
    proj = liga;
    raiz.classList.toggle('is-tela', liga);
    document.documentElement.classList.toggle('gf-tela-aberta', liga);
    const b = $('[data-acao=tela]');
    b.setAttribute('aria-pressed', liga);
    b.textContent = liga ? 'Sair da tela cheia' : 'Tela cheia';
    if (liga && raiz.requestFullscreen) raiz.requestFullscreen().catch(() => {});
    else if (!liga && document.fullscreenElement) document.exitFullscreen().catch(() => {});
    medir();
    pedir();
  }
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && proj) telaCheia(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && proj && !document.fullscreenElement) telaCheia(false); });

  function acao(nome) {
    if (nome === 'mais' || nome === 'menos') {
      const fator = nome === 'mais' ? 1.25 : 0.8;
      if (modo3d) { cam.zoom = limitar(cam.zoom * fator, 0.3, 6); pedir(); } else zoom(fator);
    }
    else if (nome === 'reset') { if (modo3d) reiniciar3d(); else { ajustarJanela(); traco = null; mudouVista(); } }
    else if (nome === 'tela') telaCheia(!proj);
    else if (nome === 'corte') { s3.tocando = false; s3.ang = s3.ang < 360 ? 360 : 270; sincronizar3d(); pedir(); }
    else if (nome === 'ponta') { cam.yaw = A.eixo === 'x' || A.eixo === 'h' ? Math.PI / 2 : 0; cam.pit = A.eixo === 'x' || A.eixo === 'h' ? 0 : Math.PI / 2; pedir(); }
    else if (nome === 'secante') {
      if (animSec) pararSecante();
      else { if (A.dk >= 3.5) A.dk = 0; animSec = true; $('[data-acao=secante]').setAttribute('aria-pressed', 'true'); $('[data-acao=secante]').textContent = '❚❚'; requestAnimationFrame(quadroSecante); }
    }
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
      p, a: A, j: janelaAtual(), r: prop, m: modo
    };
  }

  function desserializar(d) {
    if (!d || !Array.isArray(d.l) || !d.l.length || !Array.isArray(d.j) || d.j.length !== 4 || !d.j.every(Number.isFinite)) return null;
    if (d.j[0] >= d.j[1] || d.j[2] >= d.j[3]) return null;
    const modoOk = MODOS.includes(d.m) ? d.m : d.a && d.a.a !== undefined ? 'integral' : 'funcoes';
    return { linhas: d.l, params: d.p || {}, analise: d.a || {}, janela: d.j, prop: !!d.r, modo: modoOk, v3: d.e ? { eixo: d.e === 'y' ? 'y' : 'x' } : undefined };
  }

  function deExemplo(ex) {
    const nomes = NOMES.slice(0, ex.linhas.length), a = Object.assign({}, ex.analise);
    if (ex.analise) {
      a.linha = nomes[ex.analise.linha];
      if (ex.analise.contra !== undefined) a.contra = ex.analise.contra === 'eixo' ? 'eixo' : nomes[ex.analise.contra];
    }
    return { linhas: ex.linhas.map((l, i) => Object.assign({ nome: nomes[i] }, l)), params: {}, analise: a, janela: ex.janela, prop: !!ex.prop, v3: ex.vista3d, modo: ex.modo || 'funcoes' };
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
    A.a = String(A.a); A.b = String(A.b); A.la = String(A.la); A.dx0 = String(A.dx0);
    A.lk = limitar(+A.lk || 0, 0, 6); A.dk = limitar(+A.dk || 0, 0, 3.5);
    ['sombra', 'dtan', 'dsec', 'd1', 'd2'].forEach(k => { A[k] = !!A[k]; });
    if (!['valor', 'mais', 'menos'].includes(A.ltipo)) A.ltipo = 'valor';
    if (!['ambos', 'esq', 'dir'].includes(A.lado)) A.lado = 'ambos';
    if (!['rev', 'sec', 'sup'].includes(A.tipo3)) A.tipo3 = 'rev';
    if (!['x', 'y', 'h', 'v'].includes(A.eixo)) A.eixo = 'x';
    if (!['quad', 'semi', 'tri'].includes(A.sec)) A.sec = 'quad';
    A.ek = String(A.ek);
    pararSecante();
    modo = MODOS.includes(est.modo) ? est.modo : 'funcoes';
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
    if (v3.eixo) A.eixo = v3.eixo;
    ver3d = true;
    Object.assign(s3, { ang: v3.ang === undefined ? 360 : v3.ang, modo: v3.modo || 'solido', n: v3.n || 12 });
    s3.sel = Math.ceil(s3.n / 2); // a fatia em destaque começa no meio, onde ela é maior
    Object.assign(cam, { yaw: -0.7, pit: 0.4, zoom: 1 });
    irParaModo(modo);
  }

  /* ---------- assuntos: Funções, Limites, Derivadas, Integrais, Sólidos ---------- */
  function irParaModo(m) {
    modo = m;
    raiz.dataset.modo = m;
    pararSecante();
    $$('.gf-modo').forEach(b => { const on = b.dataset.modo === m; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    $('#gf-painel').setAttribute('aria-labelledby', 'gf-aba-' + m);
    $$('[data-m]').forEach(el => { el.hidden = !el.dataset.m.split(' ').includes(m); });
    $$('.gf-chip[data-ex]').forEach(c => { c.hidden = c.dataset.modo !== m; });
    $('.gf-dica').textContent = DICAS[m];
    traco = null;
    $('.gf-leitura').textContent = '';
    atualizarVisibilidade();
    calcular();
    ligar3d(m === 'solido' && ver3d);
    pedir();
    adiarSalvar();
  }

  $('.gf-modos').addEventListener('click', e => {
    const b = e.target.closest('.gf-modo');
    if (b && b.dataset.modo !== modo) irParaModo(b.dataset.modo);
  });
  $('.gf-modos').addEventListener('keydown', e => {
    const i = MODOS.indexOf(modo), d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (e.key === 'Home' || e.key === 'End' || d) {
      e.preventDefault();
      irParaModo(MODOS[e.key === 'Home' ? 0 : e.key === 'End' ? MODOS.length - 1 : (i + d + MODOS.length) % MODOS.length]);
      $('.gf-modo[aria-selected=true]').focus();
    }
  });

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
