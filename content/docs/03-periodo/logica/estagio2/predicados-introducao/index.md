---
title: Lógica de Predicados - Introdução
weight: 2
description: Por que a lógica proposicional não basta e quais ingredientes a lógica de predicados acrescenta.
autores:
  - thallesgsrv
baseadoEm:
  - salatiel
date: 2026-11-18
---

## Sobre

Até aqui, cada frase virava uma letra. Isso funciona bem para "se chover, levo guarda-chuva", mas trava em frases do dia a dia de quem programa, como *"todos os programas da turma foram escritos em Java"*. Esta página apresenta os ingredientes novos da **lógica de predicados** (também chamada lógica de primeira ordem).

Ao final você deve conseguir:

- explicar por que a lógica proposicional não consegue provar certos argumentos óbvios;
- identificar **domínio**, **predicados**, **constantes** e **funções** numa frase;
- ler e escrever fórmulas simples com $\forall$ e $\exists$;
- distinguir **termo** (denota um objeto) de **átomo** (vale V ou F);
- evitar os erros mais comuns de quem está começando.

## 1. O limite da lógica proposicional

Pense neste argumento:

> **Premissa:** todos os programas da turma foram escritos em Java.
> **Conclusão:** o programa deste aluno da turma foi escrito em Java.

É óbvio que a conclusão segue da premissa. Só que, na lógica proposicional, o máximo que temos é:

- $j$ = "todos os programas da turma foram escritos em Java"
- $a$ = "o programa deste aluno foi escrito em Java"

Para a lógica proposicional, $j$ e $a$ são **duas letras sem relação nenhuma**. Ela não enxerga que $a$ é um "caso particular" de $j$. Então $j\models a$ **não é válido** em proposicional, mesmo sendo um raciocínio perfeito.

A lógica proposicional trabalha só com **proposições** e **conectivos**. Faltam três coisas:

| O que falta | Exemplo |
| --- | --- |
| **Quantificação** | "todos", "alguém", "nenhum" |
| **Domínio** | "todos" quem? Programas? Pessoas? Coisas? |
| **Funções** | "a mãe de João", "o dobro de $x$" |

A lógica de predicados acrescenta exatamente isso.

## 2. Domínio: sobre o que estamos falando?

Compare:

- "Aristóteles é um filósofo"
- "**Alguém** é um filósofo"
- "**Todos** os filósofos são pessoas"

Para a segunda frase fazer sentido, precisamos dizer **entre quem** procuramos esse alguém. Esse conjunto é o **domínio** (ou *universo de discurso*): o conjunto de todos os objetos sobre os quais a fórmula fala.

Pensando em conjuntos, "todos os filósofos são pessoas" é $F\subseteq P$, e "Aristóteles é um filósofo" é $a\in F$.

> [!NOTE]
> O domínio é sempre **não vazio**. Isso vai importar mais tarde, nos tableaux.

## 3. Predicados: o que se diz sobre os objetos

Na gramática, **predicado** é a parte da oração que diz algo sobre o sujeito. Na lógica é igual: um predicado é uma **propriedade** de um objeto.

- $F(x)$: "$x$ é um filósofo"
- $J(x)$: "o programa $x$ foi escrito em Java"

Uma analogia com programação ajuda bastante. Um predicado é uma **função que devolve `boolean`**:

```java
boolean F(Object a) {
    return Filosofos.contains(a);   // a está no conjunto dos filósofos?
}

boolean J(Object a) {
    return Java.contains(a);        // a está no conjunto dos programas em Java?
}
```

Passo a passo:

1. `F` recebe um objeto `a`, que faz o papel da variável $x$.
2. Ela consulta um conjunto (`Filosofos`), que faz o papel da "verdade sobre o mundo".
3. Devolve `true` ou `false`.

A variável $x$ é só um "buraco" que pode ser preenchido por qualquer objeto do domínio: $F(\text{obj}_1)$, $F(\text{obj}_2)$ e assim por diante.

### Predicados com mais de um argumento

Predicados também podem expressar **relações** entre objetos:

| Frase | Predicado |
| --- | --- |
| O programa importa a biblioteca Swing | $I(x,y)$: $x$ importa $y$ |
| Morpheus é pai de Orfeu | $P(x,y)$: $x$ é pai de $y$ |
| João emprestou um livro para Maria | $E(x,y,z)$: $x$ emprestou $y$ para $z$ |
| Carlos leu o livro para seu filho | $L(x,y,z)$: $x$ leu $y$ para $z$ |

O número de argumentos é a **aridade** do predicado:

| Aridade | Nome | Exemplo |
| --- | --- | --- |
| 0 | proposição | $p$ |
| 1 | unário | $F(x)$ |
| 2 | binário | $P(x,y)$ |
| 3 | ternário | $E(x,y,z)$ |

> [!TIP]
> Curiosidade: a letra proposicional $p$ do Estágio 1 é só um predicado de aridade **zero**. A lógica de predicados **contém** a proposicional.

## 4. Constantes e funções: apontando para objetos

Para falar de objetos específicos, damos nomes a eles:

- $j$: João
- $m$: Maria
- $a$: Aristóteles
- $l$: o livro

Esses nomes são **funções de aridade zero**, que a gente chama de **constantes**. Com elas, "João emprestou o livro para Maria" vira $E(j,l,m)$.

Funções com argumentos **devolvem um objeto do domínio** a partir de outros objetos:

| Aridade | Exemplo | Significado |
| --- | --- | --- |
| 0 | $m$ | constante (um objeto fixo) |
| 1 | $p(x)$ | o pai de $x$ |
| 2 | $s(x,y)$ | a soma de $x$ e $y$ |
| 3 | $f(x,y,z)$ | algum objeto calculado de três outros |

> [!IMPORTANT]
> **Predicado devolve V ou F. Função devolve um objeto.** Se você confundir os dois, a fórmula deixa de ser bem formada. "O pai de Ana" é um objeto (função). "Ana é pai de Bia" é uma afirmação (predicado).

## 5. Quantificadores

Para dizer "todos" e "alguém", usamos dois símbolos:

| Símbolo | Nome | Lê-se | Exemplo |
| --- | --- | --- | --- |
| $\forall x$ | universal | para todo $x$ | $\forall x\,J(x)$: todos os programas foram escritos em Java |
| $\exists x$ | existencial | existe um $x$ | $\exists x\,F(x)$: alguém é filósofo |

Num domínio finito, os quantificadores são só abreviações de conjunções e disjunções. Se o domínio é $\{o_1,o_2,o_3\}$:

$$
\forall x\,P(x)\ \equiv\ P(o_1)\land P(o_2)\land P(o_3)
\qquad
\exists x\,P(x)\ \equiv\ P(o_1)\lor P(o_2)\lor P(o_3)
$$

Essa ideia ajuda a **intuir** o que cada quantificador faz: $\forall$ é um "E gigante" e $\exists$ é um "OU gigante". (Num domínio infinito a conta não fecha, mas a intuição continua valendo.)

## 6. Primeiros passos da tradução

Um roteiro de quatro passos que funciona quase sempre:

1. Defina o **domínio**.
2. Identifique o **quantificador** ("todo", "algum", "nenhum", "existe").
3. Identifique o **predicado** (o que está sendo dito).
4. Construa a **expressão**.

### Exemplo: domínio de todas as coisas

Glossário: $J(x)$: $x$ é um jogo; $H(x)$: $x$ foi escrito em Haskell.

| Frase | Fórmula |
| --- | --- |
| Todos os jogos foram escritos em Haskell | $\forall x\,(J(x)\to H(x))$ |
| Existe um jogo que foi escrito em Haskell | $\exists x\,(J(x)\land H(x))$ |
| Nem todos os jogos foram escritos em Haskell | $\neg\forall x\,(J(x)\to H(x))$ |

Repare nos conectivos: com $\forall$ usamos $\to$ e com $\exists$ usamos $\land$.

> [!WARNING]
> **Por que não $\forall x\,(J(x)\land H(x))$?** Porque essa fórmula diz que **todas as coisas do domínio** são jogos *e* foram escritas em Haskell: sua xícara de café incluída. E **por que não $\exists x\,(J(x)\to H(x))$?** Porque basta existir **qualquer coisa que não seja jogo** para a implicação ser verdadeira ("falso implica qualquer coisa"). A fórmula ficaria quase sempre verdadeira e não diria nada sobre jogos.

### Exemplo: domínio de programas de computador

Agora o domínio só tem programas. Glossário: $D(x)$: $x$ é desenvolvedor de software; $I(x,y)$: $x$ importa $y$; $a$: minha API; $G(x)$: $x$ é um jogo; $A(x)$: $x$ foi feito em Java.

| Frase | Fórmula |
| --- | --- |
| Ninguém é desenvolvedor de software | $\neg\exists x\,D(x)$ |
| Nem todos são desenvolvedores de software | $\neg\forall x\,D(x)$ |
| Algum programa importa minha API | $\exists x\,I(x,a)$ |
| Todos os programas que são jogos são feitos em Java | $\forall x\,(G(x)\to A(x))$ |
| Pelo menos um programa que é jogo foi feito em Java | $\exists x\,(G(x)\land A(x))$ |

