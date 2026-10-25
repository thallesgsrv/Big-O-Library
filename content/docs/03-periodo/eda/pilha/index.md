---
title: Pilha
weight: 10
description: Contrato LIFO e implementação de uma pilha com array.
autores:
    - thallesgsrv
date: 2026-10-25
---

## Sobre

Pensa numa pilha de pratos: você coloca um prato em cima e, quando vai pegar um, pega justamente o que está no topo. O último que entrou é o primeiro que sai. Esse comportamento é chamado **LIFO**, do inglês *Last In, First Out*.

Na estrutura de dados é a mesma ideia: a gente adiciona e remove pelo **topo**. As operações principais são `push`, para colocar um elemento, e `pop`, para remover e devolver o elemento que está no topo. Não dá para tirar direto um elemento do meio.

## Onde pode ser usado?

Um exemplo fácil é o desfazer de um editor: cada ação fica guardada, e o `Ctrl + Z` desfaz primeiro a ação mais recente. O botão de voltar do navegador segue uma lógica parecida. E quando uma função chama outra, o programa também usa uma pilha para saber qual chamada precisa terminar primeiro.

## Representação com array

Vou montar uma pilha simples com um array de capacidade fixa, que guarda `String`. O array reserva o espaço; `topo` marca o índice do último elemento que realmente está na pilha.

```java
public class Pilha {
    private int topo;
    private final String[] elementos;

    public Pilha(int capacidade) {
        elementos = new String[capacidade];
        topo = -1;
    }
}
```

Começo com `topo = -1` porque ainda não tem nenhum elemento. Quando `topo` vale `0`, temos um elemento; quando vale `2`, temos três. Então o tamanho da pilha é `topo + 1`.

Repara também que o array e a pilha não são a mesma coisa. A pilha vai do índice `0` até `topo`; o que estiver depois disso não faz parte dela, mesmo que ainda tenha algum valor guardado no array.

## Operações

Vou mostrar cada método separado. Assim fica mais fácil acompanhar o que muda no array e no `topo`.

### Verificar se está vazia

Como o `topo` começa em `-1`, basta conferir se ele ainda está nesse valor. Esse método vai ser útil antes de remover ou consultar o topo.

```java
public boolean isEmpty() {
    return topo == -1;
}
```

Se retornar `true`, não tem nada para remover. Simples assim.

### Verificar se está cheia

Como o array tem capacidade fixa, também precisamos saber se ainda cabe algum elemento. O último índice disponível é `elementos.length - 1`.

```java
public boolean isFull() {
    return topo == elementos.length - 1;
}
```

Se `topo` chegou nesse último índice, não dá para fazer outro `push` nessa versão da pilha.

### Consultar o tamanho

O tamanho é o índice do topo mais um. O `+ 1` é necessário porque os índices começam em zero: topo `0` significa tamanho `1`.

```java
public int size() {
    return topo + 1;
}
```

### Push

O `push` coloca um elemento no topo. Primeiro verifico se a pilha está cheia; se não estiver, avanço o `topo` e guardo o elemento nessa posição.

```java
public void push(String elemento) {
    if (isFull()) {
        throw new IllegalStateException("Pilha cheia");
    }

    elementos[++topo] = elemento;
}
```

Esse `++topo` acontece antes de usar o índice. Como o topo começa em `-1`, o primeiro elemento vai para a posição `0`.

Com capacidade 3, por exemplo, fica assim:

```text
elementos = [null, null, null]   topo = -1   pilha vazia
push("a")
elementos = ["a", null, null]   topo = 0
push("b")
elementos = ["a", "b", null]   topo = 1
push("c")
elementos = ["a", "b", "c"]   topo = 2   pilha cheia
```

Se tentarmos adicionar um quarto elemento, o método lança uma exceção. Escolhi deixar a capacidade fixa aqui para a implementação ficar mais direta; depois dá para mudar o `push` para aumentar o array quando ele encher.

### Pop

O `pop` remove e devolve o elemento do topo. Primeiro guardo esse elemento, depois limpo a posição e diminuo o topo.

