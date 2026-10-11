---
title: Merge sort
weight: 6
description: Ordenação por divisão e conquista com custo n log n garantido.
autores:
  - thallesgsrv
date: 2026-10-09
---

## Sobre

Ordenar um array de um milhão de elementos é difícil. Ordenar dois arrays de meio milhão cada é mais fácil. Ordenar arrays de um elemento é trivial, porque já estão ordenados. O merge sort aposta nisso: quebra o problema até ficar trivial e depois junta as respostas.

## A ideia: dividir e conquistar

1. **Dividir** o array ao meio.
2. **Conquistar**: ordenar cada metade (recursivamente).
3. **Combinar**: juntar as duas metades ordenadas em um array ordenado.

A parte interessante é o passo 3. Juntar duas sequências **já ordenadas** é barato, e é isso que faz o algoritmo valer a pena.

## Juntando duas sequências ordenadas

Temos \([2, 8, 9]\) e \([1, 3, 10]\). Colocamos um dedo no começo de cada uma e vamos repetindo: compara os dois elementos apontados, copia o menor para o resultado e avança o dedo daquele lado.

| Esquerda | Direita | Menor | Resultado |
|---|---|---|---|
| 2 8 9 | 1 3 10 | 1 | 1 |
| 2 8 9 | 3 10 | 2 | 1 2 |
| 8 9 | 3 10 | 3 | 1 2 3 |
| 8 9 | 10 | 8 | 1 2 3 8 |
| 9 | 10 | 9 | 1 2 3 8 9 |
| (vazia) | 10 | 10 | 1 2 3 8 9 10 |

Cada elemento é copiado uma vez e cada passo faz uma comparação, então juntar sequências de tamanho total \(n\) custa \(\Theta(n)\).

## O algoritmo inteiro

Para \([7, 3, 9, 1, 5, 8, 2, 6]\), primeiro dividimos até chegar em elementos sozinhos, depois juntamos de volta:

```text
              [7 3 9 1 5 8 2 6]
            /                   \
       [7 3 9 1]             [5 8 2 6]
        /     \               /     \
    [7 3]    [9 1]        [5 8]    [2 6]
    /   \    /   \        /   \    /   \
   [7] [3]  [9] [1]      [5] [8]  [2] [6]

   (juntando de baixo para cima)
    [3 7]    [1 9]        [5 8]    [2 6]
       [1 3 7 9]             [2 5 6 8]
              [1 2 3 5 6 7 8 9]
```

## Veja funcionando

Use ▶ para executar sozinho ou ▶| para avançar um passo por vez (◀ volta). A linha do pseudocódigo que está sendo executada fica acesa. Nas barras, **laranja** é o que está sendo comparado ou trocado, **azul** é o elemento em foco (um elemento que vai ser copiado) e **verde** é o que já está no lugar certo.

{{< viz algoritmo="merge" >}}

A linha tracejada separa as duas metades que estão sendo juntas, e a linha **aux** mostra o resultado parcial do merge. Note que o merge nunca volta atrás: cada elemento é copiado uma vez por nível.

## Implementação

O código tem **duas funções**, e cada uma faz um trabalho diferente:

- `mergeSort` é a que **divide**: parte o array ao meio e chama a si mesma para cada metade.
- `merge` é a que **junta**: pega duas metades já ordenadas e as une, como na tabela de cima.

```java
static void mergeSort(int[] v, int inicio, int fim) {
    // Caso base: com 0 ou 1 elemento já está ordenado, não há o que fazer.
    if (inicio >= fim) {
        return;
    }

    int meio = (inicio + fim) / 2;

    mergeSort(v, inicio, meio);      // ordena a metade da esquerda
    mergeSort(v, meio + 1, fim);     // ordena a metade da direita
    merge(v, inicio, meio, fim);     // junta as duas metades já ordenadas
}

static void merge(int[] v, int inicio, int meio, int fim) {
    // 1. Tira uma cópia do trecho que vamos juntar.
    int tamanho = fim - inicio + 1;
    int[] copia = new int[tamanho];
    for (int x = 0; x < tamanho; x++) {
        copia[x] = v[inicio + x];
    }

    // 2. Coloca um "dedo" no começo de cada metade da cópia.
    int i = 0;                       // dedo da esquerda
    int comecoDireita = meio - inicio + 1;
    int j = comecoDireita;           // dedo da direita
    int k = inicio;                  // posição de v onde vamos escrever

    // 3. Enquanto as duas metades ainda têm elementos, copia o menor.
    while (i < comecoDireita && j < tamanho) {
        if (copia[i] <= copia[j]) {
            v[k] = copia[i];
            i++;
        } else {
            v[k] = copia[j];
            j++;
        }
        k++;
    }

    // 4. Copia o que sobrou da outra.
    while (i < comecoDireita) {
        v[k] = copia[i];
        i++;
        k++;
    }
}
```

