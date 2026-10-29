---
title: Estágio 3 - Hardware e Software
weight: 3
rotulo: Tópicos
description: Processador, memória, entrada e saída, e software básico e aplicativo.
autores:
  - thallesgsrv
date: 2026-10-17
---

## O que você vai aprender

Agora as peças se juntam em um computador de verdade: o **processador** que executa as instruções, a **memória** que guarda dados e programas, a **entrada e saída** que liga a máquina ao mundo e o **software** que manda em tudo.

## Mapa do estágio

1. **Processador:** CPU, ULA, UC, registradores, barramentos, clock, CISC x RISC.
2. **Memória:** hierarquia, endereços e capacidade.
3. **Entrada e saída:** periféricos, interfaces, paralelo x serial, placa-mãe.
4. **Software:** sistema operacional, utilitários, aplicativos e licenças.

## Materiais do estágio

- [Fundamentos e Práticas em Arquitetura e Organização de Computadores: Estudos de Caso com o Simulador CompSim](https://drive.google.com/file/d/1U5khu18pc6_Hbyak3TWQ7rRtokl8TT6G/view)
- [CompSim](http://compsim.crato.ifce.edu.br/): simulador usado no livro acima.
- [IC_Exercícios (PDF)](https://1drv.ms/b/c/975ec841994373bd/IQBMjcEEWN5bTYkVbXtGYtuPAaggmRgigCe7V1mlEMgbfh0?e=gHHDAu)

## Cola rápida

| Ideia | Resumo |
| --- | --- |
| Capacidade de memória | $T = 2^E \times M$ |
| Hierarquia de memória | registradores > cache > RAM > disco (mais rápida e cara no topo) |
| CPU, memória e periféricos | se conectam por **barramentos** |

## Como estudar

1. Para hardware, pense em quem fala com quem: CPU, memória e periféricos se conectam por barramentos.
2. Faça o caminho de uma instrução: busca na memória, decodificação na UC, execução na ULA.
