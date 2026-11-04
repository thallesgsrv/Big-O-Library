---
title: Tabela hash
weight: 18
description: Busca, inserção e remoção em O(1) médio, partindo do array de acesso direto até a função de hash.
autores:
  - thallesgsrv
date: 2026-11-04
---

## Sobre

Imagina uma biblioteca sem catálogo e sem estantes organizadas. Você quer o livro "Dom Casmurro" e anda pelas prateleiras olhando lombada por lombada. É a busca em lista: \(O(n)\).

Agora imagina que, dado o **nome do livro**, alguém te dissesse **na hora** em qual prateleira ele está. Sem procurar, sem comparar. Essa é a **tabela hash**, a estrutura por trás de `HashMap`, `HashSet`, dos dicionários do Python e dos objetos do JavaScript. Buscar, inserir e remover em \(O(1)\) **em média**.

Em vez de começar pelo resultado, vamos construir a tabela hash por etapas: partimos de algo que você já conhece (o array), vemos exatamente onde ele deixa de servir e consertamos uma peça de cada vez.

## Começando pelo array

O array tem uma superpotência: se você sabe o **índice**, ler, escrever e apagar uma posição custa \(O(1)\). Será que dá para usar isso para guardar objetos?

Uma lojinha numera seus pedidos de 0 a 999. Cada pedido tem um número e o nome do cliente:

```java
public class Pedido {

    private int numero;
    private String cliente;

    public Pedido(int numero, String cliente) {
        this.numero = numero;
        this.cliente = cliente;
    }

    public int getNumero() {
        return numero;
    }

    public String getCliente() {
        return cliente;
    }
}
```

O número identifica o pedido de forma única: é a **chave**. Como a chave é um inteiro pequeno, dá para guardar cada pedido na posição do array igual ao seu número:

```java
Pedido[] pedidos = new Pedido[1000];
Pedido p = new Pedido(214, "Marta");

pedidos[p.getNumero()] = p;        // inserir: O(1)
Pedido achado = pedidos[214];      // buscar:  O(1)
pedidos[214] = null;               // remover: O(1)
```

Tudo em tempo constante, porque há uma **correspondência direta** entre a chave e o índice. Um array usado assim se chama **tabela de acesso direto**. É a mesma ideia do array de contagem do [counting sort](../counting-sort/).

## Quando o acesso direto quebra

Agora vamos ser realistas. A loja cresceu e os números dos pedidos passaram a ter 9 dígitos, como `483920157`. Para usar o número como índice, o array precisaria de um bilhão de posições para guardar alguns milhares de pedidos. Quase tudo ficaria vazio.

E pior: com um CPF (11 dígitos) o array precisaria de \(10^{11}\) posições, o que é inviável na prática. Para fechar, nem toda chave é um número. Uma placa de carro como `ABC1D23` não é índice de array nenhum.

Os problemas, então, são três: chaves **enormes**, poucas chaves **realmente usadas** (desperdício de memória) e chaves que **nem são números**.

O que a gente quer é um jeito de transformar **qualquer chave** em um **índice de um array pequeno**.

## A ideia: função de hash

Essa transformação é a **função de hash**: recebe a chave e devolve um índice válido do array. Guardamos cada objeto na posição `hash(chave)`. Uma boa função de hash tem quatro características:

1. **Determinística**: a mesma chave sempre dá o mesmo índice.
2. **Dentro dos limites**: o resultado está sempre entre \(0\) e \(m - 1\), em que \(m\) é o tamanho do array.
3. **Uniforme**: todos os índices têm mais ou menos a mesma chance de aparecer, para os objetos se espalharem.
4. **Rápida**: executa em \(O(1)\).

Qual conta atende às duas primeiras? O **resto da divisão**. Ele é sempre o mesmo para a mesma chave e sempre cai entre \(0\) e \(m - 1\). Com um array de 10 posições:

```java
private int hash(int chave) {
    return chave % tabela.length;
}
```

Alguns pedidos de 4 dígitos ficam assim:

