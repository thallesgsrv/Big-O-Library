---
title: Base e Dimensão
weight: 6
description: A lista enxuta que gera tudo, o conceito de dimensão e os atalhos para decidir se uma lista é base.
autores:
  - thallesgsrv
date: 2026-10-29
---

## Sobre

Das duas páginas anteriores, ficamos com duas ideias que puxam em direções opostas:

- **Gerar** quer vetores **suficientes**: poucos demais e não alcançamos tudo.
- **Ser LI** quer vetores **sem sobra**: demais e aparece redundância.

Uma **base** é o ponto de equilíbrio: **nem falta, nem sobra**. É a lista mais enxuta que ainda gera o espaço todo.

## Definição

Seja \(V\) um espaço vetorial. Uma lista \(B = \{v_1, \ldots, v_n\}\) de vetores de \(V\) é uma **base** de \(V\) quando:

1. \(B\) é **LI**; e
2. \(B\) **gera** \(V\), isto é, \([v_1, \ldots, v_n] = V\).

**Por que as duas condições?**

- Só gerar não basta: a lista \((1, 0), (0, 1), (1, 1)\) gera \(\mathbb{R}^2\), mas tem sobra.
- Só ser LI não basta: a lista \((1, 0)\) é LI, mas não gera \(\mathbb{R}^2\); falta cobrir a direção vertical.

**O grande benefício de uma base:** todo vetor de \(V\) se escreve de **uma única maneira** como combinação dos vetores da base.

**Por quê?** Existir uma maneira vem de a base gerar \(V\). Para ver que é única, suponha

$$
v = a_1 v_1 + \cdots + a_n v_n = b_1 v_1 + \cdots + b_n v_n.
$$

Subtraindo, \((a_1 - b_1) v_1 + \cdots + (a_n - b_n) v_n = 0\). Como a base é LI, todos os coeficientes são zero, então \(a_i = b_i\) para todo \(i\).

Esses coeficientes únicos serão as **coordenadas** de \(v\), que é o assunto da próxima página.

## As bases canônicas

Cada espaço que já conhecemos tem uma base "de fábrica", chamada de **base canônica**:

| Espaço | Base canônica | Quantos vetores |
| --- | --- | --- |
| \(\mathbb{R}^2\) | \((1, 0),\ (0, 1)\) | 2 |
| \(\mathbb{R}^3\) | \((1, 0, 0),\ (0, 1, 0),\ (0, 0, 1)\) | 3 |
| \(\mathbb{R}^n\) | \(e_1, e_2, \ldots, e_n\) (com \(1\) na posição \(i\) e \(0\) no resto) | \(n\) |
| \(M(2, 2)\) | \(E_{11},\ E_{12},\ E_{21},\ E_{22}\) | 4 |
| \(M(m, n)\) | as \(m \cdot n\) matrizes com um único \(1\) | \(mn\) |
| \(P_2\) | \(1,\ x,\ x^2\) | 3 |
| \(P_n\) | \(1,\ x,\ x^2,\ \ldots,\ x^n\) | \(n + 1\) |

Mas **não existe uma base só**. Uma base é uma *escolha de eixos*, e podemos escolher outros. Por exemplo, \((1, 1)\) e \((1, -1)\) formam uma base de \(\mathbb{R}^2\): geram (visto na página de geradores) e são LI (um não é múltiplo do outro).

**Exemplos de listas que NÃO são base de \(\mathbb{R}^2\):**

- \((1, 2)\) e \((2, 4)\): são LD.
- \((1, 0)\): é LI, mas não gera.
- \((1, 0), (0, 1), (1, 1)\): geram, mas são LD.

## Dimensão

Aqui vem um fato que parece simples, mas é um teorema importante:

> [!IMPORTANT]
> **Teorema.** Se um espaço vetorial \(V\) tem uma base com \(n\) vetores, **todas** as bases de \(V\) têm exatamente \(n\) vetores.

Esse número \(n\) é a **dimensão** de \(V\), escrita \(\dim V = n\). É a "quantidade de direções independentes" do espaço, ou, dito de outro jeito, **quantos números são necessários para localizar um vetor**.

| Espaço | Dimensão |
| --- | --- |
| \(\mathbb{R}^n\) | \(n\) |
| \(M(m, n)\) | \(mn\) |
| \(P_n\) | \(n + 1\) |
| \(\{0\}\) | \(0\) (a base é a lista vazia) |

Existem espaços sem nenhuma base finita, como o espaço de todos os polinômios (de qualquer grau) ou \(F(\mathbb{R}, \mathbb{R})\). Dizemos que eles têm **dimensão infinita**. Neste curso o foco é a dimensão finita.

## Os atalhos que mais economizam tempo

Se \(\dim V = n\), valem as seguintes consequências do teorema:

1. Qualquer lista com **mais de \(n\)** vetores é **LD**.
2. Qualquer lista com **menos de \(n\)** vetores **não gera** \(V\).
3. Para uma lista com **exatamente \(n\)** vetores, basta checar **uma** das condições: **LI \(\iff\) gera \(\iff\) é base**.
4. Se \(W\) é subespaço de \(V\), então \(\dim W \leq \dim V\). E se \(\dim W = \dim V\), então \(W = V\).

