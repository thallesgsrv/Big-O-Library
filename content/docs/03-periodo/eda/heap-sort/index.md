---
title: Heap sort
weight: 9
description: Ordenação com um heap máximo. O(n log n) no pior caso e sem vetor auxiliar.
autores:
  - thallesgsrv
date: 2026-10-30
---

## Sobre

O selection sort acha o maior elemento varrendo todo o array, e por isso gasta \(\Theta(n)\) em cada rodada. O heap sort faz a mesma coisa, "tira o maior e coloca no fim", só que usa uma estrutura que entrega o maior elemento rapidamente: o **heap**. O resultado é \(O(n \log n)\) mesmo no pior caso, sem precisar de um array auxiliar como o merge sort.

## O que é um heap máximo

Um **heap máximo** é uma árvore binária *completa* (todos os níveis cheios, exceto talvez o último, que é preenchido da esquerda para a direita) em que **todo pai é maior ou igual aos seus filhos**. Consequência direta: o maior elemento está sempre na raiz.

A parte elegante é que essa árvore cabe dentro de um array, sem ponteiros. Para a posição \(i\) (começando em 0):

- filho da esquerda: \(2i + 1\)
- filho da direita: \(2i + 2\)
- pai: \(\lfloor (i - 1) / 2 \rfloor\)

Por exemplo, o array `[10, 5, 8, 1, 3, 7]` é um heap máximo: 10 é maior que 5 e 8; 5 é maior que 1 e 3; 8 é maior que 7.

## A ideia

1. **Construir o heap.** Reorganizamos o array para que ele vire um heap máximo.
2. **Extrair o maior, repetidamente.** Trocamos a raiz (o maior) com o último elemento do heap. Esse maior já está no lugar definitivo, então o heap encolhe uma posição. A nova raiz pode violar a regra, e então a **afundamos**: trocamos com o maior dos filhos, repetidamente, até ela se acomodar.

A operação central é o `afunda`. Se só a raiz está fora do lugar, afundá-la restaura o heap inteiro, porque o resto já respeitava a regra.

## Veja funcionando

A fase de **construção** chama `afunda` de baixo para cima, começando pelo último pai. Depois vem a **extração**. Os rótulos `pai`, `esq` e `dir` mostram quem está sendo comparado. Repare que a parte já ordenada (verde) cresce a partir do fim do array, enquanto o heap, na região sem apagar, encolhe.

{{< viz algoritmo="heap" >}}

## Implementação

Primeiro o `afunda`. Ele recebe o índice `i` e o tamanho atual do heap (`tam`), porque a cada extração o heap fica menor, mas o array continua do mesmo tamanho.

```java
static void afunda(int[] v, int i, int tam) {
    while (true) {
        int esq = 2 * i + 1;
        int dir = 2 * i + 2;
        int maior = i;

        if (esq < tam && v[esq] > v[maior]) maior = esq;
        if (dir < tam && v[dir] > v[maior]) maior = dir;

        if (maior == i) return; // já está no lugar certo

        int temp = v[i];
        v[i] = v[maior];
        v[maior] = temp;
        i = maior; // continua afundando
    }
}
```

Os testes `esq < tam` e `dir < tam` evitam sair do heap. Agora o algoritmo completo:

```java
static void heapSort(int[] v) {
    int n = v.length;

    // 1) constrói o heap: do último pai até a raiz
    for (int i = n / 2 - 1; i >= 0; i--) {
        afunda(v, i, n);
    }

    // 2) extrai o maior, um por vez
    for (int fim = n - 1; fim >= 1; fim--) {
        int temp = v[0];
        v[0] = v[fim];
        v[fim] = temp;
        afunda(v, 0, fim); // o heap agora tem 'fim' elementos
    }
}
```

O último pai está em `n / 2 - 1`, porque os elementos de `n / 2` em diante são folhas e uma folha sozinha já é um heap.

## Análise

**Extração.** São \(n - 1\) rodadas, e cada `afunda` desce no máximo a altura do heap, que é \(\lfloor \log_2 n \rfloor\). Custo: \(O(n \log n)\).

**Construção.** Uma conta rápida diria \(O(n \log n)\) também, mas na verdade a construção custa \(O(n)\): a maioria dos nós está perto das folhas e afunda muito pouco. Para a análise final isso não muda nada, porque a extração domina:

$$
O(n) + O(n \log n) = O(n \log n)
$$

Isso vale para o melhor, o médio e o pior caso. O heap sort não tem um "dia ruim" como o quick sort.

## Estabilidade e memória

O heap sort **não é estável**: as trocas entre a raiz e o último elemento atravessam o array e podem inverter a ordem de elementos iguais. Por outro lado, é **in-place**, com memória \(O(1)\).

## Quando vale a pena

Quando você precisa de um **limite garantido** de \(O(n \log n)\) e não pode gastar memória extra. Na prática, o quick sort costuma ser mais rápido, porque o heap sort acessa a memória de forma menos ordenada (pula entre pai e filhos distantes no array), o que é ruim para o cache.

A estrutura de heap vale por si só: ela é a base da **fila de prioridade**, que aparece no algoritmo de Dijkstra e em muitos problemas de "pegue sempre o maior (ou menor) item".

## Exercícios

1. O array `[9, 5, 8, 1, 3, 7]` é um heap máximo? E `[9, 5, 8, 6, 3, 7]`?
2. Em quais posições estão os filhos do elemento da posição 3? E o pai?

{{< details title="Gabarito" >}}
1. O primeiro é: 9 ≥ 5 e 8; 5 ≥ 1 e 3; 8 ≥ 7. O segundo não é: o elemento da posição 1 (valor 5) tem filho 6 na posição 3, e 6 > 5 viola a regra.
2. Filhos nas posições \(2 \cdot 3 + 1 = 7\) e \(2 \cdot 3 + 2 = 8\). Pai na posição \(\lfloor (3 - 1) / 2 \rfloor = 1\).
{{< /details >}}

## Resumo

- Heap máximo: árvore completa, guardada em array, em que todo pai ≥ filhos. O maior fica na raiz.
- Filhos de \(i\): \(2i + 1\) e \(2i + 2\). Pai: \(\lfloor (i - 1) / 2 \rfloor\).
- Algoritmo: construir o heap e depois trocar a raiz com o último e afundar, repetidamente.
- \(O(n \log n)\) em todos os casos, \(O(1)\) de memória extra, não estável.

## Para estudar mais

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)
