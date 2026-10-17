---
title: Limites
weight: 2
description: Ideia de limite, limites laterais, propriedades, técnicas para 0/0, limites trigonométricos e teorema do confronto.
autores:
    - thallesgsrv
date: 2026-10-01
---

## 1. Agora vem a ideia de limite

Até aqui, perguntamos coisas como:

> Quanto vale $f(2)$?

Mas o limite faz uma pergunta diferente:

> O que está acontecendo com $f(x)$ quando $x$ está chegando perto de $2$?

Essa diferença é fundamental.

Imagine que estamos nos aproximando de $2$.

Podemos chegar por números menores:

\[
1.9,\ 1.99,\ 1.999,\ 1.9999
\]

Ou por números maiores:

\[
2.1,\ 2.01,\ 2.001,\ 2.0001
\]

Isso dá origem aos limites laterais.

## 2. Limite pela esquerda

Quando escrevemos:

\[
x \to 2^-
\]

o sinal $-$ significa:

> estamos nos aproximando de $2$ usando valores menores que $2$.

Por exemplo:

\[
1.9,\ 1.99,\ 1.999,\ 1.9999,\ldots
\]

Todos esses números estão à esquerda de $2$ na reta numérica.

Portanto:

\[
x \to 2^-
\]

significa:

> $x$ se aproxima de $2$ pela esquerda.

## 3. Limite pela direita

Agora fazemos o contrário.

Quando escrevemos:

\[
x \to 2^+
\]

estamos nos aproximando de $2$ usando valores maiores que $2$.

Por exemplo:

\[
2.1,\ 2.01,\ 2.001,\ 2.0001,\ldots
\]

Portanto:

\[
x \to 2^+
\]

significa:

> $x$ se aproxima de $2$ pela direita.

## 4. Vamos colocar isso em um gráfico

Considere:

\[
f(x) = \frac{1}{x-2}
\]

O número $2$ não pertence ao domínio.

Mas o que acontece quando chegamos perto dele?

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" role="img" aria-label="Gráfico da função 1 dividido por x menos 2 com assíntota vertical em x igual a 2" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;display:block;">
<line x1="70" y1="250" x2="750" y2="250" stroke="currentColor" stroke-width="2"></line>
<line x1="400" y1="40" x2="400" y2="460" stroke="currentColor" stroke-width="2" stroke-dasharray="8 8"></line>
<path d="M80 280 C180 280 300 290 370 330 C390 350 395 400 398 460" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
<path d="M402 40 C405 100 410 160 430 190 C500 225 600 235 720 240" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
</svg>
<p style="font-size:0.95rem;margin-top:0.5rem">Legenda: assíntota vertical em x = 2; os ramos mostram comportamento para x→2⁻ e x→2⁺.</p>

A função tem uma assíntota vertical em $x=2$.

### Aproximando pela esquerda

Quando:

\[
x \to 2^-
\]

A função desce cada vez mais:

\[
f(x) \to -\infty
\]

### Aproximando pela direita

Quando:

\[
x \to 2^+
\]

a função sobe cada vez mais:

\[
f(x) \to +\infty
\]

Portanto:

\[
\lim_{x\to2^-}\frac{1}{x-2} = -\infty
\]

\[
\lim_{x\to2^+}\frac{1}{x-2} = +\infty
\]

Isso mostra que os lados esquerdo e direito não chegam ao mesmo valor. Aliás, $x=2$ nem está no domínio, e perto dele a função "explode": não existe um número $L$ que sirva de limite. Voltaremos a esse tipo de comportamento (limites infinitos e assíntotas) na próxima página.

## 5. Então o que é o limite?

Agora podemos entender a ideia de forma mais natural.

Quando escrevemos:

\[
\lim_{x\to a} f(x) = L
\]

estamos dizendo:

> Quando $x$ fica cada vez mais próximo de $a$, os valores de $f(x)$ ficam cada vez mais próximos de $L$.

O ponto importante é que estamos interessados no comportamento próximo de $a$.

Não necessariamente no valor da função exatamente em $a$.

