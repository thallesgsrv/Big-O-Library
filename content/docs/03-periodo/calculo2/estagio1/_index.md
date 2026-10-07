---
title: Estágio 1
weight: 1
description: Técnicas de Integração, Integrais Impróprias, Testes de Comparação
autores:
  - hilbertmgomes
date: 2026-10-07
---

## Técnicas de Integração

### Resumo sobre Integrais

De forma resumida: seja $f = f(x)$ uma função qualquer. A integral indefinida representa o conjunto de todas as funções cuja derivada é igual a $f$, também chamadas de **primitivas** de $f$. A integral indefinida de $f$ é representada por:

$$\int f(x)\,dx$$

Em que:

- A função $f$, nesse caso, é chamada de **integrando**;
- $dx$ é chamado de **diferencial**. Não precisamos entrar em detalhes sobre o diferencial por enquanto; apenas lembre-se de que ele indica qual é a variável do integrando. Por exemplo: se a função fosse definida como $f = f(y)$ em vez de $f = f(x)$, o diferencial seria $dy$ em vez de $dx$.

Conforme dito, uma integral indefinida representa um conjunto de funções cuja derivada é igual ao integrando. Assim, para o mesmo $f$ definido anteriormente, sendo $g = g(x)$ outra função, representamos esse conjunto como:

$$g(x) + C$$

Em que:

- A função $f$ é a derivada da função $g$, isto é, $g'(x) = f(x)$;
- $C$ é uma constante qualquer pertencente ao conjunto dos números reais. Entraremos em detalhes sobre essa constante adiante.

#### Vamos a um exemplo

Queremos calcular a seguinte integral indefinida:

$$\int x\,dx$$

Resgatando um pouco dos conhecimentos sobre derivadas, sabemos que a derivada de $x^2$ é $2x$, que é bem próxima do $x$ que queremos. Além disso, sabemos que a derivada de uma constante multiplicada por uma função é a constante multiplicada pela derivada da função, ou seja, para qualquer $f = f(x)$ e para qualquer $k \in \mathbb{R}$:

$$[k \cdot f(x)]' = k \cdot f'(x)$$

Como $x^2$ é uma função qualquer, substituímos $f(x)$ por $x^2$ na expressão:

$$(k \cdot x^2)' = k \cdot (x^2)'$$

Como a derivada de $x^2$ é $2x$, temos:

$$(k \cdot x^2)' = k \cdot 2x$$

Como $k$ pode ser qualquer número real, vamos escolher um $k$ que nos leve à derivada que queremos, que é $x$. Escolhemos $k = \frac{1}{2}$, pois $\frac{1}{2} \cdot 2x = x$:

$$\left(\frac{1}{2} \cdot x^2\right)' = \frac{1}{2} \cdot 2x$$

$$\left(\frac{x^2}{2}\right)' = x$$

Assim, encontramos que $\frac{x^2}{2}$ é uma função cuja derivada é $x$. Mas ainda não chegamos à resposta final, pois a integral indefinida requer uma resposta que represente um conjunto de funções. Resgatando novamente os conhecimentos sobre derivadas, sabemos que a derivada de qualquer constante real é $0$. Como a derivada de uma soma é a soma das derivadas, percebe-se que, sendo $C$ um número real qualquer:

$$\left(\frac{x^2}{2} + C\right)' = \left(\frac{x^2}{2}\right)' + (C)' = x + 0 = x$$

Note que existem infinitas possibilidades para o valor de $C$, o que implica que existem infinitas funções cuja derivada é $x$, todas no formato $\frac{x^2}{2} + C$. Portanto, o conjunto de funções cuja derivada é $x$, exigido pela integral indefinida inicial, é:

$$\int x\,dx = \frac{x^2}{2} + C$$

*Observação: não incluir o "$+ C$" no resultado de uma integral indefinida equivale a assumir $C = 0$, que é apenas uma das funções cuja derivada é o integrando. Em integrais indefinidas, deve-se representar todas as soluções possíveis; portanto, não esqueça de incluir o "$+ C$"!*

## Antes de Começar

Antes de começar a estudar a disciplina, recomenda-se que os seguintes conteúdos estejam bem consolidados:

- (liste aqui os pré-requisitos)
