---
title: Estágio 2 - Espaços Vetoriais
weight: 2
rotulo: Conteúdos
description: O que é um espaço vetorial, subespaços, combinação linear, independência linear, base, dimensão e coordenadas.
autores:
  - thallesgsrv
date: 2026-10-29
---

## Bagagem esperada

Este estágio é mais **ideia** do que conta, mas as contas que aparecem vêm quase todas do Estágio 1:

- **Matrizes:** somar matrizes e multiplicar uma matriz por um número. Elas viram exemplos de "vetores".
- **Escalonamento:** é a ferramenta principal. Quase todo exercício deste estágio termina em "monte um sistema linear e escalone".
- **Polinômios e funções:** saber somar dois polinômios e multiplicar um polinômio por um número.
- **Notação de conjuntos:** \(\in\), \(\subset\) e conjuntos escritos como \(\{(x,y) : y = 2x\}\), que se lê "o conjunto dos pares \((x,y)\) tais que \(y = 2x\)".

## A ideia do estágio

Até aqui, cada objeto tinha a sua própria "personalidade": matriz tem linhas e colunas, polinômio tem grau, par ordenado tem coordenadas. Neste estágio a gente faz o contrário e **esquece o que o objeto é**. Só interessa o que dá para fazer com ele:

1. **somar** dois objetos do mesmo tipo;
2. **esticar** (multiplicar por um número) um objeto.

Se um conjunto tem essas duas operações e elas obedecem a umas regras bem comportadas, esse conjunto é um **espaço vetorial**, e os seus elementos passam a se chamar **vetores**, mesmo que sejam matrizes, polinômios ou funções. A vantagem é grande: uma teoria só vale para todos eles.

## Mapa do estágio

1. [**Espaços vetoriais**](espacos-vetoriais/): a definição, as 8 regras e exemplos (e não exemplos).
2. [**Subespaços**](subespacos/): como saber, com 3 testes, se um pedaço de um espaço vetorial continua sendo espaço vetorial.
3. [**Soma de subespaços**](soma-de-subespacos/): juntar dois subespaços e a soma direta.
4. [**Combinação linear e geradores**](combinacao-linear-e-geradores/): o que dá para "fabricar" a partir de alguns vetores.
5. [**Dependência linear**](dependencia-linear/): quando um vetor é desnecessário.
6. [**Base e dimensão**](base-e-dimensao/): o menor conjunto que gera tudo, e o "tamanho" de um espaço.
7. [**Coordenadas e mudança de base**](coordenadas-e-mudanca-de-base/): o "endereço" de um vetor e como ele muda quando a base muda.

As páginas seguem essa ordem de propósito: cada uma usa a anterior.

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

> [!TIP]
> Se travar em qualquer exercício, pergunte: **"dá para transformar isso em um sistema linear?"**. Na maioria das vezes dá, e aí é só escalonar.

## Contribuição

Se você tiver listas de exercícios ou provas anteriores do Estágio 2, pode colaborar com a biblioteca e ajudar a enriquecer esta página.
