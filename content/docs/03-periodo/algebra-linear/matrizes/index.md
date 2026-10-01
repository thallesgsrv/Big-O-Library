---
title: Matrizes
weight: 1
description: Tipos, operações, transposta, operações elementares e forma escada.
autores:
  - MateusSRocha
date: 2026-10-01
---

Uma matriz é um conjunto de números reais, dispostos em linhas e colunas, numa certa ordem, e colocados entre colchetes (ou parênteses).

## Forma

Representamos uma matriz com \(m\) linhas e \(n\) colunas, por:

$$
A = \begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}
= [a_{ij}]_{m \times n}
$$

### Onde:

- \(A\): a matriz
- \(a_{ij}\): elemento da matriz, na linha \(i\) e coluna \(j\)
- \(m\): número de linhas
- \(n\): número de colunas
- \(i\): índice de linha
- \(j\): índice de coluna

### Exemplo 1:

$$
A = \begin{bmatrix}
1 & 0 & -4 \\
4 & -3 & 2 
\end{bmatrix}
$$

Dizemos que \(A\) é uma matriz de ordem \(2 \times 3\). Neste caso, \(a_{13} = -4\) e \(a_{22} = -3\).

## Igualdade de Matrizes

Duas matrizes \(A = [a_{ij}]_{m \times n}\) e \(B = [b_{ij}]_{r \times s}\) são iguais quando:

- \(m = r\)
- \(n = s\)
- \(a_{ij} = b_{ij}, \forall i, j\)

Neste caso, escrevemos \(A = B\).

## Exercícios 1

Sejam as matrizes:

$$
A = \begin{bmatrix}
3^2 & 1 & \log 1 \\
2 & 2^2 & 5
\end{bmatrix}
\quad \text{e} \quad
B = \begin{bmatrix}
9 & \sin(90^\circ) & 0 \\
2 & 4 & 5
\end{bmatrix}
$$

Podemos afirmar que \(A = B\)?

{{< details title="Gabarito" >}}
Note que:

- As duas matrizes têm 2 linhas e 3 colunas.
- \(a_{11} = 3^2 = 9 = b_{11}\)
- \(a_{12} = 1 = \sin(90^\circ) = b_{12}\)
- \(a_{13} = \log 1 = 0 = b_{13}\)
- \(a_{21} = 2 = b_{21}\)
- \(a_{22} = 2^2 = 4 = b_{22}\)

Portanto \(A = B\).
{{< /details >}}



## Contribuição

Se você tiver materiais úteis deste algoritmo, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.