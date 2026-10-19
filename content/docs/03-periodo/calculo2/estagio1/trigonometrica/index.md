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

E quatro pares de derivadas te dizem qual substituição escolher. A pergunta é sempre: *o que está sobrando ao lado?*

| Se sobra... | Faça... | Porque... |
| --- | --- | --- |
| \(\operatorname{sen} x\,dx\) | \(u = \cos x\) | \(du = -\operatorname{sen} x\,dx\) |
| \(\cos x\,dx\) | \(u = \operatorname{sen} x\) | \(du = \cos x\,dx\) |
| \(\sec^2 x\,dx\) | \(u = \operatorname{tg} x\) | \(du = \sec^2 x\,dx\) |
| \(\sec x\operatorname{tg} x\,dx\) | \(u = \sec x\) | \(du = \sec x\operatorname{tg} x\,dx\) |

## Aquecimento

**Exemplo 1.** \(\displaystyle\int \operatorname{tg} x\,dx\)

1. \(\operatorname{tg} x\) não está na tabela. Reescreva: \(\operatorname{tg} x = \dfrac{\operatorname{sen} x}{\cos x}\).
2. Aparece \(\operatorname{sen} x\,dx\) sobrando, então \(u = \cos x\) e \(du = -\operatorname{sen} x\,dx\), ou seja, \(\operatorname{sen} x\,dx = -du\).
3. Troque e integre:

$$
\int \frac{\operatorname{sen} x}{\cos x}\,dx = \int\frac{-du}{u} = -\ln\lvert u\rvert + C = -\ln\lvert\cos x\rvert + C
$$

4. Como \(-\ln\lvert\cos x\rvert = \ln\left\lvert\dfrac{1}{\cos x}\right\rvert = \ln\lvert\sec x\rvert\):

$$
\int\operatorname{tg} x\,dx = \ln\lvert\sec x\rvert + C
$$

**Exemplo 2.** \(\displaystyle\int \sec x\operatorname{tg} x\,dx\)

Com \(u = \sec x\), \(du = \sec x\operatorname{tg} x\,dx\) (é exatamente o que está na integral):

$$
\int du = u + C = \sec x + C
$$

**Exemplo 3.** \(\displaystyle\int \sec x\,dx\)

Esta é a "mágica": multiplicar e dividir por \(\sec x + \operatorname{tg} x\) (multiplicar por \(1\) não muda nada).

1. Monte:

$$
\int \sec x\cdot\frac{\sec x + \operatorname{tg} x}{\sec x + \operatorname{tg} x}\,dx = \int \frac{\sec^2 x + \sec x\operatorname{tg} x}{\sec x + \operatorname{tg} x}\,dx
$$