> [!TIP]
> **Intuição para fixar:** pense no limite como um GPS. Ele não diz onde a função *está* em $x=a$; diz **para onde ela está indo** quando você se aproxima de $a$. O valor $f(a)$ é onde a função *de fato* está, e os dois podem até ser diferentes.

## 6. Um exemplo em que a função nem existe no ponto

Considere:

\[
f(x)=\frac{x^2-1}{x-1}
\]

Se tentarmos calcular $f(1)$:

\[
f(1) = \frac{1^2-1}{1-1} = \frac{0}{0}
\]

Portanto, a função original não está definida em $x=1$.

Mas podemos simplificar:

\[
x^2-1 = (x-1)(x+1)
\]

Logo:

\[
f(x) = \frac{(x-1)(x+1)}{x-1}
\]

Para $x \neq 1$:

\[
f(x) = x+1
\]

Agora podemos observar o comportamento próximo de $1$:

\[
\lim_{x\to1}(x+1) = 2
\]

Portanto:

\[
\boxed{\lim_{x\to1}\frac{x^2-1}{x-1}=2}
\]

Perceba a diferença:

- $f(1)$ não existe;
- mas $\lim_{x\to1} f(x)=2$.

O limite descreve o comportamento ao redor do ponto, não necessariamente o valor naquele ponto.

## 7. Quando os dois lados concordam

Para existir um limite bilateral:

\[
\lim_{x\to a} f(x)
\]

os dois lados precisam chegar ao mesmo lugar.

Ou seja:

\[
\lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x)
\]

Se os dois lados chegam ao mesmo valor $L$, então:

\[
\lim_{x\to a} f(x) = L
\]

Se chegam a valores diferentes, o limite bilateral não existe.

## 8. Limites com módulo e funções "por partes"

O módulo $\lvert x\rvert$ muda de comportamento em $0$, então os lados esquerdo e direito costumam ser diferentes. A receita é **abrir o módulo em cada lado**:

$$
\lvert x\rvert=\begin{cases}x,&x\ge0\\-x,&x<0\end{cases}
$$

**Exemplo.** $f(x)=\dfrac{\lvert x\rvert}{x}$ perto de $0$:

- pela direita ($x>0$): $\dfrac{x}{x}=1$, então $\lim_{x\to0^+}f(x)=1$;
- pela esquerda ($x<0$): $\dfrac{-x}{x}=-1$, então $\lim_{x\to0^-}f(x)=-1$.

Os lados discordam, logo $\lim_{x\to0}\dfrac{\lvert x\rvert}{x}$ **não existe**.

**Função por partes.** Se $f(x)=x+1$ para $x<1$ e $f(x)=3-x$ para $x\ge1$:

- esquerda: $\lim_{x\to1^-}(x+1)=2$;
- direita: $\lim_{x\to1^+}(3-x)=2$.

Os lados concordam, então $\lim_{x\to1}f(x)=2$ (e aqui até $f(1)=2$).

> [!IMPORTANT]
> Em função por partes, calcule **cada lado com a fórmula do seu lado**: para $x\to a^-$ use a fórmula de $x<a$; para $x\to a^+$ use a de $x>a$.

## 9. Propriedades dos limites

Se $\lim_{x\to a}f(x)=L$ e $\lim_{x\to a}g(x)=M$ (ambos números reais) e $k$ é constante, então:

| Propriedade | Resultado |
| --- | --- |
| Soma e diferença | $\lim(f\pm g)=L\pm M$ |
| Constante vezes função | $\lim(k\,f)=k\,L$ |
| Produto | $\lim(f\cdot g)=L\cdot M$ |
| Quociente | $\lim\dfrac fg=\dfrac LM$, se $M\ne0$ |
| Potência e raiz | $\lim f^n=L^n$ e $\lim\sqrt[n]{f}=\sqrt[n]{L}$ (com $L\ge0$ se $n$ par) |

E os dois limites mais simples de todos: $\lim_{x\to a}k=k$ e $\lim_{x\to a}x=a$.

