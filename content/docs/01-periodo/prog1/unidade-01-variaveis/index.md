---
title: "Unidade 01: variáveis, entrada e saída"
weight: 1
description: Variáveis, tipos, entrada e saída, o ponto de partida de qualquer programa.
autores:
  - thallesgsrv
date: 2026-10-06
---

**O que você vai aprender:** guardar valores em variáveis, ler dados do teclado, mostrar resultados e fazer contas.

## Conceitos

- **Variável** é um nome que guarda um valor: `idade = 20`.
- **Tipos básicos:** `int` (inteiros), `float` (decimais), `str` (texto) e `bool` (verdadeiro ou falso).
- **Operadores:** `+`, `-`, `*`, `/` (divisão), `//` (divisão inteira), `%` (resto) e `**` (potência).
- **Saída:** `print()` mostra algo na tela.
- **Entrada:** `input()` lê o que a pessoa digitou. **Sempre devolve texto (`str`)**, mesmo que ela digite um número.

## Exemplo

```python
nome = input("Qual é o seu nome? ")
idade = int(input("Quantos anos você tem? "))

print(f"Olá, {nome}! Ano que vem você terá {idade + 1} anos.")
```

Repare em `int(...)`: ele converte o texto digitado em número, e só então dá para somar 1. O `f"..."` (f-string) insere valores dentro do texto.

## Exemplo: dividindo segundos em horas, minutos e segundos

```python
total = int(input("Segundos: "))

horas = total // 3600
resto = total % 3600
minutos = resto // 60
segundos = resto % 60

print(f"{horas}h {minutos}min {segundos}s")
```

Com `total = 3725`: `3725 // 3600` dá 1 hora, sobram `3725 % 3600 = 125` segundos, que são 2 minutos (`125 // 60`) e 5 segundos (`125 % 60`). Saída: `1h 2min 5s`.

## Erros comuns

- **Somar texto em vez de números:** `"2" + "3"` dá `"23"`, não `5`. Se você esqueceu o `int()` ou `float()` depois do `input()`, é isso.
- **`=` não é igualdade:** `x = 5` significa "guarde 5 em x". Comparar é `==`.
- **`/` sempre devolve decimal:** `7 / 2` dá `3.5`. Para a parte inteira use `//` (dá `3`), e para o resto use `%` (dá `1`).
- **Nomes de variáveis:** use nomes que expliquem (`media`, não `m`), sem espaços e sem começar com número.

## Para ir além

Textos do prof. Dalton Serey: [Números e variáveis](https://daltonserey.github.io/curso-p1/1.1-numeros-e-variaveis/), [Textos e Strings](https://daltonserey.github.io/curso-p1/1.3-textos-e-strings/), [Conversões de Tipos](https://daltonserey.github.io/curso-p1/1.4-conversoes-de-tipos/), [Saída de Dados](https://daltonserey.github.io/curso-p1/2.2-saida-de-dados/) e [Entrada de Dados](https://daltonserey.github.io/curso-p1/2.3-entrada-de-dados/).
