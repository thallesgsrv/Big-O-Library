---
title: Método Axiomático
weight: 8
description: Sistemas dedutivos, axiomas, regras de inferência e provas no sistema de Hilbert com implicação e negação.
autores:
  - thallesgsrv
date: 2026-10-21
---

## Sobre

Até aqui, para saber se uma fórmula é válida, olhamos **mundos possíveis** (linhas da tabela, ramos do tableaux). O **método axiomático** faz diferente: escolhemos algumas fórmulas "de confiança" (os **axiomas**), algumas regras de transformação, e provamos novas fórmulas **só encadeando essas regras**, sem nunca mencionar V ou F.

É o jeito mais antigo e mais enxuto de fazer lógica formal: poucos ingredientes, mas provas longas.

Ao final você deve conseguir:

- explicar o que é um sistema dedutivo e o que significam **solidez**, **completude** e **decidibilidade**;
- reconhecer **instâncias** de um axioma (esquema);
- aplicar **Modus Ponens**;
- ler e montar uma **prova axiomática**, com ou sem premissas;
- reescrever $\land,\lor,\leftrightarrow$ usando só $\to$ e $\neg$.

## 1. Sistemas dedutivos

Um **sistema dedutivo** é uma "máquina de provar" com três partes:

1. **Símbolos e regras de formação:** quais fórmulas existem ([Linguagem](../linguagem/)).
2. **Axiomas:** fórmulas aceitas sem prova (nem todo sistema tem; veremos a dedução natural, que não tem).
3. **Regras de inferência:** como produzir fórmulas novas a partir de outras.

Uma **prova formal** é uma lista numerada: cada linha é uma fórmula com uma **justificativa** (axioma, premissa ou regra aplicada a linhas anteriores). A última linha é a conclusão.

```
1. (fórmula)   justificativa
2. (fórmula)   justificativa
...
n. conclusão
```

Escrevemos $\Gamma\vdash\psi$ ("de $\Gamma$ se **deriva** $\psi$") quando existe uma prova assim, e $\vdash\psi$ quando não precisamos de premissas ($\psi$ é um **teorema**).

### O que esperamos de um bom sistema

| Propriedade | Em palavras | Em símbolos |
| --- | --- | --- |
| **Solidez** (*soundness*) | O que o sistema prova é de fato válido. Não prova mentira. | $\Gamma\vdash\psi\ \Rightarrow\ \Gamma\models\psi$ |
| **Completude** | Tudo que é válido o sistema consegue provar. Não deixa verdade de fora. | $\Gamma\models\psi\ \Rightarrow\ \Gamma\vdash\psi$ |
| **Decidibilidade** | Existe um algoritmo que, em passos finitos, diz se uma fórmula é tautologia (ou se um argumento é válido). | |

Para a lógica proposicional, os sistemas deste estágio são **sólidos e completos**: $\vdash$ e $\models$ dizem exatamente a mesma coisa, só por caminhos diferentes. E a lógica proposicional é **decidível** (a tabela-verdade é o algoritmo).

> [!NOTE]
> **Cuidado com a palavra "sólido/correto".** Na [página de conceitos](../conceitos/), "argumento correto" significa válido **e** com premissas realmente verdadeiras. Aqui, "solidez" é uma propriedade do **sistema de prova**. São usos diferentes da mesma palavra.

## 2. Axiomas e regras de inferência

### Axioma = esquema de fórmula

Um axioma é uma fórmula que já sabemos ser válida no sistema. Na prática, é um **molde** com letras gregas ($\alpha,\beta,\gamma$) que podem ser trocadas por **qualquer fórmula**.

$$
\alpha\to(\beta\to\alpha)
$$

Trocando $\alpha=\neg p$ e $\beta=q$, obtemos a **instância**:

$$
\neg p\to(q\to\neg p)
$$

> [!IMPORTANT]
> A troca é **uniforme**: o mesmo $\alpha$ vira a mesma fórmula em **todos** os lugares onde aparece. Em $\alpha\to(\beta\to\alpha)$, os dois $\alpha$ precisam virar a mesma coisa. Já $\alpha$ e $\beta$ podem virar fórmulas iguais ou diferentes.

