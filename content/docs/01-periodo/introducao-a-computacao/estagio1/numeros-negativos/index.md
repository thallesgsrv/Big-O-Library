---
title: Números Negativos
weight: 9
description: Sinal e magnitude, complemento de 1, complemento de 2 e excesso de n, com tabelas de 8 bits e como converter.
autores:
  - thallesgsrv
date: 2026-10-17
---

Até aqui ignoramos o sinal. Mas subtrair pode dar resultado negativo, então precisamos decidir **como escrever um sinal em binário**. Não existe uma resposta única: existem quatro convenções. A que vale ouro é o **complemento de 2**.

## 1. A ideia comum

Na escrita humana o sinal (+ ou −) é um símbolo à parte. Na máquina, o sinal é **um bit igual aos outros**, embutido no número. O bit mais significativo (MSB) costuma ser o bit de sinal: **0 = positivo (ou zero)** e **1 = negativo**.

## 2. Sinal e magnitude

O MSB é o sinal; os outros bits são a **magnitude**, idêntica para $+n$ e $-n$.

$$
+41 = 0\,0101001 \qquad -41 = 1\,0101001
$$

Para representar $-39$ em 8 bits: $39 = 100111_2$, completa até 7 bits de magnitude ($0100111$) e coloca o sinal: $10100111$. Para $-83$: $83 = 1010011_2$, então $11010011$.

Com $n$ bits sobram $n-1$ para a magnitude, então o intervalo é $-(2^{n-1}-1)$ a $+(2^{n-1}-1)$. Em 8 bits: **de −127 a +127**.

**Problemas:**
- Existem **dois zeros**: $+0 = 00000000$ e $-0 = 10000000$.
- Somar exige muitos testes (comparar sinais, comparar magnitudes).
- A ULA precisa de dois circuitos: um para somar e outro para subtrair.

## 3. Complemento de 1

- Positivo: igual ao sinal e magnitude.
- Negativo: **inverta todos os bits** do positivo ($0\leftrightarrow1$).

| Decimal | 4 bits |
| --- | --- |
| +5 | 0101 |
| −5 | 1010 |

$-39$ em 8 bits: $39 = 00100111$, invertido $11011000$. $-9$: $9 = 00001001$, invertido $11110110$.

> [!WARNING]
> Armadilha: o complemento de 1 só se aplica ao negativo. Se pedirem $+9$ em complemento de 1, a resposta é o próprio $00001001$.

Ainda há **dois zeros** ($00000000$ e $11111111$) e é preciso tratar o "vai-um" que sai da soma. Está **obsoleto**.

## 4. Complemento de 2

- Positivo: igual aos anteriores.
- Negativo: **complemento de 1 + 1**.

**Exemplos:**

| | $-12$ | $-41$ |
| --- | --- | --- |
| Positivo (8 bits) | 00001100 | 00101001 |
| Inverte | 11110011 | 11010110 |
| Soma 1 | **11110100** | **11010111** |

**Atalho:** a partir da direita, copie os bits até o **primeiro 1** (inclusive) e **inverta todos os da esquerda**. $00001100$: o primeiro 1 da direita é o bit 2; inverte o que está à esquerda: $11110100$ ✓.

Em 8 bits o intervalo é de **−128 a +127**: existe **um único zero** (sobra uma combinação, usada pelo −128).

**Vantagens:** um único circuito, o somador, faz soma e subtração, e o sinal entra na conta naturalmente. É o que todo computador usa para inteiros.

> [!TIP]
> Para voltar de um complemento de 2 negativo para decimal: inverta os bits, some 1 e ponha o sinal. $11111010 \to 00000101 + 1 = 00000110 = 6$, então o número é $-6$.

## 5. Excesso de $n$

Aqui o **zero** é um padrão fixo, e todos os valores são medidos **a partir dele**. Escolhe-se o tamanho do padrão e define-se o zero como o padrão `10...0`. Valores acima são positivos e abaixo são negativos.

