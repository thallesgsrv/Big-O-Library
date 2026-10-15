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

1. **Conceitos:** o que é lógica, argumento, premissa, conclusão, validade.
2. **Linguagem proposicional:** letras, conectivos e fórmulas.
3. **Tradução:** do português para a lógica (a parte mais escorregadia).
4. **Tabela-verdade e semântica:** verdadeiro/falso, tautologia, satisfazível, consequência lógica.
5. **Tableaux semântico:** um jeito esperto de evitar tabelas gigantes.
6. **Tableaux e prova de argumentos:** usar as árvores para validar raciocínios.
7. **Forma normal conjuntiva:** deixar fórmulas num formato padrão fácil de checar.

## Cola rápida

| Símbolo | Lê-se | Em programação |
| --- | --- | --- |
| $\neg p$ | não $p$ | `!p` |
| $p\land q$ | $p$ e $q$ | `p && q` |
| $p\lor q$ | $p$ ou $q$ (ou ambos) | `p \|\| q` |
| $p\to q$ | se $p$, então $q$ | `!p \|\| q` |
| $p\leftrightarrow q$ | $p$ se, e somente se, $q$ | `p == q` |
| $p\oplus q$ | $p$ ou $q$, mas não ambos | `p != q` |
| $\varphi_1,\ldots,\varphi_n\models\psi$ | as premissas **obrigam** a conclusão | |

## Qual método usar?

| Preciso... | Use |
| --- | --- |
| Entender o comportamento de uma fórmula com 2 ou 3 letras | Tabela-verdade |
| Saber se algo **tem solução** (satisfazível) | Tableaux |
| Provar que algo é **sempre verdadeiro** (válido) | Tableaux da negação ou FNC |
| Checar um argumento | Qualquer um dos três |
