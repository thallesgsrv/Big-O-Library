---
title: Semântica e Tabela-Verdade
weight: 4
description: Valores verdade, tabelas dos conectivos, interpretação e modelo, tautologia, satisfazibilidade, consequência lógica e equivalências.
autores:
  - thallesgsrv
date: 2026-10-15
---

## Sobre

Até aqui só escrevemos fórmulas. Agora damos **significado** a elas: quando uma fórmula é verdadeira ou falsa, como calcular isso com tabelas e como usar as tabelas para decidir se um argumento é válido.

Ao final você deve conseguir:

- calcular o valor de uma fórmula numa **interpretação**;
- montar a **tabela-verdade** completa e classificar a fórmula (tautologia, contradição ou contingência);
- testar uma **consequência lógica** procurando um contra-exemplo;
- reconhecer os argumentos famosos (e as falácias) e as **equivalências** mais usadas;
- distinguir `→`, `↔`, `⊨` e `≡`, que parecem primos mas são coisas diferentes.

## 1. Da forma ao significado

Até aqui só escrevemos fórmulas. Mas $p\land\neg q$ sozinha é só um desenho: ela ainda **não é verdadeira nem falsa**. Para saber, precisamos dizer **como está o mundo**: $p$ é verdadeira? $q$ é verdadeira?

- **Sintaxe:** como se *escreve* (letras, conectivos, parênteses).
- **Semântica:** o que a fórmula *significa* (quando é verdadeira ou falsa).

Os valores possíveis são **verdadeiro (V)** e **falso (F)**. (Em outros materiais aparece também T/F, de *True/False*, ou 1/0. É tudo igual.)

## 2. Interpretação

Uma **interpretação** $I$ é uma "foto do mundo": ela diz, para **cada letra**, se é V ou F.

$$
I[p]=V,\qquad I[q]=F
$$

Dada a foto, o valor de **qualquer fórmula** é calculado **de dentro para fora**, usando as tabelas abaixo.

## 3. As tabelas dos conectivos

**Negação** (inverte):

| $p$ | $\neg p$ |
| --- | --- |
| V | F |
| F | V |

**Os conectivos de dois lados:**

| $p$ | $q$ | $p\land q$ | $p\lor q$ | $p\to q$ | $p\leftrightarrow q$ | $p\oplus q$ |
| --- | --- | --- | --- | --- | --- | --- |
| V | V | V | V | V | V | F |
| V | F | F | V | F | F | V |
| F | V | F | V | V | F | V |
| F | F | F | F | V | V | F |

Como memorizar sem decorar:

- **$\land$ (e):** só é V se **os dois** são V.
- **$\lor$ (ou):** só é F se **os dois** são F.
- **$\leftrightarrow$:** V quando os dois têm **o mesmo valor**.
- **$\oplus$:** V quando os dois têm **valores diferentes**.
- **$\to$:** só é F em **um** caso: $p$ verdadeira e $q$ falsa.

Os conectivos estendidos NAND e NOR são simplesmente o **contrário** de $\land$ e de $\lor$:

| $p$ | $q$ | $p\uparrow q$ (NAND) | $p\downarrow q$ (NOR) |
| --- | --- | --- | --- |
| V | V | F | F |
| V | F | V | F |
| F | V | V | F |
| F | F | V | V |

(NAND só é F quando os dois são V. NOR só é V quando os dois são F. Se você fez Introdução à Computação, são as portas NAND e NOR dos circuitos.)

## 4. Entendendo a implicação (a que mais confunde)

Imagine a promessa: **"Se você passar, eu te dou um sorvete."** ($p\to q$)

| Passou? | Ganhou sorvete? | A promessa foi... |
| --- | --- | --- |
| Sim | Sim | cumprida (V) |
| Sim | Não | **quebrada** (F) |
| Não | Sim | não foi quebrada (V). Ele foi generoso. |
| Não | Não | não foi quebrada (V). Não havia nada a cumprir. |

A promessa só é **mentira** quando você passou e **não** ganhou o sorvete. Quando a condição não acontece ($p$ falsa), **ninguém quebrou nada**, então a implicação é verdadeira. Isso se chama implicação **material**.

