<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="themes/big-o-library/assets/images/bigo-library-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="themes/big-o-library/assets/images/bigo-library-light.svg">
    <img src="themes/big-o-library/assets/images/bigo-library-light.svg" alt="o(library)" width="360">
  </picture>
</p>

<p align="center">
  Acervo colaborativo de materiais das disciplinas de Ciência da Computação.<br>
  <a href="https://thallesgsrv.github.io/Big-O-Library/"><strong>thallesgsrv.github.io/Big-O-Library</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="Licença MIT">
  <a href="https://github.com/thallesgsrv/Big-O-Library/actions/workflows/build.yml"><img src="https://github.com/thallesgsrv/Big-O-Library/actions/workflows/build.yml/badge.svg" alt="Build"></a>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset=".github/img/home-escuro.png">
    <img src=".github/img/home-claro.png" alt="Página inicial do o(library), com tema claro e escuro" width="820">
  </picture>
</p>

A ideia surgiu a partir da forma como o professor [João Arthur](https://github.com/joaoarthurbm) organizou e disponibilizou o material de sua disciplina. O objetivo é levar esse modelo para as demais disciplinas do curso. Os materiais ficam no site, organizados por período e por optativas, e as páginas de algoritmos têm animações passo a passo com pseudocódigo sincronizado.

## Rodando localmente

Você precisa de [Git](https://git-scm.com/) e do [Hugo **extended**](https://gohugo.io/installation/) **0.165.0**. Use `git clone`: o ZIP do GitHub não funciona, porque o site lê as datas do histórico do Git.

```bash
git clone https://github.com/thallesgsrv/Big-O-Library.git
cd Big-O-Library
hugo server
```

Abra <http://localhost:1313/Big-O-Library/>. Instalação por sistema, erros comuns, checagens de qualidade e publicação estão em [DESENVOLVIMENTO.md](.github/DESENVOLVIMENTO.md).

## Contribuindo

Contribuições são bem-vindas, por [issue](https://github.com/thallesgsrv/Big-O-Library/issues) ou [Pull Request](https://github.com/thallesgsrv/Big-O-Library/pulls). O passo a passo está em [CONTRIBUTING.md](.github/CONTRIBUTING.md) e no [guia de escrita](https://thallesgsrv.github.io/Big-O-Library/contribuir/).

Este projeto é um material complementar produzido por estudantes e não substitui o conteúdo oficial, as aulas ou as orientações dos professores.

## Licença

[MIT](LICENSE)
