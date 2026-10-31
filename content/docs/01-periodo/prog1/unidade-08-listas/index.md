---
title: "Unidade 08: listas e seus métodos"
weight: 6
description: Listas e seus métodos, mutabilidade e o cuidado com duas variáveis na mesma lista.
autores:
  - thallesgsrv
date: 2026-10-06
---

**O que você vai aprender:** modificar listas, adicionando e removendo elementos com `append`, `insert` e `pop`.

## Conceitos

- Uma **lista** guarda vários valores em ordem: `[10, 20, 30]`. Os índices e o `len` funcionam como nas strings.
- Diferente da string, a lista é **mutável**: dá para trocar um elemento (`lista[0] = 99`) e crescer ou encolher.
- **`lista.append(x)`** adiciona `x` **no final**.
- **`lista.insert(i, x)`** adiciona `x` **na posição `i`**, empurrando os outros para a direita.
- **`lista.pop()`** remove e **devolve** o último elemento.
- **`lista.pop(i)`** remove e devolve o elemento da posição `i`.
- **`x in lista`** diz se `x` está na lista.

Esses métodos **alteram a própria lista**, não criam outra.

## Exemplo 1: `append`

```python
frutas = []                # lista vazia
frutas.append("maçã")
frutas.append("banana")
frutas.append("uva")

print(frutas)       # ['maçã', 'banana', 'uva']
print(len(frutas))  # 3
```

## Exemplo 2: trocar um elemento pelo índice

```python
numeros = [10, 20, 30]
numeros[1] = 99
print(numeros)   # [10, 99, 30]
```

## Exemplo 3: `insert`

```python
frutas = ["maçã", "banana", "uva"]

frutas.insert(1, "manga")   # na posição 1
print(frutas)   # ['maçã', 'manga', 'banana', 'uva']

frutas.insert(0, "pera")    # no começo
print(frutas)   # ['pera', 'maçã', 'manga', 'banana', 'uva']
```

Primeiro vem **a posição**, depois **o valor**. É fácil inverter.

## Exemplo 4: `pop`

```python
frutas = ["maçã", "banana", "uva"]

ultima = frutas.pop()      # tira a última e devolve
print(ultima)              # uva
print(frutas)              # ['maçã', 'banana']

primeira = frutas.pop(0)   # tira a da posição 0
print(primeira)            # maçã
print(frutas)              # ['banana']
```

Como `pop` **devolve** o elemento removido, você pode guardá-lo numa variável ou usá-lo direto.

## Exemplo 5: construir uma lista dentro de uma função

Filtrar os pares de uma lista **sem mexer na original**:

```python
def so_pares(numeros):
    resultado = []
    for n in numeros:
        if n % 2 == 0:
            resultado.append(n)
    return resultado

original = [1, 2, 3, 4, 5, 6]
pares = so_pares(original)

assert pares == [2, 4, 6]
assert original == [1, 2, 3, 4, 5, 6]   # a original continua igual
```

Esse padrão (começar com `[]`, ir dando `append`, devolver no fim) aparece o tempo todo.

## Exemplo 6: usar a lista como uma pilha de tarefas

```python
tarefas = ["lavar louça", "estudar P1", "treinar"]

while len(tarefas) > 0:
    atual = tarefas.pop()
    print("Fazendo:", atual)
# Fazendo: treinar
# Fazendo: estudar P1
# Fazendo: lavar louça
```

É a mesma lógica da pilha de pratos da Unidade 06: o último que entra é o primeiro que sai.

## Exemplo 7: a lista é alterada "por dentro"

```python
def adiciona_zero(lista):
    lista.append(0)       # altera a lista que veio de fora

numeros = [1, 2]
adiciona_zero(numeros)
print(numeros)   # [1, 2, 0]
```

Aqui não há `return`, e mesmo assim `numeros` mudou. Funções que recebem uma lista **podem modificá-la**. Isso é poderoso e perigoso: se não quiser mexer na original, construa uma lista nova, como no Exemplo 5.

## Exemplo 8: duas variáveis, a mesma lista

```python
a = [1, 2, 3]
b = a          # NÃO copia: b e a apontam para a MESMA lista
b.append(4)
print(a)       # [1, 2, 3, 4]
```

Para copiar de verdade, crie uma lista nova e preencha:

```python
a = [1, 2, 3]

c = []
for x in a:
    c.append(x)

c.append(5)
print(a)   # [1, 2, 3]     (a não mudou)
print(c)   # [1, 2, 3, 5]
```

## Exemplo 9: inverter uma lista com `pop`

```python
def inverte(lista):
    copia = []
    for x in lista:
        copia.append(x)

    resultado = []
    while len(copia) > 0:
        resultado.append(copia.pop())   # o último da cópia vira o próximo
    return resultado

assert inverte([1, 2, 3]) == [3, 2, 1]
assert inverte([]) == []
```

Trabalhamos numa cópia para não esvaziar a lista original.

## Erros comuns

- **`lista = lista.append(x)`:** `append` devolve `None`, então a lista vira `None`. Escreva apenas `lista.append(x)`.
- **`pop` em lista vazia:** dá `IndexError`. Teste `len(lista) > 0` antes.
- **Inverter os argumentos do `insert`:** é `insert(posição, valor)`.
- **Remover elementos enquanto percorre com `for`:** a lista muda no meio do caminho e o `for` pula elementos. Construa uma lista nova ou percorra de trás para frente.
- **Achar que `b = a` faz uma cópia** (Exemplo 8).
