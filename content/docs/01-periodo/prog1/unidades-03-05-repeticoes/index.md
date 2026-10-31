---
title: "Unidades 03 a 05: repetições e listas"
weight: 3
description: while, for, acumuladores, contadores, break e percursos sobre listas.
autores:
  - thallesgsrv
date: 2026-10-06
---

**O que você vai aprender:** repetir ações com `while` e `for`, e guardar vários valores em **listas**. A ideia central é que **o computador é bom em repetir**: você descreve o passo uma vez e diz quantas vezes (ou até quando) repetir.

## Conceitos

- **`while`** repete **enquanto** a condição for verdadeira.
- **`for`** percorre os elementos de uma sequência (texto ou lista), um por vez.
- **`range(n)`** gera os números de `0` a `n - 1`.
- **Lista** guarda vários valores em ordem: `[10, 20, 30]`. `len` e índices funcionam como nas strings (Unidade 02): `lista[0]` é o primeiro e `lista[len(lista) - 1]` é o último.
- **Acumulador** é uma variável que vai guardando um resultado a cada volta (soma, contagem, maior valor até agora).
- **Contador** é um acumulador que sobe de um em um.

## Exemplo 1: `while` com contador

```python
contador = 1

while contador <= 5:
    print(contador)
    contador = contador + 1   # sem isso, o loop nunca termina

print("Fim")
```

Passo a passo: `contador` começa em 1, o teste `1 <= 5` é verdadeiro, imprime 1 e sobe para 2. Isso se repete até `contador` virar 6. Aí o teste `6 <= 5` é falso e o `while` termina.

## Exemplo 2: `for` com acumulador

```python
notas = [7.0, 8.5, 6.0, 9.5]

soma = 0
for nota in notas:
    soma = soma + nota

media = soma / len(notas)
print(f"Média: {media:.2f}")   # Média: 7.75
```

O `len` ajuda a dividir pela quantidade de notas sem precisar contar na mão.

## Exemplo 3: `for` com índice

Às vezes você precisa saber **a posição**, não só o valor. Use `range(len(...))`:

```python
palavra = "python"

for i in range(len(palavra)):
    print(i, palavra[i])
# 0 p
# 1 y
# 2 t
# 3 h
# 4 o
# 5 n
```

## Exemplo 4: o mesmo percurso com `while`

```python
palavra = "python"

i = 0
while i < len(palavra):
    print(i, palavra[i])
    i = i + 1
```

`for` com `range` e `while` com contador fazem a mesma coisa aqui. Use `for` quando souber quantas voltas vai dar, e `while` quando a parada depender de uma condição.

## Exemplo 5: percorrer de trás para frente

```python
palavra = "python"

i = len(palavra) - 1
while i >= 0:
    print(palavra[i], end="")
    i = i - 1
print()   # nohtyp
```

## Exemplo 6: encontrar o maior valor

```python
numeros = [4, 17, 9, 25, 3]

maior = numeros[0]          # começa assumindo que o primeiro é o maior
for n in numeros:
    if n > maior:
        maior = n

print(maior)  # 25
```

## Exemplo 7: contar com condição

```python
texto = "Programação em Python"

vogais = 0
for letra in texto:
    if letra in "aeiouAEIOU":
        vogais = vogais + 1

print(vogais)
```

## Exemplo 8: `while` com `break`

```python
while True:
    senha = input("Senha: ")
    if senha == "python":
        print("Acesso liberado")
        break               # sai do loop
    print("Senha errada, tente de novo")
```

## Exemplo 9: ler até um valor de parada

```python
soma = 0
numero = int(input("Número (0 para parar): "))

while numero != 0:
    soma = soma + numero
    numero = int(input("Número (0 para parar): "))

print("Soma:", soma)
```

Repare que o `input` aparece **duas vezes**: uma antes do loop (para ter um valor para testar) e outra no fim de cada volta (para atualizar o valor).

## Erros comuns

- **Loop infinito:** esquecer de atualizar a variável que a condição testa. Se travar, aperte `Ctrl + C` no terminal.
- **Erro por um (*off-by-one*):** `range(5)` vai de 0 a **4**. O último índice de uma lista é `len(x) - 1`, não `len(x)`.
- **`IndexError` em listas:** acessar `lista[3]` numa lista de 3 elementos.
- **Esquecer de inicializar o acumulador** antes do `for` (`soma = 0`).
- **Inicializar o acumulador dentro do loop:** ele volta a zero a cada volta.
- **Usar `maior = 0` para achar o maior:** se todos os números forem negativos, o resultado fica errado. Comece com o primeiro elemento.

## Para ir além

Textos do prof. Dalton Serey: [Introdução a Repetições](https://daltonserey.github.io/curso-p1/4.0-introducao-a-repeticoes/), [Sequências](https://daltonserey.github.io/curso-p1/4.1-sequencias/), [Iterações e Iteradores](https://daltonserey.github.io/curso-p1/4.2-iteracoes-e-iteradores/), [Comandos de Repetição](https://daltonserey.github.io/curso-p1/4.3-comandos-de-repeticao/), [While](https://daltonserey.github.io/curso-p1/5.1-while/), [Grafos de Fluxo de Controle](https://daltonserey.github.io/curso-p1/5.2-grafos-de-fluxo/), [Do..while](https://daltonserey.github.io/curso-p1/5.3-do-while/) e [Loop..leave](https://daltonserey.github.io/curso-p1/5.4-loop-leave/).
