---
title: Git e GitHub
weight: 20
description: Comandos essenciais de versionamento e colaboração em repositórios.
rotulo: Tópicos
autores:
  - thallesgsrv
date: 2026-10-03
---

## Comandos essenciais do Git

| Comando | O que faz |
| --- | --- |
| `git init` | Inicializa um repositório Git na pasta atual. |
| `git clone <url>` | Copia um repositório remoto para a máquina local. |
| `git status` | Mostra o estado dos arquivos: modificados, novos ou enviados. |
| `git add <arquivo>` | Adiciona arquivos à área de staging. |
| `git add .` | Adiciona todos os arquivos modificados para staging. |
| `git commit -m "mensagem"` | Salva as alterações com uma mensagem de commit. |
| `git log` | Mostra o histórico de commits. |
| `git log --oneline` | Mostra o histórico resumido em uma linha por commit. |
| `git branch` | Lista as branches do repositório. |
| `git checkout <nome>` | Troca para outra branch. |
| `git checkout -b <nome>` | Cria uma nova branch e entra nela. |
| `git switch <nome>` | Alterna para uma branch de forma mais moderna. |
| `git switch -c <nome>` | Cria e entra em uma nova branch. |
| `git merge <nome>` | Junta uma branch na branch atual. |
| `git pull` | Puxa as alterações mais recentes do repositório remoto. |
| `git push` | Envia os commits locais para o remoto. |
| `git remote -v` | Mostra os repositórios remotos configurados. |
| `git remote add origin <url>` | Conecta o repositório local a um remoto. |
| `git fetch` | Baixa as alterações do remoto sem fazer merge. |
| `git diff` | Mostra as diferenças entre arquivos modificados e o último commit. |
| `git diff --staged` | Mostra diferenças dos arquivos já em staging. |
| `git restore <arquivo>` | Descarta alterações locais de um arquivo. |
| `git restore --staged <arquivo>` | Remove um arquivo da área de staging. |
| `git reset --hard` | Volta o repositório para o último estado conhecido, descartando mudanças. |
| `git revert <hash>` | Cria um commit que desfaz alterações de outro commit. |
| `git tag` | Lista tags do repositório. |
| `git tag <nome>` | Cria uma tag. |
| `git stash` | Guarda mudanças temporárias sem fazer commit. |
| `git stash pop` | Recupera mudanças salvas no stash. |

## Comandos do GitHub

| Comando | O que faz |
| --- | --- |
| `git push origin main` | Envia a branch principal para o GitHub. |
| `git push -u origin main` | Configura a branch local para acompanhar a branch remota. |
| `git pull origin main` | Atualiza a branch local com o conteúdo do GitHub. |
| `git clone <url-do-repo>` | Baixa um repositório do GitHub para a máquina local. |
| `gh auth login` | Faz login no GitHub via CLI. |
| `gh repo create` | Cria um repositório no GitHub pela linha de comando. |
| `gh pr create` | Cria um pull request pelo terminal. |
| `gh issue create` | Cria uma issue no GitHub pelo terminal. |

## Fluxo básico de trabalho

```bash
git init
git add .
git commit -m "Primeiro commit"
git branch -M main
git remote add origin https://github.com/usuario/repositorio.git
git push -u origin main
```

## Branches

```bash
git checkout -b feature/login
git switch main
git merge feature/login
```

## Repositórios locais e remotos

```bash
git remote -v
git fetch
git pull origin main
git push origin main
```

## Resumo rápido

- `git init` — cria o repositório
- `git add` — prepara arquivos
- `git commit` — salva alterações
- `git branch` — organiza versões
- `git merge` — junta alterações
- `git push` — envia para o GitHub
- `git pull` — atualiza do GitHub
