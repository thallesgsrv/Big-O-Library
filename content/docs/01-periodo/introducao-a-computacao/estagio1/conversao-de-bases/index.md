---
title: Conversão entre Bases
weight: 8
description: Divisões sucessivas, polinômio, agrupamento de 3 e 4 bits, octal e hexadecimal via binário, e números fracionários.
autores:
  - thallesgsrv
date: 2026-10-17
---

Existem quatro técnicas básicas para inteiros: **divisão**, **polinômio**, **agrupamento de 3 bits** e **agrupamento de 4 bits**. Elas servem para qualquer par de bases. Escolha a certa para cada caso.

| De → Para | Técnica |
| --- | --- |
| Decimal → outra base | Divisões sucessivas |
| Outra base → decimal | Polinômio |
| Binário ↔ octal | Agrupar de 3 em 3 bits |
| Binário ↔ hexadecimal | Agrupar de 4 em 4 bits |
| Octal ↔ hexadecimal | Passar pelo binário |

## 1. Decimal para outra base: divisões sucessivas

Divida o número pela **base de destino**, depois o quociente, e assim por diante, até o quociente ser menor que a base. O resultado é o **último quociente (MSB)** seguido dos **restos, do último para o primeiro** (o primeiro resto é o LSB).

**Exemplo:** $538_{10}$ para binário.

| Divisão | Quociente | Resto |
| --- | --- | --- |
| 538 ÷ 2 | 269 | 0 |
| 269 ÷ 2 | 134 | 1 |
| 134 ÷ 2 | 67 | 0 |
| 67 ÷ 2 | 33 | 1 |
| 33 ÷ 2 | 16 | 1 |
| 16 ÷ 2 | 8 | 0 |
| 8 ÷ 2 | 4 | 0 |
| 4 ÷ 2 | 2 | 0 |
| 2 ÷ 2 | 1 | 0 |
| 1 | | |

Lendo de baixo para cima: $538_{10} = 1000011010_2$.

Para outras bases é o mesmo processo, só muda o divisor:

- Para octal: $538 = 8\cdot67+2$; $67 = 8\cdot8+3$; $8 = 8\cdot1+0$. Resultado: $538_{10}=1032_8$.
- Para hexadecimal: $538 = 16\cdot33+10$; $33 = 16\cdot2+1$. Resto 10 vira `A`. Resultado: $538_{10}=21A_{16}$.

> [!IMPORTANT]
> Os três resultados são **o mesmo número** escrito de três jeitos: $1000011010_2 = 1032_8 = 21A_{16} = 538_{10}$.

## 2. Outra base para decimal: polinômio

Qualquer número em qualquer base é um polinômio de potências da base:

$$
N = a_n \cdot b^n + a_{n-1}\cdot b^{n-1} + \dots + a_1 \cdot b^1 + a_0\cdot b^0
$$

onde $a_i$ são os algarismos e $b$ é a base. O dígito mais à direita tem expoente 0.

**Binário:** $1111101_2 = 64+32+16+8+4+0+1 = 125_{10}$.

**Octal:** $1032_8 = 1\cdot512 + 0 + 3\cdot8 + 2 = 538_{10}$.

**Hexadecimal:** $FACE_{16} = 15\cdot4096 + 10\cdot256 + 12\cdot16 + 14 = 64206_{10}$.

## 3. Binário ↔ hexadecimal: grupos de 4 bits

Como $16 = 2^4$, cada dígito hexa vira **exatamente 4 bits**.

- Binário → hexa: separe de 4 em 4 **da direita para a esquerda** (complete com zeros à esquerda se faltar). $1011\ 1100\ 1010\ 0111_2 = BCA7_{16}$.
- Hexa → binário: troque cada dígito pelos seus 4 bits. $23B_{16} = 0010\ 0011\ 1011_2$.

## 4. Binário ↔ octal: grupos de 3 bits

Como $8 = 2^3$, cada dígito octal vira **exatamente 3 bits**.

- Binário → octal: separe de 3 em 3 da direita para a esquerda. $001\ 011\ 110\ 010\ 100\ 111_2 = 136247_8$.
- Octal → binário: $723_8 = 111\ 010\ 011_2$.

## 5. Octal ↔ hexadecimal: passe pelo binário

Não há relação de potência entre 8 e 16, então a conversão é **em duas etapas**: octal para binário (3 bits) e binário para hexa (4 bits), ou o contrário.

**Exemplo:** $(175)_8 \to (?)_{16}$.

