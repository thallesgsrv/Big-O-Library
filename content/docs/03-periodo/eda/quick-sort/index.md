---
title: Quick sort
weight: 7
description: Particionamento, escolha de pivô e por que o pior caso quadrático é raro.
autores:
  - thallesgsrv
date: 2026-10-09
---
## Sobre

O quick sort também é divisão e conquista, mas com uma inversão em relação ao merge sort. No merge sort, a divisão é boba (corta ao meio) e o trabalho está em juntar. No quick sort, o trabalho está em dividir, e juntar não custa nada.

## A ideia: particionar

Escolha um elemento qualquer do array, o **pivô**. **Particionar** é reorganizar o array de modo que:

- tudo que é menor ou igual ao pivô fique à esquerda dele;
- tudo que é maior fique à direita;
- o pivô fique na posição em que ficaria se o array estivesse ordenado.

As duas metades não ficam ordenadas, só separadas. Mas o pivô já está no lugar definitivo, e o problema virou ordenar a parte da esquerda e a da direita, que são independentes. É só repetir a ideia nelas. Quando as duas voltarem, não há nada a combinar, o array já está ordenado.

## Particionamento de Lomuto

Usaremos o **último** elemento como pivô. A estratégia é manter dois ponteiros:

- `j` percorre o array procurando elementos menores ou iguais ao pivô;
- `i` marca o fim da região "menores ou iguais" que já montamos.

Quando `j` encontra um elemento pequeno, a região cresce em um (`i++`) e o elemento é trocado para dentro dela. No fim, o pivô é trocado para a posição logo depois da região.

Veja com \([8, 3, 6, 2, 9, 1, 5]\), pivô \(= 5\):

| `j` | `v[j]` | Ação | Array |
|---|---|---|---|
| 0 | 8 | maior que 5, ignora | `8 3 6 2 9 1 5` |
| 1 | 3 | `i=0`, troca `v[0]` e `v[1]` | `3 8 6 2 9 1 5` |
| 2 | 6 | maior, ignora | `3 8 6 2 9 1 5` |
| 3 | 2 | `i=1`, troca `v[1]` e `v[3]` | `3 2 6 8 9 1 5` |
| 4 | 9 | maior, ignora | `3 2 6 8 9 1 5` |
| 5 | 1 | `i=2`, troca `v[2]` e `v[5]` | `3 2 1 8 9 6 5` |
| fim | | troca o pivô com `v[i+1]` | `3 2 1 5 9 6 8` |

O 5 está na posição 3, com \([3, 2, 1]\) à esquerda e \([9, 6, 8]\) à direita. A partir daí, ninguém mais precisa mexer no 5.

```java
static int particiona(int[] v, int left, int right) {
    int range = right - left + 1;
    int rand = (int)(Math.random() * range) + left;	
    swap(v,left,rand);
    int pivot = v[left];
    int i = left;
    
    for(int j = left + 1; j <= right; j++) {
        if(v[j] <= pivot) {
            i++;
            swap(v,i,j);
        }
    }
    swap(v, left, i);
    return i;
}
```

## Veja funcionando

Use ▶ para executar sozinho ou ▶| para avançar um passo por vez (◀ volta). A linha do pseudocódigo que está sendo executada fica acesa. Nas barras, **laranja** é o que está sendo comparado ou trocado, **azul** é o elemento em foco (o pivô) e **verde** é o que já está no lugar certo.

{{< viz algoritmo="quick" >}}

O **i** marca o fim da região dos menores ou iguais ao pivô e o **j** varre o trecho. Quando o laço termina, o pivô é trocado para logo depois dessa região, e ali ele fica para sempre.

## O quick sort

```java
static void quick(int[] v, int left, int right) {
    if (left < right) {
        int ipivot = particiona(v, left, right);
        quick(v, left, ipivot-1);
        quick(v, ipivot+1, right);
    }
}

static void swap(int[] v, int i, int j) {
    int aux = v[i];
    v[i] = v[j];
    v[j] = aux;
}
```

Chamada inicial: `quickSort(v, 0, v.length - 1)`. Note que o pivô fica de fora das duas chamadas (`p - 1` e `p + 1`), porque já está no lugar.

## Análise

O custo de `particiona` é \(\Theta(n)\), porque percorre o trecho uma vez. A recorrência depende de **onde o pivô cai**: se o pivô fica numa posição \(p\), as chamadas recursivas têm tamanho \(p\) e \(n - p - 1\).

