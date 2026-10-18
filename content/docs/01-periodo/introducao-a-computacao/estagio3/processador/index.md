---
title: Hardware - Processador
weight: 6
description: Arquitetura de von Neumann, CPU (ULA, UC, registradores), barramentos, clock, núcleos, CISC x RISC e desempenho.
autores:
  - thallesgsrv
date: 2026-10-17
---

O hardware é a parte física do sistema computacional, e se divide em três grandes blocos: **processador (UCP/CPU)**, **memória** e **entrada/saída (E/S)**. Esta página é sobre o primeiro.

## 1. Arquitetura básica

Os computadores atuais seguem a **arquitetura de von Neumann**: instruções e dados ficam na memória, e a CPU os busca de lá, um por um. A CPU conversa com a memória e com a E/S por **barramentos**.

As quatro operações básicas (entrada, processamento, saída, armazenamento) já são conhecidas. O processador cuida do **processamento**.

## 2. A CPU

A **Unidade Central de Processamento** manipula os dados direta ou indiretamente. Ela executa **microinstruções** internas (o *microcódigo*, gravado pelo fabricante), de acordo com as instruções que recebe dos programas na memória principal.

**Funções:**

- **Processamento:** operações aritméticas e lógicas, movimentação de dados (memória ↔ CPU), desvios (alterar a sequência de execução) e operações de E/S.
- **Controle:** buscar, interpretar e controlar a execução das instruções, e comandar os demais componentes (memória, E/S).

**Componentes fundamentais:**

| Componente | Função |
| --- | --- |
| **ULA** | circuitos que fazem as operações (soma, AND, OR...) binárias (dois operandos) e unárias (um). Pode haver várias (inteiros, ponto flutuante). **Não armazena dados** |
| **UC** | circuitos que **coordenam** as operações da CPU |
| **Registradores** | memórias ultrarrápidas para guardar temporariamente os dados |
| **Barramentos** | meios de comunicação |

**Quem faz o quê.** Os dados da ULA vêm da memória principal. Antes, a UC precisa: transferir os dados da memória para os registradores, informar à ULA em quais registradores estão os operandos, ativar o circuito da operação e dizer em qual registrador guardar o resultado.

> [!TIP]
> Analogia: a UC é o **gerente** (organiza quem faz o quê), a ULA é o **operário** (faz a conta) e os registradores são a **bancada** em que o operário trabalha.

## 3. Barramentos

Caminhos físicos por onde os bits trafegam entre CPU, memória e dispositivos. Devem ter **tantas linhas quantos os bits transportados por vez** (em máquinas mais baratas, um dado pode usar mais de um ciclo).

| Barramento | Sentido | Transporta |
| --- | --- | --- |
| **Endereços** (*address bus*) | unidirecional | posições de memória a acessar |
| **Dados** (*data bus*) | bidirecional | os dados (bits) |
| **Controle** (*control bus*) | bidirecional | sinais de controle e sincronização |

A **placa-mãe** concentra os barramentos e conectores. Alguns padrões:

- **USB:** conecta vários periféricos por uma única tomada, *plug and play* (sem reiniciar).
- **PCI Express (PCIe):** liga placas de vídeo, rede e som; usa **lanes** seriais (1x, 4x...), cada uma bidirecional.
- **SATA:** serial, para dispositivos de memória secundária (HDs, SSDs); sucessor do ATA/IDE, que era paralelo.

## 4. Outros componentes do processador

- **Núcleo (*core*):** cada núcleo é uma unidade de processamento independente, que funciona como uma CPU completa. Hoje são comuns dual-core (2) e quad-core (4) ou mais.
- **Clock (relógio):** gera pulsos a intervalos regulares para **sincronizar**. A duração é o **ciclo de relógio**; a **frequência** (em Hz) é o número de ciclos por segundo. $2\ \text{GHz}$ são 2 bilhões de ciclos por segundo. Algumas microinstruções usam um ciclo, outras vários.
- **Número de bits:** quantos bits são processados por ciclo; define o **tamanho dos registradores**. Exemplos: 32 e 64 bits (hoje 64 é o padrão).
- **Cache:** memória rápida dentro da CPU (próxima página).

