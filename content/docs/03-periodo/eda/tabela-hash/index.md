---
title: Tabela hash
weight: 18
description: Busca, inserção e remoção em O(1) médio, com função de hash, encadeamento e sondagem linear.
autores:
  - thallesgsrv
date: 2026-10-31
---

## Sobre

Precisamos guardar pares **chave → valor** e responder rápido a perguntas como "qual é o valor associado a `"casa"`?". Vamos comparar o que já conhecemos:

| Estrutura | Buscar por chave | Inserir |
|---|---|---|
| Array / lista sem ordem | \(O(n)\) | \(O(1)\) no fim |
| Array ordenado (busca binária) | \(O(\log n)\) | \(O(n)\), para abrir espaço |

Queremos algo melhor nas duas. A **tabela hash** consegue \(O(1)\) **em média** para buscar, inserir e remover. Ela é a estrutura por trás de `HashMap`, `HashSet`, de dicionários do Python e de objetos do JavaScript.

## Ideia 1: usar a chave como índice

Se as chaves fossem números pequenos, bastaria um array e usar a própria chave como posição: o valor da chave `7` fica em `v[7]`. Buscar, inserir e remover seriam \(O(1)\). Isso se chama **endereçamento direto**.

O problema é que as chaves reais são strings, CPFs, ids enormes. Um array com uma posição para cada CPF possível teria \(10^{11}\) posições, e quase todas vazias.

## Ideia 2: a função de hash

A saída é **converter a chave em um índice** de um array pequeno. Essa conversão é a **função de hash**. Em dois passos:

1. transformar a chave em um número inteiro (o *hash code*);
2. reduzir esse número ao intervalo \([0, m-1]\), em que \(m\) é a capacidade da tabela, com o resto da divisão.

Uma função de hash precisa ser **determinística** (mesma chave, mesmo índice sempre), **rápida** e espalhar bem as chaves pelo intervalo.

Uma primeira tentativa ingênua para strings é somar os códigos dos caracteres. Com capacidade 8:

```text
"amor" -> soma 431 -> 431 % 8 = 7
"roma" -> soma 431 -> 431 % 8 = 7
"mora" -> soma 431 -> 431 % 8 = 7
```

Todas as palavras que são anagramas caem no mesmo índice, porque a soma não depende da ordem das letras. É uma função ruim. Uma melhoria é o **hash polinomial**: a cada caractere, multiplicamos o acumulado por uma constante (31 é a escolha clássica) antes de somar. Assim a posição de cada letra influencia o resultado:

```java
private int indice(String chave, int capacidade) {
    int h = 0;
    for (int i = 0; i < chave.length(); i++) {
        h = 31 * h + chave.charAt(i);
    }
    return (h & 0x7fffffff) % capacidade;
}
```

Um detalhe importante: a conta pode estourar um `int` e dar **negativo**, e um índice negativo quebraria o programa. A máscara `& 0x7fffffff` zera o bit de sinal, deixando o número sempre não negativo antes do `%`. (Essa é a mesma fórmula que o `String.hashCode()` do Java usa.)

Com capacidade 8, alguns exemplos:

```text
"ana"  -> 96724   -> índice 4
"bia"  -> 97530   -> índice 2
"caio" -> 3045892 -> índice 4    <- mesmo índice de "ana"
"dani" -> 3075832 -> índice 0
"eva"  -> 100816  -> índice 0    <- mesmo índice de "dani"
```

## Colisões são inevitáveis

Duas chaves diferentes que caem no mesmo índice formam uma **colisão**, como `"ana"` e `"caio"` acima. Não dá para evitá-las: existem muito mais chaves possíveis do que posições, e pelo princípio da casa dos pombos duas chaves vão acabar dividindo uma posição. O que define uma tabela hash é **como ela lida com colisões**. Vamos ver as duas estratégias principais.

## Estratégia A: encadeamento separado

Cada posição do array (chamada de **balde**) guarda uma lista encadeada com todas as chaves que caíram ali. Se duas chaves colidem, ficam na mesma lista.

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

