---
title: Problemas de Otimização
weight: 3
description: Como transformar um problema de "maior" ou "menor" em derivada, passo a passo.
autores:
  - thallesgsrv
date: 2026-10-14
---

## 1. A ideia

Otimizar é achar o **maior** ou **menor** valor de algo (área, volume, custo, material) sujeito a uma restrição. Tudo se resume a: **escrever a grandeza como função de uma variável só** e achar o extremo dela.

## 2. Receita

1. **Desenhe** e nomeie as variáveis.
2. Escreva a **função objetivo** (o que quer maximizar/minimizar).
3. Escreva a **restrição** e use-a para **eliminar variáveis**, ficando com uma só.
4. Determine o **domínio** (ex.: comprimentos \(>0\)).
5. **Derive, iguale a zero** e ache os pontos críticos.
6. **Justifique** que é máximo/mínimo (teste da 2ª derivada ou valores nas bordas).
7. **Responda a pergunta** com unidades, não pare no \(x\).

> [!WARNING]
> Muita gente acha o \(x\) e esquece de calcular a outra dimensão ou o valor máximo. Releia a pergunta antes de escrever a resposta.

## 3. Exemplos

**Exemplo 1 (caixa sem tampa).** De uma folha \(12\times12\) cm recortam-se quadrados de lado \(x\) nos cantos e dobram-se as abas. Que \(x\) maximiza o volume?

1. A base fica \((12-2x)\times(12-2x)\) e a altura é \(x\), com \(0<x<6\):

$$
V(x)=x(12-2x)^2
$$

2. Derive (produto e cadeia): \(V'(x)=(12-2x)^2+x\cdot2(12-2x)(-2)\).
3. Coloque \((12-2x)\) em evidência:

$$
V'(x)=(12-2x)\big[(12-2x)-4x\big]=(12-2x)(12-6x)
$$

4. Zeros: \(x=6\) (volume zero, descartado) e \(x=2\). Como \(V(0)=V(6)=0\), \(x=2\) dá o máximo:

$$
V(2)=2\cdot(12-4)^2=2\cdot64=\boxed{128\ \text{cm}^3}
$$

**Exemplo 2 (retângulo sob a parábola).** Maior área de um retângulo com base no eixo \(x\) e vértices superiores em \(y=4-x^2\).

1. Com metade da base \(x\) e altura \(4-x^2\):

$$
A(x)=2x(4-x^2)=8x-2x^3,\qquad0<x<2
$$

2. \(A'=8-6x^2=0\Rightarrow x^2=\tfrac43\Rightarrow x=\dfrac2{\sqrt3}\).
3. \(A''=-12x<0\): é máximo.
4. Valor: \(4-x^2=4-\tfrac43=\tfrac83\), então

$$
A=2\cdot\frac{2}{\sqrt3}\cdot\frac83=\frac{32}{3\sqrt3}=\frac{32\sqrt3}{9}\approx6{,}16
$$

**Exemplo 3 (dois números).** Dois números com diferença \(100\) e produto mínimo. Sejam \(x\) e \(x-100\):

1. \(P(x)=x(x-100)=x^2-100x\).
2. \(P'=2x-100=0\Rightarrow x=50\). \(P''=2>0\): mínimo.
3. Números: \(\boxed{50\text{ e }-50}\), produto \(-2500\).

**Exemplo 4 (caixa de volume fixo).** Caixa de base quadrada, sem tampa, volume \(8\) cm³. Minimizar o material.

1. Lado da base \(x\), altura \(h\): \(x^2h=8\), logo \(h=\dfrac8{x^2}\).
2. Material (base + 4 lados): \(A=x^2+4xh=x^2+4x\cdot\dfrac8{x^2}=x^2+\dfrac{32}x\), \(x>0\).
3. \(A'=2x-\dfrac{32}{x^2}=0\Rightarrow2x^3=32\Rightarrow x^3=16\Rightarrow x=\sqrt[3]{16}=2\sqrt[3]2\approx2{,}52\).
4. \(A''=2+\dfrac{64}{x^3}>0\): mínimo.
5. A altura pedida: \(h=\dfrac{8}{x^2}=\dfrac{8}{4\sqrt[3]{4}}=\dfrac{2}{\sqrt[3]4}=\sqrt[3]2\approx1{,}26\).

## 4. Exercícios

**Exercício 1.** Cerca-se um terreno retangular com \(100\) m de tela. Que dimensões dão a maior área?

{{< details title="Gabarito" >}}
1. \(2x+2y=100\Rightarrow y=50-x\).
2. \(A=x(50-x)=50x-x^2\); \(A'=50-2x=0\Rightarrow x=25\), \(y=25\).
3. \(A''=-2<0\): máximo. É um quadrado \(25\times25\), área \(\boxed{625\text{ m}^2}\).
{{< /details >}}

**Exercício 2.** Dois números positivos somam \(20\). Maximize o produto.

{{< details title="Gabarito" >}}
\(P=x(20-x)\), \(P'=20-2x=0\Rightarrow x=10\). Os dois valem \(10\), produto \(\boxed{100}\).
{{< /details >}}

**Exercício 3.** Cerca-se um campo retangular que margeia um rio (lado do rio sem cerca) com \(200\) m de tela. Maximize a área.

{{< details title="Gabarito" >}}
1. Dois lados \(x\) e um lado \(y\): \(2x+y=200\Rightarrow y=200-2x\).
2. \(A=x(200-2x)\), \(A'=200-4x=0\Rightarrow x=50\), \(y=100\).
3. \(A''=-4<0\): máximo. Área \(50\cdot100=\boxed{5000\text{ m}^2}\).
{{< /details >}}

**Exercício 4.** Qual ponto da reta \(y=2x+3\) está mais próximo da origem?

{{< details title="Gabarito" >}}
Minimize o **quadrado** da distância (a raiz só atrapalha e não muda onde está o mínimo).

1. \(D^2=x^2+(2x+3)^2=x^2+4x^2+12x+9=5x^2+12x+9\).
2. \((D^2)'=10x+12=0\Rightarrow x=-\tfrac65\). Então \(y=2\cdot\left(-\tfrac65\right)+3=-\tfrac{12}5+\tfrac{15}5=\tfrac35\).
3. Segunda derivada \(10>0\): mínimo. Ponto \(\boxed{\left(-\tfrac65,\tfrac35\right)}\).
{{< /details >}}
