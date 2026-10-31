---
title: Traduzindo o Português para a Lógica
weight: 3
description: Receita de tradução, dicionário português-lógica, condição necessária e suficiente, ou exclusivo e argumentos.
autores:
  - thallesgsrv
date: 2026-10-15
---

## Sobre

Traduzir do português para a lógica é a parte mais **escorregadia** do curso: o português tem jeitinhos ("só se", "a menos que", "basta") que mudam o sentido de uma frase inteira. Aqui você ganha uma receita, um dicionário e os truques para não errar o lado da seta.

Ao final você deve conseguir:

- traduzir uma frase para uma fórmula usando a receita de 4 passos;
- distinguir **"se"**, **"só se"**, **condição necessária** e **condição suficiente**;
- escolher entre "ou" inclusivo e exclusivo;
- traduzir um **argumento** inteiro (premissas $\models$ conclusão) e **conferir** a sua tradução com cenários.

## 1. A receita de 4 passos

Traduzir é a parte mais **escorregadia** do curso, porque o português é cheio de jeitinhos. Use sempre esta receita:

1. **Ache os átomos** (as frases simples) e dê uma letra a cada.
2. **Ache os conectivos** (e, ou, se, não, só se…).
3. **Ache o conectivo principal** (o que "manda" na frase; ele fica por fora).
4. **Monte a fórmula**, com parênteses onde precisar.

> [!TIP]
> **Escreva os átomos sempre na forma afirmativa.** Em vez de $p$: "Não choveu", use $p$: "Choveu" e escreva $\neg p$ quando preciso. Assim você não confunde a letra com o "não".

## 2. Dicionário português $\to$ lógica

| Em português | Lógica |
| --- | --- |
| $A$ **e** $B$; $A$ **mas** $B$; $A$ **também** $B$; $A$ **além disso** $B$; **embora**, **porém** | $A\land B$ |
| $A$ **ou** $B$ | $A\lor B$ (ou $A\oplus B$, veja a seção 4) |
| **Não** $A$; é **falso que** $A$; **não é verdade que** $A$ | $\neg A$ |
| **Se** $A$, **então** $B$; $A$ **implica** $B$; $B$ **segue de** $A$ | $A\to B$ |
| $A$ **somente se** $B$; $A$ **só se** $B$ | $A\to B$ |
| $B$ **se** $A$; $B$ **quando** $A$; **sempre que** $A$, $B$ | $A\to B$ |
| $A$ **é suficiente** para $B$; **basta** $A$ para $B$ | $A\to B$ |
| $A$ **é necessária** para $B$; $B$ **só se** $A$ | $B\to A$ |
| $A$ **se, e somente se,** $B$; $A$ é necessária **e** suficiente para $B$ | $A\leftrightarrow B$ |
| $A$ **a não ser que** $B$; $A$ **a menos que** $B$; $A$ **exceto se** $B$ | $\neg B\to A$ (equivale a $A\lor B$) |
| **Se** $A$, **então** $B$, **senão** $C$ | $(A\to B)\land(\neg A\to C)$ |
| **Nem** $A$ **nem** $B$ | $\neg A\land\neg B$ |
| **Não ambos**: $A$ e $B$ | $\neg(A\land B)$ |

**"Mas" é "e"!** Logicamente, "mas" só acrescenta um tom de contraste. Com $e$: "Estudei" e $p$: "Passei", a frase *"Estudei, mas não passei"* vira $e\land\neg p$.

> [!WARNING]
> **"Logo" e "portanto" não são implicação.** Elas marcam a **conclusão de um argumento** (veja a seção 8), e não um conectivo dentro de uma fórmula. "Se $A$, então $B$" é uma fórmula ($A\to B$); "$A$, logo $B$" é um argumento ($A\models B$).

> [!NOTE]
> **Para quem programa:** "se $A$, então $B$, senão $C$" é exatamente um `if (A) { B } else { C }`. E "a menos que" é só um "ou" disfarçado: *"Chego cedo, a menos que chova"* diz que ou chego cedo, ou chove (ou os dois).

## 3. O problema número 1: o "se"

A implicação $A\to B$ tem um **antecedente** ($A$, o que vem antes da seta) e um **consequente** ($B$, o que vem depois). A confusão é saber qual frase vai para qual lado.

### Truque do "só se"

Compare:

