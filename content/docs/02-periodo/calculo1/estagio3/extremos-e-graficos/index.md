---
title: Extremos, Monotonicidade e Esboço de Gráficos
weight: 2
description: Pontos críticos, máximos e mínimos, Rolle, valor médio, concavidade e esboço de gráfico.
autores:
  - thallesgsrv
date: 2026-10-14
---

## 1. Extremos

- **Máximo absoluto** em \(c\): \(f(c)\ge f(x)\) para **todo** \(x\) do domínio. **Mínimo absoluto**: \(f(c)\le f(x)\) para todo \(x\).
- **Extremo local:** vale a desigualdade só perto de \(c\) (num intervalo aberto em volta).

> [!IMPORTANT]
> **Teorema de Weierstrass:** se \(f\) é **contínua em um intervalo fechado** \([a,b]\), então \(f\) **tem** máximo e mínimo absolutos em \([a,b]\). Fora dessas condições eles podem não existir (ex.: \(f(x)=x\) em \((1,2)\)).

## 2. Pontos críticos

\(c\) é **ponto crítico** de \(f\) se \(c\) está no domínio e \(f'(c)=0\) **ou** \(f'(c)\) não existe. Extremos locais em pontos interiores só acontecem em pontos críticos.

> [!WARNING]
> A volta é falsa: \(f'(c)=0\) **não garante** extremo. Ex.: \(f(x)=x^3\) tem \(f'(0)=0\) e é sempre crescente.

**Receita: extremos absolutos em \([a,b]\)**

1. Ache todos os pontos críticos dentro de \((a,b)\).
2. Calcule \(f\) nos pontos críticos **e nas bordas** \(a\) e \(b\).
3. **Compare:** o maior valor é o máximo, o menor é o mínimo.

**Exemplo 1.** \(f(x)=x^2\) em \([-2,1]\).