Juntando tudo, para **polinômios** basta substituir:
$$
\lim_{x\to2}(3x^2-x+1)=3\cdot4-2+1=11
$$
e o mesmo vale para quocientes quando o denominador **não** zera:
$$
\lim_{x\to3}\frac{x^2+1}{x-1}=\frac{10}{2}=5
$$

> [!WARNING]
> Todas essas propriedades exigem que **cada limite exista**. Não dá para dizer que "$\lim(f+g)=\lim f+\lim g$" quando um deles diverge ou não existe.

## 10. A estratégia de todo limite: substituir primeiro

**Passo 1.** Substitua $x=a$ direto na expressão. Três coisas podem acontecer:

| Resultado da substituição | O que fazer |
| --- | --- |
| Um número | Acabou: esse é o limite |
| $\dfrac{k}{0}$, com $k\ne0$ | Provavelmente é limite infinito (próxima página) |
| $\dfrac00$ | Indeterminação: **manipule** a expressão e tente de novo |

$\dfrac00$ não é "zero" nem "não existe": é um aviso de que há um **fator em comum escondido** que está zerando em cima e embaixo. Nosso trabalho é achá-lo e cortar.

**Ferramentas para $\dfrac00$:** fatorar (esta seção), multiplicar pelo conjugado (seção 11) e limites trigonométricos (seção 12).

**Exemplo 1.** $\displaystyle\lim_{x\to2}\frac{x^2-5x+6}{x-2}$. Substituindo: $\frac00$. Fatorando o numerador, $x^2-5x+6=(x-2)(x-3)$:
$$
\frac{(x-2)(x-3)}{x-2}=x-3\ (x\ne2)\ \Rightarrow\ \lim=-1
$$

**Exemplo 2.** $\displaystyle\lim_{x\to3}\frac{x^2-9}{x-3}=\lim(x+3)=6$ (diferença de quadrados).

**Exemplo 3.** $\displaystyle\lim_{x\to2}\frac{x^3-8}{x-2}$. Como $x^3-8=(x-2)(x^2+2x+4)$:
$$
\lim(x^2+2x+4)=12
$$

> [!TIP]
> **Lembretes de fatoração:** $a^2-b^2=(a-b)(a+b)$; $a^3-b^3=(a-b)(a^2+ab+b^2)$; para $ax^2+bx+c$ ache as raízes. Se $a$ é raiz do polinômio, $(x-a)$ **sempre** é um fator.

## 11. Regra prática para tirar a raiz

Quando um limite envolve uma expressão com raiz, a estratégia mais útil é multiplicar pela expressão conjugada.

Essa técnica é conhecida como racionalização.

### Exemplo

Considere:

\[
\lim_{x \to 0} \frac{\sqrt{x+1}-1}{x}
\]

Se substituirmos $x=0$, vemos que aparece a forma $0/0$. Então precisamos manipular a expressão.

A ideia é multiplicar pelo conjugado do numerador:

\[
\frac{\sqrt{x+1}-1}{x}\cdot\frac{\sqrt{x+1}+1}{\sqrt{x+1}+1}
\]

Isso resulta em:

\[
\frac{(\sqrt{x+1})^2 - 1^2}{x(\sqrt{x+1}+1)}
\]

\[
\frac{x}{x(\sqrt{x+1}+1)}
\]

Como $x \neq 0$ perto de zero, podemos cancelar $x$:

\[
\frac{1}{\sqrt{x+1}+1}
\]

Agora calculamos o limite:

\[
\lim_{x \to 0} \frac{1}{\sqrt{x+1}+1}
\]

Substituindo $x=0$:

\[
\frac{1}{\sqrt{1}+1} = \frac{1}{2}
\]

Portanto:

\[
\boxed{\lim_{x \to 0} \frac{\sqrt{x+1}-1}{x} = \frac{1}{2}}
\]

Regra prática:

> Quando aparecer uma diferença com raiz, multiplique pelo conjugado para eliminar a raiz do numerador ou do denominador.

## 12. Limites trigonométricos

