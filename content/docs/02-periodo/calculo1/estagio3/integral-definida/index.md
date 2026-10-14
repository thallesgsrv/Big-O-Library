---
title: Integral Definida e Teorema Fundamental do Cálculo
weight: 5
description: Somas de Riemann, área, integral definida e o Teorema Fundamental do Cálculo.
autores:
  - thallesgsrv
date: 2026-10-14
---

## 1. Aquecimento: notação de somatório

$\displaystyle\sum_{i=1}^{n}a_i=a_1+a_2+\dots+a_n$ (soma de $i=1$ até $n$).

- $\displaystyle\sum_{i=1}^{5}i^2=1+4+9+16+25=55$
- $\displaystyle\sum_{k=0}^{4}(3k+2)=2+5+8+11+14=40$
- Ao contrário: $2+4+6+8+10+12=\displaystyle\sum_{i=1}^{6}2i$

Fórmulas úteis: $\displaystyle\sum_{i=1}^ni=\frac{n(n+1)}2$ e $\displaystyle\sum_{i=1}^ni^2=\frac{n(n+1)(2n+1)}6$.

## 2. O problema da área

Como achar a área sob $f(x)=x^2+1$ em $[0,1]$? Não é um polígono, então não há fórmula pronta. **Ideia:** aproximar por retângulos e melhorar a aproximação.

1. Divida $[a,b]$ em $n$ partes iguais de largura $\Delta x=\dfrac{b-a}{n}$.
2. Em cada parte escolha um ponto $x_i^*$ e construa um retângulo de altura $f(x_i^*)$.
3. Some as áreas:
$$
S_n=\sum_{i=1}^{n}f(x_i^*)\,\Delta x\qquad\text{(soma de Riemann)}
$$

**Exemplo 1 ($n=3$, extremo direito).** $\Delta x=\tfrac13$ e $x_i^*=\tfrac13,\tfrac23,1$:
$$
S_3=\tfrac13\left[\left(\tfrac19+1\right)+\left(\tfrac49+1\right)+(1+1)\right]=\tfrac{41}{27}\approx1{,}52
$$

Com $n$ qualquer, $x_i^*=\tfrac in$:
$$
S_n=\sum_{i=1}^n\left(\frac{i^2}{n^2}+1\right)\frac1n=\frac1{n^3}\cdot\frac{n(n+1)(2n+1)}6+1\xrightarrow{n\to\infty}\frac13+1=\frac43
$$

## 3. Integral definida

$$
\int_a^bf(x)\,dx=\lim_{n\to\infty}\sum_{i=1}^nf(x_i^*)\,\Delta x
$$

é um **número**, a **área com sinal** entre o gráfico e o eixo $x$: área acima do eixo conta $+$, abaixo conta $-$. Toda função contínua em $[a,b]$ é integrável.

**Propriedades:**
$$
\int_a^b(f+g)=\int_a^bf+\int_a^bg,\qquad\int_a^bc\,f=c\int_a^bf,\qquad\int_a^bf+\int_b^cf=\int_a^cf
$$
$$
\int_a^af=0,\qquad\int_b^af=-\int_a^bf
$$

> [!IMPORTANT]
> **Indefinida** = uma **família de funções** ($+C$). **Definida** = um **número**. Não se escreve $C$ na definida.

## 4. Teorema Fundamental do Cálculo (TFC)

É a ponte entre os dois mundos: calcular área **sem** somar retângulos.

**Parte 2 (a que você mais usa).** Se $F$ é primitiva de $f$ em $[a,b]$:
$$
\boxed{\int_a^bf(x)\,dx=F(b)-F(a)=\Big[F(x)\Big]_a^b}
$$

**Parte 1.** Se $f$ é contínua e $G(x)=\displaystyle\int_a^xf(t)\,dt$, então $G'(x)=f(x)$. (A derivada da área acumulada é a própria função.)

Com a regra da cadeia: se o limite superior é $u(x)$,
$$
\frac{d}{dx}\int_a^{u(x)}f(t)\,dt=f(u(x))\cdot u'(x)
$$

### Receita

1. Ache uma primitiva $F$ (sem $C$, ele some na subtração).
2. Calcule $F(b)-F(a)$.

**Exemplo 2.** $\displaystyle\int_0^1(x^2+1)\,dx=\left[\frac{x^3}3+x\right]_0^1=\frac13+1=\frac43$ (o mesmo valor do limite das somas, em duas linhas).

**Exemplo 3.** $\displaystyle\int_0^\pi\operatorname{sen}x\,dx=\Big[-\cos x\Big]_0^\pi=1-(-1)=2$

**Exemplo 4 (área real vs. com sinal).** $\displaystyle\int_0^{2\pi}\operatorname{sen}x\,dx=0$: a parte de cima e a de baixo se anulam. A **área geométrica** é $2\displaystyle\int_0^{\pi}\operatorname{sen}x\,dx=4$.

**Exemplo 5 (TFC, parte 1).** $\dfrac{d}{dx}\displaystyle\int_0^{x^2}e^{-t^2}\,dt=e^{-x^4}\cdot2x$.

> [!WARNING]
> Se $f$ tem uma **assíntota vertical** dentro de $[a,b]$, o TFC **não se aplica**. Ex.: $\int_{-1}^{1}\frac1{x^2}dx\ne\left[-\frac1x\right]_{-1}^{1}=-2$ (o resultado negativo para uma função positiva é um sinal claro de erro). Esses casos são as *integrais impróprias* de Cálculo 2.

## Exercícios propostos

**Exercício 1.** Expanda $\displaystyle\sum_{k=1}^{4}(2k-1)$.

{{< details title="Gabarito" >}}
$1+3+5+7=16$.
{{< /details >}}

**Exercício 2.** $\displaystyle\int_1^3(2x+1)\,dx$

{{< details title="Gabarito" >}}
$\big[x^2+x\big]_1^3=12-2=10$.
{{< /details >}}

**Exercício 3.** $\displaystyle\int_0^{\pi/2}\cos x\,dx$

{{< details title="Gabarito" >}}
$\big[\operatorname{sen}x\big]_0^{\pi/2}=1$.
{{< /details >}}

**Exercício 4.** $\displaystyle\int_1^e\frac1x\,dx$

{{< details title="Gabarito" >}}
$\big[\ln x\big]_1^e=1-0=1$.
{{< /details >}}

**Exercício 5.** Ache $\dfrac{d}{dx}\displaystyle\int_1^{x}\ln t\,dt$ e $\dfrac{d}{dx}\displaystyle\int_0^{x^3}\operatorname{sen}t\,dt$.

{{< details title="Gabarito" >}}
Primeira: $\ln x$. Segunda: $\operatorname{sen}(x^3)\cdot3x^2$.
{{< /details >}}
