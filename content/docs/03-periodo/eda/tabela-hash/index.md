---
title: Tabela hash
weight: 18
description: Busca, inserção e remoção em O(1) médio, com função de hash, encadeamento e sondagem linear.
autores:
  - thallesgsrv
date: 2026-10-31
---

## Sobre

Imagina uma biblioteca sem catálogo e sem estantes organizadas. Você quer o livro "Dom Casmurro". O que faz? Anda pelas prateleiras olhando lombada por lombada. É a busca em lista: \(O(n)\).

Agora imagina que a biblioteca é organizada por ordem alfabética. Dá para fazer busca binária, \(O(\log n)\), mas toda vez que chega um livro novo é preciso abrir espaço no meio da estante: \(O(n)\).

E se existisse uma mágica que, dado o **nome do livro**, te dissesse **na hora** em qual prateleira ele está? Sem procurar, sem comparar. Essa mágica é a **tabela hash**, e ela é a estrutura por trás de `HashMap`, `HashSet`, dos dicionários do Python e dos objetos do JavaScript. Buscar, inserir e remover em \(O(1)\) **em média**.

Spoiler: a mágica tem um truque, e o truque tem um defeito. Os dois são a graça desta página.

## Ideia 1: usar a própria chave como índice

Se as chaves fossem números pequenos, seria trivial: um array, e o valor da chave `7` mora em `v[7]`. Buscar, inserir e remover em \(O(1)\). Isso se chama **endereçamento direto**.

O problema é que as chaves reais são strings, CPFs, ids gigantes. Um array com uma posição para cada CPF possível teria \(10^{11}\) posições, quase todas vazias. Seria uma biblioteca do tamanho de um país para guardar 500 livros.

## Ideia 2: a função de hash

A saída é **converter a chave em um índice de um array pequeno**. Essa conversão é a **função de hash**, em dois passos:

1. transformar a chave em um número inteiro (o *hash code*);
2. encolher esse número para caber no array, com o resto da divisão: `número % capacidade`.

Uma boa função de hash é **determinística** (mesma chave, mesmo índice, sempre), **rápida**, e **espalha** bem as chaves, sem amontoar todo mundo no mesmo canto.

Para ver o que é uma função *ruim*, vamos tentar a ideia mais ingênua: somar os códigos dos caracteres. Com capacidade 8:

```text
"amor" -> soma 431 -> 431 % 8 = 7
"roma" -> soma 431 -> 431 % 8 = 7
"mora" -> soma 431 -> 431 % 8 = 7
```

Todo anagrama cai no mesmo lugar, porque somar não liga para a ordem das letras. É como numerar prateleiras pela soma das letras do título: "Roma" e "Amor" brigariam pela mesma prateleira o tempo todo.

A melhoria é o **hash polinomial**: a cada caractere, multiplica o acumulado por uma constante (31 é a clássica) antes de somar. Assim a **posição** de cada letra faz diferença:

```java
private int indice(String chave, int capacidade) {
    int h = 0;
    for (int i = 0; i < chave.length(); i++) {
        h = 31 * h + chave.charAt(i);
    }
    return (h & 0x7fffffff) % capacidade;
}
```

Um detalhe importante: a conta pode estourar o `int` e dar **negativo**, e índice negativo derruba o programa. A máscara `& 0x7fffffff` zera o bit de sinal e garante um número não negativo antes do `%`. (É a mesma fórmula do `String.hashCode()` do Java.)

Com capacidade 8, alguns exemplos:

```text
"ana"  -> 96724   -> índice 4
"bia"  -> 97530   -> índice 2
"caio" -> 3045892 -> índice 4    <- mesmo índice de "ana"
"dani" -> 3075832 -> índice 0
"eva"  -> 100816  -> índice 0    <- mesmo índice de "dani"
```

Percebeu? `"ana"` e `"caio"` caíram no **mesmo índice 4**. Isso tem nome.

## Colisões: o defeito do truque

Duas chaves diferentes que caem no mesmo índice formam uma **colisão**. E não adianta se esforçar: elas são **inevitáveis**. Existem muito mais chaves possíveis do que posições, e, pelo princípio da casa dos pombos, se você tem mais pombos que casinhas, dois vão acabar dividindo uma.

