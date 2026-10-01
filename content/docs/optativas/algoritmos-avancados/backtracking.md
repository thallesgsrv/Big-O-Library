---
title: Backtracking
weight: 17
description: Técnica de busca por tentativa e erro — construção de soluções parciais e retorno.
authors:
  - thallesgsrv
date: 2026-09-30
---

## O que é

Backtracking é a técnica de construir soluções passo a passo e voltar (backtrack) quando um ramo não leva a solução.

![Backtracking exemplo](assets/images/backtracking-tree.svg)

## Passo a passo

1. Comece com uma solução vazia.
2. Tente uma opção válida e avance (recursão).
3. Se chegar a uma solução completa, registre-a.
4. Caso contrário, desfazer a escolha (pop) e tentar outra opção.

## Exemplo: geração de permutações

```py
def backtrack(partial):
    if len(partial) == n:
        resultado.append(partial[:])
        return
    for choice in choices:
        if valid(choice, partial):
            partial.append(choice)
            backtrack(partial)
            partial.pop()
```
