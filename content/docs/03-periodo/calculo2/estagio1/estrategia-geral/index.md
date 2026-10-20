---
title: Estratégia Geral e Ferramentas Extras
weight: 7
description: Como escolher a técnica de integração, completar quadrados, método tabular e fórmulas de redução, com problemas mistos.
autores:
  - thallesgsrv
date: 2026-10-14
---

## Como funciona?

A parte mais difícil de integrar **não é executar** a técnica, e sim **escolher** qual usar. Esta página é o "mapa do tesouro": olhe para o integrando, ache o padrão, aplique a técnica certa. No final, há problemas misturados, como na prova.

## 1. Tabela de decisão: o que vejo, o que faço

| O integrando tem... | Técnica |
| --- | --- |
| Composição + a derivada do miolo (ou múltipla dela) | **Substituição simples** \(u=\text{miolo}\) |
| Polinômio \(\times\) \(e^x\), \(\operatorname{sen}\), \(\cos\) | **Por partes**, \(u=\) polinômio |
| \(\ln x\), \(\operatorname{arctg}x\), \(\operatorname{arcsen}x\) sozinhos (ou vezes polinômio) | **Por partes**, \(u=\) a função, \(dv=dx\) (ou \(x^n dx\)) |
| \(e^x\) vezes \(\operatorname{sen}\) ou \(\cos\) | **Por partes duas vezes** (caso circular) |
| Potências de \(\operatorname{sen}\), \(\cos\), \(\operatorname{tg}\), \(\sec\) | **Trigonométricas** |
| \(\sqrt{a^2-x^2}\), \(\sqrt{a^2+x^2}\), \(\sqrt{x^2-a^2}\) | **Substituição trigonométrica** |
| Razão de polinômios | **Dividir** (se grau do numerador \(\ge\)) + **frações parciais** |
| Quadrático \(ax^2+bx+c\) irredutível | **Completar quadrado** |
| Limite de integração infinito ou função que explode | **Imprópria** (limite) |

### Ordem de ataque

1. **Dá para simplificar?** (álgebra, identidade trigonométrica, dividir polinômios).
2. **Substituição simples** resolve? É a mais barata; tente sempre primeiro.
3. Se não, **classifique** o integrando pela tabela.
4. Se nada funcionar, **combine** (ex.: substituição e depois por partes) ou mude o \(u\).

> [!TIP]
> Duas técnicas quase sempre aparecem **juntas**: a substituição trigonométrica termina em integrais trigonométricas, e frações parciais termina em \(\ln\) e \(\operatorname{arctg}\) (que pedem substituição simples).

## 2. Completar quadrado

Para \(ax^2+bx+c\) que não fatora, escreva como **(quadrado) + constante**:

$$
x^2+bx+c=\left(x+\tfrac b2\right)^2+\left(c-\tfrac{b^2}4\right)
$$

De onde vem: \(\left(x+\tfrac b2\right)^2 = x^2 + bx + \tfrac{b^2}{4}\). Então \(x^2+bx = \left(x+\tfrac b2\right)^2 - \tfrac{b^2}{4}\), e somamos o \(c\).

Depois, \(u=x+\tfrac b2\) e caia em \(\operatorname{arctg}\) ou em substituição trigonométrica.

**Fórmula-chave:**

$$
\int\frac{dx}{x^2+a^2}=\frac1a\operatorname{arctg}\frac xa+C
$$

**Exemplo 1.** \(\displaystyle\int\frac{dx}{x^2+2x+5}\)

Passo 1. Aqui \(b = 2\), então \(\tfrac b2 = 1\): \(x^2+2x+5 = (x+1)^2 + (5 - 1) = (x+1)^2 + 4\).
Passo 2. Com \(u = x+1\), \(du = dx\), e \(4 = 2^2\):

$$
\int\frac{du}{u^2+2^2} = \frac12\operatorname{arctg}\frac{u}{2} = \frac12\operatorname{arctg}\frac{x+1}{2} + C
$$

**Exemplo 2 (com \(x\) no numerador).** \(\displaystyle\int\frac{x\,dx}{x^2+2x+5}\)

Passo 1. A derivada do denominador é \(2x+2\). Reescreva o numerador usando-a: \(x = \tfrac12(2x+2) - 1\). (Conferência: \(\tfrac12(2x+2) - 1 = x + 1 - 1 = x\). \(\checkmark\))
Passo 2. Separe em duas integrais:

$$
\frac12\int\frac{2x+2}{x^2+2x+5}\,dx - \int\frac{dx}{x^2+2x+5}
$$

Passo 3. A primeira é o padrão de ouro (numerador = derivada do denominador): \(\tfrac12\ln(x^2+2x+5)\). A segunda é o Exemplo 1.

$$
\frac12\ln(x^2+2x+5) - \frac12\operatorname{arctg}\frac{x+1}2 + C
$$

