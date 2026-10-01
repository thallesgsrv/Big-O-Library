---
title: Algoritmos Gulosos (Greedy)
weight: 18
description: Estratégia gulosa com exemplos e visualização.
authors:
  - thallesgsrv
date: 2026-09-30
---

## O que é

Algoritmos gulosos tomam a melhor escolha local a cada passo esperando obter um ótimo global.

![Guloso exemplo](assets/images/greedy-example.svg)

## Passo a passo

1. Defina uma escolha gulosa (regra de seleção local).
2. Repetidamente escolha o melhor candidato disponível e aplique.
3. Pare quando não houver mais escolhas.

## Exemplo: seleção de intervalos (activity selection)

1. Ordene intervalos por tempo de término crescente.
2. Selecione o primeiro intervalo; para cada intervalo seguinte, selecione se começar após o fim do selecionado anterior.