Alguns limites aparecem com tanta frequência que vale a pena memorizar a regra principal:

\[
\lim_{x\to 0} \frac{\operatorname{sen} x}{x} = 1
\]

Essa regra é a base para resolver muitos limites que, à primeira vista, parecem complicados.

Quando $x$ fica muito pequeno, o seno cresce na mesma proporção que o próprio ângulo. Por isso, perto de zero, o quociente $\frac{\operatorname{sen} x}{x}$ tende a $1$.

### Regra prática

Se aparecer um limite do tipo:

\[
\lim_{x\to 0} \frac{\operatorname{sen}(ax)}{x}
\]

você pode usar a ideia de que:

\[
\frac{\operatorname{sen}(ax)}{x} = a \cdot \frac{\operatorname{sen}(ax)}{ax}
\]

Portanto:

\[
\lim_{x\to 0} \frac{\operatorname{sen}(ax)}{x} = a
\]

Exemplo:

\[
\lim_{x\to 0} \frac{\operatorname{sen}(3x)}{x} = 3
\]

### Mais limites trigonométricos

Todos saem de $\dfrac{\operatorname{sen}u}{u}\to1$ com um pouco de álgebra:

- $\displaystyle\lim_{x\to0}\frac{\operatorname{tg}x}{x}=\lim\frac{\operatorname{sen}x}{x}\cdot\frac1{\cos x}=1\cdot1=1$
- $\displaystyle\lim_{x\to0}\frac{\operatorname{sen}3x}{\operatorname{sen}5x}=\lim\frac{\operatorname{sen}3x}{3x}\cdot\frac{5x}{\operatorname{sen}5x}\cdot\frac35=\frac35$
- $\displaystyle\lim_{x\to0}\frac{1-\cos x}{x}=\lim\frac{(1-\cos x)(1+\cos x)}{x(1+\cos x)}=\lim\frac{\operatorname{sen}x}{x}\cdot\frac{\operatorname{sen}x}{1+\cos x}=1\cdot0=0$

> [!TIP]
> **Truque do "espelho":** se aparece $\operatorname{sen}(\text{algo})$, force o mesmo "algo" embaixo, multiplicando e dividindo pelo que faltar.

## 13. Teorema do confronto

Em muitos casos, não conseguimos calcular um limite diretamente, mas conseguimos comparar a função com outras duas que já sabemos como se comportam.

Esse é o papel do teorema do confronto.

Se, perto de $a$, tivermos:

\[
g(x) \le f(x) \le h(x)
\]

e também:

\[
\lim_{x\to a} g(x) = L
\quad\text{e}\quad
\lim_{x\to a} h(x) = L,
\]

então:

\[
\boxed{\lim_{x\to a} f(x) = L}
\]

A ideia é simples: se a função $f(x)$ fica sempre entre duas funções que convergem para o mesmo valor, então ela não pode escapar desse valor.

### Exemplo clássico

Considere:

\[
f(x) = x^2 \operatorname{sen}\left(\frac{1}{x}\right)
\]

Quando $x$ está perto de $0$, sabemos que:

\[
-1 \le \operatorname{sen}\left(\frac{1}{x}\right) \le 1
\]

Multiplicando tudo por $x^2$, que é sempre não negativo, obtemos:

\[
-x^2 \le x^2 \operatorname{sen}\left(\frac{1}{x}\right) \le x^2
\]

Agora observe:

\[
\lim_{x\to 0} (-x^2) = 0
\quad\text{e}\quad
\lim_{x\to 0} x^2 = 0
\]

Pelo teorema do confronto:

\[
\boxed{\lim_{x\to 0} x^2 \operatorname{sen}\left(\frac{1}{x}\right) = 0}
\]

Esse exemplo mostra uma ideia muito importante: mesmo quando a função oscila, se ela estiver presa entre duas funções que vão para o mesmo valor, então ela também vai para esse valor.

## 14. Resumo rápido

