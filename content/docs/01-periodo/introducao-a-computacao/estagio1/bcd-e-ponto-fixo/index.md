---
title: BCD e Ponto Fixo
weight: 11
description: Decimal codificado em binário (BCD), BCD comprimido, sinal em BCD e representação em ponto fixo.
autores:
  - thallesgsrv
date: 2026-10-17
---

O ponto flutuante é ótimo para ciência, mas **perde precisão** em alguns decimais. Para dinheiro, onde cada centavo importa, isso não serve. Aí entra o **BCD** (*Binary Coded Decimal*).

## 1. BCD

A ideia: cada **algarismo decimal** vira seu próprio grupo de **4 bits**. O número original é preservado integralmente.

| Decimal | BCD |
| --- | --- |
| 0 | 0000 |
| 1 | 0001 |
| 2 | 0010 |
| 3 | 0011 |
| 4 | 0100 |
| 5 | 0101 |
| 6 | 0110 |
| 7 | 0111 |
| 8 | 1000 |
| 9 | 1001 |
| 10 a 15 | inválidos |

**Exemplos:**

- $239_{10}$: $2=0010$, $3=0011$, $9=1001$, logo $0010\ 0011\ 1001_{BCD}$. (Em binário puro seria $11101111_2$, só 8 bits.)
- $4_{10} = 0100_{BCD}$ (4 bits, contra 3 em binário puro).
- $1001\ 0110\ 0010\ 0000_{BCD}$: $9,6,2,0$ → $9620_{10}$.

> [!WARNING]
> BCD **não é** o binário do número. $239$ em binário é `11101111`; em BCD é `001000111001`. Não confunda.

O BCD **não tem tamanho fixo**: quanto mais dígitos, mais bits, e portanto mais precisão.

## 2. BCD comprimido

Um dígito BCD usa 4 bits, então um byte comporta **dois dígitos**. É o BCD comprimido (*packed BCD*): $14239 \to$ `xxxx0001 01000010 00111001`.

## 3. Sinal em BCD

Os códigos 1010 a 1111 não são dígitos. Alguns sistemas os reservam para o sinal:

- `1100` representa **+**
- `1101` representa **−**

## 4. Por que não usar sempre BCD?

Porque desperdiça combinações: com 4 bits há 16 padrões, mas só 10 são usados (6 desperdiçados, ou 4 se dois forem usados para sinal). BCD ocupa **mais memória** e é **mais lento** que binário puro. Por isso é usado onde a **exatidão** vale mais, como em valores monetários.

## 5. Ponto fixo

Em ponto fixo a **posição da vírgula é fixa**: todos os valores têm o **mesmo número de dígitos inteiros e fracionários**. Exemplos: `1101,101`, `1110,001`, `0011,110`.

As posições mais usadas:

- Vírgula à **extrema esquerda**: o número é totalmente fracionário.
- Vírgula à **extrema direita**: o número é **inteiro**.

A vírgula **não é guardada** na memória. A posição é definida na declaração da variável, pelo programador ou pelo compilador.

Na maioria das linguagens, ponto fixo é usado só para **inteiros** (a vírgula está à direita), e reais usam ponto flutuante:

| Tipo em Java | Representação interna |
| --- | --- |
| `int` | ponto fixo (inteiro) |
| `float` | ponto flutuante (real) |

**Problema:** o tamanho das partes inteira e fracionária é fixo. Para um número só inteiro, a área da fração é desperdiçada, e o contrário também. Para evitar esse desperdício criou-se o **ponto flutuante**.

## 6. Os tipos primitivos que o hardware entende

Resumo da família de dados: **caractere**, **numérico** (ponto fixo, ponto flutuante e decimal/BCD) e **lógico** (só dois valores, falso 0 e verdadeiro 1, base da eletrônica digital que você verá no próximo estágio).

Quem escolhe a representação é o programador: **explicitamente** (declara os tipos) ou **implicitamente** (deixa o compilador escolher).

## Quiz

{{< quiz titulo="BCD e ponto fixo" >}}

{{< questao >}}
Como se escreve $23_{10}$ em BCD?

- [ ] `10111`
- [x] `0010 0011`
- [ ] `0001 0111`
- [ ] `0010 1011`
---
Cada dígito vira 4 bits: $2=0010$ e $3=0011$. `10111` é $23$ em binário puro.
{{< /questao >}}

{{< questao >}}
Qual a principal desvantagem do BCD?

- [ ] Perde precisão
- [x] Desperdiça combinações de bits e ocupa mais memória
- [ ] Não representa o 0
- [ ] Só serve para negativos
---
Com 4 bits só 10 dos 16 padrões são usados. Em compensação não perde precisão.
{{< /questao >}}

{{< questao >}}
O que torna o ponto fixo desperdiçador?

- [ ] Ele não guarda o sinal
- [x] A divisão entre parte inteira e fracionária é fixa
- [ ] Ele é sempre decimal
- [ ] Ele usa expoente
---
Se o número é inteiro, os bits da fração ficam sem uso (e vice-versa).
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Escreva $1953_{10}$ em BCD.
2. Qual o decimal de $0111\ 0101\ 0001_{BCD}$?
3. Quantos bits ocupa $500_{10}$ em BCD e em binário puro?

{{< details title="Gabarito" >}}
1. $1=0001$, $9=1001$, $5=0101$, $3=0011$: `0001 1001 0101 0011`.
2. $7,5,1$: $751$.
3. BCD: $3\times4=12$ bits. Binário puro: $500=111110100_2$, **9 bits**.
{{< /details >}}

## Fontes

Baseado nos slides *Representação da Informação, Parte 2* do professor Carlos Eduardo Santos Pires (UFCG).
