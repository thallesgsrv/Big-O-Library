---
title: Questões Resolvidas
weight: 9
description: Exercícios completos do estágio, agrupados por tipo e resolvidos passo a passo, para treinar depois da teoria.
autores:
  - thallesgsrv
date: 2026-11-11
---

## Sobre

Esta página reúne exercícios completos do Estágio 2, **agrupados por tipo** e resolvidos passo a passo. Cada seção aponta a página onde a teoria está explicada com calma.

**Como usar:** tente cada questão sozinho primeiro e só abra a resolução depois. Se travar, as receitas resumidas estão na [Revisão Relâmpago](../revisao-relampago/).

> [!TIP]
> Nas questões de V ou F, a **justificativa faz parte da resposta**. Escrever só "V" ou "F" não vale nada: mostre a conta, o contraexemplo ou a propriedade que decide.

## 1. É subespaço? (V ou F)

Teoria: [Subespaços](../subespacos/). A pergunta de sempre: o filtro é uma **equação linear igual a zero**, ou tem produto, quadrado, desigualdade ou número solto?

**Questão 1.** \(U = \{(x, y, z, t) \in \mathbb{R}^4 \mid t = xz\}\) é subespaço de \(\mathbb{R}^4\)?


{{< details title="Resolução" >}}
**Passo 1: o filtro.** \(t = xz\) tem um **produto** de variáveis. Desconfie: não é do tipo "combinação linear = 0".

**Passo 2: um elemento simples de \(U\).**

$$
u = (1, 0, 1, 1), \quad\text{pois } t = 1 = 1 \cdot 1 = xz.
$$

**Passo 3: multiplicar por 2 e testar o filtro.**

$$
2u = (2, 0, 2, 2), \qquad xz = 2 \cdot 2 = 4 \neq 2 = t.
$$

**Resposta: F.** \(2u \notin U\), então não fecha no escalar.
{{< /details >}}


**Questão 2.** \(W = \{(x, y, z) \in \mathbb{R}^3 \mid z = x + 3y\}\) é subespaço de \(\mathbb{R}^3\)?


{{< details title="Resolução" >}}
**Passo 1: reescrever o filtro.**

$$
z = x + 3y \;\Longleftrightarrow\; x + 3y - z = 0.
$$

É uma equação linear igual a zero.

**Passo 2: provar com letras.** Sejam \(u = (x_1, y_1, z_1)\) e \(v = (x_2, y_2, z_2)\) em \(W\), com \(z_1 = x_1 + 3y_1\) e \(z_2 = x_2 + 3y_2\).

- *Zero:* \(0 = 0 + 3 \cdot 0\). ✓
- *Soma:* \(z_1 + z_2 = (x_1 + x_2) + 3(y_1 + y_2)\). ✓
- *Escalar:* \(\alpha z_1 = \alpha x_1 + 3(\alpha y_1)\). ✓

**Resposta: V.**
{{< /details >}}


**Questão 3.** \(U = \{(x, y, z) \in \mathbb{R}^3 \mid x = y = 3z\}\) é subespaço de \(\mathbb{R}^3\)?


{{< details title="Resolução" >}}
**Passo 1: reescrever o filtro.** \(x = y = 3z\) são duas equações:

$$
x - y = 0 \qquad\text{e}\qquad y - 3z = 0.
$$

**Passo 2: reconhecer o tipo.** Ambas são lineares e iguais a zero, então \(U\) é subespaço (teorema do "igual a zero").

**Passo 3: ver o que ele é.** \((x, y, z) = (3z, 3z, z) = z(3, 3, 1)\): uma reta pela origem.

**Resposta: V.**
{{< /details >}}


**Questão 4.** \(W = \{(x, y, z) \in \mathbb{R}^3 \mid z = x^2 + y\}\) é subespaço de \(\mathbb{R}^3\)?


{{< details title="Resolução" >}}
**Passo 1: o filtro.** \(z = x^2 + y\) tem um **quadrado**: desconfie.

**Passo 2: um elemento simples de \(W\).**

$$
u = (1, 0, 1), \quad\text{pois } z = 1 = 1^2 + 0.
$$

**Passo 3: multiplicar por 2 e testar.**

$$
2u = (2, 0, 2), \qquad x^2 + y = 4 + 0 = 4 \neq 2 = z.
$$

**Resposta: F.** Não fecha no escalar.
{{< /details >}}


**Questão 5.** \(W = \left\{\begin{bmatrix} a & b \\ c & d \end{bmatrix} \in M(2,2) \;\mid\; a = c \text{ e } b + d = 0\right\}\) é subespaço de \(M(2,2)\)? Se for, dê uma base.

{{< details title="Resolução" >}}
**Passo 1: reescrever o filtro.** São duas equações:

$$
a - c = 0 \qquad\text{e}\qquad b + d = 0.
$$

**Passo 2: reconhecer o tipo.** Ambas são lineares e iguais a zero, então \(W\) é subespaço (teorema do "igual a zero"). Com letras: se \(A\) e \(B\) estão em \(W\), somar as duas igualdades de cada uma mostra que \(A + B\) também passa; e multiplicar por \(\alpha\) mantém as igualdades.

**Passo 3: ver o que ele é.** Com \(c = a\) e \(d = -b\):

$$
\begin{bmatrix} a & b \\ a & -b \end{bmatrix}
= a\begin{bmatrix} 1 & 0 \\ 1 & 0 \end{bmatrix} + b\begin{bmatrix} 0 & 1 \\ 0 & -1 \end{bmatrix}.
$$

As duas matrizes não são múltiplas uma da outra, então são LI.

**Resposta: V.** Uma base é \(\left\{\begin{bmatrix} 1 & 0 \\ 1 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 0 & -1 \end{bmatrix}\right\}\), e \(\dim W = 2\).
{{< /details >}}


## 2. É base, é LI, é combinação linear? (V ou F)

Teoria: [Combinação linear](../combinacao-linear-e-geradores/), [Dependência linear](../dependencia-linear/) e [Base e dimensão](../base-e-dimensao/). Primeiro **conte** os vetores; depois decida entre determinante, sistema ou procurar uma relação.

**Questão 6.** \(\{(0, 1, 1), (-1, -1, 0), (0, 2, 3)\}\) é base de \(\mathbb{R}^3\)?


{{< details title="Resolução" >}}
**Passo 1: contar.** São 3 vetores e \(\dim \mathbb{R}^3 = 3\). Basta testar se são LI.

**Passo 2: determinante.**

$$
\det \begin{bmatrix} 0 & 1 & 1 \\ -1 & -1 & 0 \\ 0 & 2 & 3 \end{bmatrix}
= -1 \cdot \big((-1) \cdot 3 - 0 \cdot 0\big) + 1 \cdot \big((-1) \cdot 2 - (-1) \cdot 0\big)
$$

$$
= -1 \cdot (-3) + (-2) = 3 - 2 = 1.
$$

**Resposta: V.** \(\det = 1 \neq 0\), então os três são LI e formam base.
{{< /details >}}


**Questão 7.** \(S = \left\{\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 1 & 1 \end{bmatrix}, \begin{bmatrix} 5 & 5 \\ 5 & 5 \end{bmatrix}\right\}\) é base de \(M(2,2)\)?


{{< details title="Resolução" >}}
**Passo 1: contar.** São 4 matrizes e \(\dim M_{2\times 2}(\mathbb{R}) = 4\). Basta testar se são LI.

**Passo 2: procurar uma relação.** A quarta é

$$
\begin{bmatrix} 5 & 5 \\ 5 & 5 \end{bmatrix}
= 5\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} + 5\begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} + 5\begin{bmatrix} 0 & 0 \\ 1 & 1 \end{bmatrix}.
$$

Então a quarta é combinação das outras três.

**Resposta: F.** O conjunto é LD, então não é base.
{{< /details >}}


**Questão 8.** \(S = \left\{\begin{bmatrix} 0 & 0 \\ 1 & 1 \end{bmatrix}, \begin{bmatrix} 1 & -1 \\ 1 & -1 \end{bmatrix}, \begin{bmatrix} 2 & 3 \\ 0 & 0 \end{bmatrix}\right\}\) é LI em \(M(2,2)\)?


{{< details title="Resolução" >}}
**Passo 1: sistema homogêneo.** \(\alpha M_1 + \beta M_2 + \gamma M_3 = 0\), entrada por entrada:

$$
\begin{cases}
\beta + 2\gamma = 0 & (11) \\
-\beta + 3\gamma = 0 & (12) \\
\alpha + \beta = 0 & (21) \\
\alpha - \beta = 0 & (22)
\end{cases}
$$

**Passo 2: somar (11) e (12).**

$$
5\gamma = 0 \;\Longrightarrow\; \gamma = 0, \qquad \beta = 0, \qquad \alpha = 0.
$$

**Resposta: V.** Só a solução trivial, então \(S\) é LI.
{{< /details >}}


**Questão 9.** \((2, -2, 3, 0) \in [(0, 0, 1, -1), (1, -1, 0, 1)]\)?


{{< details title="Resolução" >}}
**Passo 1: montar a combinação.** \(a(0, 0, 1, -1) + b(1, -1, 0, 1) = (2, -2, 3, 0)\), ou seja,

$$
\begin{cases}
b = 2 \\
-b = -2 \\
a = 3 \\
-a + b = 0
\end{cases}
$$

**Passo 2: resolver as três primeiras.** \(b = 2\), \(-b = -2\) ✓ e \(a = 3\).

