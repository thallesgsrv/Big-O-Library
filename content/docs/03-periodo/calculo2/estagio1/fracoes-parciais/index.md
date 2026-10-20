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
4. **Ache as constantes** \(A, B, C, \ldots\): multiplique tudo pelo denominador (isso elimina as frações) e use valores de \(x\) convenientes e/ou compare coeficientes.
5. **Integre** cada parcela.

## Como montar a decomposição

| Fator no denominador | Parcelas |
| --- | --- |
| \((x - \alpha)\), fator de grau 1 | \(\dfrac{A}{x-\alpha}\) |
| \((x - \alpha)^2\), fator repetido | \(\dfrac{A}{x-\alpha} + \dfrac{B}{(x-\alpha)^2}\) |
| \((x - \alpha)^3\) | \(\dfrac{A}{x-\alpha} + \dfrac{B}{(x-\alpha)^2} + \dfrac{C}{(x-\alpha)^3}\) |
| \(g(x)\), irredutível de grau 2 | \(\dfrac{Ax + B}{g(x)}\) |

Regra geral: **uma parcela para cada fator**, com potências repetidas gerando uma parcela por potência, e o numerador de cada parcela com grau *um a menos* que o do fator.

> [!TIP]
> Truque dos valores: escolha para \(x\) as **raízes dos fatores**. Cada escolha zera quase todas as parcelas e entrega uma constante de graça.

## Exemplos

**Exemplo 1 (fatores distintos de grau 1, com divisão).** \(\displaystyle\int\frac{x^3 + x^2 + 1}{x^2 + x}\,dx\)

Passo 1. O numerador tem grau 3 e o denominador grau 2: **divida primeiro**. Como \(x\,(x^2+x) = x^3 + x^2\), o quociente é \(x\) e o resto é \((x^3+x^2+1) - (x^3+x^2) = 1\):

$$
\frac{x^3+x^2+1}{x^2+x} = x + \frac{1}{x^2+x} = x + \frac{1}{x(x+1)}
$$

Passo 2. Decomponha: \(\dfrac{1}{x(x+1)} = \dfrac{A}{x} + \dfrac{B}{x+1}\). Multiplicando os dois lados por \(x(x+1)\):

$$
1 = A(x+1) + Bx
$$

Passo 3. Com \(x = 0\): \(1 = A(1) + B(0)\), logo \(A = 1\). Com \(x = -1\): \(1 = A(0) + B(-1)\), logo \(B = -1\).
Passo 4. Integre (cada parcela é \(\ln\), e \(\int x\,dx = \tfrac{x^2}{2}\)):

$$
\int\left(x + \frac1x - \frac{1}{x+1}\right)dx = \frac{x^2}{2} + \ln\lvert x\rvert - \ln\lvert x+1\rvert + C
$$

**Exemplo 2 (fator repetido).** \(\displaystyle\int\frac{6x+7}{(x+3)^2}\,dx\)

Passo 1. Fator repetido, então duas parcelas. Multiplique por \((x+3)^2\):

$$
\frac{6x+7}{(x+3)^2} = \frac{A}{x+3} + \frac{B}{(x+3)^2} \quad\Rightarrow\quad 6x + 7 = A(x+3) + B
$$

Passo 2. Expanda: \(6x + 7 = Ax + 3A + B\). Compare os coeficientes de \(x\): \(A = 6\). Compare os termos constantes: \(7 = 3A + B = 18 + B\), logo \(B = -11\).
Passo 3. Integre. Para a segunda, \(\int(x+3)^{-2}dx = -(x+3)^{-1}\), então \(-11\cdot\bigl(-\tfrac{1}{x+3}\bigr) = +\tfrac{11}{x+3}\):

$$
\int\left(\frac{6}{x+3} - \frac{11}{(x+3)^2}\right)dx = 6\ln\lvert x+3\rvert + \frac{11}{x+3} + C
$$

**Exemplo 3 (dois irredutíveis de grau 2).** \(\displaystyle\int\frac{-3}{(x^2+1)(x^2+4)}\,dx\)

Passo 1. Cada fator de grau 2 leva um numerador de grau 1:

$$
\frac{-3}{(x^2+1)(x^2+4)} = \frac{Ax+B}{x^2+1} + \frac{Cx+D}{x^2+4}
$$

Passo 2. Multiplique tudo pelo denominador:

$$
-3 = (Ax+B)(x^2+4) + (Cx+D)(x^2+1)
$$

