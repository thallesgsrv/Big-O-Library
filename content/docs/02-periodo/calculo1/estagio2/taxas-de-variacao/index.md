---
title: Taxas de Variação
weight: 4
description: Derivada como velocidade de variação, aplicações em física e taxas relacionadas.
autores:
  - thallesgsrv
date: 2026-10-11
---

## 1. Derivada = taxa de variação instantânea

Se \(f(t)\) muda com o tempo, a **taxa média** entre \(t\) e \(t+\Delta t\) é \(\dfrac{f(t+\Delta t)-f(t)}{\Delta t}\) (inclinação da secante), e a **taxa instantânea** em \(t\) é \(f'(t)\) (inclinação da tangente).

Se \(f(t)\) é a **posição** de uma partícula:

| Grandeza | Derivada |
| --- | --- |
| Velocidade | \(f'(t)\) |
| Aceleração | \(f''(t)\) |
| "Arrancada" (jerk) | \(f'''(t)\) |

**Exemplo 1.** A área de um círculo é \(A=\dfrac\pi4D^2\). Quão rápido \(A\) muda em relação a \(D\) quando \(D=10\)?

\(\dfrac{dA}{dD}=\dfrac\pi4\cdot2D=\dfrac\pi2D\). Em \(D=10\): \(\dfrac\pi2\cdot10=5\pi\).

**Exemplo 2.** Posição \(s(t)=t^3-6t^2+9t\) (m, s).

1. Velocidade: \(v=3t^2-12t+9=3(t^2-4t+3)=3(t-1)(t-3)\). A partícula para em \(t=1\) e \(t=3\).
2. Aceleração: \(a=6t-12\).

## 2. Taxas relacionadas

Várias grandezas variam no tempo e estão ligadas por uma equação. Derivando essa equação **em relação a \(t\)**, ligamos as taxas.

**Receita (siga sempre):**

1. **Desenhe** e dê nomes às variáveis.
2. Escreva o que é **dado** (taxas) e o que é **pedido**.
3. Ache **uma equação** que relacione as variáveis (Pitágoras, volume, trigonometria, semelhança).
4. Se sobrar variável a mais, elimine por **semelhança de triângulos** *antes* de derivar.
5. **Derive em relação a \(t\)** (cadeia!).
6. **Só agora** substitua os valores do instante pedido.

> [!WARNING]
> **Erro clássico:** substituir números (ex.: \(h=6\)) *antes* de derivar. Valores específicos viram constantes e a derivada some.

**Exemplo 3 (a escada).** Uma escada de \(5\) m está encostada na parede. A base se afasta a \(1\) m/s. Com a base a \(3\) m da parede, quão rápido desce o topo?

1. \(x\) = distância da base à parede, \(y\) = altura do topo. Pitágoras: \(x^2+y^2=25\).
2. Derive em \(t\) (cadeia: \(x\) e \(y\) dependem de \(t\)): \(2x\,x'+2y\,y'=0\).
3. No instante: \(x=3\), \(y=\sqrt{25-9}=4\), \(x'=1\).
4. Isole: \(y'=-\dfrac{x\,x'}{y}=-\dfrac{3\cdot1}{4}=-\dfrac34\) m/s.

O sinal negativo significa que desce: **\(\frac34\) m/s**.

**Exemplo 4 (tanque cônico).** Cone invertido de altura \(10\) m e raio da base \(5\) m, enchido a \(9\) m³/s. Quão rápido sobe o nível quando \(h=6\)?

1. Volume: \(V=\tfrac13\pi r^2h\). Tem duas variáveis (\(r\) e \(h\)): elimine uma **antes de derivar**.
2. Semelhança de triângulos: \(\dfrac rh=\dfrac5{10}\), logo \(r=\dfrac h2\).
3. Substitua: \(V=\tfrac13\pi\left(\tfrac h2\right)^2h=\tfrac13\pi\dfrac{h^2}{4}h=\dfrac\pi{12}h^3\).
4. Derive em \(t\): \(\dfrac{dV}{dt}=\dfrac\pi{12}\cdot3h^2\dfrac{dh}{dt}=\dfrac\pi4h^2\dfrac{dh}{dt}\).
5. **Só agora** substitua \(\frac{dV}{dt}=9\) e \(h=6\): \(9=\dfrac\pi4\cdot36\cdot\dfrac{dh}{dt}=9\pi\dfrac{dh}{dt}\).

$$
\frac{dh}{dt}=\frac1\pi\approx0{,}32\ \text{m/s}
$$

**Exemplo 5 (com ângulo).** Um objeto voa a altitude constante de \(12\) km. Visto do chão, o ângulo \(\theta\) com o solo vale \(30^\circ\) e cresce a \(1^\circ\)/s. Com que velocidade horizontal ele se aproxima?

1. Seja \(x\) a distância horizontal: \(\dfrac x{12}=\operatorname{cotg}\theta\), logo \(x=12\operatorname{cotg}\theta\).
2. Derive: \(\dfrac{dx}{dt}=-12\operatorname{cossec}^2\theta\,\dfrac{d\theta}{dt}\).
3. **Unidades:** \(1^\circ/\text{s}=\dfrac\pi{180}\) rad/s. E \(\operatorname{cossec}^2 30^\circ=\dfrac1{\operatorname{sen}^230^\circ}=\dfrac1{(1/2)^2}=4\).
4. Substitua:

$$
\frac{dx}{dt}=-12\cdot4\cdot\frac\pi{180}=-\frac{48\pi}{180}=-\frac{4\pi}{15}\approx-0{,}84\ \text{km/s}
$$

O objeto se aproxima a \(\frac{4\pi}{15}\) km/s.

> [!IMPORTANT]
> Em taxas com ângulos, **sempre use radianos**. As derivadas de \(\operatorname{sen}\), \(\cos\) etc. só valem em radianos.

## 3. Exercícios

**Exercício 1.** Um quadrado tem lado crescendo a \(3\) cm/s. Quão rápido cresce a área quando o lado vale \(10\) cm?

{{< details title="Gabarito" >}}
\(A=\ell^2\), então \(A'=2\ell\,\ell'=2\cdot10\cdot3=\boxed{60\text{ cm}^2/\text{s}}\).
{{< /details >}}

**Exercício 2.** Um balão esférico é inflado a \(100\) cm³/s. Quão rápido cresce o raio quando \(r=5\) cm? (\(V=\frac43\pi r^3\))

{{< details title="Gabarito" >}}
\(V'=4\pi r^2r'\). Então \(100=4\pi\cdot25\cdot r'=100\pi r'\), logo \(r'=\dfrac1\pi\approx0{,}32\) cm/s.
{{< /details >}}

**Exercício 3.** Na escada do Exemplo 3, quão rápido a base se afasta se o topo está a \(4\) m e desce a \(2\) m/s?

{{< details title="Gabarito" >}}
Com \(y=4\), \(x=3\). De \(2xx'+2yy'=0\): \(x'=-\dfrac{y\,y'}{x}=-\dfrac{4(-2)}{3}=\dfrac83\) m/s.
{{< /details >}}

**Exercício 4.** \(s(t)=t^3-3t\). Em que instante a aceleração é nula e qual a velocidade nele?

{{< details title="Gabarito" >}}
\(v=3t^2-3\), \(a=6t=0\) em \(t=0\). Então \(v(0)=-3\).
{{< /details >}}
