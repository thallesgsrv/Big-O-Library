---
title: Logaritmo
weight: 9
description: Definição, bases especiais (10 e e), mudança de base, propriedades operatórias e como usar logaritmos para resolver equações exponenciais.
autores:
  - thallesgsrv
date: 2026-11-02
---

## Sobre

O logaritmo tem fama de vilão, mas é uma ideia simples disfarçada: **é só o expoente**. Se a função exponencial responde "quanto dá $2^{10}$?", o logaritmo responde a pergunta ao contrário: "$2$ elevado a **quanto** dá $1024$?". Quando você pegar essa leitura, o resto do tópico vira regra de três (com um pouco mais de charme).

## A motivação: equações que a gente não consegue resolver (ainda)

Algumas equações exponenciais são fáceis porque dá para transformar tudo em potências da mesma base:

$$
2^x=8\;\Rightarrow\;2^x=2^3\;\Rightarrow\;x=3
\qquad\qquad
10^y=10000\;\Rightarrow\;10^y=10^4\;\Rightarrow\;y=4
$$

Mas e se for $5^x=200$? Ninguém sabe de cabeça quanto é "5 elevado a quê" para dar 200. Precisamos de uma ferramenta nova: o **logaritmo**.

## Definição

Logaritmo é **outra maneira de escrever uma potência**:

$$
\boxed{B^{E}=R\iff E=\log_B R}
$$

- $B$ é a **base**.
- $E$ é o **expoente** (e o logaritmo é *exatamente* ele).
- $R$ é o **resultado** da potência (chamado de *logaritmando*).

Como ler: "$\log_B R$ é o expoente ao qual preciso elevar $B$ para obter $R$."

**Exemplo:** $2^3=8$ equivale a $3=\log_28$. Aqui $B=2$, $E=3$, $R=8$. Ou seja, $\log_28=3$ porque $2^3=8$.

**Condições de existência:** a base $B$ é **positiva e diferente de 1**, e o logaritmando $R$ é **positivo**. Por quê?

- $B=1$: $1^E$ vale sempre 1, não serve para "alcançar" nenhum outro número.
- $R>0$: uma base positiva elevada a qualquer expoente real nunca dá zero nem negativo. Por isso $\log_2(-4)$ e $\log_2 0$ **não existem**.

### Calculando logaritmos "na mão"

Passo: chame o resultado de $x$, transforme em potência e iguale as bases.

**Quanto é $\log_3 27$?**

$$
\log_327=x\iff 3^x=27\iff3^x=3^3\iff x=3
$$

**Quanto é $\log_{10}10000$?**

$$
\log_{10}10000=x\iff10^x=10000\iff10^x=10^4\iff x=4
$$

> [!TIP]
> Para treinar, leia sempre como pergunta: "$\log_2 32$ é **2 elevado a quanto** para dar 32?" Resposta: 5. E $\log_5\frac1{25}=-2$, porque $5^{-2}=\frac1{25}$. Expoente negativo é totalmente permitido.

### Em computação, o $\log_2$ é seu melhor amigo

- Quantas vezes você divide $1024$ ao meio até chegar em $1$? $\log_2 1024=10$. Por isso a **busca binária** em 1024 itens faz no máximo ~10 comparações.
- Quantos **bits** são necessários para representar $n$ valores? $\lceil\log_2 n\rceil$.
- A altura de uma árvore binária balanceada com $n$ nós é cerca de $\log_2 n$.

É por isso que $O(\log n)$ é considerado tão bom: mesmo se $n$ é gigante, $\log n$ continua minúsculo.

## Bases especiais

Algumas bases são tão populares que ganharam nome (e atalho na calculadora).

### Base 10: o logaritmo decimal

É a mais comum. **Quando a base não aparece escrita, ela é 10**: $\log 40$ significa $\log_{10}40$.

$$
10^x=40\iff x=\log_{10}40=\log40\approx1{,}602
$$

### Base $e$: o logaritmo natural

O número $e=2{,}718281828\ldots$ é uma constante **irracional** (como o $\pi$), e aparece em crescimento contínuo (juros contínuos, decaimento radioativo, probabilidade...). O $\log_e$ é tão usado que tem nome e símbolo próprios: **$\ln$** (logaritmo neperiano ou natural).

$$
e^x=15\iff x=\log_e15=\ln15\approx2{,}708
$$

> [!NOTE]
> Em muitas linguagens de programação, `log` é o **natural** (base $e$), não o de base 10! Em Python, `math.log(x)` é $\ln x$, `math.log10(x)` é $\log_{10}x$, `math.log2(x)` é $\log_2x$ e `math.log(x, b)` é $\log_bx$. Confira sempre qual `log` você está usando.

