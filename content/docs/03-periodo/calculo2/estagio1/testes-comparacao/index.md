---
title: Testes de comparação
weight: 7
description: Descobrir se uma integral imprópria converge sem calcular a primitiva.
autores:
  - thallesgsrv
date: 2026-10-14
---

Às vezes é impossível achar a primitiva (por exemplo, de \(e^{-x^2}\)), mas só queremos saber **se converge**. A ideia é espremer a função entre outras que conhecemos.

> [!TIP]
> Estas comparações usam o resultado de \(\int_1^{+\infty} dx/x^p\), da página *Integrais impróprias*: converge se e somente se \(p>1\).

## Teste da comparação

Sejam \(f\) e \(g\) contínuas em \([a,+\infty)\) com \(0\le f(x)\le g(x)\) para todo \(x\ge a\). Então:

- se \(\int_a^{+\infty} g\) converge, então \(\int_a^{+\infty} f\) converge (o maior converge, logo o menor também);
- se \(\int_a^{+\infty} f\) diverge, então \(\int_a^{+\infty} g\) diverge (o menor já diverge, logo o maior também).

> [!WARNING]
> O caminho contrário **não** vale: se o maior diverge ou o menor converge, nada se conclui.

## Teste da comparação no limite

Sejam \(f\) e \(g\) contínuas e positivas em \([a,+\infty)\). Se

\[
\lim_{x\to+\infty}\frac{f(x)}{g(x)} = L, \qquad 0 < L < +\infty,
\]

então \(\int_a^{+\infty} f\) e \(\int_a^{+\infty} g\) **têm o mesmo comportamento**: ambas convergem ou ambas divergem. Na prática, as funções "se parecem" no infinito.

## Quem cresce mais rápido no infinito

Por L'Hôpital: **logaritmo \(\ll\) potência/polinômio \(\ll\) exponencial**. Ou seja, \(\dfrac{\ln x}{x^k}\to0\) e \(\dfrac{x^k}{e^x}\to0\).

## Exemplos

**Exemplo 1.** \(\displaystyle\int_1^{+\infty} e^{-x^2}\,dx\)

{{< details title="Resolução" >}}
Para \(x\ge1\), \(x^2\ge x\), logo \(e^{-x^2}\le e^{-x}\). Como \(\int_1^{+\infty}e^{-x}dx = e^{-1}\) converge, a integral **converge** pelo teste da comparação.
{{< /details >}}

**Exemplo 2.** \(\displaystyle\int_1^{+\infty}\frac{\operatorname{sen}^2 x}{x^2}\,dx\)

{{< details title="Resolução" >}}
Como \(0\le\operatorname{sen}^2 x\le1\), temos \(0\le\dfrac{\operatorname{sen}^2x}{x^2}\le\dfrac1{x^2}\). E \(\int_1^{+\infty}\dfrac{dx}{x^2}\) converge (\(p=2>1\)). **Converge.**
{{< /details >}}

**Exemplo 3.** \(\displaystyle\int_1^{+\infty}\frac{1}{1+x^2}\,dx\)

{{< details title="Resolução" >}}
Compare com \(g(x)=\dfrac1{x^2}\): \(\dfrac{f}{g} = \dfrac{x^2}{1+x^2}\to1\), que está em \((0,\infty)\). Como \(\int g\) converge, **a integral converge** (e, de fato, o valor é \(\pi/4\)).
{{< /details >}}

**Exemplo 4.** \(\displaystyle\int_1^{+\infty}\frac{1-e^{-x}}{x}\,dx\)

{{< details title="Resolução" >}}
Compare com \(g(x)=\dfrac1x\): \(\dfrac fg = 1-e^{-x}\to1\). Como \(\int_1^{+\infty}\dfrac{dx}{x}\) **diverge** (\(p=1\)), esta integral também **diverge**.
{{< /details >}}
