/*
 * Interpretador de expressões do Graficador.
 * O texto digitado vira uma árvore e a árvore vira uma função; nada de eval.
 * Aceita a notação brasileira (sen, tg, vírgula decimal) e multiplicação implícita (2x, 3sen(x)).
 */
const Expr = (function () {
  'use strict';

  const FUNCOES = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    sec: x => 1 / Math.cos(x), csc: x => 1 / Math.sin(x), cot: x => 1 / Math.tan(x),
    asin: Math.asin, acos: Math.acos, atan: Math.atan,
    sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
    sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs, exp: Math.exp,
    ln: Math.log, log: Math.log10, log2: Math.log2,
    floor: Math.floor, ceil: Math.ceil, sign: Math.sign
  };
  const ALIAS = {
    sen: 'sin', tg: 'tan', cotg: 'cot', cossec: 'csc', arcsen: 'asin', arcsin: 'asin',
    arccos: 'acos', arctg: 'atan', arctan: 'atan', senh: 'sinh', tgh: 'tanh'
  };
  const NOME_PT = { sqrt: '√', sin: 'sen', tan: 'tg', cot: 'cotg', csc: 'cossec', asin: 'arcsen', acos: 'arccos', atan: 'arctg', sinh: 'senh', tanh: 'tgh' };
  const CONSTANTES = { pi: Math.PI, tau: 2 * Math.PI, e: Math.E };
  const CONHECIDOS = Object.keys(FUNCOES).concat(Object.keys(ALIAS), Object.keys(CONSTANTES), ['theta'])
    .sort((a, b) => b.length - a.length);
  const PRECEDENCIA = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 4 };

  const erro = msg => Object.assign(new Error(msg), { amigavel: true });

  // "xsen" vira x, sen; "ax" vira a, x. Funções e constantes conhecidas têm prioridade.
  function partir(palavra) {
    const pedacos = [];
    while (palavra) {
      const nome = CONHECIDOS.find(k => palavra.startsWith(k)) || palavra[0];
      pedacos.push(nome);
      palavra = palavra.slice(nome.length);
    }
    return pedacos;
  }

  function normalizar(nome) {
    if (nome === 'π') return 'pi';
    if (nome === 'θ') return 'theta';
    return ALIAS[nome] || nome;
  }

  function tokens(texto) {
    const lista = [];
    let s = texto.replace(/²/g, '^2').replace(/³/g, '^3').replace(/[−–]/g, '-')
      .replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/\*\*/g, '^');
    while (s) {
      let m;
      if ((m = s.match(/^\s+/))) { /* espaço */ }
      else if ((m = s.match(/^(?:\d+(?:[.,]\d+)?|\.\d+)(?:[eE][+-]?\d+)?/))) lista.push({ t: 'n', v: parseFloat(m[0].replace(',', '.')) });
      else if ((m = s.match(/^[A-Za-zÀ-ÿ\u0370-\u03ff]+/))) partir(m[0]).forEach(p => lista.push({ t: 'i', v: normalizar(p) }));
      else if ((m = s.match(/^√/))) lista.push({ t: 'i', v: 'sqrt' });
      else if ((m = s.match(/^[-+*/^()]/))) lista.push({ t: 'o', v: m[0] });
      else if (s[0] === '|') throw erro('Para valor absoluto, escreva abs(…) em vez de |…|.');
      else throw erro('Símbolo não reconhecido: “' + s[0] + '”.');
      s = s.slice(m[0].length);
    }
    return lista;
  }

  /**
   * Lê a expressão e devolve { ast, params, chamadas }.
   * ctx.variavel: nome da variável livre (x, t ou theta); ctx.linhas: nomes de outras curvas que podem ser chamadas, como f(x).
   */
  function analisar(texto, ctx) {
    const T = tokens(texto);
    if (!T.length) throw erro('Digite uma expressão.');
    const params = new Set(), chamadas = new Set();
    let p = 0;
    const ehOp = v => T[p] && T[p].t === 'o' && T[p].v === v;
    const comecaFator = t => t && (t.t === 'n' || t.t === 'i' || (t.t === 'o' && t.v === '('));

    function soma() {
      let a = termo();
      while (ehOp('+') || ehOp('-')) { const op = T[p++].v; a = { k: 'b', op, a, b: termo() }; }
      return a;
    }
    function termo() {
      let a = unario();
      for (;;) {
        if (ehOp('*') || ehOp('/')) { const op = T[p++].v; a = { k: 'b', op, a, b: unario() }; }
        else if (comecaFator(T[p])) a = { k: 'b', op: '*', a, b: unario() };
        else return a;
      }
    }
    function unario() {
      if (ehOp('-')) { p++; return { k: 'neg', a: unario() }; }
      if (ehOp('+')) { p++; return unario(); }
      return potencia();
    }
    function potencia() {
      const base = primario();
      if (ehOp('^')) { p++; return { k: 'b', op: '^', a: base, b: unario() }; }
      return base;
    }
    function primario() {
      const t = T[p++];
      if (!t) throw erro('A expressão terminou antes da hora: falta algo no fim.');
      if (t.t === 'n') return { k: 'n', v: t.v };
      if (t.t === 'i') return identificador(t.v);
      if (t.v === '(') {
        const dentro = soma();
        if (!ehOp(')')) throw erro('Falta fechar um parêntese.');
        p++;
        return dentro;
      }
      throw erro('Não esperava “' + t.v + '” aqui.');
    }
    function identificador(nome) {
      if (FUNCOES[nome]) return { k: 'u', f: nome, a: ehOp('(') ? primario() : unario() };
      if (CONSTANTES[nome] !== undefined) return { k: 'c', nome };
      if (nome === ctx.variavel) return { k: 'v', nome };
      if (ctx.linhas.includes(nome) && ehOp('(')) { chamadas.add(nome); return { k: 'l', nome, a: primario() }; }
      params.add(nome);
      return { k: 'p', nome };
    }

    const ast = soma();
    if (p < T.length) throw erro(T[p].v === ')' ? 'Há um parêntese “)” sem abrir.' : 'Não entendi “' + T[p].v + '”.');
    return { ast, params, chamadas };
  }

  function potenciar(a, b) {
    if (a < 0 && b !== Math.round(b)) {
      const k = Math.round(1 / b);
      if (Math.abs(1 / b - k) < 1e-9 && k % 2) return -Math.pow(-a, b); // raiz ímpar de número negativo
    }
    return Math.pow(a, b);
  }

  /** Transforma a árvore numa função de uma variável. amb.P guarda os parâmetros e amb.F as outras curvas. */
  function compilar(n, amb) {
    switch (n.k) {
      case 'n': return () => n.v;
      case 'c': { const v = CONSTANTES[n.nome]; return () => v; }
      case 'v': return x => x;
      case 'p': return () => amb.P[n.nome];
      case 'neg': { const a = compilar(n.a, amb); return x => -a(x); }
      case 'u': { const f = FUNCOES[n.f], a = compilar(n.a, amb); return x => f(a(x)); }
      case 'l': { const a = compilar(n.a, amb); return x => { const F = amb.F[n.nome]; return F ? F(a(x)) : NaN; }; }
      default: {
        const a = compilar(n.a, amb), b = compilar(n.b, amb);
        switch (n.op) {
          case '+': return x => a(x) + b(x);
          case '-': return x => a(x) - b(x);
          case '*': return x => a(x) * b(x);
          case '/': return x => a(x) / b(x);
          default: return x => potenciar(a(x), b(x));
        }
      }
    }
  }

  const nomeVisivel = nome => (nome === 'theta' ? 'θ' : nome === 'pi' ? 'π' : nome);

  /** Escreve a árvore de volta, com o mínimo de parênteses: mostra ao aluno como o texto foi entendido. */
  function str(n, minimo = 0) {
    let s, prec = 5;
    switch (n.k) {
      case 'n': s = String(+n.v.toPrecision(8)).replace('.', ','); break;
      case 'v': case 'p': case 'c': s = nomeVisivel(n.nome); break;
      case 'neg': s = '-' + str(n.a, 3); prec = 3; break;
      case 'u': s = (NOME_PT[n.f] || n.f) + '(' + str(n.a) + ')'; break;
      case 'l': s = n.nome + '(' + str(n.a) + ')'; break;
      default: {
        prec = PRECEDENCIA[n.op];
        const direita = n.op === '^';
        const sep = n.op === '+' || n.op === '-' ? ' ' + n.op + ' ' : n.op === '*' ? '·' : n.op;
        s = str(n.a, direita ? prec + 1 : prec) + sep + str(n.b, direita ? 3 : prec + 1);
      }
    }
    return prec < minimo ? '(' + s + ')' : s;
  }

  function derivada(f, x) {
    // passo menor perto de zero, onde funções como √x variam depressa
    const h = Math.max(1e-7, Math.min(1e-3 * Math.max(1, Math.abs(x)), Math.abs(x) / 8));
    const centrada = (8 * (f(x + h) - f(x - h)) - (f(x + 2 * h) - f(x - 2 * h))) / (12 * h);
    if (Number.isFinite(centrada)) return centrada;
    // na borda do domínio (x^(3/2) em 0, por exemplo) só há pontos de um lado
    const frente = (-3 * f(x) + 4 * f(x + h) - f(x + 2 * h)) / (2 * h);
    return Number.isFinite(frente) ? frente : (3 * f(x) - 4 * f(x - h) + f(x - 2 * h)) / (2 * h);
  }


  /** Segunda derivada por diferença centrada. */
  function derivada2(f, x) {
    const h = 1e-3 * Math.max(1, Math.abs(x));
    return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
  }

  /** Procura um número simples (inteiro, fração, múltiplo de π ou e) a menos de tol de v. */
  function bonito(v, tol) {
    if (Math.abs(v) <= tol) return { v: 0, texto: '0' };
    for (let d = 1; d <= 12; d++) {
      const n = Math.round(v * d);
      if (Math.abs(n / d - v) <= tol) return { v: n / d, texto: d === 1 ? String(n) : n + '/' + d };
    }
    for (let d = 1; d <= 6; d++) {
      const n = Math.round(v * d / Math.PI);
      if (n && Math.abs(n * Math.PI / d - v) <= tol) return { v: n * Math.PI / d, texto: (n === 1 ? '' : n === -1 ? '-' : n) + 'π' + (d > 1 ? '/' + d : '') };
    }
    if (Math.abs(Math.E - v) <= tol) return { v: Math.E, texto: 'e' };
    return { v, texto: '' };
  }

  /**
   * Limite numérico de f quando x se aproxima de a por um lado (dir = -1 esquerda, +1 direita);
   * se a for ±Infinity, x cresce em módulo. Olha quatro pontos cada vez mais próximos e decide:
   * { tipo: 'num', v, texto }, { tipo: 'inf', s: ±1 }, { tipo: 'indef' } (f não existe ali) ou { tipo: 'nao', motivo }.
   */
  function limite(f, a, dir) {
    // com pontos muito próximos o computador perde dígitos (1 − cos x perto de 0): se não convergir, tenta mais longe
    const r = limiteEm(f, a, dir, 3);
    return r.tipo === 'num' || r.tipo === 'inf' || r.tipo === 'indef' ? r : limiteEm(f, a, dir, 2);
  }

  function limiteEm(f, a, dir, k0) {
    const noInfinito = !Number.isFinite(a);
    const ponto = k => (noInfinito ? Math.sign(a) * Math.pow(10, k + 1) : a + dir * Math.pow(10, -k));
    const v = [0, 1, 2, 3].map(i => f(ponto(k0 + i)));
    if (v.every(Number.isNaN)) return { tipo: 'indef' };
    if (v.some(Number.isNaN)) return { tipo: 'nao', motivo: 'f deixa de existir perto desse valor' };
    if (v.every(y => y === v[0] && !Number.isFinite(y))) return { tipo: 'inf', s: Math.sign(v[0]) };
    if (v.some(y => !Number.isFinite(y))) return { tipo: 'nao', motivo: 'f explode perto desse valor' };
    const d0 = Math.abs(v[1] - v[0]), d1 = Math.abs(v[2] - v[1]), d2 = Math.abs(v[3] - v[2]);
    const escala = Math.max(1, Math.abs(v[3]));
    if (d2 <= 1e-5 * escala || (d2 < 0.5 * d1 && d2 <= 1e-2 * escala)) {
      const b = bonito(v[3], Math.max(1.5 * d2, 1e-6));
      return { tipo: 'num', v: b.v, texto: b.texto };
    }
    const subindo = v[1] > v[0] && v[2] > v[1] && v[3] > v[2], descendo = v[1] < v[0] && v[2] < v[1] && v[3] < v[2];
    if ((subindo || descendo) && d2 >= 0.5 * d1 && d1 >= 0.5 * d0 && Math.abs(v[3]) - Math.abs(v[0]) > 0.5 + 0.1 * Math.abs(v[0])) return { tipo: 'inf', s: subindo ? 1 : -1 };
    return { tipo: 'nao', motivo: 'f oscila e não se aproxima de um valor' };
  }

  /** Limite nos dois lados: devolve { esq, dir, bi }; bi é o limite bilateral (ou 'nao' se os lados discordam). */
  function limiteBilateral(f, a) {
    const esq = limite(f, a, -1), dir = limite(f, a, 1);
    let bi;
    if (esq.tipo === 'num' && dir.tipo === 'num') {
      bi = Math.abs(esq.v - dir.v) <= 1e-4 * Math.max(1, Math.abs(esq.v)) ? esq : { tipo: 'nao', motivo: 'os limites laterais são diferentes' };
    } else if (esq.tipo === 'inf' && dir.tipo === 'inf') {
      bi = esq.s === dir.s ? esq : { tipo: 'nao', motivo: 'os limites laterais são diferentes' };
    } else if (esq.tipo === 'indef' || dir.tipo === 'indef') {
      bi = { tipo: 'nao', motivo: 'f não está definida dos dois lados' };
    } else bi = { tipo: 'nao', motivo: esq.motivo || dir.motivo || 'os limites laterais são diferentes' };
    return { esq, dir, bi };
  }

  /**
   * Integral definida pela regra de Simpson, com a troca x = a + (b - a)(3u² - 2u³).
   * A troca concentra pontos nas pontas e zera o jacobiano lá, o que doma singularidades integráveis (1/√x).
   * Compara com a mesma regra à metade da resolução; se divergirem, tenta uma vez com 4× mais pontos
   * e, se ainda divergirem, devolve NaN (a integral não converge ou o intervalo é largo demais para a precisão).
   */
  function integrar(f, a, b, n = 2000) {
    if (a === b) return 0;
    const d = b - a, h = 1 / n, g = new Array(n + 1);
    let impar = 0, meio = 0, quarto = 0;
    for (let i = 1; i < n; i++) {
      const u = i * h, v = f(a + d * u * u * (3 - 2 * u)) * d * 6 * u * (1 - u);
      if (!Number.isFinite(v)) return NaN;
      g[i] = v;
      if (i % 2) impar += v; else if (i % 4 === 2) meio += v; else quarto += v;
    }
    const pontas = 2 * g[1] - g[2] + 2 * g[n - 1] - g[n - 2]; // o integrando em u = 0 e u = 1 é um limite: extrapola
    const fino = h / 3 * (pontas + 4 * impar + 2 * (meio + quarto)), grosso = 2 * h / 3 * (pontas + 4 * meio + 2 * quarto);
    if (Math.abs(fino - grosso) <= 1e-4 * Math.max(1, Math.abs(fino))) return fino;
    return n < 8000 ? integrar(f, a, b, 4 * n) : NaN;
  }

  /** Zeros de h em [a, b]: procura mudanças de sinal e refina por bisseção. Descarta assíntotas. */
  function raizes(h, a, b, n = 1200) {
    const achadas = [];
    let x0 = a, y0 = h(a);
    for (let i = 0; i <= n; i++) {
      const x1 = a + (b - a) * i / n, y1 = i ? h(x1) : y0;
      if (y1 === 0) achadas.push(x1);
      else if (i && y0 * y1 < 0) {
        let lo = x0, hi = x1, flo = y0;
        for (let k = 0; k < 60; k++) {
          const m = (lo + hi) / 2, fm = h(m);
          if (flo * fm <= 0) hi = m; else { lo = m; flo = fm; }
        }
        const r = (lo + hi) / 2;
        if (Math.abs(h(r)) < 1e-5) achadas.push(r);
      }
      x0 = x1; y0 = y1;
    }
    return achadas.filter((r, i) => !i || Math.abs(r - achadas[i - 1]) > 1e-9);
  }

  /** Valor de uma expressão sem variáveis, como "pi/2" ou "2,5". */
  function constante(texto) {
    const { ast, params } = analisar(texto, { variavel: null, linhas: [] });
    if (params.size) throw erro('Use só números e constantes (pi, e).');
    return compilar(ast, { P: {}, F: {} })(0);
  }

  function formatar(n) {
    if (Number.isNaN(n)) return 'indefinido';
    if (!Number.isFinite(n)) return n > 0 ? '∞' : '−∞';
    if (Math.abs(n) < 1e-12) return '0'; // ruído de ponto flutuante, como −3,9×10^−17 no lugar de 0
    const a = Math.abs(n);
    const s = a >= 1e7 || a < 1e-4 ? n.toExponential(3).replace('e', '×10^').replace('+', '') : String(+n.toPrecision(6));
    return s.replace('.', ',').replace(/-/g, '−');
  }

  return { analisar, compilar, str, derivada, derivada2, integrar, raizes, constante, formatar, limite, limiteBilateral };
})();

if (typeof module !== 'undefined') module.exports = Expr;
