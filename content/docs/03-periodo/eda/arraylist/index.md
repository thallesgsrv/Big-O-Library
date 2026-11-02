---
title: ArrayList
weight: 16
description: Uma lista que cresce sozinha, montada do zero em cima de um array, e por que o dobro é o número mágico.
autores:
  - thallesgsrv
date: 2026-10-31
---

## Sobre

Array tem um defeito de personalidade: ele é **teimoso**. Você diz `new String[4]` e pronto, são quatro posições para sempre. Quer o quinto elemento? Azar. Na pilha com array, a gente já sentiu isso: encheu, estourou exceção.

Só que, na vida real, ninguém sabe de antemão quantas coisas vai guardar. Quantos usuários vão se cadastrar? Quantas mensagens vão chegar? Dá para chutar um número gigante e desperdiçar memória, ou dá para fazer algo mais esperto.

A ideia do **ArrayList** cabe em uma frase: *guarde tudo num array e, quando ele encher, mude para um array maior*. Quem usa a lista nem percebe a mudança. É como trocar de apartamento quando a casa fica pequena: você leva a mobília toda, e o endereço novo é só um detalhe.

Em Java, isso é o `java.util.ArrayList`. Aqui a gente vai construir um do zero, porque só dá para confiar de verdade naquilo que você sabe montar.

## O que a lista precisa fazer

Uma lista é uma sequência em que cada elemento tem uma posição (índice), começando em `0`.

| Operação | O que faz |
|---|---|
| `size()` | quantos elementos a lista tem |
| `isEmpty()` | se está vazia |
| `get(i)` | devolve o elemento da posição `i` |
| `set(i, e)` | troca o elemento da posição `i` e devolve o antigo |
| `add(e)` | coloca `e` no fim |
| `add(i, e)` | coloca `e` na posição `i`, empurrando os outros para a direita |
| `remove(i)` | tira o da posição `i`, puxando os outros para a esquerda |
| `indexOf(e)` / `contains(e)` | procura um elemento |

## Passo 1: a ideia dos dois números

Aqui está o truque que faz tudo funcionar. A gente separa duas coisas que o array puro mistura:

- **capacidade**: quantas posições o array tem (`elementos.length`). É o tamanho do apartamento.
- **tamanho**: quantas dessas posições estão mesmo ocupadas (`tamanho`). É quanta mobília você tem.

A lista vive nas posições de `0` até `tamanho - 1`. O resto é espaço reservado para crescer.

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

O construtor sem argumentos chama o outro com capacidade 4. E por que exigi capacidade pelo menos 1? Porque daqui a pouco a gente vai **dobrar** a capacidade, e dobrar zero continua zero. Um bug bobo que daria um dia de dor de cabeça.

## Passo 2: tamanho e a validação de índice

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

Repara na validação: ela compara com `tamanho`, e **não** com `elementos.length`. Imagina uma lista com 3 elementos e capacidade 8. O índice `5` existe no array, mas **não existe na lista**. Se a gente deixasse passar, devolveria um `null` que ninguém nunca inseriu, um fantasma. Quem usa a lista só deve enxergar a parte ocupada.

## Passo 3: get e set (a parte fácil)

Como tudo está num array, acessar por índice é direto.

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

Nada de percorrer coisa nenhuma: o computador calcula o endereço de `elementos[indice]` com uma conta só. Os dois custam \(O(1)\). É o superpoder do array, e a gente herda de graça.

## Passo 4: add no fim e a hora de crescer

A próxima posição livre é justamente `tamanho`, então inserir no fim é só escrever ali e aumentar o contador. O problema é quando `tamanho` já é igual à capacidade: acabou o espaço.

É aí que entra a mudança de apartamento. Criamos um array com o **dobro** da capacidade e copiamos tudo para ele. O `Arrays.copyOf` faz as duas coisas de uma vez:

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

Acompanha com capacidade inicial 2:

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

Repara que só o 3º e o 5º `add` foram caros (copiaram 2 e 4 elementos). Os outros três só escreveram numa posição e seguiram a vida. Guarde essa sensação de "quase sempre barato, de vez em quando caro", porque ela é o coração da análise lá embaixo.

## Passo 5: add no meio (abrindo um buraco)

Para inserir no índice `i`, precisamos abrir um buraco ali. Todo mundo de `i` em diante dá um passo para a direita, e o detalhe que pega muita gente é: **começando pelo último**.

Pensa numa fila de cadeiras em que todo mundo precisa escorregar uma cadeira para o lado. Se o primeiro escorrega antes de o segundo sair, ele senta no colo de alguém. Começando de trás, cada um tem uma cadeira vazia esperando.

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

Aqui o índice válido vai até `tamanho` (inclusive), porque inserir em `tamanho` é o mesmo que inserir no fim. Olha `add(1, "X")` em `["a", "b", "c", "d", "e"]`, com capacidade 8:

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

## Passo 6: remove (fechando o buraco)

É o espelho do passo anterior: tirou o elemento, todo mundo à direita dá um passo para a esquerda. Agora a ordem inverte: **começando pelo primeiro**, pelo mesmo motivo.

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

Sobre aquele `elementos[tamanho] = null` no fim: depois do deslocamento, a última posição ficou com uma cópia repetida. Ela já está fora da lista, mas ainda segura a referência, e o objeto não poderia ser recolhido pelo coletor de lixo. É um vazamento de memória silencioso. Limpar custa uma linha.

```text
antes:  ["a", "X", "b", "c", "d", "e", null, null]   tamanho = 6
remove(0) devolve "a"
depois: ["X", "b", "c", "d", "e", null, null, null]   tamanho = 5
```

