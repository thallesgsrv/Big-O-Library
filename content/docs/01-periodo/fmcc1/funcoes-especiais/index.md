---
title: Funções especiais
weight: 2
description: Exponencial, logaritmo e funções trigonométricas, com o que cada uma modela.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

Depois de funções em geral, três famílias aparecem o tempo todo: a **exponencial**, a **logarítmica** e as **trigonométricas**.

## Exponencial

$f(x)=a^x$, com $a>0$ e $a\ne1$. Se $a>1$, a função **cresce cada vez mais rápido**: dobrar $x$ não dobra $f$, eleva ao quadrado.

| $x$ | 0 | 1 | 2 | 3 | 10 |
| --- | --- | --- | --- | --- | --- |
| $2^x$ | 1 | 2 | 4 | 8 | 1024 |

Modela o que cresce **proporcionalmente ao que já existe**: juros compostos, população, número de combinações de $n$ bits.

Propriedades: $a^{x+y}=a^x\cdot a^y$, $\;(a^x)^y=a^{xy}$, $\;a^0=1$.

## Logaritmo

É a **inversa** da exponencial:

$$
\log_a x = y \iff a^y = x
$$

Em palavras: $\log_2 8 = 3$ responde "2 elevado a quanto dá 8?". Propriedades:

- $\log_a(xy)=\log_a x+\log_a y$
- $\log_a(x/y)=\log_a x-\log_a y$
- $\log_a(x^k)=k\log_a x$

> [!TIP]
> Em computação, $\log_2 n$ é "quantas vezes dá para dividir $n$ ao meio". Por isso a busca binária leva cerca de $\log_2 n$ passos: em 1 000 000 de itens, são uns 20.

## Trigonométricas

No círculo de raio 1, o ponto no ângulo $\theta$ tem coordenadas $(\cos\theta,\ \sin\theta)$. Daí vêm três fatos:

- $-1\le\sin\theta\le1$ e $-1\le\cos\theta\le1$.
- São **periódicas**: repetem a cada $2\pi$ radianos ($360^\circ$).
- $\sin^2\theta+\cos^2\theta=1$.

Modelam tudo o que **se repete em ciclos**: som, ondas, rotações em jogos e gráficos.

## Exercícios

1. Calcule $\log_3 81$ e $\log_2 \tfrac{1}{8}$.
2. Simplifique $\log_2 40-\log_2 5$.
3. Se $\sin\theta=0{,}6$, quanto vale $|\cos\theta|$?

{{< details title="Gabarito" >}}
1. $3^4=81$, então $4$. $2^{-3}=\tfrac18$, então $-3$.
2. $\log_2\tfrac{40}{5}=\log_2 8=3$.
3. $\cos^2\theta=1-0{,}36=0{,}64$, logo $|\cos\theta|=0{,}8$.
{{< /details >}}
