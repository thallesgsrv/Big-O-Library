---
title: Busca em Profundidade (DFS)
weight: 3
description: Mergulha o máximo possível por um caminho antes de voltar (backtracking).
autores:
  - thallesgsrv
date: 2026-09-29
---

A DFS segue um caminho até o fim e só então volta para tentar os outros.

## Intuição

É explorar um labirinto com um fio na mão: você segue em frente até esbarrar num beco ou num lugar já visitado, e então volta pelo fio até a última bifurcação com opções. A **pilha de chamadas** é o fio.

## Visualização

{{< viz algoritmo="dfs" >}}

## Código

### Python

```python
def dfs(grafo, u, descoberta=None):
    if descoberta is None:
        descoberta = {}
    descoberta[u] = len(descoberta) + 1
    for v in grafo[u]:
        if v not in descoberta:
            dfs(grafo, v, descoberta)
    return descoberta
```

### Java

```java
static void dfs(List<Integer>[] g, int u, int[] desc, int[] tempo) {
    desc[u] = ++tempo[0];
    for (int v : g[u])
        if (desc[v] == 0) dfs(g, v, desc, tempo);
}
```

## Complexidade

Tempo \(O(V + E)\) e espaço \(O(V)\) pela profundidade da recursão.

> [!TIP]
> Em grafos muito profundos a recursão pode estourar a pilha. Troque por uma pilha explícita.

## Quando usar

Detectar ciclos, ordenação topológica, componentes fortemente conexos (Tarjan) e backtracking.

## Exercícios

1. Em que ordem os vértices são descobertos na animação?

{{< details title="Gabarito" >}}
Siga a tabela "Tempo de descoberta" até o fim da animação. A ordem depende da ordem das arestas na lista de adjacência.
{{< /details >}}

## Materiais

### Livros e apostilas

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)

## Contribuição

Se você tiver materiais úteis deste algoritmo, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.
