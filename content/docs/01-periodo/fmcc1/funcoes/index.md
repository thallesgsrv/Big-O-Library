---
title: Funções
weight: 1
description: Domínio, contradomínio, injetora, sobrejetora, bijetora, composição e inversa.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

Uma **função** $f: A \to B$ associa a **cada** elemento de $A$ (o domínio) **exatamente um** elemento de $B$ (o contradomínio). A imagem de $f$ é o conjunto dos valores que realmente aparecem.

> [!IMPORTANT]
> "Cada elemento de $A$ tem **uma única** saída." Sobrar elementos em $B$ sem ligação é permitido. Um elemento de $A$ com duas saídas, não.

## Três propriedades

| Tipo | Condição | Em palavras |
| --- | --- | --- |
| **Injetora** | $f(a)=f(a') \Rightarrow a=a'$ | duas entradas diferentes nunca dão a mesma saída |
| **Sobrejetora** | para todo $b\in B$ existe $a$ com $f(a)=b$ | todo elemento do contradomínio é atingido |
| **Bijetora** | injetora e sobrejetora | cada saída vem de exatamente uma entrada |

Exemplos com $f:\mathbb{Z}\to\mathbb{Z}$:

- $f(x)=2x$ é injetora, mas não sobrejetora (ninguém vira 3).
- $f(x)=x^2$ não é injetora ($f(2)=f(-2)$) nem sobrejetora (ninguém vira $-1$).
- $f(x)=x+1$ é bijetora.

## Composição

$(g\circ f)(x) = g(f(x))$: aplica $f$ primeiro, depois $g$. A ordem importa. Com $f(x)=x+1$ e $g(x)=2x$: $(g\circ f)(3)=8$, mas $(f\circ g)(3)=7$.

## Função inversa

Só funções **bijetoras** têm inversa $f^{-1}$, que desfaz o que $f$ fez: $f^{-1}(f(x))=x$. Para $f(x)=x+1$, temos $f^{-1}(y)=y-1$.

## Por que isso importa em computação

Uma função de **hash** não é injetora (há colisões). Uma **criptografia** precisa ser bijetora, senão você não consegue decifrar. Contar elementos de dois conjuntos usando uma bijeção entre eles também é uma técnica clássica.

## Exercícios

1. $f:\mathbb{N}\to\mathbb{N}$, $f(n)=n+2$ é injetora? É sobrejetora?
2. Ache a inversa de $f(x)=3x-5$ em $\mathbb{R}$.

{{< details title="Gabarito" >}}
1. Injetora, sim: $n+2=m+2$ implica $n=m$. Sobrejetora, não: ninguém vira 0 nem 1.
2. Resolva $y=3x-5$ para $x$: $f^{-1}(y)=\dfrac{y+5}{3}$.
{{< /details >}}
