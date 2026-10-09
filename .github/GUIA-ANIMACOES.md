# Guia: como criar a animação de um algoritmo

Você não escreve animação: escreve o algoritmo e marca o que quer mostrar. O motor (`themes/big-o-library/assets/viz/viz.js`) desenha.

## Como funciona

Cada algoritmo é uma função geradora (`function*`). Em cada ponto interessante você dá um `yield` com uma "foto" do estado. O motor guarda todas as fotos numa lista e os botões ▶ ◀ ▶| só navegam por ela (por isso o botão voltar funciona sem esforço).

    seu gerador  →  lista de fotos  →  motor desenha a foto atual
    (algoritmo)     [{line, msg,…}]    + acende a linha do pseudocódigo

Toda foto tem `line` (linha do pseudocódigo a destacar) e `msg` (frase que explica o passo).

## Desenhos disponíveis (`kind`)

| kind | serve para | campos da foto além de line/msg |
| --- | --- | --- |
| *(grafo, padrão)* | grafos, árvores comuns | `dist`, `prev`, `vis` (Set), `pq` (lista de textos), `u`, `v` |
| `segtree` | árvores de segmentos | `L`, `R`, `sum`, `lz`, `cur`, `take`, `chg`, `op`, `res` |
| `array` | algoritmos de ordenação (vetores) | `a`, `sorted`, `cur`, `cmp`, `fade`, `rng`, `mid`, `ptr`, `float`, `rows`, `p1`, `p2` |

### Desenho `array` (ordenação)

Mostra o vetor `a` como barras. Todos os campos abaixo são opcionais, exceto `a` (use `null` para um "buraco"):

| campo | o que faz |
| --- | --- |
| `sorted` (Set de índices) | barras verdes: já estão no lugar certo |
| `cur` (Set) | barras azuis: elemento em foco (chave, pivô, menor até agora) |
| `cmp` (Set) | barras laranja: sendo comparadas ou trocadas |
| `fade` (Set) | barras esmaecidas: já usadas |
| `rng: [l, r]` | esmaece tudo fora do intervalo (merge e quick) |
| `mid` | linha tracejada entre `mid` e `mid + 1` (merge) |
| `ptr: { i: 2, j: 5 }` | rótulos azuis sob as barras; índice `null`, negativo ou fora do vetor é ignorado |
| `float: { idx, val }` | barra "levantada" (a chave do insertion sort) |
| `rows: [{ name, vals, hi, ix }]` | linhas de células abaixo do vetor (aux, cont, saída); `hi` = Set de células destacadas, `ix: true` mostra os índices |
| `p1`, `p2` (listas de textos) | chips dos painéis laterais (títulos em `t1` e `t2`) |

O vetor de cada passo precisa ser uma cópia (`[...a]`). A altura do desenho se ajusta ao maior número de `rows` entre todos os passos. Exemplos: `selection`, `merge` e `radix` em `viz.js`.

Grafos: nós e arestas ficam em `GRAFO`/`LCAG`; opções da entrada: `nw: true` (esconde pesos), `nomin: true` (não destaca o 1º chip do painel), `t1`/`t2` (títulos dos painéis).

## Passo a passo (exemplo: busca em largura, desenho de grafo)

1. **Pseudocódigo** como `[indentação, texto]`; o número da linha é a posição na lista:

       code: [[0,'fila ← [s]'], [0,'enquanto a fila não está vazia:'], [1,'u ← desenfileira()'], ...]

2. **Gerador** com uma função `snap` que copia o estado (veja `bfs` em `viz.js`):

       function* bfs(g, s) {
         const vis = new Set(), fila = [s];
         const snap = (line, msg, x = {}) => ({ line, msg, vis: new Set(vis), pq: [...fila], ...x });
         yield snap(0, 'Começa pela origem.');
         ...
       }

3. **Registrar** em `ALGOS` (fim do viz.js):

       bfs: { nw: true, t1: 'Fila', t2: 'Nível', graph: GRAFO, run: () => bfs(GRAFO, 'A'), code: [ ... ] }

4. **Página** `content/docs/optativas/algoritmos-avancados/bfs/index.md` com `{{< viz algoritmo="bfs" >}}` e um `weight` ainda não usado.

5. **Testar sem navegador** (na raiz do repositório):

       node -e '
       const fs=require("fs");global.document={readyState:"complete",querySelectorAll:()=>[]};
       eval(fs.readFileSync("themes/big-o-library/assets/viz/viz.js","utf8").replace("const init","globalThis.A=ALGOS;const init"));
       const st=[...A.bfs.run()]; console.log(st.length, st.at(-1).msg)'

   Mostra o número de passos e a última mensagem. Se o resultado estiver errado, o bug é do algoritmo, não da animação.

## Armadilhas

- **Copie o estado na foto**: `{...obj}`, `[...lista]`, `new Set(conjunto)`. Se guardar a própria variável, todos os passos mostram o estado final.
- **Poucos passos**: tudo é calculado antes de rodar. Use exemplos pequenos (6 a 10 nós, vetor de 8) e menos de ~150 passos.
- **A mensagem é o que ensina**: "7 + 2 = 9 < 14: caminho melhor!" vale mais que "relaxa aresta".
- **`line` errado**: tem que bater com a posição na lista `code`.
- **Pesos únicos**: cada página precisa de um `weight` diferente dentro da disciplina.

## Criando um desenho novo (quando nenhum `kind` serve)

1. Dentro de `mount`, escreva `function drawMeu(s) { ... }`: monta uma string de SVG e faz `$('svg').innerHTML = ...`. Use `drawSeg` como modelo.
2. Preencha os painéis laterais: `$('.t1')`/`$('.pq')` e `$('.t2')`/`$('.dd')`.
3. Em `draw()`, acrescente `A.kind === 'meu' ? drawMeu(s) :` na escolha do desenho.
4. Cores: use as variáveis `--cur` (azul), `--hot` (laranja), `--ok` (verde) e `--bd` (cinza) do `viz.css` para funcionar nos temas claro e escuro.
