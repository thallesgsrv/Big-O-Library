---
title: Volume por discos e anéis
weight: 3
description: Fatiar, aproximar e somar, volume de sólidos de revolução com discos e anéis.
autores:
  - thallesgsrv
date: 2026-11-16
---

## 1. A ideia: fatiar, aproximar, somar

Como medir o volume de um sólido que não é caixa nem cilindro? Fatie em pedaços finos, trate cada pedaço como algo que você sabe medir, some e faça as fatias ficarem infinitamente finas. É a mesma ideia da soma de Riemann, só que agora cada retângulo vira uma **fatia 3D**.

Ao final você deve conseguir:

- explicar a ideia de fatiar, aproximar e somar para montar volumes de revolução;
- usar o método dos discos quando a região encosta no eixo de rotação;
- usar o método dos anéis (arruelas) quando sobra um buraco no meio;
- montar a integral certa para cada eixo de rotação.

> [!NOTE]
> **Antes de começar, ajuda ter à mão:**
>
> - a página de [Somas de Riemann e integral definida](../rieman/);
> - a página de [Área entre curvas](../area-entre-curvas/);
> - área do círculo e volume do cilindro.

> [!IMPORTANT]
> **Receita (use em toda questão, sempre nesta ordem):**
> 1. **Esboço:** desenhe a região e o eixo de rotação.
> 2. **Espessura** da fatia: \(\Delta x_i\) ou \(\Delta y_i\).
> 3. **Raio** (ou **base** e **altura**) da fatia.
> 4. **Volume da fatia** = área da face \(\times\) espessura.
> 5. **Aproximação do sólido:** \(\sum\) dos volumes das fatias.
> 6. **Volume do sólido:** \(\lim_{n\to\infty}\sum\) = integral. Depois, a conta.

### Aquecimento: fatias que não são discos

Sólido com base no triângulo sob \(y=1-x\), \(0\le x\le1\), cujas fatias perpendiculares ao eixo \(x\) são triângulos retângulos isósceles, com um cateto na região.

- **Como pensar:** em cada \(x\), a região tem altura \(1-x\) (a reta). Esse segmento é o cateto da fatia, e como o triângulo é isósceles, o outro cateto também vale \(1-x\).
- **Espessura:** \(\Delta x_i\)
- **Base:** \(1-x_i^*\)  **Altura:** \(1-x_i^*\)
- **Volume da fatia:** área do triângulo \(\times\) espessura \(=\dfrac{(1-x_i^*)^2}{2}\Delta x_i\) (área \(=\tfrac{\text{base}\cdot\text{altura}}2\))
- **Aproximação:** \(\displaystyle\sum_{i=1}^{n}\frac12(1-x_i^*)^2\Delta x_i\)
- **Volume do sólido:** \(V=\displaystyle\int_0^1\frac12(1-x)^2dx\). Primitiva (regra da cadeia ao contrário): \(-\dfrac{(1-x)^3}{6}\). Em \(1\): \(0\). Em \(0\): \(-\tfrac16\). Logo \(0-(-\tfrac16)=\boxed{\tfrac16}\)

### Quatro perguntas para montar qualquer integral de volume

1. **Em torno de quê gira?** Se é \(x\) ou uma reta horizontal, a espessura é \(\Delta x\) (disco/anel) e as curvas entram como \(y=\ldots\). Se é \(y\) ou uma reta vertical, a espessura é \(\Delta y\) e as curvas entram como \(x=\ldots\).
2. **A região encosta no eixo?** Sim: **disco** (um raio). Não: **anel** (raio externo e interno).
3. **Qual é o raio?** A **distância** da curva ao eixo, nunca só a posição da curva.
4. **Quais são os limites?** Onde a região começa e termina na variável da espessura, achados **igualando as curvas** quando elas se cruzam.

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

Até aqui, tranquilo? Para não se perder: **disco** quando a região encosta no eixo de giro, **anel** quando sobra um buraco no meio.

## 4. Exemplos resolvidos

**Exemplo 1.** \(y=\sqrt x,\ 0\le x\le4\), em torno do eixo \(x\).

