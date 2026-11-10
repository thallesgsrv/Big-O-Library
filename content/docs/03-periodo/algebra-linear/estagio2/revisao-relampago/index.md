---
title: Revisão Relâmpago
weight: 8
description: Resumo para estudar na véspera da prova do Estágio 2, com receitas, armadilhas e um mini-simulado com gabarito.
autores:
  - thallesgsrv
date: 2026-11-09
---

## Para quem é

Esta página é para quem vai estudar o Estágio 2 **no dia anterior à prova**. Ela não substitui as páginas do estágio: é o **caminho mais curto** por elas. Cada receita tem o link da página onde o assunto está explicado com calma, para você voltar só onde travar.

A revisão foi montada comparando o material com as provas do 2º estágio de Álgebra Linear I da UFCG (2025.2, turnos manhã e tarde e as duas reposições). As quatro provas têm a mesma cara:

| Questão | Pontos | O que costuma pedir | Receitas |
| --- | --- | --- | --- |
| 1 | 2,0 | V ou F **com justificativa**: (a) é subespaço? (b) é base, é combinação linear, é LI? | 1, 2, 3, 4 |
| 2 | 1,0 + 1,0 | (a) valor de \(k\) (combinação linear ou dependência); (b) **dimensão** de um subespaço dado por parâmetros ou geradores | 2, 3, 5 |
| 3 | 2,0 | mostrar que \(S\) é LI e **completar a uma base** do \(\mathbb{R}^4\); ou mostrar que é LD e dar uma **base contida** no conjunto | 6 |
| 4 | 4 × 1,0 | \(W_1\) e \(W_2\): base e dimensão de cada um, \(W_1 \cap W_2\), \(\dim(W_1 + W_2)\) e soma direta | 5, 7, 8 |

Três padrões que se repetiram nas quatro provas:

- A **questão 3** só tem duas versões: completar uma lista LI até uma base, ou achar uma base contida num conjunto LD.
- Na **questão 4**, em 3 das 4 provas um subespaço vem por equações e o outro por parâmetros, então a interseção exige **substituir**.
- Na **questão 2b**, os três geradores ou parâmetros davam dimensão **2**, nunca 3.

## Plano para a véspera (cerca de 3h30)

