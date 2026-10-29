---
title: Área entre curvas
weight: 2
description: Área entre dois gráficos integrando em x ou em y, e como lidar com funções definidas por partes e curvas que se cruzam.
autores:
  - thallesgsrv
baseadoEm:
  - rodrigocohen
date: 2026-10-29
---

## Como funciona?

É a mesma construção da página anterior, com um retângulo a mais na cabeça. Entre dois gráficos, cada retângulo da soma de Riemann tem **altura = (curva de cima) − (curva de baixo)** e base \(\Delta x\):

$$
A \approx \sum_{i=1}^{n}\big[f(x_i^*) - g(x_i^*)\big]\,\Delta x
\;\xrightarrow{\,n\to\infty\,}\;
\int_a^b \big[f(x) - g(x)\big]\,dx
\qquad (f \ge g \text{ em } [a,b])
$$

Se a região é descrita **em função de \(y\)** (curvas \(x = f(y)\) e \(x = g(y)\)), os retângulos ficam deitados, com base \(\Delta y\) e comprimento **(curva da direita) − (curva da esquerda)**:

$$
A = \int_c^d \big[f(y) - g(y)\big]\,dy
\qquad (f \ge g \text{ em } [c,d])
$$

## De onde vem a fórmula

Siga o esquema da página [Somas de Riemann e integral definida](../rieman/), agora para a região entre \(y=f(x)\) (em cima) e \(y=g(x)\) (embaixo):

1. **Pedaço simples:** divida \([a,b]\) em partes de largura \(\Delta x\). Em cada parte, escolha \(x_i^*\) e faça um retângulo que vai **da curva de baixo até a de cima**.
2. **Altura do retângulo:** é a distância vertical entre as curvas naquele ponto, \(f(x_i^*)-g(x_i^*)\). Se \(g\) fosse o eixo \(x\) (\(g=0\)), recaímos na área sob \(f\).
3. **Soma de Riemann:** \(\displaystyle\sum_{i=1}^{n}\big[f(x_i^*)-g(x_i^*)\big]\Delta x\). Passando ao limite, vem a integral.

Uma forma de enxergar: a área entre as curvas é a área sob \(f\) **menos** a área sob \(g\). A subtração dentro da integral só junta as duas contas em uma.

Para a descrição em \(y\), o raciocínio é o mesmo girado em 90°: os retângulos ficam **deitados**, de espessura \(\Delta y\), indo da curva da esquerda até a da direita.

## Receita

1. **Desenhe** a região (ou use o GeoGebra) e decida a variável: a descrição é \(y = \ldots\) ou \(x = \ldots\)?
2. **Quem está por cima** (ou à direita) em cada trecho? Se as curvas se cruzam, ache os pontos de cruzamento igualando as expressões.
3. Se a ordem das curvas **troca**, ou se a expressão de alguma delas muda, **quebre o intervalo** em partes: uma integral por trecho.
4. Monte \(\int(\text{de cima} - \text{de baixo})\), integre e calcule com os limites.

> [!WARNING]
> Sempre "de cima menos de baixo". Se você inverter, a integral dá o negativo da área. E se as curvas se cruzam no intervalo, uma única integral de \(f - g\) **cancela** áreas positivas com negativas: quebre nos cruzamentos.

## Exemplos

**Exemplo 1 (integrando em \(x\)).** Área entre \(f(x) = \dfrac{x^2}{4} + 1\) e \(g(x) = -\dfrac{x^2}{4} + x\) em \([0,1]\).

Passo 1. Quem está por cima? Calcule a diferença:

$$
f(x) - g(x) = \frac{x^2}{2} - x + 1
$$

Esse polinômio tem discriminante \((-1)^2 - 4\cdot\tfrac12\cdot1 = -1 < 0\) e coeficiente de \(x^2\) positivo, então é sempre positivo. Logo \(f > g\) em todo o intervalo e as curvas não se cruzam.

Passo 2. Integre:

$$
A = \int_0^1\left(\frac{x^2}{2} - x + 1\right)dx = \left[\frac{x^3}{6} - \frac{x^2}{2} + x\right]_0^1 = \frac16 - \frac12 + 1 = \frac23
$$

**Exemplo 2 (funções definidas por partes).** Área, no intervalo \([0,3]\), entre os gráficos de

$$
f(x) = \begin{cases} 0, & 0 \le x \le 2\\ x - 2, & 2 \le x \le 3\end{cases}
\qquad\text{e}\qquad
g(x) = \begin{cases} x, & 0 \le x \le 1\\ 1, & 1 \le x \le 3\end{cases}
$$

Passo 1. As expressões mudam em \(x = 1\) e em \(x = 2\). Quebre \([0,3]\) em \([0,1]\), \([1,2]\) e \([2,3]\). Em todos os trechos \(g \ge f\), então "de cima" é \(g\).

Passo 2. Uma integral por trecho:

| Trecho | Cima menos baixo | Integral |
| --- | --- | --- |
| \([0,1]\) | \(x - 0\) | \(\displaystyle\int_0^1 x\,dx = \tfrac12\) |
| \([1,2]\) | \(1 - 0\) | \(\displaystyle\int_1^2 1\,dx = 1\) |
| \([2,3]\) | \(1 - (x-2) = 3 - x\) | \(\displaystyle\int_2^3 (3-x)\,dx = \Big[3x - \tfrac{x^2}{2}\Big]_2^3 = \tfrac12\) |

