---
title: Espaços Vetoriais
weight: 1
description: O que é um vetor, o que é um espaço vetorial, as 8 regras explicadas sem mistério, exemplos e não exemplos.
autores:
  - thallesgsrv
date: 2026-11-09
---

## Sobre

Um **espaço vetorial** é um conjunto onde dá para **somar** dois elementos e **esticar** um elemento (multiplicar por um número), **sem nunca sair do conjunto**, e onde essas duas operações se comportam do jeito que a gente espera.

Pense num videogame com só dois botões: "somar" e "esticar". Um conjunto é um espaço vetorial quando esses dois botões funcionam bem em todos os elementos dele. Os elementos são chamados de **vetores** e os números usados para esticar são chamados de **escalares** (neste curso, sempre números reais).

> [!NOTE]
> A palavra "vetor" aqui **não** quer dizer "seta". Quer dizer "elemento de um espaço vetorial". Uma lista de números pode ser um vetor. Uma matriz pode ser um vetor. Um polinômio também.

## Começando pelo que você já conhece

No plano, um vetor é um par \((x, y)\). As duas operações são:

$$
(x_1, y_1) + (x_2, y_2) = (x_1 + x_2,\; y_1 + y_2)
\qquad\text{e}\qquad
\alpha \cdot (x, y) = (\alpha x,\; \alpha y)
$$

Com números:

- Somar: \((1, 2) + (3, 5) = (4, 7)\).
- Esticar: \(3 \cdot (1, 2) = (3, 6)\). Esticar por \(-1\) inverte o vetor: \((-1)\cdot(1, 2) = (-1, -2)\). Esticar por \(\tfrac12\) encolhe.

Se você quiser enxergar, "somar" é andar um vetor e depois o outro, e "esticar" é alongar, encolher ou inverter. Nada de novo até aqui. A novidade é perceber que **matrizes, polinômios e funções também podem ser somados e esticados**:

- \(\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} + \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 1 & 3 \\ 4 & 4 \end{bmatrix}\) e \(2 \cdot \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} 2 & 4 \\ 6 & 8 \end{bmatrix}\).
- \((t^2 + 1) + (3t - 5) = t^2 + 3t - 4\) e \(3 \cdot (t^2 + 1) = 3t^2 + 3\).

Se esses objetos também respeitarem as regras abaixo, a teoria que a gente constrói para o plano vale para eles de graça.

## Tudo vira uma lista de números

Este é o truque que simplifica o estágio inteiro. Repare no que acontece quando você só olha os coeficientes:

| Objeto | Vira a lista |
| --- | --- |
| \(a + bt + ct^2\) (em \(P_2\)) | \((a, b, c)\) |
| \(\begin{bmatrix} a & b \\ c & d \end{bmatrix}\) (em \(M(2,2)\)) | \((a, b, c, d)\) |

E as operações combinam:

$$
(1 + 2t + 3t^2) + (4 + 5t + 6t^2) = 5 + 7t + 9t^2
\quad\longleftrightarrow\quad
(1, 2, 3) + (4, 5, 6) = (5, 7, 9).
$$

Somar polinômios é somar as listas de coeficientes. Por isso, **\(P_2\) "se comporta como" \(\mathbb{R}^3\), e \(M(2,2)\) "se comporta como" \(\mathbb{R}^4\)**. Sempre que um exercício com polinômios ou matrizes parecer assustador, traduza para lista e faça a conta com números.

## A definição

Seja \(V\) um conjunto não vazio com duas operações:

- uma **soma**, que pega \(u, v \in V\) e devolve \(u + v\);
- uma **multiplicação por escalar**, que pega \(\alpha \in \mathbb{R}\) e \(v \in V\) e devolve \(\alpha v\).

Dizemos que \(V\) é um **espaço vetorial real** quando, para quaisquer \(u, v, w \in V\) e \(\alpha, \beta \in \mathbb{R}\), valem duas condições de **fechamento** e oito **regras**.

**Fechamento** (não saímos do conjunto):

- \(u + v \in V\);
- \(\alpha v \in V\).

**As 8 regras:**

