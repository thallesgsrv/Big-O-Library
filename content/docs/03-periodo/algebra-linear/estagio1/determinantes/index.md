---
title: Determinantes
weight: 6
description: O que é o determinante, como calculá-lo (Sarrus, cofatores e escalonamento) e suas propriedades.
autores:
  - thallesgsrv
date: 2026-10-11
---

## Sobre

O **determinante** é um número associado a uma matriz **quadrada**. Escrevemos \(\det A\) ou \(|A|\).

Por que ele importa? Porque esse único número responde perguntas importantes sobre a matriz. A mais útil neste estágio:

> [!NOTE]
> \(A\) é **invertível** se, e somente se, \(\det A \neq 0\).

Um jeito de enxergar: o sistema \(AX = B\) tem **solução única** exatamente quando \(\det A \neq 0\). Se \(\det A = 0\), as equações são "dependentes" e o sistema ou não tem solução ou tem infinitas.

(Geometricamente, num sistema \(2 \times 2\), o determinante mede a "área" do paralelogramo formado pelas linhas da matriz. Área zero significa que as retas são paralelas ou iguais.)

## Determinante de ordem 1 e 2

Para uma matriz \(1 \times 1\), o determinante é o próprio número: \(\det [a] = a\).

Para uma matriz \(2 \times 2\):

$$
\det
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
= ad - bc
$$

Memorize como "**diagonal principal menos diagonal secundária**".

Exemplo 1:

$$
\det
\begin{bmatrix}
3 & 1 \\
2 & 5
\end{bmatrix}
= 3 \cdot 5 - 1 \cdot 2 = 13
$$

## Determinante de ordem 3: regra de Sarrus

Para matrizes \(3 \times 3\) existe um atalho visual. Repita as duas primeiras colunas à direita da matriz, some os produtos das **três diagonais que descem** e subtraia os produtos das **três diagonais que sobem**:

$$
\begin{array}{ccc|cc}
a_{11} & a_{12} & a_{13} & a_{11} & a_{12} \\
a_{21} & a_{22} & a_{23} & a_{21} & a_{22} \\
a_{31} & a_{32} & a_{33} & a_{31} & a_{32}
\end{array}
$$

$$
\det A = (a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32}) - (a_{13}a_{22}a_{31} + a_{11}a_{23}a_{32} + a_{12}a_{21}a_{33})
$$

Exemplo 2:

$$
A =
\begin{bmatrix}
2 & 1 & 3 \\
0 & 4 & 1 \\
1 & 2 & 5
\end{bmatrix}
$$

- Diagonais que descem: \(2 \cdot 4 \cdot 5 = 40\), \(1 \cdot 1 \cdot 1 = 1\), \(3 \cdot 0 \cdot 2 = 0\). Soma: \(41\).
- Diagonais que sobem: \(3 \cdot 4 \cdot 1 = 12\), \(2 \cdot 1 \cdot 2 = 4\), \(1 \cdot 0 \cdot 5 = 0\). Soma: \(16\).

$$
\det A = 41 - 16 = 25
$$

> [!WARNING]
> **Sarrus só funciona para matrizes \(3 \times 3\).** Para ordem 4 ou maior, use cofatores ou escalonamento.

## Menor, cofator e expansão de Laplace

Para matrizes maiores, o determinante é calculado **reduzindo** o problema a matrizes menores.

- O **menor** \(|A_{ij}|\) é o determinante da matriz que sobra ao **apagar a linha \(i\) e a coluna \(j\)** de \(A\).
- O **cofator** \(\Delta_{ij}\) é o menor com um sinal que depende da posição:

$$
\Delta_{ij} = (-1)^{i + j} \, |A_{ij}|
$$

O sinal \((-1)^{i+j}\) segue um "tabuleiro de xadrez":

$$
\begin{bmatrix}
{+} & - & + & - \\
{-} & + & - & + \\
{+} & - & + & - \\
{-} & + & - & +
\end{bmatrix}
$$

**Teorema de Laplace.** O determinante pode ser calculado **expandindo por qualquer linha ou coluna**: multiplica-se cada elemento dela pelo seu cofator e somam-se os resultados. Por exemplo, expandindo pela linha \(i\):

