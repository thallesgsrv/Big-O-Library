---
title: Divisão de polinômios e expressões fracionárias
weight: 3
description: Divisão pelo método das chaves e por Briot-Ruffini, e como simplificar e somar expressões fracionárias.
autores:
  - thallesgsrv
date: 2026-11-02
---

## Sobre

Lembra da divisão que você aprendeu na escola, com a "casinha" e o resto? Pois polinômio também se divide, e o esquema é **o mesmo**. Neste tópico você aprende dois métodos de divisão e depois usa tudo isso para domar as expressões fracionárias (aquelas frações com letras em cima e embaixo).

## A ideia: dividendo, divisor, quociente e resto

Divida 315 por 2: dá 157 e **sobra 1**. A forma de conferir é

$$
315 = 2\cdot 157 + 1
$$

Com polinômios é igual. Ao dividir $P(x)$ por $D(x)$ você obtém um quociente $Q(x)$ e um resto $R(x)$ tais que:

$$
\boxed{P(x)=D(x)\cdot Q(x)+R(x)}
$$

| Nome | Quem é |
| --- | --- |
| $P(x)$ | dividendo |
| $D(x)$ | divisor |
| $Q(x)$ | quociente |
| $R(x)$ | resto (o **grau** de $R$ é **menor** que o de $D$) |

Guarde essa igualdade. Ela é a sua prova real em qualquer divisão.

## Método das chaves (divisão longa)

Funciona para qualquer divisor. É a "casinha" de sempre.

**Algoritmo:**

1. Ordene dividendo e divisor em ordem decrescente de grau (e complete com $0x^k$ os termos que faltam).
2. Divida o **primeiro termo** do dividendo pelo **primeiro termo** do divisor. O resultado é o próximo termo do quociente.
3. Multiplique esse termo pelo divisor inteiro e **subtraia** do dividendo (cuidado com o sinal!).
4. Repita com o que sobrou, até o grau do resto ficar **menor** que o grau do divisor.

### Exemplo completo

Dividir $12x^3-19x^2+15x-3$ por $3x^2-x+2$.

**Passo 1.** $\dfrac{12x^3}{3x^2}=4x$. Multiplicando: $4x\,(3x^2-x+2)=12x^3-4x^2+8x$. Subtraindo do dividendo:

$$
(12x^3-19x^2+15x-3)-(12x^3-4x^2+8x)=-15x^2+7x-3
$$

**Passo 2.** $\dfrac{-15x^2}{3x^2}=-5$. Multiplicando: $-5\,(3x^2-x+2)=-15x^2+5x-10$. Subtraindo:

$$
(-15x^2+7x-3)-(-15x^2+5x-10)=2x+7
$$

**Parou?** O resto $2x+7$ tem grau 1, menor que o grau 2 do divisor. Parou.

$$
Q(x)=4x-5\qquad R(x)=2x+7
$$

**Prova real:** $(3x^2-x+2)(4x-5)+(2x+7)=12x^3-19x^2+13x-10+2x+7=12x^3-19x^2+15x-3$ ✓

### Mais três, resumidos

| Divisão | Quociente | Resto |
| --- | --- | --- |
| $(x^4-2x^3+3x-6)\div(x-2)$ | $x^3+3$ | $0$ |
| $(3x^2+7x+2)\div(3x+1)$ | $x+2$ | $0$ |
| $(x^3+3x^2+x+1)\div(x^2+x+1)$ | $x+2$ | $-2x-1$ |

Quando o resto dá **zero**, a divisão é *exata*: o divisor é um **fator** do dividendo. Por exemplo, $3x^2+7x+2=(3x+1)(x+2)$. Fatoração via divisão!

> [!WARNING]
> No primeiro exemplo da tabela falta o termo em $x^2$. Na hora de montar a chave, escreva $x^4-2x^3+0x^2+3x-6$. Esquecer o $0x^2$ desalinha tudo.

## Briot-Ruffini (divisão sintética)

É um atalho **muito** mais rápido, mas com uma restrição: só funciona quando o divisor é do tipo $(x-a)$, de 1º grau com coeficiente 1 no $x$.

**Algoritmo:**

1. Ache o valor de $a$: de $x-a=0$ sai $x=a$. (Para $x-2$, $a=2$. Para $x+3$, $a=-3$.)
2. Liste os **coeficientes** do dividendo em ordem (com zeros nos termos que faltam).
3. Monte o dispositivo: $a$ na esquerda, coeficientes na linha de cima.
4. Desça o primeiro coeficiente.
5. Multiplique pelo $a$ e some com o próximo coeficiente.
6. Repita até o fim.
7. O **último** número é o resto; os outros são os coeficientes do quociente (que tem grau 1 a menos).

