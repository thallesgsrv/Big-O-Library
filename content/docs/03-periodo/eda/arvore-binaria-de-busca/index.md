---
title: Árvore binária de busca
weight: 19
description: Busca, inserção e remoção em uma árvore ordenada; percursos, altura e o risco de degenerar.
autores:
  - thallesgsrv
date: 2026-10-31
---

## Sobre

Vamos fazer um balanço do que temos até aqui, porque cada estrutura tem um defeito de personalidade:

- o **array ordenado** busca em \(O(\log n)\), mas inserir e remover custa \(O(n)\), por causa dos deslocamentos;
- a **lista encadeada** insere e remove com facilidade, mas buscar é \(O(n)\);
- a **tabela hash** é rápida, mas não guarda ordem.

Dá para ter o melhor dos três? A **árvore binária de busca** (BST, de *binary search tree*) é a tentativa: buscar, inserir e remover em \(O(\log n)\) **mantendo tudo ordenado**. A ideia é pegar a lógica da busca binária e embuti-la na própria forma da estrutura. Em vez de *calcular* o meio do array, o meio está na raiz, e cada comparação já te manda para o lado certo.

## Vocabulário de árvores (rapidinho)

Uma árvore é feita de **nós** ligados. Em uma árvore binária, cada nó tem **no máximo dois filhos**. Pense em uma árvore genealógica de cabeça para baixo.

- **Raiz**: o nó do topo, o único sem pai.
- **Filhos** (esquerdo e direito) e **pai**: quem está logo abaixo e logo acima.
- **Folha**: nó sem filhos.
- **Subárvore**: um nó e tudo que está pendurado nele. E o detalhe bonito: toda subárvore é, ela mesma, uma árvore. Guarda isso, porque é por causa disso que a recursão funciona tão bem aqui.
- **Altura** de um nó: número de arestas no caminho mais longo até uma folha. Aqui, folha tem altura 0 e a árvore vazia tem altura \(-1\). A altura da árvore é a da raiz.

## A regra que manda em tudo

Para **todo nó** da árvore:

- todos os valores da subárvore **esquerda** são **menores** que o nó;
- todos os valores da subárvore **direita** são **maiores** que o nó.

Vou tratar valores distintos (sem repetição). Esta aqui é uma BST:

```text
            50
          /    \
        30      70
       /  \    /  \
     20   40  60   80
         /  \
       35    45
```

Com essa regra, procurar vira um jogo de "mais alto ou mais baixo". Procurando o 45: é menor que 50, vai para a esquerda. É maior que 30, direita. Maior que 40, direita. Achou. Cada comparação **descartou uma subárvore inteira**, igual a busca binária descartando metade do array.

## Construindo a árvore

### Passo 1: o nó e a árvore

Cada nó guarda o valor e a referência para os dois filhos. A árvore só precisa conhecer a raiz (o resto, ela alcança a partir dali).

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

Começa na raiz e, a cada passo, escolhe o lado pela comparação. Chegou a `null`? O valor não está lá.

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

Aqui tem uma sacada boa: inserir é só **buscar até cair num `null`**, e é exatamente ali que o novo nó deve morar. Escrevo de forma recursiva, em que cada chamada devolve a raiz da subárvore já atualizada. Assim a ligação com o pai se refaz sozinha, sem a gente precisar guardar "quem é o pai".

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

Inserindo `50, 30, 70, 20, 40, 60, 80, 35, 45`, nessa ordem, saímos com a árvore desenhada lá em cima. Acompanha o `35`: menor que 50 (esquerda), maior que 30 (direita), menor que 40 (esquerda), subárvore vazia. O `35` vira filho esquerdo do `40`.

A raiz é sempre o **primeiro** valor inserido, e a forma da árvore depende da **ordem** de inserção. Guarda essa observação com carinho, porque ela vai dar problema daqui a pouco.

### Passo 4: mínimo e máximo

O menor está sempre no nó mais à esquerda; o maior, no mais à direita. É só descer sempre pelo mesmo lado, sem comparar nada.

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

A altura de um nó é 1 mais a maior altura entre os filhos. A árvore vazia vale \(-1\), o que faz a folha valer \(1 + \max(-1, -1) = 0\).

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

### Passo 6: percursos (visitar todo mundo)

**Percorrer** é visitar todos os nós em alguma ordem. Os três clássicos mudam só o **momento** de visitar o nó em relação às subárvores:

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

- **Em ordem** (esquerda, nó, direita): devolve os valores **em ordem crescente**. Não é coincidência, é a regra da BST aparecendo: tudo à esquerda é menor, então sai primeiro.
- **Pré-ordem** (nó, esquerda, direita): visita o nó *antes* dos filhos. A raiz sai primeiro, ótimo para copiar ou salvar a árvore.
- **Pós-ordem** (esquerda, direita, nó): visita o nó *depois* dos filhos. Bom para apagar uma árvore ou calcular algo de baixo para cima.

