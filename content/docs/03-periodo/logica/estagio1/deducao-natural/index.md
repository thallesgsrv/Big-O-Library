---
title: Dedução Natural
weight: 9
description: Provas formais com regras de introdução e eliminação, hipóteses temporárias e estratégias para achar a prova.
autores:
  - thallesgsrv
date: 2026-10-21
---

## Sobre

A prova axiomática é elegante, mas ninguém raciocina assim. A **dedução natural** faz o contrário: **sem axiomas**, só regras que imitam o que fazemos de cabeça. "Sei $p$ e sei $q$, então sei $p\land q$." "Vou **supor** $p$ e ver aonde chego."

A ideia: **a partir das premissas, chegar à conclusão** aplicando regras de inferência, linha por linha.

Ao final você deve conseguir:

- aplicar as regras de **introdução** e **eliminação** de $\land,\lor,\to,\neg$ e $\bot$;
- usar **hipóteses temporárias** (caixas) e saber quando elas "fecham";
- ler e montar uma prova completa, com justificativa em cada linha;
- escolher a regra certa olhando para a **conclusão** e para as **premissas**.

## 1. Como uma prova se parece

```
1  premissa 1      premissa
2  premissa 2      premissa
3  ...             regra, linhas usadas
...
n  conclusão       regra, linhas usadas
```

Cada linha traz **uma fórmula** e **uma justificativa**: ou é premissa, ou é hipótese, ou saiu de linhas anteriores por alguma regra. Escrevemos $\varphi_1,\ldots,\varphi_n\vdash\psi$ para "existe uma prova de $\psi$ a partir das premissas".

Para cada conectivo há duas famílias de regras:

- **Introdução** ($i$): ensina a **construir** uma fórmula com aquele conectivo.
- **Eliminação** ($e$): ensina a **usar** uma fórmula com aquele conectivo.

## 2. Conjunção ($\land$)

$$
\frac{\varphi\qquad\psi}{\varphi\land\psi}\ {\land}i
\qquad\qquad
\frac{\varphi\land\psi}{\varphi}\ {\land}e_1
\qquad\qquad
\frac{\varphi\land\psi}{\psi}\ {\land}e_2
$$

- **$\land i$:** tenho as duas, junto as duas.
- **$\land e_1,\land e_2$:** tenho a conjunção, posso pegar o lado esquerdo ou o direito.

**Exemplo.** $d\land c,\ p\ \vdash\ c\land p$

- $d$: o programa calcula o número de disciplinas cursadas.
- $c$: o programa calcula o CRE do aluno.
- $p$: o programa foi feito em Python.

```
1  d ∧ c       premissa
2  p           premissa
3  c           ∧e2 1
4  c ∧ p       ∧i 3, 2
```

## 3. Dupla negação ($\neg\neg$)

$$
\frac{\varphi}{\neg\neg\varphi}\ {\neg\neg}i
\qquad\qquad
\frac{\neg\neg\varphi}{\varphi}\ {\neg\neg}e
$$

Duas negações se cancelam, e podem ser adicionadas ou removidas.

**Exemplo.** $p,\ \neg\neg(c\land d)\ \vdash\ \neg\neg p\land c$

```
1  p               premissa
2  ¬¬(c ∧ d)       premissa
3  ¬¬p             ¬¬i 1
4  c ∧ d           ¬¬e 2
5  c               ∧e1 4
6  ¬¬p ∧ c         ∧i 3, 5
```

## 4. Implicação ($\to$)

### Eliminação: Modus Ponens e Modus Tollens

$$
\frac{\varphi\qquad\varphi\to\psi}{\psi}\ {\to}e
\qquad\qquad
\frac{\varphi\to\psi\qquad\neg\psi}{\neg\varphi}\ \text{MT}
$$

- **$\to e$ (MP):** se vale $\varphi$ e vale "$\varphi$ leva a $\psi$", vale $\psi$.
- **MT:** se $\varphi$ levaria a $\psi$, mas $\psi$ **não** vale, então $\varphi$ não vale.