### Exemplo: $(x^4-2x^3+3x-6)\div(x-2)$

Aqui $a=2$ e os coeficientes são $1,\ -2,\ 0,\ 3,\ -6$ (note o 0 do $x^2$).

| | $1$ | $-2$ | $0$ | $3$ | $-6$ |
| --- | --- | --- | --- | --- | --- |
| $a=2$ | $1$ | $0$ | $0$ | $3$ | $0$ |

Como foi feito: desce o $1$; $1\cdot2=2$ e $-2+2=0$; $0\cdot2=0$ e $0+0=0$; $0\cdot2=0$ e $3+0=3$; $3\cdot2=6$ e $-6+6=0$.

Resultado: $Q(x)=x^3+0x^2+0x+3=x^3+3$ e $R=0$.

### Exemplo com divisor $x+3$

$(2x^3+3x^2-4)\div(x+3)$: $a=-3$ e os coeficientes são $2,\ 3,\ 0,\ -4$.

| | $2$ | $3$ | $0$ | $-4$ |
| --- | --- | --- | --- | --- |
| $a=-3$ | $2$ | $-3$ | $9$ | $-31$ |

Logo $Q(x)=2x^2-3x+9$ e $R=-31$.

### Um bônus: teorema do resto

O resto da divisão de $P(x)$ por $(x-a)$ é exatamente $P(a)$. Conferindo: $P(-3)=2(-27)+3\cdot 9-4=-54+27-4=-31$ ✓. Ou seja, se você só quer o resto (por exemplo, para saber se $a$ é raiz), nem precisa dividir: é só substituir.

Mais um exemplo de divisão exata: $(x^4-1)\div(x-1)$ dá $Q=x^3+x^2+x+1$ e $R=0$.

## Expressões fracionárias

Uma **expressão algébrica** mistura números e letras. Uma **expressão fracionária** é o **quociente** de duas expressões algébricas, por exemplo $\dfrac{5x^3+2x^2-x}{x^2-x-1}$.

Duas regras de ouro:

1. O **denominador não pode ser zero**. Cada simplificação vale só para os valores de $x$ que não zeram o denominador original.
2. Só se **corta fator** (coisa que multiplica o numerador *inteiro* e o denominador *inteiro*). Nunca se corta termo de soma.

> [!CAUTION]
> $\dfrac{x+3}{x}$ **não é** $3$. O $x$ de cima está *somando*, não multiplicando. Isso é o cancelamento ilegal mais famoso do mundo. Se quiser testar: $x=1$ dá $\frac{4}{1}=4$, e não $3$.

### Simplificando

**Tipo 1: só monômios.**

$$
\frac{3x}{4x}=\frac{3}{4}\ (x\ne0)
\qquad
\frac{9x^2}{6x}=\frac{3x}{2}\ (x\ne0)
$$

**Tipo 2: evidência primeiro.** Coloque o fator comum em evidência para poder cortar:

$$
\frac{3x^2+2x}{5x}=\frac{x(3x+2)}{5x}=\frac{3x+2}{5}
$$

Já em $\frac{x+3}{x}$ não existe fator comum, então não há simplificação possível.

**Tipo 3: potências.** Divisão de potências de mesma base subtrai os expoentes:

$$
\frac{x^5}{x^8}=x^{5-8}=x^{-3}=\frac{1}{x^3}
$$

$$
\frac{x^5y^{-4}z^3}{x^3y^5z^{-6}}=x^{5-3}\,y^{-4-5}\,z^{3-(-6)}=x^2y^{-9}z^9=\frac{x^2z^9}{y^9}
$$

**Tipo 4: fatore (produtos notáveis) e depois corte.**

$$
\frac{x^2-3x}{x^2-9}=\frac{x(x-3)}{(x+3)(x-3)}=\frac{x}{x+3}
\quad (x\ne 3,\ x\ne -3)
$$

$$
\frac{x^2-4}{x-2}=\frac{(x+2)(x-2)}{x-2}=x+2
\quad (x\ne 2)
$$

**Tipo 5: divisão de polinômios.** Se o numerador não fatora na hora, divida:

$$
\frac{2x^2+4x-6}{x+3}=2x-2
$$

(Pela divisão de polinômios, $2x^2+4x-6\div(x+3)=2x-2$ com resto zero, para $x\ne -3$.)

### Somando expressões fracionárias

