---
title: Software
weight: 4
description: Programas, categorias de software, sistema operacional e suas funções, tipos de SO, utilitários e licenças.
autores:
  - thallesgsrv
date: 2026-10-17
---

Software é o conjunto de **instruções ordenadas e lógicas** que o hardware executa para resolver problemas. Ele é o que dá ao computador uma variedade ilimitada de usos.

## 1. Software x hardware

| Hardware | Software |
| --- | --- |
| Parte física | Parte lógica |
| **Rígido:** mudar é difícil e só o fabricante faz | **Maleável:** programadores mudam fácil |
| Depende do software para funcionar | Ordena e controla as ações do hardware |

Um conjunto específico de instruções é um **programa**. Programas ficam na memória secundária e são escritos em **linguagens de programação**. Quando o computador usa um programa, diz-se que ele está **rodando** ou **executando** (o programa, ou parte dele, é copiado para a memória principal).

Quem projeta e desenvolve programas são analistas de sistemas e programadores; a **Engenharia de Software** estuda o desenvolvimento.

## 2. Categorias

- **Software básico:** o sistema operacional.
- **Software utilitário.**
- **Software aplicativo** (aplicação ou *app*).
- Alguns autores incluem o **software de linguagem** (linguagens de programação).

## 3. Sistema operacional (SO)

É o software que oferece rotinas, executadas pelo processador, para **facilitar o acesso ao hardware** e **gerenciar o uso do sistema**. Antes era escrito em Assembly; hoje, na maioria, em linguagens de alto nível.

**Dois objetivos:**

1. Tornar o uso do computador **conveniente** (esconde detalhes internos, reduz o tempo de construção de programas).
2. Usar o hardware **com eficiência** (mais trabalho no mesmo hardware, com melhor distribuição de recursos).

**Composição:** um **núcleo** (*kernel*, o "coração", com as funções centrais) e programas do sistema. Em geral reside no disco rígido; em alguns dispositivos, em uma ROM.

**Funções:** inicialização (*booting*), gestão de programas e de memória, programação de tarefas, configuração de dispositivos, acesso à web, segurança, controle de rede, monitoração de desempenho e **interface com o usuário**.

### Gestão de memória virtual

O SO usa uma parte do disco como RAM adicional. **Swap out:** manda para o disco dados e instruções pouco usados recentemente. **Swap in:** traz de volta quando necessários.

### Controle de dispositivos

Cada dispositivo precisa de um **driver**: programa que permite ao SO se comunicar com ele. Com o **Plug and Play**, o computador reconhece novos dispositivos, instala drivers e verifica conflitos. Ao ligar, o **BIOS** assume primeiro, reconhecendo o hardware por identificadores gravados em ROM; depois o SO assume o controle.

### Interface com o usuário

Controla como os dados entram e como a informação aparece. Também chamada **shell** (envolve o kernel). Três tipos:

1. Linha de comando.
2. Baseada em menus.
3. **Gráfica (GUI)**, o modelo **WIMP**: *Windows, Icons, Menus, Pointer*.

## 4. Classificação dos sistemas operacionais

| Tipo | Ideia | Exemplos |
| --- | --- | --- |
| **Mono-usuário** | um usuário por vez | MS-DOS, Windows 3.x, 9x |
| **Multi-usuário** | várias sessões em um só computador | UNIX, Windows NT/2000/XP |
| **Mono-tarefa** | uma tarefa por vez | MS-DOS |
| **Multi-tarefa** | várias tarefas ao mesmo tempo | Windows, UNIX |
| ↳ **cooperativa** | cada programa libera a CPU voluntariamente | Windows 9x (16 bits) |
| ↳ **preemptiva** | cada programa recebe uma fatia de tempo | Windows NT, UNIX, Windows 9x (32 bits) |
| **Em lote** (*batch*) | jobs guardados em disco ou fita e executados em sequência, **sem interação** | compiladores e backups antigos |
| **Tempo compartilhado** (*time-sharing*) | muitos usuários com terminais; dá a **ilusão** de máquina exclusiva; tempo de resposta importa | |
| **Tempo real** | atende processos externos com tempo de resposta **dentro de limites rígidos** | controle industrial, imagens médicas |
| **Múltiplos processadores** | 2 ou mais CPUs trabalhando juntas | fortemente ou fracamente acoplados |

