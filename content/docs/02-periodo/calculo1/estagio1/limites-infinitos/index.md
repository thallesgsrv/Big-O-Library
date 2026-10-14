---
title: Limites Infinitos, Limites no Infinito e Assíntotas
weight: 4
description: Quando a função explode, quando x vai para o infinito, e como isso vira assíntotas.
autores:
  - thallesgsrv
date: 2026-10-01
---

## 1. Dois tipos de "infinito"

O símbolo $\infty$ **não é um número**: é uma forma de dizer "cresce sem parar". Ele aparece de duas maneiras muito diferentes:

| | Quem vai ao infinito? | Exemplo |
| --- | --- | --- |
| **Limite infinito** | o **valor da função** $f(x)$ | $\lim_{x\to2^+}\dfrac1{x-2}=+\infty$ |
| **Limite no infinito** | o **valor de $x$** | $\lim_{x\to+\infty}\dfrac1x=0$ |

Cada tipo gera um tipo de **assíntota**: reta que o gráfico "persegue" sem tocar (no sentido de se aproximar indefinidamente).

## 2. Limites infinitos e assíntotas verticais

Se, quando $x\to a$ (por um lado ou pelos dois), $f(x)$ cresce sem limite, escrevemos $\lim f(x)=+\infty$. Se decresce sem limite, $-\infty$. Nesses casos a reta $x=a$ é uma **assíntota vertical**.

**Intuição:** $\dfrac{\text{algo não nulo}}{\text{número minúsculo}}=\text{número gigante}$. O sinal depende de quem é o numerador e de **qual lado** o denominador minúsculo está.

### Receita

1. Substitua $x=a$. Se der $\dfrac{k}{0}$ com $k\ne0$, há candidata a assíntota vertical.
2. Analise o **sinal do denominador** de cada lado de $a$.
3. Conclua $+\infty$ ou $-\infty$ em cada lado.

**Exemplo 1.** $\displaystyle\lim_{x\to3^+}\frac{2}{x-3}$: $x-3$ é positivo minúsculo, então $+\infty$. E $\displaystyle\lim_{x\to3^-}\frac{2}{x-3}=-\infty$. O limite bilateral **não existe** (lados diferentes), mas $x=3$ é assíntota vertical.

**Exemplo 2.** $\displaystyle\lim_{x\to0}\frac{1}{x^2}=+\infty$. Aqui $x^2>0$ dos dois lados, então os dois laterais coincidem. Dizemos que o limite é $+\infty$.

**Exemplo 3.** $\displaystyle\lim_{x\to1^+}\frac{x+2}{x^2-1}$: numerador $\to3>0$; $x^2-1=(x-1)(x+1)$ e, com $x>1$, é positivo minúsculo. Resultado: $+\infty$.

> [!WARNING]
> Se der $\frac00$, **não** é assíntota ainda: fatore e simplifique primeiro (veja a página de limites). Ex.: $\frac{x^2-1}{x-1}$ em $x=1$ dá um buraco, não uma assíntota.

## 3. Limites no infinito e assíntotas horizontais

$\lim_{x\to+\infty}f(x)=L$ significa: quando $x$ fica gigante, $f(x)$ chega perto de $L$. Se isso acontece, $y=L$ é uma **assíntota horizontal**. O mesmo vale para $x\to-\infty$.

Dois limites base:
$$
\lim_{x\to\pm\infty}\frac1{x^p}=0\ (p>0),\qquad\lim_{x\to+\infty}x^p=+\infty\ (p>0)
$$

### Receita para quocientes de polinômios

**Divida numerador e denominador pela maior potência de $x$ do denominador** (ou compare só os termos de maior grau).

**Exemplo 4.** $\displaystyle\lim_{x\to\infty}\frac{3x^2+1}{5x^2-x}=\lim\frac{3+\frac1{x^2}}{5-\frac1x}=\frac35$. Assíntota horizontal $y=\frac35$.

**Exemplo 5.** $\displaystyle\lim_{x\to\infty}\frac{x+1}{x^2+3}=\lim\frac{\frac1x+\frac1{x^2}}{1+\frac3{x^2}}=0$.

