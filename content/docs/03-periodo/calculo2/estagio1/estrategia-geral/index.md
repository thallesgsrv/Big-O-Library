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
Depois, \(u=x+\tfrac b2\) e caia em \(\operatorname{arctg}\) ou em substituição trigonométrica.

**Fórmula-chave:**
$$
\int\frac{dx}{x^2+a^2}=\frac1a\operatorname{arctg}\frac xa+C
$$

**Exemplo 1.** \(\displaystyle\int\frac{dx}{x^2+2x+5}\). Como \(x^2+2x+5=(x+1)^2+4\):
$$
\int\frac{du}{u^2+2^2}=\frac12\operatorname{arctg}\frac{x+1}{2}+C
$$

**Exemplo 2 (com \(x\) no numerador).** \(\displaystyle\int\frac{x\,dx}{x^2+2x+5}\). Escreva \(x=\tfrac12(2x+2)-1\) (o \(2x+2\) é a derivada do denominador):
$$
\frac12\int\frac{2x+2}{x^2+2x+5}dx-\int\frac{dx}{x^2+2x+5}=\frac12\ln(x^2+2x+5)-\frac12\operatorname{arctg}\frac{x+1}2+C
$$

> [!IMPORTANT]
> **Padrão de ouro:** numerador = derivada do denominador \(\Rightarrow\) \(\ln\lvert\text{denominador}\rvert\). O que sobrar vira \(\operatorname{arctg}\).

## 3. Método tabular (por partes repetida)

Quando você precisa de partes **várias vezes** (polinômio de grau alto vezes \(e^{ax}\), \(\operatorname{sen}\) ou \(\cos\)), organize em tabela:

1. Coluna **D**: derive o polinômio até chegar a \(0\).
2. Coluna **I**: integre a outra função repetidamente.
3. Multiplique **na diagonal**, com sinais alternados \(+,-,+,-\ldots\), e some.

**Exemplo 3.** \(\displaystyle\int x^3e^{2x}\,dx\)

| Sinal | D | I |
| --- | --- | --- |
| \(+\) | \(x^3\) | \(\tfrac12e^{2x}\) |
| \(-\) | \(3x^2\) | \(\tfrac14e^{2x}\) |
| \(+\) | \(6x\) | \(\tfrac18e^{2x}\) |
| \(-\) | \(6\) | \(\tfrac1{16}e^{2x}\) |

$$
=e^{2x}\left(\frac{x^3}2-\frac{3x^2}4+\frac{3x}4-\frac38\right)+C
$$

> [!WARNING]
> O tabular só serve quando um dos lados **zera** após derivar (polinômio). Em \(e^x\operatorname{sen}x\) ele não termina; use o caso circular.

## 4. Fórmulas de redução

Quando a potência é alta, dá para **reduzir o expoente** a cada rodada (deduzidas por partes):
$$
\int\operatorname{sen}^nx\,dx=-\frac{\operatorname{sen}^{n-1}x\cos x}{n}+\frac{n-1}n\int\operatorname{sen}^{n-2}x\,dx
$$
$$
\int\cos^nx\,dx=\frac{\cos^{n-1}x\operatorname{sen}x}{n}+\frac{n-1}n\int\cos^{n-2}x\,dx
$$
$$
\int\sec^nx\,dx=\frac{\sec^{n-2}x\operatorname{tg}x}{n-1}+\frac{n-2}{n-1}\int\sec^{n-2}x\,dx
$$

**Exemplo 4.** \(\displaystyle\int\operatorname{sen}^2x\,dx\) (\(n=2\)): \(-\dfrac{\operatorname{sen}x\cos x}2+\dfrac12x+C\), o mesmo que \(\dfrac{x-\operatorname{sen}x\cos x}{2}+C\).

## Problemas mistos

Antes de abrir o gabarito, **diga qual técnica** usaria.

**Problema 1.** \(\displaystyle\int xe^{x^2}\,dx\)

{{< details title="Gabarito" >}}
Substituição simples: \(u=x^2\), \(du=2x\,dx\). Resposta: \(\tfrac12e^{x^2}+C\).
{{< /details >}}

