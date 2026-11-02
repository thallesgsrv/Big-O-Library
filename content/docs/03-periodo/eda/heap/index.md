---
title: Heap e fila de prioridade
weight: 20
description: Heap máximo em array, com sobe, afunda, inserção, remoção do maior e construção em O(n).
autores:
  - thallesgsrv
date: 2026-10-31
---

## Sobre

Na [página do heap sort](../heap-sort/) usamos o heap como ferramenta para ordenar. Aqui o foco muda: o heap como **estrutura de dados** completa, com inserção e remoção, que serve de base para a **fila de prioridade**.

Uma **fila de prioridade** é uma fila em que não importa quem chegou primeiro: sai sempre o elemento de **maior prioridade**. O contrato:

| Operação | O que faz |
|---|---|
| `add(x)` | insere um elemento |
| `peek()` | consulta o de maior prioridade, sem remover |
| `remove()` | remove e devolve o de maior prioridade |

Exemplos: um agendador de tarefas do sistema operacional, o atendimento de um pronto-socorro (por gravidade e não por chegada) e o algoritmo de Dijkstra.

## Por que não usar o que já temos?

| Implementação | `add` | `remove` do maior |
|---|---|---|
| Array sem ordem | \(O(1)\) | \(O(n)\), precisa procurar o maior |
| Array ordenado | \(O(n)\), precisa abrir espaço | \(O(1)\), o maior está no fim |
| **Heap** | \(O(\log n)\) | \(O(\log n)\) |

O heap não deixa nenhuma das duas operações lenta: paga um pouco em cada uma.

## Lembrando: o heap máximo

Um **heap máximo** é uma árvore binária **completa** (todos os níveis cheios, menos talvez o último, preenchido da esquerda para a direita) em que **todo pai é maior ou igual aos seus filhos**. Por isso o maior elemento está sempre na raiz.

Por ser completa, a árvore cabe em um array sem nenhum ponteiro. Para o índice \(i\) (começando em 0):

- filho da esquerda: \(2i + 1\)
- filho da direita: \(2i + 2\)
- pai: \(\lfloor (i - 1) / 2 \rfloor\)

O array `[10, 5, 8, 1, 3, 2]` representa:

```text
        10
       /  \
      5    8
     / \  /
    1  3 2
```

## Construindo o heap

### Passo 1: a estrutura

Um array que cresce (como no [ArrayList](../arraylist/)) e a quantidade de elementos em uso. Os três cálculos de índice viram métodos auxiliares, e a troca também, porque vamos usá-la bastante.

```java
import java.util.Arrays;
import java.util.NoSuchElementException;

public class HeapMaximo {
    private int[] elementos;
    private int tamanho;

    public HeapMaximo() {
        elementos = new int[8];
    }

    public int size() {
        return tamanho;
    }

    public boolean isEmpty() {
        return tamanho == 0;
    }

    private int pai(int i) { return (i - 1) / 2; }
    private int esq(int i) { return 2 * i + 1; }
    private int dir(int i) { return 2 * i + 2; }

    private void troca(int i, int j) {
        int temp = elementos[i];
        elementos[i] = elementos[j];
        elementos[j] = temp;
    }

    public int peek() {
        if (isEmpty()) throw new NoSuchElementException("Heap vazio");
        return elementos[0];
    }
}
```

O `peek` é \(O(1)\): o maior está sempre na posição 0.

### Passo 2: inserir e `sobe`

Para inserir, o único lugar que mantém a árvore **completa** é a próxima posição livre do array, no fim. Mas o novo elemento pode ser maior que o pai e violar a regra. Corrigimos fazendo-o **subir**: enquanto for maior que o pai, trocamos com ele.

```java
public void add(int valor) {
    if (tamanho == elementos.length) {
        elementos = Arrays.copyOf(elementos, elementos.length * 2);
    }
    elementos[tamanho] = valor;
    sobe(tamanho);
    tamanho++;
}

private void sobe(int i) {
    while (i > 0 && elementos[i] > elementos[pai(i)]) {
        troca(i, pai(i));
        i = pai(i);
    }
}
```

Inserindo `5, 3, 8, 1, 9, 2` em um heap vazio:

```text
add(5)   [5]
add(3)   [5, 3]                  3 < 5, fica
add(8)   [8, 3, 5]               8 > pai (5): sobe e vira a raiz
add(1)   [8, 3, 5, 1]            1 < pai (3), fica
add(9)   [9, 8, 5, 1, 3]         9 sobe duas vezes: passa pelo 3 e pelo 8
add(2)   [9, 8, 5, 1, 3, 2]      2 < pai (5), fica
```

