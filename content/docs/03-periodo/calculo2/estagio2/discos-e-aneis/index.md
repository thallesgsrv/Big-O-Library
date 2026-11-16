---
title: Volume por discos e anéis
weight: 3
description: Fatiar, aproximar e somar, volume de sólidos de revolução com discos e anéis.
autores:
  - thallesgsrv
date: 2026-11-16
---

## 1. A ideia: fatiar, aproximar, somar

Como medir o volume de um sólido que não é caixa nem cilindro? Fatie em pedaços finos, trate cada pedaço como algo que você sabe medir, some e faça as fatias ficarem infinitamente finas. É a mesma ideia da [soma de Riemann](../rieman/) (e da [área entre curvas](../area-entre-curvas/)), só que agora cada retângulo vira uma **fatia 3D**.

> [!IMPORTANT]
> **Receita do professor (use em toda questão, sempre nesta ordem):**
> 1. **Esboço:** desenhe a região e o eixo de rotação.
> 2. **Espessura** da fatia: \(\Delta x_i\) ou \(\Delta y_i\).
> 3. **Raio** (ou **base** e **altura**) da fatia.
> 4. **Volume da fatia** = área da face \(\times\) espessura.
> 5. **Aproximação do sólido:** \(\sum\) dos volumes das fatias.
> 6. **Volume do sólido:** \(\lim_{n\to\infty}\sum\) = integral. Depois, a conta.

### Aquecimento: fatias que não são discos

Sólido com base no triângulo sob \(y=1-x\), \(0\le x\le1\), cujas fatias perpendiculares ao eixo \(x\) são triângulos retângulos isósceles, com cateto na região.

- **Espessura:** \(\Delta x_i\)
- **Base:** \(1-x_i^*\)  **Altura:** \(1-x_i^*\)
- **Volume da fatia:** área do triângulo \(\times\) espessura \(=\dfrac{(1-x_i^*)^2}{2}\Delta x_i\)
- **Aproximação:** \(\displaystyle\sum_{i=1}^{n}\frac12(1-x_i^*)^2\Delta x_i\)
- **Volume do sólido:** \(\displaystyle\int_0^1\frac12(1-x)^2dx=\Big[-\frac{(1-x)^3}{6}\Big]_0^1=\boxed{\frac16}\)

## 2. Método dos discos

Gire a região entre o eixo e a curva. Cada retângulo da soma de Riemann vira um **disco**: o **raio é a altura do retângulo** e a espessura é a largura.

- **Em torno do eixo \(x\):** \(y=f(x)\), espessura \(\Delta x_i\), raio \(f(x_i^*)\).
- **Em torno do eixo \(y\):** \(x=g(y)\), espessura \(\Delta y_i\), raio \(g(y_i^*)\).

$$
V=\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(f(x_i^*)\big)^2\Delta x_i=\int_a^b\pi\,\big(f(x)\big)^2dx
$$

> [!TIP]
> **Regra de ouro:** a variável de integração é a da **espessura**. Eixo \(x\) tem fatias em pé, \(dx\). Eixo \(y\) tem fatias deitadas, \(dy\). Escreva a curva já como função dessa variável.

## 3. Método dos anéis (arruelas)

Se a região **não encosta** no eixo, sobra um buraco no meio. Cada fatia é uma arruela:

- **Raio externo \(R\):** curva mais **longe** do eixo. **Raio interno \(r\):** a mais **perto**.
- **Volume da fatia:** \(\pi\big(R^2-r^2\big)\Delta x_i\). **Não** é \(\pi(R-r)^2\).

$$
V=\int_a^b\pi\big[R(x)^2-r(x)^2\big]dx
$$

**Eixo deslocado** (reta \(y=k\) ou \(x=k\)): o raio é sempre uma **distância**, isto é, \(|\text{curva}-k|\). Para girar em torno de \(y=1\) uma curva \(y=\sqrt x\) acima da reta, o raio é \(\sqrt x-1\).

## 4. Exemplos resolvidos (aula)

**Exemplo 1.** \(y=\sqrt x,\ 0\le x\le4\), em torno do eixo \(x\).

- **Método:** disco, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(\sqrt{{x_i^*}}\)
- **Volume da fatia:** \(\pi\big(\sqrt{{x_i^*}}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt{{x_i^*}}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\sqrt{{x_i^*}}\big)^2\,\Delta x_i=\pi\int_{0}^{4}\big(\sqrt{x}\big)^2\,dx\)
- **Conta:** \(\pi\int_0^4x\,dx=\pi\Big[\tfrac{x^2}2\Big]_0^4\)
- **Resposta:** \(\boxed{8\pi}\)

