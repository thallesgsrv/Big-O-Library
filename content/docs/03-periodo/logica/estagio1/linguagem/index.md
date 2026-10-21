---
title: A Linguagem da Lógica Proposicional
weight: 2
description: Por que uma linguagem simbólica, letras proposicionais, conectivos, fórmulas bem formadas e precedência.
autores:
  - thallesgsrv
date: 2026-10-15
---

## Sobre

Para raciocinar com método, primeiro precisamos de uma **língua** sem ambiguidade. Nesta página você aprende as peças dessa língua (letras, conectivos e parênteses), as regras para montar frases corretas (as **fórmulas bem formadas**) e como ler a **estrutura** de uma fórmula.

Ao final você deve conseguir:

- dizer se uma sequência de símbolos é ou não uma fórmula;
- achar o **conectivo principal** e as **subfórmulas** de uma fórmula;
- colocar e tirar parênteses usando a **precedência**;
- ler uma condição de `if` como uma fórmula lógica.

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

> [!NOTE]
> Os conectivos estendidos são **atalhos**: tudo que eles dizem dá para escrever só com $\neg,\land,\lor,\to,\leftrightarrow$. Por exemplo, $p\oplus q$ é o mesmo que $\neg(p\leftrightarrow q)$, $p\uparrow q$ é $\neg(p\land q)$ e $p\downarrow q$ é $\neg(p\lor q)$. Por isso as regras de construção abaixo só falam dos cinco primeiros.

### (c) Parênteses

Servem para **tirar a ambiguidade**. É a versão lógica de "(leite + ovos) × dúzia" versus "leite + (ovos × dúzia)".

## 3. Fórmulas bem formadas

Nem toda sequência de símbolos é uma fórmula. As regras de construção são:

1. Toda letra proposicional é uma fórmula.
2. Se $A$ é fórmula, então $\neg A$ também é.
3. Se $A$ e $B$ são fórmulas, então $(A\land B)$, $(A\lor B)$, $(A\to B)$ e $(A\leftrightarrow B)$ também são.
4. **Nada mais** é fórmula.

Pense em montar LEGO: só vale encaixe permitido. Uma letra sozinha, como $p$, já é uma fórmula (regra 1). E $\neg\neg p$ também: é a regra 2 usada duas vezes. Por conveniência, costuma-se **omitir os parênteses mais externos**: escrevemos $p\land q$ em vez de $(p\land q)$.

**Exemplo.** Quais são bem formadas?

1. $((P\lor Q)\to R)$ **Sim.**
2. $(P\to\leftrightarrow(RS\to))$ **Não.** Dois conectivos seguidos, "RS" sem conectivo, e uma seta sem o lado direito.
3. $(((P\lor R)\to T)\leftrightarrow(Q\land S))$ **Sim.**
4. $(\neg P\to(Q\land(R\leftrightarrow S)))(\neg P\to(Q\land(R\leftrightarrow S)))$ **Não.** São duas fórmulas coladas, sem conectivo entre elas.

## 4. Subfórmulas, conectivo principal e árvore

Toda fórmula é construída **de dentro para fora**, pelas regras da seção anterior. Desmontar a construção, **de fora para dentro**, mostra a **estrutura** da fórmula, e vamos precisar disso o tempo todo (na tradução, no tableaux, na FNC).

- **Subfórmulas** de uma fórmula são todas as fórmulas que aparecem dentro dela, incluindo as letras e a própria fórmula.
- O **conectivo principal** é o **último** conectivo aplicado na construção: o que fica "por fora" e manda na fórmula.

**Exemplo.** $(p\land q)\to\neg r$.

- Subfórmulas: $p,\ q,\ r,\ p\land q,\ \neg r$ e a fórmula inteira (6 ao todo).
- Conectivo principal: $\to$.

Dá para desenhar isso como uma **árvore sintática**: a raiz é o conectivo principal e as folhas são as letras.

```
→
├─ ∧
│  ├─ p
│  └─ q
└─ ¬
   └─ r
```

