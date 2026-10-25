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

Vamos por partes. No `mergeSort`, primeiro precisamos parar quando o trecho tem zero ou um elemento: nesse caso ele já está ordenado.

```java
if (inicio >= fim) {
    return;
}
```

Se ainda há mais de um elemento, encontramos o meio do trecho e pedimos para o `mergeSort` resolver cada metade. Quando as duas chamadas terminam, juntamos as metades com `merge`.

```java
int meio = (inicio + fim) / 2;

mergeSort(v, inicio, meio);
mergeSort(v, meio + 1, fim);
merge(v, inicio, meio, fim);
```

A chamada inicial usa o array inteiro: `mergeSort(v, 0, v.length - 1)`. A função vai se chamando até chegar em trechos de um elemento; depois as chamadas vão voltando e juntando os pedaços.

Agora o `merge`: ele recebe duas metades que já estão ordenadas. Como vamos escrever o resultado de volta no array original, primeiro fazemos uma cópia do trecho para não apagar valores que ainda precisamos comparar.

```java
int tamanho = fim - inicio + 1;
int[] copia = new int[tamanho];

for (int x = 0; x < tamanho; x++) {
    copia[x] = v[inicio + x];
}
```

Precisamos de dois índices para caminhar pela cópia, um em cada metade, e um terceiro (`k`) para saber onde escrever no array original.

```java
int comecoDireita = meio - inicio + 1;
int i = 0;
int j = comecoDireita;
int k = inicio;
```

Enquanto as duas metades ainda têm elementos, comparamos o que está apontado por `i` e `j`. Copiamos o menor para `v[k]` e avançamos só o índice de onde ele veio.

```java
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
```

Quando um dos lados acaba, pode sobrar elemento do outro. Se sobrou na esquerda, copiamos o restante para o array. Se sobrou na direita, ele já está na posição certa e não precisa ser copiado.

```java
while (i < comecoDireita) {
    v[k] = copia[i];
    i++;
    k++;
}
```

Por exemplo, juntando `[2, 8, 9]` e `[1, 3, 10]`, comparamos sempre o próximo valor de cada metade: primeiro vai `1`, depois `2`, depois `3`, e assim por diante. O resultado fica `[1, 2, 3, 8, 9, 10]`.

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