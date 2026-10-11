---
title: Matriz Inversa
weight: 7
description: Quando uma matriz tem inversa e como calculá-la pela adjunta e por operações elementares.
autores:
  - thallesgsrv
date: 2026-10-11
---

## Sobre

Com números, "desfazer" uma multiplicação por \(5\) é multiplicar por \(\tfrac{1}{5}\), pois \(5 \cdot \tfrac{1}{5} = 1\). A **matriz inversa** faz o mesmo papel para matrizes: é a matriz que **desfaz** o efeito de \(A\).

O "1" das matrizes é a **matriz identidade** \(I\) (lembre que \(AI = IA = A\)). Então:

> Uma matriz quadrada \(A\) de ordem \(n\) é **invertível** se existe uma matriz \(B\), também de ordem \(n\), tal que
>
> $$AB = BA = I_n$$
>
> Neste caso \(B\) é única e se chama a **inversa** de \(A\), escrita \(A^{-1}\).

Por que isso importa? Se \(AX = B\) e \(A\) é invertível, multiplicamos os dois lados por \(A^{-1}\) e obtemos \(X = A^{-1}B\): o sistema fica resolvido.

> [!WARNING]
> \(A^{-1}\) **não** é \(\tfrac{1}{A}\) (não existe "dividir por matriz") e **não** é calcular o inverso de cada elemento. Para não confundir, lembre que \(A^{-1}\) é definida só pela propriedade \(AA^{-1} = A^{-1}A = I\).

## Quando existe a inversa?

Para matriz quadrada \(A\), as afirmações abaixo são **equivalentes** (todas verdadeiras ou todas falsas):

- \(A\) é invertível.
- \(\det A \neq 0\).
- \(A\) é linha equivalente à identidade \(I\).
- O sistema \(AX = 0\) só tem a solução trivial.
- \(\text{posto}(A) = n\).

Uma matriz não invertível é chamada de **singular**. Uma boa notícia: as páginas anteriores já deram as ferramentas para testar isso (determinante e escalonamento).

## Inversa de uma matriz 2×2

Para \(A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}\) com \(\det A = ad - bc \neq 0\):

$$
A^{-1} = \frac{1}{ad - bc}
\begin{bmatrix}
d & -b \\
-c & a
\end{bmatrix}
$$

Receita: **troque** os elementos da diagonal principal, **mude o sinal** dos da diagonal secundária e **divida** pelo determinante.

Exemplo 1:

$$
A =
\begin{bmatrix}
2 & 1 \\
5 & 3
\end{bmatrix}
\qquad
\det A = 6 - 5 = 1
$$

$$
A^{-1} =
\begin{bmatrix}
3 & -1 \\
-5 & 2
\end{bmatrix}
$$

Teste (sempre confira!):

$$
\begin{bmatrix} 2 & 1 \\ 5 & 3 \end{bmatrix}
\begin{bmatrix} 3 & -1 \\ -5 & 2 \end{bmatrix} =
\begin{bmatrix} 6 - 5 & -2 + 2 \\ 15 - 15 & -5 + 6 \end{bmatrix} =
\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}
$$

## Método 1: pela matriz adjunta

Esse método funciona para qualquer ordem.

1. Calcule \(\det A\). Se for zero, **pare**: não há inversa.
2. Monte a **matriz dos cofatores**, trocando cada elemento \(a_{ij}\) pelo cofator \(\Delta_{ij}\).
3. A **adjunta** de \(A\), \(\text{adj}\,A\), é a **transposta** da matriz dos cofatores.
4. Use a fórmula:

$$
A^{-1} = \frac{1}{\det A} \cdot \text{adj}\,A
$$

Exemplo 2:

$$
A =
\begin{bmatrix}
2 & 1 & 3 \\
0 & 1 & 4 \\
1 & 2 & 0
\end{bmatrix}
$$

**Cofatores** (lembre: \(\Delta_{ij} = (-1)^{i+j}\) vezes o determinante que sobra ao apagar a linha \(i\) e a coluna \(j\)):

- \(\Delta_{11} = +(0 - 8) = -8\)
- \(\Delta_{12} = -(0 - 4) = 4\)
- \(\Delta_{13} = +(0 - 1) = -1\)
- \(\Delta_{21} = -(0 - 6) = 6\)
- \(\Delta_{22} = +(0 - 3) = -3\)
- \(\Delta_{23} = -(4 - 1) = -3\)
- \(\Delta_{31} = +(4 - 3) = 1\)
- \(\Delta_{32} = -(8 - 0) = -8\)
- \(\Delta_{33} = +(2 - 0) = 2\)

Matriz dos cofatores e sua transposta (a adjunta):

