---
title: SAT Solvers
weight: 1
description: SAT Problem, simplificação, unit propagation, backtracking e o método DPLL.
autores:
  - JuaooRMS
date: 2026-11-17
---

## Sobre

Bora entender como um computador resolve um problema que, à primeira vista, parece só tentativa e erro? Na página de FNC vimos que a **validade** ficava fácil: basta olhar cada cláusula. Para a **satisfazibilidade**, não existe um atalho tão simples. Aqui você vai ver como programas chamados *SAT solvers* atacam esse problema e vai destrinchar o algoritmo clássico por trás da maioria deles: o **DPLL**.

> [!NOTE]
> **Antes de começar, ajuda ter à mão:**
>
> - cláusulas e literais, da página de [Forma normal conjuntiva](../../estagio1/forma-normal-conjuntiva/);
> - a ideia de *modelo* (uma atribuição que torna a fórmula verdadeira), da página de [Tabela-verdade](../../estagio1/tabela-verdade/).
>
> Se alguma dessas ideias estiver nebulosa, vale uma passada rápida por lá primeiro.

Ao final você deve conseguir:

- explicar o que é o problema SAT e apresentar exemplos reais, como agendamento e gerenciadores de pacotes;
- aplicar as regras de **simplificação** e **unit propagation** sobre um conjunto de cláusulas;
- executar o DPLL manualmente, utilizando *backtracking*, e interpretar seus resultados;
- decidir a validade de um argumento utilizando um SAT solver, por meio da negação da fórmula;
- identificar e evitar os erros mais comuns do método.

Não precisa decorar nada disso agora: o segredo está em entender o raciocínio, e a gente constrói cada peça com exemplos.

## 1. Recapitulando: validade e FNC

Para saber se um argumento $\varphi_1,\ldots,\varphi_n \models \psi$ é válido, reduzimos o problema para verificar a validade de:

$$
\alpha = \varphi_1 \to (\varphi_2 \to \ldots (\varphi_n \to \psi)\ldots)
$$

Depois, convertemos $\alpha$ para FNC e testamos sua validade cláusula por cláusula.

Olha só: esse caminho tem dois problemas:

- A conversão para FNC pode aumentar consideravelmente o tamanho da fórmula.
- A tabela-verdade possui $2^n$ linhas para $n$ variáveis.

É nesse contexto que surgem os **SAT solvers**. Eles recebem fórmulas em FNC e respondem a uma pergunta: *essa fórmula possui algum modelo?*

> [!TIP]
> **Aqui está o pulo do gato: como usar um solver para verificar validade?**
>
> Uma fórmula $\alpha$ é válida se, e somente se, sua negação é insatisfazível:
>
> $$
> \alpha \text{ é válida} \iff \neg\alpha \text{ é insatisfazível}
> $$
>
> Portanto, converta $\neg\alpha$ para FNC e execute o solver:
>
> - **UNSAT:** $\alpha$ é válida.
> - **SAT:** $\alpha$ é inválida, e o modelo encontrado representa um contraexemplo.

## 2. O problema SAT

**SAT** (do inglês *satisfiability*) é o problema de determinar, dada uma fórmula proposicional, se existe uma atribuição de valores às variáveis que torne a fórmula verdadeira.

Pense num quebra-cabeça de restrições, como marcar um almoço entre amigos com agendas diferentes: o SAT pergunta se existe *algum* jeito de respeitar todas as restrições ao mesmo tempo. Esse exemplo aparece completo na seção 3.

Existem dois resultados possíveis:

- **Satisfazível (SAT):** existe uma atribuição que torna a fórmula verdadeira. Essa atribuição é chamada de **modelo**.
- **Insatisfazível (UNSAT):** não existe nenhuma atribuição capaz de tornar a fórmula verdadeira.

É o mesmo problema que o tableaux semântico resolvia: verificar se existe um modelo. A diferença é que os SAT solvers trabalham diretamente com fórmulas em FNC e utilizam algoritmos otimizados para lidar com fórmulas grandes.

### Representação por conjuntos

Uma fórmula em FNC costuma ser representada como um conjunto de cláusulas, sendo cada cláusula um conjunto de literais.

Por exemplo:

$$
\begin{aligned}
F = \{&\{p,q\},\{p,\neg q\},\\
&\{\neg p,q\},\{\neg p,\neg q,\neg r\},\\
&\{\neg p,r\}\}
\end{aligned}
$$

Essa representação equivale à fórmula:

$$
\begin{aligned}
&(p\lor q)\land(p\lor\neg q)\\
&\land(\neg p\lor q)\\
&\land(\neg p\lor\neg q\lor\neg r)\\
&\land(\neg p\lor r)
\end{aligned}
$$

A ordem dos literais e das cláusulas não importa, e as repetições são eliminadas.

## 3. Aplicações do problema SAT

O problema SAT aparece em diversas situações práticas nas quais precisamos encontrar uma combinação de valores que respeite determinadas restrições.

### Exemplo: organização de um almoço

Bora a um exemplo do dia a dia: quatro amigos querem almoçar juntos de segunda a sexta, mas cada um tem suas restrições:

- Ana não pode na sexta-feira.
- Johnny só pode na segunda ou na quarta-feira.
- Mike não pode na terça nem na quinta-feira.
- Jane almoça com a mãe na quarta e na quinta-feira.

Calma, vamos por partes. Primeiro criamos uma variável para cada pessoa e dia. Por exemplo, $Ana^{seg}$ representa que Ana pode almoçar na segunda-feira.

A fórmula que representa as restrições de cada pessoa é:

**Ana:**

$$
(Ana^{seg}\lor Ana^{ter}\lor Ana^{qua}\lor Ana^{qui})
\land\neg Ana^{sex}
$$

**Johnny:**

$$
(Johnny^{seg}\lor Johnny^{qua})
\land\neg Johnny^{ter}
\land\neg Johnny^{qui}
\land\neg Johnny^{sex}
$$

**Mike:**

$$
(Mike^{seg}\lor Mike^{qua}\lor Mike^{sex})
\land\neg Mike^{ter}
\land\neg Mike^{qui}
$$

**Jane:**

$$
(Jane^{seg}\lor Jane^{ter}\lor Jane^{sex})
\land\neg Jane^{qua}
\land\neg Jane^{qui}
$$

Verificando os dias disponíveis (✓ pode, ✗ não pode):

| Dia | Ana | Johnny | Mike | Jane | Todos? |
|---|---|---|---|---|---|
| Segunda | ✓ | ✓ | ✓ | ✓ | **✓** |
| Terça | ✓ | ✗ | ✗ | ✓ | ✗ |
| Quarta | ✓ | ✓ | ✓ | ✗ | ✗ |
| Quinta | ✓ | ✗ | ✗ | ✗ | ✗ |
| Sexta | ✗ | ✗ | ✓ | ✓ | ✗ |

O único dia em que todos podem almoçar é **segunda-feira**.

> [!NOTE]
> A fórmula apresentada descreve a disponibilidade de cada pessoa separadamente. Para o solver encontrar automaticamente um dia em comum, precisamos acrescentar uma variável por dia, como $d^{seg}$, e cláusulas que relacionem essa variável à disponibilidade de cada pessoa.
>
> Também precisamos adicionar uma cláusula garantindo que pelo menos um dia seja escolhido:
>
> $$
> d^{seg}\lor d^{ter}\lor d^{qua}\lor d^{qui}\lor d^{sex}
> $$

## 4. Árvore de decisão e backtracking

### Testando todas as possibilidades

Uma maneira simples de resolver SAT seria testar todas as atribuições possíveis das variáveis.

Podemos representar esse processo como uma **árvore de decisão**, na qual cada nível determina o valor de uma variável.

Por exemplo, com três variáveis $p,q,r$, teríamos:

- Primeiro nível: decidir $p$.
- Segundo nível: decidir $q$.
- Terceiro nível: decidir $r$.

Com $n$ variáveis, a árvore possui até $2^n$ folhas, assim como uma tabela-verdade.

### Podando a árvore: backtracking

Olha só: dá para melhorar bastante isso. Não precisamos chegar até uma folha quando já sabemos que determinado caminho não pode produzir um modelo.

Considere:

$$
\begin{aligned}
F=\{&
(p\lor q),\\
&(p\lor\neg q),\\
&(\neg p\lor q),\\
&(\neg p\lor\neg q\lor\neg r),\\
&(\neg p\lor r)
\}
\end{aligned}
$$

Suponha que decidimos:

$$
p=V,\quad q=F
$$

A cláusula:

$$
\neg p\lor q
$$

torna-se:

$$
F\lor F=F
$$

Nenhum valor de $r$ poderá corrigir essa situação.

Portanto, podemos descartar toda a subárvore abaixo dessa atribuição, sem testar $r=V$ ou $r=F$.

Essa estratégia é chamada de **backtracking**.

O backtracking consiste em voltar atrás quando uma atribuição parcial já falsifica alguma cláusula, abandonando aquele caminho e tentando outra possibilidade.

Veja a árvore de decisão completa para o mesmo conjunto $F$, decidindo $p$, depois $q$ e depois $r$:

<figure class="bo-arv"><div class="bo-arv-sc" tabindex="0" role="group" aria-label="Árvore de decisão com backtracking"><svg viewBox="0 0 760 352" role="img" aria-labelledby="arv1-t arv1-d" style="min-width:640px"><title id="arv1-t">Árvore de decisão com backtracking</title><desc id="arv1-d">Decide p, depois q, depois r. Os cinco caminhos terminam em conflito: p falso com q falso falsifica p ou q; p falso com q verdadeiro falsifica p ou não q; p verdadeiro com q falso falsifica não p ou q; p verdadeiro, q verdadeiro e r falso falsifica não p ou r; p, q e r verdadeiros falsifica não p ou não q ou não r.</desc><line class="e" x1="312" y1="40" x2="160" y2="130"/><line class="e" x1="312" y1="40" x2="465" y2="130"/><line class="e" x1="160" y1="130" x2="90" y2="220"/><line class="e" x1="160" y1="130" x2="230" y2="220"/><line class="e" x1="465" y1="130" x2="360" y2="220"/><line class="e" x1="465" y1="130" x2="570" y2="220"/><line class="e" x1="570" y1="220" x2="500" y2="310"/><line class="e" x1="570" y1="220" x2="640" y2="310"/><text class="l" x="226" y="80" text-anchor="middle">F</text><text class="l" x="404" y="80" text-anchor="middle">V</text><text class="l" x="112" y="170" text-anchor="middle">F</text><text class="l" x="218" y="170" text-anchor="middle">V</text><text class="l" x="396" y="170" text-anchor="middle">F</text><text class="l" x="540" y="170" text-anchor="middle">V</text><text class="l" x="522" y="262" text-anchor="middle">F</text><text class="l" x="612" y="262" text-anchor="middle">V</text><g class="n"><circle cx="312" cy="40" r="21"/><text x="312" y="41">p</text></g><g class="n"><circle cx="160" cy="130" r="21"/><text x="160" y="131">q</text></g><g class="n"><circle cx="465" cy="130" r="21"/><text x="465" y="131">q</text></g><g class="n"><circle cx="570" cy="220" r="21"/><text x="570" y="221">r</text></g><g class="x"><rect x="31" y="193" width="118" height="54" rx="9"/><text class="m" x="90" y="215" text-anchor="middle">✗</text><text class="c" x="90" y="236" text-anchor="middle">p ∨ q</text></g><g class="x"><rect x="171" y="193" width="118" height="54" rx="9"/><text class="m" x="230" y="215" text-anchor="middle">✗</text><text class="c" x="230" y="236" text-anchor="middle">p ∨ ¬q</text></g><g class="x"><rect x="301" y="193" width="118" height="54" rx="9"/><text class="m" x="360" y="215" text-anchor="middle">✗</text><text class="c" x="360" y="236" text-anchor="middle">¬p ∨ q</text></g><g class="x"><rect x="441" y="283" width="118" height="54" rx="9"/><text class="m" x="500" y="305" text-anchor="middle">✗</text><text class="c" x="500" y="326" text-anchor="middle">¬p ∨ r</text></g><g class="x"><rect x="575" y="283" width="130" height="54" rx="9"/><text class="m" x="640" y="305" text-anchor="middle">✗</text><text class="c" x="640" y="326" text-anchor="middle">¬p ∨ ¬q ∨ ¬r</text></g><text class="r" x="160" y="266" text-anchor="middle">r nem foi decidido</text><text class="r" x="360" y="266" text-anchor="middle">r nem foi decidido</text><text class="r" x="752" y="44" text-anchor="end">decide p</text><text class="r" x="752" y="134" text-anchor="end">decide q</text><text class="r" x="752" y="224" text-anchor="end">decide r</text></svg></div><figcaption>Árvore de decisão de <em>F</em> com backtracking. Cada ✗ é um ramo encerrado, e o texto dentro dele é a cláusula que ficou falsa. Em vez de 8 folhas, foram 5 caminhos.</figcaption></figure>

Os ramos que começam com $p=F$ morrem logo depois de decidir $q$, e o ramo $p=V,q=F$ também. Só o caminho $p=V,q=V$ precisa chegar a $r$. Como **todos** os ramos terminaram em ✗, o conjunto $F$ é insatisfazível (vamos confirmar isso com unit propagation na seção 6).

> [!IMPORTANT]
> Um ramo marcado com $\times$ significa que aquela atribuição parcial já produziu uma contradição.
>
> Isso não significa que a fórmula inteira é insatisfazível. Só podemos concluir UNSAT quando todos os caminhos possíveis forem descartados.

Até aqui, tranquilo? A ideia central é que um ramo só morre quando alguma cláusula já ficou falsa. Nas próximas seções vamos aprender a perceber isso mais cedo, e com menos trabalho.

## 5. Simplificação

A **simplificação** é uma operação utilizada para reduzir o conjunto de cláusulas sempre que atribuímos um valor a uma variável.

Considere que decidimos:

$$
p=V
$$

Existem duas situações:

1. Uma cláusula que contém $p$ torna-se verdadeira. Portanto, podemos remover a cláusula inteira.
2. Uma cláusula que contém $\neg p$ perde esse literal, pois ele se tornou falso.

Se decidirmos:

$$
p=F
$$

O processo é invertido:

1. Uma cláusula que contém $p$ perde esse literal.
2. Uma cláusula que contém $\neg p$ torna-se verdadeira e pode ser removida.

Resumindo as duas situações:

| Decisão | Cláusula que contém $p$ | Cláusula que contém $\neg p$ |
|---|---|---|
| $p=V$ | ✓ **sai** (já é verdadeira) | perde o literal $\neg p$ |
| $p=F$ | perde o literal $p$ | ✓ **sai** (já é verdadeira) |

### Exemplo de simplificação

Utilizando novamente o conjunto (a coluna *Por quê* mostra o motivo de cada linha):

$$
\begin{aligned}
F=\{&
p\lor q,\\
&p\lor\neg q,\\
&\neg p\lor q,\\
&\neg p\lor\neg q\lor\neg r,\\
&\neg p\lor r
\}
\end{aligned}
$$

