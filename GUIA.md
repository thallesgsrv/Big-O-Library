# Guia: como criar a animação de um algoritmo

Você não escreve animação: escreve o algoritmo e marca o que quer mostrar. O motor (`assets/viz/viz.js`) desenha.

## Como funciona

Cada algoritmo é uma função geradora (`function*`). Em cada ponto interessante você dá um `yield` com uma "foto" do estado. O motor guarda todas as fotos numa lista e os botões ▶ ◀ ▶| só navegam por ela (por isso o botão voltar funciona sem esforço).

    seu gerador  →  lista de fotos  →  motor desenha a foto atual
    (algoritmo)     [{line, msg,…}]    + acende a linha do pseudocódigo

Toda foto tem `line` (linha do pseudocódigo a destacar) e `msg` (frase que explica o passo).

## Desenhos disponíveis (`kind`)

| kind | serve para | campos da foto além de line/msg |
| --- | --- | --- |
| *(grafo, padrão)* | grafos, árvores comuns | `dist`, `prev`, `vis` (Set), `pq` (lista de textos), `u`, `v` |
| `table` | programação dinâmica | `t` (matriz), `cur` [i,j], `path` (lista de [i,j]) |
| `segtree` | árvores de segmentos | `L`, `R`, `sum`, `lz`, `cur`, `take`, `chg`, `op`, `res` |
| `bars` | ordenação | `arr`, `done` (Set), `lo`, `hi`, `pv`, `i`, `j` |

Grafos: nós e arestas ficam em `GRAFO`/`LCAG`; opções da entrada: `nw: true` (esconde pesos), `nomin: true` (não destaca o 1º chip do painel), `t1`/`t2` (títulos dos painéis).

## Passo a passo (exemplo: Quick Sort, desenho `bars`)

1. **Pseudocódigo** como `[indentação, texto]`; o número da linha é a posição na lista:

       code: [[0,'quicksort(lo, hi): se lo < hi:'], [1,'p ← partição(lo, hi)'], ...]

2. **Gerador** com uma função `snap` que copia o estado:

       function* quick(a0) {
         const a = [...a0], done = new Set();
         const snap = (line, msg, x = {}) => ({ line, msg, arr: [...a], done: new Set(done), ...x });
         yield snap(0, 'Vetor desordenado.');
         ...
         yield snap(5, `${a[i]} ≤ ${piv}: entra na zona dos menores.`, { lo, hi, pv: hi, i, j });
       }

3. **Registrar** em `ALGOS` (fim do viz.js):

       quick: { kind: 'bars', run: () => quick([7,2,9,4,3,8,1,6]), code: [ ... ] }

4. **Página** `content/docs/optativas/algoritmos-avancados/quicksort/index.md` com `{{< viz algoritmo="quick" >}}` e um `weight` ainda não usado.

5. **Testar sem navegador** (na raiz do repositório):

       node -e '
       const fs=require("fs");global.document={readyState:"complete",querySelectorAll:()=>[]};
       eval(fs.readFileSync("assets/viz/viz.js","utf8").replace("const init","globalThis.A=ALGOS;const init"));
       const st=[...A.quick.run()]; console.log(st.length, st.at(-1).msg)'

   Mostra o número de passos e a última mensagem. Se o resultado estiver errado, o bug é do algoritmo, não da animação.

## Armadilhas

- **Copie o estado na foto**: `{...obj}`, `[...lista]`, `new Set(conjunto)`. Se guardar a própria variável, todos os passos mostram o estado final.
- **Poucos passos**: tudo é calculado antes de rodar. Use exemplos pequenos (6 a 10 nós, vetor de 8) e menos de ~150 passos.
- **A mensagem é o que ensina**: "7 + 2 = 9 < 14: caminho melhor!" vale mais que "relaxa aresta".
- **`line` errado**: tem que bater com a posição na lista `code`.
- **Pesos únicos**: cada página precisa de um `weight` diferente dentro da disciplina.

## Criando um desenho novo (quando nenhum `kind` serve)

1. Dentro de `mount`, escreva `function drawMeu(s) { ... }`: monta uma string de SVG e faz `$('svg').innerHTML = ...`. Use `drawBars` como modelo (é o menor).
2. Preencha os painéis laterais: `$('.t1')`/`$('.pq')` e `$('.t2')`/`$('.dd')`.
3. Em `draw()`, acrescente `A.kind === 'meu' ? drawMeu(s) :` na escolha do desenho.
4. Cores: use as variáveis `--cur` (azul), `--hot` (laranja), `--ok` (verde) e `--bd` (cinza) do `viz.css` para funcionar nos temas claro e escuro.

Obs.: `drawTable` usa `A.X` e `A.Y` como cabeçalhos (específico do LCS). Para mochila ou distância de edição, generalize esses cabeçalhos primeiro.