| # | Regra | Em português |
| --- | --- | --- |
| 1 | \(u + v = v + u\) | A ordem da soma não importa. |
| 2 | \((u + v) + w = u + (v + w)\) | Dá para somar três vetores sem se preocupar com parênteses. |
| 3 | existe \(0 \in V\) com \(v + 0 = v\) | Existe um vetor "que não faz nada" (o **vetor nulo**). |
| 4 | para cada \(v\) existe \(-v\) com \(v + (-v) = 0\) | Todo vetor tem um **oposto** que o desfaz. |
| 5 | \(\alpha(u + v) = \alpha u + \alpha v\) | Esticar a soma é somar os esticados. |
| 6 | \((\alpha + \beta)v = \alpha v + \beta v\) | Esticar por \(\alpha + \beta\) é esticar por \(\alpha\) e por \(\beta\) e somar. |
| 7 | \((\alpha\beta)v = \alpha(\beta v)\) | Esticar duas vezes seguidas é esticar pelo produto. |
| 8 | \(1 \cdot v = v\) | Esticar por 1 não muda nada. |

As regras 1 a 4 falam só da soma. As regras 5 a 8 dizem como a soma e o esticar conversam entre si.

> [!TIP]
> Na prática você quase nunca confere as 8 regras uma por uma. Se as operações são as usuais (de números, listas, matrizes, polinômios, funções), as regras já valem. **O que costuma falhar é o fechamento** (ou o conjunto ter operações estranhas). Comece sempre por aí.

## Exemplos que valem a pena guardar

Em todos eles, as operações são as usuais.

**1. \(\mathbb{R}^n\).** As listas \((x_1, \ldots, x_n)\) de \(n\) números reais, somadas e esticadas posição por posição. O vetor nulo é \((0, \ldots, 0)\) e o oposto de \((x_1, \ldots, x_n)\) é \((-x_1, \ldots, -x_n)\).

**2. \(M(m, n)\).** O conjunto de todas as matrizes \(m \times n\). O vetor nulo é a matriz nula e o oposto de \(A\) é \(-A\).

**3. \(P_n\).** O conjunto dos polinômios de **grau menor ou igual a \(n\)**, incluindo o polinômio nulo. Por exemplo, \(P_2\) tem todos os \(a + bt + ct^2\). O vetor nulo é o polinômio \(0\).

> [!WARNING]
> O "menor **ou igual**" é essencial. Os polinômios de grau **exatamente** 2 não formam espaço vetorial: \((t^2 + t) + (-t^2 + 1) = t + 1\), que tem grau 1. A soma saiu do conjunto. Além disso, o polinômio nulo (o vetor nulo!) não tem grau 2.

**4. \(F(\mathbb{R}, \mathbb{R})\).** O conjunto de todas as funções de \(\mathbb{R}\) em \(\mathbb{R}\). Somar \(f\) e \(g\) significa criar a função \((f + g)(x) = f(x) + g(x)\), e esticar significa \((\alpha f)(x) = \alpha \cdot f(x)\). O vetor nulo é a função que vale 0 para todo \(x\).

**5. O espaço nulo \(\{0\}\).** Só tem o vetor nulo. Parece bobo, mas aparece o tempo todo.

## Exemplos que NÃO são espaços vetoriais

Saber por que algo falha ensina mais do que saber por que funciona. Repare que **uma única falha basta**.

**A. O primeiro quadrante** \(\{(x, y) \mid x \geq 0 \text{ e } y \geq 0\}\), com as operações usuais.
Falha o fechamento do esticar: \((1, 1)\) está no conjunto, mas \((-1) \cdot (1, 1) = (-1, -1)\) não está.

**B. Os inteiros** \(\mathbb{Z}\), vistos como subconjunto de \(\mathbb{R}\).
Falha o fechamento do esticar: \(\tfrac{1}{2} \cdot 1 = \tfrac{1}{2} \notin \mathbb{Z}\).

**C. Operações trocadas.** Em \(\mathbb{R}^2\), mantenha a soma usual, mas defina

$$
\alpha \cdot (x, y) = (\alpha x,\; 0).
$$

O fechamento vale, mas falha a regra 8: \(1 \cdot (1, 1) = (1, 0) \neq (1, 1)\). **As operações fazem parte da definição**: o mesmo conjunto com outras operações pode deixar de ser espaço vetorial.

