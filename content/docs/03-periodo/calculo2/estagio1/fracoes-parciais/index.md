---
title: Frações parciais
weight: 4
description: Quebrar uma fração de polinômios em frações simples para integrar com ln e arctg.
autores:
  - thallesgsrv
date: 2026-10-14
---

## Como funciona?

Frações parciais é um truque de **álgebra**: pega uma fração complicada de polinômios e a transforma numa *soma* de frações simples, cada uma fácil de integrar. É o mesmo movimento de somar \(\frac12 + \frac13 = \frac56\), só que de trás para frente.

## Sobre

Alguns nomes que vamos usar:

- **Polinômio** na variável \(x\): expressão \(a_n x^n + \ldots + a_1 x + a_0\). O maior expoente é o **grau**.
- **Função racional**: razão de dois polinômios, \(\dfrac{p(x)}{q(x)}\).
- **Polinômio irredutível**: não pode ser fatorado em polinômios de grau menor. Exemplos: \(x - 3\) (grau 1), \(x^2 + 1\) e \(x^2 + x + 1\) (grau 2, sem raízes reais). Já \(x^2 - 1 = (x-1)(x+1)\) **não** é irredutível.

> [!IMPORTANT]
> O método só funciona se o **grau do numerador for menor que o grau do denominador**. Se não for, divida os polinômios primeiro (veja a receita).

## Receita

1. **Grau:** se grau do numerador \(\ge\) grau do denominador, faça a divisão de polinômios. Você obtém um quociente (fácil de integrar) mais um resto sobre o denominador.
2. **Fatore** o denominador em irredutíveis.
3. **Monte a decomposição** conforme a tabela abaixo.
4. **Ache as constantes** \(A, B, C, \ldots\) (multiplique tudo pelo denominador e use valores de \(x\) convenientes e/ou compare coeficientes).
5. **Integre** cada parcela.

## Como montar a decomposição

| Fator no denominador | Parcelas |
| --- | --- |
| \((x - \alpha)\), fator de grau 1 | \(\dfrac{A}{x-\alpha}\) |
| \((x - \alpha)^2\), fator repetido | \(\dfrac{A}{x-\alpha} + \dfrac{B}{(x-\alpha)^2}\) |
| \((x - \alpha)^3\) | \(\dfrac{A}{x-\alpha} + \dfrac{B}{(x-\alpha)^2} + \dfrac{C}{(x-\alpha)^3}\) |
| \(g(x)\), irredutível de grau 2 | \(\dfrac{Ax + B}{g(x)}\) |

Regra geral: **uma parcela para cada fator**, com potências repetidas gerando uma parcela por potência, e o numerador de cada parcela com grau *um a menos* que o do fator.

## Exemplos

**Exemplo 1 (fatores distintos de grau 1, com divisão).** \(\displaystyle\int\frac{x^3 + x^2 + 1}{x^2 + x}\,dx\)

O numerador tem grau 3 e o denominador grau 2. Divida: como \(x^3 + x^2 = x\,(x^2+x)\),

$$
\frac{x^3+x^2+1}{x^2+x} = x + \frac{1}{x^2+x} = x + \frac{1}{x(x+1)}
$$

Decomponha: \(\dfrac{1}{x(x+1)} = \dfrac{A}{x} + \dfrac{B}{x+1}\). Multiplicando por \(x(x+1)\):

$$
1 = A(x+1) + Bx
$$

Com \(x = 0\): \(A = 1\). Com \(x = -1\): \(B = -1\). Então:

$$
\int\left(x + \frac1x - \frac{1}{x+1}\right)dx = \frac{x^2}{2} + \ln\lvert x\rvert - \ln\lvert x+1\rvert + C
$$

> [!TIP]
> Truque dos valores: escolha para \(x\) as **raízes dos fatores**. Cada escolha zera quase todas as parcelas e entrega uma constante de graça.

**Exemplo 2 (fator repetido).** \(\displaystyle\int\frac{6x+7}{(x+3)^2}\,dx\)

