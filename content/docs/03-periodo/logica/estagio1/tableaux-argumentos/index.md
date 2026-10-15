---
title: Tableaux e Prova de Argumentos
weight: 6
description: Usando o tableaux para provar a validade de argumentos e testar conjuntos de fórmulas.
autores:
  - thallesgsrv
date: 2026-10-15
---

## 1. Conjuntos de fórmulas

O tableaux funciona também para **várias fórmulas ao mesmo tempo**: colocamos **todas na raiz** (é como ligá-las com $\land$), e perguntamos se **existe um mundo em que todas são V**.

**Exemplo.** $\{p\to q,\ p\to q\lor r\}$ é satisfazível?

```
p → q
p → (q ∨ r)
        ╱               ╲   β em  p → q
      ¬p                 q
  ╱       ╲   β em  p → (q ∨ r)   (o galho q também se abre em dois)
¬p      (q ∨ r)
aberto
```

Basta seguir o galho $\neg p$ nas duas fórmulas: o ramo $\{\neg p\}$ não tem complementares, então fica **aberto.** Satisfazível, com $p=F$ ($q,r$ quaisquer).

**Exemplo (insatisfazível).** $\{\neg p\lor q,\ \neg(q\lor\neg r),\ r\to p_1,\ \neg(\neg p\lor p_1)\}$.

- $\neg(q\lor\neg r)$ ($\alpha$) $\Rightarrow$ $\neg q,\ r$.
- $\neg(\neg p\lor p_1)$ ($\alpha$) $\Rightarrow$ $p,\ \neg p_1$ (pois $\neg\neg p=p$).
- $r\to p_1$ ($\beta$): ramo $\neg r$ **fecha** (temos $r$); ramo $p_1$ **fecha** (temos $\neg p_1$).

Todos os ramos fecham: **insatisfazível.** Não existe mundo em que as quatro sejam V.

**Exemplo (satisfazível).** $\{h\to(h\land g),\ (h\land g)\to h\}$. Ramifique a primeira em $\neg h\ |\ (h\land g)$. O ramo $\neg h$ aberto (a segunda é sempre V) dá o modelo $h=F$ ($g$ qualquer).

## 2. A grande ideia: argumento $\to$ conjunto

Lembre: $\varphi_1,\ldots,\varphi_n\models\psi$ significa que **não existe** mundo com todas as premissas V e a conclusão F. Ou seja:

$$
\varphi_1,\ldots,\varphi_n\models\psi\iff\{\varphi_1,\ldots,\varphi_n,\ \neg\psi\}\ \text{é insatisfazível}
$$

### Receita

1. Escreva as **premissas** e a **negação da conclusão** na raiz.
2. Faça o tableaux (regras $\alpha$ primeiro).
3. Leia o resultado:

| Resultado | O argumento é... |
| --- | --- |
| **Todos os ramos fecham** | **Válido** (não dá para ter premissas V e conclusão F) |
| **Algum ramo aberto** | **Inválido.** O ramo aberto é um **contra-exemplo**. |

> [!TIP]
> **Em linguagem de detetive:** "Vou tentar construir um mundo em que as premissas valem **e** a conclusão falha. Se for impossível, o argumento é bom. Se eu conseguir, aquele mundo é a prova de que ele é furado."

## 3. Representação em lista (mais fácil de ler)

Em vez de empilhar várias fórmulas por nó, podemos escrever **uma fórmula por linha** e anotar a origem. É o formato de muitas ferramentas.

### Exemplo 1 (Swing): $s\land\neg i\to\neg c,\ c,\ s\models i$

```
1. s ∧ ¬i → ¬c        premissa
2. c                  premissa
3. s                  premissa
4. ¬i                 negação da conclusão
        ╱───────────────────────╲   β em 1
5. ¬(s ∧ ¬i)                    6. ¬c  ✗ (contradiz 2)
     ╱────────╲   β em 5
7. ¬s ✗         8. ¬¬i
  (contradiz 3)    │ α
                 9. i ✗ (contradiz 4)
```

Todos os ramos fecham: **argumento válido.** Em português: sem importar Swing, mas usando Swing, o programa não compilaria, e ele compilou. Logo a biblioteca foi importada.

## 4. Exemplos

### Exemplo 2 (silogismo hipotético, **válido**): $A\to B,\ B\to C\models A\to C$

Raiz: $A\to B$, $B\to C$, $\neg(A\to C)$. Por $\alpha$: $A,\ \neg C$.

- Em $A\to B$: $\neg A$ **fecha** (temos $A$); ramo $B$.
- No ramo $B$, usando $B\to C$: $\neg B$ **fecha**; ramo $C$ **fecha** (temos $\neg C$).

Todos fechados: **válido.** (Se $A$ leva a $B$ e $B$ leva a $C$, então $A$ leva a $C$.)

### Exemplo 3 (**inválido**): $A\to B,\ B\to C\models B\to A$

Raiz: $A\to B$, $B\to C$, $\neg(B\to A)$ $\Rightarrow$ $B,\ \neg A$. Em $A\to B$: $\neg A$ (ok, aberto) e $B$ (ok). Em $B\to C$: $\neg B$ **fecha** (temos $B$) e $C$ (aberto). Fica um ramo aberto com $B,\neg A,C$.

**Contra-exemplo:** $A=F,\ B=V,\ C=V$ (premissas V; conclusão $V\to F=F$).

### Exemplo 4 (Zé ama?): $M\lor E,\ M\to E$

