---
title: Counting sort
weight: 10
description: Ordenação linear sem comparações, contando quantas vezes cada valor aparece.
autores:
  - thallesgsrv
date: 2026-10-09
---

## Sobre

Existe um limite teórico: qualquer algoritmo que ordena **comparando** elementos precisa de \(\Omega(n \log n)\) comparações no pior caso. Merge sort e quick sort estão perto desse piso. Para furar o piso, só parando de comparar. O counting sort faz isso.

## A ideia

Suponha que os valores são inteiros pequenos, de \(0\) a \(k\). Em vez de comparar um elemento com outro, a gente simplesmente **conta quantas vezes cada valor aparece**. Se o 3 aparece duas vezes e o 5 aparece uma, a saída só pode ter dois 3 e depois um 5.

Para \([4, 1, 3, 4, 3, 0, 1, 4]\), com \(k = 4\):

| Valor | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Vezes que aparece | 1 | 2 | 0 | 2 | 3 |

Dá para já escrever a resposta: um 0, dois 1, nenhum 2, dois 3 e três 4, ou seja, \([0, 1, 1, 3, 3, 4, 4, 4]\).

Para números soltos, isso basta. Mas e se cada elemento for um registro, por exemplo um aluno com nota e nome, e a gente ordenar pela nota? Aí não dá para "reescrever o valor": precisamos mover os registros de verdade, e manter a ordem original entre notas iguais. Para isso existe a versão estável.

## Versão estável

O truque é transformar as contagens em **somas acumuladas**. Cada posição passa a guardar quantos elementos são menores ou iguais àquele valor:

| Valor | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Contagem | 1 | 2 | 0 | 2 | 3 |
| Acumulada | 1 | 3 | 3 | 5 | 8 |

Ler isso: existem 3 elementos \(\le 1\), então o último "1" deve ficar no índice 2 (a terceira posição). Existem 8 elementos \(\le 4\), então o último "4" vai para o índice 7.

Agora percorremos a entrada **do fim para o começo**. Para cada elemento, decrementamos a acumulada do seu valor e usamos o resultado como posição de destino:

| Elemento lido | Acumulada vira | Vai para o índice |
|---|---|---|
| 4 (último) | 7 | 7 |
| 1 | 2 | 2 |
| 0 | 0 | 0 |
| 3 | 4 | 4 |
| 4 | 6 | 6 |
| 3 | 3 | 3 |
| 1 | 1 | 1 |
| 4 (primeiro) | 5 | 5 |

Saída: \([0, 1, 1, 3, 3, 4, 4, 4]\).

Percorrer de trás para frente é o que garante a estabilidade: de dois elementos iguais, o que vem **depois** na entrada ocupa a posição mais **alta** na saída.

## Veja funcionando

Use ▶ para executar sozinho ou ▶| para avançar um passo por vez (◀ volta). A linha do pseudocódigo que está sendo executada fica acesa. Nas barras, **laranja** é o que está sendo comparado ou trocado, **azul** é o elemento em foco (o elemento lido) e **verde** é o que já está no lugar certo.

{{< viz algoritmo="counting" >}}

Repare que em nenhum momento dois elementos do vetor são comparados. As linhas **cont** e **saída** fazem todo o trabalho.

## Implementação

Primeiro criamos uma posição de contagem para cada valor possível. Como os valores vão de `0` até `k`, o array tem `k + 1` posições. Cada número lido aumenta a contagem da sua posição.

```java
int[] contagem = new int[k + 1];

for (int numero : v) {
    contagem[numero]++;
}
```

Depois transformamos as contagens em **somas acumuladas**. Agora `contagem[x]` diz quantos elementos são menores ou iguais a `x`.

```java
for (int i = 1; i <= k; i++) {
    contagem[i] += contagem[i - 1];
}
```

Por exemplo, se `contagem[3]` vale `5`, existem cinco elementos menores ou iguais a 3. Então o último 3 deve ficar no índice `4` da saída. Percorremos a entrada de trás para frente e diminuímos a contagem de cada valor depois de colocá-lo; assim elementos iguais mantêm a ordem original.

```java
int[] saida = new int[v.length];

for (int i = v.length - 1; i >= 0; i--) {
    int numero = v[i];
    int posicao = contagem[numero] - 1;

    saida[posicao] = numero;
    contagem[numero]--;
}
```

O método devolve o array novo já ordenado:

```java
return saida;
```

Essas três etapas formam o `countingSort`: contar, acumular e distribuir. Ele recebe o maior valor possível (`k`) junto com o array.

## Análise

- Contar: \(\Theta(n)\)
- Acumular: \(\Theta(k)\)
- Distribuir: \(\Theta(n)\)

Total: \(\Theta(n + k)\), em **todos os casos**. Se \(k\) é da ordem de \(n\) (ou menor), o counting sort é \(\Theta(n)\), bem melhor que \(n \log n\).

Mas o termo \(k\) é a armadilha. Ordenar 10 números entre 0 e um bilhão com counting sort exige um array de contagem de um bilhão de posições. Nesse cenário um quick sort ganha de lavada.

## Estabilidade e memória

É **estável** (graças ao laço de trás para frente) e **não é in-place**: usa um array de saída de tamanho \(n\) e um de contagem de tamanho \(k + 1\), ou seja, \(O(n + k)\) de memória extra.

## Limitações

- Só funciona com chaves **inteiras** (ou que possam ser mapeadas para inteiros) em um intervalo pequeno.
- Para valores negativos, deslocamos tudo: se o menor valor é `min`, usamos `x - min` como índice.
- Quando \(k\) é muito maior que \(n\), não compensa.

## Exercício

Faça a contagem e a acumulada de \([2, 5, 3, 0, 2, 3, 0, 3]\) com \(k = 5\).

{{< details title="Gabarito" >}}
Contagem (valores 0 a 5): \([2, 0, 2, 3, 0, 1]\).

Acumulada: \([2, 2, 4, 7, 7, 8]\).

Isso diz, por exemplo, que o último 3 vai para o índice 6 (a acumulada do 3 é 7, menos 1).
{{< /details >}}

## Resumo

- Não compara elementos: conta ocorrências de cada valor.
- \(\Theta(n + k)\) em todos os casos, onde \(k\) é o maior valor possível.
- A versão com somas acumuladas e laço de trás para frente é estável.
- Usa \(O(n + k)\) de memória extra e só serve para inteiros em intervalo pequeno.

## Para estudar mais

- [Ordenação Linear (Counting Sort)](https://joaoarthurbm.github.io/eda/posts/ordenacao-linear) — João Arthur Brunet (2019)
