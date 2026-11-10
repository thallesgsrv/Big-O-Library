---
title: Base e Dimensão
weight: 6
description: A lista enxuta que gera tudo, a dimensão, os atalhos para decidir se é base e como achar a base de um subespaço.
autores:
  - thallesgsrv
date: 2026-11-09
---

## Sobre

Nas páginas anteriores apareceram duas qualidades de uma lista de vetores:

- **gerar** o espaço (dá para fabricar qualquer vetor com ela);
- ser **LI** (nenhum vetor sobra).

Uma lista que tem **as duas** é uma **base**. Pense numa base como o **kit mínimo**: tem tudo que precisa (gera) e nada a mais (LI). É o "alfabeto" do espaço: todo vetor se escreve com as letras da base, de **um único jeito**.

## Definição

Seja \(V\) um espaço vetorial. Uma lista \(\beta = (v_1, \ldots, v_n)\) é uma **base** de \(V\) se:

1. \(\beta\) é **LI**;
2. \(\beta\) **gera** \(V\), ou seja, \([v_1, \ldots, v_n] = V\).

**Exemplo 1.** Em \(\mathbb{R}^2\), \(\{(1, 0), (0, 1)\}\) é uma base. Gera, porque \((x, y) = x(1, 0) + y(0, 1)\); é LI, porque \(a(1,0) + b(0,1) = (a, b) = 0\) obriga \(a = b = 0\).

**Por que o jeito é único?** Se \(v = a_1v_1 + \cdots + a_nv_n = b_1v_1 + \cdots + b_nv_n\), então \((a_1 - b_1)v_1 + \cdots + (a_n - b_n)v_n = 0\). Como são LI, todos os \(a_i - b_i\) são zero, e os coeficientes coincidem. Esses coeficientes únicos serão as **coordenadas** (última página).

## As bases canônicas

Em cada espaço usual existe uma base "óbvia", chamada **canônica**:

| Espaço | Base canônica | Dimensão |
| --- | --- | --- |
| \(\mathbb{R}^2\) | \((1,0),\; (0,1)\) | 2 |
| \(\mathbb{R}^3\) | \((1,0,0),\; (0,1,0),\; (0,0,1)\) | 3 |
| \(\mathbb{R}^n\) | \(e_1, \ldots, e_n\) (um 1 em cada posição) | \(n\) |
| \(P_2\) | \(1,\; t,\; t^2\) | 3 |
| \(P_n\) | \(1,\; t,\; \ldots,\; t^n\) | \(n + 1\) |
| \(M(2,2)\) | \(\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}\) | 4 |
| \(M(m,n)\) | uma matriz com um 1 em cada posição | \(mn\) |

Elas são a base "óbvia" porque a lista de coordenadas coincide com a própria lista de coeficientes (por exemplo, o polinômio \(a + bt + ct^2\) tem coordenadas \((a, b, c)\) na base \((1, t, t^2)\)).

## Dimensão

**Fato fundamental:** todas as bases de um mesmo espaço têm **o mesmo número de vetores**. Esse número é a **dimensão** do espaço, escrita \(\dim V\).

Por isso dá para dizer "\(\mathbb{R}^3\) tem dimensão 3" sem especificar a base: a canônica tem 3 vetores, e **qualquer outra base de \(\mathbb{R}^3\) também tem exatamente 3**. A dimensão é o número de "direções independentes" do espaço.

- \(\dim \mathbb{R}^n = n\), \(\dim P_n = n + 1\), \(\dim M(m, n) = mn\).
- \(\dim \{0\} = 0\) (a base é a lista vazia).
- Reta pela origem: dimensão 1. Plano pela origem: dimensão 2.

## Os atalhos que mais economizam tempo

Se você já sabe que \(\dim V = d\), valem as regras:

| Situação | Conclusão |
| --- | --- |
| lista com **mais** de \(d\) vetores | **LD** e não é base |
| lista com **menos** de \(d\) vetores | **não gera** \(V\) e não é base |
| lista com **exatamente** \(d\) vetores **LI** | **é base** (não precisa checar se gera) |
| lista com **exatamente** \(d\) vetores que **gera** \(V\) | **é base** (não precisa checar se é LI) |

Na prática: para decidir se uma lista com \(d\) vetores é base de um espaço de dimensão \(d\), **basta testar LI**, e para isso há o determinante.

