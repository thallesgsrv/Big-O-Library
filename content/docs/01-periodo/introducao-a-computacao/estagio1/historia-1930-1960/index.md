---
title: Evolução dos Computadores - 1930 a 1960
weight: 3
description: Relés, Turing, von Neumann, válvulas, ENIAC, EDVAC, UNIVAC e o transistor.
autores:
  - thallesgsrv
date: 2026-10-17
---

Entre 1930 e 1960 o computador deixa de ser mecânico e vira eletrônico. O motor disso foi a **guerra**: governos pagaram por máquinas que calculassem trajetórias, decifrassem mensagens e se comunicassem à distância.

## 1. Primeira tentativa: relés

Na década de 1930 tentou-se trocar as peças mecânicas por **relés** (interruptores eletromecânicos: a corrente passa por uma bobina, o ímã atrai uma peça de ferro e fecha o contato). Funcionava, mas era caro, grande e lento.

| Máquina | Ano | Detalhe |
| --- | --- | --- |
| Z1, Z2, **Z3** (Konrad Zuse) | até 1941 | Calculadoras automáticas com relés; o Z3 foi destruído num bombardeio a Berlim |
| **Mark I** (Howard Aiken) | 1944 | Eletromecânico; 18 m de comprimento, 70 toneladas, 7 milhões de peças móveis |

## 2. Turing e von Neumann: as ideias

- **Alan Turing** (1936/37) perguntou o que a computação poderia efetivamente fazer e respondeu com uma máquina teórica, a **Máquina de Turing Universal**: um modelo abstrato (memória, estados e transições) que pode modelar qualquer computador digital. Também propôs o **Teste de Turing** para discutir se uma máquina pode ser considerada inteligente. O **Prêmio Turing** da ACM leva o nome dele.
- **John von Neumann** (1945) sugeriu que os computadores usassem o sistema **binário** e que **instruções e dados ficassem armazenados na memória**, na sequência de uso. Isso é o **programa armazenado**, base da arquitetura de von Neumann, e deu origem ao EDVAC.

> [!IMPORTANT]
> Programa armazenado significa que mudar a tarefa é mudar o conteúdo da memória, não religar fios. No ENIAC, a programação era feita **reordenando a rede elétrica**.

## 3. A válvula e a Era da Eletrônica

A **válvula** é um tubo de vidro com um cátodo, um ânodo e uma grade de controle. Os elétrons vão do cátodo ao ânodo; uma carga negativa na grade repele os elétrons e **interrompe** a corrente. Ou seja: é uma chave sem peças móveis. Dela saíram o rádio, a televisão e os computadores.

Problemas das válvulas: aquecimento excessivo (queimavam o tempo todo), alto consumo de energia e lentidão relativa.

| Máquina | Ano | Detalhe |
| --- | --- | --- |
| Heath Robinson | 1940 | Relés; feito (equipe de Turing) para decifrar mensagens alemãs |
| **Colossus** | 1943 | Válvulas; cerca de 5 mil caracteres por segundo; estima-se que encurtou a guerra em 2 anos |
| **ENIAC** | 1946 | Primeiro computador digital eletrônico de grande escala |
| **EDVAC** | 1947 em diante | Binário puro, memória de linhas de mercúrio, ULA mais simples |
| EDSAC | 1949 | Programa armazenado; calculou uma tabela de números primos |

> [!NOTE]
> Os slides ligam Heath Robinson e Colossus à Enigma. Historiadores costumam associar essas duas máquinas à cifra Lorenz, enquanto a Enigma foi atacada por outras máquinas (as "bombes"). Para a prova, escreva o que o professor ensinou; para a história, guarde essa diferença.

## 4. ENIAC em números

| Característica | Valor |
| --- | --- |
| Válvulas | cerca de 17.500 (e 1.500 relés) |
| Peso | 30 toneladas |
| Área | 180 m² |
| Velocidade | até 5.000 operações por segundo (soma em 0,0002 s) |
| Memória | apenas 20 números de 10 dígitos |
| Calor emitido | o equivalente a 200 kW |