$$
\begin{bmatrix}
-8 & 4 & -1 \\
6 & -3 & -3 \\
1 & -8 & 2
\end{bmatrix}
\quad \Longrightarrow \quad
\text{adj}\,A =
\begin{bmatrix}
-8 & 6 & 1 \\
4 & -3 & -8 \\
-1 & -3 & 2
\end{bmatrix}
$$

**Determinante** (expandindo pela linha 1): \(\det A = 2(-8) + 1(4) + 3(-1) = -15\).

**Inversa:**

$$
A^{-1} = \frac{1}{-15}
\begin{bmatrix}
-8 & 6 & 1 \\
4 & -3 & -8 \\
-1 & -3 & 2
\end{bmatrix} =
\begin{bmatrix}
\tfrac{8}{15} & -\tfrac{2}{5} & -\tfrac{1}{15} \\
-\tfrac{4}{15} & \tfrac{1}{5} & \tfrac{8}{15} \\
\tfrac{1}{15} & \tfrac{1}{5} & -\tfrac{2}{15}
\end{bmatrix}
$$

> [!WARNING]
> **Não esqueça de transpor.** A adjunta é a **transposta** da matriz de cofatores. Esquecer isso é o erro mais comum nesse método. Se o resultado falhar no teste \(AA^{-1} = I\), comece conferindo a transposição e os sinais do tabuleiro \(+ - +\).

## Método 2: por operações elementares (Gauss-Jordan)

Este é geralmente o mais rápido à mão para ordem 3 ou mais. A ideia: escreva \(A\) ao lado da identidade e aplique operações nas linhas até transformar \(A\) em \(I\). As **mesmas operações** transformam \(I\) em \(A^{-1}\):

$$
[A : I] \;\sim\; \cdots \;\sim\; [I : A^{-1}]
$$

Exemplo 3:

$$
A =
\begin{bmatrix}
1 & 0 & 2 \\
0 & 1 & 1 \\
1 & 1 & 0
\end{bmatrix}
$$

$$
\left[
\begin{array}{ccc|ccc}
1 & 0 & 2 & 1 & 0 & 0 \\
0 & 1 & 1 & 0 & 1 & 0 \\
1 & 1 & 0 & 0 & 0 & 1
\end{array}
\right]
$$

- \(L_3 \to L_3 - L_1\):

$$
\left[
\begin{array}{ccc|ccc}
1 & 0 & 2 & 1 & 0 & 0 \\
0 & 1 & 1 & 0 & 1 & 0 \\
0 & 1 & -2 & -1 & 0 & 1
\end{array}
\right]
$$

- \(L_3 \to L_3 - L_2\):

$$
\left[
\begin{array}{ccc|ccc}
1 & 0 & 2 & 1 & 0 & 0 \\
0 & 1 & 1 & 0 & 1 & 0 \\
0 & 0 & -3 & -1 & -1 & 1
\end{array}
\right]
$$

- \(L_3 \to -\tfrac{1}{3}L_3\):

$$
\left[
\begin{array}{ccc|ccc}
1 & 0 & 2 & 1 & 0 & 0 \\
0 & 1 & 1 & 0 & 1 & 0 \\
0 & 0 & 1 & \tfrac{1}{3} & \tfrac{1}{3} & -\tfrac{1}{3}
\end{array}
\right]
$$

- \(L_1 \to L_1 - 2L_3\) e \(L_2 \to L_2 - L_3\):

$$
\left[
\begin{array}{ccc|ccc}
1 & 0 & 0 & \tfrac{1}{3} & -\tfrac{2}{3} & \tfrac{2}{3} \\
0 & 1 & 0 & -\tfrac{1}{3} & \tfrac{2}{3} & \tfrac{1}{3} \\
0 & 0 & 1 & \tfrac{1}{3} & \tfrac{1}{3} & -\tfrac{1}{3}
\end{array}
\right]
$$

Logo:

$$
A^{-1} =
\begin{bmatrix}
\tfrac{1}{3} & -\tfrac{2}{3} & \tfrac{2}{3} \\
-\tfrac{1}{3} & \tfrac{2}{3} & \tfrac{1}{3} \\
\tfrac{1}{3} & \tfrac{1}{3} & -\tfrac{1}{3}
\end{bmatrix}
$$

> [!NOTE]
> **Se o lado esquerdo não conseguir virar \(I\)** (aparece uma linha de zeros), a matriz **não é invertível**. O método detecta isso sozinho, sem precisar calcular o determinante antes.

## Resolvendo um sistema com a inversa

Exemplo 4:

