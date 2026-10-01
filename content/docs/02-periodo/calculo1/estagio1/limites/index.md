---
title: Limites e Continuidade
weight: 2
description: Limites laterais, técnicas de cálculo, teorema do confronto e continuidade.
autores:
    - thallesgsrv
date: 2026-10-01
---

## 1. Agora vem a ideia de limite

Até aqui, perguntamos coisas como:

> Quanto vale $f(2)$?

Mas o limite faz uma pergunta diferente:

> O que está acontecendo com $f(x)$ quando $x$ está chegando perto de $2$?

Essa diferença é fundamental.

Imagine que estamos nos aproximando de $2$.

Podemos chegar por números menores:

\[
1.9,\ 1.99,\ 1.999,\ 1.9999
\]

Ou por números maiores:

\[
2.1,\ 2.01,\ 2.001,\ 2.0001
\]

Isso dá origem aos limites laterais.

## 2. Limite pela esquerda

Quando escrevemos:

\[
x \to 2^-
\]

o sinal $-$ significa:

> estamos nos aproximando de $2$ usando valores menores que $2$.

Por exemplo:

\[
1.9,\ 1.99,\ 1.999,\ 1.9999,\ldots
\]

Todos esses números estão à esquerda de $2$ na reta numérica.

Portanto:

\[
x \to 2^-
\]

significa:

> $x$ se aproxima de $2$ pela esquerda.

## 3. Limite pela direita

Agora fazemos o contrário.

Quando escrevemos:

\[
x \to 2^+
\]

estamos nos aproximando de $2$ usando valores maiores que $2$.

Por exemplo:

\[
2.1,\ 2.01,\ 2.001,\ 2.0001,\ldots
\]

Portanto:

\[
x \to 2^+
\]

significa:

> $x$ se aproxima de $2$ pela direita.

## 4. Vamos colocar isso em um gráfico

Considere:

\[
f(x) = \frac{1}{x-2}
\]

O número $2$ não pertence ao domínio.

Mas o que acontece quando chegamos perto dele?

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" role="img" aria-label="Gráfico da função 1 dividido por x menos 2 com assíntota vertical em x igual a 2" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;display:block;">
<line x1="70" y1="250" x2="750" y2="250" stroke="currentColor" stroke-width="2"></line>
<line x1="400" y1="40" x2="400" y2="460" stroke="currentColor" stroke-width="2" stroke-dasharray="8 8"></line>
<path d="M80 280 C180 280 300 290 370 330 C390 350 395 400 398 460" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
<path d="M402 40 C405 100 410 160 430 190 C500 225 600 235 720 240" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
</svg>
<p style="font-size:0.95rem;margin-top:0.5rem">Legenda: assíntota vertical em x = 2; os ramos mostram comportamento para x→2⁻ e x→2⁺.</p>

A função tem uma assíntota vertical em $x=2$.

### Aproximando pela esquerda

Quando:

\[
x \to 2^-
\]

A função desce cada vez mais:

\[
f(x) \to -\infty
\]

### Aproximando pela direita

Quando:

\[
x \to 2^+
\]

a função sobe cada vez mais:

\[
f(x) \to +\infty
\]

Portanto:

\[
\lim_{x\to2^-}\frac{1}{x-2} = -\infty
\]

\[
\lim_{x\to2^+}\frac{1}{x-2} = +\infty
\]

Isso mostra que os lados esquerdo e direito não chegam ao mesmo valor. A função não é contínua em $x=2$.

## 5. Então o que é o limite?

Agora podemos entender a ideia de forma mais natural.

Quando escrevemos:

\[
\lim_{x\to a} f(x) = L
\]

estamos dizendo:

> Quando $x$ fica cada vez mais próximo de $a$, os valores de $f(x)$ ficam cada vez mais próximos de $L$.

O ponto importante é que estamos interessados no comportamento próximo de $a$.

Não necessariamente no valor da função exatamente em $a$.

## 6. Um exemplo em que a função nem existe no ponto

Considere:

\[
f(x)=\frac{x^2-1}{x-1}
\]