**Outro exemplo**, com números. $H$: "$x>10$" e $G$: "$x^2>100$". A afirmação $H\to G$ é verdadeira para todo $x$:

| $x$ | $H$ | $G$ | $H\to G$ |
| --- | --- | --- | --- |
| $20$ | V | V ($400>100$) | V |
| $5$ | F | F ($25>100$ é falso) | V |
| $-20$ | F | V ($400>100$) | V |

Nunca aparece "V seguido de F". Repare no $-20$: $H$ é falsa e $G$ verdadeira, e a implicação continua V.

> [!IMPORTANT]
> A implicação lógica **não fala de causa e efeito**. Ela só diz que **não acontece** "$p$ verdadeira com $q$ falsa". "Se $2+2=5$, então a Lua é de queijo" é **verdadeira** (antecedente falso).

## 5. Como calcular o valor de uma fórmula

**Exemplo.** $j$: "o programa é escrito em Java"; $w$: "o programa só executa em Windows". Calcule $j\land\neg w$ sabendo que $I[j]=V$ e $I[w]=F$.

1. $\neg w$: $w$ é F, então $\neg w$ é **V**.
2. $j\land\neg w$: V e V dá **V**.

**Exemplo 2.** $A=(p\to q)\leftrightarrow(\neg q\to\neg p)$, com $I[p]=F$ e $I[q]=V$.

- $p\to q$: F $\to$ V $=$ V.
- $\neg q\to\neg p$: $\neg q=F$, $\neg p=V$; F $\to$ V $=$ V.
- $V\leftrightarrow V=$ **V**. Logo $I[A]=V$.

Quando uma interpretação **torna a fórmula verdadeira**, dizemos que ela é um **modelo** da fórmula. (Acima, a interpretação $I[j]=V,I[w]=F$ é modelo de $j\land\neg w$.)

## 6. A tabela-verdade completa

Em vez de testar uma "foto" de cada vez, listamos **todas** as fotos possíveis.

### Receita

1. Conte as letras: $n$ letras $\Rightarrow$ $2^n$ linhas (2 letras: 4; 3 letras: 8; 10 letras: 1024).
2. Monte as colunas: **primeiro as letras**, depois as **subfórmulas de dentro para fora**, por último a fórmula completa.
3. Preencha as linhas das letras de forma ordenada. Para 3 letras: a 1ª coluna alterna a cada 4 linhas, a 2ª a cada 2, a 3ª a cada 1.
4. Calcule cada coluna usando as tabelas dos conectivos.

**Exemplo.** $(p\to q)\leftrightarrow(\neg q\to\neg p)$:

| $p$ | $q$ | $p\to q$ | $\neg q\to\neg p$ | **fórmula** |
| --- | --- | --- | --- | --- |
| V | V | V | V | **V** |
| V | F | F | F | **V** |
| F | V | V | V | **V** |
| F | F | V | V | **V** |

A coluna final é **toda V**. Isso quer dizer que $p\to q$ e $\neg q\to\neg p$ sempre têm o mesmo valor (a "contrapositiva").

**Exemplo com 3 letras.** $(p\to q)\land(q\to r)\to(p\to r)$. São $2^3=8$ linhas, e a fórmula é montada por partes. Repare na ordem das linhas: $p$ muda a cada 4, $q$ a cada 2, $r$ a cada 1.

| $p$ | $q$ | $r$ | $p\to q$ | $q\to r$ | $(p\to q)\land(q\to r)$ | $p\to r$ | **fórmula** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| V | V | V | V | V | V | V | **V** |
| V | V | F | V | F | F | F | **V** |
| V | F | V | F | V | F | V | **V** |
| V | F | F | F | V | F | F | **V** |
| F | V | V | V | V | V | V | **V** |
| F | V | F | V | F | F | V | **V** |
| F | F | V | V | V | V | V | **V** |
| F | F | F | V | V | V | V | **V** |

A última coluna é toda V: **tautologia**. É o silogismo hipotético ("se $p$ leva a $q$ e $q$ leva a $r$, então $p$ leva a $r$") virando fórmula. Observe que a única linha em que a implicação maior poderia falhar seria uma com o bloco $(p\to q)\land(q\to r)$ em V e $p\to r$ em F, e essa linha **não existe**.

