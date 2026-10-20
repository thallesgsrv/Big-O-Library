---
title: Limites
weight: 2
description: Ideia de limite, limites laterais, propriedades, técnicas para 0/0, limites trigonométricos e teorema do confronto.
autores:
    - thallesgsrv
date: 2026-10-01
---

## 1. A ideia: para onde a função está indo?

Até agora perguntávamos: quanto vale \(f(2)\)? O limite pergunta outra coisa:

> O que acontece com \(f(x)\) quando \(x\) está **chegando perto** de \(2\)?

> [!TIP]
> Pense no limite como um GPS. Ele não diz onde a função *está* em \(x=a\); diz **para onde ela está indo** quando você se aproxima de \(a\). O valor \(f(a)\) é onde ela de fato está, e os dois podem até ser diferentes.

Podemos nos aproximar de \(a\) de dois lados:

- pela **esquerda** (valores menores que \(a\)): \(1{,}9;\ 1{,}99;\ 1{,}999\ldots\), escrito \(x\to2^-\);
- pela **direita** (valores maiores): \(2{,}1;\ 2{,}01;\ 2{,}001\ldots\), escrito \(x\to2^+\).

Isso dá os **limites laterais**.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" role="img" aria-label="Gráfico da função 1 dividido por x menos 2 com assíntota vertical em x igual a 2" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;display:block;">
<line x1="70" y1="250" x2="750" y2="250" stroke="currentColor" stroke-width="2"></line>
<line x1="400" y1="40" x2="400" y2="460" stroke="currentColor" stroke-width="2" stroke-dasharray="8 8"></line>
<path d="M80 280 C180 280 300 290 370 330 C390 350 395 400 398 460" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
<path d="M402 40 C405 100 410 160 430 190 C500 225 600 235 720 240" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path>
</svg>
<p style="font-size:0.95rem;margin-top:0.5rem">Legenda: assíntota vertical em x = 2; os ramos mostram comportamento para x→2⁻ e x→2⁺.</p>

## 2. Exemplo: assíntota e laterais diferentes

Tome \(f(x)=\dfrac{1}{x-2}\). O número \(2\) não está no domínio (daria \(\frac10\)). Vamos olhar os dois lados:

| \(x\) (esquerda) | \(x-2\) | \(f(x)\) |
| --- | --- | --- |
| \(1{,}9\) | \(-0{,}1\) | \(-10\) |
| \(1{,}99\) | \(-0{,}01\) | \(-100\) |
| \(1{,}999\) | \(-0{,}001\) | \(-1000\) |

| \(x\) (direita) | \(x-2\) | \(f(x)\) |
| --- | --- | --- |
| \(2{,}1\) | \(0{,}1\) | \(10\) |
| \(2{,}01\) | \(0{,}01\) | \(100\) |
| \(2{,}001\) | \(0{,}001\) | \(1000\) |

Pela esquerda, \(x-2\) é um número **negativo** minúsculo, então \(\frac{1}{\text{negativo minúsculo}}\) é negativo gigante. Pela direita, é positivo gigante:

$$
\lim_{x\to2^-}\frac1{x-2}=-\infty\qquad\qquad\lim_{x\to2^+}\frac1{x-2}=+\infty
$$

Os lados discordam, então **não existe** um número \(L\) que sirva de limite bilateral. A reta \(x=2\) é uma **assíntota vertical**.

## 3. Definição em palavras

$$
\lim_{x\to a}f(x)=L
$$

significa: quando \(x\) fica cada vez mais próximo de \(a\) (sem precisar ser igual a \(a\)), os valores \(f(x)\) ficam cada vez mais próximos de \(L\).

O limite **bilateral existe** se, e somente se, os dois laterais existem **e são iguais**:

$$
\lim_{x\to a}f(x)=L\iff\lim_{x\to a^-}f(x)=L\ \text{ e }\ \lim_{x\to a^+}f(x)=L
$$

## 4. Quando a função nem existe no ponto

**Vamos resolver:** \(\displaystyle\lim_{x\to1}\frac{x^2-1}{x-1}\)

1. Substituindo \(x=1\): \(\dfrac{1-1}{1-1}=\dfrac00\). A função não está definida em \(x=1\).
2. Mas \(x^2-1=(x-1)(x+1)\) (diferença de quadrados). Então, para \(x\ne1\):

$$
\frac{x^2-1}{x-1}=\frac{(x-1)(x+1)}{x-1}=x+1
$$

