---
title: Implícita, Inversas, Exponencial e Logaritmo
weight: 3
description: Derivação implícita, derivada da função inversa, arcos trigonométricos, e^x, ln x e derivação logarítmica.
autores:
  - thallesgsrv
date: 2026-10-11
---

## 1. Derivação implícita

Às vezes \(y\) está "misturado" com \(x\), como em \(x^2+y^2=25\). Não precisa isolar \(y\):

1. Derive **os dois lados** em relação a \(x\).
2. Sempre que derivar algo com \(y\), use a cadeia e escreva \(y'\) (ou \(\frac{dy}{dx}\)) no final: \((y^2)'=2y\,y'\).
3. Isole \(y'\).

**Exemplo 1.** Ache \(y'\) no ponto \((3,-4)\) se \(x^2+y^2=25\).

1. Derive: \(2x+2y\,y'=0\).
2. Isole: \(2y\,y'=-2x\), logo \(y'=-\dfrac xy\).
3. Em \((3,-4)\): \(y'=-\dfrac{3}{-4}=\boxed{\dfrac34}\).

**Exemplo 2.** Ache \(y''\) se \(2x^3-3y^2=8\).

1. Derive: \(6x^2-6y\,y'=0\), logo \(y'=\dfrac{x^2}{y}\).
2. Derive de novo pela regra do quociente, lembrando que \(y\) depende de \(x\) (então \(y'\) aparece):

$$
y''=\frac{2x\cdot y-x^2\cdot y'}{y^2}
$$

3. Substitua \(y'=\frac{x^2}y\): \(x^2y'=\dfrac{x^4}{y}\).

$$
y''=\frac{2xy-\frac{x^4}{y}}{y^2}=\frac{\frac{2xy^2-x^4}{y}}{y^2}=\frac{2xy^2-x^4}{y^3}
$$

**Exemplo 3 (tangente e normal).** O ponto \((2,4)\) está na curva \(x^3+y^3-9xy=0\)? \(8+64-72=0\). \(\checkmark\)

1. Derive (o termo \(9xy\) usa produto): \(3x^2+3y^2y'-9y-9xy'=0\).
2. Junte os termos com \(y'\): \(y'(3y^2-9x)=9y-3x^2\), logo \(y'=\dfrac{9y-3x^2}{3y^2-9x}=\dfrac{3y-x^2}{y^2-3x}\).
3. Em \((2,4)\): \(y'=\dfrac{12-4}{16-6}=\dfrac{8}{10}=\dfrac45\).
4. **Tangente:** \(y-4=\tfrac45(x-2)\). **Normal** (perpendicular, inclinação \(-\tfrac54\)): \(y-4=-\tfrac54(x-2)\).

## 2. Derivada da função inversa

\(g=f^{-1}\) desfaz \(f\): \(f(g(x))=x\). Derive os dois lados pela cadeia: \(f'(g(x))\,g'(x)=1\), logo

$$
\boxed{(f^{-1})'(b)=\frac1{f'(a)},\quad\text{onde }b=f(a)}
$$

**Exemplo 4.** \(f(x)=x^3-2\), \(x>0\). Ache \((f^{-1})'(6)\).

1. Qual \(a\) cumpre \(f(a)=6\)? \(a^3-2=6\Rightarrow a^3=8\Rightarrow a=2\).
2. \(f'(x)=3x^2\), então \(f'(2)=12\).
3. \((f^{-1})'(6)=\dfrac1{12}\).

> [!TIP]
> Não precisa achar a fórmula de \(f^{-1}\). Descubra o \(a\) tal que \(f(a)=b\) (às vezes no olho) e inverta a derivada.

## 3. Trigonométricas inversas

| Função | Domínio | Imagem |
| --- | --- | --- |
| \(\operatorname{arcsen}\) | \([-1,1]\) | \([-\frac\pi2,\frac\pi2]\) |
| \(\arccos\) | \([-1,1]\) | \([0,\pi]\) |
| \(\operatorname{arctg}\) | \(\mathbb R\) | \((-\frac\pi2,\frac\pi2)\) |
| \(\operatorname{arcsec}\) | \(\lvert x\rvert\ge1\) | \([0,\pi]\setminus\{\frac\pi2\}\) |

Valores úteis: \(\operatorname{arcsen}\tfrac12=\tfrac\pi6\), \(\operatorname{arctg}1=\tfrac\pi4\), \(\arccos\tfrac12=\tfrac\pi3\).

Derivadas:

$$
(\operatorname{arcsen}x)'=\frac1{\sqrt{1-x^2}},\quad(\operatorname{arctg}x)'=\frac1{1+x^2},\quad(\operatorname{arcsec}x)'=\frac1{\lvert x\rvert\sqrt{x^2-1}}
$$

e \((\arccos x)'=-\dfrac1{\sqrt{1-x^2}}\).

**Exemplo 5.** Com a cadeia:

- \(\dfrac d{dx}\operatorname{arcsen}(x^2)=\dfrac1{\sqrt{1-(x^2)^2}}\cdot2x=\dfrac{2x}{\sqrt{1-x^4}}\).
- \(\dfrac d{dx}\operatorname{arctg}(2-x)=\dfrac1{1+(2-x)^2}\cdot(-1)=\dfrac{-1}{1+(2-x)^2}\).
- \(\dfrac d{dx}\operatorname{arcsec}(x^4+2)=\dfrac{4x^3}{(x^4+2)\sqrt{(x^4+2)^2-1}}\) (o módulo some, pois \(x^4+2>0\)).

## 4. Exponencial e logaritmo

$$
(e^x)'=e^x,\qquad(\ln x)'=\frac1x\ (x>0)
$$

Propriedades do \(\ln\) que simplificam muito **antes** de derivar:

$$
\ln(ab)=\ln a+\ln b,\quad\ln\frac ab=\ln a-\ln b,\quad\ln(a^n)=n\ln a,\quad\ln e^x=x
$$

**Exemplo 6.** \(f(x)=e^{\cos x}\): fora \(e^u\), dentro \(\cos x\). \(f'(x)=e^{\cos x}\cdot(-\operatorname{sen}x)\).

**Exemplo 7.** \(g(x)=\ln\dfrac{2x}{x^2+1}\). Abra antes de derivar: \(g=\ln2+\ln x-\ln(x^2+1)\), então

$$
g'(x)=0+\frac1x-\frac{2x}{x^2+1}
$$

## 5. Derivação logarítmica

Para produtos, quocientes e potências enormes, ou quando a **variável está no expoente**:

1. Aplique \(\ln\) nos dois lados e use as propriedades.
2. Derive implicitamente: \((\ln y)'=\dfrac{y'}{y}\).
3. Multiplique por \(y\) no final.

**Exemplo 8.** \(y=\dfrac{(x^2+1)\sqrt{x+3}}{x+1}\)

1. \(\ln y=\ln(x^2+1)+\tfrac12\ln(x+3)-\ln(x+1)\).
2. Derive: \(\dfrac{y'}{y}=\dfrac{2x}{x^2+1}+\dfrac1{2(x+3)}-\dfrac1{x+1}\).
3. Multiplique por \(y\):

$$
y'=\frac{(x^2+1)\sqrt{x+3}}{x+1}\left[\frac{2x}{x^2+1}+\frac1{2(x+3)}-\frac1{x+1}\right]
$$

**Exemplo 9.** \(y=x^x\). A variável está no expoente **e** na base: nem a regra da potência nem a da exponencial servem.

1. \(\ln y=x\ln x\).
2. Derive (produto no lado direito): \(\dfrac{y'}{y}=1\cdot\ln x+x\cdot\dfrac1x=\ln x+1\).
3. \(\boxed{y'=x^x(\ln x+1)}\).

> [!WARNING]
> \(x^x\) **não** é \(x\cdot x^{x-1}\). A regra da potência só vale com expoente **constante**.

## 6. Exercícios

**Exercício 1.** \(y'\) se \(x^2+xy+y^2=3\).

{{< details title="Gabarito" >}}
1. Derive (o termo \(xy\) usa o produto): \(2x+(y+xy')+2yy'=0\).
2. Junte os \(y'\): \(y'(x+2y)=-2x-y\).
3. \(y'=-\dfrac{2x+y}{x+2y}\).
{{< /details >}}

**Exercício 2.** Derive \(f(x)=x^2\ln x\).

{{< details title="Gabarito" >}}
Produto: \(2x\ln x+x^2\cdot\frac1x=2x\ln x+x\).
{{< /details >}}

**Exercício 3.** \(y=\operatorname{arctg}(e^x)\).

{{< details title="Gabarito" >}}
Fora \(\operatorname{arctg}\), dentro \(e^x\): \(\dfrac{1}{1+(e^x)^2}\cdot e^x=\dfrac{e^x}{1+e^{2x}}\).
{{< /details >}}

**Exercício 4.** \(y=x^{\operatorname{sen}x}\).

{{< details title="Gabarito" >}}
1. \(\ln y=\operatorname{sen}x\cdot\ln x\).
2. \(\dfrac{y'}y=\cos x\ln x+\operatorname{sen}x\cdot\dfrac1x\).
3. \(y'=x^{\operatorname{sen}x}\left(\cos x\ln x+\dfrac{\operatorname{sen}x}{x}\right)\).
{{< /details >}}

**Exercício 5.** Se \(f(x)=e^x+x\), ache \((f^{-1})'(1)\).

{{< details title="Gabarito" >}}
1. \(f(a)=1\): \(a=0\), pois \(e^0+0=1\).
2. \(f'(x)=e^x+1\), \(f'(0)=2\).
3. \((f^{-1})'(1)=\dfrac12\).
{{< /details >}}