```text
4821 % 10 = 1
7305 % 10 = 5
1190 % 10 = 0
6013 % 10 = 3
```

```text
posição:  0     1     2    3     4    5     6    7    8    9
conteúdo: 1190  4821  -    6013  -    7305  -    -    -    -
```

Com isso já dá para montar a primeira versão da tabela. Repara que ela é o array de acesso direto com um passo a mais: calcular o `hash` antes de acessar a posição.

```java
public class TabelaHash {

    private Pedido[] tabela = new Pedido[10];

    private int hash(int chave) {
        return chave % tabela.length;
    }

    public void put(Pedido pedido) {
        tabela[hash(pedido.getNumero())] = pedido;
    }

    public Pedido get(int chave) {
        return tabela[hash(chave)];
    }

    public Pedido remove(int chave) {
        int i = hash(chave);
        Pedido removido = tabela[i];
        tabela[i] = null;
        return removido;
    }
}
```

Como `hash` é \(O(1)\), as três operações também são. Parece tudo resolvido. Mas...

## Colisões

**E se duas chaves diferentes caírem na mesma posição?**

O pedido `9301` também termina em 1, então `hash(9301) = 1`, a mesma posição do `4821`. Pelo nosso `put`, o `9301` **sobrescreve** o `4821` em silêncio: o pedido some. E o `get(4821)` passaria a devolver o pedido `9301`, porque só olhamos o índice e nunca conferimos a chave. Isso tem nome: **colisão**.

Temos três caminhos:

1. **Ignorar o problema.** Fora de cogitação: uma estrutura de dados não pode perder o que você guardou.
2. **Escolher uma função de hash que nunca colida.** Só é possível em casos raros. Existem muito mais chaves possíveis do que posições, e, pelo princípio da casa dos pombos, se há mais pombos que casinhas, dois acabam na mesma.
3. **Tratar a colisão quando ela acontecer.**

Sobra o caminho 3. A pergunta que define uma tabela hash não é "como evitar colisões", e sim **"o que fazer quando elas acontecem?"**. Há duas respostas clássicas.

## Estratégia A: encadeamento

A ideia é simples: em vez de guardar **um** objeto em cada posição, guardamos uma **lista** de objetos. Quem colide entra na lista da posição. Cada posição do array é chamada de **balde**.

Inserindo `4821`, `9301`, `7305` e `5415` numa tabela de 10 baldes:

```text
0:
1: 4821 -> 9301
2:
3:
4:
5: 7305 -> 5415
6:
7:
8:
9:
```

Como `4821` e `9301` têm o mesmo **hash** (mas chaves diferentes), eles dividem a lista do balde 1. Por isso a lista guarda o objeto inteiro: é a **chave** que diferencia quem está no mesmo balde.

A tabela agora é um array de listas. Para não precisar tratar balde `null`, já criamos todas as listas vazias no construtor:

```java
public class TabelaHash {

    private List<List<Pedido>> baldes;

    public TabelaHash(int capacidade) {
        baldes = new ArrayList<>();
        for (int i = 0; i < capacidade; i++) {
            baldes.add(new ArrayList<>());
        }
    }

    private int hash(int chave) {
        return chave % baldes.size();
    }
}
```

### get

Calcula o balde e percorre a lista comparando **as chaves**. Se não achar, devolve `null`.

```java
public Pedido get(int chave) {
    List<Pedido> balde = baldes.get(hash(chave));

    for (Pedido p : balde) {
        if (p.getNumero() == chave) {
            return p;
        }
    }
    return null;
}
```

### put

Também percorre o balde, agora procurando a chave. Se ela já existe, **atualiza** o pedido (não existem duas chaves iguais numa tabela hash). Se não existe, adiciona no fim da lista.

```java
public void put(Pedido novo) {
    List<Pedido> balde = baldes.get(hash(novo.getNumero()));

    for (int i = 0; i < balde.size(); i++) {
        if (balde.get(i).getNumero() == novo.getNumero()) {
            balde.set(i, novo);   // chave repetida: só atualiza
            return;
        }
    }
    balde.add(novo);
}
```