**Exemplo ($\to e$).** $i\to(n\to q),\ i\to n,\ i\ \vdash\ q$

- $i$: acesso a índice inválido; $n$: lança `NullPointerException`; $q$: o programa quebra.

```
1  i → (n → q)     premissa
2  i → n           premissa
3  i               premissa
4  n → q           →e 1, 3
5  n               →e 2, 3
6  q               →e 4, 5
```

**Exemplo (MT).** $a\to(i\to n),\ a,\ \neg n\ \vdash\ \neg i$

```
1  a → (i → n)     premissa
2  a               premissa
3  ¬n              premissa
4  i → n           →e 1, 2
5  ¬i              MT 4, 3
```

### Introdução: hipóteses temporárias

Como provar "$\varphi\to\psi$"? Do jeito que fazemos na vida: **supomos** $\varphi$ **só para ver** se chegamos a $\psi$. Se chegarmos, o "se... então" está provado, **e a suposição some**.

$$
\frac{\begin{array}{c}[\varphi]\\\vdots\\\psi\end{array}}{\varphi\to\psi}\ {\to}i
$$

Na prova, a suposição é uma linha com justificativa **hipótese**, e as linhas que dependem dela formam uma **caixa** (indicada aqui com recuo). A regra $\to i$ cita o **intervalo** da caixa.

**Exemplo.** $p\to q\ \vdash\ \neg q\to\neg p$ (a **contrapositiva**)

```
1  p → q           premissa
2  │ ¬q            hipótese
3  │ ¬p            MT 1, 2
4  ¬q → ¬p         →i 2-3
```

> [!IMPORTANT]
> **Regra da caixa.** Dentro da caixa você pode usar **tudo** que está fora (acima). Depois que a caixa fecha, as linhas de dentro **não podem mais ser citadas**: elas só valem "sob a suposição". Só a fórmula final ($\varphi\to\psi$), que está do lado de fora, pode ser usada.

**Exemplo.** $\neg j\to\neg c\ \vdash\ c\to\neg\neg j$

```
1  ¬j → ¬c         premissa
2  │ c             hipótese
3  │ ¬¬c           ¬¬i 2
4  │ ¬¬j           MT 1, 3
5  c → ¬¬j         →i 2-4
```

**Exemplo.** $m\to i\ \vdash\ (m\land f)\to(i\land f)$

- $m$: chama método de impressão; $i$: algo é impresso; $f$: o programa finaliza.

```
1  m → i                   premissa
2  │ m ∧ f                 hipótese
3  │ m                     ∧e1 2
4  │ f                     ∧e2 2
5  │ i                     →e 1, 3
6  │ i ∧ f                 ∧i 5, 4
7  (m ∧ f) → (i ∧ f)       →i 2-6
```

## 5. Disjunção ($\lor$)

### Introdução

$$
\frac{\varphi}{\varphi\lor\psi}\ {\lor}i_1
\qquad\qquad
\frac{\psi}{\varphi\lor\psi}\ {\lor}i_2
$$

Se já vale um dos lados, a disjunção vale (pode-se acrescentar **qualquer** fórmula do outro lado).

**Exemplo.** $d\land c\ \vdash\ c\lor p$

```
1  d ∧ c       premissa
2  c           ∧e2 1
3  c ∨ p       ∨i1 2
```

### Eliminação: análise de casos

Você tem "$\varphi$ **ou** $\psi$" e não sabe qual vale. Então prova a **mesma** conclusão $\chi$ em **cada** caso (cada um numa caixa com a sua hipótese). Como um dos casos acontece, $\chi$ vale.

$$
\frac{\varphi\lor\psi\qquad\begin{array}{c}[\varphi]\\\vdots\\\chi\end{array}\qquad\begin{array}{c}[\psi]\\\vdots\\\chi\end{array}}{\chi}\ {\lor}e
$$

