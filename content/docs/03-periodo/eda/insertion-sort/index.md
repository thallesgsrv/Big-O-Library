---
title: Insertion sort
weight: 5
description: Ordenação por inserção, como organizar cartas na mão. Ótimo em arrays quase ordenados.
autores:
  - thallesgsrv
date: 2026-10-09
---

## Sobre

Se você já organizou cartas de baralho na mão, já usou o insertion sort sem saber. Pega uma carta nova e encaixa no lugar certo entre as que você já tem ordenadas.

## A ideia

O array é dividido em duas partes: o começo, que já está ordenado, e o resto, que ainda não foi visto. Começamos com só o primeiro elemento na parte ordenada (um elemento sozinho sempre está ordenado). Em cada rodada pegamos o próximo elemento, a **chave**, e o empurramos para a esquerda até encontrar sua posição.

Vamos ordenar \([5, 2, 4, 6, 1, 3]\):

| Chave | O que acontece | Array depois |
|---|---|---|
| 2 | o 5 anda uma casa para a direita | `2 5 \| 4 6 1 3` |
| 4 | o 5 anda uma casa | `2 4 5 \| 6 1 3` |
| 6 | já é maior que o 5, não se mexe ninguém | `2 4 5 6 \| 1 3` |
| 1 | 6, 5, 4 e 2 andam uma casa cada | `1 2 4 5 6 \| 3` |
| 3 | 6, 5 e 4 andam uma casa | `1 2 3 4 5 6` |

Note que não fazemos trocas aos pares. Os elementos maiores que a chave **deslizam** uma casa para a direita abrindo um buraco, e a chave cai nele no final.

## Veja funcionando

Use ▶ para executar sozinho ou ▶| para avançar um passo por vez (◀ volta). A linha do pseudocódigo que está sendo executada fica acesa. Nas barras, **laranja** é o que está sendo comparado ou trocado, **azul** é o elemento em foco (a chave) e **verde** é o que já está no lugar certo.

{{< viz algoritmo="insertion" >}}

Veja o "buraco" aberto quando a chave sai do vetor: os maiores deslizam uma casa para a direita até a chave poder cair no lugar certo. Quanto mais ordenado o vetor, menos deslocamentos.

## Implementação

```java
static void insertionSort(int[] v) {
    // O índice 0 já é a parte ordenada; começamos a pegar "cartas" do índice 1.
    for (int i = 1; i < v.length; i++) {
        int chave = v[i];   // a carta que vamos encaixar
        int j = i - 1;      // olha a carta imediatamente à esquerda

        // Enquanto a carta da esquerda for maior que a chave, ela anda uma casa para a direita.
        while (j >= 0 && v[j] > chave) {
            v[j + 1] = v[j];
            j--;
        }

        // Achamos o buraco certo: a chave cai nele.
        v[j + 1] = chave;
    }
}
```

### Lendo o código

- O `for` de fora escolhe a próxima chave. Tudo à esquerda dela já está ordenado.
- O `while` anda para trás enquanto o elemento da esquerda for maior que a chave, copiando cada um uma casa para a frente. A condição `j >= 0` evita sair do começo do array.
- Quando o `while` para (porque achou um elemento menor ou igual, ou porque chegou ao começo), a posição `j + 1` é o buraco certo para a chave.

Exemplo com a chave `1` em `[2, 4, 5, 6, 1, 3]`: `j` começa em 3 (o 6). Como 6 > 1, o 6 vai para a posição 4; depois o 5 vai para a 3, o 4 para a 2 e o 2 para a 1. Aí `j` chega a -1 e o `1` cai na posição 0.

## Análise

Aqui, diferente do selection sort, o custo **depende dos dados**, porque o `while` pode parar logo.

**Melhor caso: array já ordenado.** O `while` testa uma vez e para, em todas as \(n - 1\) rodadas. Custo \(\Theta(n)\).

**Pior caso: array em ordem inversa.** Cada chave tem que passar por todos os elementos à esquerda. Na rodada \(i\) são \(i\) deslocamentos:

$$
1 + 2 + \dots + (n-1) = \frac{n(n-1)}{2} = \Theta(n^2)
$$

**Caso médio:** em dados aleatórios, cada chave desliza por metade do trecho ordenado, em média. Isso dá cerca de \(n^2/4\) operações, que continua sendo \(\Theta(n^2)\).

## Estabilidade e memória

O insertion sort é **estável**, desde que o `while` use `>` e não `>=`. Com `>`, a chave para ao encontrar um elemento igual e nunca passa na frente dele. Também é **in-place**, memória \(O(1)\).

## Quando vale a pena

Para entradas grandes e aleatórias, \(n^2\) perde feio para merge sort e quick sort. Mas o insertion sort tem duas virtudes:

- **Arrays quase ordenados.** Se cada elemento está a poucas posições do lugar final, o `while` roda pouco e o algoritmo se aproxima de \(\Theta(n)\).
- **Arrays pequenos.** A constante é baixa e o código é simples. Por isso implementações de ordenação de bibliotecas reais costumam usar insertion sort para os pedaços pequenos dentro de um algoritmo mais sofisticado (o Timsort, usado em Python e Java, é assim).

## Exercício

Quantos deslocamentos o insertion sort faz em \([3, 2, 1]\)?

{{< details title="Gabarito" >}}
Chave 2: o 3 desliza (1 deslocamento). Chave 1: o 3 e o 2 deslizam (2 deslocamentos). Total: 3, que é \(3 \cdot 2 / 2\), o pior caso para \(n = 3\).
{{< /details >}}

## Resumo

- Mantém um prefixo ordenado e insere cada novo elemento no lugar certo, deslocando os maiores.
- Melhor caso \(\Theta(n)\), caso médio e pior caso \(\Theta(n^2)\).
- Estável e in-place.
- Excelente para arrays pequenos ou quase ordenados.

## Para estudar mais

- [Insertion Sort](http://joaoarthurbm.github.io/eda/posts/insertion-sort) — João Arthur Brunet (2019)