| Frase | Fórmula | Por quê |
| --- | --- | --- |
| "Irei ao teatro **se** for comédia." | $q\to p$ | Comédia **basta** para eu ir. |
| "Irei ao teatro **somente se** for comédia." | $p\to q$ | Se eu fui, **tinha que** ser comédia. |

Com $p$: "Vou ao teatro" e $q$: "A peça é comédia".

> [!IMPORTANT]
> **"A se B" $=$ $B\to A$** (o que vem depois do "se" é o antecedente).
> **"A só se B" $=$ $A\to B$** (o "só se" aponta para a **exigência**).

### Necessário e suficiente (versão de gente)

Pense em **se formar** ($c$) e **ter pago Lógica** ($a$):

- **Suficiente:** *"Estar formado **basta** para ter pago Lógica."* Formou $\Rightarrow$ pagou: $c\to a$.
- **Necessário:** *"Ter pago Lógica é **necessário** para se formar."* Sem pagar, não forma. Se formou, então pagou: $c\to a$ (a **mesma** fórmula!).
- **Só se:** *"Ele se formou só se pagou lógica."* $c\to a$.

Todas dizem $c\to a$. Moral: **o "suficiente" vira o antecedente, o "necessário" vira o consequente.**

> [!TIP]
> **Teste prático:** pergunte "se acontecer o X, o Y **obrigatoriamente** acontece?" Se sim, $X\to Y$. Condição **necessária** é a que **tem** que acontecer; condição **suficiente** é a que, sozinha, **garante**.

## 4. "Ou": inclusivo ou exclusivo?

- **Inclusivo** ($\lor$): pelo menos um, podendo ser os dois. *"Você pode escolher sobremesa **ou** bebida"* ($s\lor b$). *"Mais tarde irei ao cinema ou para casa."*
- **Exclusivo** ($\oplus$): um, mas **não** os dois. *"Escolha sobremesa **ou** bebida, mas não ambos"* ($s\oplus b$). *"Todo inteiro é par **ou** ímpar"* ($i\oplus p$, pois nunca é os dois).

Na dúvida, pergunte: **"os dois ao mesmo tempo seria possível/aceitável?"** Se sim, inclusivo.

## 5. Como conferir a sua tradução

Depois de traduzir, **teste a fórmula contra cenários**. Para cada situação possível, pergunte: *"a frase em português fica respeitada ou violada?"* e compare com o valor da fórmula.

**Exemplo.** *"Só vou ao teatro se for comédia."* Com $p$: "Vou ao teatro" e $q$: "A peça é comédia", duas candidatas: $p\to q$ e $q\to p$.

| Cenário | A frase fica... | $p\to q$ | $q\to p$ |
| --- | --- | --- | --- |
| Vou, e é comédia | respeitada | V | V |
| Vou, e **não** é comédia | **violada** | F | V |
| Não vou, mas é comédia | respeitada (não prometi ir a toda comédia) | V | **F** |
| Não vou, e não é comédia | respeitada | V | V |

Só $p\to q$ concorda com a frase nos quatro cenários. A candidata $q\to p$ erra no terceiro: ela diria que a frase foi violada, mas ninguém prometeu ir a *toda* comédia.

> [!TIP]
> **O cenário decisivo** quase sempre é aquele em que a frase é **violada**. Ache a situação que faria alguém dizer *"você mentiu"* e confira que a fórmula dá F exatamente ali.

### Armadilhas frequentes

- **"E" que significa "então".** *"Estude e você passará"* é uma promessa: $e\to p$. Não é $e\land p$, que diria que você estuda *e* passa, como se fossem dois fatos soltos.
- **"Não" e "ou" juntos.** *"Não é verdade que choveu ou fez frio"* é $\neg(c\lor f)$. Já *"Não choveu, ou fez frio"* é $\neg c\lor f$. Leia em voz alta e veja onde está a pausa.
- **"Só" não é sempre "só se".** *"Só Ana passou"* quer dizer que *mais ninguém* passou (veja a seção 7). *"Ana só passa se estudar"* é a implicação $p\to e$.
- **"Todo" e "algum".** Em lógica proposicional não existem. Traduza o caso concreto de que a frase fala (como no exemplo do Zé) e deixe os quantificadores para a lógica de predicados.

## 6. Exemplos resolvidos

**1.** "Se eu **era** feliz, então você e eu somos felizes."
$p$: eu era feliz; $q$: eu sou feliz; $r$: você é feliz. $\Rightarrow$ $p\to(q\land r)$.

