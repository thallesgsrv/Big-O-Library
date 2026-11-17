---
title: "Endereçamento aberto: só perguntas"
weight: 7
description: Uma aula feita só de perguntas para testar se você entendeu sondagem linear, buscas e remoções.
autores:
  - thallesgsrv
baseadoEm:
  - joaoarthurbm
date: 2026-11-17
---

## Direto ao ponto

Esta página não explica nada de novo. Ela parte do princípio de que você já leu a [tabela hash](../tabela-hash/), principalmente a parte de **endereçamento aberto**, e transforma o conteúdo em perguntas. Tente responder cada uma no papel **antes** de abrir o gabarito.

Em todas as perguntas valem as mesmas regras:

- a tabela tem **10 posições** (índices de 0 a 9);
- a função de hash é `hash(chave) = chave % 10`;
- a colisão é resolvida por **sondagem linear**: `indice = (hash(chave) + sondagem) % 10`, com `sondagem` começando em 0;
- a tabela começa vazia em cada pergunta, a menos que o enunciado diga outra coisa.

## Perguntas

### 1. Inserindo com colisões

Insira, nesta ordem, as chaves `15`, `25`, `35` e `5`. Em que posição fica cada uma? Quantas posições foram **examinadas** no total, contando as que estavam ocupadas e a que foi usada?

{{< details title="Gabarito" >}}
Todas têm `hash = 5`.

- `15` vai para a posição 5 (1 posição examinada).
- `25` encontra a 5 ocupada e vai para a 6 (2 examinadas).
- `35` passa pela 5 e pela 6 e vai para a 7 (3 examinadas).
- `5` passa pela 5, 6 e 7 e vai para a 8 (4 examinadas).

Total: \(1 + 2 + 3 + 4 = 10\) posições examinadas. Repare que a soma é uma PA: com \(k\) chaves no mesmo grupo, a última custa \(k\) tentativas.

```text
posição:  0  1  2  3  4  5   6   7   8  9
conteúdo: -  -  -  -  -  15  25  35  5  -
```
{{< /details >}}

### 2. Buscando o que não existe

Na tabela da pergunta 1, busque a chave `45`. Quantas posições a busca examina até concluir que ela **não** está na tabela?

{{< details title="Gabarito" >}}
`hash(45) = 5`. A busca examina as posições 5, 6, 7 e 8 (todas ocupadas, nenhuma com o `45`) e chega na 9, que está **vazia**. Total: 5 posições. Posição vazia é o sinal de parada: se o `45` estivesse na tabela, teria ficado antes de qualquer buraco da sequência.
{{< /details >}}

### 3. O buraco que engana

Ainda na tabela da pergunta 1, remova a chave `25` **colocando `null` na posição 6**. Depois busque a chave `35`. O que a busca responde? Está certo?

{{< details title="Gabarito" >}}
`hash(35) = 5`. A busca olha a posição 5 (é o `15`, não é ele) e depois a posição 6, que agora está **vazia**. Como vazia significa parar, ela responde que o `35` não existe. **Está errado**: o `35` continua na posição 7.

O buraco quebrou a sequência de colisões que levava até ele. É por isso que a remoção não pode deixar `null`: ela precisa deixar um marcador (a "lápide").
{{< /details >}}

### 4. Consertando com lápide

Refaça a pergunta 3, mas agora a remoção coloca um marcador `APAGADO` na posição 6. Como a busca pelo `35` se comporta? E o que acontece se, em seguida, inserirmos a chave `55`?

{{< details title="Gabarito" >}}
A busca pelo `35` olha a 5 (`15`), olha a 6 (`APAGADO`, **segue em frente**, porque lápide não é fim de caminho) e encontra o `35` na 7. Resposta certa, com 3 posições examinadas.

Na inserção do `55` (`hash = 5`), a busca por espaço passa pela 5 (ocupada) e chega na 6, que tem a lápide. Ela pode **reaproveitar** essa posição. O cuidado é que, antes de gravar, uma inserção que também precise evitar chaves repetidas deve continuar procurando até achar uma posição vazia de verdade (para ter certeza de que o `55` ainda não existe mais adiante).
{{< /details >}}

### 5. Dando a volta

Numa tabela vazia, insira `9`, `19` e `29`. Em que posições elas ficam?