3. Perto de \(1\), \(x\ne1\) (estamos *chegando*, não *estando*), então o corte é permitido. Fica \(\lim_{x\to1}(x+1)=1+1=2\).

$$
\boxed{\lim_{x\to1}\frac{x^2-1}{x-1}=2}
$$

Perceba: \(f(1)\) **não existe**, mas o limite vale \(2\). O limite descreve o comportamento **ao redor** do ponto.

## 5. Módulo e funções por partes

O módulo \(\lvert x\rvert\) muda de comportamento em \(0\), então os lados costumam ser diferentes. A receita é **abrir o módulo em cada lado**:

$$
\lvert x\rvert=\begin{cases}x,&x\ge0\\-x,&x<0\end{cases}
$$

**Exemplo.** \(f(x)=\dfrac{\lvert x\rvert}{x}\) perto de \(0\):

- pela direita (\(x>0\)): \(\dfrac{x}{x}=1\), limite lateral \(1\);
- pela esquerda (\(x<0\)): \(\dfrac{-x}{x}=-1\), limite lateral \(-1\).

Os lados discordam, logo o limite bilateral **não existe**.

**Função por partes.** Seja \(f(x)=\begin{cases}x+1,&x<1\\3-x,&x\ge1\end{cases}\) e queremos \(\lim_{x\to1}f(x)\).

- Esquerda (\(x<1\)): \(\lim_{x\to1^-}(x+1)=2\).
- Direita (\(x\ge1\)): \(\lim_{x\to1^+}(3-x)=3-1=2\).

Concordam: o limite é \(2\). Em função por partes, **calcule cada lado com a fórmula do seu lado**.

## 6. Propriedades dos limites

Se \(\lim f=L\) e \(\lim g=M\) (números reais) e \(k\) é constante:

| Propriedade | Resultado |
| --- | --- |
| Soma e diferença | \(\lim(f\pm g)=L\pm M\) |
| Constante vezes função | \(\lim(kf)=kL\) |
| Produto | \(\lim(fg)=LM\) |
| Quociente | \(\lim\dfrac fg=\dfrac LM\), se \(M\ne0\) |
| Potência e raiz | \(\lim f^n=L^n\); \(\lim\sqrt[n]f=\sqrt[n]L\) (com \(L\ge0\) se \(n\) par) |

Para **polinômios**, basta substituir: \(\lim_{x\to2}(3x^2-x+1)=3(4)-2+1=11\). O mesmo vale para quocientes cujo denominador não zera: \(\lim_{x\to3}\dfrac{x^2+1}{x-1}=\dfrac{10}{2}=5\).

> [!WARNING]
> Todas essas propriedades exigem que **cada limite exista**. Não dá para dizer que \(\lim(f+g)=\lim f+\lim g\) quando um deles diverge.

## 7. A estratégia de todo limite: substituir primeiro

**Passo 1.** Substitua \(x=a\) direto. Três coisas podem acontecer:

| Resultado da substituição | O que fazer |
| --- | --- |
| Um número | Acabou: esse é o limite |
| \(\dfrac k0\), com \(k\ne0\) | Provavelmente limite infinito (veja *Limites infinitos*) |
| \(\dfrac00\) | Indeterminação: **manipule** a expressão e tente de novo |

\(\frac00\) não é "zero" nem "não existe": é um aviso de que há um **fator em comum escondido** zerando em cima e embaixo. Seu trabalho é achá-lo e cortar. As ferramentas são **fatorar**, **conjugado** e **limites trigonométricos**.

### Fatorando

**Exemplo 1.** \(\displaystyle\lim_{x\to2}\frac{x^2-5x+6}{x-2}\)

1. Substituindo \(x=2\): \(\dfrac{4-10+6}{0}=\dfrac00\).
2. Fatore o numerador: dois números de produto \(6\) e soma \(-5\) são \(-2\) e \(-3\). \(x^2-5x+6=(x-2)(x-3)\).
3. Corte o fator comum (\(x\ne2\)):

$$
\frac{(x-2)(x-3)}{x-2}=x-3\ \Rightarrow\ \lim_{x\to2}(x-3)=\boxed{-1}
$$

**Exemplo 2.** \(\displaystyle\lim_{x\to3}\frac{x^2-9}{x-3}\). Diferença de quadrados: \(x^2-9=(x-3)(x+3)\). Cortando, sobra \(x+3\), que tende a \(\boxed{6}\).