Supondo $p=V$, temos:

| Cláusula | Resultado | Por quê |
|---|---|---|
| $p\lor q$ | ✓ **sai** | contém $p$, verdadeiro com $p=V$ |
| $p\lor\neg q$ | ✓ **sai** | contém $p$, verdadeiro com $p=V$ |
| $\neg p\lor q$ | $q$ · **unidade** | $\neg p$ é falso com $p=V$ e sai da cláusula |
| $\neg p\lor\neg q\lor\neg r$ | $\neg q\lor\neg r$ | $\neg p$ é falso com $p=V$ e sai da cláusula |
| $\neg p\lor r$ | $r$ · **unidade** | $\neg p$ é falso com $p=V$ e sai da cláusula |

Duas situações especiais podem acontecer durante a simplificação:

**Cláusula vazia:** todos os literais ficaram falsos. A cláusula possui valor F e representa um conflito. O ramo deve ser encerrado.

**Conjunto vazio de cláusulas:** todas as cláusulas foram satisfeitas e removidas. Encontramos um modelo.

> [!WARNING]
> Esse é um erro bem comum: confundir cláusula vazia com conjunto vazio de cláusulas.
>
> - Cláusula vazia = F (conflito).
> - Nenhuma cláusula sobrando = V (sucesso).
>
> Um OU de nada é falso, enquanto um E de nada é verdadeiro.

## 6. Unit propagation

Chegamos à ideia que mais economiza trabalho no DPLL.

Uma **cláusula unitária**, também chamada de *unit*, é uma cláusula que possui apenas um literal.

Exemplos:

$$
\{p\},\quad\{\neg q\}
$$

Para que essas cláusulas sejam verdadeiras, seus valores são obrigatórios:

- $\{p\}$ exige $p=V$.
- $\{\neg q\}$ exige $q=F$.

A técnica de **unit propagation** consiste em encontrar cláusulas unitárias, atribuir os valores forçados e simplificar novamente o conjunto.

Esse processo deve ser repetido até que não existam mais cláusulas unitárias.

Não há decisões ou tentativas durante a propagação: apenas aplicamos consequências obrigatórias.

### Exemplo: propagação no conjunto de cláusulas

Voltando ao exemplo anterior, vamos analisar os dois possíveis valores de $p$.

**Caso 1: $p=F$**

Após a simplificação:

| Cláusula | Resultado | Por quê |
|---|---|---|
| $p\lor q$ | $q$ · **unidade** | $p$ é falso com $p=F$ e sai da cláusula |
| $p\lor\neg q$ | $\neg q$ · **unidade** | $p$ é falso com $p=F$ e sai da cláusula |
| $\neg p\lor q$ | ✓ **sai** | contém $\neg p$, verdadeiro com $p=F$ |
| $\neg p\lor\neg q\lor\neg r$ | ✓ **sai** | contém $\neg p$, verdadeiro com $p=F$ |
| $\neg p\lor r$ | ✓ **sai** | contém $\neg p$, verdadeiro com $p=F$ |

Temos duas cláusulas unitárias:

$$
\{q\},\quad\{\neg q\}
$$

A primeira exige $q=V$, enquanto a segunda exige $q=F$.

Portanto, encontramos um conflito e o ramo é encerrado.

Não precisamos testar os outros valores de $q$ ou observar $r$.

**Caso 2: $p=V$**

Após a simplificação, temos:

$$
\{q\},\quad\{\neg q\lor\neg r\},\quad\{r\}
$$

A cláusula unitária $\{q\}$ força:

$$
q=V
$$

Assim, a cláusula:

$$
\neg q\lor\neg r
$$

torna-se:

$$
\neg r
$$

Agora temos as unidades:

$$
\{r\},\quad\{\neg r\}
$$

Novamente encontramos um conflito.

Como os dois possíveis valores de $p$ produziram conflitos, concluímos que o conjunto é **insatisfazível**.

Compare com a árvore da seção 4: com unit propagation, uma única decisão bastou, e as 5 folhas viraram 2.

<figure class="bo-arv"><div class="bo-arv-sc" tabindex="0" role="group" aria-label="Árvore do DPLL para o mesmo conjunto"><svg viewBox="0 0 600 250" role="img" aria-labelledby="arv2-t arv2-d" style="min-width:520px"><title id="arv2-t">Árvore do DPLL para o mesmo conjunto</title><desc id="arv2-d">Uma decisão em p. Com p falso aparecem as unidades q e não q, conflito. Com p verdadeiro, q é unidade, depois r e não r aparecem, conflito.</desc><line class="e" x1="300" y1="40" x2="150" y2="160"/><line class="e" x1="300" y1="40" x2="450" y2="160"/><text class="l" x="214" y="92" text-anchor="middle">F</text><text class="l" x="386" y="92" text-anchor="middle">V</text><g class="n"><circle cx="300" cy="40" r="21"/><text x="300" y="41">p</text></g><g class="x"><rect x="25" y="133" width="250" height="54" rx="9"/><text class="m" x="150" y="155" text-anchor="middle">✗ conflito</text><text class="c" x="150" y="176" text-anchor="middle">unidades q e ¬q</text></g><g class="x"><rect x="325" y="133" width="250" height="54" rx="9"/><text class="m" x="450" y="155" text-anchor="middle">✗ conflito</text><text class="c" x="450" y="176" text-anchor="middle">após q=V: unidades r e ¬r</text></g><text class="r" x="150" y="214" text-anchor="middle">propagação, sem decidir mais nada</text><text class="r" x="450" y="214" text-anchor="middle">propagação, sem decidir mais nada</text></svg></div><figcaption>O mesmo conjunto <em>F</em> resolvido pelo DPLL: uma única decisão (<em>p</em>) e os dois ramos morrem por unit propagation.</figcaption></figure>

