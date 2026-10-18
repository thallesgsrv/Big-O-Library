---
title: Ponto Flutuante e IEEE 754
weight: 6
description: Notação científica em binário, normalização, formato de 8 bits, padrão IEEE 754 (32 e 64 bits), casos especiais, overflow e underflow.
autores:
  - thallesgsrv
date: 2026-10-17
---

Como guardar a massa do elétron ($9\times10^{-28}$ g) e a do Sol ($2\times10^{33}$ g) no mesmo formato? Escrever todos os zeros exigiria uma sequência enorme de bits. A solução é a mesma da física: **notação científica**.

## 1. A ideia

$$
n = f \times b^{e}
$$

- $f$: fração, **significando** ou **mantissa** (os dígitos).
- $b$: base (aqui, sempre 2).
- $e$: **expoente**.

A vírgula "flutua": $3{,}14 = 3{,}14\times10^0 = 0{,}314\times10^1$. O **expoente** define o **alcance** (quão grande ou pequeno) e o **significando** define a **precisão** (quantos dígitos corretos).

Em binário: $110{,}101_2 = 1{,}10101\times2^2 = 0{,}110101\times2^3$ (o ponto anda, o expoente compensa).

## 2. Normalização

Um mesmo número pode ser escrito de vários jeitos. Na forma **normalizada** só há um jeito: **um único dígito diferente de zero antes da vírgula**. Em binário esse dígito só pode ser **1**:

$$
\pm 1{,}xxxx \times 2^{e}
$$

Como o primeiro bit é sempre 1, ele nem precisa ser guardado: é o **bit escondido**. Guardam-se só o **sinal**, o **expoente** e o que vem depois da vírgula.

## 3. Um formato de 8 bits para treinar

| Bit 7 | Bits 6 a 4 | Bits 3 a 0 |
| --- | --- | --- |
| Sinal | Expoente (excesso de 4) | Significando |

- Sinal: 0 positivo, 1 negativo.
- Expoente: 3 bits em **excesso de 4**, ou seja, valor real $+4$.
- Significando: os 4 bits depois da vírgula (o 1 inicial é escondido).

**Exemplo 1:** $5{,}25_{10}$.

1. $5 = 101_2$ e $0{,}25 = 0{,}01_2$, então $101{,}01_2$.
2. Normalizando: $1{,}0101\times2^2$.
3. Expoente: $2+4=6=110_2$. Significando: `0101`. Sinal: 0.
4. Resultado: `0 110 0101`.

**Exemplo 2:** $7{,}75 = 111{,}11_2 = 1{,}1111\times2^2$ → `0 110 1111`.

**Decodificando** `1 010 1001`: sinal 1 (negativo); expoente $010=2$, em excesso de 4 é $2-4=-2$; significando $1{,}1001$. Valor: $-1{,}1001\times2^{-2} = -0{,}011001_2 = -0{,}390625$.

**Decodificando** `0 011 0101`: expoente $3-4=-1$; $1{,}0101\times2^{-1}=0{,}10101_2=0{,}65625$.

**Faixa deste formato** (sem casos especiais): o maior é `0 111 1111` $= 1{,}1111\times2^3 = 15{,}5$ e o menor em módulo é `0 000 0000` $= 1{,}0000\times2^{-4} = 0{,}0625$. Logo vai de $-15{,}5$ a $+15{,}5$.

## 4. O padrão IEEE 754

Até meados dos anos 80 cada fabricante tinha o seu formato. O **IEEE 754** (1985) uniformizou como se representa e opera ponto flutuante. Hoje é o formato de quase todos os computadores.

| | Precisão simples (`float`) | Precisão dupla (`double`) |
| --- | --- | --- |
| Total | 32 bits | 64 bits |
| Sinal | 1 bit | 1 bit |
| Expoente | 8 bits | 11 bits |
| Significando | 23 bits | 52 bits |
| Excesso (bias) | 127 | 1023 |
| Dígitos decimais | cerca de 7 | cerca de 15 |

O expoente é guardado em **excesso**: $E_{guardado} = e_{real} + 127$ (simples).

| Expoente guardado | Significado |
| --- | --- |
| `00000000` (0) | caso especial (zero e não normalizados) |
| `00000001` (1) | expoente real $-126$ (o menor) |
| `01111111` (127) | expoente real $0$ |
| `10000000` (128) | expoente real $1$ |
| `11111110` (254) | expoente real $+127$ (o maior) |
| `11111111` (255) | caso especial (infinito e NaN) |

### Converter para IEEE 754

**Exemplo:** $10{,}875_{10}$.

