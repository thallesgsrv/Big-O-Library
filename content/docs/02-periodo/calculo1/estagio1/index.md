---
title: Funções e limites
weight: 1
description: Introdução ao estudo de funções, domínio, imagem, continuidade e limites laterais.
autores:
  - thallesgsrv
date: 2026-10-01
---

## O que você precisa entender

Antes de falar em derivadas e integrais, precisamos aprender a observar o comportamento de uma função.

Neste estágio, vamos construir essa ideia aos poucos:

- o que é uma função;
- quais valores podemos colocar nela;
- quais valores ela pode produzir;
- como enxergar seu comportamento em um gráfico;
- o que significa uma variável se aproximar de um número;
- o que são limites pela esquerda e pela direita;
- e, finalmente, o que significa uma função ser contínua.

A ideia não é decorar definições. É aprender a olhar para uma função e entender o que está acontecendo.

## Resumo rápido

- Função: recebe entrada e entrega saída.
- Domínio: valores que podem entrar.
- Imagem: valores que podem sair.
- Gráfico: ajuda a interpretar o comportamento.
- Limite: mostra o que acontece perto de um ponto.
- Continuidade: ausência de ruptura, salto ou buraco.

## 1. Função: entrada e saída

Imagine uma máquina.

Você coloca um número nela e ela devolve outro número.

Por exemplo:

\[
f(x) = x^2 - 4
\]

Se colocarmos $x = 2$:

\[
f(2) = 2^2 - 4 = 0
\]

Se colocarmos $x = 3$:

\[
f(3) = 3^2 - 4 = 5
\]

Podemos pensar assim:

\[
\boxed{x} \longrightarrow \boxed{f(x)}
\]

A função recebe uma entrada e produz uma saída.

Matematicamente:

\[
f : A \rightarrow B
\]

Isso significa que a função relaciona elementos do conjunto $A$ com elementos do conjunto $B$.

O ponto mais importante é:

> Para cada entrada permitida, a função deve produzir uma única saída.

## 2. Vamos enxergar a função

Considere novamente:

\[
f(x) = x^2 - 4
\]

Alguns valores são:

\[
f(-3)=5,\quad f(-2)=0,\quad f(-1)=-3,\quad f(0)=-4
\]

\[
f(1)=-3,\quad f(2)=0,\quad f(3)=5
\]

Agora, em vez de olhar apenas para os números, vamos colocar esses pontos no plano cartesiano.

<svg viewBox="0 0 700 430" width="100%" role="img" aria-label="Gráfico da função f(x)=x²-4">
  <line x1="60" y1="210" x2="660" y2="210" stroke="currentColor" stroke-width="2"/>
  <line x1="350" y1="30" x2="350" y2="390" stroke="currentColor" stroke-width="2"/>

  <path d="M 90 30 Q 350 390 610 30" fill="none" stroke="currentColor" stroke-width="3"/>

  <circle cx="90" cy="30" r="5" fill="currentColor"/>
  <circle cx="176" cy="140" r="5" fill="currentColor"/>
  <circle cx="263" cy="190" r="5" fill="currentColor"/>
  <circle cx="350" cy="210" r="6" fill="currentColor"/>
  <circle cx="437" cy="190" r="5" fill="currentColor"/>
  <circle cx="524" cy="140" r="5" fill="currentColor"/>
  <circle cx="610" cy="30" r="5" fill="currentColor"/>

  <g font-family="sans-serif" font-size="15" fill="currentColor">
    <text x="645" y="200" text-anchor="start">x</text>
    <text x="354" y="40" text-anchor="middle">y</text>
    <text x="352" y="232" text-anchor="middle">0</text>
    <text x="520" y="232" text-anchor="middle">2</text>
    <text x="182" y="232" text-anchor="middle">-2</text>
    <text x="355" y="198" text-anchor="middle">-4</text>
  </g>
</svg>

Legenda do gráfico:

- eixo horizontal: $x$
- eixo vertical: $y$
- ponto mínimo: $(0, -4)$
- pontos marcados: $(-2,0)$, $(2,0)$

Agora conseguimos perceber algo que uma lista de números não mostra tão bem:

- a função diminui quando $x$ vai de valores negativos em direção a $0$;
- ela atinge seu menor valor em $x=0$;
- depois começa a aumentar;
- o gráfico possui formato de parábola;
- o ponto mais baixo é $(0,-4)$.

É justamente por isso que os gráficos são tão importantes no Cálculo.

## 3. Domínio: quais valores podem entrar?

Agora vem uma pergunta importante:

> Podemos colocar qualquer número em uma função?

Nem sempre.

Considere:

\[
g(x) = \frac{1}{x-2}
\]

Podemos colocar $x = 5$?

Sim:

\[
g(5) = \frac{1}{5-2} = \frac{1}{3}
\]

Podemos colocar $x=0$?

Sim:

\[
g(0) = \frac{1}{-2} = -\frac{1}{2}
\]

Mas podemos colocar $x=2$?

Não.

Teríamos:

\[
g(2) = \frac{1}{2-2} = \frac{1}{0}
\]

E divisão por zero não existe.

Portanto, o número $2$ não pertence ao domínio.

Assim:

\[
D = \mathbb{R} \setminus \{2\}
\]

Ou seja:

> O domínio é o conjunto de valores que podemos colocar na função.

## 4. Imagem: quais valores podem sair?

Agora fazemos a pergunta contrária:

> Quais valores a função consegue produzir?

Considere novamente:

\[
f(x) = x^2 - 4
\]

Sabemos que:

\[
x^2 \ge 0
\]

