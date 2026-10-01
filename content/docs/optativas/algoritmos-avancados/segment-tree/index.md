---
title: Árvore de Segmentos (Segment Tree)
weight: 6
description: Consultas de intervalo e atualizações pontuais em tempo logarítmico.
autores:
  - thallesgsrv
date: 2026-09-29
---

A árvore de segmentos responde perguntas como "qual a soma de `a[l..r]`?" e aceita mudanças em elementos do vetor, ambas em \(O(\log n)\).

## Intuição

Pense num torneio de mata-mata: cada nó guarda o resultado de um grupo de elementos (aqui, a soma). Para somar um intervalo qualquer, você não visita todos os elementos: junta poucos blocos prontos que cobrem exatamente o intervalo.

## Visualização

Vetor `[5, 3, 8, 6, 2, 7, 4, 1]`. A animação monta a árvore, consulta `soma[2,6]`, muda `a[3]` para 10 e consulta de novo. Em azul está o nó visitado, em verde os blocos que entram na resposta e em laranja os nós alterados.

{{< viz algoritmo="segtree" >}}

## Código

### Python

```python
class SegTree:
    def __init__(self, a):
        self.n = len(a)
        self.t = [0] * (4 * self.n)
        self._build(a, 1, 0, self.n - 1)

    def _build(self, a, i, l, r):
        if l == r:
            self.t[i] = a[l]
            return
        m = (l + r) // 2
        self._build(a, 2 * i, l, m)
        self._build(a, 2 * i + 1, m + 1, r)
        self.t[i] = self.t[2 * i] + self.t[2 * i + 1]

    def query(self, ql, qr, i=1, l=0, r=None):
        r = self.n - 1 if r is None else r
        if qr < l or r < ql:
            return 0
        if ql <= l and r <= qr:
            return self.t[i]
        m = (l + r) // 2
        return (self.query(ql, qr, 2 * i, l, m) +
                self.query(ql, qr, 2 * i + 1, m + 1, r))

    def update(self, p, v, i=1, l=0, r=None):
        r = self.n - 1 if r is None else r
        if l == r:
            self.t[i] = v
            return
        m = (l + r) // 2
        if p <= m:
            self.update(p, v, 2 * i, l, m)
        else:
            self.update(p, v, 2 * i + 1, m + 1, r)
        self.t[i] = self.t[2 * i] + self.t[2 * i + 1]
```

### Java

```java
class SegTree {
    int n; long[] t;
    SegTree(int[] a) { n = a.length; t = new long[4 * n]; build(a, 1, 0, n - 1); }

    void build(int[] a, int i, int l, int r) {
        if (l == r) { t[i] = a[l]; return; }
        int m = (l + r) / 2;
        build(a, 2 * i, l, m);
        build(a, 2 * i + 1, m + 1, r);
        t[i] = t[2 * i] + t[2 * i + 1];
    }

    long query(int i, int l, int r, int ql, int qr) {
        if (qr < l || r < ql) return 0;
        if (ql <= l && r <= qr) return t[i];
        int m = (l + r) / 2;
        return query(2 * i, l, m, ql, qr) + query(2 * i + 1, m + 1, r, ql, qr);
    }

    void update(int i, int l, int r, int p, int v) {
        if (l == r) { t[i] = v; return; }
        int m = (l + r) / 2;
        if (p <= m) update(2 * i, l, m, p, v); else update(2 * i + 1, m + 1, r, p, v);
        t[i] = t[2 * i] + t[2 * i + 1];
    }
}
```

## Complexidade

| Operação   | Tempo           |
| ---------- | --------------- |
| construção | \(O(n)\)        |
| consulta   | \(O(\log n)\)   |
| atualização pontual | \(O(\log n)\) |

O espaço é \(O(n)\) (o vetor da árvore tem tamanho \(4n\) por segurança). Em qualquer consulta, no máximo dois nós por nível são "parciais", e é isso que garante \(\log n\).

## Quando usar

Serve para soma, mínimo, máximo, MDC e qualquer operação **associativa**, quando há muitas consultas intercaladas com atualizações. Se o vetor nunca muda, uma tabela de prefixos (ou *sparse table*, para mínimo) basta. Para atualizar **intervalos** inteiros, veja a [propagação preguiçosa](../lazy-propagation/).

## Exercícios

1. Quantos nós a consulta `soma[2,6]` visita na animação, e quais blocos entram na resposta?

{{< details title="Gabarito" >}}
Os blocos verdes: `[2,3]`, `[4,5]` e as folhas `[6]`, somando 14 + 9 + 4 = 27. Cada nível tem poucos nós parciais, por isso o total é logarítmico.
{{< /details >}}

2. Como adaptar a árvore para consulta de **mínimo**?

{{< details title="Gabarito" >}}
Troque `+` por `min` na combinação dos filhos e devolva `infinito` (em vez de 0) quando o nó está fora do intervalo.
{{< /details >}}

## Materiais

### Livros e apostilas

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)

## Contribuição

Se você tiver materiais úteis deste algoritmo, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.
