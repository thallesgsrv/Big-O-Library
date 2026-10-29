---
title: Somadores e Comparadores
weight: 4
description: Circuitos aritméticos da ULA, meio somador, somador completo, somador de vários bits e comparadores.
autores:
  - thallesgsrv
date: 2026-10-17
---

Agora que você sabe projetar circuitos, vamos usá-los para o que a ULA faz: **somar** e **comparar**. São os **circuitos combinacionais clássicos** usados no projeto de computadores, junto com codificadores, multiplexadores e geradores de paridade (próxima página).

## 1. As operações da ULA

- **Soma:** coluna a coluna, bit a bit, levando o "vai-um" para a coluna seguinte.
- **Subtração:** soma em complemento, $A-B=A+(-B)$.
- **Multiplicação:** somas sucessivas ou deslocamento de bits.
- **Divisão:** o inverso.

Conclusão já vista: o computador faz tudo com **somas**. Falta ver como se faz o circuito somador.

## 2. Meio somador (*half adder*)

Soma **dois bits**, sem considerar "vem-um" de uma coluna anterior. Serve para somar números de 1 bit ou a **coluna mais à direita**.

- Entradas: $A$ e $B$.
- Saídas: soma $S$ e "vai-um" $C_o$ (*carry out*).

| A | B | S | $C_o$ |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

Olhando a tabela, $S$ é o **XOR** e $C_o$ é o **AND**:

$$
S = A\oplus B \qquad C_o = A\cdot B
$$

## 3. Somador completo (*full adder*)

Soma **dois bits mais o "vem-um"** da coluna da direita ($C_i$, *carry in*). É usado em todas as colunas exceto a mais à direita.

- Entradas: $A$, $B$ e $C_i$.
- Saídas: $S$ e $C_o$.

| A | B | $C_i$ | S | $C_o$ |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

$$
S = A\oplus B\oplus C_i \qquad C_o = AB + (A+B)\,C_i
$$

A soma é 1 quando há um **número ímpar de 1s** nas três entradas, e o vai-um sai quando há **pelo menos dois 1s**.

## 4. Somador de vários bits

Liga-se o $C_o$ de um somador ao $C_i$ do seguinte, em série: um meio somador na coluna da direita e somadores completos nas demais. Para $n$ bits, são $n-1$ somadores completos e um meio somador (ou $n$ completos com $C_i=0$ na primeira coluna).

**Pergunta:** para somar $10110 + 00101$ (cinco bits), quantos somadores?

Resposta: **1 meio somador** (coluna da direita) e **4 completos**. Conferindo: $22+5=27 = 11011_2$.

É um circuito de **média escala de integração (MSI)**.

## 5. Comparadores

Comparam duas palavras de entrada. Se forem **iguais**, a saída é **1**; senão, 0. São a base de instruções `if` e de laços (`while`, `for`).

Como funciona, para 4 bits ($A_3A_2A_1A_0$ contra $B_3B_2B_1B_0$):

1. Para cada par de bits, use um **XNOR** (coincidência): vale 1 se os dois bits são iguais.
2. Ligue as quatro saídas em um **AND**: só vale 1 se **todos** os pares coincidem.

$$
\text{igual} = (A_3\odot B_3)\cdot(A_2\odot B_2)\cdot(A_1\odot B_1)\cdot(A_0\odot B_0)
$$

Exemplo: `1010` e `1010` dão quatro 1s, saída 1. `0111` e `0100`: o último par difere, saída 0.

## Quiz

{{< quiz titulo="Somadores e comparadores" >}}

{{< questao >}}
Qual porta calcula a **soma** de um meio somador?

- [ ] AND
- [ ] OR
- [x] XOR
- [ ] NAND
---
A soma é 1 quando os bits são diferentes: XOR. O AND calcula o vai-um.
{{< /questao >}}

{{< questao >}}
Qual a diferença entre meio somador e somador completo?

- [ ] O completo soma números maiores
- [x] O completo considera o "vem-um" da coluna anterior
- [ ] O meio somador não tem saída de soma
- [ ] Nenhuma
---
Na coluna mais à direita não há vem-um; em todas as outras, há.
{{< /questao >}}

{{< questao >}}
Um comparador de igualdade de 2 palavras de 4 bits usa:

- [ ] 4 ANDs ligados em OR
- [x] 4 XNORs ligados em um AND
- [ ] 1 somador completo
- [ ] 4 NOTs
---
Cada XNOR detecta bits iguais; o AND final exige que todos coincidam.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Some $1101 + 0111$ usando a lógica de somadores, mostrando o carry de cada coluna.
2. Monte as expressões de $S$ e $C_o$ de um meio somador a partir da tabela-verdade.
3. Entradas $A=1,B=1,C_i=1$ em um somador completo: quanto valem $S$ e $C_o$?

{{< details title="Gabarito" >}}
1. Coluna 0: $1+1=0$, carry 1. Coluna 1: $0+1+1=0$, carry 1. Coluna 2: $1+1+1=1$, carry 1. Coluna 3: $1+0+1=0$, carry 1. Resultado: $10100_2=20$ ($13+7$).
2. $S$ vale 1 em $(0,1)$ e $(1,0)$: $S=\overline{A}B+A\overline{B}=A\oplus B$. $C_o$ vale 1 só em $(1,1)$: $C_o=AB$.
3. Três 1s (ímpar): $S=1$; mais de um 1: $C_o=1$.
{{< /details >}}

## Fontes

Baseado nos slides *Aplicações de Circuitos Combinacionais* do professor Carlos Eduardo Santos Pires (UFCG).