### Regra de inferência = transformação sintática segura

É uma regra que olha só para a **forma** das fórmulas. O exemplo clássico é o **Modus Ponens** (MP):

$$
\frac{\alpha\qquad\alpha\to\beta}{\beta}\ \text{MP}
$$

Se já temos $\alpha$ e também $\alpha\to\beta$, podemos escrever $\beta$. É o mesmo $\to e$ que você vai ver na dedução natural.

## 3. Um sistema de exemplo: Hilbert com $\to$ e $\neg$

Chamemos este sistema de $Z$. Ele só tem **implicação e negação** como conectivos primitivos.

**Axiomas**

| | Esquema |
| --- | --- |
| **(A1)** | $\alpha\to(\beta\to\alpha)$ |
| **(A2)** | $(\alpha\to(\beta\to\gamma))\to((\alpha\to\beta)\to(\alpha\to\gamma))$ |
| **(A3)** | $(\neg\beta\to\neg\alpha)\to((\neg\beta\to\alpha)\to\beta)$ |

**Regra**

| | |
| --- | --- |
| **(R1) MP** | de $\alpha$ e $\alpha\to\beta$, conclui $\beta$ |

Só isso. Três esquemas de axioma e uma regra são suficientes para provar **toda** tautologia que use $\to$ e $\neg$.

### Estrutura de uma prova axiomática

Cada linha da prova é **uma** destas três coisas:

1. uma **instância de axioma** (anotando qual e quais trocas foram feitas);
2. uma **premissa** (quando $\Gamma\neq\varnothing$);
3. o resultado de **MP** aplicado a duas linhas anteriores (anotando quais).

A última linha é a fórmula provada.

## 4. Exemplo: provar $A\to A$

Parece óbvio (se $A$ então $A$), mas no sistema $Z$ **nada é de graça**: precisamos construir.

$$
\vdash_Z A\to A
$$

| Passo | Fórmula | Justificativa |
| --- | --- | --- |
| 1 | $A\to((A\to A)\to A)$ | A1 com $\alpha=A$, $\beta=(A\to A)$ |
| 2 | $(A\to((A\to A)\to A))\to((A\to(A\to A))\to(A\to A))$ | A2 com $\alpha=A$, $\beta=(A\to A)$, $\gamma=A$ |
| 3 | $(A\to(A\to A))\to(A\to A)$ | MP 1, 2 |
| 4 | $A\to(A\to A)$ | A1 com $\alpha=A$, $\beta=A$ |
| 5 | $A\to A$ | MP 4, 3 |

O subscrito em $\vdash_Z$ indica **qual sistema** foi usado.

> [!TIP]
> **Como ler o passo 3:** a linha 2 tem a forma $X\to Y$, onde $X$ é exatamente a linha 1. Então MP entrega $Y$. Em toda aplicação de MP, localize primeiro a linha que é "$\alpha$" e a que é "$\alpha\to\beta$".
>
> **Como enxergar a ideia:** a prova de $A\to A$ usa A1 duas vezes (com trocas diferentes) e A2 uma vez. É o padrão de "truque" que aparece em quase toda prova axiomática: uma instância de A2 cuja metade é fornecida por A1.

## 5. Provas com premissas

Quando o argumento tem premissas, elas entram como linhas justificadas por "premissa" (ou "P"). Exemplo: o **silogismo hipotético**.

$$
P\to Q,\ Q\to R\ \vdash\ P\to R
$$

| Passo | Fórmula | Justificativa |
| --- | --- | --- |
| 1 | $P\to Q$ | premissa |
| 2 | $Q\to R$ | premissa |
| 3 | $(Q\to R)\to(P\to(Q\to R))$ | A1 com $\alpha=(Q\to R)$, $\beta=P$ |
| 4 | $P\to(Q\to R)$ | MP 2, 3 |
| 5 | $(P\to(Q\to R))\to((P\to Q)\to(P\to R))$ | A2 com $\alpha=P$, $\beta=Q$, $\gamma=R$ |
| 6 | $(P\to Q)\to(P\to R)$ | MP 4, 5 |
| 7 | $P\to R$ | MP 1, 6 |

