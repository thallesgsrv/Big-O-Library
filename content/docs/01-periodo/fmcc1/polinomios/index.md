---
title: Polinômios
weight: 2
description: Monômios, polinômios, as quatro operações básicas, produtos notáveis e as técnicas de fatoração.
autores:
  - thallesgsrv
date: 2026-11-02
---

## Sobre

Polinômio parece coisa de ensino médio que você deixou para trás, mas ele está escondido em muita coisa que você vai usar no curso: regressão e *machine learning*, curvas de Bézier nos gráficos, códigos corretores de erro, criptografia, compressão de imagem... e até na pergunta "esse algoritmo é polinomial ou exponencial?". Você já usa polinômios em Computação, só não sabia o nome.

## Quem é quem

### Monômio: um termo só

Um **monômio** é uma expressão com **um único termo**: um número (o *coeficiente*) vezes variáveis com expoentes **inteiros e não negativos**.

$$
a\cdot x^m\cdot y^n\cdots
$$

São monômios: $2x$, $4xy^2$, $x^3y^2$, $-x^3$ (que é $-1\cdot x\cdot x\cdot x$).

**Não são** monômios: $5x+3$ (são dois termos), $\frac{1}{x}$ (expoente negativo, é $x^{-1}$) e $\sqrt{x}$ (expoente não inteiro, é $x^{1/2}$).

### Polinômio: uma soma de monômios

Um **polinômio** é uma soma (ou subtração) de monômios, que aqui se chamam *termos*:

$$
P(x)=a_n x^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0
$$

O **grau** do polinômio é o maior expoente que aparece (com coeficiente diferente de zero).

| Polinômio | Grau | Apelido |
| --- | --- | --- |
| $4x+7$ | 1 | do 1º grau |
| $2x^2+3x-5$ | 2 | do 2º grau |
| $x^3-4x+7$ | 3 | do 3º grau |
| $5$ | 0 | constante |

**Não são polinômios:** $\frac{1}{x}+x^2$ (expoente negativo), $\sqrt{x}$ (expoente fracionário) e $3^x+x$ (variável no expoente: isso é função exponencial, assunto de outra página).

> [!NOTE]
> Duas regrinhas de grau que você vai usar muito: o grau de $P\cdot Q$ é **a soma** dos graus, e o grau de $P+Q$ é **no máximo o maior** dos dois (pode cair se os termos de maior grau se cancelarem).

## Somando polinômios

Somar polinômios é juntar o que é **semelhante**: termos com a mesma variável elevada ao mesmo expoente. Pensa em arrumar a gaveta: meia com meia, camiseta com camiseta.

**Algoritmo:**

1. Escreva os polinômios lado a lado, cada um entre parênteses.
2. Tire os parênteses mantendo os sinais.
3. Agrupe os termos semelhantes.
4. Some os coeficientes de cada grupo.
5. Reescreva o resultado.

**Exemplo:** $P(x)=3x^2+2x+5$ e $Q(x)=x^2-4x+1$.

$$
\begin{aligned}
P+Q&=(3x^2+2x+5)+(x^2-4x+1)\\
&=3x^2+2x+5+x^2-4x+1\\
&=(3x^2+x^2)+(2x-4x)+(5+1)\\
&=4x^2-2x+6
\end{aligned}
$$

Mais um, agora com termos que cancelam: $C(x)=5x^3-2x+7$ e $D(x)=-3x^3+x^2+4x-1$.

$$
C+D=(5x^3-3x^3)+x^2+(-2x+4x)+(7-1)=2x^3+x^2+2x+6
$$

E com duas variáveis (o processo é igual): $A=2xy+3x-y$ e $B=-xy+y-2x$.

$$
A+B=(2xy-xy)+(3x-2x)+(-y+y)=xy+x
$$

## Subtraindo polinômios

Subtrair é **somar o oposto**. O passo que todo mundo erra é o do sinal: o sinal de menos na frente do parêntese **vira todos os termos de dentro**.

**Algoritmo:** igual ao da soma, com um passo extra no começo: **troque o sinal de todos os termos do segundo polinômio** e depois some.

$$
\begin{aligned}
(4x^2+x-2)-(2x^2-3x+5)&=4x^2+x-2\;\mathbf{-2x^2+3x-5}\\
&=(4x^2-2x^2)+(x+3x)+(-2-5)\\
&=2x^2+4x-7
\end{aligned}
$$

> [!WARNING]
> Erro número 1 de subtração: trocar só o **primeiro** termo do segundo polinômio e esquecer os outros. Se o segundo polinômio tem 3 termos, são **3 sinais** para trocar.

Outros dois, já direto:

$$
(2x^3-x^2+4)-(5x^3+3x-2)=-3x^3-x^2-3x+6
$$

$$
(2xy+3x-y)-(-xy+y-2x)=3xy+5x-2y
$$

## Multiplicando polinômios

Aqui entra a boa e velha **propriedade distributiva**: *cada termo* do primeiro multiplica *cada termo* do segundo, e depois você junta os semelhantes.