```java
public String pop() {
    if (isEmpty()) {
        throw new NoSuchElementException("Pilha vazia");
    }

    String elemento = elementos[topo];
    elementos[topo] = null;
    topo--;
    return elemento;
}
```

Se a pilha estiver vazia, não existe elemento para devolver, então o método lança uma exceção. Para usar `NoSuchElementException`, precisamos deste import no começo do arquivo:

```java
import java.util.NoSuchElementException;
```

Olha o que acontece ao remover `"c"`:

```text
antes:  elementos = ["a", "b", "c"]   topo = 2
pop() devolve "c"
depois: elementos = ["a", "b", null]   topo = 1
```

Mesmo que a gente não limpasse a posição, `"c"` já estaria fora da pilha porque o topo voltou para `1`. Eu limpo com `null` para deixar o array mais fácil de visualizar.

### Peek

Às vezes a gente só quer saber quem está no topo, sem remover. Para isso existe `peek`:

```java
public String peek() {
    if (isEmpty()) {
        throw new NoSuchElementException("Pilha vazia");
    }

    return elementos[topo];
}
```

Assim como no `pop`, confiro se está vazia. A diferença é que aqui só devolvo o valor: não altero o topo nem o array.

## Usando a pilha

```java
Pilha historico = new Pilha(3);
historico.push("abrir documento");
historico.push("escrever título");

System.out.println(historico.peek()); // escrever título
System.out.println(historico.pop());  // escrever título
System.out.println(historico.pop());  // abrir documento
System.out.println(historico.isEmpty()); // true
```

Cada `pop` desfaz a ação mais recente primeiro, que é exatamente a política LIFO.

## Juntando as operações

Agora dá para usar os métodos em sequência:

```java
Pilha historico = new Pilha(3);
historico.push("abrir documento");
historico.push("escrever título");

System.out.println(historico.peek()); // escrever título
System.out.println(historico.pop());  // escrever título
System.out.println(historico.pop());  // abrir documento
System.out.println(historico.isEmpty()); // true
```

O `peek` só mostra o elemento mais recente. Depois, cada `pop` remove uma ação, começando pela última que entrou.

## Análise de custo

Esses métodos só leem ou alteram alguns valores, sem percorrer o array. Por isso, `push`, `pop`, `peek`, `isEmpty`, `isFull` e `size` custam \(O(1)\). O array ocupa \(O(c)\) de memória, em que `c` é a capacidade escolhida no construtor.

Só lembra que essa versão tem capacidade fixa: se encher, `push` lança uma exceção. Uma pilha que cresce automaticamente também é possível, mas aí precisamos redimensionar e copiar o array.

## Exercícios

1. Para uma pilha de capacidade 4, acompanhe o conteúdo e o valor de `topo` após cada operação: `push("a")`, `push("b")`, `pop()`, `push("c")`, `peek()`, `pop()`.
2. O que acontece se `pop()` ou `peek()` forem chamados em uma pilha vazia? E se `push` for chamado em uma pilha cheia?
3. Implemente um método `clear()` que remova todos os elementos da pilha.

{{< details title="Gabarito" >}}
1. Os estados são: `["a", null, null, null]`, topo `0`; `["a", "b", null, null]`, topo `1`; depois do `pop`, topo `0`; depois do `push("c")`, `["a", "c", null, null]`, topo `1`; `peek()` devolve `"c"` sem mudar o estado; o último `pop()` devolve `"c"` e deixa topo `0`.
2. `pop` e `peek` lançam `NoSuchElementException`; `push` em uma pilha cheia lança `IllegalStateException`.
3. Uma solução é limpar as posições de `0` até `topo` e, ao final, definir `topo = -1`.
{{< /details >}}

## Resumo

- Pilha segue LIFO: o último elemento inserido é o primeiro removido.
- `topo` delimita a região ocupada; `-1` representa a pilha vazia.
- `push` insere, `pop` remove e devolve, e `peek` consulta sem remover.
- Nesta implementação com array fixo, operações básicas custam \(O(1)\); inserir cheia ou remover/consultar vazia gera exceção.

## Para estudar mais

- [Pilhas (LIFO) baseadas em Arrays](https://joaoarthurbm.github.io/eda/posts/lifoarray/) — João Arthur Brunet

