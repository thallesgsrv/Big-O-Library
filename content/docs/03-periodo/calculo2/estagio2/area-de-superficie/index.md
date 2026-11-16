---
title: Área de superfície de revolução
weight: 4
description: Girar uma curva gera uma superfície, some faixas de cone fininhas.
autores:
  - thallesgsrv
baseadoEm:
  - rodrigocohen
date: 2026-11-16
---

## 1. A ideia

Gire um pedaço \(\Delta s_i\) da curva em torno do eixo: ele vira uma **faixa** (um tronco de cone fininho). Desenrolada, é um retângulo de comprimento \(2\pi\cdot\text{raio}\) e largura \(\Delta s_i\).

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

## 2. Exemplos resolvidos (aula)

**Exemplo 1.** \(y=2\sqrt x,\ 1\le x\le2\), em torno do eixo \(x\).

- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(y=2\sqrt x\) (distância ao eixo)
- **Comprimento da faixa:** \(ds=\sqrt{1+\tfrac1x}\,dx\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(\int_1^22\pi\cdot2\sqrt x\sqrt{1+\tfrac1x}\,dx\)
- **Conta:** \(4\pi\int_1^2\sqrt{x+1}\,dx=4\pi\cdot\tfrac23\Big[(x+1)^{3/2}\Big]_1^2\)
- **Resposta:** \(\boxed{\tfrac{8\pi}3\big(3\sqrt3-2\sqrt2\big)}\)

**Exemplo 2.** \(x=1-y,\ 0\le y\le1\), em torno do eixo \(y\) (cone).

- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(g(y)=1-y\) (distância ao eixo)
- **Comprimento da faixa:** \(ds=\sqrt{1+1}\,dy=\sqrt2\,dy\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(\int_0^12\pi(1-y)\sqrt2\,dy\)
- **Conta:** \(2\sqrt2\pi\Big[y-\tfrac{y^2}2\Big]_0^1=2\sqrt2\pi\cdot\tfrac12\)
- **Resposta:** \(\boxed{\sqrt2\,\pi}\)

## 3. Lista de exercícios

### Questões 17 a 20: cones

Todas têm \(ds=\sqrt{1+\tfrac14}\,dx=\tfrac{\sqrt5}2dx\).

**17** \(y=\tfrac x2,\ 0\le x\le4\), eixo \(x\).

{{< details title="Resolução" >}}
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(\tfrac x2\) (distância ao eixo)
- **Comprimento da faixa:** \(\tfrac{\sqrt5}2dx\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(\int_0^42\pi\tfrac x2\cdot\tfrac{\sqrt5}2dx\)
- **Conta:** \(\tfrac{\sqrt5\pi}2\Big[\tfrac{x^2}2\Big]_0^4=\tfrac{\sqrt5\pi}2\cdot8\)
- **Resposta:** \(\boxed{4\sqrt5\,\pi}\)
{{< /details >}}

**18** \(y=\tfrac x2,\ 0\le x\le4\), eixo \(y\) (raio \(x\)).

{{< details title="Resolução" >}}
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(x\) (distância ao eixo)
- **Comprimento da faixa:** \(\tfrac{\sqrt5}2dx\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(\int_0^42\pi x\cdot\tfrac{\sqrt5}2dx\)
- **Conta:** \(\sqrt5\pi\Big[\tfrac{x^2}2\Big]_0^4\)
- **Resposta:** \(\boxed{8\sqrt5\,\pi}\)
{{< /details >}}

**19** \(y=\tfrac{x}2+\tfrac12,\ 1\le x\le3\), eixo \(x\).

{{< details title="Resolução" >}}
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(\tfrac{x+1}2\) (distância ao eixo)
- **Comprimento da faixa:** \(\tfrac{\sqrt5}2dx\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(\int_1^32\pi\tfrac{x+1}2\cdot\tfrac{\sqrt5}2dx\)
- **Conta:** \(\tfrac{\sqrt5\pi}2\Big[\tfrac{(x+1)^2}2\Big]_1^3=\tfrac{\sqrt5\pi}2\cdot6\)
- **Resposta:** \(\boxed{3\sqrt5\,\pi}\)
{{< /details >}}

**20** \(y=\tfrac x2+\tfrac12,\ 1\le x\le3\), eixo \(y\).

{{< details title="Resolução" >}}
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(x\) (distância ao eixo)
- **Comprimento da faixa:** \(\tfrac{\sqrt5}2dx\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(\int_1^32\pi x\tfrac{\sqrt5}2dx\)
- **Conta:** \(\sqrt5\pi\Big[\tfrac{x^2}2\Big]_1^3=\sqrt5\pi\cdot4\)
- **Resposta:** \(\boxed{4\sqrt5\,\pi}\)
{{< /details >}}

### Questão 21

**21(a)** \(y=\tfrac{x^3}9,\ 0\le x\le2\), eixo \(x\).

{{< details title="Resolução" >}}
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(\tfrac{x^3}9\) (distância ao eixo)
- **Comprimento da faixa:** \(\sqrt{1+\tfrac{x^4}9}\,dx\ \ (y'=\tfrac{x^2}3)\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(2\pi\int_0^2\tfrac{x^3}9\sqrt{1+\tfrac{x^4}9}\,dx\)
- **Conta:** \(u=1+\tfrac{x^4}9,\ du=\tfrac{4x^3}9dx:\ \ \tfrac\pi2\cdot\tfrac23\Big[u^{3/2}\Big]_1^{25/9}=\tfrac\pi3\Big(\tfrac{125}{27}-1\Big)\)
- **Resposta:** \(\boxed{\tfrac{98\pi}{81}}\)
{{< /details >}}

**21(b)** \(x=\tfrac{y^3}3,\ 0\le y\le1\), eixo \(y\).

{{< details title="Resolução" >}}
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(\tfrac{y^3}3\) (distância ao eixo)
- **Comprimento da faixa:** \(\sqrt{1+y^4}\,dy\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(2\pi\int_0^1\tfrac{y^3}3\sqrt{1+y^4}\,dy\)
- **Conta:** \(u=1+y^4:\ \ \tfrac{2\pi}3\cdot\tfrac14\cdot\tfrac23\Big[u^{3/2}\Big]_1^2=\tfrac\pi9(2\sqrt2-1)\)
- **Resposta:** \(\boxed{\tfrac\pi9\big(2\sqrt2-1\big)}\)
{{< /details >}}

**21(c)** \(x=2\sqrt{4-y},\ 0\le y\le\tfrac{15}4\), eixo \(y\).

{{< details title="Resolução" >}}
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(2\sqrt{4-y}\) (distância ao eixo)
- **Comprimento da faixa:** \(\sqrt{\tfrac{5-y}{4-y}}\,dy\ \ (x'=\tfrac{-1}{\sqrt{4-y}})\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(2\pi\int_0^{15/4}2\sqrt{4-y}\cdot\tfrac{\sqrt{5-y}}{\sqrt{4-y}}dy=4\pi\int_0^{15/4}\sqrt{5-y}\,dy\)
- **Conta:** \(\tfrac{8\pi}3\Big[5^{3/2}-\big(\tfrac54\big)^{3/2}\Big]=\tfrac{8\pi}3\cdot\tfrac{35\sqrt5}8\)
- **Resposta:** \(\boxed{\tfrac{35\sqrt5}3\pi}\)
{{< /details >}}

**21(d)** \(x=\cos t,\ y=2+\operatorname{sen}t,\ 0\le t\le2\pi\), eixo \(x\) (circunferência de raio 1).

{{< details title="Resolução" >}}
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(2+\operatorname{sen}t\) (distância ao eixo)
- **Comprimento da faixa:** \(ds=\sqrt{\operatorname{sen}^2t+\cos^2t}\,dt=dt\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(2\pi\int_0^{2\pi}(2+\operatorname{sen}t)\,dt\)
- **Conta:** \(2\pi\big[2t-\cos t\big]_0^{2\pi}=2\pi\cdot4\pi\)
- **Resposta:** \(\boxed{8\pi^2}\)
{{< /details >}}

**21(e)** \(x=t+\sqrt2,\ y=\tfrac{t^2}2+\sqrt2t,\ -\sqrt2\le t\le\sqrt2\), eixo \(y\).

{{< details title="Resolução" >}}
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(x=t+\sqrt2\) (distância ao eixo)
- **Comprimento da faixa:** \(ds=\sqrt{1+(t+\sqrt2)^2}\,dt\ \ (x'=1,\ y'=t+\sqrt2)\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(2\pi\int_{-\sqrt2}^{\sqrt2}(t+\sqrt2)\sqrt{1+(t+\sqrt2)^2}\,dt\)
- **Conta:** \(u=t+\sqrt2\in[0,2\sqrt2]:\ \ 2\pi\Big[\tfrac{(1+u^2)^{3/2}}3\Big]_0^{2\sqrt2}=\tfrac{2\pi}3(27-1)\)
- **Resposta:** \(\boxed{\tfrac{52\pi}3}\)
{{< /details >}}

**21(f)** \(x=e^t-t,\ y=4e^{t/2},\ 0\le t\le1\), eixo \(x\).

{{< details title="Resolução" >}}
- **Faixa:** pedaço \(\Delta s_i\) da curva gira e vira um tronco de cone fininho
- **Raio da faixa:** \(4e^{t/2}\) (distância ao eixo)
- **Comprimento da faixa:** \(ds=(e^t+1)\,dt\ \ (\text{como em 15(f)})\)
- **Área da faixa:** \(2\pi\,(\text{raio})\,\Delta s_i\)
- **Área da superfície:** \(2\pi\int_0^14e^{t/2}(e^t+1)\,dt\)
- **Conta:** \(8\pi\Big[\tfrac23e^{3t/2}+2e^{t/2}\Big]_0^1=8\pi\Big(\tfrac23e^{3/2}+2e^{1/2}-\tfrac83\Big)\)
- **Resposta:** \(\boxed{\tfrac{16\pi}3\big(e^{3/2}+3e^{1/2}-4\big)}\)
{{< /details >}}

