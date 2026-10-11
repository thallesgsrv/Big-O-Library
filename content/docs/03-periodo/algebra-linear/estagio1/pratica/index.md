---
title: Matrizes na Prática
weight: 2
description: Matrizes dadas por fórmula, equações com matrizes e os erros mais comuns nas contas.
autores:
  - thallesgsrv
date: 2026-10-11
---

## Sobre

Na página anterior vimos **o que é** uma matriz e quais operações existem. Aqui vamos usar tudo isso para resolver os tipos de problema que mais aparecem em exercícios e provas:

1. montar uma matriz a partir de uma **fórmula** para \(a_{ij}\);
2. descobrir **incógnitas** dentro de matrizes iguais;
3. usar **simetria** para achar valores desconhecidos;
4. fazer **contas combinadas** (soma, escalar, transposta e produto);
5. entender por que \(AB \neq BA\).

## Matriz dada por uma fórmula (lei de formação)

Muitas vezes o enunciado não mostra a matriz, só uma regra para calcular cada elemento. Pense na matriz como uma **tabela de endereços**: o elemento \(a_{ij}\) mora na linha \(i\), coluna \(j\), e a fórmula diz qual número guardar naquele endereço.

**Receita:**

1. Desenhe uma tabela vazia com o tamanho pedido (\(m\) linhas e \(n\) colunas).
2. Vá casa por casa: troque \(i\) e \(j\) pelos números da linha e da coluna.
3. Se a fórmula tem vários casos (\(i = j\), \(i < j\), \(i > j\)), primeiro descubra em qual caso a casa se encaixa.

Exemplo 1:

Monte \(A = [a_{ij}]_{3 \times 3}\) tal que

$$
a_{ij} =
\begin{cases}
i^2, & \text{se } i = j \\
0, & \text{se } i < j \\
i + j, & \text{se } i > j
\end{cases}
$$

Casa por casa:

- Diagonal (\(i = j\)): \(a_{11} = 1^2 = 1\), \(a_{22} = 2^2 = 4\), \(a_{33} = 3^2 = 9\).
- Acima da diagonal (\(i < j\)): \(a_{12} = a_{13} = a_{23} = 0\).
- Abaixo da diagonal (\(i > j\)): \(a_{21} = 2 + 1 = 3\), \(a_{31} = 3 + 1 = 4\), \(a_{32} = 3 + 2 = 5\).

$$
A =
\begin{bmatrix}
1 & 0 & 0 \\
3 & 4 & 0 \\
4 & 5 & 9
\end{bmatrix}
$$

Como todos os elementos acima da diagonal são zero, \(A\) é **triangular inferior**.

> [!NOTE]
> **Como classificar a matriz depois de montá-la** (pergunte nesta ordem):
> - Tem o mesmo número de linhas e colunas? Se sim, é **quadrada**.
> - Só a diagonal é diferente de zero? **Diagonal**. Se a diagonal for toda 1, **identidade**.
> - Só zeros acima da diagonal? **Triangular inferior**. Só zeros abaixo? **Triangular superior**.
> - Vale \(a_{ij} = a_{ji}\) (espelhada na diagonal)? **Simétrica**.
>
> Uma mesma matriz pode ter mais de um nome. Uma matriz identidade, por exemplo, também é diagonal, triangular e simétrica.

Exemplo 2:

Para \(B = [b_{ij}]_{3 \times 3}\) com \(b_{ij} = i + j\):

$$
B =
\begin{bmatrix}
2 & 3 & 4 \\
3 & 4 & 5 \\
4 & 5 & 6
\end{bmatrix}
$$

Repare que \(b_{ij} = i + j = j + i = b_{ji}\), então \(B\) é **simétrica**. Sempre que a fórmula não muda ao trocar \(i\) por \(j\), a matriz é simétrica.

## Igualdade de matrizes com incógnitas

Lembre da definição: duas matrizes são iguais quando têm o **mesmo tamanho** e **todos os elementos correspondentes são iguais**. Isso transforma uma igualdade de matrizes em **várias equações comuns**, uma para cada casa.

Exemplo 3:

Ache \(x\) e \(y\) tais que

$$
\begin{bmatrix}
x + y & 4 \\
2 & x - y
\end{bmatrix} =
\begin{bmatrix}
6 & 4 \\
2 & 2
\end{bmatrix}
$$

Comparando casa por casa:

- Casa \((1,1)\): \(x + y = 6\)
- Casa \((1,2)\): \(4 = 4\) (nada a descobrir)
- Casa \((2,1)\): \(2 = 2\) (nada a descobrir)
- Casa \((2,2)\): \(x - y = 2\)

Somando as duas equações úteis: \(2x = 8\), logo \(x = 4\) e então \(y = 2\).

> [!WARNING]
> Se as matrizes tiverem tamanhos diferentes, **não existe** valor de incógnita que as torne iguais. Confira o tamanho antes de montar as equações.

## Simetria com incógnitas

\(A\) é simétrica quando \(A = A^T\), isto é, \(a_{ij} = a_{ji}\). Na prática: **o que está de um lado da diagonal tem que ser igual ao que está do outro**.

Exemplo 4:

Para quais valores de \(x\) a matriz abaixo é simétrica?

$$
A =
\begin{bmatrix}
1 & x^2 \\
4 & 2
\end{bmatrix}
$$

