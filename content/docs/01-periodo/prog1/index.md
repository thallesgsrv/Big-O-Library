---
title: Programação 1
weight: 1
description: Lógica de programação e primeiros programas.
autores:
  - thallesgsrv
date: 2026-10-06
---

## Sobre

Programação 1 (P1) e Laboratório de Programação 1 (LP1) costumam parecer fáceis no começo, e esse é o perigo: quem relaxa nas primeiras unidades chega despreparado onde a matéria realmente muda de nível. Esta página é um roteiro para estudar a disciplina com foco em **entender**, não em decorar. Os exemplos usam Python.

Os **exercícios** de cada unidade são disponibilizados pelos professores na VM da disciplina. Esta página traz a explicação e os exemplos para você chegar preparado a eles.

## Antes de começar

**Chegue rápido na Unidade 06.** Ela costuma ser a mais difícil, porque muda a forma como você escreve código: em vez de um script que roda de cima para baixo, você passa a dividir o problema em **funções**. Quem passa dessa unidade vê a disciplina voltar a ficar fácil. Por isso, não deixe as unidades anteriores se arrastarem.

**Como estudar:**

- Digite o código dos exemplos em vez de copiar e colar. Os erros que você comete digitando são os que mais ensinam.
- Se algo não fizer sentido, releia, e releia de novo. Nada escrito por outra pessoa é impossível de entender.
- Depois de entender um exemplo, mude-o: troque valores, quebre de propósito, veja a mensagem de erro. Erro de programação não é fracasso, é informação.
- Faça os exercícios da VM antes de olhar qualquer solução.
- Quando travar, simule o código **no papel**, linha por linha, anotando o valor de cada variável. É a habilidade mais valiosa da disciplina.

### Atenção às restrições dos exercícios

Em algumas unidades, os professores **proíbem funções e recursos prontos do Python** (como fatiamento, `split`, `sum`, `max`, `sorted` e outros), porque o objetivo é você aprender a construir a solução. Os exemplos desta página evitam esses recursos de propósito. Antes de entregar qualquer exercício, **leia o enunciado e veja o que é permitido naquela unidade**.

## Ever Dream This Man?

Programar é, antes de tudo, resolver problemas. O livro *How to Solve It*, de George Pólya (há exemplares na biblioteca), é uma recomendação do professor Dalton Serey, e as etapas abaixo vêm dele:

1. **Compreensão: o que é o problema?** Quais são as entradas? O que precisa sair? Dá para explicar com suas palavras?
2. **Planejamento: como resolver?** Já resolvi algo parecido? Dá para quebrar em partes menores? Teste a ideia com papel e exemplos antes de digitar.
3. **Execução:** escreva o código seguindo o plano, uma parte por vez, testando cada parte.
4. **Validação e verificação:** o resultado está certo para vários casos, inclusive os esquisitos (zero, negativo, vazio)? Normalmente você volta e revisa todas as etapas anteriores.

### Exemplo: média de três notas

1. **Compreender:** entram três números, sai um número, a média.
2. **Planejar:** somar as três notas e dividir por 3.
3. **Executar:**

```python
n1 = float(input("Nota 1: "))
n2 = float(input("Nota 2: "))
n3 = float(input("Nota 3: "))

media = (n1 + n2 + n3) / 3
print(f"Média: {media:.2f}")
```

4. **Validar:** com 7, 8 e 9 deve sair 8.00. Com 0, 0 e 0, deve sair 0.00.

### O princípio KISS

**KISS** significa *keep it simple, stupid* (mantenha simples). Uma máxima parecida: *faça a coisa mais simples que possa funcionar*. Código simples é mais fácil de entender, de testar e de consertar. Comece pelo jeito mais direto de resolver. Só complique se for necessário.

## Unidade 01: variáveis, entrada e saída

**O que você vai aprender:** guardar valores em variáveis, ler dados do teclado, mostrar resultados e fazer contas.

### Conceitos

