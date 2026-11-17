---
title: Estruturas de Dados e Algoritmos
weight: 1
description: Análise de algoritmos, ordenação, estruturas lineares e árvores.
rotulo: Unidades
autores:
  - thallesgsrv
baseadoEm:
  - joaoarthurbm
  - fabriciocostadias
date: 2026-11-17
---

## Direto ao ponto

Aqui a gente aprende a medir o custo de um algoritmo sem depender de cronômetro e usa essa régua para comparar os principais algoritmos.

## Conteúdo

O material segue a mesma divisão do curso do João Arthur: primeiro a régua (análise), depois ordenação, estruturas lineares e árvores. Cada unidade tem sua página, e os tópicos estão listados na ordem em que devem ser estudados.

### Análise de algoritmos

- [Introdução à análise](analise-de-algoritmos/introducao-a-analise/)
- [Análise assintótica](analise-de-algoritmos/analise-assintotica/)
- [Análise de algoritmos recursivos](analise-de-algoritmos/analise-algoritmos-recursivos/)

### Ordenação e busca

- [Selection sort](ordenacao/selection-sort/)
- [Insertion sort](ordenacao/insertion-sort/)
- [Bubble sort](ordenacao/bubble-sort/)
- [Merge sort](ordenacao/merge-sort/)
- [Quick sort](ordenacao/quick-sort/)
  - [Particionamento de Hoare](ordenacao/particionamento-hoare/)
- [Heap sort](ordenacao/heap-sort/)
- [Counting sort](ordenacao/counting-sort/)
- [Radix sort](ordenacao/radix-sort/)
- [Busca binária](ordenacao/busca-binaria/)

### Estruturas de dados lineares

- [ArrayList](estruturas-lineares/arraylist/)
- [Pilha](estruturas-lineares/pilha/)
- [Fila](estruturas-lineares/fila/)
- [Cache e localidade](estruturas-lineares/cache/)
- [Lista encadeada](estruturas-lineares/lista-encadeada/)
- [Tabela hash](estruturas-lineares/tabela-hash/)
  - [Endereçamento aberto: só perguntas](estruturas-lineares/enderecamento-aberto-perguntas/)

### Árvores

- [Árvore binária de busca](arvores/arvore-binaria-de-busca/)
- [Heap e fila de prioridade](arvores/heap/)
- [Árvore AVL](arvores/avl/)

## Comparando os algoritmos

Depois de ler os tópicos, esta tabela serve de resumo. \(n\) é o tamanho do array, \(k\) é o maior valor possível no counting sort e \(d\) é o número de dígitos no radix sort.

| Algoritmo | Melhor caso | Caso médio | Pior caso | Estável | In-place |
|---|---|---|---|---|---|
| Selection sort | \(n^2\) | \(n^2\) | \(n^2\) | não | sim |
| Insertion sort | \(n\) | \(n^2\) | \(n^2\) | sim | sim |
| Bubble sort (com parada antecipada) | \(n\) | \(n^2\) | \(n^2\) | sim | sim |
| Merge sort | \(n \log n\) | \(n \log n\) | \(n \log n\) | sim | não |
| Quick sort | \(n \log n\) | \(n \log n\) | \(n^2\) | não | sim |
| Heap sort | \(n \log n\) | \(n \log n\) | \(n \log n\) | não | sim |
| Counting sort | \(n + k\) | \(n + k\) | \(n + k\) | sim | não |
| Radix sort | \(d(n + b)\) | \(d(n + b)\) | \(d(n + b)\) | sim | não |

> [!NOTE]
> No radix sort, \(b\) é a base numérica usada (10 nos nossos exemplos).

## Comparando as estruturas de dados

Para escolher uma estrutura, o que importa é quais operações o seu problema mais faz. \(n\) é o número de elementos e \(h\) a altura de uma árvore.

| Estrutura | Buscar | Inserir | Remover | Guarda ordem? |
|---|---|---|---|---|
| ArrayList | \(O(n)\) | \(O(1)\) amortizado no fim, \(O(n)\) no meio | \(O(n)\) | só a de inserção |
| Lista encadeada | \(O(n)\) | \(O(1)\) no início | \(O(n)\), ou \(O(1)\) se já tiver o nó | só a de inserção |
| Tabela hash | \(O(1)\) médio | \(O(1)\) médio | \(O(1)\) médio | não |
| Árvore binária de busca | \(O(h)\) | \(O(h)\) | \(O(h)\) | sim (percurso em ordem) |
| Árvore AVL | \(O(\log n)\) | \(O(\log n)\) | \(O(\log n)\) | sim (percurso em ordem) |
| Heap | \(O(n)\) | \(O(\log n)\) | \(O(\log n)\) o maior | só o maior (raiz) |

Na BST comum, \(h\) vai de \(\log n\) (balanceada) a \(n - 1\) (degenerada). Pilha e fila são ArrayList ou lista encadeada com um contrato restrito (LIFO e FIFO), com operações \(O(1)\).

## Ordem sugerida de estudo

1. **Análise**: introdução, assintótica e recursivos. É a régua para todo o resto.
2. **Ordenação**: quadráticas, depois merge, quick (e Hoare) e as lineares. O heap sort fica mais claro depois do heap, então pode ficar para a volta das árvores.
3. **Estruturas lineares**: ArrayList, pilha, fila, cache, lista encadeada e tabela hash (e a aula de perguntas sobre endereçamento aberto).
4. **Árvores**: BST, heap e AVL, nessa ordem. A AVL só faz sentido depois de ver o problema da BST.

## Notas

### Links úteis

- [Estruturas de Dados e Algoritmos](https://joaoarthurbm.github.io/eda/conteudo/) — João Arthur Brunet, Computação @ UFCG (2019). Material que serviu de referência para a ordem e a abordagem destas páginas.
- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)

## Contribuição

Se você tiver materiais úteis desta disciplina, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.
