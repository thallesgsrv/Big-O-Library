---
title: Princípio da casa dos pombos
weight: 7
description: Se há mais objetos do que caixas, alguma caixa tem mais de um. Enunciado, prova e usos.
autores:
  - thallesgsrv
date: 2026-10-30
---

## Sobre

Se você guarda 13 meias em 12 gavetas, alguma gaveta fica com pelo menos duas. Parece óbvio, e é: esse é o **princípio da casa dos pombos** (ou das gavetas). O interessante é o quanto ele rende. Ele prova que certas coisas *têm* que acontecer sem dizer qual caso acontece, e aparece em coisas tão diferentes quanto aniversários, restos de divisão e colisões em tabelas hash.

## Enunciado

> [!NOTE]
> **Princípio da casa dos pombos.** Se $n$ objetos são colocados em $k$ caixas e $n > k$, então alguma caixa contém pelo menos 2 objetos.

**Por que vale?** Suponha, por contradição, que cada caixa tivesse no máximo 1 objeto. Então o total de objetos seria no máximo $k$. Mas temos $n > k$ objetos, o que é uma contradição. $\blacksquare$

Repare no que o princípio **não** diz: ele não aponta qual caixa tem dois objetos, nem quantas caixas estão nessa situação. Só garante que existe uma.

## Versão generalizada

Com mais objetos, dá para garantir mais do que 2 numa mesma caixa.

> [!NOTE]
> Se $n$ objetos são colocados em $k$ caixas, alguma caixa contém pelo menos $\lceil n/k \rceil$ objetos.

Aqui $\lceil x \rceil$ é o menor inteiro maior ou igual a $x$ (o "teto" de $x$). A prova é a mesma: se toda caixa tivesse menos de $\lceil n/k \rceil$, isto é, no máximo $\lceil n/k \rceil - 1$ objetos, o total seria no máximo $k(\lceil n/k \rceil - 1) < n$, o que é absurdo.

**Exemplo.** Em um grupo de 100 pessoas, quantas fazem aniversário no mesmo mês, no mínimo? Com $n = 100$ e $k = 12$ meses, $\lceil 100/12 \rceil = \lceil 8{,}33 \rceil = 9$. Então pelo menos 9 pessoas fazem aniversário no mesmo mês.

## Como usar: identifique as caixas

A parte difícil de aplicar o princípio é decidir **quem são os objetos e quem são as caixas**. Em geral as caixas são as "categorias" possíveis, e os objetos são os elementos que você tem.

**Exemplo 1: restos da divisão.** Entre quaisquer 5 números inteiros, há dois cuja diferença é divisível por 4.

- Objetos: os 5 números. Caixas: os possíveis restos na divisão por 4, que são $0, 1, 2, 3$ (4 caixas).
- Como $5 > 4$, dois números têm o mesmo resto $r$. Escrevendo $a = 4p + r$ e $b = 4q + r$, a diferença $a - b = 4(p - q)$ é divisível por 4. $\blacksquare$

**Exemplo 2: pares que somam 11.** Escolhendo 6 números do conjunto $\{1, 2, \dots, 10\}$, há dois que somam 11.

- Caixas: os pares $\{1,10\}, \{2,9\}, \{3,8\}, \{4,7\}, \{5,6\}$, cada um somando 11 (5 caixas).
- Cada número escolhido está em exatamente uma caixa. Como escolhemos 6 números e há só 5 caixas, duas escolhas caem na mesma caixa, ou seja, são os dois números de um mesmo par, que somam 11. $\blacksquare$

## Ligação com computação

Em uma **tabela hash**, cada chave é levada a uma posição (uma "caixa") do array. Se há mais chaves possíveis do que posições, o princípio garante que haverá **colisões**: duas chaves diferentes com a mesma posição. Não é defeito de projeto, é consequência matemática; por isso toda tabela hash precisa de uma estratégia para tratar colisões. O mesmo raciocínio mostra que nenhum algoritmo de compressão consegue encurtar *todos* os arquivos.

## Erros comuns

- **Escolher mal as caixas.** Se as caixas forem muitas demais, o princípio não se aplica. No exemplo 2, usar cada número como uma caixa (10 caixas) não funcionaria.
- **Achar que o princípio diz qual caixa repete.** Ele garante só a existência.
- **Confundir o mínimo garantido com o que acontece "em geral".** O $\lceil n/k \rceil$ é o que se garante no **pior** caso, não o que acontece tipicamente.

## Exercícios

1. Quantas cartas, no mínimo, é preciso tirar de um baralho de 52 cartas (4 naipes) para garantir que duas são do mesmo naipe? E para garantir três do mesmo naipe?
2. Prove que, entre 13 pessoas, pelo menos duas fazem aniversário no mesmo mês.

{{< details title="Gabarito" >}}
1. Para duas do mesmo naipe: 5 cartas (com 4 caixas, 5 objetos forçam uma repetição, e 4 cartas poderiam ser de naipes todos diferentes). Para três do mesmo naipe: 9 cartas, porque 8 cartas poderiam ser 2 de cada naipe, e a 9ª garante um naipe com 3 ($\lceil 9/4 \rceil = 3$).
2. Objetos: as 13 pessoas. Caixas: os 12 meses. Como $13 > 12$, algum mês contém pelo menos 2 aniversários.
{{< /details >}}

## Resumo

- Mais objetos do que caixas implica uma caixa com pelo menos 2 objetos.
- Generalizado: alguma caixa tem pelo menos $\lceil n/k \rceil$ objetos.
- O trabalho está em escolher bem as caixas. O princípio só garante a **existência**, não aponta qual.
- Explica, por exemplo, por que colisões em tabelas hash são inevitáveis.