**Exemplo.** $p\lor q\ \vdash\ q\lor p$

```
1  p ∨ q           premissa
2  │ p             hipótese
3  │ q ∨ p         ∨i2 2
4  │ q             hipótese
5  │ q ∨ p         ∨i1 4
6  q ∨ p           ∨e 1, 2-3, 4-5
```

(As caixas 2-3 e 4-5 são **paralelas**: cada uma só enxerga as linhas anteriores a si, não a outra.)

**Exemplo.** $a\to d\ \vdash\ (z\lor a)\to(z\lor d)$

```
1  a → d                   premissa
2  │ z ∨ a                 hipótese
3  │ │ z                   hipótese
4  │ │ z ∨ d               ∨i1 3
5  │ │ a                   hipótese
6  │ │ d                   →e 1, 5
7  │ │ z ∨ d               ∨i2 6
8  │ z ∨ d                 ∨e 2, 3-4, 5-7
9  (z ∨ a) → (z ∨ d)       →i 2-8
```

Há caixas **dentro** de caixas: a hipótese $z\lor a$ (linhas 2-8) contém duas caixas de casos.

## 6. Contradição ($\bot$) e negação

O símbolo $\bot$ ("absurdo") representa uma **contradição**. As regras:

$$
\frac{\varphi\qquad\neg\varphi}{\bot}\ {\bot}i
\qquad\qquad
\frac{\bot}{\varphi}\ {\bot}e
\qquad\qquad
\frac{\begin{array}{c}[\varphi]\\\vdots\\\bot\end{array}}{\neg\varphi}\ {\neg}i
$$

- **$\bot i$ (inclusão da contradição, também chamada $\neg e$):** se tenho $\varphi$ **e** $\neg\varphi$, tenho absurdo.
- **$\bot e$ (eliminação da contradição):** do absurdo, **qualquer** fórmula $\varphi$ pode ser concluída. ("Ex falso": se a premissa é impossível, tudo "decorre" dela.)
- **$\neg i$ (introdução da negação):** para provar $\neg\varphi$, **suponha** $\varphi$ e chegue no absurdo. Então $\varphi$ não pode valer.

**Exemplo ($\bot e$).** $p\land\neg p\ \vdash\ q$ (de uma contradição, qualquer coisa)

- $p$: o programa é escrito em Java; $q$: o comando `ctrl+alt+del` existe no Linux.

```
1  p ∧ ¬p      premissa
2  p           ∧e1 1
3  ¬p          ∧e2 1
4  ⊥           ⊥i 2, 3
5  q           ⊥e 4
```

**Exemplo.** $\neg p\lor q\ \vdash\ p\to q$

- $p$: o método é executado corretamente; $q$: o método retorna `true`.

```
1  ¬p ∨ q                  premissa
2  │ p                     hipótese
3  │ │ ¬p                  hipótese
4  │ │ ⊥                   ⊥i 2, 3
5  │ │ q                   ⊥e 4
6  │ │ q                   hipótese
7  │ q                     ∨e 1, 3-5, 6-6
8  p → q                   →i 2-7
```

**Exemplo ($\neg i$).** $a\to(v\to z),\ a,\ \neg z\ \vdash\ \neg v$

- $a$: o método recebe um array; $v$: o array é vazio; $z$: o método retorna zero.

```
1  a → (v → z)     premissa
2  a               premissa
3  ¬z              premissa
4  │ v             hipótese
5  │ v → z         →e 1, 2
6  │ z             →e 4, 5   (usa v, que está na hipótese: ok)
7  │ ⊥             ⊥i 3, 6
8  ¬v              ¬i 4-7
```

> [!TIP]
> Com $\neg i$ e $\neg\neg e$ o conjunto de regras fica **sólido e completo** para a lógica proposicional clássica: tudo que é válido tem prova.

## 7. Quadro-resumo das regras

