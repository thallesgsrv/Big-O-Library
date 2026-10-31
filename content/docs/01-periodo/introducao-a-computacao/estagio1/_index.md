---
title: Estágio 1 - História e Representação da Informação
weight: 1
rotulo: Tópicos
description: História e classificação dos computadores, bases numéricas, números negativos, aritmética binária, ponto flutuante, BCD.
autores:
  - thallesgsrv
date: 2026-10-17
---

## O que você vai aprender

Este estágio responde: **o que é** um computador, **de onde ele veio**, **que tipos existem** e **como ele guarda a informação**. A primeira parte é vocabulário e história: cada invenção resolve o defeito da anterior. A segunda parte é de **contas**: como uma máquina que só distingue "tem energia" e "não tem energia" guarda letras, inteiros, negativos e números com vírgula.

## Mapa do estágio

1. **Primeiros conceitos:** computação, informática, dado x informação, peopleware, hardware e software.
2. **Primórdios:** do ábaco aos cartões de Hollerith (até 1930).
3. **1930 a 1960:** relés, válvulas, ENIAC, transistor.
4. **1960 até hoje:** circuito integrado, microprocessador, PC, internet.
5. **Classificação:** gerações, analógico x digital, âmbito e porte.
6. **Bits, bytes e códigos:** unidades de medida, ASCII e Unicode.
7. **Sistemas de numeração:** binário, octal, decimal e hexadecimal.
8. **Conversão de bases:** divisões sucessivas, polinômio, agrupamentos.
9. **Números negativos:** sinal e magnitude, complemento de 1, complemento de 2, excesso.
10. **Ponto flutuante:** notação científica em binário e padrão IEEE 754.
11. **BCD e ponto fixo:** outras formas de representação.
12. **Aritmética binária:** soma, subtração, multiplicação, divisão e overflow.
13. **Aritmética adicional:** sinal e magnitude, ponto flutuante e BCD.

## Materiais do estágio

- [IC_Exercícios (PDF)](https://1drv.ms/b/c/975ec841994373bd/IQBMjcEEWN5bTYkVbXtGYtuPAaggmRgigCe7V1mlEMgbfh0?e=gHHDAu)
- Computação & Sociedade (Maciel & Viterbo, 2020): [Volume 1](https://f3286f62-e14d-4952-ad27-eac5c2feb473.usrfiles.com/ugd/f3286f_d5f6ef4be4654efba7d4b771eaf7b9ac.pdf), [Volume 2](https://f3286f62-e14d-4952-ad27-eac5c2feb473.usrfiles.com/ugd/f3286f_357628f5e86d46f99dad4a1ac9d4282d.pdf) e [Volume 3](https://f3286f62-e14d-4952-ad27-eac5c2feb473.usrfiles.com/ugd/f3286f_0d05c8a24e7b4611bb2ec83dbf981a7c.pdf)

**Leitura complementar de história:**

- [Computer History Museum](https://computerhistory.org/)
- [História do Ábaco (PDF, Museu de Topografia da UFRGS)](https://igeo.ufrgs.br/museudetopografia/images/acervo/artigos/Histria_do_baco.pdf)
- [Museu Nacional da Computação](https://viajonarios.com/museu-nacional-da-computacao/)
- [Histórico de eventos de computação no Brasil (SBC Horizontes)](https://horizontes.sbc.org.br/index.php/2021/03/historico-de-eventos-de-computacao-no-brasil/)

## Cola rápida

| Ideia | Em uma linha |
| --- | --- |
| Dado | observação solta sobre o mundo; máquinas lidam bem com isso |
| Informação | dado com relevância e propósito; precisa de gente |
| Hardware / Software / Peopleware | a parte física / a parte lógica / as pessoas |
| 1ª a 4ª geração | válvulas, transistores, circuitos integrados, microprocessadores |
| Analógico x digital | o analógico **mede**, o digital **conta** |
| Quantos valores cabem em $n$ bits | $2^n$ |
| Decimal para outra base | divisões sucessivas pela base; lê os restos de baixo para cima |
| Outra base para decimal | polinômio: soma de dígito vezes base elevada à posição |
| Binário para hexadecimal / octal | agrupar de 4 em 4 / de 3 em 3 bits |
| Negar em complemento de 2 | inverter todos os bits e somar 1 |
| Subtrair $A - B$ | somar $A$ com o complemento de 2 de $B$ |
| Expoente IEEE 754 simples | valor real mais 127 |

## Como estudar

1. Leia a parte de história na ordem. Ela só fica fácil quando você enxerga a cadeia: *cada máquina tenta consertar o defeito da anterior*.
2. As conversões se aprendem **no papel**. Faça os exercícios sem olhar o gabarito.
3. Domine complemento de 2: ele é a base da aritmética de inteiros em qualquer computador.
4. Ponto flutuante é só notação científica em base 2. Se você entende $1{,}5 \times 10^3$, você entende IEEE 754.