**Exemplo 2.** \(\{(1, 0, 2), (1, 1, 2), (1, 1, 4)\}\) é base de \(\mathbb{R}^3\)? São 3 vetores em \(\dim 3\). O determinante é

$$
\det \begin{bmatrix} 1 & 0 & 2 \\ 1 & 1 & 2 \\ 1 & 1 & 4 \end{bmatrix} = 1(4 - 2) - 0 + 2(1 - 1) = 2 \neq 0,
$$

então são LI e, portanto, **base**.

**Exemplo 3.** \(\{(2, 1, -1), (1, 0, -1), (1, 1, 0)\}\) em \(\mathbb{R}^3\). O determinante é \(2(0 + 1) - 1(0 + 1) + (-1)(1 - 0) = 2 - 1 - 1 = 0\). São LD, então **não são base**.

**Exemplo 4: polinômios.** \(\{t,\; 1 + t,\; t - t^2\}\) em \(P_2\). Como \(\dim P_2 = 3\), basta testar LI. As listas de coeficientes (\(1, t, t^2\)) são \((0,1,0)\), \((1,1,0)\), \((0,1,-1)\), com determinante

$$
\det \begin{bmatrix} 0 & 1 & 0 \\ 1 & 1 & 0 \\ 0 & 1 & -1 \end{bmatrix} = -1 \cdot (1 \cdot (-1) - 0) = 1 \neq 0.
$$

LI com 3 vetores: **é base de \(P_2\)**.

**Exemplo 5: quantidade errada.** \(\{1,\; 2 - t,\; 3 - t^2,\; t + 2t^2\}\) em \(P_2\) tem **4** vetores, e \(\dim P_2 = 3\). Mais vetores que a dimensão: **LD, não é base**. Sem nenhuma conta.

**Exemplo 6: matrizes.** \(\left\{\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}\right\}\) em \(M(2,2)\). São 4 matrizes, \(\dim M(2,2) = 4\). Como lista de coeficientes: \((1,0,0,1)\), \((0,1,1,0)\), \((0,0,1,0)\), \((0,0,0,1)\), com determinante \(1\). LI com 4 vetores: **base**.

> [!WARNING]
> Se o número de vetores **não for igual** à dimensão, o determinante não se aplica, mas você nem precisa dele: com mais vetores é LD, com menos não gera. A resposta sai pela contagem.

## Como achar uma base de um subespaço

### Quando o subespaço vem por equações

Já vimos a receita ao procurar geradores: **isolar as variáveis e separar por variável livre**. Os vetores obtidos já são **LI** (cada um "carrega" uma variável livre sozinha), então formam uma **base**.

**Exemplo 7.** \(W = \{(x, y, z) \in \mathbb{R}^3 \mid x + y + z = 0\}\).

\(x = -y - z\), então \((x, y, z) = y(-1, 1, 0) + z(-1, 0, 1)\). Uma base é \(\{(-1, 1, 0), (-1, 0, 1)\}\) e \(\dim W = 2\) (duas variáveis livres: \(y\) e \(z\)).

**Exemplo 8.** \(W = \{(x, y, z) \in \mathbb{R}^3 \mid x = y = z\}\). Aqui \((x, x, x) = x(1, 1, 1)\): base \(\{(1, 1, 1)\}\) e \(\dim W = 1\).

**Exemplo 9.** \(W = \{(x, y, z, t) \in \mathbb{R}^4 \mid x + y - t = 0 \text{ e } z = 0\}\). Então \(t = x + y\) e \(z = 0\), de modo que \((x, y, 0, x + y) = x(1, 0, 0, 1) + y(0, 1, 0, 1)\). Base \(\{(1,0,0,1), (0,1,0,1)\}\) e \(\dim W = 2\).

> [!TIP]
> **Contagem rápida:** \(\dim W = n - (\text{número de equações independentes})\). No Exemplo 9, \(4 - 2 = 2\).

### Quando o subespaço vem por geradores

Os geradores podem ter vetores sobrando. Para ficar só com os essenciais, ponha os vetores como **linhas** de uma matriz e **escalone**. As linhas **não nulas** que sobrarem formam uma base, e o número delas é a dimensão.

