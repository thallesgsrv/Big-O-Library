---
title: "Unidade 09: dicionários e matrizes"
weight: 7
description: Dicionários para contar e agrupar, e matrizes como listas de listas.
autores:
  - thallesgsrv
date: 2026-10-06
---

**O que você vai aprender:** guardar dados por **nome** (dicionários) e por **linha e coluna** (matrizes).

## Conceitos: dicionários

- **Dicionário** associa **chaves** a **valores**: `{"ana": 8.5, "bia": 7.0}`.
- Em vez de índice numérico, você acessa pela chave: `notas["ana"]`.
- **`d[chave] = valor`** cria ou altera uma entrada.
- **`chave in d`** testa se a chave existe.
- **`for chave in d`** percorre as chaves.
- **`len(d)`** é o número de entradas.

## Exemplo 1: o básico

```python
notas = {"ana": 8.5, "bia": 7.0}

print(notas["ana"])      # 8.5

notas["caio"] = 6.0      # cria uma entrada nova
notas["bia"] = 9.0       # altera uma existente

print(len(notas))        # 3
print("ana" in notas)    # True
print("davi" in notas)   # False
```

## Exemplo 2: percorrendo

```python
notas = {"ana": 8.5, "bia": 9.0, "caio": 6.0}

for nome in notas:
    print(nome, notas[nome])
```

## Exemplo 3: contar ocorrências (o uso mais clássico)

```python
def conta_letras(texto):
    contagem = {}
    for letra in texto:
        if letra in contagem:
            contagem[letra] += 1
        else:
            contagem[letra] = 1
    return contagem

assert conta_letras("banana") == {"b": 1, "a": 3, "n": 2}
assert conta_letras("") == {}
```

A lógica: se a letra já é uma chave, some 1 ao valor. Se não é, é a primeira vez que ela aparece, então crie a chave com valor 1.

## Exemplo 4: dicionário com listas

```python
turma = {
    "ana": [8.0, 9.0, 7.5],
    "bia": [6.0, 7.0, 5.5],
}

for nome in turma:
    soma = 0
    for nota in turma[nome]:
        soma += nota
    media = soma / len(turma[nome])
    print(f"{nome}: {media:.2f}")
```

## Conceitos: matrizes

- **Matriz** é uma **lista de listas**. Cada lista interna é uma **linha**.
- `m[i][j]` é o elemento na linha `i` e coluna `j` (também a partir do 0).
- `len(m)` é o número de **linhas**. `len(m[0])` é o número de **colunas**.
- Para percorrer tudo, use **dois `for` aninhados**: um para as linhas, outro para as colunas.

## Exemplo 5: acessar e percorrer

```python
m = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

print(m[0])      # [1, 2, 3]   (a linha 0)
print(m[1][2])   # 6           (linha 1, coluna 2)
print(len(m))        # 3 linhas
print(len(m[0]))     # 3 colunas

for i in range(len(m)):
    for j in range(len(m[0])):
        print(m[i][j], end=" ")
    print()   # quebra de linha ao fim de cada linha
```

Saída:

```text
1 2 3
4 5 6
7 8 9
```

## Exemplo 6: somar a diagonal

```python
def soma_diagonal(m):
    total = 0
    for i in range(len(m)):
        total += m[i][i]      # linha e coluna iguais
    return total

assert soma_diagonal([[1, 2], [3, 4]]) == 5     # 1 + 4
assert soma_diagonal([[5]]) == 5
```

## Exemplo 7: somar cada linha

```python
def soma_linhas(m):
    somas = []
    for i in range(len(m)):
        soma = 0
        for j in range(len(m[i])):
            soma += m[i][j]
        somas.append(soma)
    return somas

assert soma_linhas([[1, 2, 3], [4, 5, 6]]) == [6, 15]
```

## Exemplo 8: criar uma matriz de zeros (com cuidado!)

```python
def cria_matriz(linhas, colunas):
    m = []
    for i in range(linhas):
        linha = []
        for j in range(colunas):
            linha.append(0)
        m.append(linha)
    return m

m = cria_matriz(2, 3)
m[0][0] = 9
print(m)   # [[9, 0, 0], [0, 0, 0]]
```

O atalho `[[0] * 3] * 2` **parece** equivalente, mas cria duas referências para a **mesma** linha (lembra do Exemplo 8 da Unidade 08?). Alterar `m[0][0]` mudaria as duas linhas ao mesmo tempo. Por isso, crie cada linha dentro do `for`, como acima.

## Exemplo 9: matriz transposta

```python
def transposta(m):
    linhas = len(m)
    colunas = len(m[0])
    t = cria_matriz(colunas, linhas)
    for i in range(linhas):
        for j in range(colunas):
            t[j][i] = m[i][j]
    return t

assert transposta([[1, 2, 3], [4, 5, 6]]) == [[1, 4], [2, 5], [3, 6]]
```

## Erros comuns

- **`KeyError`:** acessar uma chave que não existe (`notas["zeca"]`). Teste com `in` antes.
- **Confundir chave com valor.** O dicionário busca pela **chave**.
- **Trocar linha e coluna:** `m[i][j]` é linha `i`, coluna `j`. Se a matriz não for quadrada, o erro vira `IndexError`.
- **Usar `len(m)` para as colunas.** `len(m)` conta as linhas.
- **Criar matriz com `[[0] * c] * l`** (aliasing, descrito no Exemplo 8).
- **Esquecer o `print()` vazio** para quebrar a linha ao imprimir uma matriz.
