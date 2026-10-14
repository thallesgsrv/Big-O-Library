---
title: Integração por partes
weight: 1
description: Desfazendo a regra do produto, a regra LIATE e 8 exemplos resolvidos.
autores:
  - thallesgsrv
date: 2026-10-14
---

## Como funciona?

A integração por partes serve para integrais que são **produto de funções de tipos diferentes**, como polinômio vezes exponencial, ou logaritmo, ou arctg. Ela troca uma integral difícil por outra mais simples, mas **a um custo**: você vai precisar derivar uma parte e integrar a outra.

## Sobre

Uma pergunta para começar: qual é mais fácil de integrar, \(x^2 e^x\) ou \(e^x\)?

A segunda, claro. Integrar por partes é justamente um jeito de transformar a primeira em algo mais parecido com a segunda.

De onde vem a fórmula? Da **regra do produto**, lida de trás para frente. Se \(u\) e \(v\) são funções de \(x\):

$$
(uv)' = u'v + uv'
$$

Integrando os dois lados e isolando o termo \(\int u v'\,dx\):

$$
\int u\,dv = u\,v - \int v\,du
$$

onde \(dv = v'\,dx\) e \(du = u'\,dx\).

## Receita

Compare a integral que você quer resolver com o lado esquerdo da fórmula, \(\int u\,dv\), e monte o lado direito.

1. Escolha quem será \(u\) (a parte que você vai **derivar**) e quem será \(dv\) (a parte que você vai **integrar**).
2. Calcule \(du\) (derivando \(u\)) e \(v\) (integrando \(dv\)). Não precisa colocar \(+C\) em \(v\): basta uma primitiva qualquer, a mais simples.
3. Monte \(u\,v - \int v\,du\) e resolva a integral que sobrou.

> [!TIP]
> Dica de organização: antes de calcular, escreva um quadrinho com as quatro peças.
> \(u = \ldots\), \(\;dv = \ldots\), \(\;du = \ldots\), \(\;v = \ldots\)

## Como escolher o \(u\)? Regra LIATE

Escolha como \(u\) o que aparecer **primeiro** nesta lista:

**L**ogaritmo → **I**nversa trigonométrica (arctg, arcsen…) → **A**lgébrica (polinômio) → **T**rigonométrica → **E**xponencial

A lógica: logaritmos e inversas trigonométricas ficam *mais simples* ao derivar, mas são chatos de integrar. Polinômios também melhoram ao derivar (o grau cai). Já seno, cosseno e exponencial "não mudam de cara" nem ao derivar, nem ao integrar.

> [!WARNING]
> LIATE é uma regra de bolso, não um teorema. Se a escolha deixar a integral mais complicada, volte e troque.

## Exemplos

**Exemplo 1.** \(\displaystyle\int x\cos x\,dx\)

Pela LIATE, polinômio (A) vem antes de trigonométrica (T), então \(u = x\) e \(dv = \cos x\,dx\). Logo \(du = dx\) e \(v = \operatorname{sen} x\).

$$
\int x\cos x\,dx = x\operatorname{sen} x - \int \operatorname{sen} x\,dx = x\operatorname{sen} x + \cos x + C
$$

**Exemplo 2.** \(\displaystyle\int x\operatorname{sen} x\,dx\)

\(u = x\), \(dv = \operatorname{sen} x\,dx\), \(du = dx\), \(v = -\cos x\).

$$
\int x\operatorname{sen} x\,dx = -x\cos x + \int \cos x\,dx = -x\cos x + \operatorname{sen} x + C
$$

**Exemplo 3.** \(\displaystyle\int (2x-1)e^x\,dx\)

\(u = 2x-1\), \(dv = e^x\,dx\), \(du = 2\,dx\), \(v = e^x\).

$$
(2x-1)e^x - 2\int e^x\,dx = (2x-1)e^x - 2e^x = (2x-3)e^x + C
$$

**Exemplo 4.** \(\displaystyle\int (1-x)\sec^2 x\,dx\)

\(u = 1-x\), \(dv = \sec^2 x\,dx\), \(du = -dx\), \(v = \operatorname{tg} x\).

$$
(1-x)\operatorname{tg} x + \int \operatorname{tg} x\,dx = (1-x)\operatorname{tg} x - \ln\lvert\cos x\rvert + C
$$

(A integral de \(\operatorname{tg}\) é feita na página *Integrais trigonométricas*.)

**Exemplo 5.** \(\displaystyle\int \ln x\,dx\)

Aqui só existe *uma* função na integral. O truque é enxergar \(\ln x = \ln x \cdot 1\). Com \(u = \ln x\) e \(dv = dx\): \(du = \dfrac{dx}{x}\) e \(v = x\).

$$
x\ln x - \int x\cdot\frac{1}{x}\,dx = x\ln x - x + C
$$

**Exemplo 6.** \(\displaystyle\int x^2 e^x\,dx\)

Este precisa de partes **duas vezes**: cada rodada derruba o grau do polinômio em 1. Com \(u = x^2\), \(dv = e^x\,dx\):

$$
\int x^2e^x\,dx = x^2e^x - 2\int xe^x\,dx
$$

Repetindo com \(u = x\): \(\int xe^x\,dx = xe^x - e^x\). Juntando:

$$
\int x^2 e^x\,dx = e^x\,(x^2 - 2x + 2) + C
$$

**Exemplo 7.** \(\displaystyle\int \operatorname{arctg} x\,dx\)

Mesmo truque do \(\ln\): \(u = \operatorname{arctg} x\), \(dv = dx\), \(du = \dfrac{dx}{1+x^2}\), \(v = x\).

$$
x\operatorname{arctg} x - \int \frac{x}{1+x^2}\,dx
$$

Na última integral, \(w = 1+x^2\) dá \(\tfrac12\ln(1+x^2)\). Logo:

$$
\int\operatorname{arctg} x\,dx = x\operatorname{arctg} x - \tfrac12\ln(1+x^2) + C
$$

**Exemplo 8.** \(\displaystyle\int e^x\cos x\,dx\)

Este é o caso **circular**: depois de partes, a integral original reaparece. Chame-a de \(I\).

Com \(u = \cos x\) e \(dv = e^x\,dx\):

$$
I = e^x\cos x + \int e^x\operatorname{sen} x\,dx
$$

Partes de novo, com \(u = \operatorname{sen} x\) e \(dv = e^x\,dx\):

$$
\int e^x\operatorname{sen} x\,dx = e^x\operatorname{sen} x - I
$$

Substituindo, \(I = e^x\cos x + e^x\operatorname{sen} x - I\). Agora é só uma equação em \(I\):

$$
2I = e^x(\cos x + \operatorname{sen} x) \quad\Rightarrow\quad I = \frac{e^x(\cos x + \operatorname{sen} x)}{2} + C
$$

> [!IMPORTANT]
> No caso circular, mantenha a **mesma escolha** (exponencial em \(dv\) nas duas rodadas). Se você trocar no meio, as duas rodadas se desfazem e você volta ao ponto de partida.

## Integral definida

Para integrais com limites, vale:

$$
\int_a^b f(x)\,g'(x)\,dx = \Big[f(x)\,g(x)\Big]_a^b - \int_a^b f'(x)\,g(x)\,dx
$$

Você pode aplicar os limites no termo \([\ ]_a^b\) já no começo, ou resolver a integral indefinida inteira e aplicar os limites no final.

**Exemplo 9.** \(\displaystyle\int_0^1 xe^x\,dx\)

Com \(u = x\) e \(dv = e^x\,dx\):

$$
\Big[xe^x\Big]_0^1 - \int_0^1 e^x\,dx = (e - 0) - (e - 1) = 1
$$

## Exercícios propostos

**Exercício 1.** Calcule \(\displaystyle\int x\ln x\,dx\).

{{< details title="Gabarito" >}}
Pela LIATE, \(u = \ln x\) e \(dv = x\,dx\). Então \(du = \dfrac{dx}{x}\) e \(v = \dfrac{x^2}{2}\).

$$
\frac{x^2}{2}\ln x - \int \frac{x^2}{2}\cdot\frac{1}{x}\,dx = \frac{x^2}{2}\ln x - \frac{x^2}{4} + C
$$
{{< /details >}}

**Exercício 2.** Calcule \(\displaystyle\int xe^{-x}\,dx\).

{{< details title="Gabarito" >}}
\(u = x\), \(dv = e^{-x}\,dx\), \(du = dx\), \(v = -e^{-x}\).

$$
-xe^{-x} + \int e^{-x}\,dx = -xe^{-x} - e^{-x} + C = -e^{-x}(x+1) + C
$$
{{< /details >}}

**Exercício 3.** Calcule \(\displaystyle\int x^2\ln x\,dx\).

{{< details title="Gabarito" >}}
\(u = \ln x\), \(dv = x^2\,dx\), \(du = \dfrac{dx}{x}\), \(v = \dfrac{x^3}{3}\).

$$
\frac{x^3}{3}\ln x - \int \frac{x^2}{3}\,dx = \frac{x^3}{3}\ln x - \frac{x^3}{9} + C
$$
{{< /details >}}

**Exercício 4.** Calcule \(\displaystyle\int e^x\operatorname{sen} x\,dx\).

{{< details title="Gabarito" >}}
Caso circular, igual ao Exemplo 8. Chamando de \(I\) e fazendo partes duas vezes (com \(e^x\) em \(dv\)):

$$
I = e^x\operatorname{sen} x - e^x\cos x - I \quad\Rightarrow\quad I = \frac{e^x(\operatorname{sen} x - \cos x)}{2} + C
$$
{{< /details >}}

**Exercício 5.** Calcule \(\displaystyle\int_0^{\pi} x\operatorname{sen} x\,dx\).

{{< details title="Gabarito" >}}
Do Exemplo 2, uma primitiva é \(-x\cos x + \operatorname{sen} x\). Então:

$$
\Big[-x\cos x + \operatorname{sen} x\Big]_0^{\pi} = (\pi + 0) - (0 + 0) = \pi
$$
{{< /details >}}
