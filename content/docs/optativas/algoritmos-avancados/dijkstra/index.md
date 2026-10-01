---
title: Algoritmo de Dijkstra
weight: 1
description: Menor caminho a partir de uma origem em grafos com pesos não negativos.
autores:
  - thallesgsrv
date: 2026-09-29
---

O Dijkstra encontra a menor distância da origem até todos os outros vértices de um grafo com pesos não negativos.

## Intuição

Imagine uma mancha de tinta se espalhando a partir da origem. Ela sempre alcança primeiro o vértice mais próximo ainda não pintado. Quando um vértice é alcançado, a distância dele é definitiva, porque qualquer outro caminho teria de passar por vértices mais distantes.

## Visualização

Use ▶| para avançar um passo por vez e acompanhe a linha destacada no pseudocódigo. Vermelho é a aresta em análise, azul é o vértice extraído e verde são os vértices finalizados e os caminhos mínimos.

{{< viz algoritmo="dijkstra" >}}

## Código

### Python

```python
import heapq

def dijkstra(grafo, origem):
    dist = {v: float("inf") for v in grafo}
    dist[origem] = 0
    fila = [(0, origem)]
    visitado = set()
    while fila:
        d, u = heapq.heappop(fila)
        if u in visitado:
            continue
        visitado.add(u)
        for v, w in grafo[u]:
            if d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(fila, (dist[v], v))
    return dist
```

### Java

```java
static int[] dijkstra(List<int[]>[] g, int origem) {
    int[] dist = new int[g.length];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[origem] = 0;
    PriorityQueue<int[]> fila = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    fila.add(new int[]{0, origem});
    while (!fila.isEmpty()) {
        int[] top = fila.poll();
        int d = top[0], u = top[1];
        if (d > dist[u]) continue;           // entrada velha
        for (int[] e : g[u]) {               // e = {vizinho, peso}
            if (d + e[1] < dist[e[0]]) {
                dist[e[0]] = d + e[1];
                fila.add(new int[]{dist[e[0]], e[0]});
            }
        }
    }
    return dist;
}
```

## Complexidade

Com fila de prioridade (heap), o tempo é

$$
O((V + E)\log V)
$$

e o espaço é \(O(V + E)\).

| Implementação         | Tempo                  |
| --------------------- | ---------------------- |
| Vetor simples         | \(O(V^2)\)             |
| Heap binário          | \(O((V+E)\log V)\)     |
| Heap de Fibonacci     | \(O(E + V\log V)\)     |

## Quando usar

> [!WARNING]
> Dijkstra **não funciona com pesos negativos**. Uma aresta negativa pode melhorar um vértice já finalizado. Use Bellman-Ford nesses casos.

Use para rotas em mapas, roteamento de redes e qualquer menor caminho com custos não negativos.

## Exercícios

1. Execute o algoritmo à mão partindo de **C** no grafo da animação. Qual é a distância final até E?

{{< details title="Gabarito" >}}
C→F custa 2, F→E custa 9, total 11. A alternativa C→D→E custa 17.
{{< /details >}}

2. Por que a fila pode conter o mesmo vértice duas vezes? Como o código lida com isso?

{{< details title="Gabarito" >}}
Em vez de atualizar a prioridade, inserimos uma nova entrada. A entrada antiga é descartada ao ser extraída (`if u in visitado: continue`).
{{< /details >}}

## Materiais

### Livros e apostilas

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)

## Contribuição

Se você tiver materiais úteis deste algoritmo, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.