1. Sinal: positivo, **0**.
2. Binário: $10 = 1010$, $0{,}875 = 0{,}111$ ($0{,}875\times2=1{,}75\to1$; $0{,}75\times2=1{,}5\to1$; $0{,}5\times2=1{,}0\to1$). Então $1010{,}111_2$.
3. Normaliza: $1{,}010111\times2^3$.
4. Expoente: $3+127=130=10000010_2$.
5. Significando: $010111$ completado com zeros até 23 bits.
6. Resultado: `0 10000010 01011100000000000000000`.

**Outro:** $178{,}125 = 10110010{,}001_2 = 1{,}0110010001\times2^7$; expoente $7+127=134=10000110$. Resultado: `0 10000110 01100100010000000000000`.

### Converter de IEEE 754 para decimal

`1 10000011 10100000000000000000000`:

- Sinal 1: negativo.
- Expoente: $10000011_2=131$; $131-127=4$.
- Significando: $1{,}101$ (acrescente o 1 escondido).
- Valor: $-1{,}101_2\times2^4 = -11010_2 = -26$.

`1 10000001 10010000000000000000000`: expoente $129-127=2$; $1{,}1001\times2^2=110{,}01_2=6{,}25$; resultado $-6{,}25$.

## 5. Casos especiais

| Expoente | Significando | Significa |
| --- | --- | --- |
| tudo 0 | tudo 0 | $+0$ ou $-0$ (pelo sinal) |
| tudo 0 | diferente de 0 | não normalizado (muito pequeno; sem bit escondido) |
| tudo 1 | tudo 0 | $+\infty$ ou $-\infty$ |
| tudo 1 | diferente de 0 | **NaN** (*Not a Number*) |

**Limites em precisão simples:**

- Menor positivo normalizado: $2^{-126}$.
- Maior positivo: $2^{127}\times(2-2^{-23})$, um valor bem próximo de $2^{128}$ mas não igual (como $9{,}999 = 10 - 0{,}001$).
- Menor positivo não normalizado: $2^{-149}$.

Em precisão dupla: expoente real de $-1022$ a $+1023$.

## 6. Overflow, underflow e precisão

- **Overflow:** o valor absoluto é grande demais; faltam bits no expoente.
- **Underflow:** o valor absoluto é pequeno demais, menor que o menor valor representável.
- **Imprecisão:** a normalização deixa representar o dado, mas com **perda de precisão**; o alcance depende dos bits do expoente e a precisão, dos bits do significando.

> [!WARNING]
> Como muitos decimais viram dízimas em binário (veja a página de conversão), comparar números reais com `==` é perigoso. $0{,}1 + 0{,}2$ não dá exatamente $0{,}3$ em ponto flutuante.

## Quiz

{{< quiz titulo="Ponto flutuante" >}}

{{< questao >}}
Em IEEE 754 de 32 bits, quantos bits tem o expoente?

- [ ] 11
- [x] 8
- [ ] 23
- [ ] 7
---
1 de sinal, 8 de expoente (excesso de 127) e 23 de significando. Os 11 do expoente são da precisão dupla.
{{< /questao >}}

{{< questao >}}
Um número tem expoente guardado `10000011` em precisão simples. Qual o expoente real?

- [ ] 131
- [x] 4
- [ ] 3
- [ ] 258
---
$10000011_2 = 131$ e $131-127=4$.
{{< /questao >}}

{{< questao >}}
Para que serve o "bit escondido"?

- [ ] Guardar o sinal
- [x] Economizar um bit, pois o 1 antes da vírgula é sempre igual na forma normalizada
- [ ] Marcar overflow
- [ ] Guardar o expoente
---
Como todo número normalizado começa em $1{,}\dots$, não é preciso guardar esse 1.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Converta $-6{,}25$ para IEEE 754 (32 bits).
2. Converta $15213{,}0$ para IEEE 754 (32 bits) e dê só o expoente guardado.
3. No formato de 8 bits da seção 3, qual o valor de `0 110 1111`?
4. Qual a diferença entre overflow e underflow?

{{< details title="Gabarito" >}}
1. $6{,}25 = 110{,}01_2 = 1{,}1001\times2^2$; expoente $2+127=129=10000001$. Sinal 1. Resultado: `1 10000001 10010000000000000000000`.
2. $15213 = 11101101101101_2 = 1{,}1101101101101\times2^{13}$; expoente $13+127=140=10001100$.
3. Expoente $6-4=2$; $1{,}1111\times2^2 = 111{,}11_2 = 7{,}75$.
4. Overflow: valor grande demais para o expoente. Underflow: valor pequeno demais, menor que o menor representável.
{{< /details >}}

## Fontes

Baseado nos slides *Representação da Informação, Parte 2* do professor Carlos Eduardo Santos Pires (UFCG).
