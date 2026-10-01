---
title: Lazy Segment Tree
weight: 16
description: Segment Tree com lazy propagation para atualizações em intervalo.
authors:
  - thallesgsrv
date: 2026-09-30
---

## O que é

Lazy Segment Tree estende Segment Tree para suportar atualizações em intervalos com marcação preguiçosa (lazy propagation), mantendo O(log n).

![Lazy Segment Tree exemplo](assets/images/lazysegtree-example.svg)

## Funcionamento passo a passo

1. Para uma atualização em intervalo, marque o nó com um valor `lazy` sem descer imediatamente.
2. Ao consultar ou descer, propague o `lazy` para os filhos (push) e atualize os valores agregados.
3. Isso garante que cada atualização/consulta percorra O(log n) nós amortizados.