### remove

Acha o pedido no balde e tira da lista. O `remove(i)` do `ArrayList` já devolve o elemento removido.

```java
public Pedido remove(int chave) {
    List<Pedido> balde = baldes.get(hash(chave));

    for (int i = 0; i < balde.size(); i++) {
        if (balde.get(i).getNumero() == chave) {
            return balde.remove(i);
        }
    }
    return null;
}
```

### Quanto custa?

Agora as operações percorrem uma lista, então deixaram de ser \(O(1)\) garantido. No pior caso, todas as chaves caem no mesmo balde e a tabela vira uma lista: \(O(n)\).

Como não queremos o pior caso, usamos uma função de hash que **espalha** os objetos. Se a tabela tem \(m\) baldes e guarda \(n\) objetos, o tamanho médio de cada lista é:

$$
\alpha = \frac{n}{m}
$$

Esse \(\alpha\) é o **fator de carga**: o quão cheia a tabela está. Uma operação paga \(1\) para calcular o hash e ir ao balde, mais \(\alpha\) para percorrer a lista em média, ou seja, \(O(1 + \alpha)\). Enquanto \(\alpha\) se mantém pequeno, o custo é constante.

## Estratégia B: endereçamento aberto

Resposta diferente para a mesma pergunta: **sem listas**. Tudo fica dentro do próprio array. Se a posição está ocupada, procuramos outra. Na **sondagem linear**, tentamos a posição seguinte, depois a outra, e assim por diante, voltando ao início quando passa do fim. É chegar ao estacionamento, ver sua vaga favorita ocupada e ir seguindo em frente até achar uma livre.

Inserindo `4821`, `9301`, `7305`, `5415` e `8541` numa tabela de 10 posições:

1. `4821`: `hash = 1`. Livre, ocupa a posição 1.
2. `9301`: `hash = 1`. Ocupada. Tenta 2. Livre, ocupa a posição 2.
3. `7305`: `hash = 5`. Livre, ocupa a posição 5.
4. `5415`: `hash = 5`. Ocupada. Tenta 6. Livre, ocupa a posição 6.
5. `8541`: `hash = 1`. Ocupadas a 1 e a 2. Tenta 3. Livre, ocupa a posição 3.

```text
posição:  0  1     2     3     4  5     6     7  8  9
conteúdo: -  4821  9301  8541  -  7305  5415  -  -  -
```

Para generalizar, usamos uma variável `sondagem` que começa em 0 e sobe 1 a cada colisão. A posição tentada é `(hash(chave) + sondagem) % tamanho`.

### Buscar

Começamos no índice da chave e andamos até achar a chave ou encontrar uma posição **vazia**. Vazia quer dizer "essa chave não está na tabela": se estivesse, teria estacionado aqui antes.

```java
private int indiceDe(int chave) {
    for (int sondagem = 0; sondagem < tabela.length; sondagem++) {
        int i = (hash(chave) + sondagem) % tabela.length;

        if (tabela[i] == null) {
            return -1;                          // posição vazia: a chave não está
        }
        if (tabela[i].getNumero() == chave) {
            return i;
        }
    }
    return -1;
}
```

### E a remoção?

Aqui mora a pegadinha. Na tabela de cima, remova o `9301` **esvaziando a posição 2**. Agora busque o `8541`: começa na posição 1 (é o `4821`, não é ele), vai para a 2... **vazia**. "Então o `8541` não existe." Errado. Ele está na posição 3, mas o buraco enganou a busca.

**Por quê?** Porque a busca usa a posição vazia como sinal de parada. Se removermos deixando um buraco no meio de uma sequência de colisões, quebramos o caminho que leva às chaves seguintes.

A solução é, em vez de `null`, colocar na posição um **marcador de apagado** (uma "lápide"): um objeto especial que significa "já teve alguém aqui, mas agora está livre". A busca **continua passando** por ele. Já a inserção pode **reaproveitá-lo**.

