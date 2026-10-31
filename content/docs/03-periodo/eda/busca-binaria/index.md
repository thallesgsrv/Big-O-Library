---
title: Busca binária
weight: 12
description: Como achar um elemento em um array ordenado descartando metade dos candidatos a cada passo.
autores:
  - thallesgsrv
date: 2026-10-30
---

## Sobre

Imagine procurar uma palavra em um dicionário de papel. Você não começa pela primeira página e vai lendo uma por uma. Abre mais ou menos no meio, vê se a palavra vem antes ou depois dali, e descarta metade do livro. Repete com a metade que sobrou. Isso é a **busca binária**.

Ela só funciona porque o dicionário está **ordenado**. Essa é a condição fundamental: a busca binária exige um array ordenado.

## A ideia

Mantemos dois índices, `esq` e `dir`, que delimitam os candidatos: o alvo, se existir, está em alguma posição entre eles. A cada passo olhamos o elemento do meio:

- se for o alvo, achamos;
- se for **menor** que o alvo, o alvo só pode estar à direita, então `esq = meio + 1`;
- se for **maior**, o alvo só pode estar à esquerda, então `dir = meio - 1`.

Quando `esq` passa de `dir`, não sobrou candidato e o alvo não está no array.

## Veja funcionando

Aqui procuramos o 23 em \([2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\). As barras apagadas são as posições já descartadas. A busca linear precisaria olhar 6 elementos, e a binária olha só 3.

{{< viz algoritmo="binary" >}}

## Implementação

```java
static int buscaBinaria(int[] v, int alvo) {
    int esq = 0;
    int dir = v.length - 1;

    while (esq <= dir) {
        int meio = esq + (dir - esq) / 2;

        if (v[meio] == alvo) return meio;
        if (v[meio] < alvo) esq = meio + 1;
        else dir = meio - 1;
    }
    return -1; // não encontrou
}
```

Três detalhes que costumam gerar bugs:

1. **O `+ 1` e o `- 1`.** Como já olhamos `v[meio]` e ele não é o alvo, podemos excluí-lo. Se escrevêssemos `esq = meio`, o laço poderia ficar preso para sempre quando `esq` e `dir` são vizinhos.
2. **A condição `esq <= dir`.** Com `<`, o último candidato (quando `esq == dir`) nunca seria testado.
3. **O cálculo do meio.** `(esq + dir) / 2` pode estourar o limite de `int` quando os índices são muito grandes. `esq + (dir - esq) / 2` dá o mesmo resultado sem esse risco.

## Análise

Em cada passo o número de candidatos cai pela metade (ou um pouco mais). O custo \(T(n)\) satisfaz:

$$
T(n) = T(n/2) + 1
$$

Quantas vezes podemos dividir \(n\) por 2 até chegar a 1? Cerca de \(\log_2 n\). No máximo \(\lfloor \log_2 n \rfloor + 1\) comparações, então o custo é \(O(\log n)\). O melhor caso é \(O(1)\), quando o alvo está justamente no meio.

Para ter uma noção da diferença:

| Tamanho \(n\) | Busca linear (pior caso) | Busca binária (pior caso) |
|---|---|---|
| 1.000 | 1.000 | 10 |
| 1.000.000 | 1.000.000 | 20 |
| 1.000.000.000 | 1.000.000.000 | 30 |

A memória usada é \(O(1)\) na versão iterativa.

## Quando vale a pena

Se você vai buscar **muitas vezes** no mesmo conjunto, ordenar uma vez (custo \(O(n \log n)\)) e depois usar busca binária compensa muito. Se vai buscar só uma vez, a busca linear em \(O(n)\) é mais barata, porque ordenar já custa mais do que varrer.

A ideia de "descartar metade com base em uma pergunta de sim ou não" vai além de arrays: aparece em busca da resposta de um problema (por exemplo, achar o menor valor que satisfaz uma condição monotônica) e em estruturas como árvores binárias de busca.

## Exercício

1. Qual é o número máximo de comparações da busca binária em um array de 1000 elementos?
2. Execute a busca binária por 8 em \([2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\). Quais valores de `meio` são testados?

{{< details title="Gabarito" >}}
1. \(\lfloor \log_2 1000 \rfloor + 1 = 9 + 1 = 10\), porque \(2^9 = 512 \le 1000 < 1024 = 2^{10}\).
2. Primeiro `esq = 0`, `dir = 9`, `meio = 4` (valor 16). Como 16 > 8, `dir = 3`. Depois `meio = 1` (valor 5). Como 5 < 8, `esq = 2`. Por fim `meio = 2` (valor 8), e achamos. Os meios testados foram 4, 1 e 2.
{{< /details >}}

## Resumo

- Exige array **ordenado**.
- Compara com o elemento do meio e descarta metade dos candidatos a cada passo.
- Custo \(O(\log n)\) no pior caso, \(O(1)\) de memória na versão iterativa.
- Cuidado com `esq <= dir`, `meio + 1`, `meio - 1` e com o estouro em `(esq + dir) / 2`.
- Compensa quando há muitas buscas sobre os mesmos dados.

## Para estudar mais

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)
