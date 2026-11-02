---
title: Árvore binária de busca
weight: 19
description: Busca, inserção e remoção em uma árvore ordenada; percursos, altura e o risco de degenerar.
autores:
  - thallesgsrv
date: 2026-10-31
---

## Sobre

Até aqui, as estruturas que guardam elementos têm um problema ou outro:

- o **array ordenado** busca em \(O(\log n)\) com busca binária, mas inserir e remover custa \(O(n)\), por causa dos deslocamentos;
- a **lista encadeada** insere e remove com facilidade, mas buscar custa \(O(n)\);
- a **tabela hash** é rápida, mas não guarda ordem.

A **árvore binária de busca** (BST, de *binary search tree*) é uma tentativa de ter o melhor dos dois mundos: buscar, inserir e remover em \(O(\log n)\), mantendo os elementos **ordenados**. A ideia é pegar a lógica da busca binária e embuti-la na própria forma da estrutura.

## Vocabulário de árvores

Uma árvore é formada por **nós** ligados entre si. Em uma árvore binária, cada nó tem no máximo dois filhos.

- **Raiz**: o nó do topo, o único sem pai.
- **Filhos** (esquerdo e direito) e **pai**: a relação entre um nó e os que estão logo abaixo dele.
- **Folha**: nó sem filhos.
- **Subárvore**: um nó e tudo que está abaixo dele. Toda subárvore é uma árvore.
- **Altura** de um nó: o número de arestas no caminho mais longo até uma folha. Nesta página, uma folha tem altura 0 e a árvore vazia tem altura \(-1\). A altura da árvore é a altura da raiz.

## A propriedade da BST

Para **todo nó** da árvore:

- todos os valores da subárvore **esquerda** são **menores** que o valor do nó;
- todos os valores da subárvore **direita** são **maiores** que o valor do nó.

Aqui vou tratar valores distintos (sem repetição). A árvore a seguir é uma BST:

```text
            50
          /    \
        30      70
       /  \    /  \
     20   40  60   80
         /  \
       35    45
```

Com a propriedade, procurar fica parecido com a busca binária: comparamos com o nó atual e **descartamos metade** (uma subárvore inteira) de uma vez. Procurando 45: é menor que 50, vai para a esquerda; é maior que 30, vai para a direita; é maior que 40, vai para a direita; achou.

## Construindo a árvore

### Passo 1: o nó e a árvore

Cada nó guarda o valor e a referência para os dois filhos. A árvore só precisa conhecer a raiz.

```java
public class ArvoreBinariaBusca {

    private static class No {
        int valor;
        No esq;
        No dir;

        No(int valor) {
            this.valor = valor;
        }
    }

    private No raiz;
    private int tamanho;

    public int size() {
        return tamanho;
    }

    public boolean isEmpty() {
        return raiz == null;
    }
}
```

### Passo 2: buscar

Começamos na raiz e, a cada passo, escolhemos o lado conforme a comparação. Se chegarmos a `null`, o valor não está na árvore.

```java
public boolean contains(int valor) {
    No atual = raiz;
    while (atual != null) {
        if (valor == atual.valor) {
            return true;
        }
        atual = valor < atual.valor ? atual.esq : atual.dir;
    }
    return false;
}
```

### Passo 3: inserir

Inserir é buscar até cair em um `null`: é exatamente ali que o novo nó deve ficar. Escrevo de forma recursiva, em que cada chamada devolve a raiz da subárvore já atualizada. Assim, a ligação com o pai é refeita automaticamente.

```java
public void add(int valor) {
    raiz = add(raiz, valor);
}

private No add(No no, int valor) {
    if (no == null) {
        tamanho++;
        return new No(valor);          // achou o lugar: cria o nó aqui
    }
    if (valor < no.valor) {
        no.esq = add(no.esq, valor);
    } else if (valor > no.valor) {
        no.dir = add(no.dir, valor);
    }                                  // se for igual, não faz nada
    return no;
}
```

Inserindo `50, 30, 70, 20, 40, 60, 80, 35, 45`, nessa ordem, obtemos a árvore desenhada acima. Veja o caminho do `35`: menor que 50 (esquerda), maior que 30 (direita), menor que 40 (esquerda), subárvore vazia: o `35` vira filho esquerdo do `40`.

A raiz é sempre o **primeiro** valor inserido. A forma da árvore depende da **ordem** de inserção; guarde essa observação, ela é importante mais adiante.

### Passo 4: mínimo e máximo

O menor valor está sempre no nó mais à esquerda; o maior, no mais à direita. Basta descer sempre pelo mesmo lado.

```java
public int min() {
    if (raiz == null) throw new java.util.NoSuchElementException("Árvore vazia");
    return min(raiz).valor;
}

private No min(No no) {
    while (no.esq != null) {
        no = no.esq;
    }
    return no;
}

public int max() {
    if (raiz == null) throw new java.util.NoSuchElementException("Árvore vazia");
    No no = raiz;
    while (no.dir != null) {
        no = no.dir;
    }
    return no.valor;
}
```

