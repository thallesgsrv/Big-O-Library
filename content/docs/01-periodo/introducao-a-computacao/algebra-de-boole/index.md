---
title: Álgebra de Boole e portas lógicas
weight: 3
description: Operações AND, OR e NOT, portas lógicas e circuitos combinacionais simples.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

Os circuitos de um computador só lidam com dois valores, `0` e `1`. A **álgebra de Boole** é a matemática desses dois valores, e as **portas lógicas** são as peças que a realizam em hardware.

## As operações básicas

| $A$ | $B$ | NOT $A$ | $A$ AND $B$ | $A$ OR $B$ | $A$ XOR $B$ |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 | 1 | 0 |

- **AND:** sai 1 só se **as duas** entradas forem 1.
- **OR:** sai 1 se **pelo menos uma** for 1.
- **NOT:** inverte.
- **XOR:** sai 1 se as entradas forem **diferentes**.

Na notação da álgebra: AND é $A\cdot B$, OR é $A+B$ e NOT é $\overline{A}$.

## Leis úteis

- $A+0=A$, $\;A\cdot1=A$, $\;A\cdot0=0$, $\;A+1=1$
- $A+\overline{A}=1$ e $A\cdot\overline{A}=0$
- De Morgan: $\overline{A\cdot B}=\overline{A}+\overline{B}$ e $\overline{A+B}=\overline{A}\cdot\overline{B}$

Servem para **simplificar** um circuito: menos portas, menos custo e menos energia.

## Circuito combinacional: o meio somador

Um circuito **combinacional** tem saída que depende só das entradas de agora, sem memória. O **meio somador** soma dois bits $A$ e $B$:

- soma $=A\ \text{XOR}\ B$
- vai-um (*carry*) $=A\ \text{AND}\ B$

Confira: $1+1$ dá soma $0$ e vai-um $1$, ou seja, $10_2=2$. Ligando vários somadores, a CPU soma números de qualquer tamanho. É a ponte entre esta página e [Sistemas de numeração](../sistemas-de-numeracao/).

## Exercícios

1. Complete: $A\cdot(A+B)=\ ?$ (teste com a tabela).
2. Escreva a tabela de $\overline{A}\cdot B$.

{{< details title="Gabarito" >}}
1. Vale $A$. Com $A=0$ dá 0; com $A=1$ dá $1\cdot(1+B)=1$.
2. Só dá 1 quando $A=0$ e $B=1$; nas outras três linhas dá 0.
{{< /details >}}
