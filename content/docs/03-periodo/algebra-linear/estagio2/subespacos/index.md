---
title: Subespaços
weight: 2
description: Como saber, com 3 testes, se um pedaço de um espaço vetorial continua sendo espaço vetorial.
autores:
  - thallesgsrv
date: 2026-10-29
---

## Sobre

Conferir as 8 regras toda vez que aparece um conjunto novo seria cansativo. Existe um atalho: se o conjunto que você quer estudar **está dentro de um espaço vetorial que você já conhece**, as contas herdam quase tudo do espaço maior. Sobram só **três verificações**.

Um **subespaço** de \(V\) é um subconjunto \(W \subset V\) que, com as mesmas operações de \(V\), também é um espaço vetorial. É um "espaço vetorial morando dentro de outro".

## O teste dos 3 passos

Seja \(V\) um espaço vetorial e \(W \subset V\). Então \(W\) é subespaço de \(V\) se, e somente se:

1. \(0 \in W\) (o vetor nulo está em \(W\));
2. se \(u, v \in W\), então \(u + v \in W\) (**fecha na soma**);
3. se \(u \in W\) e \(\alpha \in \mathbb{R}\), então \(\alpha u \in W\) (**fecha no escalar**).

**Por que só isso basta?** As regras 1, 2, 5, 6, 7 e 8 envolvem só igualdades de contas, e elas já valem em \(V\), logo valem também dentro de \(W\). As regras 3 e 4 (vetor nulo e oposto) vêm dos passos acima: o nulo está pelo passo 1 e o oposto \(-u = (-1)u\) está pelo passo 3.

> [!TIP]
> **Comece sempre pelo passo 1.** Se \(0 \notin W\), acabou: \(W\) não é subespaço, sem precisar de mais nada. É o jeito mais rápido de descartar um conjunto. (Se \(0 \in W\), ainda falta conferir os passos 2 e 3.)

Todo espaço vetorial \(V\) tem pelo menos dois subespaços, chamados **triviais**: o próprio \(V\) e o conjunto \(\{0\}\).

## Enxergando no plano e no espaço

Subespaço tem cara de coisa "reta e que passa pela origem":

- Os subespaços de \(\mathbb{R}^2\) são: \(\{0\}\), as **retas que passam pela origem** e o próprio \(\mathbb{R}^2\).
- Os subespaços de \(\mathbb{R}^3\) são: \(\{0\}\), as **retas pela origem**, os **planos pela origem** e o próprio \(\mathbb{R}^3\).

Uma reta como \(y = x + 1\) **não** é subespaço, porque não passa pela origem (o ponto \((0, 0)\) não satisfaz a equação). Uma parábola não é subespaço, porque é curva e não fecha na soma.

## Receita para decidir

Olhe para a forma como \(W\) é definido:

- **Equações lineares sem termo constante** (\(x + y + z = 0\), \(x = 2y\), \(AX = 0\)): quase certamente é subespaço. Faça os 3 passos.
- **Aparece um número solto** (\(x + y = 1\)), **um quadrado ou produto** (\(y = x^2\), \(xy = 0\)), **uma desigualdade** (\(x \geq 0\)) **ou condições como "invertível" ou "determinante igual a 1"**: desconfie. Teste o passo 1 primeiro e, se passar, procure um contraexemplo para a soma ou para o escalar.

## Exemplos que são subespaços

**Exemplo 1.** \(W = \{(x, y, z) \in \mathbb{R}^3 : x + y + z = 0\}\) (um plano pela origem).

- Passo 1: \((0, 0, 0)\) satisfaz \(0 + 0 + 0 = 0\). ✓
- Passo 2: se \(u = (x_1, y_1, z_1)\) e \(v = (x_2, y_2, z_2)\) estão em \(W\), então \(x_1 + y_1 + z_1 = 0\) e \(x_2 + y_2 + z_2 = 0\). Somando, \((x_1 + x_2) + (y_1 + y_2) + (z_1 + z_2) = 0\), ou seja, \(u + v \in W\). ✓
- Passo 3: \(\alpha u = (\alpha x_1, \alpha y_1, \alpha z_1)\) e \(\alpha x_1 + \alpha y_1 + \alpha z_1 = \alpha \cdot 0 = 0\). ✓

