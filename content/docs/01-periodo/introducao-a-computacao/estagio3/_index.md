---
title: Estágio 3 - Eletrônica Digital, Hardware e Software
weight: 3
rotulo: Tópicos
description: Álgebra de Boole, portas lógicas, circuitos combinacionais, processador, memória, entrada e saída e software.
autores:
  - thallesgsrv
date: 2026-10-17
---

## O que você vai aprender

Neste estágio a máquina é aberta. Você vai ver como **0 e 1 viram circuitos** (álgebra de Boole e portas lógicas), como esses circuitos fazem **contas** (somadores) e como as peças se juntam em um computador de verdade: processador, memória, entrada e saída, e o software que manda em tudo.

## Mapa do estágio

1. **Álgebra de Boole e portas lógicas:** AND, OR, NOT e derivadas, tabelas-verdade, circuitos integrados.
2. **Projeto de circuito combinacional:** da situação à tabela, à expressão, ao circuito; simplificação.
3. **Projeto do semáforo:** um exemplo completo, até a montagem.
4. **Somadores e comparadores:** como o hardware soma e compara.
5. **Codificadores, multiplexadores e paridade.**
6. **Processador:** CPU, ULA, UC, registradores, barramentos, clock, CISC x RISC.
7. **Memória:** hierarquia, endereços e capacidade.
8. **Entrada e saída:** periféricos, interfaces, paralelo x serial, placa-mãe.
9. **Software:** sistema operacional, utilitários, aplicativos e licenças.

## Cola rápida

| Ideia | Resumo |
| --- | --- |
| AND | saída 1 só se **todas** as entradas são 1 |
| OR | saída 1 se **qualquer** entrada é 1 |
| NOT | inverte |
| XOR | saída 1 se as entradas são **diferentes** |
| Soma de produtos | OR dos mintermos que dão saída 1 |
| Meio somador | $S=A\oplus B$, $C_o=A\cdot B$ |
| Capacidade de memória | $T = 2^E \times M$ |
| Hierarquia de memória | registradores > cache > RAM > disco (mais rápida e cara no topo) |

## Como estudar

1. Para circuitos: **sempre** monte a tabela-verdade primeiro. Expressão e circuito saem dela.
2. Tente simular os circuitos no Logisim ou no TinkerCAD.
3. Para hardware, pense em quem fala com quem: CPU, memória e periféricos se conectam por barramentos.