1. \(f'(x)=2x=0\) em \(x=0\) (crítico).
2. Valores: \(f(-2)=4\), \(f(0)=0\), \(f(1)=1\).
3. **Máximo \(4\)** (em \(x=-2\)), **mínimo \(0\)** (em \(x=0\)).

**Exemplo 2 (derivada que não existe).** \(f(x)=x^{2/3}\) em \([-2,3]\).

1. \(f'(x)=\tfrac23x^{-1/3}=\dfrac{2}{3\sqrt[3]{x}}\) **não existe** em \(0\), que é crítico.
2. \(f(-2)=2^{2/3}\approx1{,}59\), \(f(0)=0\), \(f(3)=3^{2/3}\approx2{,}08\).
3. **Máximo \(3^{2/3}\)**, **mínimo \(0\)**.

## 3. Rolle e Valor Médio

**Teorema de Rolle.** Se \(f\) é contínua em \([a,b]\), derivável em \((a,b)\) e \(f(a)=f(b)\), existe \(c\in(a,b)\) com \(f'(c)=0\). (Entre dois pontos de mesma altura há uma tangente horizontal.)

**Teorema do Valor Médio (TVM).** Com as mesmas condições (sem exigir \(f(a)=f(b)\)), existe \(c\in(a,b)\) tal que

$$
f'(c)=\frac{f(b)-f(a)}{b-a}
$$

Em algum ponto, a tangente é paralela à secante. Consequência: \(f'>0\) num intervalo faz \(f\) crescente; \(f'<0\), decrescente.

## 4. Crescimento e concavidade

| Sinal | Significado |
| --- | --- |
| \(f'>0\) | \(f\) crescente |
| \(f'<0\) | \(f\) decrescente |
| \(f''>0\) | concavidade para cima (\(\cup\)) |
| \(f''<0\) | concavidade para baixo (\(\cap\)) |

**Teste da 1ª derivada** em um ponto crítico \(c\): \(f'\) muda de \(+\) para \(-\): **máximo local**; muda de \(-\) para \(+\): **mínimo local**; não muda de sinal: **não é extremo**.

**Teste da 2ª derivada** (com \(f'(c)=0\)): \(f''(c)>0\): **mínimo local**; \(f''(c)<0\): **máximo local**; \(f''(c)=0\): **inconclusivo** (use o teste da 1ª derivada). Memória visual: \(\cup\) segura água, o fundo é mínimo.

**Ponto de inflexão:** ponto onde o gráfico tem tangente e a concavidade **muda**. Lá, \(f''=0\) ou não existe (mas \(f''=0\) sozinho não basta: precisa trocar de sinal).

**Exemplo 3.** \(f(x)=x^3-3x^2+2\).

1. \(f'(x)=3x^2-6x\), \(f''(x)=6x-6=6(x-1)\).
2. \(f''<0\) para \(x<1\) (côncava para baixo) e \(f''>0\) para \(x>1\) (para cima).
3. Inflexão em \(x=1\): \(f(1)=1-3+2=0\), ponto \((1,0)\).

## 5. Receita: esboço de gráfico

1. **Domínio** e interceptos (\(x=0\); raízes, se fáceis).
2. **\(f'\):** pontos críticos e tabela de sinais (crescente/decrescente).
3. **\(f''\):** tabela de sinais (concavidade) e inflexões.
4. **Classifique** máximos e mínimos locais.
5. (Se houver) assíntotas e comportamento no infinito, via limites.
6. **Marque os pontos** importantes e ligue respeitando crescimento e concavidade.

**Exemplo 4 (completo).** Esboçar \(f(x)=x^4-4x^3+10\).

**Intercepto:** \(f(0)=10\).

**1ª derivada:** \(f'(x)=4x^3-12x^2=4x^2(x-3)\). Críticos: \(x=0\) e \(x=3\).

- Para \(x<3\) (com \(x\ne0\)): \(4x^2>0\) e \(x-3<0\), então \(f'<0\): decrescente.
- Para \(x>3\): \(f'>0\): crescente.
- Em \(x=0\), \(f'\) **não troca de sinal** (o fator \(x^2\) é sempre \(\ge0\)): **não é extremo**.
- Em \(x=3\), vai de \(-\) para \(+\): **mínimo local**, \(f(3)=81-108+10=-17\).

**2ª derivada:** \(f''(x)=12x^2-24x=12x(x-2)\). Zeros: \(x=0\) e \(x=2\).

| Intervalo | \(x<0\) | \(0<x<2\) | \(x>2\) |
| --- | --- | --- | --- |
| \(12x\) | \(-\) | \(+\) | \(+\) |
| \(x-2\) | \(-\) | \(-\) | \(+\) |
| \(f''\) | \(+\) | \(-\) | \(+\) |
| Concavidade | cima | baixo | cima |

**Inflexões:** \((0,10)\) e \((2,-6)\), pois \(f(2)=16-32+10=-6\). Confere com o teste da 2ª derivada: \(f''(3)=12\cdot3\cdot1=36>0\): mínimo. \(\checkmark\)

**Esboço em palavras:** o gráfico vem decrescendo, côncavo para cima; em \((0,10)\) achata (tangente horizontal) e vira côncavo para baixo; passa por \((2,-6)\) e vira côncavo para cima; atinge o fundo em \((3,-17)\) e sobe.

## 6. Exercícios

**Exercício 1.** Extremos absolutos de \(f(x)=x^3-3x\) em \([0,2]\).

{{< details title="Gabarito" >}}
1. \(f'=3x^2-3=0\Rightarrow x^2=1\Rightarrow x=\pm1\). Só \(x=1\) está no intervalo.
2. \(f(0)=0\), \(f(1)=1-3=-2\), \(f(2)=8-6=2\).
3. **Máximo \(2\)** em \(x=2\); **mínimo \(-2\)** em \(x=1\).
{{< /details >}}

**Exercício 2.** Classifique os pontos críticos de \(f(x)=x^3-6x^2+9x+1\).

{{< details title="Gabarito" >}}
1. \(f'=3x^2-12x+9=3(x^2-4x+3)=3(x-1)(x-3)\). Críticos: \(1\) e \(3\).
2. \(f''=6x-12\). \(f''(1)=-6<0\): **máximo local**, \(f(1)=1-6+9+1=5\). \(f''(3)=6>0\): **mínimo local**, \(f(3)=27-54+27+1=1\).
{{< /details >}}

**Exercício 3.** Onde \(f(x)=x^4-2x^2\) é crescente e qual a concavidade?

{{< details title="Gabarito" >}}
1. \(f'=4x^3-4x=4x(x-1)(x+1)\). Críticos: \(-1,0,1\).
2. Sinais de \(f'\): \(x<-1\): \(-\); \(-1<x<0\): \(+\); \(0<x<1\): \(-\); \(x>1\): \(+\). Crescente em \((-1,0)\) e \((1,\infty)\); decrescente em \((-\infty,-1)\) e \((0,1)\).
3. \(f''=12x^2-4=0\Rightarrow x=\pm\tfrac1{\sqrt3}\). Côncava para cima se \(\lvert x\rvert>\tfrac1{\sqrt3}\); para baixo se \(\lvert x\rvert<\tfrac1{\sqrt3}\).
{{< /details >}}

**Exercício 4.** Verifique o TVM para \(f(x)=x^2\) em \([0,2]\) e ache \(c\).

{{< details title="Gabarito" >}}
Inclinação da secante: \(\dfrac{4-0}{2-0}=2\). \(f'(c)=2c=2\Rightarrow c=1\in(0,2)\). \(\checkmark\)
{{< /details >}}