**Exemplo 10.** \(W = [(1, 2, 3), (2, 4, 6), (0, 1, 1)]\). As linhas \((1,2,3)\) e \((2,4,6)\) são paralelas. Escalonando, \(L_2 \to L_2 - 2L_1\) zera a segunda linha e sobram \((1,2,3)\) e \((0,1,1)\). Base de \(W\): \(\{(1,2,3), (0,1,1)\}\) e \(\dim W = 2\).

### Quando o subespaço vem por parâmetros

Às vezes o enunciado descreve o subespaço com uma **fórmula cheia de letras**:

$$
W = \left\{\begin{bmatrix} a + b & b + c \\ a - c & 0 \end{bmatrix} \;\mid\; a, b, c \in \mathbb{R}\right\}.
$$

A receita tem três passos:

1. **Separe uma parcela por parâmetro** (um vetor para cada letra);
2. o que sai são **geradores**, e eles **ainda não são uma base**: pode haver vetor sobrando;
3. **escalone** (ou procure o vetor que sobra) e fique só com os LI.

**Passo 1.** Separando por \(a\), \(b\) e \(c\):

$$
\begin{bmatrix} a + b & b + c \\ a - c & 0 \end{bmatrix}
= a\underbrace{\begin{bmatrix} 1 & 0 \\ 1 & 0 \end{bmatrix}}_{A}
+ b\underbrace{\begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix}}_{B}
+ c\underbrace{\begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix}}_{C}.
$$

**Passo 2.** São três geradores, mas repare que \(A + C = B\). Em listas: \((1,0,1,0) + (0,1,-1,0) = (1,1,0,0)\). O \(B\) é desnecessário.

**Passo 3.** Descartando \(B\), sobram \(A\) e \(C\), que não são múltiplos um do outro, logo são LI. Uma base de \(W\) é \(\{A, C\}\) e \(\dim W = 2\).

Conferindo pelo escalonamento, as linhas \((1,0,1,0)\), \((1,1,0,0)\), \((0,1,-1,0)\) viram, com \(L_2 \to L_2 - L_1\) e depois \(L_3 \to L_3 - L_2\), as linhas \((1,0,1,0)\), \((0,1,-1,0)\) e \((0,0,0,0)\). Duas linhas não nulas: dimensão 2. ✓

> [!WARNING]
> **Três parâmetros não quer dizer dimensão 3.** Cada letra só vira uma "direção livre" quando o vetor que ela multiplica é independente dos outros. Aqui as letras \(a\), \(b\), \(c\) são livres, mas os vetores que elas multiplicam estão amarrados (\(A + C = B\)). **Sempre escalone antes de dar a dimensão.** Esse é um erro clássico de prova.

## Base contida no conjunto dado

Um enunciado muito comum é: *"mostre que \(v_1, \ldots, v_n\) são LD e dê uma base de \(W = [v_1, \ldots, v_n]\) **contida em** \(\{v_1, \ldots, v_n\}\)"*.

A palavra importante é **contida**. Se você escalonar as linhas e entregar as linhas não nulas, a base está certa mas **não está contida no conjunto**: o escalonamento fabrica vetores novos. Aqui a base precisa ser formada por vetores **da lista original**.

### Método das colunas

1. Escreva os vetores como **colunas** de uma matriz.
2. **Escalone** a matriz.
3. As colunas onde aparecem **pivôs** indicam quais vetores **da lista original** formam uma base de \(W\).
4. \(\dim W\) é o número de pivôs.

**Por que funciona?** Operações nas linhas **não mudam as relações entre as colunas**. Se depois de escalonar a coluna 4 é igual à coluna 1 mais a coluna 3, antes de escalonar também era. As colunas sem pivô são, portanto, combinação das colunas com pivô: elas são as que sobram.

> [!WARNING]
> Entregue os vetores da **matriz original**, nas posições onde ficaram os pivôs. Não entregue as colunas da matriz já escalonada.

**Exemplo.** \(v_1 = (1,2,0)\), \(v_2 = (2,4,0)\), \(v_3 = (0,1,1)\), \(v_4 = (1,3,1)\) em \(\mathbb{R}^3\).

Colunas e escalonamento (\(L_2 \to L_2 - 2L_1\), depois \(L_3 \to L_3 - L_2\)):