### Melhor caso

O pivô sempre cai no meio. Então

$$
T(n) = 2\,T(n/2) + \Theta(n) = \Theta(n \log n)
$$

igual ao merge sort.

### Pior caso

O pivô sempre cai numa ponta, deixando um lado vazio e o outro com \(n - 1\) elementos:

$$
T(n) = T(n-1) + \Theta(n) = \Theta(n^2)
$$

Com o último elemento como pivô, isso acontece quando o array **já está ordenado** (ou em ordem inversa): o último é sempre o maior, e a partição fica \([n-1,\ 0]\). Irônico, não? Dar um array ordenado para um algoritmo de ordenação é o pior que dá.

> [!WARNING]
> Com a versão de Lomuto que usa `<=`, um array com **todos os elementos iguais** também cai no pior caso: todo mundo é "menor ou igual", então o pivô sempre vai parar na ponta.

### Caso médio

Aqui está a boa notícia. Não precisa dividir sempre ao meio para ser rápido. Mesmo que a partição seja bem desbalanceada, como 10% de um lado e 90% do outro, a árvore de recursão continua tendo altura proporcional a \(\log n\) e cada nível custa no máximo \(n\). O resultado ainda é \(O(n \log n)\). Para o quick sort ficar quadrático é preciso que as partições ruins aconteçam **quase sempre**, o que é raro se o pivô não for escolhido de forma ingênua.

## Escolhendo bons pivôs

O pior caso nasceu de um hábito: sempre pegar o último elemento. Duas correções simples:

**Pivô aleatório.** Sorteia uma posição, troca com a última e segue o algoritmo normal.

```java
static int particionaAleatorio(int[] v, int esq, int dir) {
    int r = esq + (int) (Math.random() * (dir - esq + 1));
    troca(v, r, dir);
    return particiona(v, esq, dir);
}
```

Agora nenhuma entrada específica é "a entrada ruim". Para dar quadrático, o sorteio teria que cair repetidamente nos piores lugares.

**Mediana de três.** Pega o primeiro, o do meio e o último, e usa o valor que está no meio dos três como pivô. Em um array ordenado, isso escolhe exatamente o elemento central, o melhor pivô possível.

## Estabilidade e memória

**Não é estável.** As trocas a longas distâncias podem passar um elemento por cima de outro igual a ele.

É considerado **in-place**, porque não copia o array. Tecnicamente usa a pilha de recursão, que tem altura \(O(\log n)\) em média (e \(O(n)\) no pior caso).

## Por que é rápido na prática

Merge sort e quick sort são ambos \(\Theta(n \log n)\) no caso típico, mas o quick sort costuma ganhar. Seu laço interno é curto e trabalha em cima do próprio array, sem copiar para um auxiliar. Ele também acessa a memória de forma sequencial, o que o cache do processador adora. Constantes menores, mesma classe de complexidade.

## Exercício

Faça o particionamento de Lomuto (pivô = último) em \([4, 7, 1, 6, 3]\).

{{< details title="Gabarito" >}}
Pivô = 3, `i = -1`.

- `j=0` (4): maior, ignora.
- `j=1` (7): maior, ignora.
- `j=2` (1): `i=0`, troca `v[0]` e `v[2]`, array: \([1, 7, 4, 6, 3]\).
- `j=3` (6): maior, ignora.

Fim: troca `v[1]` com o pivô, resultado \([1, 3, 4, 6, 7]\). O pivô 3 ficou na posição 1.
{{< /details >}}

## Resumo

- Particiona o array em torno de um pivô, que fica na posição final, e repete o processo nos dois lados.
- O particionamento é \(\Theta(n)\).
- Melhor caso e caso médio: \(\Theta(n \log n)\). Pior caso: \(\Theta(n^2)\), quando o pivô cai sempre numa ponta.
- Pivô aleatório ou mediana de três tornam o pior caso muito improvável.
- Não é estável, mas é in-place e muito rápido na prática.

## Para estudar mais

- [Quick Sort](http://joaoarthurbm.github.io/eda/posts/quick-sort) — João Arthur Brunet (2019)
- [Particionamento Hoare](http://joaoarthurbm.github.io/eda/posts/particionamento-hoare) — outra estratégia de particionamento, em geral mais eficiente que a de Lomuto
