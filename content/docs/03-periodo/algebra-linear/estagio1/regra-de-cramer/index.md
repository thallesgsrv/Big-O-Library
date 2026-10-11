---
title: Regra de Cramer
weight: 8
description: Resolvendo sistemas lineares com determinantes, e quando usar cada método.
autores:
  - thallesgsrv
date: 2026-10-11
---

## Sobre

A **Regra de Cramer** resolve um sistema linear usando só determinantes, sem escalonar. Ela vale quando o sistema tem **o mesmo número de equações e de variáveis** (matriz \(A\) quadrada) e \(\det A \neq 0\).

## A regra

Considere \(AX = B\), com \(A\) quadrada de ordem \(n\) e \(\det A \neq 0\). Para cada variável \(x_i\):

$$
x_i = \frac{\det A_i}{\det A}
$$

onde \(A_i\) é a matriz obtida de \(A\) **trocando a coluna \(i\) pela coluna \(B\)** dos termos constantes.

Em palavras: o denominador é sempre o mesmo, \(\det A\). O numerador é o determinante da matriz em que a coluna da variável que você quer foi substituída pelos termos constantes.

> [!NOTE]
> Quando \(\det A \neq 0\), o sistema é possível e determinado, e a Regra de Cramer entrega a única solução.

## Exemplo com duas variáveis

Exemplo 1:

$$
\begin{cases}
2x + y = 5 \\
x - y = 1
\end{cases}
$$

$$
A = \begin{bmatrix} 2 & 1 \\ 1 & -1 \end{bmatrix},
\qquad
B = \begin{bmatrix} 5 \\ 1 \end{bmatrix}
$$

- \(\det A = -2 - 1 = -3\) (diferente de zero, podemos usar a regra).
- \(A_1\) (coluna 1 trocada por \(B\)): \(\det \begin{bmatrix} 5 & 1 \\ 1 & -1 \end{bmatrix} = -5 - 1 = -6\).
- \(A_2\) (coluna 2 trocada por \(B\)): \(\det \begin{bmatrix} 2 & 5 \\ 1 & 1 \end{bmatrix} = 2 - 5 = -3\).

$$
x = \frac{-6}{-3} = 2, \qquad y = \frac{-3}{-3} = 1
$$

Teste: \(2 \cdot 2 + 1 = 5\) e \(2 - 1 = 1\). Correto.

## Exemplo com três variáveis

Exemplo 2:

$$
\begin{cases}
x + y + z = 6 \\
2x + y - z = 1 \\
x - y + 2z = 5
\end{cases}
$$

$$
A =
\begin{bmatrix}
1 & 1 & 1 \\
2 & 1 & -1 \\
1 & -1 & 2
\end{bmatrix},
\qquad
B =
\begin{bmatrix}
6 \\ 1 \\ 5
\end{bmatrix}
$$

**Determinante de \(A\)** (Sarrus): diagonais que descem \(1 \cdot 1 \cdot 2 + 1 \cdot (-1) \cdot 1 + 1 \cdot 2 \cdot (-1) = 2 - 1 - 2 = -1\); diagonais que sobem \(1 \cdot 1 \cdot 1 + 1 \cdot (-1) \cdot (-1) + 1 \cdot 2 \cdot 2 = 1 + 1 + 4 = 6\). Logo \(\det A = -1 - 6 = -7\).

**Troque cada coluna por \(B\):**

$$
\det A_1 = \det
\begin{bmatrix}
6 & 1 & 1 \\
1 & 1 & -1 \\
5 & -1 & 2
\end{bmatrix}
= -7
\qquad
\det A_2 = \det
\begin{bmatrix}
1 & 6 & 1 \\
2 & 1 & -1 \\
1 & 5 & 2
\end{bmatrix}
= -14
$$

$$
\det A_3 = \det
\begin{bmatrix}
1 & 1 & 6 \\
2 & 1 & 1 \\
1 & -1 & 5
\end{bmatrix}
= -21
$$

**Solução:**

$$
x = \frac{-7}{-7} = 1, \qquad y = \frac{-14}{-7} = 2, \qquad z = \frac{-21}{-7} = 3
$$

Teste na primeira equação: \(1 + 2 + 3 = 6\). Na segunda: \(2 + 2 - 3 = 1\). Na terceira: \(1 - 2 + 6 = 5\). Tudo certo.

## Cuidados

> [!WARNING]
> **Se \(\det A = 0\), a Regra de Cramer não se aplica** (dividiria por zero). Isso **não** diz se o sistema é impossível ou indeterminado: para decidir, escalone a matriz ampliada.

> [!WARNING]
> **Arrume o sistema antes.** Alguns exercícios trazem equações bagunçadas (variáveis dos dois lados, termos fora de ordem). Passe tudo para a forma \(a_1x + a_2y + a_3z = b\), com as variáveis na mesma ordem em todas as equações, antes de montar \(A\).
>
> Por exemplo, \(2x + 3y = z + 1\) vira \(2x + 3y - z = 1\).

