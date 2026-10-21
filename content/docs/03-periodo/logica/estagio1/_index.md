---
title: Estágio 1 - Lógica Proposicional
weight: 1
rotulo: Tópicos
description: Argumentos, linguagem proposicional, tradução, tabela-verdade, tableaux semântico e forma normal conjuntiva.
autores:
  - thallesgsrv
date: 2026-10-15
---

## O que você vai aprender

Neste estágio você aprende a **traduzir frases em símbolos** e depois a **decidir, com método, se um raciocínio está certo**. É um caminho em duas partes:

| Parte | Pergunta | Páginas |
| --- | --- | --- |
| **Sintaxe** (escrever) | Como escrevo uma frase em símbolos? | Conceitos, Linguagem, Tradução |
| **Semântica** (julgar) | Essa fórmula/argumento é verdadeiro? | Tabela-verdade, Tableaux, FNC |

## Mapa do estágio

1. [**Conceitos**](conceitos/): o que é lógica, argumento, premissa, conclusão, validade e contra-exemplo.
2. [**Linguagem proposicional**](linguagem/): letras, conectivos, fórmulas, conectivo principal e precedência.
3. [**Tradução**](traducao/): do português para a lógica (a parte mais escorregadia).
4. [**Tabela-verdade e semântica**](tabela-verdade/): verdadeiro/falso, tautologia, satisfazível, consequência lógica, argumentos famosos.
5. [**Tableaux semântico**](tableaux/): um jeito esperto de evitar tabelas gigantes.
6. [**Tableaux e prova de argumentos**](tableaux-argumentos/): usar as árvores para validar raciocínios e achar requisitos contraditórios.
7. [**Forma normal conjuntiva**](forma-normal-conjuntiva/): deixar fórmulas num formato padrão fácil de checar.

## Cola rápida

| Símbolo | Lê-se | Em programação |
| --- | --- | --- |
| $\neg p$ | não $p$ | `!p` |
| $p\land q$ | $p$ e $q$ | `p && q` |
| $p\lor q$ | $p$ ou $q$ (ou ambos) | `p \|\| q` |
| $p\to q$ | se $p$, então $q$ | `!p \|\| q` |
| $p\leftrightarrow q$ | $p$ se, e somente se, $q$ | `p == q` |
| $p\oplus q$ | $p$ ou $q$, mas não ambos | `p != q` |
| $p\uparrow q$ | não ambos (NAND) | `!(p && q)` |
| $p\downarrow q$ | nem um nem outro (NOR) | `!(p \|\| q)` |
| $\varphi_1,\ldots,\varphi_n\models\psi$ | as premissas **obrigam** a conclusão | |

## Qual método usar?

| Preciso... | Use |
| --- | --- |
| Entender o comportamento de uma fórmula com 2 ou 3 letras | Tabela-verdade |
| Saber se algo **tem solução** (satisfazível) | Tableaux |
| Provar que algo é **sempre verdadeiro** (válido) | Tableaux da negação ou FNC |
| Checar um argumento | Qualquer um dos três |

## Glossário

Se um termo travar a leitura, volte aqui.

| Termo | Em uma frase |
| --- | --- |
| **Argumento** | Premissas oferecidas como razão para uma conclusão. |
| **Átomo** (letra proposicional) | Proposição simples, que não se divide com "e", "ou", "se", "não". |
| **Cláusula** | Disjunção de literais, como $\neg p\lor q\lor r$. |
| **Conectivo principal** | O último conectivo aplicado na construção da fórmula: o que fica "por fora". |
| **Consequência lógica** ($\models$) | Toda interpretação que torna as premissas V também torna a conclusão V. |
| **Contingência** | Fórmula V em algumas interpretações e F em outras. |
| **Contra-exemplo** | Interpretação com todas as premissas V e a conclusão F: prova que o argumento é inválido. |
| **Contradição** (insatisfazível) | Fórmula F em **todas** as interpretações. |
| **Correto** (*sound*) | Argumento válido **com** premissas realmente verdadeiras. |
| **Equivalência** ($\equiv$) | Duas fórmulas com sempre o mesmo valor. |
| **FNC** | Conjunção de cláusulas: um "E" de "OUs" de literais. |
| **Fórmula bem formada** | Sequência de símbolos construída só com as regras da linguagem. |
| **Interpretação** | Atribuição de V ou F a cada letra proposicional. |
| **Literal** | Átomo ou átomo negado ($p$, $\neg p$). |
| **Modelo** | Interpretação que torna a fórmula V. |
| **Proposição** | O conteúdo de uma sentença declarativa que pode ser julgado V ou F. |
| **Satisfazível** | Tem pelo menos um modelo. |
| **Subfórmula** | Fórmula que aparece dentro de outra (incluindo as letras e ela própria). |
| **Tautologia** (válida) | Fórmula V em **todas** as interpretações. |
| **Válido** | Argumento em que não existe interpretação com premissas V e conclusão F. |
