---
title: Menor Ancestral Comum (LCA)
weight: 4
description: Ancestral comum mais profundo de dois nós de uma árvore, com binary lifting.
autores:
  - thallesgsrv
date: 2026-09-29
---

O LCA de dois nós `u` e `v` de uma árvore enraizada é o ancestral comum mais distante da raiz (o mais "baixo").

## Intuição

Em uma árvore genealógica, o LCA de dois primos é o avô que eles têm em comum. A estratégia do *binary lifting* é subir em **saltos de potência de 2**: primeiro nivela os dois nós na mesma profundidade, depois sobe os dois juntos com os maiores saltos que ainda os deixam em nós **diferentes**. O pai de onde pararam é o LCA.

## Visualização

Consulta `LCA(H, J)`. A tabela mostra `up[k][v]` (o ancestral `2^k` níveis acima) e o número sob cada nó é a profundidade. Em azul está `u`, em laranja `v` e em verde o resultado.

{{< viz algoritmo="lca" >}}

## Código

### Python

```python
LOG = 17  # 2^17 > 100 mil nós

def preprocessa(pai, n):
    # pai[raiz] = raiz
    up = [pai[:]]
    for k in range(1, LOG):
        up.append([up[k - 1][up[k - 1][v]] for v in range(n)])
    return up

def lca(u, v, up, prof):
    if prof[u] < prof[v]:
        u, v = v, u
    for k in range(LOG - 1, -1, -1):          # nivela
        if prof[u] - (1 << k) >= prof[v]:
            u = up[k][u]
    if u == v:
        return u
    for k in range(LOG - 1, -1, -1):          # sobe juntos
        if up[k][u] != up[k][v]:
            u, v = up[k][u], up[k][v]
    return up[0][u]
```

### Java

```java
static final int LOG = 17;
static int[][] up;   // up[k][v]; up[0][raiz] = raiz
static int[] prof;

static int lca(int u, int v) {
    if (prof[u] < prof[v]) { int tmp = u; u = v; v = tmp; }
    for (int k = LOG - 1; k >= 0; k--)
        if (prof[u] - (1 << k) >= prof[v]) u = up[k][u];
    if (u == v) return u;
    for (int k = LOG - 1; k >= 0; k--)
        if (up[k][u] != up[k][v]) { u = up[k][u]; v = up[k][v]; }
    return up[0][u];
}
```

## Complexidade

| Etapa            | Tempo                  |
| ---------------- | ---------------------- |
| pré-processamento | \(O(n \log n)\)       |
| cada consulta    | \(O(\log n)\)         |

O espaço é \(O(n \log n)\), pela tabela `up`.

## Quando usar

Distância entre dois nós (`prof[u] + prof[v] - 2·prof[lca]`), caminhos em árvores e consultas em lote. Para muitas consultas com resposta em \(O(1)\), existe a variante com *Euler tour* e tabela esparsa (RMQ).

> [!NOTE]
> Todo salto precisa respeitar que a raiz aponta para si mesma. Assim `up[k][v]` nunca "sai" da árvore.

## Exercícios

1. Na animação, por que `u` sobe só 1 nível na primeira fase?

{{< details title="Gabarito" >}}
`H` tem profundidade 4 e `J` tem 3. A diferença é 1, que é `2^0`, então só o salto de `k=0` cabe sem passar do nível de `v`.
{{< /details >}}

2. Qual a distância entre `H` e `J` na árvore?

{{< details title="Gabarito" >}}
O LCA é `B` (profundidade 1): `4 + 3 - 2·1 = 5` arestas.
{{< /details >}}

## Materiais

### Livros e apostilas

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)

## Contribuição

Se você tiver materiais úteis deste algoritmo, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.
