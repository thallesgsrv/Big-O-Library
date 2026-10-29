---
title: Coordenadas e Mudança de Base
weight: 7
description: O endereço de um vetor numa base, e como converter esse endereço quando a base muda.
autores:
  - thallesgsrv
date: 2026-10-29
---

## Sobre

Quando alguém diz "o ponto \((3, 5)\)", está usando um **sistema de endereços**: "ande 3 para a direita e 5 para cima". Esse endereço só faz sentido por causa dos eixos escolhidos. Se escolhermos **outros eixos**, o mesmo ponto passa a ter **outro endereço**, sem o ponto ter se mexido.

Na linguagem de álgebra linear, os eixos são uma **base**, e o endereço é o vetor de **coordenadas**.

## Coordenadas numa base

Na página anterior vimos que, se \(B = (v_1, \ldots, v_n)\) é uma base de \(V\), todo vetor \(v \in V\) se escreve de **uma única maneira**:

$$
v = a_1 v_1 + a_2 v_2 + \cdots + a_n v_n.
$$

Os números \(a_1, \ldots, a_n\) são as **coordenadas de \(v\) na base \(B\)**, e as organizamos numa coluna:

$$
[v]_B = \begin{bmatrix} a_1 \\ a_2 \\ \vdots \\ a_n \end{bmatrix}.
$$

> [!IMPORTANT]
> Aqui a base é **ordenada**: \((v_1, v_2)\) e \((v_2, v_1)\) são bases diferentes, e trocar a ordem troca a ordem das coordenadas. Por isso escrevemos com parênteses, não com chaves.

Para achar as coordenadas, monte a equação \(v = a_1 v_1 + \cdots + a_n v_n\) e resolva o sistema. Como \(B\) é base, **sempre há exatamente uma solução**.

**Exemplo 1.** Em \(\mathbb{R}^2\), seja \(B = ((1, 1), (1, -1))\) e \(v = (5, 1)\). Procuramos \(a\) e \(b\):

$$
a(1, 1) + b(1, -1) = (5, 1) \;\Rightarrow\; a + b = 5, \quad a - b = 1 \;\Rightarrow\; a = 3, \; b = 2.
$$

Então \([v]_B = \begin{bmatrix} 3 \\ 2 \end{bmatrix}\). Conferindo: \(3(1, 1) + 2(1, -1) = (5, 1)\). ✓

Repare: o **mesmo** vetor \((5, 1)\) tem endereço \((5, 1)\) na base canônica e endereço \((3, 2)\) na base \(B\).

**Exemplo 2 (polinômios).** Em \(P_2\), seja \(p(x) = 3 - x + 2x^2\).

- Na base \(B = (1, x, x^2)\): \([p]_B = \begin{bmatrix} 3 \\ -1 \\ 2 \end{bmatrix}\).
- Na base \(B' = (x^2, x, 1)\) (mesmos vetores, ordem trocada): \([p]_{B'} = \begin{bmatrix} 2 \\ -1 \\ 3 \end{bmatrix}\).

**Exemplo 3 (matrizes).** Em \(M(2, 2)\), com a base canônica \((E_{11}, E_{12}, E_{21}, E_{22})\):

$$
\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = 1E_{11} + 2E_{12} + 3E_{21} + 4E_{22}
\quad\Longrightarrow\quad
[A]_B = \begin{bmatrix} 1 \\ 2 \\ 3 \\ 4 \end{bmatrix}.
$$

> [!NOTE]
> Na **base canônica** de \(\mathbb{R}^n\), as coordenadas são as próprias entradas do vetor. É por isso que, antes deste estágio, nunca precisamos pensar em "coordenadas": estávamos sempre na base canônica sem perceber.

## Por que coordenadas importam

As coordenadas **transformam qualquer espaço de dimensão \(n\) em \(\mathbb{R}^n\)**, e as contas continuam funcionando:

$$
[u + v]_B = [u]_B + [v]_B \qquad\text{e}\qquad [\alpha v]_B = \alpha\,[v]_B.
$$

Ou seja, **somar polinômios é somar suas colunas de coordenadas**, e esticar uma matriz é esticar a sua coluna. Isso explica por que \(\mathbb{R}^n\) é o "modelo" de todo espaço de dimensão \(n\).

Uma consequência prática: para decidir se vetores de um espaço qualquer são LI, ou formam uma base, **troque cada vetor pela sua coluna de coordenadas** e faça o teste em \(\mathbb{R}^n\), que já sabemos fazer.