**Exemplo 2.** As matrizes **simétricas** \(n \times n\) (aquelas com \(A^T = A\)) formam um subespaço de \(M(n, n)\).

- A matriz nula é simétrica. ✓
- Se \(A^T = A\) e \(B^T = B\), então \((A + B)^T = A^T + B^T = A + B\). ✓
- Se \(A^T = A\), então \((\alpha A)^T = \alpha A^T = \alpha A\). ✓

**Exemplo 3.** \(W = \{p \in P_2 : p(1) = 0\}\), os polinômios de grau até 2 que têm \(1\) como raiz.

- O polinômio nulo vale \(0\) em \(x = 1\). ✓
- Se \(p(1) = 0\) e \(q(1) = 0\), então \((p + q)(1) = p(1) + q(1) = 0\). ✓
- \((\alpha p)(1) = \alpha \cdot p(1) = 0\). ✓

**Exemplo 4 (o mais importante para o curso).** O conjunto das soluções de um **sistema linear homogêneo** \(AX = 0\) é um subespaço de \(\mathbb{R}^n\). É o que o Estágio 1 já tinha preparado:

- \(A \cdot 0 = 0\), então \(X = 0\) é solução. ✓
- Se \(AX = 0\) e \(AY = 0\), então \(A(X + Y) = AX + AY = 0\). ✓
- Se \(AX = 0\), então \(A(\alpha X) = \alpha (AX) = 0\). ✓

Esse subespaço é chamado de **núcleo** da matriz \(A\), e vai aparecer bastante mais à frente no curso.

## Exemplos que NÃO são subespaços

**Exemplo 5.** \(W = \{(x, y) : y = x + 1\}\). O ponto \((0, 0)\) não está em \(W\) (pois \(0 \neq 0 + 1\)). Falha o passo 1.

**Exemplo 6.** \(W = \{(x, y) : x \geq 0 \text{ e } y \geq 0\}\). Falha o passo 3: \((1, 1) \in W\), mas \((-1) \cdot (1, 1) = (-1, -1) \notin W\).

**Exemplo 7.** \(W = \{(x, y) : xy = 0\}\), a união dos dois eixos.
O \((0, 0)\) está em \(W\), e esticar um ponto de um eixo mantém ele no eixo. Mas **a soma falha**: \((1, 0) \in W\) e \((0, 1) \in W\), só que \((1, 0) + (0, 1) = (1, 1)\), e \(1 \cdot 1 = 1 \neq 0\).

**Exemplo 8.** O conjunto das soluções de \(AX = B\) com \(B \neq 0\). O vetor \(X = 0\) **não** é solução (daria \(A \cdot 0 = 0 \neq B\)). Falha o passo 1. Por isso o conjunto de soluções de um sistema não homogêneo é uma reta ou plano **deslocado**, que não passa pela origem.

**Exemplo 9.** As matrizes \(2 \times 2\) com determinante zero. A nula está lá, e \(\det(\alpha A) = \alpha^2 \det A = 0\), então esticar funciona. Mas a soma falha:

$$
\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} +
\begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix} =
\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix},
$$

e a identidade tem determinante \(1\). As duas primeiras têm determinante zero, mas a soma não.

> [!WARNING]
> Passar no passo 1 **não** prova que é subespaço. Os exemplos 7 e 9 contêm o vetor nulo e mesmo assim não são subespaços. Para provar que **é** subespaço, os três passos precisam valer para **todos** os vetores. Para provar que **não é**, basta **um** contraexemplo.

## Interseção e união

A **interseção** de dois subespaços é sempre um subespaço. Se \(U\) e \(W\) são subespaços de \(V\) e \(u, v \in U \cap W\), então \(u + v\) está em \(U\) (porque \(U\) fecha na soma) e em \(W\) (idem), logo está em \(U \cap W\). O mesmo vale para o escalar, e o \(0\) está nos dois.

A **união** \(U \cup W\), em geral, **não** é subespaço. O exemplo 7 é isso: \(U\) = eixo \(x\), \(W\) = eixo \(y\), e a soma de um vetor de cada um sai dos eixos. A próxima página mostra o que fazer quando queremos "juntar" subespaços de verdade.

## Exercícios

