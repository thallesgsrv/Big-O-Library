---
title: Estágio 2 - Espaços Vetoriais
weight: 2
rotulo: Conteúdos
description: Do zero e sem Vetorial. Espaços, subespaços, combinação linear, base, dimensão e coordenadas.
autores:
  - thallesgsrv
date: 2026-11-09
---

> [!TIP]
> **Prova amanhã?** Vá direto para a [Revisão Relâmpago](revisao-relampago/): receitas, armadilhas e um mini-simulado com gabarito. Cada receita aponta a página onde o assunto está explicado com calma. Para treinar com provas reais, use as [Provas Resolvidas](provas-resolvidas/).

## Pode começar do zero

Você **não precisa ter cursado Vetorial** (Geometria Analítica) para este estágio. Tudo o que vem de lá e que você vai usar cabe em três ideias:

1. **Um vetor é só uma lista de números.** \((2, 5)\) é um vetor de \(\mathbb{R}^2\) e \((1, 0, -3)\) é um vetor de \(\mathbb{R}^3\). Você não precisa pensar em setas, ângulos ou produto escalar. Se quiser desenhar, \((2, 5)\) é o ponto que fica 2 para a direita e 5 para cima.
2. **Dá para somar listas e esticar listas.** Somar é somar posição por posição: \((1, 2) + (3, 5) = (4, 7)\). Esticar é multiplicar todas as posições pelo mesmo número: \(3 \cdot (1, 2) = (3, 6)\).
3. **Quase tudo vira um sistema linear.** Quando você travar, a pergunta mágica é: *"dá para transformar isso em um sistema linear e escalonar?"*. Quase sempre dá.

O resto (subespaço, base, dimensão, coordenadas) é vocabulário novo para coisas que você já sabe fazer.

## Bagagem esperada

As contas que aparecem vêm quase todas do Estágio 1:

- **Escalonamento e sistemas lineares:** é a ferramenta principal do estágio.
- **Determinante:** serve de atalho para decidir se uma lista de vetores é independente.
- **Matrizes:** somar matrizes e multiplicar uma matriz por um número. Elas viram exemplos de "vetores".
- **Polinômios:** somar dois polinômios e multiplicar um polinômio por um número.

## Como ler a notação de conjuntos

Quase toda definição do estágio tem este formato:

$$
W = \{\,(x, y, z) \in \mathbb{R}^3 \;\mid\; x - 3z = 0\,\}
$$

Leia da esquerda para a direita:

- **\(\{\) e \(\}\)**: "o conjunto de".
- **\((x, y, z) \in \mathbb{R}^3\)**: "os vetores \((x, y, z)\) que moram em \(\mathbb{R}^3\)". Este é o **espaço grande**, de onde os candidatos saem.
- **A barra \(\mid\)** (alguns livros usam dois pontos \(:\)): lê-se **"tais que"**.
- **\(x - 3z = 0\)**: o **filtro**. Só entra em \(W\) quem passa nesse filtro.

Então \(W\) é "o conjunto dos vetores de \(\mathbb{R}^3\) **tais que** \(x - 3z = 0\)". Para pertencer a \(W\) é preciso **estar no espaço grande e passar pelo filtro**. Guarde esta imagem: ela resolve metade das dúvidas das próximas páginas.

## A ideia do estágio

Até aqui, cada objeto tinha a sua própria personalidade: matriz tem linhas e colunas, polinômio tem grau, par ordenado tem coordenadas. Neste estágio a gente faz o contrário e **esquece o que o objeto é**. Só interessa o que dá para fazer com ele:

1. **somar** dois objetos do mesmo tipo;
2. **esticar** (multiplicar por um número) um objeto.

Se um conjunto tem essas duas operações e elas se comportam bem, ele é um **espaço vetorial**, e os seus elementos passam a se chamar **vetores**, mesmo que sejam matrizes, polinômios ou funções. A vantagem é grande: uma teoria só vale para todos eles.

> [!TIP]
> **Truque que serve para o estágio inteiro.** Todo objeto "esquisito" vira uma lista de números. O polinômio \(a + bt + ct^2\) vira \((a, b, c)\). A matriz \(\begin{bmatrix} a & b \\ c & d \end{bmatrix}\) vira \((a, b, c, d)\). Depois disso, é só fazer contas com listas, como em \(\mathbb{R}^3\) ou \(\mathbb{R}^4\).

## Mapa do estágio