## Qual método usar?

| Situação | Melhor escolha |
| --- | --- |
| Sistema \(2 \times 2\) ou \(3 \times 3\) com \(\det A \neq 0\) | Cramer funciona bem; escalonamento também |
| Mais equações que variáveis, ou menos | Escalonamento (Cramer exige matriz quadrada) |
| Precisa classificar (SPD, SPI, SI) | Escalonamento |
| \(\det A = 0\) | Escalonamento |
| Mesma matriz \(A\), vários vetores \(B\) | Calcular \(A^{-1}\) uma vez e usar \(X = A^{-1}B\) |
| Sistema grande (computador) | Eliminação de Gauss; Cramer é caro |

> [!NOTE]
> **Para quem programa:** Cramer pede \(n + 1\) determinantes de ordem \(n\). Se cada um for calculado por cofatores (da ordem de \(n!\) operações), o custo é astronômico para \(n\) grande. A eliminação de Gauss resolve o mesmo sistema com da ordem de \(n^3\) operações. Cramer é elegante e ótimo para teoria e contas pequenas, mas ninguém o usa em sistemas grandes.

## Comparando os métodos no mesmo sistema

Considere

$$
\begin{cases}
x + y = 3 \\
x - y = 1
\end{cases}
$$

- **Por escalonamento:** \(\begin{bmatrix} 1 & 1 & 3 \\ 1 & -1 & 1 \end{bmatrix} \sim \begin{bmatrix} 1 & 0 & 2 \\ 0 & 1 & 1 \end{bmatrix}\), logo \((2, 1)\).
- **Por Cramer:** \(\det A = -2\), \(x = \dfrac{-4}{-2} = 2\), \(y = \dfrac{-2}{-2} = 1\).
- **Pela inversa:** \(A^{-1} = \dfrac{1}{-2}\begin{bmatrix} -1 & -1 \\ -1 & 1 \end{bmatrix}\) e \(X = A^{-1}\begin{bmatrix} 3 \\ 1 \end{bmatrix} = \begin{bmatrix} 2 \\ 1 \end{bmatrix}\).

Os três chegam à mesma resposta. Na prova, escolha o que você tem mais confiança em executar sem erro.

## Resumo

- Vale para sistemas \(n \times n\) com \(\det A \neq 0\).
- \(x_i = \dfrac{\det A_i}{\det A}\), onde \(A_i\) é \(A\) com a coluna \(i\) trocada por \(B\).
- Se \(\det A = 0\), use escalonamento.
- Arrume as equações (variáveis alinhadas, constantes à direita) antes de começar.

## Exercícios propostos

### Exercício 1

Resolva por Cramer:

$$
\begin{cases}
x + y = 3 \\
x - y = 1
\end{cases}
$$

{{< details title="Gabarito" >}}
\(\det A = -2\). \(\det A_1 = \det\begin{bmatrix} 3 & 1 \\ 1 & -1 \end{bmatrix} = -4\) e \(\det A_2 = \det\begin{bmatrix} 1 & 3 \\ 1 & 1 \end{bmatrix} = -2\).

Logo \(x = \dfrac{-4}{-2} = 2\) e \(y = \dfrac{-2}{-2} = 1\), isto é, \((2, 1)\).
{{< /details >}}

### Exercício 2

Dá para usar Cramer em \(\begin{cases} 2x + y = 4 \\ 4x + 2y = 8 \end{cases}\)? O que fazer?

{{< details title="Gabarito" >}}
\(\det A = 4 - 4 = 0\), então **não** dá para usar Cramer. Escalonando:

$$
\begin{bmatrix}
2 & 1 & 4 \\
4 & 2 & 8
\end{bmatrix}
\sim
\begin{bmatrix}
1 & \tfrac{1}{2} & 2 \\
0 & 0 & 0
\end{bmatrix}
$$

Há uma variável livre: o sistema é **possível e indeterminado**, com \(y = \lambda\) e \(x = 2 - \tfrac{\lambda}{2}\).
{{< /details >}}

### Exercício 3

Escreva o sistema \(\begin{cases} 2x + 3y = z + 1 \\ x + y + z = 4 \\ 3x - y = 2 \end{cases}\) na forma \(AX = B\) pronta para Cramer.

{{< details title="Gabarito" >}}
Passando o \(z\) da primeira equação para o lado esquerdo: \(2x + 3y - z = 1\). Então

$$
\begin{bmatrix}
2 & 3 & -1 \\
1 & 1 & 1 \\
3 & -1 & 0
\end{bmatrix}
\begin{bmatrix}
x \\ y \\ z
\end{bmatrix} =
\begin{bmatrix}
1 \\ 4 \\ 2
\end{bmatrix}
$$

(Na terceira equação, o coeficiente de \(z\) é \(0\); é importante escrever esse zero na matriz.)
{{< /details >}}
