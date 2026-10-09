---
title: Radix sort
weight: 9
description: Ordena números dígito por dígito, usando o counting sort como peça interna.
autores:
  - thallesgsrv
date: 2026-10-09
---
## Sobre

O counting sort sofre quando os valores são grandes. Ordenar números de até 6 dígitos exigiria um array de contagem de um milhão de posições. O radix sort contorna isso olhando **um dígito de cada vez**: em vez de um intervalo gigante, usa vários intervalos minúsculos (0 a 9).

## A ideia

Pense em como se ordena uma pilha de fichas numeradas à mão, sem comparar números inteiros. Começamos pelo **dígito menos significativo** (as unidades), separamos as fichas por esse dígito, juntamos de novo. Depois fazemos o mesmo com as dezenas, depois as centenas. No final, a pilha está ordenada.

Para \([531, 82, 405, 217, 90, 346]\):

| Passada | Ordenando pelo dígito de... | Resultado |
|---|---|---|
| 1 | unidades | 9**0**, 53**1**, 8**2**, 40**5**, 34**6**, 21**7** |
| 2 | dezenas | 4**0**5, 2**1**7, 5**3**1, 3**4**6, **8**2, **9**0 |
| 3 | centenas | 82, 90, 217, 346, 405, 531 |

Na passada 2, os números sem dezena, como 82 e 90, entram com dígito \(8\) e \(9\) de dezena, e o 405 entra com \(0\). Na passada 3, 82 e 90 têm centena \(0\).

## Por que funciona (e onde a estabilidade entra)

Olhe a passada 3: 82 e 90 têm o mesmo dígito de centena (0). Quem decide qual vem primeiro? A passada anterior! Como 82 já estava antes do 90 depois de ordenar por dezenas, ele continua antes.

Isso só funciona se cada passada for **estável**: elementos com o mesmo dígito mantêm a ordem em que chegaram. É por isso que o subalgoritmo de cada passada precisa ser o counting sort estável. Com um algoritmo instável, o trabalho das passadas anteriores seria desfeito.

## Veja funcionando

Use ▶ para executar sozinho ou ▶| para avançar um passo por vez (◀ volta). A linha do pseudocódigo que está sendo executada fica acesa. Nas barras, **laranja** é o que está sendo comparado ou trocado, **azul** é o elemento em foco (o elemento lido) e **verde** é o que já está no lugar certo.

{{< viz algoritmo="radix" >}}

Observe a linha de dígitos: ela muda a cada passada, e os números que empatam em um dígito mantêm a ordem que tinham. É isso que faz o resultado final sair ordenado.

## Implementação

```java
```java
import java.util.Arrays;

static void radixSort(int[] v) {
    int maior = Arrays.stream(v).max().getAsInt();

    // Ordena primeiro pelas unidades, depois dezenas, centenas...
    for (int exp = 1; maior / exp > 0; exp *= 10) {
        countingPorDigito(v, exp);
    }
}

static void countingPorDigito(int[] v, int exp) {
    int[] contagem = new int[10];
    int[] auxiliar = new int[v.length];

    // 1. Conta quantos números possuem cada dígito
    for (int numero : v) {
        int digito = (numero / exp) % 10;
        contagem[digito]++;
    }

    // 2. Calcula as posições finais de cada dígito
    for (int i = 1; i < 10; i++) {
        contagem[i] += contagem[i - 1];
    }

    // 3. Distribui os números mantendo a ordenação estável
    for (int i = v.length - 1; i >= 0; i--) {
        int numero = v[i];
        int digito = (numero / exp) % 10;

        int posicao = contagem[digito] - 1;
        auxiliar[posicao] = numero;
        contagem[digito]--;
    }

    // 4. Copia o resultado de volta para o vetor original
    System.arraycopy(auxiliar, 0, v, 0, v.length);
}
```
```

A expressão `(x / exp) % 10` extrai o dígito: dividir por `exp` joga fora os dígitos à direita e `% 10` fica só com o último. Para `x = 531` e `exp = 10`, temos `531 / 10 = 53` e `53 % 10 = 3`.

O laço de fora roda enquanto ainda existir algum dígito a processar, ou seja, até `exp` passar do maior número.

## Análise

Sendo \(d\) a quantidade de dígitos do maior número e \(b\) a base (10 aqui), fazemos \(d\) passadas e cada uma é um counting sort com \(k = b\):

$$
T(n) = d \cdot \Theta(n + b) = \Theta(d\,(n + b))
$$

Se o número de dígitos \(d\) é constante (por exemplo, todos os números cabem em 9 dígitos) e a base é pequena, isso é \(\Theta(n)\). Linear de verdade, sem nenhum \(\log\).

Um cuidado: \(d\) não é de graça. O número de dígitos de \(m\) em base \(b\) é cerca de \(\log_b m\). Se os valores forem enormes em relação a \(n\), \(d\) cresce e a vantagem some. Radix sort brilha quando muitos números têm poucos dígitos, como CPFs, CEPs, datas ou IDs de tamanho fixo.

## Estabilidade e memória

É **estável**, herdando isso do counting sort interno. Não é in-place: precisa do array `saida` de tamanho \(n\), então usa \(O(n + b)\) de memória extra.

## Limitações

- A versão acima só funciona para inteiros **não negativos**.
- Pode ordenar também strings de tamanho fixo (cada caractere é um "dígito") e outros dados que tenham uma estrutura de dígitos.
- Na prática, as constantes podem ser maiores que as do quick sort, então \(\Theta(n)\) não significa automaticamente "mais rápido".

## Exercício

Quantas passadas o radix sort faz para ordenar \([1200, 35, 7, 98765]\)?

{{< details title="Gabarito" >}}
5 passadas, porque o maior número, 98765, tem 5 dígitos. Os outros são tratados como se tivessem zeros à esquerda (35 vira 00035).
{{< /details >}}

## Resumo

- Ordena os números dígito a dígito, do menos significativo para o mais significativo.
- Cada passada usa um counting sort estável com base pequena.
- A estabilidade é essencial: é ela que preserva o resultado das passadas anteriores.
- \(\Theta(d\,(n + b))\), que vira linear quando o número de dígitos é constante.
- Estável, não in-place, e só para chaves inteiras não negativas na versão básica.

## Para estudar mais

- [Ordenação Linear](http://joaoarthurbm.github.io/eda/posts/ordenacao-linear) — João Arthur Brunet (2019). O material trata do counting sort; o radix sort é uma extensão dele.
- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022), capítulo sobre ordenação em tempo linear
