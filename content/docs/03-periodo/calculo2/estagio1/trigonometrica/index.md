---
title: Integrais trigonométricas
weight: 2
description: Potências e produtos de seno, cosseno, tangente e secante, com exemplos resolvidos.
autores:
  - thallesgsrv
date: 2026-10-14
---

## Como funciona?

Aqui o objetivo é integrar expressões feitas só de seno, cosseno, tangente e secante, como \(\operatorname{sen}^3 x\cos^2 x\) ou \(\operatorname{tg}^4 x\). Não existe uma fórmula única: o truque é **usar identidades para cair numa substituição \(u = \ldots\) simples**.

## Sobre

Duas identidades fazem quase todo o trabalho:

$$
\operatorname{sen}^2 x + \cos^2 x = 1 \qquad\text{e}\qquad \operatorname{tg}^2 x + 1 = \sec^2 x
$$

E três pares de derivadas te dizem qual substituição escolher:

| Se aparece... | Faça... | Porque... |
| --- | --- | --- |
| \(\operatorname{sen} x\,dx\) | \(u = \cos x\) | \(du = -\operatorname{sen} x\,dx\) |
| \(\cos x\,dx\) | \(u = \operatorname{sen} x\) | \(du = \cos x\,dx\) |
| \(\sec^2 x\,dx\) | \(u = \operatorname{tg} x\) | \(du = \sec^2 x\,dx\) |
| \(\sec x\operatorname{tg} x\,dx\) | \(u = \sec x\) | \(du = \sec x\operatorname{tg} x\,dx\) |

## Aquecimento

**Exemplo 1.** \(\displaystyle\int \operatorname{tg} x\,dx\)

Escreva \(\operatorname{tg} x = \dfrac{\operatorname{sen} x}{\cos x}\) e faça \(u = \cos x\), \(du = -\operatorname{sen} x\,dx\):

$$
\int \frac{\operatorname{sen} x}{\cos x}\,dx = -\int\frac{du}{u} = -\ln\lvert\cos x\rvert + C = \ln\lvert\sec x\rvert + C
$$

**Exemplo 2.** \(\displaystyle\int \sec x\operatorname{tg} x\,dx\)

Com \(u = \sec x\), \(du = \sec x\operatorname{tg} x\,dx\):

$$
\int du = \sec x + C
$$

**Exemplo 3.** \(\displaystyle\int \sec x\,dx\)

Esta é "mágica": multiplique e divida por \(\sec x + \operatorname{tg} x\).

$$
\int \sec x\cdot\frac{\sec x + \operatorname{tg} x}{\sec x + \operatorname{tg} x}\,dx = \int \frac{\sec^2 x + \sec x\operatorname{tg} x}{\sec x + \operatorname{tg} x}\,dx
$$

O numerador é exatamente a derivada do denominador. Com \(u = \sec x + \operatorname{tg} x\):

$$
\int \sec x\,dx = \ln\lvert\sec x + \operatorname{tg} x\rvert + C
$$

## Potências de seno e cosseno

A ideia depende dos expoentes:

- **Se um dos expoentes for ímpar:** separe *um* fator do que tem expoente ímpar, converta o resto com \(\operatorname{sen}^2 + \cos^2 = 1\) e faça a substituição.
- **Se os dois forem pares:** use as identidades do arco duplo.

$$
\operatorname{sen}^2 x = \frac{1-\cos 2x}{2} \qquad\qquad \cos^2 x = \frac{1+\cos 2x}{2}
$$

**Exemplo 4.** \(\displaystyle\int \operatorname{sen}^3 x\cos^2 x\,dx\)

O seno tem expoente ímpar. Separe um seno: \(\operatorname{sen}^3 x = \operatorname{sen}^2 x\cdot\operatorname{sen} x = (1-\cos^2 x)\operatorname{sen} x\). Com \(u = \cos x\):

$$
\int (1-u^2)\,u^2\,(-du) = -\frac{u^3}{3} + \frac{u^5}{5} + C = -\frac{\cos^3 x}{3} + \frac{\cos^5 x}{5} + C
$$

**Exemplo 5.** \(\displaystyle\int \cos^5 x\,dx\)

\(\cos^5 x = (1-\operatorname{sen}^2 x)^2\cos x\). Com \(u = \operatorname{sen} x\):

$$
\int (1-u^2)^2\,du = u - \frac{2u^3}{3} + \frac{u^5}{5} + C = \operatorname{sen} x - \frac{2\operatorname{sen}^3 x}{3} + \frac{\operatorname{sen}^5 x}{5} + C
$$

**Exemplo 6.** \(\displaystyle\int \operatorname{sen}^2 x\,dx\)

Expoente par: use o arco duplo.

$$
\int\frac{1-\cos 2x}{2}\,dx = \frac{x}{2} - \frac{\operatorname{sen} 2x}{4} + C
$$

