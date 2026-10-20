---
title: Limites Infinitos, Limites no Infinito e Assíntotas
weight: 4
description: Quando a função explode, quando x vai para o infinito, e como isso vira assíntotas.
autores:
  - thallesgsrv
date: 2026-10-01
---

## 1. Dois tipos de "infinito"

O símbolo \(\infty\) **não é um número**: é uma forma de dizer "cresce sem parar". Ele aparece de duas maneiras muito diferentes:

| | Quem vai ao infinito? | Exemplo |
| --- | --- | --- |
| **Limite infinito** | o **valor da função** \(f(x)\) | \(\displaystyle\lim_{x\to2^+}\frac1{x-2}=+\infty\) |
| **Limite no infinito** | o **valor de \(x\)** | \(\displaystyle\lim_{x\to+\infty}\frac1x=0\) |

Cada tipo gera uma **assíntota**: uma reta da qual o gráfico se aproxima indefinidamente.

## 2. Limites infinitos e assíntotas verticais

Se, quando \(x\to a\), \(f(x)\) cresce sem limite, escrevemos \(\lim f=+\infty\) (ou \(-\infty\), se decresce sem limite). A reta \(x=a\) é uma **assíntota vertical**.

**Intuição:** \(\dfrac{\text{algo não nulo}}{\text{número minúsculo}}=\text{número gigante}\). O sinal depende do sinal do numerador e de **qual lado** o denominador minúsculo está.

**Receita:**

1. Substitua \(x=a\). Se der \(\dfrac k0\) com \(k\ne0\), há candidata a assíntota vertical.
2. Analise o **sinal do denominador** de cada lado de \(a\).
3. Conclua \(+\infty\) ou \(-\infty\) em cada lado.

**Exemplo 1.** \(\displaystyle\lim_{x\to3^+}\frac{2}{x-3}\) e \(\displaystyle\lim_{x\to3^-}\frac{2}{x-3}\)

- Pela direita, \(x>3\), então \(x-3\) é positivo minúsculo: \(\frac{2}{0^+}=+\infty\).
- Pela esquerda, \(x<3\), \(x-3\) é negativo minúsculo: \(\frac{2}{0^-}=-\infty\).

O bilateral não existe (lados diferentes), mas \(x=3\) é assíntota vertical.

**Exemplo 2.** \(\displaystyle\lim_{x\to0}\frac1{x^2}=+\infty\). Aqui \(x^2>0\) dos dois lados, então os laterais coincidem e dizemos que o limite é \(+\infty\).

**Exemplo 3.** \(\displaystyle\lim_{x\to1^+}\frac{x+2}{x^2-1}\)

1. Substituindo \(x=1\): \(\dfrac{3}{0}\). Candidata.
2. O numerador tende a \(3>0\). Fatore o denominador: \(x^2-1=(x-1)(x+1)\). Com \(x>1\): \(x-1>0\) e \(x+1>0\) (perto de \(2\)), então o denominador é positivo minúsculo.
3. \(\dfrac{3}{0^+}=+\infty\).

> [!WARNING]
> Se der \(\frac00\), **não** é assíntota ainda. Fatore e simplifique primeiro. Em \(\frac{x^2-1}{x-1}\), \(x=1\) dá um buraco, não uma assíntota.

## 3. Limites no infinito e assíntotas horizontais

\(\lim_{x\to+\infty}f(x)=L\) significa: quando \(x\) fica gigante, \(f(x)\) chega perto de \(L\). Então \(y=L\) é uma **assíntota horizontal**.

Dois limites-base:

$$
\lim_{x\to\pm\infty}\frac1{x^p}=0\ \ (p>0),\qquad\lim_{x\to+\infty}x^p=+\infty\ \ (p>0)
$$

**Receita para quocientes de polinômios:** divida numerador e denominador pela **maior potência de \(x\) do denominador**.

**Exemplo 4.** \(\displaystyle\lim_{x\to\infty}\frac{3x^2+1}{5x^2-x}\)

1. Divida cada termo por \(x^2\):

$$
\frac{\frac{3x^2}{x^2}+\frac1{x^2}}{\frac{5x^2}{x^2}-\frac x{x^2}}=\frac{3+\frac1{x^2}}{5-\frac1x}
$$

2. Com \(x\to\infty\), \(\frac1{x^2}\to0\) e \(\frac1x\to0\): resultado \(\dfrac35\). Assíntota horizontal \(y=\frac35\).

**Exemplo 5.** \(\displaystyle\lim_{x\to\infty}\frac{x+1}{x^2+3}\). Dividindo por \(x^2\): \(\dfrac{\frac1x+\frac1{x^2}}{1+\frac3{x^2}}\to\dfrac01=0\).

**Exemplo 6.** \(\displaystyle\lim_{x\to\infty}\frac{x^3+1}{2x^2+5}\). Dividindo por \(x^2\): \(\dfrac{x+\frac1{x^2}}{2+\frac5{x^2}}\), numerador \(\to\infty\), denominador \(\to2\): resultado \(+\infty\).