**Passo 3: testar na quarta.**

$$
-a + b = -3 + 2 = -1 \neq 0.
$$

**Resposta: F.** O sistema é impossível, então \((2, -2, 3, 0)\) não pertence ao gerado.
{{< /details >}}


**Questão 10.** O vetor \((1, -1, 2)\) pertence ao subespaço gerado por \((1, 2, 3)\) e \((3, 2, 1)\)?

{{< details title="Resolução" >}}
**Passo 1: montar o sistema.** \(a(1, 2, 3) + b(3, 2, 1) = (1, -1, 2)\):

$$
\begin{cases}
a + 3b = 1 \\
2a + 2b = -1 \\
3a + b = 2
\end{cases}
$$

**Passo 2: resolver duas e testar a que sobrou.** Da primeira, \(a = 1 - 3b\). Na segunda: \(2 - 6b + 2b = -1\), então \(b = \tfrac34\) e \(a = -\tfrac54\).

**Passo 3: testar na terceira.**

$$
3a + b = -\tfrac{15}{4} + \tfrac34 = -3 \neq 2.
$$

**Resposta: F.** O sistema é impossível, então o vetor não pertence ao gerado.
{{< /details >}}


## 3. Valor de \(k\)

Teoria: [Combinação linear](../combinacao-linear-e-geradores/) (para ser combinação) e [Dependência linear](../dependencia-linear/) (para ser LD ou LI). Em combinação, resolva as equações **sem** \(k\) e deixe a que tem \(k\) dar o valor. Em dependência, \(\det = 0\).

**Questão 11.** Determine \(k\) para que \(w = (5, k, -13)\) seja combinação linear de \(v_1 = (1, -3, -2)\) e \(v_2 = (1, 4, -3)\).


{{< details title="Resolução" >}}
**Passo 1: montar o sistema.** \(a v_1 + b v_2 = w\):

$$
\begin{cases}
a + b = 5 \\
-3a + 4b = k \\
-2a - 3b = -13
\end{cases}
$$

**Passo 2: resolver a 1ª e a 3ª** (as que não têm \(k\)).

Da primeira, \(a = 5 - b\). Na terceira:

$$
-2(5 - b) - 3b = -13 \;\Longrightarrow\; -10 - b = -13 \;\Longrightarrow\; b = 3.
$$

Então \(a = 2\).

**Passo 3: a 2ª equação dá o \(k\).**

$$
k = -3a + 4b = -6 + 12 = 6.
$$

**Passo 4: conferir.**

$$
2(1, -3, -2) + 3(1, 4, -3) = (5, 6, -13). \;✓
$$

**Resposta:** \(k = 6\).
{{< /details >}}


**Questão 12.** Determine \(k\) para que \(w = (-10, -13, k^2 - 6k)\) pertença a \([(1, 1, -1), (4, 5, 2)]\).


{{< details title="Resolução" >}}
**Passo 1: montar o sistema.** \(a(1,1,-1) + b(4,5,2) = (-10, -13, k^2 - 6k)\):

$$
\begin{cases}
a + 4b = -10 \\
a + 5b = -13 \\
-a + 2b = k^2 - 6k
\end{cases}
$$

**Passo 2: resolver as duas primeiras** (sem \(k\)).

Subtraindo: \(b = -3\). Então \(a = -10 + 12 = 2\).

**Passo 3: a terceira dá a equação em \(k\).**

$$
-2 + 2(-3) = k^2 - 6k \;\Longrightarrow\; k^2 - 6k + 8 = 0.
$$

**Passo 4: resolver.**

$$
(k - 2)(k - 4) = 0.
$$

**Passo 5: conferir.** \(k = 2\): \(4 - 12 = -8\) ✓. \(k = 4\): \(16 - 24 = -8\) ✓. E \(-a + 2b = -2 - 6 = -8\).

**Resposta:** \(k = 2\) ou \(k = 4\).
{{< /details >}}


**Questão 13.** Determine \(k\) para que \(\{(1, 2, 0), (0, -3, 4), (k, 3, 4)\}\) seja LD.


{{< details title="Resolução" >}}
**Passo 1: LD é determinante zero.**

$$
\det \begin{bmatrix} 1 & 2 & 0 \\ 0 & -3 & 4 \\ k & 3 & 4 \end{bmatrix}
= 1(-12 - 12) - 2(0 - 4k) + 0 = -24 + 8k.
$$

**Passo 2: igualar a zero.**

$$
-24 + 8k = 0 \;\Longrightarrow\; k = 3.
$$

**Resposta:** \(k = 3\).
{{< /details >}}


**Questão 14.** Determine \(k\) para que \(\{(1, 0, -3), (0, 2, 4), (1, k^2, 5)\}\) seja LD.


