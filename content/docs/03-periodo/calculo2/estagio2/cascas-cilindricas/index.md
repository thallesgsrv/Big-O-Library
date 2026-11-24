---
title: Volume por cascas cilíndricas
weight: 4
description: Quando discos complicam, fatie paralelo ao eixo e some cascas.
autores:
  - thallesgsrv
date: 2026-11-16
---

## 1. Por que outro método?

Com discos, a fatia é **perpendicular** ao eixo. Às vezes isso obriga a isolar \(x\) em função de \(y\) (ou o contrário) ou a dividir a região em partes. Na **casca**, a fatia é **paralela** ao eixo de rotação, e você integra na variável que já tem.

Ao final você deve conseguir:

- explicar por que as cascas cilíndricas facilitam alguns volumes (a fatia é paralela ao eixo);
- montar a integral de volume por cascas;
- escolher entre discos, anéis e cascas olhando como a curva já está escrita.

> [!NOTE]
> **Antes de começar, ajuda ter à mão:**
>
> - a página de [Volume por discos e anéis](../discos-e-aneis/);
> - a página de [Área entre curvas](../area-entre-curvas/).

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

Não precisa decorar qual método é "melhor": o segredo está em olhar como a curva já vem escrita e se a região precisaria ser partida em pedaços.

## 3. Exemplo resolvido

**Exemplo.** Região sob \(y=1+\tfrac{x^2}4\), \(0\le x\le2\), em torno do eixo \(y\).

- **Como pensar:** Eixo \(y\) e curva \(y=f(x)\): em vez de deitar a fatia, deixe-a **em pé**, paralela ao eixo, com espessura \(\Delta x\). Girando, vira uma **casca** (lata). Distância ao eixo \(y\) = \(x\); altura = \(f(x)\). Não precisa isolar \(x\).
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(1+\tfrac{{x_i^*}^2}{4}\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(1+\tfrac{{x_i^*}^2}{4})\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) de espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(1+\tfrac{{x_i^*}^2}{4})\,\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=2\pi\int_{0}^{2}(x)\,(1+\tfrac{x^2}{4})\,dx\)
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

Bora praticar! Resolva no papel antes de abrir o gabarito: tentar primeiro fixa mais do que ler a solução pronta. Se travar, volte à receita e tente de novo antes de espiar.


### Questão 9: eixo \(y\), \(V=2\pi\int x\,f(x)\,dx\)

**9(a)** \(y=1+\tfrac{x^2}4\), \(0\le x\le2\).

{{< details title="Resolução" >}}
- **Como pensar:** Faixa vertical de base \(y=0\) e topo na curva: raio \(x\), altura \(1+\tfrac{x^2}4\). Multiplique \(x\) pela altura antes de integrar.
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(1+\tfrac{{x_i^*}^2}4\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(1+\tfrac{{x_i^*}^2}4)\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) de espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(1+\tfrac{{x_i^*}^2}4)\,\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=2\pi\int_{0}^{2}(x)\,(1+\tfrac{x^2}4)\,dx\)
- **Conta:** \(2\pi\int_0^2\big(x+\tfrac{x^3}4\big)dx=2\pi(2+1)\)
- **Resposta:** \(\boxed{6\pi}\)
{{< /details >}}

### Questão 10: eixo \(x\), integrando em \(dy\)

**10(a)** Região entre o eixo \(y\), \(y=\sqrt2\) e \(x=y^2\) (largura \(y^2\)), \(0\le y\le\sqrt2\).

{{< details title="Resolução" >}}
- **Como pensar:** Eixo \(x\): a faixa paralela é **horizontal**, de espessura \(\Delta y\). Raio = distância ao eixo \(x\) = \(y\). Comprimento da faixa: de \(x=0\) até a curva \(x=y^2\).
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \({y_i^*}^2\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,({y_i^*}^2)\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) de espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,({y_i^*}^2)\,\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=2\pi\int_{0}^{\sqrt2}(y)\,(y^2)\,dy\)
- **Conta:** \(2\pi\int_0^{\sqrt2}y^3dy=2\pi\tfrac{(\sqrt2)^4}4=2\pi\cdot1\)
- **Resposta:** \(\boxed{2\pi}\)
{{< /details >}}

**10(b)** Região entre o eixo \(y\), \(y=\sqrt3\) e \(x=3-y^2\), \(0\le y\le\sqrt3\).

{{< details title="Resolução" >}}
- **Como pensar:** Mesma ideia: faixa horizontal, raio \(y\), comprimento de \(x=0\) até \(x=3-y^2\).
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(3-{y_i^*}^2\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,(3-{y_i^*}^2)\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) de espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,(3-{y_i^*}^2)\,\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=2\pi\int_{0}^{\sqrt3}(y)\,(3-y^2)\,dy\)
- **Conta:** \(2\pi\int_0^{\sqrt3}(3y-y^3)dy=2\pi\Big(\tfrac92-\tfrac94\Big)\)
- **Resposta:** \(\boxed{\tfrac{9\pi}2}\)
{{< /details >}}

### Questão 11: eixo \(y\)

Altura = curva de cima − curva de baixo.

**11(a)** \(y=x,\ y=-\tfrac x2,\ x=2\).

