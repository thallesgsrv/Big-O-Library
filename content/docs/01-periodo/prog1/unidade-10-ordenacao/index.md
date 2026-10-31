---
title: "Unidade 10: algoritmos de ordenação"
weight: 8
description: Bubble sort, insertion sort e merge sort em Python, passo a passo.
autores:
  - thallesgsrv
date: 2026-10-06
---

**O que você vai aprender:** como ordenar uma lista passo a passo. O Python já tem formas prontas de ordenar, mas entender **como** ordenar treina o raciocínio, junta tudo que você aprendeu (loops, índices, listas, funções) e é cobrado em prova. Nas atividades, implemente você mesmo, sem usar as ordenações prontas.

## Conceitos

- **Ordenar** é rearrumar os elementos do menor para o maior.
- **Troca** em Python: `a[i], a[j] = a[j], a[i]` (sem variável auxiliar).
- Algoritmos diferentes chegam ao mesmo resultado com **custos** diferentes. Uma medida simples é quantas comparações são feitas quando a lista cresce.
  - **Insertion sort e bubble sort** fazem muito trabalho em listas grandes (cresce com o **quadrado** do tamanho, escrito `O(n²)`). São simples de entender.
  - **Merge sort** é bem mais rápido em listas grandes (`O(n log n)`), mas é um pouco mais difícil, porque usa **recursão**.

Para todos os exemplos, vamos usar a lista `[5, 3, 1, 4]`.

## Bubble sort: "a bolha sobe"

**Ideia:** compare vizinhos. Se estão fora de ordem, troque. Depois de uma passada completa, o **maior** elemento "borbulhou" até o final. Repita para o resto.

```python
def bubble_sort(lista):
    n = len(lista)
    for i in range(n - 1):
        trocou = False
        for j in range(n - 1 - i):
            if lista[j] > lista[j + 1]:
                lista[j], lista[j + 1] = lista[j + 1], lista[j]
                trocou = True
        if not trocou:      # nenhuma troca: já está ordenada
            break

numeros = [5, 3, 1, 4]
bubble_sort(numeros)
assert numeros == [1, 3, 4, 5]
```

Acompanhando `[5, 3, 1, 4]`:

```text
Passada 1:
  [5, 3, 1, 4]  compara 5 e 3 -> troca -> [3, 5, 1, 4]
  [3, 5, 1, 4]  compara 5 e 1 -> troca -> [3, 1, 5, 4]
  [3, 1, 5, 4]  compara 5 e 4 -> troca -> [3, 1, 4, 5]   (o 5 chegou ao fim)
Passada 2:
  [3, 1, 4, 5]  compara 3 e 1 -> troca -> [1, 3, 4, 5]
  [1, 3, 4, 5]  compara 3 e 4 -> ok
Passada 3:
  nenhuma troca -> pronto
```

Por que `range(n - 1 - i)`? Depois de `i` passadas, os últimos `i` elementos já estão no lugar certo, então não precisa olhar para eles.

## Insertion sort: "ordenar cartas na mão"

**Ideia:** como ao organizar cartas de baralho. Pegue uma carta de cada vez e **insira-a no lugar certo** entre as que já estão ordenadas à esquerda.

```python
def insertion_sort(lista):
    for i in range(1, len(lista)):
        atual = lista[i]          # a carta que vamos encaixar
        j = i - 1
        while j >= 0 and lista[j] > atual:
            lista[j + 1] = lista[j]   # empurra para a direita
            j -= 1
        lista[j + 1] = atual          # encaixa no buraco

numeros = [5, 3, 1, 4]
insertion_sort(numeros)
assert numeros == [1, 3, 4, 5]
```

Acompanhando `[5, 3, 1, 4]` (a parte ordenada fica antes da barra):

```text
[5 | 3, 1, 4]   i=1: pega 3, empurra o 5 -> [3, 5 | 1, 4]
[3, 5 | 1, 4]   i=2: pega 1, empurra 5 e 3 -> [1, 3, 5 | 4]
[1, 3, 5 | 4]   i=3: pega 4, empurra o 5 -> [1, 3, 4, 5]
```

