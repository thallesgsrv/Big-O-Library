---
title: Fila
weight: 14
description: Contrato FIFO e implementação de uma fila circular com array.
autores:
  - thallesgsrv
date: 2026-10-30
---

## Sobre

Fila de banco, fila de impressão, fila de espera: quem chegou primeiro é atendido primeiro. Esse comportamento se chama **FIFO**, do inglês *First In, First Out*, e é o oposto da pilha, que é LIFO.

Na estrutura de dados, a gente insere no **fim** da fila (`enfileira`) e remove do **início** (`desenfileira`). Também é comum ter uma operação para consultar quem está na frente sem remover (`primeiro`).

## Onde pode ser usado?

Impressoras guardam os documentos numa fila. Servidores web enfileiram requisições quando estão ocupados. O sistema operacional mantém filas de processos esperando a CPU. E a busca em largura (BFS), um algoritmo clássico de grafos, usa uma fila para visitar os vértices por camadas.

## Representação com array

Uma ideia ingênua é guardar os elementos do índice `0` em diante e, a cada `desenfileira`, deslocar todo mundo uma casa para a esquerda. Isso funciona, mas cada remoção custa \(O(n)\).

Uma solução melhor é guardar o índice `inicio`, que aponta para o primeiro elemento, e simplesmente avançá-lo ao remover. O problema é que, depois de várias operações, `inicio` chega ao fim do array mesmo com espaço sobrando no começo. A saída é tratar o array como um **círculo**: depois da última posição, voltamos à posição `0`. Isso se faz com o operador de resto `%`.

```java
public class Fila {
    private final int[] elementos;
    private int inicio;   // índice do primeiro elemento
    private int tamanho;  // quantos elementos há na fila

    public Fila(int capacidade) {
        elementos = new int[capacidade];
        inicio = 0;
        tamanho = 0;
    }
}
```

Guardar `inicio` e `tamanho` (em vez de `inicio` e `fim`) deixa fácil diferenciar fila vazia de fila cheia. Se usássemos só dois índices, os dois casos poderiam parecer iguais (`inicio == fim`).

## Operações

```java
public boolean estaVazia() {
    return tamanho == 0;
}

public boolean estaCheia() {
    return tamanho == elementos.length;
}
```

Para inserir, a próxima posição livre é `inicio + tamanho`, "dando a volta" com `%`:

```java
public void enfileira(int x) {
    if (estaCheia()) {
        throw new IllegalStateException("fila cheia");
    }
    int posicao = (inicio + tamanho) % elementos.length;
    elementos[posicao] = x;
    tamanho++;
}
```

Para remover, devolvemos o elemento de `inicio` e avançamos o `inicio` também com a volta:

```java
public int desenfileira() {
    if (estaVazia()) {
        throw new java.util.NoSuchElementException("fila vazia");
    }
    int x = elementos[inicio];
    inicio = (inicio + 1) % elementos.length;
    tamanho--;
    return x;
}

public int primeiro() {
    if (estaVazia()) {
        throw new java.util.NoSuchElementException("fila vazia");
    }
    return elementos[inicio];
}
```

## Acompanhando um exemplo

Fila de capacidade 3, mostrando o array e o valor de `inicio` e `tamanho` após cada operação (`·` é uma posição sem elemento válido):

| Operação | Array | `inicio` | `tamanho` |
|---|---|---|---|
| `enfileira(10)` | `[10, ·, ·]` | 0 | 1 |
| `enfileira(20)` | `[10, 20, ·]` | 0 | 2 |
| `enfileira(30)` | `[10, 20, 30]` | 0 | 3 |
| `desenfileira()` → 10 | `[·, 20, 30]` | 1 | 2 |
| `enfileira(40)` | `[40, 20, 30]` | 1 | 3 |

Na última linha o 40 foi parar na posição `0`: \((1 + 2) \bmod 3 = 0\). É exatamente a volta circular reaproveitando o espaço que o 10 liberou.

## Análise de custo

Todas as operações (`enfileira`, `desenfileira`, `primeiro`, `estaVazia`, `estaCheia`) fazem um número fixo de passos e custam \(O(1)\). A memória é \(O(c)\), em que `c` é a capacidade. Assim como na pilha com array, a capacidade é fixa: se encher, `enfileira` lança exceção.

## Exercícios

1. Em uma fila de capacidade 4, acompanhe `inicio`, `tamanho` e o array após: `enfileira(1)`, `enfileira(2)`, `enfileira(3)`, `desenfileira()`, `desenfileira()`, `enfileira(4)`, `enfileira(5)`, `enfileira(6)`.
2. Qual seria o problema de implementar `desenfileira` deslocando todos os elementos para a esquerda?
3. Como usar duas pilhas para simular uma fila?

{{< details title="Gabarito" >}}
1. Depois dos três primeiros `enfileira`: `[1, 2, 3, ·]`, `inicio = 0`, `tamanho = 3`. Depois dos dois `desenfileira`: `inicio = 2`, `tamanho = 1`. `enfileira(4)` vai para \((2 + 1) \bmod 4 = 3\), `enfileira(5)` vai para \((2 + 2) \bmod 4 = 0\) e `enfileira(6)` vai para \((2 + 3) \bmod 4 = 1\). O array final é `[5, 6, 3, 4]`, com `inicio = 2` e `tamanho = 4` (fila cheia). Os valores 1 e 2 que sobraram no array foram sobrescritos, pois não faziam mais parte da fila.
2. O custo de cada remoção passaria de \(O(1)\) para \(O(n)\).
3. Uma pilha de entrada recebe os `enfileira`. Quando é preciso desenfileirar e a pilha de saída está vazia, despejamos toda a pilha de entrada na de saída (a ordem se inverte) e fazemos `pop` na de saída. Cada elemento é movido no máximo uma vez, então o custo amortizado por operação é \(O(1)\).
{{< /details >}}

## Resumo

- Fila segue FIFO: o primeiro a entrar é o primeiro a sair.
- Insere no fim (`enfileira`) e remove do início (`desenfileira`).
- Com array circular (`inicio`, `tamanho` e `%`), todas as operações custam \(O(1)\).
- Guardar `tamanho` evita a ambiguidade entre fila vazia e fila cheia.

## Para estudar mais

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)