Então a pergunta que define uma tabela hash não é "como evitar colisões", e sim **"o que fazer quando elas acontecem?"**. Existem duas respostas clássicas.

## Estratégia A: encadeamento separado

A ideia: cada posição do array (chamada de **balde**) guarda uma **lista encadeada** com todas as chaves que caíram ali. Colidiu? Entra na fila do balde. É um prédio onde cada andar tem uma sala de espera.

### Passo 1: o nó e a estrutura

```java
public class TabelaHash {

    private static class No {
        final String chave;
        int valor;
        No proximo;

        No(String chave, int valor, No proximo) {
            this.chave = chave;
            this.valor = valor;
            this.proximo = proximo;
        }
    }

    private static final double FATOR_MAXIMO = 0.75;

    private No[] baldes;
    private int tamanho;

    public TabelaHash() {
        this(8);
    }

    public TabelaHash(int capacidade) {
        baldes = new No[capacidade];
    }

    // indice(...) é o método da seção anterior

    public int size() {
        return tamanho;
    }
}
```

`baldes[i]` é a cabeça da lista do balde `i` (ou `null`, se está vazio). O `FATOR_MAXIMO` a gente usa já já, no redimensionamento.

### Passo 2: get

Calculamos o balde e percorremos a lista dele comparando as chaves com `equals`. Comparamos a **chave** e não só o índice, porque vários moram no mesmo balde.

```java
public Integer get(String chave) {
    int i = indice(chave, baldes.length);
    for (No atual = baldes[i]; atual != null; atual = atual.proximo) {
        if (atual.chave.equals(chave)) {
            return atual.valor;
        }
    }
    return null;
}
```

Devolvo `Integer` (e não `int`) para poder responder `null` quando a chave não existe.

### Passo 3: put

Se a chave já existe, só atualiza o valor. Se não, cria um nó novo. E inserimos **no início** do balde, que é \(O(1)\): sem percorrer até o fim.

```java
public void put(String chave, int valor) {
    int i = indice(chave, baldes.length);
    for (No atual = baldes[i]; atual != null; atual = atual.proximo) {
        if (atual.chave.equals(chave)) {
            atual.valor = valor;      // chave repetida: só atualiza
            return;
        }
    }
    baldes[i] = new No(chave, valor, baldes[i]);   // novo nó vira a cabeça
    tamanho++;
    if ((double) tamanho / baldes.length > FATOR_MAXIMO) {
        redimensiona(baldes.length * 2);
    }
}
```

Inserindo `"ana"`, `"bia"`, `"caio"`, `"dani"` e `"eva"` (nessa ordem) numa tabela de capacidade 8:

```text
balde 0:  eva -> dani
balde 1:  (vazio)
balde 2:  bia
balde 3:  (vazio)
balde 4:  caio -> ana
balde 5:  (vazio)
balde 6:  (vazio)
balde 7:  (vazio)
```

As colisões ficaram guardadas nas listas dos baldes `0` e `4`, e cada novo nó entra na frente.

### Passo 4: remove

É a remoção de uma lista encadeada: precisamos do nó **anterior** para religar o ponteiro.

```java
public Integer remove(String chave) {
    int i = indice(chave, baldes.length);
    No anterior = null;
    for (No atual = baldes[i]; atual != null; atual = atual.proximo) {
        if (atual.chave.equals(chave)) {
            if (anterior == null) {
                baldes[i] = atual.proximo;       // era a cabeça do balde
            } else {
                anterior.proximo = atual.proximo;
            }
            tamanho--;
            return atual.valor;
        }
        anterior = atual;
    }
    return null;
}
```

### Passo 5: fator de carga e redimensionamento

Se a tabela só ganhasse chaves e o array continuasse pequeno, as listas ficariam enormes e a busca voltaria a ser \(O(n)\). Precisamos de um termômetro de "quão cheia está a tabela", o **fator de carga**:

$$
\alpha = \frac{n}{m}
$$

em que \(n\) é o número de chaves guardadas e \(m\) é o número de baldes. Se as chaves se espalham bem, cada lista tem em média \(\alpha\) elementos, e uma busca custa em média \(O(1 + \alpha)\).

