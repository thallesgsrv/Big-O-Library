---
title: Tableaux Semântico
weight: 5
description: O método da árvore para descobrir se uma fórmula é satisfazível ou válida sem montar a tabela-verdade inteira.
autores:
  - thallesgsrv
date: 2026-10-15
---

## Sobre

A tabela-verdade funciona, mas cresce rápido demais. O **tableaux semântico** é um método de **detetive**: supomos que a fórmula é verdadeira e investigamos o que isso exige, abrindo uma árvore. Se todos os caminhos dão em contradição, a suposição era impossível; se sobrar um caminho limpo, ele nos entrega um **modelo**.

Ao final você deve conseguir:

- classificar qualquer fórmula como regra $\alpha$ (empilha) ou $\beta$ (ramifica);
- montar a árvore, fechar os ramos certos e **ler o modelo** de um ramo aberto;
- decidir se uma fórmula é **satisfazível** ou **válida** (usando a negação);
- evitar os erros mais comuns do método.

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

| Fórmula | Galho da esquerda | Galho da direita | Por quê |
| --- | --- | --- | --- |
| $p\lor q$ | $p$ | $q$ | uma das duas |
| $\neg(p\land q)$ | $\neg p$ | $\neg q$ | pelo menos uma é falsa |
| $p\to q$ | $\neg p$ | $q$ | $\neg p\lor q$ |
| $\neg(p\leftrightarrow q)$ | $\neg(p\to q)$ | $\neg(q\to p)$ | valores diferentes |

> [!NOTE]
> **E se aparecer $\oplus$, $\uparrow$ ou $\downarrow$?** Troque pela definição antes de começar: $p\oplus q$ vira $\neg(p\leftrightarrow q)$, $p\uparrow q$ vira $\neg(p\land q)$ e $p\downarrow q$ vira $\neg(p\lor q)$. Todas já têm regra na tabela acima.

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

**Como ler as árvores abaixo.** Cada linha é um nó, escrito com **todas as fórmulas daquele ramo**. A indentação mostra quem veio de quem, e `├─` / `└─` separam os galhos. À direita, uma anotação diz qual regra foi usada. Um ramo terminado em $\times$ está **fechado**.

## 5. Exemplos passo a passo

### Exemplo 1: $p\land(\neg q\lor\neg p)$ é satisfazível?

```
p ∧ (¬q ∨ ¬p)
└─ p, (¬q ∨ ¬p)           α em ∧
   ├─ p, ¬q               β em ∨   aberto ✓
   └─ p, ¬p  ✗            β em ∨   fechado
```

O ramo da esquerda tem só $\{p,\neg q\}$ (sem complementares): **aberto**. **Satisfazível.** O modelo vem direto dos literais: $p=V$, $q=F$.

### Exemplo 2: $(p\lor q)\land(\neg p\land\neg q)$

```
(p ∨ q) ∧ (¬p ∧ ¬q)
└─ (p ∨ q), (¬p ∧ ¬q)             α em ∧
   ├─ p, (¬p ∧ ¬q)                β em ∨
   │  └─ p, ¬p, ¬q  ✗             α em ∧   (p e ¬p)
   └─ q, (¬p ∧ ¬q)                β em ∨
      └─ q, ¬p, ¬q  ✗             α em ∧   (q e ¬q)
```

Todos os ramos fecham: **insatisfazível.** Faz sentido: "$p$ ou $q$" e "nem $p$ nem $q$" não convivem.

### Exemplo 3: $(p\to q)\to(r\land q)$

```
(p → q) → (r ∧ q)
├─ ¬(p → q)               β em →
│  └─ p, ¬q               α em ¬→   aberto ✓
└─ (r ∧ q)                β em →
   └─ r, q                α em ∧    aberto ✓
```

**Satisfazível**, com dois jeitos: $p=V,q=F$ (e $r$ qualquer), ou $r=V,q=V$ (e $p$ qualquer).

> [!TIP]
> **Confira o modelo na fórmula original.** Com $p=V,q=F,r=V$: $(V\to F)\to(V\land F)=F\to F=V$. Deu V, então o modelo está certo. Esse hábito pega erros de regra aplicada ao contrário.

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
└─ ¬¬(a∧b), ¬(c∧b)            α em ¬∨
   └─ (a∧b), ¬(c∧b)           α em ¬¬
      └─ a, b, ¬(c∧b)         α em ∧
         ├─ a, b, ¬c          β em ¬∧   aberto ✓
         └─ a, b, ¬b  ✗       β em ¬∧   fechado
```

Há ramo aberto: $a=V,b=V,c=F$. Nessa interpretação a fórmula original é **F**. Logo ela é **inválida**, com contra-exemplo $a=V,b=V,c=F$.

### Exemplo 6: $\neg\big(((p\to q)\land\neg(p\leftrightarrow q))\land\neg\neg p\big)$ é válida?

Tableaux da negação (que é a conjunção sem o $\neg$ de fora):

```
((p→q) ∧ ¬(p↔q)) ∧ ¬¬p
└─ (p→q) ∧ ¬(p↔q), ¬¬p                 α em ∧
   └─ p→q, ¬(p↔q), ¬¬p                 α em ∧
      └─ p→q, ¬(p↔q), p                α em ¬¬
         ├─ ¬p, ¬(p↔q), p  ✗           β em →   (¬p e p)
         └─ q, ¬(p↔q), p               β em →
            ├─ ¬(p→q), q, p            β em ¬↔
            │  └─ p, ¬q, q, p  ✗       α em ¬→  (¬q e q)
            └─ ¬(q→p), q, p            β em ¬↔
               └─ q, ¬p, q, p  ✗       α em ¬→  (¬p e p)
