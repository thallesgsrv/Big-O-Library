---
title: Sistemas Lineares e Matrizes
weight: 2
description: Sistemas de equações lineares, matrizes e operações elementares.
autores:
  - MateusSRocha
date: 2026-10-01
---

Um sistema de equações lineares é um conjunto de equações lineares que envolvem as mesmas variáveis. A solução de um sistema de equações lineares é o conjunto de valores das variáveis que satisfazem todas as equações simultaneamente. Forma:

$$
\star = \begin{cases}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m
\end{cases}
$$

Onde \(a_{ij}\) são os coeficientes das variáveis \(x_j\), \(b_i\) são os termos constantes, \(m\) é o número de equações e \(n\) é o número de variáveis.

> [!NOTE]
> 1. Uma solução do sistema ((\star)) é um conjunto de valores para \(x_1, x_2, \ldots, x_n\) que satisfaz todas as equações simultaneamente, ou seja, substituindo esses valores nas equações, todas as equações se tornam verdadeiras.
> Também podemos escrever uma solução do sistema na forma de um vetor coluna:
> $$
> \vec{x} = \begin{bmatrix}
> x_1 \\
> x_2 \\
> \vdots \\
> x_n
> \end{bmatrix}
> $$
> 
> 2. Dois sistemas de equações lineares são equivalentes se tiverem o mesmo conjunto de soluções. Isso significa que qualquer solução de um sistema também é uma solução do outro sistema, e vice-versa.

### Sistemas e Matrizes
Podemos representar o sistema (\star) na forma matricial como \(AX = B\), onde:
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
 =
 \begin{bmatrix}
 b_1 \\
 b_2 \\
 \vdots \\
 b_m
 \end{bmatrix}
 $$
 Onde: 
 - \(A\) é a matriz dos coeficientes
 - \(X\) é o vetor das variáveis
 - \(B\) é o vetor dos termos constantes.
 - A matriz ampliada do sistema é obtida adicionando o vetor \(B\) como uma coluna adicional à matriz \(A\), formando a matriz \([A : B]\):
$$
[A : B] = \begin{bmatrix}
 a_{11} & a_{12} & \cdots & a_{1n} & b_1 \\
 a_{21} & a_{22} & \cdots & a_{2n} & b_2 \\
 \vdots & \vdots & \ddots & \vdots & \vdots \\
 a_{m1} & a_{m2} & \cdots & a_{mn} & b_m
 \end{bmatrix}
 $$