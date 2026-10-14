---
title: Integrais trigonométricas
weight: 3
description: Potências e produtos de seno, cosseno, tangente e secante, com exemplos resolvidos.
autores:
  - thallesgsrv
date: 2026-10-14
---

Integrais com potências e produtos de funções trigonométricas seguem receitas: separar um fator, usar identidades de arco duplo, transformar produto em soma ou usar a relação entre tangente e secante.

## Caso A: potências de seno e cosseno

- **Algum expoente é ímpar:** separe um fator (um seno ou um cosseno), converta o resto com \(\operatorname{sen}^2 = 1-\cos^2\) (ou o contrário) e use \(u\).
- **Os dois expoentes são pares:** use as identidades de arco duplo
\[
\operatorname{sen}^2 x = \frac{1-\cos 2x}{2}, \qquad \cos^2 x = \frac{1+\cos 2x}{2}.
\]

**Exemplo 1.** \(\int \operatorname{sen}^3 x\cos^2 x\,dx\)

{{< details title="Resolução" >}}
O seno tem expoente ímpar: \(\operatorname{sen}^3 x = (1-\cos^2 x)\operatorname{sen} x\). Com \(u=\cos x\), \(du = -\operatorname{sen} x\,dx\):

\[
-\int (1-u^2)u^2\,du = -\frac{u^3}{3} + \frac{u^5}{5} = -\frac{\cos^3 x}{3} + \frac{\cos^5 x}{5} + C.
\]
{{< /details >}}

**Exemplo 2.** \(\int \cos^5 x\,dx\)

{{< details title="Resolução" >}}
\(\cos^5 x = (1-\operatorname{sen}^2 x)^2\cos x\). Com \(u=\operatorname{sen} x\):

\[
\int (1-2u^2+u^4)\,du = \operatorname{sen} x - \frac{2\operatorname{sen}^3 x}{3} + \frac{\operatorname{sen}^5 x}{5} + C.
\]
{{< /details >}}

**Exemplo 3.** \(\int \operatorname{sen}^2 x\,dx\)

{{< details title="Resolução" >}}
\[
\int\frac{1-\cos 2x}{2}dx = \frac{x}{2} - \frac{\operatorname{sen} 2x}{4} + C.
\]
{{< /details >}}

**Exemplo 4.** \(\int \operatorname{sen}^2 x\cos^2 x\,dx\)

{{< details title="Resolução" >}}
Como \(\operatorname{sen} x\cos x = \tfrac12\operatorname{sen} 2x\), o integrando é \(\tfrac14\operatorname{sen}^2 2x = \tfrac18(1-\cos 4x)\). Logo:

\[
\frac{x}{8} - \frac{\operatorname{sen} 4x}{32} + C.
\]
{{< /details >}}

## Caso B: eliminando raízes

A ideia é reconhecer \(1-\cos 2x = 2\operatorname{sen}^2 x\) e \(1+\cos 2x = 2\cos^2 x\) para a raiz "sumir".

> [!WARNING]
> \(\sqrt{a^2} = \lvert a\rvert\), não \(a\). O valor absoluto só desaparece se você souber o sinal.

**Exemplo 5.** \(\int \sqrt{1-\cos 2x}\,dx\)

{{< details title="Resolução" >}}
\(\sqrt{1-\cos 2x} = \sqrt{2\operatorname{sen}^2 x} = \sqrt2\,\lvert\operatorname{sen} x\rvert\). Em um intervalo onde \(\operatorname{sen} x > 0\):

\[
\int\sqrt2\operatorname{sen} x\,dx = -\sqrt2\cos x + C.
\]
{{< /details >}}

**Exemplo 6.** \(\int \sqrt{1+\cos 4x}\,dx\)

{{< details title="Resolução" >}}
\(1+\cos 4x = 2\cos^2 2x\), então a raiz é \(\sqrt2\,\lvert\cos 2x\rvert\). Onde \(\cos 2x > 0\):

\[
\int\sqrt2\cos 2x\,dx = \frac{\sqrt2}{2}\operatorname{sen} 2x + C.
\]
{{< /details >}}

## Caso C: produto de senos e cossenos de ângulos diferentes

Use as fórmulas que transformam produto em soma:

\[
\begin{aligned}
\operatorname{sen} A\operatorname{sen} B &= \tfrac12\big[\cos(A-B) - \cos(A+B)\big],\\
\operatorname{sen} A\cos B &= \tfrac12\big[\operatorname{sen}(A-B) + \operatorname{sen}(A+B)\big],\\
\cos A\cos B &= \tfrac12\big[\cos(A-B) + \cos(A+B)\big].
\end{aligned}
\]

**Exemplo 7.** \(\int \operatorname{sen} x\cos x\,dx\)

{{< details title="Resolução" >}}
\(\operatorname{sen} x\cos x = \tfrac12\operatorname{sen} 2x\), então a integral é \(-\dfrac{\cos 2x}{4} + C\).

Também vale \(\dfrac{\operatorname{sen}^2 x}{2} + C\) (com \(u=\operatorname{sen} x\)). As duas respostas diferem por uma constante, então estão corretas.
{{< /details >}}

**Exemplo 8.** \(\int \cos(-x)\cos(2x)\,dx\)

{{< details title="Resolução" >}}
\(\cos(-x) = \cos x\). Então \(\cos x\cos 2x = \tfrac12[\cos x + \cos 3x]\) e

\[
\tfrac12\operatorname{sen} x + \tfrac16\operatorname{sen} 3x + C.
\]
{{< /details >}}

**Exemplo 9.** \(\int \operatorname{sen}(3x)\cos(5x)\,dx\)

{{< details title="Resolução" >}}
\(\operatorname{sen} 3x\cos 5x = \tfrac12[\operatorname{sen}(-2x) + \operatorname{sen} 8x] = \tfrac12[-\operatorname{sen} 2x + \operatorname{sen} 8x]\). Logo:

\[
\frac{\cos 2x}{4} - \frac{\cos 8x}{16} + C.
\]
{{< /details >}}

## Caso D: potências de tangente e secante

A relação-chave é \(\operatorname{tg}^2 x + 1 = \sec^2 x\). Duas substituições possíveis: \(u=\operatorname{tg} x\) (então \(du=\sec^2 x\,dx\)) ou \(u=\sec x\) (então \(du=\sec x\operatorname{tg} x\,dx\)). Às vezes também é preciso integrar por partes, em qualquer ordem.

**Exemplo 10.** \(\int \operatorname{tg}^4 x\,dx\)

{{< details title="Resolução" >}}
\(\operatorname{tg}^4 x = \operatorname{tg}^2 x(\sec^2 x - 1)\). Então:

\[
\int\operatorname{tg}^2x\sec^2x\,dx - \int\operatorname{tg}^2x\,dx = \frac{\operatorname{tg}^3x}{3} - \int(\sec^2x-1)\,dx,
\]

\[
\int\operatorname{tg}^4x\,dx = \frac{\operatorname{tg}^3 x}{3} - \operatorname{tg} x + x + C.
\]
{{< /details >}}

**Exemplo 11.** \(\int \sec^3 x\,dx\)

{{< details title="Resolução" >}}
Por partes: \(u=\sec x\), \(dv=\sec^2x\,dx\), logo \(du=\sec x\operatorname{tg} x\,dx\) e \(v=\operatorname{tg} x\). Chamando a integral de \(I\):

\[
I = \sec x\operatorname{tg} x - \int\sec x\operatorname{tg}^2x\,dx = \sec x\operatorname{tg} x - \int\sec x(\sec^2x-1)\,dx = \sec x\operatorname{tg} x - I + \int\sec x\,dx.
\]

Então \(2I = \sec x\operatorname{tg} x + \ln\lvert\sec x+\operatorname{tg} x\rvert\), ou seja:

\[
I = \tfrac12\sec x\operatorname{tg} x + \tfrac12\ln\lvert\sec x + \operatorname{tg} x\rvert + C.
\]
{{< /details >}}

**Exemplo 12.** \(\int \operatorname{tg}^4 x\sec^4 x\,dx\)

{{< details title="Resolução" >}}
Separe \(\sec^2 x\) e converta o outro: \(\sec^4 x = (1+\operatorname{tg}^2x)\sec^2x\). Com \(u = \operatorname{tg} x\):

\[
\int u^4(1+u^2)\,du = \frac{\operatorname{tg}^5 x}{5} + \frac{\operatorname{tg}^7 x}{7} + C.
\]
{{< /details >}}