Repare no padrão: o passo 3 usa A1 para "carregar" a premissa $Q\to R$ para dentro de um $P\to$, e o passo 5 usa A2 para "distribuir" o $P$. Depois é só MP.

## 6. E os outros conectivos?

O sistema $Z$ só conhece $\to$ e $\neg$. Os demais são **abreviações** (definições):

| Abreviação | Definição em $\to,\neg$ |
| --- | --- |
| $\alpha\land\beta$ | $\neg(\alpha\to\neg\beta)$ |
| $\alpha\lor\beta$ | $\neg\alpha\to\beta$ |
| $\alpha\leftrightarrow\beta$ | $\neg\big((\alpha\to\beta)\to\neg(\beta\to\alpha)\big)$ |

> [!WARNING]
> **Cuidado com a conjunção.** É $\neg(\alpha\to\neg\beta)$, com o $\neg$ **dentro** do segundo argumento. A fórmula $\neg(\alpha\to\beta)$ **não** é $\alpha\land\beta$: ela diz "$\alpha$ e **não** $\beta$" (promessa quebrada, lembra do tableaux?). Teste com a tabela: $\neg(\alpha\to\neg\beta)$ só é V quando $\alpha=\beta=V$.

**Exemplo útil:** o terceiro excluído. Pela definição de $\lor$:

$$
p\lor\neg p\ \equiv\ \neg p\to\neg p
$$

Logo provar $\vdash p\lor\neg p$ é provar $\vdash\neg p\to\neg p$, que é a prova da seção 4 com $A:=\neg p$ em todas as linhas.

## 7. Axiomático na prática

| | Vantagem | Desvantagem |
| --- | --- | --- |
| **Hilbert** | Poucas regras (só MP), ótimo para **estudar** o sistema (provar solidez e completude). | Provas **longas e pouco intuitivas**, mesmo para fatos simples. |

Por isso, para **fazer** provas, usamos a [dedução natural](../deducao-natural/), que imita o raciocínio do dia a dia.

> [!TIP]
> **Atalho (Teorema da Dedução).** Em sistemas como $Z$ vale: $\Gamma,\alpha\vdash\beta$ se, e somente se, $\Gamma\vdash\alpha\to\beta$. É a versão axiomática da ideia de "supor $\alpha$ e chegar em $\beta$", e é o que torna as provas com premissas muito mais curtas. A dedução natural embute esse atalho na regra $\to i$.

## Erros comuns

- **Troca não uniforme.** Instanciar $\alpha\to(\beta\to\alpha)$ como $p\to(q\to r)$ é errado: os dois $\alpha$ precisam ser a mesma fórmula.
- **MP "ao contrário".** De $\beta$ e $\alpha\to\beta$ **não** se conclui $\alpha$ (isso é a falácia da afirmação do consequente).
- **Esquecer de anotar a troca.** Sem dizer quanto valem $\alpha,\beta,\gamma$ fica difícil de conferir; é a primeira coisa que o corretor procura.
- **Usar MP com fórmulas que "quase" casam.** O antecedente de uma linha precisa ser **idêntico**, símbolo por símbolo, à outra linha.
- **Confundir $\vdash$ com $\models$.** $\vdash$ é "tem prova", $\models$ é "é consequência semântica". Pela solidez e completude dão no mesmo, mas **não são a mesma definição**.

## Resumo

- Sistema dedutivo = linguagem + (axiomas) + regras de inferência. Prova = lista de fórmulas, cada uma justificada.
- **Solidez:** $\vdash\Rightarrow\models$. **Completude:** $\models\Rightarrow\vdash$. A lógica proposicional é **decidível**.
- Axioma é um **esquema**; vale qualquer troca uniforme de $\alpha,\beta,\gamma$ por fórmulas.
- **MP:** de $\alpha$ e $\alpha\to\beta$, conclui $\beta$.
- Sistema $Z$: A1, A2, A3 e MP. $\land,\lor,\leftrightarrow$ são abreviações em $\to,\neg$.