**Exemplo 6.** $\displaystyle\lim_{x\to\infty}\frac{x^3+1}{2x^2+5}=+\infty$ (o numerador cresce mais rápido).

> [!IMPORTANT]
> **Regra do grau.** Em $\dfrac{P(x)}{Q(x)}$ com $x\to\pm\infty$: grau de $P<$ grau de $Q\Rightarrow0$; graus iguais $\Rightarrow$ razão dos coeficientes líderes; grau de $P>$ grau de $Q\Rightarrow\pm\infty$.

**Exemplo 7 (com raiz).** $\displaystyle\lim_{x\to+\infty}\frac{\sqrt{x^2+1}}{x}=\lim\sqrt{1+\frac1{x^2}}=1$. Mas cuidado em $x\to-\infty$: $\sqrt{x^2}=\lvert x\rvert=-x$, e o limite é $-1$.

**Exemplo 8 ($\infty-\infty$).** $\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+x}-x\right)$: multiplique pelo conjugado:
$$
\frac{(x^2+x)-x^2}{\sqrt{x^2+x}+x}=\frac{x}{\sqrt{x^2+x}+x}=\frac1{\sqrt{1+\frac1x}+1}\to\frac12
$$

**Outros que valem lembrar:** $\lim_{x\to+\infty}e^x=+\infty$, $\lim_{x\to-\infty}e^x=0$, $\lim_{x\to+\infty}\ln x=+\infty$, $\lim_{x\to0^+}\ln x=-\infty$, $\lim_{x\to\pm\infty}\operatorname{arctg}x=\pm\frac\pi2$.

## 4. Formas indeterminadas e ordem de crescimento

$\dfrac\infty\infty$, $\infty-\infty$, $0\cdot\infty$ **não** têm resposta fixa: dependem de quem "vence". Quem vence quando $x\to\infty$:
$$
\ln x\ \ll\ x^p\ \ll\ e^x
$$
(logaritmo cresce mais devagar que potência, que cresce mais devagar que exponencial). Por isso $\dfrac{x^2}{e^x}\to0$. (Mais uma ferramenta, a **regra de L'Hôpital**, vem no Estágio 2.)

## 5. Como ler assíntotas de um gráfico

- Assíntota **vertical** em $x=a$: procure onde o denominador zera (e o numerador não) ou um logaritmo vai a $0^+$.
- Assíntota **horizontal**: calcule $\lim_{x\to+\infty}f$ e $\lim_{x\to-\infty}f$.

**Exemplo 9.** $f(x)=\dfrac{2x}{x-1}$. Vertical: $x=1$ (denominador zera, numerador $2\ne0$). Horizontal: $\lim_{x\to\pm\infty}\frac{2x}{x-1}=2$, então $y=2$.

## Exercícios

**Exercício 1.** $\displaystyle\lim_{x\to1^-}\frac{1}{x-1}$ e $\displaystyle\lim_{x\to1^+}\frac1{x-1}$.

{{< details title="Gabarito" >}}
$-\infty$ pela esquerda, $+\infty$ pela direita.
{{< /details >}}

**Exercício 2.** $\displaystyle\lim_{x\to\infty}\frac{4x^3-x}{2x^3+7}$.

{{< details title="Gabarito" >}}
Graus iguais: razão dos líderes, $\dfrac42=2$.
{{< /details >}}

**Exercício 3.** $\displaystyle\lim_{x\to-\infty}\frac{x^2+1}{x-3}$.

{{< details title="Gabarito" >}}
Grau do numerador maior. Dividindo por $x$: $\dfrac{x+\frac1x}{1-\frac3x}\to-\infty$ (com $x\to-\infty$).
{{< /details >}}

**Exercício 4.** Ache as assíntotas de $f(x)=\dfrac{x}{x^2-4}$.

{{< details title="Gabarito" >}}
Verticais: $x=2$ e $x=-2$. Horizontal: grau do numerador menor, então $y=0$.
{{< /details >}}

**Exercício 5.** $\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+3x}-x\right)$.

{{< details title="Gabarito" >}}
Conjugado: $\dfrac{3x}{\sqrt{x^2+3x}+x}=\dfrac{3}{\sqrt{1+3/x}+1}\to\dfrac32$.
{{< /details >}}
