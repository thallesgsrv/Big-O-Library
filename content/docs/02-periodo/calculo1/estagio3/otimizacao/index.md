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
4. Determine o **domínio** (ex.: comprimentos $>0$).
5. **Derive, iguale a zero** e ache os pontos críticos.
6. **Justifique** que é máximo/mínimo (teste da 2ª derivada ou valores nas bordas).
7. **Responda a pergunta** com unidades, não pare no $x$.

> [!WARNING]
> Muita gente acha o $x$ e esquece de calcular a outra dimensão ou o valor máximo. Releia a pergunta antes de escrever a resposta.

## 3. Exemplos

### Exemplo 1: caixa sem tampa

De uma folha $12\times12\,\text{cm}$ recortam-se quadrados de lado $x$ nos cantos e dobram-se as abas. Que $x$ maximiza o volume?

Base $(12-2x)\times(12-2x)$, altura $x$, com $0<x<6$:
$$
V(x)=x(12-2x)^2
$$
$$
V'(x)=(12-2x)^2+x\cdot2(12-2x)(-2)=(12-2x)(12-6x)
$$
Zeros: $x=6$ (volume zero, descartado) e $x=2$. $V(0)=V(6)=0$, então $x=2$ dá o máximo:
$$
V(2)=2\cdot8^2=128\ \text{cm}^3
$$

### Exemplo 2: retângulo sob a parábola

Maior área de um retângulo com base no eixo $x$ e vértices superiores em $y=4-x^2$.

Metade da base $x$, altura $4-x^2$:
$$
A(x)=2x(4-x^2)=8x-2x^3,\quad 0<x<2
$$
$A'=8-6x^2=0\Rightarrow x=\dfrac{2}{\sqrt3}$. Como $A''=-12x<0$, é máximo:
$$
A=2\cdot\frac2{\sqrt3}\left(4-\frac43\right)=\frac{32}{3\sqrt3}=\frac{32\sqrt3}{9}\approx6{,}16
$$

### Exemplo 3: dois números

Dois números com diferença $100$ e produto mínimo. Sejam $x$ e $x-100$:
$$
P(x)=x(x-100)=x^2-100x,\quad P'=2x-100=0\Rightarrow x=50
$$
$P''=2>0$: mínimo. Números: $50$ e $-50$, produto $-2500$.

### Exemplo 4: caixa de volume fixo

Caixa de base quadrada, sem tampa, volume $8\,\text{cm}^3$. Minimizar material.

Lado da base $x$, altura $h$: $x^2h=8\Rightarrow h=\dfrac8{x^2}$. Material (base + 4 lados):
$$
A(x)=x^2+4xh=x^2+\frac{32}{x},\quad x>0
$$
$$
A'=2x-\frac{32}{x^2}=0\ \Rightarrow\ x^3=16\ \Rightarrow\ x=2\sqrt[3]{2}\approx2{,}52
$$
$A''=2+\dfrac{64}{x^3}>0$: mínimo. Altura: $h=\dfrac{8}{x^2}=\sqrt[3]{2}\approx1{,}26$.

## Exercícios propostos

**Exercício 1.** Cerca-se um terreno retangular com $100\,\text{m}$ de tela. Que dimensões dão a maior área?

{{< details title="Gabarito" >}}
$2x+2y=100\Rightarrow y=50-x$. $A=x(50-x)$, $A'=50-2x=0\Rightarrow x=25$. Quadrado $25\times25$, área $625\,\text{m}^2$.
{{< /details >}}

**Exercício 2.** Dois números positivos somam $20$. Maximize o produto.

{{< details title="Gabarito" >}}
$P=x(20-x)$, $P'=20-2x=0\Rightarrow x=10$. Os dois valem $10$, produto $100$.
{{< /details >}}

**Exercício 3.** Cerca-se um campo retangular que margeia um rio (lado do rio sem cerca) com $200\,\text{m}$ de tela. Maximize a área.

{{< details title="Gabarito" >}}
$2x+y=200\Rightarrow y=200-2x$. $A=x(200-2x)$, $A'=200-4x=0\Rightarrow x=50$, $y=100$. Área máxima $5000\,\text{m}^2$.
{{< /details >}}

**Exercício 4.** Qual ponto da reta $y=2x+3$ está mais próximo da origem? *Dica: minimize o quadrado da distância.*

{{< details title="Gabarito" >}}
$D^2=x^2+(2x+3)^2=5x^2+12x+9$. $(D^2)'=10x+12=0\Rightarrow x=-\tfrac65$, $y=\tfrac35$. Ponto $\left(-\tfrac65,\tfrac35\right)$.
{{< /details >}}
