---
title: Funções
weight: 1
description: Entrada e saída, domínio, imagem, crescimento, tipos de função, composição, inversa e ciclo trigonométrico.
autores:
    - thallesgsrv
date: 2026-10-01
---

## 1. Função: entrada e saída

Imagine uma máquina.

Você coloca um número nela e ela devolve outro número.

Por exemplo:

\[
f(x) = x^2 - 4
\]

Se colocarmos \(x = 2\):

\[
f(2) = 2^2 - 4 = 0
\]

Se colocarmos \(x = 3\):

\[
f(3) = 3^2 - 4 = 5
\]

Podemos pensar assim:

\[
\boxed{x} \longrightarrow \boxed{f(x)}
\]

A função recebe uma entrada e produz uma saída.

Matematicamente:

\[
f : A \rightarrow B
\]

Isso significa que a função relaciona elementos do conjunto \(A\) com elementos do conjunto \(B\).

O ponto mais importante é:

> Para cada entrada permitida, a função deve produzir uma única saída.

## 2. Vamos enxergar a função

Considere novamente:

\[
f(x) = x^2 - 4
\]

Alguns valores são:

\[
f(-3)=5,\quad f(-2)=0,\quad f(-1)=-3,\quad f(0)=-4
\]

\[
f(1)=-3,\quad f(2)=0,\quad f(3)=5
\]

Agora, em vez de olhar apenas para os números, vamos colocar esses pontos no plano cartesiano.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 330" width="100%" role="img" aria-label="Gráfico da função f(x)=x²-4: parábola com vértice em (0, -4) cruzando o eixo x em -2 e 2" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;display:block;">
<line x1="60" y1="170" x2="660" y2="170" stroke="currentColor" stroke-width="2"></line>
<line x1="350" y1="10" x2="350" y2="315" stroke="currentColor" stroke-width="2"></line>
<path d="M89 20 Q 350 560 611 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
<circle cx="89" cy="20" r="5" fill="currentColor"></circle>
<circle cx="176" cy="170" r="5" fill="currentColor"></circle>
<circle cx="263" cy="260" r="5" fill="currentColor"></circle>
<circle cx="350" cy="290" r="6" fill="currentColor"></circle>
<circle cx="437" cy="260" r="5" fill="currentColor"></circle>
<circle cx="524" cy="170" r="5" fill="currentColor"></circle>
<circle cx="611" cy="20" r="5" fill="currentColor"></circle>
<text x="362" y="310" font-size="15" fill="currentColor">(0, -4)</text>
<text x="82" y="160" font-size="15" fill="currentColor">(-2, 0)</text>
<text x="540" y="160" font-size="15" fill="currentColor">(2, 0)</text>
</svg>

Legenda do gráfico:

- eixo horizontal: \(x\)
- eixo vertical: \(y\)
- ponto mínimo: \((0, -4)\)
- pontos marcados: \((-2,0)\), \((2,0)\)

Agora conseguimos perceber algo que uma lista de números não mostra tão bem:

- a função diminui quando \(x\) vai de valores negativos em direção a \(0\);
- ela atinge seu menor valor em \(x=0\);
- depois começa a aumentar;
- o gráfico possui formato de parábola;
- o ponto mais baixo é \((0,-4)\).

É justamente por isso que os gráficos são tão importantes no Cálculo.

## 3. Domínio: quais valores podem entrar?

Agora vem uma pergunta importante:

> Podemos colocar qualquer número em uma função?

Nem sempre.

Considere:

\[
g(x) = \frac{1}{x-2}
\]

Podemos colocar \(x = 5\)?

Sim:

\[
g(5) = \frac{1}{5-2} = \frac{1}{3}
\]

Podemos colocar \(x=0\)?

Sim:

\[
g(0) = \frac{1}{-2} = -\frac{1}{2}
\]

Mas podemos colocar \(x=2\)?

Não.

Teríamos:

\[
g(2) = \frac{1}{2-2} = \frac{1}{0}
\]

E divisão por zero não existe.

Portanto, o número $2$ não pertence ao domínio.

Assim:

\[
D = \mathbb{R} \setminus \{2\}
\]

Ou seja:

> O domínio é o conjunto de valores que podemos colocar na função.

## 4. Imagem: quais valores podem sair?

Agora fazemos a pergunta contrária:

> Quais valores a função consegue produzir?

Considere novamente:

\[
f(x) = x^2 - 4
\]

Sabemos que:

\[
x^2 \ge 0
\]

Portanto:

\[
x^2 - 4 \ge -4
\]