$$
\frac{6x+7}{(x+3)^2} = \frac{A}{x+3} + \frac{B}{(x+3)^2} \quad\Rightarrow\quad 6x + 7 = A(x+3) + B
$$

Comparando os coeficientes de \(x\): \(A = 6\). Termo constante: \(7 = 3A + B = 18 + B\), então \(B = -11\).

$$
\int\left(\frac{6}{x+3} - \frac{11}{(x+3)^2}\right)dx = 6\ln\lvert x+3\rvert + \frac{11}{x+3} + C
$$

**Exemplo 3 (dois irredutíveis de grau 2).** \(\displaystyle\int\frac{-3}{(x^2+1)(x^2+4)}\,dx\)

$$
\frac{-3}{(x^2+1)(x^2+4)} = \frac{Ax+B}{x^2+1} + \frac{Cx+D}{x^2+4}
$$

$$
-3 = (Ax+B)(x^2+4) + (Cx+D)(x^2+1)
$$

Expandindo e comparando coeficientes de \(x^3, x^2, x, 1\):

- \(x^3\): \(A + C = 0\)
- \(x^2\): \(B + D = 0\)
- \(x\): \(4A + C = 0\)
- constante: \(4B + D = -3\)

Das duas primeiras e da terceira: \(A = C = 0\). Depois \(D = -B\) e \(4B - B = -3\), logo \(B = -1\) e \(D = 1\).

$$
\int\left(\frac{-1}{x^2+1} + \frac{1}{x^2+4}\right)dx = -\operatorname{arctg} x + \frac12\operatorname{arctg}\frac{x}{2} + C
$$

> [!NOTE]
> A integral \(\int\frac{dx}{x^2+k^2} = \frac1k\operatorname{arctg}\frac{x}{k}\) é a que aparece com fatores irredutíveis de grau 2. Para numeradores com \(x\), separe em duas partes: a do \(x\) vira \(\ln\) (substituição \(u = x^2+k^2\)) e a constante vira \(\operatorname{arctg}\).

**Exemplo 4 (fator repetido e fator distinto).** \(\displaystyle\int\frac{dx}{(x+1)(x-1)^2}\)

$$
\frac{1}{(x+1)(x-1)^2} = \frac{A}{x+1} + \frac{B}{x-1} + \frac{C}{(x-1)^2}
$$

$$
1 = A(x-1)^2 + B(x+1)(x-1) + C(x+1)
$$

Com \(x = -1\): \(1 = 4A\), então \(A = \tfrac14\). Com \(x = 1\): \(1 = 2C\), então \(C = \tfrac12\). Com \(x = 0\): \(1 = A - B + C\), então \(B = -\tfrac14\).

$$
\int\left(\frac{1/4}{x+1} - \frac{1/4}{x-1} + \frac{1/2}{(x-1)^2}\right)dx = \frac14\ln\lvert x+1\rvert - \frac14\ln\lvert x-1\rvert - \frac{1}{2(x-1)} + C
$$

**Exemplo 5 (linear e irredutível de grau 2).** \(\displaystyle\int\frac{dx}{(x^2+1)(x-1)}\)

$$
\frac{1}{(x^2+1)(x-1)} = \frac{A}{x-1} + \frac{Bx+C}{x^2+1} \quad\Rightarrow\quad 1 = A(x^2+1) + (Bx+C)(x-1)
$$

Com \(x = 1\): \(A = \tfrac12\). Coeficiente de \(x^2\): \(0 = A + B\), então \(B = -\tfrac12\). Termo constante: \(1 = A - C\), então \(C = -\tfrac12\).

$$
\frac{1/2}{x-1} - \frac12\cdot\frac{x+1}{x^2+1}
$$

Separando \(\dfrac{x+1}{x^2+1} = \dfrac{x}{x^2+1} + \dfrac{1}{x^2+1}\):

$$
\int\frac{dx}{(x^2+1)(x-1)} = \tfrac12\ln\lvert x-1\rvert - \tfrac14\ln(x^2+1) - \tfrac12\operatorname{arctg} x + C
$$