Se tentarmos calcular $f(1)$:

\[
f(1) = \frac{1^2-1}{1-1} = \frac{0}{0}
\]

Portanto, a função original não está definida em $x=1$.

Mas podemos simplificar:

\[
x^2-1 = (x-1)(x+1)
\]

Logo:

\[
f(x) = \frac{(x-1)(x+1)}{x-1}
\]

Para $x \neq 1$:

\[
f(x) = x+1
\]

Agora podemos observar o comportamento próximo de $1$:

\[
\lim_{x\to1}(x+1) = 2
\]

Portanto:

\[
\boxed{\lim_{x\to1}\frac{x^2-1}{x-1}=2}
\]

Perceba a diferença:

- $f(1)$ não existe;
- mas $\lim_{x\to1} f(x)=2$.

O limite descreve o comportamento ao redor do ponto, não necessariamente o valor naquele ponto.

## 7. Quando os dois lados concordam

Para existir um limite bilateral:

\[
\lim_{x\to a} f(x)
\]

os dois lados precisam chegar ao mesmo lugar.

Ou seja:

\[
\lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x)
\]

Se os dois lados chegam ao mesmo valor $L$, então:

\[
\lim_{x\to a} f(x) = L
\]

Se chegam a valores diferentes, o limite bilateral não existe.

## 8. Limites trigonométricos

Alguns limites aparecem com tanta frequência que vale a pena memorizar a regra principal:

\[
\lim_{x\to 0} \frac{\sin x}{x} = 1
\]

Essa regra é a base para resolver muitos limites que, à primeira vista, parecem complicados.

Quando $x$ fica muito pequeno, o seno cresce na mesma proporção que o próprio ângulo. Por isso, perto de zero, o quociente $\frac{\sin x}{x}$ tende a $1$.

### Regra prática

Se aparecer um limite do tipo:

\[
\lim_{x\to 0} \frac{\sin(ax)}{x}
\]

você pode usar a ideia de que:

\[
\frac{\sin(ax)}{x} = a \cdot \frac{\sin(ax)}{ax}
\]

Portanto:

\[
\lim_{x\to 0} \frac{\sin(ax)}{x} = a
\]

Exemplo:

\[
\lim_{x\to 0} \frac{\sin(3x)}{x} = 3
\]

## 9. Regra prática para tirar a raiz

Quando um limite envolve uma expressão com raiz, a estratégia mais útil é multiplicar pela expressão conjugada.

Essa técnica é conhecida como racionalização.

### Exemplo

Considere:

\[
\lim_{x \to 0} \frac{\sqrt{x+1}-1}{x}
\]

Se substituirmos $x=0$, vemos que aparece a forma $0/0$. Então precisamos manipular a expressão.

A ideia é multiplicar pelo conjugado do numerador:

\[
\frac{\sqrt{x+1}-1}{x}\cdot\frac{\sqrt{x+1}+1}{\sqrt{x+1}+1}
\]

Isso resulta em:

\[
\frac{(\sqrt{x+1})^2 - 1^2}{x(\sqrt{x+1}+1)}
\]

\[
\frac{x}{x(\sqrt{x+1}+1)}
\]

Como $x \neq 0$ perto de zero, podemos cancelar $x$:

\[
\frac{1}{\sqrt{x+1}+1}
\]

Agora calculamos o limite:

\[
\lim_{x \to 0} \frac{1}{\sqrt{x+1}+1}
\]

Substituindo $x=0$:

\[
\frac{1}{\sqrt{1}+1} = \frac{1}{2}
\]

Portanto:

\[
\boxed{\lim_{x \to 0} \frac{\sqrt{x+1}-1}{x} = \frac{1}{2}}
\]

Regra prática:

> Quando aparecer uma diferença com raiz, multiplique pelo conjugado para eliminar a raiz do numerador ou do denominador.

## 10. Teorema do confronto

Em muitos casos, não conseguimos calcular um limite diretamente, mas conseguimos comparar a função com outras duas que já sabemos como se comportam.

Esse é o papel do teorema do confronto.