{{< details title="Resolução" >}}
**Passo 1: determinante.**

$$
\det \begin{bmatrix} 1 & 0 & -3 \\ 0 & 2 & 4 \\ 1 & k^2 & 5 \end{bmatrix}
= 1(10 - 4k^2) - 0 + (-3)(0 - 2) = 16 - 4k^2.
$$

**Passo 2: igualar a zero.**

$$
16 - 4k^2 = 0 \;\Longrightarrow\; k^2 = 4.
$$

**Resposta:** \(k = 2\) ou \(k = -2\).
{{< /details >}}


## 4. Dimensão de um subespaço (parâmetros ou geradores)

Teoria: [Base e dimensão](../base-e-dimensao/), seção "Quando o subespaço vem por parâmetros". Separe uma matriz (ou vetor) por parâmetro e **procure o que sobra**. Em todas as questões desta seção a resposta é **2**, e não 3.

**Questão 15.** Dimensão de \(W = \left\{\begin{bmatrix} a + b & 3c - b \\ a + 3c & 0 \end{bmatrix} \mid a, b, c \in \mathbb{R}\right\}\).


{{< details title="Resolução" >}}
**Passo 1: separar uma matriz por parâmetro.**

$$
\begin{bmatrix} a + b & 3c - b \\ a + 3c & 0 \end{bmatrix}
= a\begin{bmatrix} 1 & 0 \\ 1 & 0 \end{bmatrix} +
b\begin{bmatrix} 1 & -1 \\ 0 & 0 \end{bmatrix} +
c\begin{bmatrix} 0 & 3 \\ 3 & 0 \end{bmatrix}
$$

**Passo 2: traduzir para listas** (entradas \(11, 12, 21, 22\)).

$$
(1, 0, 1, 0), \qquad (1, -1, 0, 0), \qquad (0, 3, 3, 0)
$$

**Passo 3: escalonar** (o número de linhas não nulas é a dimensão).

$$
\begin{bmatrix} 1 & 0 & 1 & 0 \\ 1 & -1 & 0 & 0 \\ 0 & 3 & 3 & 0 \end{bmatrix}
\xrightarrow{L_2 \to L_2 - L_1}
\begin{bmatrix} 1 & 0 & 1 & 0 \\ 0 & -1 & -1 & 0 \\ 0 & 3 & 3 & 0 \end{bmatrix}
\xrightarrow{L_3 \to L_3 + 3L_2}
\begin{bmatrix} 1 & 0 & 1 & 0 \\ 0 & -1 & -1 & 0 \\ 0 & 0 & 0 & 0 \end{bmatrix}
$$

**Passo 4: conferir a relação.** A terceira lista é \(3\) vezes a primeira menos \(3\) vezes a segunda:

$$
3(1, 0, 1, 0) - 3(1, -1, 0, 0) = (0, 3, 3, 0). \;✓
$$

**Resposta:** \(\dim W = 2\). *(Responder 3 sem testar a independência é o erro clássico desta questão.)*
{{< /details >}}


**Questão 16.** Dimensão de \(W = \left\{\begin{bmatrix} 3a - 3b & -a - c \\ b + c & 5a + 5c \end{bmatrix} \mid a, b, c \in \mathbb{R}\right\}\).


{{< details title="Resolução" >}}
**Passo 1: separar uma matriz por parâmetro.**

$$
a\begin{bmatrix} 3 & -1 \\ 0 & 5 \end{bmatrix} +
b\begin{bmatrix} -3 & 0 \\ 1 & 0 \end{bmatrix} +
c\begin{bmatrix} 0 & -1 \\ 1 & 5 \end{bmatrix}
$$

**Passo 2: procurar uma relação.** Somando as duas primeiras:

$$
\begin{bmatrix} 3 & -1 \\ 0 & 5 \end{bmatrix} + \begin{bmatrix} -3 & 0 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -1 \\ 1 & 5 \end{bmatrix},
$$

que é a terceira. Então a terceira é combinação das duas primeiras.

**Passo 3: sobram duas.** A primeira e a segunda não são múltiplas uma da outra, então são LI.

**Resposta:** \(\dim W = 2\).
{{< /details >}}


**Questão 17.** Dimensão de \(U = \left[\begin{bmatrix} 1 & 0 \\ 2 & 1 \end{bmatrix}, \begin{bmatrix} 1 & 0 \\ 1 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 1 & 1 \end{bmatrix}\right]\).


{{< details title="Resolução" >}}
**Passo 1: traduzir para listas** (entradas \(11, 12, 21, 22\)).

$$
(1, 0, 2, 1), \qquad (1, 0, 1, 0), \qquad (0, 0, 1, 1)
$$

**Passo 2: procurar uma relação.** A primeira menos a segunda dá

