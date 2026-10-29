---
title: Somas de Riemann e integral definida
weight: 1
description: De onde vem a integral definida - a construção por somas de Riemann, o limite, o Teorema Fundamental do Cálculo e o que cada integral significa em problemas aplicados.
autores:
  - thallesgsrv
baseadoEm:
  - rodrigocohen
date: 2026-10-29
---

## Como funciona?

Em Cálculo 1 você aprendeu a **calcular** \(\int_a^b f(x)\,dx\) (ache a primitiva e subtraia). Aqui o foco muda: **por que** uma integral resolve um problema, **quantas** integrais são necessárias e **em qual variável** integrar. Quem entende a construção abaixo nunca mais precisa decorar fórmulas de aplicação (área, volume, trabalho, distância): elas saem todas do mesmo molde.

> [!NOTE]
> Esta página aprofunda a revisão feita na seção 2 de [Integral Definida e Teorema Fundamental do Cálculo](/docs/02-periodo/calculo1/estagio3/integral-definida/), de Cálculo 1. Se o símbolo \(\Sigma\) ou a ideia de "somar retângulos" estiver enferrujada, comece por lá.

## 1. As três perguntas

1. **Por que integral?** Porque a quantidade procurada pode ser **aproximada por uma soma de pedaços pequenos e simples**, e a aproximação melhora quando os pedaços diminuem. O limite dessas somas é, por definição, a integral. A derivada responde outra pergunta ("qual a taxa de variação *agora*?"), e não serve para acumular.
2. **Quantas integrais?** Uma por trecho em que a descrição do fenômeno não muda.
3. **Qual variável?** A que você usou para descrever o problema.

Voltaremos a elas no fim, com a construção em mãos.

## 2. Pausa: notação de somatório

$$
\sum_{i=1}^{n} a_i = a_1 + a_2 + \cdots + a_n
$$

O símbolo \(\Sigma\) é um `for`: \(i\) é o contador, e os números embaixo e em cima dizem onde ele começa e termina. O que está à direita é o que se soma a cada volta.

**Exercício 1.** Expanda e calcule:

a) \(\displaystyle\sum_{i=1}^{5} i^2\) b) \(\displaystyle\sum_{k=1}^{4} (3k+2)\) c) \(\displaystyle\sum_{n=1}^{6} \frac{n+1}{n}\) d) \(\displaystyle\sum_{i=1}^{3} x\)

{{< details title="Gabarito" >}}
a) Troque \(i\) por 1, 2, 3, 4, 5 e eleve ao quadrado: \(1 + 4 + 9 + 16 + 25 = 55\).

b) Para \(k = 1, 2, 3, 4\), o termo \(3k+2\) vale \(5, 8, 11, 14\). Soma: \(38\).

c) \(\dfrac21 + \dfrac32 + \dfrac43 + \dfrac54 + \dfrac65 + \dfrac76 = \dfrac{169}{20} = 8{,}45\).

d) O termo **não depende** do contador \(i\). Então a soma repete \(x\) três vezes: \(x + x + x = 3x\). (Compare com o laço `for i in range(3): s += x`.)
{{< /details >}}

**Exercício 2.** Escreva como somatório:

a) \(1+2+3+4+5\)

b) \(2+4+6+8+10+12\)

c) \(\left(1-\dfrac12\right)+\left(\dfrac12-\dfrac13\right)+\left(\dfrac13-\dfrac14\right)+\cdots+\left(\dfrac17-\dfrac18\right)\)

d) \(\dfrac12+\dfrac23+\dfrac34+\dfrac45+\cdots+\dfrac9{10}\)

e) \(f(x_1^*)(x_1-x_0)+f(x_2^*)(x_2-x_1)+f(x_3^*)(x_3-x_2)\)

{{< details title="Gabarito" >}}
Procure o **padrão** do termo geral e descubra onde o contador começa e termina. As respostas não são únicas (dá para deslocar o índice).

a) Termo \(i\), de 1 a 5: \(\displaystyle\sum_{i=1}^{5} i\).

