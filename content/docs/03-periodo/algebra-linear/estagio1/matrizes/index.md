---
title: Matrizes
weight: 1
description: Definição, tipos e operações.
autores:
  - MateusSRocha
date: 2026-10-01
---

## Sobre

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

 Onde:

- \(A\): a matriz
- \(a_{ij}\): elemento da matriz, na linha \(i\) e coluna \(j\)
- \(m\): número de linhas
- \(n\): número de colunas
- \(i\): índice de linha
- \(j\): índice de coluna

Exemplo 1:

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

## Tipos de Matrizes

Fixemos uma matriz \(A = [a_{ij}]_{m \times n}\) onde \(m\) é o número de linhas e \(n\) é o número de colunas.

### Matriz Quadrada

Dizemos que \(A\) é uma matriz quadrada se \(m = n\). Neste caso, a ordem da matriz é \(n\).

Exemplo 2:

$$
A = \begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}
$$

A matriz \(A\) é quadrada de ordem \(3\).

$$ 
B = \begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
$$

A matriz \(B\) é quadrada de ordem \(2\).

### Matriz Nula

Dizemos que \(A\) é uma matriz nula se todos os elementos da matriz forem iguais a zero. Neste caso, escrevemos \(A = 0\).

Exemplo 3:

$$
0_{3 \times 5} = \begin{bmatrix}
0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0
\end{bmatrix}
$$

### Matriz Coluna

Dizemos que \(A\) é uma matriz coluna se \(n = 1\). Neste caso, a matriz tem apenas uma coluna.

Exemplo 4:

$$
A = \begin{bmatrix}
1 \\
2 \\
3
\end{bmatrix}
$$

### Matriz Linha

Dizemos que \(A\) é uma matriz linha se \(m = 1\). Neste caso, a matriz tem apenas uma linha.

Exemplo 5:

$$
A = \begin{bmatrix}
1 & 2 & 3
\end{bmatrix}
$$

### Matriz Diagonal

Dizemos que \(A\) é uma matriz diagonal se \(A\) for quadrada e todos os elementos fora da diagonal principal forem iguais a zero.

Exemplo 6:

$$
A = \begin{bmatrix}
1 & 0 & 0 \\
0 & 5 & 0 \\
0 & 0 & 9
\end{bmatrix}
$$

A matriz \(A\) é diagonal de ordem \(3\).

$$ 
B = \begin{bmatrix}
1 & 0 \\
0 & 4
\end{bmatrix}
$$

A matriz \(B\) é diagonal de ordem \(2\).

### Matriz Identidade

Dizemos que \(A\) é uma matriz identidade se \(A\) for diagonal e todos os elementos da diagonal principal forem iguais a \(1\).
Notação: A matriz identidade de ordem \(n\) é denotada por \(I_n\).

Exemplo 7:

$$ 
I = \begin{bmatrix}
1
\end{bmatrix}
$$

A matriz \(I\) é identidade de ordem \(1\).

$$ 
I = \begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix}
$$

A matriz \(I\) é identidade de ordem \(2\).

$$
I = \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

A matriz \(I\) é identidade de ordem \(3\).

### Matriz Triangular Superior

Dizemos que \(A\) é uma matriz triangular superior se \(A\) for quadrada e todos os elementos abaixo da diagonal principal forem iguais a zero.

Exemplo 8:

$$
A = \begin{bmatrix}
1 & 2 & 3 \\
0 & 5 & 6 \\
0 & 0 & 9
\end{bmatrix}
$$

A matriz \(A\) é triangular superior de ordem \(3\).

### Matriz Triangular Inferior

Dizemos que \(A\) é uma matriz triangular inferior se \(A\) for quadrada e todos os elementos acima da diagonal principal forem iguais a zero.

Exemplo 9:

$$
A = \begin{bmatrix}
1 & 0 & 0 \\
4 & 5 & 0 \\
7 & 8 & 9
\end{bmatrix}
$$

