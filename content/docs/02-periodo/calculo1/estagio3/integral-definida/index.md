---
title: Integral Definida e Teorema Fundamental do Cálculo
weight: 5
description: Somas de Riemann, área, integral definida e o Teorema Fundamental do Cálculo.
autores:
  - thallesgsrv
date: 2026-10-14
---

## 1. Notação de somatório

O símbolo \(\Sigma\) abrevia somas longas:

$$
\sum_{i=1}^{n}a_i=a_1+a_2+\cdots+a_n
$$

Exemplo: \(\displaystyle\sum_{i=1}^{5}i^2=1+4+9+16+25=55\). Fórmulas úteis:

$$
\sum_{i=1}^{n}i=\frac{n(n+1)}2\qquad\sum_{i=1}^{n}i^2=\frac{n(n+1)(2n+1)}6
$$

## 2. O problema da área e a soma de Riemann

Como achar a área sob \(f(x)=x^2+1\) em \([0,1]\)? Não é um polígono, então não há fórmula pronta. **Ideia:** aproximar por retângulos e melhorar a aproximação.

1. Divida \([a,b]\) em \(n\) partes iguais de largura \(\Delta x=\dfrac{b-a}n\).
2. Em cada parte escolha um ponto \(x_i^*\) e construa um retângulo de altura \(f(x_i^*)\).
3. Some as áreas (soma de Riemann): \(S_n=\displaystyle\sum_{i=1}^{n}f(x_i^*)\,\Delta x\).

**Exemplo 1 (\(n=3\), extremo direito).**

1. \(\Delta x=\dfrac{1-0}3=\dfrac13\) e os pontos são \(x_i^*=\dfrac13,\dfrac23,1\).
2. Alturas: \(f(\tfrac13)=\tfrac19+1=\tfrac{10}9\); \(f(\tfrac23)=\tfrac49+1=\tfrac{13}9\); \(f(1)=2=\tfrac{18}9\).
3. Soma: \(\tfrac{10}{9}+\tfrac{13}9+\tfrac{18}9=\tfrac{41}9\). Multiplique por \(\Delta x\):

$$
S_3=\frac13\cdot\frac{41}9=\frac{41}{27}\approx1{,}52
$$

**Com \(n\) qualquer** (\(x_i^*=\tfrac in\), \(\Delta x=\tfrac1n\)):

$$
S_n=\sum_{i=1}^n\left(\frac{i^2}{n^2}+1\right)\frac1n=\frac1{n^3}\sum_{i=1}^ni^2+\sum_{i=1}^n\frac1n=\frac1{n^3}\cdot\frac{n(n+1)(2n+1)}6+1
$$

Expanda \(\dfrac{n(n+1)(2n+1)}{6n^3}=\dfrac{2n^3+3n^2+n}{6n^3}=\dfrac13+\dfrac1{2n}+\dfrac1{6n^2}\). Quando \(n\to\infty\), os dois últimos termos somem:

$$
S_n\xrightarrow{n\to\infty}\frac13+1=\frac43
$$

## 3. Integral definida

$$
\int_a^bf(x)\,dx=\lim_{n\to\infty}\sum_{i=1}^nf(x_i^*)\,\Delta x
$$

É um **número**: a **área com sinal** entre o gráfico e o eixo \(x\) (acima conta \(+\), abaixo conta \(-\)). Toda função contínua em \([a,b]\) é integrável.

Propriedades: a integral abre na soma e a constante sai; \(\int_a^bf+\int_b^cf=\int_a^cf\); \(\int_a^af=0\); \(\int_b^af=-\int_a^bf\).

> [!IMPORTANT]
> **Indefinida** = uma **família de funções** (\(+C\)). **Definida** = um **número**. Não se escreve \(C\) na definida.

## 4. Teorema Fundamental do Cálculo (TFC)

É a ponte entre os dois mundos: calcular área **sem** somar retângulos.

**Parte 2 (a que você mais usa).** Se \(F\) é primitiva de \(f\) em \([a,b]\):

$$
\boxed{\int_a^bf(x)\,dx=F(b)-F(a)=\Big[F(x)\Big]_a^b}
$$