b) Pares: o \(i\)-ésimo termo é \(2i\), de 1 a 6: \(\displaystyle\sum_{i=1}^{6} 2i\).

c) Cada parêntese é \(\dfrac1k - \dfrac1{k+1}\), com \(k\) de 1 a 7: \(\displaystyle\sum_{k=1}^{7} \left(\frac1k - \frac1{k+1}\right)\). Curiosidade: os termos do meio se cancelam e a soma vale \(1 - \frac18 = \frac78\).

d) Numerador \(k\), denominador \(k+1\), \(k\) de 1 a 9: \(\displaystyle\sum_{k=1}^{9} \frac{k}{k+1}\).

e) O padrão é "\(f\) no ponto escolhido vezes o tamanho do pedaço":

$$
\sum_{i=1}^{3} f(x_i^*)\,(x_i - x_{i-1}) = \sum_{i=1}^{3} f(x_i^*)\,\Delta x_i
$$

Este é o formato de uma **soma de Riemann**, o assunto da próxima seção.
{{< /details >}}

## 3. O problema da área

**Problema.** Determinar a área entre o eixo \(x\) e o gráfico de \(f(x) = x^2 + 1\) no intervalo \([0, a]\).

Chame de \(S\) a região e de \(A\) a área procurada. \(S\) **não é um polígono**: tem um lado curvo. Não existe fórmula pronta como "base vezes altura". Mas sabemos calcular área de **retângulos**. A ideia:

> Aproximar \(S\) por figuras formadas por retângulos, \(S_1, S_2, S_3, \ldots\), com áreas \(A_1, A_2, A_3, \ldots\). Se essas áreas **se aproximam de um valor**, é razoável dizer que esse valor é a área de \(S\).

### Construindo \(S_3\) e \(A_3\), passo a passo

1. **Particione.** Divida o intervalo em 3 partes de tamanhos iguais. Os extremos das partes são \(x_0, x_1, x_2, x_3\), e a parte de número \(i\) é \([x_{i-1}, x_i]\), de tamanho \(\Delta x_i = x_i - x_{i-1}\).
2. **Escolha um ponto em cada parte:** \(x_1^*, x_2^*, x_3^*\). O asterisco avisa que é um ponto "escolhido" dentro da parte \(i\). Pode ser o extremo esquerdo, o direito, o ponto médio, ou qualquer outro. É dele que sai a **altura**.
3. **Construa um retângulo sobre cada parte**, com base \(\Delta x_i\) e altura \(f(x_i^*)\). A altura é o valor da função no ponto escolhido: o retângulo "empresta" a altura de um ponto do gráfico e a usa na parte inteira.
4. **Some as áreas** dos retângulos:

$$
A_3 = f(x_1^*)(x_1 - x_0) + f(x_2^*)(x_2 - x_1) + f(x_3^*)(x_3 - x_2) = \sum_{i=1}^{3} f(x_i^*)\,\Delta x_i
$$

Com 5 partes o roteiro é o mesmo, só que \(i\) vai até 5. Com \(n\) partes:

$$
A_n = \sum_{i=1}^{n} f(x_i^*)\,\Delta x_i
$$

Essa soma tem nome: **soma de Riemann** de \(f\) na partição escolhida.

### Um exemplo com números

Para \(f(x)=x^2+1\) em \([0,1]\) com \(n = 3\) partes, \(\Delta x = \tfrac13\) e as partes são \([0,\tfrac13]\), \([\tfrac13,\tfrac23]\), \([\tfrac23,1]\). Veja o efeito da escolha do ponto \(x_i^*\):