Para calcular o valor de uma fórmula (próxima página), você vai **das folhas até a raiz**.

> [!WARNING]
> **Cuidado com o $\neg$.** Em $\neg(p\land q)$ o conectivo principal é $\neg$, porque ele cobre tudo. Já em $\neg p\land q$ o principal é $\land$, porque o $\neg$ só atinge o $p$. Duas fórmulas parecidas, estruturas completamente diferentes.

| Fórmula | Conectivo principal | Por quê |
| --- | --- | --- |
| $\neg(p\land q)$ | $\neg$ | a negação cobre tudo |
| $\neg p\land q$ | $\land$ | o $\neg$ só atinge o $p$ |
| $p\lor q\to r$ | $\to$ | pela precedência (seção 5), o $\to$ é o mais fraco |
| $p\to q\to r$ | o **primeiro** $\to$ | a implicação associa à direita: $p\to(q\to r)$ |
| $p\leftrightarrow q\land r$ | $\leftrightarrow$ | é o mais fraco: $p\leftrightarrow(q\land r)$ |

**Como achar o conectivo principal:** tire os parênteses mais externos e procure o conectivo que **não está dentro de nenhum parêntese**. Se a fórmula começa com um $\neg$ que cobre tudo, é ele. Sem parênteses, vale o de **menor precedência**.

## 5. Reduzindo parênteses: precedência

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

Na prática, para colocar **todos** os parênteses em uma fórmula sem eles:

1. Coloque parênteses em volta de cada $\neg$ e do que ele atinge.
2. Depois nos $\land$ (e $\uparrow$), depois nos $\lor$ (e $\downarrow$), depois nos $\to$ e por último nos $\leftrightarrow$ e $\oplus$.

**Associatividade.** $\land$ e $\lor$ podem ser agrupados de qualquer jeito: $p\lor q\lor r$ é seguro. Já a implicação **associa à direita**: $p\to q\to r$ significa $p\to(q\to r)$.

> [!WARNING]
> **Na dúvida, use parênteses!** $\leftrightarrow$ e $\oplus$ têm a **mesma** prioridade, então $p\leftrightarrow q\oplus r$ não diz qual vem primeiro: escreva os parênteses. Precedência é para economizar tinta, não para deixar a fórmula enigmática. E nunca escreva $p\to q\to r$ achando que é $(p\to q)\to r$: são coisas **diferentes**.

### Exercício de simplificação (remova parênteses desnecessários)

A coluna da direita mostra o resultado. Tente cobrir a coluna e fazer sozinho antes de conferir.

| Fórmula original | Simplificada |
| --- | --- |
| $(p\lor q)$ | $p\lor q$ |
| $((p\lor q)\lor(r\lor s))$ | $p\lor q\lor r\lor s$ |
| $(p\to(q\to(p\land q)))$ | $p\to q\to p\land q$ |
| $\neg(p\lor(q\land r))$ | $\neg(p\lor q\land r)$ |
| $\neg(p\land(q\lor r))$ | $\neg(p\land(q\lor r))$ (os parênteses internos **são necessários**) |
| $((p\land(p\to q))\to q)$ | $p\land(p\to q)\to q$ |

## 6. Ponte com a programação

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

## Erros comuns

- **Duas letras coladas** ($pq$) ou **dois conectivos seguidos** ($p\land\lor q$). Falta uma fórmula no meio.
- **Esquecer os parênteses** e escrever $p\lor q\land r$ pensando em $(p\lor q)\land r$.
- **Confundir $\neg p\land q$ com $\neg(p\land q)$**: o primeiro nega só o $p$.
- **Confundir o símbolo $\to$** (conectivo, parte da fórmula) **com o $\models$** (afirmação sobre um argumento, que você vai ver na tradução e na semântica).

## Resumo

- Lógica proposicional é uma linguagem **sem ambiguidade** e **simbólica**.
- Peças: letras (átomos), conectivos ($\neg,\land,\lor,\to,\leftrightarrow$) e parênteses.
- **Conectivo principal:** o último aplicado, o que fica por fora. **Subfórmulas:** tudo que aparece dentro, incluindo as letras.
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