## 5. CISC x RISC

| | **CISC** | **RISC** |
| --- | --- | --- |
| Conjunto de instruções | grande, complexo e específico | pequeno e simples |
| Processador | mais complexo, ciclo mais lento | mais simples, ciclo rápido |
| Ciclos por instrução | vários (decodificação interna) | tipicamente um |
| Programas | menores, ocupam menos memória | maiores, ocupam mais memória |
| Exemplos | PC, Macintosh (Intel) | PowerPC, Alpha, Sparc |

**Analogia da lanchonete:** uma máquina CISC tem um botão para cada sanduíche pronto ("Big-Burger"); uma RISC só tem passos simples (pegar pão, queijo, tomate) e você combina. A CISC faz o sanduíche do cardápio rápido, mas não faz um sanduíche novo; a RISC faz qualquer um, com mais passos.

**Híbridas:** os processadores atuais são essencialmente CISC por fora com **núcleos RISC por dentro**. A tendência é o conjunto reduzido, porque compiladores usam poucas instruções.

## 6. Projetando e evoluindo

Projetar um processador é definir o **conjunto de microinstruções** (formato, tamanho, operações elementares) e projetar ULA, UC, registradores e barramentos. Uma CPU nova costuma ter todas as instruções da anterior mais algumas novas: assim os programas continuam funcionando (**compatibilidade**).

**Lei de Moore:** nos anos 70, Gordon Moore previu que o poder de processamento dobraria a cada 18 meses (valor citado nos slides). A pergunta em aberto é até quando isso continua válido.

## 7. O que influencia o desempenho

Resumo (sem ordem de importância):

- **Clock**.
- Bits processados por ciclo.
- Tipo de instrução (CISC, RISC, híbrida).
- Quantidade de **memória cache**.
- Quantidade de **núcleos**.
- Fabricante, modelo e família.

> [!NOTE]
> Questão para pensar: em desempenho, vale mais **1 CPU de 5,6 GHz** ou **2 CPUs de 2,8 GHz**? As frequências **não se somam**. Duas CPUs só são melhores se o trabalho puder ser **dividido** (vários programas ou um programa paralelizável). Para uma tarefa sequencial, a de 5,6 GHz termina mais rápido.

## Quiz

{{< quiz titulo="Processador" >}}

{{< questao >}}
Qual barramento é **unidirecional**?

- [x] Endereços
- [ ] Dados
- [ ] Controle
- [ ] Todos
---
Os endereços só saem da CPU em direção à memória. Dados e controle trafegam nos dois sentidos.
{{< /questao >}}

{{< questao >}}
Qual a função da Unidade de Controle?

- [ ] Fazer somas
- [x] Coordenar as operações da CPU
- [ ] Guardar programas
- [ ] Mostrar resultados
---
Somar é da ULA. A UC organiza o fluxo: busca dados, informa os registradores e ativa o circuito certo.
{{< /questao >}}

{{< questao >}}
Uma característica de processadores RISC é:

- [ ] Conjunto de instruções grande
- [x] Instruções simples, geralmente executadas em um ciclo
- [ ] Programas menores
- [ ] Ciclo mais lento
---
RISC: conjunto reduzido e ciclo rápido, mas programas maiores.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Quantos ciclos por segundo faz uma CPU de 3,2 GHz?
2. Diga em uma frase a diferença entre ULA e registrador.
3. O que é preciso para uma CPU nova rodar os programas da família anterior?

{{< details title="Gabarito" >}}
1. $3{,}2\times10^9$ ciclos por segundo (3,2 bilhões).
2. A ULA **calcula** e não guarda dados; o registrador **guarda** dados temporariamente, muito rápido.
3. Compatibilidade: conter todas as instruções da antecessora, além de novas.
{{< /details >}}

## Fontes

Baseado nos slides *Hardware (Parte 1): Processador* dos professores Carlos Eduardo Santos Pires e Maxwell Guimarães de Oliveira (UFCG).