| Escolha | Pontos \(x_i^*\) | Alturas \(f(x_i^*)\) | Área \(A_3\) |
| --- | --- | --- | --- |
| extremo esquerdo | \(0,\ \tfrac13,\ \tfrac23\) | \(1,\ \tfrac{10}9,\ \tfrac{13}9\) | \(\tfrac13\cdot\tfrac{32}{9}=\tfrac{32}{27}\approx1{,}185\) |
| ponto médio | \(\tfrac16,\ \tfrac12,\ \tfrac56\) | \(\tfrac{37}{36},\ \tfrac54,\ \tfrac{61}{36}\) | \(\tfrac13\cdot\tfrac{143}{36}=\tfrac{143}{108}\approx1{,}324\) |
| extremo direito | \(\tfrac13,\ \tfrac23,\ 1\) | \(\tfrac{10}9,\ \tfrac{13}9,\ 2\) | \(\tfrac13\cdot\tfrac{41}{9}=\tfrac{41}{27}\approx1{,}519\) |

Como \(f\) é crescente, o extremo esquerdo **subestima** (retângulos ficam abaixo do gráfico) e o direito **superestima** (retângulos passam do gráfico). O ponto médio compensa um pouco de cada lado, e por isso chega mais perto. Os três valores são aproximações da mesma área, e a área verdadeira (que vamos calcular) é \(\tfrac43\approx1{,}333\).

### Passagem ao limite

Quanto mais retângulos, mais estreitas as faixas, e menos a escolha do ponto \(x_i^*\) importa: numa faixa muito estreita, \(f\) quase não varia, então qualquer ponto dá quase a mesma altura. Intuitivamente,

$$
\lim_{n\to\infty} A_n = A
$$

Como \(f\) é contínua e limitada em \([0,1]\), **é possível mostrar que esse limite existe**, e que ele **não depende** de como as partes e os pontos foram escolhidos (desde que as partes fiquem cada vez menores). Por isso podemos **definir** a área de \(S\) como esse limite:

$$
A := \lim_{n\to\infty} \sum_{i=1}^{n} f(x_i^*)\,\Delta x_i = \int_a^b f(x)\,dx
$$

A notação da integral guarda a história: o \(\int\) é um "S" alongado, de **soma**; o \(f(x)\) é a altura; e o \(dx\) é o "\(\Delta x\)" depois de ficar infinitamente pequeno.

> [!NOTE]
> Por que usar a integral de Riemann aqui? Porque dá certo: a definição por limite concorda com tudo o que já sabemos de área (retângulos, triângulos) e funciona onde as fórmulas prontas não funcionam.

## 4. Calculando o limite direto da definição

Ainda não sabemos o valor de \(A\). Vamos calculá-lo **sem** usar primitivas, só com a definição, usando partes iguais e o **ponto médio** de cada parte (a escolha de melhor desempenho na tabela acima):

$$
\Delta x = \frac an,\qquad x_i = \frac{i\,a}{n},\qquad x_i^* = \frac{(2i-1)\,a}{2n}
$$

(\(x_i^*\) é a média de \(x_{i-1} = \tfrac{(i-1)a}{n}\) e \(x_i = \tfrac{ia}{n}\).)

**Passo 1. Monte a soma.** Substitua \(f(x_i^*) = (x_i^*)^2 + 1\) e \(\Delta x = \tfrac an\):

$$
A = \lim_{n\to\infty}\sum_{i=1}^{n}\left[\left(\frac{(2i-1)a}{2n}\right)^2 + 1\right]\frac an
$$

**Passo 2. Separe em duas somas** e tire para fora do somatório tudo o que não depende de \(i\):

$$
A = \lim_{n\to\infty}\left\{\frac{a^3}{4n^3}\sum_{i=1}^{n}(2i-1)^2 + \frac an\sum_{i=1}^{n}1\right\}
$$

(\(\left(\tfrac{(2i-1)a}{2n}\right)^2\cdot\tfrac an=\tfrac{a^3}{4n^3}(2i-1)^2\).) A segunda soma é só \(n\) vezes o número 1, ou seja, \(n\).

**Passo 3. Calcule \(\sum(2i-1)^2\).** Expanda \((2i-1)^2 = 4i^2 - 4i + 1\) e use as fórmulas \(\sum i^2 = \tfrac{n(n+1)(2n+1)}{6}\) e \(\sum i = \tfrac{n(n+1)}{2}\):