1. **30 min:** leia as definições e as 8 receitas abaixo, sem fazer contas.
2. **60 min:** faça o [mini-simulado](#mini-simulado) com o relógio rodando e sem olhar o gabarito.
3. **45 min:** corrija. Para cada erro, abra a página indicada e refaça um exercício dela.
4. **60 min:** refaça só o que errou e treine as receitas 5, 6 e 7, que são as que mais derrubam.
5. **Durma.** O que não entrou até aqui não entra de madrugada, e a prova cobra cabeça descansada.

## As definições em 6 linhas

- **Subespaço:** contém o vetor nulo, fecha na soma e fecha no escalar.
- **Combinação linear:** \(a_1v_1 + \cdots + a_nv_n\). O **gerado** \([v_1, \ldots, v_n]\) é o conjunto de todas elas.
- **LI:** \(a_1v_1 + \cdots + a_nv_n = 0\) só com todos os \(a_i = 0\). Se existe outra solução, é **LD**.
- **Base:** lista LI que gera o espaço. \(\dim\) é o número de vetores de uma base.
- **Dimensões que você precisa saber de cabeça:** \(\dim \mathbb{R}^n = n\), \(\dim P_n = n + 1\), \(\dim M(m,n) = mn\), simétricas \(2 \times 2\) têm dimensão 3.
- **Soma e interseção:** \(\dim(W_1 + W_2) = \dim W_1 + \dim W_2 - \dim(W_1 \cap W_2)\). A soma é **direta** quando \(W_1 \cap W_2 = \{0\}\).

## As 8 receitas

### Receita 1: é subespaço? ([Subespaços](../subespacos/))

1. Teste o **zero**. Se não passa, não é subespaço.
2. Olhe o filtro:
   - equação linear igual a zero (\(x - 3z = 0\), \(x = y = 3z\), \(A = A^T\)): **é**. Prove com **letras** (soma e escalar) ou cite o teorema "combinação linear das coordenadas = 0";
   - produto, quadrado, desigualdade, número solto: **não é**. Dê **um contraexemplo com números**.
3. Contraexemplo certo para cada caso: produto ou quadrado quebram na **soma**; desigualdade quebra no **escalar negativo** (use um elemento com folga); número solto quebra no **zero**.

*Exemplo:* \(\{(x,y,z) \mid z = xy\}\). Os vetores \((1,0,0)\) e \((0,1,0)\) estão (\(0 = 1 \cdot 0\) e \(0 = 0 \cdot 1\)), mas a soma \((1,1,0)\) não: \(0 \neq 1 \cdot 1\). **Não é subespaço.**

### Receita 2: é combinação linear? valor de \(k\)? ([Combinação linear](../combinacao-linear-e-geradores/))

1. Monte \(v = a\,u_1 + b\,u_2\) e iguale **coordenada a coordenada**: sai um sistema.
2. Com mais equações do que incógnitas: **resolva duas** e **teste o resultado na que sobrou**. Se não bate, o sistema é impossível e \(v\) **não** é combinação linear.
3. Para achar \(k\): resolva \(a\) e \(b\) com as equações que não têm \(k\) e deixe a equação com \(k\) dar o valor dele.

*Exemplo:* \((3, k, 7)\) como combinação de \((1,2,1)\) e \((2,1,3)\). As equações sem \(k\) são \(a + 2b = 3\) e \(a + 3b = 7\), que dão \(b = 4\) e \(a = -5\). A do meio dá \(k = 2a + b = -10 + 4 = -6\).

### Receita 3: LI ou LD, e valores de \(k\) ([Dependência linear](../dependencia-linear/))

1. **Mais vetores do que a dimensão** (4 vetores em \(\mathbb{R}^3\)): LD, sem conta. Lista com o **vetor nulo**: LD.
2. **\(n\) vetores em \(\mathbb{R}^n\)** (ou em \(P_{n-1}\), \(M(2,2)\) com 4 matrizes): monte a matriz e calcule o **determinante**. \(\det \neq 0\) é LI, \(\det = 0\) é LD.
3. Com \(k\): o determinante vira uma expressão em \(k\). **LD é \(\det = 0\)**, e se aparecer \(k^2\) pode haver **duas raízes** (\(k = \pm 2\), por exemplo).
4. Matrizes e polinômios: troque cada um pela **lista de coeficientes** antes de qualquer conta.

*Exemplo:* \(\{(1,0,1), (0,1,1), (1,1,k)\}\) tem \(\det = k - 2\). É LD só para \(k = 2\).

### Receita 4: é base? ([Base e dimensão](../base-e-dimensao/))

1. **Conte.** Número de vetores diferente da dimensão: **não é base**, sem conta (mais vetores é LD, menos vetores não gera).
2. Número igual à dimensão: **basta provar que é LI** (determinante).
3. Em \(M(2,2)\), quatro matrizes: veja se uma é combinação das outras (por exemplo, a quarta é um múltiplo de uma soma). Se sim, **LD, não é base**.

### Receita 5: base e dimensão de um subespaço ([Base e dimensão](../base-e-dimensao/))

**Por equações:** isole as variáveis, separe uma parcela por **variável livre**. Os vetores obtidos já formam uma base, e \(\dim = n - (\text{número de equações independentes})\).

**Por parâmetros ou geradores:** separe uma parcela por parâmetro, depois **escalone** e conte as linhas não nulas. Os geradores **não** são necessariamente LI.

> [!WARNING]
> **Letras demais não é dimensão.** Três parâmetros dão no máximo dimensão 3, e muitas vezes dão 2, porque um gerador é combinação dos outros. Nas quatro provas analisadas, a questão 2b tinha três geradores e a resposta correta era **2**.

*Exemplo:* \(\{(a + b, b + c, a - c)\}\) gera \((1,0,1)\), \((1,1,0)\), \((0,1,-1)\), e o segundo é a soma do primeiro com o terceiro. Base \(\{(1,0,1), (0,1,-1)\}\), \(\dim = 2\).

### Receita 6: base contida no conjunto e completar base ([Base e dimensão](../base-e-dimensao/#base-contida-no-conjunto-dado))

**Base contida em \(\{v_1, \ldots, v_n\}\)** (questão de LD):

1. **LD:** mostre uma relação não trivial (ou mais vetores do que a dimensão).
2. Vetores como **colunas**, escalone, e fique com os **vetores originais** das colunas com **pivô**.
3. Justifique: são LI, e os outros são combinação deles (leia as relações nas colunas sem pivô).

**Completar uma lista LI \(S\) até uma base do \(\mathbb{R}^4\)** (questão de LI):

1. Mostre que \(S\) é **LI** (escalone, sem linha nula).
2. Veja as **colunas sem pivô** e acrescente o canônico \(e_j\) de cada uma.
3. Prove que a lista nova é **LI** (\(\det \neq 0\)). Com 4 vetores LI em \(\mathbb{R}^4\), é base.

### Receita 7: interseção ([Soma de subespaços](../soma-de-subespacos/))

- **Os dois por equações:** junte as equações e resolva.
- **Um por equações, outro por parâmetros:** pegue o vetor genérico do paramétrico, **substitua nas equações do outro**, resolva em função dos parâmetros e reescreva o vetor com a condição achada.
- **Os dois por parâmetros:** iguale \(a\,u_1 + b\,u_2 = c\,w_1 + d\,w_2\) e resolva o sistema homogêneo.

### Receita 8: soma, soma direta ([Soma de subespaços](../soma-de-subespacos/))

1. Ache as dimensões de \(W_1\), \(W_2\) e de \(W_1 \cap W_2\).
2. \(\dim(W_1 + W_2) = \dim W_1 + \dim W_2 - \dim(W_1 \cap W_2)\).
3. **Soma direta** é interseção \(= \{0\}\). Se a interseção não é \(\{0\}\), a resposta é "não é direta" e você justifica citando um vetor não nulo dela.
4. \(V = W_1 \oplus W_2\) exige as duas coisas: \(W_1 + W_2 = V\) **e** interseção \(\{0\}\).

## Armadilhas que mais custam pontos

- **Provar com números que é subespaço.** Número só serve para **derrubar**. Para provar, use letras e a hipótese.
- **Esquecer de justificar o V ou F.** A resposta sem justificativa não vale nada.
- **Dar a dimensão pelo número de parâmetros.** Escalone antes.
- **Entregar linhas escalonadas quando pedem base "contida"** no conjunto dado.
- **Completar a base sem provar que a lista nova é LI.** Acrescentar um vetor qualquer pode dar lista LD.
- **Determinante em matriz não quadrada.** Só vale com \(n\) vetores em dimensão \(n\).
- **Perder uma raiz** quando o determinante tem \(k^2\).
- **Dizer "não é combinação linear" sem testar a equação que sobrou.** Duas equações bonitas não bastam: a terceira decide.
- **Escrever \(\oplus\) com interseção diferente de \(\{0\}\).** Nesse caso a soma existe, mas não é direta.

## Mini-simulado

**Tempo sugerido: 50 minutos.** Mesma estrutura das provas. Resolva no papel antes de abrir cada gabarito.

**Questão 1.** Responda V ou F, justificando.

a) \(U = \{(x, y, z) \in \mathbb{R}^3 \mid x = 2y - z\}\) é subespaço de \(\mathbb{R}^3\).

