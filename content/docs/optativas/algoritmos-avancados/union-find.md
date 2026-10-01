---
title: Union-Find (DSU)
weight: 14
description: Estrutura de dados Disjoint Set Union, com explicação e visualização.
authors:
  - thallesgsrv
date: 2026-09-30
---

## O que é

Union-Find (DSU) mantém partições de um conjunto e suporta `find` e `union` eficientemente (path compression + union by size/rank).

![Union-Find exemplo](assets/images/union-find.svg)

## Operações

1. `find(x)`: retorna representante do conjunto de `x`.
2. `union(a,b)`: une os conjuntos de `a` e `b` (se forem distintos).

## Pseudocódigo

```py
def find(x):
    if parent[x] < 0:
        return x
    parent[x] = find(parent[x])
    return parent[x]

def union(a, b):
    ra, rb = find(a), find(b)
    if ra == rb: return False
    if parent[ra] > parent[rb]: ra, rb = rb, ra
    parent[ra] += parent[rb]
    parent[rb] = ra
    return True
```
