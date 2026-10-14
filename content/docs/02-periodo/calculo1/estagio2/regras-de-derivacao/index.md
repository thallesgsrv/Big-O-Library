---
title: Regras de Derivação
weight: 2
description: Constante, potência, soma, produto, quociente, trigonométricas e regra da cadeia.
autores:
  - thallesgsrv
date: 2026-10-11
---

## 1. Por que regras?

Derivar pela definição é lento. As regras abaixo são a definição já resolvida de uma vez por todas. Decore-as **entendendo** de onde vêm.

## 2. Regras básicas

| Regra | Fórmula |
| --- | --- |
| Constante | $(c)'=0$ |
| Potência | $(x^n)'=n\,x^{n-1}$ (vale para qualquer $n$ real) |
| Múltiplo constante | $(c\,f)'=c\,f'$ |
| Soma/diferença | $(f\pm g)'=f'\pm g'$ |

**Exemplo 1.** $f(x)=3x^4-5x^2+\sqrt{x}-7$. Reescreva $\sqrt{x}=x^{1/2}$:
$$
f'(x)=12x^3-10x+\tfrac12x^{-1/2}=12x^3-10x+\frac1{2\sqrt{x}}
$$

> [!TIP]
> Antes de derivar, **reescreva** raízes e frações como potências: $\frac1{x^3}=x^{-3}$, $\sqrt[3]{x^2}=x^{2/3}$.

## 3. Regra do produto

$$
(f\,g)'=f'\,g+f\,g'
$$

> [!WARNING]
> **Erro clássico:** $(fg)'\neq f'g'$. Teste com $f=g=x$: $(x^2)'=2x$, mas $f'g'=1$.

**Exemplo 2.** $\dfrac{d}{dz}\big[(z^2-z)(z^3+3)\big]$:
$$
(2z-1)(z^3+3)+(z^2-z)(3z^2)=5z^4-4z^3+6z-3
$$

## 4. Regra do quociente

$$
\left(\frac fg\right)'=\frac{f'\,g-f\,g'}{g^2}
$$

Frase para decorar: *"derivada de cima vezes baixo, menos cima vezes derivada de baixo, tudo sobre baixo ao quadrado."* A **ordem do menos importa**.

**Exemplo 3.** $\dfrac{d}{dt}\dfrac{t^2-1}{t^3+1}=\dfrac{2t(t^3+1)-(t^2-1)(3t^2)}{(t^3+1)^2}=\dfrac{-t^4+3t^2+2t}{(t^3+1)^2}$

## 5. Derivadas trigonométricas

| | |
| --- | --- |
| $(\operatorname{sen}x)'=\cos x$ | $(\cos x)'=-\operatorname{sen}x$ |
| $(\operatorname{tg}x)'=\sec^2x$ | $(\operatorname{cotg}x)'=-\csc^2x$ |
| $(\sec x)'=\sec x\operatorname{tg}x$ | $(\csc x)'=-\csc x\operatorname{cotg}x$ |

Truque: toda função que começa com **"co"** tem derivada com sinal de menos.

**Exemplo 4.** $y=\operatorname{sen}x\cos x$. Pelo produto: $\cos^2x-\operatorname{sen}^2x$.

**Exemplo 5.** $y=\dfrac{\cos x}{\operatorname{sen}x-1}$. Pelo quociente:
$$
\frac{-\operatorname{sen}x(\operatorname{sen}x-1)-\cos^2x}{(\operatorname{sen}x-1)^2}=\frac{\operatorname{sen}x-1}{(\operatorname{sen}x-1)^2}=\frac1{\operatorname{sen}x-1}
$$
(usando $\operatorname{sen}^2x+\cos^2x=1$).

**Exemplo 6.** $y=\sec x$. Então $y'=\sec x\operatorname{tg}x$ e, pelo produto,
$y''=\sec x\operatorname{tg}^2x+\sec^3x=\sec x(\operatorname{tg}^2x+\sec^2x)$.