Note como o domínio mudou o jeito de escrever: dentro do domínio "programas", não precisamos de $\text{Programa}(x)$, porque tudo já é programa.

## 7. Termos, átomos e fórmulas

Para a lógica de predicados, as fórmulas têm uma gramática, como na proposicional. Os blocos são:

| Bloco | Como se forma | Denota | Exemplos |
| --- | --- | --- | --- |
| **Termo** | variável, constante, ou função aplicada a termos | um **objeto** | $x$, $9$, $+(4,8)$, $+(-(8,7),3)$ |
| **Átomo** | predicado aplicado a termos | **V ou F** | $>(+(5,8),3)$, $\neq(-(8,7),3)$, $P(x)$ |
| **Fórmula** | átomos combinados com $\neg,\land,\lor,\to,\leftrightarrow,\forall,\exists$ | **V ou F** | $\forall x\,(P(x)\to Q(x))$ |

Leia $+(4,8)$ como "a soma de 4 e 8": é um termo, ou seja, um objeto (o 12). Já $>(+(5,8),3)$ é "13 é maior que 3": um átomo, que vale V.

Um erro clássico de gramática: $+(>(x,2),3)$ **não** faz sentido. O $>$ devolve V ou F, e a soma pede números.

### Variáveis livres e ligadas

Em $\forall x\,(P(x)\to Q(y))$, a variável $x$ está **ligada** (sob o alcance do $\forall$) e $y$ está **livre**. Uma fórmula sem variáveis livres é uma **sentença**: ela tem um valor V ou F bem definido num modelo. Com variável livre, o valor depende de "quem é $y$".

## Erros comuns

- **Usar $\forall$ com $\land$ para "todo S é P":** $\forall x\,(S(x)\land P(x))$ diz que *tudo* é S e P. O certo é $\forall x\,(S(x)\to P(x))$.
- **Usar $\exists$ com $\to$ para "algum S é P":** vira quase sempre verdadeiro. O certo é $\exists x\,(S(x)\land P(x))$.
- **Confundir função com predicado:** $m(x)$ (a mãe de $x$) devolve um objeto; $M(x,y)$ ("$x$ é mãe de $y$") devolve V ou F.
- **Colocar um átomo dentro de um termo:** $+(>(x,2),3)$ não é bem formado.
- **Esquecer o domínio:** "alguém" muda de sentido conforme o domínio. Diga sempre qual é.

## Resumo

- A lógica proposicional não enxerga o **interior** das frases; a de predicados enxerga.
- **Domínio:** conjunto não vazio de objetos de que a fórmula fala.
- **Predicado:** propriedade ou relação; devolve V ou F. A **aridade** é o número de argumentos.
- **Função:** devolve um **objeto**. **Constante** é função de aridade zero.
- **$\forall$** é um "E gigante" e **$\exists$** é um "OU gigante".
- **Termo** denota objeto; **átomo** vale V ou F.
- Regra de ouro: **$\forall$ com $\to$, $\exists$ com $\land$**.

## Exercícios

**Exercício 1 (revisão de SAT).** Três amigos ($A$, $B$, $C$) querem formar um grupo para um projeto, com as condições: se $A$ participa, $B$ não pode participar; se $B$ participa, $C$ também deve participar; $A$ ou $C$ devem participar, mas não ambos. Modele em FNC e resolva com DPLL.

{{< details title="Gabarito" >}}
Em cláusulas: $\{\neg A\lor\neg B,\ \neg B\lor C,\ A\lor C,\ \neg A\lor\neg C\}$ (o "ou exclusivo" vira $A\lor C$ e $\neg A\lor\neg C$).

Não há unidades, então **decidimos** $A=V$. Simplificando: $\neg A\lor\neg B$ vira $\neg B$; $\neg A\lor\neg C$ vira $\neg C$; $A\lor C$ sai.

**Propagando** $B=F$ e $C=F$: $\neg B\lor C$ sai (pois $\neg B$ é V). Não sobra cláusula.

**Resultado: satisfazível.** Modelo: $A=V,\ B=F,\ C=F$ (só $A$ participa).
{{< /details >}}

**Exercício 2 (revisão de SAT).** Condições: se $A$ participa, $B$ deve participar; se $B$ participa, $C$ não pode participar; $A$ e $C$ devem participar. Resolva com DPLL.

{{< details title="Gabarito" >}}
Em cláusulas: $\{\neg A\lor B,\ \neg B\lor\neg C,\ A,\ C\}$.

