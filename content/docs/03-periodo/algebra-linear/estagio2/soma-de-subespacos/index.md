---
title: Soma de Subespaços
weight: 3
description: Como juntar dois subespaços em um só, e o que é a soma direta (decomposição única).
autores:
  - thallesgsrv
date: 2026-10-29
---

## Sobre

Na página anterior vimos que a **interseção** de subespaços é subespaço, mas a **união** não é. Então, se quisermos "juntar" dois subespaços \(U\) e \(W\) num só, o que fazemos?

A ideia é parar de empilhar os conjuntos lado a lado e passar a **somar vetores**: pegamos um vetor de \(U\), um vetor de \(W\) e somamos. O conjunto de todos os resultados possíveis é o **menor subespaço que contém \(U\) e \(W\)**.

## A soma

Sejam \(U\) e \(W\) subespaços de \(V\). A **soma** deles é

$$
U + W = \{\, u + w \;:\; u \in U \text{ e } w \in W \,\}.
$$

> [!NOTE]
> \(U + W\) **sempre é subespaço** de \(V\), e ele contém tanto \(U\) quanto \(W\) (porque dá para escolher \(w = 0\), ou \(u = 0\)).

**Por que é subespaço?** Vamos aos três passos:

1. \(0 = 0 + 0\), com \(0 \in U\) e \(0 \in W\). ✓
2. Se \(u_1 + w_1\) e \(u_2 + w_2\) estão em \(U + W\), a soma deles é \((u_1 + u_2) + (w_1 + w_2)\). Como \(u_1 + u_2 \in U\) e \(w_1 + w_2 \in W\), o resultado está em \(U + W\). ✓
3. \(\alpha(u + w) = \alpha u + \alpha w\), com \(\alpha u \in U\) e \(\alpha w \in W\). ✓

## Exemplos

**Exemplo 1.** Em \(\mathbb{R}^2\), seja \(U\) o eixo \(x\) e \(W\) o eixo \(y\):

$$
U = \{(x, 0)\}, \qquad W = \{(0, y)\}.
$$

Qualquer \((a, b)\) é igual a \((a, 0) + (0, b)\), então \(U + W = \mathbb{R}^2\). Os eixos, sozinhos, não formam subespaço, mas a soma deles forma.

**Exemplo 2.** Em \(\mathbb{R}^3\), seja \(U\) o eixo \(x\) e \(W\) o eixo \(y\):

$$
U = \{(x, 0, 0)\}, \qquad W = \{(0, y, 0)\}.
$$

A soma é o plano \(z = 0\), isto é, \(U + W = \{(x, y, 0)\}\).

**Exemplo 3.** Em \(\mathbb{R}^3\), sejam dois planos:

$$
U = \{(x, y, 0)\} \qquad\text{e}\qquad W = \{(0, y, z)\}.
$$

Dado \((a, b, c)\), escrevemos \((a, b, c) = (a, b, 0) + (0, 0, c)\), com o primeiro em \(U\) e o segundo em \(W\). Logo \(U + W = \mathbb{R}^3\).

> [!TIP]
> Geometricamente, dois planos distintos pela origem em \(\mathbb{R}^3\) sempre somam \(\mathbb{R}^3\): juntos eles "apontam" para todas as direções.

## Soma direta

O Exemplo 3 tem um detalhe incômodo. O vetor \((0, 1, 0)\) pode ser escrito de **duas formas** como "algo de \(U\) + algo de \(W\)":

$$
(0, 1, 0) = (0, 1, 0) + (0, 0, 0)
\qquad\text{e}\qquad
(0, 1, 0) = (0, 0, 0) + (0, 1, 0).
$$

Isso acontece porque \(U\) e \(W\) **têm vetores em comum** (o eixo \(y\) está nos dois). Quando isso não acontece, cada vetor da soma tem uma decomposição **única**, e dizemos que a soma é **direta**.

Dizemos que \(U + W\) é uma **soma direta**, e escrevemos \(U \oplus W\), quando

$$
U \cap W = \{0\}.
$$

**Teorema.** Se \(U \cap W = \{0\}\), então todo vetor de \(U + W\) se escreve de **uma única maneira** como \(u + w\) com \(u \in U\) e \(w \in W\).

**Por quê?** Suponha que \(v = u + w = u' + w'\), com \(u, u' \in U\) e \(w, w' \in W\). Passando termos de lado:

$$
u - u' = w' - w.
$$

O lado esquerdo está em \(U\) (diferença de vetores de \(U\)) e o lado direito está em \(W\). Então esse vetor está em \(U \cap W = \{0\}\), ou seja, é \(0\). Daí \(u = u'\) e \(w = w'\).

> [!NOTE]
> A soma direta é a forma "arrumada" de somar: sem repetição, sem ambiguidade. Vai ser útil quando falarmos de base e dimensão.

## Exemplos de soma direta

**Exemplo 4.** \(\mathbb{R}^2 = U \oplus W\), com \(U\) o eixo \(x\) e \(W\) o eixo \(y\): a interseção é só \((0, 0)\).

**Exemplo 5.** Em \(\mathbb{R}^2\), sejam duas retas:

$$
U = \{(x, y) : y = x\} \qquad\text{e}\qquad W = \{(x, y) : y = -x\}.
$$

Um ponto comum teria \(y = x\) e \(y = -x\), então \(x = y = 0\): a interseção é \(\{0\}\). Para decompor, por exemplo, \((3, 1)\), procuramos \((a, a) + (b, -b) = (3, 1)\):

$$
a + b = 3, \qquad a - b = 1 \;\Rightarrow\; a = 2, \; b = 1.
$$

