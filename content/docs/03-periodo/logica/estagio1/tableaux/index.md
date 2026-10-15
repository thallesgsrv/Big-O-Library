---
title: Tableaux Semântico
weight: 5
description: O método da árvore para descobrir se uma fórmula é satisfazível ou válida sem montar a tabela-verdade inteira.
autores:
  - thallesgsrv
date: 2026-10-15
---

## 1. O problema: tabela demais

A tabela-verdade tem $2^n$ linhas. Para 30 letras seriam **mais de um bilhão**. Mas muitas vezes não precisamos olhar tudo: basta **achar uma linha que funcione** (um modelo) e parar.

O **tableaux semântico** (lê-se "tabló") faz isso como um **detetive**:

> *"Vou **supor** que a fórmula é verdadeira e investigar o que **precisa** ser verdade para isso. Se eu cair numa contradição, esse caminho é impossível. Se sobrar um caminho sem contradição, **achei um modelo.**"*

É um método **sistemático** de procurar um modelo: achou, acabou.

## 2. Vocabulário

- **Átomo:** uma letra ($p,q,r$).
- **Literal:** átomo ou átomo negado ($p$, $\neg p$).
- **Literais complementares:** um átomo e sua negação ($p$ e $\neg p$). É a "contradição" que procuramos.

**Fato-chave:** um conjunto de **literais** é satisfazível **se, e somente se, não contém um par de complementares.**

- $\{p,\neg q\}$: dá para ter $p$ verdadeira e $q$ falsa. Satisfazível.
- $\{p,\neg q,\neg p\}$: $p$ e $\neg p$ juntas é impossível. Insatisfazível.

Então o plano é: **quebrar a fórmula até sobrarem só literais** e olhar se há complementares.

## 3. As duas famílias de regras

Quando assumimos que uma fórmula é V, ela ou **exige tudo** ao mesmo tempo, ou **dá opções**.

### Regras $\alpha$ (conjuntivas, "E"): **não ramificam**

Assumir a fórmula V obriga **as duas partes** a serem V. Basta escrever as duas no mesmo ramo.

| Fórmula | Vira (na mesma linha) | Por quê |
| --- | --- | --- |
| $\neg\neg p$ | $p$ | dupla negação |
| $p\land q$ | $p,\ q$ | "e": os dois |
| $\neg(p\lor q)$ | $\neg p,\ \neg q$ | "nem um nem outro" |
| $\neg(p\to q)$ | $p,\ \neg q$ | promessa quebrada |
| $p\leftrightarrow q$ | $(p\to q),\ (q\to p)$ | vale nos dois sentidos |

### Regras $\beta$ (disjuntivas, "OU"): **ramificam**

Assumir a fórmula V dá **opções**: basta uma das partes ser V. Cada opção vira um **galho**.

| Fórmula | Vira (dois galhos) | Por quê |
| --- | --- | --- |
| $p\lor q$ | $p\ \big|\ q$ | uma das duas |
| $\neg(p\land q)$ | $\neg p\ \big|\ \neg q$ | pelo menos uma é falsa |
| $p\to q$ | $\neg p\ \big|\ q$ | $\neg p\lor q$ |
| $\neg(p\leftrightarrow q)$ | $\neg(p\to q)\ \big|\ \neg(q\to p)$ | valores diferentes |

> [!TIP]
> **Macete:** a regra é $\alpha$ se a fórmula "exige tudo" e $\beta$ se "oferece opções". Pergunte: *"se isso é verdadeiro, quais partes são obrigatoriamente verdadeiras?"* Todas $\Rightarrow$ $\alpha$. Só uma delas $\Rightarrow$ $\beta$.

## 4. O algoritmo

1. A **raiz** da árvore é a fórmula que você quer testar.
2. Escolha uma fórmula do ramo que **não seja literal**.
3. Aplique a regra correspondente ($\alpha$ estende; $\beta$ ramifica).
4. **Se um ramo tem um par complementar**, **feche-o** (marcamos $\times$) e pare de expandir aquele ramo.
5. Repita até todos os ramos estarem **fechados** ou **saturados** (só literais).

Terminologia:

