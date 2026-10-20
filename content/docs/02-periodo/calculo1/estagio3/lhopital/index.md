---
title: Regra de L'Hôpital
weight: 1
description: Limites indeterminados 0/0, ∞/∞ e outras formas, resolvidos com derivadas.
autores:
  - thallesgsrv
date: 2026-10-14
---

## 1. A ideia

Quando um limite cai em \(\frac00\) ou \(\frac\infty\infty\), não dá para concluir nada olhando só o resultado. A regra diz: compare **a velocidade com que numerador e denominador chegam lá**, ou seja, as derivadas.

$$
\boxed{\lim_{x\to a}\frac{f(x)}{g(x)}=\lim_{x\to a}\frac{f'(x)}{g'(x)}}
$$

desde que:

1. o limite original seja uma indeterminação \(\frac00\) ou \(\frac{\pm\infty}{\pm\infty}\) (**confira primeiro!**);
2. o limite à direita exista (ou seja \(\pm\infty\)).

Vale também para \(a=\pm\infty\) e para limites laterais.

> [!WARNING]
> **Derive numerador e denominador separadamente.** Não é a regra do quociente! Derivar \(\frac fg\) como um bloco está errado aqui.

> [!WARNING]
> **Se o limite não é indeterminado, não use L'Hôpital.** Ex.: \(\lim_{x\to0}\frac{x+1}{x+2}=\frac12\) direto; aplicar a regra daria \(1\), errado.

## 2. Forma \(\frac00\)

**Exemplo 1.** \(\displaystyle\lim_{x\to0}\frac{3x-\operatorname{sen}x}{x}\)

1. Substituindo: \(\frac{0-0}0\). Indeterminação \(\frac00\).
2. Derive em cima e embaixo: \(\dfrac{3-\cos x}{1}\).
3. Substitua: \(3-1=\boxed2\).

**Exemplo 2.** \(\displaystyle\lim_{x\to0}\frac{1-\cos x}{x^2+x}\)

1. Substituindo: \(\frac00\). Derive: \(\dfrac{\operatorname{sen}x}{2x+1}\).
2. Substitua: \(\dfrac01=\boxed0\).

**Exemplo 3.** \(\displaystyle\lim_{x\to0}\frac{\sqrt{x+1}-1}{x}\): derivando, \(\dfrac{\frac1{2\sqrt{x+1}}}{1}\to\dfrac12\) (o mesmo resultado do conjugado, mais rápido).

## 3. Forma \(\frac\infty\infty\)

**Exemplo 4.** \(\displaystyle\lim_{x\to\frac\pi2^-}\frac{\sec x}{1+\operatorname{tg}x}\)

1. Os dois tendem a \(+\infty\). Derive: \(\dfrac{\sec x\operatorname{tg}x}{\sec^2x}\).
2. Simplifique: \(\dfrac{\operatorname{tg}x}{\sec x}=\dfrac{\operatorname{sen}x/\cos x}{1/\cos x}=\operatorname{sen}x\to\boxed1\).

**Exemplo 5.** \(\displaystyle\lim_{x\to\infty}\frac{\ln x}{2\sqrt x}\)

Derive: \(\dfrac{1/x}{2\cdot\frac1{2\sqrt x}}=\dfrac{1/x}{1/\sqrt x}=\dfrac{\sqrt x}{x}=\dfrac1{\sqrt x}\to\boxed0\).

**Exemplo 6.** \(\displaystyle\lim_{x\to\infty}\frac{e^x}{x^2}\)

Derive duas vezes (confira a indeterminação a cada rodada): \(\dfrac{e^x}{2x}\to\dfrac{e^x}{2}\to+\infty\).

Hierarquia no infinito: \(\ln x\ll x^p\ (p>0)\ll e^x\).

## 4. Outras indeterminações: transforme em fração

| Forma | Estratégia |
| --- | --- |
| \(0\cdot\infty\) | escreva \(f\cdot g=\dfrac{f}{1/g}\) e caia em \(\frac00\) ou \(\frac\infty\infty\) |
| \(\infty-\infty\) | junte numa fração só (denominador comum) |
| \(1^\infty,\ 0^0,\ \infty^0\) | tome \(\ln\): se \(\ln f\to L\), então \(f\to e^L\) |

