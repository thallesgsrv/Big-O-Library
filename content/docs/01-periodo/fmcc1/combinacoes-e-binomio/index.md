---
title: Combinações e binômio de Newton
weight: 8
description: Contar escolhas sem ordem, o triângulo de Pascal e a expansão de (a + b) elevado a n.
autores:
  - thallesgsrv
date: 2026-10-30
---

## Sobre

Quando a ordem importa, contamos com arranjos e permutações. Quando **não importa** (formar um comitê, escolher cartas de uma mão), precisamos de outra ferramenta: a **combinação**. Ela leva a um dos objetos mais ricos da matemática discreta, o triângulo de Pascal, e à fórmula que expande $(a + b)^n$.

## Combinação

O número de maneiras de escolher $k$ elementos de um conjunto de $n$, sem importar a ordem, é:

$$
\binom{n}{k} = \frac{n!}{k!\,(n-k)!}
$$

Lê-se "$n$ escolhe $k$". Outras notações são $C(n,k)$ e $C_n^k$.

**De onde vem a fórmula?** Escolhendo $k$ de $n$ com ordem, há $n(n-1)\cdots(n-k+1) = \dfrac{n!}{(n-k)!}$ possibilidades (arranjos). Mas cada grupo de $k$ elementos foi contado $k!$ vezes, uma para cada ordem em que ele poderia aparecer. Dividindo por $k!$ sobra a fórmula.

**Exemplo.** De quantas maneiras se escolhe um comitê de 3 pessoas entre 7?

$$
\binom{7}{3} = \frac{7!}{3!\,4!} = \frac{7 \cdot 6 \cdot 5}{3 \cdot 2 \cdot 1} = 35
$$

Duas propriedades úteis:

- $\binom{n}{0} = \binom{n}{n} = 1$ (há uma só maneira de não escolher nada, e uma só de escolher tudo).
- **Simetria:** $\binom{n}{k} = \binom{n}{n-k}$. Escolher quem entra é o mesmo que escolher quem fica de fora.

## O triângulo de Pascal

Escrevendo $\binom{n}{k}$ na linha $n$, posição $k$ (ambos começando em 0), surge o triângulo:

| $n$ | Linha |
|---|---|
| 0 | `1` |
| 1 | `1 1` |
| 2 | `1 2 1` |
| 3 | `1 3 3 1` |
| 4 | `1 4 6 4 1` |
| 5 | `1 5 10 10 5 1` |

Cada número é a soma dos dois acima dele. Essa é a **relação de Pascal**:

$$
\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}
$$

**Por que vale?** Conte os subconjuntos de $k$ elementos de $\{1, \dots, n\}$ separando em dois grupos: os que **contêm** o elemento $n$ (os outros $k-1$ vêm dos $n-1$ restantes: $\binom{n-1}{k-1}$ maneiras) e os que **não contêm** o $n$ (todos os $k$ vêm dos $n-1$ restantes: $\binom{n-1}{k}$ maneiras). Os dois grupos não se sobrepõem e cobrem tudo.

## O binômio de Newton

> [!NOTE]
> Para todo inteiro $n \ge 0$:
> $$(a + b)^n = \sum_{k=0}^{n} \binom{n}{k}\, a^{n-k}\, b^k$$

Os coeficientes são exatamente a linha $n$ do triângulo de Pascal. Por exemplo, com $n = 4$:

$$
(x + y)^4 = x^4 + 4x^3y + 6x^2y^2 + 4xy^3 + y^4
$$

**Por que os coeficientes são $\binom{n}{k}$?** Ao multiplicar $(a+b)$ por si mesmo $n$ vezes, de cada um dos $n$ fatores escolhemos $a$ ou $b$. O termo $a^{n-k}b^k$ aparece toda vez que escolhemos $b$ em exatamente $k$ dos fatores, e há $\binom{n}{k}$ maneiras de decidir em quais.

**Consequência: quantos subconjuntos tem um conjunto?** Tomando $a = b = 1$:

$$
2^n = \sum_{k=0}^{n} \binom{n}{k}
$$

O lado direito soma os subconjuntos de tamanho $0, 1, \dots, n$. Ou seja, um conjunto com $n$ elementos tem $2^n$ subconjuntos no total.

## Erros comuns

- **Usar combinação quando a ordem importa** (ou o contrário). Pergunte-se: trocar a ordem dos escolhidos gera uma situação diferente? Se sim, é arranjo.
- **Contar um mesmo grupo mais de uma vez**, o que acontece ao escolher "os primeiros" e depois "os outros" sem dividir pelas repetições.
- **Esquecer que a contagem das linhas do triângulo começa em 0.**
- **No binômio, perder os expoentes:** em cada termo, os expoentes de $a$ e $b$ somam $n$.

## Exercícios

1. Quantas cadeias binárias de comprimento 6 têm exatamente dois bits iguais a 1?
2. Qual é o coeficiente de $x^2$ em $(x + 2)^5$?
3. Quantas mãos de 5 cartas existem em um baralho de 52 cartas?

{{< details title="Gabarito" >}}
1. Basta escolher em quais 2 das 6 posições estão os bits 1: $\binom{6}{2} = \dfrac{6 \cdot 5}{2} = 15$.
2. O termo geral é $\binom{5}{k} x^k 2^{5-k}$. Para $k = 2$: $\binom{5}{2} \cdot 2^3 = 10 \cdot 8 = 80$.
3. A ordem das cartas na mão não importa: $\binom{52}{5} = \dfrac{52 \cdot 51 \cdot 50 \cdot 49 \cdot 48}{5!} = 2.598.960$.
{{< /details >}}

## Resumo

- $\binom{n}{k} = \dfrac{n!}{k!(n-k)!}$ conta as escolhas de $k$ entre $n$ **sem ordem**.
- Simetria: $\binom{n}{k} = \binom{n}{n-k}$. Pascal: $\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}$.
- Binômio: $(a+b)^n = \sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k$, com coeficientes dados pelo triângulo de Pascal.
- Um conjunto com $n$ elementos tem $2^n$ subconjuntos.