## Mudança de base

A calculadora (e o computador) só tem teclas para $\log$ (base 10) e $\ln$ (base $e$). Como calcular, por exemplo, $\log_5 30$? Com a **mudança de base**: você escolhe uma base $c$ conveniente e faz

$$
\boxed{\log_b(a)=\frac{\log_c(a)}{\log_c(b)}}
$$

**Exemplo:** resolver $5^x=30$.

$$
x=\log_530=\frac{\log30}{\log5}\approx\frac{1{,}4771}{0{,}6990}\approx2{,}113
$$

> [!NOTE]
> No slide original aparece $2{,}116$, resultado de dividir $1{,}477$ por $0{,}698$ (os logaritmos arredondados com só três casas). Arredondar demais **no meio** da conta desloca a resposta. Moral: guarde mais casas decimais e arredonde só no fim. O valor mais preciso é $2{,}113$.

## Resolvendo equações exponenciais com logaritmo

Agora temos a ferramenta que faltava.

### Exemplo 1: $7^{x+1}=1000$

Passe para a forma logarítmica: $x+1=\log_71000$. Então $x=\log_71000-1$. Mudando para a base $e$:

$$
\log_71000=\frac{\ln1000}{\ln7}\approx\frac{6{,}9078}{1{,}9459}\approx3{,}5499
\qquad\Rightarrow\qquad x\approx2{,}55
$$

### Exemplo 2: a doença que se espalha

O número de infectados cresce **40% por semana**, e hoje são 1000 infectados.

**a) A função.** $f(x)=P_0\cdot a^x$ com $P_0=1000$ e $a=1+0{,}4=1{,}4$:

$$
f(x)=1000\cdot1{,}4^x
$$

**b) Quando teremos 1 000 000 de infectados?**

$$
1\,000\,000=1000\cdot1{,}4^x\;\Rightarrow\;1000=1{,}4^x\;\Rightarrow\;x=\log_{1{,}4}1000=\frac{\log1000}{\log1{,}4}=\frac{3}{0{,}146128}\approx20{,}5
$$

Em cerca de **20,5 semanas** (uns 5 meses) o número passa de mil para um milhão.

> [!IMPORTANT]
> O padrão para resolver "$a^x=b$" é sempre o mesmo: $x=\log_ab=\dfrac{\log b}{\log a}$. Se a incógnita está no expoente, **logaritmo nos dois lados** resolve.

## Propriedades operatórias

São as regras que deixam o logaritmo "calculável". Elas transformam **multiplicação em soma**, **divisão em subtração** e **potência em multiplicação** (foi para isso que Napier inventou o logaritmo, séculos antes das calculadoras):

| Propriedade | Fórmula |
| --- | --- |
| Produto | $\log_B(x\cdot y)=\log_Bx+\log_By$ |
| Quociente | $\log_B\!\left(\dfrac xy\right)=\log_Bx-\log_By$ |
| Potência | $\log_B(x^n)=n\cdot\log_Bx$ |

E os casos especiais que você já deve saber de cabeça:

| Propriedade | Por quê |
| --- | --- |
| $\log_B1=0$ | $B^0=1$ |
| $\log_BB=1$ | $B^1=B$ |
| $\log_BB^n=n$ | o log "desfaz" a potência |
| $B^{\log_B n}=n$ | e a potência "desfaz" o log |

> [!CAUTION]
> Os erros mais comuns: $\log(x+y)$ **não é** $\log x+\log y$ (a soma só aparece quando é **produto** dentro), e $\log(x)\cdot\log(y)$ **não é** $\log(x+y)$. O logaritmo só "quebra" produto, quociente e potência.

### Exemplos de uso

**1) Dados $\log2=0{,}3$ e $\log3=0{,}48$, calcule $\log60$.** Decomponha $60=2\cdot3\cdot10$:

$$
\log60=\log2+\log3+\log10=0{,}3+0{,}48+1=1{,}78
$$

**2) Dado $\log5=0{,}7$, calcule $\log0{,}5$.** Escreva $0{,}5=\frac5{10}$:

$$
\log0{,}5=\log5-\log10=0{,}7-1=-0{,}3
$$

**3) Dado $\log3=0{,}48$, calcule $\log81$.** Como $81=3^4$:

$$
\log81=4\cdot\log3=4\cdot0{,}48=1{,}92
$$

**4) Calcule $\log_232+\log_2\frac18$.**

$$
\log_232=\log_22^5=5
\qquad
\log_2\tfrac18=\log_21-\log_28=0-3=-3
\qquad\Rightarrow\qquad5+(-3)=2
$$

