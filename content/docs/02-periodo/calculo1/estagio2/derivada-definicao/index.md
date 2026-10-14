---
title: Definição de Derivada
weight: 1
description: Reta tangente, definição pelo limite, função derivada e derivadas laterais.
autores:
  - thallesgsrv
date: 2026-10-11
---

## 1. O problema da reta tangente

Queremos a reta que "encosta" no gráfico de $f$ no ponto $P(x_0, f(x_0))$. Só com um ponto não dá para achar a inclinação, então fazemos um truque:

1. Pegamos um segundo ponto $Q(x_0+h,\ f(x_0+h))$, vizinho de $P$.
2. A reta por $P$ e $Q$ é a **secante**, com inclinação
$$
\frac{f(x_0+h)-f(x_0)}{h}
$$
3. Aproximamos $Q$ de $P$ fazendo $h \to 0$. As secantes viram a tangente.

## 2. Definição de derivada

$$
\boxed{f'(x_0)=\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}}
$$

(se o limite existir). Esse número é a **inclinação do gráfico** em $x_0$. A reta tangente é:

$$
y - f(x_0) = f'(x_0)\,(x-x_0)
$$

Existe uma versão equivalente, às vezes mais prática:
$$
f'(x_0)=\lim_{z\to x_0}\frac{f(z)-f(x_0)}{z-x_0}
$$

**Notações** (todas significam a mesma coisa): $f'(x)$, $\dfrac{df}{dx}$, $\dfrac{dy}{dx}$, $D_x f$. Em um ponto: $f'(x_0)$ ou $\dfrac{df}{dx}\Big|_{x=x_0}$.

## 3. Receita: derivar pela definição

1. Escreva $f(x+h)$ e monte o quociente $\dfrac{f(x+h)-f(x)}{h}$.
2. Expanda e simplifique até **cortar o $h$ do denominador**. Se não cortou, algo ficou errado.
3. Só então faça $h\to0$.

> [!WARNING]
> Nunca substitua $h=0$ antes de simplificar: você cai em $\frac00$.

### Exemplo 1

Se $f(x)=x^2-x+1$, calcule $f'(x)$ e $f'(-1)$.

$$
\frac{(x+h)^2-(x+h)+1-(x^2-x+1)}{h}=\frac{2xh+h^2-h}{h}=2x+h-1
$$

Fazendo $h\to0$: $f'(x)=2x-1$. Logo $f'(-1)=-3$.

### Exemplo 2

Se $f(x)=\dfrac1x$:
$$
\frac{\frac1{x+h}-\frac1x}{h}=\frac{x-(x+h)}{x(x+h)\,h}=\frac{-1}{x(x+h)}\xrightarrow{h\to0}-\frac1{x^2}
$$

### Exemplo 3 (reta tangente)

Tangente a $y=x^2$ em $x_0=2$. Pela definição (ou pela regra do próximo tópico), $f'(x)=2x$, então $m=f'(2)=4$ e $f(2)=4$:
$$
y-4=4(x-2)\ \Rightarrow\ y=4x-4
$$

## 4. A função derivada

Em vez de calcular em um ponto, calculamos em **todo** $x$ e obtemos uma nova função $f'$. Se $f'(x)$ existe em todo ponto do intervalo, dizemos que $f$ é **derivável** (ou diferenciável).

## 5. Derivadas laterais e quando a derivada não existe

Como a derivada é um limite, ela existe se, e somente se, os dois limites laterais existem e são iguais:

$$
f'_+(c)=\lim_{h\to0^+}\frac{f(c+h)-f(c)}{h},\qquad f'_-(c)=\lim_{h\to0^-}\frac{f(c+h)-f(c)}{h}
$$

A derivada **não existe** em:

- **Bico (quina):** inclinações diferentes dos dois lados. Ex.: $\lvert x\rvert$ em $0$ (esquerda dá $-1$, direita dá $+1$).
- **Descontinuidade:** salto ou buraco.
- **Tangente vertical:** a inclinação "vai para o infinito". Ex.: $\sqrt[3]{x}$ em $0$.

> [!IMPORTANT]
> **Derivável $\Rightarrow$ contínua.** A volta é falsa: $\lvert x\rvert$ é contínua em $0$ e não é derivável.

## Exercícios propostos

**Exercício 1.** Use a definição para achar $f'(x)$ se $f(x)=x^2$, e depois $f'(3)$.

{{< details title="Gabarito" >}}
$\dfrac{(x+h)^2-x^2}{h}=\dfrac{2xh+h^2}{h}=2x+h\to2x$. Logo $f'(3)=6$.
{{< /details >}}

**Exercício 2.** Use a definição para achar $f'(x)$ se $f(x)=\sqrt{x}$, $x>0$. *Dica: multiplique pelo conjugado.*

{{< details title="Gabarito" >}}
$$
\frac{\sqrt{x+h}-\sqrt{x}}{h}\cdot\frac{\sqrt{x+h}+\sqrt{x}}{\sqrt{x+h}+\sqrt{x}}=\frac{h}{h(\sqrt{x+h}+\sqrt{x})}\to\frac1{2\sqrt{x}}
$$
{{< /details >}}

**Exercício 3.** Ache a reta tangente a $y=\dfrac1x$ em $x_0=1$.

{{< details title="Gabarito" >}}
Do Exemplo 2, $f'(1)=-1$ e $f(1)=1$. Reta: $y-1=-(x-1)$, ou seja, $y=-x+2$.
{{< /details >}}

**Exercício 4.** Seja $f(x)=x^2$ se $x\le1$ e $f(x)=2x-1$ se $x>1$. $f$ é derivável em $x=1$?

{{< details title="Gabarito" >}}
Esquerda: $\lim_{h\to0^-}\frac{(1+h)^2-1}{h}=\lim(2+h)=2$.
Direita: $\lim_{h\to0^+}\frac{2(1+h)-1-1}{h}=\lim\frac{2h}{h}=2$.
Iguais, então **sim**, $f'(1)=2$.
{{< /details >}}
