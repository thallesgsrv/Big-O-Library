---
title: Frações, raízes e racionalização
weight: 1
description: Somar, multiplicar e dividir frações, simplificar raízes e tirar raiz do denominador.
autores:
  - thallesgsrv
date: 2026-11-02
---

## Sobre

Antes de falar de função, logaritmo e seno, a gente precisa ficar **tranquilo** com três coisas que aparecem em *todo* canto: frações, raízes e a arte de deixar uma expressão com cara de resposta final. Quase todo erro bobo de prova nasce aqui (e o pior: só aparece três páginas depois, quando a conta já deu errado).

Este tópico é o aquecimento. Se você já domina, passe o olho nos quadros de resumo e vá para os exercícios.

## Para que serve isso tudo

- **Comparar valores rápido.** Qual é maior, $\frac{7}{12}$ ou $\frac{5}{9}$? Com fração bem manipulada, dá para decidir sem calculadora.
- **Cálculo e funções.** Derivada, limite e função racional vivem de fração e de raiz bem arrumadas.
- **Resposta padrão.** Em matemática existe um "jeito oficial" de escrever o resultado: fração irredutível, raiz simplificada, sem raiz no denominador. Em código, $\frac{1}{\sqrt 2}$ e $\frac{\sqrt 2}{2}$ dão o mesmo número, mas na prova só uma das duas costuma valer como resposta final.

## Somando e subtraindo frações

### Mesmo denominador: moleza

O denominador só diz "em quantos pedaços a pizza foi cortada". Se os pedaços são do mesmo tamanho, você **mantém o denominador e soma (ou subtrai) os numeradores**:

$$
\frac{a}{b}+\frac{c}{b}=\frac{a+c}{b}
\qquad\qquad
\frac{4}{5}+\frac{3}{5}=\frac{7}{5}
\qquad\qquad
\frac{4}{5}-\frac{3}{5}=\frac{1}{5}
$$

### Denominadores diferentes: dois caminhos

Aqui os pedaços têm tamanhos diferentes, então primeiro é preciso **cortar tudo em pedaços do mesmo tamanho**. Existem duas formas de fazer isso.

**Caminho 1: o "cruzado".** Funciona sempre, mas pode gerar números grandes:

$$
\frac{a}{b}+\frac{c}{d}=\frac{ad+bc}{bd}
\qquad\qquad
\frac{3}{4}+\frac{5}{6}=\frac{3\cdot 6+5\cdot 4}{4\cdot 6}=\frac{38}{24}=\frac{19}{12}
$$

**Caminho 2: pelo MMC.** Descubra o menor múltiplo comum dos denominadores, transforme cada fração para esse denominador e some:

$$
\frac{3}{4}+\frac{5}{6}\;\to\; \text{mmc}(4,6)=12
\;\to\;
\frac{3\cdot 3}{12}+\frac{2\cdot 5}{12}=\frac{9+10}{12}=\frac{19}{12}
$$

(Para cada fração, o número que multiplica o numerador é "MMC dividido pelo denominador antigo": $12\div 4=3$ e $12\div 6=2$.)

Com três frações o raciocínio é o mesmo:

$$
\frac{3}{4}+\frac{5}{6}+\frac{1}{2}
=\frac{9}{12}+\frac{10}{12}+\frac{6}{12}
=\frac{25}{12}
$$

A subtração segue a mesma receita, só trocando o sinal na hora de combinar os numeradores:

$$
\frac{3}{4}-\frac{5}{6}=\frac{9-10}{12}=-\frac{1}{12}
$$

> [!TIP]
> **Dica de ouro:** se um denominador já é múltiplo do outro, não precisa de MMC chique. Em $\frac{5}{4}+\frac{3}{8}$, basta multiplicar a primeira por $\frac{2}{2}$ e ficar com $\frac{10}{8}+\frac{3}{8}=\frac{13}{8}$.
> E número inteiro é fração disfarçada: $\frac{2}{3}+1=\frac{2}{3}+\frac{3}{3}=\frac{5}{3}$.

## Multiplicando e dividindo frações

### Multiplicação: reta, sem drama

Numerador com numerador, denominador com denominador:

$$
\frac{a}{b}\cdot\frac{c}{d}=\frac{ac}{bd}
\qquad\qquad
\frac{4}{5}\cdot\frac{3}{5}=\frac{12}{25}
$$

