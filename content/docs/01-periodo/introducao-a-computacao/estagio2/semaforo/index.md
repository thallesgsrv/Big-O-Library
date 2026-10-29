---
title: Projeto de Circuito - Semáforo
weight: 3
description: Um projeto completo de circuito digital, da situação à simulação no TinkerCAD, controlando as luzes de um semáforo.
autores:
  - thallesgsrv
date: 2026-10-17
---

Um exemplo completo para praticar o método: **como implementar o circuito de um semáforo?** São sete passos, e cada um corresponde a uma etapa que você já conhece.

## 1. Situação

O circuito tem **3 saídas**: $R$ (vermelho), $Y$ (amarelo) e $G$ (verde). Valendo 1, a luz fica acesa, e só **uma** pode estar acesa por vez. Para ter quatro estados diferentes (incluindo tudo apagado) precisamos de **2 entradas**, $A$ e $B$, pois $2^2=4$ combinações.

O algoritmo do semáforo (alto nível):

```text
LOOP INFINITO:
    Acender luz verde (e apagar as outras)
    Aguardar 25 s
    Acender luz amarela (e apagar as outras)
    Aguardar 5 s
    Acender luz vermelha (e apagar as outras)
    Aguardar 30 s
```

## 2. Tabela-verdade

| A | B | R | Y | G | Estado |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 | tudo apagado |
| 0 | 1 | 0 | 0 | 1 | verde |
| 1 | 0 | 0 | 1 | 0 | amarela |
| 1 | 1 | 1 | 0 | 0 | vermelha |

## 3. Expressões (mintermos)

Cada saída vale 1 em **uma** linha só:

$$
R = A\,B \qquad Y = A\,\overline{B} \qquad G = \overline{A}\,B
$$

**Dá para simplificar?** Não. Cada expressão já é um único mintermo de duas variáveis. Mais simples que isso, só trocar por outra porta.

## 4. Diagrama lógico

- $R$: uma porta **AND** com $A$ e $B$.
- $Y$: uma **AND** com $A$ e $\overline{B}$ (um NOT em $B$).
- $G$: uma **AND** com $\overline{A}$ e $B$ (um NOT em $A$).

## 5. Implementação com circuitos integrados

São necessários:

- um **7404** (inversores, NOT) para $\overline{A}$ e $\overline{B}$;
- um **7408** (4 portas AND de 2 entradas) para $R$, $Y$ e $G$.

Cada saída aciona um LED (vermelho, amarelo, verde). Para alimentar os CIs, usa-se uma fonte (a simulação usa uma bateria) e o sinal de entrada $A$ e $B$ vem de chaves (um DIP switch).

## 6. Simulação

O professor disponibilizou uma simulação no TinkerCAD com os dois CIs (74HC04 e 74HC08), uma bateria, 3 LEDs com resistores e um DIP switch como entrada. Mexendo nas chaves $A$ e $B$, você percorre os quatro estados.

## 7. Como o software controla o circuito

Para o circuito virar semáforo, é preciso "enviar a palavra" na sequência certa, esperando entre elas:

```text
LOOP INFINITO:
    Enviar palavra 01   (A=0, B=1: verde)
    Aguardar 25 s
    Enviar palavra 10   (A=1, B=0: amarela)
    Aguardar 5 s
    Enviar palavra 11   (A=1, B=1: vermelha)
    Aguardar 30 s
```

Uma ideia ainda mais básica: iniciar uma palavra de 2 bits em 00, e a cada passo **somar 1** e enviar. Mostra como **hardware** (circuito combinacional, que decide qual luz) e **software** (algoritmo, que decide quando) se complementam.

> [!TIP]
> Note a divisão de trabalho: o circuito é **combinacional**, sem memória nem tempo. O "tempo" (25 s, 5 s, 30 s) vem do programa que envia as palavras.

## Quiz

{{< quiz titulo="Semáforo" >}}

{{< questao >}}
Quantas entradas são necessárias para distinguir 4 estados (todas apagadas, verde, amarela e vermelha)?

- [ ] 1
- [x] 2
- [ ] 3
- [ ] 4
---
$2^2=4$. Duas entradas geram as quatro combinações.
{{< /questao >}}

{{< questao >}}
Qual a expressão da luz **amarela** ($A=1$, $B=0$)?

- [ ] $\overline{A}\,B$
- [ ] $A\,B$
- [x] $A\,\overline{B}$
- [ ] $\overline{A}\,\overline{B}$
---
Mintermo: A entra direta (vale 1) e B entra negada (vale 0).
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Qual palavra (A B) acende a luz verde? E qual deixa tudo apagado?
2. Quais CIs são usados na implementação?

{{< details title="Gabarito" >}}
1. Verde: `01`. Tudo apagado: `00`.
2. 7404 (NOT) e 7408 (AND).
{{< /details >}}

## Fontes

Baseado nos slides *Projeto de Circuitos Digitais: Semáforo* do professor Maxwell Guimarães de Oliveira (UFCG).
