---
title: Integração por partes
weight: 1
description: Desfazendo a regra do produto, a regra LIATE e 8 exemplos resolvidos.
autores:
  - thallesgsrv
date: 2026-10-14
---

## Como funciona?

A integração por partes serve para integrais que são **produto de funções de tipos diferentes**, como polinômio vezes exponencial, ou logaritmo, ou arctg. Ela troca uma integral difícil por outra mais simples, mas **a um custo**: você vai precisar derivar uma parte e integrar a outra.

## Sobre

Uma pergunta para começar: qual é mais fácil de integrar, $x^2 e^x$ ou $e^x$?

A segunda, claro. Integrar por partes é justamente um jeito de transformar a primeira em algo mais parecido com a segunda.

### De onde vem a fórmula (passo a passo)

Ela vem da **regra do produto**, lida de trás para frente. Se $u$ e $v$ são funções de $x$:

1. Regra do produto: $$(uv)' = u'v + uv'$$
2. Integre os dois lados em relação a $x$. A integral de uma derivada devolve a própria função: $$uv = \int u'v\,dx + \int uv'\,dx$$
3. Isole o termo que queremos, $\int uv'\,dx$, passando $\int u'v\,dx$ para o outro lado com sinal trocado: $$\int uv'\,dx = uv - \int u'v\,dx$$
4. Troque a notação: $dv = v'\,dx$ e $du = u'\,dx$. Fica:

$$
\int u\,dv = u\,v - \int v\,du
$$

## Receita

Compare a integral que você quer resolver com o lado esquerdo da fórmula, $\int u\,dv$, e monte o lado direito.

1. Escolha quem será $u$ (a parte que você vai **derivar**) e quem será $dv$ (a parte que você vai **integrar**).
2. Calcule $du$ (derivando $u$) e $v$ (integrando $dv$). Não precisa colocar $+C$ em $v$: basta uma primitiva qualquer, a mais simples.
3. Monte $u\,v - \int v\,du$ e resolva a integral que sobrou.
4. **Confira derivando o resultado.** Se não voltar ao integrando original, há erro.

> [!TIP]
> Dica de organização: antes de calcular, escreva um quadrinho com as quatro peças.
> $u = \ldots$, $\;dv = \ldots$, $\;du = \ldots$, $\;v = \ldots$

## Como escolher o $u$? Regra LIATE

Escolha como $u$ o que aparecer **primeiro** nesta lista:

**L**ogaritmo → **I**nversa trigonométrica (arctg, arcsen…) → **A**lgébrica (polinômio) → **T**rigonométrica → **E**xponencial

A lógica: logaritmos e inversas trigonométricas ficam *mais simples* ao derivar (viram frações algébricas), mas são chatos de integrar. Polinômios também melhoram ao derivar (o grau cai). Já seno, cosseno e exponencial "não mudam de cara" nem ao derivar, nem ao integrar, então servem bem de $dv$.

> [!WARNING]
> LIATE é uma regra de bolso, não um teorema. Se a escolha deixar a integral mais complicada, volte e troque.

## Exemplos

**Exemplo 1.** $\displaystyle\int x\cos x\,dx$

*O que estou vendo?* Polinômio ($x$) vezes trigonométrica ($\cos x$). Pela LIATE, A vem antes de T.

Passo 1. Quadrinho das quatro peças:
   - $u = x$
   - $dv = \cos x\,dx$
   - $du = dx$ (derivada de $x$ é $1$)
   - $v = \operatorname{sen} x$ (primitiva de $\cos x$)
Passo 2. Monte $uv - \int v\,du$:

$$
\int x\cos x\,dx = x\operatorname{sen} x - \int \operatorname{sen} x\,dx
$$

Passo 3. A integral que sobrou é da tabela: $\int \operatorname{sen} x\,dx = -\cos x$. Então $-\int \operatorname{sen} x\,dx = -(-\cos x) = +\cos x$:

$$
\int x\cos x\,dx = x\operatorname{sen} x + \cos x + C
$$

Passo 4. **Conferência.** Derive pelo produto no primeiro termo: $(x\operatorname{sen} x)' = 1\cdot\operatorname{sen} x + x\cos x$. Some a derivada de $\cos x$, que é $-\operatorname{sen} x$:

