---
title: Combinação Linear e Geradores
weight: 4
description: O que dá para fabricar a partir de alguns vetores, o subespaço gerado e como achar geradores.
autores:
  - thallesgsrv
date: 2026-10-29
---

## Sobre

Imagine que você tem alguns **ingredientes** (vetores) e pode fazer **receitas** com eles: pegar uma quantidade de cada um e misturar. Uma receita assim é uma **combinação linear**. O conjunto de **tudo** o que dá para fazer com esses ingredientes é o **subespaço gerado** por eles.

Duas perguntas guiam esta página:

1. Este vetor **dá para fabricar** com estes ingredientes?
2. Estes ingredientes **fabricam tudo** o que eu preciso?

## Combinação linear

Sejam \(v_1, v_2, \ldots, v_k\) vetores de um espaço vetorial \(V\). Um vetor \(v\) é **combinação linear** deles quando existem escalares \(a_1, a_2, \ldots, a_k\) tais que

$$
v = a_1 v_1 + a_2 v_2 + \cdots + a_k v_k.
$$

Os números \(a_i\) são os **coeficientes** da combinação. Eles podem ser positivos, negativos ou zero.

**Exemplo 1.** Em \(\mathbb{R}^2\), sejam \(v_1 = (1, 2)\) e \(v_2 = (3, 1)\). O vetor \((5, 5)\) é combinação linear deles? Procuramos \(a\) e \(b\) tais que

$$
a(1, 2) + b(3, 1) = (5, 5) \;\Longrightarrow\; \begin{cases} a + 3b = 5 \\ 2a + b = 5 \end{cases}
$$

Da primeira, \(a = 5 - 3b\). Na segunda: \(10 - 6b + b = 5\), então \(b = 1\) e \(a = 2\). Conferindo: \(2(1, 2) + 1 \cdot (3, 1) = (5, 5)\). ✓

> [!NOTE]
> **Toda pergunta "este vetor é combinação linear destes?" vira um sistema linear.** Os vetores dados viram as **colunas** da matriz, e o vetor que queremos obter vira a coluna dos termos independentes. Se o sistema tem solução, a resposta é sim, e a solução dá os coeficientes.

**Exemplo 2.** Em \(\mathbb{R}^3\), sejam \(v_1 = (1, 0, 1)\) e \(v_2 = (0, 1, 1)\).

*(a)* \(v = (2, 3, 5)\) é combinação linear deles? Precisamos de \(a v_1 + b v_2 = (a, b, a + b)\). Para ficar igual a \((2, 3, 5)\), \(a = 2\), \(b = 3\), e a terceira coordenada \(a + b = 5\) bate. **Sim**: \(v = 2v_1 + 3v_2\).

*(b)* \(w = (2, 3, 4)\) é combinação linear deles? De novo \(a = 2\) e \(b = 3\) (pelas duas primeiras coordenadas), mas aí a terceira seria \(a + b = 5 \neq 4\). Em forma de matriz aumentada:

$$
\left[\begin{array}{cc|c} 1 & 0 & 2 \\ 0 & 1 & 3 \\ 1 & 1 & 4 \end{array}\right]
\xrightarrow{L_3 \to L_3 - L_1 - L_2}
\left[\begin{array}{cc|c} 1 & 0 & 2 \\ 0 & 1 & 3 \\ 0 & 0 & -1 \end{array}\right]
$$

A última linha diz \(0 = -1\), impossível. **Não** é combinação linear.

**Exemplo 3 (polinômios).** Em \(P_2\), \(p(x) = x^2 + 2x + 3\) é combinação linear de \(q_1 = x^2 + 1\), \(q_2 = x + 1\) e \(q_3 = x\)? Queremos \(a q_1 + b q_2 + c q_3 = p\):

$$
a(x^2 + 1) + b(x + 1) + cx = ax^2 + (b + c)x + (a + b).
$$

Igualando coeficientes: \(a = 1\) (do \(x^2\)), \(b + c = 2\) (do \(x\)) e \(a + b = 3\) (do termo constante). Então \(b = 2\) e \(c = 0\). Sim: \(p = q_1 + 2q_2\).

> [!TIP]
> Em espaços de polinômios e de matrizes, a estratégia é a mesma: escreva os dois lados, **compare coeficiente a coeficiente** (ou entrada a entrada) e resolva o sistema.

## O subespaço gerado

O conjunto de **todas** as combinações lineares de \(v_1, \ldots, v_k\) é chamado de **subespaço gerado** por eles, e escrevemos

$$
[v_1, \ldots, v_k] = \{\, a_1 v_1 + \cdots + a_k v_k \;:\; a_1, \ldots, a_k \in \mathbb{R} \,\}.
$$

