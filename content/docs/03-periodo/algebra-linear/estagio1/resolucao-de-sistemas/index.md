---
title: Resolvendo e Classificando Sistemas
weight: 5
description: Sistemas possíveis, impossíveis, determinados e indeterminados; variáveis livres, sistemas homogêneos e problemas com parâmetro.
autores:
  - thallesgsrv
date: 2026-10-11
---

## Sobre

Agora juntamos duas peças: a **matriz ampliada** (da página de sistemas) e o **escalonamento** (da página anterior). A receita é:

1. Escreva a matriz ampliada \([A : B]\).
2. Leve-a à forma escada reduzida.
3. **Leia** a resposta nas linhas.

Esse método se chama **Método de Gauss-Jordan**. (O **Método de Gauss** é a versão que zera só *abaixo* dos pivôs, deixando a matriz "triangular", e termina resolvendo de baixo para cima por substituição.)

## As três possibilidades

Um sistema linear só pode cair em **um** destes três casos:

| Nome | Quantas soluções | Em uma frase |
| --- | --- | --- |
| **Possível e determinado (SPD)** | Exatamente uma | Há uma única resposta |
| **Possível e indeterminado (SPI)** | Infinitas | Há resposta, e ela depende de parâmetros livres |
| **Impossível (SI)** | Nenhuma | As equações se contradizem |

Para duas variáveis, cada equação é uma **reta** no plano e a solução é onde as retas se cruzam:

- Retas que se cortam num ponto: SPD.
- Retas coincidentes (a mesma reta escrita de duas formas): SPI.
- Retas paralelas distintas (nunca se encontram): SI.

> [!NOTE]
> Não existe sistema linear com "exatamente duas soluções". Ou é uma, ou nenhuma, ou infinitas.

## Lendo a forma escada

Seja \(p_c\) o posto da matriz dos coeficientes \(A\), \(p_a\) o posto da matriz ampliada \([A : B]\) e \(n\) o número de variáveis. Então:

- Se \(p_a \neq p_c\): o sistema é **impossível**.
- Se \(p_a = p_c = n\): o sistema é **possível e determinado**.
- Se \(p_a = p_c < n\): o sistema é **possível e indeterminado**, com \(n - p_c\) **variáveis livres** (esse número é o chamado grau de liberdade).

Na prática, olhe a forma escada e procure:

1. **Uma linha do tipo \(0 \;\; 0 \;\; \cdots \;\; 0 \;\; | \;\; 1\)** (zeros nos coeficientes e algo diferente de zero no final). Ela significa \(0 = 1\): **impossível**.
2. Sem essa linha, conte os pivôs. Se todas as variáveis têm pivô: **determinado**. Se sobram variáveis sem pivô: **indeterminado**.

## Caso 1: sistema possível e determinado

Exemplo 1:

$$
\begin{cases}
x + y = 5 \\
x - y = 1
\end{cases}
$$

Matriz ampliada e escalonamento (\(L_2 \to L_2 - L_1\), depois \(L_2 \to -\tfrac{1}{2}L_2\), depois \(L_1 \to L_1 - L_2\)):

$$
\begin{bmatrix}
1 & 1 & 5 \\
1 & -1 & 1
\end{bmatrix}
\sim
\begin{bmatrix}
1 & 1 & 5 \\
0 & -2 & -4
\end{bmatrix}
\sim
\begin{bmatrix}
1 & 1 & 5 \\
0 & 1 & 2
\end{bmatrix}
\sim
\begin{bmatrix}
1 & 0 & 3 \\
0 & 1 & 2
\end{bmatrix}
$$

Lendo: \(x = 3\) e \(y = 2\). Como \(p_a = p_c = 2 = n\), é SPD, com \(S = \{(3, 2)\}\).

## Caso 2: sistema possível e indeterminado

### Variáveis livres

Variáveis **com pivô** ficam presas (dependem das outras). Variáveis **sem pivô** são **livres**: podem valer qualquer número, e damos a elas nomes como \(\lambda\) (lambda) ou \(t\). As variáveis presas se escrevem em função das livres.

Exemplo 2:

$$
\begin{cases}
x + y + z = 6 \\
x - y + z = 2
\end{cases}
$$

Escalonando:

$$
\begin{bmatrix}
1 & 1 & 1 & 6 \\
1 & -1 & 1 & 2
\end{bmatrix}
\sim
\begin{bmatrix}
1 & 1 & 1 & 6 \\
0 & -2 & 0 & -4
\end{bmatrix}
\sim
\begin{bmatrix}
1 & 1 & 1 & 6 \\
0 & 1 & 0 & 2
\end{bmatrix}
\sim
\begin{bmatrix}
1 & 0 & 1 & 4 \\
0 & 1 & 0 & 2
\end{bmatrix}
$$

As colunas 1 e 2 têm pivô (\(x\) e \(y\)). A coluna 3 não tem, então \(z\) é **livre**. Fazendo \(z = \lambda\):

- Linha 1: \(x + z = 4\), logo \(x = 4 - \lambda\).
- Linha 2: \(y = 2\).

$$
S = \{(4 - \lambda, \; 2, \; \lambda) \mid \lambda \in \mathbb{R}\}
$$

Cada valor de \(\lambda\) dá uma solução diferente: \(\lambda = 0\) dá \((4, 2, 0)\), \(\lambda = 1\) dá \((3, 2, 1)\), e assim por diante. Aqui \(p_a = p_c = 2 < 3 = n\), com \(3 - 2 = 1\) variável livre.

> [!NOTE]
> **Dica:** para conferir, escolha dois valores de \(\lambda\) e teste na equação original. Com \(\lambda = 1\): \(3 + 2 + 1 = 6\) e \(3 - 2 + 1 = 2\). Funciona.

### Muitas variáveis livres

Quando há mais incógnitas que equações, é comum ter mais de uma variável livre.

Exemplo 3:

$$
x_1 + 2x_2 - x_3 + 3x_4 = 1
$$

É uma única equação com 4 variáveis. A forma escada é ela própria (pivô em \(x_1\)). As variáveis \(x_2\), \(x_3\), \(x_4\) são livres: chamamos \(x_2 = \lambda_1\), \(x_3 = \lambda_2\), \(x_4 = \lambda_3\) e isolamos \(x_1\):

$$
S = \{(1 - 2\lambda_1 + \lambda_2 - 3\lambda_3, \; \lambda_1, \; \lambda_2, \; \lambda_3) \mid \lambda_1, \lambda_2, \lambda_3 \in \mathbb{R}\}
$$

## Caso 3: sistema impossível

Exemplo 4:

$$
\begin{cases}
x + y = 2 \\
2x + 2y = 5
\end{cases}
$$

$$
\begin{bmatrix}
1 & 1 & 2 \\
2 & 2 & 5
\end{bmatrix}
\sim
\begin{bmatrix}
1 & 1 & 2 \\
0 & 0 & 1
\end{bmatrix}
$$

A última linha diz \(0x + 0y = 1\), isto é, \(0 = 1\), o que é falso. Aqui \(p_c = 1\) e \(p_a = 2\), então o sistema é **impossível**: \(S = \emptyset\).

Intuição: a segunda equação diz que \(x + y\) vale \(\tfrac{5}{2}\), a primeira diz que vale \(2\). Não dá para as duas serem verdade.

## Sistemas homogêneos

Um sistema é **homogêneo** quando todos os termos constantes são zero (\(B = 0\)). Como \(A \cdot 0 = 0\), ele **sempre** tem pelo menos a **solução trivial**: todas as variáveis iguais a zero. Portanto um sistema homogêneo **nunca é impossível**.

A pergunta interessante é: existe alguma solução **além** da trivial? Isso acontece exatamente quando o sistema é indeterminado, isto é, quando \(p_c < n\).

Exemplo 5:

Para quais valores de \(k\) o sistema abaixo tem solução diferente da trivial?

$$
\begin{cases}
x + y = 0 \\
x + ky = 0
\end{cases}
$$

Subtraindo a primeira equação da segunda: \((k - 1)y = 0\).

- Se \(k \neq 1\): \(y = 0\), e então \(x = 0\). Só a solução trivial.
- Se \(k = 1\): a segunda equação vira a primeira, sobra \(x + y = 0\) com uma variável livre. Há infinitas soluções, como \((1, -1)\).

Resposta: \(k = 1\).

## Sistemas com parâmetro

Em provas é comum aparecer uma letra (como \(k\)) no sistema, pedindo para classificá-lo conforme \(k\). A estratégia é escalonar com \(k\) e **separar os casos em que o pivô "some"**.