### A classe completa

```java
public class TabelaHashAberta {

    private static final Pedido APAGADO = new Pedido(-1, "apagado");

    private Pedido[] tabela = new Pedido[10];

    private int hash(int chave) {
        return chave % tabela.length;
    }

    private int indiceDe(int chave) {
        for (int sondagem = 0; sondagem < tabela.length; sondagem++) {
            int i = (hash(chave) + sondagem) % tabela.length;

            if (tabela[i] == null) {
                return -1;
            }
            if (tabela[i] != APAGADO && tabela[i].getNumero() == chave) {
                return i;
            }
        }
        return -1;
    }

    public Pedido get(int chave) {
        int i = indiceDe(chave);
        return i == -1 ? null : tabela[i];
    }

    public void put(Pedido novo) {
        int existente = indiceDe(novo.getNumero());
        if (existente != -1) {
            tabela[existente] = novo;           // chave repetida: só atualiza
            return;
        }

        for (int sondagem = 0; sondagem < tabela.length; sondagem++) {
            int i = (hash(novo.getNumero()) + sondagem) % tabela.length;

            if (tabela[i] == null || tabela[i] == APAGADO) {
                tabela[i] = novo;
                return;
            }
        }
        throw new IllegalStateException("tabela cheia");
    }

    public Pedido remove(int chave) {
        int i = indiceDe(chave);
        if (i == -1) {
            return null;
        }
        Pedido removido = tabela[i];
        tabela[i] = APAGADO;                    // lápide: a busca continua passando
        return removido;
    }
}
```

O `put` primeiro confere se a chave já existe (`indiceDe`). Sem isso, poderíamos encher uma lápide e deixar uma cópia antiga da mesma chave mais à frente, e a tabela passaria a ter duas chaves iguais.

Perceba também que a tabela **não tem listas**, então não cabe mais do que o tamanho dela: o fator de carga \(\alpha\) nunca passa de 1. Quanto mais cheia, mais sondagens cada operação faz. Daqui a pouco veremos como evitar que ela encha.

## Funções de hash melhores

Até aqui usamos tamanho 10, e `chave % 10` é só o **último dígito**. Qualquer padrão nos últimos dígitos vira colisão em massa. Se os pedidos de uma promoção são sempre centenas redondas:

```text
100, 200, 300, 400, 500, 600, 700, 800, 900
```

todos caem na posição 0 com tamanho 10. O tamanho foi uma péssima escolha para esse padrão. Com tamanho **11**, um número primo:

```text
100 % 11 = 1    400 % 11 = 4    700 % 11 = 7
200 % 11 = 2    500 % 11 = 5    800 % 11 = 8
300 % 11 = 3    600 % 11 = 6    900 % 11 = 9
```

Zero colisões. A intuição é que um tamanho com muitos divisores "combina" com padrões nas chaves e enfileira tudo em poucos baldes, enquanto um primo quase não tem divisores e embaralha melhor. Por isso o costume é escolher um tamanho primo ou, pelo menos, evitar potências de 10.

### E chaves que não são números?

Lembra da placa `ABC1D23`? Antes do `%`, precisamos transformar a chave em **um inteiro**. No Java, todo objeto tem o método `hashCode()` para isso, e `String` já vem com um.

Uma ideia ingênua para strings seria somar os códigos dos caracteres, mas somar não liga para a ordem das letras:

```text
"amor" -> 97 + 109 + 111 + 114 = 431
"roma" -> 114 + 111 + 109 + 97 = 431
```

Todo anagrama cai no mesmo lugar. A saída é fazer a **posição** de cada letra pesar, multiplicando o acumulado por uma constante a cada passo (o `String.hashCode()` do Java usa 31):

```java
int h = 0;
for (int i = 0; i < chave.length(); i++) {
    h = 31 * h + chave.charAt(i);
}
```

Com isso, a função de hash fica em dois passos: objeto para inteiro com `hashCode()`, e inteiro para índice com o resto da divisão. Como `hashCode()` pode dar um número negativo, usamos `Math.floorMod`, que sempre devolve algo entre \(0\) e \(m - 1\):