**Exemplo 3 (diferença de cubos).** \(\displaystyle\lim_{x\to2}\frac{x^3-8}{x-2}\). Como \(x^3-8=(x-2)(x^2+2x+4)\) (confira expandindo: \(x^3+2x^2+4x-2x^2-4x-8=x^3-8\)), sobra \(x^2+2x+4\), que tende a \(4+4+4=\boxed{12}\).

> [!TIP]
> **Lembretes de fatoração:** \(a^2-b^2=(a-b)(a+b)\); \(a^3-b^3=(a-b)(a^2+ab+b^2)\); para \(ax^2+bx+c\), ache as raízes. Se \(a\) é raiz do polinômio, \((x-a)\) **sempre** é um fator.

### Tirando a raiz: o conjugado

**Vamos resolver:** \(\displaystyle\lim_{x\to0}\frac{\sqrt{x+1}-1}{x}\)

1. Substituindo \(x=0\): \(\dfrac{1-1}{0}=\dfrac00\). Não dá para fatorar com a raiz no caminho.
2. Multiplique em cima e embaixo pelo **conjugado** do numerador (mesmos termos, sinal trocado) para usar \((a-b)(a+b)=a^2-b^2\) e fazer a raiz sumir:

$$
\frac{\sqrt{x+1}-1}{x}\cdot\frac{\sqrt{x+1}+1}{\sqrt{x+1}+1}=\frac{(x+1)-1}{x\big(\sqrt{x+1}+1\big)}=\frac{x}{x\big(\sqrt{x+1}+1\big)}
$$

3. Como \(x\ne0\) perto de \(0\), corte o \(x\): sobra \(\dfrac{1}{\sqrt{x+1}+1}\).
4. Agora substituir funciona: \(\dfrac1{1+1}=\dfrac12\).

$$
\boxed{\lim_{x\to0}\frac{\sqrt{x+1}-1}{x}=\frac12}
$$

## 8. Limites trigonométricos

O limite fundamental:

$$
\boxed{\lim_{x\to0}\frac{\operatorname{sen}x}{x}=1}
$$

Perto de zero, o seno cresce quase na mesma proporção do ângulo, então o quociente tende a \(1\). A regra prática é o **truque do espelho**: se aparece \(\operatorname{sen}(\text{algo})\), force o mesmo "algo" embaixo, multiplicando e dividindo pelo que faltar.

**Exemplo A.** \(\displaystyle\lim_{x\to0}\frac{\operatorname{sen}3x}{x}\)

1. Queremos \(3x\) embaixo. Multiplique e divida por \(3\): \(\dfrac{\operatorname{sen}3x}{x}=3\cdot\dfrac{\operatorname{sen}3x}{3x}\).
2. Com \(t=3x\to0\): \(\dfrac{\operatorname{sen}t}{t}\to1\). Resultado: \(3\cdot1=3\).

**Exemplo B.** \(\displaystyle\lim_{x\to0}\frac{\operatorname{tg}x}{x}\)

\(\dfrac{\operatorname{tg}x}{x}=\dfrac{\operatorname{sen}x}{x}\cdot\dfrac1{\cos x}\to1\cdot\dfrac11=1\).

**Exemplo C.** \(\displaystyle\lim_{x\to0}\frac{\operatorname{sen}3x}{\operatorname{sen}5x}\)

$$
\frac{\operatorname{sen}3x}{\operatorname{sen}5x}=\frac{\operatorname{sen}3x}{3x}\cdot\frac{5x}{\operatorname{sen}5x}\cdot\frac{3x}{5x}\to1\cdot1\cdot\frac35=\frac35
$$

(O fator \(\frac{3x}{5x}=\frac35\) é o que compensa por termos criado \(3x\) e \(5x\).)

**Exemplo D.** \(\displaystyle\lim_{x\to0}\frac{1-\cos x}{x}\)

1. Substituindo: \(\frac00\). Multiplique pelo conjugado \(1+\cos x\):

$$
\frac{(1-\cos x)(1+\cos x)}{x(1+\cos x)}=\frac{1-\cos^2x}{x(1+\cos x)}=\frac{\operatorname{sen}^2x}{x(1+\cos x)}
$$

2. Separe: \(\dfrac{\operatorname{sen}x}{x}\cdot\dfrac{\operatorname{sen}x}{1+\cos x}\to1\cdot\dfrac{0}{1+1}=0\).

## 9. Teorema do confronto (sanduíche)

Se, perto de \(a\), \(g(x)\le f(x)\le h(x)\), e \(\lim g=\lim h=L\), então \(\lim f=L\). Se \(f\) está sempre entre duas funções que convergem ao mesmo valor, ela não pode escapar.

