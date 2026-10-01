---
title: Segment Tree
weight: 15
description: Estrutura de Segment Tree com visualização e passos de construção e consulta.
authors:
  - thallesgsrv
date: 2026-09-30
---

## O que é

Segment Tree é uma árvore binária usada para responder consultas e atualizações em intervalos em tempo logarítmico.

![Segment Tree exemplo](assets/images/segtree-example.svg)

## Funcionamento passo a passo

1. Construa uma árvore onde cada nó armazena o resultado (soma, mínimo, etc.) de um segmento do array.
2. Consulta de intervalo é feita percorrendo nós que cobrem partes disjuntas do intervalo pedido; tempo O(log n).
3. Atualização de ponto altera um nó folha e atualiza seus ancestrais; tempo O(log n).

## Pseudocódigo (construção)

```py
def build(node, l, r):
    if l == r:
        seg[node] = arr[l]
        return
    mid = (l + r)//2
    build(node*2, l, mid)
    build(node*2+1, mid+1, r)
    seg[node] = seg[node*2] + seg[node*2+1]
```
