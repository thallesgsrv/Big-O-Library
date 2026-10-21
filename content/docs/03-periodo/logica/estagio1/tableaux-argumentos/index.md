---
title: Tableaux e Prova de Argumentos
weight: 6
description: Usando o tableaux para provar a validade de argumentos e testar conjuntos de fórmulas.
autores:
  - thallesgsrv
date: 2026-10-15
---

## Sobre

Na página anterior o tableaux respondeu "esta fórmula tem modelo?". Agora vamos usá-lo para a pergunta central do curso: **"este argumento é válido?"**. A ideia é transformar o argumento em um conjunto de fórmulas (as premissas mais a **negação** da conclusão) e ver se esse conjunto tem solução.

Ao final você deve conseguir:

- aplicar o tableaux a um **conjunto** de fórmulas;
- decidir a validade de um argumento negando a conclusão;
- usar o ramo aberto como **contra-exemplo**;
- detectar requisitos que se contradizem (um uso real em engenharia de software).

## 1. Conjuntos de fórmulas

O tableaux funciona também para **várias fórmulas ao mesmo tempo**: colocamos **todas na raiz** (é como ligá-las com $\land$), e perguntamos se **existe um mundo em que todas são V**.

**Exemplo.** $\{p\to q,\ q\to r\}$ é satisfazível?

```
p → q,  q → r
├─ ¬p                          β em p→q
│  ├─ ¬p, ¬q                   β em q→r   aberto ✓
│  └─ ¬p, r                    β em q→r   aberto ✓
└─ q                           β em p→q
   ├─ q, ¬q  ✗                 β em q→r   fechado
   └─ q, r                     β em q→r   aberto ✓
```

Há ramos abertos, então o conjunto é **satisfazível**, e cada ramo aberto é um modelo: $p=F,q=F$ (com $r$ qualquer); $p=F,r=V$ (com $q$ qualquer); $q=V,r=V$ (com $p$ qualquer). Para satisfazibilidade, **um** ramo aberto já basta: poderíamos ter parado no primeiro.

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
1. (s ∧ ¬i) → ¬c         premissa
2. c                      premissa
3. s                      premissa
4. ¬i                     negação da conclusão
├─ 5. ¬(s ∧ ¬i)           β em 1
│  ├─ 6. ¬s  ✗            β em 5   (contradiz 3)
│  └─ 7. ¬¬i              β em 5
│     └─ 8. i  ✗          α em 7   (contradiz 4)
└─ 9. ¬c  ✗               β em 1   (contradiz 2)
```

Todos os ramos fecham: **argumento válido.** Em português: usar Swing sem importar a biblioteca impede a compilação, e o programa compilou usando Swing. Logo a biblioteca foi importada.

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

### Aplicação: requisitos que se contradizem

Em engenharia de software, requisitos escritos por pessoas diferentes às vezes são **impossíveis de cumprir juntos**. Isso é exatamente "o conjunto é insatisfazível?". Com $l$: "o usuário está logado" e $p$: "o painel é exibido":

- R1: quem está logado vê o painel: $l\to p$.
- R2: quem **não** está logado não vê o painel: $\neg l\to\neg p$.
- R3: visitantes (não logados) veem uma versão do painel: $\neg l\to p$.
- R4: o sistema precisa funcionar para um visitante: $\neg l$.

```
l → p,  ¬l → ¬p,  ¬l → p,  ¬l
├─ ¬¬l  ✗                   β em R2   (¬¬l é l, contradiz ¬l)
└─ ¬p                       β em R2
   ├─ ¬¬l  ✗                β em R3   (idem)
   └─ p  ✗                  β em R3   (contradiz ¬p)