$$
(1, 0, 2, 1) - (1, 0, 1, 0) = (0, 0, 1, 1),
$$

que é exatamente a terceira. Então a terceira **é combinação** das outras duas.

**Passo 3: sobram duas.** A primeira e a segunda não são múltiplas uma da outra, então são LI e geram \(U\).

**Resposta:** \(\dim U = 2\).
{{< /details >}}


**Questão 18.** Dimensão de \(W = \left[\begin{bmatrix} 1 & 0 \\ 2 & -5 \end{bmatrix}, \begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} 0 & 2 \\ -4 & 10 \end{bmatrix}\right]\).


{{< details title="Resolução" >}}
**Passo 1: traduzir para listas.**

$$
M_1 = (1, 0, 2, -5), \qquad M_2 = (1, 1, 0, 0), \qquad M_3 = (0, 2, -4, 10)
$$

**Passo 2: procurar uma relação.**

$$
M_2 - M_1 = (0, 1, -2, 5), \qquad 2(M_2 - M_1) = (0, 2, -4, 10) = M_3.
$$

Então \(M_3 = 2M_2 - 2M_1\) é combinação das outras duas.

**Passo 3: sobram duas.** \(M_1\) e \(M_2\) não são múltiplas uma da outra, então são LI.

**Resposta:** \(\dim W = 2\).
{{< /details >}}


## 5. Lista LI: completar a uma base

Teoria: [Base e dimensão](../base-e-dimensao/), seção "Completar uma lista LI até uma base". Receita: provar que é LI, escalonar, acrescentar o canônico de cada **coluna sem pivô** e provar que a lista nova é LI.

**Questão 19.** Mostre que \(S = \{(1,1,1,1), (2,-1,0,0), (1,0,0,0)\}\) é LI em \(\mathbb{R}^4\) e dê uma base de \(\mathbb{R}^4\) que contenha \(S\).


{{< details title="Resolução" >}}
**Parte 1: \(S\) é LI.**

**Passo 1: sistema homogêneo.** \(\alpha(1,1,1,1) + \beta(2,-1,0,0) + \gamma(1,0,0,0) = 0\):

$$
\begin{cases}
\alpha + 2\beta + \gamma = 0 \\
\alpha - \beta = 0 \\
\alpha = 0 \\
\alpha = 0
\end{cases}
$$

**Passo 2: resolver de baixo para cima.**

$$
\alpha = 0 \;\Longrightarrow\; \beta = 0 \;(\text{eq. 2}) \;\Longrightarrow\; \gamma = 0 \;(\text{eq. 1}).
$$

Só a solução trivial, então \(S\) é **LI**. ∎

**Parte 2: completar para uma base.**

**Passo 3: escalonar \(S\)** para ver qual coluna não tem pivô.

$$
\begin{bmatrix} 1 & 0 & 0 & 0 \\ 2 & -1 & 0 & 0 \\ 1 & 1 & 1 & 1 \end{bmatrix}
\to
\begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & -1 & 0 & 0 \\ 0 & 0 & 1 & 1 \end{bmatrix}
$$

Os pivôs estão nas colunas 1, 2 e 3. Falta a coluna **4**.

**Passo 4: acrescentar \(e_4 = (0, 0, 0, 1)\).**

**Passo 5: mostrar que a nova lista é LI.**

$$
\begin{cases}
\alpha + 2\beta + \gamma = 0 \\
\alpha - \beta = 0 \\
\alpha = 0 \\
\alpha + \delta = 0
\end{cases}
\;\Longrightarrow\; \alpha = \beta = \gamma = \delta = 0.
$$

**Passo 6: usar a dimensão.** Quatro vetores LI em \(\mathbb{R}^4\) (dimensão 4) formam uma base.

**Resposta:** \(\{(1,1,1,1),\; (2,-1,0,0),\; (1,0,0,0),\; (0,0,0,1)\}\). *(O determinante da matriz com esses vetores é \(1\).)*
{{< /details >}}


## 6. Lista LD: base contida no conjunto

Teoria: [Base e dimensão](../base-e-dimensao/), seção "Base contida no conjunto dado". Receita: vetores como **colunas**, escalonar, ficar com os **vetores originais** das colunas com pivô.

**Questão 20.** Sejam \(v_1 = (1, 0, 0)\), \(v_2 = (2, 1, 0)\), \(v_3 = (5, -3, 0)\), \(v_4 = (-4, -5, 1)\) e \(W = [v_1, v_2, v_3, v_4]\). Mostre que são LD e dê uma base de \(W\) contida em \(\{v_1, v_2, v_3, v_4\}\).


{{< details title="Resolução" >}}
**Parte 1: são LD.**

São 4 vetores em \(\mathbb{R}^3\), e \(\dim \mathbb{R}^3 = 3\). Mais vetores que a dimensão, então são **LD**.