## Exercícios

{{< quiz titulo="instância de A1" >}}

{{< questao >}}
Qual destas fórmulas é uma **instância** do axioma A1, $\alpha\to(\beta\to\alpha)$?

- [x] $p\to(q\to p)$
- [ ] $p\to(q\to q)$
- [ ] $(p\to q)\to(p\to(q\to p))$
- [ ] $\neg p\to(\neg q\to\neg q)$
---
Em A1, o consequente interno **repete o antecedente externo**. Em $p\to(q\to p)$: $\alpha=p$, $\beta=q$. Em $p\to(q\to q)$ o final seria $p$, não $q$. Em $(p\to q)\to(p\to(q\to p))$ teríamos $\alpha=p\to q$, e o final deveria ser $p\to q$, não $q\to p$. A última repete $\neg q$ onde deveria repetir $\neg p$.
{{< /questao >}}

{{< /quiz >}}

**Exercício 1.** Mostre que $((p\to q)\to((q\to r)\to(p\to q)))$ é instância de um axioma e diga quais são as trocas.

{{< details title="Gabarito" >}}
É A1, $\alpha\to(\beta\to\alpha)$, com $\alpha=(p\to q)$ e $\beta=(q\to r)$.
{{< /details >}}

**Exercício 2.** Escreva $p\land(q\lor r)$ usando só $\to$ e $\neg$.

{{< details title="Gabarito" >}}
$q\lor r=\neg q\to r$. Então $p\land(q\lor r)=\neg\big(p\to\neg(\neg q\to r)\big)$.
{{< /details >}}

**Exercício 3.** Complete a prova de $p,\ p\to q,\ q\to r\vdash r$.

{{< details title="Gabarito" >}}
| Passo | Fórmula | Justificativa |
| --- | --- | --- |
| 1 | $p$ | premissa |
| 2 | $p\to q$ | premissa |
| 3 | $q$ | MP 1, 2 |
| 4 | $q\to r$ | premissa |
| 5 | $r$ | MP 3, 4 |

{{< /details >}}

**Exercício 4.** Prove $\vdash_Z\neg p\to\neg p$ e explique o que isso diz sobre $p\lor\neg p$.

{{< details title="Gabarito" >}}
É a prova da seção 4 trocando $A$ por $\neg p$ em todas as linhas (cinco passos: A1, A2, MP, A1, MP). Como $p\lor\neg p$ é abreviação de $\neg p\to\neg p$, isso prova o **terceiro excluído** no sistema $Z$.
{{< /details >}}

**Exercício 5.** Prove $p\to q,\ p\to(q\to r)\ \vdash\ p\to r$.

{{< details title="Gabarito" >}}
| Passo | Fórmula | Justificativa |
| --- | --- | --- |
| 1 | $p\to q$ | premissa |
| 2 | $p\to(q\to r)$ | premissa |
| 3 | $(p\to(q\to r))\to((p\to q)\to(p\to r))$ | A2 com $\alpha=p$, $\beta=q$, $\gamma=r$ |
| 4 | $(p\to q)\to(p\to r)$ | MP 2, 3 |
| 5 | $p\to r$ | MP 1, 4 |

{{< /details >}}

{{< quiz titulo="solidez e completude" >}}

{{< questao >}}
Um sistema dedutivo é **sólido** quando...

- [x] tudo que ele prova é de fato uma consequência lógica (não prova mentiras)
- [ ] tudo que é consequência lógica ele consegue provar
- [ ] existe um algoritmo que decide se uma fórmula é tautologia
- [ ] todas as premissas dos argumentos provados são verdadeiras
---
Solidez é $\Gamma\vdash\psi\Rightarrow\Gamma\models\psi$. A segunda alternativa descreve a **completude**; a terceira, a **decidibilidade**; a quarta confunde com "argumento correto", que é outro conceito.
{{< /questao >}}

{{< /quiz >}}