```

Todos fecham: **os requisitos são inconsistentes**. E repare que o R1 nem foi usado: o conflito está entre R2, R3 e R4. Quando você acha o conjunto mínimo que fecha a árvore, ele aponta exatamente **onde conversar com quem escreveu os requisitos**.

## 5. Mais argumentos para treinar

| Argumento | Veredito |
| --- | --- |
| $P\to(R\to Q),\ P\to R\models P\to Q$ | **Válido** |
| $(P\to P_1)\land(Q\to Q_1)\models(P\to Q_1)\lor(Q\to P_1)$ | **Válido** |
| $P\to(Q\to R)\models(P\land Q)\to R$ | **Válido** ("exportação") |

Para o terceiro, a negação da conclusão dá $P,\ Q,\ \neg R$; a premissa $P\to(Q\to R)$ ramifica em $\neg P$ (fecha), e $(Q\to R)$ ramifica em $\neg Q$ (fecha) e $R$ (fecha). Tudo fecha.

> [!NOTE]
> Existem geradores online de tableaux (busque por "semantic tableaux generator") que desenham a árvore para você conferir seu trabalho. Use para **conferir**, mas faça primeiro no papel!

## Erros comuns

- **Esquecer de negar a conclusão.** Na raiz vão as premissas **e** a negação da conclusão. Sem isso você estaria testando outra coisa.
- **Negar uma premissa em vez da conclusão.** Só a conclusão é negada.
- **Ler "ramo aberto" como "argumento válido".** É o contrário: ramo aberto é um mundo com premissas V e conclusão F, ou seja, um **contra-exemplo**. Válido é quando **tudo fecha**.
- **Não usar uma premissa $\beta$ em todos os ramos abertos.** Uma premissa vale em todo o tableaux: se um ramo aberto ainda não a aplicou, ele pode fechar (ou não) depois dela.
- **Contra-exemplo incompleto.** O ramo aberto pode não mencionar uma letra; ao escrever o contra-exemplo, escolha um valor (V ou F) para ela e confira premissas e conclusão.

## Resumo

- Argumento $\varphi_1..\varphi_n\models\psi$ $\iff$ $\{\varphi_1,\ldots,\varphi_n,\neg\psi\}$ insatisfazível.
- **Fechou tudo $\Rightarrow$ válido. Sobrou ramo aberto $\Rightarrow$ inválido** (e o ramo é o contra-exemplo).
- Dica: aplique $\alpha$ antes de $\beta$; feche o ramo assim que achar $X$ e $\neg X$.

## Exercícios

**Exercício 1.** Teste cada argumento com tableaux (negue a conclusão e procure ramos abertos) e responda: válido ou inválido? Os itens (a) a (d) estão no quiz; o exercício 2, mais abaixo, você resolve no caderno.

{{< quiz titulo="argumentos com tableaux" >}}

{{< questao >}}
**(a)** $p\to q,\ \neg q\models\neg p$

- [x] Válido
- [ ] Inválido
---
Negando a conclusão: $\neg\neg p=p$. Em $p\to q$: $\neg p$ fecha com $p$; $q$ fecha com $\neg q$. **Válido** ("modus tollens").
{{< /questao >}}

{{< questao >}}
**(b)** $p\to q,\ q\models p$

- [ ] Válido
- [x] Inválido
---
Negando a conclusão: $\neg p$. Em $p\to q$: o ramo $\neg p$ fica aberto. **Inválido.** Contra-exemplo: $p=F,q=V$. É o erro de "afirmar o consequente".
{{< /questao >}}

{{< questao >}}
**(c)** $p\lor q,\ \neg p\models q$

- [x] Válido
- [ ] Inválido
---
Negando: $\neg q$. Em $p\lor q$: o ramo $p$ fecha com $\neg p$; o ramo $q$ fecha com $\neg q$. **Válido** (silogismo disjuntivo).
{{< /questao >}}

{{< questao >}}
**(d)** Traduza e teste: "Se chove, a rua molha. A rua molhou. Logo, choveu."

- [ ] Válido
- [x] Inválido
---
Traduzido: $c\to m,\ m\models c$. É o mesmo do item (b): **inválido** (a rua pode ter molhado por outro motivo).
{{< /questao >}}

{{< /quiz >}}

**Exercício 2.** Teste: $p\to q,\ r\to q\models(p\lor r)\to q$.

{{< details title="Gabarito" >}}
Negando: $\neg((p\lor r)\to q)$ vira $p\lor r,\ \neg q$. Em $p\to q$: $\neg p$ ou $q$ (fecha). Com $\neg p$, usando $r\to q$: $\neg r$ ou $q$ (fecha). No ramo $\neg p,\neg r$, a fórmula $p\lor r$ ramifica em $p$ (fecha com $\neg p$) e $r$ (fecha com $\neg r$). **Válido.**
{{< /details >}}

**Exercício 3.** Traduza e teste: *"Se o servidor cair, o alarme toca. O alarme não tocou. Logo, o servidor não caiu."*

{{< details title="Gabarito" >}}
$s$: o servidor cai; $a$: o alarme toca. $s\to a,\ \neg a\models\neg s$. Negando a conclusão: $\neg\neg s$, isto é, $s$. Em $s\to a$: o galho $\neg s$ fecha (temos $s$) e o galho $a$ fecha (temos $\neg a$). **Válido** (modus tollens).
{{< /details >}}

**Exercício 4.** Traduza e teste: *"Se o disco enche, o log para. O log parou. Logo, o disco encheu."* Se for inválido, dê um contra-exemplo.

{{< details title="Gabarito" >}}
$d$: o disco enche; $l$: o log para. $d\to l,\ l\models d$. Negando a conclusão: $\neg d$. Em $d\to l$: o galho $\neg d$ fica aberto (junto com $l$, sem complementares). **Inválido.** Contra-exemplo: $d=F,\ l=V$ (o log parou por outro motivo, como um erro de permissão). É a afirmação do consequente.
{{< /details >}}

**Exercício 5.** Traduza e teste: *"Maria vai à festa ou fica em casa. Se vai à festa, encontra o João. Ela não encontrou o João. Logo, ficou em casa."*

{{< details title="Gabarito" >}}
$f$: vai à festa; $h$: fica em casa; $j$: encontra o João. $f\lor h,\ f\to j,\ \neg j\models h$. Negando a conclusão: $\neg h$. Em $f\lor h$: o galho $h$ fecha (temos $\neg h$); o galho $f$ segue. Nele, em $f\to j$: $\neg f$ fecha e $j$ fecha (temos $\neg j$). **Válido.**
{{< /details >}}

**Exercício 6.** Os requisitos a seguir são consistentes? R1: se há erro, o sistema exibe um aviso ($e\to w$). R2: se exibe aviso, bloqueia o envio ($w\to b$). R3: o envio nunca é bloqueado ($\neg b$). R4: houve um erro ($e$).

{{< details title="Gabarito" >}}
Raiz: $e\to w,\ w\to b,\ \neg b,\ e$. Em $e\to w$: o galho $\neg e$ fecha (temos $e$); sobra $w$. Em $w\to b$: o galho $\neg w$ fecha (temos $w$); o galho $b$ fecha (temos $\neg b$). Todos fechados: **inconsistentes**. Os quatro entram na contradição: se houve erro, há aviso e bloqueio; mas o envio nunca é bloqueado.
{{< /details >}}