(Também dá para fazer de uma vez: $\log_2(32\cdot\frac18)=\log_24=2$.)

### Expandindo expressões

**Expanda $\log_a\!\left(\dfrac{3x^2y}{\sqrt z}\right)$.** Do mais externo para o mais interno:

1. Quociente: $\log_a(3x^2y)-\log_a\sqrt z$.
2. Produto no primeiro: $\log_a3+\log_ax^2+\log_ay$.
3. Potência: $\log_ax^2=2\log_ax$ e $\log_a\sqrt z=\log_az^{1/2}=\frac12\log_az$.

$$
\log_a\!\left(\frac{3x^2y}{\sqrt z}\right)=\log_a3+2\log_ax+\log_ay-\tfrac12\log_az
$$

**Expanda $\log_a\!\left(\sqrt[3]{\dfrac{xy}{z^2}}\right)$.** A raiz cúbica é expoente $\frac13$:

$$
=\frac13\left(\log_ax+\log_ay-2\log_az\right)=\frac13\log_ax+\frac13\log_ay-\frac23\log_az
$$

## Resumão

| Ideia | Fórmula |
| --- | --- |
| Definição | $B^E=R\iff E=\log_BR$ |
| Existência | $B>0$, $B\ne1$, $R>0$ |
| Base 10 | $\log$ (sem base escrita) |
| Base $e$ | $\ln$ |
| Mudança de base | $\log_ba=\dfrac{\log_ca}{\log_cb}$ |
| Resolver $a^x=b$ | $x=\dfrac{\log b}{\log a}$ |
| Produto, quociente, potência | soma, subtração, multiplicação |

## Exercícios

**E1.** Resolva $\log_x64=3$.

{{< details title="Gabarito" >}}
Em forma de potência: $x^3=64$, logo $x=4$ (a base tem que ser positiva e diferente de 1, e $4$ serve).
{{< /details >}}

**E2.** Um produto custa 100 reais e sofre inflação de 5% ao ano. Em quanto tempo o preço dobra?

{{< details title="Gabarito" >}}
$100\cdot1{,}05^t=200\Rightarrow1{,}05^t=2\Rightarrow t=\dfrac{\ln2}{\ln1{,}05}\approx14{,}2$ anos. (O slide apresenta $14{,}3$, mas a conta com mais casas dá $\approx14{,}21$.)
{{< /details >}}

**E3.** Resolva $9^{x-2}=200$.

{{< details title="Gabarito" >}}
$x-2=\log_9200=\dfrac{\ln200}{\ln9}\approx\dfrac{5{,}2983}{2{,}1972}\approx2{,}411$, então $x\approx4{,}411$.
{{< /details >}}

**E4.** Sabendo que $\log2=0{,}3$ e $\log3=0{,}48$, calcule $\log12$.

{{< details title="Gabarito" >}}
$12=2^2\cdot3$, então $\log12=2\cdot0{,}3+0{,}48=1{,}08$.
{{< /details >}}

**E5.** Expanda $\log_3\!\left(\dfrac{9x^2}{\sqrt{x-1}}\right)$.

{{< details title="Gabarito" >}}
$\log_39+\log_3x^2-\log_3(x-1)^{1/2}=2+2\log_3x-\tfrac12\log_3(x-1)$.
{{< /details >}}

### Teste rápido

{{< quiz titulo="Logaritmo" >}}

{{< questao >}}
Quanto vale $\log_2\dfrac18$?

- [ ] $3$
- [x] $-3$
- [ ] $\dfrac13$
- [ ] $-\dfrac13$
---
$\frac18=2^{-3}$, então o expoente é $-3$.
{{< /questao >}}

{{< questao >}}
Qual expressão é igual a $\log_3\!\left(\dfrac{x^2}{y}\right)$?

- [ ] $2\log_3x\cdot\log_3y$
- [ ] $\dfrac{2\log_3x}{\log_3y}$
- [x] $2\log_3x-\log_3y$
- [ ] $\log_3x^2+\log_3y$
---
Quociente vira subtração e a potência sai multiplicando.
{{< /questao >}}

{{< questao >}}
Para calcular $\log_4 50$ numa calculadora que só tem $\log$ e $\ln$, usamos:

- [ ] $\log50-\log4$
- [x] $\dfrac{\log50}{\log4}$
- [ ] $\dfrac{\log4}{\log50}$
- [ ] $\log50\cdot\log4$
---
Mudança de base: $\log_ba=\frac{\log a}{\log b}$ (o logaritmando em cima, a base embaixo). Dá $\approx2{,}82$.
{{< /questao >}}

{{< /quiz >}}
