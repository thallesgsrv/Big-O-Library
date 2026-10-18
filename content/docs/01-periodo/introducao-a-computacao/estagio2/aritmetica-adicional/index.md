---
title: Aritmética Adicional
weight: 8
description: Soma e subtração em sinal e magnitude, operações em ponto flutuante e aritmética em BCD (material adicional).
autores:
  - thallesgsrv
date: 2026-10-17
---

Esta página reúne o conteúdo **adicional** do estágio. A moral é a mesma de antes: cada representação tem seu algoritmo de conta, e o complemento de 2 ganhou para inteiros justamente por ter o algoritmo mais simples.

## 1. Sinal e magnitude

### Soma

1. Compare os **sinais** dos números.
2. **Mesmo sinal:** some as magnitudes; o resultado tem o mesmo sinal das parcelas.
3. **Sinais diferentes:** identifique a **maior magnitude** e guarde o sinal dela; **subtraia a menor da maior** (só magnitudes); o resultado leva o sinal da maior.

**Exemplos (6 bits, intervalo $-31$ a $+31$):**

| Conta | Operandos | Resultado |
| --- | --- | --- |
| $+13 + 12$ | `001101` + `001100` | `011001` = $+25$ |
| $+18 + (-11)$ | `010010` + `101011` | `000111` = $+7$ |
| $-21 + 10$ | `110101` + `001010` | `101011` = $-11$ |
| $-17 + (-9)$ | `110001` + `101001` | `111010` = $-26$ |
| $+17 + 19$ | `010001` + `010011` | **overflow** ($+36$ não cabe) |
| $-17 + (-19)$ | `110001` + `110011` | **overflow** ($-36$ não cabe) |

**Overflow** aqui é um "vai-um" para o bit de sinal na soma das magnitudes.

### Subtração

1. **Troque o sinal do subtraendo.**
2. Proceda como na soma.

| Conta | Vira | Resultado |
| --- | --- | --- |
| $-18 - (+12)$ | $-18 + (-12)$ | `111110` = $-30$ |
| $-27 - (-14)$ | $-27 + (+14)$ | `101101` = $-13$ |
| $+27 - (+31)$ | $+27 + (-31)$ | `100100` = $-4$ |
| $+19 - (-25)$ | $+19 + (+25)$ | **overflow** ($+44$) |

### Por que ninguém usa

- **Custo:** a ULA precisaria de dois circuitos (um somador e um subtrator).
- **Velocidade:** tempo perdido manipulando os sinais para decidir o tipo da operação e o sinal do resultado.
- **Dois zeros**, que exigem um circuito extra para evitar má interpretação.

Por isso foi **substituída pela aritmética em complemento de 2** (para ponto fixo).

## 2. Ponto flutuante

Os números são $m\times b^e$. As operações tratam **mantissa e expoente separadamente**, e é importante lembrar como o expoente está representado (excesso).

### Adição e subtração

São **mais complexas** do que em ponto fixo, por causa do **alinhamento da vírgula**:

1. Subtraia os expoentes para ver a diferença.
2. **Desloque a mantissa do número menor** à direita (divida pela base elevada à diferença) até os expoentes ficarem iguais.
3. Some ou subtraia as mantissas (é uma conta de ponto fixo).
4. **Normalize** o resultado.

**Exemplo:** $25{,}5 + 3{,}75$.

- $25{,}5 = 11001{,}1_2 = 1{,}10011\times2^4$.
- $3{,}75 = 11{,}11_2 = 1{,}111\times2^1$.
- Expoentes diferem em 3: desloca-se 3 casas à direita a mantissa do menor: $3{,}75 = 0{,}001111\times2^4$.
- Soma das mantissas: $1{,}10011 + 0{,}001111 = 1{,}110101$.
- Resultado: $1{,}110101\times2^4 = 11101{,}01_2 = 29{,}25$.

Em IEEE 754: `0 10000011 11010100000000000000000`.

### Multiplicação e divisão

**Não precisam alinhar a vírgula** (que é uma operação demorada), então são mais simples:

$$
(m_1 b^{e_1})\times(m_2 b^{e_2}) = (m_1 m_2)\, b^{e_1+e_2}
$$

$$
(m_1 b^{e_1})\div(m_2 b^{e_2}) = (m_1 \div m_2)\, b^{e_1-e_2}
$$

Multiplica ou divide as mantissas, soma ou subtrai os expoentes e normaliza. (Atenção ao excesso: ao somar dois expoentes guardados é preciso corrigir o viés.)

## 3. BCD

Os algoritmos de BCD são os do decimal: soma-se **dígito a dígito** e "vai um" quando passa de dez.

### Soma, método tradicional

1. Separe os números em **grupos de 4 bits** (um por algarismo).
2. Some grupo a grupo, em binário, com o vai-um do grupo anterior.
3. Se o resultado do grupo for **até 1001 (9)**, está correto.
4. Se for **maior que 1001** (de 1010 a 1111), **some 0110 (6)**: o novo valor é o algarismo certo e o vai-um segue para o próximo grupo.
5. Se der vai-um do grupo, some também 0110 ao resultado.

