---
title: Dependência Linear
weight: 5
description: Quando um vetor é desnecessário numa lista, como testar independência linear e os casos rápidos.
autores:
  - thallesgsrv
date: 2026-10-29
---

## Sobre

Na página anterior, \((1, 2)\) e \((2, 4)\) geravam só uma reta. O segundo vetor não acrescentava nada: ele já era "feito" a partir do primeiro. Isso é **redundância**, e a dependência linear é a ferramenta para detectá-la.

- Uma lista de vetores é **linearmente independente (LI)** quando **nenhum é desnecessário**: cada um traz uma direção nova.
- Uma lista é **linearmente dependente (LD)** quando **algum é desnecessário**: ele pode ser fabricado a partir dos outros.

## A definição

Dizemos que \(v_1, \ldots, v_k\) são **linearmente independentes** (LI) se a única maneira de ter

$$
a_1 v_1 + a_2 v_2 + \cdots + a_k v_k = 0
$$

é com **todos** os coeficientes nulos, \(a_1 = a_2 = \cdots = a_k = 0\).

Caso exista uma combinação dando o vetor nulo com **algum** coeficiente diferente de zero, os vetores são **linearmente dependentes** (LD).

Uma forma de pensar: a combinação com todos os coeficientes zero **sempre** dá o vetor nulo (é a "solução óbvia", que não diz nada). A pergunta é se **existe outra**. Se só existe a óbvia, são LI. Se existe outra, são LD.

> [!NOTE]
> **LD é o mesmo que "um dos vetores é combinação linear dos outros".** Se \(a_1 v_1 + \cdots + a_k v_k = 0\) com \(a_1 \neq 0\), então
> $$
> v_1 = -\frac{a_2}{a_1} v_2 - \cdots - \frac{a_k}{a_1} v_k.
> $$
> E, reciprocamente, se \(v_1\) é combinação dos outros, passamos tudo para um lado e ganhamos uma combinação nula com coeficiente \(1\) em \(v_1\).

## Casos que se resolvem de cabeça

- **Um único vetor \(v\):** é LI se, e somente se, \(v \neq 0\). (Se \(v = 0\), então \(1 \cdot v = 0\) com coeficiente não nulo.)
- **Lista com o vetor nulo:** é sempre **LD**, porque \(1 \cdot 0 + 0 \cdot v_2 + \cdots = 0\).
- **Dois vetores:** são LD se, e somente se, **um é múltiplo do outro** (são "paralelos").
- **Vetores repetidos:** a lista é LD (a diferença entre os dois iguais dá \(0\)).
- **Mais vetores do que a dimensão:** em \(\mathbb{R}^n\), qualquer lista com **mais de \(n\) vetores é LD**. (O sistema homogêneo correspondente tem mais incógnitas do que equações, então tem solução não nula. Isso vem direto do Estágio 1.)

## Como testar na prática

1. Monte a equação \(a_1 v_1 + \cdots + a_k v_k = 0\).
2. Isso vira um **sistema linear homogêneo** nas incógnitas \(a_1, \ldots, a_k\), com os vetores nas **colunas**.
3. Escalone.
   - Se **toda coluna** tem pivô, a única solução é a nula: **LI**.
   - Se **sobra variável livre**, existem soluções não nulas: **LD**.

**Exemplo 1 (LD).** \(v_1 = (1, 2, 3)\), \(v_2 = (0, 1, 1)\) e \(v_3 = (1, 3, 4)\). Montando a matriz com os vetores nas colunas e escalonando:

$$
\begin{bmatrix} 1 & 0 & 1 \\ 2 & 1 & 3 \\ 3 & 1 & 4 \end{bmatrix}
\xrightarrow{\substack{L_2 \to L_2 - 2L_1 \\ L_3 \to L_3 - 3L_1}}
\begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 1 & 1 \end{bmatrix}
\xrightarrow{L_3 \to L_3 - L_2}
\begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{bmatrix}
$$

A terceira coluna não tem pivô, então \(a_3\) é livre: \(a_3 = t\), \(a_2 = -t\), \(a_1 = -t\). Com \(t = 1\): \(-v_1 - v_2 + v_3 = 0\), ou seja, \(v_3 = v_1 + v_2\). São **LD**.

**Exemplo 2 (LI).** \(v_1 = (1, 0, 0)\), \(v_2 = (1, 1, 0)\) e \(v_3 = (1, 1, 1)\).

$$
\begin{bmatrix} 1 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 1 \end{bmatrix}
$$

Já está escalonada e as três colunas têm pivô. A única solução do sistema homogêneo é a nula: **LI**.

**Exemplo 3 (polinômios).**

- \(1\), \(x\) e \(x^2\) são LI em \(P_2\): se \(a + bx + cx^2 = 0\) (o polinômio nulo), então todos os coeficientes são zero, isto é, \(a = b = c = 0\).
- \(1 + x\), \(1 - x\) e \(2\) são LD: \((1 + x) + (1 - x) - 1 \cdot 2 = 0\).

**Exemplo 4 (matrizes).** As quatro matrizes \(E_{11}, E_{12}, E_{21}, E_{22}\) (cada uma com um \(1\) em uma posição e zeros nas demais) são LI em \(M(2, 2)\): \(aE_{11} + bE_{12} + cE_{21} + dE_{22} = \begin{bmatrix} a & b \\ c & d \end{bmatrix}\), que só é a matriz nula se \(a = b = c = d = 0\).

**Exemplo 5 (funções).**

- \(\sin x\) e \(\cos x\) são LI. Se \(a \sin x + b \cos x = 0\) para todo \(x\), tomando \(x = 0\) sai \(b = 0\), e tomando \(x = \pi/2\) sai \(a = 0\).
- \(1\), \(\sin^2 x\) e \(\cos^2 x\) são LD, porque \(\sin^2 x + \cos^2 x - 1 = 0\) para todo \(x\).