```

Todos fechados: a negação é insatisfazível, então a fórmula é **válida**.

## 7. Custo

No **pior caso**, o tableaux também cresce como $2^n$ (igual à tabela-verdade). Por exemplo, em $(p\lor q)\land(p\lor\neg q)\land(\neg p\lor q)\land(\neg p\lor\neg q)$ todos os ramos têm que ser explorados. Mas, **na prática**, ele costuma ser bem mais rápido, porque fecha caminhos cedo e para no primeiro modelo.

## Erros comuns

- **Tratar $\neg(p\land q)$ como $\alpha$.** De Morgan **troca** o conectivo: $\neg(p\land q)$ é "$\neg p$ **ou** $\neg q$", logo é $\beta$ e ramifica. Já $\neg(p\lor q)$ é "$\neg p$ **e** $\neg q$", logo é $\alpha$.
- **Fechar um ramo com literais que não são complementares.** $\{p,\neg q\}$ **não** fecha: complementares são a mesma letra com e sem $\neg$ ($p$ e $\neg p$).
- **Declarar o ramo "aberto" cedo demais.** Só vale quando ele está **saturado** (só literais). Se ainda há uma fórmula que não é literal, continue expandindo.
- **Esquecer de expandir uma fórmula $\beta$ em todos os ramos abertos que a contêm.** Se ela estava antes de uma ramificação, **cada galho** abaixo dela herda a obrigação de usá-la.
- **Concluir "válida" olhando o tableaux da própria fórmula.** Tableaux fechado em $\varphi$ quer dizer $\varphi$ **insatisfazível** (contradição). Para saber se é **válida**, o tableaux é o de $\neg\varphi$.

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

**Exercício 6.** $\neg(p\land q)\land(p\lor q)$ é satisfazível? Se for, diga todos os modelos.

{{< details title="Gabarito" >}}

```
¬(p∧q) ∧ (p∨q)
└─ ¬(p∧q), (p∨q)                α em ∧
   ├─ ¬p, (p∨q)                 β em ¬∧
   │  ├─ ¬p, p  ✗               β em ∨
   │  └─ ¬p, q                  β em ∨   aberto ✓
   └─ ¬q, (p∨q)                 β em ¬∧
      ├─ ¬q, p                  β em ∨   aberto ✓
      └─ ¬q, q  ✗               β em ∨
```

**Satisfazível**, com dois modelos: $p=F,q=V$ e $p=V,q=F$. Repare: é exatamente o $p\oplus q$ ("um dos dois, mas não ambos").
{{< /details >}}

**Exercício 7.** O conjunto de fórmulas $(p\to q)\land(q\to r)\land p\land\neg r$ é satisfazível?

{{< details title="Gabarito" >}}
Por $\alpha$ (várias vezes): $p\to q,\ q\to r,\ p,\ \neg r$. Em $p\to q$: o galho $\neg p$ fecha (temos $p$) e sobra o galho $q$. Nele, em $q\to r$: o galho $\neg q$ fecha (temos $q$) e o galho $r$ fecha (temos $\neg r$). Todos fechados: **insatisfazível**. (É a cadeia $p\Rightarrow q\Rightarrow r$ batendo de frente com $\neg r$.)
{{< /details >}}

**Exercício 8.** Para cada fórmula, qual regra se aplica quando ela aparece num ramo (assumindo que é V)?

{{< quiz titulo="alfa ou beta?" >}}

{{< questao fixa="true" >}}
$\neg(p\to q)$ é uma regra...

- [x] $\alpha$ (empilha: $p,\ \neg q$)
- [ ] $\beta$ (ramifica)
---
A única forma de $p\to q$ ser F é $p$ V e $q$ F, e as duas coisas têm que valer juntas. Não há opção, então empilha.
{{< /questao >}}

{{< questao fixa="true" >}}
$p\to q$ é uma regra...

- [ ] $\alpha$ (empilha)
- [x] $\beta$ (ramifica: $\neg p\ \mid\ q$)
---
É o mesmo que $\neg p\lor q$: basta uma das duas partes, então são duas opções.
{{< /questao >}}

{{< questao fixa="true" >}}
$\neg(p\land q)$ é uma regra...

- [ ] $\alpha$ (empilha)
- [x] $\beta$ (ramifica: $\neg p\ \mid\ \neg q$)
---
De Morgan: $\neg(p\land q)\equiv\neg p\lor\neg q$. Um "ou" oferece opções.
{{< /questao >}}

{{< questao fixa="true" >}}
$\neg(p\lor q)$ é uma regra...

- [x] $\alpha$ (empilha: $\neg p,\ \neg q$)
- [ ] $\beta$ (ramifica)
---
De Morgan: $\neg(p\lor q)\equiv\neg p\land\neg q$. Um "e" exige as duas partes.
{{< /questao >}}

{{< questao fixa="true" >}}
$p\leftrightarrow q$ é uma regra...

- [x] $\alpha$ (empilha: $p\to q,\ q\to p$)
- [ ] $\beta$ (ramifica)
---
Nesta página, $p\leftrightarrow q$ vira a conjunção $(p\to q)\land(q\to p)$: as duas valem ao mesmo tempo.
{{< /questao >}}

{{< questao fixa="true" >}}
$\neg(p\leftrightarrow q)$ é uma regra...

- [ ] $\alpha$ (empilha)
- [x] $\beta$ (ramifica: $\neg(p\to q)\ \mid\ \neg(q\to p)$)
---
Os valores diferem de dois jeitos: $p$ V e $q$ F, ou $p$ F e $q$ V. Duas opções, então ramifica.
{{< /questao >}}

{{< /quiz >}}