Exemplo 6:

Classifique, em função de \(k\):

$$
\begin{cases}
x + y = 2 \\
2x + ky = 4
\end{cases}
$$

Fazendo \(L_2 \to L_2 - 2L_1\):

$$
\begin{bmatrix}
1 & 1 & 2 \\
0 & k - 2 & 0
\end{bmatrix}
$$

- Se \(k \neq 2\): podemos dividir por \(k - 2\) e obter \(y = 0\), logo \(x = 2\). É **SPD** com \(S = \{(2, 0)\}\).
- Se \(k = 2\): a segunda linha vira \(0 \;\; 0 \;\; | \;\; 0\), então só resta \(x + y = 2\). É **SPI**, com \(S = \{(2 - \lambda, \lambda) \mid \lambda \in \mathbb{R}\}\).

Neste exemplo não existe valor de \(k\) que torne o sistema impossível, porque o lado direito da linha problemática é sempre 0.

> [!WARNING]
> **Nunca divida por uma expressão que pode ser zero** sem separar esse caso. Dividir por \(k - 2\) só vale quando \(k \neq 2\), e o caso \(k = 2\) precisa ser analisado à parte.

## Um sistema com matriz como incógnita

Às vezes pedem "ache matrizes \(X\) tais que \(AX = B\)". Isso é só um sistema escrito em forma matricial. Escalone \([A : B]\), ache a solução geral (com variáveis livres) e **escolha valores** para os parâmetros para obter exemplos específicos de \(X\).

## Roteiro para qualquer sistema

1. Escreva a matriz ampliada.
2. Escalone até a forma escada reduzida.
3. Há linha \(0 \; \cdots \; 0 \; | \; c\) com \(c \neq 0\)? **Impossível.**
4. Senão, todas as variáveis têm pivô? **Determinado**: leia os valores.
5. Senão, sobram variáveis livres: **indeterminado**. Nomeie as livres e isole as demais.
6. Confira testando na equação original.

## Resumo

- Todo sistema linear tem **0, 1 ou infinitas** soluções.
- \(p_a \neq p_c\): impossível. \(p_a = p_c = n\): determinado. \(p_a = p_c < n\): indeterminado, com \(n - p_c\) variáveis livres.
- Sistema homogêneo sempre tem a solução trivial; só tem outras se \(p_c < n\).
- Com parâmetro, escalone e separe os valores que anulam algum pivô.

## Exercícios propostos

### Exercício 1

Classifique e resolva:

$$
\begin{cases}
x + 2y = 4 \\
2x + 4y = 8
\end{cases}
$$

{{< details title="Gabarito" >}}
$$
\begin{bmatrix}
1 & 2 & 4 \\
2 & 4 & 8
\end{bmatrix}
\sim
\begin{bmatrix}
1 & 2 & 4 \\
0 & 0 & 0
\end{bmatrix}
$$

Só há pivô na coluna 1, então \(y\) é livre: \(y = \lambda\) e \(x = 4 - 2\lambda\). O sistema é **possível e indeterminado**:

$$
S = \{(4 - 2\lambda, \; \lambda) \mid \lambda \in \mathbb{R}\}
$$

(As duas equações são a mesma reta.)
{{< /details >}}

### Exercício 2

Classifique:

$$
\begin{cases}
x + y + z = 1 \\
x + y + z = 2
\end{cases}
$$

{{< details title="Gabarito" >}}
Subtraindo as equações, obtemos \(0 = 1\). O sistema é **impossível**: \(S = \emptyset\). (Dois planos paralelos nunca se encontram.)
{{< /details >}}

### Exercício 3

Para que valores de \(k\) o sistema abaixo é possível e determinado?

$$
\begin{cases}
x + y = 3 \\
x + ky = 5
\end{cases}
$$

{{< details title="Gabarito" >}}
\(L_2 \to L_2 - L_1\) dá a linha \(0 \;\; (k - 1) \;\; | \;\; 2\).

- Se \(k \neq 1\): \(y = \dfrac{2}{k - 1}\), e \(x\) fica determinado. **SPD**.
- Se \(k = 1\): a linha vira \(0 \;\; 0 \;\; | \;\; 2\), isto é, \(0 = 2\). **Impossível**.

Resposta: possível e determinado para todo \(k \neq 1\). Aqui não existe valor de \(k\) que dê SPI.
{{< /details >}}