$$
\operatorname{sen} x + x\cos x - \operatorname{sen} x = x\cos x \checkmark
$$

Note que o $x$ sumiu da integral (derivou e virou $1$): era esse o plano.

**Exemplo 2.** $\displaystyle\int x\operatorname{sen} x\,dx$

Passo 1. $u = x$, $dv = \operatorname{sen} x\,dx$, $du = dx$, $v = -\cos x$ (cuidado: a primitiva de seno é *menos* cosseno).
Passo 2. Monte:

$$
\int x\operatorname{sen} x\,dx = x(-\cos x) - \int (-\cos x)\,dx = -x\cos x + \int\cos x\,dx
$$

Passo 3. Como $\int\cos x\,dx = \operatorname{sen} x$:

$$
\int x\operatorname{sen} x\,dx = -x\cos x + \operatorname{sen} x + C
$$

Passo 4. Conferência: $(-x\cos x)' = -\cos x + x\operatorname{sen} x$ e $(\operatorname{sen} x)' = \cos x$. Somando: $x\operatorname{sen} x$. $\checkmark$

**Exemplo 3.** $\displaystyle\int (2x-1)e^x\,dx$

Passo 1. $u = 2x-1$, $dv = e^x\,dx$, $du = 2\,dx$, $v = e^x$.
Passo 2. Monte:

$$
(2x-1)e^x - \int e^x\cdot 2\,dx = (2x-1)e^x - 2\int e^x\,dx = (2x-1)e^x - 2e^x
$$

Passo 3. Coloque $e^x$ em evidência: $(2x-1)e^x - 2e^x = e^x\,(2x-1-2) = e^x(2x-3)$:

$$
\int (2x-1)e^x\,dx = (2x-3)e^x + C
$$

Passo 4. Conferência: $\big[(2x-3)e^x\big]' = 2e^x + (2x-3)e^x = e^x(2 + 2x - 3) = (2x-1)e^x$. $\checkmark$

**Exemplo 4.** $\displaystyle\int (1-x)\sec^2 x\,dx$

Passo 1. $u = 1-x$, $dv = \sec^2 x\,dx$, $du = -dx$, $v = \operatorname{tg} x$.
Passo 2. Monte:

$$
(1-x)\operatorname{tg} x - \int \operatorname{tg} x\cdot(-dx) = (1-x)\operatorname{tg} x + \int \operatorname{tg} x\,dx
$$

Passo 3. Sobrou $\int\operatorname{tg} x\,dx$. Escreva $\operatorname{tg} x = \dfrac{\operatorname{sen} x}{\cos x}$ e faça $w = \cos x$, $dw = -\operatorname{sen} x\,dx$:

$$
\int\frac{\operatorname{sen} x}{\cos x}\,dx = -\int\frac{dw}{w} = -\ln\lvert w\rvert = -\ln\lvert\cos x\rvert
$$

Passo 4. Resultado:

$$
\int (1-x)\sec^2 x\,dx = (1-x)\operatorname{tg} x - \ln\lvert\cos x\rvert + C
$$

**Exemplo 5.** $\displaystyle\int \ln x\,dx$

Aqui só existe *uma* função na integral. O truque é enxergar $\ln x = \ln x\cdot 1$.

Passo 1. $u = \ln x$, $dv = dx$, $du = \dfrac{dx}{x}$, $v = x$.
Passo 2. Monte:

$$
x\ln x - \int x\cdot\frac1x\,dx
$$

Passo 3. O $x$ cancela com o $\frac1x$: sobra $\int 1\,dx = x$.

$$
\int \ln x\,dx = x\ln x - x + C
$$

Passo 4. Conferência: $(x\ln x)' = \ln x + x\cdot\frac1x = \ln x + 1$. Subtraia $(x)' = 1$: $\ln x$. $\checkmark$

**Exemplo 6.** $\displaystyle\int x^2 e^x\,dx$

Este precisa de partes **duas vezes**: cada rodada derruba o grau do polinômio em $1$.

*Rodada 1:* $u = x^2$, $dv = e^x\,dx$, $du = 2x\,dx$, $v = e^x$:

$$
\int x^2e^x\,dx = x^2e^x - \int e^x\cdot 2x\,dx = x^2e^x - 2\int xe^x\,dx
$$

