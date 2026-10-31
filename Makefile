# Atalhos do projeto. `make` sem argumentos lista os comandos.
.DEFAULT_GOAL := ajuda
.PHONY: ajuda serve build check validar lint test css a11y clean

ajuda: ## mostra esta lista
	@grep -E '^[a-z0-9]+:.*## ' $(MAKEFILE_LIST) | sed -E 's/:.*## /\t/' | sort

serve: ## servidor local com recarga automática (inclui páginas com data futura)
	hugo server -F

build: ## compila o site em public/ (como na produção)
	hugo --gc --minify

check: validar lint test css ## todas as checagens rápidas (conteúdo, markdown, testes, CSS)

validar: ## front matter, pesos, datas, pré-requisitos e animações
	python3 scripts/validar.py

lint: ## defeitos de renderização no Markdown
	npm run -s lint:md

test: ## testes das animações
	npm test

css: ## recompila o CSS e falha se o main.css commitado estiver defasado
	npm run -s build:css
	git diff --exit-code -- themes/big-o-library/assets/css/compiled/main.css

a11y: ## auditoria de acessibilidade (precisa de CHROME_PATH)
	hugo --gc --baseURL / --destination public-check
	SITE_DIR=public-check npm run a11y

clean: ## apaga os sites gerados
	rm -rf public public-check resources/_gen
