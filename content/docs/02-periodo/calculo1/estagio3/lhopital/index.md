---
title: Regra de L'Hôpital
weight: 1
description: Limites indeterminados 0/0, ∞/∞ e outras formas, resolvidos com derivadas.
autores:
  - thallesgsrv
date: 2026-10-14
---

## 1. A ideia

Quando um limite cai em $\dfrac00$ ou $\dfrac\infty\infty$, não dá para concluir nada olhando só o resultado. A regra diz: compare **a velocidade com que numerador e denominador chegam lá**, ou seja, as derivadas.

$$
\boxed{\lim_{x\to a}\frac{f(x)}{g(x)}=\lim_{x\to a}\frac{f'(x)}{g'(x)}}
$$

desde que:

1. o limite original seja uma indeterminação $\dfrac00$ ou $\dfrac{\pm\infty}{\pm\infty}$ (**confira primeiro!**);
2. o limite à direita exista (ou seja $\pm\infty$).

Vale também para $a=\pm\infty$ e para limites laterais.

> [!WARNING]
> **Derive numerador e denominador separadamente.** Não é a regra do quociente! Derivar $\dfrac fg$ como um bloco está errado aqui.

> [!IMPORTANT]
> Se o limite **não** é indeterminado, **não use** L'Hôpital. Ex.: $\lim_{x\to0}\dfrac{x+1}{x+2}=\dfrac12$ direto; aplicar a regra daria $1$, errado.

## 2. Forma $\dfrac00$

**Exemplo 1.** $\displaystyle\lim_{x\to0}\frac{3x-\operatorname{sen}x}{x}\overset{L'H}{=}\lim\frac{3-\cos x}{1}=2$

**Exemplo 2.** $\displaystyle\lim_{x\to0}\frac{1-\cos x}{x^2+x}\overset{L'H}{=}\lim\frac{\operatorname{sen}x}{2x+1}=\frac01=0$

**Exemplo 3.** $\displaystyle\lim_{x\to0}\frac{\sqrt{x+1}-1}{x}\overset{L'H}{=}\lim\frac{\frac1{2\sqrt{x+1}}}{1}=\frac12$

## 3. Forma $\dfrac\infty\infty$

**Exemplo 4.** $\displaystyle\lim_{x\to\pi/2^-}\frac{\sec x}{1+\operatorname{tg}x}\overset{L'H}{=}\lim\frac{\sec x\operatorname{tg}x}{\sec^2x}=\lim\frac{\operatorname{tg}x}{\sec x}=\lim\operatorname{sen}x=1$

**Exemplo 5.** $\displaystyle\lim_{x\to\infty}\frac{\ln x}{2\sqrt x}\overset{L'H}{=}\lim\frac{1/x}{1/\sqrt x}=\lim\frac1{\sqrt x}=0$

**Exemplo 6.** $\displaystyle\lim_{x\to\infty}\frac{e^x}{x^2}\overset{L'H}{=}\lim\frac{e^x}{2x}\overset{L'H}{=}\lim\frac{e^x}{2}=+\infty$

Pode aplicar **mais de uma vez**, conferindo a indeterminação a cada rodada.

**Hierarquia no infinito** (quem vence quando $x\to\infty$):
$$
\ln x\ \ll\ x^p\ (p>0)\ \ll\ e^x
$$
É por isso que $\frac{\ln x}{x^p}\to0$ e $\frac{x^p}{e^x}\to0$.

## 4. Outras indeterminações: transforme em fração

| Forma | Estratégia |
| --- | --- |
| $0\cdot\infty$ | escreva $f\cdot g=\dfrac{f}{1/g}$ e caia em $\frac00$ ou $\frac\infty\infty$ |
| $\infty-\infty$ | junte numa fração só (denominador comum) |
| $1^\infty,\ 0^0,\ \infty^0$ | tome $\ln$: se $\ln f\to L$, então $f\to e^L$ |

**Exemplo 7 ($0\cdot\infty$).** $\displaystyle\lim_{x\to0^+}\sqrt x\ln x=\lim\frac{\ln x}{x^{-1/2}}\overset{L'H}{=}\lim\frac{1/x}{-\frac12x^{-3/2}}=\lim(-2\sqrt x)=0$

**Exemplo 8 ($0\cdot\infty$).** $\displaystyle\lim_{x\to\infty}x\operatorname{sen}\frac1x=\lim\frac{\operatorname{sen}(1/x)}{1/x}=1$ (com $t=1/x\to0$, é o limite fundamental $\frac{\operatorname{sen}t}{t}$).

**Exemplo 9 ($\infty-\infty$).**
$$
\lim_{x\to0^+}\left(\frac1{\operatorname{sen}x}-\frac1x\right)=\lim\frac{x-\operatorname{sen}x}{x\operatorname{sen}x}\overset{L'H}{=}\lim\frac{1-\cos x}{\operatorname{sen}x+x\cos x}\overset{L'H}{=}\lim\frac{\operatorname{sen}x}{2\cos x-x\operatorname{sen}x}=0
$$

**Exemplo 10 ($1^\infty$).** $\displaystyle\lim_{x\to0^+}(1+x)^{1/x}$: $\ln(\cdot)=\dfrac{\ln(1+x)}{x}\overset{L'H}{=}\dfrac{1/(1+x)}{1}\to1$. Logo o limite é $e^1=e$.

**Exemplo 11 ($\infty^0$).** $\displaystyle\lim_{x\to\infty}x^{1/x}$: $\ln(\cdot)=\dfrac{\ln x}{x}\to0$. Logo o limite é $e^0=1$.

## Exercícios propostos

**Exercício 1.** $\displaystyle\lim_{x\to0}\frac{e^x-1}{x}$.

{{< details title="Gabarito" >}}
$\dfrac00\Rightarrow\lim\dfrac{e^x}{1}=1$.
{{< /details >}}

**Exercício 2.** $\displaystyle\lim_{x\to0}\frac{\operatorname{sen}x-x}{x^3}$.

{{< details title="Gabarito" >}}
$\dfrac{\cos x-1}{3x^2}\to\dfrac{-\operatorname{sen}x}{6x}\to\dfrac{-\cos x}{6}=-\dfrac16$.
{{< /details >}}

**Exercício 3.** $\displaystyle\lim_{x\to\infty}\frac{x^3}{e^{x}}$.

{{< details title="Gabarito" >}}
Três aplicações: $\dfrac{3x^2}{e^x}\to\dfrac{6x}{e^x}\to\dfrac6{e^x}=0$.
{{< /details >}}

**Exercício 4.** $\displaystyle\lim_{x\to0^+}x\ln x$.

{{< details title="Gabarito" >}}
$\dfrac{\ln x}{1/x}\to\dfrac{1/x}{-1/x^2}=-x\to0$.
{{< /details >}}

**Exercício 5.** $\displaystyle\lim_{x\to\infty}\left(1+\frac1x\right)^x$.

{{< details title="Gabarito" >}}
$\ln=x\ln(1+\tfrac1x)=\dfrac{\ln(1+1/x)}{1/x}\to\dfrac{\frac{1}{1+1/x}\cdot(-1/x^2)}{-1/x^2}=\dfrac1{1+1/x}\to1$. Limite: $e$.
{{< /details >}}