**Exemplo 3.** \(\displaystyle\int x^3e^{2x}\,dx\)

Passo 1. Organize a tabela de derivadas e integrais:

| Sinal | D (derivar) | I (integrar) |
| --- | --- | --- |
| \(+\) | \(x^3\) | \(\tfrac12e^{2x}\) |
| \(-\) | \(3x^2\) | \(\tfrac14e^{2x}\) |
| \(+\) | \(6x\) | \(\tfrac18e^{2x}\) |
| \(-\) | \(6\) | \(\tfrac1{16}e^{2x}\) |

Passo 2. Cada D é multiplicado pelo I da mesma linha, com o sinal da linha:

$$
+x^3\cdot\tfrac12e^{2x} \;-\; 3x^2\cdot\tfrac14e^{2x} \;+\; 6x\cdot\tfrac18e^{2x} \;-\; 6\cdot\tfrac1{16}e^{2x}
$$

Passo 3. Simplificando cada produto e colocando \(e^{2x}\) em evidência:

$$
 e^{2x}\left(\frac{x^3}2-\frac{3x^2}4+\frac{3x}4-\frac38\right)+C
$$

**Exemplo 4.** \(\displaystyle\int\operatorname{sen}^2x\,dx\) (\(n=2\)):

Passo 1. Use a fórmula de redução:

$$
\int\operatorname{sen}^nx\,dx=-\frac{\operatorname{sen}^{n-1}x\cos x}{n}+\frac{n-1}n\int\operatorname{sen}^{n-2}x\,dx
$$

Passo 2. Com \(n=2\):

$$
-\frac{\operatorname{sen}x\cos x}{2} + \frac12\int 1\,dx = -\frac{\operatorname{sen}x\cos x}{2} + \frac x2
$$

Passo 3. Resultado final:

$$
\int\operatorname{sen}^2x\,dx = \frac{x-\operatorname{sen}x\cos x}{2} + C
$$

## Problemas mistos

**Problema 1.** \(\displaystyle\int xe^{x^2}\,dx\)

{{< details title="Gabarito" >}}
Passo 1. *Técnica: substituição simples.* O miolo \(x^2\) tem derivada \(2x\), e há um \(x\) sobrando.
Passo 2. \(u=x^2\), \(du=2x\,dx\), logo \(x\,dx = \tfrac{du}{2}\).
Passo 3. \(\tfrac12\int e^u\,du = \tfrac12e^u\).

$$
\tfrac12e^{x^2}+C
$$
{{< /details >}}

**Problema 2.** \(\displaystyle\int x^3\ln x\,dx\)

{{< details title="Gabarito" >}}
Passo 1. *Técnica: partes* (\(\ln\) é o \(L\) da LIATE).
Passo 2. \(u=\ln x\), \(dv=x^3dx\), \(du=\dfrac{dx}{x}\), \(v=\dfrac{x^4}4\).
Passo 3. \(\dfrac{x^4}{4}\ln x-\displaystyle\int\dfrac{x^4}{4}\cdot\dfrac1x\,dx = \dfrac{x^4}{4}\ln x-\int\dfrac{x^3}4\,dx\).
Passo 4. \(\int\dfrac{x^3}{4}dx = \dfrac{x^4}{16}\).

$$
\frac{x^4}4\ln x-\frac{x^4}{16}+C
$$
{{< /details >}}

**Problema 3.** \(\displaystyle\int\cos^3x\,dx\)

{{< details title="Gabarito" >}}
Passo 1. *Técnica: trigonométrica* (expoente ímpar).
Passo 2. \(\cos^3x = (1-\operatorname{sen}^2x)\cos x\), \(u=\operatorname{sen}x\), \(du=\cos x\,dx\).
Passo 3. \(\int(1-u^2)\,du = u-\dfrac{u^3}{3}\).

$$
\operatorname{sen}x-\frac{\operatorname{sen}^3x}3+C
$$
{{< /details >}}

**Problema 4.** \(\displaystyle\int\sqrt{9-x^2}\,dx\)

{{< details title="Gabarito" >}}
Passo 1. *Técnica: substituição trigonométrica* (caso 2).
Passo 2. \(x=3\operatorname{sen}\theta\), \(dx=3\cos\theta\,d\theta\), \(\sqrt{9-x^2}=3\cos\theta\).
Passo 3. \(\displaystyle 9\int\cos^2\theta\,d\theta = 9\int\frac{1+\cos2\theta}{2}\,d\theta = \frac92\left(\theta+\frac{\operatorname{sen}2\theta}{2}\right) = \frac92(\theta+\operatorname{sen}\theta\cos\theta)\).
Passo 4. Triângulo: \(\operatorname{sen}\theta=\dfrac x3\), \(\cos\theta=\dfrac{\sqrt{9-x^2}}3\), então \(\tfrac92\operatorname{sen}\theta\cos\theta = \tfrac x2\sqrt{9-x^2}\).