**Parte 2: base contida no conjunto** (método das colunas, na seção "Base contida no conjunto dado" de [Base e Dimensão](../base-e-dimensao/)).

**Passo 1: vetores como colunas.**

$$
\begin{bmatrix} 1 & 2 & 5 & -4 \\ 0 & 1 & -3 & -5 \\ 0 & 0 & 0 & 1 \end{bmatrix}
$$

Essa matriz **já está escalonada**.

**Passo 2: ler os pivôs.** Estão nas colunas 1, 2 e 4. A coluna 3 não tem pivô.

**Passo 3: ler a relação da coluna sem pivô.** Resolvendo \(a v_1 + b v_2 = v_3\):

$$
\begin{cases} a + 2b = 5 \\ b = -3 \end{cases}
\;\Longrightarrow\; b = -3,\; a = 11.
$$

Então \(v_3 = 11 v_1 - 3 v_2\), e a relação \(11v_1 - 3v_2 - v_3 = 0\) também mostra que são LD.

**Passo 4: justificar a base.** Os vetores **originais** das colunas com pivô, \(v_1\), \(v_2\) e \(v_4\), são LI:

$$
\det \begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ -4 & -5 & 1 \end{bmatrix} = 1 \neq 0.
$$

E eles geram \(W\), porque o vetor que ficou de fora (\(v_3\)) é combinação deles.

**Resposta:** base \(\{v_1, v_2, v_4\}\) e \(W = \mathbb{R}^3\) (3 vetores LI em \(\mathbb{R}^3\)).
{{< /details >}}


## 7. Base, interseção e soma de dois subespaços

Teoria: [Soma de subespaços](../soma-de-subespacos/). O roteiro é sempre o mesmo: base e dimensão de cada um, interseção, fórmula \(\dim(W_1 + W_2) = \dim W_1 + \dim W_2 - \dim(W_1 \cap W_2)\) e soma direta (interseção \(= \{0\}\)). Quando um subespaço vem por **parâmetros** e o outro por **equações**, a interseção sai **substituindo**; quando um deles é descrito por uma palavra ("simétrica"), traduza para equação primeiro.

**Questão 21.** Em \(M(2,2)\), sejam \(W_1 = \left\{\begin{bmatrix} x & y \\ z & t \end{bmatrix} \mid x = t,\; y = z\right\}\) e \(W_2 = \left\{\begin{bmatrix} a - 4b & a \\ 0 & 2b \end{bmatrix} \mid a, b \in \mathbb{R}\right\}\). Determine: (a) base e dimensão de \(W_1\); (b) base e dimensão de \(W_2\); (c) \(W_1 \cap W_2\); (d) \(\dim(W_1 + W_2)\) e se a soma é direta.


{{< details title="Resolução do item (a)" >}}
**Passo 1: aplicar os filtros.** Com \(t = x\) e \(z = y\), a matriz é \(\begin{bmatrix} x & y \\ y & x \end{bmatrix}\). Variáveis livres: \(x\) e \(y\).

**Passo 2: separar por variável livre.**

$$
\begin{bmatrix} x & y \\ y & x \end{bmatrix}
= x\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} + y\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}
$$

**Passo 3: LI?** As duas matrizes não são múltiplas uma da outra.

**Resposta:** base \(\left\{\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}\right\}\) e \(\dim W_1 = 2\).
{{< /details >}}

{{< details title="Resolução do item (b)" >}}
**Passo 1: separar por parâmetro.**

$$
\begin{bmatrix} a - 4b & a \\ 0 & 2b \end{bmatrix}
= a\begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix} + b\begin{bmatrix} -4 & 0 \\ 0 & 2 \end{bmatrix}
$$

**Passo 2: LI?** Não são múltiplas uma da outra (a primeira tem entrada \(12\) não nula; a segunda tem \(0\) ali).

**Resposta:** base \(\left\{\begin{bmatrix} 1 & 1 \\ 0 & 0 \end{bmatrix}, \begin{bmatrix} -4 & 0 \\ 0 & 2 \end{bmatrix}\right\}\) e \(\dim W_2 = 2\).
{{< /details >}}

{{< details title="Resolução do item (c)" >}}
**Passo 1: matriz genérica de \(W_2\)** (parâmetros) e filtros de \(W_1\) (equações). Os elementos são

$$
x = a - 4b, \qquad y = a, \qquad z = 0, \qquad t = 2b.
$$

**Passo 2: aplicar \(y = z\).**

$$
a = 0.
$$

**Passo 3: aplicar \(x = t\).**

$$
a - 4b = 2b \;\Longrightarrow\; -4b = 2b \;\Longrightarrow\; b = 0.
$$

**Resposta:** com \(a = b = 0\), só sobra a matriz nula: \(W_1 \cap W_2 = \{0\}\).
{{< /details >}}