{{< details title="Resolução" >}}
- **Como pensar:** Eixo \(y\): faixas verticais, raio \(x\). Altura = de cima menos de baixo: \(x-\big(-\tfrac x2\big)=\tfrac{3x}2\).
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \({x_i^*}-\big(-\tfrac{{x_i^*}}{2}\big)\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,({x_i^*}-\big(-\tfrac{{x_i^*}}{2}\big))\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) de espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,({x_i^*}-\big(-\tfrac{{x_i^*}}{2}\big))\,\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=2\pi\int_{0}^{2}(x)\,(x-\big(-\tfrac{x}{2}\big))\,dx\)
- **Conta:** \(2\pi\int_0^2\tfrac{3x^2}2dx=3\pi\cdot\tfrac83\)
- **Resposta:** \(\boxed{8\pi}\)
{{< /details >}}

### Questão 12: eixo \(x\)

Casca horizontal: raio \(y\), altura = **direita − esquerda** (em \(x\)).

**12(a)** \(x=\sqrt y,\ x=-y,\ y=2\).

{{< details title="Resolução" >}}
- **Como pensar:** Eixo \(x\): faixas **horizontais** (\(\Delta y\)), raio \(y\). Altura = direita menos esquerda **em \(x\)**: direita \(\sqrt y\), esquerda \(-y\).
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(\sqrt{{y_i^*}}+{y_i^*}\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,(\sqrt{{y_i^*}}+{y_i^*})\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) de espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,(\sqrt{{y_i^*}}+{y_i^*})\,\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=2\pi\int_{0}^{2}(y)\,(\sqrt{y}+y)\,dy\)
- **Conta:** \(2\pi\int_0^2\big(y^{3/2}+y^2\big)dy=2\pi\Big(\tfrac{8\sqrt2}5+\tfrac83\Big)\)
- **Resposta:** \(\boxed{\tfrac{16\pi}{15}(3\sqrt2+5)}\)
{{< /details >}}

### Questão 13: a mesma região, quatro eixos

Região entre o eixo \(y\) e \(x=12(y^2-y^3)\), \(0\le y\le1\). Altura da casca (em \(x\)): \(12(y^2-y^3)\).

**13(a)** Em torno do eixo \(x\).

{{< details title="Resolução" >}}
- **Como pensar:** Faixas horizontais: altura = \(x=12(y^2-y^3)\) (de \(0\) até a curva). O eixo só muda o **raio**. Em torno do eixo \(x\): raio \(y\).
- **Espessura:** \(\Delta y_i\)
- **Raio da casca:** \({y_i^*}\) (distância ao eixo)
- **Altura da casca:** \(12({y_i^*}^2-{y_i^*}^3)\)
- **Volume da casca:** \(2\pi\,({y_i^*})\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) de espessura \(\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({y_i^*})\,(12({y_i^*}^2-{y_i^*}^3))\,\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=2\pi\int_{0}^{1}(y)\,(12(y^2-y^3))\,dy\)
- **Conta:** \(24\pi\int_0^1(y^3-y^4)dy=24\pi\Big(\tfrac14-\tfrac15\Big)\)
- **Resposta:** \(\boxed{\tfrac{6\pi}5}\)
{{< /details >}}

### Questão 14 (b) e (c): triângulo \(2y=x+4,\ y=x,\ x=0\)

Altura da casca: \(\tfrac{x+4}2-x=\tfrac{4-x}2\), \(0\le x\le4\).

**14(b)** Em torno do eixo \(y\).

{{< details title="Resolução" >}}
- **Como pensar:** Eixo \(y\): faixas verticais, raio \(x\). Em cima \(\tfrac{x+4}2\), embaixo \(x\): altura \(\tfrac{4-x}2\).
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \({x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(\tfrac{4-{x_i^*}}{2}\)
- **Volume da casca:** \(2\pi\,({x_i^*})\,(\tfrac{4-{x_i^*}}{2})\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) de espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,({x_i^*})\,(\tfrac{4-{x_i^*}}{2})\,\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=2\pi\int_{0}^{4}(x)\,(\tfrac{4-x}{2})\,dx\)
- **Conta:** \(\pi\int_0^4(4x-x^2)dx=\pi\Big(32-\tfrac{64}3\Big)\)
- **Resposta:** \(\boxed{\tfrac{32\pi}3}\)
{{< /details >}}

**14(c)** Em torno de \(x=4\): raio \(4-x\).

{{< details title="Resolução" >}}
- **Como pensar:** O eixo \(x=4\) fica à direita da região: raio = distância \(4-x\). Mesma altura \(\tfrac{4-x}2\).
- **Espessura:** \(\Delta x_i\)
- **Raio da casca:** \(4-{x_i^*}\) (distância ao eixo)
- **Altura da casca:** \(\tfrac{4-{x_i^*}}{2}\)
- **Volume da casca:** \(2\pi\,(4-{x_i^*})\,(\tfrac{4-{x_i^*}}{2})\,\Delta x_i\), pois a casca aberta é um retângulo \(2\pi r\times h\) de espessura \(\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}2\pi\,(4-{x_i^*})\,(\tfrac{4-{x_i^*}}{2})\,\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=2\pi\int_{0}^{4}(4-x)\,(\tfrac{4-x}{2})\,dx\)
- **Conta:** \(\pi\int_0^4(4-x)^2dx=\pi\Big[-\tfrac{(4-x)^3}3\Big]_0^4\)
- **Resposta:** \(\boxed{\tfrac{64\pi}3}\)
{{< /details >}}
