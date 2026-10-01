---
title: Programação Dinâmica (DP)
weight: 19
description: Técnica de programação dinâmica com exemplos e visualização.
authors:
  - thallesgsrv
date: 2026-09-30
---

## O que é

DP resolve problemas quebrando-os em subproblemas que se repetem, armazenando resultados (memoização ou bottom-up).

![DP exemplo](assets/images/dp-table.svg)

## Passo a passo

1. Identifique estados e definição de `dp[state]`.
2. Encontre a recorrência que combina subproblemas.
3. Escolha ordem de preenchimento (bottom-up) ou memoize (top-down).
4. Retorne `dp[goal]`.

## Exemplo: Fibonacci (bottom-up)

```py
dp = [0, 1]
for i in range(2, n+1):
    dp.append(dp[i-1] + dp[i-2])
return dp[n]
```
