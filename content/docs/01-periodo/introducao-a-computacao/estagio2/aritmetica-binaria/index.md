---
title: Aritmética Binária
weight: 5
description: Soma, subtração, multiplicação e divisão em binário, aritmética em complemento de 2 e a regra do overflow.
autores:
  - thallesgsrv
date: 2026-10-17
---

A ULA (Unidade Lógica e Aritmética) do processador faz exatamente as contas desta página. Elas seguem as mesmas regras do decimal, só que com **dois algarismos**. E a grande revelação é no final: o computador só sabe **somar**.

## 1. Soma binária

Tabela da soma de dois bits:

| A | B | Soma | Vai-um (*carry*) |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | **1** |

$1+1 = 2_{10} = 10_2$: escreve 0 e **vai um**, como no decimal quando passa de 9.

**Exemplo:** $28 + 26$.

```text
  vai-um:  1 1 1 1
           0 1 1 1 0 0   (28)
         + 0 1 1 0 1 0   (26)
         ---------------
           1 1 0 1 1 0   (54)
```

Coluna a coluna, da direita para a esquerda: $0+0=0$; $0+1=1$; $1+0=1$; $1+1=0$ vai um; $1+1+1=1$ vai um; $0+0+1=1$.

## 2. Subtração binária

Na subtração, quando o minuendo é menor que o dígito do subtraendo, "pede emprestado" ao dígito da esquerda. Em binário, o empréstimo vale **2**.

| A | B | Diferença | Empréstimo (*borrow*) |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | **1** |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |

**Exemplo:** $22 - 11$.

```text
   1 0 1 1 0   (22)
 - 0 1 0 1 1   (11)
 -----------
   0 1 0 1 1   (11)
```

## 3. Multiplicação binária

É igual à do papel, e fica mais fácil porque cada produto parcial é **0 ou o próprio multiplicando deslocado**.

```text
      1 1 0 1   (13)
    x   1 0 1   (5)
    ---------
      1 1 0 1
    0 0 0 0
  1 1 0 1
  -------------
  1 0 0 0 0 0 1   (65)
```

Multiplicar é somar o multiplicando deslocado à esquerda a cada bit 1 do multiplicador.

## 4. Divisão binária

Igual à divisão longa do decimal, com $0/1=0$ e $1/1=1$ e as subtrações pelas regras acima.

- $1100_2 \div 10_2 = 110_2$ ($12 \div 2 = 6$).
- $1001011_2 \div 11_2 = 11001_2$ ($75 \div 3 = 25$).

## 5. Soma em complemento de 2

Aqui o bit de sinal entra na conta. O algoritmo:

1. Some os dois números **bit a bit, inclusive o bit de sinal**.
2. **Descarte** o "vai-um" que sair do número (para fora).
3. Verifique o **overflow**.

**Regra do overflow:** olhe os "vai-um" do bit de sinal.

- Se ocorrerem **os dois** (vai-um para o bit de sinal **e** para fora do número) ou **nenhum**, o resultado está **correto**.
- Se ocorrer **só um** dos dois, houve **overflow**: o resultado está **errado**.

Versão curta da mesma regra: **só pode haver overflow quando os dois operandos têm o mesmo sinal**, e ele acontece se o resultado sair com sinal **oposto**.

Considere palavras de **6 bits** (intervalo $-32$ a $+31$):

**a) $+13 + (+15)$**

```text
  0 0 1 1 0 1   (+13)
+ 0 0 1 1 1 1   (+15)
-------------
  0 1 1 1 0 0   (+28)
```
Sem vai-um para o sinal nem para fora: **correto**.

**b) $+23 + (+20)$**

```text
  0 1 0 1 1 1   (+23)
+ 0 1 0 1 0 0   (+20)
-------------
  1 0 1 0 1 1   (negativo?!)
```
Houve vai-um **só** para o bit de sinal: **overflow**. $+43$ não cabe em 6 bits (máximo 31).

**c) $+15 + (-13)$**: $-13$ em complemento de 2 é `110011`.

```text
  0 0 1 1 1 1   (+15)
+ 1 1 0 0 1 1   (-13)
-------------
1 0 0 0 0 1 0   (+2)
```
Vai-um para o sinal **e** para fora: o de fora é descartado, e o resultado $000010 = +2$ está **correto**.

