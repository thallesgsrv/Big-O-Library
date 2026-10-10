#!/usr/bin/env bash
# Publica o site: gera o HTML em public/ e envia para a branch gh-pages.
# Uso: ./deploy.sh "mensagem do commit"
set -euo pipefail

MESSAGE="${1:-atualiza o site}"

# Primeira vez: liga a pasta public/ à branch gh-pages
if [ ! -e public/.git ]; then
  rm -rf public
  git fetch origin gh-pages 2>/dev/null || true
  if git show-ref --verify --quiet refs/remotes/origin/gh-pages; then
    git worktree add -B gh-pages public origin/gh-pages
  else
    git worktree add --detach public
    git -C public checkout --orphan gh-pages
    git -C public rm -rfq . 2>/dev/null || true
    git -C public commit --allow-empty -m "Inicializa gh-pages"
  fi
fi

# Limpa o site antigo (o .git da pasta public fica) e gera o novo
rm -rf public/*
hugo --gc --minify

# Envia
cd public
touch .nojekyll
git add --all
git commit -m "$MESSAGE" || echo "Nenhuma mudança nova; verificando se há commits para enviar."
git push origin gh-pages
