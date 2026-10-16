---
title: Sistemas de numeração
weight: 2
description: Bits, bytes, binário e hexadecimal, com conversões passo a passo.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

Computadores guardam tudo com **dois estados**: ligado ou desligado. Por isso eles contam em **binário**. Entender isso explica o tamanho de arquivos, endereços de memória e cores em páginas web.

## Bit e byte

- **Bit** é um dígito binário: `0` ou `1`.
- **Byte** são 8 bits. Com 8 bits há $2^8 = 256$ combinações (de 0 a 255).
- Com $n$ bits dá para representar $2^n$ valores diferentes.

## Como o sistema posicional funciona

No decimal, `347` significa $3\cdot10^2 + 4\cdot10^1 + 7\cdot10^0$. Cada posição vale uma potência da **base**. No binário a base é 2:

$$
1101_2 = 1\cdot2^3 + 1\cdot2^2 + 0\cdot2^1 + 1\cdot2^0 = 8 + 4 + 0 + 1 = 13
$$

## Decimal para binário

Divida por 2 repetidamente e anote os **restos**. Leia de baixo para cima. Exemplo com 13:

| Divisão | Quociente | Resto |
| --- | --- | --- |
| 13 ÷ 2 | 6 | 1 |
| 6 ÷ 2 | 3 | 0 |
| 3 ÷ 2 | 1 | 1 |
| 1 ÷ 2 | 0 | 1 |

Lendo os restos de baixo para cima: $13 = 1101_2$.

## Hexadecimal

A base 16 usa os símbolos `0-9` e `A-F` (A=10, ..., F=15). Cada dígito hexadecimal equivale a **4 bits**, então ela é um jeito curto de escrever binário:

$$
1010\ 1111_2 = AF_{16}
$$

É por isso que cores como `#FF8800` são escritas em hexadecimal: são três bytes (vermelho, verde, azul).

## Exercícios

1. Converta $101101_2$ para decimal.
2. Converta 37 para binário.
3. Quantos valores cabem em 10 bits?

{{< details title="Gabarito" >}}
1. $32 + 8 + 4 + 1 = 45$.
2. $37 = 100101_2$ (restos: 1, 0, 1, 0, 0, 1, lidos de baixo para cima).
3. $2^{10} = 1024$.
{{< /details >}}