**Exemplo 6 (divisão necessária).** \(\displaystyle\int\frac{2x^3 - 4x^2 - x - 3}{x^2 - 2x - 3}\,dx\)

Grau 3 sobre grau 2: divida. Como \(2x\,(x^2-2x-3) = 2x^3 - 4x^2 - 6x\), o resto é \(5x - 3\):

$$
\frac{2x^3-4x^2-x-3}{x^2-2x-3} = 2x + \frac{5x-3}{x^2-2x-3}
$$

Fatore \(x^2 - 2x - 3 = (x-3)(x+1)\):

$$
\frac{5x-3}{(x-3)(x+1)} = \frac{A}{x-3} + \frac{B}{x+1} \quad\Rightarrow\quad 5x - 3 = A(x+1) + B(x-3)
$$

Com \(x = 3\): \(12 = 4A\), \(A = 3\). Com \(x = -1\): \(-8 = -4B\), \(B = 2\).

$$
\int\left(2x + \frac{3}{x-3} + \frac{2}{x+1}\right)dx = x^2 + 3\ln\lvert x-3\rvert + 2\ln\lvert x+1\rvert + C
$$

## Desafio: denominador mais pesado

E se o denominador for o produto de **quatro** irredutíveis, dois de grau 1 e dois de grau 2? A regra não muda: uma parcela por fator.

$$
\frac{f(x)}{(x-a)(x-b)\,g_1(x)\,g_2(x)} = \frac{A}{x-a} + \frac{B}{x-b} + \frac{Cx+D}{g_1(x)} + \frac{Ex+F}{g_2(x)}
$$

Seis constantes, seis equações. Dá trabalho, mas nenhuma ideia nova.

## Exercícios propostos

**Exercício 1.** Calcule \(\displaystyle\int\frac{dx}{x^2-1}\).

{{< details title="Gabarito" >}}
\(\dfrac{1}{(x-1)(x+1)} = \dfrac{A}{x-1} + \dfrac{B}{x+1}\), com \(1 = A(x+1) + B(x-1)\). Em \(x = 1\): \(A = \tfrac12\). Em \(x = -1\): \(B = -\tfrac12\).

$$
\frac12\ln\lvert x-1\rvert - \frac12\ln\lvert x+1\rvert + C = \frac12\ln\left\lvert\frac{x-1}{x+1}\right\rvert + C
$$
{{< /details >}}

**Exercício 2.** Calcule \(\displaystyle\int\frac{dx}{x^2+x-2}\).

{{< details title="Gabarito" >}}
\(x^2 + x - 2 = (x-1)(x+2)\). Então \(1 = A(x+2) + B(x-1)\): \(x = 1\) dá \(A = \tfrac13\); \(x = -2\) dá \(B = -\tfrac13\).

$$
\frac13\ln\left\lvert\frac{x-1}{x+2}\right\rvert + C
$$
{{< /details >}}

**Exercício 3.** Calcule \(\displaystyle\int\frac{3x+5}{(x+1)^2}\,dx\).

{{< details title="Gabarito" >}}
\(3x + 5 = A(x+1) + B\): \(A = 3\) e \(5 = 3 + B\), então \(B = 2\).

$$
3\ln\lvert x+1\rvert - \frac{2}{x+1} + C
$$
{{< /details >}}

**Exercício 4.** Calcule \(\displaystyle\int\frac{x^2+x+1}{x(x^2+1)}\,dx\).

{{< details title="Gabarito" >}}
\(\dfrac{x^2+x+1}{x(x^2+1)} = \dfrac{A}{x} + \dfrac{Bx+C}{x^2+1}\), com \(x^2 + x + 1 = A(x^2+1) + (Bx+C)x\). Em \(x = 0\): \(A = 1\). Coeficiente de \(x^2\): \(1 = A + B\), então \(B = 0\). Coeficiente de \(x\): \(C = 1\).

$$
\int\left(\frac1x + \frac{1}{x^2+1}\right)dx = \ln\lvert x\rvert + \operatorname{arctg} x + C
$$
{{< /details >}}
