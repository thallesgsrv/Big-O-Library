---
title: Taxas de Variação
weight: 4
description: Derivada como velocidade de variação, aplicações em física e taxas relacionadas.
autores:
  - thallesgsrv
date: 2026-10-11
---

## 1. Derivada = taxa de variação instantânea

Se $f(t)$ muda com o tempo (ou com qualquer outra variável), então:

- **Taxa média** entre $t$ e $t+\Delta t$: $\dfrac{f(t+\Delta t)-f(t)}{\Delta t}$ (inclinação da secante).
- **Taxa instantânea** em $t$: $f'(t)$ (inclinação da tangente).

Se $f(t)$ é a **posição** de uma partícula:

| Grandeza | Derivada |
| --- | --- |
| Velocidade | $f'(t)$ |
| Aceleração | $f''(t)$ |
| "Arrancada" (jerk) | $f'''(t)$ |

Outros exemplos: corrente elétrica é a taxa de variação da carga no tempo; potência é a taxa de variação da energia no tempo.

**Exemplo 1.** A área de um círculo é $A=\dfrac{\pi}{4}D^2$. Quão rápido $A$ muda em relação a $D$ quando $D=10$?
$$
\frac{dA}{dD}=\frac{\pi}{2}D\ \Rightarrow\ \frac{dA}{dD}\Big|_{D=10}=5\pi
$$

**Exemplo 2.** Posição $s(t)=t^3-6t^2+9t$ (m, s). Velocidade $v=3t^2-12t+9=3(t-1)(t-3)$: a partícula para em $t=1$ e $t=3$. Aceleração $a=6t-12$.

## 2. Taxas relacionadas

Várias grandezas variam no tempo e estão ligadas por uma equação. Derivando essa equação **em relação a $t$**, ligamos as taxas.

### Receita (siga sempre)

1. **Desenhe** e dê nomes às variáveis ($x$, $y$, $h$, $r$, $\theta$...).
2. Escreva o que é **dado** (taxas) e o que é **pedido**.
3. Ache **uma equação** que relacione as variáveis (Pitágoras, volume, trigonometria, semelhança).
4. Se sobrar variável a mais, elimine por **semelhança de triângulos** *antes* de derivar.
5. **Derive em relação a $t$** (cadeia!).
6. **Só agora** substitua os valores do instante pedido.

> [!WARNING]
> **Erro clássico:** substituir números (ex.: $h=6$) *antes* de derivar. Valores específicos viram constantes e a derivada some.

### Exemplo 3: escada

Escada de $5\,\text{m}$ encostada na parede. A base se afasta a $1\,\text{m/s}$. Com a base a $3\,\text{m}$ da parede, quão rápido desce o topo?

$x^2+y^2=25$. Derivando: $2x\,x'+2y\,y'=0$. Em $x=3$ temos $y=4$:
$$
y'=-\frac{x\,x'}{y}=-\frac{3\cdot1}{4}=-\frac34\ \text{m/s}
$$
(o sinal negativo significa que desce).

### Exemplo 4: tanque cônico

Tanque em forma de cone invertido, altura $10\,\text{m}$, raio da base $5\,\text{m}$, sendo enchido a $9\,\text{m}^3/\text{s}$. Quão rápido sobe o nível quando $h=6$?

Volume: $V=\tfrac13\pi r^2h$. Semelhança: $\dfrac rh=\dfrac5{10}\Rightarrow r=\dfrac h2$. Logo
$$
V=\frac13\pi\frac{h^2}{4}h=\frac{\pi}{12}h^3\ \Rightarrow\ \frac{dV}{dt}=\frac{\pi}{4}h^2\frac{dh}{dt}
$$
Com $h=6$: $9=\dfrac{\pi}{4}\cdot36\cdot\dfrac{dh}{dt}=9\pi\dfrac{dh}{dt}\Rightarrow\dfrac{dh}{dt}=\dfrac1\pi\approx0{,}32\ \text{m/s}$.

### Exemplo 5: ângulo

Um objeto voa a altitude constante de $12\,\text{km}$. Visto de um ponto no chão, o ângulo $\theta$ com o solo vale $30^\circ$ e cresce a $1^\circ/\text{s}$. Com que velocidade horizontal ele se aproxima?

Seja $x$ a distância horizontal: $\dfrac{x}{12}=\operatorname{cotg}\theta\Rightarrow x=12\operatorname{cotg}\theta$.
$$
\frac{dx}{dt}=-12\csc^2\theta\,\frac{d\theta}{dt}
$$
**Atenção às unidades:** $1^\circ/\text{s}=\dfrac{\pi}{180}\,\text{rad/s}$. Com $\csc^2 30^\circ=4$:
$$
\frac{dx}{dt}=-12\cdot4\cdot\frac{\pi}{180}=-\frac{4\pi}{15}\approx-0{,}84\ \text{km/s}
$$
O objeto se aproxima a $\dfrac{4\pi}{15}$ km/s.

> [!IMPORTANT]
> Em taxas com ângulos, **sempre use radianos**. Derivadas de $\operatorname{sen}$, $\cos$ etc. só valem em radianos.

## Exercícios propostos

**Exercício 1.** Um quadrado tem lado crescendo a $3\,\text{cm/s}$. Quão rápido cresce a área quando o lado vale $10\,\text{cm}$?

{{< details title="Gabarito" >}}
$A=\ell^2\Rightarrow A'=2\ell\,\ell'=2\cdot10\cdot3=60\ \text{cm}^2/\text{s}$.
{{< /details >}}

**Exercício 2.** Um balão esférico é inflado a $100\,\text{cm}^3/\text{s}$. Quão rápido cresce o raio quando $r=5\,\text{cm}$? ($V=\tfrac43\pi r^3$)

{{< details title="Gabarito" >}}
$V'=4\pi r^2r'\Rightarrow100=4\pi\cdot25\cdot r'\Rightarrow r'=\dfrac1\pi\approx0{,}32\ \text{cm/s}$.
{{< /details >}}

**Exercício 3.** Na escada do Exemplo 3, quão rápido a base se afasta se o topo está a $4\,\text{m}$ e desce a $2\,\text{m/s}$?

{{< details title="Gabarito" >}}
$x=3$ quando $y=4$. De $2xx'+2yy'=0$: $x'=-\dfrac{y\,y'}{x}=-\dfrac{4(-2)}{3}=\dfrac83\ \text{m/s}$.
{{< /details >}}

**Exercício 4.** A posição de uma partícula é $s(t)=t^3-3t$. Em que instante a aceleração é nula e qual a velocidade nele?

{{< details title="Gabarito" >}}
$v=3t^2-3$, $a=6t=0\Rightarrow t=0$. Então $v(0)=-3$.
{{< /details >}}