> [!TIP]
> **Não precisa preencher a fórmula inteira de uma vez.** Preencha uma coluna por vez, sempre usando só as colunas já prontas. Se errar uma coluna do meio, o erro se espalha, então confira cada coluna antes de seguir.

## 7. Classificando fórmulas

Olhe a **última coluna** da tabela:

| Última coluna | Nome | Satisfazível? | Falsificável? |
| --- | --- | --- | --- |
| **Toda V** | **Tautologia** (ou **válida**), $\models\varphi$ | sim | não |
| **Mistura de V e F** | **Contingência** | sim | sim |
| **Toda F** | **Contradição** (ou **insatisfazível**) | não | sim |

Definições, em português claro:

- **Satisfazível:** existe **pelo menos uma** linha V (pelo menos um modelo).
- **Falsificável:** existe **pelo menos uma** linha F.
- **Válida (tautologia):** **todas** as linhas V. "Sempre verdadeira, não importa o mundo."
- **Insatisfazível (contradição):** **todas** as linhas F.

Duas consequências úteis: **toda tautologia é satisfazível** e **toda contradição é falsificável**.

**Exemplos famosos:**

| Fórmula | Tabela | Classe |
| --- | --- | --- |
| $p\lor\neg p$ ("terceiro excluído") | V, V | Tautologia |
| $p\land\neg p$ | F, F | Contradição |
| $p\land(q\lor r)$ | V,V,V,F,F,F,F,F (8 linhas) | Contingência |

E uma tautologia simpática: $(j\to w)\lor(w\to j)$ ("sempre um dos dois implica o outro"):

| $j$ | $w$ | $j\to w$ | $w\to j$ | **fórmula** |
| --- | --- | --- | --- | --- |
| V | V | V | V | V |
| V | F | F | V | V |
| F | V | V | F | V |
| F | F | V | V | V |

### Relação entre válida e satisfazível

$$
\varphi\text{ é válida}\iff\neg\varphi\text{ é insatisfazível}
$$
$$
\varphi\text{ é satisfazível}\iff\neg\varphi\text{ é falsificável}
$$

Em palavras: se "$\varphi$ é sempre V", então "o contrário de $\varphi$ nunca é V". Guarde isso: será a base dos próximos métodos.

## 8. Consequência lógica (vinculação semântica)

Aqui voltamos aos **argumentos**:

> $\varphi_1,\ldots,\varphi_n\models\psi$ significa: **em toda interpretação que torna *todas* as premissas verdadeiras, a conclusão também é verdadeira.**

**Como testar:** monte a tabela com premissas e conclusão e procure um **contra-exemplo**: uma linha em que **todas as premissas são V e a conclusão é F**. Se achar, o argumento é **inválido**. Se não achar, é **válido**.

**Exemplo 1.** $p\lor q\to r\ \models\ p\to r$

| $p$ | $q$ | $r$ | $(p\lor q)\to r$ | $p\to r$ |
| --- | --- | --- | --- | --- |
| V | V | V | V | V |
| V | V | F | F | F |
| V | F | V | V | V |
| V | F | F | F | F |
| F | V | V | V | V |
| F | V | F | F | V |
| F | F | V | V | V |
| F | F | F | V | V |

Nas linhas em que a premissa é V (1ª, 3ª, 5ª, 7ª e 8ª), a conclusão também é V. **Válido.**

**Exemplo 2.** $p\land q\to r\ \models\ p\to r$. Na linha $p=V,q=F,r=F$: a premissa é $(V\land F)\to F=F\to F=V$, mas a conclusão é $V\to F=F$. **Contra-exemplo, logo inválido.**

### Argumentos famosos (e as falácias que parecem com eles)

Alguns formatos aparecem tanto que ganharam nome. Todos podem ser conferidos com uma tabela:

| Nome | Forma | Exemplo | Válido? |
| --- | --- | --- | --- |
| **Modus ponens** | $p\to q,\ p\models q$ | Se chove, a rua molha. Choveu. Logo, a rua molhou. | **Sim** |
| **Modus tollens** | $p\to q,\ \neg q\models\neg p$ | Se o servidor está de pé, responde ao ping. Não responde. Logo, não está de pé. | **Sim** |
| **Silogismo hipotético** | $p\to q,\ q\to r\models p\to r$ | Se estudo, passo. Se passo, me formo. Logo, se estudo, me formo. | **Sim** |
| **Silogismo disjuntivo** | $p\lor q,\ \neg p\models q$ | O bug está no front ou no back. Não está no front. Logo, está no back. | **Sim** |
| **Prova por casos** | $p\lor q,\ p\to r,\ q\to r\models r$ | Ou é par ou é ímpar; nos dois casos o programa termina. Logo, termina. | **Sim** |
| *Afirmação do consequente* | $p\to q,\ q\models p$ | Se chove, a rua molha. A rua molhou. Logo, choveu. | **Não** |
| *Negação do antecedente* | $p\to q,\ \neg p\models\neg q$ | Se chove, a rua molha. Não choveu. Logo, a rua não molhou. | **Não** |

As duas últimas são as **falácias** clássicas: parecem o modus ponens e o modus tollens "espelhados", mas não valem. O contra-exemplo é o mesmo para as duas: $p=F$ e $q=V$ (a rua molhou por outro motivo, como um caminhão-pipa).

> [!TIP]
> **Dois jeitos de usar um "se":** confirmar a condição (modus ponens) ou negar a conclusão (modus tollens). Qualquer outra tentativa de "virar a seta" é suspeita.

### Truque: transformar argumento em fórmula

$$
\varphi_1,\ldots,\varphi_n\models\psi\iff\ \models\ \varphi_1\to(\varphi_2\to(\cdots(\varphi_n\to\psi)\cdots))
$$

O argumento é válido **se, e somente se, essa fórmula é uma tautologia**. Também vale a versão com conjunção, $(\varphi_1\land\cdots\land\varphi_n)\to\psi$, que é equivalente. (Ex.: o argumento do Swing vira $((s\land\neg i\to\neg c)\land c\land s)\to i$.) Assim, toda a questão de validade de argumentos cai em **"essa fórmula é tautologia?"**.

## 9. Equivalência

Duas fórmulas são **equivalentes** ($\varphi\equiv\psi$) quando têm **a mesma coluna** na tabela, ou seja, $(\varphi\leftrightarrow\psi)$ é tautologia. Equivalentes são "a mesma coisa escrita de outro jeito", e podem ser trocadas livremente.

| Lei | Equivalência |
| --- | --- |
| Dupla negação | $\neg\neg p\equiv p$ |
| Idempotência | $p\land p\equiv p$, $\ p\lor p\equiv p$ |
| Comutatividade | $p\land q\equiv q\land p$, $\ p\lor q\equiv q\lor p$ |
| Associatividade | $(p\land q)\land r\equiv p\land(q\land r)$ (idem para $\lor$) |
| Distributividade | $p\land(q\lor r)\equiv(p\land q)\lor(p\land r)$ e $p\lor(q\land r)\equiv(p\lor q)\land(p\lor r)$ |
| **De Morgan** | $\neg(p\land q)\equiv\neg p\lor\neg q$ e $\neg(p\lor q)\equiv\neg p\land\neg q$ |
| Absorção | $p\lor(p\land q)\equiv p$, $\ p\land(p\lor q)\equiv p$ |
| Negação | $p\lor\neg p\equiv V$, $\ p\land\neg p\equiv F$ |
| Identidade | $p\land V\equiv p$, $\ p\lor F\equiv p$ |
| Dominação | $p\lor V\equiv V$, $\ p\land F\equiv F$ |

**Equivalências com implicação** (as mais usadas na prática):

| Equivalência | Nome / uso |
| --- | --- |
| $p\to q\equiv\neg p\lor q$ | elimina a seta |
| $p\to q\equiv\neg q\to\neg p$ | **contrapositiva** |
| $p\lor q\equiv\neg p\to q$ | ou vira se |
| $\neg(p\to q)\equiv p\land\neg q$ | negar a promessa $=$ cumprir a condição e falhar |
| $p\leftrightarrow q\equiv(p\to q)\land(q\to p)$ | desmonta o "se e somente se" |
| $(p\land q)\to r\equiv p\to(q\to r)$ | **exportação** (premissas em fila) |
| $(p\to q)\land(p\to r)\equiv p\to(q\land r)$ | mesma condição, duas consequências |
| $(p\to r)\land(q\to r)\equiv(p\lor q)\to r$ | duas condições, mesma consequência |
| $(p\to q)\lor(p\to r)\equiv p\to(q\lor r)$ | |
| $(p\to r)\lor(q\to r)\equiv(p\land q)\to r$ | |
| $p\leftrightarrow q\equiv(p\land q)\lor(\neg p\land\neg q)$ | "os dois V ou os dois F" |
| $p\oplus q\equiv\neg(p\leftrightarrow q)\equiv(p\lor q)\land\neg(p\land q)$ | "um dos dois, mas não ambos" |

