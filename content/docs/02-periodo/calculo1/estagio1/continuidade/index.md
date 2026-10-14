---
title: Continuidade
weight: 3
description: Definição, tipos de descontinuidade, propriedades e o Teorema do Valor Intermediário.
autores:
  - thallesgsrv
date: 2026-10-01
---

## 1. A ideia: desenhar sem tirar o lápis

Uma função é **contínua** quando seu gráfico pode ser traçado sem levantar o lápis. Se há um **buraco**, um **salto** ou uma **explosão** (assíntota), há descontinuidade.

## 2. Definição

$f$ é contínua em $x=a$ quando:
$$
\boxed{\lim_{x\to a}f(x)=f(a)}
$$
Isso exige **três coisas** ao mesmo tempo:

1. $f(a)$ existe;
2. $\lim_{x\to a}f(x)$ existe;
3. os dois são iguais.

Se uma falha, há descontinuidade. $f$ é **contínua** se for contínua em todo ponto do seu domínio. Também há continuidade **à direita** ($\lim_{x\to a^+}f=f(a)$) e **à esquerda** ($\lim_{x\to a^-}f=f(a)$); contínua em $a$ equivale a contínua dos dois lados.

## 3. Tipos de descontinuidade

| Tipo | O que acontece | Exemplo |
| --- | --- | --- |
| **Removível** | O limite existe, mas $f(a)$ não existe ou é diferente | $\dfrac{x^2-1}{x-1}$ em $x=1$ |
| **Salto** | Laterais existem e são **diferentes** | $\dfrac{\lvert x\rvert}{x}$ em $0$ |
| **Infinita** | Pelo menos um lado vai a $\pm\infty$ | $\dfrac1x$ em $0$ |

"Removível" porque dá para **consertar** redefinindo o valor no ponto. No primeiro exemplo, definir $f(1)=2$ torna a função contínua.

## 4. Quem já é contínua (sem precisar testar)

- **Polinômios**, $e^x$, $\operatorname{sen}$, $\cos$, e raízes: contínuas em todo o seu domínio.
- **Funções racionais**, $\operatorname{tg}$, $\ln$: contínuas **onde estão definidas**.
- **Somas, produtos, quocientes** (com denominador $\ne0$) e **composições** de contínuas são contínuas.

Por isso, em pontos do domínio dessas funções, **limite = substituição direta**.

## 5. Receita: achar valor para a função ficar contínua

1. Calcule os limites laterais no ponto (ou o limite, se for fórmula única).
2. **Iguale** os laterais e iguale ao valor da função.
3. Resolva a equação para a constante.

**Exemplo 1.** Para que valor de $c$ a função
$$
f(x)=\begin{cases}x^2-1,&x<2\\ c\,x+1,&x\ge2\end{cases}
$$
é contínua em $2$? Esquerda: $4-1=3$. Direita: $2c+1$. Igualando: $2c+1=3\Rightarrow c=1$.

**Exemplo 2 (removível).** $f(x)=\dfrac{x^2-9}{x-3}$ para $x\ne3$. Como $f(x)=x+3$ perto de $3$, o limite é $6$. Definindo $f(3)=6$, vira contínua.

## 6. Teorema do Valor Intermediário (TVI)

Se $f$ é **contínua** em $[a,b]$ e $N$ é qualquer número entre $f(a)$ e $f(b)$, existe $c\in[a,b]$ com $f(c)=N$.

**Intuição:** para ir do chão ao 10º andar de elevador sem pular, você passa por todos os andares do meio. Uma função contínua não "pula" valores.

**Uso clássico (existência de raiz):** se $f$ é contínua e $f(a)$ e $f(b)$ têm **sinais opostos**, há uma raiz em $(a,b)$.

**Exemplo 3.** $f(x)=x^3+x-1$ tem raiz em $(0,1)$? $f(0)=-1<0$ e $f(1)=1>0$, $f$ é contínua (polinômio). Sim, existe $c\in(0,1)$ com $f(c)=0$.

> [!WARNING]
> O TVI **exige continuidade no intervalo todo**. Com $f(x)=\frac1x$, $f(-1)=-1$ e $f(1)=1$ mas **não há** raiz: $f$ não é contínua em $0$.

## Exercícios

**Exercício 1.** $f$ é contínua em $x=1$? $f(x)=\dfrac{x^2-1}{x-1}$ para $x\ne1$ e $f(1)=3$.

{{< details title="Gabarito" >}}
$\lim_{x\to1}f=2\ne f(1)=3$. **Não** é contínua (removível).
{{< /details >}}

**Exercício 2.** Ache $k$ para que $f(x)=\begin{cases}kx,&x\le1\\x^2+1,&x>1\end{cases}$ seja contínua em $1$.

{{< details title="Gabarito" >}}
Esquerda: $k$. Direita: $2$. Logo $k=2$.
{{< /details >}}

**Exercício 3.** Classifique a descontinuidade de $g(x)=\dfrac1{x-2}$ em $x=2$.

{{< details title="Gabarito" >}}
Infinita ($-\infty$ à esquerda, $+\infty$ à direita; assíntota vertical).
{{< /details >}}

**Exercício 4.** Mostre que $x^3=2x+1$ tem solução em $[1,2]$.

{{< details title="Gabarito" >}}
$f(x)=x^3-2x-1$ é contínua. $f(1)=-2<0$, $f(2)=3>0$. Pelo TVI, existe raiz em $(1,2)$.
{{< /details >}}

**Exercício 5.** Onde $h(x)=\dfrac{x}{x^2-1}$ é contínua?

{{< details title="Gabarito" >}}
Em todo o domínio: $\mathbb R\setminus\{-1,1\}$.
{{< /details >}}
