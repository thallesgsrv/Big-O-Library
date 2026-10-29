---
title: Sistemas de Numeração
weight: 7
description: Base, notação posicional x não posicional, binário, octal, decimal e hexadecimal, regras gerais e tabela de correspondência.
autores:
  - thallesgsrv
date: 2026-10-17
---

Os computadores guardam **dados** e nós queremos **informação**. A conversão entre os dois é tão central que é preciso saber como os números são escritos por dentro da máquina. E, infelizmente, ela não usa o nosso sistema.

## 1. O que é um sistema de numeração

É o conjunto de **símbolos** usados para representar quantidades, mais as **regras** de como combiná-los. Cada sistema é só um jeito diferente de escrever a **mesma quantidade**: a quantidade não muda, mudam os símbolos.

Dois termos que se confundem:

- **Número:** a quantidade em si (o valor).
- **Numeral:** o desenho que usamos para representar essa quantidade.

A **base** é a quantidade de algarismos disponíveis.

| Sistema | Base | Algarismos |
| --- | --- | --- |
| Binário | 2 | 0, 1 |
| Ternário | 3 | 0, 1, 2 |
| Octal | 8 | 0 a 7 |
| Decimal | 10 | 0 a 9 |
| Duodecimal | 12 | 0 a 9, A, B |
| Hexadecimal | 16 | 0 a 9, A a F (A=10, B=11, C=12, D=13, E=14, F=15) |

Números em base 2 ficam compridos e difíceis de ler. Por isso é comum escrevê-los em **octal** ou **hexadecimal**: são mais compactos e, como você verá, a conversão é direta.

## 2. Posicional x não posicional

**Posicional:** o valor de cada símbolo depende da **posição** em que ele está. O total é a soma dos valores de cada posição. O decimal é assim: em 1944, temos 1 milhar + 9 centenas + 4 dezenas + 4 unidades = $1000 + 900 + 40 + 4$.

**Não posicional:** o símbolo vale sempre a mesma coisa. Exemplo: números romanos. $XXIX$ é $10 + 10 + (10 - 1) = 29$, e o $X$ vale 10 em qualquer lugar.

## 3. Como escrever a base

Formas usuais:

- Letra depois do número: `2763D`, `1011B`, `5A3H`.
- Base como índice entre parênteses: $(2763)_{10}$, $(11011011)_2$.
- Base como índice simples: $2763_{10}$, $11011011_2$.
- Em programação: prefixo `0x` para hexa (`0x5A3`).

## 4. As bases que importam

**Decimal (base 10).** Dez símbolos. Cada posição tem um peso (unidade, dezena, centena, milhar...). $2574 = 2\cdot1000 + 5\cdot100 + 7\cdot10 + 4$.

**Binário (base 2).** Dois símbolos. Mesmas regras posicionais, e cada algarismo é um **bit**. O bit mais à esquerda é o **MSB** (*most significant bit*) e o mais à direita é o **LSB** (*least significant bit*). Lemos um número binário dígito por dígito ("um zero um"), não como decimal.

**Octal (base 8).** Oito símbolos (0 a 7). Cada dígito equivale a **3 bits**.

**Hexadecimal (base 16).** Dezesseis símbolos (0 a 9 e A a F). Cada dígito equivale a **4 bits**.

## 5. Regras gerais (valem para toda base)

- O número de dígitos disponíveis é igual à **base**.
- O maior dígito é sempre **menor que a base**.
- O dígito mais significativo fica à esquerda.
- Um "vai-um" de uma posição para outra tem peso igual a uma **potência da base**.
- Zeros à esquerda não mudam o valor.
- Quando o dígito "estoura" a base, o próximo numeral é **10** (na própria base): depois de $9_{10}$ vem $10_{10}$; depois de $1_2$ vem $10_2$; depois de $7_8$ vem $10_8$; depois de $F_{16}$ vem $10_{16}$.

## 6. Tabela de correspondência

| Decimal | Binário | Octal | Hexadecimal |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 1 |
| 2 | 10 | 2 | 2 |
| 3 | 11 | 3 | 3 |
| 4 | 100 | 4 | 4 |
| 5 | 101 | 5 | 5 |
| 6 | 110 | 6 | 6 |
| 7 | 111 | 7 | 7 |
| 8 | 1000 | 10 | 8 |
| 9 | 1001 | 11 | 9 |
| 10 | 1010 | 12 | A |
| 11 | 1011 | 13 | B |
| 12 | 1100 | 14 | C |
| 13 | 1101 | 15 | D |
| 14 | 1110 | 16 | E |
| 15 | 1111 | 17 | F |
| 16 | 10000 | 20 | 10 |
| 17 | 10001 | 21 | 11 |
| 18 | 10010 | 22 | 12 |
| 19 | 10011 | 23 | 13 |
| 20 | 10100 | 24 | 14 |

> [!TIP]
> Decore até 15. Quem sabe de cabeça que $10_{10}=A_{16}=1010_2$ e que $15_{10}=F_{16}=1111_2$ resolve metade das conversões sem fazer conta.

## Quiz

{{< quiz titulo="Sistemas de numeração" >}}

{{< questao >}}
Quantos algarismos tem o sistema hexadecimal?

- [ ] 8
- [ ] 10
- [x] 16
- [ ] 15
---
São 16: de 0 a 9 e depois de A a F. O maior dígito (F = 15) é sempre menor que a base.
{{< /questao >}}

{{< questao >}}
Qual número vem logo depois de $7_8$ (octal)?

- [ ] $8_8$
- [x] $10_8$
- [ ] $7_{10}$
- [ ] $10_{10}$
---
Em octal não existe o dígito 8. Estourou a base, o próximo é 10 (que vale 8 em decimal).
{{< /questao >}}

{{< questao >}}
Por que o sistema romano é **não posicional**?

- [ ] Porque só tem 7 símbolos
- [x] Porque cada símbolo vale sempre o mesmo, independente da posição
- [ ] Porque usa letras
- [ ] Porque é decimal
---
Em $XXIX$, os três X valem 10 cada. Já em 1944, o 9 vale 900 e o 4 vale 40 ou 4 conforme a posição.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Qual é a base do sistema em que o numeral $12_b$ vale 14 em decimal?
2. Em decimal, qual é o valor de $A_{16}$? E de $F_{16}$?

{{< details title="Gabarito" >}}
1. $12_b = 1\cdot b + 2 = 14$, logo $b = 12$.
2. $A_{16}=10$ e $F_{16}=15$.
{{< /details >}}

## Fontes

Baseado nos slides *Representação da Informação, Parte 1* do professor Carlos Eduardo Santos Pires (UFCG).
