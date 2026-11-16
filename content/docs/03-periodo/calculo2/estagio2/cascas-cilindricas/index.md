---
title: Volume por cascas cilíndricas
weight: 4
description: Quando discos complicam, fatie paralelo ao eixo e some cascas.
autores:
  - thallesgsrv
baseadoEm:
  - rodrigocohen
date: 2026-11-16
---

## 1. Por que outro método?

Com discos, a fatia é **perpendicular** ao eixo. Às vezes isso obriga a isolar \(x\) em função de \(y\) (ou o contrário) ou a dividir a região em partes. Na **casca**, a fatia é **paralela** ao eixo de rotação, e você integra na variável que já tem.

Imagine uma lata de refrigerante de parede finíssima. Abra com uma tesoura e estique: vira um retângulo de **comprimento** \(2\pi r\), **altura** \(h\) e **espessura** \(\Delta x\).

> [!IMPORTANT]
> **Mesma receita, outros ingredientes:**
> 1. **Esboço** (desenhe a faixa fina paralela ao eixo).
> 2. **Espessura** \(\Delta x_i\) (ou \(\Delta y_i\)): a largura da faixa.
> 3. **Raio da casca:** distância da faixa ao eixo. **Altura da casca:** comprimento da faixa.
> 4. **Volume da casca** \(=2\pi\cdot\text{raio}\cdot\text{altura}\cdot\text{espessura}\).
> 5. **Aproximação:** \(\sum\). 6. **Volume do sólido:** \(\lim\sum=\int\).

$$
V=\int_a^b 2\pi\,\underbrace{(\text{raio})}_{\text{distância ao eixo}}\,\underbrace{(\text{altura})}_{\text{topo}-\text{base}}\,dx
$$

## 2. Qual método escolher?

| Gira em torno de | Fatia perpendicular (disco/anel) | Fatia paralela (casca) |
| --- | --- | --- |
| eixo \(x\) | integra em \(dx\) | integra em \(dy\) |
| eixo \(y\) | integra em \(dy\) | integra em \(dx\) |

Escolha o método em que a **curva já está escrita na variável certa** e a região não se parte em pedaços.

> [!WARNING]
> **Raio ≠ posição da curva.** O raio é a distância até o **eixo**. Para girar em torno de \(x=4\), o raio é \(4-x\), não \(x\). Para \(y=\tfrac85\), é \(\tfrac85-y\). Se o eixo está do outro lado da região, a distância vira \(y-(-\tfrac25)=y+\tfrac25\).

## 3. Exemplo resolvido

**Exemplo.** Região sob \(y=1+\tfrac{x^2}4\), \(0\le x\le2\), em torno do eixo \(y\).

