---
title: Codificadores, Multiplexadores e Paridade
weight: 5
description: Codificadores e decodificadores, multiplexadores e demultiplexadores, bit de paridade e circuitos geradores e verificadores.
autores:
  - thallesgsrv
date: 2026-10-17
---

Mais quatro circuitos combinacionais clássicos. Todos aparecem dentro de chips reais, e todos se projetam com o método da página anterior.

## 1. Codificadores e decodificadores

A mesma informação pode ser representada de formas diferentes: um negativo em sinal e magnitude ou em complemento de 2, por exemplo. Para converter entre representações, usam-se circuitos que mapeiam um **código de entrada em outro código de saída**.

- **Codificador** (*encoder*): converte um código de $m$ entradas em um de $n$ saídas, com $n\le m\le2^n$. Exemplo: converter os **botões** de uma calculadora (decimal) em **binário** (BCD).
- **Decodificador** (*decoder*): o inverso. Em geral tem $n$ entradas e $2^n$ saídas, e cada combinação de entrada ativa **uma e só uma** saída.

**Codificador decimal para BCD 8421:** 10 entradas (dígitos 0 a 9) e 4 saídas. Cada saída é analisada separadamente: o bit de peso 1 vale 1 nos dígitos ímpares, e assim por diante. Sem prioridade:

$$
D = I_8+I_9,\quad C = I_4+I_5+I_6+I_7,\quad B = I_2+I_3+I_6+I_7,\quad A = I_1+I_3+I_5+I_7+I_9
$$

**Decodificador 2 para 4:** duas entradas e quatro saídas; para cada uma das 4 combinações, exatamente uma saída é 1. Existe versão com linha **Enable** (habilita ou desabilita o decodificador) e a 3 para 8. É a base dos **endereçamentos** de memória.

**Decodificador BCD para display de 7 segmentos:** converte um dígito BCD nos 7 sinais que acendem os segmentos certos de um display.

## 2. Multiplexador (MUX)

Seleciona **uma entre várias entradas** e a leva a uma **única saída**, conforme as variáveis de seleção. É um "seletor". Com $n$ variáveis de seleção, escolhe entre $2^n$ entradas.

**MUX 2:1** (uma variável de seleção $S$):

| S | Y |
| --- | --- |
| 0 | $A$ |
| 1 | $B$ |

$$
Y = \overline{S}\,A + S\,B
$$

Se $S=0$, a saída copia $A$ (e ignora $B$). Se $S=1$, copia $B$.

**MUX 4:1** (duas variáveis de seleção): escolhe entre 4 entradas. Pode ser montado com três MUX 2:1.

**Aplicações:** escolher qual informação digital vai para um circuito; transmitir várias informações por um só canal; serializar bits; multiplexação por divisão no tempo (TDM); implementar expressões booleanas a partir da tabela-verdade.

## 3. Demultiplexador (DEMUX)

O inverso: recebe **uma entrada** e a distribui para **uma de várias saídas**, conforme o seletor. Roteia o sinal de uma única linha para uma de $2^n$ saídas.

## 4. Paridade: detectar erros

Dados podem ser corrompidos ao serem guardados ou transmitidos. Um mecanismo simples de segurança é acrescentar um **bit extra**, o **bit de paridade** ($B_p$), calculado a partir da quantidade de 1s da informação.

- **Paridade par:** o bit extra faz o total de 1s ficar **par**. $0110\to\mathbf{0}0110$; $01011\to\mathbf{1}01011$.
- **Paridade ímpar:** faz o total ficar **ímpar**. $0110\to\mathbf{1}0110$; $01011\to\mathbf{0}01011$.

O **emissor** (circuito **gerador**) calcula e anexa o bit. O **receptor** (circuito **verificador**) confere se a paridade bate; se não bater, sinaliza **erro**.

**Para paridade par:**

- Gerador: $B_p = A\oplus B\oplus C\oplus D$ (o XOR dá 1 quando há quantidade ímpar de 1s, e então é preciso mais um 1).
- Verificador: $E = A\oplus B\oplus C\oplus D\oplus B_p$, e $E=1$ indica erro.

**Para paridade ímpar:** as mesmas expressões negadas. Gerador $P=\overline{A\oplus B\oplus C\oplus D}$; verificador $E=\overline{A\oplus B\oplus C\oplus D\oplus P}$.

> [!WARNING]
> A paridade detecta um erro (número ímpar de bits trocados), mas se **dois bits** forem corrompidos ao mesmo tempo, a paridade continua batendo e o erro passa despercebido. Mesmo assim é muito usada em hardware, onde a operação pode ser repetida.

## Quiz

{{< quiz titulo="Codificadores, MUX e paridade" >}}

{{< questao >}}
Um decodificador 3 para 8 tem quantas saídas?

- [ ] 3
- [ ] 6
- [x] 8
- [ ] 9
---
$n$ entradas dão $2^n$ saídas. $2^3=8$, e só uma delas fica ativa.
{{< /questao >}}

{{< questao >}}
Em um MUX 2:1, com $S=1$, a saída é:

- [ ] $A$
- [x] $B$
- [ ] $A+B$
- [ ] $A\cdot B$
---
$Y=\overline{S}A+SB$. Com $S=1$ o primeiro termo some e sobra $B$.
{{< /questao >}}

{{< questao >}}
Qual bit de paridade **par** deve ser anexado a `1011`?

- [ ] 0
- [x] 1
- [ ] Qualquer um
- [ ] Nenhum
---
`1011` tem três 1s (ímpar); com o bit 1 passam a ser quatro (par).
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Qual o bit de paridade ímpar de `0110`? E de `01011`?
2. Para a palavra recebida `10110` (4 bits de dado mais bit de paridade par), há erro?
3. Qual a vantagem de um MUX para implementar uma função booleana?

{{< details title="Gabarito" >}}
1. `0110` tem dois 1s: precisa de 1 → bit 1. `01011` tem três 1s: já é ímpar → bit 0.
2. `10110` tem três 1s (ímpar), mas a paridade é par: **há erro**.
3. Basta ligar as entradas de dados a 0 ou 1 conforme a tabela-verdade e usar as variáveis como seletores: não é preciso simplificar a expressão.
{{< /details >}}

## Fontes

Baseado nos slides *Aplicações de Circuitos Combinacionais* do professor Carlos Eduardo Santos Pires (UFCG).