### Exemplo: cascata de unidades

Considere:

$$
\{a\lor b,\neg a\lor c,\neg c\lor d,a\}
$$

Aplicando a propagação:

1. A cláusula unitária $a$ força $a=V$.
2. A cláusula $a\lor b$ é removida, enquanto $\neg a\lor c$ transforma-se em $c$.
3. Agora $c$ é uma unidade, forçando $c=V$.
4. A cláusula $\neg c\lor d$ transforma-se em $d$.
5. A unidade $d$ força $d=V$.

O conjunto de cláusulas fica vazio.

Portanto, encontramos um modelo:

$$
a=V,\quad c=V,\quad d=V
$$

A variável $b$ pode assumir qualquer valor, pois não aparece mais nas cláusulas restantes.

## 7. O algoritmo DPLL

Hora de juntar as peças.

O algoritmo **DPLL** recebeu esse nome em homenagem aos seus criadores: Davis, Putnam, Logemann e Loveland.

Ele combina três ideias principais:

- **Backtracking:** voltar atrás quando uma atribuição produz conflito.
- **Simplificação:** remover cláusulas satisfeitas e literais falsos.
- **Unit propagation:** propagar os valores obrigatórios das cláusulas unitárias.

### Funcionamento do algoritmo

```text
DPLL(F):
    F ← propaga unidades e simplifica F

    se F não tem cláusulas:
        devolve SAT (modelo = atribuições feitas)

    se F tem cláusula vazia:
        devolve UNSAT (volta atrás)

    escolhe uma variável x de F

    se DPLL(F com x = V) é SAT:
        devolve SAT

    devolve DPLL(F com x = F)
```

Em outras palavras:

1. Aplique unit propagation até não existirem mais cláusulas unitárias.
2. Se não houver cláusulas restantes, encontramos um modelo.
3. Se existir uma cláusula vazia, encontramos um conflito e precisamos voltar atrás.
4. Caso contrário, escolha uma variável e decida seu valor.
5. Se a primeira tentativa falhar, teste o valor oposto.

Só podemos concluir que uma fórmula é insatisfazível quando todas as alternativas das decisões foram exploradas e produziram conflitos.

> [!NOTE]
> A versão original do DPLL também inclui a **eliminação de literal puro**. Uma variável que aparece somente positiva ou somente negativa pode receber o valor que satisfaz todas as cláusulas em que aparece.
>
> Nesta página, o foco está nas três ideias principais: backtracking, simplificação e unit propagation.

## 8. Exemplos resolvidos

### Exemplo 1

Considere a fórmula:

$$
(\neg p\lor\neg q)\land(p\lor\neg q)\land(\neg p\lor q)
$$

Decidimos:

$$
p=F
$$

Simplificando:

| Cláusula | Resultado | Por quê |
|---|---|---|
| $\neg p\lor\neg q$ | ✓ **sai** | contém $\neg p$, verdadeiro com $p=F$ |
| $p\lor\neg q$ | $\neg q$ · **unidade** | $p$ é falso com $p=F$ e sai da cláusula |
| $\neg p\lor q$ | ✓ **sai** | contém $\neg p$, verdadeiro com $p=F$ |

A unidade $\neg q$ força:

$$
q=F
$$

Todas as cláusulas foram satisfeitas.

**Resultado: satisfazível.**

Um modelo é:

$$
p=F,\quad q=F
$$

Conferindo:

$$
\begin{aligned}
\neg p\lor\neg q &= V\\
p\lor\neg q &= V\\
\neg p\lor q &= V
\end{aligned}
$$

O outro ramo, $p=V$, produziria as unidades $\neg q$ e $q$, gerando um conflito. Entretanto, o algoritmo já pode parar ao encontrar o primeiro modelo.

### Exemplo 2

Considere:

$$
\begin{aligned}
F={}&(\neg p\lor\neg q\lor r)\\
&\land(\neg p\lor q\lor\neg r)\\
&\land(\neg p\lor q\lor r)\\
&\land(p\lor\neg q\lor r)\\
&\land(p\lor q\lor r)
\end{aligned}
$$

Decidimos:

$$
p=F
$$

Simplificando:

| Cláusula | Resultado | Por quê |
|---|---|---|
| $\neg p\lor\neg q\lor r$ | ✓ **sai** | contém $\neg p$, verdadeiro com $p=F$ |
| $\neg p\lor q\lor\neg r$ | ✓ **sai** | contém $\neg p$, verdadeiro com $p=F$ |
| $\neg p\lor q\lor r$ | ✓ **sai** | contém $\neg p$, verdadeiro com $p=F$ |
| $p\lor\neg q\lor r$ | $\neg q\lor r$ | $p$ é falso com $p=F$ e sai da cláusula |
| $p\lor q\lor r$ | $q\lor r$ | $p$ é falso com $p=F$ e sai da cláusula |

Não existem cláusulas unitárias. Portanto, precisamos realizar outra decisão.

Escolhemos:

$$
r=V
$$

As duas cláusulas restantes são satisfeitas.

**Resultado: satisfazível.**

Um modelo é:

$$
p=F,\quad r=V
$$

A variável $q$ pode assumir qualquer valor.

> [!NOTE]
> O ramo $p=V$ **não** é um conflito: a atribuição $p=V$, $q=V$, $r=V$ também satisfaz as cinco cláusulas. Isso não altera o resultado, porque o DPLL pode encerrar a busca assim que encontra o primeiro modelo, sem precisar explorar esse ramo.

### Exemplo 3

Considere:

$$
(A\lor\neg B)\land(B\lor C)\land(\neg A\lor\neg C)
$$

Decidimos:

$$
A=V
$$

Simplificando:

| Cláusula | Resultado | Por quê |
|---|---|---|
| $A\lor\neg B$ | ✓ **sai** | contém $A$, verdadeiro com $A=V$ |
| $B\lor C$ | $B\lor C$ | não contém $A$ nem $\neg A$ |
| $\neg A\lor\neg C$ | $\neg C$ · **unidade** | $\neg A$ é falso com $A=V$ e sai da cláusula |

A unidade $\neg C$ força:

$$
C=F
$$

Assim, a cláusula $B\lor C$ transforma-se em:

$$
B
$$

Logo:

$$
B=V
$$

Todas as cláusulas foram satisfeitas.

**Resultado: satisfazível.**

Modelo:

$$
A=V,\quad B=V,\quad C=F
$$

Foram necessárias uma decisão ($A=V$) e duas propagações ($C=F$ e $B=V$).

### Exemplo 4: pelo menos um e no máximo um

Considere a restrição de que exatamente uma das variáveis $x,y,z$ deve ser verdadeira.

Podemos dividir a condição em duas partes:

**Pelo menos uma:**

$$
x\lor y\lor z
$$

**No máximo uma:**

$$
\neg x\lor\neg y
$$

$$
\neg x\lor\neg z
$$

$$
\neg y\lor\neg z
$$

A fórmula completa em FNC é:

$$
\begin{aligned}
&(x\lor y\lor z)\\
&\land(\neg x\lor\neg y)\\
&\land(\neg x\lor\neg z)\\
&\land(\neg y\lor\neg z)
\end{aligned}
$$

Decidimos:

$$
x=V
$$

Simplificando:

| Cláusula | Resultado | Por quê |
|---|---|---|
| $x\lor y\lor z$ | ✓ **sai** | contém $x$, verdadeiro com $x=V$ |
| $\neg x\lor\neg y$ | $\neg y$ · **unidade** | $\neg x$ é falso com $x=V$ e sai da cláusula |
| $\neg x\lor\neg z$ | $\neg z$ · **unidade** | $\neg x$ é falso com $x=V$ e sai da cláusula |
| $\neg y\lor\neg z$ | $\neg y\lor\neg z$ | não contém $x$ nem $\neg x$ |

As unidades forçam:

$$
y=F,\quad z=F
$$

A última cláusula também fica satisfeita.

**Resultado: satisfazível.**

Um modelo é:

$$
x=V,\quad y=F,\quad z=F
$$

Existem três modelos possíveis: somente $x$, somente $y$ ou somente $z$ verdadeiros.

> [!TIP]
> Para representar a condição de **no máximo uma** entre $n$ variáveis, precisamos criar uma cláusula para cada par de variáveis:
>
> $$
> \frac{n(n-1)}{2}
> $$
>
> Essa é uma maneira padrão de representar essa restrição em FNC.

### Exemplo 5: fórmula insatisfazível

Considere:

$$
\begin{aligned}
F={}&(p\lor q)\\
&\land(\neg p\lor q)\\
&\land(p\lor\neg q)\\
&\land(\neg p\lor\neg q)
\end{aligned}
$$

Analisando os dois valores possíveis de $p$:

**Caso 1: $p=V$**

As cláusulas que contêm $p$ são removidas. Sobram:

$$
\{q\},\quad\{\neg q\}
$$

As duas unidades entram em conflito.

**Caso 2: $p=F$**

As cláusulas que contêm $\neg p$ são removidas. Sobram novamente:

$$
\{q\},\quad\{\neg q\}
$$

Mais uma vez encontramos um conflito.

Como os dois ramos morreram, concluímos:

**Resultado: insatisfazível.**

Isso acontece porque as quatro cláusulas bloqueiam todas as combinações possíveis de valores para $p$ e $q$.