Já existem as unidades $A$ e $C$. **Propagando** $A=V$: $\neg A\lor B$ vira $B$. **Propagando** $C=V$: $\neg B\lor\neg C$ vira $\neg B$.

Agora as unidades $\{B\}$ e $\{\neg B\}$ entram em conflito.

**Resultado: insatisfazível**: não existe grupo que respeite as três condições.
{{< /details >}}

**Exercício 3.** Classifique cada expressão como **termo**, **átomo** ou **mal formada**:

a) $+(x,2)$  b) $>(x,2)$  c) $\text{mae}(\text{joao})$  d) $\text{filho}(\text{maria},\text{mae}(\text{maria}))$  e) $+(>(x,2),3)$

{{< details title="Gabarito" >}}
a) **Termo**: função $+$ aplicada a termos; denota um número.
b) **Átomo**: predicado $>$ aplicado a termos; vale V ou F.
c) **Termo**: `mae` é função e devolve um objeto (a mãe de João).
d) **Átomo**: `filho` é predicado e tem dois termos como argumentos (um deles é $\text{mae}(\text{maria})$).
e) **Mal formada**: $>(x,2)$ é V ou F e não pode ser argumento de $+$.
{{< /details >}}

**Exercício 4.** Domínio: pessoas. Glossário: $P(x)$: $x$ programa; $J(x)$: $x$ sabe Java; $O(x)$: $x$ conhece orientação a objetos; $G(x,y)$: $x$ gosta de $y$; $b$: bug. Traduza:

a) Alguma pessoa programa.
b) Toda pessoa que sabe Java conhece orientação a objetos.
c) Nenhuma pessoa que programa gosta de bug.
d) Nem toda pessoa programa.
e) Existe uma pessoa que programa e sabe Java.

{{< details title="Gabarito" >}}
a) $\exists x\,P(x)$

b) $\forall x\,(J(x)\to O(x))$

c) $\forall x\,(P(x)\to\neg G(x,b))$ (ou, equivalente, $\neg\exists x\,(P(x)\land G(x,b))$)

d) $\neg\forall x\,P(x)$

e) $\exists x\,(P(x)\land J(x))$
{{< /details >}}

**Exercício 5.** Teste o que você aprendeu.

{{< quiz titulo="introducao a predicados" >}}

{{< questao >}}
Por que $j\models a$ (com $j$ = "todos os programas da turma são em Java" e $a$ = "este programa é em Java") não é válido na lógica proposicional?

- [ ] Porque o argumento está errado
- [x] Porque $j$ e $a$ são letras independentes; a proposicional não enxerga que $a$ é um caso de $j$
- [ ] Porque a lógica proposicional não tem negação
- [ ] Porque $a$ é falsa
---
O argumento é perfeito, mas a lógica proposicional trata cada frase como uma peça indivisível. Quantificadores e predicados permitem ver a relação entre "todos" e "este".
{{< /questao >}}

{{< questao >}}
Qual a aridade do predicado $E(x,y,z)$: "$x$ emprestou $y$ para $z$"?

- [ ] 1
- [ ] 2
- [x] 3
- [ ] 0
---
A aridade é o número de argumentos. Aridade 0 seria uma proposição simples, como $p$.
{{< /questao >}}

{{< questao >}}
Qual é a diferença entre uma função e um predicado?

- [ ] Nenhuma
- [ ] A função devolve V ou F; o predicado devolve um objeto
- [x] O predicado devolve V ou F; a função devolve um objeto do domínio
- [ ] A função só existe com aridade zero
---
$M(x,y)$ ("$x$ é mãe de $y$") é V ou F. $m(x)$ ("a mãe de $x$") é uma pessoa.
{{< /questao >}}

{{< questao >}}
Qual a tradução de "Todo jogo foi escrito em Haskell"?

- [ ] $\forall x\,(J(x)\land H(x))$
- [x] $\forall x\,(J(x)\to H(x))$
- [ ] $\exists x\,(J(x)\to H(x))$
- [ ] $\exists x\,(J(x)\land H(x))$
---
Com $\forall$ usamos $\to$. A primeira opção diria que tudo é jogo e escrito em Haskell.
{{< /questao >}}

{{< questao >}}
Qual destas expressões é um **termo**?

- [ ] $>(x,3)$
- [ ] $\forall x\,P(x)$
- [x] $+(x,3)$
- [ ] $P(x)\land Q(x)$
---
Termo denota um objeto (um número, no caso). As outras três são átomo ou fórmulas, que valem V ou F.
{{< /questao >}}

{{< /quiz >}}
