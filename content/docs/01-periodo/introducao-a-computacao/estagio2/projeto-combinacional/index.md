---
title: Projeto de Circuitos Combinacionais
weight: 2
description: Circuitos combinacionais x sequenciais, da tabela-verdade ao circuito, mintermos, simplificação e exemplos.
autores:
  - thallesgsrv
date: 2026-10-17
---

Esta é a página mais prática do estágio. O método tem um fio condutor só: **situação → tabela-verdade → expressão → circuito**. Se você domina isso, sabe projetar circuito digital.

## 1. Combinacional x sequencial

| | Combinacional | Sequencial |
| --- | --- | --- |
| A saída depende de | **só** das entradas atuais | das entradas atuais **e** das anteriores |
| Memória | **não** tem | **tem** (estado interno) |
| Elemento básico | portas lógicas | *flip-flop* |
| Serve para | operações matemáticas, controle de fluxo de sinais | armazenar dados |

*Flip-flop* é um dispositivo **biestável** (dois estados estáveis): é o bloco básico das memórias.

## 2. O método de projeto

1. Determinar as **variáveis de entrada**.
2. Determinar as **variáveis de saída**.
3. Montar a **tabela-verdade** de cada saída.
4. Extrair a **expressão booleana** de cada saída.
5. **Simplificar** a expressão.
6. Montar o **circuito**.

## 3. Exemplo: alarme de loja

Uma loja tem dois sensores. O de **contato** (A) fica ligado (1) quando a porta está fechada; o **infravermelho** (B) fica ligado (1) quando **não** há movimento. O alarme (S) toca se **qualquer** sensor for **desligado**.

| A | B | S |
| --- | --- | --- |
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

## 4. Da tabela para a expressão: soma de produtos

Para cada linha em que a saída é **1**, escreva um **mintermo**: um AND de todas as entradas, onde uma entrada que vale **1** entra direta e uma que vale **0** entra **negada**. Depois faça o **OR** dos mintermos.

Para o alarme:

$$
S = \overline{A}\,\overline{B} + \overline{A}\,B + A\,\overline{B}
$$

Existe também o método **produto de somas** (AND dos *maxitermos* das linhas com saída 0), mas a soma de produtos é a mais usada.

O circuito sai direto da expressão: três ANDs (com NOTs nas entradas negadas) ligados a um OR. Funciona, mas pode **não ser o mais simples**.

## 5. Regras para simplificar

| Regra | Forma |
| --- | --- |
| Identidade | $A+0=A$, $A\cdot1=A$, $A+1=1$, $A\cdot0=0$ |
| Idempotência | $A+A=A$, $A\cdot A=A$ |
| Complemento | $A+\overline{A}=1$, $A\cdot\overline{A}=0$ |
| Dupla negação | $\overline{\overline{A}}=A$ |
| Comutativa | $A\cdot B=B\cdot A$, $A+B=B+A$ |
| Associativa | $A(BC)=(AB)C$, $A+(B+C)=(A+B)+C$ |
| Distributiva | $A(B+C)=AB+AC$, $A+BC=(A+B)(A+C)$ |
| De Morgan | $\overline{A+B}=\overline{A}\cdot\overline{B}$, $\overline{A\cdot B}=\overline{A}+\overline{B}$ |
| Absorção | $A+AB=A$, $A+\overline{A}B=A+B$ |

Todas podem ser provadas com tabela-verdade. De Morgan vale para mais de duas variáveis ($\overline{ABC}=\overline{A}+\overline{B}+\overline{C}$). Outro método de simplificação é o **mapa de Veitch-Karnaugh**.

**Simplificando o alarme:**

$$
\begin{aligned}
S &= \overline{A}\,\overline{B} + \overline{A}B + A\overline{B} \\
  &= \overline{A}(\overline{B}+B) + A\overline{B} &&\text{distributiva}\\
  &= \overline{A} + A\overline{B} &&\text{identidade}\\
  &= \overline{A} + \overline{B} &&\text{absorção}\\
  &= \overline{A\cdot B} &&\text{De Morgan}
\end{aligned}
$$

Resultado: uma **única porta NAND**. De três ANDs, dois NOTs e um OR, para uma porta.

## 6. Do circuito para a expressão

Para ler o que um circuito faz, **caminhe das entradas para a saída** e escreva a expressão na saída de cada porta.

Exemplo: duas saídas a partir de $A$, $B$ e $C$ (uma é a soma completa que você verá na próxima página):

$$
D = A\oplus B\oplus C \qquad E = AB + (A+B)C
$$

## 7. Exercício guiado: tabela com $S=\overline{C}$

| A | B | C | S |
| --- | --- | --- | --- |
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