**Truque de quem tem pressa:** antes de multiplicar, **corte em cruz** (ou na vertical) o que for divisível. Em $\frac{6}{10}\cdot\frac{5}{9}$, corte 6 e 9 por 3, e 5 e 10 por 5:

$$
\frac{6}{10}\cdot\frac{5}{9}=\frac{2}{2}\cdot\frac{1}{3}=\frac{1}{3}
$$

Sem o truque você chegaria a $\frac{30}{90}$ e simplificaria depois. Mesmo resultado, só que com números maiores.

### Divisão: "conserva a primeira, inverte a segunda"

Dividir por uma fração é multiplicar pelo **inverso** dela:

$$
\frac{a}{b}\div\frac{c}{d}=\frac{a}{b}\cdot\frac{d}{c}=\frac{ad}{bc}
\qquad\qquad
\frac{4}{5}\div\frac{3}{5}=\frac{4}{5}\cdot\frac{5}{3}=\frac{20}{15}=\frac{4}{3}
$$

E dá para cortar também: $\frac{3}{12}\div\frac{9}{4}=\frac{3}{12}\cdot\frac{4}{9}=\frac{1}{3}\cdot\frac{1}{3}=\frac{1}{9}$.

> [!WARNING]
> Só se inverte **a fração do divisor** (a segunda). Inverter a primeira, ou as duas, é o erro clássico de quem decorou a regra sem entender o porquê.

## Simplificando raízes

Assim como $\frac{6}{8}$ vira $\frac{3}{4}$, uma raiz também pode ser "reduzida". Pergunta: o que é mais simples, $\sqrt{50}$ ou $5\sqrt{2}$? O valor é exatamente o mesmo, mas a segunda forma é a oficial: ela é mais compacta, fica fácil de somar com outras raízes e evita erro nas contas seguintes.

> [!IMPORTANT]
> Simplificar raiz **não muda o valor**. Muda só a embalagem.

### O algoritmo em 3 passos

1. **Fatore** o número dentro da raiz (decomponha em primos).
2. Use a propriedade $\sqrt{a\cdot b}=\sqrt a\cdot\sqrt b$ para separar os fatores.
3. **Tire da raiz** o que for "quadrado perfeito" (ou "cubo perfeito", se a raiz for cúbica).

**Exemplo: simplificar $\sqrt{72}$.**

Fatorando, $72 = 2\cdot2\cdot2\cdot3\cdot3 = 2^2\cdot 3^2\cdot 2$. Então:

$$
\sqrt{72}=\sqrt{2^2\cdot 3^2\cdot 2}=\sqrt{2^2}\cdot\sqrt{3^2}\cdot\sqrt 2=2\cdot 3\cdot\sqrt 2=6\sqrt 2
$$

Mais três para treinar o olho:

| Raiz | Fatoração | Resultado |
| --- | --- | --- |
| $\sqrt{600}$ | $600=2^2\cdot 5^2\cdot 2\cdot 3$ | $2\cdot 5\sqrt{6}=10\sqrt 6$ |
| $\sqrt{36}$ | $36=2^2\cdot 3^2$ | $2\cdot 3=6$ (raiz exata, não sobra nada) |
| $\sqrt[3]{432}$ | $432=2^3\cdot 3^3\cdot 2$ | $2\cdot 3\sqrt[3]{2}=6\sqrt[3]{2}$ |

### E quando a raiz não é quadrada?

A regra geral é: numa raiz de **índice $n$**, sai da raiz cada fator que aparece $n$ vezes. Na raiz quarta, você precisa de grupos de quatro iguais:

$$
\sqrt[4]{80x^5}=\sqrt[4]{2^4\cdot 5\cdot x^4\cdot x}=2x\sqrt[4]{5x}
\qquad (x\ge 0)
$$

Lembrete para variáveis: $x^5=x^4\cdot x$ (separe a maior potência que "cabe" no índice).

> [!NOTE]
> Uma raiz já está simplificada quando nenhum fator do radicando se repete o bastante para sair. Em $\sqrt{30}=\sqrt{2\cdot3\cdot5}$, nada se repete, então não há o que fazer.

> [!CAUTION]
> Duas pegadinhas que custam ponto: $\sqrt{a+b}$ **não é** $\sqrt a+\sqrt b$ (teste com $a=9,\ b=16$), e $\sqrt{x^2}$ vale $|x|$, não "x" em qualquer caso.

## Racionalização

