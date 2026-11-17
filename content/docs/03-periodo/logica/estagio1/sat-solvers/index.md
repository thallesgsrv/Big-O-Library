---
title: SAT Solvers
weight: 7
description: SAT Problem, simplificação, unit propagation, backtracking e o método DPLL..
autores:
  - JuaooRMS
date: 2026-11-17
---

## Sobre

Na página de FNC vimos que a validade ficava fácil: basta olhar cada cláusula. Mas, para **satisfazibilidade**, não existe um atalho tão simples. Este material apresenta como programas chamados *SAT solvers* resolvem esse problema e explica o algoritmo clássico por trás da maioria deles: o **DPLL**.

Ao final você deve conseguir:

- explicar o que é o problema SAT e apresentar exemplos reais, como agendamento e gerenciadores de pacotes;
- aplicar as regras de **simplificação** e **unit propagation** sobre um conjunto de cláusulas;
- executar o DPLL manualmente, utilizando *backtracking*, e interpretar seus resultados;
- decidir a validade de um argumento utilizando um SAT solver, por meio da negação da fórmula;
- identificar e evitar os erros mais comuns do método.

## 1. Recapitulando: validade e FNC

Para saber se um argumento $\varphi_1,\ldots,\varphi_n \models \psi$ é válido, reduzimos o problema para verificar a validade de:

$$
\alpha = \varphi_1 \to (\varphi_2 \to \ldots (\varphi_n \to \psi)\ldots)
$$

Depois, convertemos $\alpha$ para FNC e testamos sua validade cláusula por cláusula.

Entretanto, existem dois problemas:

- A conversão para FNC pode aumentar consideravelmente o tamanho da fórmula.
- A tabela-verdade possui $2^n$ linhas para $n$ variáveis.

É nesse contexto que surgem os **SAT solvers**. Eles recebem fórmulas em FNC e respondem a uma pergunta: *essa fórmula possui algum modelo?*

> [!TIP]
> **Como utilizar um solver para verificar validade?**
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

### Exemplo : organização de um almoço

Quatro amigos querem almoçar juntos de segunda a sexta. Entretanto, cada um possui algumas restrições:

- Ana não pode na sexta-feira.
- Johnny só pode na segunda ou na quarta-feira.
- Mike não pode na terça nem na quinta-feira.
- Jane almoça com a mãe na quarta e na quinta-feira.

Criamos uma variável para cada pessoa e dia. Por exemplo, $Ana^{seg}$ representa que Ana pode almoçar na segunda-feira.

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

Verificando os dias disponíveis:

| Dia | Ana | Johnny | Mike | Jane | Todos? |
|---|---|---|---|---|---|
| Segunda | Sim | Sim | Sim | Sim | **Sim** |
| Terça | Sim | Não | Não | Sim | Não |
| Quarta | Sim | Sim | Sim | Não | Não |
| Quinta | Sim | Não | Não | Não | Não |
| Sexta | Não | Não | Sim | Sim | Não |

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

Uma maneira simples de resolver SAT seria testar todas as atribuições possíveis das variáveis.

Podemos representar esse processo como uma **árvore de decisão**, na qual cada nível determina o valor de uma variável.

Por exemplo, com três variáveis $p,q,r$, teríamos:

- Primeiro nível: decidir $p$.
- Segundo nível: decidir $q$.
- Terceiro nível: decidir $r$.

Com $n$ variáveis, a árvore possui até $2^n$ folhas, assim como uma tabela-verdade.

Entretanto, existe uma maneira de melhorar esse processo: não precisamos chegar até uma folha quando já sabemos que determinado caminho não pode produzir um modelo.

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

> [!IMPORTANT]
> Um ramo marcado com $\times$ significa que aquela atribuição parcial já produziu uma contradição.
>
> Isso não significa que a fórmula inteira é insatisfazível. Só podemos concluir UNSAT quando todos os caminhos possíveis forem descartados.

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

### Exemplo de simplificação

Utilizando novamente o conjunto:

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

| Original | Simplificada |
|---|---|
| $p\lor q$ | Sai |
| $p\lor\neg q$ | Sai |
| $\neg p\lor q$ | $q$ |
| $\neg p\lor\neg q\lor\neg r$ | $\neg q\lor\neg r$ |
| $\neg p\lor r$ | $r$ |

Duas situações especiais podem acontecer durante a simplificação:

**Cláusula vazia:** todos os literais ficaram falsos. A cláusula possui valor F e representa um conflito. O ramo deve ser encerrado.

**Conjunto vazio de cláusulas:** todas as cláusulas foram satisfeitas e removidas. Encontramos um modelo.

> [!WARNING]
> Não confunda cláusula vazia com conjunto vazio de cláusulas:
>
> - Cláusula vazia = F (conflito).
> - Nenhuma cláusula sobrando = V (sucesso).
>
> Um OU de nada é falso, enquanto um E de nada é verdadeiro.

## 6. Unit propagation

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

| Original | Simplificada |
|---|---|
| $p\lor q$ | $q$ |
| $p\lor\neg q$ | $\neg q$ |
| $\neg p\lor q$ | Sai |
| $\neg p\lor\neg q\lor\neg r$ | Sai |
| $\neg p\lor r$ | Sai |

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

| Original | Simplificada |
|---|---|
| $\neg p\lor\neg q$ | Sai |
| $p\lor\neg q$ | $\neg q$ |
| $\neg p\lor q$ | Sai |

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

| Original | Simplificada |
|---|---|
| $\neg p\lor\neg q\lor r$ | Sai |
| $\neg p\lor q\lor\neg r$ | Sai |
| $\neg p\lor q\lor r$ | Sai |
| $p\lor\neg q\lor r$ | $\neg q\lor r$ |
| $p\lor q\lor r$ | $q\lor r$ |

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
> No slide original, o ramo $p=V$ aparece marcado com conflito. Entretanto, a atribuição $p=V$, $q=V$, $r=V$ também satisfaz as cinco cláusulas. Isso não altera o resultado: o DPLL pode encerrar a busca assim que encontra o primeiro modelo.

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

| Original | Simplificada |
|---|---|
| $A\lor\neg B$ | Sai |
| $B\lor C$ | $B\lor C$ |
| $\neg A\lor\neg C$ | $\neg C$ |

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

| Original | Simplificada |
|---|---|
| $x\lor y\lor z$ | Sai |
| $\neg x\lor\neg y$ | $\neg y$ |
| $\neg x\lor\neg z$ | $\neg z$ |
| $\neg y\lor\neg z$ | $\neg y\lor\neg z$ |

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

## Exercícios

Resolva os exercícios utilizando o DPLL, descrevendo cada decisão e propagação. Ao final, indique se a fórmula é satisfazível ou insatisfazível. Se for satisfazível, apresente um modelo.

**Exercício 1.**

$$
(p\lor q)\land(\neg p\lor r)\land(\neg q\lor r)\land(\neg r\lor s)
$$

**Exercício 2.**

$$
(p\lor q)\land(\neg p\lor q)\land\neg q
$$

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

**Exercício 4.**

Utilize um SAT solver para decidir a validade do seguinte argumento:

$$
p\to q,\quad q\to r\models p\to r
$$

Monte a fórmula $\neg\alpha$, converta-a para FNC e execute o DPLL.

Resultado esperado: UNSAT, indicando que o argumento é válido.