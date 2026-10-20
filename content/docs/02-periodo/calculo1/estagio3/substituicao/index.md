---
title: Método da Substituição
weight: 6
description: Mudança de variável (u-substituição) em integrais indefinidas e definidas, com receita e erros comuns.
autores:
  - thallesgsrv
date: 2026-10-14
---

## 1. A ideia

A substituição é a **regra da cadeia de trás para frente**. Ao derivar uma função composta, aparece um fator extra (a derivada do miolo). Na integral, se esse fator extra estiver sobrando ao lado, é o sinal de que dá para trocar o miolo por uma letra só, \(u\).

$$
\int f(g(x))\,g'(x)\,dx=\int f(u)\,du,\qquad u=g(x),\quad du=g'(x)\,dx
$$

## 2. Receita (sempre a mesma)

1. **Escolha \(u\):** normalmente o miolo (o que está dentro de raiz, potência, seno, exponencial) ou o que está no denominador.
2. **Derive:** \(du=u'\,dx\).
3. **Reescreva a integral inteira em \(u\).** Não pode sobrar nenhum \(x\). Se sobrar só uma constante, ajuste com \(dx=\dfrac{du}{u'}\).
4. **Integre em \(u\).**
5. **Volte para \(x\).**
6. **Confira derivando.**

## 3. Exemplo-mestre (sem pular nada)

**Vamos resolver:**

$$
\int\operatorname{sen}(2x)\cos x\,dx
$$

**O que estou vendo?** Um seno e um cosseno multiplicados, mas com **ângulos diferentes**: \(2x\) e \(x\). Isso atrapalha, porque uma substituição precisa que as funções falem do mesmo ângulo. Então o primeiro objetivo é **colocar tudo no mesmo ângulo \(x\)**.

**Passo 1: usar a identidade do arco duplo.** Ela desmonta \(\operatorname{sen}(2x)\) em funções de \(x\):

$$
\operatorname{sen}(2x)=2\operatorname{sen}x\cos x
$$

Substituindo na integral:

$$
\int2\operatorname{sen}x\cos x\cdot\cos x\,dx
$$

**Passo 2: juntar o que for igual.** Dois cossenos multiplicando viram \(\cos^2x\), e o \(2\) é constante, então sai da integral:

$$
=2\int\operatorname{sen}x\cos^2x\,dx
$$

**Passo 3: escolher \(u\).** Pergunte: *qual função, quando derivada, aparece sobrando na integral?* A derivada de \(\cos x\) é \(-\operatorname{sen}x\). Na integral temos \(\cos^2x\) (o miolo) **e** um \(\operatorname{sen}x\,dx\) sobrando. Combinou! Então \(u=\cos x\). Derivando:

$$
du=-\operatorname{sen}x\,dx\quad\Longrightarrow\quad\operatorname{sen}x\,dx=-du
$$

**Passo 4: trocar tudo por \(u\).** O \(\cos^2x\) vira \(u^2\) e o pedaço \(\operatorname{sen}x\,dx\) vira \(-du\):

$$
2\int\underbrace{\cos^2x}_{u^2}\;\underbrace{\operatorname{sen}x\,dx}_{-du}=-2\int u^2\,du
$$

Conferiu? Não sobrou nenhum \(x\). Ótimo.

**Passo 5: integrar.** Regra da potência: some \(1\) ao expoente e divida pelo novo expoente.

$$
-2\int u^2\,du=-2\cdot\frac{u^3}{3}+C=-\frac23u^3+C
$$

**Passo 6: voltar para \(x\).** Como \(u=\cos x\):

$$
\boxed{-\frac23\cos^3x+C}
$$

**Passo 7: conferir derivando** (nunca pule):

$$
\frac{d}{dx}\left[-\frac23\cos^3x\right]=-\frac23\cdot3\cos^2x\cdot(-\operatorname{sen}x)=2\operatorname{sen}x\cos^2x
$$

E \(2\operatorname{sen}x\cos x\cdot\cos x=\operatorname{sen}(2x)\cos x\). Voltou ao início. \(\checkmark\)

**Bônus: outro caminho dá a mesma resposta?** Pela fórmula de produto para soma, \(\operatorname{sen}A\cos B=\tfrac12[\operatorname{sen}(A-B)+\operatorname{sen}(A+B)]\), com \(A=2x\) e \(B=x\):

$$
\operatorname{sen}(2x)\cos x=\tfrac12[\operatorname{sen}x+\operatorname{sen}3x]\ \Rightarrow\ \int=-\tfrac12\cos x-\tfrac16\cos3x+C
$$

Parece diferente, mas como \(\cos3x=4\cos^3x-3\cos x\):

$$
-\tfrac12\cos x-\tfrac16(4\cos^3x-3\cos x)=-\tfrac12\cos x-\tfrac23\cos^3x+\tfrac12\cos x=-\tfrac23\cos^3x
$$

**Iguais.** Moral: integrais podem ter respostas de aparência diferente que diferem só por uma constante. Para conferir, derive.

## 4. Mais exemplos

**Exemplo A.** \(\displaystyle\int\sqrt{2x+1}\,dx\)

1. O miolo da raiz é \(2x+1\). Escolho \(u=2x+1\).
2. Derivando, \(du=2\,dx\). Na integral só há \(dx\), então isolo: \(dx=\dfrac{du}2\).
3. Troco: \(\displaystyle\int\sqrt u\,\frac{du}{2}=\frac12\int u^{1/2}\,du\).
4. Integro: \(\dfrac12\cdot\dfrac{u^{3/2}}{3/2}=\dfrac12\cdot\dfrac23u^{3/2}=\dfrac13u^{3/2}\).
5. Volto: \(\boxed{\tfrac13(2x+1)^{3/2}+C}\).

Conferência: \(\tfrac13\cdot\tfrac32(2x+1)^{1/2}\cdot2=(2x+1)^{1/2}\). \(\checkmark\)

**Exemplo B.** \(\displaystyle\int\frac{x}{x^2+4}\,dx\)

1. O denominador \(x^2+4\) é candidato a \(u\). O numerador \(x\) parece a derivada \(2x\) do denominador (faltando o \(2\)). \(u=x^2+4\).
2. \(du=2x\,dx\), logo \(x\,dx=\dfrac{du}2\).
3. Troco: \(\dfrac12\displaystyle\int\frac{du}{u}\).
4. Integro: \(\dfrac12\ln\lvert u\rvert\).
5. Volto: \(\boxed{\tfrac12\ln(x^2+4)+C}\) (sem módulo, pois \(x^2+4>0\)).

> [!TIP]
> **Padrão de ouro:** se o numerador é a derivada do denominador, a resposta é \(\ln\lvert\text{denominador}\rvert\).

**Exemplo C (definida).** \(\displaystyle\int_0^1\sqrt{2x+1}\,dx\)

Na integral definida a variável muda, então **os limites também mudam**. Esse é o erro que mais custa nota.

1. \(u=2x+1\), \(dx=\dfrac{du}2\).
2. Limites novos: \(x=0\Rightarrow u=1\); \(x=1\Rightarrow u=3\).
3. Integre e aplique:

$$
\frac12\int_1^3u^{1/2}\,du=\frac12\cdot\frac23\Big[u^{3/2}\Big]_1^3=\frac13\big(3^{3/2}-1\big)=\frac13(3\sqrt3-1)
$$

$$
\boxed{\frac{3\sqrt3-1}{3}\approx1{,}40}
$$

Não precisa voltar para \(x\): o resultado já é um número.

## 5. Exercícios

**Exercício 1.** \(\displaystyle\int x\,e^{x^2}\,dx\).

{{< details title="Gabarito" >}}
1. Miolo \(x^2\), derivada \(2x\), e há \(x\) sobrando: \(u=x^2\), \(x\,dx=\dfrac{du}2\).
2. \(\dfrac12\int e^u\,du=\dfrac12e^u+C=\dfrac12e^{x^2}+C\).
3. Conferência: \(\left(\tfrac12e^{x^2}\right)'=\tfrac12e^{x^2}\cdot2x=xe^{x^2}\). \(\checkmark\)
{{< /details >}}

**Exercício 2.** \(\displaystyle\int\cos^3x\operatorname{sen}x\,dx\).

{{< details title="Gabarito" >}}
1. \(u=\cos x\), \(\operatorname{sen}x\,dx=-du\).
2. \(\int u^3(-du)=-\dfrac{u^4}4=-\dfrac{\cos^4x}{4}+C\).
{{< /details >}}

**Exercício 3.** \(\displaystyle\int\frac{2x+3}{x^2+3x+1}\,dx\).

{{< details title="Gabarito" >}}
O numerador é a derivada do denominador: \((x^2+3x+1)'=2x+3\). Padrão de ouro: \(\ln\lvert x^2+3x+1\rvert+C\).
{{< /details >}}

**Exercício 4.** \(\displaystyle\int_0^{\pi/2}\operatorname{sen}x\cos x\,dx\).

{{< details title="Gabarito" >}}
1. \(u=\operatorname{sen}x\), \(du=\cos x\,dx\). Limites: \(x=0\Rightarrow u=0\); \(x=\tfrac\pi2\Rightarrow u=1\).
2. \(\int_0^1u\,du=\left[\dfrac{u^2}2\right]_0^1=\dfrac12\).
{{< /details >}}
