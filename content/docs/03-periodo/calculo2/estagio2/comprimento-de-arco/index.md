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

Ao final você deve conseguir:

- explicar por que um pedaço minúsculo de curva é a hipotenusa de um triângulo;
- montar a integral do comprimento de arco, inclusive para curvas dadas por paramétricas;
- resolver as integrais que aparecem.

> [!NOTE]
> **Antes de começar, ajuda ter à mão:**
>
> - a página de [Somas de Riemann e integral definida](../rieman/);
> - o teorema de Pitágoras;
> - derivadas e integrais básicas, com substituição simples.

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

Olha só: o pulo do gato é que o pedacinho de curva é só Pitágoras em escala minúscula. A fórmula final nada mais é do que somar essas hipotenusas.

## 2. Exemplos resolvidos

**Exemplo 1.** \(y=\tfrac{4\sqrt2}3x^{3/2}-1,\ 0\le x\le1\).

- **Como pensar:** Derive \(x^{3/2}\): \(\tfrac32\sqrt x\). Então \(y'=\tfrac{4\sqrt2}3\cdot\tfrac32\sqrt x=2\sqrt2\sqrt x\), e \(y'^2=8x\). A raiz **não** some, mas \(\sqrt{1+8x}\) é uma substituição simples.
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(y'=2\sqrt2\,\sqrt x\)
- **Radicando:** \(1+8x\)
- **Comprimento:** \(\int_0^1\sqrt{1+8x}\,dx\)
- **Conta:** \(\Big[\tfrac{(1+8x)^{3/2}}{12}\Big]_0^1=\tfrac{27-1}{12}\)
- **Resposta:** \(\boxed{\tfrac{13}6}\)

**Exemplo 2.** \(f(x)=\tfrac{x^3}{12}+\tfrac1x,\ 1\le x\le4\).

- **Como pensar:** Derive: \(\tfrac{3x^2}{12}=\tfrac{x^2}4\) e \(\big(\tfrac1x\big)'=-\tfrac1{x^2}\). Eleve ao quadrado: \(\tfrac{x^4}{16}-\tfrac12+\tfrac1{x^4}\). Somando \(1\): \(\tfrac{x^4}{16}+\tfrac12+\tfrac1{x^4}\), que é \(\big(\tfrac{x^2}4+\tfrac1{x^2}\big)^2\) (confira o termo do meio: \(2\cdot\tfrac{x^2}4\cdot\tfrac1{x^2}=\tfrac12\)). A raiz some.
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(f'(x)=\tfrac{x^2}4-\tfrac1{x^2}\)
- **Radicando:** \(1+\Big(\tfrac{x^2}4-\tfrac1{x^2}\Big)^2=\tfrac{x^4}{16}+\tfrac12+\tfrac1{x^4}=\Big(\tfrac{x^2}4+\tfrac1{x^2}\Big)^2\)
- **Comprimento:** \(\int_1^4\Big(\tfrac{x^2}4+x^{-2}\Big)dx\)
- **Conta:** \(\Big[\tfrac{x^3}{12}-\tfrac1x\Big]_1^4=\Big(\tfrac{16}3-\tfrac14\Big)-\Big(\tfrac1{12}-1\Big)\)
- **Resposta:** \(\boxed{6}\)

> [!TIP]
> O quadrado perfeito aparece assim: \(\big(\tfrac{x^2}4-\tfrac1{x^2}\big)^2\) tem termo do meio \(-2\cdot\tfrac14=-\tfrac12\). Somando o \(1\), vira \(+\tfrac12\), e o resultado é \(\big(\tfrac{x^2}4+\tfrac1{x^2}\big)^2\), com o sinal trocado.

**Exemplo 3.** \(y=(x/2)^{2/3},\ 0\le x\le2\). Derivar em \(x\) dá \(y'\) infinito em \(0\). **Saída:** inverta, \(x=2y^{3/2}\), \(0\le y\le1\).

- **Como pensar:** Derivando, \(y'=\tfrac13\big(\tfrac x2\big)^{-1/3}\) explode em \(x=0\). **Saída:** isole \(x=2y^{3/2}\) e integre em \(dy\), com \(y\) de \(0\) a \(1\) (quando \(x=2\), \(y=1\)).
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(\tfrac{dx}{dy}=3\sqrt y\)
- **Radicando:** \(1+9y\)
- **Comprimento:** \(\int_0^1\sqrt{1+9y}\,dy\)
- **Conta:** \(\Big[\tfrac{2(1+9y)^{3/2}}{27}\Big]_0^1\)
- **Resposta:** \(\boxed{\tfrac{2}{27}\big(10\sqrt{10}-1\big)}\)

## 3. Lista de exercícios

Agora é com você. Resolva no papel, compare com o gabarito e, se o resultado não bater, procure o passo em que os caminhos se separaram. Refazer os que errou daqui a alguns dias ajuda a fixar.


### Questão 15: paramétricas

Aqui o pedaço é \(\Delta s_i\approx\sqrt{x'^2+y'^2}\,\Delta t_i\) e integra em \(dt\).

**15(a)** \(x=1-t,\ y=2+3t,\ -\tfrac23\le t\le1\).

{{< details title="Resolução" >}}
- **Como pensar:** Reta: velocidade constante \(\sqrt{(-1)^2+3^2}=\sqrt{10}\). Só multiplique pelo tamanho do intervalo, \(1-(-\tfrac23)=\tfrac53\).
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{x'^2+y'^2}\,\Delta t_i\)
- **Derivadas:** \(x'=-1,\quad y'=3\)
- **Radicando:** \(1+9=10\)
- **Comprimento:** \(\int_{-2/3}^{1}\sqrt{10}\,dt\)
- **Conta:** \(\sqrt{10}\cdot\tfrac53\)
- **Resposta:** \(\boxed{\tfrac53\sqrt{10}}\)
{{< /details >}}

### Questão 16: curvas

**16(a)** \(y=\tfrac13(x^2+2)^{3/2},\ 0\le x\le3\).

{{< details title="Resolução" >}}
- **Como pensar:** Regra da cadeia: \(y'=\tfrac13\cdot\tfrac32(x^2+2)^{1/2}\cdot2x=x\sqrt{x^2+2}\). Então \(1+y'^2=x^4+2x^2+1=(x^2+1)^2\).
- **Pedaço da curva:** \(\Delta s_i\approx\sqrt{(\Delta x_i)^2+(\Delta y_i)^2}\) (hipotenusa de um triângulo minúsculo)
- **Derivada:** \(y'=x\sqrt{x^2+2}\)
- **Radicando:** \(1+x^2(x^2+2)=(x^2+1)^2\)
- **Comprimento:** \(\int_0^3(x^2+1)dx\)
- **Conta:** \(\Big[\tfrac{x^3}3+x\Big]_0^3=9+3\)
- **Resposta:** \(\boxed{12}\)
{{< /details >}}