> [!TIP]
> **Regra do grau.** Em \(\dfrac{P(x)}{Q(x)}\) com \(x\to\pm\infty\): grau de \(P\) **menor** que o de \(Q\) dá \(0\); graus **iguais** dá a razão dos coeficientes líderes; grau de \(P\) **maior** dá \(\pm\infty\).

**Exemplo 7 (com raiz).** \(\displaystyle\lim_{x\to+\infty}\frac{\sqrt{x^2+1}}{x}\). Para \(x>0\), \(x=\sqrt{x^2}\), então \(\dfrac{\sqrt{x^2+1}}{\sqrt{x^2}}=\sqrt{1+\frac1{x^2}}\to1\).

Mas cuidado em \(x\to-\infty\): \(\sqrt{x^2}=\lvert x\rvert=-x\), e o limite é \(\dfrac{\lvert x\rvert\sqrt{1+1/x^2}}{x}=-\sqrt{1+1/x^2}\to-1\).

**Exemplo 8 (\(\infty-\infty\)).** \(\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+x}-x\right)\)

Subtração de dois infinitos não tem resposta pronta. Multiplique pelo conjugado:

$$
\frac{(\sqrt{x^2+x}-x)(\sqrt{x^2+x}+x)}{\sqrt{x^2+x}+x}=\frac{(x^2+x)-x^2}{\sqrt{x^2+x}+x}=\frac{x}{\sqrt{x^2+x}+x}
$$

Divida em cima e embaixo por \(x\) (com \(x>0\), \(\sqrt{x^2+x}/x=\sqrt{1+1/x}\)):

$$
\frac{1}{\sqrt{1+\frac1x}+1}\to\frac{1}{1+1}=\frac12
$$

Outros limites para lembrar: \(e^x\to+\infty\) (\(x\to+\infty\)) e \(e^x\to0\) (\(x\to-\infty\)); \(\ln x\to+\infty\) (\(x\to+\infty\)) e \(\ln x\to-\infty\) (\(x\to0^+\)); \(\operatorname{arctg}x\to\pm\frac\pi2\) (\(x\to\pm\infty\)).

## 4. Formas indeterminadas e ordem de crescimento

\(\frac\infty\infty\), \(\infty-\infty\) e \(0\cdot\infty\) **não** têm resposta fixa: dependem de quem "vence". Quando \(x\to\infty\):

$$
\ln x\ \ll\ x^p\ (p>0)\ \ll\ e^x
$$

Por isso \(\dfrac{x^2}{e^x}\to0\). (L'Hôpital é mais uma ferramenta para isso.)

**Exemplo 9.** Assíntotas de \(f(x)=\dfrac{2x}{x-1}\).

- **Vertical:** o denominador zera em \(x=1\) e o numerador \((2)\) não: \(x=1\).
- **Horizontal:** graus iguais, razão dos líderes \(\frac21=2\): \(y=2\).

## 5. Exercícios

**Exercício 1.** \(\displaystyle\lim_{x\to1^\pm}\frac1{x-1}\).

{{< details title="Gabarito" >}}
Pela esquerda, \(x-1\) negativo minúsculo: \(\boxed{-\infty}\). Pela direita, positivo minúsculo: \(\boxed{+\infty}\).
{{< /details >}}

**Exercício 2.** \(\displaystyle\lim_{x\to\infty}\frac{4x^3-x}{2x^3+7}\).

{{< details title="Gabarito" >}}
Divida por \(x^3\): \(\dfrac{4-\frac1{x^2}}{2+\frac7{x^3}}\to\dfrac42=\boxed2\).
{{< /details >}}

**Exercício 3.** \(\displaystyle\lim_{x\to-\infty}\frac{x^2+1}{x-3}\).

{{< details title="Gabarito" >}}
Divida por \(x\): \(\dfrac{x+\frac1x}{1-\frac3x}\). Com \(x\to-\infty\), o numerador \(\to-\infty\) e o denominador \(\to1\): \(\boxed{-\infty}\).
{{< /details >}}

**Exercício 4.** Assíntotas de \(f(x)=\dfrac{x}{x^2-4}\).

{{< details title="Gabarito" >}}
- Verticais: \(x^2-4=(x-2)(x+2)=0\), em \(x=2\) e \(x=-2\) (o numerador não zera ali).
- Horizontal: grau do numerador menor, então \(y=0\).
{{< /details >}}

**Exercício 5.** \(\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+3x}-x\right)\).

{{< details title="Gabarito" >}}
Conjugado: \(\dfrac{(x^2+3x)-x^2}{\sqrt{x^2+3x}+x}=\dfrac{3x}{\sqrt{x^2+3x}+x}=\dfrac{3}{\sqrt{1+\frac3x}+1}\to\dfrac{3}{2}\).
{{< /details >}}
