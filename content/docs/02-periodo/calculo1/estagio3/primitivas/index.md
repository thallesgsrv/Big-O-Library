---
title: Primitivas e Integral Indefinida
weight: 4
description: O que é uma primitiva, a constante C e a integral indefinida com as regras básicas.
autores:
  - thallesgsrv
date: 2026-10-14
---

## 1. Primitiva (antiderivada)

$F$ é uma **primitiva** de $f$ em um intervalo $I$ se
$$
F'(x)=f(x)\quad\text{para todo }x\in I.
$$

**Exemplo 1.** Uma primitiva de $f(x)=2x$ é $F(x)=x^2$, pois $(x^2)'=2x$. Uma primitiva de $g(x)=\cos x$ é $G(x)=\operatorname{sen}x$.

## 2. Por que existe a constante $C$

$x^2$, $x^2+5$ e $x^2-100$ têm todas derivada $2x$. Constantes somem ao derivar, então ao voltar precisamos reaparecer com uma:

> Se $F$ é primitiva de $f$, a primitiva **mais geral** é $F(x)+C$, com $C$ constante qualquer.

Para fixar $C$ usamos uma condição extra.

**Exemplo 2.** Ache $F$ com $F'(x)=3x^2$ e $F(1)=-1$.
$F(x)=x^3+C$. Então $1+C=-1\Rightarrow C=-2$, e $F(x)=x^3-2$.

## 3. Integral indefinida

O conjunto de todas as primitivas de $f$ é a **integral indefinida**:
$$
\int f(x)\,dx=F(x)+C
$$

- $\int$ é o sinal de integral;
- $f(x)$ é o **integrando**;
- $dx$ indica a **variável de integração** (nunca esqueça de escrevê-lo).

> [!IMPORTANT]
> Derivar e integrar se desfazem: $\dfrac{d}{dx}\int f(x)\,dx=f(x)$ e $\int f'(x)\,dx=f(x)+C$.

## 4. Regras e tabela

**Linearidade:**
$$
\int\big[a\,f(x)+b\,g(x)\big]dx=a\int f(x)\,dx+b\int g(x)\,dx
$$
(a integral abre na soma e a constante sai). **Não** existe regra simples para a integral de um produto ou de um quociente de funções.

Use a tabela da página inicial do estágio. Os casos que mais confundem:

- $\int x^n\,dx=\dfrac{x^{n+1}}{n+1}+C$ só vale para $n\ne-1$. Para $n=-1$ é $\ln\lvert x\rvert$.
- $\int\dfrac1{\sqrt x}\,dx=\int x^{-1/2}\,dx=2\sqrt x+C$.
- $\int\dfrac{1}{x^2}\,dx=\int x^{-2}\,dx=-\dfrac1x+C$.

> [!TIP]
> Antes de integrar, **reescreva como potência**: raízes e frações simples viram $x^{p}$.

**Exemplo 3.** $\displaystyle\int(x^2-2x+5)\,dx=\frac{x^3}{3}-x^2+5x+C$

**Exemplo 4.** $\displaystyle\int x^5\,dx=\frac{x^6}{6}+C$; $\displaystyle\int\operatorname{sen}\!\left(\frac x2\right)dx=-2\cos\frac x2+C$

> [!WARNING]
> O segundo caso mostra um perigo: a primitiva de $\operatorname{sen}(x/2)$ **não** é $-\cos(x/2)$. Derivando $-\cos(x/2)$ sai $\tfrac12\operatorname{sen}(x/2)$, faltou compensar o $\tfrac12$. Isso é exatamente o que o método da substituição organiza. Confira sempre derivando.

**Exemplo 5.** $\displaystyle\int\left(3e^x-\frac4x+\sec^2x\right)dx=3e^x-4\ln\lvert x\rvert+\operatorname{tg}x+C$

## Exercícios propostos

**Exercício 1.** $\displaystyle\int(4x^3-6x+1)\,dx$

{{< details title="Gabarito" >}}
$x^4-3x^2+x+C$.
{{< /details >}}

**Exercício 2.** $\displaystyle\int\left(\sqrt x+\frac1{x^2}\right)dx$

{{< details title="Gabarito" >}}
$\dfrac23x^{3/2}-\dfrac1x+C$.
{{< /details >}}

**Exercício 3.** $\displaystyle\int\frac{x^2+1}{x}\,dx$. *Dica: separe a fração.*

{{< details title="Gabarito" >}}
$\int\left(x+\dfrac1x\right)dx=\dfrac{x^2}2+\ln\lvert x\rvert+C$.
{{< /details >}}

**Exercício 4.** Ache $f$ se $f'(x)=\cos x+2$ e $f(0)=3$.

{{< details title="Gabarito" >}}
$f(x)=\operatorname{sen}x+2x+C$. $f(0)=C=3$. Logo $f(x)=\operatorname{sen}x+2x+3$.
{{< /details >}}