{{< details title="Resolução do item (d)" >}}
**Passo 1: fórmula.**

$$
\dim(W_1 + W_2) = 2 + 2 - 0 = 4.
$$

**Passo 2: comparar com o espaço.** \(\dim M_{2\times 2}(\mathbb{R}) = 4\), então \(W_1 + W_2 = M_{2\times 2}(\mathbb{R})\).

**Passo 3: soma direta?** A interseção é \(\{0\}\).

**Resposta:** \(\dim(W_1 + W_2) = 4\) e a soma **é direta**.
{{< /details >}}


**Questão 22.** Em \(M(2,2)\), sejam \(W_1 = \left\{\begin{bmatrix} x & y \\ z & t \end{bmatrix} \mid x = t,\; z = 3y\right\}\) e \(W_2 = \{X \in M(2,2) \mid X \text{ é simétrica}\}\). Determine: (a) base e dimensão de \(W_1\); (b) base e dimensão de \(W_2\); (c) \(W_1 \cap W_2\); (d) \(\dim(W_1 + W_2)\) e se a soma é direta.


{{< details title="Resolução do item (a)" >}}
**Passo 1: aplicar os filtros.** Com \(t = x\) e \(z = 3y\):

$$
\begin{bmatrix} x & y \\ 3y & x \end{bmatrix}
= x\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} + y\begin{bmatrix} 0 & 1 \\ 3 & 0 \end{bmatrix}
$$

**Passo 2: LI?** Não são múltiplas uma da outra.

**Resposta:** base \(\left\{\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 3 & 0 \end{bmatrix}\right\}\) e \(\dim W_1 = 2\).
{{< /details >}}

{{< details title="Resolução do item (b)" >}}
**Passo 1: simétrica** quer dizer \(X = X^T\), ou seja, entrada \(12\) igual à \(21\):

$$
\begin{bmatrix} a & b \\ b & d \end{bmatrix}
= a\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} + b\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} + d\begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}
$$

**Passo 2: LI?** Cada matriz tem uma entrada que as outras não têm, então são LI.

**Resposta:** base com essas 3 matrizes e \(\dim W_2 = 3\).
{{< /details >}}

{{< details title="Resolução do item (c)" >}}
**Passo 1: uma matriz em \(W_2\)** (simétrica) tem \(z = y\). Uma matriz em \(W_1\) tem \(z = 3y\) e \(x = t\).

**Passo 2: valer nos dois.**

$$
z = y \text{ e } z = 3y \;\Longrightarrow\; y = 3y \;\Longrightarrow\; y = 0, \; z = 0.
$$

**Passo 3: sobra a condição \(x = t\).**

$$
\begin{bmatrix} x & 0 \\ 0 & x \end{bmatrix} = x\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}.
$$

**Resposta:** \(W_1 \cap W_2 = \left[\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}\right]\) (os múltiplos da identidade), de dimensão 1.
{{< /details >}}

{{< details title="Resolução do item (d)" >}}
**Passo 1: fórmula.**

$$
\dim(W_1 + W_2) = 2 + 3 - 1 = 4.
$$

**Passo 2:** \(\dim M_{2\times 2}(\mathbb{R}) = 4\), então \(W_1 + W_2 = M_{2\times 2}(\mathbb{R})\).

**Passo 3: soma direta?** A interseção tem dimensão 1, não é \(\{0\}\).

**Resposta:** \(\dim(W_1 + W_2) = 4\) e a soma **não é direta**.
{{< /details >}}


**Questão 23.** Em \(\mathbb{R}^5\), sejam \(W_1 = \{(x, y, z, t, w) \mid x = 3w,\; z = t\}\) e \(W_2 = \{(a + b,\; a + b,\; a,\; a,\; a) \mid a, b \in \mathbb{R}\}\). Determine: (a) base e dimensão de \(W_1\); (b) base e dimensão de \(W_2\); (c) \(W_1 \cap W_2\); (d) \(\dim(W_1 + W_2)\) e se a soma é direta.


{{< details title="Resolução do item (a)" >}}
**Passo 1: aplicar os filtros.** Com \(x = 3w\) e \(t = z\): \((3w,\; y,\; z,\; z,\; w)\). Variáveis livres: \(y\), \(z\), \(w\).

**Passo 2: separar por variável livre.**

$$
(3w, y, z, z, w) = y\,(0,1,0,0,0) + z\,(0,0,1,1,0) + w\,(3,0,0,0,1).
$$

**Passo 3: LI?** Cada vetor tem uma posição em que os outros têm zero (\(y\) na 2ª, \(z\) na 3ª, \(w\) na 5ª), então são LI.