- **Como pensar:** A curva \(\sqrt x\) sobe de \(0\) a \(2\) e a região está **colada** no eixo \(x\): não há buraco, então a fatia é um **disco**. O raio é a altura da curva, \(\sqrt x\). Limites: os do enunciado.
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(\sqrt{{x_i^*}}\)
- **Volume da fatia:** \(\pi\big(\sqrt{{x_i^*}}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt{{x_i^*}}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{4}\big(\sqrt{x}\big)^2\,dx\)
- **Conta:** \(\pi\int_0^4x\,dx=\pi\Big[\tfrac{x^2}2\Big]_0^4\)
- **Resposta:** \(\boxed{8\pi}\)

**Exemplo 2 (esfera).** Círculo \(x^2+y^2=a^2\) em torno do eixo \(x\): \(y=\sqrt{a^2-x^2}\), \(-a\le x\le a\).

- **Como pensar:** Só a metade de cima do círculo, \(y=\sqrt{a^2-x^2}\), basta: ao girar ela gera a esfera inteira. Vai de \(-a\) a \(a\) (onde \(y=0\)) e o raio é a altura do semicírculo. O quadrado **desfaz a raiz**.
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(\sqrt{a^2-{x_i^*}^2}\)
- **Volume da fatia:** \(\pi\big(\sqrt{a^2-{x_i^*}^2}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt{a^2-{x_i^*}^2}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{-a}^{a}\big(\sqrt{a^2-x^2}\big)^2\,dx\)
- **Conta:** \(\pi\int_{-a}^{a}(a^2-x^2)dx=\pi\Big[a^2x-\tfrac{x^3}3\Big]_{-a}^{a}=\pi\Big(2a^3-\tfrac{2a^3}3\Big)\)
- **Resposta:** \(\boxed{\tfrac43\pi a^3}\)

**Exemplo 3.** Primeiro quadrante entre \(y=x^2\), \(y=-x+2\) e o eixo \(x\), em torno do eixo \(x\). As curvas se cruzam em \(x=1\) (\(x^2=2-x\)): a região tem **duas partes**, uma por regra.

- **Como pensar:** Veja a região: sobe pela parábola até \(x=1\) e desce pela reta até \(x=2\). Como a curva de cima **muda** em \(x=1\), cada trecho tem sua integral. Os dois trechos encostam no eixo \(x\): discos.
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(x_i^{*2}\) se \(0\le x\le1\); \(2-x_i^*\) se \(1\le x\le2\)
- **Volume da fatia:** \(\pi\,x_i^{*4}\,\Delta x_i\) ou \(\pi(2-x_i^*)^2\Delta x_i\)
- **Aproximação do sólido:** \(\sum\pi\,x_i^{*4}\Delta x_i+\sum\pi(2-x_i^*)^2\Delta x_i\)
- **Volume do sólido:** \(\pi\int_0^1x^4dx+\pi\int_1^2(2-x)^2dx=\pi\Big(\tfrac15+\tfrac13\Big)=\boxed{\tfrac{8\pi}{15}}\)

**Exemplo 4.** Região entre o eixo \(y\) e \(x=\dfrac2y\), \(1\le y\le4\), em torno do eixo \(y\).

- **Como pensar:** Gira em torno de \(y\), então as fatias ficam **deitadas** e a espessura é \(\Delta y\). Por isso a curva precisa estar como \(x\) em função de \(y\): já está. O raio de cada disco é a distância ao eixo \(y\), isto é, o próprio \(x=\tfrac2y\). Em cada fatia, o raio é \(\tfrac{2}{y_i^*}\) e o volume do disco é \(\pi\big(\tfrac2{y_i^*}\big)^2\Delta y_i\).
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(\tfrac{2}{{y_i^*}}\)
- **Volume da fatia:** \(\pi\big(\tfrac{2}{{y_i^*}}\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\tfrac{2}{{y_i^*}}\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{1}^{4}\big(\tfrac{2}{y}\big)^2\,dy\)
- **Conta:** \(4\pi\int_1^4y^{-2}dy=4\pi\Big[-\tfrac1y\Big]_1^4=4\pi\Big(-\tfrac14+1\Big)\)
- **Resposta:** \(\boxed{3\pi}\)

**Exemplo 5.** Região entre \(y=\sqrt x\), \(y=1\) e \(x=4\), em torno de \(y=1\) (\(1\le x\le4\)).

- **Como pensar:** A reta \(y=1\) é a **borda** da região (a curva \(\sqrt x\) fica acima dela). Raio = distância da curva até o eixo \(y=1\): \(\sqrt x-1\). Limites: \(\sqrt x=1\Rightarrow x=1\) até \(x=4\). O eixo sendo a borda, é disco.
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(\sqrt{{x_i^*}}-1\)
- **Volume da fatia:** \(\pi\big(\sqrt{{x_i^*}}-1\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt{{x_i^*}}-1\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{1}^{4}\big(\sqrt{x}-1\big)^2\,dx\)
- **Conta:** \(\pi\int_1^4(x-2\sqrt x+1)dx=\pi\Big[\tfrac{x^2}2-\tfrac{4x^{3/2}}3+x\Big]_1^4=\pi\Big(\tfrac{15}2-\tfrac{28}3+3\Big)\)
- **Resposta:** \(\boxed{\tfrac{7\pi}{6}}\)

**Exemplo 6.** Região entre \(x=y^2+1\) e \(x=3\), em torno de \(x=3\) (\(-\sqrt2\le y\le\sqrt2\)).

- **Como pensar:** A reta \(x=3\) é a borda direita e a parábola a esquerda. Cruzam em \(y^2+1=3\Rightarrow y=\pm\sqrt2\). Eixo vertical: fatias deitadas, \(dy\). Raio = distância até \(x=3\): \(3-(y^2+1)=2-y^2\). A região é simétrica, então \(\int_{-\sqrt2}^{\sqrt2}=2\int_0^{\sqrt2}\).
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(2-{y_i^*}^2\)
- **Volume da fatia:** \(\pi\big(2-{y_i^*}^2\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(2-{y_i^*}^2\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{-\sqrt2}^{\sqrt2}\big(2-y^2\big)^2\,dy\)
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

Resolva primeiro, abra depois.

### Questão 1: eixo \(x\)

**1(a)** Região sob \(x+2y=2\), \(0\le x\le2\).

{{< details title="Resolução" >}}
- **Como pensar:** A reta \(y=1-\tfrac x2\) vai de \(1\) a \(0\) e a região encosta no eixo \(x\): disco de raio igual à altura da reta.
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(1-\tfrac{{x_i^*}}{2}\)
- **Volume da fatia:** \(\pi\big(1-\tfrac{{x_i^*}}{2}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(1-\tfrac{{x_i^*}}{2}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{2}\big(1-\tfrac{x}{2}\big)^2\,dx\)
- **Conta:** \(\pi\int_0^2\Big(1-x+\tfrac{x^2}4\Big)dx=\pi\Big[x-\tfrac{x^2}2+\tfrac{x^3}{12}\Big]_0^2\)
- **Resposta:** \(\boxed{\tfrac{2\pi}3}\)
{{< /details >}}

**1(b)** Região sob \(y=\operatorname{sen}x\cos x\), \(0\le x\le\pi/2\).

{{< details title="Resolução" >}}
- **Como pensar:** Uma colina sobre o eixo \(x\): disco de raio \(f(x)\). Para integrar, \(\operatorname{sen}x\cos x=\tfrac12\operatorname{sen}2x\), logo o quadrado é \(\tfrac14\operatorname{sen}^22x\), e \(\operatorname{sen}^2u=\tfrac{1-\cos2u}2\).
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \(\operatorname{sen}{x_i^*}\cos{{x_i^*}}\)
- **Volume da fatia:** \(\pi\big(\operatorname{sen}{x_i^*}\cos{{x_i^*}}\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\operatorname{sen}{x_i^*}\cos{{x_i^*}}\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{\pi/2}\big(\operatorname{sen}x\cos{x}\big)^2\,dx\)
- **Conta:** \(\pi\int_0^{\pi/2}\tfrac{\operatorname{sen}^22x}{4}dx=\tfrac\pi8\int_0^{\pi/2}(1-\cos4x)dx=\tfrac\pi8\cdot\tfrac\pi2\)
- **Resposta:** \(\boxed{\tfrac{\pi^2}{16}}\)
{{< /details >}}

### Questão 2: eixo \(y\)

**2(a)** Região entre o eixo \(y\) e \(x=\tfrac{3y}2\), \(0\le y\le2\).

{{< details title="Resolução" >}}
- **Como pensar:** Eixo \(y\): fatias deitadas (\(dy\)) e \(x\) em função de \(y\), que já está. Raio = \(x=\tfrac{3y}2\).
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(\tfrac{3{y_i^*}}{2}\)
- **Volume da fatia:** \(\pi\big(\tfrac{3{y_i^*}}{2}\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\tfrac{3{y_i^*}}{2}\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{2}\big(\tfrac{3y}{2}\big)^2\,dy\)
- **Conta:** \(\pi\int_0^2\tfrac{9y^2}4dy=\tfrac{9\pi}4\cdot\tfrac83\)
- **Resposta:** \(\boxed{6\pi}\)
{{< /details >}}

**2(b)** Região entre o eixo \(y\) e \(x=\operatorname{tg}\big(\tfrac\pi4y\big)\), \(0\le y\le1\).

{{< details title="Resolução" >}}
- **Como pensar:** Igual: raio \(x=\operatorname{tg}\big(\tfrac\pi4y\big)\). Para integrar \(\operatorname{tg}^2\), use \(\operatorname{tg}^2=\sec^2-1\); a primitiva de \(\sec^2\tfrac{\pi y}4\) leva o fator \(\tfrac4\pi\).
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(\operatorname{tg}\big(\tfrac\pi4{y_i^*}\big)\)
- **Volume da fatia:** \(\pi\big(\operatorname{tg}\big(\tfrac\pi4{y_i^*}\big)\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\operatorname{tg}\big(\tfrac\pi4{y_i^*}\big)\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{1}\big(\operatorname{tg}\big(\tfrac\pi4y\big)\big)^2\,dy\)
- **Conta:** \(\pi\int_0^1\big(\sec^2\tfrac{\pi y}4-1\big)dy=\pi\Big[\tfrac4\pi\operatorname{tg}\tfrac{\pi y}4-y\Big]_0^1=\pi\Big(\tfrac4\pi-1\Big)\)
- **Resposta:** \(\boxed{4-\pi}\)
{{< /details >}}

### Questão 3: eixo \(x\), região entre a curva e \(y=0\)

**3(a)** \(y=x^2,\ y=0,\ x=2\).

{{< details title="Resolução" >}}
- **Como pensar:** Região sob a parábola, colada no eixo \(x\): disco de raio \(x^2\). Quadrado: \(x^4\).
- **Espessura:** \(\Delta x_i\)
- **Raio do disco:** \({x_i^*}^2\)
- **Volume da fatia:** \(\pi\big({x_i^*}^2\big)^2\,\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big({x_i^*}^2\big)^2\,\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{2}\big(x^2\big)^2\,dx\)
- **Conta:** \(\pi\int_0^2x^4dx=\pi\tfrac{32}5\)
- **Resposta:** \(\boxed{\tfrac{32\pi}5}\)
{{< /details >}}

### Questão 4: eixo \(y\)

**4(a)** \(x=\sqrt5\,y^2,\ x=0,\ y=\pm1\).

{{< details title="Resolução" >}}
- **Como pensar:** Eixo \(y\): fatias deitadas, raio \(x=\sqrt5y^2\), \(y\) de \(-1\) a \(1\). Quadrado: \(5y^4\).
- **Espessura:** \(\Delta y_i\)
- **Raio do disco:** \(\sqrt5\,{y_i^*}^2\)
- **Volume da fatia:** \(\pi\big(\sqrt5\,{y_i^*}^2\big)^2\,\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\big(\sqrt5\,{y_i^*}^2\big)^2\,\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{-1}^{1}\big(\sqrt5\,y^2\big)^2\,dy\)
- **Conta:** \(\pi\int_{-1}^15y^4dy=\pi\cdot2\)
- **Resposta:** \(\boxed{2\pi}\)
{{< /details >}}

### Questão 5: eixo \(x\), com anéis

Achou os cruzamentos? Igualar as curvas dá os limites.

**5(a)** \(y=x,\ y=1,\ x=0\).

{{< details title="Resolução" >}}
- **Como pensar:** Entre \(y=x\) (embaixo) e \(y=1\) (em cima) há um espaço até o eixo \(x\): a região **não encosta** nele, então a fatia é um **anel**. Raio externo = curva mais longe do eixo, \(1\); interno = mais perto, \(x\).
- **Espessura:** \(\Delta x_i\)
- **Raios do anel:** externo \(R=1\), interno \(r={x_i^*}\)
- **Volume da fatia:** \(\pi\Big[\big(1\big)^2-\big({x_i^*}\big)^2\Big]\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(1\big)^2-\big({x_i^*}\big)^2\Big]\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{1}\Big[\big(1\big)^2-\big(x\big)^2\Big]dx\)
- **Conta:** \(\pi\int_0^1(1-x^2)dx=\pi\Big(1-\tfrac13\Big)\)
- **Resposta:** \(\boxed{\tfrac{2\pi}3}\)
{{< /details >}}

### Questão 6: eixo \(y\), por anéis (fatias horizontais)

**6(a)** Triângulo de vértices \((1,0),(2,1),(1,1)\).

{{< details title="Resolução" >}}
- **Como pensar:** Esboce o triângulo: lado vertical \(x=1\), topo \(y=1\), hipotenusa \(y=x-1\), isto é, \(x=y+1\). Eixo \(y\): fatias deitadas. A região não toca o eixo \(y\): anel com externo \(y+1\) e interno \(1\).
- **Espessura:** \(\Delta y_i\)
- **Raios do anel:** externo \(R={y_i^*}+1\), interno \(r=1\)
- **Volume da fatia:** \(\pi\Big[\big({y_i^*}+1\big)^2-\big(1\big)^2\Big]\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big({y_i^*}+1\big)^2-\big(1\big)^2\Big]\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{1}\Big[\big(y+1\big)^2-\big(1\big)^2\Big]dy\)
- **Conta:** \(\pi\int_0^1(y^2+2y)dy=\pi\Big(\tfrac13+1\Big)\)
- **Resposta:** \(\boxed{\tfrac{4\pi}3}\)
{{< /details >}}

### Questões 7 e 8: eixo deslocado

**7** Região sob \(y=x^2\), \(0\le x\le1\), em torno de \(x=-1\).

{{< details title="Resolução" >}}
- **Como pensar:** Região: \(0\le y\le x^2\), \(x\le1\). Para cada \(y\in[0,1]\), \(x\) vai de \(\sqrt y\) a \(1\). O eixo \(x=-1\) fica **fora** da região, então o raio é a **distância até ele**: distâncias: externo \(1+1=2\), interno \(\sqrt y+1\). Há buraco: anel.
- **Espessura:** \(\Delta y_i\)
- **Raios do anel:** externo \(R=2\), interno \(r=\sqrt{{y_i^*}}+1\)
- **Volume da fatia:** \(\pi\Big[\big(2\big)^2-\big(\sqrt{{y_i^*}}+1\big)^2\Big]\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(2\big)^2-\big(\sqrt{{y_i^*}}+1\big)^2\Big]\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{1}\Big[\big(2\big)^2-\big(\sqrt{y}+1\big)^2\Big]dy\)
- **Conta:** \(\pi\int_0^1(3-2\sqrt y-y)dy=\pi\Big(3-\tfrac43-\tfrac12\Big)\)
- **Resposta:** \(\boxed{\tfrac{7\pi}6}\)
{{< /details >}}

**8** Região no 2º quadrante sob \(y=-x^3\), \(-1\le x\le0\), em torno de \(x=-2\).

{{< details title="Resolução" >}}
- **Como pensar:** Região: \(-1\le x\le0\), \(0\le y\le-x^3\). Para cada \(y\in[0,1]\), \(x\) vai de \(-1\) a \(-\sqrt[3]y\). O eixo \(x=-2\) fica à esquerda. A distância de \(x\) até \(-2\) é \(x+2\). Isolando \(x\) na curva: \(y=-x^3\Rightarrow x=-\sqrt[3]y\), logo a distância é \(2-\sqrt[3]y\).
- **Espessura:** \(\Delta y_i\)
- **Raios do anel:** externo \(R=2-{y_i^*}^{1/3}\), interno \(r=1\)
- **Volume da fatia:** \(\pi\Big[\big(2-{y_i^*}^{1/3}\big)^2-\big(1\big)^2\Big]\Delta y_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(2-{y_i^*}^{1/3}\big)^2-\big(1\big)^2\Big]\Delta y_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{1}\Big[\big(2-y^{1/3}\big)^2-\big(1\big)^2\Big]dy\)
- **Conta:** \(\pi\int_0^1\big(3-4y^{1/3}+y^{2/3}\big)dy=\pi\Big(3-3+\tfrac35\Big)\)
- **Resposta:** \(\boxed{\tfrac{3\pi}5}\)
{{< /details >}}

### Questão 14 (a) e (d): triângulo \(2y=x+4,\ y=x,\ x=0\)

Vértices \((0,0),(0,2),(4,4)\). Em \(0\le x\le4\), a reta de cima é \(y=\tfrac{x+4}2\) e a de baixo é \(y=x\).

**14(a)** Em torno do eixo \(x\).

{{< details title="Resolução" >}}
- **Como pensar:** Esboce: vértices \((0,0),(0,2),(4,4)\). Para cada \(x\), a região vai da reta \(y=x\) (embaixo) até \(y=\tfrac{x+4}2\) (em cima), sem tocar o eixo \(x\): anel. Externo = reta de cima, interno = reta de baixo.
- **Espessura:** \(\Delta x_i\)
- **Raios do anel:** externo \(R=\tfrac{{x_i^*}+4}{2}\), interno \(r={x_i^*}\)
- **Volume da fatia:** \(\pi\Big[\big(\tfrac{{x_i^*}+4}{2}\big)^2-\big({x_i^*}\big)^2\Big]\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(\tfrac{{x_i^*}+4}{2}\big)^2-\big({x_i^*}\big)^2\Big]\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{4}\Big[\big(\tfrac{x+4}{2}\big)^2-\big(x\big)^2\Big]dx\)
- **Conta:** \(\pi\int_0^4\Big[\tfrac{(x+4)^2}4-x^2\Big]dx=\pi\Big(\tfrac{448}{12}-\tfrac{64}3\Big)\)
- **Resposta:** \(\boxed{16\pi}\)
{{< /details >}}

**14(d)** Em torno de \(y=8\).

{{< details title="Resolução" >}}
- **Como pensar:** O eixo \(y=8\) está **acima** da região, então a curva mais longe dele é a de **baixo** (\(y=x\)): externo \(8-x\), interno \(8-\tfrac{x+4}2=6-\tfrac x2\).
- **Espessura:** \(\Delta x_i\)
- **Raios do anel:** externo \(R=8-{x_i^*}\), interno \(r=8-\tfrac{{x_i^*}+4}{2}\)
- **Volume da fatia:** \(\pi\Big[\big(8-{x_i^*}\big)^2-\big(8-\tfrac{{x_i^*}+4}{2}\big)^2\Big]\Delta x_i\)
- **Aproximação do sólido:** \(\sum_{i=1}^{n}\pi\Big[\big(8-{x_i^*}\big)^2-\big(8-\tfrac{{x_i^*}+4}{2}\big)^2\Big]\Delta x_i\)
- **Volume do sólido:** \(V=\lim_{n\to\infty}(\text{aproximação})=\pi\int_{0}^{4}\Big[\big(8-x\big)^2-\big(8-\tfrac{x+4}{2}\big)^2\Big]dx\)
- **Conta:** \(\pi\int_0^4\Big[(8-x)^2-\big(6-\tfrac x2\big)^2\Big]dx=\pi\Big(\tfrac{448}3-\tfrac{304}3\Big)\)
- **Resposta:** \(\boxed{48\pi}\)
{{< /details >}}