*Rodada 2*, na integral que sobrou: $u = x$, $dv = e^x\,dx$, $du = dx$, $v = e^x$:

$$
\int xe^x\,dx = xe^x - \int e^x\,dx = xe^x - e^x
$$

*Juntando* (atenção ao $-2$ que multiplica **tudo** o que veio da rodada 2):

$$
x^2e^x - 2\,(xe^x - e^x) = x^2e^x - 2xe^x + 2e^x
$$

Em evidência:

$$
\int x^2 e^x\,dx = e^x\,(x^2 - 2x + 2) + C
$$

Conferência: $\big[e^x(x^2-2x+2)\big]' = e^x(x^2-2x+2) + e^x(2x-2) = e^x\,(x^2-2x+2+2x-2) = x^2e^x$. $\checkmark$

**Exemplo 7.** $\displaystyle\int \operatorname{arctg} x\,dx$

Passo 1. Mesmo truque do $\ln$: $u = \operatorname{arctg} x$, $dv = dx$, $du = \dfrac{dx}{1+x^2}$, $v = x$.
Passo 2. Monte:

$$
x\operatorname{arctg} x - \int \frac{x}{1+x^2}\,dx
$$

Passo 3. Na última integral, $w = 1+x^2$, $dw = 2x\,dx$, logo $x\,dx = \dfrac{dw}{2}$:

$$
\int \frac{x}{1+x^2}\,dx = \frac12\int\frac{dw}{w} = \frac12\ln\lvert w\rvert = \frac12\ln(1+x^2)
$$

($1+x^2>0$, então dispensa módulo.)

Passo 4. Resultado:

$$
\int\operatorname{arctg} x\,dx = x\operatorname{arctg} x - \tfrac12\ln(1+x^2) + C
$$

**Exemplo 8 (caso circular).** $\displaystyle\int e^x\cos x\,dx$

Depois de partes, a integral original reaparece. Chame-a de $I$.

*Rodada 1:* $u = \cos x$, $dv = e^x\,dx$, $du = -\operatorname{sen} x\,dx$, $v = e^x$:

$$
I = e^x\cos x - \int e^x(-\operatorname{sen} x)\,dx = e^x\cos x + \int e^x\operatorname{sen} x\,dx
$$

*Rodada 2*, mantendo a **mesma escolha** (exponencial em $dv$): $u = \operatorname{sen} x$, $dv = e^x\,dx$, $du = \cos x\,dx$, $v = e^x$:

$$
\int e^x\operatorname{sen} x\,dx = e^x\operatorname{sen} x - \int e^x\cos x\,dx = e^x\operatorname{sen} x - I
$$

Substitua na rodada 1 e resolva a equação em $I$:

$$
I = e^x\cos x + e^x\operatorname{sen} x - I
\quad\Rightarrow\quad 2I = e^x(\cos x + \operatorname{sen} x)
\quad\Rightarrow\quad I = \frac{e^x(\cos x + \operatorname{sen} x)}{2} + C
$$

> [!IMPORTANT]
> No caso circular, mantenha a **mesma escolha** (exponencial em $dv$) nas duas rodadas. Se você trocar no meio, as duas rodadas se desfazem e você volta ao ponto de partida ($I = I$).

## Integral definida

Para integrais com limites, vale:

$$
\int_a^b f(x)\,g'(x)\,dx = \Big[f(x)\,g(x)\Big]_a^b - \int_a^b f'(x)\,g(x)\,dx
$$

Você pode aplicar os limites no termo $[\ ]_a^b$ já no começo, ou resolver a integral indefinida inteira e aplicar os limites no final.

**Exemplo 9.** $\displaystyle\int_0^1 xe^x\,dx$

Passo 1. $u = x$, $dv = e^x\,dx$, $du = dx$, $v = e^x$.
Passo 2. Monte:

$$
\Big[xe^x\Big]_0^1 - \int_0^1 e^x\,dx
$$

Passo 3. Calcule o termo entre colchetes: $1\cdot e^1 - 0\cdot e^0 = e - 0 = e$.
Passo 4. Calcule a integral: $\Big[e^x\Big]_0^1 = e^1 - e^0 = e - 1$.
Passo 5. Subtraia:

$$
e - (e-1) = e - e + 1 = 1
$$

## Exercícios propostos

**Exercício 1.** Calcule $\displaystyle\int x\ln x\,dx$.

{{< details title="Gabarito" >}}
Passo 1. Pela LIATE, $L$ vem antes de $A$: $u = \ln x$ e $dv = x\,dx$.
Passo 2. $du = \dfrac{dx}{x}$ e $v = \dfrac{x^2}{2}$.
Passo 3. Monte:

$$
\frac{x^2}{2}\ln x - \int \frac{x^2}{2}\cdot\frac{1}{x}\,dx
$$

Passo 4. Simplifique o integrando: $\dfrac{x^2}{2}\cdot\dfrac1x = \dfrac{x}{2}$. Então $\int\dfrac x2\,dx = \dfrac{x^2}{4}$.

$$
\frac{x^2}{2}\ln x - \frac{x^2}{4} + C
$$
{{< /details >}}

**Exercício 2.** Calcule $\displaystyle\int xe^{-x}\,dx$.

{{< details title="Gabarito" >}}
Passo 1. $u = x$, $dv = e^{-x}\,dx$, $du = dx$, $v = -e^{-x}$. (O sinal negativo vem da regra da cadeia ao contrário: $(-e^{-x})' = e^{-x}$.)
Passo 2. Monte:

$$
 x(-e^{-x}) - \int(-e^{-x})\,dx = -xe^{-x} + \int e^{-x}\,dx = -xe^{-x} - e^{-x}
$$

Passo 3. Em evidência:

$$
-e^{-x}(x+1) + C
$$
{{< /details >}}

**Exercício 3.** Calcule $\displaystyle\int x^2\ln x\,dx$.

{{< details title="Gabarito" >}}
Passo 1. $u = \ln x$, $dv = x^2\,dx$, $du = \dfrac{dx}{x}$, $v = \dfrac{x^3}{3}$.
Passo 2. Monte e simplifique $\dfrac{x^3}{3}\cdot\dfrac1x = \dfrac{x^2}{3}$:

$$
\frac{x^3}{3}\ln x - \int \frac{x^2}{3}\,dx = \frac{x^3}{3}\ln x - \frac13\cdot\frac{x^3}{3}
$$

$$
\frac{x^3}{3}\ln x - \frac{x^3}{9} + C
$$
{{< /details >}}

**Exercício 4.** Calcule $\displaystyle\int e^x\operatorname{sen} x\,dx$.

{{< details title="Gabarito" >}}
Caso circular, igual ao Exemplo 8. Chame de $I$.

Passo 1. Rodada 1 ($u = \operatorname{sen} x$, $dv = e^x\,dx$, $du = \cos x\,dx$, $v = e^x$):

$$
I = e^x\operatorname{sen} x - \int e^x\cos x\,dx
$$

Passo 2. Rodada 2 ($u = \cos x$, $dv = e^x\,dx$, $du = -\operatorname{sen} x\,dx$, $v = e^x$):

$$
\int e^x\cos x\,dx = e^x\cos x + \int e^x\operatorname{sen} x\,dx = e^x\cos x + I
$$

Passo 3. Substitua:

$$
I = e^x\operatorname{sen} x - e^x\cos x - I \;\Rightarrow\; 2I = e^x(\operatorname{sen} x - \cos x) \;\Rightarrow\; I = \frac{e^x(\operatorname{sen} x - \cos x)}{2} + C
$$
{{< /details >}}

**Exercício 5.** Calcule $\displaystyle\int_0^{\pi} x\operatorname{sen} x\,dx$.

{{< details title="Gabarito" >}}
Passo 1. Do Exemplo 2, uma primitiva é $-x\cos x + \operatorname{sen} x$.
Passo 2. Calcule em $x = \pi$: $-\pi\cos\pi + \operatorname{sen}\pi = -\pi(-1) + 0 = \pi$.
Passo 3. Calcule em $x = 0$: $-0\cdot\cos 0 + \operatorname{sen}0 = 0$.
Passo 4. Subtraia (topo menos base):

$$
\Big[-x\cos x + \operatorname{sen} x\Big]_0^{\pi} = \pi - 0 = \pi
$$
{{< /details >}}
