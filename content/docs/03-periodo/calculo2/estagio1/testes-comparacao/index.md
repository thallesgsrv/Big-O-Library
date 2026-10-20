---
title: Testes de comparação
weight: 6
description: Descobrir se uma integral imprópria converge sem calcular a primitiva.
autores:
  - thallesgsrv
date: 2026-10-14
---

## Como funciona?

Nem toda integral imprópria tem primitiva que a gente consiga escrever. Um exemplo famoso: \(\int e^{-x^2}\,dx\). Mas muitas vezes não precisamos do valor, só da resposta a uma pergunta: **converge ou diverge?** Os testes de comparação respondem isso comparando a integral com outra que já conhecemos.

## Sobre

A intuição é de **sanduíche de áreas**:

- Se uma função está *abaixo* de outra, e a área da de cima é finita, a área da de baixo também é finita.
- Se a de baixo tem área infinita, a de cima tem também.

As integrais de referência (as "réguas") vêm da página anterior:

$$
\int_1^{+\infty}\frac{dx}{x^p}\ \ \text{converge se } p > 1,\ \text{diverge se } p \le 1
$$

e a exponencial \(\displaystyle\int_a^{+\infty}e^{-kx}\,dx\) com \(k > 0\), que sempre converge (primitiva \(-\tfrac1k e^{-kx}\), que vai a \(0\)).

## Teste da comparação

Sejam \(f\) e \(g\) contínuas em \([a, +\infty)\) com

$$
0 \le f(x) \le g(x) \quad\text{para todo } x \ge a
$$

Então:

- se \(\displaystyle\int_a^{+\infty} g\) **converge**, então \(\displaystyle\int_a^{+\infty} f\) **converge** (maior converge, menor converge);
- se \(\displaystyle\int_a^{+\infty} f\) **diverge**, então \(\displaystyle\int_a^{+\infty} g\) **diverge** (menor diverge, maior diverge).

> [!WARNING]
> As outras duas direções **não** dão conclusão. Se a maior diverge, a menor pode ir para qualquer lado. Se a menor converge, a maior pode ir para qualquer lado. E a condição \(0 \le f\) é obrigatória.

## Comportamento no infinito

