---
title: Sequências e somatórios
weight: 3
description: Progressões aritméticas e geométricas, notação de somatório e somas com fórmula fechada.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

Uma **sequência** é uma lista ordenada de números: $a_1, a_2, a_3,\dots$. Um **somatório** é a soma de uma sequência. Ambos aparecem em análise de algoritmos, sempre que há um laço somando coisas.

## Duas sequências importantes

| Tipo | Regra | Termo geral | Exemplo |
| --- | --- | --- | --- |
| **Aritmética** | soma $r$ a cada passo | $a_n=a_1+(n-1)r$ | $3,7,11,15,\dots$ ($r=4$) |
| **Geométrica** | multiplica por $q$ a cada passo | $a_n=a_1\,q^{\,n-1}$ | $2,6,18,54,\dots$ ($q=3$) |

## Notação de somatório

$$
\sum_{i=1}^{n} a_i = a_1+a_2+\cdots+a_n
$$

Lê-se "soma de $a_i$, com $i$ indo de 1 até $n$". É um `for`: $i$ é o contador, e os limites dizem onde começa e termina.

```python
soma = 0
for i in range(1, n + 1):
    soma += i * i     # equivale a: soma de i^2, com i de 1 a n
```

Propriedades: $\sum (a_i+b_i)=\sum a_i+\sum b_i$ e $\sum c\,a_i=c\sum a_i$.

## Somas com fórmula fechada

- **Aritmética:** $\displaystyle\sum_{i=1}^{n} i=\frac{n(n+1)}{2}$. Truque de Gauss: pareie o primeiro com o último, o segundo com o penúltimo, e cada par soma $n+1$.
- **Geométrica:** $\displaystyle\sum_{i=0}^{n} q^i=\frac{q^{n+1}-1}{q-1}$, para $q\ne1$.

Exemplo: $1+2+4+8+\cdots+2^{10}=\dfrac{2^{11}-1}{2-1}=2047$.

Por que isso importa: um laço duplo que faz $1+2+\cdots+n$ operações custa $\frac{n(n+1)}{2}$, ou seja, cresce como $n^2$.

> [!NOTE]
> Essas fórmulas podem ser **provadas por indução**. Veja a página de [indução matemática](/docs/02-periodo/fmcc2/inducao/) de FMCC 2.

## Exercícios

1. Qual o 20º termo de $5,8,11,14,\dots$?
2. Calcule $\sum_{i=1}^{100} i$.
3. Calcule $3+6+12+24+48$.

{{< details title="Gabarito" >}}
1. $a_{20}=5+19\cdot3=62$.
2. $\frac{100\cdot101}{2}=5050$.
3. Geométrica com $q=2$ e 5 termos: $3\cdot\frac{2^5-1}{2-1}=93$.
{{< /details >}}