**Exemplo 2 (esfera).** Círculo \(x^2+y^2=a^2\) em torno do eixo \(x\): \(y=\sqrt{a^2-x^2}\), \(-a\le x\le a\).

- **Método:** disco, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(\sqrt{a^2-{x_i^*}^2}\)
- **Volume da fatia:** \(\pi\big(\sqrt{a^2-{x_i^*}^2}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt{a^2-{x_i^*}^2}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\sqrt{a^2-{x_i^*}^2}\big)^2\,\Delta x_i=\pi\int_{-a}^{a}\big(\sqrt{a^2-x^2}\big)^2\,dx\)
- **Conta:** \(\pi\int_{-a}^{a}(a^2-x^2)dx=\pi\Big[a^2x-\tfrac{x^3}3\Big]_{-a}^{a}=\pi\Big(2a^3-\tfrac{2a^3}3\Big)\)
- **Resposta:** \(\boxed{\tfrac43\pi a^3}\)

**Exemplo 3.** Primeiro quadrante entre \(y=x^2\), \(y=-x+2\) e o eixo \(x\), em torno do eixo \(x\). As curvas se cruzam em \(x=1\) (\(x^2=2-x\)): a região tem **duas partes**, uma por regra.

- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(x_i^{*2}\) se \(0\le x\le1\); \(2-x_i^*\) se \(1\le x\le2\)
- **Volume da fatia:** \(\pi\,x_i^{*4}\,\Delta x_i\) ou \(\pi(2-x_i^*)^2\Delta x_i\)
- **Aproximação do sólido:** \(\sum\pi\,x_i^{*4}\Delta x_i+\sum\pi(2-x_i^*)^2\Delta x_i\)
- **Volume do sólido:** \(\pi\int_0^1x^4dx+\pi\int_1^2(2-x)^2dx=\pi\Big(\tfrac15+\tfrac13\Big)=\boxed{\tfrac{8\pi}{15}}\)

**Exemplo 4 (o da lousa).** Região entre o eixo \(y\) e \(x=\dfrac2y\), \(1\le y\le4\), em torno do eixo \(y\).