A chamada inicial é `mergeSort(v, 0, v.length - 1)`: do primeiro ao último índice.

### Lendo o `mergeSort`

O `inicio` e o `fim` dizem **qual pedaço** do array estamos ordenando. O `meio` é o ponto onde cortamos. A função não ordena nada sozinha: ela só corta, pede para si mesma resolver cada metade e, no fim, chama o `merge`.

Acompanhe com `[7, 3, 9, 1]` (índices 0 a 3):

1. `mergeSort(0, 3)`: o meio é 1. Chama a metade `0..1` e depois a `2..3`.
2. `mergeSort(0, 1)`: o meio é 0. Chama `0..0` e `1..1`. Os dois têm um elemento só, então voltam na hora (caso base). Agora o `merge` junta `[7]` e `[3]` e o trecho vira `[3, 7]`.
3. `mergeSort(2, 3)`: do mesmo jeito, junta `[9]` e `[1]` e vira `[1, 9]`.
4. De volta ao `mergeSort(0, 3)`: o `merge` junta `[3, 7]` e `[1, 9]` e o resultado final é `[1, 3, 7, 9]`.

O ponto que costuma confundir: quando `mergeSort` chama a si mesma, a de cima **espera** a de baixo terminar. Só depois que as duas metades voltam é que o `merge` roda.

### Lendo o `merge`

Quando o `merge` é chamado, as duas metades de `v[inicio..fim]` já estão ordenadas (as chamadas de cima garantiram isso). O trabalho é só intercalá-las.

- **Passo 1, a cópia.** Vamos escrever de volta em `v`, então primeiro guardamos o trecho em `copia` para não perder valores.
- **Passo 2, os dedos.** `i` aponta para o início da metade esquerda da cópia, `j` para o início da direita e `k` é o lugar de `v` onde o próximo elemento vai ser escrito. O `comecoDireita` marca onde a metade direita começa dentro da cópia.
- **Passo 3, o laço principal.** Em cada volta comparamos `copia[i]` com `copia[j]`, escrevemos o menor em `v[k]` e avançamos o dedo daquele lado (e o `k`, sempre).
- **Passo 4, as sobras.** Quando um lado acaba, o outro ainda pode ter elementos, e todos eles são maiores que o que já foi escrito. Basta copiá-los em ordem.

Exemplo: juntando `[2, 8, 9]` e `[1, 3, 10]`, a `copia` é `[2, 8, 9, 1, 3, 10]` e `comecoDireita` vale 3. O dedo `i` começa na posição 0 (valor 2) e o `j` na posição 3 (valor 1). Como 1 é menor, ele vai primeiro para `v`, e assim por diante, igual à tabela lá em cima.

## Análise

A recorrência é

$$
T(n) = 2\,T(n/2) + \Theta(n)
$$

Duas chamadas para metades, mais o `merge` linear. Como vimos na página de [análise de algoritmos recursivos](../analise-algoritmos-recursivos/), a árvore tem \(\log_2 n\) níveis e cada nível custa \(n\), então:

$$
T(n) = \Theta(n \log n)
$$

E isso vale para **todos os casos**. O merge sort não liga se o array estava ordenado, invertido ou embaralhado: ele sempre divide ao meio e sempre junta. Não existe pior caso ruim, e também não existe melhor caso melhor.

## Estabilidade e memória

É **estável**. No `merge`, quando os dois elementos são iguais, o `<=` faz a gente pegar o da esquerda primeiro, preservando a ordem original.

**Não é in-place.** O `merge` precisa de um array auxiliar de até \(n\) posições (a `copia`), então o gasto extra de memória é \(O(n)\). Esse é o preço pela garantia de \(n \log n\).

## Exercício

O que aconteceria com a estabilidade se trocássemos `<=` por `<` no `merge`?

{{< details title="Gabarito" >}}
Quando os dois elementos fossem iguais, o `else` copiaria o da direita primeiro, e a ordem relativa dos iguais seria invertida. O algoritmo continuaria ordenando certo, mas deixaria de ser estável.
{{< /details >}}

## Resumo

- Divide o array ao meio, ordena cada metade recursivamente e junta as duas.
- Duas funções: `mergeSort` divide e `merge` junta.
- Juntar duas sequências ordenadas é \(\Theta(n)\).
- \(\Theta(n \log n)\) em todos os casos.
- Estável, mas usa \(O(n)\) de memória auxiliar.

## Para estudar mais

- [Merge Sort](https://joaoarthurbm.github.io/eda/posts/merge-sort) — João Arthur Brunet (2019)