`baldes[i]` é a cabeça da lista do balde `i` (ou `null`, se estiver vazio). `FATOR_MAXIMO` vai ser usado no passo do redimensionamento.

### Passo 2: get

Calculamos o balde e percorremos a lista dele comparando as chaves com `equals`. Comparamos a **chave**, e não só o índice, porque várias chaves dividem o balde.

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

Se a chave já existe, atualizamos o valor. Se não, criamos um nó novo. Inserir **no início** da lista do balde é \(O(1)\), sem precisar percorrer até o fim.

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

Inserindo `"ana"`, `"bia"`, `"caio"`, `"dani"` e `"eva"` (nessa ordem) em uma tabela de capacidade 8:

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

As colisões ficaram guardadas nas listas de `0` e `4`; o novo nó entra na frente.

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

### Passo 5: o fator de carga e o redimensionamento

Se a tabela só crescesse em número de chaves e o array continuasse pequeno, as listas ficariam enormes e a busca viraria \(O(n)\). Medimos isso pelo **fator de carga**:

$$
\alpha = \frac{n}{m}
$$

em que \(n\) é o número de chaves guardadas e \(m\) é o número de baldes. Se as chaves se espalham bem, cada lista tem em média \(\alpha\) elementos, e uma busca custa em média \(O(1 + \alpha)\).

A estratégia é manter \(\alpha\) limitado: quando passa de 0,75, **dobramos** a capacidade, como no [ArrayList](../arraylist/). O detalhe delicado é que o índice depende da capacidade (`% capacidade`), então não basta copiar: é preciso **recalcular o índice de cada chave** na tabela nova. Esse reprocessamento se chama *rehash*.

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

Reaproveitamos os nós em vez de criar novos. Guardar `proximo` antes de religar é essencial: ao mudar `atual.proximo`, perderíamos o resto da lista.

### Exemplo: contar palavras

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

Aqui não existem listas: todos os pares ficam **dentro do próprio array**. Se o índice calculado já está ocupado, procuramos outra posição. Na **sondagem linear**, tentamos a próxima, depois a seguinte, e assim por diante, voltando ao início quando passa do fim (`(i + 1) % capacidade`).

Para buscar, o caminho é o mesmo: começamos no índice da chave e seguimos até achar a chave ou até chegar a uma posição **vazia**, o que prova que a chave não está lá.

### O problema da remoção

Suponha as chaves `A`, `B` e `C`, todas com índice 3, e que ficaram nas posições 3, 4 e 5. Se removermos `B` apenas esvaziando a posição 4, a busca por `C` começa em 3, passa por `A`, encontra a posição 4 vazia e conclui (errado!) que `C` não existe.

A solução é um terceiro estado, **removido** (uma "lápide"): a posição não tem chave, mas a busca **continua** passando por ela. Cada posição passa a ter um estado: `VAZIO`, `OCUPADO` ou `REMOVIDO`.

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

`usadas` conta também as lápides. Elas ocupam espaço na sondagem, então entram no cálculo da carga.

### Busca

Um método auxiliar devolve a posição da chave, ou `-1`. Ele só para ao encontrar `VAZIO`; `REMOVIDO` é atravessado.

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

Esse laço termina porque garantimos que a tabela nunca fica cheia (veja o `put`): sempre existe pelo menos uma posição `VAZIO`.

### put e remove

No `put`, primeiro vemos se a chave já existe. Se não, garantimos espaço e procuramos a primeira posição livre. Aqui mantenho a carga em no máximo 0,5, porque a sondagem linear degrada rápido quando a tabela enche (os elementos formam grandes blocos contínuos, chamados de *agrupamentos*).

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

O `redimensiona` reinsere só as posições `OCUPADO` em arrays novos (e, de quebra, as lápides somem):

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

## Comparando as duas estratégias

| | Encadeamento separado | Endereçamento aberto |
|---|---|---|
| Onde ficam as colisões | em listas fora do array | no próprio array |
| Fator de carga | pode passar de 1 | precisa ficar abaixo de 1 |
| Remoção | simples | exige lápides |
| Cache | pior (nós espalhados) | melhor (tudo contíguo) |

## Duas armadilhas

