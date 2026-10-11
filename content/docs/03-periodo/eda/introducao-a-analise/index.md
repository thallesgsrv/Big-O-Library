---
title: Introdução à análise de algoritmos
weight: 1
description: Como comparar algoritmos contando operações em vez de cronometrar.
autores:
  - thallesgsrv
date: 2026-10-09
---

## Sobre

Dois programas resolvem o mesmo problema. Qual é o melhor? A primeira ideia é cronometrar os dois e ficar com o mais rápido. Funciona até você rodar no computador do colega e o resultado inverter.

## Por que não cronometrar

O tempo em segundos depende da máquina, da linguagem, do que mais está aberto no computador. E, pior, depende da entrada: um algoritmo pode voar com 100 elementos e travar com 10 milhões.

O que a gente quer é uma medida que não dependa de nada disso e que responda uma pergunta só: **como o custo cresce quando a entrada cresce?** Para isso, em vez de medir tempo, contamos operações.

## Contando operações

Vamos achar o maior valor de um array.

```java
static int maximo(int[] v) {
    int max = v[0];
    for (int i = 1; i < v.length; i++) {
        if (v[i] > max) {
            max = v[i];
        }
    }
    return max;
}
```

Com \(n\) elementos, o laço dá \(n - 1\) voltas. Em cada volta há uma comparação e, às vezes, uma atribuição. No total são algo entre \(n\) e \(2n\) operações, dependendo dos dados.

Repare que não importa se uma comparação demora 1 ou 3 nanossegundos. Cada operação básica (comparar, somar, atribuir, acessar uma posição do array) leva um tempo **constante**, que não depende de \(n\). O que importa é quantas vezes elas se repetem, e aqui o número de repetições cresce junto com \(n\).

## Laços aninhados

Agora um caso mais interessante: contar quantos pares de posições têm o mesmo valor.

```java
static int paresIguais(int[] v) {
    int cont = 0;
    for (int i = 0; i < v.length; i++) {
        for (int j = i + 1; j < v.length; j++) {
            if (v[i] == v[j]) cont++;
        }
    }
    return cont;
}
```

Quantas comparações? Quando \(i = 0\), o laço de dentro roda \(n - 1\) vezes. Quando \(i = 1\), roda \(n - 2\). E assim por diante, até zero:

$$
(n-1) + (n-2) + \dots + 1 + 0 = \frac{n(n-1)}{2}
$$

Veja o que acontece com a conta quando \(n\) cresce:

| n | `maximo` (~n) | `paresIguais` (~n²/2) |
|---|---|---|
| 10 | 10 | 45 |
| 100 | 100 | 4.950 |
| 1.000 | 1.000 | 499.500 |
| 10.000 | 10.000 | 49.995.000 |

Multiplicou \(n\) por 10? O primeiro algoritmo faz 10 vezes mais trabalho. O segundo faz uns 100 vezes mais. É essa diferença de comportamento que a análise de algoritmos quer capturar.

## Melhor caso, pior caso e caso médio

Nem sempre o custo depende só do tamanho da entrada. Pense numa busca linear: percorrer o array até achar o valor `x`.

- **Melhor caso:** `x` está na primeira posição. Uma comparação.
- **Pior caso:** `x` está na última posição ou nem está no array. \(n\) comparações.
- **Caso médio:** se `x` pode estar em qualquer lugar com a mesma chance, em média olhamos metade do array, uns \(n/2\) elementos.

Quase sempre o foco é o pior caso, porque ele é uma garantia: não importa a entrada, o algoritmo não vai fazer mais do que isso. O melhor caso costuma ser otimista demais para servir de base para decisões.

## Exercícios

**1.** Quantas vezes `cont++` é executado?

```java
for (int i = 0; i < n; i++) cont++;
for (int j = 0; j < n; j++) cont++;
```

{{< details title="Gabarito" >}}
São dois laços em sequência, cada um com \(n\) voltas, então \(2n\) vezes. Laços em sequência **somam**; laços aninhados **multiplicam**.
{{< /details >}}

**2.** E neste caso?

```java
for (int i = 1; i < n; i *= 2) cont++;
```

{{< details title="Gabarito" >}}
O valor de `i` dobra a cada volta: 1, 2, 4, 8, 16... Para \(n = 16\), são 4 voltas. Em geral, são cerca de \(\log_2 n\) voltas. Guarde esse resultado, ele vai reaparecer na busca binária e no merge sort.
{{< /details >}}

## Resumo

- Cronometrar não serve para comparar algoritmos, porque o tempo depende da máquina e da entrada.
- Analisamos o algoritmo contando operações básicas em função do tamanho da entrada \(n\).
- Laços em sequência somam custos, laços aninhados multiplicam.
- Uma mesma entrada de tamanho \(n\) pode ter custos diferentes. Por isso falamos em melhor caso, pior caso e caso médio, e o pior caso é o que mais usamos.

## Para estudar mais

- [Introdução à análise](https://joaoarthurbm.github.io/eda/posts/introducao-a-analise/) — João Arthur Brunet (2019)
