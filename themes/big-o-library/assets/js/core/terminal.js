var SEM_ARG = ['help', 'ls', 'tree', 'pwd', 'whoami', 'fortune', 'sabios', 'jogo', 'mapa', 'lab', 'theme', 'tema', 'clear', 'exit', 'vim'];
var COM_ARG = ['cd', 'cat', 'man', 'sudo', 'rm'];
var meta = document.querySelector('meta[name="bo-tree"]');
var TREE = null, loading = null;

function load() {
  if (TREE) return Promise.resolve(TREE);
  if (!meta) return Promise.reject(new Error('sem árvore'));
  if (!loading) loading = fetch(meta.content).then(function (r) { return r.json(); }).then(function (d) { TREE = d; return d; });
  return loading;
}
function norm(s) { return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
function parse(q) {
  var raw = q.replace(/^\s*[$>]\s*/, '');
  var m = raw.match(/^(\S+)\s*(.*)$/);
  return m ? { cmd: m[1].toLowerCase(), arg: m[2].trim(), forced: /^\s*[$>]/.test(q) } : null;
}
function match(q) {
  var p = parse(q);
  if (!p) return false;
  if (p.forced) return true;
  if (SEM_ARG.indexOf(p.cmd) >= 0) return true;
  return COM_ARG.indexOf(p.cmd) >= 0 && p.arg !== '';
}
function line(t, cls) { return { k: 'line', t: t, cls: cls || '' }; }
function link(t, s, h) { return { k: 'link', t: t, s: s || '', h: h }; }
function act(t, s, a) { return { k: 'act', t: t, s: s || '', a: a }; }

function cwd(d) {
  var path = location.pathname;
  if (path.indexOf(d.base) === 0) path = path.slice(d.base.length);
  path = path.replace(/^\/+|\/+$/g, '');
  if (path !== 'docs' && path.indexOf('docs/') !== 0) return '';
  return path.replace(/^docs\/?/, '');
}
function joinNorm(base, arg) {
  var parts = (arg.charAt(0) === '/' ? [] : (base ? base.split('/') : [])).concat(arg.split('/'));
  var out = [];
  parts.forEach(function (s) {
    if (!s || s === '.') return;
    if (s === '..') out.pop(); else out.push(s);
  });
  return out.join('/');
}
function find(d, path) {
  for (var i = 0; i < d.pages.length; i++) if (d.pages[i].p === path) return d.pages[i];
  return null;
}
function last(p) { var a = p.split('/'); return a[a.length - 1]; }
var ROOT_T = 'materiais';
function root(d) { return { p: '', u: d.base + 'docs/', t: ROOT_T, d: 'Todos os materiais, por período.', s: true }; }

function resolve(d, arg, cur) {
  arg = arg.replace(/^\.?\/+/, function (m) { return m.charAt(0) === '/' ? '/' : ''; });
  if (arg === '' || arg === '~' || arg === '/') return [root(d)];
  var tries = [joinNorm(cur, arg), joinNorm('', arg)], i, hit;
  for (i = 0; i < tries.length; i++) {
    if (tries[i] === '') return [root(d)];
    hit = find(d, tries[i]);
    if (hit) return [hit];
  }
  var q = norm(arg.replace(/\/+$/, '')), exact = [], pre = [], any = [];
  d.pages.forEach(function (pg) {
    var seg = norm(last(pg.p)), full = norm(pg.p), tit = norm(pg.t);
    if (seg === q || full === q) exact.push(pg);
    else if (seg.indexOf(q) === 0 || full.slice(-q.length - 1) === '/' + q) pre.push(pg);
    else if (tit.indexOf(q) >= 0 || full.indexOf(q) >= 0) any.push(pg);
  });
  return exact.concat(pre, any).slice(0, 5);
}
function children(d, path) {
  var pre = path ? path + '/' : '';
  return d.pages.filter(function (pg) {
    return pg.p.indexOf(pre) === 0 && pg.p.length > pre.length && pg.p.slice(pre.length).indexOf('/') < 0;
  });
}
function pageLink(pg, withSlash) {
  return link(last(pg.p) + (withSlash && pg.s ? '/' : ''), pg.t, pg.u);
}
function sabioUrl(d, s) { return d.conselho + '#sabio-' + s.s; }
function themeNow() { return document.documentElement.classList.contains('dark') ? 'dark' : 'light'; }

var HELP = [
  ['ls [pasta]', 'lista o que há na pasta (por padrão, a página onde você está)'],
  ['cd <nome>', 'vai até a pasta ou página (aceita nome parcial: cd eda)'],
  ['cat <página>', 'abre uma página'],
  ['tree [pasta]', 'mostra a árvore do acervo'],
  ['fortune', 'sorteia uma frase do Conselho dos Sábios'],
  ['sabios', 'lista o Conselho'],
  ['lab', 'jogo e mapa de pré-requisitos'],
  ['man <assunto>', 'resumo de uma página'],
  ['theme', 'alterna claro/escuro'],
  ['pwd · whoami · clear · exit', 'o de sempre']
];

function runCmd(d, p) {
  var cur = cwd(d), out = [], i, hits, pg;
  switch (p.cmd) {
    case 'help':
      out.push(line('comandos (sem "$" na frente, o texto continua sendo busca normal):'));
      HELP.forEach(function (h) { out.push(act(h[0], h[1], 'fill:' + h[0].split(/[ <\[·]/)[0])); });
      return out;
    case 'pwd':
      return [line('~/big-o-library/docs' + (cur ? '/' + cur : ''))];
    case 'whoami':
      return [line('estudante · classe de complexidade: ainda calculando…'), link('descobrir a minha classe', 'jogo "Qual a complexidade?"', d.lab + 'complexidade/')];
    case 'ls': {
      var target = p.arg ? resolve(d, p.arg, cur) : [cur ? find(d, cur) || root(d) : root(d)];
      if (!target.length) return [line('ls: ' + p.arg + ': arquivo ou diretório inexistente', 'is-err')];
      var kids = children(d, target[0].p);
      if (!kids.length) return [line('(vazio) — ' + target[0].t + ' é uma página, não uma pasta'), link('abrir ' + last(target[0].p || 'docs'), target[0].t, target[0].u)];
      return kids.map(function (k) { return pageLink(k, true); });
    }
    case 'cd': case 'cat': {
      hits = resolve(d, p.arg, cur);
      if (!hits.length) return [line(p.cmd + ': ' + p.arg + ': arquivo ou diretório inexistente', 'is-err'), line('tente: ls, tree ou só parte do nome (cd eda)')];
      return hits.map(function (h) { return link((p.cmd === 'cd' ? 'cd ' : 'cat ') + (h.p || '~'), h.t, h.u); });
    }
    case 'man': {
      if (/^man$/i.test(p.arg)) return [line('MAN(1) — o manual do manual é o resto do site. Use a busca.')];
      hits = resolve(d, p.arg, cur);
      if (!hits.length) return [line('Nenhuma entrada de manual para "' + p.arg + '".', 'is-err'), line('tente: man merge · man dijkstra · man selection')];
      pg = hits[0];
      return [line('NOME\n    ' + last(pg.p || 'docs') + ' — ' + pg.t + (pg.d ? '\n\nDESCRIÇÃO\n    ' + pg.d : ''), 'is-man'), link('abrir página', pg.t, pg.u)];
    }
    case 'tree': {
      var start = p.arg ? resolve(d, p.arg, cur)[0] : root(d);
      if (!start) return [line('tree: ' + p.arg + ': arquivo ou diretório inexistente', 'is-err')];
      var rows = [], budget = 60;
      (function walk(path, prefix, depth) {
        var ks = children(d, path);
        ks.forEach(function (k, idx) {
          if (budget-- <= 0) return;
          var lastOne = idx === ks.length - 1;
          rows.push(link(prefix + (lastOne ? '└── ' : '├── ') + last(k.p) + (k.s ? '/' : ''), '', k.u));
          if (depth < 3) walk(k.p, prefix + (lastOne ? '    ' : '│   '), depth + 1);
        });
      })(start.p, '', 1);
      if (budget <= 0) rows.push(line('… (use tree <pasta> para ver mais)'));
      return [line(start.p ? start.p + '/' : 'docs/')].concat(rows);
    }
    case 'fortune': {
      var ok = d.sabios.filter(function (s) { return s.f; });
      if (!ok.length) return [line('fortune: nenhum sábio com frase ainda.')];
      var s = ok[Math.floor(Math.random() * ok.length)];
      return [line('“' + s.f + '”\n\n    — ' + s.n + (s.t ? ', ' + s.t : ''), 'is-quote'), link('ver card do sábio', s.c, sabioUrl(d, s)), act('outra ↻', '', 'fill:fortune')];
    }
    case 'sabios':
      return d.sabios.map(function (s) { return link(s.n, s.c + (s.t ? ' · ' + s.t : ''), sabioUrl(d, s)); });
    case 'lab':
      return [
        link('complexidade', 'jogo: qual a complexidade deste código?', d.lab + 'complexidade/'),
        link('mapa', 'grafo de pré-requisitos das disciplinas', d.lab + 'mapa/')
      ];
    case 'jogo': return [link('complexidade', 'jogo: qual a complexidade deste código?', d.lab + 'complexidade/')];
    case 'mapa': return [link('mapa', 'grafo de pré-requisitos das disciplinas', d.lab + 'mapa/')];
    case 'theme': case 'tema':
      return [act('alternar tema', 'agora: ' + (themeNow() === 'dark' ? 'escuro' : 'claro'), 'theme')];
    case 'clear': return [act('limpar', '', 'clear')];
    case 'exit': return [act('fechar o terminal', 'Esc também serve', 'close')];
    case 'vim': return [line('preso? :q! sai. aqui, basta apertar Esc.')];
    case 'sudo': {
      if (/make me a sandwich|me faz um sandu/i.test(p.arg)) return [line('Certo.')];
      return [line('estudante não consta no arquivo sudoers. Este incidente será reportado.', 'is-err'), link('ao Conselho dos Sábios', '', d.conselho)];
    }
    case 'rm': {
      if (/^-\w*[rf]\w*\s+(-\w+\s+)*\/\*?$/.test(p.arg)) {
        return [line('removendo /materiais … ok\nremovendo /conselho … ok\nremovendo /lab …', 'is-err'), line('brincadeira. Nada foi apagado: o acervo está a salvo no GitHub.')];
      }
      return [line('rm: ' + p.arg + ': operação não permitida. Aqui tudo é somente leitura.', 'is-err')];
    }
  }
  return [line('bash: ' + p.cmd + ': comando não encontrado. Digite help.', 'is-err')];
}

function run(q) {
  var p = parse(q);
  if (!p) return Promise.resolve([]);
  return load().then(function (d) { return runCmd(d, p); }, function () {
    return [line('terminal indisponível nesta página (árvore não carregou).', 'is-err')];
  });
}

function render(items, ul) {
  var n = 0, frag = document.createDocumentFragment();
  items.forEach(function (it) {
    var li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    if (it.k === 'line') {
      li.className = 'bo-term-line ' + it.cls;
      li.textContent = it.t;
    } else {
      var a = document.createElement('a');
      a.id = 'bo-term-' + (n++);
      a.setAttribute('role', 'option');
      a.setAttribute('aria-selected', 'false');
      a.className = 'bo-term-opt';
      if (it.k === 'link') a.href = it.h; else { a.href = '#'; a.setAttribute('data-bo-act', it.a); }
      var t = document.createElement('div');
      t.className = 'hextra-search-title bo-term-t';
      t.textContent = it.t;
      a.appendChild(t);
      if (it.s) {
        var s = document.createElement('div');
        s.className = 'hextra-search-excerpt';
        s.textContent = it.s;
        a.appendChild(s);
      }
      li.appendChild(a);
    }
    frag.appendChild(li);
  });
  ul.appendChild(frag);
  return n;
}

function doAct(a) {
  var input = document.querySelector('.hextra-search-input');
  if (a.indexOf('fill:') === 0 && input) {
    input.value = a.slice(5);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  } else if (a === 'clear' && input) {
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  } else if (a === 'close') {
    var c = document.querySelector('[data-search-close]');
    if (c) c.click();
  } else if (a === 'theme') {
    var t = themeNow() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('color-theme', t); } catch (e) { }
    if (typeof window.setTheme === 'function') window.setTheme(t);
    else document.documentElement.classList.toggle('dark', t === 'dark');
    if (input) input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

window.boTerminal = { match: match, run: run, render: render, act: doAct };
