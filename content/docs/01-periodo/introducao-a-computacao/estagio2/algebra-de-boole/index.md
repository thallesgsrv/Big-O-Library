---
title: Álgebra de Boole e Portas Lógicas
weight: 1
description: Operadores E, OU e NÃO, tabelas-verdade, portas lógicas, chaves automáticas, famílias lógicas e circuitos integrados.
autores:
  - thallesgsrv
date: 2026-10-17
---

Um computador digital só manipula **dois valores**, 0 e 1. Toda operação, somar, comparar, mover, é uma combinação de operações lógicas básicas. Fisicamente elas são feitas por **circuitos digitais**, cujos blocos são as **portas lógicas** (*gates*), que deixam ou não passar sinais elétricos.

## 1. De onde vem a lógica

A lógica nasceu na Grécia antiga (Sócrates, Platão, Aristóteles) com a ideia de que a linguagem deve ter estrutura lógica, para conduzir a uma verdade. No século XIX, **George Boole** transformou isso em álgebra: no livro de 1854 mostrou que a lógica do pensamento pode ser escrita com **equações**. É a **Álgebra de Boole** (ou de chaveamento).

Ela trabalha com **proposições**: frases declarativas que são **verdadeiras (1)** ou **falsas (0)**. Exemplos: "São Paulo está no Brasil" (V), "$2+2=5$" (F).

## 2. Os operadores básicos

| Operador | Símbolo | Regra |
| --- | --- | --- |
| **E (AND)** | $A\cdot B$ | verdadeiro só se **todos** os termos são verdadeiros ("ou tudo, ou nada") |
| **OU (OR)** | $A+B$ | verdadeiro se **qualquer um** dos termos é verdadeiro |
| **NÃO (NOT)** | $\overline{A}$ ou $A'$ | **inverte** o termo |

Com proposições: "São Paulo está no Brasil **E** $2+2=4$" é verdadeira; "São Paulo está no Uruguai **OU** $2+2=4$" também; "São Paulo está no Uruguai **E** $2+2=4$" é falsa.

> [!WARNING]
> Os símbolos $\cdot$ e $+$ **não** são multiplicar e somar. $1+1=1$ em OU, porque "verdadeiro ou verdadeiro" continua verdadeiro.

## 3. Tabelas-verdade

Uma **tabela-verdade** lista todas as combinações das entradas e a saída de cada uma. Com $n$ entradas há $2^n$ linhas.

| A | B | AND | OR | NAND | NOR | XOR | XNOR |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 |

E o NOT: entrada 0 dá saída 1, entrada 1 dá saída 0.

As **derivadas**:

- **NAND** = NOT(AND). **NOR** = NOT(OR).
- **XOR** (ou exclusivo): 1 quando as entradas são **diferentes** (exclusividade).
- **XNOR**: o inverso do XOR, 1 quando são **iguais** (coincidência).

> [!TIP]
> NAND e NOR são tão úteis que dá para construir **qualquer** circuito usando só um deles. Por isso aparecem muito em circuitos reais: simplificam a fabricação e reduzem a quantidade de componentes.

## 4. Operações bit a bit

As operações valem também para valores com vários bits, aplicadas **bit a bit**. É o que a ULA faz.

| | |
| --- | --- |
| A | `0110` |
| B | `1010` |
| A AND B | `0010` |
| A OR B | `1110` |
| A XOR B | `1100` |
| NOT A | `1001` |
| A NAND B | `1101` |
| A NOR B | `0001` |
| A XNOR B | `0011` |

A maioria dos processadores tem **instruções de máquina** equivalentes a essas funções, e as linguagens de alto nível (`&`, `|`, `^`, `~`) as expõem ao programador.

## 5. A chave automática

Todo o hardware digital parte de uma ideia simples: a **chave automática**. Um circuito com uma fonte $E$, um fio de controle $C$ e uma saída $S$:

- $C=0$ → chave **aberta** → $S=0$.
- $C=1$ → chave **fecha** → $S=1$.

Foi feita com **relés**, depois **válvulas**, e desde a metade dos anos 50 com **transistores**. Os processadores modernos têm bilhões deles "impressos" em silício.

Ligando chaves:

- **Em série:** a lâmpada acende só se **todas** estão fechadas → **AND**.
- **Em paralelo:** acende se **qualquer** uma está fechada → **OR**.

## 6. Portas lógicas

As portas **implementam** as funções lógicas. Têm uma ou mais entradas e **uma única saída**. Desenhar o esquema elétrico de cada porta em um projeto grande seria inviável; por isso existe uma **simbologia padrão** (AND em "D", OR curvada, NOT triângulo com círculo, etc.).

## 7. Circuitos integrados

As portas vêm em **circuitos integrados** (CIs ou *chips*): um cristal de silício dentro de um encapsulamento (por exemplo o DIP, com pinos nas duas laterais). Cada CI comporta algumas portas, limitado pelos pinos.

| CI (exemplo) | O que tem |
| --- | --- |
| 7400 | 4 portas NAND de 2 entradas |
| 7404 | 6 inversores (NOT) |
| 7408 | 4 portas AND de 2 entradas |
| 7432 | 4 portas OR de 2 entradas |
| 7486 | 4 portas XOR de 2 entradas |

**Famílias lógicas:**

| | TTL (transistor bipolar) | CMOS (MOSFET) |
| --- | --- | --- |
| Nível 0 / 1 | 0 a 0,8 V / 2 a 5 V | |
| Velocidade | maior | menor |
| Consumo | maior | **menor** (baixíssimo) |
| Tolerância a ruído | maior | menor |
| Nº de portas por chip | menor | maior |
| Espaço no chip | maior | menor |

**Níveis de integração:**

| Nível | Portas | Uso |
| --- | --- | --- |
| SSI | menos de 12 | portas simples |
| MSI | menos de 100 | funções elementares, somadores |
| LSI | até alguns milhares | pequenos processadores |
| VLSI | a partir de alguns milhares | microprocessadores |
| ULSI | a partir de alguns milhões | |

## Quiz

{{< quiz titulo="Álgebra de Boole" >}}

{{< questao >}}
Qual é a saída de uma porta AND com entradas 1 e 0?

- [x] 0
- [ ] 1
- [ ] Depende da família lógica
- [ ] Indefinida
---
AND só dá 1 quando **todas** as entradas são 1.
{{< /questao >}}

{{< questao >}}
Uma porta XOR com entradas 1 e 1 tem saída:

- [x] 0
- [ ] 1
- [ ] 2
- [ ] Indefinida
---
XOR dá 1 quando as entradas são diferentes. Entradas iguais dão 0.
{{< /questao >}}

{{< questao >}}
Duas chaves em série controlando uma lâmpada equivalem a qual porta?

- [ ] OR
- [x] AND
- [ ] NOT
- [ ] XOR
---
A lâmpada só acende com as duas fechadas: AND. Em paralelo seria OR.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Dados $A=0011\,1100$ e $B=0000\,1111$, calcule $A\cdot B$, $A+B$ e $A\oplus B$.
2. Quantas linhas tem a tabela-verdade de uma função com 4 entradas?
3. Complete: NAND é o NOT de ___, e NOR é o NOT de ___.

{{< details title="Gabarito" >}}
1. AND: `00001100`. OR: `00111111`. XOR: `00110011`.
2. $2^4 = 16$.
3. AND e OR.
{{< /details >}}

## Fontes

Baseado nos slides *Conceitos Básicos de Eletrônica Digital* dos professores Carlos Eduardo Santos Pires e Maxwell Guimarães de Oliveira (UFCG).