Operacional só depois da guerra, foi aposentado em 1952. Os problemas foram a memória pequena e a confiabilidade: em 1952 mais de 19.000 válvulas já tinham sido trocadas.

## 5. O transistor muda tudo

Em **1947**, na Bell Labs (Bardeen, Brattain e Shockley), nasceu o **transistor**: um semicondutor que funciona como **chave**, só que menor, mais rápido, quase não esquenta, dura mais e gasta menos energia. A equipe ganhou o Nobel de 1956. Em 1954 a Texas Instruments passou a produzir transistores de silício.

> [!NOTE]
> Os slides atribuem o transistor a "um grupo de Stanford" em um ponto e à Bell Labs em outro. A Bell Labs é a resposta correta.

## 6. Linha do tempo de 1945 a 1960

| Ano | Fato |
| --- | --- |
| 1945 | Registro do primeiro **bug**: um inseto de verdade, relatado por Grace Hopper (os slides usam 1945; o episódio famoso é de 1947, no Mark II). Memex, de Vannevar Bush, antecipa o **hipertexto** |
| 1948 | Claude Shannon publica a Teoria da Informação; Richard Hamming cria códigos de detecção e correção de erros |
| 1949 | *Short Order Code* (Mauchly), primeira linguagem de alto nível; EDSAC |
| 1951 | **UNIVAC**, primeiro computador comercial de grande escala; previu o resultado de uma eleição presidencial |
| 1952 | Grace Hopper cria o primeiro **compilador** |
| 1953 | Memória magnética (Forrester, MIT); IBM 701, primeiro computador digital da IBM |
| 1954 | IBM 650, primeiro computador produzido em série; LEO, primeiro de uso comercial em escritório |
| 1955 | Tradic, primeiro computador transistorizado (cerca de 800 transistores, menos de 100 W) |
| 1957 | Linguagem **Fortran** |
| 1958 | **Circuito integrado** (Jack Kilby, Texas Instruments): cinco componentes numa peça de germânio |
| 1959 | **COBOL** (linguagem para negócios); modem comercial (Dataphone) |

## Quiz

{{< quiz titulo="1930 a 1960" >}}

{{< questao >}}
Qual ideia de von Neumann é a base dos computadores atuais?

- [ ] Usar válvulas no lugar de relés
- [x] Binário e programa armazenado na memória junto com os dados
- [ ] Usar cartões perfurados para entrada
- [ ] Máquina de Turing Universal
---
Instruções e dados na memória, em binário, é o programa armazenado. A Máquina de Turing é de Turing, e é um modelo teórico.
{{< /questao >}}

{{< questao >}}
Qual era a principal desvantagem das válvulas?

- [ ] Eram caras demais para a guerra
- [x] Esquentavam muito, queimavam sempre e consumiam muita energia
- [ ] Não podiam ser usadas como chaves
- [ ] Só funcionavam em decimal
---
Elas funcionam como chaves sim, mas o calor e a queima constante (no ENIAC, centenas de trocas) eram o problema.
{{< /questao >}}

{{< questao >}}
O que o transistor trouxe em relação à válvula?

- [ ] Mais calor e mais velocidade
- [x] Menor tamanho, mais velocidade, menos calor e menos consumo
- [ ] Capacidade de armazenar programas
- [ ] Capacidade de executar em decimal
---
É também um semicondutor que age como chave, mas muito melhor em todos os pontos práticos.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Compare relé, válvula e transistor em uma frase cada.
2. Por que o programa armazenado foi um avanço sobre o ENIAC?

{{< details title="Gabarito" >}}
1. Relé: chave eletromecânica, lenta e barulhenta. Válvula: chave eletrônica sem partes móveis, mas quente e frágil. Transistor: chave semicondutora pequena, rápida e fria.
2. No ENIAC trocar de tarefa exigia reordenar a rede elétrica. Com o programa na memória, basta carregar outras instruções.
{{< /details >}}

## Fontes

Baseado nos slides *Evolução dos Computadores, Parte 2 (1930-1960)* do professor Carlos Eduardo Santos Pires (UFCG).
