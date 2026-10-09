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

```java
static void merge(int[] v, int left, int right) {
    int rightHelper = right - left;
    int[] helper = new int[rightHelper+1];
    for(int i = 0; i <= rightHelper; i++) {
        helper[i] = v[left + i];
    }
    int middleHelper = rightHelper/ 2;
    int i = 0;
    int j = middleHelper +1;
    int k = left;
    
    while (i <= middleHelper && j <= rightHelper) {
        if(helper[i] <= helper[j]) {
            v[k] = helper[i];
            i++;
        } else {
            v[k] = helper[j];
            j++;
        }
        k++;
    }
    while (i <= middleHelper) {
        v[k] = helper[i];
        i++;
        k++;
    }
}

static void mergeSort(int[] v, int left, int right) {
    if (left >= right) {
        return;
    } else {
        int middle = (right + left) / 2;
        mergeSort(v, left, middle);
        mergeSort(v, middle+1, right);
        merge(v, left, right);
    }
}
```

A chamada inicial é `mergeSort(v, 0, v.length - 1)`. A condição `left >= right` é o caso base: com zero ou um elemento, não há nada a fazer.

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

**Não é in-place.** O `merge` precisa de um array auxiliar de até \(n\) posições, então o gasto extra de memória é \(O(n)\). Esse é o preço pela garantia de \(n \log n\).

## Exercício

O que aconteceria com a estabilidade se trocássemos `<=` por `<` no `merge`?

{{< details title="Gabarito" >}}
Quando os dois elementos fossem iguais, o `else` copiaria o da direita primeiro, e a ordem relativa dos iguais seria invertida. O algoritmo continuaria ordenando certo, mas deixaria de ser estável.
{{< /details >}}

## Resumo

- Divide o array ao meio, ordena cada metade recursivamente e junta as duas.
- Juntar duas sequências ordenadas é \(\Theta(n)\).
- \(\Theta(n \log n)\) em todos os casos.
- Estável, mas usa \(O(n)\) de memória auxiliar.

## Para estudar mais

- [Merge Sort](http://joaoarthurbm.github.io/eda/posts/merge-sort) — João Arthur Brunet (2019)
