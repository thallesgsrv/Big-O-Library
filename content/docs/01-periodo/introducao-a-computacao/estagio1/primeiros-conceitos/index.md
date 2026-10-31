---
title: Primeiros Conceitos
weight: 1
description: Computação x informática, dado x informação, sistema computacional, hardware, software e o curso.
autores:
  - thallesgsrv
date: 2026-10-17
---

Antes de falar de bits e circuitos, vale combinar o vocabulário. Muita gente usa "computação", "informática" e "computador" como se fossem a mesma coisa. Não são, e a prova costuma cobrar a diferença.

## 1. Quatro definições

| Termo | O que é |
| --- | --- |
| **Computação** | Estudo de soluções para um problema: entram dados (*inputs*), um **algoritmo** trabalha, saem resultados (*outputs*). |
| **Informática** | Estudo do tratamento da informação usando os recursos dos sistemas computacionais; tudo que se relaciona à Tecnologia da Informação (TI). |
| **Computador** | Máquina de circuitos eletrônicos capaz de **receber, armazenar, processar e transmitir** informações, seguindo instruções. Vem do latim *computare* (calcular). |
| **Sistema computacional** | Componentes integrados atuando como uma coisa só, para processar dados e produzir informações. |

Duas frases para guardar sobre o computador: ele é **programável** e **não faz absolutamente nada sem que alguém mande**.

> [!NOTE]
> Nos países de língua inglesa e no Brasil se diz "Ciência da Computação". Nos demais países, "Informática". Aqui, a sociedade acabou chamando de informática tudo que envolve o computador, principalmente as aplicações.

## 2. Dado x informação

Um sistema computacional **trabalha com dados**. Quem transforma dado em informação é o ser humano.

| Dado | Informação |
| --- | --- |
| Simples observação sobre o estado do mundo | Dado com **relevância e propósito** |
| Fácil de estruturar e de obter por máquinas | Exige unidade de análise e consenso sobre o significado |
| Frequentemente quantificado | Exige a mediação humana |
| Fácil de transferir | |

Exemplo: `37,8` é um dado. "O paciente está com febre" é informação.

O computador ajuda nessa conversão com cinco tarefas (os "5 Cs"):

1. **Contextualização:** relacionar os dados.
2. **Categorização:** separar os dados.
3. **Cálculo:** analisar matemática ou estatisticamente.
4. **Correção:** eliminar erros.
5. **Condensação:** resumir.

## 3. Os três componentes

Um sistema computacional tem três partes que precisam funcionar juntas:

- **Peopleware:** o componente humano. Usuários finais e desenvolvedores.
- **Hardware:** o componente físico. Os equipamentos usados direta ou indiretamente nas ações de entrada, processamento, armazenamento e saída.
- **Software:** o componente lógico. As séries de instruções (programas) que fazem a máquina funcionar.

## 4. O que tem dentro do hardware

| Parte | Função |
| --- | --- |
| **UCP / CPU** | Unidade Central de Processamento. É o "cérebro". |
| ↳ **Unidade de Controle (UC)** | Controla o fluxo de dados entre os componentes e interpreta dados e instruções. |
| ↳ **Unidade Lógica e Aritmética (ULA)** | Faz os cálculos e a manipulação dos dados. |
| **Memória principal** | De acesso direto, rápida e temporária (volátil). |
| **Armazenamento de massa** | Guarda dados e instruções de forma persistente. |
| **Entrada** | Traduz o que o usuário faz para um código que a CPU entende. |
| **Saída** | Mostra os resultados do processamento. |

Os dispositivos de entrada e saída ligados ao computador são chamados de **periféricos**.

## 5. As quatro operações básicas

Todo computador, sob o controle de um programa, faz quatro coisas:

1. **Entrada** (*input*)
2. **Processamento**
3. **Saída** (*output*)
4. **Armazenamento**

> [!TIP]
> Pense na digestão: entra o alimento (entrada), o estômago trabalha (processamento), o que sobra sai (saída) e parte fica guardada (armazenamento).

## 6. Cursos da área de Computação

Os cursos se dividem em quatro categorias:

- Computação como **atividade fim** (formam quem desenvolve a ciência e a tecnologia da computação): **Bacharelado em Ciência da Computação** e **Engenharia de Computação**.
- Computação como **atividade meio** (a computação é ferramenta de outra área).
- **Licenciatura** em Computação.
- Cursos de **Tecnologia** (sequenciais).

A Ciência da Computação estuda **métodos e técnicas para modelar, analisar e resolver problemas** com recursos computacionais. O cientista da computação concebe, desenvolve ou aplica esses métodos.

## 7. A Computação na UFCG

- **1968:** chega o primeiro computador instalado em universidades do Norte-Nordeste, um IBM 1130, na então Escola Politécnica de Campina Grande.
- **1973:** criado o curso de Formação de Técnicos de Nível Superior em Processamento de Dados, na UFPB.
- **1976:** nasce o curso de Ciência da Computação, um dos mais antigos do país.
- Os slides destacam as cinco estrelas do Guia do Estudante e a nota máxima no ENADE de 2008 e 2011.
- Áreas de ênfase histórica: Engenharia de Software, Sistemas de Informação e Banco de Dados, Redes de Computadores e Inteligência Artificial.

## Quiz

{{< quiz titulo="Primeiros conceitos" >}}

{{< questao >}}
Qual item **não** é um dado, e sim uma informação?

- [ ] `37,8`
- [ ] `2025-03-10`
- [x] "A temperatura passou do limite e o alarme deve tocar"
- [ ] `42`
---
Informação é dado com relevância e propósito, e exige mediação humana. As outras três opções são valores soltos.
{{< /questao >}}

{{< questao >}}
Qual é a função da Unidade Lógica e Aritmética (ULA)?

- [ ] Guardar programas de forma permanente
- [ ] Controlar o fluxo de dados entre os componentes
- [x] Fazer cálculos e manipular dados
- [ ] Mostrar o resultado ao usuário
---
Controlar o fluxo é papel da Unidade de Controle. A ULA calcula. Guardar de forma permanente é do armazenamento de massa e mostrar resultados é da saída.
{{< /questao >}}

{{< questao >}}
Quem faz parte do **peopleware**?

- [ ] O sistema operacional
- [ ] O teclado
- [x] Os usuários e os desenvolvedores
- [ ] A memória principal
---
Peopleware é o componente humano. SO é software; teclado e memória são hardware.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Dê um exemplo de dado e transforme-o em informação.
2. Cite as quatro operações básicas de um computador e associe cada uma a um dispositivo.

{{< details title="Gabarito" >}}
1. Dado: `18`. Informação: "A temperatura da sala é 18 °C, abaixo do ideal para as máquinas." Basta acrescentar contexto e propósito.
2. Entrada (teclado), processamento (CPU), saída (monitor) e armazenamento (HD ou SSD).
{{< /details >}}

## Fontes

Baseado nos slides de *Introdução à Computação* dos professores Carlos Eduardo Santos Pires e Maxwell Guimarães de Oliveira (UFCG).
