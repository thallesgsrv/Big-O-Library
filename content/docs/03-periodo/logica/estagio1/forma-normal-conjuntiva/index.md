---
title: Forma Normal Conjuntiva (FNC)
weight: 7
description: Como colocar fórmulas num formato padrão (E de OUs) em que a validade é fácil de checar, e como usar isso para provar argumentos.
autores:
  - thallesgsrv
date: 2026-10-15
---

## 1. A ideia: um formato padrão

Fórmulas podem ser escritas de infinitas formas ($p\to q$, $\neg p\lor q$, $\neg(p\land\neg q)$... são a mesma coisa). Seria ótimo ter **um formato único** em que seja **fácil** decidir se a fórmula é válida.

Esse formato é a **Forma Normal Conjuntiva (FNC)** (em inglês, CNF): **um "E" de vários "OUs" de literais.**

$$
\underbrace{(L_{1}\lor L_{2}\lor\cdots)}_{\text{cláusula}}\ \land\ \underbrace{(L_{3}\lor\cdots)}_{\text{cláusula}}\ \land\ \cdots
$$

Vocabulário:

- **Literal:** $p$ ou $\neg p$.
- **Cláusula:** uma disjunção de literais ($L_1\lor L_2\lor\cdots\lor L_m$).
- **FNC:** uma conjunção de cláusulas.

Em gramática:
$$
L::=p\mid\neg p,\qquad D::=L\mid L\lor D,\qquad C::=D\mid D\land C
$$

**Exemplo de FNC:** $(\neg q\lor p\lor r)\land(\neg p\lor r)\land q$. São três cláusulas (a última tem um literal só).

Costuma-se escrever cada cláusula como **conjunto**: $\{\neg q,p,r\},\ \{\neg p,r\},\ \{q\}$.

## 2. Por que ela é útil? Validade fica trivial

Duas regras simples:

1. Um **"E"** só é sempre V se **todos os pedaços** são sempre V. Então: **a FNC é válida $\iff$ todas as suas cláusulas são válidas.**
2. Um **"OU"** de literais só é **sempre** V se tiver uma "chave" que garanta isso: um literal **e seu complementar** ($p$ e $\neg p$), pois $p\lor\neg p$ é sempre V. Sem isso, dá para falsificá-lo (basta fazer todos os literais F). Então: **uma cláusula é válida $\iff$ contém $L$ e $\neg L$.**

> [!TIP]
> **Imagem mental:** cada cláusula é um **cadeado**. Ela só é "indestrutível" (sempre V) se tiver o par $p$ / $\neg p$ como chave. A FNC é um **cofre** de vários cadeados: só é seguro se **todos** estão trancados.

**Exemplo A.** $(\neg Q\lor P\lor R\lor Q)\land(\neg P\lor R\lor P)$.
Cláusula 1 tem $Q$ e $\neg Q$: válida. Cláusula 2 tem $P$ e $\neg P$: válida. **FNC válida.**

**Exemplo B.** $(\neg q\lor p\lor r)\land(\neg p\lor r)\land q$.

- $\{\neg q,p,r\}$: nenhum par complementar. **Não é válida.**

Basta uma cláusula ruim para a fórmula toda ser **não válida**. Para achar o **contra-exemplo**, faça **todos os literais dessa cláusula serem F**: $q=V$, $p=F$, $r=F$. Neste mundo a cláusula é F, logo a FNC toda é F.

## 3. Como obter a FNC

### Método 1: a partir da tabela-verdade ("bloquear as linhas F")

Para cada **linha em que a fórmula é F**, escreva uma cláusula que seja F **exatamente naquela linha**: para cada letra, escreva $p$ se $p$ é **F** na linha, e $\neg p$ se $p$ é **V** na linha. A FNC é o "E" de todas essas cláusulas.

**Exemplo.** $\varphi=p\to q$. A única linha F é $p=V,q=F$. Cláusula: $\neg p\lor q$ ("$p$ está V, então nego; $q$ está F, então escrevo $q$"). FNC: $(\neg p\lor q)$. De fato, $p\to q\equiv\neg p\lor q$.

**Exemplo.** $\varphi=p\leftrightarrow q$. Linhas F: $(V,F)$ e $(F,V)$. Cláusulas: $(\neg p\lor q)$ e $(p\lor\neg q)$. FNC: $(\neg p\lor q)\land(p\lor\neg q)$.

> [!NOTE]
> Esse método sempre funciona, mas gera fórmulas **grandes** (uma cláusula por linha F).

### Método 2: o algoritmo de transformação (4 passos)

Cada passo gera uma fórmula **equivalente** à anterior.