> [!TIP]
> **De Morgan em palavras:** "não (A e B)" $=$ "não A **ou** não B". Para negar uma conjunção/disjunção, **nega cada parte e troca $\land\leftrightarrow\lor$**. Em código: `!(a && b)` é `!a || !b`.

> [!WARNING]
> **A implicação não é associativa:** $p\to(q\to r)\not\equiv(p\to q)\to r$. Com $p=F$, $q=V$, $r=F$, a primeira é V e a segunda é F. Por isso a precedência (a implicação associa à direita) importa.

### Não confunda $\to$, $\leftrightarrow$, $\models$ e $\equiv$

Os quatro símbolos são parecidos, mas vivem em andares diferentes:

| Símbolo | O que é | Exemplo | Tem valor V ou F? |
| --- | --- | --- | --- |
| $\to$ | **conectivo**: parte de uma fórmula | $p\to q$ | **depende** da interpretação |
| $\leftrightarrow$ | **conectivo**: parte de uma fórmula | $p\leftrightarrow q$ | **depende** da interpretação |
| $\models$ | **afirmação sobre fórmulas**: "em toda interpretação em que as premissas são V, a conclusão é V" | $p,\ p\to q\models q$ | é verdadeira ou falsa **de uma vez por todas** |
| $\equiv$ | **afirmação sobre fórmulas**: "têm sempre o mesmo valor" | $p\to q\equiv\neg p\lor q$ | é verdadeira ou falsa **de uma vez por todas** |

Os dois pares se ligam assim:

$$
\varphi\models\psi\iff\ \models\varphi\to\psi
\qquad\text{e}\qquad
\varphi\equiv\psi\iff\ \models\varphi\leftrightarrow\psi
$$

Ou seja: **$\to$ e $\leftrightarrow$ são fórmulas, e $\models$ e $\equiv$ dizem que essas fórmulas são tautologias.** Escrever "$p\to q$" não afirma nada: apenas monta uma fórmula que, numa interpretação, pode ser V ou F. Escrever "$p\models q$" **afirma** que não existe interpretação com $p$ V e $q$ F.

**Voltando ao código:** $p\lor(\neg p\land q)\equiv p\lor q$. Confira na tabela: quando $p$ é V, os dois lados são V; quando $p$ é F, o lado esquerdo vira $q$ e o direito também. Por isso `if (x>0 || (x<=0 && y>100))` pode ser reescrito como `if (x>0 || y>100)`.

## 10. Atalho: caçar o contra-exemplo direto

Para testar um argumento, não precisamos ver as $2^n$ linhas. Só queremos saber se **existe uma** linha ruim: premissas V e conclusão F. Dá para procurar essa linha **de trás para frente**:

1. Escreva o que você quer: **cada premissa V e a conclusão F**.
2. Comece pelo que é **forçado** (por exemplo, "conclusão $p$ é F" já fixa $p=F$).
3. Propague os valores pelas outras fórmulas.
4. Se aparecer uma **contradição** (uma letra tendo que ser V e F ao mesmo tempo), não há contra-exemplo: **válido**. Se sobrar um mundo consistente, ele **é** o contra-exemplo: **inválido**.

**Exemplo 1 (inválido).** $p\to q,\ q\models p$. Conclusão F: $p=F$. Premissa $q$ V: $q=V$. Premissa $p\to q$: $F\to V=V$, que é o que queríamos. Nenhuma contradição, então $p=F,q=V$ é um **contra-exemplo**.

