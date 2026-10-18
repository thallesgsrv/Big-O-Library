---
title: Hardware - Memória
weight: 7
description: Hierarquia de memória, registradores, cache, memória principal (RAM e ROM), endereços, capacidade e memória secundária.
autores:
  - thallesgsrv
date: 2026-10-17
---

Memória é o componente que **armazena as informações** usadas ou que serão usadas pelo sistema, para recuperá-las quando precisar. Pense num depósito com duas operações: **guardar** e **recuperar**.

## 1. Elementos e operações

- A informação é guardada em **bits**, agrupados em **bytes** (8 bits) ou **palavras** (32 ou 64 bits, ou seja, 4 ou 8 bytes).
- A memória é um conjunto finito de **células**. Cada célula tem um **endereço** (a identificação da sua posição).
- **Escrita (WRITE):** de outro componente para a memória (CPU → memória, E/S → memória).
- **Leitura (READ):** da memória para outro componente.

## 2. Por que vários tipos de memória

Porque a CPU é muito mais rápida que a memória e não dá para construir uma única memória que seja ao mesmo tempo **rápida, grande e barata**. Por isso a memória é um **subsistema** com vários tipos, organizados em uma **hierarquia** (uma pirâmide):

| Nível | Velocidade | Capacidade | Custo | Volátil? |
| --- | --- | --- | --- | --- |
| **Registradores** | altíssima (1 a 5 ns*) | muito pequena (bytes) | altíssimo | sim |
| **Cache** (L1, L2, L3) | muito alta (5 a 7 ns*) | pequena (KB a MB) | alto | sim |
| **Memória principal** (RAM) | alta (7 a 15 ns*) | média (GB) | médio | sim |
| **Memória secundária** (disco) | baixa (ms) | grande (TB) | baixo | **não** |

\* Valores hipotéticos dos slides, podem estar desatualizados. $1\ \text{ns}=10^{-9}\ \text{s}$.

Quanto mais perto da CPU: mais rápida, menor e mais cara.

## 3. Registradores

Estão **dentro do processador**. Servem de memória auxiliar básica para a ULA: guardam os dados e resultados. O objetivo é **minimizar os acessos à memória externa**. Podem ser de **uso geral** ou **uso específico**, e a largura costuma ser igual à da palavra do processador (8, 32, 64 bits).

## 4. Memória cache

**O problema:** a memória principal é bem mais lenta que a CPU, criando um **gargalo**.

**A solução:** colocar uma memória rápida **entre** a CPU e a memória principal, que guarda uma **cópia das instruções e dados recentemente usados** (e dos próximos a eles). Quando a CPU precisa de algo, procura primeiro na cache. Se não estiver, lê um **bloco** da memória principal para a cache.

| Nível | Onde fica |
| --- | --- |
| **L1** (primária) | dentro do núcleo do processador |
| **L2** (secundária) | originalmente na placa-mãe; hoje dentro do chip da CPU |
| **L3** | existe em poucos processadores |

Quanto mais perto do processador, melhor o desempenho. É fabricada com **SRAM** (memória estática), tecnologia cara, volátil e muito rápida.

## 5. Memória principal

É a memória básica do sistema: nela fica o **programa em execução e seus dados**, e a CPU "busca" instrução por instrução, por endereço, pelo barramento. Isso vem da ideia de von Neumann, a **máquina de programa armazenado**.

- Tecnologia: **DRAM** (memória dinâmica), mais barata que a SRAM.
- Capacidade típica: 4 a 32 GB.
- **Volátil**, mas parte dela não: a **ROM** guarda o **BIOS**, o programa que inicializa a placa-mãe, verifica os dispositivos e carrega o sistema operacional.

| **RAM** (*Random-Access Memory*) | **ROM** (*Read-Only Memory*) |
| --- | --- |
| leitura e escrita | só leitura |
| volátil | não volátil |
| programas e dados em uso | BIOS |

**Mais memória principal** não aumenta a **velocidade** do processador, mas permite programas e arquivos **maiores**. Quando ela enche, o SO usa o disco como extensão: **memória virtual**, trocando partes (*swapping*) entre RAM e disco.

O tamanho máximo é limitado pelo **barramento de endereços**, pelo **chipset** (controlador de memória) e pelos **slots** da placa-mãe.

## 6. Endereços e capacidade

- **Célula:** menor unidade endereçável, em geral **1 byte** (8 bits).
- **Palavra:** grupo de células que a máquina lê e escreve de uma vez.
- Uma memória de $N$ células tem endereços de $0$ a $N-1$.
- Com um barramento de endereços de $E$ bits, o espaço de endereçamento é $N = 2^E$ células.

| Barramento de endereços | Células | Em bytes |
| --- | --- | --- |
| 16 bits | $2^{16}=65.536$ | 64 KB |
| 32 bits | $2^{32}=4.294.967.296$ | **4 GB** (por isso programas de 32 bits enxergam no máximo 4 GB) |
| 64 bits | $2^{64}$ | 16 EB |

O tamanho do **barramento de dados** (largura da palavra) **não depende** do de endereços: são independentes.

**Capacidade total (em bits):**

$$
T = N \times M
$$

onde $N=2^E$ é o número de células e $M$ é o número de bits por célula.

**Exercício resolvido:** palavras de 16 bits, barramento de endereços de 12 bits. $N=2^{12}=4096$ células; $T=4096\times16=65536$ bits $=8192$ bytes.

## 7. Memória secundária

Também chamada **auxiliar** ou **de massa**. Guarda programas e dados do usuário de forma **duradoura**, com maior capacidade que a principal. Pode ser ligada diretamente (HD) ou conectada quando desejado (CD, DVD, pendrive).

- Acesso: em geral dispositivos **eletromecânicos**, tempos na ordem de **milissegundos**.
- Capacidade: de GB (pendrives) a TB (discos).
- **Não volátil**, armazenamento permanente.

## Quiz

{{< quiz titulo="Memória" >}}

{{< questao >}}
Em qual nível da hierarquia a memória é mais rápida e mais cara?

- [x] Registradores
- [ ] Cache
- [ ] RAM
- [ ] Disco
---
Os registradores estão no topo da pirâmide: mais rápidos, menores e mais caros.
{{< /questao >}}

{{< questao >}}
Para que serve a memória cache?

- [ ] Guardar arquivos permanentemente
- [x] Reduzir a espera da CPU, guardando cópia dos dados e instruções usados recentemente
- [ ] Aumentar o barramento de endereços
- [ ] Substituir a ROM
---
Ela fica entre CPU e RAM para aliviar o gargalo da velocidade.
{{< /questao >}}

{{< questao >}}
Quantas células endereça um barramento de 20 bits?

- [ ] 20
- [ ] 400
- [x] 1.048.576
- [ ] 2.000
---
$2^{20}=1.048.576$ (1 M de células).
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Uma RAM tem espaço de endereçamento de 2K células de 16 bits. Qual o total de bits e o tamanho do endereço?
2. Quantos bits de endereço são necessários para 1 GB com células de 1 byte?
3. Explique, em uma frase, a diferença entre RAM e ROM.

{{< details title="Gabarito" >}}
1. $T=2048\times16=32768$ bits. $2^{11}=2048$, então o endereço tem **11 bits**.
2. $1\ \text{GB}=2^{30}$ células, logo **30 bits**.
3. RAM é de leitura e escrita e volátil; ROM é só de leitura e não volátil (guarda o BIOS).
{{< /details >}}

## Fontes

Baseado nos slides *Hardware (Parte 2): Memória* dos professores Carlos Eduardo Santos Pires e Maxwell Guimarães de Oliveira (UFCG).
