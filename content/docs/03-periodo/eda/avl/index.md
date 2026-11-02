---
title: Árvore AVL
weight: 21
description: Árvore de busca autobalanceada, com fator de balanceamento, rotações e altura O(log n).
autores:
  - thallesgsrv
date: 2026-10-31
---

## Sobre

Na [árvore binária de busca](../arvore-binaria-de-busca/), vimos que tudo custa \(O(h)\), em que \(h\) é a altura, e que inserir valores em ordem crescente transforma a árvore em uma lista, com \(h = n - 1\). A garantia de \(O(\log n)\) só existe se a árvore **mantiver a altura pequena sozinha**.

A **árvore AVL** (de Adelson-Velsky e Landis, os autores de 1962) faz isso: depois de cada inserção ou remoção, ela confere se ficou desbalanceada e, se for o caso, se reorganiza com operações chamadas **rotações**. É a primeira árvore de busca autobalanceada que foi inventada.

## A regra da AVL

O **fator de balanceamento** de um nó é a diferença de alturas das suas subárvores:

$$
fb(no) = altura(esquerda) - altura(direita)
$$

Uma árvore é AVL se for uma BST e **todo nó** tiver \(fb \in \{-1, 0, +1\}\). Ou seja, as duas subárvores de qualquer nó diferem em altura em no máximo 1. Usamos a convenção de que a subárvore vazia tem altura \(-1\).

```text
        20  fb = 0                     20  fb = -2   <- desbalanceada!
       /  \                              \
     10    30                             30
                                            \
                                             40
```

## Por que isso garante \(O(\log n)\)?

Pergunta: qual é o **menor** número de nós \(N(h)\) de uma AVL de altura \(h\)? Para ser a mais "magra" possível, a raiz tem uma subárvore de altura \(h-1\) e outra de altura \(h-2\) (a diferença máxima permitida), e as duas também são as mais magras possíveis:

$$
N(h) = 1 + N(h-1) + N(h-2)
$$

| \(h\) | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| \(N(h)\) | 1 | 2 | 4 | 7 | 12 |

Essa recorrência cresce como a de Fibonacci, ou seja, **exponencialmente** em \(h\). Invertendo: para \(n\) nós, a altura \(h\) cresce no máximo logaritmicamente. O resultado conhecido é \(h \le 1{,}44 \log_2(n + 2)\), no máximo 44% acima do melhor caso possível. Logo, busca, inserção e remoção custam \(O(\log n)\) **no pior caso**.

## A ferramenta: rotações

Uma **rotação** reorganiza alguns nós para mudar a altura sem quebrar a propriedade da BST. Ela mexe em poucas referências, então custa \(O(1)\).

**Rotação à direita** em `y` (quando o lado esquerdo está pesado): o filho esquerdo `x` sobe, `y` desce para a direita de `x`, e a subárvore `B`, que estava entre os dois, passa a ser filho esquerdo de `y`.

```text
        y                       x
       / \                     / \
      x   C        ->         A   y
     / \                         / \
    A   B                       B   C
```

A ordem dos valores é preservada (\(A < x < B < y < C\)), então continua sendo uma BST. A **rotação à esquerda** é a imagem espelhada:

```text
      x                           y
     / \                         / \
    A   y          ->           x   C
       / \                     / \
      B   C                   A   B
```

## Construindo a AVL

### Passo 1: nó com altura

Para calcular o fator de balanceamento sem percorrer a árvore toda, cada nó **guarda a própria altura**.

```java
public class ArvoreAVL {

    private static class No {
        int valor;
        int altura;     // altura do nó: folha = 0
        No esq;
        No dir;

        No(int valor) {
            this.valor = valor;
        }
    }

    private No raiz;
    private int tamanho;

    public int size() { return tamanho; }

    public int altura() { return altura(raiz); }

    private int altura(No no) {
        return no == null ? -1 : no.altura;
    }

    private void atualizaAltura(No no) {
        no.altura = 1 + Math.max(altura(no.esq), altura(no.dir));
    }

    private int fatorBalanceamento(No no) {
        return altura(no.esq) - altura(no.dir);
    }
}
```

Um nó recém-criado tem `altura = 0`, que é o valor padrão do `int`, exatamente a altura de uma folha.

### Passo 2: as rotações

Cada rotação devolve a **nova raiz** da subárvore, para o pai poder religar. Depois de rodar, as alturas de dois nós mudaram e precisam ser recalculadas, **na ordem certa**: primeiro o nó que desceu, depois o que subiu, porque a altura do que subiu depende da do que desceu.

```java
private No rotacaoDireita(No y) {
    No x = y.esq;
    y.esq = x.dir;
    x.dir = y;
    atualizaAltura(y);   // y desceu: atualiza primeiro
    atualizaAltura(x);
    return x;
}

private No rotacaoEsquerda(No x) {
    No y = x.dir;
    x.dir = y.esq;
    y.esq = x;
    atualizaAltura(x);
    atualizaAltura(y);
    return y;
}
```

### Passo 3: os quatro casos de desbalanceamento

Quando algum nó chega a \(fb = +2\) ou \(fb = -2\), há quatro situações, que dependem de **por onde** o excesso de altura chegou:

| Caso | `fb` do nó | `fb` do filho pesado | Correção |
|---|---|---|---|
| esquerda-esquerda | +2 | \(\ge 0\) | rotação à direita no nó |
| direita-direita | -2 | \(\le 0\) | rotação à esquerda no nó |
| esquerda-direita | +2 | -1 | rotação à esquerda no filho esquerdo, **depois** à direita no nó |
| direita-esquerda | -2 | +1 | rotação à direita no filho direito, **depois** à esquerda no nó |

Os dois últimos casos são **rotações duplas**. A razão: quando o excesso está "dobrado" (o filho pesado é pesado para o lado oposto), uma rotação simples só trocaria o problema de lado. Primeiro "endireitamos" o filho, transformando o caso em esquerda-esquerda (ou direita-direita), e só então rodamos o nó.

```text
Esquerda-direita: insira 30, 10, 20

      30  (fb +2)           30                 20
     /                     /                  /  \
    10          ->       20        ->       10    30
      \                 /
       20             10
                  (rot. esquerda em 10)  (rot. direita em 30)
```

Tudo isso cabe em um único método `balancear`, que atualiza a altura do nó, olha o fator e aplica a correção, se necessária. Devolve a nova raiz da subárvore (que é o próprio `no` quando já estava balanceado).

```java
private No balancear(No no) {
    atualizaAltura(no);
    int fb = fatorBalanceamento(no);

    if (fb > 1) {                                   // pesado à esquerda
        if (fatorBalanceamento(no.esq) < 0) {       // caso esquerda-direita
            no.esq = rotacaoEsquerda(no.esq);
        }
        return rotacaoDireita(no);
    }
    if (fb < -1) {                                  // pesado à direita
        if (fatorBalanceamento(no.dir) > 0) {       // caso direita-esquerda
            no.dir = rotacaoDireita(no.dir);
        }
        return rotacaoEsquerda(no);
    }
    return no;
}
```

### Passo 4: inserir

É a inserção da BST, com uma linha a mais: no retorno da recursão, cada nó do caminho **se rebalanceia**. Assim os nós são conferidos de baixo para cima, do mais fundo até a raiz.

```java
public void add(int valor) {
    raiz = add(raiz, valor);
}

private No add(No no, int valor) {
    if (no == null) {
        tamanho++;
        return new No(valor);
    }
    if (valor < no.valor) {
        no.esq = add(no.esq, valor);
    } else if (valor > no.valor) {
        no.dir = add(no.dir, valor);
    } else {
        return no;                      // duplicado: nada muda
    }
    return balancear(no);
}
```

Insira `10, 20, 30, 40, 50, 60, 70`, o mesmo tipo de entrada que degeneraria uma BST comum:

```text
add(10), add(20)   sem desbalanceamento
add(30)            o 10 fica com fb = -2 (direita-direita): rotação à esquerda
add(40)            sem desbalanceamento
add(50)            o 30 fica com fb = -2: rotação à esquerda
add(60)            a raiz (20) fica com fb = -2: rotação à esquerda
add(70)            o 50 fica com fb = -2: rotação à esquerda
```

A árvore final é perfeita:

```text
        40
      /    \
    20      60
   /  \    /  \
  10  30  50  70
```

A BST comum teria altura 6 para essa entrada; a AVL tem altura 2.

### Passo 5: remover

É a remoção da BST (três casos, com o sucessor), mais o mesmo `balancear` na volta da recursão:

```java
public void remove(int valor) {
    raiz = remove(raiz, valor);
}

private No remove(No no, int valor) {
    if (no == null) return null;
    if (valor < no.valor) {
        no.esq = remove(no.esq, valor);
    } else if (valor > no.valor) {
        no.dir = remove(no.dir, valor);
    } else {
        if (no.esq == null) { tamanho--; return no.dir; }
        if (no.dir == null) { tamanho--; return no.esq; }
        No sucessor = no.dir;
        while (sucessor.esq != null) sucessor = sucessor.esq;
        no.valor = sucessor.valor;
        no.dir = remove(no.dir, sucessor.valor);
    }
    return balancear(no);
}
```

Um detalhe sutil: remover de um lado deixa o **outro** lado pesado. Na árvore abaixo, `remove(5)` esvazia a esquerda de `10`, e quem desbalanceia é a raiz, por excesso à direita:

```text
        20                        30
       /  \                      /  \
     10    30        ->        20    40
    /     /  \                /  \     \
   5    25    40            10   25     50
                \
                 50
```

A raiz `20` fica com \(fb = -2\); o filho pesado (`30`) tem \(fb = -1\): caso direita-direita, uma rotação à esquerda resolve.

Outra diferença para a inserção: depois de **inserir**, uma rotação (simples ou dupla) é suficiente para restaurar tudo. Na **remoção**, a rotação pode diminuir a altura da subárvore, e isso pode desbalancear um ancestral mais acima, exigindo outra rotação, e assim por diante até a raiz. Como o `balancear` é chamado em todo nó do caminho de volta, o código já cobre isso, com no máximo \(O(\log n)\) rotações.