### Passo 5: altura

A altura de um nó é 1 mais a maior altura entre seus filhos. A árvore vazia vale \(-1\), o que faz a folha valer \(1 + \max(-1, -1) = 0\).

```java
public int altura() {
    return altura(raiz);
}

private int altura(No no) {
    if (no == null) {
        return -1;
    }
    return 1 + Math.max(altura(no.esq), altura(no.dir));
}
```

### Passo 6: percursos

**Percorrer** uma árvore é visitar todos os nós em alguma ordem. Os três percursos recursivos clássicos mudam só o momento de visitar o nó em relação às subárvores:

```java
public List<Integer> emOrdem() {
    List<Integer> saida = new ArrayList<>();
    emOrdem(raiz, saida);
    return saida;
}

private void emOrdem(No no, List<Integer> saida) {
    if (no == null) return;
    emOrdem(no.esq, saida);       // esquerda
    saida.add(no.valor);          // nó
    emOrdem(no.dir, saida);       // direita
}
```

- **Em ordem** (esquerda, nó, direita): devolve os valores **em ordem crescente**. É uma consequência direta da propriedade da BST.
- **Pré-ordem** (nó, esquerda, direita): visita o nó antes das subárvores. A raiz sai primeiro, então serve para copiar ou salvar a árvore.
- **Pós-ordem** (esquerda, direita, nó): visita o nó depois das subárvores. Os filhos saem antes do pai, útil para apagar uma árvore ou calcular algo de baixo para cima.

Para as outras duas, basta mudar a posição da linha `saida.add(no.valor)` (imports necessários: `java.util.ArrayList` e `java.util.List`). Na árvore de exemplo:

```text
em ordem:  [20, 30, 35, 40, 45, 50, 60, 70, 80]
pré-ordem: [50, 30, 20, 40, 35, 45, 70, 60, 80]
pós-ordem: [20, 35, 45, 40, 30, 60, 80, 70, 50]
```

### Passo 7: remover

Remover é a operação mais delicada, porque a árvore precisa continuar sendo uma BST. Encontramos o nó (como na busca) e então há **três casos**:

**Caso 1: o nó é folha.** Basta removê-lo (o pai passa a apontar para `null`).

**Caso 2: o nó tem um único filho.** O filho ocupa o lugar do nó. A propriedade se mantém, porque tudo na subárvore do filho já estava do lado correto do ancestral.

**Caso 3: o nó tem dois filhos.** Não dá para simplesmente tirar o nó: ficaríamos com duas subárvores soltas. A solução é substituir o valor do nó pelo seu **sucessor**, o menor valor da subárvore direita. Esse valor é maior que tudo à esquerda e menor que tudo à direita, então a propriedade continua valendo. Depois, removemos o sucessor da subárvore direita (e ele, por ser o mais à esquerda, tem no máximo um filho: cai no caso 1 ou 2).

```java
public void remove(int valor) {
    raiz = remove(raiz, valor);
}

private No remove(No no, int valor) {
    if (no == null) {
        return null;                       // valor não está na árvore
    }
    if (valor < no.valor) {
        no.esq = remove(no.esq, valor);
    } else if (valor > no.valor) {
        no.dir = remove(no.dir, valor);
    } else {
        if (no.esq == null) {              // caso 1 (folha) e caso 2 (só filho direito)
            tamanho--;
            return no.dir;
        }
        if (no.dir == null) {              // caso 2 (só filho esquerdo)
            tamanho--;
            return no.esq;
        }
        No sucessor = min(no.dir);         // caso 3: dois filhos
        no.valor = sucessor.valor;
        no.dir = remove(no.dir, sucessor.valor);
    }
    return no;
}
```

Na árvore de exemplo, removendo em sequência:

```text
remove(20)   caso 1: era folha.
             pré-ordem: [50, 30, 40, 35, 45, 70, 60, 80]

remove(30)   caso 2: só tinha o filho direito (40), que subiu.
             pré-ordem: [50, 40, 35, 45, 70, 60, 80]

remove(50)   caso 3: dois filhos. Sucessor = 60 (menor da subárvore direita).
             O valor 60 vai para a raiz e o 60 antigo é removido.
             pré-ordem: [60, 40, 35, 45, 70, 80]
```

## Análise de custo

`contains`, `add` e `remove` descem por **um único caminho**, da raiz até no máximo uma folha. O número de passos é, portanto, no máximo a **altura** \(h\) da árvore: \(O(h)\).

Tudo depende, então, de \(h\) em relação a \(n\):

- **Árvore balanceada** (os dois lados com alturas parecidas): \(h \approx \log_2 n\), e as operações custam \(O(\log n)\). Um milhão de nós, uns 20 passos.
- **Árvore degenerada**: se inserirmos valores já **ordenados** (`1, 2, 3, ..., n`), cada novo valor vai para a direita do anterior, e a árvore vira uma lista: altura \(n - 1\) e operações \(O(n)\).

```text
add(1) add(2) add(3) add(4) ...

1
 \
  2
   \
    3
     \
      4  ...   (altura = n - 1)
```