**Exemplo 2 (válido).** $p\to q,\ \neg q\models\neg p$. Conclusão F: $\neg p=F$, logo $p=V$. Premissa $\neg q$ V: $q=F$. Premissa $p\to q$ precisa ser V, mas $V\to F=F$. **Contradição**, então não existe contra-exemplo: **válido**.

**Exemplo 3 (válido).** $p\lor q,\ p\to r,\ q\to r\models r$. Conclusão F: $r=F$. Em $p\to r$ (V) com $r=F$, só dá certo se $p=F$. Em $q\to r$ (V), $q=F$. Mas aí $p\lor q$ é $F\lor F=F$, e ela precisava ser V. **Contradição**: válido.

Quando há **escolha** (por exemplo, $p\lor q$ V não diz *qual* dos dois é V), é preciso testar as duas opções, e o raciocínio vira uma **árvore**. É exatamente isso que o tableaux, na próxima página, faz de modo sistemático.

## 11. O ponto fraco da tabela

A tabela tem $2^n$ linhas. Com 20 letras já são mais de **1 milhão** de linhas; com 30, mais de **1 bilhão**; com 60, mais de $10^{18}$, algo inviável na prática mesmo para um computador rápido. Nas próximas páginas veremos métodos mais **inteligentes** (tableaux e forma normal), que muitas vezes evitam percorrer tudo.

## Resumo

- **Interpretação:** valores V/F para as letras. **Modelo:** interpretação que torna a fórmula V.
- **Tautologia:** sempre V. **Contradição:** sempre F. **Contingência:** depende. **Satisfazível:** pelo menos um V.
- **$\varphi_1..\varphi_n\models\psi$:** não existe linha com premissas V e conclusão F.
- **Equivalentes:** mesma coluna. Dominar De Morgan e $p\to q\equiv\neg p\lor q$ já resolve muito.
- **Modus ponens** e **modus tollens** são válidos. **Afirmar o consequente** e **negar o antecedente** são falácias.
- $\to$ e $\leftrightarrow$ são **fórmulas**; $\models$ e $\equiv$ são **afirmações** de que algo vale em todas as interpretações.
- **Atalho:** para testar um argumento, force "premissas V, conclusão F" e propague; contradição $\Rightarrow$ válido.

## Exercícios

**Exercício 1.** Classifique cada fórmula como tautologia, contradição ou contingência. Responda direto na tela: depois de cada resposta aparece a explicação.

{{< quiz titulo="classificar fórmulas" >}}

{{< questao >}}
**(a)** $(p\to q)\to(q\to p)$ é...

- [ ] Tautologia
- [ ] Contradição
- [x] Contingência
---
Falsa em $p=F,q=V$ (aí $p\to q$ é V e $q\to p$ é F); verdadeira em $p=q=V$. Tem V e F na última coluna.
{{< /questao >}}

{{< questao >}}
**(b)** $(p\land\neg p)\to q$ é...

- [x] Tautologia
- [ ] Contradição
- [ ] Contingência
---
O antecedente $p\land\neg p$ é sempre F, então a implicação é sempre V.
{{< /questao >}}

{{< questao >}}
**(c)** $p\to q\to p\land q$ é...

- [x] Tautologia
- [ ] Contradição
- [ ] Contingência
---
Com a precedência usual, é $p\to(q\to p\land q)$: se $p$ e $q$ são V, $p\land q$ também é, e a implicação interna nunca falha.
{{< /questao >}}

{{< questao >}}
**(d)** $p\to\neg\neg p$ é...

- [x] Tautologia
- [ ] Contradição
- [ ] Contingência
---
Dupla negação: $\neg\neg p\equiv p$, então a fórmula é $p\to p$.
{{< /questao >}}

{{< questao >}}
**(e)** $\neg(p\lor q\to p)$ é...

- [ ] Tautologia
- [ ] Contradição
- [x] Contingência
---
$p\lor q\to p\equiv q\to p$, cuja negação é $q\land\neg p$. Ela é V só em $p=F,q=V$: tem V e F.
{{< /questao >}}

{{< questao >}}
**(f)** $\neg(p\to p\lor q)$ é...

- [ ] Tautologia
- [x] Contradição
- [ ] Contingência
---
$p\to p\lor q$ é tautologia, então a sua negação nunca é V.
{{< /questao >}}

{{< questao >}}
**(g)** $((p\to q)\land(r\to q))\to(p\lor r\to q)$ é...