2. Derive o denominador: \((\sec x + \operatorname{tg} x)' = \sec x\operatorname{tg} x + \sec^2 x\). Isso é **exatamente o numerador**.
3. Com \(u = \sec x + \operatorname{tg} x\), \(du = (\sec^2 x + \sec x\operatorname{tg} x)\,dx\):

$$
\int\frac{du}{u} = \ln\lvert u\rvert \;\Rightarrow\; \int \sec x\,dx = \ln\lvert\sec x + \operatorname{tg} x\rvert + C
$$

## Potências de seno e cosseno

A ideia depende dos expoentes:

- **Se um dos expoentes for ímpar:** separe *um* fator do que tem expoente ímpar, converta o resto com \(\operatorname{sen}^2 + \cos^2 = 1\) e faça a substituição. O fator separado vira o \(du\).
- **Se os dois forem pares:** use as identidades do arco duplo.

$$
\operatorname{sen}^2 x = \frac{1-\cos 2x}{2} \qquad\qquad \cos^2 x = \frac{1+\cos 2x}{2}
$$

**Exemplo 4.** \(\displaystyle\int \operatorname{sen}^3 x\cos^2 x\,dx\)

1. O seno tem expoente ímpar (\(3\)). Separe um seno: \(\operatorname{sen}^3 x = \operatorname{sen}^2 x\cdot\operatorname{sen} x\).
2. Converta o que sobrou: \(\operatorname{sen}^2 x = 1-\cos^2 x\). O integrando vira \((1-\cos^2 x)\cos^2 x\,\operatorname{sen} x\,dx\).
3. Faça \(u = \cos x\), \(\operatorname{sen} x\,dx = -du\):

$$
\int (1-u^2)\,u^2\,(-du) = -\int (u^2 - u^4)\,du
$$

4. Integre termo a termo:

$$
-\left(\frac{u^3}{3} - \frac{u^5}{5}\right) = -\frac{u^3}{3} + \frac{u^5}{5}
$$

5. Volte:

$$
\int \operatorname{sen}^3 x\cos^2 x\,dx = -\frac{\cos^3 x}{3} + \frac{\cos^5 x}{5} + C
$$

**Exemplo 5.** \(\displaystyle\int \cos^5 x\,dx\)

1. Expoente ímpar: \(\cos^5 x = \cos^4 x\cdot\cos x = (\cos^2 x)^2\cos x = (1-\operatorname{sen}^2 x)^2\cos x\).
2. \(u = \operatorname{sen} x\), \(du = \cos x\,dx\).
3. Expanda o quadrado: \((1-u^2)^2 = 1 - 2u^2 + u^4\).

$$
\int (1-2u^2+u^4)\,du = u - \frac{2u^3}{3} + \frac{u^5}{5}
$$

4. Volte:

$$
\int\cos^5 x\,dx = \operatorname{sen} x - \frac{2\operatorname{sen}^3 x}{3} + \frac{\operatorname{sen}^5 x}{5} + C
$$

**Exemplo 6.** \(\displaystyle\int \operatorname{sen}^2 x\,dx\)

Expoente par: use o arco duplo.

1. \(\operatorname{sen}^2 x = \dfrac{1-\cos 2x}{2}\).
2. Separe a fração: \(\int\dfrac12\,dx - \dfrac12\int\cos 2x\,dx\).
3. \(\int\cos 2x\,dx = \dfrac{\operatorname{sen} 2x}{2}\) (divida pelo coeficiente de \(x\)).

$$
\int \operatorname{sen}^2 x\,dx = \frac{x}{2} - \frac12\cdot\frac{\operatorname{sen} 2x}{2} = \frac{x}{2} - \frac{\operatorname{sen} 2x}{4} + C
$$

**Exemplo 7.** \(\displaystyle\int \operatorname{sen}^2 x\cos^2 x\,dx\)

1. Atalho: \(\operatorname{sen} x\cos x = \tfrac12\operatorname{sen} 2x\). Elevando ao quadrado: \(\operatorname{sen}^2 x\cos^2 x = \tfrac14\operatorname{sen}^2 2x\).
2. Arco duplo em \(\operatorname{sen}^2(2x) = \dfrac{1-\cos 4x}{2}\):

$$
\operatorname{sen}^2 x\cos^2 x = \frac14\cdot\frac{1-\cos 4x}{2} = \frac{1-\cos 4x}{8}
$$

3. Integre: \(\int\dfrac18\,dx = \dfrac x8\) e \(\int\dfrac{\cos 4x}{8}\,dx = \dfrac18\cdot\dfrac{\operatorname{sen}4x}{4} = \dfrac{\operatorname{sen}4x}{32}\):

$$
\int \operatorname{sen}^2 x\cos^2 x\,dx = \frac{x}{8} - \frac{\operatorname{sen} 4x}{32} + C
$$

> [!WARNING]
> Cuidado com a regra da cadeia "ao contrário": \(\int \cos 4x\,dx = \dfrac{\operatorname{sen} 4x}{4}\), e não \(\operatorname{sen} 4x\). Sempre divida pelo coeficiente de \(x\).

## Eliminação de raízes

Quando há raiz de \(1 \pm \cos(\cdot)\), as identidades do arco duplo fazem a raiz sumir:

$$
1-\cos 2x = 2\operatorname{sen}^2 x \qquad\qquad 1+\cos 2x = 2\cos^2 x
$$

**Exemplo 8.** \(\displaystyle\int \sqrt{1-\cos 2x}\,dx\)

1. \(\sqrt{1-\cos 2x} = \sqrt{2\operatorname{sen}^2 x} = \sqrt2\,\lvert\operatorname{sen} x\rvert\).
2. Em um intervalo onde \(\operatorname{sen} x \ge 0\), o módulo some:

$$
\sqrt2\int \operatorname{sen} x\,dx = -\sqrt2\cos x + C
$$

**Exemplo 9.** \(\displaystyle\int \sqrt{1+\cos 4x}\,dx\)

1. \(1+\cos 4x = 1 + \cos(2\cdot 2x) = 2\cos^2 2x\), então a raiz é \(\sqrt2\,\lvert\cos 2x\rvert\).
2. Onde \(\cos 2x \ge 0\): \(\sqrt2\int\cos 2x\,dx = \sqrt2\cdot\dfrac{\operatorname{sen}2x}{2}\):

$$
\int\sqrt{1+\cos 4x}\,dx = \frac{\sqrt2}{2}\operatorname{sen} 2x + C
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

1. Com \(A = B = x\): \(\operatorname{sen}x\cos x = \tfrac12\big[\operatorname{sen}0 + \operatorname{sen}2x\big] = \tfrac12\operatorname{sen}2x\).
2. Integre:

$$
\tfrac12\int \operatorname{sen}2x\,dx = \tfrac12\cdot\left(-\frac{\cos 2x}{2}\right) = -\frac{\cos 2x}{4} + C
$$

(Outra resposta correta: \(\tfrac12\operatorname{sen}^2 x + C\), com \(u = \operatorname{sen} x\). As duas diferem por uma constante, pois \(\cos 2x = 1 - 2\operatorname{sen}^2x\).)

**Exemplo 11.** \(\displaystyle\int \cos(-x)\cos(2x)\,dx\)

1. O cosseno é par: \(\cos(-x) = \cos x\). Com \(A = x\), \(B = 2x\): \(A-B = -x\) e \(A+B = 3x\).
2. \(\cos A\cos B = \tfrac12\big[\cos(-x) + \cos 3x\big] = \tfrac12\big[\cos x + \cos 3x\big]\).
3. Integre:

$$
\tfrac12\int\big[\cos x + \cos 3x\big]\,dx = \tfrac12\left[\operatorname{sen}x + \frac{\operatorname{sen}3x}{3}\right] = \frac{\operatorname{sen} x}{2} + \frac{\operatorname{sen} 3x}{6} + C
$$

**Exemplo 12.** \(\displaystyle\int \operatorname{sen}(3x)\cos(5x)\,dx\)

1. \(A = 3x\), \(B = 5x\). Então \(A-B = -2x\) e \(A+B = 8x\).
2. \(\operatorname{sen}A\cos B = \tfrac12\big[\operatorname{sen}(-2x) + \operatorname{sen}(8x)\big] = \tfrac12\big[-\operatorname{sen}2x + \operatorname{sen}8x\big]\) (seno é ímpar).
3. Integre: \(\int -\operatorname{sen}2x\,dx = \dfrac{\cos2x}{2}\) e \(\int\operatorname{sen}8x\,dx = -\dfrac{\cos8x}{8}\):

$$
\tfrac12\left[\frac{\cos 2x}{2} - \frac{\cos 8x}{8}\right] = \frac{\cos 2x}{4} - \frac{\cos 8x}{16} + C
$$

## Potências de tangente e secante

Use \(\operatorname{tg}^2 x = \sec^2 x - 1\) para *trocar* tangentes por secantes (ou vice-versa) até sobrar um \(\sec^2 x\,dx\) (para \(u = \operatorname{tg} x\)) ou um \(\sec x\operatorname{tg} x\,dx\) (para \(u = \sec x\)).

**Exemplo 13.** \(\displaystyle\int \operatorname{tg}^4 x\,dx\)

1. Separe \(\operatorname{tg}^4 x = \operatorname{tg}^2 x\cdot\operatorname{tg}^2 x\) e troque um deles:

$$
\operatorname{tg}^4 x = \operatorname{tg}^2 x(\sec^2 x - 1) = \operatorname{tg}^2 x\sec^2 x - \operatorname{tg}^2 x
$$

2. Troque o \(\operatorname{tg}^2 x\) que sobrou: \(-\operatorname{tg}^2 x = -(\sec^2 x - 1) = -\sec^2 x + 1\).

$$
\operatorname{tg}^4 x = \operatorname{tg}^2 x\sec^2 x - \sec^2 x + 1
$$

3. Integre cada parcela: a primeira com \(u = \operatorname{tg}x\) dá \(\dfrac{\operatorname{tg}^3x}{3}\); a segunda é \(-\operatorname{tg}x\); a terceira é \(x\).

$$
\int \operatorname{tg}^4 x\,dx = \frac{\operatorname{tg}^3 x}{3} - \operatorname{tg} x + x + C
$$

**Exemplo 14.** \(\displaystyle\int \operatorname{tg}^4 x\sec^4 x\,dx\)

1. A secante tem expoente par. Separe \(\sec^2 x\) (será o \(du\)) e troque o outro: \(\sec^2 x = 1+\operatorname{tg}^2 x\).
2. Com \(u = \operatorname{tg} x\), \(du = \sec^2 x\,dx\):

$$
\int u^4(1+u^2)\,du = \int (u^4 + u^6)\,du = \frac{u^5}{5} + \frac{u^7}{7}
$$

3. Volte:

$$
\int \operatorname{tg}^4 x\sec^4 x\,dx = \frac{\operatorname{tg}^5 x}{5} + \frac{\operatorname{tg}^7 x}{7} + C
$$

**Exemplo 15.** \(\displaystyle\int \sec^3 x\,dx\)

Aqui é preciso **partes**.

1. \(u = \sec x\), \(dv = \sec^2 x\,dx\), \(du = \sec x\operatorname{tg} x\,dx\), \(v = \operatorname{tg} x\).
2. Monte:

$$
\int\sec^3 x\,dx = \sec x\operatorname{tg} x - \int \sec x\operatorname{tg}^2 x\,dx
$$

3. Troque \(\operatorname{tg}^2 x = \sec^2 x - 1\) e distribua \(\sec x\):

$$
-\int \sec x(\sec^2 x - 1)\,dx = -\int\sec^3 x\,dx + \int\sec x\,dx
$$

4. A integral original aparece nos dois lados (caso circular). Chamando-a de \(I\):

$$
I = \sec x\operatorname{tg} x - I + \ln\lvert\sec x + \operatorname{tg} x\rvert \;\Rightarrow\; 2I = \sec x\operatorname{tg} x + \ln\lvert\sec x + \operatorname{tg} x\rvert
$$

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
1. Expoente ímpar: \(\cos^3 x = \cos^2 x\cdot\cos x = (1-\operatorname{sen}^2 x)\cos x\).
2. \(u = \operatorname{sen} x\), \(du = \cos x\,dx\).

$$
\int (1-u^2)\,du = u - \frac{u^3}{3} = \operatorname{sen} x - \frac{\operatorname{sen}^3 x}{3} + C
$$
{{< /details >}}

**Exercício 2.** Calcule \(\displaystyle\int \operatorname{sen}^5 x\,dx\).

{{< details title="Gabarito" >}}
1. \(\operatorname{sen}^5 x = \operatorname{sen}^4 x\cdot\operatorname{sen} x = (1-\cos^2 x)^2\operatorname{sen} x\).
2. \(u = \cos x\), \(\operatorname{sen} x\,dx = -du\).
3. Expanda: \((1-u^2)^2 = 1 - 2u^2 + u^4\).

$$
-\int(1-2u^2+u^4)\,du = -\left(u - \frac{2u^3}{3} + \frac{u^5}{5}\right) = -\cos x + \frac{2\cos^3 x}{3} - \frac{\cos^5 x}{5} + C
$$
{{< /details >}}

**Exercício 3.** Calcule \(\displaystyle\int \operatorname{tg}^2 x\,dx\).

{{< details title="Gabarito" >}}
1. \(\operatorname{tg}^2 x = \sec^2 x - 1\).
2. Integre cada parcela: \(\int\sec^2x\,dx = \operatorname{tg}x\) e \(\int 1\,dx = x\).

$$
\int(\sec^2 x - 1)\,dx = \operatorname{tg} x - x + C
$$
{{< /details >}}

**Exercício 4.** Calcule \(\displaystyle\int \operatorname{tg} x\sec^3 x\,dx\).

{{< details title="Gabarito" >}}
1. Separe \(\sec x\operatorname{tg} x\): o integrando é \(\sec^2 x\cdot(\sec x\operatorname{tg} x)\).
2. \(u = \sec x\), \(du = \sec x\operatorname{tg} x\,dx\).

$$
\int u^2\,du = \frac{u^3}{3} = \frac{\sec^3 x}{3} + C
$$
{{< /details >}}

**Exercício 5.** Calcule \(\displaystyle\int \operatorname{sen}(2x)\cos(3x)\,dx\).

{{< details title="Gabarito" >}}
1. \(A = 2x\), \(B = 3x\): \(A-B = -x\), \(A+B = 5x\).
2. \(\operatorname{sen}A\cos B = \tfrac12\big[\operatorname{sen}(-x) + \operatorname{sen}5x\big] = \tfrac12\big[-\operatorname{sen}x + \operatorname{sen}5x\big]\).
3. \(\int -\operatorname{sen}x\,dx = \cos x\) e \(\int\operatorname{sen}5x\,dx = -\dfrac{\cos5x}{5}\):

$$
\tfrac12\left[\cos x - \frac{\cos 5x}{5}\right] = \frac{\cos x}{2} - \frac{\cos 5x}{10} + C
$$
{{< /details >}}