**Parte 1.** Se \(f\) é contínua e \(G(x)=\displaystyle\int_a^xf(t)\,dt\), então \(G'(x)=f(x)\). (A derivada da área acumulada é a própria função.) Com a regra da cadeia, se o limite superior é \(u(x)\):

$$
\frac d{dx}\int_a^{u(x)}f(t)\,dt=f(u(x))\cdot u'(x)
$$

**Receita:** (1) ache uma primitiva \(F\) (sem \(C\), ele some na subtração); (2) calcule \(F(b)-F(a)\).

**Exemplo 2.** \(\displaystyle\int_0^1(x^2+1)\,dx\): primitiva \(\dfrac{x^3}3+x\).

- Em \(1\): \(\tfrac13+1=\tfrac43\). Em \(0\): \(0\).
- \(\tfrac43-0=\boxed{\tfrac43}\). O mesmo valor do limite das somas, em poucas linhas.

**Exemplo 3.** \(\displaystyle\int_0^\pi\operatorname{sen}x\,dx=\Big[-\cos x\Big]_0^\pi\): em \(\pi\), \(-\cos\pi=-(-1)=1\); em \(0\), \(-\cos0=-1\). Subtraindo (topo menos base): \(1-(-1)=\boxed2\).

**Exemplo 4 (área real vs. com sinal).** \(\displaystyle\int_0^{2\pi}\operatorname{sen}x\,dx=[-\cos x]_0^{2\pi}=-1-(-1)=0\), porque a parte de cima e a de baixo se anulam. A **área geométrica** é \(2\int_0^\pi\operatorname{sen}x\,dx=4\).

**Exemplo 5 (TFC, parte 1).** \(\dfrac{d}{dx}\displaystyle\int_0^{x^2}e^{-t^2}\,dt\)

1. Substitua \(t=x^2\) na função de dentro: \(e^{-(x^2)^2}=e^{-x^4}\).
2. Multiplique pela derivada do limite superior, \((x^2)'=2x\):

$$
e^{-x^4}\cdot2x
$$

> [!WARNING]
> Se \(f\) tem uma **assíntota vertical** dentro de \([a,b]\), o TFC **não se aplica**. Ex.: \(\int_{-1}^1\frac1{x^2}dx\) não é \([-\frac1x]=-2\) (resultado negativo para função positiva é sinal claro de erro). Esses casos são as **integrais impróprias** de Cálculo 2.

## 5. Exercícios

**Exercício 1.** Expanda \(\displaystyle\sum_{k=1}^4(2k-1)\).

{{< details title="Gabarito" >}}
\(k=1:1;\ k=2:3;\ k=3:5;\ k=4:7\). Soma: \(1+3+5+7=16\).
{{< /details >}}

**Exercício 2.** \(\displaystyle\int_1^3(2x+1)\,dx\).

{{< details title="Gabarito" >}}
Primitiva: \(x^2+x\). Em \(3\): \(9+3=12\). Em \(1\): \(1+1=2\). \(12-2=\boxed{10}\).
{{< /details >}}

**Exercício 3.** \(\displaystyle\int_0^{\pi/2}\cos x\,dx\).

{{< details title="Gabarito" >}}
\([\operatorname{sen}x]_0^{\pi/2}=1-0=\boxed1\).
{{< /details >}}

**Exercício 4.** \(\displaystyle\int_1^e\frac1x\,dx\).

{{< details title="Gabarito" >}}
\([\ln x]_1^e=\ln e-\ln1=1-0=\boxed1\).
{{< /details >}}

**Exercício 5.** \(\dfrac d{dx}\displaystyle\int_1^x\ln t\,dt\) e \(\dfrac d{dx}\displaystyle\int_0^{x^3}\operatorname{sen}t\,dt\).

{{< details title="Gabarito" >}}
- Primeira (TFC parte 1): \(\ln x\).
- Segunda (com cadeia): \(\operatorname{sen}(x^3)\cdot(x^3)'=\operatorname{sen}(x^3)\cdot3x^2\).
{{< /details >}}