b) \(\{(1,1,0), (0,1,1), (1,2,1)\}\) é base de \(\mathbb{R}^3\).

{{< details title="Gabarito da questão 1" >}}
**a) V.** O filtro é \(x - 2y + z = 0\), uma combinação linear das coordenadas igual a zero. Prova rápida: \((0,0,0)\) passa; se \(u = (x_1,y_1,z_1)\) e \(v = (x_2,y_2,z_2)\) estão em \(U\), então \(x_1 + x_2 = 2(y_1 + y_2) - (z_1 + z_2)\) (soma das duas igualdades) e \(\alpha x_1 = 2(\alpha y_1) - (\alpha z_1)\).

**b) F.** São 3 vetores em \(\mathbb{R}^3\), então basta testar LI. Mas \((1,2,1) = (1,1,0) + (0,1,1)\), logo são LD (\(\det = 0\)) e não formam base.
{{< /details >}}

**Questão 2.**

a) Para que valor de \(k\) o vetor \(w = (3, k, 7)\) é combinação linear de \(v_1 = (1,2,1)\) e \(v_2 = (2,1,3)\)?

b) Qual a dimensão de \(W = \left[\begin{bmatrix} 1 & 0 \\ 2 & 1 \end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}, \begin{bmatrix} 2 & 1 \\ 5 & 2 \end{bmatrix}\right]\) em \(M(2,2)\)?