A estratégia é manter \(\alpha\) sob controle: passou de 0,75? **Dobra a capacidade**, igual ao [ArrayList](../arraylist/). Só que aqui tem uma pegadinha que derruba muita gente: o índice depende da capacidade (`% capacidade`), então **não basta copiar**. É preciso recalcular o índice de cada chave para a tabela nova. Esse recálculo se chama *rehash*.

```java
private void redimensiona(int novaCapacidade) {
    No[] novos = new No[novaCapacidade];
    for (No inicio : baldes) {
        No atual = inicio;
        while (atual != null) {
            No proximo = atual.proximo;                 // guarda antes de mexer
            int i = indice(atual.chave, novaCapacidade);
            atual.proximo = novos[i];                   // reaproveita o nó
            novos[i] = atual;
            atual = proximo;
        }
    }
    baldes = novos;
}
```

Repara que reaproveitamos os nós em vez de criar novos. E guardar `proximo` **antes** de religar é essencial: se a gente mexe em `atual.proximo` primeiro, perde o resto da lista, como cortar o galho em que você está sentado.

### Exemplo prático: contando palavras

Uma aplicação clássica: quantas vezes cada palavra aparece em um texto.

```java
TabelaHash contagem = new TabelaHash();
String texto = "a casa e a casa grande e a casa";

for (String palavra : texto.split(" ")) {
    Integer vezes = contagem.get(palavra);
    contagem.put(palavra, vezes == null ? 1 : vezes + 1);
}

System.out.println(contagem.get("casa"));    // 3
System.out.println(contagem.get("a"));       // 3
System.out.println(contagem.get("e"));       // 2
System.out.println(contagem.get("grande"));  // 1
System.out.println(contagem.get("zzz"));     // null
```

## Estratégia B: endereçamento aberto

Resposta diferente para a mesma pergunta: **sem listas**. Todos os pares ficam dentro do próprio array. Se o lugar do seu índice está ocupado, você procura outro. Na **sondagem linear**, tenta a posição seguinte, depois a outra, e assim por diante, voltando ao início quando passa do fim (`(i + 1) % capacidade`). É chegar no estacionamento e a sua vaga favorita estar ocupada: você vai seguindo em frente até achar uma livre.

Para **buscar**, o caminho é o mesmo: começa no índice da chave e anda até achar a chave ou dar de cara com uma posição **vazia** (aí você sabe que ela não está na tabela, porque senão teria estacionado ali).

### O problema da remoção (a pegadinha)

Imagina que `A`, `B` e `C` têm todas índice 3 e acabaram nas posições 3, 4 e 5. Agora você remove o `B` esvaziando a posição 4. E aí procura o `C`: começa em 3 (é o `A`), anda para 4... **vazio!** "Ah, então o `C` não existe." Errado. O `C` está logo ali, mas o buraco enganou a busca.

A solução é um terceiro estado, **removido**, a "lápide": a posição não tem mais chave, mas a busca **continua passando** por ela. Cada posição passa a ter um estado: `VAZIO`, `OCUPADO` ou `REMOVIDO`.

```java
public class TabelaHashSondagem {
    private static final byte VAZIO = 0;
    private static final byte OCUPADO = 1;
    private static final byte REMOVIDO = 2;

    private String[] chaves;
    private int[] valores;
    private byte[] estados;
    private int tamanho;   // posições OCUPADO
    private int usadas;    // posições OCUPADO + REMOVIDO

    public TabelaHashSondagem() {
        this(8);
    }

    public TabelaHashSondagem(int capacidade) {
        chaves = new String[capacidade];
        valores = new int[capacidade];
        estados = new byte[capacidade];
    }

    private int indice(String chave) {
        int h = 0;
        for (int i = 0; i < chave.length(); i++) {
            h = 31 * h + chave.charAt(i);
        }
        return (h & 0x7fffffff) % chaves.length;
    }
}
```

O `usadas` conta também as lápides, porque elas continuam ocupando espaço na sondagem.

### Busca

Um método auxiliar devolve a posição da chave (ou `-1`). Ele só para ao encontrar `VAZIO`; `REMOVIDO` é atravessado.

```java
private int busca(String chave) {
    int i = indice(chave);
    while (estados[i] != VAZIO) {
        if (estados[i] == OCUPADO && chaves[i].equals(chave)) {
            return i;
        }
        i = (i + 1) % chaves.length;
    }
    return -1;
}

public Integer get(String chave) {
    int i = busca(chave);
    return i == -1 ? null : valores[i];
}
```

