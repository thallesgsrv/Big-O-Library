---
title: ArrayList
weight: 16
description: Lista que cresce sozinha, construída passo a passo sobre um array, com custo amortizado.
autores:
  - thallesgsrv
date: 2026-10-31
---

## Sobre

Um array tem tamanho fixo: quando você cria `new String[4]`, são quatro posições e pronto. Só que, quase sempre, a gente não sabe de antemão quantos elementos vai guardar. A pilha da página anterior que usa array já mostrou o incômodo: quando enche, lança uma exceção.

O **ArrayList** resolve isso com uma ideia simples: guardar os elementos em um array e, quando ele encher, trocar por um array maior. Quem usa a lista nem percebe. Para quem está de fora, ela só cresce.

Em Java, `java.util.ArrayList` faz exatamente isso. Aqui vou construir uma versão própria, passo a passo, para entender cada decisão.

## O contrato da lista

Uma lista é uma sequência em que cada elemento tem uma posição (índice), começando em `0`. As operações que vamos implementar:

| Operação | O que faz |
|---|---|
| `size()` | quantos elementos a lista tem |
| `isEmpty()` | se a lista está vazia |
| `get(i)` | devolve o elemento da posição `i` |
| `set(i, e)` | troca o elemento da posição `i` e devolve o antigo |
| `add(e)` | insere `e` no fim |
| `add(i, e)` | insere `e` na posição `i`, empurrando os outros para a direita |
| `remove(i)` | remove o elemento da posição `i`, puxando os outros para a esquerda |
| `indexOf(e)` / `contains(e)` | procura um elemento |

## Passo 1: dois números diferentes

O ponto central do ArrayList é separar duas coisas que o array sozinho mistura:

- **capacidade**: quantas posições o array tem (`elementos.length`);
- **tamanho**: quantas dessas posições estão realmente em uso (`tamanho`).

A lista ocupa as posições de `0` até `tamanho - 1`. O que vem depois é espaço reservado para crescer.

```java
import java.util.Arrays;
import java.util.Objects;

public class ListaArray {
    private String[] elementos;
    private int tamanho;

    public ListaArray() {
        this(4);
    }

    public ListaArray(int capacidadeInicial) {
        if (capacidadeInicial < 1) {
            throw new IllegalArgumentException("Capacidade deve ser positiva");
        }
        elementos = new String[capacidadeInicial];
        tamanho = 0;
    }
}
```

O construtor sem argumentos chama o outro com capacidade 4. Exigi capacidade pelo menos 1 porque, mais adiante, vamos **dobrar** a capacidade, e dobrar zero continuaria zero.

## Passo 2: tamanho e validação de índice

```java
public int size() {
    return tamanho;
}

public boolean isEmpty() {
    return tamanho == 0;
}

private void validaIndice(int indice) {
    if (indice < 0 || indice >= tamanho) {
        throw new IndexOutOfBoundsException("Índice " + indice + ", tamanho " + tamanho);
    }
}
```

Repara na validação: comparo com `tamanho`, e não com `elementos.length`. Se a lista tem 3 elementos e capacidade 8, o índice `5` existe no array, mas **não existe na lista**. Aceitar esse acesso devolveria um `null` que nunca foi inserido por ninguém.

## Passo 3: get e set

Como os elementos estão em um array, o acesso por índice é direto.

```java
public String get(int indice) {
    validaIndice(indice);
    return elementos[indice];
}

public String set(int indice, String elemento) {
    validaIndice(indice);
    String antigo = elementos[indice];
    elementos[indice] = elemento;
    return antigo;
}
```

Nenhum dos dois percorre nada: calcular o endereço de `elementos[indice]` é uma conta só. Os dois custam \(O(1)\).

## Passo 4: add no fim e o crescimento

Para inserir no fim, a próxima posição livre é justamente `tamanho`. O único problema é quando `tamanho` já é igual à capacidade: não tem onde colocar.

Nesse caso, criamos um array com o **dobro** da capacidade e copiamos os elementos para ele. `Arrays.copyOf` faz as duas coisas de uma vez:

```java
private void garantirCapacidade() {
    if (tamanho == elementos.length) {
        elementos = Arrays.copyOf(elementos, elementos.length * 2);
    }
}

public void add(String elemento) {
    garantirCapacidade();
    elementos[tamanho] = elemento;
    tamanho++;
}
```

Acompanhe com capacidade inicial 2:

```text
new ListaArray(2)   elementos = [null, null]           tamanho = 0
add("a")            elementos = ["a", null]            tamanho = 1
add("b")            elementos = ["a", "b"]             tamanho = 2   (cheia)
add("c")            cheia: copia para capacidade 4
                    elementos = ["a", "b", "c", null]  tamanho = 3
add("d")            elementos = ["a", "b", "c", "d"]   tamanho = 4   (cheia)
add("e")            cheia: copia para capacidade 8
                    elementos = ["a", "b", "c", "d", "e", null, null, null]   tamanho = 5
```

Só o terceiro e o quinto `add` foram caros (copiaram 2 e 4 elementos). Os outros só escreveram uma posição.

## Passo 5: add em uma posição qualquer

Para inserir no índice `i`, precisamos abrir um buraco. Todo mundo de `i` em diante anda uma casa para a direita, **começando pelo último**. Se começássemos pelo primeiro, o valor seguinte seria sobrescrito antes de ser copiado.

```java
public void add(int indice, String elemento) {
    if (indice < 0 || indice > tamanho) {
        throw new IndexOutOfBoundsException("Índice " + indice + ", tamanho " + tamanho);
    }
    garantirCapacidade();
    for (int k = tamanho; k > indice; k--) {
        elementos[k] = elementos[k - 1];
    }
    elementos[indice] = elemento;
    tamanho++;
}
```

Aqui o índice válido vai até `tamanho` (inclusive), porque inserir em `tamanho` é o mesmo que inserir no fim. Veja `add(1, "X")` em `["a", "b", "c", "d", "e"]`, com capacidade 8:

```text
antes:      ["a", "b", "c", "d", "e", null, null, null]
k = 5:      elementos[5] = elementos[4]   ->  [... "e", "e", ...]
k = 4:      elementos[4] = elementos[3]
k = 3:      elementos[3] = elementos[2]
k = 2:      elementos[2] = elementos[1]
k = 1:      o laço termina (1 > 1 é falso)
elementos[1] = "X"
depois:     ["a", "X", "b", "c", "d", "e", null, null]   tamanho = 6
```

## Passo 6: remove

É o espelho do passo anterior: depois de tirar o elemento, todo mundo à direita anda uma casa para a esquerda, agora **começando pelo primeiro**.

```java
public String remove(int indice) {
    validaIndice(indice);
    String removido = elementos[indice];
    for (int k = indice; k < tamanho - 1; k++) {
        elementos[k] = elementos[k + 1];
    }
    tamanho--;
    elementos[tamanho] = null;
    return removido;
}
```

O `elementos[tamanho] = null` no fim limpa a última posição, que ficou com uma cópia repetida. Ela já está fora da lista, mas se guardasse a referência, o objeto não poderia ser recolhido pelo coletor de lixo.

```text
antes:  ["a", "X", "b", "c", "d", "e", null, null]   tamanho = 6
remove(0) devolve "a"
depois: ["X", "b", "c", "d", "e", null, null, null]   tamanho = 5
```

## Passo 7: procurar

Sem nenhuma organização especial, a única forma de achar um elemento é olhar um por um. Uso `Objects.equals` para comparar sem quebrar se algum elemento for `null`.

```java
public int indexOf(String elemento) {
    for (int i = 0; i < tamanho; i++) {
        if (Objects.equals(elementos[i], elemento)) {
            return i;
        }
    }
    return -1;
}

public boolean contains(String elemento) {
    return indexOf(elemento) != -1;
}
```

Por fim, um `toString` para facilitar os testes. Ele copia só a parte da lista (sem os `null` do espaço reservado):

```java
@Override
public String toString() {
    return Arrays.toString(Arrays.copyOf(elementos, tamanho));
}
```

## Usando a lista

```java
ListaArray lista = new ListaArray();
lista.add("a");
lista.add("b");
lista.add("c");
lista.add(1, "X");

System.out.println(lista);               // [a, X, b, c]
System.out.println(lista.get(2));        // b
System.out.println(lista.remove(0));     // a
System.out.println(lista.indexOf("c"));  // 2
System.out.println(lista.size());        // 3
```

## Análise de custo

| Operação | Custo |
|---|---|
| `size`, `isEmpty`, `get`, `set` | \(O(1)\) |
| `add(e)` no fim | \(O(1)\) **amortizado** (\(O(n)\) no pior caso, quando precisa crescer) |
| `add(i, e)` e `remove(i)` | \(O(n)\): no pior caso (início da lista) desloca todos |
| `indexOf`, `contains` | \(O(n)\) |

