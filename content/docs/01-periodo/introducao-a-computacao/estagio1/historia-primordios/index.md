---
title: Evolução dos Computadores - Primórdios
weight: 2
description: Do ábaco aos cartões de Hollerith, passando por Pascal, Jacquard, Babbage, Ada Lovelace e Boole.
autores:
  - thallesgsrv
date: 2026-10-17
---

Antes de existir eletricidade, já existia a vontade de **calcular sem errar**. Esta página vai do pastor de ovelhas até a empresa que virou IBM. A graça é perceber que cada ideia foi herdada pela seguinte.

## 1. Contar e calcular

- **Calcular** vem do latim *calculus* (pedra): o pastor empilhava pedras para controlar o rebanho.
- **Dígito** vem de *digitus* (dedo): os dedos foram a primeira forma de mostrar quantidades.
- **Ábaco** (China, cerca de 2500 a.C. segundo o material) é a primeira máquina de contar bem-sucedida. Mercadores da Mesopotâmia usavam sulcos na areia: ao chegar a dez contas, esvaziavam o sulco e colocavam **uma** conta no sulco seguinte. É a ideia de "vai um" nascendo.
- Os algarismos arábicos (0 a 9) têm pouco mais de mil anos.

## 2. Linha do tempo

| Ano | Invenção | Quem | A ideia |
| --- | --- | --- | --- |
| 1614 | Bastões de Napier | John Napier | Transformam multiplicação em soma de tabuadas |
| 1633 | Círculos de proporção, base da **régua de cálculo** | William Oughtred | Logaritmos em escala; multiplicar vira somar comprimentos. É um computador **analógico** |
| 1642 | **Máquina de Pascal** | Blaise Pascal | Somadora mecânica de engrenagens, 6 rodas de 0 a 9 |
| 1671 | Calculadora de Leibniz | Gottfried Leibniz | Primeira a multiplicar e dividir, além de somar e subtrair |
| 1790 | Telégrafo óptico | irmãos Chappe | Braços articulados codificavam 196 sinais |
| 1802 | **Cartões perfurados** | Joseph-Marie Jacquard | Tear que lê cartões e executa a sequência programada |
| 1818 | Arithmomètre | Thomas de Colmar | Primeira calculadora comercial de 4 operações |
| 1822 | **Máquina Diferencial** | Charles Babbage | Calcula tabelas de funções; um único algoritmo (diferenças finitas) |
| 1834 | **Máquina Analítica** | Babbage (com Ada) | Precursora do computador moderno |
| 1837 | Código Morse | Samuel Morse | Letras e números como pulsos curtos e longos |
| 1854 | **Álgebra booleana** | George Boole | Lógica como álgebra de 0 e 1 |
| 1890 | **Tabulador** | Herman Hollerith | Cartões + impulsos elétricos |

## 3. Pascal: o "vai um" em engrenagem

A máquina de Pascal tinha rodas com os algarismos de 0 a 9. Quando uma roda completava a volta, **empurrava a roda seguinte** um passo. Somava até três parcelas por vez, desde que o total não passasse de 999.999, e multiplicava por somas repetidas (26 × 16 era 26 somado 16 vezes). Durou quase 200 anos, sendo aperfeiçoada por vários inventores.

> [!TIP]
> Multiplicar por somas repetidas é, até hoje, a ideia por trás da multiplicação no hardware. Você verá isso na página de aritmética binária.

## 4. Babbage e Ada: o computador que não foi construído

A **Máquina Analítica** (1834) já tinha as quatro partes de um computador atual:

| Parte de Babbage | Equivale hoje a |
| --- | --- |
| *Input section* (cartões perfurados) | Entrada |
| *Output section* (impressa ou perfurada) | Saída |
| *Store* (1.000 palavras de 50 dígitos decimais) | Memória |
| *Mill* (soma, subtração, multiplicação, divisão) | Processador (ULA) |

**Ada Byron King** (Ada Lovelace) entendeu a máquina, escreveu os melhores relatos sobre ela e criou programas para ela: é considerada a **primeira programadora**.

Por que não foi construída? A tecnologia da época não dava a precisão necessária e não havia dinheiro nem investidores. Mas os planos serviram de base depois: em 1991 o Science Museum de Londres construiu a Máquina Diferencial a partir dos desenhos, e ela funcionou.

## 5. Boole e Hollerith

- **Boole (1854):** estabeleceu os fundamentos lógicos para criar programas. Sem a álgebra booleana não haveria circuitos digitais (você vai usá-la no Estágio 2).
- **Hollerith (1890):** juntou os cartões de Jacquard com impulsos elétricos. Seu tabulador foi usado no recenseamento americano de 1890 e reduziu a apuração de **8 para 3 anos**. Em 1896 fundou a Tabulating Machine Company, que em 1924 virou a **IBM**.

## 6. O que fica dessa história

1. A divisão **entrada, memória, processamento, saída** já estava em Babbage.
2. **Programa** como cartão perfurado vem de Jacquard.
3. A **lógica de 0 e 1** vem de Boole.
4. O limite de tudo era mecânico (peso, atrito, precisão). A resposta seguinte foi trocar peças mecânicas por **elétricas**.

## Quiz

{{< quiz titulo="Primórdios" >}}

{{< questao >}}
Quem usou cartões perfurados pela primeira vez para controlar uma máquina (um tear)?

- [ ] Blaise Pascal
- [x] Joseph-Marie Jacquard
- [ ] Herman Hollerith
- [ ] Charles Babbage
---
Jacquard (1802). Babbage e Hollerith reaproveitaram a ideia depois.
{{< /questao >}}

{{< questao >}}
Qual parte da Máquina Analítica corresponde à memória dos computadores atuais?

- [ ] *Mill*
- [ ] *Input section*
- [x] *Store*
- [ ] *Output section*
---
*Store* guardava variáveis e resultados (1.000 palavras de 50 dígitos). O *mill* era o equivalente ao processador.
{{< /questao >}}

{{< questao >}}
A empresa de Hollerith se tornou:

- [ ] A Microsoft
- [ ] A Intel
- [x] A IBM
- [ ] A Apple
---
Em 1924, a Tabulating Machine Company virou a International Business Machines (IBM).
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Por que a régua de cálculo é considerada um computador analógico?
2. Qual foi o ganho prático do tabulador de Hollerith?

{{< details title="Gabarito" >}}
1. Porque representa números por **comprimentos** (uma grandeza contínua) e o resultado é lido medindo, não contando dígitos. Funciona por analogia física.
2. A apuração do censo americano de 1890 caiu de 8 para 3 anos, eliminando o trabalho braçal de tabular milhões de dados.
{{< /details >}}

## Fontes

Baseado nos slides *Evolução dos Computadores, Parte 1* do professor Carlos Eduardo Santos Pires (UFCG).