Como o `sobe` anda sempre em direção à raiz, ele faz no máximo tantas trocas quanto a altura da árvore: \(O(\log n)\).

### Passo 3: remover o maior e `afunda`

O maior é a raiz, mas não podemos só tirá-la: sobraria um buraco no topo. O truque é **pegar o último elemento do array, colocá-lo na raiz** e diminuir o tamanho. A árvore continua completa, mas a nova raiz provavelmente é pequena demais para o posto. Então a fazemos **afundar**, trocando sempre com o **maior** dos dois filhos, até ela se acomodar.

```java
public int remove() {
    if (isEmpty()) throw new NoSuchElementException("Heap vazio");
    int maior = elementos[0];
    tamanho--;
    elementos[0] = elementos[tamanho];
    afunda(0);
    return maior;
}

private void afunda(int i) {
    while (true) {
        int maior = i;
        if (esq(i) < tamanho && elementos[esq(i)] > elementos[maior]) maior = esq(i);
        if (dir(i) < tamanho && elementos[dir(i)] > elementos[maior]) maior = dir(i);
        if (maior == i) return;       // já respeita a regra
        troca(i, maior);
        i = maior;
    }
}
```

Por que trocar com o **maior** dos filhos? Porque o que subir vai ser o novo pai do outro filho, e só o maior dos dois consegue ser maior ou igual ao irmão.

Continuando do heap `[9, 8, 5, 1, 3, 2]`:

```text
remove()   devolve 9
           último (2) vai para a raiz:     [2, 8, 5, 1, 3]
           afunda: filhos 8 e 5, o maior é 8:   [8, 2, 5, 1, 3]
           afunda: filhos 1 e 3, o maior é 3:   [8, 3, 5, 1, 2]
           chegou ao fim.

remove()   devolve 8
           último (2) vai para a raiz:     [2, 3, 5, 1]
           afunda: filhos 3 e 5, o maior é 5:   [5, 3, 2, 1]
           2 não tem filhos: termina.
```

O `afunda`, como o `sobe`, anda em uma direção só, então também custa \(O(\log n)\).

### Passo 4: construir um heap a partir de um array

Dado um array qualquer com \(n\) valores, poderíamos criar um heap vazio e chamar `add` \(n\) vezes: \(O(n \log n)\). Dá para fazer melhor, usando o que aprendemos no heap sort: **afundar de baixo para cima**, começando pelo último pai (índice \(n/2 - 1\)) até a raiz.

```java
public HeapMaximo(int[] valores) {
    elementos = Arrays.copyOf(valores, Math.max(valores.length, 1));
    tamanho = valores.length;
    for (int i = tamanho / 2 - 1; i >= 0; i--) {
        afunda(i);
    }
}
```

Com `[3, 9, 2, 7, 5, 1, 8]`:

```text
inicial          [3, 9, 2, 7, 5, 1, 8]
afunda(2)        o 2 troca com o maior filho (8):   [3, 9, 8, 7, 5, 1, 2]
afunda(1)        9 já é maior que 7 e 5: nada
afunda(0)        o 3 troca com o 9:                 [9, 3, 8, 7, 5, 1, 2]
                 continua: o 3 troca com o 7:       [9, 7, 8, 3, 5, 1, 2]
```

Por que \(O(n)\) e não \(O(n \log n)\)? Porque nem todo nó afunda a árvore inteira. A metade das posições são folhas e não fazem nada; um quarto dos nós só pode descer uma vez; um oitavo, duas vezes... Quem pode descer muito é muito raro:

$$
\sum_{h=0}^{\log n} \frac{n}{2^{h+1}} \cdot h \;=\; O(n)
$$

## Usando

```java
HeapMaximo tarefas = new HeapMaximo();
tarefas.add(4);
tarefas.add(10);
tarefas.add(3);
tarefas.add(5);

System.out.println(tarefas.peek());    // 10
System.out.println(tarefas.remove());  // 10
System.out.println(tarefas.remove());  // 5
System.out.println(tarefas.size());    // 2
```

Na biblioteca do Java, a fila de prioridade é a classe `PriorityQueue`, implementada com um heap. Ela é um heap **mínimo** por padrão (o menor sai primeiro). Para ter o maior primeiro, passe um comparador invertido:

```java
PriorityQueue<Integer> fila = new PriorityQueue<>(Collections.reverseOrder());
```

## Análise de custo

| Operação | Custo |
|---|---|
| `peek` | \(O(1)\) |
| `add` | \(O(\log n)\) |
| `remove` | \(O(\log n)\) |
| construir a partir de um array | \(O(n)\) |

A altura de uma árvore completa com \(n\) nós é \(\lfloor \log_2 n \rfloor\), e `sobe` e `afunda` fazem no máximo uma troca por nível.

Um heap é bom para **o maior (ou menor)**, não para tudo. Procurar um valor qualquer custa \(O(n)\), porque a regra só compara pai e filho, sem relação entre irmãos. E não dá para percorrer os elementos em ordem sem ir removendo um por um, o que é exatamente o heap sort: \(n\) remoções de \(O(\log n)\), ou seja, \(O(n \log n)\).

## Exercícios

1. Insira em um heap máximo vazio, nessa ordem: `4, 10, 3, 5, 1`. Mostre o array após cada inserção. Depois faça um `remove()`.
2. Construa o heap máximo a partir de `[1, 2, 3, 4, 5, 6]` com o algoritmo de baixo para cima. Qual é o array final?
3. Como adaptar `HeapMaximo` para virar um heap **mínimo**?
4. Por que procurar um valor qualquer em um heap é \(O(n)\)?

{{< details title="Gabarito" >}}
1. Após cada inserção: `[4]`, `[10, 4]` (o 10 sobe), `[10, 4, 3]`, `[10, 5, 3, 4]` (o 5 sobe uma vez, trocando com o 4) e `[10, 5, 3, 4, 1]`. No `remove()`, devolve 10; o último (1) vai para a raiz, `[1, 5, 3, 4]`, e afunda: troca com 5, `[5, 1, 3, 4]`, e depois com 4, `[5, 4, 3, 1]`.
2. O último pai é o índice 2: o 3 troca com o 6, `[1, 2, 6, 4, 5, 3]`. No índice 1: o 2 troca com o maior filho, o 5, `[1, 5, 6, 4, 2, 3]`. No índice 0: o 1 troca com o 6, `[6, 5, 1, 4, 2, 3]`, e continua afundando: troca com o 3, `[6, 5, 3, 4, 2, 1]`. Resultado: `[6, 5, 3, 4, 2, 1]`.
3. Inverta as comparações no `sobe` (sobe enquanto for **menor** que o pai) e no `afunda` (escolha o **menor** dos filhos).
4. O heap só garante a relação entre pai e filho. Entre irmãos, ou entre primos, não há ordem alguma, então não dá para descartar metade dos elementos como na BST. No pior caso, é preciso olhar todos.
{{< /details >}}

{{< quiz titulo="Heap" >}}

{{< questao >}}
No `remove()` de um heap máximo, qual é o primeiro passo depois de guardar a raiz?

- [ ] Procurar o segundo maior elemento no array.
- [x] Mover o último elemento do array para a raiz e diminuir o tamanho.
- [ ] Deslocar todos os elementos uma casa para a esquerda.
- [ ] Ordenar o array.
---
Mover o último para a raiz mantém a árvore completa. Depois, `afunda` restaura a regra do heap em \(O(\log n)\).
{{< /questao >}}

{{< questao >}}
Qual é o custo de construir um heap a partir de um array de \(n\) elementos, afundando de baixo para cima?

- [ ] \(O(\log n)\)
- [x] \(O(n)\)
- [ ] \(O(n \log n)\)
- [ ] \(O(n^2)\)
---
A maior parte dos nós está perto das folhas e afunda pouco. A soma das alturas de todos os nós é \(O(n)\).
{{< /questao >}}

{{< /quiz >}}

## Resumo

- Fila de prioridade: sempre sai o elemento de maior prioridade. O **heap** é a implementação eficiente.
- Heap máximo = árvore binária completa, guardada em array, em que todo pai é \(\geq\) aos filhos.
- `add`: coloca no fim e **sobe**. `remove`: troca a raiz pelo último e **afunda**. Ambos \(O(\log n)\); `peek` é \(O(1)\).
- Construir de um array: afundar do último pai até a raiz, \(O(n)\).
- Não serve para buscar valores quaisquer nem para percorrer em ordem.

## Para estudar mais

- [Heap](https://joaoarthurbm.github.io/eda/posts/heap) — João Arthur Brunet (2019)
