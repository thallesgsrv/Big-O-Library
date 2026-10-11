---
title: Escalonamento, Posto e Nulidade
weight: 4
description: Operações elementares, forma escada reduzida, posto e nulidade de uma matriz.
autores:
  - thallesgsrv
date: 2026-10-11
---

## Sobre

Para resolver um sistema como \(2x + 3y = 1\) e \(3x + 4y = 0\) você provavelmente já usou "somar uma equação na outra" para sumir com uma variável. O **escalonamento** é essa mesma ideia, feita de forma organizada e na **matriz ampliada**, sem ficar carregando \(x\), \(y\), \(z\) pelo caminho.

Esta página ensina a ferramenta (as operações e o resultado final, chamado de forma escada reduzida). Na próxima página usamos a ferramenta para resolver e classificar sistemas.

## Operações elementares sobre linhas

Existem só **três** movimentos permitidos. Todos preservam as soluções do sistema, porque cada um corresponde a algo que você faria com equações:

| Operação | Notação | O que significa nas equações |
| --- | --- | --- |
| Trocar duas linhas | \(L_i \leftrightarrow L_j\) | Mudar a ordem das equações |
| Multiplicar uma linha por \(k \neq 0\) | \(L_i \to kL_i\) | Multiplicar os dois lados de uma equação por \(k\) |
| Somar a uma linha um múltiplo de outra | \(L_i \to L_i + kL_j\) | Somar uma equação (multiplicada) em outra |

> [!WARNING]
> Na segunda operação, \(k\) **nunca pode ser zero**: multiplicar por zero apagaria a equação e perderia informação.

Duas matrizes são **linha equivalentes** quando uma se transforma na outra por uma sequência dessas operações. Escrevemos \(A \sim B\).

## Forma escada reduzida

O objetivo do escalonamento é chegar a uma matriz com cara de "escada", em que dá para **ler a resposta direto**. Uma matriz está na **forma escada reduzida** (ou "linha reduzida à forma escada") quando:

1. O primeiro elemento não nulo de cada linha não nula é **1**. Ele se chama **pivô**.
2. Em cada coluna que tem pivô, **todos os outros elementos são 0**.
3. As linhas **nulas** (só zeros) ficam **embaixo** das linhas não nulas.
4. Os pivôs andam para a **direita** conforme descemos: o pivô de uma linha fica numa coluna mais à direita que o da linha de cima.

Exemplos:

$$
\begin{bmatrix}
1 & 0 & 3 \\
0 & 1 & 2 \\
0 & 0 & 0
\end{bmatrix}
\quad \text{está na forma escada reduzida.}
$$

$$
\begin{bmatrix}
1 & 0 & 2 \\
0 & 2 & 0
\end{bmatrix}
\quad \text{não está: o pivô da linha 2 é 2, e não 1.}
$$

$$
\begin{bmatrix}
1 & 2 & 0 \\
0 & 0 & 1 \\
0 & 0 & 0
\end{bmatrix}
\quad \text{está: os pivôs estão nas colunas 1 e 3, e nada além deles aparece nessas colunas.}
$$

> [!NOTE]
> Toda matriz é linha equivalente a **uma única** matriz na forma escada reduzida. Por isso é seguro falar "a" forma escada reduzida de \(A\), mesmo que pessoas diferentes sigam caminhos diferentes nas contas.

## Passo a passo do escalonamento

Trabalhe **coluna por coluna**, da esquerda para a direita:

1. Escolha a coluna atual. Se o elemento do topo (da linha atual) for zero, **troque de linha** com alguma abaixo que não tenha zero ali.
2. Faça o pivô virar **1**, multiplicando a linha por um número.
3. **Zere** todos os outros elementos da coluna, somando múltiplos da linha do pivô nas demais (acima e abaixo).
4. Passe para a próxima coluna e para a próxima linha. Repita.

Exemplo 1:

Escalone

$$
A =
\begin{bmatrix}
0 & 2 & 4 \\
1 & 1 & 1 \\
2 & 4 & 7
\end{bmatrix}
$$

**Coluna 1.** O topo é 0, então trocamos \(L_1 \leftrightarrow L_2\):

$$
\begin{bmatrix}
1 & 1 & 1 \\
0 & 2 & 4 \\
2 & 4 & 7
\end{bmatrix}
$$

O pivô já é 1. Zeramos abaixo: \(L_3 \to L_3 - 2L_1\):

$$
\begin{bmatrix}
1 & 1 & 1 \\
0 & 2 & 4 \\
0 & 2 & 5
\end{bmatrix}
$$

**Coluna 2.** Pivô: \(L_2 \to \tfrac{1}{2}L_2\):

$$
\begin{bmatrix}
1 & 1 & 1 \\
0 & 1 & 2 \\
0 & 2 & 5
\end{bmatrix}
$$

Zeramos acima e abaixo: \(L_1 \to L_1 - L_2\) e \(L_3 \to L_3 - 2L_2\):

$$
\begin{bmatrix}
1 & 0 & -1 \\
0 & 1 & 2 \\
0 & 0 & 1
\end{bmatrix}
$$

**Coluna 3.** O pivô já é 1. Zeramos acima: \(L_1 \to L_1 + L_3\) e \(L_2 \to L_2 - 2L_3\):

$$
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