Só há um par de posições espelhadas: \(a_{12} = x^2\) e \(a_{21} = 4\). Precisamos de \(x^2 = 4\), então \(x = 2\) ou \(x = -2\).

## Contas combinadas

Ao misturar operações, siga a mesma ordem das contas com números: primeiro transposta e produto por escalar, depois produto de matrizes, por último soma e subtração.

Exemplo 5:

Com \(A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}\) e \(B = \begin{bmatrix} 0 & 1 \\ -1 & 2 \end{bmatrix}\), calcule \(3A - 2B\).

$$
3A - 2B =
\begin{bmatrix} 3 & 6 \\ 9 & 12 \end{bmatrix} -
\begin{bmatrix} 0 & 2 \\ -2 & 4 \end{bmatrix} =
\begin{bmatrix} 3 & 4 \\ 11 & 8 \end{bmatrix}
$$

> [!WARNING]
> **Erro número 1 em prova: sinal.** Ao subtrair \(-2\), a conta vira \(9 - (-2) = 11\), não \(7\). Escreva os parênteses.

## Por que \(AB \neq BA\)?

Com números, \(3 \cdot 5 = 5 \cdot 3\). Com matrizes isso **falha**. Uma imagem ajuda: pense em \(B\) como a ação "trocar as duas colunas de lugar". Fazer \(AB\) é aplicar essa troca depois de \(A\); fazer \(BA\) é aplicar antes. Em geral o resultado muda.

Exemplo 6:

$$
A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix},
\quad
B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}
$$

$$
AB = \begin{bmatrix} 2 & 1 \\ 4 & 3 \end{bmatrix}
\qquad \text{e} \qquad
BA = \begin{bmatrix} 3 & 4 \\ 1 & 2 \end{bmatrix}
$$

Multiplicar por \(B\) à direita trocou as **colunas** de \(A\); multiplicar por \(B\) à esquerda trocou as **linhas**. Resultados diferentes.

### Quando \(AB = BA\)? (incógnitas)

Às vezes o exercício pede valores para que as duas ordens deem o mesmo resultado.

Exemplo 7:

Dadas \(A = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}\) e \(B = \begin{bmatrix} 1 & x \\ y & 1 \end{bmatrix}\), ache \(x\) e \(y\) com \(AB = BA\).

$$
AB = \begin{bmatrix} 1 + 2y & x + 2 \\ y & 1 \end{bmatrix}
\qquad
BA = \begin{bmatrix} 1 & 2 + x \\ y & 2y + 1 \end{bmatrix}
$$

Igualando casa por casa:

- \(1 + 2y = 1\), logo \(y = 0\).
- \(x + 2 = 2 + x\): sempre verdadeira, **não restringe \(x\)**.
- \(y = y\): sempre verdadeira.
- \(1 = 2y + 1\), logo \(y = 0\): confirma a primeira.

Conclusão: \(y = 0\) e \(x\) pode ser **qualquer número real**.

## Checklist antes de multiplicar

1. Escreva o tamanho de cada matriz: \(A_{m \times n}\) e \(B_{r \times s}\).
2. Compare \(n\) com \(r\) (colunas de \(A\) com linhas de \(B\)). Se forem diferentes, o produto **não existe**.
3. Se forem iguais, o resultado tem tamanho \(m \times s\) (as pontas).
4. Cada elemento \(c_{ij}\) é **linha \(i\) de \(A\) vezes coluna \(j\) de \(B\)**, somando os produtos.

## Exercícios propostos

### Exercício 1

Monte \(A = [a_{ij}]_{3 \times 3}\) com \(a_{ij} = i + j\) se \(i \geq j\) e \(a_{ij} = 0\) se \(i < j\). Classifique a matriz.

{{< details title="Gabarito" >}}
Casa por casa: \(a_{11} = 2\), \(a_{21} = 3\), \(a_{22} = 4\), \(a_{31} = 4\), \(a_{32} = 5\), \(a_{33} = 6\), e zero acima da diagonal.

$$
A =
\begin{bmatrix}
2 & 0 & 0 \\
3 & 4 & 0 \\
4 & 5 & 6
\end{bmatrix}
$$

É quadrada de ordem 3 e **triangular inferior** (não é simétrica, pois \(a_{21} = 3 \neq 0 = a_{12}\)).
{{< /details >}}

### Exercício 2

Ache \(a\) e \(b\) tais que

$$
\begin{bmatrix} a + 2b & 1 \\ 0 & a - b \end{bmatrix} =
\begin{bmatrix} 7 & 1 \\ 0 & 1 \end{bmatrix}
$$

{{< details title="Gabarito" >}}
As casas úteis dão \(a + 2b = 7\) e \(a - b = 1\). Subtraindo a segunda da primeira: \(3b = 6\), então \(b = 2\) e \(a = 3\).

Conferindo: \(3 + 4 = 7\) e \(3 - 2 = 1\).
{{< /details >}}

### Exercício 3

Calcule \(AB\) e \(BA\) para \(A = \begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}\) e \(B = \begin{bmatrix} 1 & 0 \\ 1 & 1 \end{bmatrix}\). Elas comutam?

{{< details title="Gabarito" >}}
$$
AB = \begin{bmatrix} 2 & 1 \\ 1 & 1 \end{bmatrix}
\qquad
BA = \begin{bmatrix} 1 & 1 \\ 1 & 2 \end{bmatrix}
$$

Como \(AB \neq BA\), **não comutam**.
{{< /details >}}