Mesma receita das frações numéricas: denominador comum, multiplica em cruz e junta.

$$
\frac{x}{2x-3}+\frac{3}{x+4}=\frac{x(x+4)+3(2x-3)}{(2x-3)(x+4)}=\frac{x^2+10x-9}{2x^2+5x-12}
$$

> [!TIP]
> Se você consegue **fatorar** os denominadores, o denominador comum costuma ficar bem menor do que o produto direto. Vale a pena fatorar antes de multiplicar tudo.

## Resumão

| Quero... | Uso... |
| --- | --- |
| dividir por qualquer polinômio | chaves |
| dividir por $x-a$ rápido | Briot-Ruffini |
| só o resto de $P\div(x-a)$ | teorema do resto: $P(a)$ |
| conferir uma divisão | $P=D\cdot Q+R$ |
| simplificar fração com letras | fatorar e cortar **fatores** |
| somar frações com letras | denominador comum |

## Exercícios

**E1.** Divida:

a) $x^4+2x^3-2x^2-4x-21$ por $x+3$
b) $7x^3+28x^2-3x+4$ por $x+4$
c) $4x^3-x^2+2$ por $x^2+1$

{{< details title="Gabarito" >}}
a) Com Briot-Ruffini ($a=-3$): $Q=x^3-x^2+x-7$ e $R=0$.
b) ($a=-4$): $Q=7x^2-3$ e $R=16$.
c) Divisor de grau 2: só pelas chaves. $Q=4x-1$ e $R=-4x+3$. Prova: $(x^2+1)(4x-1)+(-4x+3)=4x^3-x^2+4x-1-4x+3=4x^3-x^2+2$ ✓.
{{< /details >}}

**E2.** Simplifique:

a) $\dfrac{x^2-2x-8}{x-4}$  b) $\dfrac{x^6y^{-3}z^2}{x^2y^{-5}z^5}$  c) $\dfrac{x^4-3x^2+2x}{2x}$

{{< details title="Gabarito" >}}
a) $x+2$, para $x\ne4$ (o numerador é $(x-4)(x+2)$).
b) $\dfrac{x^4y^2}{z^3}$.
c) $\dfrac{x^3-3x+2}{2}$, para $x\ne 0$ (evidencie o $x$ e corte).
{{< /details >}}

**E3.** Calcule:

a) $\dfrac{5}{2x}+\dfrac{3}{x^2}$  b) $\dfrac{3}{4}-\dfrac{x-1}{3x}$

{{< details title="Gabarito" >}}
a) $\dfrac{5x+6}{2x^2}$ (denominador comum $2x^2$: $\frac{5x}{2x^2}+\frac{6}{2x^2}$).
b) $\dfrac{5x+4}{12x}$ (denominador comum $12x$: $\frac{9x-4(x-1)}{12x}$).
{{< /details >}}

### Teste rápido

{{< quiz titulo="Divisão e frações algébricas" >}}

{{< questao >}}
Ao dividir $P(x)$ por $D(x)$ obtemos $Q(x)$ e $R(x)$. Qual igualdade é sempre verdadeira?

- [ ] $P=D+Q+R$
- [x] $P=D\cdot Q+R$
- [ ] $P=D\cdot R+Q$
- [ ] $P=(D+Q)\cdot R$
---
É a mesma estrutura de $315=2\cdot157+1$: dividendo = divisor × quociente + resto.
{{< /questao >}}

{{< questao >}}
Para dividir $x^3-2x+5$ por $x-4$ com Briot-Ruffini, a linha de cima do dispositivo é:

- [ ] $4\mid 1,\,-2,\,5$
- [x] $4\mid 1,\,0,\,-2,\,5$
- [ ] $-4\mid 1,\,0,\,-2,\,5$
- [ ] $4\mid 1,\,2,\,5$
---
De $x-4=0$ sai $a=4$ (e não $-4$). E o termo $0x^2$ precisa aparecer na lista de coeficientes.
{{< /questao >}}

{{< questao >}}
Qual simplificação é **válida**?

- [ ] $\dfrac{x+5}{x}=5$
- [ ] $\dfrac{x^2+9}{x+3}=x+3$
- [x] $\dfrac{x^2-9}{x+3}=x-3$ (para $x\ne-3$)
- [ ] $\dfrac{x^2+4}{2}=x^2+2$
---
Só a terceira fatora: $(x+3)(x-3)$ no numerador. Nas outras, o corte é de termo, não de fator. Na última, $\frac{x^2+4}{2}=\frac{x^2}{2}+2$.
{{< /questao >}}

{{< /quiz >}}