Esse laço sempre termina, porque a tabela nunca fica cheia (olha o `put`): sempre sobra pelo menos uma posição `VAZIO`.

### put e remove

No `put`, primeiro vemos se a chave já existe. Se não, garantimos espaço e procuramos a primeira posição livre. Aqui mantenho a carga em no máximo 0,5, porque a sondagem linear degrada rápido quando enche: os elementos formam grandes blocos contínuos (os *agrupamentos*), e cada colisão aumenta o bloco, que atrai mais colisões. É um engarrafamento que se alimenta.

```java
public void put(String chave, int valor) {
    int existente = busca(chave);
    if (existente != -1) {
        valores[existente] = valor;
        return;
    }
    if ((usadas + 1) * 2 > chaves.length) {
        redimensiona(chaves.length * 2);
    }
    int i = indice(chave);
    while (estados[i] == OCUPADO) {
        i = (i + 1) % chaves.length;
    }
    if (estados[i] == VAZIO) {
        usadas++;                 // reaproveitar uma lápide não aumenta 'usadas'
    }
    chaves[i] = chave;
    valores[i] = valor;
    estados[i] = OCUPADO;
    tamanho++;
}

public Integer remove(String chave) {
    int i = busca(chave);
    if (i == -1) {
        return null;
    }
    int valor = valores[i];
    chaves[i] = null;
    estados[i] = REMOVIDO;        // lápide: a busca continua passando por aqui
    tamanho--;
    return valor;
}
```

O `redimensiona` reinsere só as posições `OCUPADO` em arrays novos (e as lápides desaparecem de bônus):

```java
private void redimensiona(int novaCapacidade) {
    String[] antigasChaves = chaves;
    int[] antigosValores = valores;
    byte[] antigosEstados = estados;

    chaves = new String[novaCapacidade];
    valores = new int[novaCapacidade];
    estados = new byte[novaCapacidade];
    tamanho = 0;
    usadas = 0;

    for (int i = 0; i < antigasChaves.length; i++) {
        if (antigosEstados[i] == OCUPADO) {
            put(antigasChaves[i], antigosValores[i]);
        }
    }
}
```

## Qual escolher?

| | Encadeamento separado | Endereçamento aberto |
|---|---|---|
| Onde ficam as colisões | em listas fora do array | no próprio array |
| Fator de carga | pode passar de 1 | precisa ficar abaixo de 1 |
| Remoção | simples | exige lápides |
| Cache | pior (nós espalhados) | melhor (tudo contíguo) |

## Duas armadilhas clássicas

**`equals` e `hashCode` precisam combinar.** Se duas chaves são iguais pelo `equals`, elas **têm** que produzir o mesmo hash. Se você usa um objeto seu como chave de um `HashMap` e sobrescreve só o `equals`, a busca falha de formas misteriosas: a chave "igual" cai em outro balde e nunca é encontrada. Já perdeu uma tarde de debug por causa disso? Vai perder.

**Chave mutável.** Se você altera um objeto *depois* de usá-lo como chave, o hash dele muda, e a tabela nunca mais o encontra onde o guardou. É como mudar de casa sem avisar o correio.

## Quanto custa?

| Operação | Caso médio | Pior caso |
|---|---|---|
| `get`, `put`, `remove` | \(O(1)\) | \(O(n)\) |

O pior caso acontece quando todas as chaves colidem no mesmo balde (ou no mesmo agrupamento): a tabela vira uma lista com roupa de hash. Com uma boa função de hash e o fator de carga controlado pelo redimensionamento, isso é raro e o custo médio é constante. O `put` que dispara o redimensionamento custa \(O(n)\), mas, como no ArrayList, isso fica cada vez mais raro, e o custo amortizado continua \(O(1)\).

E o que a gente paga pela velocidade? **A tabela não guarda ordem.** Não dá para pegar o menor elemento, o próximo maior, ou percorrer em ordem crescente sem ordenar tudo. Para isso existem as árvores, que vêm logo depois.

## Exercícios

