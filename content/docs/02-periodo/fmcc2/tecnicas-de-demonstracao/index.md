---
title: Técnicas de demonstração
weight: 1
description: Prova direta, contrapositiva, por absurdo e por casos, com um exemplo de cada.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

Uma **demonstração** é um argumento que convence qualquer leitor, passo a passo, de que uma afirmação é verdadeira. Exemplos não provam uma afirmação geral ("vale para todo $n$"), mas **um contraexemplo basta para refutá-la**.

## Vocabulário

- **Teorema:** afirmação que se prova. **Lema:** teorema auxiliar. **Corolário:** consequência direta.
- **Definição:** o significado exato de um termo. Quase toda prova começa por ela.

Neste texto, $n$ é **par** se $n=2k$ para algum inteiro $k$, e **ímpar** se $n=2k+1$.

## Prova direta

Parta da hipótese e chegue à conclusão.

**Afirmação:** se $n$ é par, então $n^2$ é par.
Se $n=2k$, então $n^2=4k^2=2(2k^2)$, que é par. $\blacksquare$

## Prova por contrapositiva

Para provar $p\to q$, prove $\neg q\to\neg p$, que é equivalente.

**Afirmação:** se $n^2$ é par, então $n$ é par.
Provar direto é incômodo. Pela contrapositiva: se $n$ é ímpar, $n=2k+1$, então $n^2=4k^2+4k+1=2(2k^2+2k)+1$, ímpar. $\blacksquare$

## Prova por absurdo

Suponha que a afirmação é falsa e chegue a uma contradição.

**Afirmação:** $\sqrt2$ é irracional.
Suponha $\sqrt2=a/b$, fração irredutível. Então $a^2=2b^2$, logo $a^2$ é par, e pelo resultado anterior $a$ é par: $a=2c$. Daí $4c^2=2b^2$, ou seja $b^2=2c^2$, e $b$ também é par. Mas $a$ e $b$ pares contradizem a fração irredutível. $\blacksquare$

## Prova por casos

Divida as possibilidades e trate cada uma.

**Afirmação:** $n^2+n$ é par para todo inteiro $n$.
Se $n$ é par, $n^2$ e $n$ são pares, e a soma é par. Se $n$ é ímpar, $n^2$ e $n$ são ímpares, e a soma de dois ímpares é par. $\blacksquare$

## Erros comuns

- **Provar com um exemplo.** Testar $n=2$ não prova nada para todo $n$.
- **Usar o que se quer provar** no meio do argumento.
- **Confundir $p\to q$ com $q\to p$.** A recíproca não é equivalente.

## Exercícios

1. Prove que a soma de dois números ímpares é par.
2. Refute: "todo número da forma $n^2+n+41$ é primo".

{{< details title="Gabarito" >}}
1. $(2a+1)+(2b+1)=2(a+b+1)$, par.
2. Com $n=41$: $41^2+41+41=41\cdot43$, que não é primo.
{{< /details >}}