Passo 3. Expanda cada produto:
   - \((Ax+B)(x^2+4) = Ax^3 + 4Ax + Bx^2 + 4B\)
   - \((Cx+D)(x^2+1) = Cx^3 + Cx + Dx^2 + D\)
Passo 4. Agrupe por potência de \(x\) e compare com o lado esquerdo \(0x^3 + 0x^2 + 0x - 3\):
   - \(x^3\): \(A + C = 0\)
   - \(x^2\): \(B + D = 0\)
   - \(x\): \(4A + C = 0\)
   - constante: \(4B + D = -3\)
Passo 5. Subtraindo a primeira da terceira: \(3A = 0\), logo \(A = 0\) e \(C = 0\). Da segunda, \(D = -B\); na quarta, \(4B - B = -3\), então \(B = -1\) e \(D = 1\).
Passo 6. Conferência: \(-(x^2+4) + (x^2+1) = -3\). \(\checkmark\)
Passo 7. Integre com \(\int\dfrac{dx}{x^2+k^2} = \dfrac1k\operatorname{arctg}\dfrac xk\):

$$
\int\left(\frac{-1}{x^2+1} + \frac{1}{x^2+4}\right)dx = -\operatorname{arctg} x + \frac12\operatorname{arctg}\frac{x}{2} + C
$$

**Exemplo 4 (fator repetido e fator distinto).** \(\displaystyle\int\frac{dx}{(x+1)(x-1)^2}\)

Passo 1. Monte e multiplique pelo denominador:

$$
\frac{1}{(x+1)(x-1)^2} = \frac{A}{x+1} + \frac{B}{x-1} + \frac{C}{(x-1)^2}
$$

$$
1 = A(x-1)^2 + B(x+1)(x-1) + C(x+1)
$$

Passo 2. Com \(x = -1\): \(1 = A(-2)^2 = 4A\), então \(A = \tfrac14\).
Passo 3. Com \(x = 1\): \(1 = C(2)\), então \(C = \tfrac12\).
Passo 4. Falta \(B\): use qualquer outro valor, por exemplo \(x = 0\): \(1 = A(1) + B(1)(-1) + C(1) = A - B + C\). Logo \(B = A + C - 1 = \tfrac14 + \tfrac12 - 1 = -\tfrac14\).
Passo 5. Integre (a última: \(\int\tfrac12(x-1)^{-2}dx = -\dfrac{1}{2(x-1)}\)):

$$
\int\left(\frac{1/4}{x+1} - \frac{1/4}{x-1} + \frac{1/2}{(x-1)^2}\right)dx = \frac14\ln\lvert x+1\rvert - \frac14\ln\lvert x-1\rvert - \frac{1}{2(x-1)} + C
$$

**Exemplo 5 (linear e irredutível de grau 2).** \(\displaystyle\int\frac{dx}{(x^2+1)(x-1)}\)

Passo 1. Monte e multiplique:

$$
\frac{1}{(x^2+1)(x-1)} = \frac{A}{x-1} + \frac{Bx+C}{x^2+1} \quad\Rightarrow\quad 1 = A(x^2+1) + (Bx+C)(x-1)
$$

Passo 2. Com \(x = 1\): \(1 = A(2)\), logo \(A = \tfrac12\).
Passo 3. Expanda: \(1 = Ax^2 + A + Bx^2 - Bx + Cx - C\). Coeficiente de \(x^2\): \(0 = A + B\), logo \(B = -\tfrac12\). Termo constante: \(1 = A - C\), logo \(C = A - 1 = -\tfrac12\).
Passo 4. A fração fica:

$$
\frac{1/2}{x-1} - \frac12\cdot\frac{x+1}{x^2+1}
$$

Passo 5. Separe \(\dfrac{x+1}{x^2+1} = \dfrac{x}{x^2+1} + \dfrac{1}{x^2+1}\). A parte com \(x\) usa \(u = x^2+1\): \(\int\dfrac{x}{x^2+1}dx = \tfrac12\ln(x^2+1)\). Então \(-\tfrac12\cdot\tfrac12\ln(x^2+1) = -\tfrac14\ln(x^2+1)\):

$$
\int\frac{dx}{(x^2+1)(x-1)} = \tfrac12\ln\lvert x-1\rvert - \tfrac14\ln(x^2+1) - \tfrac12\operatorname{arctg} x + C
$$

**Exemplo 6 (divisão necessária).** \(\displaystyle\int\frac{2x^3 - 4x^2 - x - 3}{x^2 - 2x - 3}\,dx\)

