---
title: Selection sort
weight: 4
description: Ordenação por seleção do menor elemento. Simples, quadrática e sempre igual.
autores:
  - thallesgsrv
date: 2026-10-09
---

## Sobre

O selection sort é o jeito mais direto de ordenar: ache o menor elemento, coloque na primeira posição. Ache o menor entre os que sobraram, coloque na segunda. Repita até acabar.

## A ideia

Imagine uma fila de pessoas que você quer organizar por altura. Você olha a fila inteira, escolhe a mais baixa e manda ela para o começo. Depois ignora essa pessoa, olha o resto, escolhe a mais baixa de novo e manda para a segunda posição. Em cada rodada, o pedaço já arrumado cresce em um.

Vamos ordenar \([29, 10, 14, 37, 13]\). A barra `|` separa a parte já ordenada da que ainda falta.

| Rodada | Menor do que falta | Array depois da troca |
|---|---|---|
| 1 | 10 (posição 1) | `10 \| 29 14 37 13` |
| 2 | 13 (posição 4) | `10 13 \| 14 37 29` |
| 3 | 14 (posição 2) | `10 13 14 \| 37 29` |
| 4 | 29 (posição 4) | `10 13 14 29 \| 37` |

Na rodada 3 o menor já estava no lugar, então a troca não mudou nada. Depois da rodada 4, o último elemento só pode ser o maior, não precisa de rodada própria.

## Veja funcionando

Use ▶ para executar sozinho ou ▶| para avançar um passo por vez (◀ volta). A linha do pseudocódigo que está sendo executada fica acesa. Nas barras, **laranja** é o que está sendo comparado ou trocado, **azul** é o elemento em foco (o menor encontrado até agora) e **verde** é o que já está no lugar certo.

{{< viz algoritmo="selection" >}}

Repare no contador de comparações: ele termina em 10 mesmo que o vetor já viesse ordenado. Tente prever, antes de apertar ▶|, qual vai ser o próximo "menor".

## Implementação

```java
static void selectionSort(int[] v) {
    for (int i = 0; i < v.length - 1; i++) {
        int menor = i;
        for (int j = i + 1; j < v.length; j++) {
            if (v[j] < v[menor]) {
                menor = j;
            }
        }
        troca(v, i, menor);
    }
}

static void troca(int[] v, int a, int b) {
    int tmp = v[a];
    v[a] = v[b];
    v[b] = tmp;
}
```

O laço de fora decide qual posição `i` vamos preencher. O de dentro varre tudo que está à direita de `i` guardando em `menor` o índice do menor valor visto. No fim, uma troca coloca esse valor em `i`.

## Análise

Quantas comparações? Na rodada \(i = 0\) são \(n - 1\), depois \(n - 2\), e assim por diante:

$$
(n-1) + (n-2) + \dots + 1 = \frac{n(n-1)}{2} = \Theta(n^2)
$$

E o detalhe que define o selection sort: **esse número não depende dos dados**. O laço de dentro sempre varre tudo, mesmo que o array já esteja ordenado. Por isso melhor caso, caso médio e pior caso são todos \(\Theta(n^2)\).

Por outro lado, o número de trocas é pequeno: no máximo \(n - 1\), uma por rodada. Se trocar elementos for muito caro (objetos enormes, escrita em memória lenta), isso é uma vantagem real sobre outros algoritmos quadráticos.

## Estabilidade e memória

Um algoritmo é **estável** quando elementos iguais mantêm a ordem relativa que tinham na entrada. O selection sort **não é estável**. Veja:

\([4_a,\ 4_b,\ 2]\)

Na primeira rodada o menor é o `2`. Ele troca com o `4_a`, e o `4_a` vai parar no fim:

\([2,\ 4_b,\ 4_a]\)

Os dois quatros inverteram. Ele é **in-place**: usa só algumas variáveis extras, memória \(O(1)\).

## Exercício

O selection sort faz mais ou menos comparações em um array já ordenado do que em um array em ordem inversa?

{{< details title="Gabarito" >}}
O mesmo número. As comparações são sempre \(n(n-1)/2\), qualquer que seja a ordem inicial. O que muda é só a quantidade de trocas que realmente movem algo.
{{< /details >}}

## Resumo

- A cada rodada, seleciona o menor elemento do trecho não ordenado e o leva para o início dele.
- \(\Theta(n^2)\) comparações em todos os casos.
- No máximo \(n - 1\) trocas.
- In-place e não estável.

## Para estudar mais

- [Selection Sort](http://joaoarthurbm.github.io/eda/posts/selection-sort) — João Arthur Brunet (2019)
