---
title: Hardware - Entrada e Saída
weight: 3
description: Dispositivos de E/S, interfaces, velocidade x throughput, comunicação paralela e serial, USB, simplex, half e full duplex e placa-mãe.
autores:
  - thallesgsrv
date: 2026-10-17
---

O usuário conversa com a CPU e a memória por meio dos **dispositivos de entrada e saída** (E/S ou I/O), também chamados **periféricos**. Eles transformam o mundo humano (letras digitadas, voz, papel) em sinais binários que o computador processa, e o contrário.

## 1. Tipos de dispositivos

- **Entrada:** coletam e introduzem informações. Teclado, mouse, scanner, câmera, microfone, sensores.
- **Saída:** exibem ou imprimem resultados, ou controlam dispositivos externos. Monitor, impressora, plotter, atuadores.
- Alguns fazem os dois (armazenamento, por exemplo, que grava e lê dados).

## 2. Interfaces

Os periféricos são muito **mais lentos** que o computador e cada um se comunica de um jeito. Por isso a CPU **não fala direto** com eles, e sim com **interfaces** (também chamadas controladoras, adaptadores ou canais de E/S), que compatibilizam as diferenças e permitem um fluxo correto de dados em velocidade adequada aos dois lados.

A compatibilização de velocidades usa **buffers**: memórias que guardam os dados conforme chegam da CPU e os liberam ao dispositivo na medida em que ele consegue receber. O processo de comunicação (o *protocolo*) troca informações de controle, endereços e dados.

## 3. Velocidade x throughput

- **Velocidade:** com que frequência os bits trafegam pelo barramento (Hz).
- **Throughput** (vazão, largura de banda): **quantidade total** de dados transferidos por unidade de tempo (bytes por segundo).

## 4. Comunicação paralela x serial

| | **Paralela** | **Serial** |
| --- | --- | --- |
| Como | grupos de bits (em geral um byte) por **várias linhas** ao mesmo tempo | bits **um a um** por um único par condutor |
| Custo | maior | menor |
| Distância | curta | sem limite prático (cabos longos) |
| Throughput | alto | baixo |
| Problema | *skew*: bits chegam fora de ordem por interferência | |
| Adequada para | dispositivos rápidos e próximos (discos, CD/DVD, impressora, scanner) | dispositivos lentos (mouse, teclado) e longa distância (modem) |

Na serial, os bytes são **serializados** (desmontados em bits), transmitidos, e **remontados** quando completam 8 bits.

### USB (*Universal Serial Bus*)

Conecta até **127** periféricos em uma única porta, com *plug and play*, alta velocidade e podendo alimentar o periférico. Todos os dispositivos usam uma única interrupção e um único endereço.

## 5. Transmissão de caracteres

- **Síncrona:** o intervalo entre caracteres é **fixo**. Os relógios do transmissor e do receptor são sincronizados no início por uma string de sincronização. Sem dados para enviar, o transmissor manda caracteres especiais para manter o sincronismo.
- **Assíncrona** (*start-stop*): o intervalo **não é fixo**. Sem dados, a linha fica em **1**. Antes de cada caractere, o transmissor insere um **bit de partida** (start bit, valor 0). Ao final, 1 ou 2 **bits de parada** (stop bits, valor 1).

## 6. Sentido da transmissão

| Tipo | Como funciona | Exemplo |
| --- | --- | --- |
| **Simplex** | só em um sentido; o receptor não responde | rádio, TV |
| **Half-duplex** (semi-duplex) | nos dois sentidos, mas **não ao mesmo tempo** (há *turn-around*, tempo de inverter) | Nextel (rádio) |
| **Full-duplex** | nos dois sentidos **simultaneamente**, maior throughput | celular |

## 7. Placa-mãe (*motherboard*)

Placa interna que **integra** todos os componentes ao processador, com o melhor desempenho e confiabilidade possíveis. Abriga BIOS, chipset, processador, **slots** (onde se encaixam placas de vídeo, som, rede) e conectores.

- **Onboard:** com um ou mais dispositivos de expansão integrados.
- **Offboard:** sem itens integrados (ou, no máximo, placa de som ou rede).

## Quiz

{{< quiz titulo="Entrada e saída" >}}

{{< questao >}}
Por que a CPU usa interfaces para falar com periféricos?

- [ ] Porque periféricos são mais rápidos que a CPU
- [x] Para compatibilizar velocidades e características diferentes
- [ ] Para aumentar a memória
- [ ] Para evitar o uso de barramentos
---
Periféricos são lentos e cada um tem suas ligações; a interface faz a ponte, usando buffers.
{{< /questao >}}

{{< questao >}}
Qual é o problema típico da comunicação paralela em distâncias longas?

- [ ] Custa menos
- [x] *Skew*: os bits chegam fora de ordem
- [ ] É lenta demais
- [ ] Não existe
---
As interferências entre os fios fazem os bits chegarem em instantes diferentes.
{{< /questao >}}

{{< questao >}}
Uma ligação celular é um exemplo de:

- [ ] Simplex
- [ ] Half-duplex
- [x] Full-duplex
- [ ] Assíncrona
---
Os dois falam ao mesmo tempo. No simplex o fluxo é só em um sentido (rádio, TV); no half-duplex, um de cada vez (Nextel).
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Qual a diferença entre velocidade e throughput?
2. Por que o mouse e o teclado usam comunicação serial?
3. Na transmissão assíncrona, por que existem bits de partida e de parada?

{{< details title="Gabarito" >}}
1. Velocidade é a frequência de passagem dos bits (Hz); throughput é a quantidade total de dados por tempo (Bps).
2. São lentos, e a serial é mais barata e de controle mais simples.
3. A linha parada fica em 1; o bit de partida (0) avisa que um caractere começou, e os bits de parada (1) marcam o fim.
{{< /details >}}

## Fontes

Baseado nos slides *Hardware (Parte 3): Entrada e Saída* dos professores Carlos Eduardo Santos Pires e Maxwell Guimarães de Oliveira (UFCG).
