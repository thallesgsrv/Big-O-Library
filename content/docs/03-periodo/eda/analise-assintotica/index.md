---
title: Análise assintótica
weight: 2
description: As notações O, Ω e Θ e as principais classes de crescimento.
autores:
  - thallesgsrv
date: 2026-10-09
---

## Sobre

Na página anterior contamos operações e chegamos a coisas como \(3n^2 + 10n + 5\). Dá para trabalhar com isso, mas é muita informação. Quando \(n\) é grande, quase tudo nessa expressão é ruído.

## Só o que domina importa

Compare o tamanho de cada termo de \(3n^2 + 10n + 5\) para \(n = 1.000\):

| Termo | Valor |
|---|---|
| \(3n^2\) | 3.000.000 |
| \(10n\) | 10.000 |
| \(5\) | 5 |

O primeiro termo é praticamente o total. E quanto maior o \(n\), mais ele domina. Por isso a análise assintótica faz duas simplificações:

1. **Descarta os termos de menor crescimento.** Sobra só \(3n^2\).
2. **Descarta a constante que multiplica.** Sobra \(n^2\).

Descartar a constante parece estranho, mas lembre que cada operação básica tem um custo que muda de máquina para máquina. Esse \(3\) não é uma verdade sobre o algoritmo, é uma verdade sobre o computador. O que é verdade sobre o algoritmo é que ele cresce como \(n^2\).

## Notação O

Dizemos que \(f(n) = O(g(n))\) quando, a partir de algum ponto, \(f\) nunca ultrapassa \(g\) multiplicada por uma constante. Formalmente: existem constantes \(c > 0\) e \(n_0\) tais que

$$
f(n) \le c \cdot g(n) \quad \text{para todo } n \ge n_0
$$

Vamos provar que \(3n^2 + 10n + 5 = O(n^2)\). Escolhemos \(c = 4\). Precisamos que

$$
3n^2 + 10n + 5 \le 4n^2 \iff n^2 - 10n - 5 \ge 0
$$

Para \(n = 11\), temos \(121 - 110 - 5 = 6 \ge 0\), e daí em diante só melhora. Então \(c = 4\) e \(n_0 = 11\) servem.

O \(O\) é um **limite superior**: "cresce no máximo assim".

## Notações Ω e Θ

- \(f(n) = \Omega(g(n))\): \(f\) cresce **pelo menos** como \(g\). É o limite inferior: \(f(n) \ge c \cdot g(n)\) a partir de \(n_0\).
- \(f(n) = \Theta(g(n))\): \(f\) cresce **exatamente** como \(g\). Vale quando \(f\) é \(O(g)\) e \(\Omega(g)\) ao mesmo tempo.

Nosso exemplo: \(3n^2 + 10n + 5 \ge 3n^2\) para todo \(n \ge 1\), então é \(\Omega(n^2)\). Como também é \(O(n^2)\), concluímos que é \(\Theta(n^2)\).

> [!WARNING]
> **\(O\) não significa pior caso.** São coisas independentes. "Pior caso" diz *qual entrada* estamos analisando. \(O\), \(\Omega\) e \(\Theta\) dizem *que tipo de limite* estamos dando para o custo dessa entrada. Dá para falar de "\(\Omega\) do pior caso" ou de "\(O\) do melhor caso". Na prática, quando alguém diz só "esse algoritmo é \(O(n^2)\)", quase sempre quer dizer que o pior caso é quadrático.

Outra pegadinha: tecnicamente, um algoritmo linear também é \(O(n^2)\), porque \(n\) nunca passa de \(n^2\). Não está errado, só não ajuda. Sempre que der, dê o limite mais justo.

## As classes mais comuns

Em ordem crescente de custo:

| Classe | Nome | Exemplo típico |
|---|---|---|
| \(O(1)\) | constante | acessar `v[i]` |
| \(O(\log n)\) | logarítmica | busca binária |
| \(O(n)\) | linear | achar o máximo |
| \(O(n \log n)\) | linearítmica | merge sort |
| \(O(n^2)\) | quadrática | selection e insertion sort |
| \(O(2^n)\) | exponencial | testar todos os subconjuntos |
| \(O(n!)\) | fatorial | testar todas as permutações |

Para sentir a diferença, veja quantas operações cada classe faz:

| n | \(\log_2 n\) | \(n \log_2 n\) | \(n^2\) | \(2^n\) |
|---|---|---|---|---|
| 10 | 3 | 33 | 100 | 1.024 |
| 100 | 7 | 664 | 10.000 | ≈ \(1{,}3 \times 10^{30}\) |
| 1.000 | 10 | 9.966 | 1.000.000 | astronômico |

Com \(n = 100\), um algoritmo exponencial já está fora de questão, mesmo no melhor computador do mundo.

## Regras práticas

- **Soma:** o maior termo vence. \(O(n^2 + n) = O(n^2)\).
- **Constantes somem:** \(O(5n) = O(n)\).
- **Sequência:** dois trechos um depois do outro custam o maior dos dois. Um laço \(O(n)\) seguido de outro \(O(n^2)\) dá \(O(n^2)\).
- **Aninhamento:** multiplica. Um laço \(O(n)\) dentro de outro \(O(n)\) dá \(O(n^2)\).
- **Base do log não importa:** \(\log_2 n\) e \(\log_{10} n\) diferem por uma constante, então ambos são só \(O(\log n)\).

## Exercícios

Dê a classe \(\Theta\) de cada função.

1. \(5n + 100\)
2. \(n^2 + n \log n\)
3. \(2^n + n^5\)
4. \(\log n + 1000\)

{{< details title="Gabarito" >}}
1. \(\Theta(n)\)
2. \(\Theta(n^2)\), porque \(n^2\) cresce mais rápido que \(n \log n\).
3. \(\Theta(2^n)\), porque qualquer exponencial ganha de qualquer polinômio.
4. \(\Theta(\log n)\), a constante 1000 some.
{{< /details >}}

## Resumo

- A análise assintótica olha só para o termo que domina e ignora constantes.
- \(O\) é limite superior, \(\Omega\) é limite inferior e \(\Theta\) é o crescimento exato.
- \(O\) e "pior caso" são conceitos diferentes, embora apareçam juntos o tempo todo.
- Ordem das classes: \(1 < \log n < n < n \log n < n^2 < 2^n < n!\).

## Para estudar mais

- [Análise assintótica](https://joaoarthurbm.github.io/eda/posts/analise-assintotica/) — João Arthur Brunet (2019)