Suponha V as duas afirmações. Conclui-se que Zé ama Maria? Que ama Elaine?

- **Conclui-se $M$?** ($M\lor E,\ M\to E\models M$) Raiz: $M\lor E,\ M\to E,\ \neg M$. Ramo $M$ fecha; ramo $E$ fica aberto. **Inválido:** $M=F,E=V$ é mundo possível.
- **Conclui-se $E$?** ($M\lor E,\ M\to E\models E$) Raiz: $M\lor E,\ M\to E,\ \neg E$. Em $M\lor E$: ramo $E$ fecha; ramo $M$: com $M\to E$, $\neg M$ fecha e $E$ fecha. **Válido:** Zé **ama Elaine**, necessariamente.

(Intuição: se ele amasse Maria, também amaria Elaine; se não amasse Maria, o "ou" obriga a amar Elaine. Nos dois casos, Elaine.)

### Exemplo 5 (Guga)

*"Guga é determinado. Guga é inteligente. Se é determinado e atleta, não é perdedor. Atleta se é fã de tênis. Fã de tênis se é inteligente."* "Não é perdedor" decorre disso?

$P$: determinado; $Q$: inteligente; $R$: atleta; $P_1$: perdedor; $Q_1$: fã de tênis.
$$
P,\ Q,\ (P\land R)\to\neg P_1,\ Q_1\to R,\ Q\to Q_1\ \models\ \neg P_1
$$
Negando a conclusão: $P_1$ (de $\neg\neg P_1$). Com $Q\to Q_1$: $\neg Q$ fecha (temos $Q$) e ramo $Q_1$. Com $Q_1\to R$: $\neg Q_1$ fecha; ramo $R$. Com $(P\land R)\to\neg P_1$: ramos $\neg(P\land R)$ (que ramifica em $\neg P$, que fecha com $P$, e $\neg R$, que fecha com $R$) e $\neg P_1$ (fecha com $P_1$). **Todos fecham: válido.**

A cadeia em português: inteligente $\Rightarrow$ fã de tênis $\Rightarrow$ atleta; determinado e atleta $\Rightarrow$ não perdedor.

## 5. Mais argumentos para treinar

| Argumento | Veredito |
| --- | --- |
| $P\to(R\to Q),\ P\to R\models P\to Q$ | **Válido** |
| $(P\to P_1)\land(Q\to Q_1)\models(P\to Q_1)\lor(Q\to P_1)$ | **Válido** |
| $P\to(Q\to R)\models(P\land Q)\to R$ | **Válido** ("exportação") |

Para o terceiro, a negação da conclusão dá $P,\ Q,\ \neg R$; a premissa $P\to(Q\to R)$ ramifica em $\neg P$ (fecha), e $(Q\to R)$ ramifica em $\neg Q$ (fecha) e $R$ (fecha). Tudo fecha.

> [!NOTE]
> Existe uma ferramenta online que desenha esses tableaux para você conferir seu trabalho: *mylogichub.com/semantic-tableaux-generator*. Use para **conferir**, mas faça primeiro no papel!

## Resumo

- Argumento $\varphi_1..\varphi_n\models\psi$ $\iff$ $\{\varphi_1,\ldots,\varphi_n,\neg\psi\}$ insatisfazível.
- **Fechou tudo $\Rightarrow$ válido. Sobrou ramo aberto $\Rightarrow$ inválido** (e o ramo é o contra-exemplo).
- Dica: aplique $\alpha$ antes de $\beta$; feche o ramo assim que achar $X$ e $\neg X$.

## Exercícios

**Exercício 1.** Teste: $p\to q,\ \neg q\models\neg p$.

{{< details title="Gabarito" >}}
Negando a conclusão: $\neg\neg p=p$. Em $p\to q$: $\neg p$ fecha com $p$; $q$ fecha com $\neg q$. **Válido** ("modus tollens").
{{< /details >}}

**Exercício 2.** Teste: $p\to q,\ q\models p$.

{{< details title="Gabarito" >}}
Negando a conclusão: $\neg p$. Em $p\to q$: ramo $\neg p$ aberto. **Inválido.** Contra-exemplo: $p=F,q=V$. É o erro de "afirmar o consequente".
{{< /details >}}

**Exercício 3.** Teste: $p\lor q,\ \neg p\models q$.

{{< details title="Gabarito" >}}
Negando: $\neg q$. Em $p\lor q$: ramo $p$ fecha com $\neg p$; ramo $q$ fecha com $\neg q$. **Válido** (silogismo disjuntivo).
{{< /details >}}

**Exercício 4.** Teste: $p\to q,\ r\to q\models(p\lor r)\to q$.

{{< details title="Gabarito" >}}
Negando: $\neg((p\lor r)\to q)$ vira $p\lor r,\ \neg q$. Em $p\to q$: $\neg p$ ou $q$ (fecha). Com $\neg p$, usando $r\to q$: $\neg r$ ou $q$ (fecha). No ramo $\neg p,\neg r$, a fórmula $p\lor r$ ramifica em $p$ (fecha com $\neg p$) e $r$ (fecha com $\neg r$). **Válido.**
{{< /details >}}

**Exercício 5.** Traduza e teste: "Se chove, a rua molha. A rua molhou. Logo, choveu."

{{< details title="Gabarito" >}}
$c\to m,\ m\models c$. É o mesmo do exercício 2: **inválido** (a rua pode ter molhado por outro motivo).
{{< /details >}}
