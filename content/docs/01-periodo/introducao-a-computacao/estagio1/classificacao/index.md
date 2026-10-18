---
title: Classificação de Sistemas Computacionais
weight: 5
description: Gerações, analógico x digital, âmbito geral x específico e porte (do supercomputador ao smartphone).
autores:
  - thallesgsrv
date: 2026-10-17
---

Existe muita variedade de computador: tamanhos, custos e usos diferentes. Por isso eles são agrupados em categorias. A classificação não é única, mas ajuda quem vai escolher uma máquina a definir o que precisa.

## 1. Quatro critérios

| Critério | Categorias |
| --- | --- |
| Característica de construção | 1ª, 2ª, 3ª, 4ª e 5ª gerações |
| Princípio de construção (natureza) | Analógico e digital |
| Âmbito | Geral e específico |
| Porte | Supercomputador, mainframe, minicomputador, estação de trabalho, computador pessoal |

## 2. Gerações

| Geração | Quando | Componente básico | Memória / tempo | O que mudou |
| --- | --- | --- | --- | --- |
| 1ª | anos 50 | **Válvula** | milissegundos (ms) | Enormes, esquentavam muito, E/S por cartões, programação em linguagem de máquina; uso científico e militar |
| 2ª | início dos anos 60 | **Transistor** | microssegundos (µs) | Menores e mais confiáveis; surgem as primeiras linguagens; uso administrativo; memória de ferrite, fitas e tambores |
| 3ª | meados de 60 a meados de 70 | **Circuito integrado** (LSI, ~100 transistores, o "chip") | nanossegundos (ns) | Multiprogramação, tempo real, modo interativo; memória de semicondutores e discos |
| 4ª | meados de 70 a início de 90 | **Microprocessador** (VLSI, ~1000 transistores) | picossegundos (ps) | PCs, linguagens de alto nível, teleinformática (redes) |
| 5ª | anos 90 em diante | **ULSI** (milhões de transistores) | | Linguagem natural, paralelismo, IA, alta interatividade |

Cada geração mede o tempo de uma operação interna numa unidade 1000 vezes menor:

| Unidade | Equivalente |
| --- | --- |
| Milissegundo (ms) | 10⁻³ s |
| Microssegundo (µs) | 10⁻⁶ s |
| Nanossegundo (ns) | 10⁻⁹ s |
| Picossegundo (ps) | 10⁻¹² s |

> [!NOTE]
> Os historiadores não concordam sobre as fronteiras: para alguns a 3ª geração vai até hoje, outros começam a 4ª em 1970 ou em 1975, e outros já falam de 5ª desde as máquinas RISC e do paralelismo. O conceito de geração está meio obsoleto.

## 3. Analógico x digital

| | Analógico | Digital |
| --- | --- | --- |
| Valores | Uma **faixa** de valores aproximados (tensão, corrente) | Dados **discretos** e exatos: 0 e 1 |
| Como resolve | Por **analogia física** ao fenômeno | Por sequências de operações lógicas e aritméticas |
| Uso | Finalidade específica | Muito versátil, é o mais usado |
| Exemplos | régua de cálculo, mecanismo de Antikythera, miras de bombardeio, máquina diferencial de Babbage | Praticamente todo computador de hoje |

Frase para guardar: **o computador analógico mede, o digital conta.** Quando não se diz a natureza do computador, subentende-se digital.

## 4. Âmbito

- **Específico:** feito para um conjunto reduzido de tarefas (controle de mecanismos industriais, cálculos científicos). Executa programas específicos e restritos.
- **Geral:** faz uma grande variedade de tarefas, executando muitos programas. Escritórios, escolas, casa.

Quanto ao uso, o material ainda fala em computador **científico** (precisão, pouca E/S) e **comercial** (muito volume de entrada e saída). Hoje a maioria é de uso geral e atende às duas áreas.

## 5. Porte

| Tipo | Ideia central | Detalhes |
| --- | --- | --- |
| **Supercomputador** | Poder de processamento enorme | Simulações, previsão do tempo, modelagem 3D. Âmbito específico, custo altíssimo, exige condições especiais. Exemplos: TaihuLight, Santos Dumont (LNCC, Petrópolis) |
| **Mainframe** | Muitos usuários e muito dado ao mesmo tempo | Acesso por **terminais**; bancos, seguradoras, grandes empresas; âmbito extenso; muito confiável (MTBF superior a 20 anos); ex.: IBM |
| **Minicomputador** (servidor) | Redução do mainframe | Médio porte, terminais conectados; controle de processos e sistemas multiusuário; ex.: AS/400 |
| **Estação de trabalho** | Micro "pesado" para **um** usuário | Costuma ter arquitetura RISC e UNIX; CAD, imagens, cálculos complexos |
| **Computador pessoal (PC)** | Processador único em chip, preço acessível | Desktop, notebook/laptop, netbook, palmtop (PDA), MiniPC (nettop), tablet, smartphone |

**Terminais:** o terminal "burro" só captura e mostra dados (todo o processamento é no mainframe). O terminal inteligente processa parte do trabalho e geralmente é um computador pessoal.

> [!TIP]
> Supercomputador x mainframe: o supercomputador faz poucas tarefas **muito pesadas** (cálculo); o mainframe faz **muitas** tarefas **simultâneas** para muitos usuários (transações). São de âmbito específico e extenso, respectivamente.

## 6. Uma comparação para fechar

O cérebro humano tem cerca de 100 bilhões de neurônios. Para ter o mesmo número de elementos, um computador dos anos 40 (válvulas) teria o tamanho de São Paulo. Com transistores, o do Cristo Redentor. Nos anos 60, o de um ônibus. Hoje, com milhões de componentes num chip, cérebro e computador entraram num acordo de dimensões.

## Quiz

{{< quiz titulo="Classificação" >}}

{{< questao >}}
Qual geração tem o **circuito integrado** como componente básico?

- [ ] Primeira
- [ ] Segunda
- [x] Terceira
- [ ] Quarta
---
1ª válvula, 2ª transistor, 3ª circuito integrado, 4ª microprocessador (VLSI).
{{< /questao >}}

{{< questao >}}
"O computador ___ mede, o ___ conta."

- [x] analógico, digital
- [ ] digital, analógico
- [ ] geral, específico
- [ ] científico, comercial
---
O analógico trabalha com grandezas contínuas (mede). O digital trabalha com valores discretos (conta).
{{< /questao >}}

{{< questao fixa="true" >}}
Qual tipo de computador usa **terminais** para atender muitos usuários simultaneamente em bancos e seguradoras?

- [ ] Supercomputador
- [x] Mainframe
- [ ] Estação de trabalho
- [ ] Notebook
---
Mainframe: grande volume de dados e muitos usuários ao mesmo tempo, acessando por terminais.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Associe: (a) válvula, (b) transistor, (c) circuito integrado, (d) microprocessador, às gerações de computadores.
2. Por que supercomputadores são de âmbito específico?

{{< details title="Gabarito" >}}
1. (a) 1ª, (b) 2ª, (c) 3ª, (d) 4ª.
2. Porque executam um grupo reduzido de tarefas pesadas (simulações, previsão do tempo, modelagem), em vez de rodar de tudo.
{{< /details >}}

## Fontes

Baseado nos slides *Classificação de Sistemas Computacionais* dos professores Carlos Eduardo Santos Pires e Maxwell Guimarães de Oliveira (UFCG).
