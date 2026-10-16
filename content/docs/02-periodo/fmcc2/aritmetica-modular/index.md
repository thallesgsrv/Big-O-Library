---
title: Divisibilidade e aritmética modular
weight: 3
description: Divisão, MDC, números primos e congruências, com usos em computação.
autores:
  - thallesgsrv
date: 2026-10-16
---

## Sobre

A aritmética dos inteiros guarda ideias que sustentam **hash, criptografia e verificação de erros**. Esta página cobre divisibilidade, números primos e o relógio da aritmética modular.

## Divisibilidade

$a\mid b$ ("$a$ divide $b$") quando $b=a\cdot k$ para algum inteiro $k$. Exemplo: $3\mid12$, porque $12=3\cdot4$.

**Algoritmo da divisão:** para inteiros $a$ e $d>0$ existem únicos $q$ (quociente) e $r$ (resto) com

$$
a=d\,q+r,\qquad 0\le r<d
$$

Em Python, $q$ é `a // d` e $r$ é `a % d`.

## MDC e algoritmo de Euclides

O **mdc** de $a$ e $b$ é o maior inteiro que divide os dois. Como $\text{mdc}(a,b)=\text{mdc}(b,\ a \bmod b)$, dá para calcular sem fatorar:

```python
def mdc(a, b):
    while b != 0:
        a, b = b, a % b
    return a
```

Exemplo: $\text{mdc}(48,18)\to\text{mdc}(18,12)\to\text{mdc}(12,6)\to\text{mdc}(6,0)=6$.

## Números primos

Um **primo** tem exatamente dois divisores positivos: 1 e ele mesmo. Todo inteiro maior que 1 é produto de primos de **um único jeito** (teorema fundamental da aritmética): $60=2^2\cdot3\cdot5$. E há infinitos primos.

## Congruência

$a\equiv b\pmod m$ significa que $a$ e $b$ deixam o **mesmo resto** na divisão por $m$ (ou, equivalentemente, $m\mid(a-b)$). Pense no relógio: $15\equiv3\pmod{12}$.

Dá para somar e multiplicar **antes** de tirar o resto:

$$
(a+b)\bmod m=\big((a\bmod m)+(b\bmod m)\big)\bmod m
$$

Exemplo: o último dígito de $7^{100}$ é $7^{100}\bmod10$. Como $7^2=49\equiv9\equiv-1$, temos $7^{4}\equiv1$, e $7^{100}=(7^4)^{25}\equiv1\pmod{10}$.

## Onde aparece

- **Hash:** `chave % tamanho_da_tabela` escolhe a posição.
- **Dígitos verificadores** de CPF e ISBN usam congruências para detectar erros de digitação.
- **Criptografia RSA** depende de potências módulo o produto de dois primos grandes.

## Exercícios

1. Calcule $\text{mdc}(84,36)$ pelo algoritmo de Euclides.
2. Qual o resto de $2^{10}$ na divisão por 7?
3. Que horas serão, em um relógio de 12 horas, 100 horas depois das 5h?

{{< details title="Gabarito" >}}
1. $(84,36)\to(36,12)\to(12,0)$: o mdc é $12$.
2. $2^3=8\equiv1\pmod7$, então $2^{10}=2^9\cdot2\equiv2$. Resto $2$.
3. $100\bmod12=4$, então $5+4=9$h.
{{< /details >}}