O "$n$" do nome é o **valor decimal do padrão de bits que representa o zero**:

| Padrão | Padrão do zero | Valor decimal do zero | Nome |
| --- | --- | --- | --- |
| 3 bits | 100 | 4 | **Excesso de 4** |
| 4 bits | 1000 | 8 | **Excesso de 8** |
| 8 bits | 10000000 | 128 | **Excesso de 128** |

O nome vem do fato de que **o padrão binário é o valor real somado ao excesso**: padrão $=$ valor $+ n$.

**Exemplos:**

- $2_{10}$ em excesso de 4 (3 bits): $2+4=6=110_2$.
- $-5_{10}$ em excesso de 8 (4 bits): $-5+8=3=0011_2$.
- $001_2$ em excesso de 4: $1-4=-3_{10}$.
- $1010_2$ em excesso de 8: $10-8=2_{10}$.

Excesso é usado no **expoente do ponto flutuante**, para não precisar guardar o sinal do expoente.

## 6. Todas juntas (8 bits)

| Decimal | Sinal e magnitude | Complemento de 1 | Complemento de 2 | Excesso de 128 |
| --- | --- | --- | --- | --- |
| +127 | 01111111 | 01111111 | 01111111 | 11111111 |
| +1 | 00000001 | 00000001 | 00000001 | 10000001 |
| 0 | 00000000 (e 10000000) | 00000000 (e 11111111) | 00000000 | 10000000 |
| −1 | 10000001 | 11111110 | 11111111 | 01111111 |
| −20 | 10010100 | 11101011 | 11101100 | 01101100 |
| −127 | 11111111 | 10000000 | 10000001 | 00000001 |
| −128 | não existe | não existe | 10000000 | 00000000 |

Não importa a representação: **sempre sobra ou falta uma combinação**, porque 256 é par e o zero ocupa uma. Essa combinação extra vira $-0$, o menor negativo, ou algo parecido, e costuma ser um incômodo.

## Quiz

{{< quiz titulo="Números negativos" >}}

{{< questao >}}
Qual dos números de 8 bits abaixo é **positivo** em complemento de 2?

- [ ] `11010111`
- [ ] `10011110`
- [x] `01101101`
- [ ] `11001001`
---
O MSB é o bit de sinal: 0 é positivo. Só `01101101` começa com 0.
{{< /questao >}}

{{< questao >}}
Como se representa $-12$ em complemento de 2 com 8 bits?

- [ ] `10001100`
- [ ] `11110011`
- [x] `11110100`
- [ ] `00001100`
---
$12 = 00001100$. Invertendo: $11110011$. Somando 1: $11110100$. `10001100` é sinal e magnitude e `11110011` é complemento de 1.
{{< /questao >}}

{{< questao >}}
Qual a principal vantagem do complemento de 2?

- [ ] Tem dois zeros
- [ ] É mais fácil de ler para humanos
- [x] Um único somador faz soma e subtração
- [ ] Usa menos bits que as outras
---
Subtrair vira somar com o complemento. E só existe um zero.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Escreva $-50$ nas quatro representações (8 bits).
2. Qual o valor decimal de $11111010_2$ em complemento de 2?
3. Em excesso de 128 (8 bits), qual o número decimal de $10001010_2$?
4. Qual é o intervalo de números em complemento de 2 com 6 bits?

{{< details title="Gabarito" >}}
1. $50 = 00110010$. Sinal e magnitude: `10110010`. Complemento de 1: `11001101`. Complemento de 2: `11001110`. Excesso de 128: $128-50 = 78 =$ `01001110`.
2. Inverte: $00000101$, soma 1: $00000110 = 6$. Resposta: $-6$.
3. $10001010_2 = 138$. $138 - 128 = 10$.
4. De $-2^5 = -32$ até $2^5-1 = +31$.
{{< /details >}}

## Fontes

Baseado nos slides *Representação da Informação, Parte 2* do professor Carlos Eduardo Santos Pires (UFCG).
