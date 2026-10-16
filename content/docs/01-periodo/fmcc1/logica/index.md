---
title: Introdução à lógica proposicional e de predicados
weight: 4
description: Proposições, conectivos, tabela-verdade, predicados e quantificadores.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

Esta é só a porta de entrada. O estudo completo está em [Lógica para Computação](/docs/03-periodo/logica/), com tabelas-verdade, tableaux e forma normal conjuntiva. Aqui você aprende a linguagem usada no resto de FMCC.

## Proposições e conectivos

**Proposição** é uma afirmação que é verdadeira (V) ou falsa (F). Conectivos formam proposições maiores:

| Símbolo | Lê-se | Verdadeira quando |
| --- | --- | --- |
| $\neg p$ | não $p$ | $p$ é falsa |
| $p\wedge q$ | $p$ e $q$ | as duas são verdadeiras |
| $p\vee q$ | $p$ ou $q$ | pelo menos uma é verdadeira |
| $p\to q$ | se $p$, então $q$ | não ocorre ($p$ V e $q$ F) |
| $p\leftrightarrow q$ | $p$ se e somente se $q$ | têm o mesmo valor |

> [!IMPORTANT]
> $p\to q$ só é falsa quando $p$ é verdadeira e $q$ é falsa. "Se 2+2=5, então a Lua é de queijo" é **verdadeira**: a condição nunca acontece, então a promessa não é quebrada.

## Equivalências úteis

- De Morgan: $\neg(p\wedge q)\equiv\neg p\vee\neg q$ e $\neg(p\vee q)\equiv\neg p\wedge\neg q$.
- Contrapositiva: $p\to q\equiv\neg q\to\neg p$.

## Predicados e quantificadores

Um **predicado** é uma frase com variável, como $P(x)$: "$x$ é par". Ele vira proposição ao ganhar um valor ou um quantificador:

- $\forall x\,P(x)$: **para todo** $x$, vale $P(x)$.
- $\exists x\,P(x)$: **existe** $x$ tal que vale $P(x)$.

Para negar, troque o quantificador e negue o predicado:

$$
\neg\forall x\,P(x)\equiv\exists x\,\neg P(x)\qquad
\neg\exists x\,P(x)\equiv\forall x\,\neg P(x)
$$

A negação de "todo aluno passou" é "existe um aluno que não passou", e **não** "nenhum aluno passou".

## Exercícios

1. Quando $(p\wedge q)\to p$ é verdadeira?
2. Negue: "existe um número primo par maior que 2".

{{< details title="Gabarito" >}}
1. Sempre (é uma tautologia): se $p\wedge q$ é verdadeira, $p$ também é.
2. "Todo número primo maior que 2 é ímpar."
{{< /details >}}
