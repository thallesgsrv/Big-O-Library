---
title: Substituição trigonométrica
weight: 4
description: Como fazer raízes de x² ± a² e a² − x² sumirem usando triângulos retângulos.
autores:
  - thallesgsrv
date: 2026-10-14
---

Quando aparece uma raiz do tipo \(\sqrt{x^2\pm a^2}\) ou \(\sqrt{a^2-x^2}\), a trigonometria faz a raiz desaparecer. É preciso saber as integrais da página *Integrais trigonométricas*.

## Receita

1. Identifique o tipo e escolha a substituição da tabela.
2. Calcule \(dx\) em função de \(\theta\) e troque tudo na integral.
3. Resolva a integral trigonométrica (veja a página *Integrais trigonométricas*).
4. **Volte para \(x\)** usando o triângulo.

## Exemplos

**Exemplo 1.** \(\int \dfrac{dx}{\sqrt{4+x^2}}\)

{{< details title="Resolução" >}}
\(x = 2\operatorname{tg}\theta\), \(dx = 2\sec^2\theta\,d\theta\), \(\sqrt{4+x^2} = 2\sec\theta\). Então

\[
\int\frac{2\sec^2\theta}{2\sec\theta}\,d\theta = \int\sec\theta\,d\theta = \ln\lvert\sec\theta + \operatorname{tg}\theta\rvert.
\]

Pelo triângulo: \(\operatorname{tg}\theta = x/2\) e \(\sec\theta = \sqrt{4+x^2}/2\). Logo:

\[
\ln\Big(x + \sqrt{4+x^2}\Big) + C
\]

(a constante \(-\ln 2\) foi absorvida em \(C\)).
{{< /details >}}

**Exemplo 2.** \(\int \dfrac{x^3}{x^2+1}\,dx\)

{{< details title="Resolução" >}}
Aqui **não** precisa de trigonometria. Divida os polinômios: \(\dfrac{x^3}{x^2+1} = x - \dfrac{x}{x^2+1}\). Então

\[
\frac{x^2}{2} - \tfrac12\ln(x^2+1) + C.
\]
{{< /details >}}

**Exemplo 3.** \(\int \dfrac{dx}{\sqrt{1-9x^2}}\)

{{< details title="Resolução" >}}
Faça \(3x = \operatorname{sen}\theta\), isto é, \(dx = \tfrac13\cos\theta\,d\theta\). A raiz vira \(\cos\theta\):

\[
\int\frac{\tfrac13\cos\theta}{\cos\theta}\,d\theta = \frac{\theta}{3} = \tfrac13\operatorname{arcsen}(3x) + C.
\]
{{< /details >}}

**Exemplo 4.** \(\int \dfrac{\ln x}{x\sqrt{1-(\ln x)^2}}\,dx\)

{{< details title="Resolução" >}}
Basta uma substituição simples: \(u = \ln x\), \(du = dx/x\). Então

\[
\int\frac{u}{\sqrt{1-u^2}}\,du = -\sqrt{1-u^2} = -\sqrt{1-(\ln x)^2} + C.
\]

(Com \(w = 1-u^2\) a conta é imediata.)
{{< /details >}}

**Exemplo 5.** \(\int \dfrac{dx}{\sqrt{25x^2-4}}\)

{{< details title="Resolução" >}}
Faça \(5x = 2\sec\theta\). Então \(dx = \tfrac25\sec\theta\operatorname{tg}\theta\,d\theta\) e \(\sqrt{25x^2-4} = 2\operatorname{tg}\theta\):

\[
\frac15\int\sec\theta\,d\theta = \frac15\ln\lvert\sec\theta + \operatorname{tg}\theta\rvert.
\]

Pelo triângulo: \(\sec\theta = 5x/2\) e \(\operatorname{tg}\theta = \sqrt{25x^2-4}/2\). Resultado:

\[
\tfrac15\ln\Big\lvert 5x + \sqrt{25x^2-4}\Big\rvert + C.
\]
{{< /details >}}

**Exemplo 6.** \(\int \dfrac{dx}{\sqrt{x^2-4x+3}}\)

{{< details title="Resolução" >}}
Complete o quadrado: \(x^2-4x+3 = (x-2)^2 - 1\). Com \(u=x-2\), a integral é \(\int\dfrac{du}{\sqrt{u^2-1}}\), igual ao Exemplo 5 com \(a=1\):

\[
\ln\Big\lvert u + \sqrt{u^2-1}\Big\rvert = \ln\Big\lvert x-2+\sqrt{x^2-4x+3}\Big\rvert + C.
\]
{{< /details >}}