O `add(e)` merece uma explicação. Uma chamada isolada pode custar \(O(n)\), por causa da cópia. Mas esse custo é raro. Se começamos com capacidade 1 e fazemos \(n\) inserções, as cópias acontecem quando o tamanho é 1, 2, 4, 8, ..., até algo menor que \(n\):

$$
1 + 2 + 4 + \dots + 2^k < 2n
$$

Ou seja, **no total** as cópias movem menos de \(2n\) elementos. Somando as \(n\) escritas normais, o trabalho de \(n\) inserções é menos de \(3n\), o que dá menos de 3 operações por inserção, em média. Esse custo médio sobre uma sequência de operações é o **custo amortizado**: \(O(1)\).

> [!IMPORTANT]
> O dobro é o que garante o \(O(1)\) amortizado. Se crescêssemos de **um em um**, cada `add` depois de cheio copiaria tudo, e \(n\) inserções custariam \(1 + 2 + \dots + (n-1) = n(n-1)/2\), ou seja, \(O(n^2)\). Qualquer crescimento por um fator constante (1,5, 2...) funciona; somar uma constante, não.

O preço do dobro é memória: no pior caso, quase metade do array fica reservada e sem uso.

## Exercícios

1. Com `new ListaArray(2)`, adicione 5 elementos. Em quais `add` o array é copiado? Qual é a capacidade ao final?
2. Quantos elementos são copiados, no total, para fazer \(n = 16\) inserções começando com capacidade 1 e dobrando? E se o crescimento fosse de um em um?
3. Implemente `boolean remove(String elemento)`, que remove a primeira ocorrência do elemento (se existir) e informa se removeu.
4. Por que `add(0, e)` é \(O(n)\), enquanto `add(e)` é \(O(1)\) amortizado?

{{< details title="Gabarito" >}}
1. Capacidade 2: o 3º `add` copia 2 elementos e vai para capacidade 4; o 5º `add` copia 4 elementos e vai para 8. Capacidade final: 8.
2. Dobrando, as cópias acontecem nos tamanhos 1, 2, 4 e 8, somando \(1 + 2 + 4 + 8 = 15\) elementos copiados. De um em um, seriam \(1 + 2 + \dots + 15 = 120\) cópias.
3. Uma solução reaproveitando métodos que já existem:

   ```java
   public boolean remove(String elemento) {
       int i = indexOf(elemento);
       if (i == -1) {
           return false;
       }
       remove(i);
       return true;
   }
   ```

4. `add(0, e)` precisa deslocar todos os elementos uma casa para a direita, então faz \(n\) movimentos, sempre. `add(e)` escreve na primeira posição livre e só paga o custo de copiar quando o array enche, o que fica raro à medida que a capacidade dobra.
{{< /details >}}

{{< quiz titulo="ArrayList na prática" >}}

{{< questao >}}
Qual operação **não** é \(O(1)\) em um ArrayList?

- [ ] `get(i)`
- [ ] `set(i, e)`
- [x] `remove(0)`
- [ ] `size()`
---
Remover do início obriga todos os outros elementos a andar uma casa para a esquerda, o que custa \(O(n)\).
{{< /questao >}}

{{< questao >}}
Por que o ArrayList dobra a capacidade quando enche, em vez de aumentar de um em um?

- [ ] Porque arrays em Java só aceitam tamanhos que são potências de 2.
- [x] Porque assim o custo amortizado de `add` fica \(O(1)\); aumentando de um em um, \(n\) inserções custariam \(O(n^2)\).
- [ ] Porque o dobro gasta menos memória.
- [ ] Porque `Arrays.copyOf` só copia metades de arrays.
---
O dobro faz as cópias ficarem cada vez mais raras. As cópias somam menos de \(2n\) elementos em \(n\) inserções.
{{< /questao >}}

{{< /quiz >}}

## Resumo

- O ArrayList guarda os elementos em um array e controla dois números: **tamanho** (em uso) e **capacidade** (reservado).
- Quando enche, cria um array com o dobro da capacidade e copia os elementos.
- `get` e `set` são \(O(1)\); inserir ou remover no meio ou no início é \(O(n)\) por causa dos deslocamentos.
- `add` no fim é \(O(1)\) amortizado: a cópia é cara, mas rara.
- Procurar sem ordenação é \(O(n)\).

## Para estudar mais

- [Listas baseadas em Arrays (ArrayList)](http://joaoarthurbm.github.io/eda/posts/arraylist) — João Arthur Brunet (2019)
- Compare com a [lista encadeada](../lista-encadeada/): lá, inserir no início é \(O(1)\), mas acessar por índice é \(O(n)\).