1. Uma tabela com 7 posições usa \(h(k) = k \bmod 7\) e **sondagem linear**. Insira, nessa ordem, as chaves 10, 17, 24, 3 e 8. Desenhe o array final.
2. Na tabela do exercício anterior, remova a chave 17 **apenas esvaziando a posição**. O que acontece ao buscar a chave 24? Como as lápides resolvem?
3. Por que o `redimensiona` do encadeamento recalcula o índice de cada chave, em vez de copiar cada balde para a mesma posição da tabela nova?
4. Qual o problema de usar a soma dos códigos dos caracteres como função de hash para palavras?

{{< details title="Gabarito" >}}
1. \(10 \bmod 7 = 3\): vai para a posição 3. \(17 \bmod 7 = 3\): ocupada, tenta 4. \(24 \bmod 7 = 3\): 3 e 4 ocupadas, vai para 5. \(3 \bmod 7 = 3\): 3, 4 e 5 ocupadas, vai para 6. \(8 \bmod 7 = 1\): posição 1 livre. Array final (posições 0 a 6): `[_, 8, _, 10, 17, 24, 3]`.
2. Ao buscar 24: começa na posição 3 (10, diferente), vai para 4 (agora vazia) e para, concluindo **errado** que 24 não está na tabela. Com a lápide, a posição 4 fica `REMOVIDO`, a busca atravessa e encontra 24 na posição 5.
3. Porque o índice é `hash % capacidade`: ao mudar a capacidade, a mesma chave tende a ir para outro balde. Copiar o balde para a mesma posição deixaria chaves onde a busca nunca as procuraria.
4. A soma ignora a ordem das letras, então todos os anagramas (`amor`, `roma`, `mora`) colidem. Além disso, as somas se concentram numa faixa pequena de valores, espalhando mal. O hash polinomial, com a multiplicação por 31 a cada caractere, resolve isso.
{{< /details >}}

{{< quiz titulo="Tabelas hash" >}}

{{< questao >}}
O que acontece com o custo de uma tabela hash se **todas** as chaves caírem no mesmo balde?

- [ ] Continua \(O(1)\), porque a função de hash garante isso.
- [ ] Passa a ser \(O(\log n)\).
- [x] Passa a ser \(O(n)\): a tabela vira, na prática, uma lista.
- [ ] A tabela deixa de funcionar.
---
O \(O(1)\) é **médio** e depende de as chaves se espalharem. Com todas no mesmo balde, é preciso percorrer a lista inteira.
{{< /questao >}}

{{< questao >}}
Por que o endereçamento aberto precisa de um estado `REMOVIDO`?

- [ ] Para economizar memória.
- [ ] Para poder ordenar as chaves.
- [x] Para que a busca continue passando por posições onde antes havia uma chave, sem parar cedo demais.
- [ ] Para evitar o redimensionamento.
---
Uma posição vazia no meio de uma sequência de colisões faria a busca parar antes de chegar às chaves seguintes.
{{< /questao >}}

{{< questao >}}
Qual operação uma tabela hash **não** faz de forma eficiente?

- [ ] Buscar uma chave.
- [ ] Inserir um par chave/valor.
- [x] Percorrer as chaves em ordem crescente.
- [ ] Remover uma chave.
---
A tabela hash espalha as chaves e não guarda ordem. Para percorrer em ordem é preciso ordenar, ou usar uma árvore de busca.
{{< /questao >}}

{{< /quiz >}}

## Resumo

- A tabela hash converte a **chave em um índice** com uma função de hash e guarda o par em um array.
- **Colisões** são inevitáveis (casa dos pombos) e precisam de uma estratégia.
- **Encadeamento separado**: cada balde é uma lista encadeada.
- **Endereçamento aberto**: tudo no array, com sondagem; a remoção exige lápides.
- O **fator de carga** \(\alpha = n/m\) é mantido baixo dobrando a capacidade e recalculando os índices (*rehash*).
- Busca, inserção e remoção: \(O(1)\) em média, \(O(n)\) no pior caso. Sem ordem.

## Para estudar mais

- [Tabelas Hash](http://joaoarthurbm.github.io/eda/posts/hashtable) — João Arthur Brunet (2019)
- [Uma aula só com perguntas: endereçamento aberto](http://joaoarthurbm.github.io/eda/posts/enderecamento-aberto-so-perguntas) — João Arthur Brunet (2019)
