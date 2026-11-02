---
title: Cache e localidade
weight: 17
description: Por que acessar memória em sequência é mais rápido, e como montar um cache LRU.
autores:
  - thallesgsrv
date: 2026-10-31
---

## Sobre

"Cache" aparece em dois lugares diferentes da computação, e vale separar as duas ideias:

- **Cache de hardware**: uma memória pequena e muito rápida dentro do processador, que guarda cópias de pedaços da memória principal. Você não controla o cache, mas pode escrever código que aproveita (ou desperdiça) ele.
- **Cache de software**: uma estrutura que **você** escreve para guardar resultados caros de obter (uma consulta, uma resposta de rede, uma conta pesada) e reaproveitá-los.

As duas têm a mesma lógica: guardar perto o que provavelmente vai ser usado de novo. Esta página mostra as duas e explica por que, na hora de comparar estruturas de dados, a notação \(O(\cdot)\) não conta a história inteira.

## A hierarquia de memória

Memória rápida é cara e pequena; memória grande é barata e lenta. Por isso os computadores usam camadas:

| Camada | Tamanho típico | Velocidade (ordem de grandeza) |
|---|---|---|
| Registradores | dezenas de bytes | menos de 1 ns |
| Cache L1 / L2 / L3 | KB a dezenas de MB | de 1 ns a dezenas de ns |
| Memória principal (RAM) | GB | ~100 ns |
| Disco (SSD) | centenas de GB ou TB | ~100 000 ns |

> [!NOTE]
> Os números mudam de máquina para máquina. O que importa é a proporção: ir à RAM custa algumas dezenas de vezes mais do que ficar no cache, e ir ao disco custa ordens de grandeza a mais.

Quando o processador precisa de um dado, ele procura primeiro no cache. Se achou (**cache hit**), é rápido. Se não achou (**cache miss**), vai buscar na RAM, e isso é lento.

## Linhas de cache e localidade

O ponto mais importante: o cache **não busca um byte por vez**. Ele traz um bloco inteiro de bytes vizinhos, chamado **linha de cache**, normalmente com 64 bytes. Um `int` ocupa 4 bytes, então uma linha traz de uma vez 16 inteiros consecutivos de um array.

Isso gera duas regras que os programas costumam seguir (e que o cache aproveita):

- **Localidade espacial**: se você acessou um endereço, é provável que acesse os vizinhos logo em seguida.
- **Localidade temporal**: se você acessou um dado agora, é provável que acesse o mesmo dado de novo em breve.

Um laço que percorre um array em ordem tem localidade espacial perfeita: o primeiro acesso dá um *miss* e traz 16 inteiros; os próximos 15 já estão no cache.

## Experimento: linhas versus colunas

Uma matriz `int[n][n]` em Java é um array de arrays: cada **linha** é um array contíguo na memória. Veja duas formas de somar todos os elementos. As duas fazem exatamente as mesmas \(n^2\) somas.

```java
int n = 4096;
int[][] m = new int[n][n];

// A: linha por linha
long soma = 0;
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        soma += m[i][j];
    }
}

// B: coluna por coluna
long soma2 = 0;
for (int j = 0; j < n; j++) {
    for (int i = 0; i < n; i++) {
        soma2 += m[i][j];
    }
}
```

No código **A**, `m[i][j]` e `m[i][j+1]` são vizinhos na memória: o cache traz 16 e usa os 16. No código **B**, cada acesso pula para outra linha, a milhares de bytes de distância, então praticamente todo acesso é um *miss*.

Na minha máquina de teste, o código B levou várias vezes mais tempo que o A. O valor exato depende do processador e da JVM, então rode você mesmo, de preferência repetindo o teste algumas vezes (a primeira execução inclui o aquecimento da JVM). O que não muda é o motivo: **a complexidade é a mesma, \(\Theta(n^2)\), mas o padrão de acesso à memória não é**.

## Array versus lista encadeada

O mesmo raciocínio explica uma observação importante sobre estruturas de dados.

- Os elementos de um **array** ficam lado a lado. Percorrê-lo é o melhor caso possível para o cache.
- Os nós de uma **lista encadeada** são alocados um a um e podem estar espalhados pela memória. Cada `proximo` pode levar a um endereço distante, e quase todo passo é um *miss*.

Percorrer uma lista com \(n\) elementos e percorrer um array com \(n\) elementos são ambos \(O(n)\), mas na prática o array costuma ser muito mais rápido por causa do cache. É também parte da razão de o quick sort ganhar do merge sort na prática, como comentado na [página do quick sort](../quick-sort/): ele varre o array de forma sequencial.

> [!TIP]
> Isso não significa "nunca use lista encadeada". Significa que a notação assintótica compara **crescimento**, não tempo real. Quando duas estruturas têm a mesma complexidade, a diferença está nas constantes, e o cache é uma delas.

## Cache de software: guardar resultados

Agora o outro sentido. Suponha uma função cara que sempre devolve o mesmo resultado para a mesma entrada. Em vez de recalcular, guardamos o resultado numa estrutura e consultamos antes.

O exemplo clássico é Fibonacci recursivo, que recalcula os mesmos subproblemas várias vezes:

```java
static long fib(int n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
}
```

Guardando o que já foi calculado (técnica chamada **memoização**):

```java
static long[] memo = new long[91];

static long fibMemo(int n) {
    if (n < 2) return n;
    if (memo[n] != 0) return memo[n];      // hit: já calculei
    memo[n] = fibMemo(n - 1) + fibMemo(n - 2);
    return memo[n];
}
```

