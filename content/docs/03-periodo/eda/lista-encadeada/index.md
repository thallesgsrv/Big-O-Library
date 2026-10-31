---
title: Lista encadeada
weight: 15
description: Nós ligados por referências. Inserção no início em O(1), mas sem acesso direto por índice.
autores:
  - thallesgsrv
date: 2026-10-30
---

## Sobre

Um array guarda os elementos lado a lado na memória, e por isso o elemento da posição `i` fica a um cálculo de distância. A contrapartida é que inserir no começo obriga a empurrar todo mundo uma casa. A **lista encadeada** troca essas vantagens: os elementos ficam espalhados, e cada um sabe onde está o próximo.

Pense numa caça ao tesouro: cada pista diz onde está a seguinte. Para chegar à quinta pista, você precisa passar pelas quatro primeiras.

## A ideia

A lista é formada por **nós**. Cada nó guarda um valor e uma referência para o próximo nó. O último nó aponta para `null`. A lista só precisa guardar uma referência para o primeiro nó, a **cabeça**.

```text
cabeça → [10 | •] → [20 | •] → [30 | null]
```

Se a cabeça é `null`, a lista está vazia.

## Representação

```java
public class ListaEncadeada {
    private static class No {
        int valor;
        No proximo;

        No(int valor, No proximo) {
            this.valor = valor;
            this.proximo = proximo;
        }
    }

    private No cabeca;
    private int tamanho;
}
```

O `No` fica dentro da lista porque ninguém de fora precisa conhecê-lo.

## Operações

### Inserir no início

Criamos um nó que aponta para a antiga cabeça e passamos a chamar esse nó de cabeça. Não importa o tamanho da lista, são sempre dois passos.

```java
public void adicionaInicio(int valor) {
    cabeca = new No(valor, cabeca);
    tamanho++;
}
```

Isso também funciona com a lista vazia: o novo nó aponta para `null`.

### Inserir no fim

Sem nenhuma informação extra, precisamos andar até o último nó:

```java
public void adicionaFim(int valor) {
    No novo = new No(valor, null);
    if (cabeca == null) {
        cabeca = novo;
    } else {
        No atual = cabeca;
        while (atual.proximo != null) {
            atual = atual.proximo;
        }
        atual.proximo = novo;
    }
    tamanho++;
}
```

O caso da lista vazia é separado porque não existe "último nó" ainda.

### Buscar um valor

Percorremos a lista de nó em nó até achar ou chegar ao fim:

```java
public boolean contem(int valor) {
    No atual = cabeca;
    while (atual != null) {
        if (atual.valor == valor) return true;
        atual = atual.proximo;
    }
    return false;
}
```

### Remover um valor

Para remover um nó no meio, precisamos que o nó **anterior** passe a apontar para o seguinte. Por isso o laço olha sempre para `atual.proximo`. Remover a cabeça é um caso à parte, porque ela não tem anterior.

```java
public boolean remove(int valor) {
    if (cabeca == null) return false;

    if (cabeca.valor == valor) {
        cabeca = cabeca.proximo;
        tamanho--;
        return true;
    }

    No atual = cabeca;
    while (atual.proximo != null && atual.proximo.valor != valor) {
        atual = atual.proximo;
    }
    if (atual.proximo == null) return false; // não achou

    atual.proximo = atual.proximo.proximo;   // "pula" o nó removido
    tamanho--;
    return true;
}
```

Em Java, o nó removido deixa de ser alcançável e o coletor de lixo cuida dele. Em linguagens como C, seria preciso liberar a memória manualmente.

## Análise de custo

| Operação | Lista encadeada | Array |
|---|---|---|
| Acessar o elemento da posição `i` | \(O(i)\), precisa percorrer | \(O(1)\) |
| Inserir no início | \(O(1)\) | \(O(n)\), desloca todos |
| Inserir no fim | \(O(n)\) (ou \(O(1)\) com referência para o último nó) | \(O(1)\) amortizado, se houver espaço |
| Buscar um valor | \(O(n)\) | \(O(n)\) |
| Remover o primeiro | \(O(1)\) | \(O(n)\), desloca todos |
| Remover um valor | \(O(n)\) para achar, \(O(1)\) para religar | \(O(n)\) |

Cada nó carrega uma referência extra, então a lista gasta mais memória por elemento do que o array. Em compensação, ela cresce e encolhe sem precisar redimensionar nem copiar nada.

Uma observação importante: remover ou inserir "no meio" só é \(O(1)\) **se você já estiver com o nó anterior em mãos**. Chegar até ele ainda custa \(O(n)\).

## Quando vale a pena

Quando há muitas inserções e remoções no início e pouco acesso por posição. É por isso que pilhas e filas costumam ser implementadas assim: a pilha usa a cabeça como topo (inserir e remover no início custam \(O(1)\)). Se você precisa de acesso por índice com frequência, o array é bem melhor.

## Exercícios

1. Desenhe a lista após `adicionaInicio(3)`, `adicionaInicio(2)`, `adicionaFim(4)`, `adicionaInicio(1)` e `remove(2)`.
2. Escreva um método `inverte()` que inverte a lista sem criar nós novos.
3. Qual é o custo de `adicionaFim` se a lista também guardar uma referência `cauda` para o último nó?

{{< details title="Gabarito" >}}
1. Depois de `adicionaInicio(3)`: `3`. Depois de `adicionaInicio(2)`: `2 → 3`. Depois de `adicionaFim(4)`: `2 → 3 → 4`. Depois de `adicionaInicio(1)`: `1 → 2 → 3 → 4`. Depois de `remove(2)`: `1 → 3 → 4`.
2. Percorremos a lista religando cada nó ao anterior:

```java
public void inverte() {
    No anterior = null;
    No atual = cabeca;
    while (atual != null) {
        No proximo = atual.proximo; // guarda antes de perder a ligação
        atual.proximo = anterior;
        anterior = atual;
        atual = proximo;
    }
    cabeca = anterior;
}
```

3. \(O(1)\): basta ligar o novo nó em `cauda.proximo` e atualizar `cauda`. É preciso lembrar de tratar a lista vazia e de atualizar a `cauda` quando o último nó for removido.
{{< /details >}}

## Resumo

- Lista encadeada = nós com valor e referência para o próximo; a lista guarda só a cabeça.
- Inserir e remover no início custam \(O(1)\). Acessar por posição e buscar custam \(O(n)\).
- Para remover um nó, o anterior precisa ser religado ao seguinte.
- Não há redimensionamento, mas há mais memória por elemento e acesso mais lento por índice.

## Para estudar mais

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)