**2.** "Se eu sou feliz, você é infeliz; e se você é infeliz, eu não sou feliz."
$p$: eu sou feliz; $q$: você é infeliz. $\Rightarrow$ $(p\to q)\land(q\to\neg p)$.

**3.** "Se minha namorada vier, irei ao teatro somente se for comédia."
$r$: namorada vem; $p$: vou ao teatro; $q$: comédia. $\Rightarrow$ $r\to(p\to q)$.

**4.** "Se ocorrer uma requisição, então ou ela será reconhecida em algum momento, ou o processo requisitante trava."
$r_1$: requisição ocorreu; $r_2$: foi reconhecida; $r_3$: processo trava. $\Rightarrow$ $r_1\to(r_2\lor r_3)$.

**5.** "A doença não será curada a não ser que sua causa seja determinada **e** uma nova droga seja desenvolvida."
$d$: curada; $c$: causa determinada; $n$: nova droga. "Só curou se tinha causa e droga": $d\to(c\land n)$. Equivalente: $\neg(c\land n)\to\neg d$.

**6.** "Se Jonny instalou aquecimento central, com certeza vendeu o carro ou não pagou o financiamento."
$a$: instalou; $c$: vendeu o carro; $f$: pagou o financiamento. $\Rightarrow$ $a\to(c\lor\neg f)$.

**7.** "É falso que se Montreal é a capital do Canadá, então a próxima Copa será no Brasil." $\Rightarrow$ $\neg(M\to B)$. Já *"Se é **falso** que Montreal é a capital, então a Copa será no Brasil"* $\Rightarrow$ $\neg M\to B$. Observe como a posição do "falso" muda tudo.

**8.** "É necessário coletar impostos para construir uma praça." ($c$: construir praça; $i$: coletar impostos.) $\Rightarrow$ $c\to i$.

**9.** "É proibido fumar cigarro ou charuto." $\Rightarrow$ não pode fumar nenhum dos dois: $\neg p\land\neg q\equiv\neg(p\lor q)$.

## 7. Contando: "apenas um", "pelo menos", "exatamente"

Sejam $a,b,c$: Amadeu, Bruno e Carlito passaram no teste.

| Frase | Fórmula |
| --- | --- |
| Carlito é o único a passar | $c\land\neg a\land\neg b$ |
| Amadeu foi o único que **não** passou | $\neg a\land b\land c$ |
| Apenas um passou | $(a\land\neg b\land\neg c)\lor(\neg a\land b\land\neg c)\lor(\neg a\land\neg b\land c)$ |
| Ninguém passou | $\neg a\land\neg b\land\neg c$ |
| Todos passaram | $a\land b\land c$ |
| Pelo menos um passou | $a\lor b\lor c$ |
| Pelo menos dois passaram | $(a\land b)\lor(a\land c)\lor(b\land c)$ |
| No máximo um passou | $\neg(a\land b)\land\neg(a\land c)\land\neg(b\land c)$ |
| No máximo dois passaram | $\neg(a\land b\land c)$ |
| Exatamente dois passaram | $(a\land b\land\neg c)\lor(a\land\neg b\land c)\lor(\neg a\land b\land c)$ |

**Macete:** para "exatamente", liste **cada caso** possível com $\lor$ e, dentro de cada caso, diga **quem passou e quem não passou** com $\land$. Para "pelo menos", liste só os casos **mínimos** (aqui, os pares). Para "no máximo", é mais fácil **negar** o que passaria do limite.

## 8. Traduzindo argumentos

Um argumento vira uma lista de **premissas** (separadas por vírgula) seguida de $\models$ e da **conclusão**:
$$
\text{premissa}_1,\ \text{premissa}_2,\ \ldots\ \models\ \text{conclusão}
$$
($\models$ lê-se "implica logicamente" ou "tem como consequência". Existe também $\vdash$, que significa "se prova", mas por ora trate os dois como "a conclusão decorre".)

Para separar as premissas da conclusão, procure as palavras-pista da página de Conceitos: **logo, portanto, então** marcam a conclusão; **porque, pois, já que** marcam premissas.

**Exemplo 1 (Swing).** $s$: usa Swing; $i$: importou; $c$: compilou.
$$
s\land\neg i\to\neg c,\ \ c,\ \ s\ \models\ i
$$

**Exemplo 2 (revista).** $r$: li a revista na cozinha; $o$: óculos na mesa da cozinha.
$$
r\to o,\ \ \neg r\ \models\ \neg o
$$
Este é **inválido** (os óculos podem estar lá por outro motivo): é o erro da "negação do antecedente".