$$
\sum_{i=1}^{n}(2i-1)^2 = 4\cdot\frac{n(n+1)(2n+1)}{6} - 4\cdot\frac{n(n+1)}{2} + n = \frac{n(4n^2-1)}{3}
$$

**Passo 4. Substitua e tome o limite.**

$$
A = \lim_{n\to\infty}\left\{\frac{a^3}{4n^3}\cdot\frac{n(4n^2-1)}{3} + a\right\}
= \lim_{n\to\infty}\left\{\frac{a^3}{3}\cdot\frac{4n^2-1}{4n^2} + a\right\}
= \frac{a^3}{3} + a
$$

porque \(\dfrac{4n^2-1}{4n^2} = 1 - \dfrac{1}{4n^2} \to 1\).

**Conferindo.** Para \(a=1\) o valor é \(\tfrac13+1=\tfrac43\). E a soma de pontos médios com \(n\) partes (antes do limite) é \(\tfrac13\cdot\tfrac{4n^2-1}{4n^2}+1\), que dá:

| \(n\) | 1 | 3 | 10 | 100 | \(\to\infty\) |
| --- | --- | --- | --- | --- | --- |
| \(A_n\) | 1,2500 | 1,3241 | 1,3325 | 1,33332 | \(1{,}3333\ldots = \tfrac43\) |

Os valores de \(A_n\) estão se aproximando de \(\tfrac43\), como a teoria promete. Para \(n=3\) é exatamente o \(\tfrac{143}{108}\) da tabela da seção anterior.

Com primitivas, o mesmo resultado sai em uma linha (Teorema Fundamental, seção 6):

$$
\int_0^a (x^2+1)\,dx = \left[\frac{x^3}{3} + x\right]_0^a = \frac{a^3}{3} + a
$$

O limite de somas e o Teorema Fundamental do Cálculo são dois caminhos para o mesmo número. O limite mostra **o que** a integral é. O Teorema Fundamental ensina **como** calculá-la rápido.

## 5. O "esquema" da construção de uma integral de Riemann

Este é o molde de toda aplicação do estágio:

1. **Escreva aproximações do fenômeno** em pedaços pequenos e simples. Cada pedaço contribui com algo da forma (valor) \(\times\) (tamanho do pedaço), e a soma é uma soma de Riemann: \(\displaystyle\sum_{k=1}^{n} f(x_k^*)\,\Delta x_k\).
2. **Passe ao limite.** Com a função "bem comportada" (contínua, por exemplo), a soma tende à **integral de Riemann**:

$$
\lim_{n\to\infty}\sum_{k=1}^{n} f(x_k^*)\,\Delta x_k = \int_a^b f(x)\,dx
$$

### Respondendo às três perguntas

- **Por que integral?** Se a solução do problema passa por aproximações que geram somas de Riemann de funções integráveis, é a integral que vai resolver.
- **Quantas integrais?** Ao longo do intervalo que descreve o fenômeno, se **a expressão das funções muda**, quebre o intervalo em partes e trate cada expressão no seu intervalo. Aqui o problema é puramente de escrita: a integral é aditiva, \(\int_a^c=\int_a^b+\int_b^c\).
- **Qual variável?** A variável usada para descrever o problema é a variável de integração. Se a região é descrita como \(y=f(x)\), integra-se em \(x\) (\(dx\)). Se é descrita como \(x=f(y)\), em \(y\) (\(dy\)).

## 6. Teorema Fundamental do Cálculo e variação total

> [!IMPORTANT]
> **Teorema Fundamental do Cálculo, parte 2.** Se \(f\) é contínua em \([a,b]\), então
>
> $$
> \int_a^b f(x)\,dx = F(b) - F(a),
> $$
>
> onde \(F\) é **qualquer** primitiva de \(f\).

### Por que isso é verdade? (a ideia da prova)

Pegue uma partição \(a=x_0<x_1<\cdots<x_n=b\). A variação total de \(F\) pode ser escrita como uma soma que "se desmonta" (soma telescópica):