## Passo 7: procurar

Sem nenhuma organização especial, o único jeito de achar alguém é olhar um por um, como procurar um contato num celular sem busca. Uso `Objects.equals` para comparar sem quebrar se algum elemento for `null`.

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

E, para ver o que está acontecendo nos testes sem sofrimento, um `toString`. Ele copia só a parte da lista, sem os `null` do espaço reservado:

```java
@Override
public String toString() {
    return Arrays.toString(Arrays.copyOf(elementos, tamanho));
}
```

## Testando

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

## Quanto custa?

| Operação | Custo |
|---|---|
| `size`, `isEmpty`, `get`, `set` | \(O(1)\) |
| `add(e)` no fim | \(O(1)\) **amortizado** (e \(O(n)\) no pior caso, quando precisa crescer) |
| `add(i, e)` e `remove(i)` | \(O(n)\): no pior caso (início da lista) mexe em todo mundo |
| `indexOf`, `contains` | \(O(n)\) |

O `add(e)` merece uma conversa, porque ele parece mentiroso. Uma chamada isolada pode custar \(O(n)\), por causa da cópia. Como é que a gente diz que é \(O(1)\)?

Porque a cópia é **rara**. Começando com capacidade 1 e fazendo \(n\) inserções, as cópias acontecem quando o tamanho é 1, 2, 4, 8... até algo menor que \(n\):

$$
1 + 2 + 4 + \dots + 2^k < 2n
$$

No total, as cópias movem menos de \(2n\) elementos. Somando as \(n\) escritas normais, as \(n\) inserções custam menos de \(3n\), ou seja, **menos de 3 operações por inserção, em média**. Esse custo médio sobre uma sequência de operações se chama **custo amortizado**, e aqui vale \(O(1)\). É como pagar a mudança de apartamento parcelada: cada `add` paga uma continha pequena, e a mudança cara já estava quitada.

> [!IMPORTANT]
> O **dobro** é o que segura o \(O(1)\) amortizado. Se a gente crescesse de **um em um**, todo `add` depois de cheio copiaria tudo, e \(n\) inserções custariam \(1 + 2 + \dots + (n-1) = n(n-1)/2\), ou seja, \(O(n^2)\). Qualquer crescimento por um *fator* (1,5, 2...) funciona. Somar uma constante, não.

O preço do dobro é memória: no pior caso, quase metade do array fica reservada e sem uso. Troca justa.

## Exercícios

1. Com `new ListaArray(2)`, adicione 5 elementos. Em quais `add` o array é copiado? Qual a capacidade no final?
2. Quantos elementos são copiados, no total, para fazer \(n = 16\) inserções começando com capacidade 1 e dobrando? E se o crescimento fosse de um em um?
3. Implemente `boolean remove(String elemento)`, que remove a primeira ocorrência (se existir) e diz se removeu.
4. Por que `add(0, e)` é \(O(n)\), enquanto `add(e)` é \(O(1)\) amortizado?

{{< details title="Gabarito" >}}
1. Capacidade 2: o 3º `add` copia 2 elementos e vai para 4; o 5º copia 4 e vai para 8. Capacidade final: 8.
2. Dobrando, as cópias acontecem nos tamanhos 1, 2, 4 e 8: \(1 + 2 + 4 + 8 = 15\) elementos copiados. De um em um seriam \(1 + 2 + \dots + 15 = 120\). Oito vezes mais, e a diferença só piora com \(n\) maior.
3. Dá para reaproveitar o que já existe, sem reescrever o deslocamento:

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

4. `add(0, e)` precisa empurrar **todos** os elementos uma casa para a direita, sempre, \(n\) movimentos. `add(e)` escreve na primeira posição livre e só paga a cópia quando o array enche, algo que fica cada vez mais raro à medida que a capacidade dobra.
{{< /details >}}

{{< quiz titulo="ArrayList na prática" >}}

{{< questao >}}
Qual operação **não** é \(O(1)\) em um ArrayList?

- [ ] `get(i)`
- [ ] `set(i, e)`
- [x] `remove(0)`
- [ ] `size()`
---
Remover do início obriga todos os outros a darem um passo para a esquerda: \(O(n)\).
{{< /questao >}}

{{< questao >}}
Por que o ArrayList dobra a capacidade quando enche, em vez de aumentar de um em um?

- [ ] Porque arrays em Java só aceitam tamanhos que são potências de 2.
- [x] Porque assim o custo amortizado de `add` fica \(O(1)\); de um em um, \(n\) inserções custariam \(O(n^2)\).
- [ ] Porque o dobro gasta menos memória.
- [ ] Porque `Arrays.copyOf` só copia metades de arrays.
---
O dobro faz as cópias ficarem cada vez mais raras. Em \(n\) inserções, elas somam menos de \(2n\) elementos.
{{< /questao >}}

{{< /quiz >}}

## Resumo

- O ArrayList guarda tudo num array e controla dois números: **tamanho** (ocupado) e **capacidade** (reservado).
- Encheu? Cria um array com o dobro e copia.
- `get` e `set` são \(O(1)\). Inserir ou remover no meio ou no início é \(O(n)\), por causa dos deslocamentos.
- `add` no fim é \(O(1)\) amortizado: a cópia é cara, mas rara.
- Procurar sem ordenação é \(O(n)\).

## Para estudar mais

- [Listas baseadas em Arrays (ArrayList)](http://joaoarthurbm.github.io/eda/posts/arraylist) — João Arthur Brunet (2019)
- Compare com a [lista encadeada](../lista-encadeada/): lá, inserir no início é \(O(1)\), mas acessar por índice é \(O(n)\). Cada uma tem o seu superpoder.
