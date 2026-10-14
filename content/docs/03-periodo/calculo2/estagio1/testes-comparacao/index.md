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

e a exponencial \(\displaystyle\int_a^{+\infty}e^{-kx}\,dx\) com \(k > 0\), que sempre converge.

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

Não há primitiva elementar. Compare: para \(x \ge 1\) vale \(x^2 \ge x\), então \(-x^2 \le -x\) e

$$
0 < e^{-x^2} \le e^{-x}
$$

E \(\displaystyle\int_1^{+\infty}e^{-x}\,dx = e^{-1}\) converge. Pelo teste da comparação, \(\displaystyle\int_1^{+\infty}e^{-x^2}\,dx\) **converge**.

**Exemplo 2.** \(\displaystyle\int_1^{+\infty}\frac{\operatorname{sen}^2 x}{x^2}\,dx\)

Como \(0 \le \operatorname{sen}^2 x \le 1\):

$$
0 \le \frac{\operatorname{sen}^2 x}{x^2} \le \frac{1}{x^2}
$$

e \(\displaystyle\int_1^{+\infty}\frac{dx}{x^2}\) converge (\(p = 2 > 1\)). Logo a integral **converge**.

> [!NOTE]
> Aqui o limite \(\frac{f}{g} = \operatorname{sen}^2 x\) nem existe, então só a comparação direta funciona. Por isso é bom ter os dois testes na manga.

**Exemplo 3.** \(\displaystyle\int_1^{+\infty}\frac{1}{1+x^2}\,dx\)

Compare com \(g(x) = \dfrac{1}{x^2}\):

$$
\lim_{x\to\infty}\frac{1/(1+x^2)}{1/x^2} = \lim_{x\to\infty}\frac{x^2}{1+x^2} = 1
$$

Como \(0 < 1 < \infty\) e \(\int_1^\infty x^{-2}\,dx\) converge, a integral **converge**.

(Como sabemos a primitiva, dá para conferir: o valor é \(\frac\pi2 - \frac\pi4 = \frac\pi4\). O teste, porém, só garante a convergência, nunca o valor.)

**Exemplo 4.** \(\displaystyle\int_1^{+\infty}\frac{1-e^{-x}}{x}\,dx\)

Para \(x\) grande, \(e^{-x}\) é minúsculo, então o numerador tende a \(1\) e a função se parece com \(\dfrac1x\). Compare com \(g(x) = \dfrac1x\):

$$
\lim_{x\to\infty}\frac{(1-e^{-x})/x}{1/x} = \lim_{x\to\infty}\big(1 - e^{-x}\big) = 1
$$

Como \(\int_1^\infty\frac{dx}{x}\) **diverge**, a integral dada também **diverge**.

## Quadro-resumo

| Se \(f\) se parece com... | Conclusão |
| --- | --- |
| \(\dfrac{1}{x^p}\) com \(p > 1\) | converge |
| \(\dfrac{1}{x^p}\) com \(p \le 1\) | diverge |
| \(e^{-kx}\) com \(k > 0\) | converge |
| \(\dfrac{\ln x}{x^p}\) com \(p > 1\) | converge (o log perde para qualquer potência) |

## Exercícios propostos

**Exercício 1.** Estude a convergência de \(\displaystyle\int_1^{+\infty}\frac{x+1}{x^3+x}\,dx\).

{{< details title="Gabarito" >}}
Para \(x\) grande, \(\dfrac{x+1}{x^3+x}\) se parece com \(\dfrac{1}{x^2}\). Comparando no limite:

$$
\lim_{x\to\infty}\frac{(x+1)/(x^3+x)}{1/x^2} = \lim_{x\to\infty}\frac{x^3+x^2}{x^3+x} = 1
$$

Como \(\int_1^\infty x^{-2}\,dx\) converge, a integral **converge**.
{{< /details >}}

**Exercício 2.** Estude a convergência de \(\displaystyle\int_1^{+\infty}\frac{dx}{\sqrt x + 1}\).

{{< details title="Gabarito" >}}
Para \(x\) grande, se parece com \(\dfrac{1}{\sqrt x}\) (\(p = \tfrac12\)). No limite:

$$
\lim_{x\to\infty}\frac{1/(\sqrt x+1)}{1/\sqrt x} = \lim_{x\to\infty}\frac{\sqrt x}{\sqrt x+1} = 1
$$

Como \(\int_1^\infty x^{-1/2}\,dx\) diverge, a integral **diverge**.
{{< /details >}}

**Exercício 3.** Estude a convergência de \(\displaystyle\int_1^{+\infty}\frac{\cos^2 x}{x^2+1}\,dx\).

{{< details title="Gabarito" >}}
Como \(0 \le \cos^2 x \le 1\) e \(x^2 + 1 > x^2\):

$$
0 \le \frac{\cos^2 x}{x^2+1} \le \frac{1}{x^2+1} \le \frac{1}{x^2}
$$

e \(\int_1^\infty x^{-2}\,dx\) converge. Logo a integral **converge** (comparação direta).
{{< /details >}}

**Exercício 4.** Estude a convergência de \(\displaystyle\int_e^{+\infty}\frac{\ln x}{x}\,dx\).

{{< details title="Gabarito" >}}
Para \(x \ge e\), \(\ln x \ge 1\), então

$$
\frac{\ln x}{x} \ge \frac1x \ge 0
$$

e \(\int_e^\infty\frac{dx}{x}\) diverge. Pela comparação (menor diverge, maior diverge), a integral **diverge**.
{{< /details >}}
