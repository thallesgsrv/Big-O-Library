---
title: Recorrências
weight: 4
description: Sequências definidas em termos de si mesmas, como resolvê-las e como provar a solução por indução.
autores:
  - thallesgsrv
date: 2026-10-30
---

## Sobre

Uma **recorrência** define o valor de uma sequência a partir de valores anteriores dela mesma. É o jeito natural de descrever problemas recursivos: o custo de resolver um problema grande em função do custo de resolver os menores. Por isso elas aparecem o tempo todo na análise de algoritmos.

Uma recorrência vem sempre com **casos iniciais**, que dizem onde a conta começa. Sem eles, não há um valor definido.

## Exemplo 1: Torre de Hanói

Para mover $n$ discos de um pino para outro, movemos os $n-1$ de cima para o pino auxiliar, movemos o maior disco e depois movemos os $n-1$ de volta por cima dele. Se $T(n)$ é o número de movimentos:

$$
T(0) = 0, \qquad T(n) = 2\,T(n-1) + 1 \ \ (n \ge 1)
$$

Os primeiros valores: $T(1) = 1$, $T(2) = 3$, $T(3) = 7$, $T(4) = 15$. Parece $2^n - 1$.

## Como resolver: expandir e provar

A estratégia tem dois passos.

1. **Expandir** a recorrência algumas vezes para enxergar o padrão e **chutar** uma fórmula.
2. **Provar** o chute por indução. A expansão sozinha não é uma prova, porque o "e assim por diante" esconde a parte que precisa ser verificada.

Expandindo o Hanói:

$$
T(n) = 2T(n-1) + 1 = 4T(n-2) + 2 + 1 = 8T(n-3) + 4 + 2 + 1 = \cdots
$$

Depois de $k$ passos, $T(n) = 2^k\,T(n-k) + (2^{k-1} + \cdots + 2 + 1)$. Em $k = n$, usando $T(0) = 0$, sobra $T(n) = 2^n - 1$.

**Prova por indução** de que $T(n) = 2^n - 1$ para todo $n \ge 0$:

- **Base** ($n = 0$): $T(0) = 0 = 2^0 - 1$.
- **Hipótese:** $T(k) = 2^k - 1$.
- **Passo:** $T(k+1) = 2\,T(k) + 1 = 2(2^k - 1) + 1 = 2^{k+1} - 1$. $\blacksquare$

Ou seja, mover 64 discos exigiria $2^{64} - 1$ movimentos, um número astronômico.

## Exemplo 2: soma dos primeiros números

$$
T(0) = 0, \qquad T(n) = T(n-1) + n
$$

Expandindo: $T(n) = T(n-2) + (n-1) + n = \cdots = 1 + 2 + \cdots + n = \dfrac{n(n+1)}{2}$. A prova por indução é a mesma da página de indução. Essa recorrência descreve, por exemplo, o total de deslocamentos do insertion sort no pior caso: a rodada $i$ faz $i$ deslocamentos.

## Exemplo 3: dividir ao meio

$$
T(1) = 1, \qquad T(n) = T(n/2) + 1 \quad (n \text{ potência de } 2)
$$

Cada passo divide $n$ por 2 e custa 1. Depois de $k$ passos, $T(n) = T(n/2^k) + k$. Chegamos ao caso inicial quando $n/2^k = 1$, isto é, $k = \log_2 n$, e então:

$$
T(n) = \log_2 n + 1
$$

É exatamente o custo da busca binária no pior caso, quando $n$ é potência de 2.

## Erros comuns

- **Esquecer o caso inicial** e deixar a recorrência sem ponto de partida.
- **Tomar a expansão como prova.** Sempre confirme o chute por indução.
- **Errar a quantidade de passos.** Na divisão ao meio, o número de passos é $\log_2 n$, não $n$.
- **Confundir $T(n-1)$ com $T(n) - 1$.** O primeiro é o valor da sequência no termo anterior.

## Exercícios

1. Resolva $T(0) = 1$, $T(n) = T(n-1) + 2$ e prove por indução.
2. Resolva $T(1) = 0$, $T(n) = 2\,T(n/2) + n$ para $n$ potência de 2. (Essa é a recorrência do merge sort, contando só as operações de intercalar.)

{{< details title="Gabarito" >}}
1. Expandindo, $T(n) = T(0) + 2n = 2n + 1$. Prova: base $T(0) = 1 = 2\cdot 0 + 1$. Passo: $T(k+1) = T(k) + 2 = (2k+1) + 2 = 2(k+1) + 1$.
2. Expandindo, $T(n) = 2T(n/2) + n = 4T(n/4) + 2n = 8T(n/8) + 3n = \cdots = 2^k\,T(n/2^k) + k\,n$. Em $k = \log_2 n$, $T(1) = 0$ e sobra $T(n) = n \log_2 n$. Conferindo: $T(2) = 2 = 2\cdot 1$, $T(4) = 2\cdot 2 + 4 = 8 = 4 \cdot 2$, $T(8) = 2\cdot 8 + 8 = 24 = 8 \cdot 3$.
{{< /details >}}