Para as outras duas, basta mudar a posição da linha `saida.add(no.valor)` (imports: `java.util.ArrayList` e `java.util.List`). Na árvore de exemplo:

```text
em ordem:  [20, 30, 35, 40, 45, 50, 60, 70, 80]
pré-ordem: [50, 30, 20, 40, 35, 45, 70, 60, 80]
pós-ordem: [20, 35, 45, 40, 30, 60, 80, 70, 50]
```

### Passo 7: remover (o chefão da fase)

Remover é a parte delicada, porque a árvore precisa **continuar sendo uma BST** depois. Acha o nó (como na busca) e então são **três casos**:

**Caso 1: o nó é folha.** Moleza. Tira, e o pai aponta para `null`.

**Caso 2: o nó tem um único filho.** O filho sobe e ocupa o lugar. A regra continua valendo, porque tudo na subárvore dele já estava do lado certo dos ancestrais.

**Caso 3: o nó tem dois filhos.** Aqui é que complica: se você só tirar o nó, sobram duas subárvores soltas sem ter onde pendurar. A saída esperta é **substituir o valor do nó pelo seu sucessor**: o menor valor da subárvore direita. Pensa bem: esse valor é maior que tudo à esquerda e menor que tudo o que sobra à direita. É o candidato perfeito para ocupar o trono sem quebrar a regra. Depois removemos o sucessor lá da direita (e como ele é o mais à esquerda, tem no máximo um filho: cai no caso 1 ou 2).

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

## Quanto custa?

`contains`, `add` e `remove` descem por **um único caminho**, da raiz até no máximo uma folha. O número de passos é, no máximo, a **altura** \(h\) da árvore: \(O(h)\).

Ou seja, tudo depende de como \(h\) se compara a \(n\):

- **Árvore balanceada** (os dois lados com alturas parecidas): \(h \approx \log_2 n\), e as operações custam \(O(\log n)\). Um milhão de nós, uns 20 passos. Lindo.
- **Árvore degenerada**: se você inserir valores já **ordenados** (`1, 2, 3, ..., n`), cada novo valor vai para a direita do anterior, e a árvore vira uma lista torta: altura \(n - 1\), operações \(O(n)\).

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

Nos meus testes, inserir `1..5000` em ordem produziu uma árvore de altura 4999. Uma "árvore" que é só um corredor. Com inserções em ordem aleatória, a altura esperada é \(O(\log n)\), mas **não há garantia**: a BST comum não controla o próprio formato, e ainda pode estourar a pilha de recursão com árvores muito grandes.

| Operação | Balanceada | Pior caso (degenerada) |
|---|---|---|
| `contains`, `add`, `remove` | \(O(\log n)\) | \(O(n)\) |
| `min`, `max` | \(O(\log n)\) | \(O(n)\) |
| percursos | \(O(n)\) | \(O(n)\) |

Então, qual o remédio? Uma árvore que **se arruma sozinha** para manter a altura pequena. Esse é o papel da [árvore AVL](../avl/), e é a próxima parada.

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
2. O `3` tem dois filhos (1 e 6): **caso 3**. O sucessor é o menor da subárvore direita, o `4`. O `4` ocupa o lugar do `3` e o `4` antigo (uma folha) é removido. Nova pré-ordem: `[8, 4, 1, 6, 7, 10, 14, 13]`.
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
Qual o custo de `add` em uma BST em que os valores foram inseridos já em ordem crescente?

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
- [x] Porque é maior que tudo na subárvore esquerda e menor que o restante da direita, mantendo a regra da BST.
- [ ] Porque está sempre na raiz.
- [ ] Porque evita ter que remover mais algum nó.
---
O sucessor pode ter um filho direito, então nem sempre é folha, mas sempre tem no máximo um filho e cai nos casos simples de remoção.
{{< /questao >}}

{{< /quiz >}}

## Resumo

- Em uma BST, para todo nó: esquerda menor, direita maior.
- Busca, inserção e remoção descem por um caminho só e custam \(O(h)\).
- O percurso **em ordem** devolve os valores ordenados.
- Remoção: três casos (folha, um filho, dois filhos com troca pelo sucessor).
- Balanceada: \(h \approx \log n\). Mas inserir em ordem degenera a árvore numa lista, com \(h = n - 1\).
- Para garantir \(O(\log n)\), é preciso uma árvore autobalanceada, como a AVL.

## Para estudar mais

- [Árvores Binárias de Pesquisa](http://joaoarthurbm.github.io/eda/posts/bst) — João Arthur Brunet (2019)