Passo 1. Grau 3 sobre grau 2: divida. O primeiro termo do quociente é \(2x\), porque \(2x\cdot x^2 = 2x^3\). Multiplique \(2x\,(x^2-2x-3) = 2x^3 - 4x^2 - 6x\) e subtraia do numerador:

$$
(2x^3-4x^2-x-3) - (2x^3-4x^2-6x) = 5x - 3
$$

O resto \(5x-3\) tem grau 1 (menor que 2), então paramos:

$$
\frac{2x^3-4x^2-x-3}{x^2-2x-3} = 2x + \frac{5x-3}{x^2-2x-3}
$$

Passo 2. Fatore o denominador: procure dois números de produto \(-3\) e soma \(-2\): \(-3\) e \(1\). Então \(x^2 - 2x - 3 = (x-3)(x+1)\).
Passo 3. Decomponha: \(5x - 3 = A(x+1) + B(x-3)\).
   - \(x = 3\): \(5(3)-3 = 12 = A(4)\), então \(A = 3\).
   - \(x = -1\): \(5(-1)-3 = -8 = B(-4)\), então \(B = 2\).
Passo 4. Integre:

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
Passo 1. \(x^2 - 1 = (x-1)(x+1)\), então \(\dfrac{1}{(x-1)(x+1)} = \dfrac{A}{x-1} + \dfrac{B}{x+1}\) e \(1 = A(x+1) + B(x-1)\).
Passo 2. \(x = 1\): \(1 = 2A\), \(A = \tfrac12\). \(x = -1\): \(1 = -2B\), \(B = -\tfrac12\).
Passo 3. Integre e junte os logaritmos (\(\ln a - \ln b = \ln\frac ab\)):

$$
\frac12\ln\lvert x-1\rvert - \frac12\ln\lvert x+1\rvert + C = \frac12\ln\left\lvert\frac{x-1}{x+1}\right\rvert + C
$$
{{< /details >}}

**Exercício 2.** Calcule \(\displaystyle\int\frac{dx}{x^2+x-2}\).

{{< details title="Gabarito" >}}
Passo 1. Fatore: números de produto \(-2\) e soma \(1\) são \(2\) e \(-1\). \(x^2+x-2 = (x-1)(x+2)\).
Passo 2. \(1 = A(x+2) + B(x-1)\). \(x = 1\): \(1 = 3A\), \(A = \tfrac13\). \(x = -2\): \(1 = -3B\), \(B = -\tfrac13\).

$$
\frac13\ln\lvert x-1\rvert - \frac13\ln\lvert x+2\rvert + C = \frac13\ln\left\lvert\frac{x-1}{x+2}\right\rvert + C
$$
{{< /details >}}

**Exercício 3.** Calcule \(\displaystyle\int\frac{3x+5}{(x+1)^2}\,dx\).

{{< details title="Gabarito" >}}
Passo 1. \(\dfrac{3x+5}{(x+1)^2} = \dfrac{A}{x+1} + \dfrac{B}{(x+1)^2}\), logo \(3x + 5 = A(x+1) + B = Ax + A + B\).
Passo 2. Coeficiente de \(x\): \(A = 3\). Constante: \(5 = A + B = 3 + B\), então \(B = 2\).
Passo 3. Integre (\(\int 2(x+1)^{-2}dx = -\dfrac{2}{x+1}\)):

$$
3\ln\lvert x+1\rvert - \frac{2}{x+1} + C
$$
{{< /details >}}

**Exercício 4.** Calcule \(\displaystyle\int\frac{x^2+x+1}{x(x^2+1)}\,dx\).

{{< details title="Gabarito" >}}
Passo 1. \(\dfrac{x^2+x+1}{x(x^2+1)} = \dfrac{A}{x} + \dfrac{Bx+C}{x^2+1}\), logo \(x^2 + x + 1 = A(x^2+1) + (Bx+C)x\).
Passo 2. Expanda: \(= Ax^2 + A + Bx^2 + Cx = (A+B)x^2 + Cx + A\).
Passo 3. Compare: constante \(A = 1\); coeficiente de \(x\): \(C = 1\); coeficiente de \(x^2\): \(A + B = 1\), então \(B = 0\).
Passo 4. Integre:

$$
\int\left(\frac1x + \frac{1}{x^2+1}\right)dx = \ln\lvert x\rvert + \operatorname{arctg} x + C
$$
{{< /details >}}