```java
private int hash(String chave) {
    return Math.floorMod(chave.hashCode(), tabela.length);
}
```

## Fator de carga e redimensionamento

Nossas tabelas têm tamanho fixo. No encadeamento, as listas só crescem e as operações voltam a \(O(n)\). No endereçamento aberto, a tabela chega a ficar cheia. Em ambos os casos, a saída é a mesma: quando \(\alpha\) passa de um limite, **criar uma tabela maior e passar tudo para ela**. A biblioteca padrão do Java usa o limite de **0,75**.

Por que 0,75 e não 0,1 ou 0,95? Se o limite for baixo, o redimensionamento acontece o tempo todo, e ele custa \(O(n)\). Se for alto, as colisões se multiplicam e a tabela se arrasta. O 0,75 é o equilíbrio que a prática mostrou funcionar bem.

Há uma pegadinha que derruba muita gente: **não basta copiar** os objetos para o array novo. O índice depende do tamanho da tabela (`% tamanho`), então a mesma chave pode ir para outra posição. Por exemplo, `4815 % 10 = 5`, mas `4815 % 20 = 15`. É preciso calcular o `hash` de novo para cada objeto. Esse recálculo se chama **rehash**.

No encadeamento, a tabela precisa saber quantos pedidos tem (`tamanho`), e o `put` confere o fator de carga ao final:

```java
private int tamanho;   // novo atributo: quantos pedidos a tabela guarda

// no fim do put, depois de balde.add(novo):
tamanho++;
if ((double) tamanho / baldes.size() > 0.75) {
    redimensiona();
}
```

E o `redimensiona` dobra o número de baldes e reinsere todo mundo. Como `hash` usa `baldes.size()`, que já é o tamanho novo, o rehash acontece sozinho:

```java
private void redimensiona() {
    List<List<Pedido>> antigos = baldes;

    baldes = new ArrayList<>();
    for (int i = 0; i < antigos.size() * 2; i++) {
        baldes.add(new ArrayList<>());
    }

    for (List<Pedido> balde : antigos) {
        for (Pedido p : balde) {
            baldes.get(hash(p.getNumero())).add(p);
        }
    }
}
```

No endereçamento aberto é a mesma ideia: cria um array com o dobro do tamanho e chama `put` para cada pedido que não é `null` nem `APAGADO`. Como as lápides não são reinseridas, elas desaparecem de bônus.

Repara que dobrar o tamanho (10, 20, 40...) faz a tabela deixar de ser prima. Para esta página, tudo bem: o importante é entender o rehash. Implementações reais resolvem isso de outras formas: algumas pulam para o próximo primo, e o `HashMap` do Java usa potências de 2 junto com uma função de hash que embaralha bem os bits.

O redimensionamento custa \(O(n)\), mas só acontece de vez em quando, depois de muitas inserções baratas. Como no [ArrayList](../arraylist/), o custo **médio** por inserção continua \(O(1)\).

## Na prática

Você raramente escreve uma tabela hash do zero: usa `HashMap` ou `HashSet`. Só tome cuidado com um detalhe.

> [!NOTE]
> Se você usar um objeto seu como chave, sobrescreva `equals` e `hashCode` **juntos**. Chaves iguais precisam ter o mesmo hash, senão a busca procura no balde errado e não acha. E não altere um objeto depois de usá-lo como chave: o hash dele muda e a tabela nunca mais o encontra.

## Qual estratégia escolher?

| | Encadeamento | Endereçamento aberto |
|---|---|---|
| Onde ficam as colisões | em listas fora do array | no próprio array |
| Fator de carga | pode passar de 1 | precisa ficar abaixo de 1 |
| Remoção | simples | exige o marcador de apagado |

## Quanto custa?

| Operação | Caso médio | Pior caso |
|---|---|---|
| `get`, `put`, `remove` | \(O(1)\) | \(O(n)\) |