A matriz \(A\) é triangular inferior de ordem \(3\).

### Matriz Simétrica

Dizemos que \(A\) é uma matriz simétrica se \(A\) for quadrada e \(A = A^T\), ou seja, se a matriz for igual à sua transposta. Explicaremos a transposta de matrizes mais adiante. Em outras palavras, a matriz é simétrica se os elementos que estão em posições simétricas em relação à diagonal principal forem iguais. Por exemplo, \(a_{12} = a_{21}\), \(a_{13} = a_{31}\), \(a_{23} = a_{32}\), e assim por diante.

Exemplo 10:

$$
A = \begin{bmatrix}
1 & 2 & 3 \\
2 & 5 & 6 \\
3 & 6 & 9
\end{bmatrix}
$$

A matriz \(A\) é simétrica de ordem \(3\), pois \(a_{12} = a_{21} = 2\), \(a_{13} = a_{31} = 3\) e \(a_{23} = a_{32} = 6\).

## Operações com Matrizes

### Adição de Matrizes

A adição de matrizes de mesma ordem é feita somando-se os elementos correspondentes, isso é, somando-se os elementos que ocupam a mesma posição em cada matriz.

Exemplo 11:

Sejam as matrizes

$$
A = \begin{bmatrix}
1 & -1\\
4 & 0\\
2 & 5
\end{bmatrix}
\quad \text{e} \quad
B = \begin{bmatrix}
0 & 4 \\
-2 & 5 \\
1 & 0
\end{bmatrix}
$$

a matriz \(C = A + B\) é dada por:

$$
C = A + B = \begin{bmatrix}
1 + 0 & -1 + 4 \\
4 + (-2) & 0 + 5 \\
2 + 1 & 5 + 0
\end{bmatrix} =
\begin{bmatrix}
1 & 3 \\
2 & 5 \\
3 & 5
\end{bmatrix}
$$

> [!WARNING]
> Não podemos somar matriz de ordens diferentes. Por exemplo, não podemos somar uma matriz \(2 \times 3\) com uma matriz \(3 \times 2\).

> [!NOTE]
> Propriedades: Sejam \(A\), \(B\) e \(C\) matrizes de mesma ordem. Então:
> - \(A + B = B + A\) (comutativa)
> - \(A + (B + C) = (A + B) + C\) (associativa)
> - \(A + 0 = 0 + A = A\) (elemento neutro)

### Multiplicação por Escalar

Seja \(A = [a_{ij}]_{m \times n}\) uma matriz e \(k\) um número real. A multiplicação de \(A\) por \(k\) é a matriz \(B = kA\) obtida multiplicando-se cada elemento de \(A\) por \(k\), ou seja, \(b_{ij} = k \cdot a_{ij}\).

Exemplo 12:

Seja a matriz 

$$
A = \begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}
$$

e o escalar \(k = 2\). Então

$$
B = 2A = \begin{bmatrix}
2 \cdot 1 & 2 \cdot 2 & 2 \cdot 3 \\
2 \cdot 4 & 2 \cdot 5 & 2 \cdot 6 \\
2 \cdot 7 & 2 \cdot 8 & 2 \cdot 9
\end{bmatrix} = \begin{bmatrix}
2 & 4 & 6 \\
8 & 10 & 12 \\
14 & 16 & 18
\end{bmatrix}
$$

> [!NOTE]
> Propriedades: Sejam \(A\), \(B\) matrizes de mesma ordem e \(k\), \(l\) números reais. Então:
> - \(k(A + B) = kA + kB\) (distributiva)
> - \((k + l)A = kA + lA\) (distributiva)
> - \(0 \cdot A = 0\) (elemento nulo)
> - \(k(lA) = (kl)A\) (associativa)

### Transposição de Matrizes