**Exemplo 3 (senha).** $s$: senha segura; $c$: senha complexa. "Segura só se complexa": $s\to c$.
$$
s\to c,\ \ \neg c\ \models\ \neg s
$$

**Exemplo 4 (culpa).** $p$: *a* é culpado; $q$: *b* é culpado; $r$: *b* bateu por trás em *a*.
$$
p\oplus q,\ \ r,\ \ r\to q\ \models\ q
$$
("Só um é culpado", "a senhora bateu por trás", "quem bate por trás é culpado", logo a senhora é culpada.)

**Exemplo 5 (Zé).** $p$: Zé tem dinheiro; $q$: Zé é feliz. "Quem tem dinheiro é feliz" $=$ $p\to q$.
$$
p\to q,\ \ p\ \models\ q
$$

**Exemplo 6 (time).** $j$: joga bem; $g$: ganha; $t$: técnico culpado; $c$: torcedores contentes.
$$
j\to g,\ \ \neg j\to t,\ \ g\to c,\ \ \neg c\ \models\ t
$$

**Exemplo 7 (Ana).** $p$: dor de estômago; $q$: irritada; $r$: tomou remédio.
$$
p\to q,\ \ r\to p,\ \ \neg q\ \models\ \neg r
$$

> [!NOTE]
> "Quem tem dinheiro é feliz" fala de **todos** (é uma regra geral). Aqui usamos só o caso do Zé. Em lógica proposicional não existe o "todo" ainda; isso fica para a lógica de predicados.

## Resumo

- **Receita:** átomos $\to$ conectivos $\to$ conectivo principal $\to$ fórmula.
- "Mas" $=$ "e". "A se B" $=$ $B\to A$. "A só se B" $=$ $A\to B$.
- Suficiente $=$ antecedente. Necessário $=$ consequente.
- "Ou" é inclusivo, a não ser que digam "mas não ambos".
- "A menos que $B$" é $\neg B\to A$ (equivale a $A\lor B$). "Se $A$ então $B$, senão $C$" é $(A\to B)\land(\neg A\to C)$.
- "Logo" e "portanto" marcam a conclusão de um **argumento** ($\models$), não um $\to$.
- **Confira a tradução com cenários**, sobretudo o que **viola** a frase.

## Exercícios

**Exercício 1.** $p$: "Está chovendo"; $q$: "Vou à praia". Traduza: "Só vou à praia se não estiver chovendo."

{{< details title="Gabarito" >}}
"Só vou se…" $=$ $q\to\neg p$.
{{< /details >}}

**Exercício 2.** Antecedente e consequente: "Uma boa dieta é condição necessária para um gato ser saudável."

{{< details title="Gabarito" >}}
Ser saudável $\to$ ter boa dieta. Antecedente: o gato é saudável. Consequente: o gato tem boa dieta.
{{< /details >}}

**Exercício 3.** "Os abacates só estão maduros quando estão escuros e macios."

{{< details title="Gabarito" >}}
$m\to(e\land s)$: antecedente "maduro"; consequente "escuro e macio".
{{< /details >}}

**Exercício 4.** "Uma condição suficiente para a falha da rede é que a chave central desligue."

{{< details title="Gabarito" >}}
Chave desliga $\to$ rede falha. (Suficiente $=$ antecedente.)
{{< /details >}}

**Exercício 5.** Sendo $A$: Paraná livre de aftosa sem vacinação; $B$: ampliação do comércio; $C$: aumento do preço; $D$: estado mais rico. Traduza: "Se $A$, então haverá $B$ e $C$; com isso, o estado será mais rico."

{{< details title="Gabarito" >}}
$(A\to B\land C)\to D$. Como $\land$ tem precedência sobre $\to$, $A\to B\land C$ é $A\to(B\land C)$.
{{< /details >}}

**Exercício 6.** Considere $p$: ursos-cinzentos são vistos; $q$: caminhar na trilha é seguro; $r$: bagas maduras. Traduza:\
(a) As bagas estão maduras, mas os ursos não são vistos.\
(b) Não vemos ursos e a trilha é segura, mas as bagas estão maduras.\
(c) Se as bagas estão maduras, caminhar é seguro se, e somente se, não há ursos.\
(d) Não é seguro caminhar, mas não há ursos e as bagas estão maduras.\
(e) Para caminhar com segurança, é necessário, mas não suficiente, que não haja bagas maduras e que não haja ursos.\
(f) Caminhar não é seguro sempre que ursos são vistos e bagas estão maduras.

