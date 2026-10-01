---
title: Busca em Largura (BFS)
weight: 2
description: Explora o grafo por camadas e acha o menor caminho em número de arestas.
autores:
  - thallesgsrv
date: 2026-09-29
---

A BFS visita primeiro os vértices mais próximos da origem, camada por camada.

## Intuição

É a pedra caindo na água: a onda alcança todos os vértices a 1 aresta, depois os a 2 arestas, e assim por diante. Por isso usa uma **fila**: quem chegou primeiro é explorado primeiro.

## Visualização

{{< viz algoritmo="bfs" >}}

## Código

### Python

```python
from collections import deque

def bfs(grafo, origem):
    nivel = {origem: 0}
    fila = deque([origem])
    while fila:
        u = fila.popleft()
        for v in grafo[u]:
            if v not in nivel:
                nivel[v] = nivel[u] + 1
                fila.append(v)
    return nivel
```

### Java

```java
static int[] bfs(List<Integer>[] g, int origem) {
    int[] nivel = new int[g.length];
    Arrays.fill(nivel, -1);
    nivel[origem] = 0;
    Queue<Integer> fila = new ArrayDeque<>(List.of(origem));
    while (!fila.isEmpty()) {
        int u = fila.poll();
        for (int v : g[u])
            if (nivel[v] == -1) { nivel[v] = nivel[u] + 1; fila.add(v); }
    }
    return nivel;
}
```

## Complexidade

Tempo \(O(V + E)\) e espaço \(O(V)\).

## Quando usar

Menor caminho em grafos **sem pesos**, componentes conexos e problemas de "mínimo de passos". Com pesos, use Dijkstra.

## Exercícios

1. Qual o nível de E na animação? Quais arestas formam a árvore da BFS?

{{< details title="Gabarito" >}}
E fica no nível 2 (A→F→E). A árvore é formada pelas arestas verdes na animação.
{{< /details >}}

## Materiais

### Livros e apostilas

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)

## Contribuição

Se você tiver materiais úteis deste algoritmo, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.