Para escolher a comparação certa, ajuda saber quem "vence" quando \(x \to \infty\) (por L'Hôpital):

$$
\lim_{x\to\infty}\frac{\text{logaritmo}}{\text{potência de }x} = 0 \qquad\qquad \lim_{x\to\infty}\frac{\text{potência de }x}{\text{exponencial}} = 0
$$

Em ordem de crescimento: **logaritmo < potência < exponencial**.

## Teste da comparação no limite

Sejam \(f\) e \(g\) contínuas e **positivas** em \([a, +\infty)\). Se

$$
\lim_{x\to+\infty}\frac{f(x)}{g(x)} = L, \qquad 0 < L < +\infty
$$

então \(\displaystyle\int_a^{+\infty}f\) e \(\displaystyle\int_a^{+\infty}g\) **ambas convergem ou ambas divergem**.

Em palavras: se as duas funções "se parecem" no infinito (razão tendendo a um número positivo), elas têm o mesmo destino.

## Receita

1. **Olhe o que manda no infinito.** Em frações de polinômios, ignore os termos de menor grau: \(\dfrac{x+1}{x^3+x}\) se comporta como \(\dfrac{x}{x^3} = \dfrac1{x^2}\).
2. Escolha uma função \(g\) conhecida, quase sempre \(\dfrac1{x^p}\) ou \(e^{-kx}\).
3. Escolha o teste:
   - **Desigualdade fácil de provar?** Comparação direta (precisa de \(0 \le f \le g\)).
   - **Funções parecidas?** Comparação no limite (calcule \(f/g\)).
4. Conclua usando o resultado da \(g\).

## Exemplos

**Exemplo 1.** \(\displaystyle\int_1^{+\infty}e^{-x^2}\,dx\)

Passo 1. Não há primitiva elementar, então vamos comparar.
Passo 2. Para \(x \ge 1\) vale \(x^2 \ge x\) (multiplique \(x\ge1\) por \(x>0\)). Multiplicando por \(-1\), a desigualdade inverte: \(-x^2 \le -x\). Como a exponencial é crescente:

$$
0 < e^{-x^2} \le e^{-x}
$$

Passo 3. \(\displaystyle\int_1^{+\infty}e^{-x}\,dx = \lim_{b\to\infty}\big[-e^{-x}\big]_1^b = 0 + e^{-1} = e^{-1}\) converge. Pelo teste da comparação (maior converge, menor converge), \(\displaystyle\int_1^{+\infty}e^{-x^2}\,dx\) **converge**.

**Exemplo 2.** \(\displaystyle\int_1^{+\infty}\frac{\operatorname{sen}^2 x}{x^2}\,dx\)

Passo 1. Como \(0 \le \operatorname{sen}^2 x \le 1\), dividindo por \(x^2>0\):

$$
0 \le \frac{\operatorname{sen}^2 x}{x^2} \le \frac{1}{x^2}
$$

Passo 2. \(\displaystyle\int_1^{+\infty}\frac{dx}{x^2}\) converge (\(p = 2 > 1\)). Logo a integral **converge**.

**Exemplo 3.** \(\displaystyle\int_1^{+\infty}\frac{1}{1+x^2}\,dx\)

Passo 1. Compare com \(g(x) = \dfrac{1}{x^2}\):

$$
\lim_{x\to\infty}\frac{1/(1+x^2)}{1/x^2} = \lim_{x\to\infty}\frac{x^2}{1+x^2} = \lim_{x\to\infty}\frac{1}{\frac1{x^2}+1} = 1
$$

Passo 2. Como \(0 < 1 < \infty\) e \(\int_1^\infty x^{-2}\,dx\) converge, a integral **converge**.

**Exemplo 4.** \(\displaystyle\int_1^{+\infty}\frac{1-e^{-x}}{x}\,dx\)

Passo 1. Para \(x\) grande, \(e^{-x}\) é minúsculo, então o numerador tende a \(1\) e a função se parece com \(\dfrac1x\). Compare com \(g(x) = \dfrac1x\):

$$
\lim_{x\to\infty}\frac{(1-e^{-x})/x}{1/x} = \lim_{x\to\infty}\big(1 - e^{-x}\big) = 1 - 0 = 1
$$

Passo 2. Como \(\int_1^\infty\frac{dx}{x}\) **diverge**, a integral dada também **diverge**.

## Extra 1: comparação perto de uma assíntota vertical

Os testes valem também para integrais do **Tipo 2** (função que explode em um extremo). Se \(f,g\) são contínuas em \((a,b]\), com \(0\le f\le g\) e a singularidade em \(a\):

- se \(\int_a^b g\) converge, então \(\int_a^b f\) converge;
- se \(\int_a^b f\) diverge, então \(\int_a^b g\) diverge.

A "régua" aqui é a integral que você já conhece:

$$
\int_0^1\frac{dx}{x^p}\ \text{converge}\iff p<1\qquad(\text{ao contrário do Tipo 1, onde convergia para } p>1)
$$

> [!TIP]
> **Memória:** perto de \(0\), \(x^{-p}\) com \(p\) pequeno é "fraco" e integra; no infinito, \(x^{-p}\) precisa de \(p\) grande. Os dois lados da fronteira \(p=1\) trocam de papel.

**Exemplo A.** \(\displaystyle\int_0^1\frac{e^{-x}}{\sqrt x}\,dx\). Em \([0,1]\), \(e^{-x}\le1\), logo \(\dfrac{e^{-x}}{\sqrt x}\le\dfrac1{\sqrt x}\), e \(\int_0^1x^{-1/2}dx\) converge (\(p=\tfrac12<1\)). **Converge.**

**Exemplo B.** \(\displaystyle\int_0^1\frac{dx}{x+x^2}\). Em \((0,1]\), \(x^2\le x\), então \(x+x^2\le2x\). Invertendo (tudo positivo), \(\dfrac1{x+x^2}\ge\dfrac1{2x}\), e \(\int_0^1\frac{dx}{2x}\) diverge. **Diverge.**

**Exemplo C (limite).** \(\displaystyle\int_0^1\frac{\operatorname{sen}x}{x^{3/2}}\,dx\). Comparando com \(g(x)=x^{-1/2}\):

$$
\lim_{x\to0^+}\frac{\operatorname{sen}x/x^{3/2}}{x^{-1/2}}=\lim_{x\to0^+}\frac{\operatorname{sen}x}{x^{3/2}}\cdot x^{1/2}=\lim_{x\to0^+}\frac{\operatorname{sen}x}{x}=1\in(0,\infty)
$$

Como \(\int_0^1x^{-1/2}dx\) converge, a nossa também **converge**.

## Extra 2: integrando que troca de sinal (convergência absoluta)

Os testes acima exigem \(f\ge0\). Se \(f\) oscila (muda de sinal), use:

> **Se \(\int\lvert f\rvert\) converge, então \(\int f\) converge.**

(A recíproca é falsa.) Procedimento: limite \(\lvert f\rvert\) por algo conhecido e use comparação.

**Exemplo D.** \(\displaystyle\int_1^{\infty}\frac{\operatorname{sen}x}{x^2}\,dx\). Como \(\lvert\operatorname{sen}x\rvert\le1\), \(\left\lvert\dfrac{\operatorname{sen}x}{x^2}\right\rvert\le\dfrac1{x^2}\), e \(\int_1^\infty x^{-2}dx\) converge. Logo a integral original **converge** (absolutamente).

## Exercícios propostos

**Exercício 1.** Estude a convergência de \(\displaystyle\int_1^{+\infty}\frac{x+1}{x^3+x}\,dx\).

{{< details title="Gabarito" >}}
Passo 1. Para \(x\) grande, \(\dfrac{x+1}{x^3+x}\) se parece com \(\dfrac{x}{x^3} = \dfrac{1}{x^2}\).
Passo 2. Comparando no limite:

$$
\lim_{x\to\infty}\frac{(x+1)/(x^3+x)}{1/x^2} = \lim_{x\to\infty}\frac{x^2(x+1)}{x^3+x} = \lim_{x\to\infty}\frac{x^3+x^2}{x^3+x} = \lim_{x\to\infty}\frac{1+\frac1x}{1+\frac1{x^2}} = 1
$$

Passo 3. Como \(\int_1^\infty x^{-2}\,dx\) converge, a integral **converge**.
{{< /details >}}

**Exercício 2.** Estude a convergência de \(\displaystyle\int_1^{+\infty}\frac{dx}{\sqrt x + 1}\).

{{< details title="Gabarito" >}}
Passo 1. Para \(x\) grande, se parece com \(\dfrac{1}{\sqrt x}\) (\(p = \tfrac12\)).
Passo 2. No limite:

$$
\lim_{x\to\infty}\frac{1/(\sqrt x+1)}{1/\sqrt x} = \lim_{x\to\infty}\frac{\sqrt x}{\sqrt x+1} = \lim_{x\to\infty}\frac{1}{1+\frac{1}{\sqrt x}} = 1
$$

Passo 3. Como \(\int_1^\infty x^{-1/2}\,dx\) diverge, a integral **diverge**.
{{< /details >}}

**Exercício 3.** Estude a convergência de \(\displaystyle\int_1^{+\infty}\frac{\cos^2 x}{x^2+1}\,dx\).

{{< details title="Gabarito" >}}
Passo 1. Como \(0 \le \cos^2 x \le 1\) e \(x^2 + 1 > x^2\) (logo \(\frac{1}{x^2+1}<\frac1{x^2}\)):

$$
0 \le \frac{\cos^2 x}{x^2+1} \le \frac{1}{x^2+1} \le \frac{1}{x^2}
$$

Passo 2. e \(\int_1^\infty x^{-2}\,dx\) converge. Logo a integral **converge** (comparação direta).
{{< /details >}}

**Exercício 4.** Estude a convergência de \(\displaystyle\int_e^{+\infty}\frac{\ln x}{x}\,dx\).

{{< details title="Gabarito" >}}
Passo 1. Para \(x \ge e\), \(\ln x \ge \ln e = 1\), então

$$
\frac{\ln x}{x} \ge \frac1x \ge 0
$$

Passo 2. e \(\int_e^\infty\frac{dx}{x}\) diverge. Pela comparação (menor diverge, maior diverge), a integral **diverge**.
{{< /details >}}

**Exercício extra 1.** Estude \(\displaystyle\int_0^1\frac{dx}{\sqrt{x+x^3}}\).

{{< details title="Gabarito" >}}
Passo 1. Como \(x+x^3\ge x\), \(\sqrt{x+x^3}\ge\sqrt x\), e invertendo, \(\dfrac1{\sqrt{x+x^3}}\le\dfrac1{\sqrt x}\).
Passo 2. \(\int_0^1x^{-1/2}dx\) converge. **Converge.**
{{< /details >}}

**Exercício extra 2.** Estude \(\displaystyle\int_1^\infty\frac{\cos x}{x^{3/2}}\,dx\).

{{< details title="Gabarito" >}}
Passo 1. \(\left\lvert\dfrac{\cos x}{x^{3/2}}\right\rvert\le x^{-3/2}\).
Passo 2. e \(\int_1^\infty x^{-3/2}dx\) converge (\(p=\tfrac32>1\)). Converge absolutamente, logo converge.
{{< /details >}}