(Alguns livros usam \(\text{span}\{v_1, \ldots, v_k\}\) ou \(\langle v_1, \ldots, v_k \rangle\).)

**Teorema.** \([v_1, \ldots, v_k]\) é um **subespaço** de \(V\), e é o **menor** subespaço que contém \(v_1, \ldots, v_k\).

**Por que é subespaço?** O vetor nulo está lá (todos os coeficientes iguais a zero). A soma de duas combinações é outra combinação (some os coeficientes de cada \(v_i\)). E esticar uma combinação é outra combinação (multiplique todos os coeficientes). Os três passos valem.

**O que isso parece geometricamente:**

- Um vetor \(v \neq 0\) gera uma **reta** pela origem: \([v] = \{a v\}\).
- Dois vetores **não paralelos** em \(\mathbb{R}^3\) geram um **plano** pela origem.
- Dois vetores **paralelos** geram só uma reta (o segundo não acrescenta nada).
- Três vetores "bem espalhados" em \(\mathbb{R}^3\) geram o espaço todo.

## Conjunto gerador

Dizemos que \(v_1, \ldots, v_k\) **geram** \(V\) (ou formam um **conjunto gerador** de \(V\)) quando \([v_1, \ldots, v_k] = V\), isto é, **todo** vetor de \(V\) é combinação linear deles.

**Exemplo 4.** Os vetores \(e_1 = (1, 0, 0)\), \(e_2 = (0, 1, 0)\) e \(e_3 = (0, 0, 1)\) geram \(\mathbb{R}^3\), porque qualquer vetor se escreve como

$$
(x, y, z) = x\,e_1 + y\,e_2 + z\,e_3.
$$

**Exemplo 5.** Os vetores \((1, 1)\) e \((1, -1)\) geram \(\mathbb{R}^2\). Dado \((x, y)\), buscamos \(a(1, 1) + b(1, -1) = (x, y)\):

$$
a + b = x, \qquad a - b = y \;\Rightarrow\; a = \frac{x + y}{2}, \quad b = \frac{x - y}{2}.
$$

Sempre dá para resolver, para qualquer \((x, y)\). Então geram.

**Exemplo 6.** Os vetores \((1, 2)\) e \((2, 4)\) **não** geram \(\mathbb{R}^2\): ambos são múltiplos de \((1, 2)\), então todas as combinações ficam em cima da reta \(y = 2x\). O vetor \((1, 0)\), por exemplo, nunca é alcançado.

**Como decidir se vetores geram \(\mathbb{R}^n\):** coloque os vetores como **colunas** de uma matriz e escalone. Eles geram \(\mathbb{R}^n\) se, e somente se, **toda linha** da matriz escalonada tem pivô (não sobra linha de zeros). Em outras palavras: o sistema \(Ax = b\) tem solução para **qualquer** \(b\).

> [!WARNING]
> Para gerar \(\mathbb{R}^n\) são necessários **pelo menos \(n\) vetores**. Dois vetores nunca geram \(\mathbb{R}^3\), por mais "bonitos" que sejam: eles geram no máximo um plano.

## A habilidade mais cobrada: achar geradores

Muitos exercícios dão um subespaço por **equações** e pedem um conjunto gerador. A receita:

1. Resolva as equações, deixando algumas variáveis **livres**.
2. Escreva o vetor genérico do subespaço em função das variáveis livres.
3. Separe uma parcela para cada variável livre. Cada parcela, sem o coeficiente, é um gerador.

**Exemplo 7.** \(W = \{(x, y, z) \in \mathbb{R}^3 : z = x + y\}\).
Variáveis livres: \(x\) e \(y\). O vetor genérico é

$$
(x, y, x + y) = x\,(1, 0, 1) + y\,(0, 1, 1).
$$

Então \(W = [(1, 0, 1), (0, 1, 1)]\).

**Exemplo 8.** \(W = \{(x, y, z, t) \in \mathbb{R}^4 : x = y \text{ e } z = t\}\).
Livres: \(x\) e \(z\). O vetor genérico é \((x, x, z, z)\):

$$
(x, x, z, z) = x\,(1, 1, 0, 0) + z\,(0, 0, 1, 1).
$$

Então \(W = [(1, 1, 0, 0), (0, 0, 1, 1)]\).

**Exemplo 9 (matrizes).** As matrizes simétricas \(2 \times 2\) têm a forma

$$
\begin{bmatrix} a & b \\ b & c \end{bmatrix} =
a \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} +
b \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} +
c \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix},
$$

então são geradas por essas três matrizes.

**Exemplo 10 (polinômios).** \(W = \{p \in P_2 : p(1) = 0\}\). Um polinômio \(p(x) = ax^2 + bx + c\) está em \(W\) quando \(a + b + c = 0\), ou seja, \(c = -a - b\):