A função nunca produzirá um valor menor que $-4$.

Seu menor valor é:

\[
f(0) = -4
\]

Então:

\[
Im(f) = [-4, +\infty)
\]

No gráfico, isso fica muito mais fácil de enxergar: a curva começa em $y = -4$ e, a partir daí, sobe para os dois lados.

## 5. Crescendo ou diminuindo?

Observe novamente o gráfico de:

\[
f(x) = x^2 - 4
\]

Quando caminhamos pelo eixo $x$ da esquerda para a direita, percebemos duas coisas diferentes.

Antes de $x=0$, a função está diminuindo.

Depois de $x=0$, a função está aumentando.

Podemos resumir:

\[
x < 0 \Rightarrow \text{função decrescente}
\]

\[
x > 0 \Rightarrow \text{função crescente}
\]

E em:

\[
x = 0
\]

temos o ponto mínimo.

Mais adiante, a derivada será uma ferramenta para identificar exatamente esse comportamento.


## 6. Injetora, sobrejetora e bijetora

Três perguntas sobre como a "máquina" se comporta:

- **Injetora:** entradas **diferentes** dão saídas **diferentes**. Ninguém compartilha saída. (Teste prático: nenhuma reta *horizontal* corta o gráfico duas vezes.)
- **Sobrejetora:** **todo** valor do contradomínio $B$ é usado como saída (ou seja, $\mathrm{Im}(f)=B$).
- **Bijetora:** injetora **e** sobrejetora. Cada saída aparece exatamente uma vez.

**Exemplos.**

- $f:\mathbb R\to\mathbb R$, $f(x)=x^2$ **não** é injetora ($f(2)=f(-2)=4$) e **não** é sobrejetora (nunca dá valor negativo).
- $g:\mathbb R\to\mathbb R$, $g(x)=2x+1$ é bijetora: cada $y$ vem de um único $x=\frac{y-1}{2}$.
- Restringindo, $h:[0,+\infty)\to[0,+\infty)$, $h(x)=x^2$ **é** bijetora. Esse "truque de restringir" será usado para criar inversas (seção 8).

> [!TIP]
> Dá para consertar quase qualquer função: **restringindo o domínio** ela fica injetora; **trocando o contradomínio pela imagem** ela fica sobrejetora.

## 7. Operações e composição de funções

Funções podem ser somadas, multiplicadas e... encaixadas:

$$
(f+g)(x)=f(x)+g(x),\quad(f-g)(x)=f(x)-g(x),\quad(f\cdot g)(x)=f(x)\,g(x),\quad\left(\frac fg\right)(x)=\frac{f(x)}{g(x)}\ (g(x)\ne0)
$$

**Composição:** $(f\circ g)(x)=f(g(x))$. Primeiro age a de **dentro** ($g$), depois a de **fora** ($f$).

$$
\boxed{x}\xrightarrow{\ g\ }\boxed{g(x)}\xrightarrow{\ f\ }\boxed{f(g(x))}
$$

**Exemplo.** Com $f(x)=x-1$ e $g(x)=\operatorname{sen}x$:

- $(f\circ g)(x)=f(\operatorname{sen}x)=\operatorname{sen}x-1$
- $(g\circ f)(x)=g(x-1)=\operatorname{sen}(x-1)$

> [!WARNING]
> **A ordem importa:** $f\circ g\ne g\circ f$ em geral, como acabamos de ver.

**Decompor** uma função em camadas é a habilidade que mais vai ajudar na regra da cadeia e na substituição. Exemplos:

- $\sqrt{x^2+3}=f(g(x))$ com $g(x)=x^2+3$ (dentro) e $f(u)=\sqrt u$ (fora).
- $\cos(3t-2)$: dentro $3t-2$, fora $\cos$.

## 8. Função inversa

Se $f$ é bijetora, existe $f^{-1}$ que **desfaz** $f$:
$$
f^{-1}(f(x))=x\qquad\text{e}\qquad f\big(f^{-1}(y)\big)=y
$$

**Receita para achar $f^{-1}$:**
1. Escreva $y=f(x)$.
2. **Isole $x$** em função de $y$.
3. Troque os nomes: $x\leftrightarrow y$.

**Exemplo.** $f(x)=2x+1$: $y=2x+1\Rightarrow x=\frac{y-1}2$, logo $f^{-1}(x)=\dfrac{x-1}2$.

**Gráfico:** o de $f^{-1}$ é o espelho do de $f$ em torno da reta $y=x$.