$$
\begin{bmatrix} 1 & 2 & 0 & 1 \\ 2 & 4 & 1 & 3 \\ 0 & 0 & 1 & 1 \end{bmatrix}
\;\longrightarrow\;
\begin{bmatrix} 1 & 2 & 0 & 1 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}.
$$

Os pivôs estão nas colunas 1 e 3. Então \(\{v_1, v_3\} = \{(1,2,0), (0,1,1)\}\) é uma base de \(W\) contida no conjunto, e \(\dim W = 2\).

Também dá para ler as relações: a coluna 2 é \(2\times\) a coluna 1 (então \(v_2 = 2v_1\)) e a coluna 4 é a coluna 1 mais a coluna 3 (então \(v_4 = v_1 + v_3\)).

**O que escrever na prova:**

- **LD:** \(2v_1 - v_2 = 0\) é uma combinação não trivial (ou: 4 vetores em \(\mathbb{R}^3\) são sempre LD).
- **Base:** \(v_1, v_3\) são LI (um não é múltiplo do outro) e geram \(W\), porque \(v_2 = 2v_1\) e \(v_4 = v_1 + v_3\) são combinações deles.
- **Dimensão:** \(\dim W = 2\).

> [!NOTE]
> Se o conjunto tem \(n\) vetores em \(\mathbb{R}^n\) e o determinante é diferente de zero, a lista toda já é base e não há nada para descartar. Se o determinante é zero, há vetor sobrando e o método das colunas diz qual.

## Completar uma lista LI até uma base

O outro enunciado clássico: *"mostre que \(S\) é LI e dê uma base de \(\mathbb{R}^4\) que contenha \(S\)"*.

**Fato (completamento):** em um espaço de dimensão \(n\), toda lista LI com \(k < n\) vetores pode ser **completada** com mais \(n - k\) vetores até virar uma base.

### Receita

1. Mostre que \(S\) é **LI** (escalone: sem linha nula).
2. Olhe **em quais colunas ficaram os pivôs**. As colunas **sem pivô** são as "direções que faltam".
3. Acrescente o **vetor canônico** \(e_j\) de cada coluna \(j\) sem pivô.
4. Mostre que a nova lista é **LI** (por determinante \(\neq 0\)). Como ela tem \(n\) vetores em dimensão \(n\), é base.

**Por que funciona?** As linhas escalonadas de \(S\) geram o mesmo espaço que \(S\). Ao juntar \(e_j\) para cada coluna sem pivô, a matriz passa a ter um pivô em **todas** as colunas, e isso é posto máximo.

**Exemplo.** \(S = \{(2,1,0,0),\; (1,1,0,1),\; (0,1,1,0)\}\) em \(\mathbb{R}^4\).

Escalonando as linhas: \(L_2 \to L_2 - \tfrac12 L_1\) dá \((0, \tfrac12, 0, 1)\), e \(L_3 \to L_3 - 2L_2\) dá \((0, 0, 1, -2)\). Sobram três linhas não nulas, então \(S\) é LI, com pivôs nas colunas 1, 2 e 3.

A coluna 4 não tem pivô, então acrescentamos \(e_4 = (0,0,0,1)\). O determinante da nova lista é

$$
\det \begin{bmatrix} 2 & 1 & 0 & 0 \\ 1 & 1 & 0 & 1 \\ 0 & 1 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}
= 1 \cdot \det \begin{bmatrix} 2 & 1 & 0 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{bmatrix}
= 1 \cdot (2 - 1) = 1 \neq 0.
$$

São 4 vetores LI em \(\mathbb{R}^4\), então \(\{(2,1,0,0), (1,1,0,1), (0,1,1,0), (0,0,0,1)\}\) é uma **base de \(\mathbb{R}^4\) que contém \(S\)**.

> [!TIP]
> **Atalho de prova:** se você não quiser escalonar, teste os canônicos um a um: \(e_1\), depois \(e_2\), e assim por diante, calculando o determinante. O primeiro que der \(\neq 0\) serve (quando falta só um vetor). A receita dos pivôs só evita tentativa e erro.

> [!WARNING]
> **Não vale acrescentar um vetor qualquer.** Se \(S\) gera um plano e você acrescenta um vetor que já está nesse plano, a lista continua LD. Por isso é preciso **mostrar que a lista nova é LI**, e essa verificação faz parte da resposta.

## Dimensão da soma de subespaços

