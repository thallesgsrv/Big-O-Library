---
title: Substituição trigonométrica
weight: 3
description: Como fazer raízes de x² ± a² e a² − x² sumirem usando triângulos retângulos.
autores:
  - thallesgsrv
date: 2026-10-14
---

## Como funciona?

Algumas integrais têm raízes que travam qualquer substituição comum, como \(\sqrt{4+x^2}\) ou \(\sqrt{1-9x^2}\). A substituição trigonométrica resolve isso com um truque: **trocar \(x\) por uma função trigonométrica que faz a raiz desaparecer**.

## Sobre

A técnica é para expressões do tipo \(x^2 + a^2\), \(a^2 - x^2\) ou \(x^2 - a^2\) (com \(a > 0\) constante), geralmente dentro de uma raiz.

A pista visual vem do **teorema de Pitágoras**. Cada uma dessas expressões aparece como um lado de um triângulo retângulo:

| Expressão | Triângulo | Hipotenusa | Cateto 1 | Cateto 2 |
| --- | --- | --- | --- | --- |
| \(\sqrt{x^2 + a^2}\) | \(a^2 + x^2 = (\ldots)^2\) | \(\sqrt{x^2+a^2}\) | \(a\) | \(x\) |
| \(\sqrt{a^2 - x^2}\) | \(x^2 + (\ldots)^2 = a^2\) | \(a\) | \(x\) | \(\sqrt{a^2-x^2}\) |
| \(\sqrt{x^2 - a^2}\) | \((\ldots)^2 + a^2 = x^2\) | \(x\) | \(a\) | \(\sqrt{x^2-a^2}\) |

Uma pergunta que ajuda: nos três casos, quem é o maior lado? É **sempre a hipotenusa**. Isso diz quem deve ficar "no meio" da substituição.

## As três substituições

**Caso 1: \(x^2 + a^2\). Use \(x = a\operatorname{tg}\theta\).**

$$
\sqrt{x^2 + a^2} = \sqrt{a^2\operatorname{tg}^2\theta + a^2} = a\sqrt{\operatorname{tg}^2\theta + 1} = a\sec\theta
$$

com \(dx = a\sec^2\theta\,d\theta\). Triângulo: cateto oposto \(x\), adjacente \(a\), hipotenusa \(\sqrt{x^2+a^2}\).

**Caso 2: \(a^2 - x^2\). Use \(x = a\operatorname{sen}\theta\).**

$$
\sqrt{a^2 - x^2} = \sqrt{a^2 - a^2\operatorname{sen}^2\theta} = a\sqrt{1 - \operatorname{sen}^2\theta} = a\cos\theta
$$

com \(dx = a\cos\theta\,d\theta\). Triângulo: oposto \(x\), hipotenusa \(a\), adjacente \(\sqrt{a^2-x^2}\).

**Caso 3: \(x^2 - a^2\). Use \(x = a\sec\theta\).**

$$
\sqrt{x^2 - a^2} = \sqrt{a^2\sec^2\theta - a^2} = a\sqrt{\sec^2\theta - 1} = a\operatorname{tg}\theta
$$

com \(dx = a\sec\theta\operatorname{tg}\theta\,d\theta\). Triângulo: hipotenusa \(x\), cateto \(a\) junto ao ângulo, oposto \(\sqrt{x^2-a^2}\).

> [!TIP]
> Regra de bolso (do "alerta de gatinho" do material do professor):
> \((\text{variável})^2 + (\text{constante})^2 \Rightarrow \text{variável} = \text{constante}\cdot\operatorname{tg}\theta\)
> \((\text{constante})^2 - (\text{variável})^2 \Rightarrow \text{variável} = \text{constante}\cdot\operatorname{sen}\theta\)
> \((\text{variável})^2 - (\text{constante})^2 \Rightarrow \text{variável} = \text{constante}\cdot\sec\theta\)

## Receita

1. Identifique o caso e faça a substituição \(x = a\,(\ldots)\). Calcule também \(dx\).
2. Troque tudo na integral. A raiz vira uma função trigonométrica e a integral fica só em \(\theta\).
3. Resolva a integral em \(\theta\) (aqui entram as *Integrais trigonométricas*).
4. **Volte para \(x\)** desenhando o triângulo retângulo: marque \(\theta\), preencha os lados com a substituição e leia a resposta.

> [!WARNING]
> O passo 4 é o que mais cai em prova e o que mais gente esquece. Resposta em \(\theta\) para uma integral em \(x\) vale zero.

## Exemplos

**Exemplo 1.** \(\displaystyle\int\frac{dx}{\sqrt{4+x^2}}\)