- [x] Tautologia
- [ ] Contradição
- [ ] Contingência
---
Pela tabela de equivalências, $(p\to q)\land(r\to q)\equiv(p\lor r)\to q$. A fórmula fica "$X\to X$", sempre V.
{{< /questao >}}

{{< /quiz >}}

**Exercício 2.** Prove ou refute cada consequência lógica (procure um contra-exemplo).

{{< quiz titulo="consequência lógica" >}}

{{< questao >}}
**(a)** $\neg q\to\neg p\ \models\ p\to q$

- [x] Vale
- [ ] Não vale
---
É a contrapositiva: $\neg q\to\neg p\equiv p\to q$.
{{< /questao >}}

{{< questao >}}
**(b)** $\neg p\to\neg q\ \models\ p\to q$

- [ ] Vale
- [x] Não vale
---
Contra-exemplo: $p=V,q=F$. A premissa é $F\to V=V$, mas a conclusão é $V\to F=F$.
{{< /questao >}}

{{< questao >}}
**(c)** $p\to q\ \models\ p\to q\lor r$

- [x] Vale
- [ ] Não vale
---
Se $q$ é V, então $q\lor r$ também é V.
{{< /questao >}}

{{< questao >}}
**(d)** $p\to q\ \models\ p\to q\land r$

- [ ] Vale
- [x] Não vale
---
Contra-exemplo: $p=V,q=V,r=F$. A premissa é V, mas a conclusão é $V\to(V\land F)=F$.
{{< /questao >}}

{{< questao >}}
**(e)** $\neg(p\land q)\ \models\ \neg p\land\neg q$

- [ ] Vale
- [x] Não vale
---
Contra-exemplo: $p=V,q=F$. A premissa é $\neg(F)=V$, mas a conclusão é $F\land V=F$. (De Morgan troca o conectivo: $\neg(p\land q)\equiv\neg p\lor\neg q$.)
{{< /questao >}}

{{< questao >}}
**(f)** $\neg(p\lor q)\ \models\ \neg p\lor\neg q$

- [x] Vale
- [ ] Não vale
---
$\neg(p\lor q)\equiv\neg p\land\neg q$, e uma conjunção sempre implica a disjunção dos mesmos lados.
{{< /questao >}}

{{< /quiz >}}

**Exercício 3.** Verifique cada consequência:\
(A) $p\land q\models p$\
(B) $p\lor q\models p$\
(C) $\neg q,\ p\lor q\models p$

{{< details title="Gabarito" >}}
(A) **Vale** (se os dois são V, $p$ é V).\
(B) **Não vale**: $p=F,q=V$.\
(C) **Vale**: com $q$ falso, $p\lor q$ só é V se $p$ for V (silogismo disjuntivo).
{{< /details >}}

**Exercício 4.** Monte a tabela de $p\to(q\to p)$ e classifique.

{{< details title="Gabarito" >}}
| $p$ | $q$ | $q\to p$ | $p\to(q\to p)$ |
| --- | --- | --- | --- |
| V | V | V | V |
| V | F | V | V |
| F | V | F | V |
| F | F | V | V |

Coluna toda V: **tautologia**.
{{< /details >}}

**Exercício 5.** Monte a tabela de $(p\lor q)\land\neg r$ e diga em quais linhas a fórmula é V.

{{< details title="Gabarito" >}}
| $p$ | $q$ | $r$ | $p\lor q$ | $\neg r$ | **fórmula** |
| --- | --- | --- | --- | --- | --- |
| V | V | V | V | F | **F** |
| V | V | F | V | V | **V** |
| V | F | V | V | F | **F** |
| V | F | F | V | V | **V** |
| F | V | V | V | F | **F** |
| F | V | F | V | V | **V** |
| F | F | V | F | F | **F** |
| F | F | F | F | V | **F** |

É V em três linhas ($VVF$, $VFF$, $FVF$), que são os **modelos** da fórmula. Tem V e F: **contingência**.
{{< /details >}}

**Exercício 6.** Use o atalho (forçar premissas V e conclusão F) para decidir: $p\land q\to r,\ \neg r\models\neg p\land\neg q$.

