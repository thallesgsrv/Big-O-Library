---
title: Como um computador funciona
weight: 1
description: Hardware, software, CPU, memória e o caminho de um programa até a execução.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

Um computador é uma máquina que **executa instruções** muito rápido. Tudo o que ele faz, de abrir um site a rodar um jogo, é uma sequência enorme de instruções simples.

## As peças

| Peça | Para que serve |
| --- | --- |
| **CPU** (processador) | Executa as instruções, uma após a outra, bilhões de vezes por segundo. |
| **Memória RAM** | Guarda o que está em uso agora. É rápida, mas apaga ao desligar. |
| **Armazenamento** (SSD, HD) | Guarda arquivos e programas de forma permanente. É mais lento que a RAM. |
| **Entrada e saída** | Teclado, mouse, tela, rede: como a máquina conversa com o mundo. |

> [!TIP]
> Imagine uma cozinha: a CPU é o cozinheiro, a RAM é a bancada onde ele trabalha, e o armazenamento é a despensa.

## Hardware e software

**Hardware** é a parte física. **Software** é o conjunto de programas que diz ao hardware o que fazer. O **sistema operacional** (Windows, Linux, Android) fica no meio: ele reparte CPU e memória entre os programas e esconde os detalhes da máquina.

## Do código à execução

A CPU só entende **instruções em binário**. Ninguém escreve assim, então usamos linguagens de programação e um tradutor:

1. Você escreve o código-fonte (por exemplo, em Python ou C).
2. Um **compilador** traduz tudo para instruções da máquina, ou um **interpretador** traduz e executa linha a linha.
3. A CPU executa as instruções.

## O ciclo da CPU

A CPU repete três passos sem parar: **buscar** a próxima instrução na memória, **decodificar** o que ela pede e **executar**. A velocidade (medida em GHz) diz quantos ciclos por segundo ela consegue fazer.

## Exercícios

1. Por que abrir muitos programas ao mesmo tempo deixa o computador lento?
2. Qual a diferença entre compilar e interpretar?

{{< details title="Gabarito" >}}
1. Cada programa ocupa espaço na RAM e disputa tempo da CPU. Quando a RAM enche, o sistema passa a usar o armazenamento, que é bem mais lento.
2. Compilar traduz o programa inteiro antes de rodar. Interpretar traduz e executa aos poucos, durante a execução.
{{< /details >}}