Caso 1 com \(a = 2\): \(x = 2\operatorname{tg}\theta\), \(dx = 2\sec^2\theta\,d\theta\), \(\sqrt{4+x^2} = 2\sec\theta\).

$$
\int\frac{2\sec^2\theta}{2\sec\theta}\,d\theta = \int\sec\theta\,d\theta = \ln\lvert\sec\theta + \operatorname{tg}\theta\rvert + C
$$

Voltando ao triângulo (oposto \(x\), adjacente \(2\), hipotenusa \(\sqrt{4+x^2}\)): \(\operatorname{tg}\theta = \dfrac{x}{2}\) e \(\sec\theta = \dfrac{\sqrt{4+x^2}}{2}\).

$$
\int\frac{dx}{\sqrt{4+x^2}} = \ln\left\lvert\frac{\sqrt{4+x^2} + x}{2}\right\rvert + C
$$

(Como \(\ln\tfrac12\) é constante, também vale escrever \(\ln\big(x + \sqrt{4+x^2}\big) + C\).)

**Exemplo 2.** \(\displaystyle\int\frac{x^3}{x^2+1}\,dx\)

Aqui aparece \(x^2 + 1\) (sem raiz): \(x = \operatorname{tg}\theta\), \(dx = \sec^2\theta\,d\theta\), \(x^2+1 = \sec^2\theta\).

$$
\int\frac{\operatorname{tg}^3\theta\,\sec^2\theta}{\sec^2\theta}\,d\theta = \int\operatorname{tg}^3\theta\,d\theta = \int\operatorname{tg}\theta(\sec^2\theta - 1)\,d\theta = \frac{\operatorname{tg}^2\theta}{2} + \ln\lvert\cos\theta\rvert + C
$$

No triângulo (oposto \(x\), adjacente \(1\), hipotenusa \(\sqrt{x^2+1}\)): \(\operatorname{tg}\theta = x\) e \(\cos\theta = \dfrac{1}{\sqrt{x^2+1}}\).

$$
\int\frac{x^3}{x^2+1}\,dx = \frac{x^2}{2} - \tfrac12\ln(x^2+1) + C
$$

> [!NOTE]
> Este exemplo também sai sem trigonometria: divida \(x^3\) por \(x^2+1\) para obter \(x - \dfrac{x}{x^2+1}\). Sempre vale perguntar se existe um caminho mais curto.

**Exemplo 3.** \(\displaystyle\int\frac{dx}{\sqrt{1-9x^2}}\)

Reescreva \(1 - 9x^2 = 1 - (3x)^2\). Caso 2: \(3x = \operatorname{sen}\theta\), isto é, \(x = \tfrac13\operatorname{sen}\theta\), \(dx = \tfrac13\cos\theta\,d\theta\), \(\sqrt{1-9x^2} = \cos\theta\).

$$
\int\frac{\tfrac13\cos\theta}{\cos\theta}\,d\theta = \frac{\theta}{3} + C = \frac{\operatorname{arcsen}(3x)}{3} + C
$$

**Exemplo 4.** \(\displaystyle\int\frac{\ln x}{x\sqrt{1-(\ln x)^2}}\,dx\)

Esta parece difícil, mas é uma pegadinha: faça primeiro \(u = \ln x\), \(du = \dfrac{dx}{x}\).

$$
\int\frac{u}{\sqrt{1-u^2}}\,du
$$

Agora \(w = 1 - u^2\), \(dw = -2u\,du\):

$$
-\tfrac12\int w^{-1/2}\,dw = -\sqrt{w} + C \quad\Rightarrow\quad -\sqrt{1-(\ln x)^2} + C
$$

> [!NOTE]
> Nem toda integral com \(\sqrt{a^2 - u^2}\) precisa de substituição trigonométrica. Se o numerador tem o "\(u\,du\)" da derivada de dentro da raiz, a substituição simples resolve.

**Exemplo 5.** \(\displaystyle\int\frac{dx}{\sqrt{25x^2-4}}\)

\(25x^2 - 4 = (5x)^2 - 2^2\). Caso 3: \(5x = 2\sec\theta\), \(dx = \tfrac25\sec\theta\operatorname{tg}\theta\,d\theta\), \(\sqrt{25x^2-4} = 2\operatorname{tg}\theta\).

$$
\int\frac{\tfrac25\sec\theta\operatorname{tg}\theta}{2\operatorname{tg}\theta}\,d\theta = \frac15\int\sec\theta\,d\theta = \frac15\ln\lvert\sec\theta + \operatorname{tg}\theta\rvert + C
$$