**Vamos resolver o exemplo clássico:** \(\displaystyle\lim_{x\to0}x^2\operatorname{sen}\!\left(\frac1x\right)\)

1. Substituir não dá: \(\operatorname{sen}\frac1x\) oscila sem parar perto de \(0\) e nem tem limite.
2. Mas sabemos que \(-1\le\operatorname{sen}\frac1x\le1\).
3. Multiplique tudo por \(x^2\). Como \(x^2\ge0\), as desigualdades **não** invertem:

$$
-x^2\le x^2\operatorname{sen}\!\left(\frac1x\right)\le x^2
$$

4. \(\lim_{x\to0}(-x^2)=0\) e \(\lim_{x\to0}x^2=0\). Pelo confronto:

$$
\boxed{\lim_{x\to0}x^2\operatorname{sen}\!\left(\frac1x\right)=0}
$$

## 10. Exercícios

**Exercício 1.** \(\displaystyle\lim_{x\to0}\frac{\operatorname{sen}3x}{x}\).

{{< details title="Gabarito" >}}
\(3\cdot\dfrac{\operatorname{sen}3x}{3x}\to3\cdot1=\boxed3\).
{{< /details >}}

**Exercício 2.** \(\displaystyle\lim_{x\to0}\frac{\sqrt{x+4}-2}{x}\).

{{< details title="Gabarito" >}}
1. \(\frac00\). Multiplique pelo conjugado \(\sqrt{x+4}+2\).
2. Numerador: \((\sqrt{x+4})^2-2^2=x+4-4=x\).
3. \(\dfrac{x}{x(\sqrt{x+4}+2)}=\dfrac1{\sqrt{x+4}+2}\to\dfrac1{2+2}=\boxed{\tfrac14}\).
{{< /details >}}

**Exercício 3.** Use o confronto para mostrar que \(\displaystyle\lim_{x\to0}x\operatorname{sen}\frac1x=0\).

{{< details title="Gabarito" >}}
1. \(-1\le\operatorname{sen}\frac1x\le1\). Tomando módulo: \(\left\lvert\operatorname{sen}\frac1x\right\rvert\le1\).
2. Multiplique por \(\lvert x\rvert\ge0\): \(\left\lvert x\operatorname{sen}\frac1x\right\rvert\le\lvert x\rvert\), ou seja, \(-\lvert x\rvert\le x\operatorname{sen}\frac1x\le\lvert x\rvert\).
3. Os dois extremos tendem a \(0\). Logo o limite é \(\boxed0\).
{{< /details >}}

**Exercício 4.** \(\displaystyle\lim_{x\to4}\frac{x^2-16}{x-4}\).

{{< details title="Gabarito" >}}
\(\frac00\). \(x^2-16=(x-4)(x+4)\); corta e sobra \(x+4\to\boxed8\).
{{< /details >}}

**Exercício 5.** \(\displaystyle\lim_{x\to-2}\frac{x^2+x-2}{x+2}\).

{{< details title="Gabarito" >}}
\(\frac00\). Produto \(-2\), soma \(1\): \(2\) e \(-1\). \(x^2+x-2=(x+2)(x-1)\). Corta \((x+2)\) e sobra \(x-1\to-2-1=\boxed{-3}\).
{{< /details >}}

**Exercício 6.** Calcule os laterais em \(0\) de \(\frac{\lvert x\rvert}{x}\) e conclua.

{{< details title="Gabarito" >}}
Direita: \(1\). Esquerda: \(-1\). São diferentes, então o limite bilateral **não existe**.
{{< /details >}}

**Exercício 7.** \(\displaystyle\lim_{x\to0}\frac{\operatorname{tg}2x}{x}\).

{{< details title="Gabarito" >}}
1. \(\operatorname{tg}2x=\dfrac{\operatorname{sen}2x}{\cos2x}\).
2. \(\dfrac{\operatorname{tg}2x}{x}=2\cdot\dfrac{\operatorname{sen}2x}{2x}\cdot\dfrac1{\cos2x}\to2\cdot1\cdot1=\boxed2\).
{{< /details >}}

**Exercício 8.** \(\displaystyle\lim_{x\to0}\frac{\operatorname{sen}4x}{\operatorname{sen}x}\).

{{< details title="Gabarito" >}}
\(\dfrac{\operatorname{sen}4x}{\operatorname{sen}x}=\dfrac{\operatorname{sen}4x}{4x}\cdot\dfrac{x}{\operatorname{sen}x}\cdot4\to1\cdot1\cdot4=\boxed4\).
{{< /details >}}