Contando as chamadas, `fib(30)` faz **2 692 537** chamadas, e `fibMemo(30)` faz apenas **59**. O custo passa de exponencial para \(O(n)\), porque cada valor é calculado uma única vez.

## O problema do espaço: política de substituição

Um cache de software não pode crescer para sempre: a memória é finita. Quando ele enche e precisamos guardar algo novo, alguém tem que sair. A regra que decide quem sai é a **política de substituição**.

A mais comum é a **LRU** (*Least Recently Used*, "menos recentemente usado"): sai quem está há mais tempo sem ser usado. Ela aposta na localidade temporal: o que não foi usado faz tempo provavelmente não será usado tão cedo.

## Construindo um cache LRU

Para o LRU, precisamos de duas coisas ao mesmo tempo: achar um item pela chave rapidamente e saber a **ordem de uso**. O Java já tem uma estrutura que mantém as duas informações, o `LinkedHashMap`. Com o terceiro parâmetro do construtor em `true`, ela ordena as entradas pelo **último acesso**, e não pela inserção. Sobrescrevemos `removeEldestEntry` para descartar a mais antiga quando passar do limite:

```java
import java.util.LinkedHashMap;
import java.util.Map;

public class CacheLRU<K, V> extends LinkedHashMap<K, V> {
    private final int capacidade;

    public CacheLRU(int capacidade) {
        super(16, 0.75f, true);          // true = ordem de acesso
        this.capacidade = capacidade;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> maisAntiga) {
        return size() > capacidade;      // passou do limite: descarta a menos usada
    }
}
```

Usando, com capacidade 3:

```java
CacheLRU<String, Integer> cache = new CacheLRU<>(3);
cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);
System.out.println(cache.keySet());   // [a, b, c]

cache.get("a");                       // "a" foi usada: vira a mais recente
System.out.println(cache.keySet());   // [b, c, a]

cache.put("d", 4);                    // estourou 3: sai a menos recente ("b")
System.out.println(cache.keySet());   // [c, a, d]
```

Repare que `"b"` saiu, e não `"a"`, mesmo `"a"` tendo sido inserida primeiro. O `get("a")` mudou a ordem de uso, e é isso que o LRU respeita.

### Como funciona por dentro

O `LinkedHashMap` combina duas estruturas que você vai ver neste conteúdo: uma **tabela hash** (para achar a entrada pela chave em \(O(1)\)) e uma **lista duplamente encadeada** (para manter a ordem de uso, movendo um nó para o fim em \(O(1)\) a cada acesso). Por isso `get` e `put` do cache LRU custam \(O(1)\) em média.

## Exercícios

1. Por que percorrer uma matriz por linhas costuma ser mais rápido que por colunas, se o número de somas é o mesmo?
2. Um cache LRU de capacidade 3 recebe, em ordem: `put(a)`, `put(b)`, `put(c)`, `get(b)`, `put(d)`, `get(a)`, `put(e)`. Qual é o conteúdo final, do menos para o mais recente? (`get` de uma chave ausente não altera nada.)
3. Depois de estudar a [tabela hash](../tabela-hash/) e a [lista encadeada](../lista-encadeada/), monte um LRU "na mão" com uma tabela hash de `chave -> nó` e uma lista duplamente encadeada. Quais operações precisam ser \(O(1)\) e por quê a lista precisa ser **duplamente** encadeada?

{{< details title="Gabarito" >}}
1. Por localidade espacial: em um array de arrays, elementos da mesma linha são vizinhos na memória, e cada linha de cache traz vários deles de uma vez. Percorrendo por colunas, cada acesso cai em outra linha da matriz, longe do anterior, gerando muito mais *cache misses*.
2. Estado após cada operação (do menos para o mais recente): `[a]`, `[a, b]`, `[a, b, c]`, `get(b)` → `[a, c, b]`, `put(d)` (estoura, sai `a`) → `[c, b, d]`, `get(a)` (ausente, nada muda) → `[c, b, d]`, `put(e)` (estoura, sai `c`) → `[b, d, e]`. Final: `[b, d, e]`.
3. Precisamos de \(O(1)\) para: achar o nó pela chave (tabela hash), mover um nó para o fim da lista a cada `get`/`put` e remover o nó do início quando estourar. A lista precisa ser duplamente encadeada porque, para tirar um nó do **meio** em \(O(1)\), é preciso conhecer o anterior dele, e numa lista simples só chegaríamos ao anterior percorrendo desde o início.
{{< /details >}}

## Resumo

- O cache de hardware traz blocos de bytes vizinhos (linhas de cache); acessos sequenciais aproveitam isso, acessos saltados não.
- **Localidade espacial** (vizinhos) e **temporal** (reuso) explicam por que arrays costumam vencer listas encadeadas na prática, mesmo com a mesma complexidade.
- Um cache de software guarda resultados caros para reaproveitar; a memoização transforma o Fibonacci recursivo de exponencial em \(O(n)\).
- Como o espaço é limitado, é preciso uma política de substituição; a **LRU** descarta o item usado há mais tempo.
- Um cache LRU eficiente combina tabela hash e lista duplamente encadeada.

## Para estudar mais

- [Cache](https://joaoarthurbm.github.io/eda/posts/eda-cache/) — João Arthur Brunet (2019)
