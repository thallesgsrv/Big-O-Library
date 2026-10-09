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

  /* ---------- Ordenação: desenho de vetores (kind: 'array') ---------- */
  const faixa = (x, y) => (x > y ? 'vazio' : x === y ? `[${x}]` : `[${x}..${y}]`);

  function* selection() {
    const a = [29, 10, 14, 37, 13], n = a.length, sorted = new Set();
    let cmpN = 0, swN = 0, menorV = null;
    const snap = (line, msg, x = {}) => ({ line, msg, a: [...a], sorted: new Set(sorted),
      p1: menorV == null ? [] : [`menor até agora: ${menorV}`], p2: [`comparações: ${cmpN}`, `trocas: ${swN}`], ...x });
    yield snap(0, 'Vamos ordenar [29, 10, 14, 37, 13]. A cada rodada, procuramos o menor elemento do trecho que ainda não está ordenado e o colocamos no começo dele.');
    for (let i = 0; i < n - 1; i++) {
      let menor = i; menorV = a[i];
      yield snap(1, `Rodada ${i + 1}: vamos preencher a posição ${i}. Por enquanto o menor é ${a[i]}, o primeiro do trecho.`, { ptr: { i }, cur: new Set([i]) });
      for (let j = i + 1; j < n; j++) {
        cmpN++;
        const antes = a[menor], achou = a[j] < antes;
        if (achou) { menor = j; menorV = a[j]; }
        yield snap(3, achou ? `${a[j]} < ${antes}: achamos um menor! Guarda o índice ${j}.` : `${a[j]} < ${antes}? Não. O menor continua sendo ${antes}.`,
          { ptr: { i, j, menor }, cur: new Set([menor]), cmp: achou ? new Set() : new Set([j]) });
      }
      sorted.add(i);
      if (menor !== i) {
        const x = a[i], y = a[menor];
        [a[i], a[menor]] = [a[menor], a[i]]; swN++;
        yield snap(4, `Fim da varredura. Troca ${x} (posição ${i}) com ${y} (posição ${menor}): agora ${y} está no lugar definitivo.`, { cmp: new Set([i, menor]) });
      } else {
        yield snap(4, `Fim da varredura. ${a[i]} já era o menor do trecho: fica onde está, sem troca.`, { cur: new Set([i]) });
      }
    }
    sorted.add(n - 1); menorV = null;
    yield snap(0, `Pronto! Foram ${cmpN} comparações (sempre n(n-1)/2 = ${n * (n - 1) / 2}, mesmo se o vetor já estivesse ordenado) e só ${swN} trocas.`, { done: true });
  }

  function* insertion() {
    const a = [5, 2, 4, 6, 1, 3], n = a.length;
    let cmpN = 0, shN = 0, chave = null;
    const pref = e => new Set(Array.from({ length: e + 1 }, (_, k) => k));
    const snap = (line, msg, x = {}) => ({ line, msg, a: [...a], p1: chave == null ? [] : [`chave = ${chave}`],
      p2: [`comparações: ${cmpN}`, `deslocamentos: ${shN}`], ...x });
    yield snap(0, 'Vamos ordenar [5, 2, 4, 6, 1, 3]. O primeiro elemento sozinho já é um trecho ordenado; vamos encaixar os próximos, um por vez.', { sorted: new Set([0]) });
    for (let i = 1; i < n; i++) {
      chave = a[i]; let j = i - 1; a[i] = null;
      yield snap(1, `Pega a chave ${chave} (posição ${i}) e abre um buraco. À esquerda dele, o trecho já está ordenado.`, { sorted: pref(i), float: { idx: i, val: chave }, ptr: { j } });
      while (j >= 0) {
        cmpN++;
        if (a[j] > chave) {
          shN++; a[j + 1] = a[j]; a[j] = null;
          yield snap(3, `${a[j + 1]} > ${chave}: o ${a[j + 1]} desliza uma casa para a direita.`, { sorted: pref(i), float: { idx: j, val: chave }, ptr: { j: j - 1 } });
          j--;
        } else {
          yield snap(2, `${a[j]} ≤ ${chave}: a chave não passa dele. O buraco está no lugar certo.`, { sorted: pref(i), float: { idx: j + 1, val: chave }, ptr: { j }, cmp: new Set([j]) });
          break;
        }
      }
      if (j < 0) yield snap(2, 'Chegou ao começo do vetor: o buraco está na posição 0.', { sorted: pref(i), float: { idx: 0, val: chave } });
      a[j + 1] = chave;
      yield snap(4, `Solta a chave ${chave} na posição ${j + 1}. Agora o trecho [0..${i}] está ordenado.`, { sorted: pref(i), cur: new Set([j + 1]) });
    }
    chave = null;
    yield snap(0, `Pronto! ${cmpN} comparações e ${shN} deslocamentos. Em um vetor que já estivesse ordenado seriam só ${n - 1} comparações e nenhum deslocamento.`, { sorted: pref(n - 1), done: true });
  }

  function* merge() {
    const a = [7, 3, 9, 1, 5, 8, 2, 6], n = a.length, done = new Set();
    let cmpN = 0, aux = [], inter = null;
    const auxRow = (l, hi) => ({ name: 'aux (resultado parcial do merge)',
      vals: Array.from({ length: n }, (_, k) => (k >= l && k - l < aux.length ? aux[k - l] : null)), hi });
    const snap = (line, msg, x = {}) => ({ line, msg, a: [...a], sorted: new Set(done),
      p1: inter ? [`intervalo [${inter[0]}..${inter[1]}]`] : [], p2: [`comparações: ${cmpN}`], ...x });
    yield snap(0, 'Vamos ordenar [7, 3, 9, 1, 5, 8, 2, 6]. Primeiro dividimos até sobrarem pedaços de um elemento (que já estão ordenados); depois vamos juntando.');
    function* mg(l, m, r) {
      aux = []; let i = l, j = m + 1; inter = [l, r];
      const base = { rng: [l, r], mid: m };
      yield snap(4, `Merge: junta [${a.slice(l, m + 1)}] e [${a.slice(m + 1, r + 1)}], que já estão ordenados. Um "dedo" (i, j) em cada lado.`, { ...base, ptr: { i, j }, rows: [auxRow(l)] });
      while (i <= m && j <= r) {
        cmpN++;
        const left = a[i] <= a[j], pi = i, pj = j;
        const msg = left ? `${a[i]} ≤ ${a[j]}: copia ${a[i]}, da esquerda.` : `${a[i]} > ${a[j]}: copia ${a[j]}, da direita.`;
        aux.push(left ? a[i] : a[j]); if (left) i++; else j++;
        yield snap(5, msg, { ...base, ptr: { i: pi, j: pj }, cmp: new Set([pi, pj]), rows: [auxRow(l, new Set([l + aux.length - 1]))] });
      }
      while (i <= m) {
        const pi = i; aux.push(a[i]); i++;
        yield snap(6, `A direita acabou. Copia o ${a[pi]}, que sobrou na esquerda.`, { ...base, ptr: { i: pi }, cur: new Set([pi]), rows: [auxRow(l, new Set([l + aux.length - 1]))] });
      }
      while (j <= r) {
        const pj = j; aux.push(a[j]); j++;
        yield snap(6, `A esquerda acabou. Copia o ${a[pj]}, que sobrou na direita.`, { ...base, ptr: { j: pj }, cur: new Set([pj]), rows: [auxRow(l, new Set([l + aux.length - 1]))] });
      }
      for (let k = 0; k < aux.length; k++) a[l + k] = aux[k];
      for (let k = l; k <= r; k++) done.add(k);
      yield snap(7, `Copia o resultado de volta para o vetor: [${l}..${r}] agora está ordenado: [${aux}].`, { rng: [l, r], rows: [auxRow(l)] });
    }
    function* ms(l, r) {
      if (l >= r) return;
      const m = (l + r) >> 1; inter = [l, r];
      yield snap(2, `Divide [${l}..${r}] no meio: esquerda [${l}..${m}] e direita [${m + 1}..${r}]. Cada metade será ordenada recursivamente.`, { rng: [l, r], mid: m });
      yield* ms(l, m); yield* ms(m + 1, r); yield* mg(l, m, r);
    }
    yield* ms(0, n - 1); inter = null;
    yield snap(0, `Pronto! ${cmpN} comparações. Qualquer que fosse a ordem inicial, o trabalho seria praticamente o mesmo: n log n.`, { done: true });
  }

  function* quick() {
    const a = [8, 3, 6, 2, 9, 1, 5], n = a.length, sorted = new Set();
    let cmpN = 0, swN = 0, pivo = null;
    const snap = (line, msg, x = {}) => ({ line, msg, a: [...a], sorted: new Set(sorted),
      p1: pivo == null ? [] : [`pivô = ${pivo}`], p2: [`comparações: ${cmpN}`, `trocas: ${swN}`], ...x });
    const troca = (x, y) => { if (x !== y) { [a[x], a[y]] = [a[y], a[x]]; swN++; } };
    yield snap(0, 'Vamos ordenar [8, 3, 6, 2, 9, 1, 5]. Em cada pedaço, escolhemos o último elemento como pivô e o levamos para a posição definitiva.');
    function* part(l, r) {
      pivo = a[r]; let i = l - 1;
      yield snap(4, `Particiona [${l}..${r}]. O pivô é o último elemento: ${pivo}. O j vai varrer o trecho; o i marca o fim da região dos menores ou iguais.`, { rng: [l, r], ptr: { i, j: l }, cur: new Set([r]) });
      for (let j = l; j < r; j++) {
        cmpN++;
        if (a[j] <= pivo) {
          i++; const x = a[i], y = a[j];
          troca(i, j);
          yield snap(6, i === j ? `${y} ≤ ${pivo}: é pequeno. i vai para ${i}; o elemento já está na fronteira, então a troca é consigo mesmo.`
            : `${y} ≤ ${pivo}: é pequeno! i vai para ${i} e troca ${x} com ${y}: o ${y} entra na região dos menores.`,
            { rng: [l, r], ptr: { i, j }, cur: new Set([r]), cmp: new Set([i, j]) });
        } else {
          yield snap(6, `${a[j]} ≤ ${pivo}? Não, é maior. Fica onde está, à direita da região dos menores.`, { rng: [l, r], ptr: { i, j }, cur: new Set([r]), cmp: new Set([j]) });
        }
      }
      troca(i + 1, r); sorted.add(i + 1);
      yield snap(7, `Fim do laço. Troca o pivô ${pivo} com a posição ${i + 1}: ele está no lugar definitivo. À esquerda só há valores ≤ ${pivo}; à direita, só maiores.`, { rng: [l, r], cur: new Set([i + 1]) });
      return i + 1;
    }
    function* qs(l, r) {
      if (l > r) return;
      if (l === r) { sorted.add(l); pivo = null; yield snap(1, `O trecho [${l}] tem um elemento só: já está no lugar.`, { rng: [l, r] }); return; }
      const p = yield* part(l, r);
      yield snap(3, `Pivô no lugar. Agora repetimos na esquerda (${faixa(l, p - 1)}) e na direita (${faixa(p + 1, r)}).`, { rng: [l, r] });
      yield* qs(l, p - 1); yield* qs(p + 1, r);
    }
    yield* qs(0, n - 1); pivo = null;
    yield snap(0, `Pronto! ${cmpN} comparações e ${swN} trocas. Cada pivô foi parar na sua posição final e o vetor ficou ordenado.`, { done: true });
  }

  function* counting() {
    const a = [4, 1, 3, 4, 3, 0, 1, 4], n = a.length, k = 4;
    const cont = Array(k + 1).fill(0), saida = Array(n).fill(null), fade = new Set();
    let fase = 'contar', nome = 'cont (quantas vezes cada valor aparece)';
    const rows = (hc = new Set(), hs = new Set()) => [{ name: nome, vals: [...cont], hi: hc, ix: true }, { name: 'saída', vals: [...saida], hi: hs }];
    const snap = (line, msg, x = {}) => ({ line, msg, a: [...a], fade: new Set(fade), p1: [`fase: ${fase}`], p2: [`n = ${n}`, `k = ${k}`], rows: rows(), ...x });
    yield snap(0, `Vamos ordenar [4, 1, 3, 4, 3, 0, 1, 4]. Sabemos que os valores vão de 0 a ${k}, então criamos um contador para cada valor possível, todos em zero.`);
    for (let i = 0; i < n; i++) {
      cont[a[i]]++;
      yield snap(1, `Lê ${a[i]}: cont[${a[i]}] vira ${cont[a[i]]}.`, { cur: new Set([i]), rows: rows(new Set([a[i]])) });
    }
    fase = 'acumular'; nome = 'cont (acumulada: quantos elementos são ≤ valor)';
    yield snap(2, 'Contagem pronta. Agora somamos cada posição com a anterior. Assim, cont[v] passa a dizer quantos elementos são menores ou iguais a v.');
    for (let i = 1; i <= k; i++) {
      const antes = cont[i]; cont[i] += cont[i - 1];
      yield snap(2, `cont[${i}] = ${antes} + ${cont[i - 1]} = ${cont[i]}: existem ${cont[i]} elementos ≤ ${i}, então o último ${i} termina na posição ${cont[i] - 1}.`, { rows: rows(new Set([i])) });
    }
    fase = 'distribuir';
    yield snap(3, 'Agora percorremos o vetor de trás para frente. Isso mantém, entre valores iguais, a ordem original (estabilidade).');
    for (let i = n - 1; i >= 0; i--) {
      const x = a[i]; cont[x]--; const pos = cont[x]; saida[pos] = x;
      yield snap(4, `v[${i}] = ${x}: cont[${x}] diminui para ${pos}, então o ${x} vai para a posição ${pos} da saída.`, { cur: new Set([i]), rows: rows(new Set([x]), new Set([pos])) });
      fade.add(i);
    }
    yield snap(0, 'A saída está pronta: cada elemento foi direto para a sua posição, sem nenhuma comparação entre elementos. Custo: n + k.',
      { a: [...saida], sorted: new Set(saida.map((_, i) => i)), fade: new Set(), done: true });
  }

  function* radix() {
    let a = [531, 82, 405, 217, 90, 346];
    const n = a.length, dig = (x, e) => Math.floor(x / e) % 10;
    const nomes = ['unidades', 'dezenas', 'centenas'];
    const quem = ['o último dígito (unidades)', 'o dígito do meio (dezenas)', 'o primeiro dígito (centenas)'];
    yield { line: 0, msg: 'Vamos ordenar [531, 82, 405, 217, 90, 346] dígito por dígito, do menos para o mais significativo. Cada passada é um counting sort só sobre aquele dígito.', a: [...a], p1: [], p2: ['3 passadas'] };
    for (let p = 0, e = 1; p < 3; p++, e *= 10) {
      const cont = Array(10).fill(0), saida = Array(n).fill(null), fade = new Set(); let acum = false;
      const digs = a.map(x => dig(x, e));
      const rows = (hc = new Set(), hs = new Set(), dg = digs) => [{ name: `dígito das ${nomes[p]}`, vals: dg },
        { name: acum ? 'cont (acumulada)' : 'cont (quantos têm cada dígito)', vals: [...cont], hi: hc, ix: true }, { name: 'saída', vals: [...saida], hi: hs }];
      const snap = (line, msg, x = {}) => ({ line, msg, a: [...a], fade: new Set(fade), p1: [`dígito: ${nomes[p]}`], p2: [`passada ${p + 1} de 3`], rows: rows(), ...x });
      yield snap(0, `Passada ${p + 1}: olhamos só ${quem[p]} de cada número. Quem não tem esse dígito conta como 0.`);
      for (let i = 0; i < n; i++) {
        const d = digs[i]; cont[d]++;
        yield snap(1, `${a[i]} tem dígito ${d}: cont[${d}] vira ${cont[d]}.`, { cur: new Set([i]), rows: rows(new Set([d])) });
      }
      for (let i = 1; i < 10; i++) cont[i] += cont[i - 1];
      acum = true;
      yield snap(2, 'Somas acumuladas: cont[d] diz quantos elementos têm dígito ≤ d, ou seja, onde termina o grupo de cada dígito na saída.');
      for (let i = n - 1; i >= 0; i--) {
        const d = digs[i]; cont[d]--; const pos = cont[d]; saida[pos] = a[i];
        yield snap(4, `${a[i]} (dígito ${d}) vai para a posição ${pos}. Vamos de trás para frente para manter a ordem dos que têm o mesmo dígito.`, { cur: new Set([i]), rows: rows(new Set([d]), new Set([pos])) });
        fade.add(i);
      }
      a = [...saida];
      yield snap(5, `Fim da passada ${p + 1}: ordenado pelas ${nomes[p]}${p < 2 ? '. Quem empatou continua na ordem da passada anterior.' : '.'}`,
        { fade: new Set(), sorted: p === 2 ? new Set(a.map((_, i) => i)) : undefined, rows: rows(new Set(), new Set(), a.map(x => dig(x, e))) });
    }
    yield { line: 0, msg: 'Pronto! O vetor está ordenado sem comparar números entre si: 3 passadas, cada uma custando n + 10.', a: [...a], sorted: new Set(a.map((_, i) => i)), p1: [], p2: ['3 passadas'], done: true };
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
    },
    selection: {
      kind: 'array', t1: 'Menor encontrado', t2: 'Operações', run: selection,
      code: [[0,'para i de 0 até n-2:'],[1,'menor ← i'],[1,'para j de i+1 até n-1:'],[2,'se v[j] < v[menor]: menor ← j'],[1,'troca(v[i], v[menor])']]
    },
    insertion: {
      kind: 'array', t1: 'Chave', t2: 'Operações', run: insertion,
      code: [[0,'para i de 1 até n-1:'],[1,'chave ← v[i]; j ← i-1'],[1,'enquanto j ≥ 0 e v[j] > chave:'],[2,'v[j+1] ← v[j]; j ← j-1'],[1,'v[j+1] ← chave']]
    },
    merge: {
      kind: 'array', t1: 'Trecho atual', t2: 'Operações', run: merge,
      code: [[0,'mergeSort(esq, dir):'],[1,'se esq ≥ dir: retorna (um elemento já está ordenado)'],[1,'meio ← (esq + dir) / 2'],
        [1,'mergeSort(esq, meio); mergeSort(meio+1, dir); merge(esq, meio, dir)'],[0,'merge(esq, meio, dir):  i ← esq; j ← meio+1'],
        [1,'enquanto i ≤ meio e j ≤ dir: copia o menor para aux (v[i] ≤ v[j] → esquerda)'],[1,'copia para aux o que sobrou de qualquer lado'],
        [1,'copia aux de volta para v[esq..dir]']]
    },
    quick: {
      kind: 'array', t1: 'Pivô', t2: 'Operações', run: quick,
      code: [[0,'quickSort(esq, dir):'],[1,'se esq < dir:'],[2,'p ← particiona(esq, dir)'],[2,'quickSort(esq, p-1); quickSort(p+1, dir)'],
        [0,'particiona(esq, dir):  pivô ← v[dir]; i ← esq-1'],[1,'para j de esq até dir-1:'],[2,'se v[j] ≤ pivô: i++; troca(v[i], v[j])'],
        [1,'troca(v[i+1], v[dir]); retorna i+1']]
    },
    counting: {
      kind: 'array', t1: 'Fase', t2: 'Tamanhos', run: counting,
      code: [[0,'cont[0..k] ← 0'],[0,'para cada x em v: cont[x]++'],[0,'para i de 1 até k: cont[i] += cont[i-1]'],
        [0,'para i de n-1 até 0 (de trás para frente):'],[1,'cont[v[i]]--; saida[cont[v[i]]] ← v[i]']]
    },
    radix: {
      kind: 'array', t1: 'Dígito da passada', t2: 'Passada', run: radix,
      code: [[0,'para cada dígito, do menos significativo ao mais:'],[1,'conta quantos elementos têm cada dígito d: cont[d]++'],
        [1,'cont[i] += cont[i-1] (somas acumuladas)'],[1,'para i de n-1 até 0 (de trás para frente):'],
        [2,'cont[d]--; saida[cont[d]] ← v[i]   (d = dígito de v[i])'],[1,'v ← saida']]
    }
  };

  function mount(el) {
    const A = ALGOS[el.dataset.algo];
    if (!A) { el.textContent = 'Algoritmo não encontrado: ' + el.dataset.algo; return; }
    const steps = [...A.run()], g = A.graph;
    const isArr = A.kind === 'array';
    const vmax = isArr ? Math.max(...steps.flatMap(s => s.a).filter(x => x != null)) : 1;
    const H = isArr ? 216 + Math.max(...steps.map(s => (s.rows || []).length)) * 62 : 300;
    let i = 0, timer = null;
    el.innerHTML = `<div class="viz-top"><svg viewBox="0 0 560 ${H}" role="img" aria-label="${isArr ? 'Vetor' : 'Grafo'}"></svg>
      <div class="viz-side"><div><b class="t1"></b><div class="pq"></div></div>
      <div><b class="t2"></b><div class="dd"></div></div></div></div>
      <div class="msg" aria-live="polite"></div>
      <ol class="code">${A.code.map(([n, t]) => `<li style="padding-left:${6 + n * 18}px">${t}</li>`).join('')}</ol>
      <div class="ctl"><button data-a="r" title="Reiniciar">⏮</button><button data-a="b" title="Passo anterior">◀</button>
      <button data-a="p" title="Executar">▶</button><button data-a="f" title="Próximo passo">▶|</button>
      <span class="cnt"></span><label>velocidade <input type="range" min="1" max="10" value="5"></label></div>`;
    const $ = s => el.querySelector(s), lis = el.querySelectorAll('.code li');
    const pos = g ? Object.fromEntries(g.nodes.map(n => [n.id, n])) : {};

    function draw() { const s = steps[i]; A.kind === 'segtree' ? drawSeg(s) : isArr ? drawArr(s) : drawGraph(s); common(s); }
    function drawArr(s) {
      const n = s.a.length, slot = Math.min(60, 520 / n), bw = slot * 0.7, base = 170, X = k => 20 + slot * (k + .5);
      const hh = v => 12 + (v / vmax) * 118, fade = s.fade || new Set(), rng = s.rng;
      let h = '';
      s.a.forEach((v, k) => {
        if (v == null) return;
        const cls = ['bar', s.sorted && s.sorted.has(k) ? 'ok' : '', s.cur && s.cur.has(k) ? 'cur' : '', s.cmp && s.cmp.has(k) ? 'cmp' : ''].join(' ');
        const dim = fade.has(k) || (rng && (k < rng[0] || k > rng[1]));
        h += `<g class="${dim ? 'fade' : ''}"><rect class="${cls}" x="${X(k) - bw / 2}" y="${base - hh(v)}" width="${bw}" height="${hh(v)}" rx="3"/><text class="bv" x="${X(k)}" y="${base - hh(v) - 5}">${v}</text></g>`;
      });
      if (s.float) {
        const f = s.float;
        h += `<g><rect class="bar cur" x="${X(f.idx) - bw / 2}" y="${base - hh(f.val) - 16}" width="${bw}" height="${hh(f.val)}" rx="3"/><text class="bv" x="${X(f.idx)}" y="${base - hh(f.val) - 21}">${f.val}</text></g>`;
      }
      if (s.mid != null) h += `<line class="sep" x1="${20 + slot * (s.mid + 1)}" x2="${20 + slot * (s.mid + 1)}" y1="12" y2="${base + 4}"/>`;
      const pm = {};
      Object.entries(s.ptr || {}).forEach(([nm, k]) => { if (k != null && k >= 0 && k < n) (pm[k] = pm[k] || []).push(nm); });
      for (let k = 0; k < n; k++) {
        h += `<text class="bi" x="${X(k)}" y="${base + 15}">${k}</text>`;
        if (pm[k]) h += `<text class="bp" x="${X(k)}" y="${base + 31}">${pm[k].join(',')}</text>`;
      }
      let y0 = base + 52;
      (s.rows || []).forEach(r => {
        const len = r.vals.length, w = len === n ? slot : Math.min(50, 520 / len);
        h += `<text class="rn" x="20" y="${y0}">${r.name}</text>`;
        r.vals.forEach((v, k) => {
          const x = 20 + w * k;
          h += `<rect class="cell ${r.hi && r.hi.has(k) ? 'hi' : ''}" x="${x + 2}" y="${y0 + 6}" width="${w - 4}" height="26" rx="4"/><text class="cl" x="${x + w / 2}" y="${y0 + 24}">${v == null ? '' : v}</text>`;
          if (r.ix) h += `<text class="bi" x="${x + w / 2}" y="${y0 + 45}">${k}</text>`;
        });
        y0 += 62;
      });
      $('svg').innerHTML = h;
      $('.t1').textContent = A.t1; $('.t2').textContent = A.t2;
      const chips = l => (l && l.length ? l.map(p => `<span class="chip">${p}</span>`).join('') : '<i>–</i>');
      $('.pq').innerHTML = chips(s.p1); $('.dd').innerHTML = chips(s.p2);
    }
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