**Multiprogramação:** manter vários programas na memória; enquanto um espera E/S, outro roda, aproveitando a CPU.

**Exemplos:**

- **MS-DOS:** mono-usuário, mono-tarefa, linha de comando; modos interativo e *batch* (arquivos BAT).
- **Windows:** interface gráfica, metáfora do **desktop** (mesa de trabalho) e das janelas.
- **UNIX:** multi-usuário e multi-tarefa, criado para dar bom ambiente aos programadores; portabilidade, sistema de arquivos hierárquico.
- **Linux:** "clone" livre do UNIX, distribuído com código-fonte.

## 5. Utilitários

Preenchem a lacuna entre o SO e as necessidades do usuário: organizam discos, verificam memória, corrigem falhas. Tipos: **desfragmentadores**, **antivírus**, **compactadores** (WinZip, WinRar), gerenciadores de memória.

## 6. Aplicativos

Programas feitos para realizar tarefas específicas **junto com a atividade humana**, escritos em linguagens de alto nível. Classificam-se por tarefa:

- **Administrativos** (folha de pagamento, estoque).
- **Tecno-científicos** (simulação, CAD).
- **Automação industrial** e **comercial** (pontos de venda, reservas).
- **Apoio educacional**.
- Gerais: processador de texto, planilha, editor de apresentações, editor de imagem.

## 7. Modalidades de software

| Modalidade | Código-fonte | Distribuir | Alterar | Detalhe |
| --- | --- | --- | --- | --- |
| **Comercial** | não | não | não | binário, com licença e preço |
| **Shareware** | não | **sim** (para experimentar) | não | registro (pagando) dá a licença; sem registro, limitações |
| **Freeware** | não | sim | não | gratuito, sem registro; **não é software livre** |
| **Software livre** | **sim** | sim | **sim** | mantém o copyright; ex.: GNU/Linux, Apache |
| **Domínio público** | sim | sim | sim | o autor abre mão **até do copyright**; ex.: SQLite |

Outras: **Adware** (gratuito com propaganda, ex.: Spotify), **Demo/Trial** (limitado em recursos ou prazo, ex.: 30 dias), **Beta** (em desenvolvimento, versão 0.x ou RC1, RC2...), além do careware e do beerware (que pedem doação ou uma cerveja).

## Quiz

{{< quiz titulo="Software" >}}

{{< questao >}}
Qual é o "coração" do sistema operacional?

- [ ] O shell
- [x] O kernel
- [ ] O driver
- [ ] O BIOS
---
O kernel reúne as funções centrais. O shell é a interface que envolve o kernel.
{{< /questao >}}

{{< questao >}}
Um sistema em que cada programa recebe uma fatia de tempo da CPU é:

- [ ] Multi-tarefa cooperativo
- [x] Multi-tarefa preemptivo
- [ ] Mono-tarefa
- [ ] Em lote
---
Preemptivo: o SO tira e devolve a CPU por fatias de tempo. No cooperativo, o programa libera voluntariamente.
{{< /questao >}}

{{< questao >}}
Qual modalidade permite acesso ao código-fonte **e** alteração, mantendo o copyright?

- [ ] Freeware
- [ ] Shareware
- [x] Software livre
- [ ] Software comercial
---
No domínio público o autor abre mão também do copyright. Freeware é gratuito, mas fechado.
{{< /questao >}}

{{< /quiz >}}

## Exercícios

1. Qual a diferença entre freeware e software livre?
2. Para que serve um driver?
3. O que é memória virtual e que operações a compõem?

{{< details title="Gabarito" >}}
1. Freeware é gratuito mas **não** permite alteração e não dá o código-fonte. Software livre dá acesso ao código, permite distribuir e alterar.
2. É o programa que permite ao SO se comunicar com um dispositivo de E/S; cada dispositivo precisa do seu.
3. O disco é usado como extensão da RAM. O SO faz *swap out* (manda dados pouco usados para o disco) e *swap in* (traz de volta quando precisa).
{{< /details >}}

## Fontes

Baseado nos slides *Software* dos professores Carlos Eduardo Santos Pires e Maxwell Guimarães de Oliveira (UFCG).
