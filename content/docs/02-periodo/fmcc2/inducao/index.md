---
title: Indução matemática
weight: 2
description: Como provar que algo vale para todos os números naturais: base, hipótese e passo.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

Como provar que uma afirmação vale para **todo** número natural, se não dá para testar infinitos casos? Com **indução**: uma técnica que funciona como uma fileira de dominós.

## A ideia dos dominós

Se (1) o primeiro dominó cai e (2) cada dominó que cai derruba o próximo, então **todos** caem.

## Estrutura da prova

Para provar $P(n)$ para todo $n \ge n_0$:

1. **Base:** mostre que $P(n_0)$ é verdadeira.
2. **Hipótese de indução:** suponha que $P(k)$ é verdadeira para um $k \ge n_0$ qualquer.
3. **Passo:** usando a hipótese, mostre que $P(k+1)$ é verdadeira.

## Exemplo: soma dos primeiros $n$ números

Afirmação: $1 + 2 + \cdots + n = \dfrac{n(n+1)}{2}$.

**Base** ($n=1$): lado esquerdo $=1$; lado direito $=\frac{1\cdot 2}{2}=1$. Confere.

**Hipótese:** suponha $1+2+\cdots+k = \frac{k(k+1)}{2}$.

**Passo:** somando $k+1$ nos dois lados,

$$
1+\cdots+k+(k+1) = \frac{k(k+1)}{2} + (k+1) = \frac{(k+1)(k+2)}{2}
$$

Isso é exatamente a fórmula com $n=k+1$. Logo vale para todo $n \ge 1$. $\blacksquare$

> [!IMPORTANT]
> A hipótese **só pode ser usada no passo**, nunca na base. E o passo precisa terminar **exatamente** na afirmação para $k+1$.

## Erros comuns

- **Esquecer a base.** Sem o primeiro dominó, nada cai.
- **Assumir o que se quer provar:** a hipótese é sobre $k$, não sobre $k+1$.
- **Passo que só funciona para alguns $k$.** Ele precisa valer para todo $k \ge n_0$.

## Exercícios

1. Prove que $2^n > n$ para todo $n \ge 1$.
2. Prove que $1+3+5+\cdots+(2n-1)=n^2$.

{{< details title="Gabarito" >}}
1. Base: $2^1=2>1$. Passo: se $2^k>k$, então $2^{k+1}=2\cdot2^k>2k\ge k+1$ (pois $k\ge1$).
2. Base: $1=1^2$. Passo: $k^2+(2k+1)=(k+1)^2$.
{{< /details >}}
