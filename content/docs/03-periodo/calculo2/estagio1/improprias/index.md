---
title: Integrais impróprias
weight: 5
description: Integrais com limites infinitos ou assíntotas verticais, definidas por limites.
autores:
  - thallesgsrv
date: 2026-10-14
---

## Como funciona?

Até aqui, toda integral \(\int_a^b f(x)\,dx\) tinha um intervalo finito e uma função bem-comportada. Integrais **impróprias** quebram uma dessas duas regras: o intervalo é infinito, ou a função "explode" em algum ponto. A pergunta passa a ser: *a área, apesar de ilimitada, tem um valor finito?*

## Sobre

Uma função \(f : [a,b] \to \mathbb{R}\) é integrável (no sentido usual) se:

- é **contínua**, ou
- tem **número finito de descontinuidades** e é **limitada**.

Quando isso falha, a integral é imprópria. E elas aparecem na prática: o campo magnético de um fio infinitamente longo, em Física, é calculado com uma integral de \(-\infty\) a \(+\infty\).

Pense em duas áreas:

- A região sob \(f(x) = \dfrac{\ln x}{x^2}\) sobre \([1, 5]\), \([1, 10]\), \([1, 1000]\)... cada intervalo dá uma área finita. E se o intervalo for \([1, +\infty)\)?
- A região sob \(f(x) = \dfrac{1}{\sqrt{x}}\) sobre \([1, 2]\), \([\tfrac12, 2]\), \([\tfrac1{100}, 2]\)... E se o intervalo for \((0, 2]\), onde \(f\) vai para o infinito em \(x = 0\)?

A resposta é sempre a mesma ideia: **calcule com um limite finito (uma letra) e depois deixe essa letra ir ao problema.**

## Tipo 1: limites de integração infinitos

- Se \(f\) é contínua em \([a, +\infty)\):

$$
\int_a^{+\infty} f(x)\,dx := \lim_{b\to+\infty}\int_a^b f(x)\,dx
$$

- Se \(f\) é contínua em \((-\infty, b]\):

$$
\int_{-\infty}^b f(x)\,dx := \lim_{a\to-\infty}\int_a^b f(x)\,dx
$$

- Se \(f\) é contínua em \((-\infty, +\infty)\), quebre em um ponto \(c\) qualquer:

$$
\int_{-\infty}^{+\infty} f(x)\,dx = \int_{-\infty}^c f(x)\,dx + \int_c^{+\infty} f(x)\,dx
$$

e cada pedaço é um limite separado.

## Tipo 2: assíntotas verticais

- Se \(f\) é contínua em \([a, b)\) e descontínua em \(b\):

$$
\int_a^b f(x)\,dx = \lim_{c\to b^-}\int_a^c f(x)\,dx
$$

- Se \(f\) é contínua em \((a, b]\) e descontínua em \(a\):

$$
\int_a^b f(x)\,dx = \lim_{c\to a^+}\int_c^b f(x)\,dx
$$

- Se \(f\) é descontínua em um ponto interno \(c\), com \(a < c < b\):

$$
\int_a^b f(x)\,dx = \int_a^c f(x)\,dx + \int_c^b f(x)\,dx
$$

desde que **as duas** integrais à direita estejam bem definidas.

## Converge ou diverge?

Em todos os casos:

- se o limite **existe** (é um número real), dizemos que a integral **converge** e o limite é o valor da integral;
- se o limite **não existe** (ou é \(\pm\infty\)), dizemos que a integral **diverge**.

## Receita

1. Identifique o problema: limite infinito ou ponto onde \(f\) explode (e onde fica ele).
2. Se o problema está no meio, quebre a integral nesse ponto.
3. Troque o ponto problemático por uma letra (\(b\) ou \(c\)).
4. Calcule a integral normalmente (as técnicas das páginas anteriores entram aqui).
5. Tome o limite.

## Exemplos: limites infinitos

**Exemplo 1.** \(\displaystyle\int_1^{+\infty}\frac{\ln x}{x^2}\,dx\)

1. Primeiro uma primitiva, por partes: \(u = \ln x\), \(dv = x^{-2}\,dx\), \(du = \dfrac{dx}{x}\), \(v = -\dfrac1x\).

$$
\int\frac{\ln x}{x^2}\,dx = -\frac{\ln x}{x} - \int\left(-\frac1x\right)\frac1x\,dx = -\frac{\ln x}{x} + \int\frac{1}{x^2}\,dx = -\frac{\ln x}{x} - \frac1x + C
$$

2. Troque o infinito por \(b\) e aplique os limites \(1\) e \(b\) (topo menos base):
   - em \(x = b\): \(-\dfrac{\ln b}{b} - \dfrac1b = -\dfrac{\ln b + 1}{b}\)
   - em \(x = 1\): \(-\dfrac{\ln 1}{1} - \dfrac11 = 0 - 1 = -1\)

$$
\lim_{b\to\infty}\left[-\frac{\ln b + 1}{b} - (-1)\right] = \lim_{b\to\infty}\left(-\frac{\ln b + 1}{b} + 1\right)
$$

