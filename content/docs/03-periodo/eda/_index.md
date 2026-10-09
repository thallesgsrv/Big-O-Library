---
title: Estruturas de Dados e Algoritmos
weight: 3
description: Análise assintótica e algoritmos
rotulo: Conteúdos
autores:
  - thallesgsrv
date: 2026-10-09
---

## Sobre

Aqui a gente aprende a medir o custo de um algoritmo sem depender de cronômetro e usa essa régua para comparar os principais algoritmos.

## Conteúdo previsto

- análise de algoritmos: contagem de operações, notação assintótica e recorrências
- ordenação quadrática: selection sort e insertion sort
- ordenação por divisão e conquista: merge sort e quick sort
- ordenação linear: counting sort e radix sort

## Comparando os algoritmos

Depois de ler os tópicos, esta tabela serve de resumo. \(n\) é o tamanho do array, \(k\) é o maior valor possível no counting sort e \(d\) é o número de dígitos no radix sort.

| Algoritmo | Melhor caso | Caso médio | Pior caso | Estável | In-place |
|---|---|---|---|---|---|
| Selection sort | \(n^2\) | \(n^2\) | \(n^2\) | não | sim |
| Insertion sort | \(n\) | \(n^2\) | \(n^2\) | sim | sim |
| Merge sort | \(n \log n\) | \(n \log n\) | \(n \log n\) | sim | não |
| Quick sort | \(n \log n\) | \(n \log n\) | \(n^2\) | não | sim |
| Counting sort | \(n + k\) | \(n + k\) | \(n + k\) | sim | não |
| Radix sort | \(d(n + b)\) | \(d(n + b)\) | \(d(n + b)\) | sim | não |

> [!NOTE]
> No radix sort, \(b\) é a base numérica usada (10 nos nossos exemplos).

## Materiais

### Links úteis

- [Estruturas de Dados e Algoritmos](https://joaoarthurbm.github.io/eda/conteudo/) — João Arthur Brunet, Computação @ UFCG (2019). Material que serviu de referência para a ordem e a abordagem destas páginas.
- [Introduction to Algorithms](https://1drv.ms/b/c/975ec841994373bd/IQA8-Pue8tG1TLd983UvujbkAe-BVfQG2JOPC9MZGLWf-fY?e=k0B4Hr) — Cormen et al.

## Contribuição

Se você tiver materiais úteis desta disciplina, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.
