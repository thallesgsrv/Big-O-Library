---
title: Busca em Largura (BFS)
weight: 11
description: Explanação e visualização passo a passo do BFS.
authors:
  - thallesgsrv
date: 2026-09-30
---

## O que é

BFS (Breadth-First Search) explora o grafo em camadas — útil para encontrar caminhos mínimos em grafos não ponderados.

![BFS exemplo](assets/images/bfs-example.svg)

## Funcionamento passo a passo

1. Inicie a partir do vértice raiz, marque como visitado e enfileire.
2. Enquanto a fila não estiver vazia: remova o vértice no front e visite seus vizinhos não visitados, marcando-os e enfileirando.

## Passo a passo no exemplo

- Enfileire `A`.
- Remova `A`, visite `B` e `C`, enfileire-os.
- Remova `B`, visite vizinhos restantes, etc.

## Pseudocódigo

```py
from collections import deque

def bfs(g, start):
    visited = {start}
    q = deque([start])
    while q:
        v = q.popleft()
        for u in g[v]:
            if u not in visited:
                visited.add(u)
                q.append(u)
    return visited
```