{{< details title="Gabarito da questão 2" >}}
**a)** \(a v_1 + b v_2 = w\) dá \(a + 2b = 3\), \(2a + b = k\), \(a + 3b = 7\). Da primeira e da terceira, \(b = 4\) e \(a = -5\). Da segunda, \(k = 2(-5) + 4 = \mathbf{-6}\). (Conferindo pela condição do plano gerado, \(5x - y - 3z = 0\): \(15 - (-6) - 21 = 0\). ✓)

**b)** São três geradores, mas a terceira matriz é \(2A + B\) (primeira vezes 2 mais a segunda): \(\begin{bmatrix} 2 & 0 \\ 4 & 2 \end{bmatrix} + \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 2 & 1 \\ 5 & 2 \end{bmatrix}\). Ela sobra. As duas primeiras não são múltiplas uma da outra, então são LI. **\(\dim W = 2\).**
{{< /details >}}

**Questão 3.**

a) Mostre que \(S = \{(1,1,0,0), (0,1,1,0), (0,0,1,1)\}\) é LI e dê uma base de \(\mathbb{R}^4\) que contenha \(S\).

b) Sejam \(v_1 = (1,0,1)\), \(v_2 = (0,1,1)\), \(v_3 = (1,1,2)\), \(v_4 = (2,1,3)\) e \(W = [v_1, v_2, v_3, v_4]\). Mostre que são LD e dê uma base de \(W\) contida em \(\{v_1, v_2, v_3, v_4\}\).

{{< details title="Gabarito da questão 3" >}}
**a)** As três linhas já estão escalonadas, com pivôs nas colunas 1, 2 e 3, e nenhuma é nula: \(S\) é **LI**. A coluna 4 não tem pivô, então acrescentamos \(e_4 = (0,0,0,1)\). O determinante

$$
\det \begin{bmatrix} 1 & 1 & 0 & 0 \\ 0 & 1 & 1 & 0 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 1 \end{bmatrix} = 1 \neq 0
$$

mostra que os 4 vetores são LI, então \(\{(1,1,0,0), (0,1,1,0), (0,0,1,1), (0,0,0,1)\}\) é base de \(\mathbb{R}^4\).

**b)** Vetores como colunas:

$$
\begin{bmatrix} 1 & 0 & 1 & 2 \\ 0 & 1 & 1 & 1 \\ 1 & 1 & 2 & 3 \end{bmatrix}
\xrightarrow{L_3 \to L_3 - L_1 - L_2}
\begin{bmatrix} 1 & 0 & 1 & 2 \\ 0 & 1 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}.
$$

