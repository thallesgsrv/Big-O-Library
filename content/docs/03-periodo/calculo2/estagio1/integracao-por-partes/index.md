---
title: Integração por partes
weight: 2
description: Desfazendo a regra do produto a fórmula, a regra LIATE e 8 exemplos resolvidos.
autores:
  - thallesgsrv
date: 2026-10-14
---

A integração por partes é a regra do produto "ao contrário". Serve para integrais com produto de funções de tipos diferentes, como polinômio vezes exponencial, logaritmo ou arctg.

## Receita

1. Escolha quem será \(u\) (vai ser **derivado**) e quem será \(dv\) (vai ser **integrado**).
2. Calcule \(du\) (derivando \(u\)) e \(v\) (integrando \(dv\)). Não precisa de \(+C\) em \(v\).
3. Monte \(u\,v - \int v\,du\) e resolva o que sobrou.

## Como escolher o \(u\)? Regra LIATE

Escolha como \(u\) o que aparecer **primeiro** nesta lista:

**L**ogaritmo → **I**nversa trigonométrica (arctg, arcsen…) → **A**lgébrica (polinômio) → **T**rigonométrica → **E**xponencial.

Polinômios costumam ir para \(u\) porque, ao derivar, ficam mais simples. Mas lembre: *nem sempre* é assim.

## Exemplos

**Exemplo 1.** \(\int x\cos x\,dx\)

{{< details title="Resolução" >}}
\(u = x\), \(dv = \cos x\,dx\), logo \(du = dx\) e \(v = \operatorname{sen} x\).

\[
\int x\cos x\,dx = x\operatorname{sen} x - \int \operatorname{sen} x\,dx = x\operatorname{sen} x + \cos x + C.
\]
{{< /details >}}

**Exemplo 2.** \(\int x\operatorname{sen} x\,dx\)

{{< details title="Resolução" >}}
\(u = x\), \(dv = \operatorname{sen} x\,dx\), logo \(du = dx\) e \(v = -\cos x\).

\[
\int x\operatorname{sen} x\,dx = -x\cos x + \int \cos x\,dx = -x\cos x + \operatorname{sen} x + C.
\]
{{< /details >}}

**Exemplo 3.** \(\int (2x-1)e^x\,dx\)

{{< details title="Resolução" >}}
\(u = 2x-1\), \(dv = e^x dx\), logo \(du = 2\,dx\) e \(v = e^x\).

\[
(2x-1)e^x - 2\int e^x dx = (2x-1)e^x - 2e^x = (2x-3)e^x + C.
\]
{{< /details >}}

**Exemplo 4.** \(\int (1-x)\sec^2 x\,dx\)

{{< details title="Resolução" >}}
\(u = 1-x\), \(dv = \sec^2 x\,dx\), logo \(du = -dx\) e \(v = \operatorname{tg} x\).

\[
(1-x)\operatorname{tg} x + \int \operatorname{tg} x\,dx = (1-x)\operatorname{tg} x - \ln\lvert\cos x\rvert + C.
\]

(A integral de \(\operatorname{tg}\) está na página *Integrais trigonométricas*.)
{{< /details >}}

**Exemplo 5.** \(\int \ln x\,dx\)

{{< details title="Resolução" >}}
Truque: escreva \(\ln x = \ln x \cdot 1\). Com \(u = \ln x\) e \(dv = dx\): \(du = dx/x\), \(v = x\).

\[
x\ln x - \int x\cdot\frac{1}{x}\,dx = x\ln x - x + C.
\]
{{< /details >}}

**Exemplo 6.** \(\int x^2 e^x\,dx\)

{{< details title="Resolução" >}}
Aqui é preciso usar partes **duas vezes**. Com \(u = x^2\), \(dv = e^x dx\): \(du = 2x\,dx\), \(v = e^x\).

\[
\int x^2e^x dx = x^2e^x - 2\int xe^x dx.
\]

Repetindo com \(u = x\): \(\int xe^x dx = xe^x - e^x\). Juntando:

\[
\int x^2 e^x\,dx = e^x(x^2 - 2x + 2) + C.
\]
{{< /details >}}

**Exemplo 7.** \(\int \operatorname{arctg} x\,dx\)

{{< details title="Resolução" >}}
\(u = \operatorname{arctg} x\), \(dv = dx\): \(du = \dfrac{dx}{1+x^2}\), \(v = x\).

\[
x\operatorname{arctg} x - \int \frac{x}{1+x^2}dx.
\]

Na última integral, \(w = 1+x^2\) dá \(\tfrac12\ln(1+x^2)\). Logo:

\[
\int\operatorname{arctg} x\,dx = x\operatorname{arctg} x - \tfrac12\ln(1+x^2) + C.
\]
{{< /details >}}

**Exemplo 8.** \(\int e^x\cos x\,dx\)

{{< details title="Resolução" >}}
Este é o caso **circular**: a integral original reaparece. Chame-a de \(I\).

Com \(u=\cos x\), \(dv=e^xdx\): \(I = e^x\cos x + \int e^x\operatorname{sen} x\,dx\).

Por partes de novo (\(u=\operatorname{sen} x\)): \(\int e^x\operatorname{sen} x\,dx = e^x\operatorname{sen} x - I\).

Então \(I = e^x\cos x + e^x\operatorname{sen} x - I\), e resolvendo como equação:

\[
I = \frac{e^x(\cos x + \operatorname{sen} x)}{2} + C.
\]
{{< /details >}}

## Integral definida

\[
\int_a^b f(x)\,g'(x)\,dx = \big[f(x)\,g(x)\big]_a^b - \int_a^b f'(x)\,g(x)\,dx.
\]

Você pode aplicar os limites no termo \([\ ]_a^b\) já no começo, ou resolver a integral indefinida e aplicar os limites no final.
