---
title: Busca em Profundidade (DFS)
weight: 10
description: Explanação e visualização passo a passo do DFS.
authors:
  - thallesgsrv
date: 2026-09-30
---

## O que é

DFS (Depth-First Search) explora um grafo seguindo um ramo até o fim antes de voltar — útil para ordenação topológica, componentes conexas e backtracking.

![DFS exemplo](assets/images/dfs-example.svg)

## Funcionamento passo a passo

1. Escolha um vértice inicial e marque como visitado.
2. Para cada vizinho não visitado, recursivamente aplique DFS no vizinho.
3. Ao retornar da recursão, prossiga com o próximo vizinho.

## Passo a passo num exemplo

- Passo 1: visite `A`, empilhe `A`.
- Passo 2: visite `B` (vizinho de A), empilhe `B`.
- Passo 3: visite `C` (vizinho de B), empilhe `C`.
- Passo 4: `C` não tem vizinhos não visitados, desempilhe e retorne para `B`.

## Pseudocódigo

```py
def dfs(g, v, visited):
    visited.add(v)
    for u in g[v]:
        if u not in visited:
            dfs(g, u, visited)

visited = set()
dfs(graph, start, visited)
```