**Exemplo:** $(3x^2-4x)\cdot(x^2-3x+2)$.

$$
\begin{aligned}
&=3x^2\cdot x^2+3x^2\cdot(-3x)+3x^2\cdot 2-4x\cdot x^2-4x\cdot(-3x)-4x\cdot 2\\
&=3x^4-9x^3+6x^2-4x^3+12x^2-8x\\
&=3x^4-13x^3+18x^2-8x
\end{aligned}
$$

Dá para organizar como uma tabelinha, que ajuda a não esquecer nenhum termo. Para $(x+2)(x^2-3x+4)$:

| $\times$ | $x^2$ | $-3x$ | $4$ |
| --- | --- | --- | --- |
| $x$ | $x^3$ | $-3x^2$ | $4x$ |
| $2$ | $2x^2$ | $-6x$ | $8$ |

Somando as células: $x^3+(-3x^2+2x^2)+(4x-6x)+8=x^3-x^2-2x+8$.

Com duas variáveis: $(2xy-y)(-xy+y-2x)=-2x^2y^2+3xy^2-4x^2y-y^2+2xy$.

### Em código, é só uma lista

Um polinômio vira uma lista de coeficientes, onde o **índice é o expoente**. Somar é somar posição a posição; multiplicar é aquele duplo laço (e isso também ensina por que multiplicar polinômios "ingenuamente" custa $O(n^2)$):

```python
def somar(p, q):
    n = max(len(p), len(q))
    p = p + [0] * (n - len(p))
    q = q + [0] * (n - len(q))
    return [a + b for a, b in zip(p, q)]

def multiplicar(p, q):
    r = [0] * (len(p) + len(q) - 1)
    for i, a in enumerate(p):
        for j, b in enumerate(q):
            r[i + j] += a * b      # x^i * x^j = x^(i+j)
    return r

# 3x² - 4x  ->  [0, -4, 3]      x² - 3x + 2  ->  [2, -3, 1]
print(multiplicar([0, -4, 3], [2, -3, 1]))   # [0, -8, 18, -13, 3]
```

A saída é $0-8x+18x^2-13x^3+3x^4$, exatamente o que a gente achou à mão.

## Produtos notáveis

São multiplicações que aparecem tanto que vale **decorar o resultado**. Eles economizam muito tempo, principalmente na hora de fatorar (que é o caminho de volta).

| Nome | Fórmula |
| --- | --- |
| Soma pela diferença | $(u+v)(u-v)=u^2-v^2$ |
| Quadrado da soma | $(u+v)^2=u^2+2uv+v^2$ |
| Quadrado da diferença | $(u-v)^2=u^2-2uv+v^2$ |
| Cubo da soma | $(u+v)^3=u^3+3u^2v+3uv^2+v^3$ |
| Cubo da diferença | $(u-v)^3=u^3-3u^2v+3uv^2-v^3$ |

**Conferindo com $u=4x$ e $v=3$:**

- Soma pela diferença: $(4x+3)(4x-3)=16x^2-12x+12x-9=16x^2-9$. Os termos do meio se cancelam, por isso sobra só a diferença de quadrados.
- Quadrado da soma: $(4x+3)^2=16x^2+24x+9$.
- Quadrado da diferença: $(4x-3)^2=16x^2-24x+9$.
- Cubo da soma: $(4x+3)^3=64x^3+144x^2+108x+27$.

> [!CAUTION]
> $(u+v)^2$ **não é** $u^2+v^2$. Está faltando o termo do meio, $2uv$. É o erro mais cometido da matemática básica. Teste com $u=v=1$: $(1+1)^2=4$, mas $1^2+1^2=2$.

## Fatoração

**Fatorar** é o caminho inverso da multiplicação: escrever o polinômio como **produto de fatores**. Por exemplo, sair de $x^2+5x+6$ e chegar em $(x+2)(x+3)$.

Para que serve? Simplificar expressões, resolver equações (produto igual a zero é fácil: um dos fatores tem que ser zero) e descobrir as **raízes** de uma função. Existem algumas técnicas, e muitas vezes você usa mais de uma na mesma conta.

### Técnica 1: fator comum em evidência

Procure algo que **todos** os termos têm em comum e coloque para fora do parêntese.

$$
6x^2+3x=3x\,(2x+1)
$$

(Confira: $3x\cdot 2x=6x^2$ e $3x\cdot 1=3x$.)

### Técnica 2: agrupamento

Junte os termos de dois em dois, coloque o fator comum de cada grupo em evidência e veja se sobra um parêntese repetido. Se sobrar, ele também vira fator comum.

$$
\begin{aligned}
x^2+2x+3x+6&=\underbrace{(x^2+2x)}_{x(x+2)}+\underbrace{(3x+6)}_{3(x+2)}\\
&=x(x+2)+3(x+2)\\
&=(x+2)(x+3)
\end{aligned}
$$

### Técnica 3: decompor o termo do meio