$$
\frac92\operatorname{arcsen}\frac x3+\frac x2\sqrt{9-x^2}+C
$$
{{< /details >}}

**Problema 5.** \(\displaystyle\int\frac{x+1}{x^2-x-6}\,dx\)

{{< details title="Gabarito" >}}
Passo 1. *Técnica: frações parciais.*
Passo 2. Fatore: produto \(-6\), soma \(-1\): \(-3\) e \(2\). \(x^2-x-6=(x-3)(x+2)\).
Passo 3. \(x+1=A(x+2)+B(x-3)\).
   - \(x=3\): \(4=5A\), \(A=\tfrac45\).
   - \(x=-2\): \(-1=-5B\), \(B=\tfrac15\).

$$
\tfrac45\ln\lvert x-3\rvert+\tfrac15\ln\lvert x+2\rvert+C
$$
{{< /details >}}

**Problema 6.** \(\displaystyle\int x\operatorname{arctg}x\,dx\)

{{< details title="Gabarito" >}}
Passo 1. *Técnica: partes* (\(\operatorname{arctg}\) é o \(I\), vem antes do polinômio).
Passo 2. \(u=\operatorname{arctg}x\), \(dv=x\,dx\), \(du=\dfrac{dx}{1+x^2}\), \(v=\dfrac{x^2}2\).
Passo 3. \(\dfrac{x^2}2\operatorname{arctg}x-\dfrac12\displaystyle\int\dfrac{x^2}{1+x^2}dx\).
Passo 4. Divida: \(\dfrac{x^2}{1+x^2}=\dfrac{(1+x^2)-1}{1+x^2}=1-\dfrac1{1+x^2}\). Então \(\int=x-\operatorname{arctg}x\).
Passo 5. Juntando: \(\dfrac{x^2}{2}\operatorname{arctg}x-\dfrac x2+\dfrac12\operatorname{arctg}x\). Em evidência o \(\operatorname{arctg}\):

$$
\frac{x^2+1}2\operatorname{arctg}x-\frac x2+C
$$
{{< /details >}}

**Problema 7.** \(\displaystyle\int\operatorname{tg}^2x\sec^2x\,dx\)

{{< details title="Gabarito" >}}
Passo 1. *Técnica: substituição.* Sobra \(\sec^2x\,dx\), então \(u=\operatorname{tg}x\), \(du=\sec^2x\,dx\): \(\int u^2du = \dfrac{u^3}{3}\).

$$
\frac{\operatorname{tg}^3x}3+C
$$
{{< /details >}}

**Problema 8.** \(\displaystyle\int_0^1\ln x\,dx\)

{{< details title="Gabarito" >}}
Passo 1. *Técnica: imprópria (explode em \(0\)) e partes.*
Passo 2. \(\int\ln x\,dx=x\ln x-x\).
Passo 3. Em \(1\): \(0-1=-1\). Em \(c\): \(c\ln c-c\).
Passo 4. \(\displaystyle\lim_{c\to0^+}\big[x\ln x-x\big]_c^1=-1-\lim_{c\to0^+}(c\ln c-c)\). Como \(c\ln c=\dfrac{\ln c}{1/c}\to\dfrac{1/c}{-1/c^2}=-c\to0\) (L'Hôpital), o limite é \(-1-0=-1\). **Converge a \(-1\).**
{{< /details >}}

**Problema 9.** \(\displaystyle\int\frac{x^2+1}{x^3+3x}\,dx\)

{{< details title="Gabarito" >}}
Passo 1. *Técnica: substituição (padrão de ouro com constante).*
Passo 2. Derivada do denominador: \((x^3+3x)'=3x^2+3=3(x^2+1)\). O numerador \(x^2+1\) é **um terço** dela.
Passo 3. \(u=x^3+3x\), \(du=3(x^2+1)dx\), logo \((x^2+1)dx=\tfrac{du}{3}\).

$$
\tfrac13\int\frac{du}{u}=\tfrac13\ln\lvert x^3+3x\rvert+C
$$
{{< /details >}}

**Problema 10.** \(\displaystyle\int x^2\operatorname{sen}x\,dx\)

{{< details title="Gabarito" >}}
Passo 1. *Técnica: tabular.*

| Sinal | D | I |
| --- | --- | --- |
| \(+\) | \(x^2\) | \(-\cos x\) |
| \(-\) | \(2x\) | \(-\operatorname{sen}x\) |
| \(+\) | \(2\) | \(\cos x\) |

Passo 2. Produtos com o sinal da linha:

$$
+x^2(-\cos x)\;-\;2x(-\operatorname{sen}x)\;+\;2\cos x = -x^2\cos x+2x\operatorname{sen}x+2\cos x+C
$$
{{< /details >}}
