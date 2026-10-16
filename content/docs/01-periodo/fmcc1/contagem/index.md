---
title: Princípios de contagem
weight: 6
description: Princípio multiplicativo, permutações, arranjos e combinações.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

Contar de quantas formas algo pode acontecer é a base para analisar algoritmos, senhas, probabilidades e muito mais. A dificuldade quase nunca é a conta, e sim **decidir qual conta fazer**.

## Princípio multiplicativo

Se uma tarefa tem etapas **independentes**, multiplique as opções de cada etapa.

Exemplo: uma senha com 2 letras (26 opções cada) e depois 3 dígitos (10 cada): $26\cdot26\cdot10\cdot10\cdot10 = 676\,000$.

## Princípio aditivo

Se há casos que **não se sobrepõem**, some. Ir de A a B por 3 estradas **ou** 2 trilhas dá $3+2=5$ caminhos.

## Fatorial e permutações

$n! = n\cdot(n-1)\cdots2\cdot1$ (e $0!=1$). É o número de formas de **ordenar** $n$ objetos distintos. Os 3 livros A, B, C podem ser enfileirados de $3!=6$ jeitos.

## Arranjo ou combinação?

Pergunte: **a ordem importa?**

| Situação | Fórmula | Exemplo |
| --- | --- | --- |
| Ordem importa (escolher $k$ de $n$) | $A(n,k)=\dfrac{n!}{(n-k)!}$ | pódio com 3 de 10 corredores: $10\cdot9\cdot8=720$ |
| Ordem não importa | $\dbinom{n}{k}=\dfrac{n!}{k!\,(n-k)!}$ | escolher 3 de 10 pessoas para um comitê: $120$ |

A combinação é o arranjo dividido por $k!$, porque as $k!$ ordens do mesmo grupo contam como uma só.

## Ligação com conjuntos

$\binom{n}{k}$ é também o número de subconjuntos com $k$ elementos de um conjunto com $n$. Somando para todo $k$ obtemos $2^n$, o tamanho do conjunto das partes.

## Erros comuns

- **Somar quando era para multiplicar** (e o contrário). Etapas em sequência: multiplique. Casos alternativos: some.
- **Usar arranjo quando a ordem não importa**, contando o mesmo grupo várias vezes.

## Exercícios

1. Quantos anagramas tem a palavra `CASA`? (Cuidado com a letra repetida.)
2. De quantas formas dá para escolher 2 sobremesas entre 6 opções?

{{< details title="Gabarito" >}}
1. $4!$ ordens, mas as duas letras A são indistinguíveis: $\dfrac{4!}{2!}=12$.
2. A ordem não importa: $\dbinom{6}{2}=15$.
{{< /details >}}