**Exemplo 7 (\(0\cdot\infty\)).** \(\displaystyle\lim_{x\to0^+}\sqrt x\ln x\)

1. Reescreva como \(\dfrac{\ln x}{x^{-1/2}}\) (\(\frac{-\infty}{\infty}\)).
2. Derive: \(\dfrac{1/x}{-\frac12x^{-3/2}}=\dfrac{1}{x}\cdot\left(-2x^{3/2}\right)=-2x^{1/2}\to\boxed0\).

**Exemplo 8.** \(\displaystyle\lim_{x\to\infty}x\operatorname{sen}\frac1x=\lim\frac{\operatorname{sen}(1/x)}{1/x}=\boxed1\) (com \(t=\tfrac1x\to0\), é o limite fundamental).

**Exemplo 9 (\(\infty-\infty\)).** \(\displaystyle\lim_{x\to0^+}\left(\frac1{\operatorname{sen}x}-\frac1x\right)\)

1. Denominador comum: \(\dfrac{x-\operatorname{sen}x}{x\operatorname{sen}x}\) (\(\frac00\)).
2. L'Hôpital: numerador \(1-\cos x\); denominador \(\operatorname{sen}x+x\cos x\) (produto). Ainda \(\frac00\).
3. L'Hôpital de novo: numerador \(\operatorname{sen}x\); denominador \(\cos x+\cos x-x\operatorname{sen}x=2\cos x-x\operatorname{sen}x\).

$$
\frac{\operatorname{sen}x}{2\cos x-x\operatorname{sen}x}\to\frac{0}{2-0}=\boxed0
$$

**Exemplo 10 (\(1^\infty\)).** \(\displaystyle\lim_{x\to0^+}(1+x)^{1/x}\)

1. \(\ln\) da expressão: \(\dfrac{\ln(1+x)}{x}\) (\(\frac00\)).
2. Derive: \(\dfrac{1/(1+x)}{1}\to1\).
3. O limite do \(\ln\) é \(1\), então o limite original é \(e^1=\boxed e\).

**Exemplo 11 (\(\infty^0\)).** \(\displaystyle\lim_{x\to\infty}x^{1/x}\): \(\ln=\dfrac{\ln x}{x}\to0\) (por L'Hôpital: \(\frac{1/x}{1}\to0\)). Logo o limite é \(e^0=\boxed1\).

## 5. Exercícios

**Exercício 1.** \(\displaystyle\lim_{x\to0}\frac{e^x-1}{x}\).

{{< details title="Gabarito" >}}
\(\frac00\); derivando, \(\dfrac{e^x}{1}\to\boxed1\).
{{< /details >}}

**Exercício 2.** \(\displaystyle\lim_{x\to0}\frac{\operatorname{sen}x-x}{x^3}\).

{{< details title="Gabarito" >}}
Três rodadas, cada uma \(\frac00\): \(\dfrac{\cos x-1}{3x^2}\to\dfrac{-\operatorname{sen}x}{6x}\to\dfrac{-\cos x}{6}\to\boxed{-\tfrac16}\).
{{< /details >}}

**Exercício 3.** \(\displaystyle\lim_{x\to\infty}\frac{x^3}{e^x}\).

{{< details title="Gabarito" >}}
Três aplicações: \(\dfrac{3x^2}{e^x}\to\dfrac{6x}{e^x}\to\dfrac{6}{e^x}\to\boxed0\).
{{< /details >}}

**Exercício 4.** \(\displaystyle\lim_{x\to0^+}x\ln x\).

{{< details title="Gabarito" >}}
Reescreva \(\dfrac{\ln x}{1/x}\). L'Hôpital: \(\dfrac{1/x}{-1/x^2}=-x\to\boxed0\).
{{< /details >}}

**Exercício 5.** \(\displaystyle\lim_{x\to\infty}\left(1+\frac1x\right)^x\).

{{< details title="Gabarito" >}}
1. \(\ln=x\ln\left(1+\frac1x\right)=\dfrac{\ln(1+1/x)}{1/x}\) (\(\frac00\)).
2. Derive: numerador \(\dfrac{1}{1+1/x}\cdot\left(-\dfrac1{x^2}\right)\); denominador \(-\dfrac1{x^2}\). O quociente é \(\dfrac1{1+1/x}\to1\).
3. O limite original é \(\boxed e\).
{{< /details >}}