Quatro mintermos: $S=\overline{A}\,\overline{B}\,\overline{C}+\overline{A}B\overline{C}+A\overline{B}\,\overline{C}+AB\overline{C}$. Agrupando: $S=\overline{C}\,(\overline{A}\,\overline{B}+\overline{A}B+A\overline{B}+AB)=\overline{C}\cdot1=\overline{C}$. Um simples **inversor**: $A$ e $B$ não importam.

## 8. Aplicação: bombeamento de água

Uma bomba (B) enche uma caixa d'água; um alarme (A) avisa. Dois sensores: nível alto (H) e baixo (L).

| H | L | B | A | Situação |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 1 | abaixo de L: liga bomba e alarme (ninguém deve usar a água) |
| 0 | 1 | 1 | 0 | entre L e H: bomba ligada, alarme desligado |
| 1 | 0 | X | X | **impossível** (acima de H e abaixo de L): descartada |
| 1 | 1 | 0 | 0 | acima de H: desliga tudo |

Aproveitando o "X" (não importa), as expressões simplificam:

$$
B=\overline{H} \qquad A=\overline{H}\cdot\overline{L}=\overline{H+L}
$$

Ou seja: um inversor para a bomba e uma porta **NOR** para o alarme.

## 9. Aplicação: quatro computadores, uma impressora

Quatro setores disputam uma impressora, com prioridade: **ADM** (A) > **Pessoal** (P) > **Engenharia** (E) > **Vendas** (V). O circuito de controle libera só o de maior prioridade que estiver pedindo. As saídas $S_A$, $S_P$, $S_E$, $S_V$ ficam:

$$
S_A = A \qquad S_P=\overline{A}P \qquad S_E=\overline{A}\,\overline{P}E \qquad S_V=\overline{A}\,\overline{P}\,\overline{E}V
$$

Leitura: Vendas só passa se ninguém acima pede. ADM sempre passa.

## 10. Para praticar no computador

Para montar e testar circuitos, use **Logisim**, **Circuit Maker** ou o **TinkerCAD** (que tem breadboard, CIs e LEDs). Um resistor em série com o LED é necessário quando a tensão da fonte é maior que a suportada pelo LED.

## Quiz

{{< quiz titulo="Projeto combinacional" >}}

{{< questao >}}
Qual a diferença entre circuito combinacional e sequencial?

- [ ] O combinacional usa mais portas
- [x] O sequencial tem memória: a saída depende também das entradas anteriores
- [ ] O combinacional é analógico
- [ ] Não há diferença prática
---
Combinacional: só as entradas atuais. Sequencial: entradas atuais e estado interno (flip-flops).
{{< /questao >}}

{{< questao >}}
Na soma de produtos, cada linha da tabela entra com:

- [ ] Saída 0, formando um maxitermo
- [x] Saída 1, formando um mintermo
- [ ] Saída qualquer
- [ ] Apenas entradas negadas
---
Mintermo: AND das entradas (diretas se 1, negadas se 0) em cada linha cuja saída é 1.
{{< /questao >}}

{{< questao >}}
Simplificando $\overline{A}+A\overline{B}$ pelo teorema da absorção, obtém-se:

- [ ] $A$
- [x] $\overline{A}+\overline{B}$
- [ ] $\overline{A}\,\overline{B}$
- [ ] $0$
---
$X + \overline{X}Y = X+Y$. Aqui $X=\overline{A}$, e $\overline{X}=A$, com $Y=\overline{B}$.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Monte a tabela-verdade e a expressão simplificada de um circuito com entradas $A$ e $B$ cuja saída é 1 **somente quando $A=1$ e $B=0$**.
2. Mostre, usando De Morgan, que $\overline{\overline{A}+\overline{B}}=A\cdot B$.
3. No sistema da impressora, o que acontece se ADM e Vendas pedem ao mesmo tempo?

{{< details title="Gabarito" >}}
1. Uma única linha com saída 1 ($A=1$, $B=0$): $S=A\overline{B}$. Já está mínima.
2. De Morgan: $\overline{X+Y}=\overline{X}\,\overline{Y}$. Com $X=\overline{A}$, $Y=\overline{B}$: $\overline{\overline{A}+\overline{B}}=\overline{\overline{A}}\cdot\overline{\overline{B}}=A\cdot B$.
3. $S_A=1$ e $S_V=\overline{A}\cdots=0$: só ADM imprime.
{{< /details >}}

## Fontes

Baseado nos slides *Conceitos Básicos de Eletrônica Digital* dos professores Carlos Eduardo Santos Pires e Maxwell Guimarães de Oliveira (UFCG).