- **Variável** é um nome que guarda um valor: `idade = 20`.
- **Tipos básicos:** `int` (inteiros), `float` (decimais), `str` (texto) e `bool` (verdadeiro ou falso).
- **Operadores:** `+`, `-`, `*`, `/` (divisão), `//` (divisão inteira), `%` (resto) e `**` (potência).
- **Saída:** `print()` mostra algo na tela.
- **Entrada:** `input()` lê o que a pessoa digitou. **Sempre devolve texto (`str`)**, mesmo que ela digite um número.

### Exemplo

```python
nome = input("Qual é o seu nome? ")
idade = int(input("Quantos anos você tem? "))

print(f"Olá, {nome}! Ano que vem você terá {idade + 1} anos.")
```

Repare em `int(...)`: ele converte o texto digitado em número, e só então dá para somar 1. O `f"..."` (f-string) insere valores dentro do texto.

### Exemplo: dividindo segundos em horas, minutos e segundos

```python
total = int(input("Segundos: "))

horas = total // 3600
resto = total % 3600
minutos = resto // 60
segundos = resto % 60

print(f"{horas}h {minutos}min {segundos}s")
```

Com `total = 3725`: `3725 // 3600` dá 1 hora, sobram `3725 % 3600 = 125` segundos, que são 2 minutos (`125 // 60`) e 5 segundos (`125 % 60`). Saída: `1h 2min 5s`.

### Erros comuns

- **Somar texto em vez de números:** `"2" + "3"` dá `"23"`, não `5`. Se você esqueceu o `int()` ou `float()` depois do `input()`, é isso.
- **`=` não é igualdade:** `x = 5` significa "guarde 5 em x". Comparar é `==`.
- **`/` sempre devolve decimal:** `7 / 2` dá `3.5`. Para a parte inteira use `//` (dá `3`), e para o resto use `%` (dá `1`).
- **Nomes de variáveis:** use nomes que expliquem (`media`, não `m`), sem espaços e sem começar com número.

### Para ir além