| Conectivo | Introdução | Eliminação |
| --- | --- | --- |
| $\land$ | $\land i$: de $\varphi,\psi$ conclui $\varphi\land\psi$ | $\land e_1$, $\land e_2$: de $\varphi\land\psi$ conclui $\varphi$ (ou $\psi$) |
| $\neg\neg$ | $\neg\neg i$: de $\varphi$ conclui $\neg\neg\varphi$ | $\neg\neg e$: de $\neg\neg\varphi$ conclui $\varphi$ |
| $\to$ | $\to i$: hipótese $\varphi$ $\ldots$ $\psi$ $\Rightarrow$ $\varphi\to\psi$ | $\to e$ (MP): de $\varphi,\varphi\to\psi$ conclui $\psi$. MT: de $\varphi\to\psi,\neg\psi$ conclui $\neg\varphi$ |
| $\lor$ | $\lor i_1$, $\lor i_2$: de $\varphi$ (ou $\psi$) conclui $\varphi\lor\psi$ | $\lor e$: de $\varphi\lor\psi$ e dois casos que chegam em $\chi$, conclui $\chi$ |
| $\bot$ | $\bot i$: de $\varphi,\neg\varphi$ conclui $\bot$ | $\bot e$: de $\bot$ conclui qualquer $\varphi$ |
| $\neg$ | $\neg i$: hipótese $\varphi$ $\ldots$ $\bot$ $\Rightarrow$ $\neg\varphi$ | $\bot i$ (veja acima) |

## 8. Como achar a prova (estratégia)

Provar é quase um jogo de quebra-cabeça. Duas perguntas ajudam sempre:

**1. O que eu quero provar?** Olhe o **conectivo principal da conclusão** e trabalhe "de trás para frente":

| Conclusão é... | Faça |
| --- | --- |
| $\varphi\land\psi$ | prove $\varphi$ e prove $\psi$, depois $\land i$ |
| $\varphi\to\psi$ | abra caixa com **hipótese** $\varphi$, prove $\psi$, feche com $\to i$ |
| $\neg\varphi$ | abra caixa com **hipótese** $\varphi$, chegue em $\bot$, feche com $\neg i$ |
| $\varphi\lor\psi$ | tente provar um dos lados e use $\lor i$; se não der, ver abaixo |

**2. O que eu já tenho?** Olhe as **premissas** e quebre cada uma:

| Premissa é... | Faça |
| --- | --- |
| $\varphi\land\psi$ | separe com $\land e_1$ e $\land e_2$ |
| $\varphi\to\psi$ | procure $\varphi$ para usar $\to e$; ou $\neg\psi$ para MT |
| $\varphi\lor\psi$ | faça **análise de casos** ($\lor e$) com a conclusão desejada em cada caso |
| $\neg\neg\varphi$ | use $\neg\neg e$ |
| $\varphi$ e $\neg\varphi$ | $\bot i$, e daí $\bot e$ para qualquer coisa |

> [!TIP]
> **Se travou:** escreva a conclusão no fim da folha e vá preenchendo de cima para baixo (premissas) **e** de baixo para cima (o que precisaria estar na linha anterior). Quando os dois lados se encontram, a prova está pronta.

## 9. Axiomático × dedução natural × os outros métodos

| Método | Estilo | Quando é melhor |
| --- | --- | --- |
| Tabela-verdade | testa **todos** os mundos | poucas letras (2 ou 3) |
| Tableaux | procura um mundo que **falsifique** | decidir validade/satisfazibilidade mais rápido |
| FNC | converte e confere cláusulas | validade mecânica de fórmulas |
| Axiomático (Hilbert) | poucos axiomas e uma regra | **estudar** propriedades do sistema (solidez, completude) |
| Dedução natural | regras $i$/$e$ e hipóteses | **escrever** e **ler** provas legíveis |

Compare: provar $p\to p$ em Hilbert exige 5 passos (veja o [método axiomático](../metodo-axiomatico/)). Na dedução natural é uma hipótese e fechar a caixa:

```
1  │ p             hipótese
2  p → p           →i 1-1
```

## Erros comuns

- **Usar linha de uma caixa já fechada.** Só vale para quem está dentro dela.
- **Esquecer de fechar a hipótese.** Cada hipótese precisa ser "descarregada" por $\to i$, $\neg i$ ou $\lor e$. Uma hipótese solta não prova nada.
- **MP ao contrário.** De $\psi$ e $\varphi\to\psi$ não se conclui $\varphi$.
- **Em $\lor e$, concluir coisas diferentes nos dois casos.** Os dois casos têm que terminar na **mesma** fórmula $\chi$.
- **Citar linhas erradas.** Sempre confira se os números na justificativa são as fórmulas que a regra pede (e na ordem certa, em MT e $\to e$).
- **$\neg i$ sem chegar em $\bot$.** Basta uma contradição, mas ela precisa aparecer **explicitamente** ($\varphi$ e $\neg\varphi$ na mesma altura da prova).

## Resumo

- Dedução natural: **sem axiomas**, só regras de introdução e eliminação.
- **Hipóteses** abrem caixas; $\to i$, $\neg i$ e $\lor e$ fecham.
- $\land$: construir (i) e separar (e). $\lor$: escolher um lado (i) e analisar casos (e).
- $\to e$ é Modus Ponens; MT usa a negação do consequente.
- $\bot i$ junta $\varphi$ e $\neg\varphi$; $\bot e$ tira qualquer coisa do absurdo; $\neg i$ prova negações por redução ao absurdo.
- Estratégia: olhe o conectivo principal da **conclusão** e quebre as **premissas**.

## Exercícios

**Exercício 1.** $(d\land c)\land p,\ t\land f\ \vdash\ c\land t$

- $d$: calcula o número de disciplinas; $c$: calcula o CRE; $p$: feito em Python; $t$: imprime o histórico na tela; $f$: imprime em papel.

{{< details title="Gabarito" >}}

```
1  (d ∧ c) ∧ p     premissa
2  t ∧ f           premissa
3  d ∧ c           ∧e1 1
4  c               ∧e2 3
5  t               ∧e1 2
6  c ∧ t           ∧i 4, 5
```

{{< /details >}}

**Exercício 2.** $p\land q\ \vdash\ q\land p$

{{< details title="Gabarito" >}}

```
1  p ∧ q       premissa
2  p           ∧e1 1
3  q           ∧e2 1
4  q ∧ p       ∧i 3, 2
```

{{< /details >}}

**Exercício 3.** $p\to q,\ q\to r\ \vdash\ p\to r$ (compare com a prova axiomática de 7 linhas).

{{< details title="Gabarito" >}}

```
1  p → q       premissa
2  q → r       premissa
3  │ p         hipótese
4  │ q         →e 1, 3
5  │ r         →e 2, 4
6  p → r       →i 3-5
```

{{< /details >}}

**Exercício 4.** $p\lor q,\ \neg p\ \vdash\ q$ (silogismo disjuntivo)

{{< details title="Gabarito" >}}

```
1  p ∨ q           premissa
2  ¬p              premissa
3  │ p             hipótese
4  │ ⊥             ⊥i 3, 2
5  │ q             ⊥e 4
6  │ q             hipótese
7  q               ∨e 1, 3-5, 6-6
```

{{< /details >}}

**Exercício 5.** $(p\lor q)\lor r\ \vdash\ p\lor(q\lor r)$

{{< details title="Gabarito" >}}

```
1   (p ∨ q) ∨ r            premissa
2   │ p ∨ q                hipótese
3   │ │ p                  hipótese
4   │ │ p ∨ (q ∨ r)        ∨i1 3
5   │ │ q                  hipótese
6   │ │ q ∨ r              ∨i1 5
7   │ │ p ∨ (q ∨ r)        ∨i2 6
8   │ p ∨ (q ∨ r)          ∨e 2, 3-4, 5-7
9   │ r                    hipótese
10  │ q ∨ r                ∨i2 9
11  │ p ∨ (q ∨ r)          ∨i2 10
12  p ∨ (q ∨ r)            ∨e 1, 2-8, 9-11
```