Vale para **trinômios do 2º grau**, $ax^2+bx+c$. Passo a passo:

1. Calcule $p=a\cdot c$.
2. Ache dois números inteiros $m$ e $n$ tais que $m\cdot n=p$ e $m+n=b$.
3. Reescreva o termo do meio como $mx+nx$.
4. Agrupe (Técnica 2) e finalize.

**Exemplo:** fatorar $2x^2+5x+3$.

- É trinômio do 2º grau? Sim, com $a=2,\ b=5,\ c=3$.
- $p=2\cdot3=6$. Quais dois números multiplicam 6 e somam 5? $m=2$ e $n=3$.
- Reescrevendo: $2x^2+2x+3x+3$.
- Agrupando: $2x(x+1)+3(x+1)$.
- Evidenciando: $(2x+3)(x+1)$.

Outro: $x^2+x-2$ (aqui $p=-2$ e $b=1$, então $m=2$ e $n=-1$):

$$
x^2+2x-x-2=x(x+2)-(x+2)=(x-1)(x+2)
$$

> [!TIP]
> **Como saber qual técnica usar?** Siga esta ordem: (1) tem fator comum? Tire. (2) Sobrou diferença de quadrados ou quadrado perfeito? Use os produtos notáveis. (3) É trinômio do 2º grau? Decomponha o meio. (4) Tem 4 termos? Tente agrupar.

### Técnica 4: reconhecer produtos notáveis

Se você reconhece o padrão, fatorar vira "ler a fórmula de trás para frente":

- $x^2-16=x^2-4^2=(x-4)(x+4)$ (diferença de quadrados)
- $9x^2-24x+16=(3x)^2-2\cdot3x\cdot4+4^2=(3x-4)^2$ (quadrado da diferença)

Para testar se um trinômio é quadrado perfeito, veja se os extremos são quadrados e se o termo do meio é o dobro do produto das raízes deles.

## Resumão

| Operação | Ideia central |
| --- | --- |
| Soma | agrupe semelhantes e some coeficientes |
| Subtração | troque **todos** os sinais do segundo e some |
| Multiplicação | distributiva: todo termo com todo termo |
| Fatoração | evidência, agrupamento, decompor o meio, produtos notáveis |
| Conferir fatoração | multiplique de volta e veja se dá o original |

## Exercícios

**E1.** Calcule:

a) $(3x^2+2x-5)+(x^2-4x+1)$
b) $(-x^3+x-2)+(2x^3-5x+7)$
c) $(2x^2+5x-3)-(x^2-2x+4)$
d) $(x-1)(x^2+x+1)$

{{< details title="Gabarito" >}}
a) $4x^2-2x-4$.
b) $x^3-4x+5$.
c) $x^2+7x-7$.
d) $x^3-1$ (um clássico: $x^3-1=(x-1)(x^2+x+1)$).
{{< /details >}}

**E2.** Fatore:

a) $6x^2+9x$
b) $x^2-16$
c) $x^2+7x+12$
d) $x^2+2x-x-2$
e) $9x^2-24x+16$

{{< details title="Gabarito" >}}
a) $3x(2x+3)$.
b) $(x-4)(x+4)$.
c) $(x+3)(x+4)$ (dois números que multiplicam 12 e somam 7: 3 e 4).
d) Primeiro junte os termos do meio: $x^2+x-2$. Agrupando, $x(x+2)-(x+2)=(x-1)(x+2)$.
e) $(3x-4)^2$.

Sempre dá para **conferir multiplicando de volta**. Em d), $(x-1)(x+2)=x^2+2x-x-2$ ✓.
{{< /details >}}

### Teste rápido

{{< quiz titulo="Polinômios" >}}

{{< questao >}}
Quais das expressões abaixo são polinômios?

- [x] $4x^3-x+1$
- [ ] $x^{-2}+3$
- [x] $7$
- [ ] $\sqrt{x}+x$
---
Polinômio exige expoentes inteiros e não negativos. $x^{-2}$ e $\sqrt x=x^{1/2}$ quebram a regra. A constante $7$ é polinômio de grau 0.
{{< /questao >}}

{{< questao >}}
Qual é a forma fatorada de $x^2-25$?

- [ ] $(x-5)^2$
- [x] $(x-5)(x+5)$
- [ ] $(x+5)^2$
- [ ] $x(x-25)$
---
É uma diferença de quadrados, $x^2-5^2$. Se fosse $(x-5)^2$, o desenvolvimento teria o termo do meio $-10x$.
{{< /questao >}}

{{< questao >}}
Ao calcular $(2x+1)-(x^2-3x+4)$, o resultado correto é:

- [ ] $-x^2-x+5$
- [x] $-x^2+5x-3$
- [ ] $x^2-5x+3$
- [ ] $-x^2-x-3$
---
Trocando todos os sinais do segundo: $2x+1-x^2+3x-4=-x^2+5x-3$. Quem trocou só o primeiro termo caiu na primeira alternativa.
{{< /questao >}}

{{< /quiz >}}
