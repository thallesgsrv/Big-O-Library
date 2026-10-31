---
title: Relações
weight: 6
description: Relações binárias, propriedades, relações de equivalência (com classes) e relações de ordem.
autores:
  - thallesgsrv
date: 2026-10-30
---

## Sobre

Uma relação é uma forma de dizer que certos elementos "estão ligados" a outros: um número é menor que outro, uma pessoa é irmã de outra, um número divide outro. Formalizar isso com conjuntos dá um vocabulário para falar de igualdade, de ordem e de agrupamentos, que aparece em bancos de dados, grafos e ordenação.

## Definição

Uma **relação binária** de $A$ em $B$ é um subconjunto $R \subseteq A \times B$. Quando $(a, b) \in R$ escrevemos $a \mathrel{R} b$. Quando $A = B$, dizemos que $R$ é uma relação **em $A$**.

Exemplo: em $A = \{1, 2, 3\}$, a relação "menor que" é $\{(1,2), (1,3), (2,3)\}$.

## As quatro propriedades

Uma relação $R$ em $A$ é:

| Propriedade | Definição |
|---|---|
| **reflexiva** | $a \mathrel{R} a$ para todo $a \in A$ |
| **simétrica** | se $a \mathrel{R} b$ então $b \mathrel{R} a$ |
| **antissimétrica** | se $a \mathrel{R} b$ e $b \mathrel{R} a$ então $a = b$ |
| **transitiva** | se $a \mathrel{R} b$ e $b \mathrel{R} c$ então $a \mathrel{R} c$ |

Aplicando a alguns exemplos conhecidos:

| Relação | Reflexiva | Simétrica | Antissimétrica | Transitiva |
|---|---|---|---|---|
| $=$ em $\mathbb{Z}$ | sim | sim | sim | sim |
| $\le$ em $\mathbb{Z}$ | sim | não | sim | sim |
| $<$ em $\mathbb{Z}$ | não | não | sim | sim |
| $\mid$ (divide) em $\mathbb{Z}_{>0}$ | sim | não | sim | sim |
| $\subseteq$ entre conjuntos | sim | não | sim | sim |
| mesmo resto na divisão por 3, em $\mathbb{Z}$ | sim | sim | não | sim |

> [!IMPORTANT]
> **Antissimétrica não é o contrário de simétrica.** A relação $=$ é as duas coisas ao mesmo tempo, e $<$ é antissimétrica "por vacuidade": nunca ocorre $a < b$ e $b < a$ juntos, então a condição nunca é violada.

## Relações de equivalência

Uma relação é de **equivalência** quando é reflexiva, simétrica e transitiva. Ela formaliza a ideia de "ser igual para algum propósito".

O exemplo mais importante vem da aritmética modular: $a \equiv b \pmod n$ significa $n \mid (a - b)$. Vamos conferir que é uma relação de equivalência:

- **Reflexiva:** $n \mid (a - a) = 0$.
- **Simétrica:** se $n \mid (a - b)$ então $n \mid (b - a)$, porque $b - a = -(a - b)$.
- **Transitiva:** se $n \mid (a - b)$ e $n \mid (b - c)$, então $n$ divide a soma $(a - b) + (b - c) = a - c$. $\blacksquare$

### Classes de equivalência

A **classe** de $a$ é o conjunto $[a] = \{x \in A : x \mathrel{R} a\}$ de todos os elementos equivalentes a $a$. As classes de uma relação de equivalência **particionam** $A$: cada elemento está em exatamente uma classe, e duas classes ou são iguais ou não têm nada em comum.

Na congruência módulo 3 em $\mathbb{Z}$ existem três classes:

$$
[0] = \{\dots, -3, 0, 3, 6, \dots\}, \quad [1] = \{\dots, -2, 1, 4, 7, \dots\}, \quad [2] = \{\dots, -1, 2, 5, 8, \dots\}
$$

É por isso que a aritmética modular trabalha só com os restos $0, 1, 2$: cada classe é representada por um elemento.

## Relações de ordem

Uma relação é uma **ordem parcial** quando é reflexiva, antissimétrica e transitiva. Exemplos: $\le$ em $\mathbb{Z}$, $\mid$ em $\mathbb{Z}_{>0}$ e $\subseteq$ entre conjuntos.

Em uma ordem **total**, quaisquer dois elementos são comparáveis: $a \mathrel{R} b$ ou $b \mathrel{R} a$. O $\le$ em $\mathbb{Z}$ é total. A divisibilidade não é: 2 e 3 não se dividem, então são **incomparáveis**. Em ordenação, é necessário uma ordem total, porque o algoritmo precisa decidir qual de dois elementos vem antes.

## Erros comuns

- **Verificar a propriedade só em alguns pares.** Ela precisa valer para todos os pares (ou todos os trios, no caso da transitividade).
- **Achar que simétrica + transitiva implica reflexiva.** Falta garantir que cada elemento esteja relacionado com *algum* outro; veja o exercício 1.
- **Esquecer o contexto.** A divisibilidade em $\mathbb{Z}_{>0}$ é antissimétrica, mas em $\mathbb{Z}$ não é: $2 \mid -2$ e $-2 \mid 2$ com $2 \ne -2$.

## Exercícios

1. Em $A = \{1, 2, 3\}$, seja $R = \{(1,1), (2,2), (1,2), (2,1)\}$. Classifique $R$ quanto às quatro propriedades.
2. A relação "$a$ e $b$ têm a mesma paridade" em $\mathbb{Z}$ é de equivalência? Quais são as classes?

{{< details title="Gabarito" >}}
1. **Não é reflexiva**, porque falta $(3,3)$. **É simétrica**: $(1,2)$ e $(2,1)$ aparecem juntos, e os pares $(1,1)$ e $(2,2)$ são simétricos de si mesmos. **Não é antissimétrica**, pois $(1,2)$ e $(2,1)$ estão em $R$ com $1 \ne 2$. **É transitiva**: toda combinação possível ($(1,2),(2,1) \Rightarrow (1,1)$; $(2,1),(1,2) \Rightarrow (2,2)$; e as que usam $(1,1)$ e $(2,2)$) já está em $R$. Esse é um exemplo de relação simétrica e transitiva que não é reflexiva.
2. Sim. Reflexiva (todo número tem a mesma paridade que ele mesmo), simétrica e transitiva (a igualdade de paridade se comporta como uma igualdade). Há duas classes: os pares e os ímpares.
{{< /details >}}

## Resumo

- Relação em $A$ é um subconjunto de $A \times A$.
- Propriedades: reflexiva, simétrica, antissimétrica e transitiva.
- **Equivalência** = reflexiva + simétrica + transitiva; gera uma partição em classes.
- **Ordem parcial** = reflexiva + antissimétrica + transitiva; é **total** se todo par é comparável.
