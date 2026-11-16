---
title: Comprimento de arco
weight: 5
description: Medir uma curva, some pedacinhos retos e passe ao limite.
autores:
  - thallesgsrv
date: 2026-11-16
---

## 1. A ideia

Uma curva não tem régua, mas um **pedacinho minúsculo** dela é quase reto. Cada pedaço é a hipotenusa de um triângulo com catetos \(\Delta x_i\) e \(\Delta y_i\):

$$
\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}=\sqrt{1+\Big(\frac{\Delta y_i}{\Delta x_i}\Big)^2}\,\Delta x_i
$$

Somando e passando ao limite, a razão vira a derivada:

$$
L=\lim_{n\to\infty}\sum_{i=1}^n\sqrt{1+[f'(x_i^*)]^2}\,\Delta x_i=\int_a^b\sqrt{1+[f'(x)]^2}\,dx
$$

> [!IMPORTANT]
> **Receita (mesmo padrão):** (1) pedaço \(\Delta s_i\); (2) derivada; (3) radicando \(1+(f')^2\); (4) integral \(\int\sqrt{\cdot}\); (5) conta.
> **Truque que sempre aparece:** \(1+(f')^2\) quase sempre vira um **quadrado perfeito**, e a raiz some. Se não virou, confira a derivada.

- **Curva \(x=g(y)\):** troque tudo: \(L=\int_c^d\sqrt{1+[g'(y)]^2}\,dy\). Use quando \(x=g(y)\) é mais simples.
- **Paramétrica:** \(L=\displaystyle\int_\alpha^\beta\sqrt{(x')^2+(y')^2}\,dt\).

## 2. Exemplos resolvidos (aula)

**Exemplo 1.** \(y=\tfrac{4\sqrt2}3x^{3/2}-1,\ 0\le x\le1\).

- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(y'=2\sqrt2\,\sqrt x\)
- **Radicando:** \(1+8x\)
- **Comprimento:** \(\int_0^1\sqrt{1+8x}\,dx\)
- **Conta:** \(\Big[\tfrac{(1+8x)^{3/2}}{12}\Big]_0^1=\tfrac{27-1}{12}\)
- **Resposta:** \(\boxed{\tfrac{13}6}\)

**Exemplo 2 (o da lousa).** \(f(x)=\tfrac{x^3}{12}+\tfrac1x,\ 1\le x\le4\).

- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(f'(x)=\tfrac{x^2}4-\tfrac1{x^2}\)
- **Radicando:** \(1+\Big(\tfrac{x^2}4-\tfrac1{x^2}\Big)^2=\tfrac{x^4}{16}+\tfrac12+\tfrac1{x^4}=\Big(\tfrac{x^2}4+\tfrac1{x^2}\Big)^2\)
- **Comprimento:** \(\int_1^4\Big(\tfrac{x^2}4+x^{-2}\Big)dx\)
- **Conta:** \(\Big[\tfrac{x^3}{12}-\tfrac1x\Big]_1^4=\Big(\tfrac{16}3-\tfrac14\Big)-\Big(\tfrac1{12}-1\Big)\)
- **Resposta:** \(\boxed{6}\)

> [!TIP]
> O quadrado perfeito aparece assim: \(\big(\tfrac{x^2}4-\tfrac1{x^2}\big)^2\) tem termo do meio \(-2\cdot\tfrac14=-\tfrac12\). Somando o \(1\), vira \(+\tfrac12\), e o resultado é \(\big(\tfrac{x^2}4+\tfrac1{x^2}\big)^2\), com o sinal trocado.

**Exemplo 3.** \(y=(x/2)^{2/3},\ 0\le x\le2\). Derivar em \(x\) dá \(y'\) infinito em \(0\). **Saída:** inverta, \(x=2y^{3/2}\), \(0\le y\le1\).

- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(\tfrac{dx}{dy}=3\sqrt y\)
- **Radicando:** \(1+9y\)
- **Comprimento:** \(\int_0^1\sqrt{1+9y}\,dy\)
- **Conta:** \(\Big[\tfrac{2(1+9y)^{3/2}}{27}\Big]_0^1\)
- **Resposta:** \(\boxed{\tfrac{2}{27}\big(10\sqrt{10}-1\big)}\)

## 3. Lista de exercícios

### Questão 15: paramétricas

Aqui o pedaço é \(\Delta s_i\approx\sqrt{x'^2+y'^2}\,\Delta t_i\) e integra em \(dt\).

**15(a)** \(x=1-t,\ y=2+3t,\ -\tfrac23\le t\le1\).

{{< details title="Resolução" >}}
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{x'^2+y'^2}\,\Delta t_i\)
- **Derivadas:** \(x'=-1,\quad y'=3\)
- **Radicando:** \(1+9=10\)
- **Comprimento:** \(\int_{-2/3}^{1}\sqrt{10}\,dt\)
- **Conta:** \(\sqrt{10}\cdot\tfrac53\)
- **Resposta:** \(\boxed{\tfrac53\sqrt{10}}\)
{{< /details >}}

**15(b)** \(x=\cos t,\ y=t+\operatorname{sen}t,\ 0\le t\le\pi\).

{{< details title="Resolução" >}}
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{x'^2+y'^2}\,\Delta t_i\)
- **Derivadas:** \(x'=-\operatorname{sen}t,\quad y'=1+\cos t\)
- **Radicando:** \(\operatorname{sen}^2t+1+2\cos t+\cos^2t=2+2\cos t=4\cos^2\tfrac t2\)
- **Comprimento:** \(\int_0^\pi2\cos\tfrac t2\,dt\)
- **Conta:** \(\Big[4\operatorname{sen}\tfrac t2\Big]_0^\pi\)
- **Resposta:** \(\boxed{4}\)
{{< /details >}}

**15(c)** \(x=t^3,\ y=\tfrac{3t^2}2,\ 0\le t\le\sqrt3\).

{{< details title="Resolução" >}}
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{x'^2+y'^2}\,\Delta t_i\)
- **Derivadas:** \(x'=3t^2,\quad y'=3t\)
- **Radicando:** \(9t^4+9t^2=9t^2(t^2+1)\)
- **Comprimento:** \(\int_0^{\sqrt3}3t\sqrt{t^2+1}\,dt\)
- **Conta:** \(\Big[(t^2+1)^{3/2}\Big]_0^{\sqrt3}=8-1\)
- **Resposta:** \(\boxed{7}\)
{{< /details >}}

**15(d)** \(x=\tfrac{t^2}2,\ y=\tfrac{(2t+1)^{3/2}}3,\ 0\le t\le4\).

{{< details title="Resolução" >}}
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{x'^2+y'^2}\,\Delta t_i\)
- **Derivadas:** \(x'=t,\quad y'=\sqrt{2t+1}\)
- **Radicando:** \(t^2+2t+1=(t+1)^2\)
- **Comprimento:** \(\int_0^4(t+1)\,dt\)
- **Conta:** \(\Big[\tfrac{t^2}2+t\Big]_0^4=8+4\)
- **Resposta:** \(\boxed{12}\)
{{< /details >}}

**15(e)** \(x=\tfrac{(2t+3)^{3/2}}3,\ y=t+\tfrac{t^2}2,\ 0\le t\le3\).

{{< details title="Resolução" >}}
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{x'^2+y'^2}\,\Delta t_i\)
- **Derivadas:** \(x'=\sqrt{2t+3},\quad y'=1+t\)
- **Radicando:** \(2t+3+1+2t+t^2=(t+2)^2\)
- **Comprimento:** \(\int_0^3(t+2)\,dt\)
- **Conta:** \(\tfrac92+6\)
- **Resposta:** \(\boxed{\tfrac{21}2}\)
{{< /details >}}

**15(f)** \(x=e^t-t,\ y=4e^{t/2},\ 0\le t\le3\).

{{< details title="Resolução" >}}
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{x'^2+y'^2}\,\Delta t_i\)
- **Derivadas:** \(x'=e^t-1,\quad y'=2e^{t/2}\)
- **Radicando:** \((e^t-1)^2+4e^t=(e^t+1)^2\)
- **Comprimento:** \(\int_0^3(e^t+1)\,dt\)
- **Conta:** \([e^t+t]_0^3=e^3+3-1\)
- **Resposta:** \(\boxed{e^3+2}\)
{{< /details >}}

### Questão 16: curvas

**16(a)** \(y=\tfrac13(x^2+2)^{3/2},\ 0\le x\le3\).

{{< details title="Resolução" >}}
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(y'=x\sqrt{x^2+2}\)
- **Radicando:** \(1+x^2(x^2+2)=(x^2+1)^2\)
- **Comprimento:** \(\int_0^3(x^2+1)dx\)
- **Conta:** \(\Big[\tfrac{x^3}3+x\Big]_0^3=9+3\)
- **Resposta:** \(\boxed{12}\)
{{< /details >}}

**16(b)** \(y=x^{3/2},\ 0\le x\le4\).

{{< details title="Resolução" >}}
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(y'=\tfrac32\sqrt x\)
- **Radicando:** \(1+\tfrac94x\)
- **Comprimento:** \(\int_0^4\sqrt{1+\tfrac94x}\,dx\)
- **Conta:** \(\Big[\tfrac49\cdot\tfrac23\big(1+\tfrac94x\big)^{3/2}\Big]_0^4=\tfrac8{27}(10^{3/2}-1)\)
- **Resposta:** \(\boxed{\tfrac8{27}\big(10\sqrt{10}-1\big)}\)
{{< /details >}}

**16(c)** \(x=\tfrac{y^3}3+\tfrac1{4y},\ 1\le y\le3\) (derive em \(y\); integra em \(dy\)).

{{< details title="Resolução" >}}
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(x'=y^2-\tfrac1{4y^2}\)
- **Radicando:** \(1+\Big(y^2-\tfrac1{4y^2}\Big)^2=\Big(y^2+\tfrac1{4y^2}\Big)^2\)
- **Comprimento:** \(\int_1^3\Big(y^2+\tfrac{1}{4}y^{-2}\Big)dy\)
- **Conta:** \(\Big[\tfrac{y^3}3-\tfrac1{4y}\Big]_1^3=\Big(9-\tfrac1{12}\Big)-\Big(\tfrac13-\tfrac14\Big)\)
- **Resposta:** \(\boxed{\tfrac{53}6}\)
{{< /details >}}

**16(d)** \(x=\tfrac{y^3}6+\tfrac1{2y},\ 2\le y\le3\) (o enunciado escreve \(y\) dos dois lados; é \(x\) em função de \(y\)).

{{< details title="Resolução" >}}
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(x'=\tfrac{y^2}2-\tfrac1{2y^2}\)
- **Radicando:** \(1+x'^2=\Big(\tfrac{y^2}2+\tfrac1{2y^2}\Big)^2\)
- **Comprimento:** \(\int_2^3\Big(\tfrac{y^2}2+\tfrac1{2y^2}\Big)dy\)
- **Conta:** \(\Big[\tfrac{y^3}6-\tfrac1{2y}\Big]_2^3=\Big(\tfrac92-\tfrac16\Big)-\Big(\tfrac43-\tfrac14\Big)\)
- **Resposta:** \(\boxed{\tfrac{13}4}\)
{{< /details >}}

**16(e)** \(y=\sqrt{1-x^2},\ -\tfrac12\le x\le\tfrac12\) (arco de circunferência).

{{< details title="Resolução" >}}
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(y'=\tfrac{-x}{\sqrt{1-x^2}}\)
- **Radicando:** \(1+\tfrac{x^2}{1-x^2}=\tfrac1{1-x^2}\)
- **Comprimento:** \(\int_{-1/2}^{1/2}\tfrac{dx}{\sqrt{1-x^2}}\)
- **Conta:** \([\operatorname{arcsen}x]_{-1/2}^{1/2}=\tfrac\pi6+\tfrac\pi6\)
- **Resposta:** \(\boxed{\tfrac\pi3}\)
{{< /details >}}

