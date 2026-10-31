---
title: "Unidade 06: funções"
weight: 4
description: Definir e chamar funções, parâmetros, return, escopo e a pilha de chamadas.
autores:
  - thallesgsrv
date: 2026-10-06
---

**O que você vai aprender:** dividir um programa em partes pequenas, com nome, que você pode reutilizar e testar separadamente. É a unidade mais difícil, então vá com calma.

## Por que é tão diferente

Até aqui, o programa era uma receita única, lida de cima para baixo. Com funções, você pensa **de fora para dentro**: "o que eu quero que esta parte faça?" vem antes de "como ela faz?". Isso exige abstração, e abstração leva tempo. Se bater confusão, é normal.

## Conceitos

- **Função** é um bloco de código com nome que recebe **parâmetros** (entradas) e pode **devolver** um resultado.
- `def` cria a função, e `return` devolve o valor para quem chamou.
- **Escopo:** variáveis criadas dentro da função **só existem dentro dela**.

## Exemplo

```python
def media(a, b):
    return (a + b) / 2

nota_final = media(7.5, 9)
print(nota_final)  # 8.25
```

Três momentos: `def` apenas **ensina** o Python a fazer `media` (nada roda ainda); `media(7.5, 9)` **chama** a função, com `a = 7.5` e `b = 9`; e o `return` **devolve** 8.25, que vai parar em `nota_final`.

## A analogia da pilha de pratos

Imagine uma pilha de pratos na pia, e um detalhe importante: **você só consegue mexer no prato que está no topo**.

- Cada vez que você **chama** uma função, o Python coloca um **prato novo no topo da pilha**. Nesse prato ficam anotados os parâmetros e as variáveis daquela chamada.
- Enquanto a função roda, ela só enxerga o **próprio prato**. Os pratos de baixo estão cobertos. É por isso que variáveis de dentro da função não existem fora dela, e vice-versa: **escopo** é "o que está no meu prato".
- Quando a função dá `return`, o prato do topo é **lavado e retirado**: as variáveis dele somem, e o valor devolvido volta para quem estava no prato de baixo.
- Se uma função chama outra, o prato da segunda vai por cima. A primeira **espera**, parada, até a de cima terminar.

Veja isso acontecendo:

```python
def dobro(x):
    return x * 2

def soma_dobros(a, b):
    return dobro(a) + dobro(b)

resultado = soma_dobros(3, 4)
print(resultado)  # 14
```

Acompanhe a pilha (o topo é a linha de cima):

```text
1) Começa o programa
   | (programa principal)          |

2) Chama soma_dobros(3, 4)
   | soma_dobros: a=3, b=4         |
   | (programa principal)          |

3) soma_dobros chama dobro(3)
   | dobro: x=3                    |  <- topo: só este é visível
   | soma_dobros: a=3, b=4         |
   | (programa principal)          |

4) dobro devolve 6 e o prato sai
   | soma_dobros: a=3, b=4         |  (agora tem o 6 em mãos)
   | (programa principal)          |

5) soma_dobros chama dobro(4), que devolve 8 e sai
   | soma_dobros: a=3, b=4         |  (6 + 8)
   | (programa principal)          |

6) soma_dobros devolve 14 e sai
   | (programa principal)          |  resultado = 14
```

Repare que `x` do `dobro` e `a` do `soma_dobros` são pratos diferentes: mesmo que tivessem o mesmo nome, não se misturariam.

## O escopo na prática

```python
def calcula():
    segredo = 42          # mora no prato de calcula()
    return segredo + 1

print(calcula())   # 43
print(segredo)     # NameError: o prato de calcula() já foi retirado
```

Quando `calcula()` termina, o prato some e `segredo` vai junto. Se você precisa do valor lá fora, **devolva** com `return`.

## A confusão mais comum: `print` não é `return`

```python
def dobro_errado(x):
    print(x * 2)    # mostra na tela, mas não devolve nada

def dobro(x):
    return x * 2    # devolve o valor para quem chamou

y = dobro_errado(4)  # imprime 8, mas y vale None
z = dobro(4)         # z vale 8
```

`print` serve para **mostrar** algo à pessoa. `return` serve para **entregar** um valor ao resto do programa. Na analogia: `print` é gritar o resultado da cozinha, e `return` é entregar o prato pronto a quem pediu. Se você quer usar o resultado depois, precisa de `return`.

## Exemplo: função com decisão

```python
def maior(a, b):
    if a > b:
        return a
    return b

print(maior(3, 9))   # 9
print(maior(10, 2))  # 10
```

Quando o `if` é verdadeiro, o `return a` encerra a função na hora, e o `return b` nem chega a rodar.

## Dica de ouro

Antes de escrever a função, escreva **a chamada que você gostaria de poder fazer** e o resultado esperado. Isso é a etapa de "Compreensão" do método de Pólya, aplicada às funções.

## Erros comuns

- **Usar `print` onde devia ser `return`** (veja acima).
- **Esquecer de chamar a função:** definir com `def` não executa nada. É preciso chamá-la.
- **Usar uma variável de dentro da função fora dela:** ela não existe lá. Passe valores por parâmetros e receba por `return`.
- **Passar argumentos na ordem errada.**
- **Código depois do `return`:** ele nunca roda, porque o `return` retira o prato na hora.

## Para ir além

Texto do prof. Dalton Serey: [Introdução a Funções](https://daltonserey.github.io/curso-p1/3.5-introducao-a-funcoes/).