Se, perto de $a$, tivermos:

\[
g(x) \le f(x) \le h(x)
\]

e também:

\[
\lim_{x\to a} g(x) = L
\quad\text{e}\quad
\lim_{x\to a} h(x) = L,
\]

então:

\[
\boxed{\lim_{x\to a} f(x) = L}
\]

A ideia é simples: se a função $f(x)$ fica sempre entre duas funções que convergem para o mesmo valor, então ela não pode escapar desse valor.

### Exemplo clássico

Considere:

\[
f(x) = x^2 \sin\left(\frac{1}{x}\right)
\]

Quando $x$ está perto de $0$, sabemos que:

\[
-1 \le \sin\left(\frac{1}{x}\right) \le 1
\]

Multiplicando tudo por $x^2$, que é sempre não negativo, obtemos:

\[
-x^2 \le x^2 \sin\left(\frac{1}{x}\right) \le x^2
\]

Agora observe:

\[
\lim_{x\to 0} (-x^2) = 0
\quad\text{e}\quad
\lim_{x\to 0} x^2 = 0
\]

Pelo teorema do confronto:

\[
\boxed{\lim_{x\to 0} x^2 \sin\left(\frac{1}{x}\right) = 0}
\]

Esse exemplo mostra uma ideia muito importante: mesmo quando a função oscila, se ela estiver presa entre duas funções que vão para o mesmo valor, então ela também vai para esse valor.

## 11. Continuidade

Imagine desenhar o gráfico de uma função sem tirar o lápis do papel.

Se existe uma ruptura, um salto ou um buraco, temos um problema de continuidade.

Formalmente, uma função é contínua em $x=a$ quando:

\[
\lim_{x\to a} f(x) = f(a)
\]

Isso exige três coisas:

1. $f(a)$ existe;
2. $\lim_{x\to a} f(x)$ existe;
3. os dois valores são iguais.

Ou seja:

\[
\boxed{\lim_{x\to a} f(x) = f(a)}
\]

## 12. Contextualização: o que isso significa no mundo real?

Imagine uma fábrica que mede o custo de produção de um item em função da quantidade produzida.

Se o custo muda de forma suave, a função é contínua. Mas se, em certo ponto, o custo “salta” por causa de um novo turno ou de uma mudança de capacidade, então a função deixa de ser contínua.

Outro exemplo é a temperatura de um sistema: em alguns pontos, a temperatura pode variar de forma contínua; em outros, pode haver uma mudança brusca por causa de uma reação ou de uma troca de fase.

Esse tipo de raciocínio é importante porque o Cálculo não é apenas manipular símbolos: ele descreve como fenômenos reais mudam e quando essa mudança deixa de ser suave.

## 13. Exercícios de fixação

### Exercício 1 — Domínio

Determine o domínio:

\[
f(x)=\frac{1}{x-3}
\]

### Exercício 2 — Função

Calcule:

\[
f(2)
\]

para:

\[
f(x) = x^2 + 1
\]

### Exercício 3 — Esquerda e direita

Considere:

\[
f(x) = \frac{1}{x-2}
\]

Explique quais valores de $x$ são utilizados quando:

\[
x \to 2^-
\]

e quando:

\[
x \to 2^+
\]

### Exercício 4 — Limites laterais

Calcule:

\[
\lim_{x\to2^-}\frac{1}{x-2}
\]

e

\[
\lim_{x\to2^+}\frac{1}{x-2}
\]

### Exercício 5 — Limite trigonométrico

Calcule:

\[
\lim_{x\to 0} \frac{\sin(3x)}{x}
\]

### Exercício 6 — Racionalização

Calcule:

\[
\lim_{x\to 0} \frac{\sqrt{x+4}-2}{x}
\]

### Exercício 7 — Teorema do confronto

Use o teorema do confronto para mostrar que:

\[
\lim_{x\to 0} x^2 \sin\left(\frac{1}{x}\right)=0
\]

### Exercício 8 — Continuidade

Explique por que:

\[
g(x) = \frac{1}{x-2}
\]

não é contínua em $x=2$.

