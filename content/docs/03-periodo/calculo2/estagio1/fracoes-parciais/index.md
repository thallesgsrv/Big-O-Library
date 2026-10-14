---
title: Frações parciais
weight: 5
description: Quebrar uma fração de polinômios em frações simples para integrar com ln e arctg.
autores:
  - thallesgsrv
date: 2026-10-14
---

Frações parciais é um artifício algébrico para integrar funções racionais (razão de dois polinômios), trocando uma fração complicada por uma soma de frações simples.

## Receita geral

1. **Compare os graus.** Se o grau do numerador for \(\geq\) o do denominador, divida os polinômios primeiro.
2. **Fatore o denominador** em fatores irredutíveis (grau 1, ou grau 2 sem raízes reais).
3. **Monte a decomposição** conforme os casos abaixo.
4. **Ache as constantes** (substituindo valores convenientes de \(x\) ou comparando coeficientes).
5. **Integre** cada parcela.

## Os casos

- **Fatores distintos de grau 1:**
\[
\frac{f(x)}{(x-\alpha_1)(x-\alpha_2)} = \frac{A}{x-\alpha_1} + \frac{B}{x-\alpha_2}.
\]
- **Fator de grau 1 repetido:**
\[
\frac{f(x)}{(x-\alpha)^2} = \frac{A}{x-\alpha} + \frac{B}{(x-\alpha)^2},
\]
e, para \((x-\alpha)^3\), inclui-se também \(\dfrac{C}{(x-\alpha)^3}\) (uma parcela por potência).
- **Fator irredutível de grau 2:** em cima vai um polinômio de grau 1:
\[
\frac{f(x)}{g_1(x)\,g_2(x)} = \frac{Ax+B}{g_1(x)} + \frac{Cx+D}{g_2(x)}.
\]

> [!NOTE]
> Um polinômio é **irredutível** se não pode ser escrito como produto de polinômios de grau menor. Exemplos: \(x+1\), \(x^2+1\), \(x^2+x+1\).

## Exemplos

**Exemplo 1.** \(\int \dfrac{x^3+x^2+1}{x^2+x}\,dx\)

{{< details title="Resolução" >}}
Grau 3 \(\geq\) grau 2, então divida: \(x^3+x^2 = x(x^2+x)\), logo a fração é \(x + \dfrac{1}{x(x+1)}\).

Decomposição: \(\dfrac{1}{x(x+1)} = \dfrac1x - \dfrac1{x+1}\) (confira juntando as frações). Então:

\[
\frac{x^2}{2} + \ln\lvert x\rvert - \ln\lvert x+1\rvert + C.
\]
{{< /details >}}

**Exemplo 2.** \(\int \dfrac{6x+7}{(x+3)^2}\,dx\)

{{< details title="Resolução" >}}
Escreva \(6x+7 = 6(x+3) - 11\). A fração vira \(\dfrac{6}{x+3} - \dfrac{11}{(x+3)^2}\). Então:

\[
6\ln\lvert x+3\rvert + \frac{11}{x+3} + C.
\]
{{< /details >}}

**Exemplo 3.** \(\int \dfrac{-3}{(x^2+1)(x^2+4)}\,dx\)

{{< details title="Resolução" >}}
Observe que \((x^2+4)-(x^2+1) = 3\). Logo

\[
\frac{-3}{(x^2+1)(x^2+4)} = \frac{1}{x^2+4} - \frac{1}{x^2+1},
\]

e a integral é \(\tfrac12\operatorname{arctg}\tfrac{x}{2} - \operatorname{arctg} x + C\).
{{< /details >}}

**Exemplo 4.** \(\int \dfrac{1}{(x+1)(x-1)^2}\,dx\)

{{< details title="Resolução" >}}
Decomposição: \(\dfrac{A}{x+1}+\dfrac{B}{x-1}+\dfrac{C}{(x-1)^2}\). Multiplicando tudo:

\[
1 = A(x-1)^2 + B(x+1)(x-1) + C(x+1).
\]

- \(x=-1\): \(1 = 4A\), então \(A = \tfrac14\).
- \(x=1\): \(1 = 2C\), então \(C = \tfrac12\).
- \(x=0\): \(1 = A - B + C\), então \(B = -\tfrac14\).

\[
\tfrac14\ln\lvert x+1\rvert - \tfrac14\ln\lvert x-1\rvert - \frac{1}{2(x-1)} + C.
\]
{{< /details >}}

**Exemplo 5.** \(\int \dfrac{1}{(x^2+1)(x-1)}\,dx\)

{{< details title="Resolução" >}}
Decomposição: \(\dfrac{A}{x-1} + \dfrac{Bx+C}{x^2+1}\), então \(1 = A(x^2+1) + (Bx+C)(x-1)\).

- \(x=1\): \(A = \tfrac12\).
- Coeficiente de \(x^2\): \(A+B=0\), então \(B=-\tfrac12\).
- Termo constante: \(A - C = 1\), então \(C = -\tfrac12\).

A parcela com \(x^2+1\) se divide em \(\dfrac{x}{x^2+1}\) (dá \(\ln\)) e \(\dfrac{1}{x^2+1}\) (dá \(\operatorname{arctg}\)):

\[
\tfrac12\ln\lvert x-1\rvert - \tfrac14\ln(x^2+1) - \tfrac12\operatorname{arctg} x + C.
\]
{{< /details >}}

**Exemplo 6.** \(\int \dfrac{2x^3-4x^2-x-3}{x^2-2x-3}\,dx\)

{{< details title="Resolução" >}}
Divida: \(2x(x^2-2x-3) = 2x^3-4x^2-6x\), sobra o resto \(5x-3\). Então a fração é \(2x + \dfrac{5x-3}{x^2-2x-3}\).

O denominador fatora como \((x-3)(x+1)\), e \(\dfrac{5x-3}{(x-3)(x+1)} = \dfrac{A}{x-3} + \dfrac{B}{x+1}\) com \(A=3\) e \(B=2\). Logo:

\[
x^2 + 3\ln\lvert x-3\rvert + 2\ln\lvert x+1\rvert + C.
\]
{{< /details >}}