$$
\begin{cases}
2x + y = 4 \\
5x + 3y = 11
\end{cases}
\quad \Longleftrightarrow \quad
\underbrace{\begin{bmatrix} 2 & 1 \\ 5 & 3 \end{bmatrix}}_{A}
\begin{bmatrix} x \\ y \end{bmatrix} =
\begin{bmatrix} 4 \\ 11 \end{bmatrix}
$$

Pelo Exemplo 1, \(A^{-1} = \begin{bmatrix} 3 & -1 \\ -5 & 2 \end{bmatrix}\). Então

$$
X = A^{-1}B =
\begin{bmatrix} 3 & -1 \\ -5 & 2 \end{bmatrix}
\begin{bmatrix} 4 \\ 11 \end{bmatrix} =
\begin{bmatrix} 12 - 11 \\ -20 + 22 \end{bmatrix} =
\begin{bmatrix} 1 \\ 2 \end{bmatrix}
$$

ou seja, \(x = 1\) e \(y = 2\).

## Propriedades

Sejam \(A\) e \(B\) invertíveis de mesma ordem. Então:

> [!NOTE]
> - \((A^{-1})^{-1} = A\)
> - \((AB)^{-1} = B^{-1}A^{-1}\) (a **ordem inverte**)
> - \((A^T)^{-1} = (A^{-1})^T\)
> - \(\det A^{-1} = \dfrac{1}{\det A}\)

Para lembrar a ordem do produto: pense em **calçar meia e depois sapato**. Para desfazer, tira-se primeiro o sapato (a última ação) e depois a meia. Por isso \((AB)^{-1} = B^{-1}A^{-1}\).

## Existência com parâmetro

Exemplo 5:

Para quais valores de \(a\) a matriz \(\begin{bmatrix} 1 & 2 \\ 3 & a \end{bmatrix}\) é invertível?

\(\det = a - 6\). Ela é invertível exatamente quando \(a - 6 \neq 0\), isto é, para todo \(a \neq 6\).

## Resumo

- \(A^{-1}\) é a matriz com \(AA^{-1} = A^{-1}A = I\); só existe para quadradas com \(\det A \neq 0\).
- Ordem 2: troque a diagonal principal, mude o sinal da secundária, divida pelo determinante.
- Qualquer ordem: pela adjunta, \(A^{-1} = \frac{1}{\det A}\,\text{adj}\,A\), ou por escalonamento \([A : I] \sim [I : A^{-1}]\).
- \((AB)^{-1} = B^{-1}A^{-1}\).
- Sempre confira multiplicando \(A \cdot A^{-1}\).

## Exercícios propostos

### Exercício 1

Ache a inversa de \(A = \begin{bmatrix} 1 & 2 \\ 3 & 5 \end{bmatrix}\).

{{< details title="Gabarito" >}}
\(\det A = 5 - 6 = -1\). Pela fórmula:

$$
A^{-1} = \frac{1}{-1}
\begin{bmatrix}
5 & -2 \\
-3 & 1
\end{bmatrix} =
\begin{bmatrix}
-5 & 2 \\
3 & -1
\end{bmatrix}
$$

Teste: \(\begin{bmatrix} 1 & 2 \\ 3 & 5 \end{bmatrix}\begin{bmatrix} -5 & 2 \\ 3 & -1 \end{bmatrix} = \begin{bmatrix} -5 + 6 & 2 - 2 \\ -15 + 15 & 6 - 5 \end{bmatrix} = I\).
{{< /details >}}

### Exercício 2

Ache a inversa de \(D = \begin{bmatrix} 2 & 0 \\ 0 & 4 \end{bmatrix}\). Que padrão você nota para matrizes diagonais?

{{< details title="Gabarito" >}}
\(\det D = 8\), e a fórmula dá

$$
D^{-1} = \frac{1}{8}\begin{bmatrix} 4 & 0 \\ 0 & 2 \end{bmatrix} = \begin{bmatrix} \tfrac{1}{2} & 0 \\ 0 & \tfrac{1}{4} \end{bmatrix}
$$

Padrão: a inversa de uma matriz diagonal (com diagonal toda não nula) é a diagonal dos inversos de cada elemento.
{{< /details >}}

### Exercício 3

Mostre que \(A = \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}\) não é invertível de duas formas diferentes.

{{< details title="Gabarito" >}}
- **Por determinante:** \(\det A = 4 - 4 = 0\).
- **Por escalonamento:** \(L_2 \to L_2 - 2L_1\) dá \(\begin{bmatrix} 1 & 2 \\ 0 & 0 \end{bmatrix}\), com uma linha nula. Não dá para chegar na identidade (o posto é 1, menor que 2).

As duas conclusões coincidem: \(A\) é singular.
{{< /details >}}