Como vimos em Soma de Subespaços:

$$
\dim(W_1 + W_2) = \dim W_1 + \dim W_2 - \dim(W_1 \cap W_2).
$$

Em particular, a soma é direta quando \(\dim(W_1 + W_2) = \dim W_1 + \dim W_2\).

## Resumo

| Quero saber se... | Faço... |
| --- | --- |
| uma lista é base de \(V\) | comparar o número de vetores com \(\dim V\); se for igual, testar LI (determinante) |
| \(\dim\) de um subespaço por equações | contar variáveis livres |
| uma base desse subespaço | os vetores que aparecem ao separar por variável livre |
| uma base a partir de geradores | linhas + escalonar; ficam as não nulas |
| a dimensão de um subespaço dado por parâmetros | separar por parâmetro, **escalonar** e contar as linhas não nulas (letras demais não é dimensão) |
| uma base **contida** no conjunto dado | vetores como colunas, escalonar, ficar com os vetores originais das colunas com pivô |
| completar uma lista LI até uma base | acrescentar \(e_j\) nas colunas sem pivô e provar que a nova lista é LI |

## Exercícios

**Exercício 1.** Encontre uma base e a dimensão de \(W = \{(x, y, z) \mid x = y = z\}\) e de \(W' = \{(x, y, z) \mid x + y + z = 0\}\).

{{< details title="Resolução" >}}
**Para \(W\):**

Todos os vetores têm a forma

$$
(x, x, x) = x\,(1, 1, 1).
$$

Base \(\{(1, 1, 1)\}\) e \(\dim W = 1\).

**Para \(W'\):**

Isole \(x = -y - z\). As variáveis livres são \(y\) e \(z\):

$$
(x, y, z) = (-y - z,\; y,\; z) = y\,(-1, 1, 0) + z\,(-1, 0, 1).
$$

Base \(\{(-1, 1, 0),\; (-1, 0, 1)\}\) e \(\dim W' = 2\).
{{< /details >}}

**Exercício 2.** \(\{1, 2 - t, 3 - t^2, t + 2t^2\}\) é base de \(P_2\)?

{{< details title="Resolução" >}}
**Passo 1: contar.**

São 4 polinômios.

**Passo 2: comparar com a dimensão.**

\(\dim P_2 = 3\).

**Resposta:** mais vetores do que a dimensão, então a lista é LD e **não** é base. Não precisa de conta.
{{< /details >}}

**Exercício 3.** \(\{t, 1 + t, t - t^2\}\) é base de \(P_2\)?

{{< details title="Resolução" >}}
**Passo 1: contar.**

São 3 polinômios e \(\dim P_2 = 3\). Basta testar se são LI.

**Passo 2: traduzir para listas** (coeficientes de \(1\), \(t\), \(t^2\)).

$$
t \to (0, 1, 0), \qquad 1 + t \to (1, 1, 0), \qquad t - t^2 \to (0, 1, -1)
$$

**Passo 3: determinante.**

$$
\det \begin{bmatrix} 0 & 1 & 0 \\ 1 & 1 & 0 \\ 0 & 1 & -1 \end{bmatrix} = -1 \cdot \big(1 \cdot (-1) - 0\big) = 1 \neq 0.
$$

**Resposta:** LI com 3 vetores, então é base de \(P_2\).
{{< /details >}}

**Exercício 4.** \(\{(1, 0, 2), (1, 1, 2), (1, 1, 4)\}\) e \(\{(2, 1, -1), (1, 0, -1), (1, 1, 0)\}\) são bases de \(\mathbb{R}^3\)?

{{< details title="Resolução" >}}
Os dois têm 3 vetores em \(\mathbb{R}^3\), então basta o determinante.

**Primeiro conjunto:**

$$
\det \begin{bmatrix} 1 & 0 & 2 \\ 1 & 1 & 2 \\ 1 & 1 & 4 \end{bmatrix} = 1(4 - 2) - 0 + 2(1 - 1) = 2 \neq 0.
$$

LI, então **é base**.

**Segundo conjunto:**

$$
\det \begin{bmatrix} 2 & 1 & -1 \\ 1 & 0 & -1 \\ 1 & 1 & 0 \end{bmatrix} = 2(0 + 1) - 1(0 + 1) + (-1)(1 - 0) = 2 - 1 - 1 = 0.
$$

LD, então **não é base**.
{{< /details >}}

**Exercício 5.** Qual é a dimensão do espaço das matrizes simétricas \(2 \times 2\)? Dê uma base.

{{< details title="Resolução" >}}
**Passo 1: escrever a matriz genérica.**

Simétrica significa entrada \((1,2)\) igual à \((2,1)\):

$$
\begin{bmatrix} a & b \\ b & d \end{bmatrix}
$$

**Passo 2: separar uma parcela por entrada livre** (\(a\), \(b\) e \(d\)).

$$
= a\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} + b\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} + d\begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}
$$

