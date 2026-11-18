---
title: Estágio 2 - SAT e Lógica de Predicados
weight: 2
rotulo: Tópicos
description: SAT solvers e DPLL, lógica de predicados, tradução, modelos e tableaux com quantificadores.
autores:
  - thallesgsrv
baseadoEm:
  - salatiel
date: 2026-11-18
---

## O que você vai aprender

No Estágio 1 a lógica tinha um limite: cada frase virava **uma letra** ($p$, $q$, $r$) e a gente não conseguia olhar "por dentro" dela. Aqui o jogo muda em duas frentes:

| Parte | Pergunta | Páginas |
| --- | --- | --- |
| **Automatizar** | Como um programa decide se uma fórmula proposicional tem solução? | SAT Solvers |
| **Enxergar por dentro** | Como falo de "todos", "alguém", "o pai de", "o mesmo que"? | Introdução, Tradução |
| **Julgar** | Como sei se uma fórmula com quantificadores é verdadeira, satisfazível ou válida? | Semântica, Tableaux |

## Mapa do estágio

1. [**SAT Solvers**](sat-solvers/): o problema SAT, simplificação, unit propagation e o algoritmo DPLL.
2. [**Lógica de predicados: introdução**](predicados-introducao/): por que a proposicional não basta, domínio, predicados, funções, quantificadores, termos e átomos.
3. [**Lógica de predicados: tradução**](predicados-codificacao/): do português para fórmulas com $\forall$ e $\exists$ (a parte mais escorregadia).
4. [**Lógica de predicados: semântica**](predicados-semantica/): modelos, valor de uma fórmula, satisfazibilidade e validade.
5. [**Lógica de predicados: tableaux**](predicados-tableaux/): o método da árvore agora com quantificadores, e onde ele deixa de terminar.

## Cola rápida

| Símbolo | Lê-se | Em programação |
| --- | --- | --- |
| $P(x)$ | $x$ tem a propriedade $P$ | `P(x)` devolve `boolean` |
| $R(x,y)$ | $x$ e $y$ estão na relação $R$ | `R(x, y)` devolve `boolean` |
| $f(x)$ | o objeto que $f$ associa a $x$ | `f(x)` devolve um **objeto** |
| $\forall x\,\varphi$ | para todo $x$, $\varphi$ | `for` que exige que **todos** passem |
| $\exists x\,\varphi$ | existe um $x$ tal que $\varphi$ | `for` que procura **um** que passe |
| $x = y$ | $x$ e $y$ são o mesmo objeto | `x == y` |

> [!IMPORTANT]
> A regra de ouro da tradução: **$\forall$ combina com $\to$** e **$\exists$ combina com $\land$**. Se você trocar, a fórmula passa a dizer outra coisa. A página de tradução mostra por quê.

## Qual ferramenta usar?

| Preciso... | Use |
| --- | --- |
| Saber se uma fórmula **proposicional** em FNC tem solução | DPLL (SAT solver) |
| Escrever uma frase com "todo", "algum", "nenhum" | Tradução para predicados |
| Mostrar que uma fórmula **não** é válida | Um modelo que a falsifica (contra-exemplo) |
| Provar que uma fórmula **é** válida | Tableau da negação fechando |

## Glossário

| Termo | Em uma frase |
| --- | --- |
| **Aridade** | Quantos argumentos um predicado ou função recebe. |
| **Átomo** | Predicado aplicado a termos, como $P(x)$ ou $>(x,3)$. Vale V ou F. |
| **Constante** | Função de aridade zero: aponta para um objeto específico (`joão`). |
| **Domínio (universo)** | Conjunto não vazio de objetos sobre os quais a fórmula fala. |
| **Função** | Recebe objetos e devolve **um objeto** do domínio, como $m(x)$ = mãe de $x$. |
| **Modelo** | Domínio mais a interpretação de cada constante, função e predicado. |
| **Predicado** | Propriedade ou relação entre objetos; vira V ou F quando os argumentos são dados. |
| **Quantificador** | $\forall$ (para todo) ou $\exists$ (existe). |
| **Termo** | Variável, constante ou função aplicada a termos. Denota um **objeto**. |
| **Variável livre** | Variável que não está sob o alcance de nenhum quantificador. |