## 9. Comparação entre os métodos

| Método | O que responde? | Ideia | Pior caso |
|---|---|---|---|
| Tabela-verdade | Satisfazibilidade e validade | Testa todas as linhas | $O(2^n)$ |
| Tableaux | Satisfazibilidade e validade por refutação | Cria uma árvore e fecha ramos com contradição | $O(2^n)$ |
| FNC (verificação de cláusulas) | Validade | Converte e verifica cada cláusula | $O(2^n)$ na conversão |
| DPLL | Satisfazibilidade e validade por negação | Decide, simplifica, propaga unidades e volta atrás | $O(2^n)$ |

No pior caso, todos esses métodos possuem comportamento exponencial.

A diferença está no desempenho prático: a propagação de unidades e o backtracking conseguem eliminar grandes partes da árvore de busca.

Por isso, o DPLL consegue resolver fórmulas com milhares ou até milhões de variáveis em situações práticas.

O problema SAT foi o primeiro problema provado NP-completo. Não se conhece um algoritmo que resolva todos os casos em tempo polinomial.

## 10. SAT atualmente

Os SAT solvers modernos são ferramentas altamente otimizadas que recebem fórmulas em FNC.

A maioria utiliza algoritmos derivados do DPLL, acrescentando melhorias como:

- heurísticas para escolher a próxima variável;
- técnicas de inteligência artificial e probabilidade;
- aprendizado a partir dos conflitos, por meio de cláusulas aprendidas.

Entre suas aplicações estão a verificação de software, a verificação de hardware e a resolução de problemas com restrições.

Alguns exemplos de SAT solvers de código aberto são:

- MiniSat;
- march_dl.

Também existe uma competição anual chamada **SAT Competition**, na qual diferentes solvers são avaliados.

## Erros comuns

Estes são os tropeços mais frequentes ao executar o DPLL na mão. Se algum deles te pegar, sem drama: faz parte do treino.

- **Deletar o lado errado na simplificação:** com $p=V$, a cláusula que contém $p$ sai inteira, enquanto a cláusula com $\neg p$ perde apenas esse literal. Com $p=F$, acontece o contrário.
- **Confundir cláusula vazia com conjunto vazio:** cláusula vazia representa conflito; conjunto sem cláusulas representa sucesso.
- **Esquecer de propagar novamente:** a simplificação pode criar novas cláusulas unitárias. Continue propagando até não haver nenhuma.
- **Tratar um conflito como insatisfazibilidade total:** um $\times$ encerra apenas aquele ramo. É necessário fechar todos os ramos para concluir UNSAT.
- **Esquecer variáveis livres:** se uma variável não aparece mais nas cláusulas, ela pode receber qualquer valor.
- **Usar o solver para validade sem negar a fórmula:** para verificar a validade de $\alpha$, execute o solver em $\neg\alpha$.
- **Decidir quando existe uma unidade:** se há uma cláusula unitária, seu valor é obrigatório. Não é necessário realizar uma decisão.

## Resumo

- **SAT:** verifica se existe uma atribuição que torna uma fórmula verdadeira.
- **UNSAT:** indica que não existe nenhum modelo.
- **Simplificação:** remove cláusulas satisfeitas e literais falsos.
- **Unit propagation:** utiliza cláusulas unitárias para determinar valores obrigatórios.
- **Backtracking:** abandona caminhos que produzem conflitos e tenta outras alternativas.
- **Cláusula vazia:** representa conflito.
- **Conjunto vazio de cláusulas:** representa um modelo encontrado.
- **DPLL:** combina propagação de unidades, simplificação e decisões com backtracking.
- **Validade:** uma fórmula é válida quando sua negação é insatisfazível.

Até aqui, tranquilo? Se alguma linha acima ficou nebulosa, volte à seção correspondente antes de partir para os exercícios.

## Exercícios

Bora colocar isso em prática! Resolva cada exercício no papel usando o DPLL, descrevendo cada decisão e propagação, e só depois abra o gabarito. Tentar primeiro, mesmo errando no meio do caminho, fixa muito mais do que ler a solução pronta. Ao final, indique se a fórmula é satisfazível ou insatisfazível e, se for satisfazível, apresente um modelo.

Quando terminar, refaça os que errou daqui a alguns dias: rever o conteúdo com intervalos entre as tentativas ajuda a lembrar por mais tempo.

**Exercício 1.**

$$
(p\lor q)\land(\neg p\lor r)\land(\neg q\lor r)\land(\neg r\lor s)
$$

{{< details title="Gabarito" >}}
Não há unidades no início, então **decidimos** $p=V$. Simplificando: $p\lor q$ sai e $\neg p\lor r$ vira $r$.

**Propagando** $r=V$: $\neg q\lor r$ sai e $\neg r\lor s$ vira $s$. **Propagando** $s=V$: não sobra nenhuma cláusula.

**Resultado: satisfazível.** Modelo: $p=V,\ r=V,\ s=V$ ($q$ pode ser qualquer valor).
{{< /details >}}

**Exercício 2.**

$$
(p\lor q)\land(\neg p\lor q)\land\neg q
$$

