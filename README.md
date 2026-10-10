<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="themes/big-o-library/assets/images/bigo-library-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="themes/big-o-library/assets/images/bigo-library-light.svg">
    <img src="themes/big-o-library/assets/images/bigo-library-light.svg" alt="o(library)" width="360">
  </picture>
</p>

<h1 align="center">
  Big-O-Library
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
  <img src="https://img.shields.io/github/stars/thallesgsrv/Big-O-Library?style=flat-square" alt="Stars">
</h1>

<p align="center">
  <a href="#status"><img src="https://img.shields.io/badge/Status-Em_desenvolvimento-yellow?style=for-the-badge" alt="Status"></a>
  <a href="#contribuição"><img src="https://img.shields.io/badge/Contribui%C3%A7%C3%B5es-Abertas-brightgreen?style=for-the-badge" alt="Contribuições"></a>
</p>

<p align="center">
  Acervo colaborativo de materiais das disciplinas de Ciência da Computação.
</p>

A ideia surgiu a partir da forma como o professor [João Arthur](https://github.com/joaoarthurbm) organizou e disponibilizou o material de sua disciplina. O objetivo é levar esse modelo para as demais disciplinas do curso.

## Recomendações

Antes de consultar qualquer material, um conselho: se algo não fizer sentido na primeira leitura, releia quantas vezes for preciso. Nada escrito por outra pessoa é impossível de entender, e o resultado depende do quanto você está disposto a se dedicar.

Sobre dedicação, vale assistir a [Você tem brio?](https://youtu.be/TRPBY_lxJfE), de Clóvis de Barros Filho.

## Conteúdo

Os materiais ficam no [site](https://thallesgsrv.github.io/Big-O-Library/docs/), organizados por período (1º ao 9º) e por optativas. Já há disciplinas dos primeiros períodos e, nas optativas, Algoritmos Avançados com visualizações interativas (BFS, DFS, Dijkstra, Segment Tree, Lazy Propagation e LCA). A lista completa e atualizada está sempre no site.

## Rodando localmente

### O que você precisa

| Ferramenta | Versão | Observação |
|---|---|---|
| [Git](https://git-scm.com/) | qualquer recente | Precisa estar no PATH. O site lê as datas de atualização do histórico do Git, então **use `git clone`**: baixar o ZIP do GitHub não funciona (o build falha com `failed to load Git data`). |
| [Hugo **extended**](https://gohugo.io/installation/) | 0.165.0 ou mais novo | É a versão usada no site. O tema exige no mínimo a 0.146.0. Confira com `hugo version`: a linha precisa conter `+extended`. |
| Internet | no primeiro build | O Hugo baixa o FlexSearch (busca) e o KaTeX (fórmulas) de `cdn.jsdelivr.net` e guarda em cache. Se esse domínio estiver bloqueado na sua rede, o build para com `Could not retrieve ... file from https://cdn.jsdelivr.net`. |

Não é preciso Node, Go nem submódulos do Git: o tema está dentro do repositório, em `themes/big-o-library/`.

### Passo a passo

**Linux (Debian/Ubuntu)**

```bash
# 1) Git e Hugo extended (em ARM, troque amd64 por arm64)
sudo apt update && sudo apt install -y git curl
curl -LO https://github.com/gohugoio/hugo/releases/download/v0.165.0/hugo_extended_0.165.0_linux-amd64.deb
sudo apt install -y ./hugo_extended_0.165.0_linux-amd64.deb
hugo version        # deve mostrar v0.165.0 ... +extended

# 2) Baixe o projeto
git clone https://github.com/thallesgsrv/Big-O-Library.git
cd Big-O-Library

# 3) Suba o servidor local
hugo server
```

**macOS**

```bash
brew install git hugo
git clone https://github.com/thallesgsrv/Big-O-Library.git
cd Big-O-Library
hugo server
```

**Windows (PowerShell)**

```powershell
winget install Git.Git
winget install Hugo.Hugo.Extended
# feche e abra o terminal para o PATH atualizar, depois:
git clone https://github.com/thallesgsrv/Big-O-Library.git
cd Big-O-Library
hugo server
```

Abra **http://localhost:1313/Big-O-Library/** (note o `/Big-O-Library/` no final). O site recarrega sozinho quando você salva um arquivo. Para parar, use `Ctrl+C`.

Para criar uma disciplina nova já com o modelo:

```bash
hugo new --kind disciplina docs/01-periodo/nome-da-disciplina/index.md
```

### Se der erro

| Erro ou sintoma | Causa e solução |
|---|---|
| `hugo: command not found` | Hugo não instalado ou terminal aberto antes da instalação. Instale e abra um terminal novo. |
| `failed to load Git data: not a git repository` | Você baixou o ZIP. Use `git clone`. |
| `Could not retrieve ... https://cdn.jsdelivr.net/...` | Sem internet ou domínio bloqueado. Conecte-se e rode `hugo server` de novo. |
| Erro de versão ou de recurso do Hugo | Versão antiga ou sem `+extended`. Atualize e confira com `hugo version`. |
| Sua página não aparece | `date` no futuro (use `hugo server -F` para ver mesmo assim), `weight` repetido no período, ou subpáginas dentro de um `index.md` (use `_index.md`). |
| Site com fontes diferentes das do site publicado | Opcional: `python3 scripts/baixar_fontes.py` baixa as fontes (precisa de Python 3 e internet). Não é necessário para contribuir. |

## Estrutura do repositório

```text
content/docs/                      materiais: NN-periodo/disciplina/ e optativas/
content/contribuir.md              guia de escrita (publicado no site)
themes/big-o-library/layouts/      templates do site (páginas, cards, parciais bo-*)
themes/big-o-library/assets/css/   estilo do projeto (custom.css)
themes/big-o-library/assets/viz/   motor das animações de algoritmos (viz.js / viz.css)
themes/big-o-library/archetypes/   modelo para novas disciplinas
scripts/                           utilitários (baixar_fontes.py)
hugo.yaml                          configuração do Hugo
deploy.sh                          publica o site na branch gh-pages (só mantenedores)
.github/                           CONTRIBUTING, código de conduta e guia de animações
```

Para criar uma animação de algoritmo, veja o [guia de animações](.github/GUIA-ANIMACOES.md).

## Publicação

O site publicado vem da branch `gh-pages`. Não há GitHub Actions: quem tem permissão de escrita no repositório gera e envia o site com o script da raiz:

```bash
git checkout main && git pull
./deploy.sh "mensagem do commit"
```

O script publica o que está na **sua pasta** (inclusive alterações ainda não commitadas), por isso rode com `git status` limpo. Contribuidores não precisam publicar nada: abrem o Pull Request e a publicação é feita pelos mantenedores depois do merge.

## Contribuição

Contribuições são bem-vindas. Se você já cursou alguma disciplina e quer compartilhar material, abra uma [issue](https://github.com/thallesgsrv/Big-O-Library/issues) ou envie um [Pull Request](https://github.com/thallesgsrv/Big-O-Library/pulls).

Para escrever ou editar uma disciplina, siga o [guia de escrita dos materiais](https://thallesgsrv.github.io/Big-O-Library/contribuir/) (também em [CONTRIBUTING.md](.github/CONTRIBUTING.md)). Só o cabeçalho é obrigatório; o restante do markdown é livre, e cada disciplina pode ter a estrutura que fizer mais sentido. Há um modelo pronto para começar: `hugo new --kind disciplina docs/NN-periodo/nome-da-disciplina/index.md`.

## Avisos

Este projeto é um material complementar produzido por estudantes e não substitui o conteúdo oficial, as aulas ou as orientações dos professores.

Sempre que possível, materiais de terceiros serão referenciados e vinculados à fonte original, respeitando suas licenças e direitos autorais.

## Status

Em desenvolvimento.

## Histórico de Estrelas

<a href="https://www.star-history.com/?repos=thallesgsrv%2FBig-O-Library&type=date&legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=thallesgsrv/Big-O-Library&type=date&theme=dark&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=thallesgsrv/Big-O-Library&type=date&legend=top-left" />
    <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=thallesgsrv/Big-O-Library&type=date&legend=top-left" />
  </picture>
</a>