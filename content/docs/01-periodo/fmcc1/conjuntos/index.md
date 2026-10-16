---
title: Conjuntos
weight: 5
description: Notação, pertinência, subconjuntos, operações, conjunto das partes e produto cartesiano.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

Um **conjunto** é uma coleção de objetos, chamados **elementos**, sem repetição e sem ordem. Quase toda a matemática da computação é escrita nessa linguagem.

## Notação

- $x \in A$: $x$ pertence a $A$. $x \notin A$: não pertence.
- Por extensão: $A = \{1, 2, 3\}$. Por compreensão: $B = \{x \in \mathbb{N} \mid x \text{ é par}\}$.
- $\emptyset$ é o conjunto vazio. $|A|$ é o número de elementos de $A$.
- $\{1,2,2,3\} = \{3,1,2\}$: ordem e repetição não importam.

## Subconjunto

$A \subseteq B$ quando **todo** elemento de $A$ está em $B$. Para provar que $A = B$, mostre os dois lados: $A \subseteq B$ e $B \subseteq A$.

## Operações

| Operação | Símbolo | Significado |
| --- | --- | --- |
| União | $A \cup B$ | está em $A$ ou em $B$ |
| Interseção | $A \cap B$ | está em $A$ e em $B$ |
| Diferença | $A \setminus B$ | está em $A$ e não em $B$ |
| Complemento | $\overline{A}$ | tudo (no universo) que não está em $A$ |

Exemplo: com $A=\{1,2,3\}$ e $B=\{3,4\}$, temos $A\cup B=\{1,2,3,4\}$, $A\cap B=\{3\}$ e $A\setminus B=\{1,2\}$.

## Conjunto das partes

$\mathcal{P}(A)$ é o conjunto de **todos os subconjuntos** de $A$. Para $A=\{a,b\}$:

$$
\mathcal{P}(A) = \{\emptyset, \{a\}, \{b\}, \{a,b\}\}
$$

Se $|A| = n$, então $|\mathcal{P}(A)| = 2^n$: cada elemento está dentro ou fora.

## Produto cartesiano

$A \times B$ é o conjunto de todos os **pares ordenados** $(a,b)$ com $a\in A$ e $b \in B$. Aqui a ordem importa: $(1,2) \ne (2,1)$. Vale $|A \times B| = |A|\cdot|B|$.

## Exercícios

1. Liste $\mathcal{P}(\{1,2,3\})$ e confira que tem 8 elementos.
2. Se $A=\{1,2\}$ e $B=\{x,y,z\}$, quantos elementos tem $A\times B$?
3. $\emptyset \subseteq A$ para todo $A$? Justifique.

{{< details title="Gabarito" >}}
1. $\emptyset$, $\{1\}$, $\{2\}$, $\{3\}$, $\{1,2\}$, $\{1,3\}$, $\{2,3\}$, $\{1,2,3\}$: são 8, como $2^3$.
2. $2 \cdot 3 = 6$.
3. Sim. Para não ser subconjunto, precisaria existir um elemento de $\emptyset$ fora de $A$, e $\emptyset$ não tem elementos.
{{< /details >}}