**Exemplo 4.** Os polinômios \(1 + x\), \(x + x^2\) e \(1 + x^2\) formam uma base de \(P_2\)? Na base \((1, x, x^2)\), as coordenadas são \((1, 1, 0)\), \((0, 1, 1)\) e \((1, 0, 1)\). Com elas como colunas:

$$
\det \begin{bmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{bmatrix} =
1(1 \cdot 1 - 0 \cdot 1) - 0 + 1(1 \cdot 1 - 1 \cdot 0) = 1 + 1 = 2 \neq 0.
$$

O determinante é diferente de zero, então as colunas são LI. São 3 vetores LI em \(P_2\) (que tem dimensão 3), então são uma **base**.

## Mudança de base

Agora a pergunta central: se eu conheço as coordenadas de \(v\) numa base \(B\), como descubro as coordenadas dele em outra base \(C\)?

A resposta é uma **matriz**, que chamaremos de **matriz de mudança de base de \(B\) para \(C\)**, e que vamos escrever como \(M_{B \to C}\). Ela funciona assim:

$$
[v]_C = M_{B \to C}\,[v]_B.
$$

> [!NOTE]
> Cada livro tem sua notação para essa matriz. Você vai ver \([I]_B^C\), \([I]_{BC}\), \(P_{B \to C}\) e outras. A ideia é sempre a mesma. Confira qual notação o seu professor usa.

**Como montar \(M_{B \to C}\):** se \(B = (b_1, \ldots, b_n)\), as **colunas** da matriz são as coordenadas dos vetores de \(B\) escritas **na base \(C\)**:

$$
M_{B \to C} = \Big[\; [b_1]_C \;\; [b_2]_C \;\; \cdots \;\; [b_n]_C \;\Big].
$$

Em palavras: "pegue cada vetor da base de **partida**, descubra o endereço dele na base de **chegada**, e coloque como coluna".

**Por que funciona?** Se \([v]_B = (a_1, \ldots, a_n)\), então \(v = a_1 b_1 + \cdots + a_n b_n\). Tirando as coordenadas na base \(C\) dos dois lados e usando que elas respeitam soma e esticar:

$$
[v]_C = a_1 [b_1]_C + \cdots + a_n [b_n]_C = M_{B \to C} \begin{bmatrix} a_1 \\ \vdots \\ a_n \end{bmatrix}.
$$

**Exemplo 5.** Em \(\mathbb{R}^2\), seja \(B\) a base canônica \(((1, 0), (0, 1))\) e \(C = ((1, 1), (1, -1))\). Escrevemos os vetores de \(B\) na base \(C\):

$$
(1, 0) = \tfrac{1}{2}(1, 1) + \tfrac{1}{2}(1, -1)
\qquad\text{e}\qquad
(0, 1) = \tfrac{1}{2}(1, 1) - \tfrac{1}{2}(1, -1).
$$

Então

$$
M_{B \to C} = \begin{bmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{bmatrix}.
$$

Teste com \(v = (5, 1)\), que tem \([v]_B = (5, 1)\):

$$
[v]_C = \begin{bmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{bmatrix} \begin{bmatrix} 5 \\ 1 \end{bmatrix} = \begin{bmatrix} 3 \\ 2 \end{bmatrix},
$$

que é exatamente o que achamos no Exemplo 1. ✓

### A mudança no sentido contrário

A matriz de \(C\) para \(B\) desfaz a anterior. Ela é a **inversa**:

$$
M_{C \to B} = (M_{B \to C})^{-1}.
$$

No Exemplo 5, \(M_{C \to B}\) tem como colunas os vetores de \(C\) escritos na base canônica, ou seja, os próprios vetores de \(C\):

$$
M_{C \to B} = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}.
$$

Conferindo que uma é a inversa da outra:

$$
\begin{bmatrix} 1/2 & 1/2 \\ 1/2 & -1/2 \end{bmatrix} \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}. \;✓
$$

> [!TIP]
> **Atalho com a base canônica.** Quando uma das bases é a canônica, uma das duas matrizes é imediata: a matriz da base \(C\) **para a canônica** tem como colunas os próprios vetores de \(C\). Para ir no sentido contrário, **inverta** essa matriz (com o método do Estágio 1).

## Mudança de base entre duas bases quaisquer

Quando nenhuma das bases é a canônica, existe um método direto: escalonar a matriz aumentada

$$
\big[\; C \;\big|\; B \;\big] \;\longrightarrow\; \big[\; I \;\big|\; M_{B \to C} \;\big],
$$

em que \(C\) e \(B\) são as matrizes com os vetores das bases nas **colunas**. É o mesmo método da inversa: o lado esquerdo vira a identidade e o lado direito vira a matriz de mudança.

**Exemplo 6.** Sejam \(B = ((1, 0), (1, 1))\) e \(C = ((2, 1), (1, 1))\), bases de \(\mathbb{R}^2\). Montamos \([\,C \mid B\,]\) e escalonamos:

$$
\left[\begin{array}{cc|cc} 2 & 1 & 1 & 1 \\ 1 & 1 & 0 & 1 \end{array}\right]
\xrightarrow{L_1 \leftrightarrow L_2}
\left[\begin{array}{cc|cc} 1 & 1 & 0 & 1 \\ 2 & 1 & 1 & 1 \end{array}\right]
\xrightarrow{L_2 \to L_2 - 2L_1}
\left[\begin{array}{cc|cc} 1 & 1 & 0 & 1 \\ 0 & -1 & 1 & -1 \end{array}\right]
$$

$$
\xrightarrow{L_2 \to -L_2}
\left[\begin{array}{cc|cc} 1 & 1 & 0 & 1 \\ 0 & 1 & -1 & 1 \end{array}\right]
\xrightarrow{L_1 \to L_1 - L_2}
\left[\begin{array}{cc|cc} 1 & 0 & 1 & 0 \\ 0 & 1 & -1 & 1 \end{array}\right]
$$

Logo

$$
M_{B \to C} = \begin{bmatrix} 1 & 0 \\ -1 & 1 \end{bmatrix}.
$$

Teste com \(v = (3, 2)\). Na base \(B\): \(a(1, 0) + b(1, 1) = (3, 2)\) dá \(b = 2\) e \(a = 1\), então \([v]_B = (1, 2)\). Aplicando a matriz:

$$
[v]_C = \begin{bmatrix} 1 & 0 \\ -1 & 1 \end{bmatrix} \begin{bmatrix} 1 \\ 2 \end{bmatrix} = \begin{bmatrix} 1 \\ 1 \end{bmatrix}.
$$

Conferindo na base \(C\): \(1 \cdot (2, 1) + 1 \cdot (1, 1) = (3, 2)\). ✓

## Resumo

| Quero... | Faço... |
| --- | --- |
| Coordenadas de \(v\) na base \(B\) | Resolver \(v = a_1 v_1 + \cdots + a_n v_n\) |
| Testar se vetores de \(V\) são LI ou base | Trocar por coordenadas e testar em \(\mathbb{R}^n\) |
| \(M_{B \to C}\) | Colunas = coordenadas dos vetores de \(B\) na base \(C\) |
| Usar \(M_{B \to C}\) | \([v]_C = M_{B \to C}\,[v]_B\) |
| Voltar de \(C\) para \(B\) | \(M_{C \to B} = (M_{B \to C})^{-1}\) |
| \(M_{B \to C}\) sem ser canônica | Escalonar \([\,C \mid B\,]\) até virar \([\,I \mid M_{B \to C}\,]\) |

## Exercícios

**Exercício 1.** Ache as coordenadas de \((3, 5)\) na base \(B = ((1, 2), (0, 1))\).

{{< details title="Resolução" >}}
Queremos \(a(1, 2) + b(0, 1) = (3, 5)\). A primeira coordenada dá \(a = 3\). A segunda dá \(2a + b = 5\), então \(b = -1\). Logo \([v]_B = \begin{bmatrix} 3 \\ -1 \end{bmatrix}\). Conferindo: \(3(1, 2) - (0, 1) = (3, 5)\). ✓
{{< /details >}}

**Exercício 2.** Ache as coordenadas de \(p(x) = 2 - x + 3x^2\) na base \(B = (1 + x,\; x,\; x^2)\) de \(P_2\).

{{< details title="Resolução" >}}
Queremos \(a(1 + x) + bx + cx^2 = 2 - x + 3x^2\). O lado esquerdo vale \(a + (a + b)x + cx^2\). Igualando: \(a = 2\), \(a + b = -1\) (então \(b = -3\)) e \(c = 3\). Logo \([p]_B = \begin{bmatrix} 2 \\ -3 \\ 3 \end{bmatrix}\).
{{< /details >}}

**Exercício 3.** Seja \(B\) a base canônica de \(\mathbb{R}^2\) e \(C = ((1, 2), (0, 1))\). Calcule \(M_{B \to C}\) e use-a para achar \([v]_C\) com \(v = (3, 5)\).

{{< details title="Resolução" >}}
Escrevemos os vetores de \(B\) na base \(C\):

- \((1, 0) = 1 \cdot (1, 2) + (-2)(0, 1)\), coordenadas \((1, -2)\);
- \((0, 1) = 0 \cdot (1, 2) + 1 \cdot (0, 1)\), coordenadas \((0, 1)\).

Então \(M_{B \to C} = \begin{bmatrix} 1 & 0 \\ -2 & 1 \end{bmatrix}\). Como \([v]_B = (3, 5)\):

$$
[v]_C = \begin{bmatrix} 1 & 0 \\ -2 & 1 \end{bmatrix}\begin{bmatrix} 3 \\ 5 \end{bmatrix} = \begin{bmatrix} 3 \\ -1 \end{bmatrix},
$$

igual ao resultado do Exercício 1. ✓
{{< /details >}}

**Exercício 4.** No exercício anterior, ache \(M_{C \to B}\).

{{< details title="Resolução" >}}
As colunas são os vetores de \(C\) escritos na base canônica, ou seja, os próprios vetores: \(M_{C \to B} = \begin{bmatrix} 1 & 0 \\ 2 & 1 \end{bmatrix}\). Conferindo que é a inversa da anterior:

$$
\begin{bmatrix} 1 & 0 \\ 2 & 1 \end{bmatrix}\begin{bmatrix} 1 & 0 \\ -2 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}. \;✓
$$
{{< /details >}}

