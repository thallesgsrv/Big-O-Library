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

## Exercícios

**Exercício 1.** Encontre uma base e a dimensão de \(W = \{(x, y, z) \mid x = y = z\}\) e de \(W' = \{(x, y, z) \mid x + y + z = 0\}\).

{{< details title="Resolução" >}}
\(W\): \((x, x, x) = x(1,1,1)\), base \(\{(1,1,1)\}\), dimensão 1.

\(W'\): \((x, y, z)\) com \(x = -y - z\) dá \(y(-1,1,0) + z(-1,0,1)\), base \(\{(-1,1,0), (-1,0,1)\}\), dimensão 2.
{{< /details >}}

**Exercício 2.** \(\{1, 2 - t, 3 - t^2, t + 2t^2\}\) é base de \(P_2\)?

{{< details title="Resolução" >}}
Não. São 4 polinômios e \(\dim P_2 = 3\). Com mais vetores que a dimensão a lista é LD.
{{< /details >}}

**Exercício 3.** \(\{t, 1 + t, t - t^2\}\) é base de \(P_2\)?

{{< details title="Resolução" >}}
Sim. Há 3 polinômios e \(\dim P_2 = 3\), e o determinante das listas de coeficientes é \(1 \neq 0\) (Exemplo 4), então são LI.
{{< /details >}}

**Exercício 4.** \(\{(1, 0, 2), (1, 1, 2), (1, 1, 4)\}\) e \(\{(2, 1, -1), (1, 0, -1), (1, 1, 0)\}\) são bases de \(\mathbb{R}^3\)?

{{< details title="Resolução" >}}
O primeiro tem determinante 2, então é base. O segundo tem determinante 0, então não é (é LD).
{{< /details >}}

**Exercício 5.** Qual é a dimensão do espaço das matrizes simétricas \(2 \times 2\)? Dê uma base.

{{< details title="Resolução" >}}
\(\begin{bmatrix} a & b \\ b & d \end{bmatrix} = a\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} + b\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} + d\begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}\). Base com 3 matrizes, dimensão 3.
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

{{< /quiz >}}