{{< details title="Gabarito" >}}
Já existe a unidade $\neg q$, então **propagamos** $q=F$ sem precisar decidir nada. Então $p\lor q$ vira $p$ e $\neg p\lor q$ vira $\neg p$.

Agora temos as unidades $\{p\}$ e $\{\neg p\}$: conflito.

**Resultado: insatisfazível**, sem nenhuma decisão.
{{< /details >}}

**Exercício 3.**

$$
\begin{aligned}
&(a\lor b\lor c)\\
&\land(\neg a\lor\neg b)\\
&\land(\neg a\lor\neg c)\\
&\land(\neg b\lor\neg c)\\
&\land(a\lor\neg b)
\end{aligned}
$$

{{< details title="Gabarito" >}}
Não há unidades, então **decidimos** $a=V$. Simplificando: $a\lor b\lor c$ e $a\lor\neg b$ saem; $\neg a\lor\neg b$ vira $\neg b$; $\neg a\lor\neg c$ vira $\neg c$.

**Propagando** $b=F$ e $c=F$, a cláusula $\neg b\lor\neg c$ também fica satisfeita e o conjunto esvazia.

**Resultado: satisfazível.** Modelo: $a=V,\ b=F,\ c=F$.
{{< /details >}}

**Exercício 4.**

Utilize um SAT solver para decidir a validade do seguinte argumento:

$$
p\to q,\quad q\to r\models p\to r
$$

Monte a fórmula $\neg\alpha$, converta-a para FNC e execute o DPLL.

Resultado esperado: UNSAT, indicando que o argumento é válido.

{{< details title="Gabarito" >}}
Com $\alpha=(p\to q)\to((q\to r)\to(p\to r))$, a negação equivale a $(p\to q)\land(q\to r)\land p\land\neg r$. Em FNC:

$$
\{\neg p\lor q,\ \neg q\lor r,\ p,\ \neg r\}
$$

**Propagando** $p=V$: $\neg p\lor q$ vira $q$. **Propagando** $r=F$: $\neg q\lor r$ vira $\neg q$. Agora as unidades $\{q\}$ e $\{\neg q\}$ entram em conflito.

**Resultado: UNSAT**, logo $\alpha$ é válida e o argumento é válido.
{{< /details >}}

**Exercício 5.** Última parada: um teste rápido para ver o que ficou. Pode errar à vontade, a explicação de cada questão está lá para ajudar.

{{< quiz titulo="sat e dpll" >}}

{{< questao >}}
Em um ramo do DPLL decidimos $p=V$. O que acontece com a cláusula $\neg p\lor q$?

- [ ] Sai inteira, porque $p$ é verdadeiro
- [x] Vira $q$, porque o literal $\neg p$ ficou falso
- [ ] Vira a cláusula vazia
- [ ] Continua igual
---
Com $p=V$, o literal $\neg p$ é falso e sai da cláusula, mas $q$ continua lá. A cláusula só sairia inteira se contivesse $p$.
{{< /questao >}}

{{< questao >}}
Depois de simplificar, aparece uma **cláusula vazia**. O que isso significa?

- [ ] Encontramos um modelo
- [ ] A fórmula inteira é insatisfazível
- [x] O ramo atual falhou e é preciso voltar atrás
- [ ] Todas as cláusulas foram satisfeitas
---
Cláusula vazia é F: um conflito **naquele ramo**. A fórmula só é UNSAT se todos os ramos falharem. Quem representa sucesso é o *conjunto* vazio de cláusulas.
{{< /questao >}}

{{< questao >}}
Qual é a resposta para o conjunto $\{p\},\ \{\neg p\lor q\},\ \{\neg q\}$?

- [ ] SAT, com $p=V$ e $q=V$
- [ ] SAT, com $p=V$ e $q=F$
- [x] UNSAT, só com unit propagation
- [ ] Não dá para saber sem decidir uma variável
---
A unidade $p$ força $p=V$, então $\neg p\lor q$ vira $q$. Agora $\{q\}$ e $\{\neg q\}$ conflitam, sem nenhuma decisão.
{{< /questao >}}

{{< questao >}}
Para verificar com um SAT solver se $\alpha$ é **válida**, o que fazemos?

- [ ] Rodamos o solver em $\alpha$ e esperamos SAT
- [x] Rodamos o solver em $\neg\alpha$ e esperamos UNSAT
- [ ] Rodamos o solver em $\neg\alpha$ e esperamos SAT
- [ ] Rodamos o solver em $\alpha$ e esperamos UNSAT
---
$\alpha$ é válida se, e somente se, $\neg\alpha$ é insatisfazível. Se o solver devolver SAT para $\neg\alpha$, o modelo é um contraexemplo.
{{< /questao >}}

{{< questao >}}
Quantas cláusulas são necessárias para dizer "**no máximo uma**" entre 5 variáveis?

- [ ] 5
- [x] 10
- [ ] 15
- [ ] 20
---
Uma cláusula por par de variáveis: $\frac{5\cdot4}{2}=10$.
{{< /questao >}}

{{< /quiz >}}
