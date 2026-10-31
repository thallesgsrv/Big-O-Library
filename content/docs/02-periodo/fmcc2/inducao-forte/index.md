---
title: Indução forte
weight: 3
description: Quando o passo precisa de mais do que o caso anterior, a hipótese vale para todos os casos menores.
autores:
  - thallesgsrv
date: 2026-10-30
---

## Sobre

Na indução comum, para provar $P(k+1)$ usamos só $P(k)$. Mas há afirmações em que o caso $k+1$ depende de casos bem menores, não do imediatamente anterior. Por exemplo, um número composto é o produto de dois números menores, que podem estar longe de $k$. Para esses casos usamos a **indução forte**.

## Estrutura da prova

Para provar $P(n)$ para todo $n \ge n_0$:

1. **Base:** mostre $P(n_0)$ (e, se o passo precisar, mais alguns casos iniciais).
2. **Hipótese de indução forte:** suponha que $P(m)$ vale para **todo** $m$ com $n_0 \le m \le k$.
3. **Passo:** usando essa hipótese, mostre $P(k+1)$.

A diferença é só a hipótese: em vez de "vale para $k$", temos "vale para todos até $k$". As duas formas provam exatamente as mesmas coisas, mas a forte costuma ser mais cômoda quando o passo "olha para trás" mais de uma casa.

## Exemplo 1: todo número é produto de primos

Afirmação: todo inteiro $n \ge 2$ é um produto de números primos (um primo conta como um produto de um fator só).

**Base** ($n = 2$): 2 é primo.

**Hipótese:** suponha que todo $m$ com $2 \le m \le k$ é produto de primos.

**Passo:** considere $k+1$.

- Se $k+1$ é primo, está pronto.
- Se não é, então $k+1 = a \cdot b$ com $2 \le a, b \le k$. Pela hipótese, $a$ e $b$ são produtos de primos. Juntando as duas fatorações, $k+1$ também é. $\blacksquare$

Repare que a indução comum não bastaria: $a$ e $b$ podem ser quaisquer números menores que $k+1$, não necessariamente $k$.

## Exemplo 2: notas de 4 e de 5 reais

Afirmação: todo valor inteiro $n \ge 12$ pode ser pago só com notas de 4 e de 5 reais.

**Bases:** $12 = 4+4+4$, $13 = 4+4+5$, $14 = 4+5+5$, $15 = 5+5+5$.

**Hipótese:** suponha que todo valor $m$ com $12 \le m \le k$ pode ser pago.

**Passo:** seja $k+1 \ge 16$. Então $k+1-4 \ge 12$ e $k+1-4 \le k$, logo a hipótese diz que $k+1-4$ pode ser pago. Basta somar uma nota de 4. $\blacksquare$

> [!IMPORTANT]
> Quantos casos-base? O suficiente para que o passo nunca "caia" fora da base. Aqui o passo volta 4 casas, então precisamos de 4 bases consecutivas (12, 13, 14 e 15).

## Erros comuns

- **Bases a menos.** Se o passo volta $r$ casas, precisamos de $r$ bases. Com só a base 12, o passo para 13 pediria o valor 9, que está fora do que foi provado.
- **Usar a hipótese fora do intervalo.** Ela só vale de $n_0$ até $k$. No exemplo 2, afirmar algo sobre o valor 11 seria falso, porque 11 não pode ser pago (4+4=8, 4+5=9, 5+5=10, 4+4+4=12).
- **Esquecer de verificar que os casos usados são menores que $k+1$** (e maiores ou iguais a $n_0$).

## Exercícios

1. Seja $F_1 = F_2 = 1$ e $F_n = F_{n-1} + F_{n-2}$ para $n \ge 3$ (sequência de Fibonacci). Prove que $F_n < 2^n$ para todo $n \ge 1$.
2. Prove que todo valor inteiro $n \ge 8$ pode ser pago só com notas de 3 e de 5 reais.

{{< details title="Gabarito" >}}
1. Bases: $F_1 = 1 < 2$ e $F_2 = 1 < 4$. Passo, para $k + 1 \ge 3$: pela hipótese forte, $F_k < 2^k$ e $F_{k-1} < 2^{k-1}$. Então $F_{k+1} = F_k + F_{k-1} < 2^k + 2^{k-1} < 2^k + 2^k = 2^{k+1}$. Precisamos de duas bases porque o passo usa os dois casos anteriores.
2. Bases: $8 = 3+5$, $9 = 3+3+3$, $10 = 5+5$. Passo, para $k+1 \ge 11$: $k+1-3 \ge 8$ e $\le k$, então pela hipótese pode ser pago, e somamos uma nota de 3. Três bases porque o passo volta 3 casas.
{{< /details >}}