Triângulo: hipotenusa \(5x\), cateto \(2\), oposto \(\sqrt{25x^2-4}\). Então \(\sec\theta = \dfrac{5x}{2}\) e \(\operatorname{tg}\theta = \dfrac{\sqrt{25x^2-4}}{2}\):

$$
\int\frac{dx}{\sqrt{25x^2-4}} = \frac15\ln\left\lvert\frac{5x + \sqrt{25x^2-4}}{2}\right\rvert + C
$$

**Exemplo 6.** \(\displaystyle\int\frac{dx}{\sqrt{x^2-4x+3}}\)

O polinômio não está na forma pronta. **Complete o quadrado**:

$$
x^2 - 4x + 3 = (x-2)^2 - 1
$$

Com \(u = x - 2\) (\(du = dx\)), temos \(\displaystyle\int\frac{du}{\sqrt{u^2-1}}\). Caso 3 com \(a = 1\): \(u = \sec\theta\), que leva (como no Exemplo 5) a \(\ln\lvert\sec\theta + \operatorname{tg}\theta\rvert\), com \(\sec\theta = u\) e \(\operatorname{tg}\theta = \sqrt{u^2-1}\):

$$
\int\frac{dx}{\sqrt{x^2-4x+3}} = \ln\left\lvert x - 2 + \sqrt{x^2-4x+3}\right\rvert + C
$$

> [!TIP]
> Quando o radicando é um trinômio \(x^2 + bx + c\), complete o quadrado antes de qualquer coisa. Ele sempre recai num dos três casos.

## Exercícios propostos

**Exercício 1.** Calcule \(\displaystyle\int\frac{dx}{x^2+2x+5}\).

{{< details title="Gabarito" >}}
Complete o quadrado: \(x^2+2x+5 = (x+1)^2 + 4\). Com \(x + 1 = 2\operatorname{tg}\theta\), \(dx = 2\sec^2\theta\,d\theta\):

$$
\int\frac{2\sec^2\theta}{4\sec^2\theta}\,d\theta = \frac{\theta}{2} + C = \frac12\operatorname{arctg}\!\left(\frac{x+1}{2}\right) + C
$$
{{< /details >}}

**Exercício 2.** Calcule \(\displaystyle\int\sqrt{9-x^2}\,dx\).

{{< details title="Gabarito" >}}
Caso 2: \(x = 3\operatorname{sen}\theta\), \(dx = 3\cos\theta\,d\theta\), \(\sqrt{9-x^2} = 3\cos\theta\).

$$
\int 9\cos^2\theta\,d\theta = \frac92\big(\theta + \operatorname{sen}\theta\cos\theta\big) + C
$$

Triângulo: \(\operatorname{sen}\theta = \dfrac{x}{3}\), \(\cos\theta = \dfrac{\sqrt{9-x^2}}{3}\).

$$
\frac92\operatorname{arcsen}\frac{x}{3} + \frac{x}{2}\sqrt{9-x^2} + C
$$

(Dica: é a área de meio círculo de raio 3 escondida na integral.)
{{< /details >}}

**Exercício 3.** Calcule \(\displaystyle\int\frac{dx}{x^2\sqrt{x^2+4}}\).

{{< details title="Gabarito" >}}
Caso 1: \(x = 2\operatorname{tg}\theta\), \(dx = 2\sec^2\theta\,d\theta\), \(\sqrt{x^2+4} = 2\sec\theta\).

$$
\int\frac{2\sec^2\theta}{4\operatorname{tg}^2\theta\cdot 2\sec\theta}\,d\theta = \frac14\int\frac{\cos\theta}{\operatorname{sen}^2\theta}\,d\theta = -\frac{1}{4\operatorname{sen}\theta} + C
$$

No triângulo, \(\operatorname{sen}\theta = \dfrac{x}{\sqrt{x^2+4}}\):

$$
-\frac{\sqrt{x^2+4}}{4x} + C
$$
{{< /details >}}

**Exercício 4.** Calcule \(\displaystyle\int\frac{dx}{x\sqrt{x^2-9}}\) para \(x > 3\).

{{< details title="Gabarito" >}}
Caso 3: \(x = 3\sec\theta\), \(dx = 3\sec\theta\operatorname{tg}\theta\,d\theta\), \(\sqrt{x^2-9} = 3\operatorname{tg}\theta\).

$$
\int\frac{3\sec\theta\operatorname{tg}\theta}{3\sec\theta\cdot3\operatorname{tg}\theta}\,d\theta = \frac{\theta}{3} + C = \frac13\operatorname{arcsec}\frac{x}{3} + C
$$
{{< /details >}}