**Exemplo 7.** \(\displaystyle\int \operatorname{sen}^2 x\cos^2 x\,dx\)

Os dois são pares. Um atalho: \(\operatorname{sen} x\cos x = \tfrac12\operatorname{sen} 2x\), então \(\operatorname{sen}^2 x\cos^2 x = \tfrac14\operatorname{sen}^2 2x = \dfrac{1-\cos 4x}{8}\).

$$
\int \frac{1-\cos 4x}{8}\,dx = \frac{x}{8} - \frac{\operatorname{sen} 4x}{32} + C
$$

> [!WARNING]
> Cuidado com a regra da cadeia "ao contrário": \(\int \cos 4x\,dx = \dfrac{\operatorname{sen} 4x}{4}\), e não \(\operatorname{sen} 4x\). Sempre divida pelo coeficiente de \(x\).

## Eliminação de raízes

Quando há raiz de \(1 \pm \cos(\cdot)\), as identidades do arco duplo fazem a raiz sumir:

$$
1-\cos 2x = 2\operatorname{sen}^2 x \qquad\qquad 1+\cos 2x = 2\cos^2 x
$$

**Exemplo 8.** \(\displaystyle\int \sqrt{1-\cos 2x}\,dx\)

\(\sqrt{2\operatorname{sen}^2 x} = \sqrt2\,\lvert\operatorname{sen} x\rvert\). Em um intervalo onde \(\operatorname{sen} x \ge 0\):

$$
\sqrt2\int \operatorname{sen} x\,dx = -\sqrt2\cos x + C
$$

**Exemplo 9.** \(\displaystyle\int \sqrt{1+\cos 4x}\,dx\)

Com \(1+\cos 4x = 2\cos^2 2x\), a raiz é \(\sqrt2\,\lvert\cos 2x\rvert\). Onde \(\cos 2x \ge 0\):

$$
\sqrt2\int\cos 2x\,dx = \frac{\sqrt2}{2}\operatorname{sen} 2x + C
$$

> [!IMPORTANT]
> \(\sqrt{a^2} = \lvert a\rvert\), nunca simplesmente \(a\). Nos exemplos acima, assumimos o sinal do módulo; em outro intervalo, o sinal da resposta pode inverter.

## Produto de senos e cossenos

Quando os *ângulos* são diferentes (como \(3x\) e \(5x\)), use as fórmulas de produto para soma:

$$
\begin{aligned}
\operatorname{sen}A\operatorname{sen}B &= \tfrac12\big[\cos(A-B) - \cos(A+B)\big]\\
\operatorname{sen}A\cos B &= \tfrac12\big[\operatorname{sen}(A-B) + \operatorname{sen}(A+B)\big]\\
\cos A\cos B &= \tfrac12\big[\cos(A-B) + \cos(A+B)\big]
\end{aligned}
$$

**Exemplo 10.** \(\displaystyle\int \operatorname{sen} x\cos x\,dx\)

$$
\tfrac12\int \operatorname{sen} 2x\,dx = -\frac{\cos 2x}{4} + C
$$

(Outra resposta correta: \(\tfrac12\operatorname{sen}^2 x + C\), com \(u = \operatorname{sen} x\). As duas diferem por uma constante.)

**Exemplo 11.** \(\displaystyle\int \cos(-x)\cos(2x)\,dx\)

Como \(\cos(-x) = \cos x\):

$$
\tfrac12\int\big[\cos x + \cos 3x\big]\,dx = \frac{\operatorname{sen} x}{2} + \frac{\operatorname{sen} 3x}{6} + C
$$

**Exemplo 12.** \(\displaystyle\int \operatorname{sen}(3x)\cos(5x)\,dx\)

Com \(A = 3x\) e \(B = 5x\): \(\operatorname{sen}(-2x) + \operatorname{sen}(8x)\).

$$
\tfrac12\int\big[-\operatorname{sen} 2x + \operatorname{sen} 8x\big]\,dx = \frac{\cos 2x}{4} - \frac{\cos 8x}{16} + C
$$

## Potências de tangente e secante

Use \(\operatorname{tg}^2 x = \sec^2 x - 1\) para *trocar* tangentes por secantes (ou vice-versa) até sobrar um \(\sec^2 x\,dx\) (para \(u = \operatorname{tg} x\)) ou um \(\sec x\operatorname{tg} x\,dx\) (para \(u = \sec x\)).

**Exemplo 13.** \(\displaystyle\int \operatorname{tg}^4 x\,dx\)

$$
\operatorname{tg}^4 x = \operatorname{tg}^2 x(\sec^2 x - 1) = \operatorname{tg}^2 x\sec^2 x - \operatorname{tg}^2 x = \operatorname{tg}^2 x\sec^2 x - \sec^2 x + 1
$$