$$
p(x) = ax^2 + bx - a - b = a(x^2 - 1) + b(x - 1).
$$

Então \(W = [x^2 - 1,\; x - 1]\).

## Exercícios

**Exercício 1.** Escreva \((7, 4)\) como combinação linear de \((1, 1)\) e \((2, -1)\).

{{< details title="Resolução" >}}
Queremos \(a(1, 1) + b(2, -1) = (7, 4)\), ou seja, \(a + 2b = 7\) e \(a - b = 4\). Subtraindo: \(3b = 3\), então \(b = 1\) e \(a = 5\). Conferindo: \(5(1, 1) + (2, -1) = (7, 4)\). ✓
{{< /details >}}

**Exercício 2.** Ache um conjunto gerador para \(W = \{(x, y, z) \in \mathbb{R}^3 : x - 2y + z = 0\}\).

{{< details title="Resolução" >}}
Isolando \(z = 2y - x\), as variáveis livres são \(x\) e \(y\):

$$
(x, y, 2y - x) = x\,(1, 0, -1) + y\,(0, 1, 2).
$$

Então \(W = [(1, 0, -1), (0, 1, 2)]\). Conferindo o primeiro gerador: \(1 - 0 + (-1) = 0\). ✓
{{< /details >}}

**Exercício 3.** Os vetores \((1, 2)\), \((2, 4)\) e \((3, 6)\) geram \(\mathbb{R}^2\)?

{{< details title="Gabarito" >}}
Não. Os três são múltiplos de \((1, 2)\), então geram só a reta \(y = 2x\).
{{< /details >}}

**Exercício 4.** Para qual valor de \(t\) o vetor \((1, 2, t)\) pertence a \([(1, 0, 1), (0, 1, 1)]\)?

{{< details title="Resolução" >}}
Um vetor genérico do subespaço é \(a(1, 0, 1) + b(0, 1, 1) = (a, b, a + b)\). Para ser \((1, 2, t)\), precisamos \(a = 1\), \(b = 2\) e \(t = a + b = 3\). Então \(t = 3\).
{{< /details >}}

**Exercício 5.** O polinômio \(x^2 + x\) pertence a \([x^2 + 1, x + 1]\)?

{{< details title="Resolução" >}}
Procuramos \(a(x^2 + 1) + b(x + 1) = ax^2 + bx + (a + b)\). Para ser \(x^2 + x + 0\), precisamos \(a = 1\), \(b = 1\) e \(a + b = 0\). Mas \(1 + 1 = 2 \neq 0\). Não pertence.
{{< /details >}}

## Teste rápido

{{< quiz titulo="combinação e geradores" >}}

{{< questao >}}
Qual afirmação descreve **corretamente** o subespaço gerado \([v_1, v_2]\)?

- [ ] É só o conjunto \(\{v_1, v_2\}\)
- [ ] É o conjunto dos vetores da forma \(a v_1 + b v_2\) com \(a, b \geq 0\)
- [x] É o conjunto de **todas** as combinações lineares \(a v_1 + b v_2\), com \(a, b\) reais quaisquer
- [ ] É sempre um plano
---
Os coeficientes podem ser quaisquer números reais, inclusive negativos e zero. E o resultado nem sempre é plano: se \(v_1\) e \(v_2\) forem paralelos, o gerado é só uma reta (ou só a origem, se os dois forem nulos).
{{< /questao >}}

{{< questao >}}
Quantos vetores, no mínimo, são necessários para gerar \(\mathbb{R}^3\)?

- [ ] 1
- [ ] 2
- [x] 3
- [ ] 4
---
Com menos de 3 vetores, no máximo se gera um plano. Já com 3 vetores bem escolhidos (por exemplo, \(e_1\), \(e_2\), \(e_3\)) gera-se \(\mathbb{R}^3\).
{{< /questao >}}

{{< questao >}}
Qual conjunto gera o subespaço \(W = \{(x, y, z) : z = x + y\}\)?

- [ ] \((1, 1, 1)\)
- [x] \((1, 0, 1)\) e \((0, 1, 1)\)
- [ ] \((1, 0, 0)\) e \((0, 1, 0)\)
- [ ] \((1, 1, 0)\) e \((0, 0, 1)\)
---
Todo vetor de \(W\) tem a forma \((x, y, x + y) = x(1, 0, 1) + y(0, 1, 1)\). Os outros conjuntos geram vetores que não satisfazem \(z = x + y\): por exemplo, \((1, 0, 0)\) tem \(z = 0 \neq 1 + 0\).
{{< /questao >}}

{{< /quiz >}}