{{< details title="Gabarito" >}}
(a) $r\land\neg p$\
(b) $\neg p\land q\land r$\
(c) $r\to(q\leftrightarrow\neg p)$\
(d) $\neg q\land\neg p\land r$\
(e) $\big(q\to(\neg r\land\neg p)\big)\land\neg\big((\neg r\land\neg p)\to q\big)$. A primeira parte é a necessidade; a segunda nega a suficiência.\
(f) $(p\land r)\to\neg q$
{{< /details >}}

**Exercício 7.** Traduza o argumento: "Se Ana estuda, passa. Ana não passou. Logo, Ana não estudou."

{{< details title="Gabarito" >}}
$e$: Ana estuda; $p$: Ana passa. $e\to p,\ \neg p\models\neg e$. (Válido: é a contrapositiva em ação.)
{{< /details >}}

**Exercício 8.** Traduza: *"Você não passa em Lógica a menos que estude."* ($p$: passa em Lógica; $e$: estuda.) Depois escreva uma fórmula equivalente que use "só se".

{{< details title="Gabarito" >}}
"$A$ a menos que $B$" é $\neg B\to A$, com $A$: "não passa" ($\neg p$) e $B$: "estuda" ($e$). Fica $\neg e\to\neg p$. Pela contrapositiva, é o mesmo que $p\to e$: "só passa se estudar".
{{< /details >}}

**Exercício 9.** Traduza para uma fórmula: *"Se o usuário está logado, o sistema mostra o painel; senão, mostra a tela de login."* ($l$: logado; $p$: mostra o painel; $g$: mostra o login.)

{{< details title="Gabarito" >}}
$(l\to p)\land(\neg l\to g)$. É um `if (l) { p } else { g }`. Cada ramo vira uma implicação, e as duas valem ao mesmo tempo.
{{< /details >}}

**Exercício 10.** Com $t_1,t_2,t_3$ ("o teste $i$ falhou"), traduza: (a) *pelo menos dois testes falharam*; (b) *no máximo um teste falhou*.

{{< details title="Gabarito" >}}
(a) $(t_1\land t_2)\lor(t_1\land t_3)\lor(t_2\land t_3)$.\
(b) $\neg(t_1\land t_2)\land\neg(t_1\land t_3)\land\neg(t_2\land t_3)$ (nunca dois ao mesmo tempo).
{{< /details >}}

**Exercício 11.** Escolha a tradução certa. Cada pergunta usa uma armadilha diferente.

{{< quiz titulo="qual tradução?" >}}

{{< questao >}}
*"O servidor só responde se a rede estiver ativa."* ($r$: responde; $a$: rede ativa.)

- [x] $r\to a$
- [ ] $a\to r$
- [ ] $r\leftrightarrow a$
- [ ] $r\land a$
---
"Só ... se" aponta para a **exigência**: responder obriga a rede ativa. A rede ativa não garante resposta (a $a\to r$ é a recíproca, o erro mais comum).
{{< /questao >}}

{{< questao >}}
*"Ter nota 7 basta para passar."* ($n$: nota 7; $p$: passa.)

- [x] $n\to p$
- [ ] $p\to n$
- [ ] $n\land p$
- [ ] $p\leftrightarrow n$
---
"Basta" é **suficiente**, e suficiente vira antecedente. Ter 7 garante passar, mas dá para passar sem ter 7 (com 8, por exemplo), por isso não é $\leftrightarrow$.
{{< /questao >}}

{{< questao >}}
*"O código não compila a menos que as importações estejam corretas."* ($c$: compila; $i$: importações corretas.)

- [x] $c\to i$
- [ ] $i\to c$
- [ ] $\neg c\to\neg i$
- [ ] $c\land i$
---
"$A$ a menos que $B$" é $\neg B\to A$, aqui $\neg i\to\neg c$. Pela contrapositiva, é $c\to i$: compilar exige importações corretas. As outras são recíprocas ou afirmam coisas demais.
{{< /questao >}}

{{< questao >}}
*"Ter a chave é necessário para abrir o cofre."* ($k$: tem a chave; $a$: abre o cofre.)

- [x] $a\to k$
- [ ] $k\to a$
- [ ] $k\leftrightarrow a$
- [ ] $a\land k$
---
Necessário vira **consequente**: se abriu, então tinha a chave. Ter a chave não garante abrir (pode faltar a senha).
{{< /questao >}}

{{< /quiz >}}