**Chaves precisam ter `equals` e `hashCode` consistentes.** Se duas chaves são iguais pelo `equals`, elas **têm** que produzir o mesmo hash. Se você usar um objeto seu como chave de um `HashMap` e sobrescrever só `equals`, a busca falha de formas misteriosas: a chave "igual" cai em outro balde.

**Chaves mutáveis.** Se você altera um objeto depois de usá-lo como chave, o hash dele muda, e a tabela nunca mais o encontra no balde onde foi guardado.

## Análise de custo

| Operação | Caso médio | Pior caso |
|---|---|---|
| `get`, `put`, `remove` | \(O(1)\) | \(O(n)\) |

O pior caso acontece quando todas as chaves colidem no mesmo balde (ou no mesmo agrupamento): a tabela vira, na prática, uma lista. Com uma boa função de hash e o fator de carga controlado pelo redimensionamento, isso é raro e o custo médio é constante. O `put` que dispara o redimensionamento custa \(O(n)\), mas, como no ArrayList, isso acontece cada vez menos, e o custo amortizado continua \(O(1)\).

Em troca da velocidade, a tabela hash **não guarda ordem**: não há como pegar o menor elemento, o próximo maior ou percorrer em ordem crescente sem ordenar tudo. Para isso existem as árvores, que vêm a seguir.

## Exercícios

1. Uma tabela com 7 posições usa \(h(k) = k \bmod 7\) e **sondagem linear**. Insira, nessa ordem, as chaves 10, 17, 24, 3 e 8. Desenhe o array final.
2. Na tabela do exercício anterior, remova a chave 17 **apenas esvaziando a posição**. O que acontece ao buscar a chave 24? Como as lápides resolvem?
3. Por que o `redimensiona` do encadeamento recalcula o índice de cada chave, em vez de copiar cada balde para a mesma posição da tabela nova?
4. Qual é o problema de usar a soma dos códigos dos caracteres como função de hash para palavras?

{{< details title="Gabarito" >}}
1. \(10 \bmod 7 = 3\): vai para a posição 3. \(17 \bmod 7 = 3\): ocupada, tenta 4. \(24 \bmod 7 = 3\): 3 e 4 ocupadas, vai para 5. \(3 \bmod 7 = 3\): 3, 4 e 5 ocupadas, vai para 6. \(8 \bmod 7 = 1\): posição 1 livre. Array final (posições 0 a 6): `[_, 8, _, 10, 17, 24, 3]`.
2. Ao buscar 24: começa na posição 3 (10, diferente), vai para 4 (agora vazia) e para, concluindo **errado** que 24 não está na tabela. Com a lápide, a posição 4 fica marcada como `REMOVIDO`, a busca atravessa e encontra 24 na posição 5.
3. Porque o índice é `hash % capacidade`: ao mudar a capacidade, a mesma chave tende a ir para outro balde. Copiar o balde para a mesma posição deixaria chaves em lugares onde a busca nunca as procuraria.
4. A soma ignora a ordem das letras, então todos os anagramas (`amor`, `roma`, `mora`) colidem. Além disso, as somas se concentram numa faixa pequena de valores, espalhando mal as chaves. O hash polinomial, com multiplicação por 31 a cada caractere, resolve isso.
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
- **Colisões** (chaves diferentes com o mesmo índice) são inevitáveis e precisam de uma estratégia.
- **Encadeamento separado**: cada balde é uma lista encadeada.
- **Endereçamento aberto**: tudo no array, com sondagem; a remoção exige lápides.
- O **fator de carga** \(\alpha = n/m\) é mantido baixo dobrando a capacidade e recalculando os índices (*rehash*).
- Busca, inserção e remoção custam \(O(1)\) em média e \(O(n)\) no pior caso; a estrutura não mantém ordem.

## Para estudar mais

- [Tabelas Hash](http://joaoarthurbm.github.io/eda/posts/hashtable) — João Arthur Brunet (2019)
- [Uma aula só com perguntas: endereçamento aberto](http://joaoarthurbm.github.io/eda/posts/enderecamento-aberto-so-perguntas) — João Arthur Brunet (2019)