**Exercício 5.** Se \([v]_B = (2, 0, 1)\) com \(B = ((1, 0, 0), (1, 1, 0), (1, 1, 1))\), quem é \(v\)?

{{< details title="Resolução" >}}
As coordenadas dizem os coeficientes: \(v = 2(1, 0, 0) + 0 \cdot (1, 1, 0) + 1 \cdot (1, 1, 1) = (3, 1, 1)\).
{{< /details >}}

## Teste rápido

{{< quiz titulo="coordenadas e mudança de base" >}}

{{< questao >}}
Qual é \([v]_B\) para \(B = ((1, 0), (1, 1))\) e \(v = (3, 2)\)?

- [ ] \((3, 2)\)
- [ ] \((2, 1)\)
- [x] \((1, 2)\)
- [ ] \((2, 3)\)
---
Resolvemos \(a(1, 0) + b(1, 1) = (a + b,\, b) = (3, 2)\). A segunda coordenada dá \(b = 2\) e a primeira dá \(a = 1\). Conferindo: \(1(1, 0) + 2(1, 1) = (3, 2)\).
{{< /questao >}}

{{< questao >}}
Se trocarmos a ordem dos vetores da base, o que acontece com as coordenadas de um vetor?

- [ ] Nada, elas ficam iguais
- [x] Elas são reordenadas do mesmo jeito
- [ ] Elas mudam de sinal
- [ ] Elas deixam de existir
---
As coordenadas são os coeficientes de cada vetor da base. Se o vetor \(v_1\) passa a ser o segundo da lista, o coeficiente dele passa a ser a segunda coordenada. Por isso a base é *ordenada*.
{{< /questao >}}

