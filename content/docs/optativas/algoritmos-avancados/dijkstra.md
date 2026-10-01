---
title: Dijkstra (Menor caminho com pesos não-negativos)
weight: 12
description: Explicação e visualização do algoritmo de Dijkstra.
authors:
  - thallesgsrv
date: 2026-09-30
---

## O que é

Dijkstra encontra o caminho de custo mínimo a partir de uma origem em grafos com arestas de peso não-negativo.

![Dijkstra exemplo](assets/images/dijkstra-example.svg)

## Funcionamento passo a passo

1. Inicialize distância da origem para 0 e para os demais como infinito.
2. Use uma fila de prioridade (min-heap) para extrair o vértice com menor distância conhecida.
3. Relaxe todas arestas saindo desse vértice, atualizando distâncias e empurrando novas entradas no heap.
4. Repita até o heap esvaziar.

## Pseudocódigo (resumido)

```py
import heapq

def dijkstra(g, start):
    dist = {v: float('inf') for v in g}
    dist[start] = 0
    heap = [(0, start)]
    while heap:
        d, v = heapq.heappop(heap)
        if d > dist[v]:
            continue
        for u, w in g[v]:
            nd = d + w
            if nd < dist[u]:
                dist[u] = nd
                heapq.heappush(heap, (nd, u))
    return dist
```