3. \(\dfrac{\ln b + 1}{b}\) é \(\dfrac\infty\infty\); por L'Hôpital, vira \(\dfrac{1/b}{1} = \dfrac1b \to 0\). Logo o limite é \(0 + 1 = 1\). A integral **converge para \(1\)**.

**Exemplo 2.** \(\displaystyle\int_{-\infty}^{+\infty}\frac{dx}{1+x^2}\)

1. Os dois extremos são infinitos. Quebre em \(c = 0\):

$$
\int_{-\infty}^0\frac{dx}{1+x^2} + \int_0^{+\infty}\frac{dx}{1+x^2} = \lim_{a\to-\infty}\big[\operatorname{arctg}x\big]_a^0 + \lim_{b\to\infty}\big[\operatorname{arctg}x\big]_0^b
$$

2. Calcule: \(\operatorname{arctg}0 = 0\); \(\operatorname{arctg}a \to -\dfrac\pi2\) quando \(a\to-\infty\); \(\operatorname{arctg}b \to \dfrac\pi2\) quando \(b\to\infty\).

$$
\left(0 - \left(-\frac\pi2\right)\right) + \left(\frac\pi2 - 0\right) = \frac\pi2 + \frac\pi2 = \pi
$$

**Converge** para \(\pi\). Uma região infinita, com área finita.

**Exemplo 3 (a integral que decide tudo).** \(\displaystyle\int_1^{+\infty}\frac{dx}{x^p}\), com \(p\) real

- Se \(p = 1\): \(\displaystyle\lim_{b\to\infty}\big[\ln x\big]_1^b = \lim_{b\to\infty}(\ln b - 0) = +\infty\). **Diverge.**
- Se \(p \neq 1\): uma primitiva de \(x^{-p}\) é \(\dfrac{x^{1-p}}{1-p}\). Então

$$
\lim_{b\to\infty}\left[\frac{x^{1-p}}{1-p}\right]_1^b = \lim_{b\to\infty}\frac{b^{1-p} - 1}{1-p}
$$

  - Se \(p > 1\), o expoente \(1-p\) é negativo, \(b^{1-p}\to0\), e o valor é \(\dfrac{0-1}{1-p} = \dfrac{1}{p-1}\). **Converge.**
  - Se \(p < 1\), o expoente \(1-p\) é positivo, \(b^{1-p}\to\infty\). **Diverge.**

$$
\int_1^{+\infty}\frac{dx}{x^p}\ \begin{cases}\text{converge para } \dfrac{1}{p-1}, & p > 1\\[2mm] \text{diverge}, & p \le 1\end{cases}
$$

> [!IMPORTANT]
> Guarde este resultado. É a "régua" com a qual a página de *Testes de comparação* compara tudo o resto. Note que \(\dfrac1x\) diverge e \(\dfrac1{x^2}\) converge: o expoente **1** é a fronteira.

## Exemplos: assíntotas verticais

**Exemplo 4.** \(\displaystyle\int_0^2\frac{dx}{\sqrt x}\)

1. A função explode em \(x = 0\), o extremo esquerdo. Troque \(0\) por \(c\), com \(c\to0^+\).
2. Primitiva: \(\int x^{-1/2}dx = \dfrac{x^{1/2}}{1/2} = 2\sqrt x\).

$$
\lim_{c\to0^+}\Big[2\sqrt x\Big]_c^2 = \lim_{c\to0^+}\big(2\sqrt2 - 2\sqrt c\big) = 2\sqrt2 - 0 = 2\sqrt2
$$

**Converge** para \(2\sqrt2\).

**Exemplo 5.** \(\displaystyle\int_0^1\frac{dx}{1-x}\)

1. A função explode em \(x = 1\), o extremo direito. Troque \(1\) por \(c\), com \(c\to1^-\).
2. Primitiva: com \(u = 1-x\), \(du = -dx\): \(\int\dfrac{dx}{1-x} = -\ln\lvert 1-x\rvert\).

$$
\lim_{c\to1^-}\Big[-\ln\lvert1-x\rvert\Big]_0^c = \lim_{c\to1^-}\big(-\ln(1-c) + \ln 1\big) = \lim_{c\to1^-}\big(-\ln(1-c)\big) = +\infty
$$

pois \(1-c\to0^+\) e \(\ln\to-\infty\). **Diverge.**

**Exemplo 6 (descontinuidade no meio).** \(\displaystyle\int_0^3\frac{dx}{(x-1)^{2/3}}\)

1. A função explode em \(x = 1\), que está dentro de \([0, 3]\). **Quebre** nesse ponto:

$$
\int_0^1\frac{dx}{(x-1)^{2/3}} + \int_1^3\frac{dx}{(x-1)^{2/3}}
$$

2. Primitiva: \(\int(x-1)^{-2/3}dx = \dfrac{(x-1)^{1/3}}{1/3} = 3(x-1)^{1/3}\).
3. Primeira parte: em \(c\to1^-\), \(3(c-1)^{1/3}\to0\); em \(0\), \(3(-1)^{1/3} = -3\).