Então \((3, 1) = (2, 2) + (1, -1)\), e essa é a **única** forma.

**Exemplo 6 (clássico).** Toda matriz quadrada é, de modo único, a soma de uma matriz **simétrica** com uma **antissimétrica** (aquelas com \(A^T = -A\)). Chamando \(S\) o subespaço das simétricas e \(K\) o das antissimétricas, vale \(M(n, n) = S \oplus K\).

A decomposição é dada por uma fórmula explícita:

$$
A = \underbrace{\frac{A + A^T}{2}}_{\text{simétrica}} + \underbrace{\frac{A - A^T}{2}}_{\text{antissimétrica}}.
$$

E a interseção é \(\{0\}\): se uma matriz é simétrica **e** antissimétrica, então \(A = A^T = -A\), logo \(2A = 0\) e \(A = 0\).

Por exemplo, com \(A = \begin{bmatrix} 1 & 2 \\ 4 & 3 \end{bmatrix}\):

$$
\frac{A + A^T}{2} = \begin{bmatrix} 1 & 3 \\ 3 & 3 \end{bmatrix}
\qquad\text{e}\qquad
\frac{A - A^T}{2} = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix},
$$

e a soma das duas devolve \(A\).

## Resumo

| Situação | O que acontece |
| --- | --- |
| \(U \cap W\) | Sempre é subespaço. |
| \(U \cup W\) | Em geral **não** é subespaço. |
| \(U + W\) | Sempre é subespaço: o menor que contém \(U\) e \(W\). |
| \(U \cap W = \{0\}\) | A soma é **direta** (\(U \oplus W\)): decomposição única. |

## Exercícios

**Exercício 1.** Seja \(U = \{(x, y, z) : z = 0\}\) e \(W = \{(x, y, z) : x = y = 0\}\). Mostre que \(\mathbb{R}^3 = U \oplus W\).

{{< details title="Gabarito" >}}
\(U\) é o plano \(xy\) e \(W\) é o eixo \(z\). Todo \((a, b, c) = (a, b, 0) + (0, 0, c)\), então \(U + W = \mathbb{R}^3\). Um vetor em \(U \cap W\) tem \(z = 0\) (por estar em \(U\)) e \(x = y = 0\) (por estar em \(W\)), então é \((0,0,0)\). Logo a soma é direta.
{{< /details >}}

**Exercício 2.** Decomponha \((5, 1)\) como soma de um vetor de \(U = \{(x, y) : y = x\}\) com um vetor de \(W = \{(x, y) : y = -x\}\).

{{< details title="Resolução" >}}
Procuramos \((a, a) + (b, -b) = (5, 1)\), isto é, \(a + b = 5\) e \(a - b = 1\). Somando as equações: \(2a = 6\), então \(a = 3\) e \(b = 2\). Assim \((5, 1) = (3, 3) + (2, -2)\).
{{< /details >}}

**Exercício 3.** Seja \(U = \{(x, y, 0)\}\) e \(W = \{(0, y, z)\}\) em \(\mathbb{R}^3\). A soma \(U + W\) é direta? Dê um vetor que se decomponha de duas formas.

{{< details title="Gabarito" >}}
Não é direta, porque \(U \cap W = \{(0, y, 0)\}\) (o eixo \(y\)) tem mais do que o vetor nulo. Um exemplo é \((0, 1, 0) = (0, 1, 0) + (0, 0, 0) = (0, 0, 0) + (0, 1, 0)\).
{{< /details >}}

**Exercício 4.** Decomponha \(A = \begin{bmatrix} 2 & 6 \\ 0 & 4 \end{bmatrix}\) como soma de uma matriz simétrica com uma antissimétrica.

{{< details title="Resolução" >}}
\(A^T = \begin{bmatrix} 2 & 0 \\ 6 & 4 \end{bmatrix}\). Então

$$
\frac{A + A^T}{2} = \begin{bmatrix} 2 & 3 \\ 3 & 4 \end{bmatrix}
\qquad\text{e}\qquad
\frac{A - A^T}{2} = \begin{bmatrix} 0 & 3 \\ -3 & 0 \end{bmatrix}.
$$

A primeira é simétrica, a segunda é antissimétrica, e a soma delas é \(A\).
{{< /details >}}

## Teste rápido

{{< quiz titulo="soma e soma direta" >}}

{{< questao >}}
Qual afirmação é **verdadeira** para subespaços \(U\) e \(W\) de \(V\)?

- [ ] \(U \cup W\) é sempre subespaço
- [ ] \(U + W\) só é subespaço quando \(U \cap W = \{0\}\)
- [x] \(U + W\) é sempre subespaço
- [ ] \(U \cap W\) nunca contém o vetor nulo
---
A soma \(U + W\) é sempre subespaço (é o menor que contém os dois). A união, em geral, não é; e a interseção sempre contém o vetor nulo, pois ele está nos dois subespaços.
{{< /questao >}}

{{< questao >}}
Se \(U \cap W = \{0\}\), o que isso garante?

- [ ] Que \(U + W = V\)
- [x] Que cada vetor de \(U + W\) se escreve de uma única forma como \(u + w\)
- [ ] Que \(U = \{0\}\) ou \(W = \{0\}\)
- [ ] Que \(U\) e \(W\) têm o mesmo tamanho
---
A soma direta garante a decomposição única, mas não garante que a soma seja o espaço inteiro. Por exemplo, dois eixos em \(\mathbb{R}^3\) têm interseção \(\{0\}\), mas somam só um plano.
{{< /questao >}}

{{< /quiz >}}