1. **Eliminar $\to$ e $\leftrightarrow$:** $p\to q\ \Rightarrow\ \neg p\lor q$ e $p\leftrightarrow q\ \Rightarrow\ (\neg p\lor q)\land(\neg q\lor p)$.
2. **Empurrar os $\neg$ para as letras** (De Morgan e dupla negação): $\neg(p\land q)\Rightarrow\neg p\lor\neg q$; $\neg(p\lor q)\Rightarrow\neg p\land\neg q$; $\neg\neg p\Rightarrow p$.
3. **Distribuir $\lor$ sobre $\land$:** $A\lor(B_1\land\cdots\land B_n)\ \Rightarrow\ (A\lor B_1)\land\cdots\land(A\lor B_n)$.
4. **Extrair as cláusulas** (e tirar literais repetidos).

> [!WARNING]
> **Só vale distribuir $\lor$ sobre $\land$** (para ficar "E de OUs"). O contrário ($\land$ sobre $\lor$) leva à forma **disjuntiva**, que não nos serve aqui.

**Exemplo 1.** $\neg p\land q\to p\land(r\to q)$

| Passo | Fórmula |
| --- | --- |
| 1. Eliminar $\to$ | $\neg(\neg p\land q)\lor\big(p\land(\neg r\lor q)\big)$ |
| 2. Empurrar $\neg$ | $(p\lor\neg q)\lor\big(p\land(\neg r\lor q)\big)$ |
| 3. Distribuir $\lor$ | $(p\lor\neg q\lor p)\land(p\lor\neg q\lor\neg r\lor q)$ |
| 4. Cláusulas | $\{p,\neg q\},\ \{p,\neg q,\neg r,q\}$ |

A segunda cláusula é válida ($q$ e $\neg q$), mas a **primeira não** ($\{p,\neg q\}$ não tem complementares). **Fórmula não válida.** Contra-exemplo: $p=F,q=V$ ($r$ qualquer).

**Exemplo 2.** $(T\lor E)\to T$ (T: passa em todos os testes; E: executa).

$$
\neg(T\lor E)\lor T\ \Rightarrow\ (\neg T\land\neg E)\lor T\ \Rightarrow\ (\neg T\lor T)\land(\neg E\lor T)
$$
Cláusulas: $\{T,\neg T\}$ (válida) e $\{T,\neg E\}$ (**não** válida). **Não é válida.** Contra-exemplo: $T=F,E=V$ (executa, mas não passa nos testes).

**Exemplo 3.** $\neg(p\to\neg(q\land(\neg p\to q)))$.

- $\neg p\to q\ \Rightarrow\ p\lor q$.
- $p\to\neg(q\land(p\lor q))\ \Rightarrow\ \neg p\lor\neg(q\land(p\lor q))$.
- Negando tudo (De Morgan): $p\land(q\land(p\lor q))=p\land q\land(p\lor q)$.

Cláusulas: $\{p\},\{q\},\{p,q\}$. Nenhuma válida. **Inválida.**

## 4. Provando argumentos com a FNC

Lembre que $\varphi_1,\ldots,\varphi_n\models\psi\iff\ \models\varphi_1\to(\varphi_2\to\cdots(\varphi_n\to\psi))$.

### Receita

1. Monte a fórmula $\alpha=\varphi_1\to(\cdots(\varphi_n\to\psi))$ (ou $(\varphi_1\land\cdots\land\varphi_n)\to\psi$).
2. Converta $\alpha$ para FNC.
3. Verifique **cada cláusula**: tem $L$ e $\neg L$? Todas têm $\Rightarrow$ **válido**. Alguma não tem $\Rightarrow$ **inválido** (falsifique essa cláusula para o contra-exemplo).

**Exemplo 1 (válido).** $A\to B,\ B\to C\models A\to C$.

$$
\alpha=(A\to B)\to((B\to C)\to(A\to C))
$$
Eliminando $\to$ e empurrando $\neg$:
$$
(A\land\neg B)\lor(B\land\neg C)\lor\neg A\lor C
$$
Distribuindo $\lor$ sobre $\land$ (uma escolha de cada parêntese):
$$
\{A,B,\neg A,C\},\ \{A,\neg C,\neg A,C\},\ \{\neg B,B,\neg A,C\},\ \{\neg B,\neg C,\neg A,C\}
$$
Todas têm um par complementar ($A/\neg A$, $A/\neg A$, $B/\neg B$, $C/\neg C$). **Válido.**

**Exemplo 2 (inválido).** $(A\land B)\lor C\models A\land(B\lor C)$.

$\alpha=\neg((A\land B)\lor C)\lor(A\land(B\lor C))$. Aplicando De Morgan: $((\neg A\lor\neg B)\land\neg C)\lor(A\land(B\lor C))$. Distribuindo:
$$
\{\neg A,\neg B,A\},\ \{A,\neg C\},\ \{\neg A,\neg B,B,C\},\ \{\neg C,B,C\}
$$
A cláusula $\{A,\neg C\}$ **não** tem complementares. **Inválido.** Para falsificá-la: $A=F$ e $C=V$. (Nesse mundo, a premissa $(A\land B)\lor C$ é V e a conclusão $A\land(B\lor C)$ é F.)