## Merge sort: "dividir e conquistar"

**Ideia:** uma lista de 0 ou 1 elemento já está ordenada. Para ordenar uma lista maior, **divida ao meio**, ordene cada metade e depois **junte (*merge*)** as duas metades já ordenadas, sempre pegando o menor dos dois primeiros.

Dois passos, duas funções. Primeiro, juntar duas listas **já ordenadas**:

```python
def merge(esquerda, direita):
    resultado = []
    i = 0
    j = 0
    while i < len(esquerda) and j < len(direita):
        if esquerda[i] <= direita[j]:
            resultado.append(esquerda[i])
            i += 1
        else:
            resultado.append(direita[j])
            j += 1
    # uma das listas acabou: copie o que sobrou da outra
    while i < len(esquerda):
        resultado.append(esquerda[i])
        i += 1
    while j < len(direita):
        resultado.append(direita[j])
        j += 1
    return resultado

assert merge([1, 4], [2, 3]) == [1, 2, 3, 4]
assert merge([], [7]) == [7]
```

Depois, dividir, ordenar as metades e juntar:

```python
def merge_sort(lista):
    if len(lista) <= 1:           # caso base: nada a ordenar
        return lista

    meio = len(lista) // 2

    esquerda = []
    for i in range(meio):
        esquerda.append(lista[i])

    direita = []
    for i in range(meio, len(lista)):
        direita.append(lista[i])

    esquerda = merge_sort(esquerda)    # a função chama a si mesma
    direita = merge_sort(direita)
    return merge(esquerda, direita)

assert merge_sort([5, 3, 1, 4]) == [1, 3, 4, 5]
assert merge_sort([]) == []
assert merge_sort([7]) == [7]
```

Os dois `for` com `append` montam as metades sem usar fatiamento: o primeiro copia os índices de `0` até `meio - 1`, e o segundo de `meio` até o fim.

Observe que `merge_sort` **devolve** uma lista nova, enquanto `bubble_sort` e `insertion_sort` alteram a lista original. Isso é uma diferença de estilo, não de qualidade.

Acompanhando `[5, 3, 1, 4]`:

```text
Dividir:                [5, 3, 1, 4]
                        /          \
                   [5, 3]          [1, 4]
                   /    \          /    \
                 [5]    [3]      [1]    [4]

Juntar (merge):
                 [5]+[3] -> [3, 5]      [1]+[4] -> [1, 4]
                       [3, 5] + [1, 4] -> [1, 3, 4, 5]
```

E o `merge([3, 5], [1, 4])`:

```text
esquerda=[3,5]  direita=[1,4]   1 < 3 -> pega 1   resultado=[1]
esquerda=[3,5]  direita=[4]     3 < 4 -> pega 3   resultado=[1, 3]
esquerda=[5]    direita=[4]     4 < 5 -> pega 4   resultado=[1, 3, 4]
direita acabou; sobrou [5]                        resultado=[1, 3, 4, 5]
```

**Conexão com a Unidade 06:** `merge_sort` chama `merge_sort`, e cada chamada ganha seu próprio prato na pilha. A pilha cresce até chegar às listas de 1 elemento (o caso base) e depois vai se desfazendo, juntando as metades. O **caso base** (`len(lista) <= 1`) é o que impede a pilha de crescer para sempre.

## Erros comuns

- **Limite do loop errado:** em `bubble_sort`, usar `range(n)` na volta interna faz `lista[j + 1]` estourar o índice (`IndexError`).
- **Esquecer a ordem das condições no `while` do insertion sort:** `j >= 0` precisa vir **antes** de `lista[j] > atual`, senão você acessa `lista[-1]` sem querer.
- **Esquecer o `lista[j + 1] = atual`** no fim do insertion sort. O elemento se perde.
- **Esquecer o caso base** do `merge_sort`: a recursão nunca para (`RecursionError`).
- **Esquecer de copiar o que sobrou** no `merge`: elementos ficam de fora.
- **Testar só uma lista.** Teste lista vazia, com um elemento, já ordenada, em ordem inversa e com repetidos (`[2, 1, 2, 1]`).