**Resposta:** a base tem 3 matrizes (as três acima), então a dimensão é 3.
{{< /details >}}

**Exercício 6.** Encontre uma base e a dimensão de \(W = \{(a + b,\; b + c,\; a - c) \mid a, b, c \in \mathbb{R}\}\).

{{< details title="Resolução" >}}
**Passo 1: separar por parâmetro.**

$$
(a + b,\; b + c,\; a - c) = a\,(1, 0, 1) + b\,(1, 1, 0) + c\,(0, 1, -1).
$$

**Passo 2: procurar o vetor que sobra.**

$$
(1, 0, 1) + (0, 1, -1) = (1, 1, 0).
$$

O gerador de \(b\) é a soma dos outros dois, então ele sobra.

**Passo 3: ficar só com os LI.** \((1,0,1)\) e \((0,1,-1)\) não são múltiplos um do outro, logo são LI.

**Resposta:** base \(\{(1,0,1),\; (0,1,-1)\}\) e \(\dim W = 2\) (e não 3, apesar dos três parâmetros).

**Conferindo:** \(W\) é o plano \(x - y - z = 0\). Os dois vetores da base satisfazem a equação e \(3 - 1 = 2\).
{{< /details >}}

**Exercício 7.** Sejam \(v_1 = (1,1,0)\), \(v_2 = (0,1,1)\), \(v_3 = (1,2,1)\), \(v_4 = (1,0,-1)\). Mostre que são LD e dê uma base de \(W = [v_1, v_2, v_3, v_4]\) contida em \(\{v_1, v_2, v_3, v_4\}\).

{{< details title="Resolução" >}}
**Passo 1: montar a matriz com os vetores como colunas e escalonar.**

$$
\begin{bmatrix} 1 & 0 & 1 & 1 \\ 1 & 1 & 2 & 0 \\ 0 & 1 & 1 & -1 \end{bmatrix}
\xrightarrow{L_2 \to L_2 - L_1}
\begin{bmatrix} 1 & 0 & 1 & 1 \\ 0 & 1 & 1 & -1 \\ 0 & 1 & 1 & -1 \end{bmatrix}
\xrightarrow{L_3 \to L_3 - L_2}
\begin{bmatrix} 1 & 0 & 1 & 1 \\ 0 & 1 & 1 & -1 \\ 0 & 0 & 0 & 0 \end{bmatrix}.
$$

**Passo 2: ler os pivôs e as relações.** Pivôs nas colunas 1 e 2. A coluna 3 é a soma das colunas 1 e 2, e a coluna 4 é a coluna 1 menos a coluna 2:

$$
v_3 = v_1 + v_2, \qquad v_4 = v_1 - v_2.
$$

**LD:** \(v_1 + v_2 - v_3 = 0\) é uma combinação não trivial.

**Base contida no conjunto:** \(\{v_1, v_2\} = \{(1,1,0), (0,1,1)\}\). São LI (não são múltiplos) e geram \(W\), pois \(v_3\) e \(v_4\) são combinações deles.

**Dimensão:** \(\dim W = 2\) (um plano de \(\mathbb{R}^3\)).
{{< /details >}}

**Exercício 8.** Mostre que \(S = \{(0,1,0,1),\; (1,1,0,0)\}\) é LI e dê uma base de \(\mathbb{R}^4\) que contenha \(S\).

{{< details title="Resolução" >}}
**Passo 1: S é LI.** Os dois vetores não são múltiplos um do outro (o primeiro tem primeira coordenada 0 e o segundo não). Duas linhas não nulas escalonadas: \((1,1,0,0)\) e \((0,1,0,1)\).