**Racionalizar** é tirar a raiz (ou qualquer irracional) do **denominador** sem mudar o valor da fração. Por quê? Padronização e praticidade: comparar, somar e integrar frações fica bem mais fácil quando o denominador é um número "normal".

A ideia é sempre a mesma: **multiplicar em cima e embaixo pela mesma coisa**, que equivale a multiplicar por 1 e não muda nada, escolhendo essa "coisa" de forma que a raiz embaixo desapareça.

### Raiz quadrada simples

Racionalize $\dfrac{5}{\sqrt 2}$.

1. O denominador com raiz é $\sqrt2$.
2. Multiplique em cima e embaixo por $\sqrt 2$ (porque $\sqrt2\cdot\sqrt2=2$).
3. Faça as contas:

$$
\frac{5}{\sqrt2}\cdot\frac{\sqrt2}{\sqrt2}=\frac{5\sqrt2}{2}
\qquad\qquad
\frac{2}{\sqrt3}=\frac{2\sqrt3}{3}
$$

### Soma ou diferença com raiz: o conjugado

Quando o denominador é algo como $\sqrt5+2$, multiplicar por $\sqrt 5$ não resolve. O truque é usar o **conjugado**: o mesmo número com o sinal do meio trocado. Isso ativa o produto notável $(u+v)(u-v)=u^2-v^2$, que faz as raízes sumirem.

$$
\frac{4}{\sqrt5+2}\cdot\frac{\sqrt5-2}{\sqrt5-2}
=\frac{4(\sqrt5-2)}{(\sqrt5)^2-2^2}
=\frac{4\sqrt5-8}{5-4}
=4\sqrt5-8
$$

$$
\frac{3}{\sqrt3-\sqrt2}\cdot\frac{\sqrt3+\sqrt2}{\sqrt3+\sqrt2}
=\frac{3\sqrt3+3\sqrt2}{3-2}
=3\sqrt3+3\sqrt2
$$

### Raízes de outros índices

Aqui multiplicar por "a mesma raiz" não adianta. Em $\dfrac{2}{\sqrt[3]{5}}$, se você multiplicar por $\sqrt[3]{5}$ ainda sobra $\sqrt[3]{25}$ embaixo. A saída é **completar o expoente até chegar ao índice**: precisamos de $5^3$ dentro da raiz, e temos só $5^1$, então multiplicamos por $\sqrt[3]{5^2}$.

$$
\frac{2}{\sqrt[3]{5}}\cdot\frac{\sqrt[3]{5^2}}{\sqrt[3]{5^2}}=\frac{2\sqrt[3]{25}}{\sqrt[3]{5^3}}=\frac{2\sqrt[3]{25}}{5}
$$

$$
\frac{4}{\sqrt[5]{2}}\cdot\frac{\sqrt[5]{2^4}}{\sqrt[5]{2^4}}=\frac{4\sqrt[5]{16}}{\sqrt[5]{2^5}}=\frac{4\sqrt[5]{16}}{2}=2\sqrt[5]{16}
$$

> [!TIP]
> Regra prática: se embaixo está $\sqrt[n]{c^k}$, multiplique em cima e embaixo por $\sqrt[n]{c^{\,n-k}}$. Assim o expoente total vira $n$ e a raiz some.

## Resumão

| Situação | O que fazer |
| --- | --- |
| Soma/subtração, mesmo denominador | mantém o denominador, opera os numeradores |
| Soma/subtração, denominadores diferentes | MMC (ou cruzado) e depois opera |
| Multiplicação | numerador·numerador / denominador·denominador (corte antes!) |
| Divisão | multiplica pelo **inverso do segundo** |
| Simplificar raiz | fatora, separa, tira o que repete $n$ vezes |
| Denominador $\sqrt a$ | multiplica por $\frac{\sqrt a}{\sqrt a}$ |
| Denominador $\sqrt a\pm\sqrt b$ (ou $\sqrt a\pm b$) | multiplica pelo **conjugado** |
| Denominador $\sqrt[n]{c^k}$ | multiplica por $\frac{\sqrt[n]{c^{n-k}}}{\sqrt[n]{c^{n-k}}}$ |

## Exercícios

**E1.** Calcule:

a) $\dfrac{2}{3}+\dfrac{4}{9}$  b) $\dfrac{1}{6}+\dfrac{1}{4}+\dfrac{1}{3}$  c) $\dfrac{7}{12}+\dfrac{5}{18}$  d) $\dfrac{11}{6}-\dfrac{7}{4}$  e) $\dfrac{7}{8}-\dfrac{3}{4}-\dfrac{1}{8}$  f) $\dfrac{7}{4}+\dfrac{5}{6}-\dfrac{2}{3}$

{{< details title="Gabarito" >}}
a) $\frac{10}{9}$. b) $\frac{3}{4}$ (em doze avos: $2+3+4=9$, e $\frac{9}{12}=\frac{3}{4}$). c) $\frac{31}{36}$. d) $\frac{1}{12}$. e) $0$. f) $\frac{23}{12}$.
{{< /details >}}

**E2.** Calcule:

a) $\dfrac{4}{7}\cdot\dfrac{7}{5}$  b) $\dfrac{9}{10}\div\dfrac{3}{8}$  c) $\dfrac{3}{4}\cdot\dfrac{8}{9}\div\dfrac{2}{3}$  d) $\dfrac{11}{12}\div\left(\dfrac{2}{3}\cdot\dfrac{3}{4}\right)$

{{< details title="Gabarito" >}}
a) $\frac{4}{5}$. b) $\frac{12}{5}$. c) $1$ (faça da esquerda para a direita: $\frac{3}{4}\cdot\frac{8}{9}=\frac{2}{3}$, e $\frac{2}{3}\div\frac{2}{3}=1$). d) $\frac{11}{6}$ (primeiro o parêntese: $\frac{2}{3}\cdot\frac{3}{4}=\frac{1}{2}$).
{{< /details >}}

**E3.** Simplifique:

a) $\sqrt{50}$  b) $\sqrt{18x^2}$ (com $x\ge0$)  c) $\sqrt[3]{54}$

{{< details title="Gabarito" >}}
a) $5\sqrt2$. b) $3x\sqrt2$. c) $3\sqrt[3]{2}$ (pois $54=2\cdot 3^3$).
{{< /details >}}

**E4.** Racionalize:

a) $\dfrac{3}{\sqrt5}$  b) $\dfrac{1}{1+\sqrt2}$  c) $\dfrac{1}{\sqrt[3]{4}}$

{{< details title="Gabarito" >}}
a) $\frac{3\sqrt5}{5}$.
b) Conjugado de $1+\sqrt2$ é $1-\sqrt2$: $\frac{1-\sqrt2}{1-2}=\sqrt2-1$.
c) $4=2^2$, falta $2^1$ para chegar ao cubo: multiplica por $\frac{\sqrt[3]{2}}{\sqrt[3]{2}}$ e dá $\frac{\sqrt[3]{2}}{2}$. (Se você multiplicou por $\sqrt[3]{16}$, chegou em $\frac{\sqrt[3]{16}}{4}$, que é o mesmo número: $\sqrt[3]{16}=2\sqrt[3]{2}$.)
{{< /details >}}

### Confira se pegou

{{< quiz titulo="Frações e raízes" >}}

{{< questao >}}
Qual é o resultado de $\dfrac{1}{2}\div\dfrac{1}{4}$?

- [ ] $\dfrac{1}{8}$
- [x] $2$
- [ ] $\dfrac{1}{2}$
- [ ] $\dfrac{3}{4}$
---
Dividir por $\frac14$ é multiplicar por $4$: $\frac12\cdot 4=2$. Faz sentido: em meio inteiro cabem dois pedaços de um quarto.
{{< /questao >}}

{{< questao >}}
A forma simplificada de $\sqrt{48}$ é:

- [ ] $2\sqrt{12}$
- [ ] $6\sqrt{2}$
- [x] $4\sqrt{3}$
- [ ] $8\sqrt{3}$
---
$48=2^4\cdot3$, então $\sqrt{48}=2^2\sqrt3=4\sqrt3$. A primeira alternativa é verdadeira, mas **não está simplificada**: $\sqrt{12}$ ainda esconde um quadrado perfeito.
{{< /questao >}}

{{< questao >}}
Para racionalizar $\dfrac{7}{\sqrt6-2}$, multiplicamos em cima e embaixo por:

- [ ] $\sqrt6$
- [ ] $\sqrt6-2$
- [x] $\sqrt6+2$
- [ ] $2$
---
O conjugado troca o sinal do meio. Assim o denominador vira $(\sqrt6)^2-2^2=6-4=2$, sem raiz.
{{< /questao >}}

{{< /quiz >}}
