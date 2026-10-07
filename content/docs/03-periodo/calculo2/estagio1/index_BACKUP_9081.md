---
<<<<<<< HEAD
title: Estágio 1
weight: 1
description: Técnicas de Integração, Integrais Impróprias, Testes de Comparação 
=======
title: Cálculo 2
weight: 2
description: Continuação de Cálculo 1
>>>>>>> main
autores:
  - hilbertmgomes
date: 2026-10-07
---


## Técnicas de Integração

### Resumo sobre Integrais

De uma forma resumida: seja f = f(x) uma função qualquer, a integral indefinida representa o conjunto de todas as funções cuja a derivada seja igual a f, também chamadas de **primitivas** de f. A integral indefinida com base em f é representada por:

                                                          $\int f(x) dx$

Em que:
- A função f, nesse caso, é chamado de **integrando**;
- dx é chamado de **diferencial** da função f. Não precisamos entrar em detalhes sobre o diferencial por enquanto, apenas lembre-se que
o diferencial serve para indicar qual a variável do integrando, por exemplo: se a nossa função f fosse definida como f = f(y) ao invés de f = f(x), o diferencial seria
dy ao invés de dx.

Conforme dito anteriormente, uma integral indefinida representa um conjunto de funções cuja derivada é igual ao integrando. Assim, representamos esse conjunto de funções como, para o mesmo f definido anteriormente, sendo g = g(x) outra função:

                                                            g(x) + C

Em que:
- A função f é a derivada da função g;
- C é um número constante qualquer pertencente ao conjunto dos números reais. Entraremos em detalhes sobre essa constante adiante.

#### Vamos a um exemplo:

Queremos calcular seguinte integral indefinida:

                                                          $\int x dx$

Resgatando um pouco dos conhecimentos sobre derivadas, sabemos que a derivada de x² é 2x, que é bem próximo do x que queremos. Além disso, sabemos que a derivada de um número constante multiplicado por uma função, sempre será igual a multiplicação desse número constante vezes a derivada da função, ou seja, para qualquer f = f(x), e para qualquer k pertencente aos reais:

                                                        [k * f(x)]' = k * f(x)'

Assim, como x² é uma função qualquer, substituímos f(x) por x² na expressão:

                                                        (k * x²)' = k * (x²)' 

Conforme relembrado anteriormente, a derivada de x² é 2x. Logo, temos:

                                                        (k * x²)' = k * 2x

Como k pode ser qualquer número real, vamos escolher um k que nos ajude a chegar na derivada que queremos, que é x. Assim, escolhemos 1/2, pois 1/2 * 2x é x:

                                                        (1/2 * x²)' = 1/2 * 2x

                                                        (x²/2)' = x

Assim, encontramos que x²/2 é uma função cuja derivada é x. Mas ainda não chegamos à resposta final, pois a integral indefinida requer uma resposta que represente um conjunto de funções. Resgatando novamente os conhecimentos sobre derivada, sabemos que a derivada de qualquer número real é 0. Assim, como a derivada da soma de duas funções é igual a soma das derivadas de cada uma das funções, percebe-se que, sendo C um número real qualquer:

                                                        (x²/2 + C) = (x²/2)' + (C)' = x + 0 = x

Note que, existem infinitas possibilidades de números que podem ocupar a posição do C, o que implica que existem infinitas funções cuja a derivada é x, todas seguindo o formato x²/2 + C. Portanto, temos o nosso conjunto de funções cuja a derivada é x, exigida pela integral indefinida inicial:

                                                        $\int x dx$ = x²/2 + C

*Observação: Não incluir o "+ C" na função final resultante de qualquer integral indefinida implica que o C é 0, que é apenas uma das funções cuja derivada é o integrando. Em integrais indefinidas, deve-se representar todas as soluções possíveis para a integral, assim, não esqueça de incluir o "+ C"!*  


## Antes de Começar

Antes de começar a estudar a disciplina, recomenda-se que os seguintes conteúdos estejam bem 