- **Método:** casca cilíndrica, girando em torno do eixo \(y\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(1+\tfrac{{x_i^*}^2}{4}\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(1+\tfrac{{x_i^*}^2}{4})\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(1+\tfrac{{x_i^*}^2}{4})\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({x_i^*})\,(1+\tfrac{{x_i^*}^2}{4})\,\Delta x_i=2\pi\int_{0}^{2}(x)\,(1+\tfrac{x^2}{4})\,dx\)
- **Conta:** \(2\pi\int_0^2\Big(x+\tfrac{x^3}4\Big)dx=2\pi\Big[\tfrac{x^2}2+\tfrac{x^4}{16}\Big]_0^2=2\pi(2+1)\)
- **Resposta:** \(\boxed{6\pi}\)

## 4. Teste rápido

{{< quiz titulo="Casca ou anel?" >}}

{{< questao >}}
A região entre \(x=y^2\) e \(x=-y\) (\(0\le y\le2\)) gira em torno do eixo \(x\). Qual é a altura da casca?

- [ ] \(y^2-y\)
- [x] \(y^2+y\)
- [ ] \(y\)
---
A casca é horizontal, então a altura é a largura da região em \(x\): direita menos esquerda, \(y^2-(-y)=y^2+y\). O raio é \(y\).
{{< /questao >}}

{{< /quiz >}}

## 5. Lista de exercícios

### Questão 9: eixo \(y\), \(V=2\pi\int x\,f(x)\,dx\)

**9(a)** \(y=1+\tfrac{x^2}4\), \(0\le x\le2\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(y\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(1+\tfrac{{x_i^*}^2}4\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(1+\tfrac{{x_i^*}^2}4)\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(1+\tfrac{{x_i^*}^2}4)\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({x_i^*})\,(1+\tfrac{{x_i^*}^2}4)\,\Delta x_i=2\pi\int_{0}^{2}(x)\,(1+\tfrac{x^2}4)\,dx\)
- **Conta:** \(2\pi\int_0^2\big(x+\tfrac{x^3}4\big)dx=2\pi(2+1)\)
- **Resposta:** \(\boxed{6\pi}\)
{{< /details >}}

**9(b)** \(y=2-\tfrac{x^2}4\), \(0\le x\le2\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(y\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(2-\tfrac{{x_i^*}^2}4\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(2-\tfrac{{x_i^*}^2}4)\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(2-\tfrac{{x_i^*}^2}4)\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({x_i^*})\,(2-\tfrac{{x_i^*}^2}4)\,\Delta x_i=2\pi\int_{0}^{2}(x)\,(2-\tfrac{x^2}4)\,dx\)
- **Conta:** \(2\pi\int_0^2\big(2x-\tfrac{x^3}4\big)dx=2\pi(4-1)\)
- **Resposta:** \(\boxed{6\pi}\)
{{< /details >}}

**9(c)** \(y=\sqrt{x^2+1}\), \(0\le x\le\sqrt3\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(y\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(\sqrt{{x_i^*}^2+1}\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(\sqrt{{x_i^*}^2+1})\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(\sqrt{{x_i^*}^2+1})\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({x_i^*})\,(\sqrt{{x_i^*}^2+1})\,\Delta x_i=2\pi\int_{0}^{\sqrt3}(x)\,(\sqrt{x^2+1})\,dx\)
- **Conta:** \(2\pi\int_0^{\sqrt3}x\sqrt{x^2+1}\,dx\ \ (u=x^2+1)=2\pi\Big[\tfrac{(x^2+1)^{3/2}}3\Big]_0^{\sqrt3}=2\pi\cdot\tfrac{8-1}3\)
- **Resposta:** \(\boxed{\tfrac{14\pi}3}\)
{{< /details >}}

> [!NOTE]
> O gabarito impresso da lista mostra \(14\pi\) em 9(c), mas a conta fecha em \(\tfrac{14\pi}3\). Confira com o professor.

**9(d)** \(y=\dfrac{9x}{\sqrt{x^3+9}}\), \(0\le x\le3\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(y\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(\tfrac{9{x_i^*}}{\sqrt{{x_i^*}^3+9}}\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(\tfrac{9{x_i^*}}{\sqrt{{x_i^*}^3+9}})\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(\tfrac{9{x_i^*}}{\sqrt{{x_i^*}^3+9}})\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({x_i^*})\,(\tfrac{9{x_i^*}}{\sqrt{{x_i^*}^3+9}})\,\Delta x_i=2\pi\int_{0}^{3}(x)\,(\tfrac{9x}{\sqrt{x^3+9}})\,dx\)
- **Conta:** \(18\pi\int_0^3\tfrac{x^2}{\sqrt{x^3+9}}dx\ \ (u=x^3+9,\ du=3x^2dx)=12\pi\big[\sqrt{x^3+9}\big]_0^3=12\pi(6-3)\)
- **Resposta:** \(\boxed{36\pi}\)
{{< /details >}}

### Questão 10: eixo \(x\), integrando em \(dy\)

**10(a)** Região entre o eixo \(y\), \(y=\sqrt2\) e \(x=y^2\) (largura \(y^2\)), \(0\le y\le\sqrt2\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(x\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \({y_i^*}^2\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,({y_i^*}^2)\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,({y_i^*}^2)\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*})\,({y_i^*}^2)\,\Delta y_i=2\pi\int_{0}^{\sqrt2}(y)\,(y^2)\,dy\)
- **Conta:** \(2\pi\int_0^{\sqrt2}y^3dy=2\pi\tfrac{(\sqrt2)^4}4=2\pi\cdot1\)
- **Resposta:** \(\boxed{2\pi}\)
{{< /details >}}

**10(b)** Região entre o eixo \(y\), \(y=\sqrt3\) e \(x=3-y^2\), \(0\le y\le\sqrt3\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(x\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(3-{y_i^*}^2\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,(3-{y_i^*}^2)\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,(3-{y_i^*}^2)\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*})\,(3-{y_i^*}^2)\,\Delta y_i=2\pi\int_{0}^{\sqrt3}(y)\,(3-y^2)\,dy\)
- **Conta:** \(2\pi\int_0^{\sqrt3}(3y-y^3)dy=2\pi\Big(\tfrac92-\tfrac94\Big)\)
- **Resposta:** \(\boxed{\tfrac{9\pi}2}\)
{{< /details >}}

### Questão 11: eixo \(y\)

Altura = curva de cima − curva de baixo.

**11(a)** \(y=x,\ y=-\tfrac x2,\ x=2\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(y\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \({x_i^*}-\big(-\tfrac{{x_i^*}}{2}\big)\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,({x_i^*}-\big(-\tfrac{{x_i^*}}{2}\big))\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,({x_i^*}-\big(-\tfrac{{x_i^*}}{2}\big))\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({x_i^*})\,({x_i^*}-\big(-\tfrac{{x_i^*}}{2}\big))\,\Delta x_i=2\pi\int_{0}^{2}(x)\,(x-\big(-\tfrac{x}{2}\big))\,dx\)
- **Conta:** \(2\pi\int_0^2\tfrac{3x^2}2dx=3\pi\cdot\tfrac83\)
- **Resposta:** \(\boxed{8\pi}\)
{{< /details >}}

**11(b)** \(y=2x,\ y=\tfrac x2,\ x=1\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(y\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(2{x_i^*}-\tfrac{{x_i^*}}{2}\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(2{x_i^*}-\tfrac{{x_i^*}}{2})\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(2{x_i^*}-\tfrac{{x_i^*}}{2})\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({x_i^*})\,(2{x_i^*}-\tfrac{{x_i^*}}{2})\,\Delta x_i=2\pi\int_{0}^{1}(x)\,(2x-\tfrac{x}{2})\,dx\)
- **Conta:** \(2\pi\int_0^1\tfrac{3x^2}2dx=3\pi\cdot\tfrac13\)
- **Resposta:** \(\boxed{\pi}\)
{{< /details >}}

**11(c)** \(y=x^2,\ y=2-x,\ x=0\) (cruzam em \(x=1\)).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(y\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(2-{x_i^*}-{x_i^*}^2\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(2-{x_i^*}-{x_i^*}^2)\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(2-{x_i^*}-{x_i^*}^2)\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({x_i^*})\,(2-{x_i^*}-{x_i^*}^2)\,\Delta x_i=2\pi\int_{0}^{1}(x)\,(2-x-x^2)\,dx\)
- **Conta:** \(2\pi\int_0^1(2x-x^2-x^3)dx=2\pi\Big(1-\tfrac13-\tfrac14\Big)\)
- **Resposta:** \(\boxed{\tfrac{5\pi}6}\)
{{< /details >}}

**11(d)** \(y=2-x^2,\ y=x^2,\ x=0\) (cruzam em \(x=1\)).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(y\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(2-2{x_i^*}^2\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(2-2{x_i^*}^2)\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(2-2{x_i^*}^2)\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({x_i^*})\,(2-2{x_i^*}^2)\,\Delta x_i=2\pi\int_{0}^{1}(x)\,(2-2x^2)\,dx\)
- **Conta:** \(2\pi\int_0^1(2x-2x^3)dx=2\pi\Big(1-\tfrac12\Big)\)
- **Resposta:** \(\boxed{\pi}\)
{{< /details >}}

**11(e)** \(y=2x-1,\ y=\sqrt x,\ x=0\) (cruzam em \(x=1\); em cima \(\sqrt x\)).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(y\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(\sqrt{{x_i^*}}-2{x_i^*}+1\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(\sqrt{{x_i^*}}-2{x_i^*}+1)\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(\sqrt{{x_i^*}}-2{x_i^*}+1)\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({x_i^*})\,(\sqrt{{x_i^*}}-2{x_i^*}+1)\,\Delta x_i=2\pi\int_{0}^{1}(x)\,(\sqrt{x}-2x+1)\,dx\)
- **Conta:** \(2\pi\int_0^1\big(x^{3/2}-2x^2+x\big)dx=2\pi\Big(\tfrac25-\tfrac23+\tfrac12\Big)\)
- **Resposta:** \(\boxed{\tfrac{7\pi}{15}}\)
{{< /details >}}

### Questão 12: eixo \(x\)

Casca horizontal: raio \(y\), altura = **direita − esquerda** (em \(x\)).

**12(a)** \(x=\sqrt y,\ x=-y,\ y=2\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(x\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(\sqrt{{y_i^*}}+{y_i^*}\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,(\sqrt{{y_i^*}}+{y_i^*})\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,(\sqrt{{y_i^*}}+{y_i^*})\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*})\,(\sqrt{{y_i^*}}+{y_i^*})\,\Delta y_i=2\pi\int_{0}^{2}(y)\,(\sqrt{y}+y)\,dy\)
- **Conta:** \(2\pi\int_0^2\big(y^{3/2}+y^2\big)dy=2\pi\Big(\tfrac{8\sqrt2}5+\tfrac83\Big)\)
- **Resposta:** \(\boxed{\tfrac{16\pi}{15}(3\sqrt2+5)}\)
{{< /details >}}

**12(b)** \(x=y^2,\ x=-y,\ y=2,\ y\ge0\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(x\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \({y_i^*}^2+{y_i^*}\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,({y_i^*}^2+{y_i^*})\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,({y_i^*}^2+{y_i^*})\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*})\,({y_i^*}^2+{y_i^*})\,\Delta y_i=2\pi\int_{0}^{2}(y)\,(y^2+y)\,dy\)
- **Conta:** \(2\pi\int_0^2(y^3+y^2)dy=2\pi\Big(4+\tfrac83\Big)\)
- **Resposta:** \(\boxed{\tfrac{40\pi}3}\)
{{< /details >}}

**12(c)** \(x=2y-y^2,\ x=0\) (\(0\le y\le2\)).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(x\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(2{y_i^*}-{y_i^*}^2\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,(2{y_i^*}-{y_i^*}^2)\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,(2{y_i^*}-{y_i^*}^2)\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*})\,(2{y_i^*}-{y_i^*}^2)\,\Delta y_i=2\pi\int_{0}^{2}(y)\,(2y-y^2)\,dy\)
- **Conta:** \(2\pi\int_0^2(2y^2-y^3)dy=2\pi\Big(\tfrac{16}3-4\Big)\)
- **Resposta:** \(\boxed{\tfrac{8\pi}3}\)
{{< /details >}}

**12(d)** \(x=2y-y^2,\ x=y\) (cruzam em \(y=0,1\); parábola à direita).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(x\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \({y_i^*}-{y_i^*}^2\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,({y_i^*}-{y_i^*}^2)\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,({y_i^*}-{y_i^*}^2)\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*})\,({y_i^*}-{y_i^*}^2)\,\Delta y_i=2\pi\int_{0}^{1}(y)\,(y-y^2)\,dy\)
- **Conta:** \(2\pi\int_0^1(y^2-y^3)dy=2\pi\Big(\tfrac13-\tfrac14\Big)\)
- **Resposta:** \(\boxed{\tfrac\pi6}\)
{{< /details >}}

**12(e)** \(y=|x|,\ y=1\): para cada \(y\), \(x\) vai de \(-y\) a \(y\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(x\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(2{y_i^*}\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,(2{y_i^*})\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,(2{y_i^*})\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*})\,(2{y_i^*})\,\Delta y_i=2\pi\int_{0}^{1}(y)\,(2y)\,dy\)
- **Conta:** \(2\pi\int_0^12y^2dy=2\pi\cdot\tfrac23\)
- **Resposta:** \(\boxed{\tfrac{4\pi}3}\)
{{< /details >}}

**12(f)** \(y=x,\ y=2x,\ y=2\): \(x\) vai de \(y/2\) a \(y\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(x\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(\tfrac{{y_i^*}}{2}\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,(\tfrac{{y_i^*}}{2})\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,(\tfrac{{y_i^*}}{2})\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*})\,(\tfrac{{y_i^*}}{2})\,\Delta y_i=2\pi\int_{0}^{2}(y)\,(\tfrac{y}{2})\,dy\)
- **Conta:** \(2\pi\int_0^2\tfrac{y^2}2dy=\pi\cdot\tfrac83\)
- **Resposta:** \(\boxed{\tfrac{8\pi}3}\)
{{< /details >}}

**12(g)** \(y=\sqrt x,\ y=0,\ y=x-2\): \(x\) vai de \(y^2\) a \(y+2\) (\(0\le y\le2\)).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(x\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \({y_i^*}+2-{y_i^*}^2\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,({y_i^*}+2-{y_i^*}^2)\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,({y_i^*}+2-{y_i^*}^2)\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*})\,({y_i^*}+2-{y_i^*}^2)\,\Delta y_i=2\pi\int_{0}^{2}(y)\,(y+2-y^2)\,dy\)
- **Conta:** \(2\pi\int_0^2(y^2+2y-y^3)dy=2\pi\Big(\tfrac83+4-4\Big)\)
- **Resposta:** \(\boxed{\tfrac{16\pi}3}\)
{{< /details >}}

**12(h)** \(y=\sqrt x,\ y=0,\ y=2-x\): \(x\) vai de \(y^2\) a \(2-y\) (\(0\le y\le1\)).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(x\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(2-{y_i^*}-{y_i^*}^2\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,(2-{y_i^*}-{y_i^*}^2)\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,(2-{y_i^*}-{y_i^*}^2)\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*})\,(2-{y_i^*}-{y_i^*}^2)\,\Delta y_i=2\pi\int_{0}^{1}(y)\,(2-y-y^2)\,dy\)
- **Conta:** \(2\pi\int_0^1(2y-y^2-y^3)dy=2\pi\Big(1-\tfrac13-\tfrac14\Big)\)
- **Resposta:** \(\boxed{\tfrac{5\pi}6}\)
{{< /details >}}

### Questão 13: a mesma região, quatro eixos

Região entre o eixo \(y\) e \(x=12(y^2-y^3)\), \(0\le y\le1\). Altura da casca (em \(x\)): \(12(y^2-y^3)\).

**13(a)** Em torno do eixo \(x\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(x\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(12({y_i^*}^2-{y_i^*}^3)\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*})\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i=2\pi\int_{0}^{1}(y)\,(12(y^2-y^3))\,dy\)
- **Conta:** \(24\pi\int_0^1(y^3-y^4)dy=24\pi\Big(\tfrac14-\tfrac15\Big)\)
- **Resposta:** \(\boxed{\tfrac{6\pi}5}\)
{{< /details >}}

**13(b)** Em torno de \(y=1\): raio \(1-y\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno da reta \(y=1\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \(1-{y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(12({y_i^*}^2-{y_i^*}^3)\)
- **Volume da casca:** \(2\pi\,(1-{y_i^*})\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,(1-{y_i^*})\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,(1-{y_i^*})\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i=2\pi\int_{0}^{1}(1-y)\,(12(y^2-y^3))\,dy\)
- **Conta:** \(24\pi\int_0^1(y^2-2y^3+y^4)dy=24\pi\Big(\tfrac13-\tfrac12+\tfrac15\Big)\)
- **Resposta:** \(\boxed{\tfrac{4\pi}5}\)
{{< /details >}}

**13(c)** Em torno de \(y=\tfrac85\): raio \(\tfrac85-y\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno da reta \(y=8/5\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \(\tfrac85-{y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(12({y_i^*}^2-{y_i^*}^3)\)
- **Volume da casca:** \(2\pi\,(\tfrac85-{y_i^*})\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,(\tfrac85-{y_i^*})\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,(\tfrac85-{y_i^*})\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i=2\pi\int_{0}^{1}(\tfrac85-y)\,(12(y^2-y^3))\,dy\)
- **Conta:** \(24\pi\Big(\tfrac85\cdot\tfrac1{12}-\tfrac1{20}\Big)=24\pi\Big(\tfrac2{15}-\tfrac1{20}\Big)\)
- **Resposta:** \(\boxed{2\pi}\)
{{< /details >}}

**13(d)** Em torno de \(y=-\tfrac25\): raio \(y+\tfrac25\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno da reta \(y=-2/5\); fatias paralelas ao eixo, logo integra em \(dy\)
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}+\tfrac25\) (distância ao eixo)
- **Altura da casca:** \(12({y_i^*}^2-{y_i^*}^3)\)
- **Volume da casca:** \(2\pi\,({y_i^*}+\tfrac25)\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*}+\tfrac25)\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({y_i^*}+\tfrac25)\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i=2\pi\int_{0}^{1}(y+\tfrac25)\,(12(y^2-y^3))\,dy\)
- **Conta:** \(24\pi\Big(\tfrac1{20}+\tfrac25\cdot\tfrac1{12}\Big)=24\pi\Big(\tfrac1{20}+\tfrac1{30}\Big)\)
- **Resposta:** \(\boxed{2\pi}\)
{{< /details >}}

### Questão 14 (b) e (c): triângulo \(2y=x+4,\ y=x,\ x=0\)

Altura da casca: \(\tfrac{x+4}2-x=\tfrac{4-x}2\), \(0\le x\le4\).

**14(b)** Em torno do eixo \(y\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno do eixo \(y\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(\tfrac{4-{x_i^*}}{2}\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(\tfrac{4-{x_i^*}}{2})\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(\tfrac{4-{x_i^*}}{2})\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,({x_i^*})\,(\tfrac{4-{x_i^*}}{2})\,\Delta x_i=2\pi\int_{0}^{4}(x)\,(\tfrac{4-x}{2})\,dx\)
- **Conta:** \(\pi\int_0^4(4x-x^2)dx=\pi\Big(32-\tfrac{64}3\Big)\)
- **Resposta:** \(\boxed{\tfrac{32\pi}3}\)
{{< /details >}}

**14(c)** Em torno de \(x=4\): raio \(4-x\).

{{< details title="Resolução" >}}
- **Método:** casca cilíndrica, girando em torno da reta \(x=4\); fatias paralelas ao eixo, logo integra em \(dx\)
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \(4-{x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(\tfrac{4-{x_i^*}}{2}\)
- **Volume da casca:** \(2\pi\,(4-{x_i^*})\,(\tfrac{4-{x_i^*}}{2})\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) com espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,(4-{x_i^*})\,(\tfrac{4-{x_i^*}}{2})\,\Delta x_i\)
- **Volume do sólido:** \(\lim_{n\to\infty}\sum_{i=1}^{n}2\pi\,(4-{x_i^*})\,(\tfrac{4-{x_i^*}}{2})\,\Delta x_i=2\pi\int_{0}^{4}(4-x)\,(\tfrac{4-x}{2})\,dx\)
- **Conta:** \(\pi\int_0^4(4-x)^2dx=\pi\Big[-\tfrac{(4-x)^3}3\Big]_0^4\)
- **Resposta:** \(\boxed{\tfrac{64\pi}3}\)
{{< /details >}}

