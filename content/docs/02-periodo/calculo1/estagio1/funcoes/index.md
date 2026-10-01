---
title: Funções
weight: 1
description: Entrada e saída, domínio, imagem e comportamento de funções.
autores:
    - thallesgsrv
date: 2026-10-01
---

## 1. Função: entrada e saída

Imagine uma máquina.

Você coloca um número nela e ela devolve outro número.

Por exemplo:

\[
f(x) = x^2 - 4
\]

Se colocarmos \(x = 2\):

\[
f(2) = 2^2 - 4 = 0
\]

Se colocarmos \(x = 3\):

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

Isso significa que a função relaciona elementos do conjunto \(A\) com elementos do conjunto \(B\).

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

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 430" width="100%" role="img" aria-label="Gráfico da função f(x)=x²-4" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;display:block;">
<line x1="60" y1="210" x2="660" y2="210" stroke="currentColor" stroke-width="2"></line>
<line x1="350" y1="30" x2="350" y2="390" stroke="currentColor" stroke-width="2"></line>
<path d="M90 350 C 160 120 540 120 610 350" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
<circle cx="90" cy="350" r="5" fill="currentColor"></circle>
<circle cx="176" cy="260" r="5" fill="currentColor"></circle>
<circle cx="263" cy="220" r="5" fill="currentColor"></circle>
<circle cx="350" cy="210" r="6" fill="currentColor"></circle>
<circle cx="437" cy="220" r="5" fill="currentColor"></circle>
<circle cx="524" cy="260" r="5" fill="currentColor"></circle>
<circle cx="610" cy="350" r="5" fill="currentColor"></circle>
</svg>
<p style="font-size:0.95rem;margin-top:0.5rem">Legenda: eixo horizontal = x; eixo vertical = y; ponto mínimo = (0, -4); pontos marcados = (-2,0), (2,0).</p>

Legenda do gráfico:

- eixo horizontal: \(x\)
- eixo vertical: \(y\)
- ponto mínimo: \((0, -4)\)
- pontos marcados: \((-2,0)\), \((2,0)\)

Agora conseguimos perceber algo que uma lista de números não mostra tão bem:

- a função diminui quando \(x\) vai de valores negativos em direção a \(0\);
- ela atinge seu menor valor em \(x=0\);
- depois começa a aumentar;
- o gráfico possui formato de parábola;
- o ponto mais baixo é \((0,-4)\).

É justamente por isso que os gráficos são tão importantes no Cálculo.

## 3. Domínio: quais valores podem entrar?

Agora vem uma pergunta importante:

> Podemos colocar qualquer número em uma função?

Nem sempre.

Considere:

\[
g(x) = \frac{1}{x-2}
\]

Podemos colocar \(x = 5\)?

Sim:

\[
g(5) = \frac{1}{5-2} = \frac{1}{3}
\]

Podemos colocar \(x=0\)?

Sim:

\[
g(0) = \frac{1}{-2} = -\frac{1}{2}
\]

Mas podemos colocar \(x=2\)?

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