**D. Outro esticar torto.** Em \(\mathbb{R}^2\), com a soma usual, defina \(\alpha \cdot (x, y) = (\alpha x,\; y)\).
Falha a regra 6. Com \(v = (1, 1)\) e \(\alpha = \beta = 1\):

$$
(\alpha + \beta) v = 2 \cdot (1, 1) = (2, 1)
\qquad\text{mas}\qquad
\alpha v + \beta v = (1, 1) + (1, 1) = (2, 2).
$$

## Curiosidade: um espaço vetorial que não parece um

Considere o conjunto \(\mathbb{R}_{+}\) dos números reais **positivos**, com estas operações:

- "soma": \(u \oplus v = u \cdot v\) (a soma é o **produto** usual);
- "esticar": \(\alpha \odot u = u^{\alpha}\) (esticar é **elevar** à potência \(\alpha\)).

Parece estranho, mas é um espaço vetorial. O vetor nulo é o número \(1\), porque \(u \oplus 1 = u \cdot 1 = u\). O oposto de \(u\) é \(1/u\), porque \(u \oplus \tfrac{1}{u} = 1\). As regras de potência garantem as demais, por exemplo:

$$
(\alpha + \beta) \odot u = u^{\alpha + \beta} = u^{\alpha} \cdot u^{\beta} = (\alpha \odot u) \oplus (\beta \odot u).
$$

Moral da história: **o que importa são as operações e as regras, não a "cara" do objeto**.

## Propriedades que vêm de graça

De apenas as 8 regras, dá para provar fatos que parecem óbvios, mas que precisam de justificativa. Para qualquer espaço vetorial \(V\):

- o vetor nulo é **único**, e o oposto de cada vetor também;
- \(0 \cdot v = 0\) (o número zero esticando qualquer vetor dá o vetor nulo);
- \(\alpha \cdot 0 = 0\) (qualquer número esticando o vetor nulo dá o vetor nulo);
- \((-1) \cdot v = -v\) (esticar por \(-1\) dá o oposto);
- se \(\alpha v = 0\), então \(\alpha = 0\) ou \(v = 0\).

**Por que \(0 \cdot v = 0\)?** Escreva \(0 = 0 + 0\) e use a regra 6:

$$
0 \cdot v = (0 + 0) \cdot v = 0 \cdot v + 0 \cdot v.
$$

Agora some o oposto de \(0 \cdot v\) nos dois lados. À esquerda sobra o vetor nulo, e à direita sobra \(0 \cdot v\). Logo \(0 = 0 \cdot v\).

> [!NOTE]
> O "\(0\)" do número e o "\(0\)" do vetor são coisas diferentes. Nos livros os dois se escrevem igual e você descobre pelo contexto. Alguns autores usam \(\vec{0}\) para o vetor.

## Exercícios

**Exercício 1.** Em \(P_2\), qual é o vetor nulo e qual é o oposto de \(p(t) = t^2 - 3t + 1\)?

{{< details title="Resolução" >}}
**Passo 1: o vetor nulo.**

É o polinômio com todos os coeficientes iguais a zero:

$$
0 = 0 + 0t + 0t^2.
$$

**Passo 2: o oposto.**

Troque o sinal de cada coeficiente:

$$
-p(t) = -t^2 + 3t - 1.
$$

**Passo 3: conferir.**

$$
p(t) + (-p(t)) = (t^2 - t^2) + (-3t + 3t) + (1 - 1) = 0. \;✓
$$
{{< /details >}}

**Exercício 2.** Em \(\mathbb{R}^2\), com a soma usual e \(\alpha \cdot (x, y) = (\alpha x,\; y)\), mostre que **não** é um espaço vetorial.

{{< details title="Resolução" >}}
**Passo 1: escolher qual regra quebrar.**

A regra 6 é a candidata: \((\alpha + \beta)v = \alpha v + \beta v\).

**Passo 2: escolher números simples.**

\(v = (1, 1)\), \(\alpha = 1\) e \(\beta = 1\).

**Passo 3: calcular os dois lados.**

$$
(\alpha + \beta)v = 2 \cdot (1, 1) = (2 \cdot 1,\; 1) = (2, 1)
$$

$$
\alpha v + \beta v = (1, 1) + (1, 1) = (2, 2)
$$

**Conclusão.** \((2, 1) \neq (2, 2)\), então a regra 6 falha e o conjunto **não** é espaço vetorial.
{{< /details >}}