**Resposta:** base \(\{(0,1,0,0,0),\; (0,0,1,1,0),\; (3,0,0,0,1)\}\) e \(\dim W_1 = 3\).
{{< /details >}}

{{< details title="Resolução do item (b)" >}}
**Passo 1: separar por parâmetro.**

$$
(a + b, a + b, a, a, a) = a\,(1,1,1,1,1) + b\,(1,1,0,0,0).
$$

**Passo 2: LI?** Não são múltiplos um do outro.

**Resposta:** base \(\{(1,1,1,1,1),\; (1,1,0,0,0)\}\) e \(\dim W_2 = 2\).
{{< /details >}}

{{< details title="Resolução do item (c)" >}}
**Passo 1: vetor genérico de \(W_2\)** e equações de \(W_1\). Aqui \(x = a + b\), \(z = a\), \(t = a\), \(w = a\).

**Passo 2: aplicar \(x = 3w\).**

$$
a + b = 3a \;\Longrightarrow\; b = 2a.
$$

**Passo 3: aplicar \(z = t\).**

$$
a = a \quad(\text{sempre vale}).
$$

**Passo 4: voltar para o vetor.** Com \(b = 2a\):

$$
(3a, 3a, a, a, a) = a\,(3, 3, 1, 1, 1).
$$

**Resposta:** \(W_1 \cap W_2 = [(3, 3, 1, 1, 1)]\), de dimensão 1.
{{< /details >}}

{{< details title="Resolução do item (d)" >}}
**Passo 1: fórmula.**

$$
\dim(W_1 + W_2) = 3 + 2 - 1 = 4.
$$

**Passo 2: soma direta?** A interseção tem dimensão 1, então não é \(\{0\}\).

**Resposta:** \(\dim(W_1 + W_2) = 4\) e a soma **não é direta**. (Também não é \(\mathbb{R}^5\), pois \(4 < 5\).)
{{< /details >}}


**Questão 24.** Em \(\mathbb{R}^5\), sejam \(W_1 = \{(a, a, a, a + b, a - b) \mid a, b \in \mathbb{R}\}\) e \(W_2 = \{(x, y, z, t, w) \mid x = 2y,\; t = w\}\). Determine: (a) base e dimensão de \(W_1\); (b) base e dimensão de \(W_2\); (c) \(W_1 \cap W_2\); (d) \(\dim(W_1 + W_2)\) e se a soma é direta.


{{< details title="Resolução do item (a)" >}}
**Passo 1: separar por parâmetro.**

$$
(a, a, a, a + b, a - b) = a\,(1,1,1,1,1) + b\,(0,0,0,1,-1).
$$

**Passo 2: LI?** Não são múltiplos um do outro.

**Resposta:** base \(\{(1,1,1,1,1),\; (0,0,0,1,-1)\}\) e \(\dim W_1 = 2\).
{{< /details >}}

{{< details title="Resolução do item (b)" >}}
**Passo 1: aplicar os filtros.** Com \(x = 2y\) e \(t = w\): \((2y,\; y,\; z,\; w,\; w)\). Variáveis livres: \(y\), \(z\), \(w\).

**Passo 2: separar por variável livre.**

$$
(2y, y, z, w, w) = y\,(2,1,0,0,0) + z\,(0,0,1,0,0) + w\,(0,0,0,1,1).
$$

**Passo 3: LI?** Cada vetor tem uma posição em que os outros têm zero, então são LI.

**Resposta:** base \(\{(2,1,0,0,0),\; (0,0,1,0,0),\; (0,0,0,1,1)\}\) e \(\dim W_2 = 3\).
{{< /details >}}

{{< details title="Resolução do item (c)" >}}
**Passo 1: vetor genérico de \(W_1\)** e equações de \(W_2\). Aqui \(x = a\), \(y = a\), \(t = a + b\), \(w = a - b\).

**Passo 2: aplicar \(x = 2y\).**

$$
a = 2a \;\Longrightarrow\; a = 0.
$$

**Passo 3: aplicar \(t = w\).**

$$
a + b = a - b \;\Longrightarrow\; 2b = 0 \;\Longrightarrow\; b = 0.
$$

**Resposta:** com \(a = b = 0\) o vetor é nulo: \(W_1 \cap W_2 = \{0\}\).
{{< /details >}}

{{< details title="Resolução do item (d)" >}}
**Passo 1: fórmula.**

$$
\dim(W_1 + W_2) = 2 + 3 - 0 = 5.
$$

**Passo 2:** \(\dim \mathbb{R}^5 = 5\), então \(W_1 + W_2 = \mathbb{R}^5\).

**Passo 3: soma direta?** A interseção é \(\{0\}\).

**Resposta:** \(\dim(W_1 + W_2) = 5\) e a soma **é direta**: \(\mathbb{R}^5 = W_1 \oplus W_2\).
{{< /details >}}