Seja \(A = [a_{ij}]_{m \times n}\) uma matriz. A transposta de \(A\), denotada por \(A^T\), é a matriz obtida trocando-se as linhas por colunas, ou seja, \(A^T = [a_{ji}]_{n \times m}\).
Em outras palavras, a primeira coluna de \(A\) se torna a primeira linha de \(A^T\), a segunda coluna de \(A\) se torna a segunda linha de \(A^T\), e assim por diante.

Exemplo 13:

Seja a matriz

$$
A = \begin{bmatrix}
2 & 1 \\
0 & 1 \\
-1 & 4
\end{bmatrix}
$$

A transposta de \(A\) é a matriz

$$
A^T = \begin{bmatrix}
2 & 0 & -1 \\
1 & 1 & 4
\end{bmatrix}
$$

Outros Exemplos:

$$
B = \begin{bmatrix}
1 & 3 \\
3 & 2
\end{bmatrix} 
\quad \text{e} \quad
B^T = \begin{bmatrix}
1 & 3 \\
3 & 2
\end{bmatrix}
$$

$$
C = \begin{bmatrix}
1 \\
2 \end{bmatrix}
\quad \text{e} \quad
C^T = \begin{bmatrix}
1 & 2
\end{bmatrix}
$$

> [!NOTE]
> Propriedades: Sejam \(A\) e \(B\) matrizes de mesma ordem (\(m \times n\)) e \(k\) um número real. Então:
> - \((A + B)^T = A^T + B^T\)
> - \((kA)^T = kA^T\)
> - \((A^T)^T = A\)
> - \(A\) é simétrica se, e somente se, \(A = A^T\)

### Produto de Matrizes

Sejam \(A = [a_{ij}]_{m \times n}\) e \(B = [b_{ij}]_{r \times s}\) duas matrizes. O produto \(AB\) é definido multiplicando cada linha de \(A\) por cada coluna de \(B\). Veremos exemplos de como fazer isso mais adiante.

> [!WARNING]
> - O produto \(AB\) só é definido se o número de colunas de \(A\) for igual ao número de linhas de \(B\), ou seja, se \(n = r\).
> - Se \(A = [a_{ij}]_{m \times n}\) e \(B = [b_{ij}]_{r \times s}\), então \(AB = [c_{ij}]_{m \times s}\).
> - O elemento \(c_{ij}\) da matriz \(AB\) é obtido multiplicando-se os elementos da linha \(i\) de \(A\) pelos elementos da coluna \(j\) de \(B\) e somando-se os produtos obtidos.

Pense da seguinte forma:
Sejam as matrizes:

$$
A =
\begin{bmatrix}
a & b \\
c & d \\
e & f
\end{bmatrix}_{3 \times 2}
\quad \text{e} \quad
B = 
\begin{bmatrix}
g & h \\
i & j
\end{bmatrix}_{2 \times 2}
$$

Vemos que o número de colunas de \(A\) é igual ao número de linhas de \(B\), portanto o produto \(AB\) está definido. A matriz \(AB\) terá 3 linhas e 2 colunas, ou seja, será uma matriz \(3 \times 2\). Logo:

$$
AB = \begin{bmatrix}
ag + bi & ah + bj \\
cg + di & ch + dj \\
eg + fi & eh + fj
\end{bmatrix}_{3 \times 2}
$$

Multiplicamos a primeira linha de \(A \to [a, b]\) pela primeira coluna de \(B \to [g, i]\) e somamos os produtos obtidos: \(ag + bi\). Repetimos o processo para cada linha de \(A\) e cada coluna de \(B\).

Exemplo 14:

Sejam as matrizes

$$
A = \begin{bmatrix}
2 & 1 \\
4 & 2 \\
5 & 3 \\
\end{bmatrix}_{3 \times 2}
\quad \text{e} \quad
B = \begin{bmatrix}
1 & -1 \\
0 & 4 \\
\end{bmatrix}_{2 \times 2}
$$

Temos que,

