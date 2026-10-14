---
title: Integrais impróprias
weight: 6
description: Integrais com limites infinitos ou assíntotas verticais, definidas por limites.
autores:
  - thallesgsrv
date: 2026-10-14
---

Integrais impróprias aparecem quando o intervalo é infinito ou quando a função "explode" em algum ponto. Elas são definidas por limite e podem convergir ou divergir.

## Tipo 1: limite infinito de integração

- \(\displaystyle\int_a^{+\infty} f\,dx = \lim_{b\to+\infty}\int_a^b f\,dx\).
- \(\displaystyle\int_{-\infty}^b f\,dx = \lim_{a\to-\infty}\int_a^b f\,dx\).
- \(\displaystyle\int_{-\infty}^{+\infty} f\,dx = \int_{-\infty}^{c} f\,dx + \int_c^{+\infty} f\,dx\), para qualquer \(c\). **As duas** precisam convergir.

## Tipo 2: assíntota vertical

- \(f\) explode em \(b\): \(\displaystyle\int_a^b f\,dx = \lim_{c\to b^-}\int_a^c f\,dx\).
- \(f\) explode em \(a\): \(\displaystyle\int_a^b f\,dx = \lim_{c\to a^+}\int_c^b f\,dx\).
- \(f\) explode em um ponto \(c\) **dentro** do intervalo: separe em duas integrais, uma de cada lado de \(c\).

> [!IMPORTANT]
> A integral **converge** quando o limite existe (e esse limite é o valor). Ela **diverge** quando o limite não existe ou é infinito.

## Exemplos

**Exemplo 1.** \(\displaystyle\int_1^{+\infty}\frac{\ln x}{x^2}\,dx\)

{{< details title="Resolução" >}}
Por partes (\(u=\ln x\), \(dv=dx/x^2\)): \(\displaystyle\int\frac{\ln x}{x^2}dx = -\frac{\ln x + 1}{x}\). Então

\[
\int_1^b = 1 - \frac{\ln b + 1}{b} \;\xrightarrow{b\to\infty}\; 1,
\]

pois \(\dfrac{\ln b}{b}\to 0\) e \(\dfrac1b\to0\). **Converge, e o valor é 1.**
{{< /details >}}

**Exemplo 2.** \(\displaystyle\int_{-\infty}^{+\infty}\frac{dx}{1+x^2}\)

{{< details title="Resolução" >}}
A primitiva é \(\operatorname{arctg} x\). Separando em \(c=0\): \(\int_0^{+\infty} = \tfrac{\pi}{2}\) e \(\int_{-\infty}^0 = \tfrac{\pi}{2}\). **Converge, e o valor é \(\pi\).**
{{< /details >}}

**Exemplo 3 (a integral de referência).** \(\displaystyle\int_1^{+\infty}\frac{dx}{x^p}\), para \(p\in\mathbb{R}\)

{{< details title="Resolução" >}}
- Se \(p\neq1\): \(\displaystyle\int_1^b x^{-p}dx = \frac{b^{1-p}-1}{1-p}\). Se \(p>1\), \(b^{1-p}\to0\) e o valor é \(\dfrac{1}{p-1}\) (converge). Se \(p<1\), \(b^{1-p}\to\infty\) (diverge).
- Se \(p=1\): \(\int_1^b\dfrac{dx}{x} = \ln b\to\infty\) (diverge).

**Conclusão: \(\int_1^{+\infty}\dfrac{dx}{x^p}\) converge se e somente se \(p>1\).**
{{< /details >}}

> [!TIP]
> Decore o resultado do Exemplo 3: ele é a base de todas as comparações do estágio.

**Exemplo 4.** \(\displaystyle\int_0^1\frac{dx}{1-x}\)

{{< details title="Resolução" >}}
O integrando explode em \(x=1\). \(\displaystyle\int_0^c\frac{dx}{1-x} = -\ln(1-c)\to+\infty\) quando \(c\to1^-\). **Diverge.**
{{< /details >}}

**Exemplo 5.** \(\displaystyle\int_0^3\frac{dx}{(x-1)^{2/3}}\)

{{< details title="Resolução" >}}
Explode em \(x=1\), que está dentro do intervalo. Separe em \(\int_0^1+\int_1^3\). A primitiva é \(3(x-1)^{1/3}\).

- \(\int_0^1 = 3\big(0-(-1)\big) = 3\).
- \(\int_1^3 = 3\sqrt[3]{2}\).

As duas convergem, então o total é \(3 + 3\sqrt[3]{2}\).
{{< /details >}}

**Exemplo 6.** Qual é a área sob \(f(x) = \dfrac{1}{\sqrt x}\) em \((0,2]\)?

{{< details title="Resolução" >}}
A primitiva é \(2\sqrt x\). \(\displaystyle\int_c^2 = 2\sqrt2 - 2\sqrt c\to 2\sqrt2\) quando \(c\to0^+\). **Converge: a área é \(2\sqrt2\).**
{{< /details >}}

> [!NOTE]
> Intuição: a integral não converge quando a função "não encolhe rápido o bastante" no infinito, ou "explode rápido demais" perto da assíntota.