$$
\det A = a_{i1}\Delta_{i1} + a_{i2}\Delta_{i2} + \cdots + a_{in}\Delta_{in}
$$

> [!NOTE]
> **Truque que economiza muito trabalho:** escolha a linha ou coluna com **mais zeros**. Cada zero elimina uma parcela da soma.

Exemplo 3:

$$
A =
\begin{bmatrix}
2 & 0 & 1 \\
3 & 5 & -1 \\
1 & 0 & 4
\end{bmatrix}
$$

A coluna 2 tem dois zeros. Expandindo por ela, só sobra \(a_{22} = 5\):

$$
\det A = 5 \cdot \Delta_{22} = 5 \cdot (+1) \cdot
\det
\begin{bmatrix}
2 & 1 \\
1 & 4
\end{bmatrix}
= 5 \cdot (8 - 1) = 35
$$

(O sinal é \((-1)^{2+2} = +1\).)

## Propriedades que facilitam as contas

Seja \(A\) uma matriz quadrada de ordem \(n\).

> [!NOTE]
> **Efeito das operações elementares:**
> - Trocar duas linhas **muda o sinal** do determinante.
> - Multiplicar uma linha por \(k\) **multiplica** o determinante por \(k\).
> - Somar a uma linha um múltiplo de outra linha **não altera** o determinante.

> [!NOTE]
> **Casos em que o determinante é zero:**
> - Há uma linha (ou coluna) só de zeros.
> - Há duas linhas (ou colunas) iguais, ou uma múltipla da outra.

> [!NOTE]
> **Outras propriedades importantes:**
> - \(\det A^T = \det A\)
> - \(\det (AB) = \det A \cdot \det B\)
> - \(\det (kA) = k^n \det A\) (o \(k\) sai **\(n\) vezes**, uma por linha)
> - Se \(A\) é invertível, \(\det A^{-1} = \dfrac{1}{\det A}\)
> - Se \(A\) é **triangular** (superior, inferior ou diagonal), \(\det A\) é o **produto dos elementos da diagonal**.

> [!WARNING]
> **Armadilha clássica:** \(\det(A + B) \neq \det A + \det B\) em geral. O determinante respeita o produto, mas **não** a soma.
>
> Exemplo: com \(A = \begin{bmatrix} 2 & 1 \\ 3 & 4 \end{bmatrix}\) e \(B = \begin{bmatrix} 1 & 0 \\ 2 & 3 \end{bmatrix}\), temos \(\det A = 5\), \(\det B = 3\) e \(A + B = \begin{bmatrix} 3 & 1 \\ 5 & 7 \end{bmatrix}\), com \(\det(A + B) = 16 \neq 8\).

Exemplo 4 (triangular):

$$
\det
\begin{bmatrix}
3 & 0 & 0 \\
7 & 2 & 0 \\
1 & 5 & 4
\end{bmatrix}
= 3 \cdot 2 \cdot 4 = 24
$$

## Calculando determinantes grandes por escalonamento

Para ordem 4 ou mais, a expansão de Laplace é trabalhosa. O melhor caminho costuma ser **escalonar até ficar triangular**, lembrando o efeito de cada operação:

1. Trocas de linha: cada uma troca o sinal.
2. Somar múltiplo de outra linha: não muda nada (use à vontade).
3. No final, multiplique a diagonal.

Exemplo 5:

$$
A =
\begin{bmatrix}
1 & 2 & 0 & 1 \\
2 & 1 & 3 & 0 \\
0 & 1 & 1 & 2 \\
1 & 0 & 2 & 1
\end{bmatrix}
$$

Zeramos a coluna 1 abaixo do pivô (\(L_2 \to L_2 - 2L_1\) e \(L_4 \to L_4 - L_1\)); o determinante não muda:

$$
\begin{bmatrix}
1 & 2 & 0 & 1 \\
0 & -3 & 3 & -2 \\
0 & 1 & 1 & 2 \\
0 & -2 & 2 & 0
\end{bmatrix}
$$

Trocamos \(L_2 \leftrightarrow L_3\) para ter um 1 como pivô (**o sinal do determinante troca**, vamos lembrar disso):

