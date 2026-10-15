---
title: A Linguagem da Lógica Proposicional
weight: 2
description: Por que uma linguagem simbólica, letras proposicionais, conectivos, fórmulas bem formadas e precedência.
autores:
  - thallesgsrv
date: 2026-10-15
---

## 1. Por que inventar uma linguagem?

Uma piada clássica:

> Um homem vai ao mercado. A esposa pede: *"Traga um litro de leite e, se tiver ovos, compre uma dúzia."* Ele volta com **treze** litros de leite. *"Por quê?"* — *"Porque tinha ovos."*

O português é **ambíguo**: "se tiver ovos, compre uma dúzia" pode ser *"uma dúzia de ovos"* ou *"uma dúzia de litros de leite"*. Em lógica (e em programação!) ambiguidade é inaceitável.

A **lógica proposicional é uma linguagem sem ambiguidade**: cada fórmula tem **uma única** leitura.

Além disso, ela é **simbólica**: o que importa é a **forma**, não o assunto. Veja:

| Argumento A | Argumento B |
| --- | --- |
| Se chover hoje, haverá enchente. | Se você vier, não preciso ir. |
| Choveu hoje. | Você vem. |
| Então houve enchente. | Então não preciso ir. |

Assuntos diferentes, **mesma forma**: *se $p$ então $q$; $p$; logo $q$*. Trocando frases por letras, enxergamos o esqueleto do raciocínio.

## 2. O alfabeto

A linguagem tem três tipos de peças:

### (a) Letras proposicionais (átomos)

Cada letra representa **uma proposição simples**, que não pode ser quebrada em pedaços menores com "e", "ou", "se", "não".

- $p$: "Choveu em Campina Grande hoje."
- $q$: "Cachorros latem."
- $r$: "Wilson é um aluno aplicado."

> [!TIP]
> **Como saber se é átomo?** Tente quebrar com um conectivo. "Choveu **e** fez frio" quebra em dois átomos ("choveu", "fez frio"). "Choveu" não quebra. Átomos também são chamados de **fórmulas atômicas**.

### (b) Conectivos

São as "cola" que juntam átomos:

| Nome | Símbolo | Lê-se | Ideia em uma frase |
| --- | --- | --- | --- |
| Negação | $\neg p$ | "não $p$", "é falso que $p$" | **inverte** |
| Conjunção | $p\land q$ | "$p$ e $q$" | **os dois** |
| Disjunção | $p\lor q$ | "$p$ ou $q$" | **pelo menos um** |
| Implicação | $p\to q$ | "se $p$, então $q$" | **promessa** |
| Bicondicional | $p\leftrightarrow q$ | "$p$ se, e somente se, $q$" | **andam juntos** |

Conectivos estendidos (atalhos úteis):

| Nome | Símbolo | Significa |
| --- | --- | --- |
| Ou exclusivo (XOR) | $p\oplus q$ | $p$ ou $q$, **mas não ambos** |
| NAND | $p\uparrow q$ | "não ambos": $\neg(p\land q)$ |
| NOR | $p\downarrow q$ | "nem um nem outro": $\neg(p\lor q)$ |

### (c) Parênteses

Servem para **tirar a ambiguidade**. É a versão lógica de "(leite + ovos) × dúzia" versus "leite + (ovos × dúzia)".

## 3. Fórmulas bem formadas

Nem toda sequência de símbolos é uma fórmula. As regras de construção são:

1. Toda letra proposicional é uma fórmula.
2. Se $A$ é fórmula, então $\neg A$ também é.
3. Se $A$ e $B$ são fórmulas, então $(A\land B)$, $(A\lor B)$, $(A\to B)$ e $(A\leftrightarrow B)$ também são.
4. **Nada mais** é fórmula.

Pense em montar LEGO: só vale encaixe permitido.

**Exemplo.** Quais são bem formadas?

1. $((P\lor Q)\to R)$ **Sim.**
2. $(P\to\leftrightarrow(RS\to))$ **Não.** Dois conectivos seguidos, "RS" sem conectivo, e uma seta sem o lado direito.
3. $(((P\lor R)\to T)\leftrightarrow(Q\land S))$ **Sim.**
4. $(\neg P\to(Q\land(R\leftrightarrow S)))(\neg P\to(Q\land(R\leftrightarrow S)))$ **Não.** São duas fórmulas coladas, sem conectivo entre elas.

## 4. Reduzindo parênteses: precedência

Escrever todos os parênteses vira um pesadelo:
$$
(((P\lor R)\to T)\leftrightarrow(Q\land S))
$$

Por isso há uma ordem de prioridade, igual a $\times$ antes de $+$ na matemática:

| Prioridade | Conectivos |
| --- | --- |
| 1 (mais forte) | $\neg$ |
| 2 | $\land$, $\uparrow$ |
| 3 | $\lor$, $\downarrow$ |
| 4 | $\to$ |
| 5 (mais fraco) | $\leftrightarrow$, $\oplus$ |

Quem tem **prioridade maior "agarra" primeiro** os vizinhos:

- $p\lor q\land r$ significa $p\lor(q\land r)$, e **não** $(p\lor q)\land r$.
- $p\to q\leftrightarrow\neg q\to\neg p$ significa $(p\to q)\leftrightarrow((\neg q)\to(\neg p))$.

**Associatividade.** $\land$ e $\lor$ podem ser agrupados de qualquer jeito: $p\lor q\lor r$ é seguro. Já a implicação **associa à direita**: $p\to q\to r$ significa $p\to(q\to r)$.

> [!WARNING]
> **Na dúvida, use parênteses!** Precedência é para economizar tinta, não para deixar a fórmula enigmática. E nunca escreva $p\to q\to r$ achando que é $(p\to q)\to r$: são coisas **diferentes**.

### Exercício de simplificação (remova parênteses desnecessários)

| Fórmula original | Simplificada |
| --- | --- |
| $(p\lor q)$ | $p\lor q$ |
| $((p\lor q)\lor(r\lor s))$ | $p\lor q\lor r\lor s$ |
| $(p\to(q\to(p\land q)))$ | $p\to q\to p\land q$ |
| $\neg(p\lor(q\land r))$ | $\neg(p\lor q\land r)$ |
| $\neg(p\land(q\lor r))$ | $\neg(p\land(q\lor r))$ (os parênteses internos **são necessários**) |
| $((p\land(p\to q))\to q)$ | $p\land(p\to q)\to q$ |

## 5. Ponte com a programação

Os conectivos são os operadores booleanos que você já usa:

| Lógica | Código |
| --- | --- |
| $\neg p$ | `!p` |
| $p\land q$ | `p && q` |
| $p\lor q$ | `p \|\| q` |
| $p\oplus q$ | `p != q` (para booleanos) |

**Exemplo.** Traduza `if ((x > 0) || (x <= 0 && y > 100))`.

- $p$: "$x>0$" e $q$: "$y>100$". Note que "$x\le0$" é exatamente $\neg p$.
- Fórmula: $p\lor(\neg p\land q)$.

Curiosidade: essa condição pode ser **simplificada** para $p\lor q$, isto é, `if (x > 0 || y > 100)`. (Veja por quê na página de Tabela-verdade.) Lógica serve para deixar código mais limpo.

## Resumo

- Lógica proposicional é uma linguagem **sem ambiguidade** e **simbólica**.
- Peças: letras (átomos), conectivos ($\neg,\land,\lor,\to,\leftrightarrow$) e parênteses.
- Precedência: $\neg$ > $\land$ > $\lor$ > $\to$ > $\leftrightarrow$. Na dúvida, parênteses.

## Exercícios

**Exercício 1.** $(P\land\to Q)$ é fórmula bem formada?

{{< quiz titulo="fórmula bem formada" >}}
{{< questao >}}
A expressão $(P\land\to Q)$ é uma fórmula bem formada?

- [ ] Sim
- [x] Não
---
Não: falta uma fórmula antes da seta (dois conectivos seguidos, $\land\to$).
{{< /questao >}}
{{< /quiz >}}

**Exercício 2.** Coloque os parênteses completos em $p\land q\to r\lor s$.

{{< quiz titulo="parênteses completos" >}}
{{< questao >}}
Com todos os parênteses, $p\land q\to r\lor s$ fica:

- [ ] $p\land(q\to r)\lor s$
- [x] $(p\land q)\to(r\lor s)$
- [ ] $((p\land q)\to r)\lor s$
- [ ] $p\land((q\to r)\lor s)$
---
$\land$ e $\lor$ agarram primeiro; o $\to$ fica por último e liga os dois blocos.
{{< /questao >}}
{{< /quiz >}}

**Exercício 3.** Coloque os parênteses completos em $\neg p\lor q\to r$.

{{< quiz titulo="parênteses completos" >}}
{{< questao >}}
Com todos os parênteses, $\neg p\lor q\to r$ fica:

- [ ] $\neg(p\lor q)\to r$
- [x] $((\neg p)\lor q)\to r$
- [ ] $(\neg p)\lor(q\to r)$
- [ ] $\neg(p\lor(q\to r))$
---
O $\neg$ só atinge o $p$; depois vem o $\lor$; e o $\to$ fica por último.
{{< /questao >}}
{{< /quiz >}}

**Exercício 4.** Traduza `if (a > 0 && !(b > 0))`.

{{< details title="Gabarito" >}}
$p$: "$a>0$", $q$: "$b>0$". Fórmula: $p\land\neg q$.
{{< /details >}}
