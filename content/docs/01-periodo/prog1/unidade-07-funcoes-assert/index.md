---
title: "Unidade 07: funções na prática e testes com `assert`"
weight: 5
description: Funções na prática e como testá-las com assert antes de confiar nelas.
autores:
  - thallesgsrv
date: 2026-10-06
---

**O que você vai aprender:** escrever funções mais úteis (com `if` e repetições dentro delas) e **testar** cada uma com `assert`, para ter certeza de que funcionam antes de seguir adiante.

## Conceitos

- **`assert condição`** afirma que a condição é verdadeira. Se for, nada acontece. Se for falsa, o programa para com `AssertionError`.
- **Caso de teste** é um exemplo com entrada e saída esperada: "se eu chamar `dobro(4)`, espero `8`".
- **Casos de borda** são os valores esquisitos: zero, negativo, lista vazia, texto vazio, um único elemento.
- Uma função pode **chamar outras funções**, e é assim que programas grandes são montados: peças pequenas e testadas, combinadas.

## Exemplo 1: o primeiro `assert`

```python
def dobro(x):
    return x * 2

assert dobro(4) == 8
assert dobro(0) == 0
assert dobro(-3) == -6
print("Tudo certo!")
```

Se tudo passar, aparece `Tudo certo!`. Se você trocar o corpo da função por `return x + 2`, o primeiro `assert` falha:

```text
AssertionError
```

Dá para ajudar a si mesmo com uma mensagem:

```python
assert dobro(4) == 8, "dobro(4) deveria ser 8"
```

## Exemplo 2: pensar nos testes antes do código

Queremos uma função `conta_vogais(texto)`. Antes de programar, escreva no papel (ou nos `assert`) o que ela deve fazer:

- `conta_vogais("banana")` deve dar `3`
- `conta_vogais("xyz")` deve dar `0`
- `conta_vogais("")` deve dar `0`
- `conta_vogais("AEIOU")` deve dar `5`

Só então escreva a função e, **abaixo dela**, os testes:

```python
def conta_vogais(texto):
    total = 0
    for letra in texto:
        if letra in "aeiouAEIOU":
            total += 1
    return total

assert conta_vogais("banana") == 3
assert conta_vogais("xyz") == 0
assert conta_vogais("") == 0
assert conta_vogais("AEIOU") == 5
```

Repare no teste `"AEIOU"`: ele existe para pegar o erro de esquecer das maiúsculas. Bons testes encontram bugs que você não tinha imaginado.

## Exemplo 3: função com decisão

```python
def classifica(media):
    if media >= 7:
        return "aprovado"
    elif media >= 4:
        return "final"
    else:
        return "reprovado"

assert classifica(10) == "aprovado"
assert classifica(7) == "aprovado"     # a fronteira
assert classifica(6.9) == "final"
assert classifica(4) == "final"        # outra fronteira
assert classifica(3.9) == "reprovado"
assert classifica(0) == "reprovado"
```

Teste sempre **as fronteiras**: os valores exatos onde a resposta muda (7 e 4 aqui). É onde mais se erra `>` por `>=`.

## Exemplo 4: funções que chamam funções

```python
def eh_par(n):
    return n % 2 == 0

def conta_pares(numeros):
    total = 0
    for n in numeros:
        if eh_par(n):
            total += 1
    return total

assert eh_par(4) == True
assert eh_par(7) == False
assert conta_pares([1, 2, 3, 4, 6]) == 3
assert conta_pares([]) == 0
assert conta_pares([1, 3, 5]) == 0
```

`conta_pares` confia em `eh_par` porque `eh_par` já foi testada. É assim que se constrói um programa grande sem se perder.

## Exemplo 5: devolver mais de uma coisa

```python
def menor_e_maior(numeros):
    menor = numeros[0]
    maior = numeros[0]
    for n in numeros:
        if n < menor:
            menor = n
        if n > maior:
            maior = n
    return menor, maior

menor, maior = menor_e_maior([4, 17, 9, 25, 3])
assert menor == 3
assert maior == 25
```

## Exemplo 6: a função que procura

```python
def posicao(lista, valor):
    for i in range(len(lista)):
        if lista[i] == valor:
            return i      # achou: encerra a função aqui
    return -1             # só chega aqui se não achou em nenhuma volta

assert posicao([10, 20, 30], 20) == 1
assert posicao([10, 20, 30], 99) == -1
assert posicao([], 5) == -1
```

O `return -1` fica **fora** do `for`. Se estivesse dentro, a função desistiria já na primeira volta.

## Erros comuns

- **`assert` com `=`:** `assert x = 5` dá erro de sintaxe. Use `==`.
- **Testar só o caso feliz.** Teste também zero, negativo, vazio e fronteiras.
- **Comparar decimais com `==`:** `0.1 + 0.2 == 0.3` é `False` por causa da imprecisão dos decimais. Em testes, prefira valores que o computador representa bem ou verifique se a diferença é muito pequena.
- **`return` dentro do `for` cedo demais:** `return` encerra a função inteira na primeira volta. Se queria devolver só no fim, tire-o do loop.
- **Testar a função com `print` em vez de `assert`:** `print` exige que você olhe e confira. `assert` confere por você.
- **Escrever os `assert` antes do `def`:** o Python executa de cima para baixo, então a função precisa estar definida antes de ser chamada (`NameError`).
