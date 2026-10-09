---
title: Sistemas Lineares e Matrizes
weight: 2
description: Sistemas de equações lineares e sua representação por matrizes.
autores:
  - MateusSRocha
date: 2026-10-01
---

## Sobre

Muitos problemas, de física, economia ou computação, acabam em várias equações que precisam ser verdadeiras **ao mesmo tempo**. Este é o assunto de um sistema linear. Aqui vemos o que ele é, como escrevê-lo em forma de matriz e como conferir se um valor é solução.

## Sistema de equações lineares

Uma equação é **linear** quando as variáveis aparecem só multiplicadas por números e somadas, sem potências, raízes ou produtos entre variáveis. Por exemplo, \(2x + 3y = 1\) é linear, mas \(x^2 + y = 1\) e \(xy = 1\) não são.

Um **sistema linear** é um conjunto de equações lineares com as mesmas variáveis. A forma geral, com \(m\) equações e \(n\) variáveis, é:

$$
(S) \quad
\begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m
\end{cases}
$$

Cada letra tem um papel:

- \(x_1, x_2, \ldots, x_n\) são as **variáveis** (as incógnitas).
- \(a_{ij}\) é o **coeficiente** da variável \(x_j\) na equação \(i\).
- \(b_i\) é o **termo constante** da equação \(i\).
- \(m\) é o número de equações e \(n\) é o número de variáveis.

## Solução de um sistema

Uma **solução** de \((S)\) é um conjunto de valores para \(x_1, x_2, \ldots, x_n\) que torna **todas** as equações verdadeiras ao mesmo tempo. Para conferir, basta substituir os valores em cada equação.

Também podemos escrever a solução como um vetor coluna:

$$
\vec{x} =
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix}
$$

Dois sistemas são **equivalentes** quando têm exatamente as mesmas soluções: tudo que resolve um também resolve o outro, e vice-versa.

## Forma matricial

Em vez de escrever as equações uma a uma, podemos juntar os coeficientes numa tabela. O sistema \((S)\) vira o produto de matrizes \(AX = B\):

$$
A \cdot X = B
$$

Escrevendo cada matriz por extenso:

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
\cdot
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix}
\; = \;
\begin{bmatrix}
b_1 \\
b_2 \\
\vdots \\
b_m
\end{bmatrix}
$$

- \(A\) é a **matriz dos coeficientes**.
- \(X\) é o **vetor das variáveis**.
- \(B\) é o **vetor dos termos constantes**.

### Matriz ampliada

A **matriz ampliada** do sistema junta \(A\) e \(B\) numa só tabela, com \(B\) como última coluna. Ela é escrita \([A : B]\):

$$
[A : B] =
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} & b_1 \\
a_{21} & a_{22} & \cdots & a_{2n} & b_2 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} & b_m
\end{bmatrix}
$$

Ela guarda toda a informação do sistema sem repetir as variáveis, e é com ela que se resolvem sistemas na prática.

## Exemplo

Considere o sistema:

$$
(S) \quad
\begin{cases}
2x + 3y = 1 \\
3x + 4y = 0
\end{cases}
$$

São duas equações e duas variáveis (\(x\) e \(y\)). Identificando cada parte:

**Matriz dos coeficientes:**

$$
A =
\begin{bmatrix}
2 & 3 \\
3 & 4
\end{bmatrix}
$$

**Vetor das variáveis:**

$$
X =
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$

**Vetor dos termos constantes:**

$$
B =
\begin{bmatrix}
1 \\
0
\end{bmatrix}
$$

**Matriz ampliada:**

$$
[A : B] =
\begin{bmatrix}
2 & 3 & 1 \\
3 & 4 & 0
\end{bmatrix}
$$

### Conferindo uma solução

O par \((x, y) = (-4, 3)\) é solução de \((S)\). Substituindo nas equações:

1. Primeira equação: \(2(-4) + 3(3) = -8 + 9 = 1\). Verdadeira.
2. Segunda equação: \(3(-4) + 4(3) = -12 + 12 = 0\). Verdadeira.

As duas se verificam, então \((-4, 3)\) é solução. Em forma de vetor:

$$
X =
\begin{bmatrix}
-4 \\
3
\end{bmatrix}
$$

## Resumo

- Um sistema linear é um conjunto de equações lineares nas mesmas variáveis.
- Uma solução precisa satisfazer **todas** as equações ao mesmo tempo.
- O sistema se escreve como \(AX = B\), com \(A\) (coeficientes), \(X\) (variáveis) e \(B\) (constantes).
- A matriz ampliada \([A : B]\) resume o sistema numa única tabela.