## Erros comuns

> [!WARNING]
> **"Não são paralelos, então são LI"** só vale para **dois** vetores. Com três ou mais, não. Em \(\mathbb{R}^2\), os vetores \((1, 0)\), \((0, 1)\) e \((1, 1)\) não são paralelos dois a dois, mas são LD, pois \((1, 1) = (1, 0) + (0, 1)\).

> [!WARNING]
> **A ordem dos vetores não importa** para LI/LD. Mudar a ordem da lista não muda a resposta.

> [!WARNING]
> **LI e "gerar" são coisas diferentes.** Os vetores \((1, 0)\) e \((2, 0)\) em \(\mathbb{R}^2\) são LD e não geram \(\mathbb{R}^2\). O vetor \((1, 0)\) sozinho é LI, mas também não gera \(\mathbb{R}^2\). Na próxima página vamos exigir as duas coisas juntas.

## Exercícios

**Exercício 1.** \((1, 2)\) e \((3, 4)\) são LI?

{{< details title="Gabarito" >}}
São LI. Um não é múltiplo do outro: se \((3, 4) = c(1, 2)\), então \(c = 3\) pela primeira coordenada e \(c = 2\) pela segunda, impossível. (Outro jeito: \(\det \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix} = 4 - 6 = -2 \neq 0\).)
{{< /details >}}

**Exercício 2.** Verifique se \((1, -1, 2)\), \((2, 0, 1)\) e \((0, 2, -3)\) são LI ou LD.

{{< details title="Resolução" >}}
Queremos \(a(1, -1, 2) + b(2, 0, 1) + c(0, 2, -3) = (0, 0, 0)\):

$$
\begin{cases} a + 2b = 0 \\ -a + 2c = 0 \\ 2a + b - 3c = 0 \end{cases}
$$

Da primeira, \(a = -2b\). Da segunda, \(c = a/2 = -b\). Na terceira: \(2(-2b) + b - 3(-b) = -4b + b + 3b = 0\), que vale para qualquer \(b\). Então \(b\) é livre. Com \(b = 1\): \(a = -2\), \(c = -1\). Conferindo: \(-2(1, -1, 2) + (2, 0, 1) - (0, 2, -3) = (0, 0, 0)\). São **LD**.
{{< /details >}}

**Exercício 3.** Para quais valores de \(k\) os vetores \((1, 2)\) e \((3, k)\) são LD?

{{< details title="Resolução" >}}
Dois vetores são LD quando um é múltiplo do outro: \((3, k) = 3 \cdot (1, 2) = (3, 6)\), então \(k = 6\). (Pelo determinante: \(\det \begin{bmatrix} 1 & 3 \\ 2 & k \end{bmatrix} = k - 6 = 0\).) Para \(k \neq 6\), são LI.
{{< /details >}}

**Exercício 4.** Quatro vetores de \(\mathbb{R}^3\) podem ser LI?

{{< details title="Gabarito" >}}
Não. Em \(\mathbb{R}^3\), qualquer lista com mais de 3 vetores é LD, porque o sistema homogêneo teria 4 incógnitas e só 3 equações, então sobra variável livre.
{{< /details >}}

**Exercício 5.** Mostre que \(1\), \(x - 1\) e \((x - 1)^2\) são LI em \(P_2\).

{{< details title="Resolução" >}}
Se \(a \cdot 1 + b(x - 1) + c(x - 1)^2 = 0\), desenvolvendo temos \(cx^2 + (b - 2c)x + (a - b + c) = 0\). Todos os coeficientes são nulos: \(c = 0\), então \(b - 2c = 0\) dá \(b = 0\), e \(a - b + c = 0\) dá \(a = 0\). A única combinação nula é a trivial, então são LI.
{{< /details >}}

## Teste rápido

{{< quiz titulo="LI ou LD?" >}}

{{< questao >}}
Qual dessas listas é **LD**?

- [ ] \((1, 0)\) e \((0, 1)\)
- [ ] \((1, 2)\) e \((3, 4)\)
- [x] \((1, 0)\), \((0, 1)\) e \((1, 1)\)
- [ ] \((1, 1, 0)\) e \((0, 1, 1)\)
---
Três vetores em \(\mathbb{R}^2\) são sempre LD (mais vetores do que a dimensão). Aqui, \((1, 1) = (1, 0) + (0, 1)\). Todas as outras listas são LI.
{{< /questao >}}

{{< questao >}}
A lista \(v_1, v_2, v_3\) é LD. O que podemos concluir **com certeza**?

- [ ] Todos os vetores são múltiplos uns dos outros
- [ ] \(v_3\) é combinação linear de \(v_1\) e \(v_2\)
- [x] Pelo menos um dos vetores é combinação linear dos outros
- [ ] Nenhum dos vetores é combinação linear dos outros
---
LD quer dizer que algum vetor é desnecessário, mas **não sabemos qual**. Pode ser \(v_1\) o redundante, e \(v_3\) não ser combinação dos outros dois.
{{< /questao >}}

{{< questao >}}
Uma lista de vetores contém o vetor nulo. Ela é:

- [ ] LI, porque o vetor nulo não atrapalha
- [x] LD, porque \(1 \cdot 0 = 0\) é uma combinação nula com coeficiente não nulo
- [ ] LI se os outros vetores forem LI
- [ ] Não dá para saber
---
Qualquer lista com o vetor nulo é LD: coloque coeficiente \(1\) no vetor nulo e coeficiente \(0\) em todos os outros, e a combinação dá o vetor nulo.
{{< /questao >}}

{{< /quiz >}}
