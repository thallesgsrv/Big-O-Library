---
title: Bits, Bytes e Códigos de Caracteres
weight: 6
description: Por que o computador usa binário, quanto cabe em n bits, unidades de medida e os códigos ASCII, EBCDIC e Unicode.
autores:
  - thallesgsrv
date: 2026-10-17
---

O computador é uma máquina eletrônica. Por isso só distingue **dois estados físicos**: tem sinal ou não tem (energia, polaridade magnética, luz refletida). É como um interruptor: ligado ou desligado. Tudo o que ele guarda, de uma foto a um vídeo, é feito de combinações desses dois estados.

## 1. Analógico x digital

- **Grandeza analógica:** contínua. A tensão pode ter infinitos valores.
- **Grandeza digital:** discreta, passo a passo.

Computadores digitais trabalham com **dois níveis** de sinal elétrico, alto e baixo, e representam dados por um símbolo fácil de identificar: o dígito.

**Por que binário?** Porque circuitos eletrônicos representam dois estados com facilidade e com **confiabilidade**: não existe valor intermediário entre 0 e 1 para gerar dúvida.

## 2. Bit e quanto cabe em $n$ bits

**Bit** (*binary digit*) é a menor unidade de informação: `0` ou `1`. Mas um bit só guarda 2 símbolos. Precisamos de grupos.

Com $n$ bits há $2^n$ combinações:

| Bits | Combinações | |
| --- | --- | --- |
| 1 | 2 | |
| 2 | 4 | 00, 01, 10, 11 |
| 3 | 8 | 000, 001, ..., 111 |
| 4 | 16 | |
| 5 | 32 | |
| 6 | 64 | |
| 7 | 128 | |
| 8 | 256 | **um byte** |
| 10 | 1024 | |

Para saber quantos bits são necessários, faça a conta dos símbolos: 26 maiúsculas + 26 minúsculas + 10 algarismos + 32 pontuações e símbolos + 24 caracteres de controle = **118**. Como $2^6=64$ é pouco e $2^7=128$ já dá, **7 bits** bastam. Por isso o ASCII original usa 7 bits.

## 3. Byte

**Byte** (*binary term*) é um grupo ordenado de **8 bits**, tratado como unidade de armazenamento e transferência. Com um byte podemos representar:

- 256 caracteres diferentes; ou
- números de 0 a 255; ou
- números de $-128$ a $127$.

Resumo: **1 byte = 8 bits = 1 caractere**.

## 4. Unidades de medida

Em binário os múltiplos crescem de **1024 em 1024** ($2^{10}$), e não de 1000 em 1000.

| Nome | Sigla | Valor |
| --- | --- | --- |
| Kilobyte | KB | $2^{10}$ = 1.024 B |
| Megabyte | MB | $2^{20}$ = 1.048.576 B |
| Gigabyte | GB | $2^{30}$ B |
| Terabyte | TB | $2^{40}$ B |
| Petabyte | PB | $2^{50}$ B |
| Exabyte | EB | $2^{60}$ B |
| Zettabyte | ZB | $2^{70}$ B |
| Yottabyte | YB | $2^{80}$ B |

Cuidado com **b minúsculo (bit)** e **B maiúsculo (byte)**: 1 Mbit = 131.072 bytes.

Na prática, como o tamanho é usado de forma comparativa, aproxima-se 1 KB por 1000 bytes. Exemplo: um livro de 250 páginas tem cerca de 1.000.000 de caracteres, ou seja, **1 MB**.

**Capacidades típicas:** CD, 700 MB. DVD, 4,7 GB. Pendrive, 32 GB. HD, 1 TB.

## 5. Códigos de caracteres

O teclado faz o "meio de campo": você digita letras, ele manda bytes. Para isso, existem **tabelas de codificação** que associam cada símbolo a um número binário.

| Código | Características |
| --- | --- |
| **EBCDIC** | 8 bits (256 símbolos). Mainframes IBM e médio porte; raro em micros. |
| **ASCII** | Padrão ANSI. Na versão original usa 7 bits (128 símbolos); o oitavo bit de um byte podia ser usado como **paridade**. O ASCII estendido do PC usa os outros 128 códigos para símbolos gráficos e idiomas além do inglês. |
| **Unicode** | O padrão mais completo: símbolos de vários alfabetos (japonês, árabe, grego, hebraico). Os slides falam em 2 bytes por símbolo, o que cobre mais de 65.000 símbolos. |

Uma amostra da tabela ASCII:

| Decimal | Binário | Caractere | Imprimível? |
| --- | --- | --- | --- |
| 0 | 0000 0000 | null | não |
| 7 | 0000 0111 | campainha | não |
| 33 | 0010 0001 | `!` | sim |
| 48 | 0011 0000 | `0` | sim |
| 65 | 0100 0001 | `A` | sim |
| 97 | 0110 0001 | `a` | sim |
| 127 | 0111 1111 | delete | não |

Os códigos de 0 a 31 são **caracteres de controle**; de 32 a 127 estão os imprimíveis.

> [!TIP]
> As letras são sequenciais. Se `A` é 65 (`0100 0001`), então `B` é 66, `C` é 67 e `D` é 68 (`0100 0100`). A diferença entre maiúscula e minúscula é sempre 32 (um único bit).

> [!NOTE]
> Hoje o formato mais usado para Unicode na web é o UTF-8, que usa de 1 a 4 bytes por símbolo. Os primeiros 128 símbolos coincidem com o ASCII.

## Quiz

{{< quiz titulo="Bits e bytes" >}}

{{< questao >}}
Quantas combinações diferentes cabem em **6 bits**?

- [ ] 12
- [ ] 36
- [x] 64
- [ ] 128
---
$2^6 = 64$. Cada bit a mais dobra o número de combinações.
{{< /questao >}}

{{< questao >}}
Quanto vale 1 GB (em bytes)?

- [ ] $2^{10}$
- [ ] $2^{20}$
- [x] $2^{30}$
- [ ] $2^{40}$
---
KB $=2^{10}$, MB $=2^{20}$, GB $=2^{30}$, TB $=2^{40}$.
{{< /questao >}}

{{< questao >}}
Se `A` é `0100 0001` no ASCII, qual é a letra `D`?

- [ ] `0100 0010`
- [ ] `0100 0011`
- [x] `0100 0100`
- [ ] `0100 0101`
---
`A`=65, `B`=66, `C`=67, `D`=68. Em binário, 68 é `0100 0100`.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Quantos bits são necessários para representar 100 símbolos diferentes?
2. Quantos DVDs de 4,7 GB cabem, aproximadamente, em um HD de 1 TB?
3. Quantos bytes tem um arquivo de 3 MB (use 1 MB = $2^{20}$ B)?

{{< details title="Gabarito" >}}
1. $2^6 = 64$ é pouco; $2^7 = 128$ dá. São **7 bits**.
2. $1000\ \text{GB} \div 4{,}7\ \text{GB} \approx 212$ DVDs (usando $1\ \text{TB}=1024\ \text{GB}$ dá cerca de 217).
3. $3 \times 1.048.576 = 3.145.728$ bytes.
{{< /details >}}

## Fontes

Baseado nos slides *Representação da Informação, Parte 1* do professor Carlos Eduardo Santos Pires (UFCG).
