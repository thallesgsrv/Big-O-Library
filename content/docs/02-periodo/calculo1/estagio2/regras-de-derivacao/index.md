---
title: Regras de Derivação
weight: 2
description: Constante, potência, soma, produto, quociente, trigonométricas e regra da cadeia.
autores:
  - thallesgsrv
date: 2026-10-11
---

Derivar pela definição é lento. As regras abaixo são a definição **já resolvida** de uma vez por todas. Decore-as *entendendo* de onde vêm.

## 1. Regras básicas

| Regra | Fórmula |
| --- | --- |
| Constante | \((c)'=0\) |
| Potência | \((x^n)'=n\,x^{n-1}\) (vale para qualquer \(n\) real) |
| Múltiplo constante | \((c\,f)'=c\,f'\) |
| Soma/diferença | \((f\pm g)'=f'\pm g'\) |

**Exemplo 1.** \(f(x)=3x^4-5x^2+\sqrt x-7\). Reescreva \(\sqrt x=x^{1/2}\) e derive termo a termo:

- \((3x^4)'=3\cdot4x^3=12x^3\)
- \((-5x^2)'=-5\cdot2x=-10x\)
- \((x^{1/2})'=\tfrac12x^{-1/2}=\dfrac{1}{2\sqrt x}\)
- \((-7)'=0\)

$$
f'(x)=12x^3-10x+\frac1{2\sqrt x}
$$

> [!TIP]
> Antes de derivar, **reescreva** raízes e frações como potências: \(\frac1{x^3}=x^{-3}\), \(\sqrt[3]{x^2}=x^{2/3}\).

## 2. Regra do produto

$$
(f\,g)'=f'\,g+f\,g'
$$

> [!WARNING]
> **Erro clássico:** \((fg)'\ne f'g'\). Teste com \(f=g=x\): \((x^2)'=2x\), mas \(f'g'=1\).

**Exemplo 2.** \(\dfrac{d}{dz}\big[(z^2-z)(z^3+3)\big]\)

1. \(f=z^2-z\Rightarrow f'=2z-1\). \(g=z^3+3\Rightarrow g'=3z^2\).
2. Monte \(f'g+fg'\):

$$
(2z-1)(z^3+3)+(z^2-z)(3z^2)
$$

3. Expanda: \((2z-1)(z^3+3)=2z^4+6z-z^3-3\) e \((z^2-z)(3z^2)=3z^4-3z^3\).
4. Some: \(2z^4+3z^4=5z^4\); \(-z^3-3z^3=-4z^3\); \(+6z\); \(-3\):

$$
5z^4-4z^3+6z-3
$$

## 3. Regra do quociente

$$
\left(\frac fg\right)'=\frac{f'\,g-f\,g'}{g^2}
$$

Para decorar: *derivada de cima vezes baixo, menos cima vezes derivada de baixo, tudo sobre baixo ao quadrado.* A **ordem do menos importa**.

**Exemplo 3.** \(\dfrac{d}{dt}\dfrac{t^2-1}{t^3+1}\)

1. \(f=t^2-1\Rightarrow f'=2t\). \(g=t^3+1\Rightarrow g'=3t^2\).
2. Numerador: \(2t(t^3+1)-(t^2-1)(3t^2)\). Expanda: \(2t^4+2t-(3t^4-3t^2)=2t^4+2t-3t^4+3t^2=-t^4+3t^2+2t\).

$$
\frac{-t^4+3t^2+2t}{(t^3+1)^2}
$$

## 4. Derivadas trigonométricas

| | |
| --- | --- |
| \((\operatorname{sen}x)'=\cos x\) | \((\cos x)'=-\operatorname{sen}x\) |
| \((\operatorname{tg}x)'=\sec^2x\) | \((\operatorname{cotg}x)'=-\operatorname{cossec}^2x\) |
| \((\sec x)'=\sec x\operatorname{tg}x\) | \((\operatorname{cossec}x)'=-\operatorname{cossec}x\operatorname{cotg}x\) |

Truque: toda função que começa com "co" tem derivada com sinal de menos.

**Exemplo 4.** \(y=\operatorname{sen}x\cos x\). Produto: \(\cos x\cdot\cos x+\operatorname{sen}x\cdot(-\operatorname{sen}x)=\cos^2x-\operatorname{sen}^2x\).

**Exemplo 5.** \(y=\dfrac{\cos x}{\operatorname{sen}x-1}\). Quociente:

$$
\frac{-\operatorname{sen}x(\operatorname{sen}x-1)-\cos x\cdot\cos x}{(\operatorname{sen}x-1)^2}=\frac{-\operatorname{sen}^2x+\operatorname{sen}x-\cos^2x}{(\operatorname{sen}x-1)^2}
$$

Com \(\operatorname{sen}^2x+\cos^2x=1\), o numerador vira \(\operatorname{sen}x-1\):

$$
\frac{\operatorname{sen}x-1}{(\operatorname{sen}x-1)^2}=\frac1{\operatorname{sen}x-1}
$$

**Exemplo 6.** \(y=\sec x\Rightarrow y'=\sec x\operatorname{tg}x\). Pelo produto: \(y''=\sec x\operatorname{tg}x\cdot\operatorname{tg}x+\sec x\cdot\sec^2x=\sec x\operatorname{tg}^2x+\sec^3x\).

## 5. Composição e regra da cadeia

Uma **composição** é uma função dentro de outra: \(h(x)=\sqrt{x^2+3}\) é \(f(g(x))\) com \(g(x)=x^2+3\) (dentro) e \(f(u)=\sqrt u\) (fora).

$$
\boxed{(f\circ g)'(x)=f'(g(x))\cdot g'(x)}
$$

Em palavras: **derive a de fora (mantendo o miolo) e multiplique pela derivada do miolo.** Com três camadas, multiplica-se uma derivada por camada, de fora para dentro.

**Receita:**

1. Identifique fora e dentro.
2. Derive a de fora **sem mexer no miolo**.
3. Multiplique pela derivada do miolo.

**Exemplo 7.** \(f(x)=\operatorname{sen}(x^2+x)\). Fora: \(\operatorname{sen}\); dentro: \(x^2+x\).

$$
f'(x)=\cos(x^2+x)\cdot(2x+1)
$$

**Exemplo 8.** \(h(r)=(5r^3-r^4)^7\): \(h'(r)=7(5r^3-r^4)^6\cdot(15r^2-4r^3)\).

**Exemplo 9 (três camadas).** \(g(t)=\operatorname{tg}(5-\operatorname{sen}2t)\)

1. Camada de fora (\(\operatorname{tg}\)): \(\sec^2(5-\operatorname{sen}2t)\).
2. Camada do meio (\(5-\operatorname{sen}2t\)): derivada \(-\cos(2t)\cdot2\) (aqui entra a cadeia de \(\operatorname{sen}2t\)).
3. Multiplique:

$$
g'(t)=\sec^2(5-\operatorname{sen}2t)\cdot(-2\cos2t)=-2\cos(2t)\sec^2(5-\operatorname{sen}2t)
$$

**Exemplo 10.** \(j(s)=\dfrac1{3s-2}=(3s-2)^{-1}\): \(j'(s)=-(3s-2)^{-2}\cdot3=-\dfrac3{(3s-2)^2}\).

**Exemplo 11.** \(\lvert x\rvert=\sqrt{x^2}\) para \(x\ne0\): derivada \(\dfrac{2x}{2\sqrt{x^2}}=\dfrac{x}{\lvert x\rvert}\), que vale \(-1\) se \(x<0\) e \(+1\) se \(x>0\).

> [!WARNING]
> **Erro nº 1 em provas:** esquecer o "vezes a derivada de dentro". Sempre pergunte: *tem algo diferente de \(x\) dentro?*

## 6. Exercícios

**Exercício 1.** Derive \(f(x)=(x^2+1)(x^3+x^2)\) de duas formas.

{{< details title="Gabarito" >}}
1. Pelo produto: \(2x(x^3+x^2)+(x^2+1)(3x^2+2x)=2x^4+2x^3+3x^4+2x^3+3x^2+2x=5x^4+4x^3+3x^2+2x\).
2. Expandindo antes: \(f=x^5+x^4+x^3+x^2\), e derivando: \(5x^4+4x^3+3x^2+2x\).

As duas batem. \(\checkmark\)
{{< /details >}}

**Exercício 2.** \(y=\dfrac{x-1}{x+1}\).

{{< details title="Gabarito" >}}
\(\dfrac{1\cdot(x+1)-(x-1)\cdot1}{(x+1)^2}=\dfrac{x+1-x+1}{(x+1)^2}=\boxed{\dfrac{2}{(x+1)^2}}\).
{{< /details >}}

**Exercício 3.** \(y=x^2\operatorname{sen}x\).

{{< details title="Gabarito" >}}
Produto: \(2x\operatorname{sen}x+x^2\cos x\).
{{< /details >}}

**Exercício 4.** \(f(x)=\dfrac1{(1-2x)^3}=(1-2x)^{-3}\).

{{< details title="Gabarito" >}}
Cadeia: \(-3(1-2x)^{-4}\cdot(-2)=6(1-2x)^{-4}=\boxed{\dfrac{6}{(1-2x)^4}}\).
{{< /details >}}

**Exercício 5.** \(y=\operatorname{sen}^3(2x)=[\operatorname{sen}(2x)]^3\).

{{< details title="Gabarito" >}}
Três camadas (potência, seno, \(2x\)): \(3\operatorname{sen}^2(2x)\cdot\cos(2x)\cdot2=\boxed{6\operatorname{sen}^2(2x)\cos(2x)}\).
{{< /details >}}
