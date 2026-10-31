---
title: "Unidade 02: decisões, strings e índices"
weight: 2
description: if/elif/else, operadores lógicos, strings, len e índices.
autores:
  - thallesgsrv
date: 2026-10-06
---

**O que você vai aprender:** fazer o programa seguir caminhos diferentes conforme uma condição, e olhar **dentro** de um texto: descobrir seu tamanho com `len` e acessar cada letra por **índice**.

## Conceitos: decisões

- **Comparações** dão `True` ou `False`: `==`, `!=`, `<`, `<=`, `>`, `>=`.
- **Operadores lógicos** combinam condições: `and`, `or` e `not`.
- **`if`, `elif` e `else`** escolhem o que executar. Só **um** bloco roda: o primeiro cuja condição for verdadeira.
- A **indentação** (os espaços no começo da linha) faz parte da sintaxe: ela diz o que está dentro do `if`.

## Exemplo

```python
idade = int(input("Idade: "))

if idade < 12:
    print("Criança")
elif idade < 18:
    print("Adolescente")
else:
    print("Adulto")
```

Se `idade` for 15, o programa testa `idade < 12` (falso), depois `idade < 18` (verdadeiro), mostra "Adolescente" e **ignora o resto**.

## Exemplo: ano bissexto

```python
ano = int(input("Ano: "))

if (ano % 4 == 0 and ano % 100 != 0) or ano % 400 == 0:
    print("Bissexto")
else:
    print("Não é bissexto")
```

Os parênteses importam: `and` é avaliado antes de `or`, e eles deixam claro o que está agrupado.

## Conceitos: strings, `len` e índices

- **`len(texto)`** devolve quantos caracteres o texto tem: `len("banana")` dá `6`.
- **Índice** é a posição de um caractere, e **começa em 0**. Em `"banana"`, o `"b"` está no índice 0, o primeiro `"a"` no 1, e assim por diante.
- **`texto[i]`** devolve o caractere na posição `i`.
- **Índice negativo** conta de trás para frente: `texto[-1]` é o último caractere, `texto[-2]` o penúltimo.
- O último índice válido é sempre **`len(texto) - 1`**.
- **`in`** testa se um trecho aparece no texto: `"nan" in "banana"` é `True`. (Atenção: em alguns exercícios o `in` em texto é proibido. Veja o enunciado.)

Uma imagem mental que ajuda:

```text
texto:     b   a   n   a   n   a
índice:    0   1   2   3   4   5
negativo: -6  -5  -4  -3  -2  -1
```

## Exemplo: `len` e índices

```python
fruta = "banana"

print(len(fruta))              # 6
print(fruta[0])                # b
print(fruta[1])                # a
print(fruta[-1])               # a  (o último)
print(fruta[len(fruta) - 1])   # a  (o mesmo, do jeito longo)
print("nan" in fruta)          # True
```

## Exemplo: decidindo com o que está no texto

```python
palavra = input("Palavra: ")

if len(palavra) == 0:
    print("Você não digitou nada")
else:
    print("Primeira letra:", palavra[0])
    print("Última letra:", palavra[len(palavra) - 1])
    if palavra[0] == palavra[-1]:
        print("Começa e termina com a mesma letra")
```

O `if len(palavra) == 0` protege o resto do código: `palavra[0]` numa string vazia dá erro.

## Erros comuns

- **`=` no lugar de `==`:** `if x = 5` dá erro. A comparação é `if x == 5`.
- **Ordem errada dos `elif`:** como o primeiro verdadeiro ganha, teste do caso mais específico para o mais geral.
- **Esquecer os dois-pontos (`:`)** no fim do `if`, `elif` e `else`.
- **Comparar texto com número:** `input()` devolve `str`, então `"15" < 18` dá erro. Converta antes.
- **`IndexError`:** acessar um índice que não existe, como `fruta[6]` (o último é o 5) ou `""[0]` (texto vazio).
- **Esquecer que a contagem começa em 0.** O "primeiro" caractere é o índice 0.
- **Strings não mudam:** `fruta[0] = "B"` dá erro. Para "alterar", crie uma nova string.

## Para ir além

Textos do prof. Dalton Serey: [Expressões Condicionais](https://daltonserey.github.io/curso-p1/3.1-expressoes-condicionais/), [If..else](https://daltonserey.github.io/curso-p1/3.2-if-else/), [If..elif..else](https://daltonserey.github.io/curso-p1/3.3-if-elif-else/), [Tipo Boolean](https://daltonserey.github.io/curso-p1/3.4-tipo-boolean/) e [Textos e Strings](https://daltonserey.github.io/curso-p1/1.3-textos-e-strings/).