**Exemplo: $74 + 65$**

```text
  0111 0100   (74)
+ 0110 0101   (65)
-----------
  1101 1001
+ 0110         (1101 > 1001, soma 6)
-----------
1 0011 1001   = 1 3 9   (139)
```

Por que somar 6? O grupo de 4 bits "estoura" em 16, mas o algarismo decimal estoura em 10. Os 6 valores entre eles (10 a 15) são os inválidos. Somar 6 pula por cima deles.

### Soma rápida

1. Some **6** a todos os dígitos da parcela $A$.
2. Some $A+6$ com $B$, levando o vai-um normalmente.
3. Nos dígitos **sem vai-um** para o próximo, some **10** (`1010`) e **descarte** o vai-um dessa última operação.

A vantagem: nunca é preciso transportar o vai-um da correção, ele é simplesmente descartado.

**Exemplo: $1734 + 4985$**

```text
  0001 0111 0011 0100    A (1734)
+ 0110 0110 0110 0110    +6
= 0111 1101 1001 1010
+ 0100 1001 1000 0101    B (4985)
= 1100 0111 0001 1111    (vai-um só entre os dígitos do meio)
+ 1010           1010    +10 nos dígitos sem vai-um
= 0110 0111 0001 1001    = 6 7 1 9
```

Resultado: $6719$ ✓.

### Subtração

$A - B$ em BCD:

1. **Complemente cada dígito do subtraendo** (inverta os bits) obtendo $B_c$.
2. Calcule $A + B_c + 1$.
3. Nos dígitos **sem vai-um**, **some 10** para corrigir.

**Exemplo: $74 - 65$**

```text
  0111 0100   A
  1001 1010   Bc (65 complementado)
         +1   +1
= 0000 1111   (o dígito de cima gerou vai-um; o de baixo não)
       1010   +10 no dígito sem vai-um
= 0000 1001   = 0 9   (9)
```

### Multiplicação e divisão

Pouca utilidade prática em computação. Pode-se multiplicar por **somas sucessivas** e dividir por **subtrações sucessivas**, mas é um processo lento.

## Quiz

{{< quiz titulo="Aritmética adicional" >}}

{{< questao >}}
Por que a soma de dois números em ponto flutuante exige **alinhar a vírgula**?

- [ ] Porque o sinal precisa ser igual
- [x] Porque só dá para somar mantissas se os expoentes forem iguais
- [ ] Porque a base é diferente
- [ ] Porque o resultado precisa ser inteiro
---
Mantissas com expoentes diferentes valem em escalas diferentes. Igualam-se os expoentes deslocando a menor mantissa.
{{< /questao >}}

{{< questao >}}
Em BCD, a soma de um grupo deu `1101`. O que fazer?

- [ ] Nada, está correto
- [x] Somar `0110`
- [ ] Somar `1010`
- [ ] Subtrair 1
---
`1101` (13) é maior que 9. Somando 6 temos `1 0011`: dígito 3 e vai-um 1.
{{< /questao >}}

{{< questao >}}
Por que multiplicar e dividir em ponto flutuante é mais simples que somar?

- [ ] Porque o expoente é sempre zero
- [x] Porque não exige alinhar a vírgula: soma ou subtrai expoentes e multiplica ou divide mantissas
- [ ] Porque usa BCD
- [ ] Porque não precisa normalizar
---
As fórmulas $(m_1 m_2)\,b^{e_1+e_2}$ e $(m_1/m_2)\,b^{e_1-e_2}$ não pedem nenhum deslocamento prévio.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Em sinal e magnitude com 6 bits, calcule $+14 + (-20)$.
2. Em BCD, some $58 + 67$.
3. Calcule $9{,}5 + 2{,}25$ em ponto flutuante (mostre o alinhamento).

{{< details title="Gabarito" >}}
1. Sinais diferentes; maior magnitude é 20 (negativa). $20-14=6$, sinal negativo: $-6 = $ `100110`.
2. Unidade: $1000+0111=1111 > 1001$, soma 6: `1 0101`, dígito 5 e vai-um 1. Dezena: $0101+0110+1=1100 > 1001$, soma 6: `1 0010`, dígito 2 e vai-um 1. Resultado: `1 0010 0101` = **125**.
3. $9{,}5 = 1001{,}1_2 = 1{,}0011\times2^3$ e $2{,}25 = 10{,}01_2 = 1{,}001\times2^1$. Diferença de expoentes: 2, então $2{,}25 = 0{,}01001\times2^3$. Soma: $1{,}0011+0{,}01001=1{,}01111$. Resultado: $1{,}01111\times2^3 = 1011{,}11_2 = 11{,}75$.
{{< /details >}}

## Fontes

Baseado nos slides *A Informação e sua Representação, Parte III (adicional)* da professora Joseana Macêdo Fechine Régis de Araújo (UFCG).
