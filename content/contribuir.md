---
title: Como contribuir com os materiais
type: docs
description: Guia para criar e editar as páginas de disciplina da Big-O-Library.
summary: Padrões, estrutura de pastas e exemplos para quem quer adicionar ou melhorar uma disciplina.
---

## Começo rápido

Cada disciplina é **um arquivo markdown**. O site lê esse arquivo, monta a página sozinho e coloca a disciplina na lista do período. Este guia explica a estrutura, o formato e o que revisamos antes de aceitar uma contribuição.

1. [Abra o editor do GitHub com o modelo já preenchido](https://github.com/thallesgsrv/Big-O-Library/new/main?filename=content%2Fdocs%2F01-periodo%2Fnome-da-disciplina%2Findex.md&value=---%0Atitle%3A%20Nome%20da%20disciplina%0Aweight%3A%201%0Adescription%3A%20Uma%20frase%20curta%20sobre%20a%20disciplina.%0Aautores%3A%0A%20%20-%20seu-usuario-github%0Adate%3A%202026-10-01%0A---%0A%0APar%C3%A1grafo%20de%20abertura%3A%20o%20que%20a%20disciplina%20estuda%20e%20para%20que%20serve.%0A%0A%23%23%20Materiais%0A%0A%23%23%23%20Livros%20e%20apostilas%0A%0A-%20%5BT%C3%ADtulo%5D%28https%3A%2F%2Fexemplo.com%29%20%E2%80%94%20Autor%20%28ano%29%0A) (precisa de conta no GitHub; ela é gratuita).
2. Troque o nome da pasta no topo (`01-periodo/nome-da-disciplina`) e preencha o texto.
3. Clique em **Commit changes** e depois em **Propose changes** para abrir o Pull Request.

Quer ver o resultado final antes? Abra a página de [Programação 1](../docs/01-periodo/prog1/): ela é o exemplo de referência.


> [!IMPORTANT]
> Os três erros mais comuns: usar uma `date` no futuro (a página não é publicada), repetir o mesmo `weight` no período e criar subpáginas dentro de um `index.md` (use `_index.md`).

## Visão geral

O fluxo é sempre o mesmo:

1. Escolha o período (ou `optativas`) e crie a pasta da disciplina.
2. Escreva o `index.md`, usando o modelo abaixo como ponto de partida (o conteúdo é livre, veja [A estrutura da página](#a-estrutura-da-página)).
3. Confira como ficou, abra um Pull Request e pronto.

Sem Git instalado? Dá para fazer tudo pelo editor do próprio GitHub (botão **Add file → Create new file**) ou abrir uma [issue](https://github.com/thallesgsrv/Big-O-Library/issues) com o conteúdo, e alguém transforma em página.

## Onde fica cada coisa

```text
content/docs/
├── 01-periodo/                  ← um período = pasta "NN-periodo" (01 a 09)
│   ├── _index.md                ← página do período (já existe, não mexa)
│   └── prog1/                   ← uma disciplina = uma pasta
│       └── index.md             ← o conteúdo da disciplina
├── 02-periodo/
│   └── prog2/index.md
└── optativas/
    └── algoritmos-avancados/    ← disciplina com subpáginas usa _index.md
        ├── _index.md
        └── grafos/index.md      ← tópico dentro da disciplina
```

Regras de nomes:

- **Pastas em minúsculas, sem acento, sem espaço**, separadas por hífen: `programacao-1`, `estruturas-de-dados`. O título bonito vai no `title`, não na pasta.
- O número do período vem do nome da pasta (`03-periodo` é o 3º período). Não renomeie essas pastas.
- Disciplina **sem** subpáginas: `index.md`. Disciplina **com** subpáginas (tópicos): `_index.md`. Se usar `index.md` e criar uma pasta dentro, as subpáginas não aparecem.

## O cabeçalho do arquivo

O cabeçalho (em inglês, *front matter*) é o bloco entre os `---` no topo do arquivo:

```yaml
---
title: Programação 1
weight: 1
description: Lógica de programação e primeiros programas.
autores:
  - thallesgsrv
date: 2026-09-29
---
```

| Campo | Obrigatório | Para que serve |
|---|---|---|
| `title` | sim | Nome da disciplina, como no currículo oficial. Aparece no título, na lista do período e no menu. |
| `weight` | sim | Ordem dentro do período (1, 2, 3…). Não repita o mesmo número em disciplinas do mesmo período. |
| `description` | sim | Uma frase curta, no máximo ~90 caracteres. Aparece no card da lista de disciplinas. |
| `autores` | sim | Lista de usuários do GitHub de quem escreveu a página, sem o `@`. Aparece no fim da página, com foto e link para o perfil. |
| `date` | sim | Data em que a página foi criada, no formato `AAAA-MM-DD`. Nunca use uma data futura: o Hugo não publica páginas com data no futuro. |
| `summary` | não | Texto um pouco maior, exibido logo abaixo do título da página. |
| `rotulo` | não | Só em páginas que têm subpáginas (por exemplo, uma disciplina com estágios): título da lista de cards. Padrão: `Disciplinas`. |

### Autoria e datas

No fim de cada disciplina o site mostra **quem escreveu** e **quando**:

```text
$ git log --format=autoria
escrito por  (foto) @thallesgsrv      publicado em 29 de setembro de 2026 · atualizado em 12 de outubro de 2026
```

- Os autores vêm do campo `autores`. Se você **acrescentar ou melhorar** materiais de uma disciplina que já existe, adicione o seu usuário do GitHub na lista (sem remover os anteriores).
- O "publicado em" vem do campo `date`; ele não muda quando a página é editada.
- O "atualizado em" é automático: o site lê a data do último commit que mexeu no arquivo. Só aparece se for diferente da data de publicação.
- Quem não tem conta no GitHub pode escrever o nome em vez do usuário (por exemplo `"Maria Silva"`); nesse caso ele aparece sem foto e sem link.

## A estrutura da página

**Não existe um modelo fixo.** Cada disciplina é ensinada de um jeito, então cada página pode ter as seções que fizerem sentido para ela: cronograma, avaliações, projetos, resumo por unidade, ferramentas, o que for útil. Só o [cabeçalho](#o-cabeçalho-do-arquivo) é obrigatório; o corpo do markdown é livre.

O que o site faz sozinho com o seu texto:

- O **parágrafo de abertura** (sem título, logo depois do cabeçalho) aparece como introdução.
- Cada título `##` vira um card com o prompt `$ cat nome-da-secao.md`.
- Uma seção chamada `## Contribuição` ganha destaque visual. É opcional; use se quiser convidar outras pessoas a completar a página.

Para quem prefere um roteiro, estas são as seções que as primeiras disciplinas usam. Escolha, troque, reordene ou acrescente à vontade:

1. `## Objetivos`: o que a pessoa deve saber ao final.
2. `## Conteúdo previsto`: tópicos da ementa.
3. `## Materiais`: links e arquivos, agrupados como na próxima seção.
4. `## Contribuição`: convite para colaborar.

Pontos que valem para qualquer estrutura:

- Use `##` para as seções e `###` para subdivisões. Não use `#` (o título da página já é o `title`).
- Tudo que fica entre dois `##` vai para dentro do mesmo card.
- Se incluir objetivos ou conteúdo previsto, baseie-se na **ementa oficial**. Se não tiver certeza, deixe de fora em vez de inventar.
- Título de seção curto e sem pontuação: ele vira o nome do "arquivo" no prompt.

## Como listar os materiais

Se a sua página tiver uma seção de materiais, uma sugestão é agrupar por tipo usando `###`, só com os grupos que tiverem conteúdo (os nomes abaixo são sugestões, adapte à disciplina):

| Grupo | O que entra |
|---|---|
| `### Livros e apostilas` | Livros, notas de aula, apostilas. |
| `### Listas de exercícios` | Listas, exercícios resolvidos, desafios. |
| `### Provas anteriores` | Provas e gabaritos, indicando o semestre (`2024.1`). |
| `### Anotações e resumos` | Resumos e cadernos feitos por estudantes. |
| `### Vídeos e aulas` | Aulas gravadas, canais, playlists. |
| `### Links úteis` | Documentação, ferramentas, artigos. |

Cada item é uma linha de lista com o **link no título**, seguido de autoria e ano:

```markdown
### Livros e apostilas

- [Introduction to Algorithms](https://mitpress.mit.edu/9780262046305/) — Cormen et al. (2022)
- [Notas de aula de Programação 1](https://exemplo.com/notas) — Prof. Fulano (2024.1)

### Provas anteriores

- [Prova 1 — 2024.1](prova1-2024-1.pdf) — com gabarito
```

Regras para os itens:

- Um item por linha, sempre com link e com a fonte (quem escreveu ou onde está).
- Material de terceiros: **linke a fonte original**, não copie o conteúdo. Respeitamos licenças e direitos autorais.
- Material próprio (suas anotações, resumos, listas): pode ficar no repositório, com autoria no item.
- Descrições curtas. Uma linha basta; se precisar de mais, vire uma subpágina.

## Recursos de escrita disponíveis

Além do markdown comum (negrito, listas, links, tabelas), estes recursos funcionam no site:

**Código**, com a linguagem indicada depois dos três acentos graves (` ```python `, ` ```java `, ` ```c `…), para ganhar destaque de sintaxe.

**Fórmulas**, em LaTeX. Atenção ao delimitador: o cifrão simples (`$...$`) **não** funciona.

```markdown
Inline: a busca binária custa \(O(\log n)\).

Em bloco:

$$
T(n) = 2T(n/2) + n
$$
```

**Avisos**, com a sintaxe de citação do GitHub:

```markdown
> [!NOTE]
> Esta lista cobre só o conteúdo da primeira unidade.
```

Os tipos aceitos são `NOTE`, `TIP`, `IMPORTANT`, `WARNING` e `CAUTION`.

**Gabarito escondido**, para exercícios que a pessoa pode tentar antes de ver a resposta:

```markdown
{{</* details title="Gabarito" */>}}
A resposta é O(n log n).
{{</* /details */>}}
```

**Imagens e arquivos** ficam na mesma pasta do `index.md` e são referenciados só pelo nome:

```markdown
![Árvore binária de busca](arvore-bst.png)

[Lista de exercícios 1](lista1.pdf)
```

Descreva a imagem no texto alternativo (entre `[ ]`), mantenha imagens abaixo de ~500 KB e dê nomes sem acento e sem espaço aos arquivos.

## Modelo para copiar

Crie `content/docs/NN-periodo/nome-da-disciplina/index.md` com este conteúdo e troque o que estiver entre colchetes. É só um ponto de partida: remova, renomeie ou acrescente seções conforme a disciplina.

```markdown
---
title: [Nome da disciplina]
weight: [1]
description: [Uma frase curta sobre a disciplina.]
autores:
  - [seu-usuario-github]
date: [AAAA-MM-DD]
---

[Parágrafo de abertura: o que a disciplina estuda e para que serve.]

## Objetivos

- [objetivo 1]
- [objetivo 2]

## Conteúdo previsto

- [tópico 1]
- [tópico 2]

## Materiais

### Livros e apostilas

- [Título](https://exemplo.com) — Autor (ano)

## Contribuição

Se você tiver materiais úteis desta disciplina, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.
```

Com o Hugo instalado, o comando `hugo new --kind disciplina docs/01-periodo/nome-da-disciplina/index.md` já cria o arquivo com esse modelo.

## Testando no seu computador

```bash
git clone https://github.com/thallesgsrv/Big-O-Library.git
cd Big-O-Library
hugo server    # abre o site em http://localhost:1313/Big-O-Library/
```


## Checklist antes de enviar

- [ ] A pasta está no período certo, com nome em minúsculas, sem acento e sem espaço.
- [ ] O arquivo tem `title`, `weight`, `description`, `autores` (com o seu usuário) e `date`.
- [ ] As seções fazem sentido para a disciplina (o modelo é só um ponto de partida).
- [ ] Cada material tem link e fonte; conteúdo de terceiros aponta para o original.
- [ ] Olhei a página no `hugo server`, no computador e no celular.

## Licença e conduta

- O repositório usa a licença [MIT](https://github.com/thallesgsrv/Big-O-Library/blob/main/LICENSE). Ao enviar material próprio, você concorda em publicá-lo sob essa mesma licença.
- Não envie conteúdo de terceiros sem permissão (provas de professores, livros completos, PDFs pagos). Linke a fonte original.
- Seja respeitoso nas issues e nos Pull Requests. Veja o [Código de Conduta](https://github.com/thallesgsrv/Big-O-Library/blob/main/.github/CODE_OF_CONDUCT.md).

## Dúvidas

Abra uma [issue](https://github.com/thallesgsrv/Big-O-Library/issues) descrevendo o que você quer fazer. Se algo neste guia estiver desatualizado ou confuso, também vale uma issue (ou um PR direto neste arquivo, `content/contribuir.md`).