Pivôs nas colunas 1 e 2. As relações aparecem nas colunas 3 e 4: \(v_3 = v_1 + v_2\) e \(v_4 = 2v_1 + v_2\). **LD:** \(v_1 + v_2 - v_3 = 0\) (e são 4 vetores em \(\mathbb{R}^3\)). **Base contida:** \(\{v_1, v_2\} = \{(1,0,1), (0,1,1)\}\), LI e geradora de \(W\). \(\dim W = 2\).
{{< /details >}}

**Questão 4.** Em \(\mathbb{R}^4\), sejam \(W_1 = \{(x,y,z,t) \mid x + y = 0 \text{ e } z = t\}\) e \(W_2 = \{(a + b,\; -a,\; b,\; 2b) \mid a, b \in \mathbb{R}\}\).

a) Uma base e a dimensão de \(W_1\).

b) Uma base e a dimensão de \(W_2\).

c) \(W_1 \cap W_2\).

d) \(\dim(W_1 + W_2)\). A soma é direta?

{{< details title="Gabarito da questão 4" >}}
**a)** \(y = -x\) e \(t = z\), então \((x, -x, z, z) = x(1,-1,0,0) + z(0,0,1,1)\). Base \(\{(1,-1,0,0), (0,0,1,1)\}\), \(\dim W_1 = 2\).

**b)** \((a + b, -a, b, 2b) = a(1,-1,0,0) + b(1,0,1,2)\). Os dois geradores não são múltiplos, então são LI. Base \(\{(1,-1,0,0), (1,0,1,2)\}\), \(\dim W_2 = 2\).

**c)** Substitua o vetor genérico de \(W_2\) nas equações de \(W_1\):

- \(x + y = 0\) vira \((a + b) + (-a) = b = 0\);
- \(z = t\) vira \(b = 2b\), ou seja, \(b = 0\).

Com \(b = 0\), o vetor é \((a, -a, 0, 0) = a(1,-1,0,0)\). Logo \(W_1 \cap W_2 = [(1,-1,0,0)]\), de dimensão 1.

**d)** \(\dim(W_1 + W_2) = 2 + 2 - 1 = 3\). Como a interseção não é \(\{0\}\), a soma **não é direta** (por exemplo, \((1,-1,0,0)\) pertence aos dois). Além disso, \(3 < 4\), então \(W_1 + W_2 \neq \mathbb{R}^4\).
{{< /details >}}

### Onde voltar se errou

| Errei... | Volto em... |
| --- | --- |
| 1a | [Subespaços](../subespacos/) |
| 1b, 2a | [Combinação linear](../combinacao-linear-e-geradores/) e [Dependência linear](../dependencia-linear/) |
| 2b | [Base e dimensão](../base-e-dimensao/#quando-o-subespaço-vem-por-parâmetros) |
| 3a ou 3b | [Base e dimensão](../base-e-dimensao/#base-contida-no-conjunto-dado), seções "Base contida" e "Completar" |
| 4c | [Soma de subespaços](../soma-de-subespacos/), "Interseção quando um subespaço vem por parâmetros" |
| 4d | [Soma de subespaços](../soma-de-subespacos/), "Soma direta" |

## Checklist final

Se você consegue fazer **sem olhar** as 8 coisas abaixo, está pronto:

- [ ] Provar com letras que um conjunto com equação linear é subespaço, e derrubar outro com um contraexemplo.
- [ ] Montar e resolver o sistema de "é combinação linear?" e achar o \(k\).
- [ ] Calcular um determinante \(3 \times 3\) com \(k\) e resolver \(\det = 0\).
- [ ] Decidir se uma lista é base **contando** primeiro.
- [ ] Achar base e dimensão de um subespaço por equações **e** por parâmetros (escalonando).
- [ ] Extrair uma base contida no conjunto (colunas com pivô) e completar uma lista LI (canônicos nas colunas sem pivô).
- [ ] Achar a interseção com um subespaço por parâmetros (substituir).
- [ ] Usar a fórmula da dimensão da soma e dizer se a soma é direta.