{{< details title="Gabarito" >}}
Todas têm `hash = 9`.

- `9` fica na posição 9.
- `19`: `(9 + 0) % 10 = 9` está ocupada. Com `sondagem = 1`, `(9 + 1) % 10 = 0`. Fica na posição 0.
- `29`: a 9 e a 0 estão ocupadas. Com `sondagem = 2`, `(9 + 2) % 10 = 1`. Fica na posição 1.

O `% tamanho` faz a sondagem **dar a volta** no array. Sem ele, a busca por espaço sairia do array.
{{< /details >}}

### 6. Quem não tem nada a ver com a colisão

Considere a tabela `15` na posição 5, `25` na posição 6 e `35` na posição 7, e o resto vazio. Agora insira a chave `16`. Em que posição ela fica e por que isso é um problema, se `16` nem tem o mesmo hash que `15`?

{{< details title="Gabarito" >}}
`hash(16) = 6`. A posição 6 está ocupada (`25`), a 7 também (`35`), e a 8 está livre. A `16` fica na posição 8, depois de **duas** colisões.

O problema é que a `16` foi prejudicada por chaves que **não** têm o mesmo hash que ela. As chaves colidiram em 5 formaram um bloco contínuo de posições ocupadas, e esse bloco passou a atrapalhar também quem chega por perto. Esse efeito se chama **agrupamento primário**: blocos grandes crescem mais rápido, porque são alvos maiores para novas colisões.
{{< /details >}}

### 7. Tabela cheia

Uma tabela de 10 posições está completamente ocupada, sem nenhuma lápide, e ninguém tem a chave `42`. O que acontece se o código de busca usar `for (int sondagem = 0; sondagem < tabela.length; sondagem++)`? E se usássemos um `while (true)`?

{{< details title="Gabarito" >}}
Com o `for`, a busca examina as 10 posições, não acha posição vazia nem a chave e termina devolvendo `-1`. Custo \(O(n)\), porque percorreu a tabela toda. O limite `sondagem < tabela.length` é o que **garante a parada**.

Com `while (true)` e nenhuma posição vazia, a busca nunca encontraria o sinal de parada e ficaria em **laço infinito**, dando voltas na tabela.
{{< /details >}}

### 8. Fator de carga

O fator de carga é \(\alpha = n / m\), com \(n\) chaves e \(m\) posições. Quanto vale \(\alpha\) numa tabela de 10 posições com 8 chaves? Por que o endereçamento aberto sofre mais com \(\alpha\) alto do que o encadeamento? Pode existir \(\alpha > 1\) nos dois?

{{< details title="Gabarito" >}}
\(\alpha = 8 / 10 = 0{,}8\).

No endereçamento aberto, cada chave ocupa **uma posição do próprio array**. Quanto mais cheia a tabela, mais as sondagens precisam andar até achar uma posição livre, e os agrupamentos pioram isso. Perto de \(\alpha = 1\), o custo se aproxima de \(O(n)\).

No encadeamento, uma colisão só aumenta uma lista. A tabela degrada de forma mais suave.

\(\alpha > 1\) só é possível no **encadeamento** (algumas listas têm mais de um nó). No endereçamento aberto, \(\alpha \le 1\) sempre, porque não há onde guardar mais chaves do que posições. Por isso essa estratégia exige **redimensionar** a tabela antes de ela encher.
{{< /details >}}

## Resumo

- Em endereçamento aberto, uma posição **vazia** encerra a busca. Uma posição com **lápide** não encerra.
- Remover com `null` quebra o caminho das colisões. Remover com lápide mantém a busca correta e permite reaproveitar a posição na inserção.
- O `% tamanho` faz a sondagem dar a volta no array, e o limite de tentativas evita laço infinito em tabela cheia.
- Chaves que colidem formam blocos contínuos (agrupamento primário) que atrapalham até chaves com outro hash.
- \(\alpha\) alto piora muito o desempenho, então a tabela precisa ser redimensionada a tempo.

## Notas

- [Uma aula só com perguntas: endereçamento aberto](http://joaoarthurbm.github.io/eda/posts/enderecamento-aberto-so-perguntas) — João Arthur Brunet (2019). Foi a inspiração do formato desta página. As perguntas aqui são originais, e vale ler a aula dele para comparar com outras.