**Passo 2: pivôs.** Estão nas colunas 1 e 2. As colunas 3 e 4 não têm pivô, então acrescentamos \(e_3 = (0,0,1,0)\) e \(e_4 = (0,0,0,1)\).

**Passo 3: a nova lista é LI.**

$$
\det \begin{bmatrix} 0 & 1 & 0 & 1 \\ 1 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}
= \det \begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix} \cdot 1 \cdot 1 = -1 \neq 0.
$$

**Conclusão.** São 4 vetores LI em \(\mathbb{R}^4\), então \(\{(0,1,0,1), (1,1,0,0), (0,0,1,0), (0,0,0,1)\}\) é uma base de \(\mathbb{R}^4\) que contém \(S\).
{{< /details >}}

## Teste rápido

{{< quiz titulo="base e dimensão" >}}

{{< questao >}}
Uma base de \(V\) precisa ser...

- [ ] só LI
- [ ] só um conjunto gerador
- [x] LI e geradora de \(V\)
- [ ] formada por vetores unitários
---
Base é a combinação das duas qualidades: gera tudo e não tem nada sobrando.
{{< /questao >}}

{{< questao >}}
\(\{(1, 2), (3, 4), (5, 6)\}\) é base de \(\mathbb{R}^2\)?

- [ ] Sim, gera \(\mathbb{R}^2\)
- [x] Não: 3 vetores em dimensão 2 são LD
- [ ] Sim, pois são 3 vetores
- [ ] Depende do determinante
---
\(\dim \mathbb{R}^2 = 2\). Uma base tem exatamente 2 vetores, e 3 vetores em \(\mathbb{R}^2\) são sempre LD.
{{< /questao >}}

{{< questao >}}
Qual é a dimensão de \(\{(x, y, z, t) \mid x + y - t = 0 \text{ e } z = 0\}\)?

- [ ] 4
- [ ] 3
- [x] 2
- [ ] 1
---
São 4 variáveis e 2 equações independentes: \(4 - 2 = 2\).
{{< /questao >}}

{{< questao >}}
Qual é a dimensão de \(M(2,2)\)?

- [ ] 2
- [ ] 3
- [x] 4
- [ ] 8
---
Uma matriz \(2 \times 2\) tem 4 entradas livres. A base canônica tem 4 matrizes.
{{< /questao >}}

{{< questao >}}
O enunciado pede uma base de \(W = [v_1, \ldots, v_4]\) **contida em** \(\{v_1, \ldots, v_4\}\). Qual resposta está errada?

- [ ] Colocar os vetores como colunas, escalonar e entregar os vetores originais das colunas com pivô
- [ ] Descartar os vetores que são combinação dos outros e conferir que os restantes são LI
- [x] Escalonar as linhas e entregar as linhas não nulas da matriz escalonada
- [ ] Escolher vetores da lista e provar que são LI e que geram \(W\)
---
As linhas escalonadas são combinações dos vetores originais e em geral não pertencem à lista. A base pedida precisa ser formada por vetores da própria lista.
{{< /questao >}}

{{< questao >}}
Um subespaço é dado por três parâmetros \(a, b, c\), e os três geradores obtidos satisfazem \(v_2 = v_1 + v_3\). Qual é a dimensão?

- [ ] 3, porque há três parâmetros
- [x] 2, porque um dos geradores sobra
- [ ] 1
- [ ] Não dá para saber
---
Os três geradores são LD, pois um é soma dos outros. Tirando o que sobra ficam dois LI.
{{< /questao >}}

{{< questao >}}
Para completar uma lista LI de 3 vetores de \(\mathbb{R}^4\) até uma base, quantos vetores faltam e o que você precisa mostrar no final?

- [ ] Faltam 2, e basta que sejam diferentes de zero
- [x] Falta 1, e é preciso mostrar que a lista de 4 vetores é LI
- [ ] Faltam 4, e é preciso mostrar que geram \(\mathbb{R}^4\)
- [ ] Falta 1, e qualquer vetor serve
---
\(\dim \mathbb{R}^4 = 4\) e a lista tem 3 vetores, então falta 1. Como o vetor acrescentado não pode ser qualquer um (ele pode já estar no gerado por \(S\)), é preciso provar a independência da lista nova, por exemplo com determinante diferente de zero.
{{< /questao >}}

{{< /quiz >}}