O atalho 3 é o mais usado. Para decidir se três vetores formam base de \(\mathbb{R}^3\), **não** precisa mostrar que geram **e** que são LI: basta mostrar que são LI.

**Exemplo 1.** \((1, 2, 3)\), \((0, 1, 2)\) e \((0, 0, 1)\) formam base de \(\mathbb{R}^3\)? São 3 vetores e \(\dim \mathbb{R}^3 = 3\). Basta ver se são LI. A matriz com eles nas colunas

$$
\begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 3 & 2 & 1 \end{bmatrix}
$$

é triangular com três pivôs, então são LI. Logo **são base**.

## Como achar uma base de um subespaço

### Quando o subespaço é dado por equações

É a mesma receita da página de geradores: isole as variáveis, escreva o vetor genérico e separe uma parcela por variável livre. **Os geradores obtidos desse jeito já são LI**, então formam uma base. A dimensão é o número de variáveis livres.

**Exemplo 2.** \(W = \{(x, y, z) : x - 2y + z = 0\}\). Já vimos que \(W = [(1, 0, -1), (0, 1, 2)]\). Os dois vetores não são múltiplos um do outro, então são LI. Uma base é \(\{(1, 0, -1), (0, 1, 2)\}\) e \(\dim W = 2\) (um plano).

**Exemplo 3.** \(W = \{(x, y, z, t) \in \mathbb{R}^4 : x = y \text{ e } z = t\}\). Base: \(\{(1, 1, 0, 0), (0, 0, 1, 1)\}\), com \(\dim W = 2\).

### Quando o subespaço é dado por geradores

Se \(W = [v_1, \ldots, v_k]\) e os geradores podem ter sobra, a gente **tira a sobra**:

1. Coloque os vetores como **colunas** de uma matriz.
2. Escalone, só para descobrir **quais colunas têm pivô**.
3. A base de \(W\) é formada pelas **colunas originais** dos vetores nas posições dos pivôs.

> [!WARNING]
> Use as colunas **da matriz original**, não as da matriz escalonada. O escalonamento serve só para dizer **quais** colunas ficam.

**Exemplo 4.** \(W = [v_1, v_2, v_3, v_4]\), com \(v_1 = (1, 2, 1)\), \(v_2 = (2, 4, 2)\), \(v_3 = (0, 1, 1)\) e \(v_4 = (1, 3, 2)\).

$$
\begin{bmatrix} 1 & 2 & 0 & 1 \\ 2 & 4 & 1 & 3 \\ 1 & 2 & 1 & 2 \end{bmatrix}
\xrightarrow{\substack{L_2 \to L_2 - 2L_1 \\ L_3 \to L_3 - L_1}}
\begin{bmatrix} 1 & 2 & 0 & 1 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 1 & 1 \end{bmatrix}
\xrightarrow{L_3 \to L_3 - L_2}
\begin{bmatrix} 1 & 2 & 0 & 1 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}
$$

Os pivôs estão nas colunas 1 e 3. Uma base de \(W\) é \(\{v_1, v_3\} = \{(1, 2, 1), (0, 1, 1)\}\), e \(\dim W = 2\).

Conferindo a "sobra": \(v_2 = 2v_1\) e \(v_4 = v_1 + v_3\). Os dois vetores descartados eram mesmo combinações dos que ficaram.

### Completando uma base

Às vezes temos uma lista LI e queremos **acrescentar** vetores até formar uma base do espaço todo. Vá adicionando vetores (os da base canônica ajudam) e confira a independência.

**Exemplo 5.** Complete \(\{(1, 1, 0)\}\) a uma base de \(\mathbb{R}^3\). Acrescentamos \((1, 0, 0)\) e \((0, 0, 1)\). Se \(a(1, 1, 0) + b(1, 0, 0) + c(0, 0, 1) = 0\), a segunda coordenada dá \(a = 0\), depois a primeira dá \(b = 0\) e a terceira dá \(c = 0\). São 3 vetores LI em dimensão 3, então formam base.

## Dimensão da soma de subespaços

Voltando à página da soma de subespaços, existe uma fórmula para a dimensão de \(U + W\):

$$
\dim(U + W) = \dim U + \dim W - \dim(U \cap W).
$$

A ideia é a mesma de contar elementos de uma união: somar as duas dimensões conta duas vezes o que está na interseção, então subtraímos uma vez.

**Exemplo 6.** Em \(\mathbb{R}^3\), \(U = \{(x, y, 0)\}\) e \(W = \{(0, y, z)\}\). Ambos têm dimensão 2, e \(U \cap W\) é o eixo \(y\), de dimensão 1. Então \(\dim(U + W) = 2 + 2 - 1 = 3\), e de fato \(U + W = \mathbb{R}^3\).

Se a soma é **direta** (\(U \cap W = \{0\}\)), a fórmula fica só \(\dim(U \oplus W) = \dim U + \dim W\).

## Exercícios

**Exercício 1.** Ache uma base e a dimensão de \(W = \{(x, y, z) \in \mathbb{R}^3 : y = 3z\}\).