- **Limite** descreve para onde $f(x)$ vai quando $x\to a$, não onde $f$ está em $a$.
- **Bilateral existe** $\iff$ os dois laterais existem e são iguais.
- **Sempre** tente substituir primeiro. Se der $\frac00$: fatore, racionalize ou use $\frac{\operatorname{sen}u}{u}\to1$.
- **Confronto:** se $f$ está presa entre duas funções que vão ao mesmo $L$, ela vai a $L$.

## 15. Exercícios de fixação

**Exercício 1.** Para $f(x)=\dfrac1{x-2}$, quais valores de $x$ são usados em $x\to2^-$ e em $x\to2^+$?

{{< details title="Gabarito" >}}
$x\to2^-$: valores menores que $2$ ($1{,}9;\ 1{,}99;\ldots$). $x\to2^+$: valores maiores que $2$ ($2{,}1;\ 2{,}01;\ldots$).
{{< /details >}}

**Exercício 2.** Calcule $\displaystyle\lim_{x\to2^-}\frac1{x-2}$ e $\displaystyle\lim_{x\to2^+}\frac1{x-2}$.

{{< details title="Gabarito" >}}
Pela esquerda, $x-2$ é um número negativo minúsculo, então o quociente vai a $-\infty$. Pela direita, $x-2$ é positivo minúsculo e o quociente vai a $+\infty$.
{{< /details >}}

**Exercício 3.** $\displaystyle\lim_{x\to0}\frac{\operatorname{sen}(3x)}{x}$.

{{< details title="Gabarito" >}}
$3\cdot\dfrac{\operatorname{sen}3x}{3x}\to3\cdot1=3$.
{{< /details >}}

**Exercício 4.** $\displaystyle\lim_{x\to0}\frac{\sqrt{x+4}-2}{x}$.

{{< details title="Gabarito" >}}
Conjugado: $\dfrac{(x+4)-4}{x(\sqrt{x+4}+2)}=\dfrac1{\sqrt{x+4}+2}\to\dfrac14$.
{{< /details >}}

**Exercício 5.** Use o confronto para mostrar que $\displaystyle\lim_{x\to0}x\operatorname{sen}\frac1x=0$.

{{< details title="Gabarito" >}}
$-1\le\operatorname{sen}\frac1x\le1\Rightarrow-\lvert x\rvert\le x\operatorname{sen}\frac1x\le\lvert x\rvert$. Os dois extremos vão a $0$, logo o limite é $0$.
{{< /details >}}

**Exercício 6.** $\displaystyle\lim_{x\to4}\frac{x^2-16}{x-4}$.

{{< details title="Gabarito" >}}
$\frac00$. Fatorando, $\dfrac{(x-4)(x+4)}{x-4}=x+4\to8$.
{{< /details >}}

**Exercício 7.** $\displaystyle\lim_{x\to-2}\frac{x^2+x-2}{x+2}$.

{{< details title="Gabarito" >}}
$x^2+x-2=(x+2)(x-1)$, então o limite é $x-1\to-3$.
{{< /details >}}

**Exercício 8.** Calcule os limites laterais em $0$ de $\dfrac{\lvert x\rvert}{x}$ e conclua se o limite existe.

{{< details title="Gabarito" >}}
Direita: $1$. Esquerda: $-1$. São diferentes, então o limite **não existe**.
{{< /details >}}

**Exercício 9.** $\displaystyle\lim_{x\to0}\frac{\operatorname{tg}2x}{x}$.

{{< details title="Gabarito" >}}
$\dfrac{\operatorname{sen}2x}{x\cos2x}=2\cdot\dfrac{\operatorname{sen}2x}{2x}\cdot\dfrac1{\cos2x}\to2$.
{{< /details >}}

**Exercício 10.** $\displaystyle\lim_{x\to0}\frac{\operatorname{sen}4x}{\operatorname{sen}x}$.

{{< details title="Gabarito" >}}
$\dfrac{\operatorname{sen}4x}{4x}\cdot\dfrac{x}{\operatorname{sen}x}\cdot4\to4$.
{{< /details >}}

> [!NOTE]
> A continuidade e os limites infinitos têm página própria. Siga para as próximas páginas do estágio.