**Exemplo 3 (válido).** $P\to(Q\to R)\models(P\land Q)\to R$.

$\alpha=(P\to(Q\to R))\to((P\land Q)\to R)$. Em FNC (eliminando e empurrando): $(P\land Q\land\neg R)\lor\neg P\lor\neg Q\lor R$. Distribuindo:
$$
\{\neg P,\neg Q,R,P\},\ \{\neg P,\neg Q,R,Q\},\ \{\neg P,\neg Q,R,\neg R\}
$$
Todas com complementares. **Válido.**

## 5. Comparando os três métodos

| Método | Prova o quê? | Custo (pior caso) | Ideia |
| --- | --- | --- | --- |
| **Tabela-verdade** | satisfazibilidade e validade | $O(2^n)$ | exaustivo: olha todas as linhas |
| **Tableaux** | satisfazibilidade; validade por refutação | $O(2^n)$ | árvore: explora só o necessário |
| **FNC** | validade | $O(2^n)$ | transformações e olhar cláusulas |

A conversão para FNC pode **explodir** o tamanho da fórmula (no pior caso, $2^n$). Existe algum método que sempre seja melhor que exponencial? **Ninguém sabe.** Esse é o famoso problema **SAT**, o primeiro problema provado **NP-completo**. Resolvê-lo de forma eficiente valeria um prêmio de um milhão de dólares (é o problema "P versus NP").

## Resumo

- **FNC:** E de OUs de literais.
- Cláusula é válida $\iff$ tem $L$ e $\neg L$. FNC é válida $\iff$ todas as cláusulas são.
- **Algoritmo:** eliminar $\to,\leftrightarrow$ $\to$ empurrar $\neg$ $\to$ distribuir $\lor$ sobre $\land$ $\to$ ler as cláusulas.
- **Argumento:** vira fórmula $\varphi_1\to(\cdots\to\psi)$, depois FNC, depois checar cláusulas.

## Exercícios

**Exercício 1.** Converta para FNC: $p\to(q\land r)$.

{{< details title="Gabarito" >}}
$\neg p\lor(q\land r)\Rightarrow(\neg p\lor q)\land(\neg p\lor r)$. Cláusulas: $\{\neg p,q\},\{\neg p,r\}$.
{{< /details >}}

**Exercício 2.** Converta e diga se é válida: $((A\to B)\to A)\to A$ (lei de Peirce).

{{< details title="Gabarito" >}}
$\neg((A\to B)\to A)\lor A$. Como $(A\to B)\to A\equiv(A\land\neg B)\lor A$, a negação é $((\neg A\lor B)\land\neg A)$. Então: $((\neg A\lor B)\land\neg A)\lor A\Rightarrow(\neg A\lor B\lor A)\land(\neg A\lor A)$. Cláusulas $\{\neg A,B,A\}$ e $\{\neg A,A\}$ têm complementares. **Válida.**
{{< /details >}}

**Exercício 3.** Converta e diga se é válida: $(A\land B)\lor C\to A\land(B\lor C)$.

{{< details title="Gabarito" >}}
É o Exemplo 2 da seção 4 (a fórmula é a mesma). Há a cláusula $\{A,\neg C\}$ sem complementares. **Inválida** ($A=F,C=V$).
{{< /details >}}

**Exercício 4.** Converta: $A\land\neg(\neg A\lor\neg B)$.

{{< details title="Gabarito" >}}
$A\land(A\land B)=A\land B$. Cláusulas: $\{A\},\{B\}$. Nenhuma válida: **fórmula não válida** (ela vale só quando $A$ e $B$ são V).
{{< /details >}}

**Exercício 5.** Converta e diga se é válida: $A\land B\to\neg A$.

{{< details title="Gabarito" >}}
$\neg(A\land B)\lor\neg A\Rightarrow\neg A\lor\neg B\lor\neg A$. Cláusula: $\{\neg A,\neg B\}$, sem complementares. **Inválida** ($A=B=V$).
{{< /details >}}

**Exercício 6.** Use FNC para testar $P\to(R\to Q),\ P\to R\models P\to Q$.

{{< details title="Gabarito" >}}
$\alpha=(P\to(R\to Q))\to((P\to R)\to(P\to Q))$. Em FNC, as seis cláusulas resultantes são: $\{P,\neg P,Q\},\{P,\neg R,\neg P,Q\},\{R,\neg P,Q,P\},\{R,\neg R,\neg P,Q\},\{\neg Q,P,\neg P,Q\},\{\neg Q,\neg R,\neg P,Q\}$. Todas têm um par complementar. **Válido.**
{{< /details >}}