$$
\lim_{c\to1^-}\Big[3(x-1)^{1/3}\Big]_0^c = 0 - (-3) = 3
$$

4. Segunda parte: em \(3\), \(3\cdot2^{1/3}\); em \(c\to1^+\), \(0\).

$$
\lim_{c\to1^+}\Big[3(x-1)^{1/3}\Big]_c^3 = 3\sqrt[3]{2} - 0 = 3\sqrt[3]{2}
$$

As duas convergem, então a integral **converge** para \(3 + 3\sqrt[3]{2}\).

> [!WARNING]
> Esquecer a descontinuidade no meio é o erro mais perigoso. Considere \(\displaystyle\int_{-1}^1\frac{dx}{x^2}\). Se você aplicar \(\big[-\tfrac1x\big]_{-1}^1\) às cegas, obtém \(-1 - 1 = -2\), um número *negativo* para a integral de uma função positiva! O certo é quebrar em \(x = 0\): cada metade diverge, então a integral **diverge**.

Em geral, para \(\displaystyle\int_0^1\frac{dx}{x^p}\): **converge** se \(p < 1\) e **diverge** se \(p \ge 1\). É o espelho do Exemplo 3.

## E o que faz a integral não convergir?

Em termos de área: ou a função **não cai rápido o bastante** quando \(x\to\infty\) (como \(\frac1x\)), ou ela **explode rápido demais** perto da assíntota (como \(\frac{1}{1-x}\)). Quando ela cai ou explode "devagar", a área acumulada é finita.

## Exercícios propostos

**Exercício 1.** Calcule \(\displaystyle\int_0^{+\infty}e^{-x}\,dx\).

{{< details title="Gabarito" >}}
1. Primitiva: \(-e^{-x}\).
2. Aplique \(0\) e \(b\): em \(b\), \(-e^{-b}\); em \(0\), \(-e^{0} = -1\).

$$
\lim_{b\to\infty}\Big[-e^{-x}\Big]_0^b = \lim_{b\to\infty}\big(-e^{-b} + 1\big) = 0 + 1 = 1
$$

Converge para \(1\).
{{< /details >}}

**Exercício 2.** A integral \(\displaystyle\int_1^{+\infty}\frac{dx}{\sqrt x}\) converge?

{{< details title="Gabarito" >}}
É o Exemplo 3 com \(p = \tfrac12 < 1\). Diretamente: primitiva \(2\sqrt x\); em \(b\): \(2\sqrt b\); em \(1\): \(2\). \(\lim_{b\to\infty}(2\sqrt b - 2) = +\infty\). **Diverge.**
{{< /details >}}

**Exercício 3.** Calcule \(\displaystyle\int_0^1\ln x\,dx\).

{{< details title="Gabarito" >}}
1. A função explode em \(x = 0\). Por partes, \(\int\ln x\,dx = x\ln x - x\) (Exemplo 5 de *Integração por partes*).
2. Em \(x = 1\): \(1\cdot\ln1 - 1 = -1\). Em \(x = c\): \(c\ln c - c\).

$$
\lim_{c\to0^+}\Big[x\ln x - x\Big]_c^1 = -1 - \lim_{c\to0^+}(c\ln c - c)
$$

3. \(c\ln c = \dfrac{\ln c}{1/c}\) é \(\dfrac{-\infty}{\infty}\); L'Hôpital: \(\dfrac{1/c}{-1/c^2} = -c \to 0\). E \(-c\to0\). Logo o limite vale \(-1 - 0 = -1\). Converge para \(-1\).
{{< /details >}}

**Exercício 4.** Calcule \(\displaystyle\int_{-\infty}^0 e^{x}\,dx\).

{{< details title="Gabarito" >}}
Primitiva \(e^x\); em \(0\): \(1\); em \(a\): \(e^a\to0\) quando \(a\to-\infty\).

$$
\lim_{a\to-\infty}\Big[e^x\Big]_a^0 = 1 - \lim_{a\to-\infty}e^a = 1 - 0 = 1
$$
{{< /details >}}

**Exercício 5.** Estude a convergência de \(\displaystyle\int_2^{+\infty}\frac{dx}{x\ln x}\).

{{< details title="Gabarito" >}}
1. Com \(u = \ln x\), \(du = \dfrac{dx}{x}\): \(\int\dfrac{du}{u} = \ln\lvert u\rvert\). Uma primitiva é \(\ln\lvert\ln x\rvert\).
2. Aplique: em \(b\): \(\ln(\ln b)\); em \(2\): \(\ln(\ln2)\), um número fixo.

$$
\lim_{b\to\infty}\Big[\ln(\ln x)\Big]_2^b = \lim_{b\to\infty}\big(\ln(\ln b) - \ln(\ln 2)\big) = +\infty
$$

**Diverge**, apesar de \(\frac{1}{x\ln x}\) cair um pouco mais rápido que \(\frac1x\).
{{< /details >}}