- **Método:** disco, girando em torno do eixo \(y\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(\tfrac{2}{{y_i^*}}\)
- **Volume da fatia:** \(\pi\big(\tfrac{2}{{y_i^*}}\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\tfrac{2}{{y_i^*}}\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\tfrac{2}{{y_i^*}}\big)^2\,\Delta y_i=\pi\int_{1}^{4}\big(\tfrac{2}{y}\big)^2\,dy\)
- **Conta:** \(4\pi\int_1^4y^{-2}dy=4\pi\Big[-\tfrac1y\Big]_1^4=4\pi\Big(-\tfrac14+1\Big)\)
- **Resposta:** \(\boxed{3\pi}\)

**Exemplo 5.** Região entre \(y=\sqrt x\), \(y=1\) e \(x=4\), em torno de \(y=1\) (\(1\le x\le4\)).

- **Método:** disco, girando em torno da a reta \(y=1\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(\sqrt{{x_i^*}}-1\)
- **Volume da fatia:** \(\pi\big(\sqrt{{x_i^*}}-1\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt{{x_i^*}}-1\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\sqrt{{x_i^*}}-1\big)^2\,\Delta x_i=\pi\int_{1}^{4}\big(\sqrt{x}-1\big)^2\,dx\)
- **Conta:** \(\pi\int_1^4(x-2\sqrt x+1)dx=\pi\Big[\tfrac{x^2}2-\tfrac{4x^{3/2}}3+x\Big]_1^4=\pi\Big(\tfrac{15}2-\tfrac{28}3+3\Big)\)
- **Resposta:** \(\boxed{\tfrac{7\pi}{6}}\)

**Exemplo 6.** Região entre \(x=y^2+1\) e \(x=3\), em torno de \(x=3\) (\(-\sqrt2\le y\le\sqrt2\)).

- **Método:** disco, girando em torno da a reta \(x=3\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(2-{y_i^*}^2\)
- **Volume da fatia:** \(\pi\big(2-{y_i^*}^2\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(2-{y_i^*}^2\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(2-{y_i^*}^2\big)^2\,\Delta y_i=\pi\int_{-\sqrt2}^{\sqrt2}\big(2-y^2\big)^2\,dy\)
- **Conta:** \(\pi\int_{-\sqrt2}^{\sqrt2}(2-y^2)^2dy=2\pi\Big[4y-\tfrac{4y^3}3+\tfrac{y^5}5\Big]_0^{\sqrt2}=2\pi\sqrt2\Big(4-\tfrac83+\tfrac45\Big)\)
- **Resposta:** \(\boxed{\tfrac{64\sqrt2\,\pi}{15}}\)

## 5. Teste rápido

{{< quiz titulo="Disco ou anel?" >}}

{{< questao >}}
A região entre \(y=x\) e \(y=1\) (com \(0\le x\le1\)) gira em torno do eixo \(x\). Qual é o volume da fatia?

- [ ] \(\pi(1-x_i^*)^2\Delta x_i\)
- [x] \(\pi\big(1-(x_i^*)^2\big)\Delta x_i\)
- [ ] \(\pi\,x_i^*{}^2\Delta x_i\)
---
A região não encosta no eixo \(x\): é um anel com \(R=1\) e \(r=x\). Daí \(\pi(R^2-r^2)\Delta x\). O erro clássico é \(\pi(R-r)^2\).
{{< /questao >}}

{{< /quiz >}}

## 6. Lista de exercícios

Resolva primeiro, abra depois. Os números seguem a **1ª lista** (Aplicações da Integral Definida).

### Questão 1: eixo \(x\)

**1(a)** Região sob \(x+2y=2\), \(0\le x\le2\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(1-\tfrac{{x_i^*}}{2}\)
- **Volume da fatia:** \(\pi\big(1-\tfrac{{x_i^*}}{2}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(1-\tfrac{{x_i^*}}{2}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(1-\tfrac{{x_i^*}}{2}\big)^2\,\Delta x_i=\pi\int_{0}^{2}\big(1-\tfrac{x}{2}\big)^2\,dx\)
- **Conta:** \(\pi\int_0^2\Big(1-x+\tfrac{x^2}4\Big)dx=\pi\Big[x-\tfrac{x^2}2+\tfrac{x^3}{12}\Big]_0^2\)
- **Resposta:** \(\boxed{\tfrac{2\pi}3}\)
{{< /details >}}

**1(b)** Região sob \(y=\operatorname{sen}x\cos x\), \(0\le x\le\pi/2\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(\operatorname{sen}{x_i^*}\cos{x_i^*}\)
- **Volume da fatia:** \(\pi\big(\operatorname{sen}{x_i^*}\cos{x_i^*}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\operatorname{sen}{x_i^*}\cos{x_i^*}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\operatorname{sen}{x_i^*}\cos{x_i^*}\big)^2\,\Delta x_i=\pi\int_{0}^{\pi/2}\big(\operatorname{sen}x\cos x\big)^2\,dx\)
- **Conta:** \(\pi\int_0^{\pi/2}\tfrac{\operatorname{sen}^22x}{4}dx=\tfrac\pi8\int_0^{\pi/2}(1-\cos4x)dx=\tfrac\pi8\cdot\tfrac\pi2\)
- **Resposta:** \(\boxed{\tfrac{\pi^2}{16}}\)
{{< /details >}}

### Questão 2: eixo \(y\)

**2(a)** Região entre o eixo \(y\) e \(x=\tfrac{3y}2\), \(0\le y\le2\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(y\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(\tfrac{3{y_i^*}}{2}\)
- **Volume da fatia:** \(\pi\big(\tfrac{3{y_i^*}}{2}\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\tfrac{3{y_i^*}}{2}\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\tfrac{3{y_i^*}}{2}\big)^2\,\Delta y_i=\pi\int_{0}^{2}\big(\tfrac{3y}{2}\big)^2\,dy\)
- **Conta:** \(\pi\int_0^2\tfrac{9y^2}4dy=\tfrac{9\pi}4\cdot\tfrac83\)
- **Resposta:** \(\boxed{6\pi}\)
{{< /details >}}

**2(b)** Região entre o eixo \(y\) e \(x=\operatorname{tg}\big(\tfrac\pi4y\big)\), \(0\le y\le1\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(y\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(\operatorname{tg}\big(\tfrac\pi4{y_i^*}\big)\)
- **Volume da fatia:** \(\pi\big(\operatorname{tg}\big(\tfrac\pi4{y_i^*}\big)\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\operatorname{tg}\big(\tfrac\pi4{y_i^*}\big)\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\operatorname{tg}\big(\tfrac\pi4{y_i^*}\big)\big)^2\,\Delta y_i=\pi\int_{0}^{1}\big(\operatorname{tg}\big(\tfrac\pi4y\big)\big)^2\,dy\)
- **Conta:** \(\pi\int_0^1\big(\sec^2\tfrac{\pi y}4-1\big)dy=\pi\Big[\tfrac4\pi\operatorname{tg}\tfrac{\pi y}4-y\Big]_0^1=\pi\Big(\tfrac4\pi-1\Big)\)
- **Resposta:** \(\boxed{4-\pi}\)
{{< /details >}}

### Questão 3: eixo \(x\), região entre a curva e \(y=0\)

**3(a)** \(y=x^2,\ y=0,\ x=2\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \({x_i^*}^2\)
- **Volume da fatia:** \(\pi\big({x_i^*}^2\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big({x_i^*}^2\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big({x_i^*}^2\big)^2\,\Delta x_i=\pi\int_{0}^{2}\big(x^2\big)^2\,dx\)
- **Conta:** \(\pi\int_0^2x^4dx=\pi\tfrac{32}5\)
- **Resposta:** \(\boxed{\tfrac{32\pi}5}\)
{{< /details >}}

**3(b)** \(y=\sqrt{9-x^2},\ y=0\) (de \(-3\) a \(3\)).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(\sqrt{9-{x_i^*}^2}\)
- **Volume da fatia:** \(\pi\big(\sqrt{9-{x_i^*}^2}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt{9-{x_i^*}^2}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\sqrt{9-{x_i^*}^2}\big)^2\,\Delta x_i=\pi\int_{-3}^{3}\big(\sqrt{9-x^2}\big)^2\,dx\)
- **Conta:** \(\pi\int_{-3}^3(9-x^2)dx=\pi(54-18)\)
- **Resposta:** \(\boxed{36\pi}\)
{{< /details >}}

**3(c)** \(y=x-x^2,\ y=0\) (de \(0\) a \(1\)).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \({x_i^*}-{x_i^*}^2\)
- **Volume da fatia:** \(\pi\big({x_i^*}-{x_i^*}^2\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big({x_i^*}-{x_i^*}^2\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big({x_i^*}-{x_i^*}^2\big)^2\,\Delta x_i=\pi\int_{0}^{1}\big(x-x^2\big)^2\,dx\)
- **Conta:** \(\pi\int_0^1(x^2-2x^3+x^4)dx=\pi\Big(\tfrac13-\tfrac12+\tfrac15\Big)\)
- **Resposta:** \(\boxed{\dfrac{\pi}{30}}\)
{{< /details >}}

**3(d)** \(y=\sqrt{\cos x},\ 0\le x\le\pi/2,\ y=0\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(\sqrt{\cos {x_i^*}}\)
- **Volume da fatia:** \(\pi\big(\sqrt{\cos {x_i^*}}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt{\cos {x_i^*}}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\sqrt{\cos {x_i^*}}\big)^2\,\Delta x_i=\pi\int_{0}^{\pi/2}\big(\sqrt{\cos x}\big)^2\,dx\)
- **Conta:** \(\pi\int_0^{\pi/2}\cos x\,dx=\pi[\operatorname{sen}x]_0^{\pi/2}\)
- **Resposta:** \(\boxed{\pi}\)
{{< /details >}}

**3(e)** \(y=e^{-x},\ y=0,\ x=0,\ x=1\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(e^{-{x_i^*}}\)
- **Volume da fatia:** \(\pi\big(e^{-{x_i^*}}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(e^{-{x_i^*}}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(e^{-{x_i^*}}\big)^2\,\Delta x_i=\pi\int_{0}^{1}\big(e^{-x}\big)^2\,dx\)
- **Conta:** \(\pi\int_0^1e^{-2x}dx=\pi\Big[-\tfrac{e^{-2x}}2\Big]_0^1\)
- **Resposta:** \(\boxed{\tfrac\pi2(1-e^{-2})}\)
{{< /details >}}

**3(f)** \(y=\dfrac1{2\sqrt x},\ y=0,\ x=\tfrac14,\ x=4\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(\tfrac{1}{2\sqrt{{x_i^*}}}\)
- **Volume da fatia:** \(\pi\big(\tfrac{1}{2\sqrt{{x_i^*}}}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\tfrac{1}{2\sqrt{{x_i^*}}}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\tfrac{1}{2\sqrt{{x_i^*}}}\big)^2\,\Delta x_i=\pi\int_{\tfrac14}^{4}\big(\tfrac{1}{2\sqrt{x}}\big)^2\,dx\)
- **Conta:** \(\pi\int_{1/4}^4\tfrac{1}{4x}dx=\tfrac\pi4[\ln x]_{1/4}^4=\tfrac\pi4\ln16\)
- **Resposta:** \(\boxed{\tfrac\pi2\ln4}\)
{{< /details >}}

### Questão 4: eixo \(y\)

**4(a)** \(x=\sqrt5\,y^2,\ x=0,\ y=\pm1\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(y\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(\sqrt5\,{y_i^*}^2\)
- **Volume da fatia:** \(\pi\big(\sqrt5\,{y_i^*}^2\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt5\,{y_i^*}^2\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\sqrt5\,{y_i^*}^2\big)^2\,\Delta y_i=\pi\int_{-1}^{1}\big(\sqrt5\,y^2\big)^2\,dy\)
- **Conta:** \(\pi\int_{-1}^15y^4dy=\pi\cdot2\)
- **Resposta:** \(\boxed{2\pi}\)
{{< /details >}}

**4(b)** \(x=y^{3/2},\ x=0,\ y=2\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(y\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \({y_i^*}^{3/2}\)
- **Volume da fatia:** \(\pi\big({y_i^*}^{3/2}\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big({y_i^*}^{3/2}\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big({y_i^*}^{3/2}\big)^2\,\Delta y_i=\pi\int_{0}^{2}\big(y^{3/2}\big)^2\,dy\)
- **Conta:** \(\pi\int_0^2y^3dy=\pi\tfrac{16}4\)
- **Resposta:** \(\boxed{4\pi}\)
{{< /details >}}

**4(c)** \(x=\sqrt{2\operatorname{sen}2y},\ 0\le y\le\pi/2,\ x=0\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(y\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(\sqrt{2\operatorname{sen}2{y_i^*}}\)
- **Volume da fatia:** \(\pi\big(\sqrt{2\operatorname{sen}2{y_i^*}}\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt{2\operatorname{sen}2{y_i^*}}\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\sqrt{2\operatorname{sen}2{y_i^*}}\big)^2\,\Delta y_i=\pi\int_{0}^{\pi/2}\big(\sqrt{2\operatorname{sen}2y}\big)^2\,dy\)
- **Conta:** \(\pi\int_0^{\pi/2}2\operatorname{sen}2y\,dy=\pi[-\cos2y]_0^{\pi/2}=\pi(1+1)\)
- **Resposta:** \(\boxed{2\pi}\)
{{< /details >}}

**4(d)** \(x=\sqrt{\cos(\pi y/4)},\ -2\le y\le0,\ x=0\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(y\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(\sqrt{\cos(\pi {y_i^*}/4)}\)
- **Volume da fatia:** \(\pi\big(\sqrt{\cos(\pi {y_i^*}/4)}\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt{\cos(\pi {y_i^*}/4)}\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\sqrt{\cos(\pi {y_i^*}/4)}\big)^2\,\Delta y_i=\pi\int_{-2}^{0}\big(\sqrt{\cos(\pi y/4)}\big)^2\,dy\)
- **Conta:** \(\pi\int_{-2}^0\cos\tfrac{\pi y}4dy=\pi\cdot\tfrac4\pi\Big[\operatorname{sen}\tfrac{\pi y}4\Big]_{-2}^0=4(0+1)\)
- **Resposta:** \(\boxed{4}\)
{{< /details >}}

**4(e)** Primeiro quadrante, eixos, \(y=3\) e \(x=\dfrac2{\sqrt{y+1}}\).

{{< details title="Resolução" >}}
- **Método:** disco, girando em torno do eixo \(y\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(\tfrac{2}{\sqrt{{y_i^*}+1}}\)
- **Volume da fatia:** \(\pi\big(\tfrac{2}{\sqrt{{y_i^*}+1}}\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\tfrac{2}{\sqrt{{y_i^*}+1}}\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\big(\tfrac{2}{\sqrt{{y_i^*}+1}}\big)^2\,\Delta y_i=\pi\int_{0}^{3}\big(\tfrac{2}{\sqrt{y+1}}\big)^2\,dy\)
- **Conta:** \(\pi\int_0^3\tfrac4{y+1}dy=4\pi[\ln(y+1)]_0^3=4\pi\ln4\)
- **Resposta:** \(\boxed{4\pi\ln4}\)
{{< /details >}}

### Questão 5: eixo \(x\), com anéis

Achou os cruzamentos? Igualar as curvas dá os limites.

**5(a)** \(y=x,\ y=1,\ x=0\).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raios do anel:** externo \(R=1\), interno \(r={x_i^*}\)
- **Volume da fatia:** \(\pi\Big[\big(1\big)^2-\big({x_i^*}\big)^2\Big]\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(1\big)^2-\big({x_i^*}\big)^2\Big]\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big(1\big)^2-\big({x_i^*}\big)^2\Big]\Delta x_i=\pi\int_{0}^{1}\Big[\big(1\big)^2-\big(x\big)^2\Big]dx\)
- **Conta:** \(\pi\int_0^1(1-x^2)dx=\pi\Big(1-\tfrac13\Big)\)
- **Resposta:** \(\boxed{\tfrac{2\pi}3}\)
{{< /details >}}

**5(b)** \(y=2\sqrt x,\ y=2,\ x=0\) (cruzam em \(x=1\)).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raios do anel:** externo \(R=2\), interno \(r=2\sqrt{{x_i^*}}\)
- **Volume da fatia:** \(\pi\Big[\big(2\big)^2-\big(2\sqrt{{x_i^*}}\big)^2\Big]\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(2\big)^2-\big(2\sqrt{{x_i^*}}\big)^2\Big]\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big(2\big)^2-\big(2\sqrt{{x_i^*}}\big)^2\Big]\Delta x_i=\pi\int_{0}^{1}\Big[\big(2\big)^2-\big(2\sqrt{x}\big)^2\Big]dx\)
- **Conta:** \(\pi\int_0^1(4-4x)dx=\pi(4-2)\)
- **Resposta:** \(\boxed{2\pi}\)
{{< /details >}}

**5(c)** \(y=x^2+1,\ y=x+3\) (\(x^2-x-2=0\Rightarrow x=-1,\,2\)).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raios do anel:** externo \(R={x_i^*}+3\), interno \(r={x_i^*}^2+1\)
- **Volume da fatia:** \(\pi\Big[\big({x_i^*}+3\big)^2-\big({x_i^*}^2+1\big)^2\Big]\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big({x_i^*}+3\big)^2-\big({x_i^*}^2+1\big)^2\Big]\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big({x_i^*}+3\big)^2-\big({x_i^*}^2+1\big)^2\Big]\Delta x_i=\pi\int_{-1}^{2}\Big[\big(x+3\big)^2-\big(x^2+1\big)^2\Big]dx\)
- **Conta:** \(\pi\int_{-1}^2(-x^4-x^2+6x+8)dx=\pi\Big[-\tfrac{x^5}5-\tfrac{x^3}3+3x^2+8x\Big]_{-1}^2=\pi\Big(30-\tfrac{33}5\Big)\)
- **Resposta:** \(\boxed{\tfrac{117\pi}5}\)
{{< /details >}}

**5(d)** \(y=4-x^2,\ y=2-x\) (cruzam em \(x=-1,\,2\)).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raios do anel:** externo \(R=4-{x_i^*}^2\), interno \(r=2-{x_i^*}\)
- **Volume da fatia:** \(\pi\Big[\big(4-{x_i^*}^2\big)^2-\big(2-{x_i^*}\big)^2\Big]\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(4-{x_i^*}^2\big)^2-\big(2-{x_i^*}\big)^2\Big]\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big(4-{x_i^*}^2\big)^2-\big(2-{x_i^*}\big)^2\Big]\Delta x_i=\pi\int_{-1}^{2}\Big[\big(4-x^2\big)^2-\big(2-x\big)^2\Big]dx\)
- **Conta:** \(\pi\int_{-1}^2(x^4-9x^2+4x+12)dx=\pi\Big[\tfrac{x^5}5-3x^3+2x^2+12x\Big]_{-1}^2=\pi\Big(15+\tfrac{33}5\Big)\)
- **Resposta:** \(\boxed{\tfrac{108\pi}5}\)
{{< /details >}}

**5(e)** \(y=\sec x,\ y=\sqrt2,\ -\tfrac\pi4\le x\le\tfrac\pi4\).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raios do anel:** externo \(R=\sqrt2\), interno \(r=\sec {x_i^*}\)
- **Volume da fatia:** \(\pi\Big[\big(\sqrt2\big)^2-\big(\sec {x_i^*}\big)^2\Big]\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(\sqrt2\big)^2-\big(\sec {x_i^*}\big)^2\Big]\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big(\sqrt2\big)^2-\big(\sec {x_i^*}\big)^2\Big]\Delta x_i=\pi\int_{-\pi/4}^{\pi/4}\Big[\big(\sqrt2\big)^2-\big(\sec x\big)^2\Big]dx\)
- **Conta:** \(\pi\int_{-\pi/4}^{\pi/4}(2-\sec^2x)dx=\pi[2x-\operatorname{tg}x]_{-\pi/4}^{\pi/4}=\pi(\pi-2)\)
- **Resposta:** \(\boxed{\pi^2-2\pi}\)
{{< /details >}}

**5(f)** \(y=\sec x,\ y=\operatorname{tg}x,\ x=0,\ x=1\).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raios do anel:** externo \(R=\sec {x_i^*}\), interno \(r=\operatorname{tg}{x_i^*}\)
- **Volume da fatia:** \(\pi\Big[\big(\sec {x_i^*}\big)^2-\big(\operatorname{tg}{x_i^*}\big)^2\Big]\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(\sec {x_i^*}\big)^2-\big(\operatorname{tg}{x_i^*}\big)^2\Big]\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big(\sec {x_i^*}\big)^2-\big(\operatorname{tg}{x_i^*}\big)^2\Big]\Delta x_i=\pi\int_{0}^{1}\Big[\big(\sec x\big)^2-\big(\operatorname{tg}x\big)^2\Big]dx\)
- **Conta:** \(\pi\int_0^1(\sec^2x-\operatorname{tg}^2x)dx=\pi\int_0^11\,dx\)
- **Resposta:** \(\boxed{\pi}\)
{{< /details >}}

### Questão 6: eixo \(y\), por anéis (fatias horizontais)

**6(a)** Triângulo de vértices \((1,0),(2,1),(1,1)\): para cada \(y\), \(x\) vai de \(1\) a \(y+1\).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno do eixo \(y\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raios do anel:** externo \(R={y_i^*}+1\), interno \(r=1\)
- **Volume da fatia:** \(\pi\Big[\big({y_i^*}+1\big)^2-\big(1\big)^2\Big]\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big({y_i^*}+1\big)^2-\big(1\big)^2\Big]\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big({y_i^*}+1\big)^2-\big(1\big)^2\Big]\Delta y_i=\pi\int_{0}^{1}\Big[\big(y+1\big)^2-\big(1\big)^2\Big]dy\)
- **Conta:** \(\pi\int_0^1(y^2+2y)dy=\pi\Big(\tfrac13+1\Big)\)
- **Resposta:** \(\boxed{\tfrac{4\pi}3}\)
{{< /details >}}

**6(b)** Primeiro quadrante, sob \(y=x^2\), até \(x=2\): para cada \(y\in[0,4]\), \(x\) vai de \(\sqrt y\) a \(2\).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno do eixo \(y\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raios do anel:** externo \(R=2\), interno \(r=\sqrt{{y_i^*}}\)
- **Volume da fatia:** \(\pi\Big[\big(2\big)^2-\big(\sqrt{{y_i^*}}\big)^2\Big]\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(2\big)^2-\big(\sqrt{{y_i^*}}\big)^2\Big]\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big(2\big)^2-\big(\sqrt{{y_i^*}}\big)^2\Big]\Delta y_i=\pi\int_{0}^{4}\Big[\big(2\big)^2-\big(\sqrt{y}\big)^2\Big]dy\)
- **Conta:** \(\pi\int_0^4(4-y)dy=\pi(16-8)\)
- **Resposta:** \(\boxed{8\pi}\)
{{< /details >}}

**6(c)** Primeiro quadrante, entre \(x^2+y^2=3\) (esquerda), \(x=\sqrt3\) e \(y=\sqrt3\): \(x\) vai de \(\sqrt{3-y^2}\) a \(\sqrt3\).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno do eixo \(y\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raios do anel:** externo \(R=\sqrt3\), interno \(r=\sqrt{3-{y_i^*}^2}\)
- **Volume da fatia:** \(\pi\Big[\big(\sqrt3\big)^2-\big(\sqrt{3-{y_i^*}^2}\big)^2\Big]\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(\sqrt3\big)^2-\big(\sqrt{3-{y_i^*}^2}\big)^2\Big]\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big(\sqrt3\big)^2-\big(\sqrt{3-{y_i^*}^2}\big)^2\Big]\Delta y_i=\pi\int_{0}^{\sqrt3}\Big[\big(\sqrt3\big)^2-\big(\sqrt{3-y^2}\big)^2\Big]dy\)
- **Conta:** \(\pi\int_0^{\sqrt3}\big(3-(3-y^2)\big)dy=\pi\tfrac{(\sqrt3)^3}3\)
- **Resposta:** \(\boxed{\sqrt3\,\pi}\)
{{< /details >}}

### Questões 7 e 8: eixo deslocado

**7** Região sob \(y=x^2\), \(0\le x\le1\), em torno de \(x=-1\). Para cada \(y\in[0,1]\), \(x\) vai de \(\sqrt y\) a \(1\); distâncias até \(x=-1\): externo \(1+1=2\), interno \(\sqrt y+1\).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno da a reta \(x=-1\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raios do anel:** externo \(R=2\), interno \(r=\sqrt{{y_i^*}}+1\)
- **Volume da fatia:** \(\pi\Big[\big(2\big)^2-\big(\sqrt{{y_i^*}}+1\big)^2\Big]\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(2\big)^2-\big(\sqrt{{y_i^*}}+1\big)^2\Big]\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big(2\big)^2-\big(\sqrt{{y_i^*}}+1\big)^2\Big]\Delta y_i=\pi\int_{0}^{1}\Big[\big(2\big)^2-\big(\sqrt{y}+1\big)^2\Big]dy\)
- **Conta:** \(\pi\int_0^1(3-2\sqrt y-y)dy=\pi\Big(3-\tfrac43-\tfrac12\Big)\)
- **Resposta:** \(\boxed{\tfrac{7\pi}6}\)
{{< /details >}}

**8** Região no 2º quadrante sob \(y=-x^3\), \(-1\le x\le0\), em torno de \(x=-2\). Para cada \(y\in[0,1]\), \(x\) vai de \(-1\) a \(-\sqrt[3]y\); distâncias até \(x=-2\): interno \(1\), externo \(2-\sqrt[3]y\).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno da a reta \(x=-2\); fatias perpendiculares ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raios do anel:** externo \(R=2-{y_i^*}^{1/3}\), interno \(r=1\)
- **Volume da fatia:** \(\pi\Big[\big(2-{y_i^*}^{1/3}\big)^2-\big(1\big)^2\Big]\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(2-{y_i^*}^{1/3}\big)^2-\big(1\big)^2\Big]\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big(2-{y_i^*}^{1/3}\big)^2-\big(1\big)^2\Big]\Delta y_i=\pi\int_{0}^{1}\Big[\big(2-y^{1/3}\big)^2-\big(1\big)^2\Big]dy\)
- **Conta:** \(\pi\int_0^1\big(3-4y^{1/3}+y^{2/3}\big)dy=\pi\Big(3-3+\tfrac35\Big)\)
- **Resposta:** \(\boxed{\tfrac{3\pi}5}\)
{{< /details >}}

### Questão 14 (a) e (d): triângulo \(2y=x+4,\ y=x,\ x=0\)

Vértices \((0,0),(0,2),(4,4)\). Em \(0\le x\le4\), a reta de cima é \(y=\tfrac{x+4}2\) e a de baixo é \(y=x\).

**14(a)** Em torno do eixo \(x\).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno do eixo \(x\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raios do anel:** externo \(R=\tfrac{{x_i^*}+4}{2}\), interno \(r={x_i^*}\)
- **Volume da fatia:** \(\pi\Big[\big(\tfrac{{x_i^*}+4}{2}\big)^2-\big({x_i^*}\big)^2\Big]\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(\tfrac{{x_i^*}+4}{2}\big)^2-\big({x_i^*}\big)^2\Big]\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big(\tfrac{{x_i^*}+4}{2}\big)^2-\big({x_i^*}\big)^2\Big]\Delta x_i=\pi\int_{0}^{4}\Big[\big(\tfrac{x+4}{2}\big)^2-\big(x\big)^2\Big]dx\)
- **Conta:** \(\pi\int_0^4\Big[\tfrac{(x+4)^2}4-x^2\Big]dx=\pi\Big(\tfrac{448}{12}-\tfrac{64}3\Big)\)
- **Resposta:** \(\boxed{16\pi}\)
{{< /details >}}

**14(d)** Em torno de \(y=8\): distâncias \(8-x\) (externo, curva de baixo) e \(8-\tfrac{x+4}2\) (interno).

{{< details title="Resolução" >}}
- **Método:** anel, girando em torno da a reta \(y=8\); fatias perpendiculares ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raios do anel:** externo \(R=8-{x_i^*}\), interno \(r=8-\tfrac{{x_i^*}+4}{2}\)
- **Volume da fatia:** \(\pi\Big[\big(8-{x_i^*}\big)^2-\big(8-\tfrac{{x_i^*}+4}{2}\big)^2\Big]\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(8-{x_i^*}\big)^2-\big(8-\tfrac{{x_i^*}+4}{2}\big)^2\Big]\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}\pi\Big[\big(8-{x_i^*}\big)^2-\big(8-\tfrac{{x_i^*}+4}{2}\big)^2\Big]\Delta x_i=\pi\int_{0}^{4}\Big[\big(8-x\big)^2-\big(8-\tfrac{x+4}{2}\big)^2\Big]dx\)
- **Conta:** \(\pi\int_0^4\Big[(8-x)^2-\big(6-\tfrac x2\big)^2\Big]dx=\pi\Big(\tfrac{448}3-\tfrac{304}3\Big)\)
- **Resposta:** \(\boxed{48\pi}\)
{{< /details >}}