**Exercício 1.** \(W = \{(x, y, z) \in \mathbb{R}^3 : x = 2y\}\) é subespaço de \(\mathbb{R}^3\)?

{{< details title="Gabarito" >}}
Sim. Passo 1: \((0,0,0)\) satisfaz \(0 = 2 \cdot 0\). Passo 2: se \(x_1 = 2y_1\) e \(x_2 = 2y_2\), então \(x_1 + x_2 = 2(y_1 + y_2)\). Passo 3: se \(x = 2y\), então \(\alpha x = 2(\alpha y)\).
{{< /details >}}

**Exercício 2.** \(W = \{(x, y, z) \in \mathbb{R}^3 : x + y = 1\}\) é subespaço de \(\mathbb{R}^3\)?

{{< details title="Gabarito" >}}
Não. O vetor nulo \((0, 0, 0)\) dá \(0 + 0 = 0 \neq 1\), então não está em \(W\). Falha o passo 1.
{{< /details >}}

**Exercício 3.** As matrizes \(2 \times 2\) triangulares superiores (aquelas com \(a_{21} = 0\)) formam um subespaço de \(M(2, 2)\)?

{{< details title="Gabarito" >}}
Sim. A matriz nula tem \(a_{21} = 0\). Somar duas matrizes com \(a_{21} = 0\) dá uma matriz com \(a_{21} = 0 + 0 = 0\). Esticar mantém \(\alpha \cdot 0 = 0\).
{{< /details >}}

**Exercício 4.** \(W = \{p \in P_2 : p(0) = 1\}\) é subespaço de \(P_2\)?

{{< details title="Gabarito" >}}
Não. O polinômio nulo tem \(p(0) = 0 \neq 1\), então não está em \(W\). Falha o passo 1.
{{< /details >}}

**Exercício 5.** Mostre que \(W = \{(x, y) \in \mathbb{R}^2 : x = 0 \text{ ou } y = 0\}\) não é subespaço, escolhendo dois vetores específicos.

{{< details title="Resolução" >}}
Tome \(u = (1, 0)\) e \(v = (0, 1)\). Ambos estão em \(W\) (o primeiro tem \(y = 0\), o segundo tem \(x = 0\)). Mas \(u + v = (1, 1)\) tem \(x \neq 0\) e \(y \neq 0\), então não está em \(W\). Falha o passo 2.
{{< /details >}}

## Teste rápido

{{< quiz titulo="é subespaço?" >}}

{{< questao >}}
Qual destes conjuntos é subespaço de \(\mathbb{R}^2\)?

- [ ] \(\{(x, y) : y = 2x + 1\}\)
- [x] \(\{(x, y) : y = 2x\}\)
- [ ] \(\{(x, y) : y = x^2\}\)
- [ ] \(\{(x, y) : x \geq 0\}\)
---
Só a reta \(y = 2x\) passa pela origem e é "reta de verdade". A reta \(y = 2x + 1\) não passa pela origem, a parábola não fecha na soma e o semiplano \(x \geq 0\) não fecha no esticar por números negativos.
{{< /questao >}}

{{< questao >}}
O conjunto \(W\) **não** contém o vetor nulo. O que podemos concluir?

- [ ] \(W\) é subespaço, só que bem pequeno
- [x] \(W\) não é subespaço
- [ ] Não dá para concluir nada
- [ ] \(W\) é subespaço se fechar na soma
---
Todo subespaço tem o vetor nulo (basta esticar qualquer vetor por \(0\)). Se \(0 \notin W\), então \(W\) não pode ser subespaço.
{{< /questao >}}

{{< questao >}}
As matrizes \(2 \times 2\) com determinante \(0\) formam um subespaço de \(M(2, 2)\)?

- [ ] Sim, porque contêm a matriz nula
- [ ] Sim, porque \(\det(\alpha A) = 0\) quando \(\det A = 0\)
- [ ] Não, porque não contêm a matriz nula
- [x] Não, porque não fecham na soma
---
A matriz nula está lá e esticar funciona, mas a soma de duas matrizes de determinante zero pode ter determinante diferente de zero. Por exemplo, as matrizes diagonais com um único \(1\) somam a identidade.
{{< /questao >}}

{{< /quiz >}}
