---
title: Área de superfície de revolução
weight: 6
description: Girar uma curva gera uma superfície, some faixas de cone fininhas.
autores:
  - thallesgsrv
date: 2026-11-16
---

## 1. A ideia

Gire um pedaço \(\Delta s_i\) da curva em torno do eixo: ele vira uma **faixa** (um tronco de cone fininho). Desenrolada, é um retângulo de comprimento \(2\pi\cdot\text{raio}\) e largura \(\Delta s_i\).

Ao final você deve conseguir:

- explicar como a área de uma superfície de revolução vira uma soma de faixas de tronco de cone;
- montar a integral de área de superfície;
- calcular áreas de superfícies de revolução, inclusive as de cones.

> [!NOTE]
> **Antes de começar, ajuda ter à mão:**
>
> - a página de [Comprimento de arco](../comprimento-de-arco/);
> - área lateral de cilindros e cones.

> [!IMPORTANT]
> **Receita:** (1) faixa \(\Delta s_i\) (do capítulo de arco); (2) **raio da faixa** = distância ao eixo; (3) **área da faixa** \(=2\pi\cdot\text{raio}\cdot\Delta s_i\); (4) \(\sum\); (5) \(\lim=\int\); (6) conta.

$$
A=\int 2\pi\,(\text{raio})\,ds
$$

- **Eixo \(x\):** raio \(=f(x)\), \(ds=\sqrt{1+[f'(x)]^2}\,dx\).
- **Eixo \(y\):** raio \(=g(y)\), \(ds=\sqrt{1+[g'(y)]^2}\,dy\). Se a curva vem como \(y=f(x)\) e gira em torno de \(y\), o raio é \(x\).
- **Paramétrica:** \(ds=\sqrt{x'^2+y'^2}\,dt\) e o raio é \(y\) (eixo \(x\)) ou \(x\) (eixo \(y\)).

> [!TIP]
> Em **retas**, o resultado confere com a geometria: área lateral do cone \(=\pi r\ell\). Use para checar 17 a 20.

## 2. Exemplos resolvidos

**Exemplo 1.** \(y=2\sqrt x,\ 1\le x\le2\), em torno do eixo \(x\).

- **Como pensar:** Eixo \(x\): raio da faixa = altura da curva, \(2\sqrt x\). \(y'=\tfrac1{\sqrt x}\), então \(ds=\sqrt{1+\tfrac1x}\,dx\). Combine \(\sqrt x\cdot\sqrt{1+\tfrac1x}=\sqrt{x+1}\): a raiz fica simples.
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(y=2\sqrt x\) (distância ao eixo)
- **Comprimento da faixa:** \(ds=\sqrt{1+\tfrac1x}\,dx\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(\int_1^22\pi\cdot2\sqrt x\sqrt{1+\tfrac1x}\,dx\)
- **Conta:** \(4\pi\int_1^2\sqrt{x+1}\,dx=4\pi\cdot\tfrac23\Big[(x+1)^{3/2}\Big]_1^2\)
- **Resposta:** \(\boxed{\tfrac{8\pi}3\big(3\sqrt3-2\sqrt2\big)}\)

**Exemplo 2.** \(x=1-y,\ 0\le y\le1\), em torno do eixo \(y\) (cone).

- **Como pensar:** Eixo \(y\) e \(x=g(y)\): raio da faixa = \(x=1-y\). \(g'=-1\), \(ds=\sqrt2\,dy\). Confere com a geometria: cone de raio e altura \(1\), geratriz \(\sqrt2\), área \(\pi r\ell=\sqrt2\pi\).
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(g(y)=1-y\) (distância ao eixo)
- **Comprimento da faixa:** \(ds=\sqrt{1+1}\,dy=\sqrt2\,dy\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(\int_0^12\pi(1-y)\sqrt2\,dy\)
- **Conta:** \(2\sqrt2\pi\Big[y-\tfrac{y^2}2\Big]_0^1=2\sqrt2\pi\cdot\tfrac12\)
- **Resposta:** \(\boxed{\sqrt2\,\pi}\)

## 3. Lista de exercícios

Bora praticar! Resolva no papel antes de abrir o gabarito: tentar primeiro fixa mais do que ler a solução pronta. Se travar, volte à receita e tente de novo antes de espiar.


### Questões 17 a 20: cones

Todas têm \(ds=\sqrt{1+\tfrac14}\,dx=\tfrac{\sqrt5}2dx\).

**17** \(y=\tfrac x2,\ 0\le x\le4\), eixo \(x\).

{{< details title="Resolução" >}}
- **Como pensar:** Reta \(y=\tfrac x2\): \(y'=\tfrac12\), \(ds=\sqrt{1+\tfrac14}=\tfrac{\sqrt5}2\) (constante). Raio da faixa: a altura, \(\tfrac x2\). Confira: \(\pi r\ell=\pi\cdot2\cdot2\sqrt5\).
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(\tfrac x2\) (distância ao eixo)
- **Comprimento da faixa:** \(\tfrac{\sqrt5}2dx\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(\int_0^42\pi\tfrac x2\cdot\tfrac{\sqrt5}2dx\)
- **Conta:** \(\tfrac{\sqrt5\pi}2\Big[\tfrac{x^2}2\Big]_0^4=\tfrac{\sqrt5\pi}2\cdot8\)
- **Resposta:** \(\boxed{4\sqrt5\,\pi}\)
{{< /details >}}

### Questão 21

**21(a)** \(y=\tfrac{x^3}9,\ 0\le x\le2\), eixo \(x\).

{{< details title="Resolução" >}}
- **Como pensar:** \(y'=\tfrac{x^2}3\), \(y'^2=\tfrac{x^4}9\). Raio \(\tfrac{x^3}9\). O \(x^3\) sobrando é a derivada de \(1+\tfrac{x^4}9\) (a menos de \(\tfrac49\)): \(u=1+\tfrac{x^4}9\); limites \(u(0)=1\), \(u(2)=\tfrac{25}9\).
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(\tfrac{x^3}9\) (distância ao eixo)
- **Comprimento da faixa:** \(\sqrt{1+\tfrac{x^4}9}\,dx\ \ (y'=\tfrac{x^2}3)\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(2\pi\int_0^2\tfrac{x^3}9\sqrt{1+\tfrac{x^4}9}\,dx\)
- **Conta:** \(u=1+\tfrac{x^4}9,\ du=\tfrac{4x^3}9dx:\ \ \tfrac\pi2\cdot\tfrac23\Big[u^{3/2}\Big]_1^{25/9}=\tfrac\pi3\Big(\tfrac{125}{27}-1\Big)\)
- **Resposta:** \(\boxed{\tfrac{98\pi}{81}}\)
{{< /details >}}
