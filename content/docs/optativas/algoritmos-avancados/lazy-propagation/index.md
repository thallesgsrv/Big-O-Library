---
title: Propagação Preguiçosa (Lazy Propagation)
weight: 7
description: Atualizações em intervalo na árvore de segmentos em O(log n), adiando o trabalho.
autores:
  - thallesgsrv
date: 2026-09-29
---

Com a propagação preguiçosa, a [árvore de segmentos](../segment-tree/) também soma um valor a **todo um intervalo** em \(O(\log n)\), em vez de atualizar elemento por elemento.

## Intuição

É como o chefe que avisa "todo mundo deste setor ganha +3" e anota isso num post-it na porta do setor, sem ir de mesa em mesa. Só quando alguém precisa olhar uma mesa específica o aviso é repassado para as subáreas. Esse post-it é o `lazy` do nó.

## Visualização

Vetor `[5, 3, 8, 6, 2, 7, 4, 1]`. A animação soma 3 em `[2,5]` (repare nos selos laranja `+3` que ficam pendentes sem descer até as folhas) e depois consulta `soma[3,6]`, que força o empurrão (*push*) das pendências.

{{< viz algoritmo="lazy" >}}

## Código

### Python

```python
def push(i, l, r):
    if lz[i]:
        m = (l + r) // 2
        for c, cl, cr in ((2 * i, l, m), (2 * i + 1, m + 1, r)):
            t[c] += lz[i] * (cr - cl + 1)
            lz[c] += lz[i]
        lz[i] = 0

def update(i, l, r, ql, qr, v):
    if qr < l or r < ql:
        return
    if ql <= l and r <= qr:
        t[i] += v * (r - l + 1)
        lz[i] += v
        return
    push(i, l, r)
    m = (l + r) // 2
    update(2 * i, l, m, ql, qr, v)
    update(2 * i + 1, m + 1, r, ql, qr, v)
    t[i] = t[2 * i] + t[2 * i + 1]

def query(i, l, r, ql, qr):
    if qr < l or r < ql:
        return 0
    if ql <= l and r <= qr:
        return t[i]
    push(i, l, r)
    m = (l + r) // 2
    return query(2 * i, l, m, ql, qr) + query(2 * i + 1, m + 1, r, ql, qr)
```

### Java

```java
static long[] t, lz;

static void push(int i, int l, int r) {
    if (lz[i] == 0) return;
    int m = (l + r) / 2;
    t[2 * i] += lz[i] * (m - l + 1);      lz[2 * i] += lz[i];
    t[2 * i + 1] += lz[i] * (r - m);      lz[2 * i + 1] += lz[i];
    lz[i] = 0;
}

static void update(int i, int l, int r, int ql, int qr, long v) {
    if (qr < l || r < ql) return;
    if (ql <= l && r <= qr) { t[i] += v * (r - l + 1); lz[i] += v; return; }
    push(i, l, r);
    int m = (l + r) / 2;
    update(2 * i, l, m, ql, qr, v);
    update(2 * i + 1, m + 1, r, ql, qr, v);
    t[i] = t[2 * i] + t[2 * i + 1];
}

static long query(int i, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return t[i];
    push(i, l, r);
    int m = (l + r) / 2;
    return query(2 * i, l, m, ql, qr) + query(2 * i + 1, m + 1, r, ql, qr);
}
```

## Complexidade

Atualização e consulta de intervalo: \(O(\log n)\) cada. Espaço: \(O(n)\) (dois vetores de tamanho \(4n\)). Sem o `lazy`, uma atualização de intervalo custaria \(O(n)\).

> [!WARNING]
> Sempre chame `push` **antes de descer** nos filhos, tanto na atualização quanto na consulta. Esquecer isso é o bug mais comum: os filhos ficam com valores velhos.

## Quando usar

Quando há muitas atualizações de intervalo misturadas com consultas de intervalo (somar em faixa e perguntar a soma, atribuir valor a uma faixa, etc.). A operação precisa permitir "acumular" um valor sem abrir o intervalo.

## Exercícios

1. Na animação, por que o nó `[2,3]` precisou empurrar o `+3` para as folhas na consulta `soma[3,6]`?

{{< details title="Gabarito" >}}
A consulta pede só a folha `[3]`, então o nó `[2,3]` é apenas parcial. Para olhar um filho com segurança, o valor pendente do pai precisa ser repassado antes (`push`).
{{< /details >}}

2. Qual o resultado de `soma[3,6]` após somar 3 em `[2,5]`?

{{< details title="Gabarito" >}}
O vetor vira `[5,3,11,9,5,10,4,1]`, e `9 + 5 + 10 + 4 = 28`.
{{< /details >}}

## Materiais

### Livros e apostilas

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)

## Contribuição

Se você tiver materiais úteis deste algoritmo, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.