Textos do prof. Dalton Serey: [Números e variáveis](https://daltonserey.github.io/curso-p1/1.1-numeros-e-variaveis/), [Textos e Strings](https://daltonserey.github.io/curso-p1/1.3-textos-e-strings/), [Conversões de Tipos](https://daltonserey.github.io/curso-p1/1.4-conversoes-de-tipos/), [Saída de Dados](https://daltonserey.github.io/curso-p1/2.2-saida-de-dados/) e [Entrada de Dados](https://daltonserey.github.io/curso-p1/2.3-entrada-de-dados/).

## Unidade 02: decisões, strings,  e índices

**O que você vai aprender:** fazer o programa seguir caminhos diferentes conforme uma condição, e olhar **dentro** de um texto: descobrir seu tamanho com `len` e acessar cada letra por **índice**.

### Conceitos: decisões

- **Comparações** dão `True` ou `False`: `==`, `!=`, `<`, `<=`, `>`, `>=`.
- **Operadores lógicos** combinam condições: `and`, `or` e `not`.
- **`if`, `elif` e `else`** escolhem o que executar. Só **um** bloco roda: o primeiro cuja condição for verdadeira.
- A **indentação** (os espaços no começo da linha) faz parte da sintaxe: ela diz o que está dentro do `if`.

### Exemplo

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

### Exemplo: ano bissexto

```python
ano = int(input("Ano: "))

if (ano % 4 == 0 and ano % 100 != 0) or ano % 400 == 0:
    print("Bissexto")
else:
    print("Não é bissexto")
```

Os parênteses importam: `and` é avaliado antes de `or`, e eles deixam claro o que está agrupado.

### Conceitos: strings, `len` e índices

- **`len(texto)`** devolve quantos caracteres o texto tem: `len("banana")` dá `6`.
- **Índice** é a posição de um caractere, e **começa em 0**. Em `"banana"`, o `"b"` está no índice 0, o primeiro `"a"` no 1, e assim por diante.
- **`texto[i]`** devolve o caractere na posição `i`.
- **Índice negativo** conta de trás para frente: `texto[-1]` é o último caractere, `texto[-2]` o penúltimo.
- O último índice válido é sempre **`len(texto) - 1`**.
- **`in`** testa se um trecho aparece no texto: `"nan" in "banana"` é `True`(Normalmente o uso é restrito!).

Uma imagem mental que ajuda:

```text
texto:     b   a   n   a   n   a
índice:    0   1   2   3   4   5
negativo: -6  -5  -4  -3  -2  -1
```

### Exemplo: `len` e índices

```python
fruta = "banana"

print(len(fruta))              # 6
print(fruta[0])                # b
print(fruta[1])                # a
print(fruta[-1])               # a  (o último)
print(fruta[len(fruta) - 1])   # a  (o mesmo, do jeito longo)
print("nan" in fruta)          # True
```

### Exemplo: decidindo com o que está no texto

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

### Erros comuns

- **`=` no lugar de `==`:** `if x = 5` dá erro. A comparação é `if x == 5`.
- **Ordem errada dos `elif`:** como o primeiro verdadeiro ganha, teste do caso mais específico para o mais geral.
- **Esquecer os dois-pontos (`:`)** no fim do `if`, `elif` e `else`.
- **Comparar texto com número:** `input()` devolve `str`, então `"15" < 18` dá erro. Converta antes.
- **`IndexError`:** acessar um índice que não existe, como `fruta[6]` (o último é o 5) ou `""[0]` (texto vazio).
- **Esquecer que a contagem começa em 0.** O "primeiro" caractere é o índice 0.
- **Strings não mudam:** `fruta[0] = "B"` dá erro. Para "alterar", crie uma nova string.

### Para ir além

Textos do prof. Dalton Serey: [Expressões Condicionais](https://daltonserey.github.io/curso-p1/3.1-expressoes-condicionais/), [If..else](https://daltonserey.github.io/curso-p1/3.2-if-else/), [If..elif..else](https://daltonserey.github.io/curso-p1/3.3-if-elif-else/), [Tipo Boolean](https://daltonserey.github.io/curso-p1/3.4-tipo-boolean/) e [Textos e Strings](https://daltonserey.github.io/curso-p1/1.3-textos-e-strings/).

## Unidades 03 a 05: repetições e listas

**O que você vai aprender:** repetir ações com `while` e `for`, e guardar vários valores em **listas**. A ideia central é que **o computador é bom em repetir**: você descreve o passo uma vez e diz quantas vezes (ou até quando) repetir.

### Conceitos

- **`while`** repete **enquanto** a condição for verdadeira.
- **`for`** percorre os elementos de uma sequência (texto ou lista), um por vez.
- **`range(n)`** gera os números de `0` a `n - 1`.
- **Lista** guarda vários valores em ordem: `[10, 20, 30]`. `len` e índices funcionam como nas strings (Unidade 02): `lista[0]` é o primeiro e `lista[len(lista) - 1]` é o último.
- **Acumulador** é uma variável que vai guardando um resultado a cada volta (soma, contagem, maior valor até agora).
- **Contador** é um acumulador que sobe de um em um.

### Exemplo 1: `while` com contador

```python
contador = 1

while contador <= 5:
    print(contador)
    contador = contador + 1   # sem isso, o loop nunca termina

print("Fim")
```

Passo a passo: `contador` começa em 1, o teste `1 <= 5` é verdadeiro, imprime 1 e sobe para 2. Isso se repete até `contador` virar 6. Aí o teste `6 <= 5` é falso e o `while` termina.

### Exemplo 2: `for` com acumulador

```python
notas = [7.0, 8.5, 6.0, 9.5]

soma = 0
for nota in notas:
    soma = soma + nota

media = soma / len(notas)
print(f"Média: {media:.2f}")   # Média: 7.75
```

O `len` ajuda a dividir pela quantidade de notas sem precisar contar na mão.

### Exemplo 3: `for` com índice

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

### Exemplo 4: o mesmo percurso com `while`

```python
palavra = "python"

i = 0
while i < len(palavra):
    print(i, palavra[i])
    i = i + 1
```

`for` com `range` e `while` com contador fazem a mesma coisa aqui. Use `for` quando souber quantas voltas vai dar, e `while` quando a parada depender de uma condição.

### Exemplo 5: percorrer de trás para frente

```python
palavra = "python"

i = len(palavra) - 1
while i >= 0:
    print(palavra[i], end="")
    i = i - 1
print()   # nohtyp
```

### Exemplo 6: encontrar o maior valor

```python
numeros = [4, 17, 9, 25, 3]

maior = numeros[0]          # começa assumindo que o primeiro é o maior
for n in numeros:
    if n > maior:
        maior = n

print(maior)  # 25
```

### Exemplo 7: contar com condição

```python
texto = "Programação em Python"

vogais = 0
for letra in texto:
    if letra in "aeiouAEIOU":
        vogais = vogais + 1

print(vogais)
```

### Exemplo 8: `while` com `break`

```python
while True:
    senha = input("Senha: ")
    if senha == "python":
        print("Acesso liberado")
        break               # sai do loop
    print("Senha errada, tente de novo")
```

### Exemplo 9: ler até um valor de parada

```python
soma = 0
numero = int(input("Número (0 para parar): "))

while numero != 0:
    soma = soma + numero
    numero = int(input("Número (0 para parar): "))

print("Soma:", soma)
```

Repare que o `input` aparece **duas vezes**: uma antes do loop (para ter um valor para testar) e outra no fim de cada volta (para atualizar o valor).

### Erros comuns

- **Loop infinito:** esquecer de atualizar a variável que a condição testa. Se travar, aperte `Ctrl + C` no terminal.
- **Erro por um (*off-by-one*):** `range(5)` vai de 0 a **4**. O último índice de uma lista é `len(x) - 1`, não `len(x)`.
- **`IndexError` em listas:** acessar `lista[3]` numa lista de 3 elementos.
- **Esquecer de inicializar o acumulador** antes do `for` (`soma = 0`).
- **Inicializar o acumulador dentro do loop:** ele volta a zero a cada volta.
- **Usar `maior = 0` para achar o maior:** se todos os números forem negativos, o resultado fica errado. Comece com o primeiro elemento.

### Para ir além

Textos do prof. Dalton Serey: [Introdução a Repetições](https://daltonserey.github.io/curso-p1/4.0-introducao-a-repeticoes/), [Sequências](https://daltonserey.github.io/curso-p1/4.1-sequencias/), [Iterações e Iteradores](https://daltonserey.github.io/curso-p1/4.2-iteracoes-e-iteradores/), [Comandos de Repetição](https://daltonserey.github.io/curso-p1/4.3-comandos-de-repeticao/), [While](https://daltonserey.github.io/curso-p1/5.1-while/), [Grafos de Fluxo de Controle](https://daltonserey.github.io/curso-p1/5.2-grafos-de-fluxo/), [Do..while](https://daltonserey.github.io/curso-p1/5.3-do-while/) e [Loop..leave](https://daltonserey.github.io/curso-p1/5.4-loop-leave/).

## Unidade 06: funções

**O que você vai aprender:** dividir um programa em partes pequenas, com nome, que você pode reutilizar e testar separadamente. É a unidade mais difícil, então vá com calma.

### Por que é tão diferente

Até aqui, o programa era uma receita única, lida de cima para baixo. Com funções, você pensa **de fora para dentro**: "o que eu quero que esta parte faça?" vem antes de "como ela faz?". Isso exige abstração, e abstração leva tempo. Se bater confusão, é normal.

### Conceitos

- **Função** é um bloco de código com nome que recebe **parâmetros** (entradas) e pode **devolver** um resultado.
- `def` cria a função, e `return` devolve o valor para quem chamou.
- **Escopo:** variáveis criadas dentro da função **só existem dentro dela**.

### Exemplo

```python
def media(a, b):
    return (a + b) / 2

nota_final = media(7.5, 9)
print(nota_final)  # 8.25
```

Três momentos: `def` apenas **ensina** o Python a fazer `media` (nada roda ainda); `media(7.5, 9)` **chama** a função, com `a = 7.5` e `b = 9`; e o `return` **devolve** 8.25, que vai parar em `nota_final`.

### A analogia da pilha de pratos

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

### O escopo na prática

```python
def calcula():
    segredo = 42          # mora no prato de calcula()
    return segredo + 1

print(calcula())   # 43
print(segredo)     # NameError: o prato de calcula() já foi retirado
```

Quando `calcula()` termina, o prato some e `segredo` vai junto. Se você precisa do valor lá fora, **devolva** com `return`.

### A confusão mais comum: `print` não é `return`

```python
def dobro_errado(x):
    print(x * 2)    # mostra na tela, mas não devolve nada

def dobro(x):
    return x * 2    # devolve o valor para quem chamou

y = dobro_errado(4)  # imprime 8, mas y vale None
z = dobro(4)         # z vale 8
```

`print` serve para **mostrar** algo à pessoa. `return` serve para **entregar** um valor ao resto do programa. Na analogia: `print` é gritar o resultado da cozinha, e `return` é entregar o prato pronto a quem pediu. Se você quer usar o resultado depois, precisa de `return`.

### Exemplo: função com decisão

```python
def maior(a, b):
    if a > b:
        return a
    return b

print(maior(3, 9))   # 9
print(maior(10, 2))  # 10
```

Quando o `if` é verdadeiro, o `return a` encerra a função na hora, e o `return b` nem chega a rodar.

### Dica de ouro

Antes de escrever a função, escreva **a chamada que você gostaria de poder fazer** e o resultado esperado. Isso é a etapa de "Compreensão" do método de Pólya, aplicada às funções.

### Erros comuns

- **Usar `print` onde devia ser `return`** (veja acima).
- **Esquecer de chamar a função:** definir com `def` não executa nada. É preciso chamá-la.
- **Usar uma variável de dentro da função fora dela:** ela não existe lá. Passe valores por parâmetros e receba por `return`.
- **Passar argumentos na ordem errada.**
- **Código depois do `return`:** ele nunca roda, porque o `return` retira o prato na hora.

### Para ir além

Texto do prof. Dalton Serey: [Introdução a Funções](https://daltonserey.github.io/curso-p1/3.5-introducao-a-funcoes/).

## Unidade 07: funções na prática e testes com `assert`

**O que você vai aprender:** escrever funções mais úteis (com `if` e repetições dentro delas) e **testar** cada uma com `assert`, para ter certeza de que funcionam antes de seguir adiante.

### Conceitos

- **`assert condição`** afirma que a condição é verdadeira. Se for, nada acontece. Se for falsa, o programa para com `AssertionError`.
- **Caso de teste** é um exemplo com entrada e saída esperada: "se eu chamar `dobro(4)`, espero `8`".
- **Casos de borda** são os valores esquisitos: zero, negativo, lista vazia, texto vazio, um único elemento.
- Uma função pode **chamar outras funções**, e é assim que programas grandes são montados: peças pequenas e testadas, combinadas.

### Exemplo 1: o primeiro `assert`

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

### Exemplo 2: pensar nos testes antes do código

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

### Exemplo 3: função com decisão

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

### Exemplo 4: funções que chamam funções

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

### Exemplo 5: devolver mais de uma coisa

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

### Exemplo 6: a função que procura

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

### Erros comuns

- **`assert` com `=`:** `assert x = 5` dá erro de sintaxe. Use `==`.
- **Testar só o caso feliz.** Teste também zero, negativo, vazio e fronteiras.
- **Comparar decimais com `==`:** `0.1 + 0.2 == 0.3` é `False` por causa da imprecisão dos decimais. Em testes, prefira valores que o computador representa bem ou verifique se a diferença é muito pequena.
- **`return` dentro do `for` cedo demais:** `return` encerra a função inteira na primeira volta. Se queria devolver só no fim, tire-o do loop.
- **Testar a função com `print` em vez de `assert`:** `print` exige que você olhe e confira. `assert` confere por você.
- **Escrever os `assert` antes do `def`:** o Python executa de cima para baixo, então a função precisa estar definida antes de ser chamada (`NameError`).

## Unidade 08: listas e seus métodos

**O que você vai aprender:** modificar listas, adicionando e removendo elementos com `append`, `insert` e `pop`.

### Conceitos

- Uma **lista** guarda vários valores em ordem: `[10, 20, 30]`. Os índices e o `len` funcionam como nas strings.
- Diferente da string, a lista é **mutável**: dá para trocar um elemento (`lista[0] = 99`) e crescer ou encolher.
- **`lista.append(x)`** adiciona `x` **no final**.
- **`lista.insert(i, x)`** adiciona `x` **na posição `i`**, empurrando os outros para a direita.
- **`lista.pop()`** remove e **devolve** o último elemento.
- **`lista.pop(i)`** remove e devolve o elemento da posição `i`.
- **`x in lista`** diz se `x` está na lista.

Esses métodos **alteram a própria lista**, não criam outra.

### Exemplo 1: `append`

```python
frutas = []                # lista vazia
frutas.append("maçã")
frutas.append("banana")
frutas.append("uva")

print(frutas)       # ['maçã', 'banana', 'uva']
print(len(frutas))  # 3
```

### Exemplo 2: trocar um elemento pelo índice

```python
numeros = [10, 20, 30]
numeros[1] = 99
print(numeros)   # [10, 99, 30]
```

### Exemplo 3: `insert`

```python
frutas = ["maçã", "banana", "uva"]

frutas.insert(1, "manga")   # na posição 1
print(frutas)   # ['maçã', 'manga', 'banana', 'uva']

frutas.insert(0, "pera")    # no começo
print(frutas)   # ['pera', 'maçã', 'manga', 'banana', 'uva']
```

Primeiro vem **a posição**, depois **o valor**. É fácil inverter.

### Exemplo 4: `pop`

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

### Exemplo 5: construir uma lista dentro de uma função

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

### Exemplo 6: usar a lista como uma pilha de tarefas

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

### Exemplo 7: a lista é alterada "por dentro"

```python
def adiciona_zero(lista):
    lista.append(0)       # altera a lista que veio de fora

numeros = [1, 2]
adiciona_zero(numeros)
print(numeros)   # [1, 2, 0]
```

Aqui não há `return`, e mesmo assim `numeros` mudou. Funções que recebem uma lista **podem modificá-la**. Isso é poderoso e perigoso: se não quiser mexer na original, construa uma lista nova, como no Exemplo 5.

### Exemplo 8: duas variáveis, a mesma lista

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

### Exemplo 9: inverter uma lista com `pop`

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

### Erros comuns

- **`lista = lista.append(x)`:** `append` devolve `None`, então a lista vira `None`. Escreva apenas `lista.append(x)`.
- **`pop` em lista vazia:** dá `IndexError`. Teste `len(lista) > 0` antes.
- **Inverter os argumentos do `insert`:** é `insert(posição, valor)`.
- **Remover elementos enquanto percorre com `for`:** a lista muda no meio do caminho e o `for` pula elementos. Construa uma lista nova ou percorra de trás para frente.
- **Achar que `b = a` faz uma cópia** (Exemplo 8).

## Unidade 09: dicionários e matrizes

**O que você vai aprender:** guardar dados por **nome** (dicionários) e por **linha e coluna** (matrizes).

### Conceitos: dicionários

- **Dicionário** associa **chaves** a **valores**: `{"ana": 8.5, "bia": 7.0}`.
- Em vez de índice numérico, você acessa pela chave: `notas["ana"]`.
- **`d[chave] = valor`** cria ou altera uma entrada.
- **`chave in d`** testa se a chave existe.
- **`for chave in d`** percorre as chaves.
- **`len(d)`** é o número de entradas.

### Exemplo 1: o básico

```python
notas = {"ana": 8.5, "bia": 7.0}

print(notas["ana"])      # 8.5

notas["caio"] = 6.0      # cria uma entrada nova
notas["bia"] = 9.0       # altera uma existente

print(len(notas))        # 3
print("ana" in notas)    # True
print("davi" in notas)   # False
```

### Exemplo 2: percorrendo

```python
notas = {"ana": 8.5, "bia": 9.0, "caio": 6.0}

for nome in notas:
    print(nome, notas[nome])
```

### Exemplo 3: contar ocorrências (o uso mais clássico)

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

### Exemplo 4: dicionário com listas

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

### Conceitos: matrizes

- **Matriz** é uma **lista de listas**. Cada lista interna é uma **linha**.
- `m[i][j]` é o elemento na linha `i` e coluna `j` (também a partir do 0).
- `len(m)` é o número de **linhas**. `len(m[0])` é o número de **colunas**.
- Para percorrer tudo, use **dois `for` aninhados**: um para as linhas, outro para as colunas.

### Exemplo 5: acessar e percorrer

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

### Exemplo 6: somar a diagonal

```python
def soma_diagonal(m):
    total = 0
    for i in range(len(m)):
        total += m[i][i]      # linha e coluna iguais
    return total

assert soma_diagonal([[1, 2], [3, 4]]) == 5     # 1 + 4
assert soma_diagonal([[5]]) == 5
```

### Exemplo 7: somar cada linha

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

### Exemplo 8: criar uma matriz de zeros (com cuidado!)

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

### Exemplo 9: matriz transposta

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

### Erros comuns

- **`KeyError`:** acessar uma chave que não existe (`notas["zeca"]`). Teste com `in` antes.
- **Confundir chave com valor.** O dicionário busca pela **chave**.
- **Trocar linha e coluna:** `m[i][j]` é linha `i`, coluna `j`. Se a matriz não for quadrada, o erro vira `IndexError`.
- **Usar `len(m)` para as colunas.** `len(m)` conta as linhas.
- **Criar matriz com `[[0] * c] * l`** (aliasing, descrito no Exemplo 8).
- **Esquecer o `print()` vazio** para quebrar a linha ao imprimir uma matriz.

## Unidade 10: algoritmos de ordenação

**O que você vai aprender:** como ordenar uma lista passo a passo. O Python já tem formas prontas de ordenar, mas entender **como** ordenar treina o raciocínio, junta tudo que você aprendeu (loops, índices, listas, funções) e é cobrado em prova. Nas atividades, implemente você mesmo, sem usar as ordenações prontas.

### Conceitos

- **Ordenar** é rearrumar os elementos do menor para o maior.
- **Troca** em Python: `a[i], a[j] = a[j], a[i]` (sem variável auxiliar).
- Algoritmos diferentes chegam ao mesmo resultado com **custos** diferentes. Uma medida simples é quantas comparações são feitas quando a lista cresce.
  - **Insertion sort e bubble sort** fazem muito trabalho em listas grandes (cresce com o **quadrado** do tamanho, escrito `O(n²)`). São simples de entender.
  - **Merge sort** é bem mais rápido em listas grandes (`O(n log n)`), mas é um pouco mais difícil, porque usa **recursão**.

Para todos os exemplos, vamos usar a lista `[5, 3, 1, 4]`.

### Bubble sort: "a bolha sobe"

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

### Insertion sort: "ordenar cartas na mão"

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

### Merge sort: "dividir e conquistar"

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

### Erros comuns

- **Limite do loop errado:** em `bubble_sort`, usar `range(n)` na volta interna faz `lista[j + 1]` estourar o índice (`IndexError`).
- **Esquecer a ordem das condições no `while` do insertion sort:** `j >= 0` precisa vir **antes** de `lista[j] > atual`, senão você acessa `lista[-1]` sem querer.
- **Esquecer o `lista[j + 1] = atual`** no fim do insertion sort. O elemento se perde.
- **Esquecer o caso base** do `merge_sort`: a recursão nunca para (`RecursionError`).
- **Esquecer de copiar o que sobrou** no `merge`: elementos ficam de fora.
- **Testar só uma lista.** Teste lista vazia, com um elemento, já ordenada, em ordem inversa e com repetidos (`[2, 1, 2, 1]`).

## Material de referência

Boa parte dos exemplos e da ordem dos temas segue o curso de Programação I do prof. [Dalton Serey](https://daltonserey.github.io/curso-p1/) (UFCG), que tem textos e slides para cada unidade, incluindo uma unidade 0 sobre terminal e Bash. O crédito é dele, e todo o material de terceiros mantém sua licença e seus direitos autorais.