O pior caso é todas as chaves colidirem no mesmo balde (ou na mesma sequência de sondagem). Com uma boa função de hash e o fator de carga controlado, isso é raro.

E o que a gente paga pela velocidade? **A tabela não guarda ordem.** Não dá para pegar o menor elemento, o próximo maior ou percorrer em ordem crescente sem ordenar tudo. Para isso existem as árvores, que vêm logo depois.

## Exercícios

1. Uma tabela com 7 posições usa \(h(k) = k \bmod 7\) e **sondagem linear**. Insira, nessa ordem, as chaves 10, 17, 24, 3 e 8. Desenhe o array final.
2. Na tabela do exercício anterior, remova a chave 17 **apenas esvaziando a posição**. O que acontece ao buscar a chave 24? Como o marcador de apagado resolve?
3. Por que o `redimensiona` recalcula o `hash` de cada pedido, em vez de copiar cada balde para a mesma posição da tabela nova?
4. Por que somar os códigos dos caracteres é uma função de hash ruim para palavras?
5. Quantas colisões acontecem ao inserir as chaves 20, 40, 60, 80 e 100 numa tabela de 10 posições? E numa de 11?

{{< details title="Gabarito" >}}
1. \(10 \bmod 7 = 3\): vai para a posição 3. \(17 \bmod 7 = 3\): ocupada, tenta 4. \(24 \bmod 7 = 3\): 3 e 4 ocupadas, vai para 5. \(3 \bmod 7 = 3\): 3, 4 e 5 ocupadas, vai para 6. \(8 \bmod 7 = 1\): posição 1 livre. Array final (posições 0 a 6): `[_, 8, _, 10, 17, 24, 3]`.
2. Ao buscar 24: começa na posição 3 (10, diferente), vai para 4 (agora vazia) e para, concluindo **errado** que 24 não está na tabela. Com o marcador de apagado, a posição 4 deixa de ser vazia, a busca atravessa e encontra 24 na posição 5.
3. Porque o índice é `hash % tamanho`: ao mudar o tamanho, a mesma chave tende a ir para outro balde. Copiar o balde para a mesma posição deixaria chaves onde a busca nunca as procuraria.
4. A soma ignora a ordem das letras, então todos os anagramas (`amor`, `roma`, `mora`) colidem. O hash polinomial, que multiplica o acumulado por 31 a cada letra, faz a posição pesar.
5. Com 10 posições, todas as chaves terminam em 0 e caem na posição 0: são 4 colisões (cada chave depois da primeira). Com 11 posições, os restos são 9, 7, 5, 3 e 1, todos diferentes: nenhuma colisão.
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
Por que, no endereçamento aberto, remover uma chave coloca um marcador de apagado em vez de deixar a posição vazia?

- [ ] Para economizar memória.
- [ ] Para poder ordenar as chaves.
- [x] Para que a busca continue passando por ali, sem parar cedo demais.
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

- Um array de **acesso direto** usa a chave como índice, mas só serve para chaves inteiras e pequenas.
- A **função de hash** transforma qualquer chave em um índice (por exemplo, `hashCode()` seguido de `% tamanho`). Ela deve ser determinística, uniforme e rápida.
- **Colisões** são inevitáveis (casa dos pombos) e precisam de uma estratégia.
- **Encadeamento**: cada balde é uma lista. **Endereçamento aberto**: tudo no array, com sondagem; a remoção exige o marcador de apagado.
- O **fator de carga** \(\alpha = n/m\) é mantido baixo dobrando o tamanho e recalculando os índices (*rehash*).
- Busca, inserção e remoção: \(O(1)\) em média, \(O(n)\) no pior caso. Sem ordem.

## Para estudar mais

- [Tabelas Hash](http://joaoarthurbm.github.io/eda/posts/hashtable) — João Arthur Brunet (2019)
- [Uma aula só com perguntas: endereçamento aberto](http://joaoarthurbm.github.io/eda/posts/enderecamento-aberto-so-perguntas) — João Arthur Brunet (2019)