{{< questao >}}
O que são as **colunas** da matriz de mudança de base \(M_{B \to C}\)?

- [ ] Os vetores da base \(C\) escritos na base canônica
- [x] As coordenadas dos vetores da base \(B\) escritas na base \(C\)
- [ ] As coordenadas dos vetores da base \(C\) escritas na base \(B\)
- [ ] Os vetores da base \(B\) escritos na base canônica
---
A matriz recebe coordenadas na base de **partida** (\(B\)) e devolve coordenadas na base de **chegada** (\(C\)). Então cada coluna é um vetor de \(B\) com o endereço da base \(C\). A terceira opção descreve \(M_{C \to B}\), a matriz inversa.
{{< /questao >}}

{{< questao >}}
Sabendo \(M_{B \to C}\), como obtemos \(M_{C \to B}\)?

- [ ] Transpondo \(M_{B \to C}\)
- [ ] Trocando o sinal de todas as entradas
- [x] Calculando a inversa de \(M_{B \to C}\)
- [ ] Não é possível
---
Ir de \(B\) para \(C\) e depois voltar de \(C\) para \(B\) deve devolver o vetor original, então as duas matrizes são inversas uma da outra. Toda matriz de mudança de base é invertível.
{{< /questao >}}

{{< /quiz >}}
