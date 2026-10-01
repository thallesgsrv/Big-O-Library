/* Motor de visualização: cada algoritmo é um gerador que devolve o estado a cada passo. */
(function () {
  const fmt = x => (x === Infinity ? '∞' : x == null ? '–' : x);

  const GRAFO = {
    nodes: [{id:'A',x:60,y:150},{id:'B',x:190,y:50},{id:'C',x:210,y:170},
            {id:'D',x:380,y:60},{id:'E',x:500,y:150},{id:'F',x:340,y:250}],
    edges: [['A','B',7],['A','C',9],['A','F',14],['B','C',10],['B','D',15],
            ['C','D',11],['C','F',2],['D','E',6],['E','F',9]]
  };

  function* dijkstra(g, s) {
    const dist = {}, prev = {}, adj = {}, vis = new Set(), pq = [];
    g.nodes.forEach(n => { dist[n.id] = Infinity; adj[n.id] = []; });
    g.edges.forEach(([a, b, w]) => { adj[a].push([b, w]); adj[b].push([a, w]); });
    dist[s] = 0;
    const snap = (line, msg, x = {}) => ({ line, msg, dist: {...dist}, prev: {...prev},
      vis: new Set(vis), pq: pq.slice().sort((a, b) => a[0] - b[0]).map(p => `(${p[0]}, ${p[1]})`), ...x });
    yield snap(0, `Todas as distâncias começam em ∞; a origem ${s} vale 0.`);
    pq.push([0, s]);
    yield snap(1, `A fila recebe (0, ${s}).`);
    while (pq.length) {
      yield snap(2, 'A fila não está vazia: ainda há trabalho.');
      pq.sort((a, b) => a[0] - b[0]);
      const [d, u] = pq.shift();
      yield snap(3, `Extrai o menor da fila: ${u} com distância ${d}.`, { u });
      if (vis.has(u)) { yield snap(4, `${u} já foi visitado; entrada velha, ignora.`, { u }); continue; }
      yield snap(4, `${u} ainda não foi visitado.`, { u });
      vis.add(u);
      yield snap(5, `Marca ${u} como visitado: sua distância ${d} é definitiva.`, { u });
      for (const [v, w] of adj[u]) {
        yield snap(6, `Olha a aresta ${u}–${v} (peso ${w}).`, { u, v });
        const alt = dist[u] + w;
        if (alt < dist[v]) {
          yield snap(7, `${dist[u]} + ${w} = ${alt} < ${fmt(dist[v])}: caminho melhor!`, { u, v });
          dist[v] = alt; prev[v] = u; pq.push([alt, v]);
          yield snap(8, `Atualiza dist[${v}] = ${alt} e insere na fila.`, { u, v });
        } else {
          yield snap(7, `${dist[u]} + ${w} = ${alt} ≥ ${fmt(dist[v])}: não melhora.`, { u, v });
        }
      }
    }
    yield snap(2, 'Fila vazia. As arestas verdes formam os caminhos mínimos a partir de A.', { done: true });
  }


  function* bfs(g, s) {
    const adj = {}, nivel = {}, prev = {}, vis = new Set(), fila = [s];
    g.nodes.forEach(n => { adj[n.id] = []; nivel[n.id] = null; });
    g.edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
    nivel[s] = 0;
    const snap = (line, msg, x = {}) => ({ line, msg, dist: {...nivel}, prev: {...prev}, vis: new Set(vis), pq: [...fila], ...x });
    yield snap(0, `A fila começa com ${s} (nível 0).`);
    while (fila.length) {
      yield snap(1, 'A fila não está vazia.');
      const u = fila.shift(); vis.add(u);
      yield snap(2, `Remove ${u} do início da fila.`, { u });
      for (const v of adj[u]) {
        yield snap(3, `Olha o vizinho ${v}.`, { u, v });
        if (nivel[v] == null) {
          yield snap(4, `${v} é novo.`, { u, v });
          nivel[v] = nivel[u] + 1; prev[v] = u; fila.push(v);
          yield snap(5, `${v} recebe nível ${nivel[v]} e entra no fim da fila.`, { u, v });
        } else yield snap(4, `${v} já foi descoberto: ignora.`, { u, v });
      }
    }
    yield snap(1, 'Fila vazia. Cada vértice foi alcançado pelo menor número de arestas.', { done: true });
  }

  function* dfs(g, s) {
    const adj = {}, disc = {}, prev = {}, vis = new Set(), pilha = []; let t = 0;
    g.nodes.forEach(n => { adj[n.id] = []; disc[n.id] = null; });
    g.edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
    const snap = (line, msg, x = {}) => ({ line, msg, dist: {...disc}, prev: {...prev}, vis: new Set(vis), pq: [...pilha], ...x });
    yield snap(0, 'tempo = 0. Chama DFS na origem.');
    function* visit(u) {
      pilha.unshift(u); disc[u] = ++t;
      yield snap(2, `Visita ${u} (tempo ${t}) e empilha a chamada.`, { u });
      for (const v of adj[u]) {
        yield snap(3, `Olha o vizinho ${v}.`, { u, v });
        if (disc[v] == null) {
          yield snap(4, `${v} é novo: desce por ele.`, { u, v });
          prev[v] = u; yield* visit(v);
        } else yield snap(4, `${v} já foi visitado: ignora.`, { u, v });
      }
      vis.add(u);
      yield snap(6, `${u} esgotou os vizinhos: volta (backtrack).`, { u });
      pilha.shift();
    }
    yield* visit(s);
    yield snap(0, 'Pilha vazia. Fim da busca em profundidade.', { done: true });
  }

  function* lcs(X, Y) {
    const m = X.length, n = Y.length;
    const t = Array.from({length: m + 1}, (_, i) => Array.from({length: n + 1}, (_, j) => (i && j) ? null : 0));
    const snap = (line, msg, x = {}) => ({ line, msg, t: t.map(r => [...r]), path: [], ...x });
    yield snap(0, 'Linha 0 e coluna 0 valem 0: comparar com a string vazia dá LCS vazio.');
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      if (X[i-1] === Y[j-1]) {
        yield snap(3, `${X[i-1]} = ${Y[j-1]}: letras iguais.`, { cur: [i, j] });
        t[i][j] = t[i-1][j-1] + 1;
        yield snap(4, `c[${i}][${j}] = diagonal + 1 = ${t[i][j]}.`, { cur: [i, j] });
      } else {
        yield snap(3, `${X[i-1]} ≠ ${Y[j-1]}: letras diferentes.`, { cur: [i, j] });
        t[i][j] = Math.max(t[i-1][j], t[i][j-1]);
        yield snap(5, `c[${i}][${j}] = max(cima, esquerda) = ${t[i][j]}.`, { cur: [i, j] });
      }
    }
    let i = m, j = n, out = ''; const path = [[i, j]];
    yield snap(6, 'Reconstrução: parte de c[m][n] e volta até a borda.', { path: path.map(p => [...p]) });
    while (i && j) {
      if (X[i-1] === Y[j-1]) { out = X[i-1] + out; i--; j--; }
      else if (t[i-1][j] >= t[i][j-1]) i--; else j--;
      path.push([i, j]);
      yield snap(6, `Letras coletadas: ${out || '(nenhuma)'}`, { path: path.map(p => [...p]) });
    }
    yield snap(6, `LCS = ${out} (tamanho ${t[m][n]}).`, { path: path.map(p => [...p]) });
  }


  const LCAG = {
    nodes: [{id:'A',x:280,y:24},{id:'B',x:170,y:76},{id:'C',x:400,y:76},{id:'D',x:100,y:128},{id:'E',x:240,y:128},
            {id:'F',x:60,y:180},{id:'G',x:150,y:180},{id:'J',x:240,y:180},{id:'H',x:30,y:232},{id:'I',x:100,y:232}],
    edges: [['A','B'],['A','C'],['B','D'],['B','E'],['D','F'],['D','G'],['E','J'],['F','H'],['F','I']]
  };

  function* lca(g, u0, v0) {
    const K = 3, par = { A: 'A' }, dep = { A: 0 };
    g.edges.forEach(([p, c]) => { par[c] = p; dep[c] = dep[p] + 1; });
    const up = [par];
    for (let k = 1; k < K; k++) { up[k] = {}; g.nodes.forEach(n => { up[k][n.id] = up[k-1][up[k-1][n.id]]; }); }
    const rows = g.nodes.map(n => `${n.id}: ${up.map(t => t[n.id]).join(' ')}`);
    let u = u0, v = v0;
    const snap = (line, msg, x = {}) => ({ line, msg, dist: {...dep}, prev: {}, vis: new Set(), pq: rows, u, v, ...x });
    yield snap(0, `Pré-processa up[k][v] = ancestral 2^k níveis acima (a raiz aponta para si). Consulta: LCA(${u}, ${v}).`);
    if (dep[u] < dep[v]) { [u, v] = [v, u]; yield snap(1, 'u precisa ser o mais profundo: troca u e v.'); }
    else yield snap(1, `prof[${u}] = ${dep[u]} ≥ prof[${v}] = ${dep[v]}: não troca.`);
    for (let k = K - 1; k >= 0; k--) {
      if (dep[u] - (1 << k) >= dep[v]) {
        u = up[k][u];
        yield snap(2, `k=${k}: subir ${1 << k} nível(is) não passa de v: u sobe para ${u}.`);
      } else yield snap(2, `k=${k}: subir ${1 << k} nível(is) passaria do nível de v: não sobe.`);
    }
    if (u === v) { yield snap(3, `u = v = ${u}: esse é o LCA.`, { vis: new Set([u]), done: true }); return; }
    yield snap(3, `Mesmo nível (${dep[u]}) e u ≠ v (${u} ≠ ${v}): agora sobem juntos.`);
    for (let k = K - 1; k >= 0; k--) {
      const a = up[k][u], b = up[k][v];
      yield snap(4, `k=${k}: up[${k}][${u}] = ${a} e up[${k}][${v}] = ${b}.`);
      if (a !== b) { u = a; v = b; yield snap(5, `Diferentes: pula os dois. u = ${u}, v = ${v}.`); }
      else yield snap(5, `Iguais (${a}): pode ser o LCA ou estar acima dele; não pula.`);
    }
    const ans = up[0][u];
    yield snap(6, `O pai de u é o LCA: ${ans}.`, { u: ans, v: null, vis: new Set([ans]), done: true });
  }

  const A8 = [5, 3, 8, 6, 2, 7, 4, 1];
  function segBase() {
    const L = [], R = [], sum = Array(16).fill(null), lz = Array(16).fill(0);
    (function setr(i, l, r) { L[i] = l; R[i] = r; if (l < r) { const m = (l + r) >> 1; setr(2*i, l, m); setr(2*i+1, m+1, r); } })(1, 0, 7);
    const snap = (line, msg, x = {}) => ({ line, msg, L, R, sum: [...sum], lz: [...lz], take: new Set(), chg: new Set(), op: '–', res: '–', ...x });
    return { L, R, sum, lz, snap };
  }

  function* segtree() {
    const { L, R, sum, snap } = segBase();
    yield snap(0, 'Cada nó guardará a soma do seu intervalo [l, r]. Ainda não calculamos nada.', { op: 'build' });
    function* build(i, l, r) {
      if (l === r) { sum[i] = A8[l]; yield snap(1, `Folha [${l}]: soma = ${A8[l]}.`, { cur: i, chg: new Set([i]), op: 'build' }); return; }
      const m = (l + r) >> 1; yield* build(2*i, l, m); yield* build(2*i+1, m+1, r);
      sum[i] = sum[2*i] + sum[2*i+1];
      yield snap(2, `[${l},${r}] = ${sum[2*i]} + ${sum[2*i+1]} = ${sum[i]}.`, { cur: i, chg: new Set([i]), op: 'build' });
    }
    yield* build(1, 0, 7);
    function* query(ql, qr) {
      let acc = 0; const took = new Set(), op = `soma[${ql},${qr}]`;
      function* q(i) {
        const l = L[i], r = R[i], b = () => ({ cur: i, take: new Set(took), op, res: acc });
        yield snap(3, `Visita [${l},${r}] para a consulta [${ql},${qr}].`, b());
        if (qr < l || r < ql) { yield snap(4, `[${l},${r}] está fora: devolve 0.`, b()); return; }
        if (ql <= l && r <= qr) { acc += sum[i]; took.add(i); yield snap(5, `[${l},${r}] está dentro: soma ${sum[i]}. Acumulado: ${acc}.`, b()); return; }
        yield snap(6, `[${l},${r}] cobre só parte: desce nos dois filhos.`, b());
        yield* q(2*i); yield* q(2*i+1);
      }
      yield* q(1);
      yield snap(5, `Resultado: soma[${ql},${qr}] = ${acc}.`, { take: new Set(took), op, res: acc });
    }
    yield* query(2, 6);
    function* update(i, p, v) {
      const op = `a[${p}] = ${v}`;
      yield snap(7, `Desce em direção à folha [${p}] (passando por [${L[i]},${R[i]}]).`, { cur: i, op });
      if (L[i] === R[i]) { sum[i] = v; yield snap(8, `Folha [${p}] agora vale ${v}.`, { cur: i, chg: new Set([i]), op }); return; }
      const m = (L[i] + R[i]) >> 1; yield* update(p <= m ? 2*i : 2*i+1, p, v);
      sum[i] = sum[2*i] + sum[2*i+1];
      yield snap(9, `Na volta, recalcula [${L[i]},${R[i]}] = ${sum[2*i]} + ${sum[2*i+1]} = ${sum[i]}.`, { cur: i, chg: new Set([i]), op });
    }
    yield* update(1, 3, 10);
    yield* query(2, 6);
  }

  function* lazy() {
    const { L, R, sum, lz, snap } = segBase();
    const size = i => R[i] - L[i] + 1;
    (function b(i) { if (L[i] === R[i]) sum[i] = A8[L[i]]; else { b(2*i); b(2*i+1); sum[i] = sum[2*i] + sum[2*i+1]; } })(1);
    yield snap(0, `Árvore já construída com [${A8}]. O selo "+v" vai marcar uma atualização pendente no nó.`);
    function* push(i, op) {
      if (!lz[i] || L[i] === R[i]) return;
      const z = lz[i];
      for (const c of [2*i, 2*i+1]) { sum[c] += z * size(c); lz[c] += z; }
      lz[i] = 0;
      yield snap(6, `Empurra +${z} de [${L[i]},${R[i]}] para os dois filhos antes de descer.`, { cur: i, chg: new Set([i, 2*i, 2*i+1]), op });
    }
    function* update(ql, qr, v) {
      const op = `a[${ql}..${qr}] += ${v}`;
      function* u(i) {
        const l = L[i], r = R[i];
        yield snap(1, `Visita [${l},${r}] para somar ${v} em [${ql},${qr}].`, { cur: i, op });
        if (qr < l || r < ql) { yield snap(2, `[${l},${r}] está fora: nada a fazer.`, { cur: i, op }); return; }
        if (ql <= l && r <= qr) {
          sum[i] += v * size(i); lz[i] += v;
          yield snap(3, `[${l},${r}] está dentro: soma += ${v}×${size(i)} e fica pendente +${v} (não desce!).`, { cur: i, chg: new Set([i]), op });
          return;
        }
        yield snap(4, `[${l},${r}] cobre só parte: empurra pendências e desce.`, { cur: i, op });
        yield* push(i, op); yield* u(2*i); yield* u(2*i+1);
        sum[i] = sum[2*i] + sum[2*i+1];
        yield snap(5, `Na volta, recalcula [${l},${r}] = ${sum[2*i]} + ${sum[2*i+1]} = ${sum[i]}.`, { cur: i, chg: new Set([i]), op });
      }
      yield* u(1);
    }
    yield* update(2, 5, 3);
    function* query(ql, qr) {
      let acc = 0; const took = new Set(), op = `soma[${ql},${qr}]`;
      function* q(i) {
        const l = L[i], r = R[i], b = () => ({ cur: i, take: new Set(took), op, res: acc });
        yield snap(7, `Visita [${l},${r}] para a consulta [${ql},${qr}].`, b());
        if (qr < l || r < ql) { yield snap(7, `[${l},${r}] está fora: devolve 0.`, b()); return; }
        if (ql <= l && r <= qr) { acc += sum[i]; took.add(i); yield snap(7, `[${l},${r}] está dentro: soma ${sum[i]} (já inclui pendências). Acumulado: ${acc}.`, b()); return; }
        yield snap(8, `[${l},${r}] cobre só parte: empurra pendências e soma os filhos.`, b());
        yield* push(i, op); yield* q(2*i); yield* q(2*i+1);
      }
      yield* q(1);
      yield snap(7, `Resultado: soma[${ql},${qr}] = ${acc}.`, { take: new Set(took), op, res: acc });
    }
    yield* query(3, 6);
  }

  const ALGOS = {
    dijkstra: {
      t1: 'Fila de prioridade', t2: 'Distâncias', graph: GRAFO, run: () => dijkstra(GRAFO, 'A'),
      code: [[0,'dist[todos] ← ∞; dist[origem] ← 0'],[0,'PQ ← {(0, origem)}'],
        [0,'enquanto PQ não estiver vazia:'],[1,'(d, u) ← extrai o menor de PQ'],
        [1,'se u já foi visitado: continue'],[1,'marca u como visitado'],
        [1,'para cada vizinho v de u, com peso w:'],[2,'se dist[u] + w < dist[v]:'],
        [3,'dist[v] ← dist[u] + w; PQ.insere(dist[v], v)']]
    },
    bfs: {
      nw: true, t1: 'Fila (início à esquerda)', t2: 'Nível', graph: GRAFO, run: () => bfs(GRAFO, 'A'),
      code: [[0,'fila ← [origem]; nível[origem] ← 0'],[0,'enquanto fila não estiver vazia:'],
        [1,'u ← remove o primeiro da fila'],[1,'para cada vizinho v de u:'],
        [2,'se v ainda não foi descoberto:'],[3,'nível[v] ← nível[u] + 1; fila.adiciona(v)']]
    },
    dfs: {
      nw: true, t1: 'Pilha de chamadas (topo à esquerda)', t2: 'Tempo de descoberta', graph: GRAFO, run: () => dfs(GRAFO, 'A'),
      code: [[0,'tempo ← 0; DFS(origem)'],[0,'DFS(u):'],[1,'descoberta[u] ← ++tempo'],
        [1,'para cada vizinho v de u:'],[2,'se v ainda não foi visitado:'],[3,'DFS(v)'],[1,'u terminou: volta']]
    },
    lcs: {
      kind: 'table', X: 'ABCBDAB', Y: 'BDCABA', run: () => lcs('ABCBDAB', 'BDCABA'),
      code: [[0,'c[i][0] ← 0; c[0][j] ← 0'],[0,'para i de 1 até m:'],[1,'para j de 1 até n:'],
        [2,'se X[i] = Y[j]:'],[3,'c[i][j] ← c[i-1][j-1] + 1'],[2,'senão: c[i][j] ← max(c[i-1][j], c[i][j-1])'],
        [0,'reconstrução: volte de c[m][n] até a borda']]
    },
    segtree: {
      kind: 'segtree', run: segtree,
      code: [[0,'árvore[i] guarda a soma do intervalo [l, r]'],[0,'build: se l = r: árvore[i] ← a[l]'],
        [1,'senão: árvore[i] ← árvore[2i] + árvore[2i+1]'],[0,'soma(i, l, r, ql, qr):'],
        [1,'se [l, r] está fora de [ql, qr]: retorna 0'],[1,'se [l, r] está dentro: retorna árvore[i]'],
        [1,'senão: soma(filho esq) + soma(filho dir)'],[0,'atualiza(i, p, v): desce até a folha p'],
        [1,'se folha: árvore[i] ← v'],[1,'na volta: árvore[i] ← árvore[2i] + árvore[2i+1]']]
    },
    lazy: {
      kind: 'segtree', run: lazy,
      code: [[0,'lazy[i] = valor pendente para todo o intervalo de i'],[0,'atualiza(i, l, r, ql, qr, v):'],
        [1,'se fora: retorna'],[1,'se dentro: árvore[i] += v × tamanho; lazy[i] += v; retorna'],
        [1,'senão: empurra(i); atualiza os dois filhos'],[1,'árvore[i] ← árvore[2i] + árvore[2i+1]'],
        [0,'empurra(i): passa lazy[i] aos filhos e zera lazy[i]'],[0,'soma(i, l, r, ql, qr): fora → 0; dentro → árvore[i]'],
        [1,'senão: empurra(i); soma(esq) + soma(dir)']]
    },
    lca: {
      nw: true, nomin: true, t1: 'up[0] up[1] up[2] de cada nó', t2: 'Profundidade', graph: LCAG, run: () => lca(LCAG, 'H', 'J'),
      code: [[0,'up[0][v] ← pai[v]; up[k][v] ← up[k-1][ up[k-1][v] ]'],[0,'se prof[u] < prof[v]: troca(u, v)'],
        [0,'para k de K-1 até 0: se prof[u] - 2^k ≥ prof[v]: u ← up[k][u]'],[0,'se u = v: retorna u'],
        [0,'para k de K-1 até 0:'],[1,'se up[k][u] ≠ up[k][v]: u ← up[k][u]; v ← up[k][v]'],[0,'retorna up[0][u]']]
    }
  };

  function mount(el) {
    const A = ALGOS[el.dataset.algo];
    if (!A) { el.textContent = 'Algoritmo não encontrado: ' + el.dataset.algo; return; }
    const steps = [...A.run()], g = A.graph;
    let i = 0, timer = null;
    el.innerHTML = `<div class="viz-top"><div class="tb"></div><svg viewBox="0 0 560 300" role="img" aria-label="Grafo"></svg>
      <div class="viz-side"><div><b class="t1"></b><div class="pq"></div></div>
      <div><b class="t2"></b><div class="dd"></div></div></div></div>
      <div class="msg" aria-live="polite"></div>
      <ol class="code">${A.code.map(([n, t]) => `<li style="padding-left:${6 + n * 18}px">${t}</li>`).join('')}</ol>
      <div class="ctl"><button data-a="r" title="Reiniciar">⏮</button><button data-a="b" title="Passo anterior">◀</button>
      <button data-a="p" title="Executar">▶</button><button data-a="f" title="Próximo passo">▶|</button>
      <span class="cnt"></span><label>velocidade <input type="range" min="1" max="10" value="5"></label></div>`;
    const $ = s => el.querySelector(s), lis = el.querySelectorAll('.code li');
    const pos = g ? Object.fromEntries(g.nodes.map(n => [n.id, n])) : {};

    function draw() { const s = steps[i]; A.kind === 'table' ? drawTable(s) : A.kind === 'segtree' ? drawSeg(s) : drawGraph(s); common(s); }
    function drawSeg(s) {
      const X = i => 40 + ((s.L[i] + s.R[i]) / 2 + 0.5) * 60, Y = i => 36 + (31 - Math.clz32(i)) * 66;
      let h = '';
      for (let k = 2; k <= 15; k++) h += `<line class="e" x1="${X(k >> 1)}" y1="${Y(k >> 1)}" x2="${X(k)}" y2="${Y(k)}"/>`;
      for (let k = 1; k <= 15; k++) {
        const c = ['n', s.take.has(k) ? 'vis' : '', s.cur === k ? 'cur' : '', s.chg.has(k) ? 'tgt' : ''].join(' ');
        h += `<g class="${c}"><circle cx="${X(k)}" cy="${Y(k)}" r="20"/><text class="l" x="${X(k)}" y="${Y(k) + 5}">${s.sum[k] == null ? '?' : s.sum[k]}</text>
          <text class="d" x="${X(k)}" y="${Y(k) + 34}">[${s.L[k]},${s.R[k]}]</text>
          ${s.lz[k] ? `<text class="w" style="fill:var(--hot);font-weight:700" x="${X(k) + 24}" y="${Y(k) - 12}">+${s.lz[k]}</text>` : ''}</g>`;
      }
      $('svg').innerHTML = h;
      $('.t1').textContent = 'Operação'; $('.pq').innerHTML = `<span class="chip">${s.op}</span>`;
      $('.t2').textContent = 'Resultado'; $('.dd').innerHTML = `<span class="chip">${s.res}</span>`;
    }
    function drawTable(s) {
      const pa = new Set(s.path.map(p => p.join()));
      $('svg').style.display = 'none'; $('.viz-side').style.display = 'none';
      let h = '<table><tr><th></th><th></th>' + [...A.Y].map(c => `<th>${c}</th>`).join('') + '</tr>';
      s.t.forEach((row, r) => { h += `<tr><th>${r ? A.X[r-1] : ''}</th>` + row.map((v, c) =>
        `<td class="${s.cur && s.cur[0] === r && s.cur[1] === c ? 'cur' : ''} ${pa.has(r + ',' + c) ? 'path' : ''}">${v == null ? '' : v}</td>`).join('') + '</tr>'; });
      $('.tb').innerHTML = h + '</table>';
    }
    function drawGraph(s) {
      let h = ''; $('.t1').textContent = A.t1; $('.t2').textContent = A.t2;
      g.edges.forEach(([a, b, w]) => {
        const act = (s.u === a && s.v === b) || (s.u === b && s.v === a);
        const tree = s.prev[a] === b || s.prev[b] === a;
        h += `<line class="e ${act ? 'act' : tree ? 'tree' : ''}" x1="${pos[a].x}" y1="${pos[a].y}" x2="${pos[b].x}" y2="${pos[b].y}"/>
          <text class="w" x="${(pos[a].x + pos[b].x) / 2}" y="${(pos[a].y + pos[b].y) / 2 - 6}">${A.nw ? '' : w}</text>`;
      });
      g.nodes.forEach(n => {
        const c = ['n', s.vis.has(n.id) ? 'vis' : '', s.u === n.id ? 'cur' : '', s.v === n.id ? 'tgt' : ''].join(' ');
        h += `<g class="${c}"><circle cx="${n.x}" cy="${n.y}" r="22"/><text class="l" x="${n.x}" y="${n.y + 5}">${n.id}</text>
          <text class="d" x="${n.x}" y="${n.y + 38}">${fmt(s.dist[n.id])}</text></g>`;
      });
      $('svg').innerHTML = h;
      $('.pq').innerHTML = s.pq.length ? s.pq.map((p, k) => `<span class="chip ${k || A.nomin ? '' : 'min'}">${p}</span>`).join('') : '<i>vazia</i>';
      $('.dd').innerHTML = g.nodes.map(n => `<span class="chip">${n.id}: ${fmt(s.dist[n.id])}</span>`).join('');
    }
    function common(s) {
      $('.msg').textContent = s.msg;
      lis.forEach((li, k) => li.classList.toggle('on', k === s.line));
      $('.cnt').textContent = `passo ${i + 1}/${steps.length}`;
    }
    const stop = () => { clearInterval(timer); timer = null; el.querySelector('[data-a=p]').textContent = '▶'; };
    const go = d => { i = Math.max(0, Math.min(steps.length - 1, i + d)); draw(); };
    function play() {
      if (timer) return stop();
      if (i >= steps.length - 1) i = 0;
      el.querySelector('[data-a=p]').textContent = '⏸';
      const ms = 1100 - $('input').value * 100;
      timer = setInterval(() => { if (i >= steps.length - 1) return stop(); go(1); }, ms);
    }
    el.addEventListener('click', e => {
      const a = e.target.dataset && e.target.dataset.a; if (!a) return;
      if (a === 'p') play(); else { stop(); if (a === 'r') { i = 0; draw(); } else go(a === 'f' ? 1 : -1); }
    });
    $('input').addEventListener('input', () => { if (timer) { stop(); play(); } });
    draw();
  }
  const init = () => document.querySelectorAll('.viz[data-algo]').forEach(el => {
    try { mount(el); } catch (e) { el.textContent = 'Erro na visualização: ' + e.message; }
  });
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
