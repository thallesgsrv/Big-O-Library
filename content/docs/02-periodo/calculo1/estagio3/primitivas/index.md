---
title: Primitivas e Integral Indefinida
weight: 4
description: O que é uma primitiva, a constante C e a integral indefinida com as regras básicas.
autores:
  - thallesgsrv
date: 2026-10-14
---

## 1. Primitiva (antiderivada)

\(F\) é uma **primitiva** de \(f\) em um intervalo se \(F'(x)=f(x)\) em todo ponto dele. Exemplo: uma primitiva de \(f(x)=2x\) é \(F(x)=x^2\), pois \((x^2)'=2x\).

**Por que existe a constante \(C\)?** \(x^2\), \(x^2+5\) e \(x^2-100\) têm todas derivada \(2x\). Constantes somem ao derivar, então ao voltar precisamos reaparecer com uma. A primitiva mais geral é \(F(x)+C\). Para fixar \(C\) usamos uma condição extra.

**Exemplo 1.** Ache \(F\) com \(F'(x)=3x^2\) e \(F(1)=-1\).

1. \(F(x)=x^3+C\).
2. \(F(1)=1+C=-1\Rightarrow C=-2\).
3. \(\boxed{F(x)=x^3-2}\).

## 2. Integral indefinida

O conjunto de todas as primitivas de \(f\) é a integral indefinida:

$$
\int f(x)\,dx=F(x)+C
$$

O \(\int\) é o sinal de integral, \(f(x)\) é o **integrando**, e \(dx\) indica a **variável de integração** (nunca esqueça de escrevê-lo).

**Linearidade:** \(\int[a\,f+b\,g]\,dx=a\int f\,dx+b\int g\,dx\) (a integral abre na soma e a constante sai). **Não** existe regra simples para a integral de um produto ou de um quociente: é para isso que servem as técnicas de Cálculo 2.

## 3. Tabela básica

| Integral | Resultado |
| --- | --- |
| \(\int x^n\,dx\) (\(n\ne-1\)) | \(\dfrac{x^{n+1}}{n+1}+C\) |
| \(\int\dfrac1x\,dx\) | \(\ln\lvert x\rvert+C\) |
| \(\int e^x\,dx\) | \(e^x+C\) |
| \(\int\operatorname{sen}x\,dx\) | \(-\cos x+C\) |
| \(\int\cos x\,dx\) | \(\operatorname{sen}x+C\) |
| \(\int\sec^2x\,dx\) | \(\operatorname{tg}x+C\) |
| \(\int\dfrac{dx}{1+x^2}\) | \(\operatorname{arctg}x+C\) |
| \(\int\dfrac{dx}{\sqrt{1-x^2}}\) | \(\operatorname{arcsen}x+C\) |

Os casos que mais confundem:

- \(\int x^n\,dx=\frac{x^{n+1}}{n+1}\) só vale para \(n\ne-1\). Para \(n=-1\) é \(\ln\lvert x\rvert\).
- \(\int\frac1{\sqrt x}dx=\int x^{-1/2}dx=\dfrac{x^{1/2}}{1/2}=2\sqrt x+C\).
- \(\int\frac1{x^2}dx=\int x^{-2}dx=\dfrac{x^{-1}}{-1}=-\dfrac1x+C\).

> [!TIP]
> Antes de integrar, reescreva como potência: raízes e frações simples viram \(x^p\).

**Exemplo 2.** \(\displaystyle\int(x^2-2x+5)\,dx\): cada termo separadamente, somando \(1\) ao expoente e dividindo por ele (e \(5=5x^0\) vira \(5x\)):

$$
\frac{x^3}3-\frac{2x^2}{2}+5x+C=\frac{x^3}{3}-x^2+5x+C
$$

**Exemplo 3 (regra da cadeia ao contrário).** \(\displaystyle\int\operatorname{sen}\frac x2\,dx\)

A primitiva **não** é \(-\cos\frac x2\): derivando isso sai \(\tfrac12\operatorname{sen}\frac x2\) (faltou compensar o \(\frac12\)). Multiplique por \(2\):

$$
\int\operatorname{sen}\frac x2\,dx=-2\cos\frac x2+C
$$

Conferência: \(\left(-2\cos\frac x2\right)'=-2\cdot\left(-\operatorname{sen}\frac x2\right)\cdot\frac12=\operatorname{sen}\frac x2\). \(\checkmark\) Isso é exatamente o que o método da substituição organiza.

## 4. Exercícios

**Exercício 1.** \(\displaystyle\int(4x^3-6x+1)\,dx\).

{{< details title="Gabarito" >}}
\(4\cdot\frac{x^4}4-6\cdot\frac{x^2}2+x=x^4-3x^2+x+C\).
{{< /details >}}

**Exercício 2.** \(\displaystyle\int\left(\sqrt x+\frac1{x^2}\right)dx\).

{{< details title="Gabarito" >}}
Reescreva: \(x^{1/2}+x^{-2}\). Integre: \(\dfrac{x^{3/2}}{3/2}+\dfrac{x^{-1}}{-1}=\dfrac23x^{3/2}-\dfrac1x+C\).
{{< /details >}}

**Exercício 3.** \(\displaystyle\int\frac{x^2+1}{x}\,dx\).

{{< details title="Gabarito" >}}
Separe a fração: \(\dfrac{x^2}{x}+\dfrac1x=x+\dfrac1x\). Integre: \(\dfrac{x^2}2+\ln\lvert x\rvert+C\).
{{< /details >}}

**Exercício 4.** Ache \(f\) se \(f'(x)=\cos x+2\) e \(f(0)=3\).

{{< details title="Gabarito" >}}
\(f(x)=\operatorname{sen}x+2x+C\). \(f(0)=0+0+C=3\), logo \(\boxed{f(x)=\operatorname{sen}x+2x+3}\).
{{< /details >}}