$$
\int \operatorname{tg}^4 x\,dx = \frac{\operatorname{tg}^3 x}{3} - \operatorname{tg} x + x + C
$$

**Exemplo 14.** \(\displaystyle\int \operatorname{tg}^4 x\sec^4 x\,dx\)

A secante tem expoente par. Separe \(\sec^2 x\) e troque o outro por \(1 + \operatorname{tg}^2 x\). Com \(u = \operatorname{tg} x\):

$$
\int u^4(1+u^2)\,du = \frac{u^5}{5} + \frac{u^7}{7} + C = \frac{\operatorname{tg}^5 x}{5} + \frac{\operatorname{tg}^7 x}{7} + C
$$

**Exemplo 15.** \(\displaystyle\int \sec^3 x\,dx\)

Aqui é preciso **partes**. Com \(u = \sec x\) e \(dv = \sec^2 x\,dx\): \(du = \sec x\operatorname{tg} x\,dx\) e \(v = \operatorname{tg} x\).

$$
\int\sec^3 x\,dx = \sec x\operatorname{tg} x - \int \sec x\operatorname{tg}^2 x\,dx = \sec x\operatorname{tg} x - \int\sec^3 x\,dx + \int\sec x\,dx
$$

A integral original aparece nos dois lados (caso circular). Chamando-a de \(I\): \(2I = \sec x\operatorname{tg} x + \ln\lvert\sec x + \operatorname{tg} x\rvert\), ou seja:

$$
\int \sec^3 x\,dx = \tfrac12\Big(\sec x\operatorname{tg} x + \ln\lvert\sec x + \operatorname{tg} x\rvert\Big) + C
$$

## Resumo da estratégia

| Integral | O que fazer |
| --- | --- |
| \(\operatorname{sen}^m x\cos^n x\), algum expoente ímpar | Separe um fator, converta o resto, \(u\) = a outra função |
| \(\operatorname{sen}^m x\cos^n x\), os dois pares | Arco duplo (repetir se preciso) |
| \(\operatorname{sen}(ax)\cos(bx)\) etc. | Produto para soma |
| \(\operatorname{tg}^m x\sec^n x\), \(n\) par | Separe \(\sec^2 x\), \(u = \operatorname{tg} x\) |
| \(\operatorname{tg}^m x\sec^n x\), \(m\) ímpar | Separe \(\sec x\operatorname{tg} x\), \(u = \sec x\) |
| \(\operatorname{tg}^m x\) sozinha | \(\operatorname{tg}^2 = \sec^2 - 1\) |
| \(\sec^3 x\) (e ímpares de \(\sec\)) | Partes |

## Exercícios propostos

**Exercício 1.** Calcule \(\displaystyle\int \cos^3 x\,dx\).

{{< details title="Gabarito" >}}
\(\cos^3 x = (1-\operatorname{sen}^2 x)\cos x\). Com \(u = \operatorname{sen} x\):

$$
\int (1-u^2)\,du = \operatorname{sen} x - \frac{\operatorname{sen}^3 x}{3} + C
$$
{{< /details >}}

**Exercício 2.** Calcule \(\displaystyle\int \operatorname{sen}^5 x\,dx\).

{{< details title="Gabarito" >}}
\(\operatorname{sen}^5 x = (1-\cos^2 x)^2\operatorname{sen} x\). Com \(u = \cos x\):

$$
-\int(1-2u^2+u^4)\,du = -\cos x + \frac{2\cos^3 x}{3} - \frac{\cos^5 x}{5} + C
$$
{{< /details >}}

**Exercício 3.** Calcule \(\displaystyle\int \operatorname{tg}^2 x\,dx\).

{{< details title="Gabarito" >}}
\(\operatorname{tg}^2 x = \sec^2 x - 1\), logo

$$
\int(\sec^2 x - 1)\,dx = \operatorname{tg} x - x + C
$$
{{< /details >}}

**Exercício 4.** Calcule \(\displaystyle\int \operatorname{tg} x\sec^3 x\,dx\).

{{< details title="Gabarito" >}}
Separe \(\sec x\operatorname{tg} x\): o integrando é \(\sec^2 x\cdot\sec x\operatorname{tg} x\). Com \(u = \sec x\):

$$
\int u^2\,du = \frac{\sec^3 x}{3} + C
$$
{{< /details >}}

**Exercício 5.** Calcule \(\displaystyle\int \operatorname{sen}(2x)\cos(3x)\,dx\).

{{< details title="Gabarito" >}}
\(\operatorname{sen}A\cos B\) com \(A = 2x\), \(B = 3x\): \(\tfrac12\big[\operatorname{sen}(-x) + \operatorname{sen}(5x)\big]\).

$$
\tfrac12\int\big[-\operatorname{sen} x + \operatorname{sen} 5x\big]\,dx = \frac{\cos x}{2} - \frac{\cos 5x}{10} + C
$$
{{< /details >}}