$$
\begin{bmatrix}
1 & 2 & 0 & 1 \\
0 & 1 & 1 & 2 \\
0 & -3 & 3 & -2 \\
0 & -2 & 2 & 0
\end{bmatrix}
$$

Zeramos a coluna 2 abaixo do pivô (\(L_3 \to L_3 + 3L_2\) e \(L_4 \to L_4 + 2L_2\)):

$$
\begin{bmatrix}
1 & 2 & 0 & 1 \\
0 & 1 & 1 & 2 \\
0 & 0 & 6 & 4 \\
0 & 0 & 4 & 4
\end{bmatrix}
$$

Por fim \(L_4 \to L_4 - \tfrac{2}{3}L_3\) deixa o último elemento da diagonal igual a \(4 - \tfrac{2}{3} \cdot 4 = \tfrac{4}{3}\). A matriz é triangular, com diagonal \(1, 1, 6, \tfrac{4}{3}\), e o produto é \(1 \cdot 1 \cdot 6 \cdot \tfrac{4}{3} = 8\).

Como houve **uma** troca de linhas, o determinante original é

$$
\det A = -8
$$

> [!NOTE]
> **Para quem programa:** a expansão de Laplace faz da ordem de \(n!\) multiplicações, o que explode já com \(n = 15\) ou \(20\). O escalonamento faz da ordem de \(n^3\). É por isso que bibliotecas numéricas calculam determinantes por eliminação, não por cofatores.

## Determinante com parâmetro

Em provas é comum pedir os valores de \(t\) que anulam o determinante (ou seja, que tornam a matriz **não invertível**).

Exemplo 6:

$$
A =
\begin{bmatrix}
t & 2 \\
3 & t - 1
\end{bmatrix}
$$

\(\det A = t(t - 1) - 6 = t^2 - t - 6 = (t - 3)(t + 2)\). Logo \(\det A = 0\) quando \(t = 3\) ou \(t = -2\).

Exemplo 7 (triangular, sem conta alguma):

$$
A =
\begin{bmatrix}
t - 1 & 4 & 9 \\
0 & t + 2 & 7 \\
0 & 0 & t - 4
\end{bmatrix}
$$

A matriz é triangular superior, então \(\det A = (t - 1)(t + 2)(t - 4)\), que se anula em \(t \in \{1, -2, 4\}\).

## Resumo

- \(\det A \neq 0\) é o mesmo que \(A\) ser invertível.
- Ordem 2: \(ad - bc\). Ordem 3: Sarrus. Ordem maior: cofatores (escolha a linha com mais zeros) ou escalonamento.
- Triangular: produto da diagonal.
- Troca de linhas muda o sinal; somar múltiplo de linha não muda nada; multiplicar linha por \(k\) multiplica por \(k\).
- \(\det(AB) = \det A \det B\), mas \(\det(A + B) \neq \det A + \det B\).

## Exercícios propostos

### Exercício 1

Calcule \(\det \begin{bmatrix} 1 & 2 & 3 \\ 0 & 4 & 5 \\ 0 & 0 & 6 \end{bmatrix}\).

{{< details title="Gabarito" >}}
A matriz é triangular superior, então o determinante é o produto da diagonal: \(1 \cdot 4 \cdot 6 = 24\).
{{< /details >}}

### Exercício 2

Para quais valores de \(k\) a matriz \(\begin{bmatrix} k & 1 \\ 4 & k \end{bmatrix}\) **não** é invertível?

{{< details title="Gabarito" >}}
\(\det = k^2 - 4\). Ela não é invertível quando \(\det = 0\), isto é, \(k^2 = 4\), logo \(k = 2\) ou \(k = -2\).
{{< /details >}}

### Exercício 3

Sabendo que \(\det A = 5\) para uma matriz \(A\) de ordem 3, calcule \(\det(2A)\) e \(\det(A^T A)\).

{{< details title="Gabarito" >}}
- \(\det(2A) = 2^3 \cdot \det A = 8 \cdot 5 = 40\) (o fator 2 sai uma vez por linha, e são 3 linhas).
- \(\det(A^T A) = \det A^T \cdot \det A = 5 \cdot 5 = 25\).
{{< /details >}}