$$
F(b)-F(a) = \sum_{i=1}^{n}\big[F(x_i)-F(x_{i-1})\big]
$$

Em cada parte, o Teorema do Valor Médio garante um ponto \(x_i^*\) em \([x_{i-1},x_i]\) com \(F(x_i)-F(x_{i-1}) = F'(x_i^*)\,\Delta x_i = f(x_i^*)\,\Delta x_i\). Logo

$$
F(b)-F(a) = \sum_{i=1}^{n} f(x_i^*)\,\Delta x_i
$$

é **uma soma de Riemann de \(f\)**, para qualquer \(n\). Fazendo \(n\to\infty\), o lado direito tende a \(\int_a^b f\), e o lado esquerdo nem depende de \(n\). Portanto \(\int_a^b f = F(b)-F(a)\).

### Teorema da Variação Total

Lendo o resultado com \(F' = f\): *a integral de uma taxa de variação é a variação total.*

$$
\int_a^b F'(x)\,dx = F(b) - F(a)
$$

Isso explica o significado das integrais em problemas aplicados. A regra de leitura é sempre a mesma: **"taxa" vezes "tamanho do pedaço" dá "quantidade acumulada no pedaço"**, e a integral soma tudo.

**Motivação 1.** Se \(v(t) \ge 0\) é a velocidade de um carro, em m/s, com \(t\) em segundos, o que representa \(\displaystyle\int_5^{10} v(t)\,dt\)?

{{< details title="Gabarito" >}}
Cada parcela da soma de Riemann é \(v(t_i^*)\,\Delta t_i\): (m/s) \(\times\) (s) = **metros**, a distância percorrida durante um pedacinho de tempo (supondo a velocidade quase constante nele). Somando, a integral é a **variação da posição** entre \(t=5\) s e \(t=10\) s. Como \(v\ge 0\), é a **distância percorrida** nesses 5 segundos.
{{< /details >}}

**Motivação 2.** Se \(p'(t)\) é a taxa de crescimento de uma criança, em kg/ano, o que representa \(\displaystyle\int_0^6 p'(t)\,dt\)?

{{< details title="Gabarito" >}}
Pela variação total, \(\displaystyle\int_0^6 p'(t)\,dt = p(6) - p(0)\): quantos **quilogramas a criança ganhou** do nascimento (\(t=0\)) até os 6 anos. A unidade confere: (kg/ano) \(\times\) (ano) = kg.
{{< /details >}}

**Dica de unidades.** A unidade de \(\int f(x)\,dx\) é a unidade de \(f\) **vezes** a unidade de \(x\), porque cada parcela da soma é \(f\cdot\Delta x\). Conferir a unidade é a forma mais rápida de saber se uma integral "faz sentido".

**Exemplo 1.** Se \(x\) é medido em metros e \(f(x)\) em newtons, quais são as unidades de \(\displaystyle\int_0^{100} f(x)\,dx\)?

{{< details title="Gabarito" >}}
newton \(\times\) metro = **joule**. Se \(f\) é a força que atua ao longo de um deslocamento, a integral é o **trabalho** realizado.
{{< /details >}}

**Exemplo 2.** O gráfico do consumo de energia de uma cidade em um dia mostra \(P\) em megawatts e \(t\) em horas a partir da meia-noite. Estime a energia consumida entre 0h e 6h. Se necessário, suponha \(P(t) = 500 - \cos\left(\dfrac{\pi t}{6} - \dfrac\pi2\right)\) em \([0, 6]\).

{{< details title="Gabarito" >}}
**Qual a unidade?** MW \(\times\) h = **MWh**, que é energia. A potência é a taxa de consumo de energia, então a energia é a integral da potência: \(E = \displaystyle\int_0^6 P(t)\,dt\).

**Simplifique \(P\).** Como \(\cos\left(\theta - \dfrac\pi2\right) = \operatorname{sen}\theta\), temos \(P(t) = 500 - \operatorname{sen}\left(\dfrac{\pi t}{6}\right)\).

**Integre.** Uma primitiva de \(\operatorname{sen}\dfrac{\pi t}6\) é \(-\dfrac6\pi\cos\dfrac{\pi t}6\) (regra da cadeia ao contrário), então uma primitiva de \(P\) é \(500\,t + \dfrac6\pi\cos\dfrac{\pi t}6\):

$$
E = \left[500\,t + \frac6\pi\cos\frac{\pi t}{6}\right]_0^6 = \left(3000 - \frac6\pi\right) - \left(0 + \frac6\pi\right) = 3000 - \frac{12}{\pi} \approx 2996\ \text{MWh}
$$

> [!WARNING]
> A fórmula sugerida varia pouco (fica perto de 500), mas o gráfico mostra \(P\) entre cerca de 400 e 500 nesse trecho. Se você estimar pelo gráfico (por exemplo, trapézios com leituras de hora em hora), obtém algo perto de **2600 MWh**. As duas respostas diferem porque a fórmula é só uma aproximação grosseira do gráfico. Em prova, siga o que o enunciado pedir.
{{< /details >}}

## Exercícios

{{< quiz titulo="Somas de Riemann" >}}

{{< questao >}}
Em uma soma de Riemann \(\sum_{i=1}^{n} f(x_i^*)\,\Delta x_i\), o que representa cada parcela \(f(x_i^*)\,\Delta x_i\)?

- [ ] A derivada de \(f\) no ponto \(x_i^*\)
- [x] A área de um retângulo de altura \(f(x_i^*)\) e base \(\Delta x_i\)
- [ ] O comprimento do gráfico no \(i\)-ésimo subintervalo
- [ ] O valor médio de \(f\) em todo o intervalo
---
Cada parcela é a área de um retângulo. A soma das áreas aproxima a área sob o gráfico, e o limite dá a integral.
{{< /questao >}}

{{< questao >}}
Para \(f(x)=x^2+1\) em \([0,1]\), que é crescente, a soma de Riemann com o **extremo esquerdo** de cada parte:

- [x] subestima a área
- [ ] superestima a área
- [ ] dá exatamente a área
- [ ] não pode ser calculada
---
Em uma função crescente, o extremo esquerdo é o ponto mais baixo da parte, então o retângulo fica abaixo do gráfico.
{{< /questao >}}

{{< questao >}}
Se \(v(t)\) é a velocidade em m/s e \(t\) está em segundos, a unidade de \(\int_a^b v(t)\,dt\) é:

- [ ] m/s
- [ ] m/s\(^2\)
- [x] m
- [ ] s
---
(m/s) \(\times\) s = m. A integral da velocidade é a variação da posição.
{{< /questao >}}

{{< questao >}}
A expressão de \(f\) muda no meio do intervalo \([0,3]\) (por exemplo, \(f(x)=0\) em \([0,2]\) e \(f(x)=x-2\) em \([2,3]\)). Como tratar a integral?

- [ ] Não existe integral nesse caso
- [ ] Usar só a expressão do primeiro trecho
- [x] Quebrar o intervalo e integrar cada expressão no seu trecho
- [ ] Integrar em \(y\) em vez de \(x\)
---
A integral é aditiva no intervalo: \(\int_0^3 = \int_0^2 + \int_2^3\). Aqui o problema é só de escrita.
{{< /questao >}}

{{< questao >}}
Quanto vale \(\displaystyle\int_0^a (x^2+1)\,dx\)?

- [ ] \(\dfrac{a^3}{3}\)
- [ ] \(a^3 + a\)
- [x] \(\dfrac{a^3}{3} + a\)
- [ ] \(2a\)
---
Primitiva \(\frac{x^3}{3}+x\), calculada de \(0\) a \(a\). A alternativa \(\frac{a^3}{3}\) esquece a parcela constante \(1\), que contribui com a área \(a\) de um retângulo de altura 1.
{{< /questao >}}

{{< /quiz >}}