**Exercício 3.** O conjunto \(\{(x, y) \in \mathbb{R}^2 \mid y = x^2\}\), com as operações usuais, é um espaço vetorial?

{{< details title="Resolução" >}}
**Passo 1: o que testar.**

O fechamento da soma. Se falhar, acabou.

**Passo 2: dois elementos do conjunto.**

$$
(1, 1) \text{ vale, pois } 1 = 1^2
\qquad
(2, 4) \text{ vale, pois } 4 = 2^2
$$

**Passo 3: somar e conferir o filtro.**

$$
(1, 1) + (2, 4) = (3, 5)
$$

O filtro pede \(5 = 3^2 = 9\), o que é falso.

**Conclusão.** A soma saiu do conjunto, então **não** é espaço vetorial.
{{< /details >}}

**Exercício 4.** Use a regra 6 para provar que \((-1) \cdot v = -v\).

{{< details title="Resolução" >}}
**Passo 1: somar \(v\) com \((-1)v\).**

Use a regra 8 (\(v = 1 \cdot v\)):

$$
v + (-1)v = 1 \cdot v + (-1) \cdot v
$$

**Passo 2: juntar com a regra 6.**

$$
1 \cdot v + (-1) \cdot v = (1 + (-1)) \cdot v = 0 \cdot v = 0
$$

**Passo 3: concluir.**

\((-1)v\) somado com \(v\) dá o vetor nulo, então ele é o oposto de \(v\) (e o oposto é único). Logo \((-1)v = -v\). ∎
{{< /details >}}

**Exercício 5.** Escreva o polinômio \(2 - t + 3t^2\) e a matriz \(\begin{bmatrix} 2 & -1 \\ 3 & 0 \end{bmatrix}\) como listas de números.

{{< details title="Resolução" >}}
**Polinômio.** Coeficientes de \(1\), \(t\) e \(t^2\), nessa ordem:

$$
2 - t + 3t^2 \;\longrightarrow\; (2, -1, 3)
$$

**Matriz.** Entradas lidas linha por linha:

$$
\begin{bmatrix} 2 & -1 \\ 3 & 0 \end{bmatrix} \;\longrightarrow\; (2, -1, 3, 0)
$$
{{< /details >}}

## Teste rápido

{{< quiz titulo="é espaço vetorial?" >}}

{{< questao >}}
Com as operações usuais, qual destes conjuntos é um espaço vetorial?

- [ ] Os pares \((x, y)\) com \(x \geq 0\)
- [ ] Os polinômios de grau **exatamente** 3
- [x] As matrizes \(2 \times 2\)
- [ ] Os pares \((x, y)\) com \(y = x^2\)
---
As matrizes \(2 \times 2\) fecham na soma e no esticar, e as 8 regras vêm das contas com números. Os pares com \(x \geq 0\) não fecham no esticar por um número negativo; os polinômios de grau exatamente 3 não fecham na soma (\(t^3 + (-t^3) = 0\)); e os pares com \(y = x^2\) não fecham na soma.
{{< /questao >}}

{{< questao >}}
Em \(F(\mathbb{R}, \mathbb{R})\) (as funções de \(\mathbb{R}\) em \(\mathbb{R}\)), qual é o vetor nulo?

- [ ] A função identidade \(f(x) = x\)
- [ ] A função constante \(f(x) = 1\)
- [x] A função constante \(f(x) = 0\)
- [ ] Não existe vetor nulo nesse espaço
---
O vetor nulo é o que "não muda nada" quando somado: \(f + 0 = f\). Isso acontece com a função que vale \(0\) em todo ponto.
{{< /questao >}}

{{< questao >}}
Em \(\mathbb{R}^2\), com a soma usual e \(\alpha \cdot (x, y) = (\alpha x,\; 0)\), qual regra falha?

- [ ] A regra 1, \(u + v = v + u\)
- [ ] O fechamento da soma
- [x] A regra 8, \(1 \cdot v = v\)
- [ ] A regra 2, associatividade da soma
---
A soma é a usual, então as regras 1 e 2 e o fechamento da soma continuam valendo. Mas \(1 \cdot (1, 1) = (1, 0) \neq (1, 1)\), então a regra 8 falha.
{{< /questao >}}

{{< /quiz >}}