## 6. Subtração em complemento de 2

1. **Complemente a 2 o subtraendo** (seja ele positivo ou negativo).
2. **Some** com o algoritmo da adição.

**d) $+20 - (+17)$:** $-17$ em C2 é `101111`. $010100 + 101111 = 1\,000011$. Descarta o vai-um de fora: $000011 = +3$. Correto.

**e) $-24 - (-15)$:** $-24 = 101000$; o subtraendo $-15$ complementado vira $+15 = 001111$. Soma: $101000 + 001111 = 110111$. É negativo; para descobrir o valor, inverta e some 1: $001000+1 = 001001 = 9$. Resultado **$-9$**, correto.

**f) $-24 - (+15)$:** $-24 = 101000$; $-15$ em C2 é `110001`. Soma: $101000+110001 = 1\,011001$. Só houve vai-um para fora: **overflow**. O resultado verdadeiro ($-39$) não cabe em 6 bits (mínimo $-32$).

## 7. Como ler o resultado

- Resultado **positivo**: converta direto de binário para decimal.
- Resultado **negativo** (em complemento de 2): inverta os bits, some 1 e coloque o sinal.

## 8. A grande conclusão

A **subtração** vira soma com o complemento ($A - B = A + (-B)$). A **multiplicação** vira somas repetidas (ou deslocamentos e somas). A **divisão** vira subtrações repetidas. Logo, **o computador pode fazer todas as operações usando apenas somas**, diretas ou em complemento. É por isso que a ULA só precisa de um somador e de um circuito de complemento.

> [!IMPORTANT]
> O overflow não é erro do computador, é limite do tamanho da palavra. Com 6 bits, $23+20$ **não cabe**. Em papel você sempre pode escrever mais um dígito; no hardware, o número de bits dos registradores e do barramento é fixo, e isso afeta a precisão dos resultados. Com inteiros o problema é fácil de controlar; com números reais, bem menos.

## Quiz

{{< quiz titulo="Aritmética binária" >}}

{{< questao >}}
Quanto é $1 + 1$ em binário?

- [ ] 2
- [x] 10, ou seja, escreve 0 e vai um
- [ ] 11
- [ ] 1
---
Em binário não existe o algarismo 2. $2_{10}=10_2$.
{{< /questao >}}

{{< questao >}}
Em complemento de 2 com 6 bits, ocorre apenas vai-um **para fora** do número. O que isso indica?

- [ ] Resultado correto
- [x] Overflow
- [ ] Resultado zero
- [ ] Resultado negativo correto
---
Só um dos dois "vai-um" ocorreu: isso sinaliza overflow. Os dois ou nenhum seria resultado correto.
{{< /questao >}}

{{< questao >}}
Como o computador efetua $A - B$ em complemento de 2?

- [ ] Com um circuito subtrator específico
- [x] Soma $A$ com o complemento de 2 de $B$
- [ ] Soma $A$ com o complemento de 1 de $B$ e descarta
- [ ] Multiplica por $-1$
---
Complementa a 2 o subtraendo e usa o somador. É por isso que um só circuito atende soma e subtração.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Some $0110101_2 + 0011011_2$ (e confira em decimal).
2. Em 6 bits com complemento de 2, calcule $+9 + (-14)$.
3. Em 6 bits com complemento de 2, calcule $-20 - 15$. Houve overflow?
4. Calcule $101_2 \times 11_2$.

{{< details title="Gabarito" >}}
1. $53 + 27 = 80$: $0110101+0011011 = 1010000_2$.
2. $+9 = 001001$; $-14 = 110010$. Soma: $111011$. Negativo: inverte $000100$, soma 1: $000101 = 5$. Resultado **−5**, sem overflow.
3. $-20 = 101100$; o subtraendo $+15 = 001111$ complementa para $-15 = 110001$. Soma: $101100 + 110001 = 1\,011101$ (só vai-um para fora). **Overflow**: $-35$ não cabe em 6 bits (mínimo $-32$).
4. $5 \times 3 = 15$: $101 \times 11 = 101 + 1010 = 1111_2$.
{{< /details >}}

## Fontes

Baseado nos slides *Representação da Informação, Parte 3* do professor Carlos Eduardo Santos Pires (UFCG).