- **Ramo fechado:** contém algo e sua negação ($\times$). Caminho impossível.
- **Ramo aberto:** saturado e sem complementares. **Dá um modelo.**
- **Tableaux fechado:** todos os ramos fechados. **Tableaux aberto:** algum ramo aberto.

> [!IMPORTANT]
> **Sempre faça as regras $\alpha$ antes das $\beta$.** O resultado é o mesmo, mas a árvore fica menor (menos galhos duplicando trabalho).

## 5. Exemplos passo a passo

### Exemplo 1: $p\land(\neg q\lor\neg p)$ é satisfazível?

```
p ∧ (¬q ∨ ¬p)
      │ α
p, (¬q ∨ ¬p)
     ╱     ╲  β
 p, ¬q     p, ¬p
 aberto    fechado ✗
```

O ramo da esquerda tem só $\{p,\neg q\}$ (sem complementares): **aberto**. **Satisfazível.** O modelo vem direto dos literais: $p=V$, $q=F$.

### Exemplo 2: $(p\lor q)\land(\neg p\land\neg q)$

```
(p ∨ q) ∧ (¬p ∧ ¬q)
        │ α
(p ∨ q), (¬p ∧ ¬q)
      ╱        ╲   β
p, (¬p∧¬q)    q, (¬p∧¬q)
    │ α            │ α
p, ¬p, ¬q ✗    q, ¬p, ¬q ✗
```

Todos os ramos fecham: **insatisfazível.** Faz sentido: "$p$ ou $q$" e "nem $p$ nem $q$" não convivem.

### Exemplo 3: $(p\to q)\to(r\land q)$

```
(p → q) → (r ∧ q)
      ╱          ╲   β
 ¬(p → q)      (r ∧ q)
    │ α           │ α
  p, ¬q          r, q
  aberto         aberto
```

**Satisfazível**, com dois jeitos: $p=V,q=F$ (e $r$ qualquer), ou $r=V,q=V$.

> [!NOTE]
> **Átomos que não aparecem** no ramo aberto podem ter qualquer valor (como o $r$ no primeiro modelo).

### Exemplo 4: fechar cedo economiza

$\neg(p\lor q)\land(p\lor q)$. Aplicando $\alpha$: $\neg(p\lor q),\ (p\lor q)$. **Já tem uma fórmula e sua negação**: fecha na hora ($\times$), sem expandir mais nada. **Insatisfazível.**

## 6. Provando que algo é válido: o truque da negação

O tableaux **só procura modelos** ("é satisfazível?"). Para saber se uma fórmula é **válida** (sempre V), usamos:

$$
\varphi\text{ é válida}\iff\neg\varphi\text{ é insatisfazível}
$$

**Receita:** faça o tableaux de $\neg\varphi$.

| Tableaux de... | Resultado | Significa |
| --- | --- | --- |
| $\varphi$ | todos fechados | $\varphi$ é **insatisfazível** |
| $\varphi$ | algum aberto | $\varphi$ é **satisfazível** |
| $\neg\varphi$ | todos fechados | $\varphi$ é **válida** |
| $\neg\varphi$ | algum aberto | $\varphi$ é **inválida** (o ramo aberto dá um **contra-exemplo**) |

### Exemplo 5: $\neg(a\land b)\lor(c\land b)$ é válida?

Tableaux da **negação**: $\neg\big(\neg(a\land b)\lor(c\land b)\big)$.

```
¬(¬(a∧b) ∨ (c∧b))
        │ α
(a∧b), ¬(c∧b)
        │ α
a, b, ¬(c∧b)
      ╱     ╲   β
a, b, ¬c   a, b, ¬b ✗
 aberto
```

Há ramo aberto: $a=V,b=V,c=F$. Nessa interpretação a fórmula original é **F**. Logo ela é **inválida**, com contra-exemplo $a=V,b=V,c=F$.

### Exemplo 6: $\neg\big(((p\to q)\land\neg(p\leftrightarrow q))\land\neg\neg p\big)$ é válida?

Tableaux da negação (que é a conjunção sem o $\neg$ de fora):

