#!/usr/bin/env bash
# Publica o site: gera o HTML em public/ e envia para a branch gh-pages.
# Uso: scripts/deploy.sh "mensagem do commit"
set -euo pipefail
cd "$(dirname "$0")/.."

MESSAGE="${1:-atualiza o site}"

# Confere a versão do Hugo antes de qualquer coisa. O CSS das fórmulas (KaTeX)
# do tema só combina com a versão fixada no CI; com outra, símbolos como \neq
# aparecem quebrados no site publicado.
HUGO_ESPERADO="$(sed -n 's/^  HUGO_VERSION: *//p' .github/workflows/build.yml | head -n 1)"
HUGO_ATUAL="$(hugo version 2>/dev/null || true)"
if [ -z "$HUGO_ESPERADO" ]; then
  echo "Não consegui ler HUGO_VERSION em .github/workflows/build.yml." >&2
  exit 1
fi
if ! grep -q "hugo v${HUGO_ESPERADO}[-+ ]" <<<"$HUGO_ATUAL" || ! grep -q "+extended" <<<"$HUGO_ATUAL"; then
  echo "Hugo incorreto. Esperado: v${HUGO_ESPERADO} extended." >&2
  echo "Encontrado: ${HUGO_ATUAL:-hugo não encontrado no PATH}" >&2
  echo "Veja .github/DESENVOLVIMENTO.md para instalar a versão certa." >&2
  exit 1
fi

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