## 6. Composição e regra da cadeia

Uma **composição** é uma função dentro de outra: $(f\circ g)(x)=f(g(x))$.

Ex.: $h(x)=\sqrt{x^2+3}$ é $f(g(x))$ com $g(x)=x^2+3$ ("dentro") e $f(u)=\sqrt{u}$ ("fora").

$$
\boxed{(f\circ g)'(x)=f'(g(x))\cdot g'(x)}
$$

Em palavras: **derive a de fora (mantendo o miolo) e multiplique pela derivada do miolo.** Com três camadas, multiplica-se uma derivada por camada, de fora para dentro.

### Receita

1. Identifique a função de **fora** e a de **dentro**.
2. Derive a de fora, sem mexer no miolo.
3. Multiplique pela derivada do miolo.

**Exemplo 7.** $f(x)=\operatorname{sen}(x^2+x)$ $\Rightarrow$ $f'(x)=\cos(x^2+x)\cdot(2x+1)$.

**Exemplo 8.** $h(r)=(5r^3-r^4)^7$ $\Rightarrow$ $h'(r)=7(5r^3-r^4)^6(15r^2-4r^3)$.

**Exemplo 9.** $g(t)=\operatorname{tg}(5-\operatorname{sen}2t)$, três camadas:
$$
g'(t)=\sec^2(5-\operatorname{sen}2t)\cdot(-\cos 2t)\cdot 2=-2\cos(2t)\sec^2(5-\operatorname{sen}2t)
$$

**Exemplo 10.** $j(s)=\dfrac1{3s-2}=(3s-2)^{-1}$ $\Rightarrow$ $j'(s)=-(3s-2)^{-2}\cdot3=\dfrac{-3}{(3s-2)^2}$.

**Exemplo 11.** $\lvert x\rvert=\sqrt{x^2}$ para $x\ne0$ $\Rightarrow$ derivada $\dfrac{2x}{2\sqrt{x^2}}=\dfrac{x}{\lvert x\rvert}$ (vale $-1$ se $x<0$, $+1$ se $x>0$).

> [!IMPORTANT]
> **Esquecer o "vezes a derivada de dentro" é o erro nº 1** em provas. Sempre pergunte: *"tem algo diferente de $x$ dentro?"*

## Exercícios propostos

**Exercício 1.** Derive $f(x)=(x^2+1)(x^3+x^2)$ de **duas** formas (produto e expandindo).

{{< details title="Gabarito" >}}
Produto: $2x(x^3+x^2)+(x^2+1)(3x^2+2x)=5x^4+4x^3+3x^2+2x$.
Expandindo: $x^5+x^4+x^3+x^2\Rightarrow 5x^4+4x^3+3x^2+2x$. ✓
{{< /details >}}

**Exercício 2.** Derive $y=\dfrac{x-1}{x+1}$.

{{< details title="Gabarito" >}}
$\dfrac{1(x+1)-(x-1)\cdot1}{(x+1)^2}=\dfrac{2}{(x+1)^2}$.
{{< /details >}}

**Exercício 3.** Derive $y=x^2\operatorname{sen}x$.

{{< details title="Gabarito" >}}
$y'=2x\operatorname{sen}x+x^2\cos x$.
{{< /details >}}

**Exercício 4.** Derive $f(x)=\dfrac1{(1-2x)^3}$.

{{< details title="Gabarito" >}}
$(1-2x)^{-3}\Rightarrow -3(1-2x)^{-4}(-2)=\dfrac{6}{(1-2x)^4}$.
{{< /details >}}

**Exercício 5.** Derive $y=\operatorname{sen}^3(2x)$. *Dica: é $[\operatorname{sen}(2x)]^3$.*

{{< details title="Gabarito" >}}
$y'=3\operatorname{sen}^2(2x)\cdot\cos(2x)\cdot2=6\operatorname{sen}^2(2x)\cos(2x)$.
{{< /details >}}