```
((p→q) ∧ ¬(p↔q)) ∧ ¬¬p
          │ α  (várias vezes)
p→q,  ¬(p↔q),  p
        ╱            ╲   β em p→q
  ¬p, ..., p ✗        q, ¬(p↔q), p
                          ╱          ╲   β em ¬(p↔q)
                 ¬(p→q), q, p     ¬(q→p), q, p
                    │ α              │ α
               p, ¬q, q ✗          q, ¬p, p ✗
```

Todos fechados: a negação é insatisfazível, então a fórmula é **válida**.

## 7. Custo

No **pior caso**, o tableaux também cresce como $2^n$ (igual à tabela-verdade). Por exemplo, em $(p\lor q)\land(p\lor\neg q)\land(\neg p\lor q)\land(\neg p\lor\neg q)$ todos os ramos têm que ser explorados. Mas, **na prática**, ele costuma ser bem mais rápido, porque fecha caminhos cedo e para no primeiro modelo.

## Resumo

- **Tableaux:** supor que a fórmula é V e explorar o que isso exige.
- **$\alpha$ (e):** empilha. **$\beta$ (ou):** ramifica. Faça $\alpha$ primeiro.
- **Ramo fechado:** tem complementares. **Aberto:** dá modelo.
- **Válida?** Tableaux da **negação**. Todos fechados $\Rightarrow$ válida.

## Exercícios

**Exercício 1.** $(p\land q)\lor(q\land r)\lor(r\land p)$ é satisfazível?

{{< details title="Gabarito" >}}
A raiz é um "ou": ramifica em $(p\land q)$, $(q\land r)$ e $(r\land p)$ (na ordem dos $\lor$, em dois passos). Cada galho vira dois literais sem complementares: $\{p,q\}$, $\{q,r\}$, $\{r,p\}$. Todos abertos. **Satisfazível**, por exemplo com $p=q=V$ ($r$ qualquer).
{{< /details >}}

**Exercício 2.** $\neg(r\lor(\neg p\to\neg q))$ é válida?

{{< details title="Gabarito" >}}
Negação: $\neg\neg(r\lor(\neg p\to\neg q))$, que por $\alpha$ vira $r\lor(\neg p\to\neg q)$. Ramifica: $r$ (aberto) e $(\neg p\to\neg q)$ (que ramifica em $p$ e $\neg q$, abertos). Há ramos abertos, então é **inválida**. Contra-exemplo: $r=V$ ($p,q$ quaisquer), pois aí $r\lor(\ldots)$ é V e a fórmula original (a negação disso) é F.
{{< /details >}}

**Exercício 3.** $(p\leftrightarrow q)\lor\neg p$ é válida?

{{< details title="Gabarito" >}}
Negação: $\neg(p\leftrightarrow q)\land p$. Por $\alpha$: $\neg(p\leftrightarrow q),\ p$. Por $\beta$: ramos $\neg(p\to q)$ e $\neg(q\to p)$. O primeiro vira $p,\neg q$ (aberto, junto com o $p$). **Inválida.** Contra-exemplo: $p=V,q=F$ (a fórmula dá $F\lor F=F$).
{{< /details >}}

**Exercício 4.** $((p\to(r\to q))\land(p\to r))\to(p\to q)$ é válida?

{{< details title="Gabarito" >}}
Negação: $p$, $\neg q$, $p\to(r\to q)$ e $p\to r$. Em $p\to(r\to q)$: ramo $\neg p$ fecha (tem $p$); ramo $(r\to q)$ ramifica em $\neg r$ e $q$ (este fecha com $\neg q$). No ramo $\neg r$, aplicamos $p\to r$: ramo $\neg p$ fecha e ramo $r$ fecha com $\neg r$. Todos fechados: **válida.**
{{< /details >}}

**Exercício 5.** $(p\to q)\to(\neg q\to\neg p)$ é válida?

{{< details title="Gabarito" >}}
Negação: $(p\to q)$ e $\neg(\neg q\to\neg p)$, que vira $\neg q$ e $\neg\neg p$ (isto é, $p$). Em $p\to q$: ramo $\neg p$ fecha com $p$; ramo $q$ fecha com $\neg q$. **Válida** (contrapositiva).
{{< /details >}}