Chegamos à matriz identidade, que está na forma escada reduzida. Logo \(A\) é linha equivalente a \(I_3\).

> [!NOTE]
> **Dica de prova:** confira o resultado voltando algumas operações, ou verifique que cada pivô é 1 e sua coluna só tem zeros ao redor. A maior parte dos erros é um sinal trocado em alguma soma de linhas.

## Posto e nulidade

Depois de achar a forma escada reduzida \(B\) de uma matriz \(A\):

- **Posto** de \(A\), escrito \(\text{posto}(A)\): número de **linhas não nulas** de \(B\) (ou seja, de pivôs).
- **Nulidade** de \(A\), escrita \(\text{nul}(A)\): número de **colunas** de \(A\) menos o posto.

$$
\text{nul}(A) = (\text{número de colunas}) - \text{posto}(A)
$$

**Interpretação:** o posto conta quantas equações "realmente independentes" existem. Uma linha que vira zero era só uma repetição disfarçada das outras. A nulidade conta quantas variáveis ficam "sobrando", livres para assumirem qualquer valor (veremos isso na página de sistemas).

No Exemplo 1, \(A\) tem 3 colunas e a forma escada tem 3 pivôs. Então \(\text{posto}(A) = 3\) e \(\text{nul}(A) = 0\).

Exemplo 2:

Escalone

$$
A =
\begin{bmatrix}
1 & 2 & 3 \\
2 & 4 & 6 \\
1 & 0 & 1
\end{bmatrix}
$$

- \(L_2 \to L_2 - 2L_1\) e \(L_3 \to L_3 - L_1\):

$$
\begin{bmatrix}
1 & 2 & 3 \\
0 & 0 & 0 \\
0 & -2 & -2
\end{bmatrix}
$$

- A segunda coluna precisa de pivô e a linha 2 tem zero ali, então \(L_2 \leftrightarrow L_3\):

$$
\begin{bmatrix}
1 & 2 & 3 \\
0 & -2 & -2 \\
0 & 0 & 0
\end{bmatrix}
$$

- \(L_2 \to -\tfrac{1}{2}L_2\):

$$
\begin{bmatrix}
1 & 2 & 3 \\
0 & 1 & 1 \\
0 & 0 & 0
\end{bmatrix}
$$

- \(L_1 \to L_1 - 2L_2\):

$$
B =
\begin{bmatrix}
1 & 0 & 1 \\
0 & 1 & 1 \\
0 & 0 & 0
\end{bmatrix}
$$

Há 2 linhas não nulas, então \(\text{posto}(A) = 2\). Como \(A\) tem 3 colunas, \(\text{nul}(A) = 3 - 2 = 1\).

Repare que a linha 2 de \(A\) era o dobro da linha 1: era informação repetida, e o escalonamento a transformou em linha nula.

> [!WARNING]
> O posto nunca passa do menor entre o número de linhas e o de colunas. Se você encontrou posto 4 numa matriz \(3 \times 5\), há erro de conta.

## Resumo

- Três operações elementares: trocar linhas, multiplicar uma linha por \(k \neq 0\), somar múltiplo de uma linha em outra.
- Forma escada reduzida: pivôs iguais a 1, colunas dos pivôs com zeros, linhas nulas embaixo, pivôs andando para a direita.
- Posto = número de linhas não nulas na forma escada reduzida.
- Nulidade = número de colunas menos o posto.

## Exercícios propostos

### Exercício 1

Ache a forma escada reduzida de \(A = \begin{bmatrix} 1 & 2 \\ 3 & 6 \\ 2 & 4 \end{bmatrix}\) e determine posto e nulidade.

{{< details title="Gabarito" >}}
\(L_2 \to L_2 - 3L_1\) e \(L_3 \to L_3 - 2L_1\):

$$
\begin{bmatrix}
1 & 2 \\
0 & 0 \\
0 & 0
\end{bmatrix}
$$

Já está na forma escada reduzida. \(\text{posto}(A) = 1\) e, como há 2 colunas, \(\text{nul}(A) = 2 - 1 = 1\).
{{< /details >}}

### Exercício 2

Ache a forma escada reduzida de \(A = \begin{bmatrix} 1 & 0 & 2 \\ 2 & 1 & 5 \end{bmatrix}\) e determine posto e nulidade.

{{< details title="Gabarito" >}}
\(L_2 \to L_2 - 2L_1\):

$$
\begin{bmatrix}
1 & 0 & 2 \\
0 & 1 & 1
\end{bmatrix}
$$

Já está na forma escada reduzida (pivôs nas colunas 1 e 2). \(\text{posto}(A) = 2\) e \(\text{nul}(A) = 3 - 2 = 1\).
{{< /details >}}

### Exercício 3

A matriz \(\begin{bmatrix} 1 & 0 & 2 \\ 0 & 2 & 0 \end{bmatrix}\) está na forma escada reduzida? Justifique. Se não, corrija.

{{< details title="Gabarito" >}}
Não está, porque o pivô da segunda linha é 2 (a condição exige 1). Basta fazer \(L_2 \to \tfrac{1}{2}L_2\):

$$
\begin{bmatrix}
1 & 0 & 2 \\
0 & 1 & 0
\end{bmatrix}
$$

Agora sim: pivôs iguais a 1, e cada coluna de pivô só tem zeros fora dele.
{{< /details >}}