1. [**Espaços vetoriais**](espacos-vetoriais/): a definição, as 8 regras e exemplos (e não exemplos).
2. [**Subespaços**](subespacos/): como provar que um conjunto **é** subespaço e como mostrar que **não é**.
3. [**Soma de subespaços**](soma-de-subespacos/): juntar dois subespaços e a soma direta.
4. [**Combinação linear e geradores**](combinacao-linear-e-geradores/): o que dá para "fabricar" a partir de alguns vetores.
5. [**Dependência linear**](dependencia-linear/): quando um vetor é desnecessário.
6. [**Base e dimensão**](base-e-dimensao/): o menor conjunto que gera tudo, e o "tamanho" de um espaço.
7. [**Coordenadas e mudança de base**](coordenadas-e-mudanca-de-base/): o "endereço" de um vetor e como ele muda quando a base muda.
8. [**Revisão Relâmpago**](revisao-relampago/): o resumo de véspera de prova, com mini-simulado.
9. [**Provas Resolvidas**](provas-resolvidas/): as quatro provas do 2º estágio de 2025.2 resolvidas passo a passo.

As páginas seguem essa ordem de propósito: cada uma usa a anterior.

## Qual ferramenta usar em cada tipo de exercício

| O enunciado pede... | Ferramenta | Página |
| --- | --- | --- |
| "É subespaço? Justifique." | Zero, soma, escalar (com letras) ou contraexemplo (com números) | [Subespaços](subespacos/) |
| "Escreva \(v\) como combinação linear de..." | Montar e resolver um sistema | [Combinação linear](combinacao-linear-e-geradores/) |
| "Mostre que \(v\) **não** é combinação linear" | Sistema impossível | [Combinação linear](combinacao-linear-e-geradores/) |
| "Condição para \((x, y, z)\) ser combinação linear" | Sistema com letras no lado direito | [Combinação linear](combinacao-linear-e-geradores/) |
| "Encontre geradores" | Isolar variáveis e separar por variável livre | [Combinação linear](combinacao-linear-e-geradores/) |
| "É LI? Para que valores de \(k\)?" | Sistema homogêneo ou determinante | [Dependência linear](dependencia-linear/) |
| "É base? Qual a dimensão?" | LI + contar vetores | [Base e dimensão](base-e-dimensao/) |
| "Encontre base de \(W_1 \cap W_2\) e \(W_1 + W_2\)" | Juntar equações / juntar geradores | [Soma de subespaços](soma-de-subespacos/) |
| "Interseção quando um subespaço vem por parâmetros" | Substituir o vetor genérico nas equações do outro | [Soma de subespaços](soma-de-subespacos/) |
| "Dimensão de um subespaço dado por parâmetros ou geradores" | Separar por parâmetro e **escalonar** | [Base e dimensão](base-e-dimensao/) |
| "Base de \(W\) contida em \(\{v_1, \ldots, v_n\}\)" | Colunas com pivô da matriz original | [Base e dimensão](base-e-dimensao/) |
| "Complete \(S\) a uma base do \(\mathbb{R}^4\)" | Acrescentar \(e_j\) nas colunas sem pivô e provar LI | [Base e dimensão](base-e-dimensao/) |
| "Calcule \([v]_B\)" | Resolver \(v = a_1b_1 + \cdots + a_nb_n\) | [Coordenadas](coordenadas-e-mudanca-de-base/) |
| "Matriz de mudança de base" | Colunas = vetores da base de partida escritos na de chegada | [Coordenadas](coordenadas-e-mudanca-de-base/) |

## Colinha do estágio

| Conceito | Pergunta que ele responde | Como testar na prática |
| --- | --- | --- |
| Espaço vetorial | Dá para somar e esticar sem sair do conjunto? | Conferir fechamento e as 8 regras |
| Subespaço | Este pedaço continua sendo espaço vetorial? | \(0\) está nele? Fecha na soma? Fecha no escalar? |
| Gerador | Quais vetores eu consigo fabricar com estes? | Montar um sistema e ver se tem solução |
| Independência linear | Algum vetor da lista é desnecessário? | Sistema homogêneo: só a solução nula? |
| Base | Qual é a lista enxuta que gera tudo? | Gera e é LI (ou \(n\) vetores LI em dimensão \(n\)) |
| Dimensão | Quantos vetores tem uma base? | Contar os vetores de qualquer base |
| Coordenadas | Qual é o endereço do vetor nesta base? | Resolver \(v = a_1v_1 + \cdots + a_nv_n\) |

## Contribuição

Se você tiver listas de exercícios ou provas anteriores do Estágio 2, pode colaborar com a biblioteca e ajudar a enriquecer esta página.
