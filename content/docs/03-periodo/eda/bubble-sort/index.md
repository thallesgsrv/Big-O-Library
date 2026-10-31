---
title: Bubble sort
weight: 6
description: Ordenação por trocas de vizinhos. Simples, mas quase sempre perde para os outros.
autores:
  - thallesgsrv
date: 2026-10-30
---

## Sobre

O bubble sort é o algoritmo de ordenação mais fácil de explicar: compare dois vizinhos e, se estiverem fora de ordem, troque. Repita até não precisar trocar mais nada. O nome vem do efeito visual, porque o maior elemento "borbulha" até o fim do array a cada rodada, como uma bolha subindo na água.

Quase ninguém usa na prática, mas ele é um ótimo exercício de análise: dá para ver direto no código de onde vem o \(n^2\) e como uma pequena ideia (parar cedo) muda o melhor caso.

## A ideia

Em cada rodada percorremos o array da esquerda para a direita comparando pares \((v[j], v[j+1])\). Se \(v[j] > v[j+1]\), trocamos. Ao fim da primeira rodada o maior elemento já está na última posição. Na segunda rodada o segundo maior chega à penúltima, e assim por diante. Por isso cada rodada pode olhar um elemento a menos que a anterior.

Vamos ordenar \([5, 1, 4, 2, 8, 3]\):

| Rodada | Trocas feitas | Array depois |
|---|---|---|
| 1 | 5↔1, 5↔4, 5↔2, 8↔3 | `1 4 2 5 3 \| 8` |
| 2 | 4↔2, 5↔3 | `1 2 4 3 \| 5 8` |
| 3 | 4↔3 | `1 2 3 \| 4 5 8` |
| 4 | nenhuma | `1 2 3 4 5 8` |

A barra `|` separa a parte final, que já está no lugar definitivo. Na rodada 4 nada foi trocado, e isso é o sinal de que o array já está ordenado: podemos parar.

## Veja funcionando

Use ▶ para executar sozinho ou ▶| para avançar um passo por vez. **Laranja** são os dois vizinhos sendo trocados, **azul** é um par que já estava em ordem e **verde** é o que já chegou ao lugar certo.

{{< viz algoritmo="bubble" >}}

Repare que, na animação, os elementos pequenos só andam uma casa para a esquerda por rodada, enquanto os grandes podem andar muito para a direita. Esse comportamento assimétrico é uma característica conhecida do bubble sort.

## Implementação

Começamos com as duas voltas. A de fora conta as rodadas e a de dentro compara os vizinhos. O limite da volta de dentro encolhe a cada rodada, porque os últimos `i` elementos já estão no lugar.

```java
for (int i = 0; i < v.length - 1; i++) {
    for (int j = 0; j < v.length - 1 - i; j++) {
        // compara v[j] com v[j + 1]
    }
}
```

O `v.length - 1 - i` garante que `j + 1` nunca saia do array e que não olhemos de novo a parte já ordenada. Dentro da volta, a troca clássica usa uma variável temporária:

```java
if (v[j] > v[j + 1]) {
    int temp = v[j];
    v[j] = v[j + 1];
    v[j + 1] = temp;
}
```

Agora a melhoria: se uma rodada inteira passar sem nenhuma troca, o array está ordenado e podemos sair. Basta uma variável que lembra se houve troca.

```java
for (int i = 0; i < v.length - 1; i++) {
    boolean trocou = false;
    for (int j = 0; j < v.length - 1 - i; j++) {
        if (v[j] > v[j + 1]) {
            int temp = v[j];
            v[j] = v[j + 1];
            v[j + 1] = temp;
            trocou = true;
        }
    }
    if (!trocou) break;
}
```

## Análise

**Sem a verificação de parada**, o número de comparações não depende dos dados. A rodada \(i\) faz \(n - 1 - i\) comparações, então o total é:

$$
(n-1) + (n-2) + \dots + 1 = \frac{n(n-1)}{2} = \Theta(n^2)
$$

**Com a verificação de parada:**

- **Melhor caso (array já ordenado):** a primeira rodada faz \(n - 1\) comparações, não troca nada e o algoritmo para. Custo \(\Theta(n)\).
- **Pior caso (ordem inversa):** toda comparação resulta em troca e todas as rodadas são necessárias. Custo \(\Theta(n^2)\).
- **Caso médio:** \(\Theta(n^2)\).

O número de **trocas** é sempre igual ao número de **inversões** do array, isto é, pares \((a, b)\) com \(a\) antes de \(b\) e \(a > b\). No nosso exemplo são 7 inversões e 7 trocas.

## Estabilidade e memória

O bubble sort é **estável**, porque só troca quando o elemento da esquerda é *estritamente* maior (`>`). Dois elementos iguais nunca trocam de lugar. É também **in-place**, com memória \(O(1)\).

## Quando vale a pena

Raramente. Comparado ao insertion sort, que também é \(\Theta(n^2)\) no pior caso e \(\Theta(n)\) no melhor, o bubble sort costuma fazer bem mais escritas na memória, porque cada troca mexe em duas posições, enquanto o insertion sort só desliza elementos. Para entradas grandes, merge sort, quick sort e heap sort são muito melhores.

O valor dele é didático: é um bom primeiro algoritmo para praticar laços aninhados, invariantes e contagem de operações.

## Exercício

Quantas comparações e quantas trocas o bubble sort (com parada antecipada) faz em \([3, 2, 1]\)?

{{< details title="Gabarito" >}}
Rodada 1: compara 3 e 2 (troca) e depois 3 e 1 (troca), resultando em `2 1 3`. Rodada 2: compara 2 e 1 (troca), resultando em `1 2 3`. Total: 3 comparações e 3 trocas. Como o array estava em ordem inversa, o número de trocas é o máximo de inversões possível para \(n = 3\), que é \(3 \cdot 2 / 2 = 3\).
{{< /details >}}

## Resumo

- Compara vizinhos e troca os que estão fora de ordem. O maior elemento sobe até o fim a cada rodada.
- Sem parada antecipada: \(\Theta(n^2)\) sempre. Com parada antecipada: melhor caso \(\Theta(n)\).
- Número de trocas = número de inversões.
- Estável e in-place.
- Útil para aprender, raramente usado na prática.

## Para estudar mais

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)