Note que as duas caixas de casos externas são "$p\lor q$" (linhas 2-8) e "$r$" (linhas 9-11); a primeira tem, dentro, os dois casos de $p\lor q$.
{{< /details >}}

**Exercício 6.** $p\to\neg p\ \vdash\ \neg p$

{{< details title="Gabarito" >}}

```
1  p → ¬p      premissa
2  │ p         hipótese
3  │ ¬p        →e 1, 2
4  │ ⊥         ⊥i 2, 3
5  ¬p          ¬i 2-4
```

Intuição: se $p$ valesse, $p$ implicaria $\neg p$, e teríamos as duas ao mesmo tempo. Absurdo, logo $p$ não vale.
{{< /details >}}

**Exercício 7.** $p\land(q\lor r)\ \vdash\ (p\land q)\lor(p\land r)$ (distributividade)

{{< details title="Gabarito" >}}

```
1  p ∧ (q ∨ r)                 premissa
2  p                           ∧e1 1
3  q ∨ r                       ∧e2 1
4  │ q                         hipótese
5  │ p ∧ q                     ∧i 2, 4
6  │ (p ∧ q) ∨ (p ∧ r)         ∨i1 5
7  │ r                         hipótese
8  │ p ∧ r                     ∧i 2, 7
9  │ (p ∧ q) ∨ (p ∧ r)         ∨i2 8
10 (p ∧ q) ∨ (p ∧ r)           ∨e 3, 4-6, 7-9
```

{{< /details >}}

**Exercício 8.** Encontre o erro nesta "prova" de $p\to q\ \vdash\ q$:

```
1  p → q       premissa
2  │ p         hipótese
3  │ q         →e 1, 2
4  p → q       →i 2-3
5  q           repetição da linha 3
```

{{< details title="Gabarito" >}}
A linha 5 cita a linha 3, que está **dentro da caixa** já fechada (a que supõe $p$). Fora da caixa só existe $p\to q$. De fato $p\to q\not\models q$ (contra-exemplo: $p=F$, $q=F$).
{{< /details >}}

{{< quiz titulo="regra certa" modo="lista" >}}

{{< questao fixa="true" >}}
Você tem as linhas **1.** $p\to q$ e **2.** $\neg q$. Qual regra deriva $\neg p$?

- [ ] $\to e$ (Modus Ponens)
- [x] Modus Tollens
- [ ] $\land i$
- [ ] $\lor e$
---
MT: de $\varphi\to\psi$ e $\neg\psi$ conclui $\neg\varphi$. O MP exigiria ter $p$ para chegar em $q$.
{{< /questao >}}

{{< questao fixa="true" >}}
Para provar $\neg\varphi$ com a regra $\neg i$, o que você faz?

- [ ] Supõe $\neg\varphi$ e chega em $\varphi$
- [x] Supõe $\varphi$ e chega em $\bot$
- [ ] Prova $\varphi\to\neg\varphi$ diretamente
- [ ] Usa $\neg\neg e$ duas vezes
---
$\neg i$ é a redução ao absurdo: a hipótese $\varphi$ levou a uma contradição, então $\neg\varphi$.
{{< /questao >}}

{{< questao fixa="true" >}}
Em $\lor e$, o que precisa ser verdade sobre as duas caixas de casos?

- [ ] Elas devem terminar em fórmulas diferentes
- [ ] Elas devem terminar em $\bot$
- [x] Elas devem terminar na **mesma** fórmula
- [ ] A segunda pode usar as linhas da primeira
---
Cada caso é independente e deve chegar na mesma conclusão $\chi$; como um dos casos acontece, $\chi$ vale.
{{< /questao >}}

{{< /quiz >}}
