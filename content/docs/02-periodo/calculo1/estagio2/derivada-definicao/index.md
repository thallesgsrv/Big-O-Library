---
title: Definição de Derivada
weight: 1
description: Reta tangente, definição pelo limite, função derivada e derivadas laterais.
autores:
  - thallesgsrv
date: 2026-10-11
---

## 1. O problema da reta tangente

Queremos a reta que "encosta" no gráfico de \(f\) no ponto \(P(x_0,\,f(x_0))\). Só com **um** ponto não dá para achar a inclinação, então fazemos um truque:

1. Pegamos um segundo ponto \(Q\big(x_0+h,\ f(x_0+h)\big)\), vizinho de \(P\) (a distância horizontal entre eles é \(h\)).
2. A reta por \(P\) e \(Q\) é a **secante**. Sua inclinação é "quanto sobe dividido por quanto anda":

$$
m_{\text{sec}}=\frac{f(x_0+h)-f(x_0)}{(x_0+h)-x_0}=\frac{f(x_0+h)-f(x_0)}{h}
$$

3. Aproximamos \(Q\) de \(P\) fazendo \(h\to0\). As secantes viram, no limite, a tangente.

## 2. Definição de derivada

$$
\boxed{f'(x_0)=\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}}
$$

Esse número é a **inclinação do gráfico** em \(x_0\) (e também a taxa de variação instantânea). A reta tangente é

$$
y-f(x_0)=f'(x_0)\,(x-x_0)
$$

Notações equivalentes: \(f'(x)\), \(\dfrac{df}{dx}\), \(\dfrac{dy}{dx}\).

## 3. Receita: derivar pela definição

1. Escreva \(f(x+h)\) e monte o quociente \(\dfrac{f(x+h)-f(x)}{h}\).
2. **Expanda e simplifique** até **cortar o \(h\) do denominador**. Se não cortou, algo ficou errado.
3. Só então faça \(h\to0\).

> [!WARNING]
> Nunca substitua \(h=0\) **antes** de simplificar: você cai em \(\frac00\).

## 4. Exemplos

**Exemplo 1.** Se \(f(x)=x^2-x+1\), calcule \(f'(x)\) e \(f'(-1)\).

1. Calcule \(f(x+h)\), expandindo \((x+h)^2=x^2+2xh+h^2\):

$$
f(x+h)=x^2+2xh+h^2-x-h+1
$$

2. Subtraia \(f(x)=x^2-x+1\) (cuidado com os sinais):

$$
f(x+h)-f(x)=2xh+h^2-h
$$

3. Divida por \(h\) (coloque \(h\) em evidência: \(h(2x+h-1)\)):

$$
\frac{2xh+h^2-h}{h}=2x+h-1
$$

4. Faça \(h\to0\): \(f'(x)=2x-1\).
5. Em \(x=-1\): \(f'(-1)=2(-1)-1=\boxed{-3}\).

**Exemplo 2.** \(f(x)=\dfrac1x\).

1. Quociente de diferenças:

$$
\frac{\frac1{x+h}-\frac1x}{h}
$$

2. Some as frações do numerador com denominador comum \(x(x+h)\):

$$
\frac1{x+h}-\frac1x=\frac{x-(x+h)}{x(x+h)}=\frac{-h}{x(x+h)}
$$

3. Divida por \(h\): \(\dfrac{-h}{x(x+h)\,h}=\dfrac{-1}{x(x+h)}\).
4. Com \(h\to0\):

$$
f'(x)=-\frac1{x^2}
$$

**Exemplo 3 (reta tangente).** Tangente a \(y=x^2\) em \(x_0=2\).

1. Pela definição (ou regra), \(f'(x)=2x\). Então \(m=f'(2)=4\).
2. \(f(2)=4\). A reta é \(y-4=4(x-2)\).
3. Distribua e isole \(y\): \(y=4x-8+4=\boxed{4x-4}\).

## 5. Derivadas laterais e quando a derivada não existe

Como a derivada é um limite, ela existe se, e somente se, os dois laterais existem e são iguais:

$$
f'_{-}(a)=\lim_{h\to0^-}\frac{f(a+h)-f(a)}{h},\qquad f'_{+}(a)=\lim_{h\to0^+}\frac{f(a+h)-f(a)}{h}
$$

A derivada **não existe** em:

- **Bico (quina):** inclinações diferentes dos dois lados. Ex.: \(\lvert x\rvert\) em \(0\) (esquerda dá \(-1\), direita dá \(+1\)).
- **Descontinuidade:** salto ou buraco.
- **Tangente vertical:** a inclinação "vai para o infinito". Ex.: \(\sqrt[3]{x}\) em \(0\).

> [!IMPORTANT]
> **Derivável implica contínua.** A volta é falsa: \(\lvert x\rvert\) é contínua em \(0\) e não é derivável.

## 6. Exercícios

**Exercício 1.** Use a definição para achar \(f'(x)\) se \(f(x)=x^2\), e \(f'(3)\).

{{< details title="Gabarito" >}}
1. \(\dfrac{(x+h)^2-x^2}{h}=\dfrac{x^2+2xh+h^2-x^2}{h}=\dfrac{2xh+h^2}{h}=2x+h\).
2. \(h\to0\): \(f'(x)=2x\). Então \(f'(3)=\boxed6\).
{{< /details >}}

**Exercício 2.** Pela definição, \(f'(x)\) se \(f(x)=\sqrt x\), \(x>0\).

{{< details title="Gabarito" >}}
1. \(\dfrac{\sqrt{x+h}-\sqrt x}{h}\). Multiplique em cima e embaixo pelo conjugado \(\sqrt{x+h}+\sqrt x\).
2. Numerador: \((x+h)-x=h\).

$$
\frac{h}{h\big(\sqrt{x+h}+\sqrt x\big)}=\frac1{\sqrt{x+h}+\sqrt x}\xrightarrow{h\to0}\frac1{2\sqrt x}
$$
{{< /details >}}

**Exercício 3.** Reta tangente a \(y=\frac1x\) em \(x_0=1\).

{{< details title="Gabarito" >}}
Do Exemplo 2, \(f'(1)=-1\); \(f(1)=1\). Reta: \(y-1=-(x-1)\), logo \(y=-x+1+1=\boxed{-x+2}\).
{{< /details >}}

**Exercício 4.** \(f(x)=\begin{cases}x^2,&x\le1\\2x-1,&x>1\end{cases}\) é derivável em \(x=1\)?

{{< details title="Gabarito" >}}
- Esquerda: \(\lim_{h\to0^-}\dfrac{(1+h)^2-1}{h}=\lim\dfrac{2h+h^2}{h}=\lim(2+h)=2\).
- Direita: \(\lim_{h\to0^+}\dfrac{2(1+h)-1-1}{h}=\lim\dfrac{2h}{h}=2\).

Iguais, então **sim**, \(f'(1)=2\).
{{< /details >}}