1. Octal para binário: $1,7,5 \to 001\ 111\ 101$.
2. Reagrupe em 4: $0111\ 1101$.
3. Para hexa: $7D_{16}$.

**Exemplo inverso:** $21A_{16} \to (?)_8$: $0010\ 0001\ 1010 \to 001\ 000\ 011\ 010 \to 1032_8$.

## 6. Números fracionários

A parte fracionária continua posicional, com **expoentes negativos**:

$$
110{,}101_2 = 1\cdot2^2 + 1\cdot2^1 + 0\cdot2^0 + 1\cdot2^{-1} + 0\cdot2^{-2} + 1\cdot2^{-3} = 4+2+0+0{,}5+0+0{,}125 = 6{,}625
$$

**Decimal fracionário para outra base:** converta a parte inteira por divisões e a parte fracionária por **multiplicações sucessivas pela base**, anotando a parte inteira de cada resultado, até a fração zerar.

**Exemplo:** $8{,}375_{10}$ para binário.

- Parte inteira: $8_{10} = 1000_2$.
- Parte fracionária: $0{,}375\times2=0{,}75$ (bit **0**); $0{,}75\times2=1{,}5$ (bit **1**); $0{,}5\times2=1{,}0$ (bit **1**). Fração zerou: $0{,}011_2$.
- Resposta: $8{,}375_{10}=1000{,}011_2$.

### Nem toda fração fecha

Tente $5{,}8_{10}$: a parte fracionária $0{,}8$ gera $0{,}8\to0{,}6\to0{,}2\to0{,}4\to0{,}8\dots$, ou seja, **repete 1100 para sempre**. Então $5{,}8_{10}=101{,}110011001100\dots_2$, uma dízima. É por isso que o computador não representa exatamente certos decimais (como 0,1 ou 5,8), e é a origem de erros de arredondamento que você verá em ponto flutuante.

## Quiz

{{< quiz titulo="Conversão de bases" >}}

{{< questao >}}
Qual a técnica mais rápida para converter $1011\ 0110_2$ para hexadecimal?

- [ ] Divisões sucessivas por 16
- [x] Agrupar de 4 em 4 bits
- [ ] Agrupar de 3 em 3 bits
- [ ] Passar por octal
---
$1011 = B$ e $0110 = 6$, então $B6_{16}$. 16 é $2^4$, por isso grupos de 4 bits.
{{< /questao >}}

{{< questao >}}
$1010_2$ em decimal é:

- [ ] 8
- [ ] 12
- [x] 10
- [ ] 11
---
$8+0+2+0=10$.
{{< /questao >}}

{{< questao >}}
Por que $0{,}1_{10}$ não tem representação exata em binário?

- [ ] Porque a parte inteira é zero
- [x] Porque a multiplicação sucessiva por 2 nunca zera a fração
- [ ] Porque 0,1 é negativo
- [ ] Porque o binário só tem inteiros
---
$0{,}1\to0{,}2\to0{,}4\to0{,}8\to1{,}6\to1{,}2\dots$ e o ciclo repete. É uma dízima em base 2, assim como $1/3$ é em base 10.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Converta $130_{10}$ para binário, octal e hexadecimal.
2. Converta $11001011_2$ para decimal.
3. Converta $1111010011000100_2$ para hexadecimal e octal.
4. Converta $93{,}25_{10}$ para binário.
5. **Desafio:** uma caixa alienígena tem o número 25 gravado e contém 17 objetos. Quantos dedos o alienígena tem nas duas mãos (assumindo que ele conta em uma base igual ao total de dedos)?

{{< details title="Gabarito" >}}
1. $130 = 10000010_2 = 202_8 = 82_{16}$.
2. $128+64+0+0+8+0+2+1 = 203$.
3. Hexa: $1111\ 0100\ 1100\ 0100 = F4C4_{16}$. Octal: $001\ 111\ 010\ 011\ 000\ 100 = 172304_8$.
4. Inteira: $93=1011101_2$. Fração: $0{,}25\times2=0{,}5$ (0), $0{,}5\times2=1{,}0$ (1): $0{,}01_2$. Resposta: $1011101{,}01_2$.
5. $25_b = 2b+5 = 17$, logo $b=6$. Ele tem **6 dedos** (3 em cada mão).
{{< /details >}}

## Fontes

Baseado nos slides *Representação da Informação, Parte 1* do professor Carlos Eduardo Santos Pires (UFCG).