Nos meus testes, inserir `1..5000` em ordem produziu uma árvore de altura 4999. Inserindo valores em ordem aleatória, a altura esperada é \(O(\log n)\), mas não há garantia: **a BST comum não controla o próprio formato**. Em ordem de pior caso, a altura chega a \(n-1\) (e as versões recursivas desta página poderiam estourar a pilha com árvores muito grandes).

| Operação | Árvore balanceada | Pior caso (degenerada) |
|---|---|---|
| `contains`, `add`, `remove` | \(O(\log n)\) | \(O(n)\) |
| `min`, `max` | \(O(\log n)\) | \(O(n)\) |
| percursos | \(O(n)\) | \(O(n)\) |

A solução para o pior caso é uma árvore que **se reorganiza** para manter a altura pequena. É exatamente o que a [árvore AVL](../avl/) faz.

## Exercícios

1. Insira, nessa ordem, `8, 3, 10, 1, 6, 14, 4, 7, 13`. Desenhe a árvore e dê os percursos pré-ordem e em ordem, além da altura.
2. Remova o `3` da árvore do exercício anterior. Qual caso de remoção é esse e como fica a pré-ordem?
3. Em que ordem podemos inserir `1, 2, 3, 4, 5, 6, 7` para obter uma árvore de altura mínima?
4. Escreva um método `int contaFolhas()` recursivo.

{{< details title="Gabarito" >}}
1. A árvore fica:

   ```text
              8
            /   \
           3     10
          / \      \
         1   6      14
            / \    /
           4   7  13
   ```

   Pré-ordem: `[8, 3, 1, 6, 4, 7, 10, 14, 13]`. Em ordem: `[1, 3, 4, 6, 7, 8, 10, 13, 14]` (sempre crescente). Altura: 3.
2. O `3` tem dois filhos (1 e 6): é o **caso 3**. O sucessor é o menor valor da subárvore direita, o `4`. O `4` ocupa o lugar do `3` e o `4` antigo (uma folha) é removido. Nova pré-ordem: `[8, 4, 1, 6, 7, 10, 14, 13]`.
3. Insira primeiro o valor do meio (que vira a raiz) e depois, em cada metade, o valor do meio dela, e assim por diante: por exemplo `4, 2, 6, 1, 3, 5, 7`, que dá altura 2. Já `1, 2, 3, 4, 5, 6, 7` dá altura 6.
4. Uma folha é um nó sem filhos:

   ```java
   public int contaFolhas() {
       return contaFolhas(raiz);
   }

   private int contaFolhas(No no) {
       if (no == null) return 0;
       if (no.esq == null && no.dir == null) return 1;
       return contaFolhas(no.esq) + contaFolhas(no.dir);
   }
   ```
{{< /details >}}

{{< quiz titulo="Árvore binária de busca" >}}

{{< questao >}}
Qual percurso de uma BST devolve os valores em ordem crescente?

- [ ] Pré-ordem
- [x] Em ordem
- [ ] Pós-ordem
- [ ] Nenhum: a BST não guarda ordem
---
O percurso em ordem visita a subárvore esquerda (menores), depois o nó, depois a direita (maiores).
{{< /questao >}}

{{< questao >}}
Qual é o custo de `add` em uma BST em que os valores foram inseridos já em ordem crescente?

- [ ] \(O(1)\)
- [ ] \(O(\log n)\)
- [x] \(O(n)\)
- [ ] \(O(n^2)\)
---
Cada valor vai para a direita do anterior, e a árvore vira uma lista de altura \(n-1\). Como o custo é \(O(h)\), cada inserção percorre o caminho todo.
{{< /questao >}}

{{< questao >}}
Ao remover um nó com dois filhos, por que o sucessor (menor valor da subárvore direita) é um bom substituto?

- [ ] Porque é sempre uma folha.
- [x] Porque é maior que tudo na subárvore esquerda e menor que o restante da direita, mantendo a propriedade da BST.
- [ ] Porque está sempre na raiz.
- [ ] Porque evita ter que remover mais algum nó.
---
O sucessor pode ter um filho direito, então ele nem sempre é folha, mas sempre tem no máximo um filho e cai nos casos simples de remoção.
{{< /questao >}}

{{< /quiz >}}

## Resumo

- Em uma BST, para todo nó: esquerda menor, direita maior.
- Busca, inserção e remoção descem por um caminho só e custam \(O(h)\), em que \(h\) é a altura.
- O percurso **em ordem** devolve os valores ordenados.
- A remoção tem três casos: folha, um filho e dois filhos (substitui pelo sucessor).
- Balanceada: \(h \approx \log n\). Mas inserções em ordem degeneram a árvore em uma lista, com \(h = n - 1\).
- Para garantir \(O(\log n)\), é preciso uma árvore autobalanceada, como a AVL.

## Para estudar mais

- [Árvores Binárias de Pesquisa](http://joaoarthurbm.github.io/eda/posts/bst) — João Arthur Brunet (2019)