**Inversas importantes:** $\ln$ é a inversa de $e^x$; $\sqrt x$ é a inversa de $x^2$ (para $x\ge0$); $\operatorname{arcsen}$, $\arccos$ e $\operatorname{arctg}$ são inversas de $\operatorname{sen}$, $\cos$, $\operatorname{tg}$ (restritas a trechos onde são injetoras).

## 9. Ciclo trigonométrico

No círculo de raio $1$, o ponto associado ao ângulo $\theta$ (em **radianos**) é $(\cos\theta,\ \operatorname{sen}\theta)$. Por isso $\cos^2\theta+\operatorname{sen}^2\theta=1$.

| $\theta$ | $0$ | $\frac\pi6$ | $\frac\pi4$ | $\frac\pi3$ | $\frac\pi2$ | $\pi$ | $\frac{3\pi}2$ | $2\pi$ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $\operatorname{sen}\theta$ | $0$ | $\frac12$ | $\frac{\sqrt2}2$ | $\frac{\sqrt3}2$ | $1$ | $0$ | $-1$ | $0$ |
| $\cos\theta$ | $1$ | $\frac{\sqrt3}2$ | $\frac{\sqrt2}2$ | $\frac12$ | $0$ | $-1$ | $0$ | $1$ |

- $\operatorname{tg}\theta=\dfrac{\operatorname{sen}\theta}{\cos\theta}$ (indefinida onde $\cos\theta=0$, isto é, em $\frac\pi2+k\pi$).
- $\operatorname{sen}$ e $\cos$ têm **período** $2\pi$; $\operatorname{tg}$ tem período $\pi$.
- $\operatorname{sen}$ é **ímpar** ($\operatorname{sen}(-x)=-\operatorname{sen}x$); $\cos$ é **par** ($\cos(-x)=\cos x$).
- Conversão: $180^\circ=\pi$ rad.

> [!TIP]
> **Macete da mão** para $\operatorname{sen}$ em $0,\frac\pi6,\frac\pi4,\frac\pi3,\frac\pi2$: escreva $\frac{\sqrt0}2,\frac{\sqrt1}2,\frac{\sqrt2}2,\frac{\sqrt3}2,\frac{\sqrt4}2$. Para $\cos$, é a ordem contrária.

## 10. Resumo rápido

- **Domínio:** o que pode entrar (cuidado com divisão por zero e raiz de negativo).
- **Imagem:** o que de fato sai.
- **Injetora:** sem saídas repetidas. **Bijetora:** injetora + sobrejetora, e só ela tem inversa.
- **Composição:** de dentro para fora, e a ordem importa.

## 11. Exercícios

**Exercício 1.** Domínio de $f(x)=\sqrt{x-2}$ e de $g(x)=\dfrac{1}{x^2-4}$.

{{< details title="Gabarito" >}}
$f$: precisa de $x-2\ge0$, então $[2,+\infty)$. $g$: $x^2\ne4$, então $\mathbb R\setminus\{-2,2\}$.
{{< /details >}}

**Exercício 2.** $f(x)=x^2$ em $\mathbb R$ é injetora? E $g(x)=x^3$?

{{< details title="Gabarito" >}}
$f$ não ($f(1)=f(-1)$). $g$ sim: cubos diferentes para números diferentes.
{{< /details >}}

**Exercício 3.** Com $f(x)=x^2$ e $g(x)=x+3$, calcule $f\circ g$ e $g\circ f$.

{{< details title="Gabarito" >}}
$(f\circ g)(x)=(x+3)^2$ e $(g\circ f)(x)=x^2+3$. São diferentes.
{{< /details >}}

**Exercício 4.** Ache a inversa de $f(x)=\dfrac{x+1}{x-2}$, $x\ne2$.

{{< details title="Gabarito" >}}
$y(x-2)=x+1\Rightarrow yx-2y=x+1\Rightarrow x(y-1)=2y+1\Rightarrow x=\dfrac{2y+1}{y-1}$. Logo $f^{-1}(x)=\dfrac{2x+1}{x-1}$.
{{< /details >}}

**Exercício 5.** Calcule $\operatorname{sen}\frac{5\pi}{6}$ e $\cos\left(-\frac\pi3\right)$.

{{< details title="Gabarito" >}}
$\operatorname{sen}\frac{5\pi}6=\operatorname{sen}\frac\pi6=\frac12$ (ângulos suplementares têm o mesmo seno). $\cos\left(-\frac\pi3\right)=\cos\frac\pi3=\frac12$ (cosseno é par).
{{< /details >}}
