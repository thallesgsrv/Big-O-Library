---
title: Kruskal (Árvore Geradora Mínima)
weight: 13
description: Explicação e visualização do algoritmo de Kruskal.
authors:
  - thallesgsrv
date: 2026-09-30
---

## O que é

Kruskal constrói a Árvore Geradora Mínima ordenando arestas por peso e usando uma estrutura de conjuntos disjuntos (DSU) para evitar ciclos.

![Kruskal exemplo](assets/images/kruskal-example.svg)

## Funcionamento passo a passo

1. Ordene todas as arestas por peso crescente.
2. Inicialize DSU com cada vértice em seu próprio conjunto.
3. Para cada aresta (u,v,w) na ordem: se `find(u) != find(v)`, una os conjuntos (union) e acrescente a aresta à MST.
4. Pare quando a MST tiver |V|-1 arestas.

## Observações

- DSU (Union-Find) permite checar rapidamente se duas vértices já estão conectados.
