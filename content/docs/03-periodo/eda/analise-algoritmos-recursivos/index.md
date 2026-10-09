---
title: Análise de algoritmos recursivos
weight: 3
description: Relações de recorrência, árvore de recursão e o custo de busca binária, merge sort e outros.
autores:
  - thallesgsrv
date: 2026-10-09
---

## Sobre

Contar laços é fácil. Mas e quando o algoritmo chama a si mesmo? Não há laço para contar, o custo está escondido nas chamadas. A saída é escrever esse custo como uma equação que fala dela mesma.

## Relação de recorrência

Veja o fatorial:

```java
static long fatorial(int n) {
    if (n <= 1) return 1;
    return n * fatorial(n - 1);
}
```

Chamar `fatorial(n)` custa uma multiplicação mais o custo de chamar `fatorial(n - 1)`. Escrevendo \(T(n)\) para o custo com entrada de tamanho \(n\):

$$
T(n) = T(n-1) + c
$$

onde \(c\) é uma constante (a comparação e a multiplicação). Essa é a **relação de recorrência**. Ela só diz como \(T(n)\) se relaciona com \(T\) de algo menor. Falta resolvê-la.

## Primeira técnica: expandir

Substitua \(T(n-1)\) pela própria fórmula, várias vezes:

$$
\begin{aligned}
T(n) &= T(n-1) + c \\
     &= T(n-2) + c + c \\
     &= T(n-3) + 3c \\
     &\;\;\vdots \\
     &= T(1) + (n-1)\,c
\end{aligned}
$$

Resultado: \(T(n) = \Theta(n)\). Faz sentido, são \(n\) chamadas com custo constante cada.

## Segunda técnica: árvore de recursão

Para recorrências mais complicadas, o melhor é desenhar a árvore de chamadas, anotar quanto cada nível custa e somar os níveis.

### Exemplo: busca binária

A busca binária compara com o elemento do meio e continua só em uma das metades:

$$
T(n) = T(n/2) + c
$$

Cada nível da árvore tem uma única chamada, custando \(c\). Quantos níveis? O tamanho vai caindo \(n, n/2, n/4, \dots, 1\), o que dá \(\log_2 n\) níveis (lembra do exercício do laço que dobra `i`? É a mesma conta ao contrário). Custo total: \(c \cdot \log_2 n\), ou seja, \(\Theta(\log n)\).

### Exemplo: merge sort

O merge sort divide o array ao meio, ordena cada metade e junta as duas:

$$
T(n) = 2\,T(n/2) + n
$$

Montando a árvore, nível por nível:

| Nível | Chamadas | Tamanho de cada uma | Custo do nível |
|---|---|---|---|
| 0 | 1 | \(n\) | \(n\) |
| 1 | 2 | \(n/2\) | \(n\) |
| 2 | 4 | \(n/4\) | \(n\) |
| ... | ... | ... | \(n\) |
| \(\log_2 n\) | \(n\) | 1 | \(n\) |

Todo nível custa \(n\): quando o número de chamadas dobra, o tamanho de cada uma cai pela metade e os dois efeitos se cancelam. São \(\log_2 n\) níveis, então

$$
T(n) = n \cdot \log_2 n = \Theta(n \log n)
$$

### Exemplo: um caso ruim

Se uma divisão joga tudo para um lado só, como acontece no pior caso do quick sort:

$$
T(n) = T(n-1) + n
$$

Expandindo, \(T(n) = n + (n-1) + (n-2) + \dots + 1 = \frac{n(n+1)}{2}\), que é \(\Theta(n^2)\). A árvore aqui é uma "escada" com \(n\) níveis, cada um custando um pouco menos que o anterior.

### Exemplo: Fibonacci ingênuo

```java
static int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
```

\(T(n) = T(n-1) + T(n-2) + c\). Cada chamada gera duas, e a árvore tem altura próxima de \(n\). Isso dá algo na casa de \(2^n\) chamadas, ou seja, exponencial. Por isso `fib(50)` demora minutos e `fib(100)` nunca termina.

## Um atalho: Teorema Mestre

Muitos algoritmos de divisão e conquista têm a forma

$$
T(n) = a\,T(n/b) + \Theta(n^d)
$$

(\(a\) chamadas, cada uma com um pedaço \(1/b\) do problema, mais um trabalho \(n^d\) para dividir e combinar). Compare \(a\) com \(b^d\):

| Se... | Então \(T(n)\) é... | Intuição |
|---|---|---|
| \(a < b^d\) | \(\Theta(n^d)\) | o trabalho de cima, na raiz, domina |
| \(a = b^d\) | \(\Theta(n^d \log n)\) | todos os níveis custam igual |
| \(a > b^d\) | \(\Theta(n^{\log_b a})\) | o trabalho das folhas domina |

Merge sort: \(a = 2\), \(b = 2\), \(d = 1\). Como \(2 = 2^1\), cai no caso do meio: \(\Theta(n \log n)\). Busca binária: \(a = 1\), \(b = 2\), \(d = 0\). Como \(1 = 2^0\), também é o caso do meio: \(\Theta(\log n)\). Bate com o que fizemos na mão.

## Exercícios

Resolva as recorrências.

1. \(T(n) = T(n-1) + 1\)
2. \(T(n) = T(n/2) + n\)
3. \(T(n) = 4\,T(n/2) + n\)

{{< details title="Gabarito" >}}
1. \(\Theta(n)\), igual ao fatorial.
2. Pelo Teorema Mestre, \(a = 1\), \(b = 2\), \(d = 1\), e \(1 < 2^1\), então \(\Theta(n)\). Na árvore: \(n + n/2 + n/4 + \dots \approx 2n\).
3. \(a = 4\), \(b = 2\), \(d = 1\), e \(4 > 2^1\), então \(\Theta(n^{\log_2 4}) = \Theta(n^2)\).
{{< /details >}}

## Resumo

- Um algoritmo recursivo é descrito por uma relação de recorrência que expressa \(T(n)\) em função de \(T\) de entradas menores.
- Para resolver: expandir a fórmula ou desenhar a árvore de recursão e somar o custo de cada nível.
- Busca binária é \(\Theta(\log n)\), merge sort é \(\Theta(n \log n)\), e a recorrência \(T(n) = T(n-1) + n\) é \(\Theta(n^2)\).
- O Teorema Mestre resolve de uma vez as recorrências de divisão e conquista da forma \(aT(n/b) + n^d\).

## Para estudar mais

- [Análise de algoritmos recursivos](https://joaoarthurbm.github.io/eda/posts/analise-algoritmos-recursivos) — João Arthur Brunet (2019)
