const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const SRC = fs.readFileSync(path.join(__dirname, '..', '..', 'themes', 'big-o-library', 'assets', 'viz', 'viz.js'), 'utf8');
const sandbox = { document: { readyState: 'complete', querySelectorAll: () => [] }, globalThis: null };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(SRC.replace('const init', 'globalThis.ALGOS = ALGOS; const init'), sandbox);
const ALGOS = sandbox.ALGOS;
const passos = nome => [...ALGOS[nome].run()];
const SORTS = ['selection', 'insertion', 'merge', 'quick', 'counting', 'radix', 'bubble', 'heap'];
const crescente = a => a.every((x, i) => i === 0 || a[i - 1] <= x);

test('todos os algoritmos registrados geram passos válidos', () => {
  const nomes = Object.keys(ALGOS);
  assert.ok(nomes.length >= 15, 'esperava ao menos 15 algoritmos, achou ' + nomes.length);
  for (const nome of nomes) {
    const A = ALGOS[nome], st = passos(nome);
    assert.ok(st.length >= 3, `${nome}: poucos passos (${st.length})`);
    assert.ok(st.length <= 400, `${nome}: passos demais (${st.length}); o motor calcula tudo antes de rodar`);
    st.forEach((s, k) => {
      assert.equal(typeof s.msg, 'string', `${nome}[${k}]: falta msg`);
      assert.ok(s.msg.length > 0, `${nome}[${k}]: msg vazia`);
      assert.ok(Number.isInteger(s.line) && s.line >= 0 && s.line < A.code.length,
        `${nome}[${k}]: line=${s.line} fora do pseudocódigo (${A.code.length} linhas)`);
    });
  }
});

test('cada gerador devolve cópias do estado (passos não compartilham o mesmo vetor)', () => {
  for (const nome of SORTS) {
    const st = passos(nome);
    const arrays = new Set(st.map(s => s.a));
    assert.equal(arrays.size, st.length, `${nome}: vetores compartilhados entre passos`);
  }
});

for (const nome of SORTS) {
  test(`${nome}: termina com o vetor ordenado e sem buracos`, () => {
    const st = passos(nome), ultimo = st.at(-1);
    const a = nome === 'counting' || nome === 'radix' ? ultimo.rows?.at(-1)?.vals ?? ultimo.a : ultimo.a;
    const vetor = (ultimo.a.every(x => x != null) ? ultimo.a : a);
    assert.ok(vetor.every(x => x != null), `${nome}: buraco no resultado final`);
    assert.ok(crescente(vetor), `${nome}: resultado final fora de ordem: ${vetor}`);
  });
}

test('bubble sort: para cedo quando uma rodada não troca nada', () => {
  const ult = passos('bubble').at(-1).msg;
  assert.match(ult, /Pronto/);
});

test('busca binária: acha o alvo 23 na posição 5 em 3 comparações', () => {
  const st = passos('binary'), ult = st.at(-1);
  assert.ok(ult.done);
  assert.match(ult.msg, /posição 5/);
  assert.match(ult.msg, /3 comparações/);
});

test('heap sort: o heap máximo está correto antes da fase de extração', () => {
  const st = passos('heap');
  const pronto = st.find(s => s.msg.startsWith('Heap máximo pronto'));
  assert.ok(pronto, 'não achou o passo "Heap máximo pronto"');
  const a = pronto.a;
  for (let i = 0; i < a.length; i++) {
    for (const f of [2 * i + 1, 2 * i + 2]) if (f < a.length) assert.ok(a[i] >= a[f], `violação do heap: v[${i}]=${a[i]} < v[${f}]=${a[f]}`);
  }
});

test('Dijkstra: distâncias finais corretas a partir de A', () => {
  const ult = passos('dijkstra').at(-1);
  assert.deepEqual({ ...ult.dist }, { A: 0, B: 7, C: 9, D: 20, E: 20, F: 11 });
});

test('BFS: níveis a partir de A', () => {
  const d = passos('bfs').at(-1).dist;
  assert.equal(d.A, 0);
  assert.equal(d.B, 1);
  assert.equal(d.C, 1);
  assert.equal(d.F, 1);
});
