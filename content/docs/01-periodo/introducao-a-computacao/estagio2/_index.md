---
title: Estágio 2 - Representação da Informação
weight: 2
rotulo: Tópicos
description: Bits e bytes, códigos de caracteres, sistemas de numeração, números negativos, aritmética binária, ponto flutuante e BCD.
autores:
  - thallesgsrv
date: 2026-10-17
---

## O que você vai aprender

Este é o estágio das **contas**. Você vai ver como um computador, que só distingue "tem energia" e "não tem energia", guarda letras, números inteiros, números negativos e números com vírgula. E como ele faz contas com isso, errando de forma previsível.

## Mapa do estágio

1. **Bits, bytes e códigos:** unidades de medida, ASCII e Unicode.
2. **Sistemas de numeração:** binário, octal, decimal e hexadecimal.
3. **Conversão de bases:** divisões sucessivas, polinômio, agrupamentos.
4. **Números negativos:** sinal e magnitude, complemento de 1, complemento de 2, excesso.
5. **Aritmética binária:** soma, subtração, multiplicação, divisão e overflow.
6. **Ponto flutuante:** notação científica em binário e padrão IEEE 754.
7. **BCD e ponto fixo:** quando precisão total importa.
8. **Aritmética adicional:** sinal e magnitude, ponto flutuante e BCD.

## Cola rápida

| Preciso... | Faço |
| --- | --- |
| Quantos valores cabem em $n$ bits | $2^n$ |
| Decimal para outra base | divisões sucessivas pela base; lê os restos de baixo para cima |
| Outra base para decimal | polinômio: soma de dígito vezes base elevada à posição |
| Binário para hexadecimal | agrupar de 4 em 4 bits |
| Binário para octal | agrupar de 3 em 3 bits |
| Negar em complemento de 2 | inverter todos os bits e somar 1 |
| Subtrair $A - B$ | somar $A$ com o complemento de 2 de $B$ |
| Expoente IEEE 754 simples | valor real mais 127 |

## Como estudar

1. As conversões se aprendem **no papel**. Faça os exercícios sem olhar o gabarito.
2. Domine complemento de 2: ele é a base da aritmética de inteiros em qualquer computador.
3. Ponto flutuante parece difícil, mas é só notação científica em base 2. Se você entende $1{,}5 \times 10^3$, você entende IEEE 754.
