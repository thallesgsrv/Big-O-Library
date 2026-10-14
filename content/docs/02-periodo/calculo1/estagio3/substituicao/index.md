---
title: Método da Substituição
weight: 6
description: Mudança de variável (u-substituição) em integrais indefinidas e definidas, com receita e erros comuns.
autores:
  - thallesgsrv
date: 2026-10-14
---

## 1. A ideia: a regra da cadeia ao contrário

Pela regra da cadeia, $\dfrac{d}{dx}F(g(x))=F'(g(x))\,g'(x)$. Lendo ao contrário:

$$
\int f(g(x))\,g'(x)\,dx=\int f(u)\,du,\qquad u=g(x),\ du=g'(x)\,dx
$$

Em palavras: se o integrando tem uma função "de dentro" **e a sua derivada** por perto, troque o miolo por $u$ e a integral vira uma bem mais simples.

## 2. Como saber se vale a pena?

Faça três perguntas:

1. Há uma **composição** (algo dentro de algo: raiz, potência, $\operatorname{sen}(\cdot)$, $e^{(\cdot)}$)?
2. O resto do integrando é (a menos de uma **constante**) a **derivada do miolo**?
3. Se sim às duas, escolha $u=$ miolo.

## 3. Receita

1. **Escolha $u$** (em geral, o miolo ou o que está no denominador/expoente).
2. **Derive:** $du=u'\,dx$.
3. **Reescreva a integral inteira em $u$.** Não pode sobrar nenhum $x$. Se sobrar só uma constante multiplicando, ajuste: $dx=\dfrac{du}{u'}$.
4. **Integre** em $u$.
5. **Volte para $x$** (substitua $u$ de novo). Na integral definida, veja a seção 5.
6. **Confira derivando** o resultado.

## 4. Exemplos (indefinidas)

### Exemplo 1: $\displaystyle\int\sqrt{2x+1}\,dx$

$u=2x+1\Rightarrow du=2\,dx\Rightarrow dx=\dfrac{du}2$.
$$
\int\sqrt u\,\frac{du}2=\frac12\cdot\frac23u^{3/2}+C=\frac13(2x+1)^{3/2}+C
$$

### Exemplo 2: $\displaystyle\int5\sec^2(5x+1)\,dx$

$u=5x+1\Rightarrow du=5\,dx$. A integral é exatamente $\displaystyle\int\sec^2u\,du=\operatorname{tg}u+C=\operatorname{tg}(5x+1)+C$.

### Exemplo 3: $\displaystyle\int e^{-x+2}\,dx$

$u=-x+2\Rightarrow du=-dx$. $\displaystyle-\int e^u\,du=-e^{-x+2}+C$.

### Exemplo 4: $\displaystyle\int\frac{\sec z\operatorname{tg}z}{\sqrt{\sec z}}\,dz$

$u=\sec z\Rightarrow du=\sec z\operatorname{tg}z\,dz$.
$$
\int u^{-1/2}\,du=2\sqrt u+C=2\sqrt{\sec z}+C
$$

### Exemplo 5: $\displaystyle\int\frac{2z}{\sqrt[3]{z^2+1}}\,dz$

$u=z^2+1\Rightarrow du=2z\,dz$.
$$
\int u^{-1/3}\,du=\frac32u^{2/3}+C=\frac32(z^2+1)^{2/3}+C
$$

### Exemplo 6: $\displaystyle\int\frac{1}{(1+x)^3}\,dx$

$u=1+x$, $du=dx$: $\displaystyle\int u^{-3}\,du=-\frac{1}{2u^2}+C=-\frac1{2(1+x)^2}+C$.

### Exemplo 7: quando é preciso separar

$\displaystyle\int\frac{3x+2}{\sqrt{1-x^2}}\,dx=3\int\frac{x}{\sqrt{1-x^2}}\,dx+2\int\frac1{\sqrt{1-x^2}}\,dx$

- Na primeira, $u=1-x^2$, $du=-2x\,dx$: $3\cdot\left(-\frac12\right)\displaystyle\int u^{-1/2}du=-3\sqrt{1-x^2}$.
- A segunda é direto da tabela: $2\operatorname{arcsen}x$.

$$
=-3\sqrt{1-x^2}+2\operatorname{arcsen}x+C
$$

### Exemplo 8: $\displaystyle\int\operatorname{tg}x\,dx$

$\operatorname{tg}x=\dfrac{\operatorname{sen}x}{\cos x}$. Com $u=\cos x$, $du=-\operatorname{sen}x\,dx$:
$$
-\int\frac{du}{u}=-\ln\lvert\cos x\rvert+C=\ln\lvert\sec x\rvert+C
$$

> [!TIP]
> Padrão de ouro: $\displaystyle\int\frac{u'}{u}\,dx=\ln\lvert u\rvert+C$. Se o numerador é a derivada do denominador, a resposta é $\ln$.

## 5. Integrais definidas

Duas maneiras (escolha uma e **não misture**):

**Método A: troque os limites.** Se $u=g(x)$:
$$
\int_a^bf(g(x))\,g'(x)\,dx=\int_{g(a)}^{g(b)}f(u)\,du
$$
O resultado já sai em número, sem voltar para $x$.

**Método B:** resolva a indefinida, volte para $x$, e só então aplique os limites originais.

**Exemplo 9.** $\displaystyle\int_0^1\sqrt{2x+1}\,dx$. Com $u=2x+1$: $x=0\Rightarrow u=1$; $x=1\Rightarrow u=3$.
$$
\int_1^3\sqrt u\,\frac{du}2=\frac13\Big[u^{3/2}\Big]_1^3=\frac{3\sqrt3-1}{3}\approx1{,}40
$$

**Exemplo 10.** $\displaystyle\int_0^2x\sqrt{x^2+1}\,dx$. $u=x^2+1$, $du=2x\,dx$; $u$ vai de $1$ a $5$:
$$
\frac12\int_1^5\sqrt u\,du=\frac13\Big[u^{3/2}\Big]_1^5=\frac{5\sqrt5-1}{3}
$$

**Exemplo 11 (simetria).** $\displaystyle\int_{-1}^{1}\frac{2z}{\sqrt[3]{z^2+1}}\,dz$: com $u=z^2+1$, $z=-1\Rightarrow u=2$ e $z=1\Rightarrow u=2$. Limites iguais, integral $=0$. (O integrando é ímpar em um intervalo simétrico.)

> [!WARNING]
> **Dois erros que custam muita nota:**
> 1. Trocar para $u$ e **deixar os limites em $x$** (ex.: escrever $\int_0^1\sqrt u\,du$ no Exemplo 9). Os limites têm que acompanhar a variável.
> 2. A substituição só vale se $u=g(x)$ for derivável e $f(g(x))$ for **contínua em todo o intervalo**. Ex.: $\int_0^{\pi}\sec^2x\,dx$ **não** é $\operatorname{tg}\pi-\operatorname{tg}0=0$, porque $\sec^2x$ explode em $x=\pi/2$.

## 6. O que fazer quando não funciona?

- **Sobrou $x$ depois de trocar?** Escolha outro $u$ ou resolva $x$ em função de $u$ (ex.: $u=x+1\Rightarrow x=u-1$).
- **Nada dá certo?** A integral provavelmente pede outra técnica: integração por partes, trigonométricas, frações parciais etc. (Cálculo 2, Estágio 1).

## Exercícios propostos

**Exercício 1.** $\displaystyle\int xe^{x^2}\,dx$

{{< details title="Gabarito" >}}
$u=x^2$, $du=2x\,dx$: $\tfrac12\int e^u\,du=\tfrac12e^{x^2}+C$.
{{< /details >}}

**Exercício 2.** $\displaystyle\int\cos x\,\operatorname{sen}^4x\,dx$

{{< details title="Gabarito" >}}
$u=\operatorname{sen}x$, $du=\cos x\,dx$: $\int u^4du=\dfrac{\operatorname{sen}^5x}5+C$.
{{< /details >}}

**Exercício 3.** $\displaystyle\int\frac{x}{x^2+4}\,dx$

{{< details title="Gabarito" >}}
$u=x^2+4$, $du=2x\,dx$: $\tfrac12\ln(x^2+4)+C$ (sem módulo, pois $x^2+4>0$).
{{< /details >}}

**Exercício 4.** $\displaystyle\int\frac{\ln x}{x}\,dx$

{{< details title="Gabarito" >}}
$u=\ln x$, $du=\dfrac{dx}{x}$: $\int u\,du=\dfrac{(\ln x)^2}2+C$.
{{< /details >}}

**Exercício 5.** $\displaystyle\int\frac{e^x}{1+e^{2x}}\,dx$

{{< details title="Gabarito" >}}
$u=e^x$, $du=e^x\,dx$: $\int\dfrac{du}{1+u^2}=\operatorname{arctg}(e^x)+C$.
{{< /details >}}

**Exercício 6.** $\displaystyle\int x\sqrt{x+1}\,dx$. *Dica: $u=x+1$, logo $x=u-1$.*

{{< details title="Gabarito" >}}
$\int(u-1)u^{1/2}du=\int(u^{3/2}-u^{1/2})du=\tfrac25u^{5/2}-\tfrac23u^{3/2}+C$, com $u=x+1$.
{{< /details >}}

**Exercício 7.** $\displaystyle\int_0^{1}\frac{x}{x^2+1}\,dx$

{{< details title="Gabarito" >}}
$u=x^2+1$ vai de $1$ a $2$: $\tfrac12\int_1^2\dfrac{du}u=\tfrac12\ln2$.
{{< /details >}}

**Exercício 8.** $\displaystyle\int_0^{\pi/2}\operatorname{sen}x\cos x\,dx$

{{< details title="Gabarito" >}}
$u=\operatorname{sen}x$ vai de $0$ a $1$: $\int_0^1u\,du=\tfrac12$.
{{< /details >}}