**Problema 2.** \(\displaystyle\int x^3\ln x\,dx\)

{{< details title="Gabarito" >}}
Partes, \(u=\ln x\), \(dv=x^3dx\): \(\dfrac{x^4}4\ln x-\displaystyle\int\dfrac{x^3}4dx=\dfrac{x^4}4\ln x-\dfrac{x^4}{16}+C\).
{{< /details >}}

**Problema 3.** \(\displaystyle\int\cos^3x\,dx\)

{{< details title="Gabarito" >}}
Trigonométrica (expoente ímpar): \(\int(1-\operatorname{sen}^2x)\cos x\,dx\), com \(u=\operatorname{sen}x\): \(\operatorname{sen}x-\dfrac{\operatorname{sen}^3x}3+C\).
{{< /details >}}

**Problema 4.** \(\displaystyle\int\sqrt{9-x^2}\,dx\)

{{< details title="Gabarito" >}}
Subst. trigonométrica, \(x=3\operatorname{sen}\theta\): \(9\displaystyle\int\cos^2\theta\,d\theta=\dfrac92(\theta+\operatorname{sen}\theta\cos\theta)\). Resposta: \(\dfrac92\operatorname{arcsen}\dfrac x3+\dfrac x2\sqrt{9-x^2}+C\).
{{< /details >}}

**Problema 5.** \(\displaystyle\int\frac{x+1}{x^2-x-6}\,dx\)

{{< details title="Gabarito" >}}
\(x^2-x-6=(x-3)(x+2)\). Frações parciais: \(\dfrac{x+1}{(x-3)(x+2)}=\dfrac{4/5}{x-3}+\dfrac{1/5}{x+2}\). Resposta: \(\tfrac45\ln\lvert x-3\rvert+\tfrac15\ln\lvert x+2\rvert+C\).
{{< /details >}}

**Problema 6.** \(\displaystyle\int x\operatorname{arctg}x\,dx\)

{{< details title="Gabarito" >}}
Partes, \(u=\operatorname{arctg}x\), \(dv=x\,dx\): \(\dfrac{x^2}2\operatorname{arctg}x-\dfrac12\displaystyle\int\dfrac{x^2}{1+x^2}dx\). Como \(\dfrac{x^2}{1+x^2}=1-\dfrac1{1+x^2}\): \(\dfrac{x^2+1}2\operatorname{arctg}x-\dfrac x2+C\).
{{< /details >}}

**Problema 7.** \(\displaystyle\int\operatorname{tg}^2x\sec^2x\,dx\)

{{< details title="Gabarito" >}}
Substituição \(u=\operatorname{tg}x\), \(du=\sec^2x\,dx\): \(\dfrac{\operatorname{tg}^3x}3+C\).
{{< /details >}}

**Problema 8.** \(\displaystyle\int_0^1\ln x\,dx\)

{{< details title="Gabarito" >}}
Imprópria (explode em \(0\)) e partes. \(\int\ln x\,dx=x\ln x-x\). Então \(\lim_{c\to0^+}\big[x\ln x-x\big]_c^1=-1-\lim_{c\to0^+}(c\ln c-c)=-1\) (pois \(c\ln c\to0\), por L'Hôpital). **Converge a \(-1\).**
{{< /details >}}

**Problema 9.** \(\displaystyle\int\frac{x^2+1}{x^3+3x}\,dx\)

{{< details title="Gabarito" >}}
Numerador \(x^2+1\) não é exatamente a derivada \(3x^2+3\) do denominador, mas é \(\tfrac13\) dela: \(\tfrac13\int\dfrac{3x^2+3}{x^3+3x}dx=\tfrac13\ln\lvert x^3+3x\rvert+C\) (substituição simples).
{{< /details >}}

**Problema 10.** \(\displaystyle\int x^2\operatorname{sen}x\,dx\)

{{< details title="Gabarito" >}}
Tabular: \(D\): \(x^2,2x,2\); \(I\): \(-\cos x,-\operatorname{sen}x,\cos x\). Sinais \(+,-,+\): \(-x^2\cos x+2x\operatorname{sen}x+2\cos x+C\).
{{< /details >}}