**Exercício 5.** Qual é o conectivo principal de cada fórmula?

{{< quiz titulo="conectivo principal" >}}

{{< questao >}}
O conectivo principal de $\neg p\land q\to r$ é:

- [ ] $\neg$
- [ ] $\land$
- [x] $\to$
---
Com a precedência, $\neg p\land q\to r$ é $((\neg p)\land q)\to r$. O $\to$ é o mais fraco, então é o último a ser aplicado.
{{< /questao >}}

{{< questao >}}
O conectivo principal de $\neg(p\to q)\lor r$ é:

- [ ] $\neg$
- [ ] $\to$
- [x] $\lor$
---
O $\neg$ cobre só o parêntese $(p\to q)$. Quem junta $\neg(p\to q)$ com $r$ é o $\lor$.
{{< /questao >}}

{{< questao >}}
O conectivo principal de $\neg(p\lor q\to r)$ é:

- [x] $\neg$
- [ ] $\lor$
- [ ] $\to$
---
O $\neg$ está fora de um parêntese que cobre a fórmula toda. Tudo que aparece dentro é subfórmula dele.
{{< /questao >}}

{{< /quiz >}}

**Exercício 6.** Quais destas sequências são fórmulas bem formadas?

{{< quiz titulo="fórmulas bem formadas" >}}

{{< questao fixa="true" >}}
$(p\land q)\to r$ é uma fórmula bem formada?

- [x] Sim
- [ ] Não
---
Duas fórmulas ($p$ e $q$) unidas por $\land$, e o resultado unido a $r$ por $\to$. Todas as regras respeitadas.
{{< /questao >}}

{{< questao fixa="true" >}}
$\neg\neg p$ é uma fórmula bem formada?

- [x] Sim
- [ ] Não
---
$p$ é fórmula; $\neg p$ é fórmula (regra 2); e $\neg\neg p$ também (regra 2 de novo).
{{< /questao >}}

{{< questao fixa="true" >}}
$p\lor\land q$ é uma fórmula bem formada?

- [ ] Sim
- [x] Não
---
Dois conectivos binários seguidos: falta uma fórmula entre o $\lor$ e o $\land$.
{{< /questao >}}

{{< questao fixa="true" >}}
$(p\to(q\leftrightarrow))$ é uma fórmula bem formada?

- [ ] Sim
- [x] Não
---
O $\leftrightarrow$ precisa de uma fórmula dos dois lados, e aqui falta a do lado direito.
{{< /questao >}}

{{< /quiz >}}

**Exercício 7.** Desenhe a árvore sintática de $\neg(p\lor q)\to(\neg p\land\neg q)$ e liste todas as suas subfórmulas.

{{< details title="Gabarito" >}}
```
→
├─ ¬
│  └─ ∨
│     ├─ p
│     └─ q
└─ ∧
   ├─ ¬
   │  └─ p
   └─ ¬
      └─ q
```

Subfórmulas (8): $p,\ q,\ p\lor q,\ \neg(p\lor q),\ \neg p,\ \neg q,\ \neg p\land\neg q$ e a fórmula inteira. (Curiosidade: o lado esquerdo e o direito são a lei de De Morgan, e a fórmula toda é uma tautologia.)
{{< /details >}}

**Exercício 8.** Coloque todos os parênteses em $p\to q\lor r\leftrightarrow\neg s\land t$.

{{< details title="Gabarito" >}}
O $\leftrightarrow$ é o mais fraco, então é o principal: $(p\to q\lor r)\leftrightarrow(\neg s\land t)$. À esquerda, $\lor$ antes de $\to$: $(p\to(q\lor r))$. À direita, $\neg$ antes de $\land$: $((\neg s)\land t)$.

Completo: $\big(p\to(q\lor r)\big)\leftrightarrow\big((\neg s)\land t\big)$.
{{< /details >}}
