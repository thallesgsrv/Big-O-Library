---
title: Implícita, Inversas, Exponencial e Logaritmo
weight: 3
description: Derivação implícita, derivada da função inversa, arcos trigonométricos, e^x, ln x e derivação logarítmica.
autores:
  - thallesgsrv
date: 2026-10-11
---

## 1. Derivação implícita

Às vezes $y$ está "misturado" com $x$, como em $x^2+y^2=25$. Não precisa isolar $y$:

1. Derive **os dois lados** em relação a $x$.
2. Sempre que derivar algo com $y$, use a cadeia e escreva $\dfrac{dy}{dx}$ (ou $y'$) no final: $(y^2)'=2y\,y'$.
3. Isole $y'$.

**Exemplo 1.** Ache $y'$ em $(3,-4)$ se $x^2+y^2=25$.
$$
2x+2y\,y'=0\ \Rightarrow\ y'=-\frac xy\ \Rightarrow\ y'(3,-4)=\frac34
$$

**Exemplo 2.** Ache $y''$ se $2x^3-3y^2=8$.
$$
6x^2-6y\,y'=0\ \Rightarrow\ y'=\frac{x^2}{y}
$$
Derivando de novo (quociente, lembrando que $y$ depende de $x$):
$$
y''=\frac{2x\,y-x^2\,y'}{y^2}=\frac{2xy-x^4/y}{y^2}=\frac{2xy^2-x^4}{y^3}
$$

**Exemplo 3 (tangente e normal).** O ponto $(2,4)$ está em $x^3+y^3-9xy=0$? $8+64-72=0$ ✓. Derivando:
$$
3x^2+3y^2y'-9y-9xy'=0\ \Rightarrow\ y'=\frac{3y-x^2}{y^2-3x}\ \Rightarrow\ y'(2,4)=\frac{8}{10}=\frac45
$$
- Tangente: $y-4=\tfrac45(x-2)$.
- Normal (perpendicular, inclinação $-\tfrac54$): $y-4=-\tfrac54(x-2)$.

## 2. Derivada da função inversa

$g=f^{-1}$ desfaz $f$: $f(g(x))=x$. Derivando dos dois lados pela cadeia, $f'(g(x))\,g'(x)=1$, logo:

$$
\boxed{(f^{-1})'(b)=\frac{1}{f'(a)},\quad\text{onde } b=f(a)}
$$

**Exemplo 4.** $f(x)=x^3-2$, $x>0$. Ache $(f^{-1})'(6)$. Como $f(2)=6$ e $f'(x)=3x^2$, $f'(2)=12$. Então $(f^{-1})'(6)=\dfrac1{12}$.

> [!TIP]
> Não precisa achar a fórmula de $f^{-1}$. Descubra $a$ tal que $f(a)=b$ (às vezes no olho) e inverta a derivada.

## 3. Trigonométricas inversas

| Função | Domínio | Imagem |
| --- | --- | --- |
| $\operatorname{arcsen}$ | $[-1,1]$ | $[-\pi/2,\pi/2]$ |
| $\arccos$ | $[-1,1]$ | $[0,\pi]$ |
| $\operatorname{arctg}$ | $\mathbb R$ | $(-\pi/2,\pi/2)$ |
| $\operatorname{arcsec}$ | $\lvert x\rvert\ge1$ | $[0,\pi]\setminus\{\pi/2\}$ |

Valores: $\operatorname{arcsen}\frac12=\frac\pi6$, $\operatorname{arctg}1=\frac\pi4$, $\arccos\frac12=\frac\pi3$, $\operatorname{arcsec}\frac2{\sqrt3}=\frac\pi6$ (pois $\operatorname{arcsec}x=\arccos\frac1x$).

**Derivadas:**
$$
(\operatorname{arcsen}x)'=\frac1{\sqrt{1-x^2}},\qquad(\operatorname{arctg}x)'=\frac1{1+x^2},\qquad(\operatorname{arcsec}x)'=\frac1{\lvert x\rvert\sqrt{x^2-1}}
$$
(e $(\arccos x)'=-\dfrac1{\sqrt{1-x^2}}$).

**Exemplo 5.** Com a cadeia:
- $\dfrac{d}{dx}\operatorname{arcsen}(x^2)=\dfrac{2x}{\sqrt{1-x^4}}$
- $\dfrac{d}{dx}\operatorname{arctg}(2-x)=\dfrac{-1}{1+(2-x)^2}$
- $\dfrac{d}{dx}\operatorname{arcsec}(x^4+2)=\dfrac{4x^3}{(x^4+2)\sqrt{(x^4+2)^2-1}}$

## 4. Exponencial e logaritmo

$$
(e^x)'=e^x,\qquad(\ln x)'=\frac1x\ (x>0)
$$

Propriedades do $\ln$ que simplificam muito antes de derivar:
$$
\ln(ab)=\ln a+\ln b,\quad\ln\frac ab=\ln a-\ln b,\quad\ln(a^n)=n\ln a,\quad\ln e^x=x
$$

**Exemplo 6.** $f(x)=e^{\cos x}\ \Rightarrow\ f'(x)=-\operatorname{sen}x\;e^{\cos x}$.

**Exemplo 7.** $g(x)=\ln\!\dfrac{2x}{x^2+1}$. Abra antes: $g=\ln2+\ln x-\ln(x^2+1)$, então
$$
g'(x)=\frac1x-\frac{2x}{x^2+1}
$$

## 5. Derivação logarítmica

Para produtos/quocientes/potências enormes, ou quando a **variável está no expoente**:

1. Aplique $\ln$ dos dois lados e use as propriedades.
2. Derive implicitamente: $\dfrac{y'}{y}$.
3. Multiplique por $y$ no final.

**Exemplo 8.** $y=\dfrac{(x^2+1)(x+3)^{1/2}}{x+1}$:
$$
\ln y=\ln(x^2+1)+\tfrac12\ln(x+3)-\ln(x+1)
$$
$$
\frac{y'}{y}=\frac{2x}{x^2+1}+\frac1{2(x+3)}-\frac1{x+1}\ \Rightarrow\ y'=\frac{(x^2+1)\sqrt{x+3}}{x+1}\left[\frac{2x}{x^2+1}+\frac1{2(x+3)}-\frac1{x+1}\right]
$$

**Exemplo 9.** $y=x^x$: $\ln y=x\ln x\Rightarrow\dfrac{y'}y=\ln x+1\Rightarrow y'=x^x(\ln x+1)$.

> [!WARNING]
> $x^x$ **não** é $x\cdot x^{x-1}$. A regra da potência só vale com expoente **constante**; e $e^x$ não deriva como potência.

## Exercícios propostos

**Exercício 1.** Ache $y'$ se $x^2+xy+y^2=3$.

{{< details title="Gabarito" >}}
$2x+y+xy'+2yy'=0\Rightarrow y'=-\dfrac{2x+y}{x+2y}$.
{{< /details >}}

**Exercício 2.** Derive $f(x)=x^2\ln x$.

{{< details title="Gabarito" >}}
$2x\ln x+x^2\cdot\frac1x=2x\ln x+x$.
{{< /details >}}

**Exercício 3.** Derive $y=\operatorname{arctg}(e^x)$.

{{< details title="Gabarito" >}}
$\dfrac{e^x}{1+e^{2x}}$.
{{< /details >}}

**Exercício 4.** Derive $y=x^{\operatorname{sen}x}$ por derivação logarítmica.

{{< details title="Gabarito" >}}
$\ln y=\operatorname{sen}x\ln x\Rightarrow\dfrac{y'}{y}=\cos x\ln x+\dfrac{\operatorname{sen}x}{x}$, então $y'=x^{\operatorname{sen}x}\left(\cos x\ln x+\dfrac{\operatorname{sen}x}{x}\right)$.
{{< /details >}}

**Exercício 5.** Se $f(x)=e^x+x$, ache $(f^{-1})'(1)$.

{{< details title="Gabarito" >}}
$f(0)=1$ e $f'(x)=e^x+1\Rightarrow f'(0)=2$. Logo $(f^{-1})'(1)=\dfrac12$.
{{< /details >}}