### Passo 6: buscar

A busca é idêntica à da BST. A diferença está no custo, porque a altura é garantida.

```java
public boolean contains(int valor) {
    No atual = raiz;
    while (atual != null) {
        if (valor == atual.valor) return true;
        atual = valor < atual.valor ? atual.esq : atual.dir;
    }
    return false;
}
```

## Análise de custo

| Operação | AVL | BST comum (pior caso) |
|---|---|---|
| `contains` | \(O(\log n)\) | \(O(n)\) |
| `add` | \(O(\log n)\) | \(O(n)\) |
| `remove` | \(O(\log n)\) | \(O(n)\) |

A inserção desce \(O(\log n)\) níveis, e cada `balancear` custa \(O(1)\), então o total é \(O(\log n)\), mesma coisa na remoção. O preço é o espaço de uma altura extra por nó e as comparações do rebalanceamento, um custo constante pequeno.

Nos meus testes, inserir `1..100000` em ordem crescente produziu uma AVL de altura 16 (o \(\log_2\) de 100000 é cerca de 16,6), enquanto uma BST comum, com 5000 elementos na mesma ordem, já chegava a altura 4999.

## Exercícios

1. Insira, nessa ordem, `5, 2, 8, 1, 3, 4` em uma AVL. Onde ocorre o desbalanceamento, de qual caso é e como fica a pré-ordem final?
2. Qual é a altura de uma AVL obtida inserindo `1, 2, ..., 15` em ordem?
3. Por que, ao final de uma rotação, atualizamos primeiro a altura do nó que **desceu**?
4. Uma AVL de altura 3 pode ter quantos nós, no mínimo? E no máximo?

{{< details title="Gabarito" >}}
1. As inserções `5, 2, 8, 1, 3` não desbalanceiam. Ao inserir o `4` (filho direito do `3`), a raiz `5` fica com a esquerda de altura 2 e a direita de altura 0: \(fb = +2\). O filho pesado (`2`) tem \(fb = -1\), então é o caso **esquerda-direita**: rotação à esquerda em `2` (o `3` sobe) e depois rotação à direita em `5`. Pré-ordem final: `[3, 2, 1, 5, 4, 8]`.
2. Altura 3. Com \(n = 2^k - 1\) inserções em ordem, a AVL termina perfeita, com \(k - 1\) de altura; para 15 nós, é 3. A raiz é o 8.
3. Porque a altura do nó que subiu depende da altura do que desceu (ele agora é filho do outro). Se calculássemos na ordem inversa, usaríamos a altura antiga e desatualizada.
4. Mínimo \(N(3) = 7\) nós (pela recorrência \(N(h) = 1 + N(h-1) + N(h-2)\)). Máximo: \(2^{4} - 1 = 15\) nós (árvore perfeita).
{{< /details >}}

{{< quiz titulo="AVL" >}}

{{< questao >}}
Um nó tem \(fb = +2\) e o filho esquerdo dele tem \(fb = -1\). Qual é a correção?

- [ ] Rotação simples à direita no nó.
- [ ] Rotação simples à esquerda no nó.
- [x] Rotação à esquerda no filho esquerdo e depois rotação à direita no nó.
- [ ] Nenhuma: o nó está dentro do limite.
---
É o caso esquerda-direita. Uma rotação simples só deslocaria o problema; é preciso primeiro endireitar o filho.
{{< /questao >}}

{{< questao >}}
Qual é o custo de `add` em uma AVL com \(n\) nós, no pior caso?

- [ ] \(O(1)\)
- [x] \(O(\log n)\)
- [ ] \(O(n)\)
- [ ] \(O(n \log n)\)
---
A altura é sempre \(O(\log n)\), e o rebalanceamento custa \(O(1)\) por nível visitado.
{{< /questao >}}

{{< questao >}}
Qual afirmação sobre a remoção em uma AVL é verdadeira?

- [ ] Nunca exige rotações.
- [ ] Exige no máximo uma rotação.
- [x] Pode exigir uma rotação em vários ancestrais do nó removido.
- [ ] Só exige rotação quando o nó removido é folha.
---
Rotacionar após uma remoção pode diminuir a altura da subárvore, o que pode desbalancear um ancestral mais acima.
{{< /questao >}}

{{< /quiz >}}

## Resumo

- Na AVL, todo nó tem \(fb = altura(esq) - altura(dir) \in \{-1, 0, 1\}\).
- Isso força a altura a ser \(O(\log n)\) (no máximo cerca de \(1{,}44 \log_2 n\)).
- **Rotações** (\(O(1)\)) reorganizam os nós preservando a ordem da BST. Há 4 casos: esquerda-esquerda e direita-direita (rotação simples), esquerda-direita e direita-esquerda (rotação dupla).
- Cada nó guarda a própria altura; `add` e `remove` rebalanceiam todos os nós do caminho, de baixo para cima.
- Busca, inserção e remoção custam \(O(\log n)\) no pior caso.

## Para estudar mais

- [Árvores Balanceadas (AVL)](https://joaoarthurbm.github.io/eda/posts/avl/) — João Arthur Brunet (2019)