Portanto:

\[
x^2 - 4 \ge -4
\]

A função nunca produzirá um valor menor que $-4$.

Seu menor valor é:

\[
f(0) = -4
\]

Então:

\[
Im(f) = [-4, +\infty)
\]

No gráfico, isso fica muito mais fácil de enxergar: a curva começa em $y = -4$ e, a partir daí, sobe para os dois lados.

## 5. Crescendo ou diminuindo?

Observe novamente o gráfico de:

\[
f(x) = x^2 - 4
\]

Quando caminhamos pelo eixo $x$ da esquerda para a direita, percebemos duas coisas diferentes.

Antes de $x=0$, a função está diminuindo.

Depois de $x=0$, a função está aumentando.

Podemos resumir:

\[
x < 0 \Rightarrow \text{função decrescente}
\]

\[
x > 0 \Rightarrow \text{função crescente}
\]

E em:

\[
x = 0
\]

temos o ponto mínimo.

Mais adiante, a derivada será uma ferramenta para identificar exatamente esse comportamento.

## 6. Agora vem a ideia de limite

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

## 7. Limite pela esquerda

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

## 8. Limite pela direita

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

## 9. Vamos colocar isso em um gráfico

Considere:

\[
f(x) = \frac{1}{x-2}
\]

O número $2$ não pertence ao domínio.

Mas o que acontece quando chegamos perto dele?

<svg viewBox="0 0 800 500" width="100%" role="img" aria-label="Gráfico da função 1 dividido por x menos 2 com assíntota vertical em x igual a 2">
  <line x1="70" y1="250" x2="750" y2="250" stroke="currentColor" stroke-width="2"/>
  <line x1="400" y1="40" x2="400" y2="460" stroke="currentColor" stroke-width="2" stroke-dasharray="8 8"/>

  <path d="M 80 270 C 180 270 300 280 370 320 C 390 340 395 390 398 455" fill="none" stroke="currentColor" stroke-width="3"/>
  <path d="M 402 45 C 405 100 410 160 430 190 C 500 225 600 235 720 240" fill="none" stroke="currentColor" stroke-width="3"/>

  <text x="410" y="60" font-size="18">x = 2</text>
  <text x="725" y="240" font-size="18">x</text>
  <text x="410" y="55" font-size="18">y</text>
</svg>

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

## 10. Então o que é o limite?

Agora podemos entender a ideia de forma mais natural.

Quando escrevemos:

\[
\lim_{x\to a} f(x) = L
\]

estamos dizendo:

> Quando $x$ fica cada vez mais próximo de $a$, os valores de $f(x)$ ficam cada vez mais próximos de $L$.

O ponto importante é que estamos interessados no comportamento próximo de $a$.

Não necessariamente no valor da função exatamente em $a$.

## 11. Um exemplo em que a função nem existe no ponto

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

## 12. Quando os dois lados concordam

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

## 13. Limites trigonométricos

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

## 14. Regra prática para tirar a raiz

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

Como $x\neq0$ perto de zero, podemos cancelar $x$:

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

## 15. Teorema do confronto

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

## 16. Continuidade

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

## 17. Contextualização: o que isso significa no mundo real?

Imagine uma fábrica que mede o custo de produção de um item em função da quantidade produzida.

Se o custo muda de forma suave, a função é contínua. Mas se, em certo ponto, o custo “salta” por causa de um novo turno ou de uma mudança de capacidade, então a função deixa de ser contínua.

Outro exemplo é a temperatura de um sistema: em alguns pontos, a temperatura pode variar de forma contínua; em outros, pode haver uma mudança brusca por causa de uma reação ou de uma troca de fase.

Esse tipo de raciocínio é importante porque o Cálculo não é apenas manipular símbolos: ele descreve como fenômenos reais mudam e quando essa mudança deixa de ser suave.

## 18. Exercícios de fixação

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

## 19. O que aprendemos?

Neste estágio, você começou a construir a linguagem usada no Cálculo.

Uma função transforma entradas em saídas.

O domínio diz quais entradas são permitidas.

A imagem mostra quais saídas podem aparecer.

O gráfico permite visualizar o comportamento da função.

O limite responde a uma pergunta diferente:

> O que acontece com a função quando nos aproximamos de determinado ponto?

Quando nos aproximamos pela esquerda:

\[
x\to a^-
\]

usamos valores menores que $a$.

Quando nos aproximamos pela direita:

\[
x\to a^+
\]

usamos valores maiores que $a$.

Alguns limites aparecem em formas clássicas, como:

\[
\lim_{x\to0} \frac{\sin x}{x} = 1
\]

e outros são resolvidos com racionalização, multiplicando pela conjugada para remover a raiz.

Se os dois lados chegam ao mesmo valor, então o limite bilateral existe:

\[
\lim_{x\to a} f(x) = L
\]

E quando a função fica sempre entre duas outras, o teorema do confronto nos ajuda a concluir o limite mesmo sem conhecer a função diretamente.

A partir dessas ideias, podemos avançar para conceitos cada vez mais importantes do Cálculo: derivadas, taxas de variação, máximos, mínimos e integrais.

## Listas de Exercicios

- [Lista 1](https://1drv.ms/b/c/975ec841994373bd/IQBaXjSrZWcoT7vvw1QUPg9mAfWveNG3TNDBKZ0gKLligDE?e=4h7oHI)
- [Lista 2](https://1drv.ms/b/c/975ec841994373bd/IQBAcKaregNgTZbl72o2FbLcAY2t5worOQoB8F3iepQTQlc?e=0OkyI8)