$$
AB = \begin{bmatrix}
2 \cdot 1 + 1 \cdot 0 & 2 \cdot (-1) + 1 \cdot 4 \\
4 \cdot 1 + 2 \cdot 0 & 4 \cdot (-1) + 2 \cdot 4 \\
5 \cdot 1 + 3 \cdot 0 & 5 \cdot (-1) + 3 \cdot 4
\end{bmatrix} =
\begin{bmatrix}
2 & 2 \\
4 & 4 \\
5 & 7
\end{bmatrix}_{3 \times 2}
$$

> [!NOTE]
> Propriedades: Sejam \(A\), \(B\) e \(C\) matrizes de mesma ordem. Então:
> - \(IA = AI = A\) (I é matriz identidade que vimos anteriormente. I deve ter mesma ordem de \(A\))
>  \(A \cdot (B + C) = A \cdot B + A \cdot C\) (distributiva a direita)
> _ \((A + B) \cdot C = A \cdot C + B \cdot C\) (distributiva a esquerda)
> _ \((AB)C = A(BC)\) (associativa)
> _ \((AB)^T = B^T A^T\)
> _ \(0_{m \times n} \cdot A = A \cdot 0 = 0\) (0 é matriz nula de mesma ordem de \(A\))

> [!WARNING]
> \(AB \neq BA\) (Nem sempre, o produto de matrizes não é comutativo)

## Exercícios propostos

### Exercício 1

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
- \(a_{23} = 5 = b_{23}\)

Portanto \(A = B\).
{{< /details >}}

### Exercício 2

Seja:

$$
A = \begin{bmatrix}
4 & 9 & 16 \\
9 & 9 & 25 \\
16 & 25 & 36
\end{bmatrix}
$$

Quais os tipos de matrizes que \(A\) representa?

{{< details title="Gabarito" >}}
A matriz \(A\) é simétrica, pois \(a_{ij} = a_{ji}\) para todos \(i\) e \(j\). Além disso, \(A\) é uma matriz quadrada de ordem 3.
{{< /details >}}

### Exercício 3

Sejam as matrizes:

$$
A = \begin{bmatrix}
1 & 0 \\
-2 & 3 \\
5 & 4 \\
0 & 1
\end{bmatrix}_{4 \times 2} 
\quad \text{e} \quad
B = \begin{bmatrix}
0 & 6 & 1 \\
3 & 8 & -2
\end{bmatrix}_{2 \times 3} 
$$

Calcule \(AB\).

{{< details title="Gabarito" >}}
Note que o número de colunas de \(A\) é igual ao número de linhas de \(B\), portanto o produto \(AB\) está definido. A matriz \(AB\) terá 4 linhas e 3 colunas, ou seja, será uma matriz \(4 \times 3\). Logo:

$$
\begin{bmatrix}
1 & 0 \\
-2 & 3 \\
5 & 4 \\
0 & 1
\end{bmatrix}
\cdot
\begin{bmatrix}
0 & 6 & 1 \\
3 & 8 & -2
\end{bmatrix} =
\begin{bmatrix}
1 \cdot 0 + 0 \cdot 3 & 1 \cdot 6 + 0 \cdot 8 & 1 \cdot 1 + 0 \cdot (-2) \\
-2 \cdot 0 + 3 \cdot 3 & -2 \cdot 6 + 3 \cdot 8 & -2 \cdot 1 + 3 \cdot (-2) \\
5 \cdot 0 + 4 \cdot 3 & 5 \cdot 6 + 4 \cdot 8 & 5 \cdot 1 + 4 \cdot (-2) \\
0 \cdot 0 + 1 \cdot 3 & 0 \cdot 6 + 1 \cdot 8 & 0 \cdot 1 + 1 \cdot (-2)
\end{bmatrix} =
\begin{bmatrix}
0 & 6 & 1 \\
9 & 12 & -8 \\
12 & 62 & -3 \\
3 & 8 & -2
\end{bmatrix}_{4 \times 3}
$$
{{< /details >}}