$$
A = \frac12 + 1 + \frac12 = 2
$$

Este é o caso em que a resposta à pergunta "quantas integrais?" é **três**.

**Exemplo 3 (integrando em \(y\)).** Área entre \(f(y) = \operatorname{sen} y + 4\) e \(g(y) = \cos y + 1\) em \([0,1]\), vistas como curvas \(x = f(y)\) e \(x = g(y)\).

Passo 1. A variável é \(y\). A curva da direita é a de maior \(x\): \(f(y) - g(y) = \operatorname{sen} y - \cos y + 3\). Como \(\operatorname{sen} y - \cos y \ge -\sqrt2\), a diferença é pelo menos \(3 - \sqrt2 > 0\). Logo \(f\) fica sempre à direita de \(g\).

Passo 2. Integre em \(y\):

$$
A = \int_0^1 (\operatorname{sen} y - \cos y + 3)\,dy = \Big[-\cos y - \operatorname{sen} y + 3y\Big]_0^1 = (3 - \cos 1 - \operatorname{sen} 1) - (-1) = 4 - \cos 1 - \operatorname{sen} 1 \approx 2{,}62
$$

> [!NOTE]
> Aqui a variável de integração é \(y\) porque o problema foi descrito em \(y\): os limites \([0,1]\) são valores de \(y\) e o \(dy\) aparece na integral.

## Exercícios propostos

**Exercício 1.** Calcule a área entre \(y = \operatorname{sen} x\) e \(y = \cos x\) em \([0, \tfrac\pi2]\).

{{< details title="Gabarito" >}}
Passo 1. As curvas se cruzam quando \(\operatorname{sen}x = \cos x\), isto é, em \(x = \dfrac\pi4\). Antes disso \(\cos x\) está por cima; depois, \(\operatorname{sen} x\). Quebre em \(\dfrac\pi4\).

Passo 2. Duas integrais:

$$
A = \int_0^{\pi/4}(\cos x - \operatorname{sen} x)\,dx + \int_{\pi/4}^{\pi/2}(\operatorname{sen} x - \cos x)\,dx
$$

Passo 3. Primitivas: \(\operatorname{sen}x + \cos x\) para a primeira e \(-\cos x - \operatorname{sen}x\) para a segunda.

$$
\Big[\operatorname{sen}x + \cos x\Big]_0^{\pi/4} = \sqrt2 - 1
\qquad
\Big[-\cos x - \operatorname{sen}x\Big]_{\pi/4}^{\pi/2} = -1 - (-\sqrt2) = \sqrt2 - 1
$$

$$
A = 2\sqrt2 - 2
$$
{{< /details >}}

**Exercício 2.** Calcule a área da região limitada por \(x = y^2\) e \(x = 2 - y\).

{{< details title="Gabarito" >}}
Passo 1. Cruzamentos: \(y^2 = 2 - y \Rightarrow y^2 + y - 2 = 0 \Rightarrow y = -2\) ou \(y = 1\).

Passo 2. A descrição é em \(x\) como função de \(y\), então integre em \(y\). Em \(y = 0\): \(2 - y = 2\) e \(y^2 = 0\), logo a reta \(x = 2 - y\) fica à direita da parábola.

Passo 3.

$$
A = \int_{-2}^{1}\big[(2 - y) - y^2\big]\,dy = \Big[2y - \frac{y^2}{2} - \frac{y^3}{3}\Big]_{-2}^{1} = \frac76 - \left(-\frac{10}{3}\right) = \frac92
$$
{{< /details >}}

{{< quiz titulo="Área entre curvas" >}}

{{< questao >}}
Entre \(y = f(x)\) e \(y = g(x)\) em \([a,b]\), com \(f \ge g\), a área é:

- [ ] \(\int_a^b \big[g(x) - f(x)\big]\,dx\)
- [x] \(\int_a^b \big[f(x) - g(x)\big]\,dx\)
- [ ] \(\int_a^b f(x)\,dx - g(b)\)
- [ ] \(\big|\int_a^b f(x)\,dx\big| + \big|\int_a^b g(x)\,dx\big|\)
---
Altura de cada retângulo: curva de cima menos curva de baixo.
{{< /questao >}}

{{< questao >}}
Duas curvas se cruzam no meio do intervalo de integração. O que fazer?

- [ ] Integrar \(f - g\) em todo o intervalo; o resultado já é a área
- [x] Quebrar o intervalo no ponto de cruzamento e, em cada trecho, usar cima menos baixo
- [ ] Trocar a variável de integração
- [ ] Nada: nesse caso a área é zero
---
Se a ordem das curvas troca, \(f - g\) muda de sinal e áreas se cancelariam. Quebrar no cruzamento evita isso.
{{< /questao >}}

{{< questao >}}
As curvas são dadas como \(x = f(y)\) e \(x = g(y)\). A integral da área é feita em:

- [ ] \(x\), com \(dx\)
- [x] \(y\), com \(dy\)
- [ ] qualquer variável, é indiferente
- [ ] \(t\), porque é uma curva paramétrica
---
A variável usada para descrever o problema é a variável de integração.
{{< /questao >}}

{{< /quiz >}}