{{< details title="Resolução" >}}
Livres: \(x\) e \(z\). O vetor genérico é \((x, 3z, z) = x(1, 0, 0) + z(0, 3, 1)\). Os dois geradores são LI (não são múltiplos). Uma base é \(\{(1, 0, 0), (0, 3, 1)\}\) e \(\dim W = 2\).
{{< /details >}}

**Exercício 2.** \(\{(1, 2, 3), (0, 1, 2), (0, 0, 1)\}\) é base de \(\mathbb{R}^3\)?

{{< details title="Gabarito" >}}
Sim. São 3 vetores em dimensão 3, então basta checar se são LI. Com eles nas colunas, a matriz é triangular com pivôs nas 3 colunas, então são LI e, pelo atalho, formam base.
{{< /details >}}

**Exercício 3.** Ache uma base e a dimensão do subespaço das matrizes simétricas \(2 \times 2\).

{{< details title="Resolução" >}}
Uma matriz simétrica é \(\begin{bmatrix} a & b \\ b & c \end{bmatrix} = a\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} + b\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} + c\begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}\). Essas três matrizes geram o subespaço e são LI (a combinação só é nula quando \(a = b = c = 0\)). A dimensão é \(3\).
{{< /details >}}

**Exercício 4.** Ache uma base de \(W = \{p \in P_2 : p(1) = 0\}\) e diga a dimensão.

{{< details title="Resolução" >}}
Pela página de geradores, \(W = [x^2 - 1,\; x - 1]\). Os dois polinômios não são múltiplos um do outro, então são LI. Uma base é \(\{x^2 - 1,\; x - 1\}\) e \(\dim W = 2\). (Faz sentido: \(P_2\) tem dimensão 3 e a condição \(p(1) = 0\) tira uma "liberdade".)
{{< /details >}}

**Exercício 5.** Quais as dimensões possíveis de um subespaço de \(\mathbb{R}^3\)? Descreva geometricamente cada caso.

{{< details title="Gabarito" >}}
\(0\) (só a origem), \(1\) (uma reta pela origem), \(2\) (um plano pela origem) e \(3\) (o próprio \(\mathbb{R}^3\)). Não existe dimensão maior que 3, porque \(\dim W \leq \dim \mathbb{R}^3\).
{{< /details >}}

**Exercício 6.** Sejam \(U\) e \(W\) subespaços de \(\mathbb{R}^5\) com \(\dim U = 3\), \(\dim W = 3\) e \(\dim(U \cap W) = 1\). Qual é \(\dim(U + W)\)?

{{< details title="Gabarito" >}}
\(\dim(U + W) = 3 + 3 - 1 = 5\), então \(U + W = \mathbb{R}^5\).
{{< /details >}}

## Teste rápido

{{< quiz titulo="base e dimensão" >}}

{{< questao >}}
Qual lista é uma base de \(\mathbb{R}^2\)?

- [ ] \((1, 2)\) e \((2, 4)\)
- [ ] \((1, 0)\)
- [ ] \((1, 0)\), \((0, 1)\) e \((1, 1)\)
- [x] \((1, 1)\) e \((1, -1)\)
---
Uma base precisa gerar e ser LI. A primeira lista é LD, a segunda não gera, a terceira é LD (mais vetores que a dimensão). Só \((1, 1)\) e \((1, -1)\) são LI e, sendo 2 vetores em dimensão 2, também geram.
{{< /questao >}}

{{< questao >}}
Qual é a dimensão de \(P_3\) (polinômios de grau \(\leq 3\))?

- [ ] 3
- [x] 4
- [ ] 5
- [ ] Infinita
---
A base canônica é \(1, x, x^2, x^3\), com **4** vetores. O "grau 3" engana: o termo constante também conta.
{{< /questao >}}

{{< questao >}}
Em \(\mathbb{R}^4\), quatro vetores LI formam necessariamente uma base?

- [x] Sim, porque \(\dim \mathbb{R}^4 = 4\) e 4 vetores LI geram \(\mathbb{R}^4\)
- [ ] Não, é preciso ainda mostrar que geram
- [ ] Não, é preciso 5 vetores
- [ ] Só se um deles for da base canônica
---
É o atalho 3: com exatamente \(n\) vetores em dimensão \(n\), **LI \(\iff\) gera \(\iff\) base**. Não precisa conferir a segunda condição.
{{< /questao >}}

{{< questao >}}
Escalonando a matriz com os vetores \(v_1, v_2, v_3\) nas colunas, os pivôs ficaram nas colunas 1 e 3. Qual é uma base de \([v_1, v_2, v_3]\)?

- [ ] \(\{v_1, v_2\}\)
- [x] \(\{v_1, v_3\}\)
- [ ] As colunas 1 e 3 da matriz escalonada
- [ ] \(\{v_2, v_3\}\)
---
Os pivôs indicam **quais colunas originais** ficam. Aqui são \(v_1\) e \(v_3\). As colunas da matriz escalonada são vetores diferentes e, em geral, nem pertencem ao subespaço original.
{{< /questao >}}

{{< /quiz >}}
