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

Requisitos: [Git](https://git-scm.com/) e [Hugo **extended**](https://gohugo.io/installation/) 0.167 ou mais novo (o site é gerado com a 0.167.0).

```bash

git clone --recurse-submodules https://github.com/thallesgsrv/Big-O-Library.git
cd Big-O-Library
hugo server
```

O tema (Hextra) é um submódulo: se você clonou sem `--recurse-submodules`, rode `git submodule update --init --recursive`. O Git precisa estar no PATH, porque o site usa as datas do histórico. No Windows, instale o Hugo com `winget install Hugo.Hugo.Extended`.

## Estrutura do repositório

```text
content/docs/        materiais: NN-periodo/disciplina/ e optativas/
content/contribuir.md  guia de escrita (publicado no site)
layouts/             templates do site (páginas, cards, parciais bo-*)
assets/css/          estilo do projeto (custom.css)
assets/viz/          motor das animações de algoritmos (viz.js / viz.css)
archetypes/          modelo para novas disciplinas
themes/hextra/       tema (submódulo)
```

Para criar uma animação de algoritmo, veja o [guia de animações](GUIA-ANIMACOES.md).

## Contribuição

Contribuições são bem-vindas. Se você já cursou alguma disciplina e quer compartilhar material, abra uma [issue](https://github.com/thallesgsrv/Big-O-Library/issues) ou envie um [Pull Request](https://github.com/thallesgsrv/Big-O-Library/pulls).

Para escrever ou editar uma disciplina, siga o [guia de escrita dos materiais](https://thallesgsrv.github.io/Big-O-Library/contribuir/) (também em [CONTRIBUTING.md](CONTRIBUTING.md)). Só o cabeçalho é obrigatório; o restante do markdown é livre, e cada disciplina pode ter a estrutura que fizer mais sentido. Há um modelo pronto para começar: `hugo new --kind disciplina docs/NN-periodo/nome-da-disciplina/index.md`.

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