{{< details title="Gabarito" >}}
Conclusão F: $\neg p\land\neg q=F$, isto é, $p$ ou $q$ é V. Premissa $\neg r$ V: $r=F$. Premissa $p\land q\to r$ V com $r=F$: precisa de $p\land q=F$. Dá para ter isso com $p=V,q=F$ (ou $p=F,q=V$), e aí $p$ ou $q$ é V, como a conclusão F exige. Sem contradição: **inválido**, com contra-exemplo $p=V,q=F,r=F$. (Intuição: "não passou em tudo" não obriga a ter falhado em tudo.)
{{< /details >}}

**Exercício 7.** Dê o nome do argumento e diga se é válido: *"Se o teste passou, o build está verde. O build está verde. Logo, o teste passou."*

{{< quiz titulo="nome do argumento" >}}
{{< questao fixa="true" >}}
*"Se o teste passou, o build está verde. O build está verde. Logo, o teste passou."* Este argumento é:

- [ ] Modus ponens, válido
- [ ] Modus tollens, válido
- [x] Afirmação do consequente, inválido
- [ ] Negação do antecedente, inválido
---
Com $t$: o teste passou e $b$: o build está verde, é $t\to b,\ b\models t$. Afirma o consequente. Contra-exemplo: $t=F,b=V$ (o build pode estar verde por outro motivo).
{{< /questao >}}
{{< /quiz >}}

### Mais treino

Aqui pode haver **mais de uma** alternativa certa: marque todas e clique em *verificar*.

{{< quiz titulo="mais treino" modo="lista" embaralhar="true" >}}

{{< questao fixa="true" >}}
A coluna final da tabela de uma fórmula com $p$ e $q$ é V, F, F, V:

| $p$ | $q$ | fórmula |
| --- | --- | --- |
| V | V | V |
| V | F | F |
| F | V | F |
| F | F | V |

Qual fórmula tem essa coluna?

- [x] $p\leftrightarrow q$
      (V quando os dois têm o mesmo valor)
- [ ] $p\oplus q$
      (V quando os dois têm valores diferentes)
- [ ] $p\to q$
      (F só quando $p$ é V e $q$ é F)
- [ ] $p\land q$
      (V só quando os dois são V)
---
Os dois extremos (VV e FF) dão V: os valores são iguais. Isso é o $\leftrightarrow$. O $\oplus$ daria exatamente a coluna oposta (F, V, V, F).
{{< /questao >}}

{{< questao >}}
Marque **todas** as fórmulas que são tautologias.

- [x] $p\lor\neg p$
- [ ] $p\land\neg p$
- [x] $p\to p$
- [ ] $p\to\neg p$
- [x] $(p\land q)\to p$
---
$p\lor\neg p$ (terceiro excluído), $p\to p$ e $(p\land q)\to p$ são sempre V. Já $p\land\neg p$ é contradição, e $p\to\neg p$ é contingência (equivale a $\neg p$: F com $p=V$, V com $p=F$).
{{< /questao >}}

{{< questao >}}
Marque **todas** as fórmulas equivalentes a $p\to q$.

- [x] $\neg p\lor q$
- [x] $\neg q\to\neg p$
- [ ] $q\to p$
- [ ] $p\land\neg q$
- [x] $\neg(p\land\neg q)$
---
$\neg p\lor q$ é "elimina a seta"; $\neg q\to\neg p$ é a contrapositiva; $\neg(p\land\neg q)$ vira $\neg p\lor q$ por De Morgan. Já $q\to p$ é a **recíproca** (não é equivalente) e $p\land\neg q$ é a **negação** de $p\to q$.
{{< /questao >}}

{{< questao >}}
Marque **todas** as interpretações que são **modelo** de $(p\lor q)\land\neg r$.

- [x] $p=V,\ q=F,\ r=F$
- [x] $p=F,\ q=V,\ r=F$
- [ ] $p=V,\ q=V,\ r=V$
- [ ] $p=F,\ q=F,\ r=F$
- [x] $p=V,\ q=V,\ r=F$
---
$\neg r$ exige $r=F$, e $p\lor q$ exige pelo menos um V. Por isso $p=q=F$ falha no $\lor$, e $r=V$ falha no $\neg r$.
{{< /questao >}}

{{< /quiz >}}
