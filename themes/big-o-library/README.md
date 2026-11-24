# Tema big-o-library

Tema do site. Nasceu como um fork enxuto do [Hextra](https://github.com/imfing/hextra) (MIT, veja `LICENSE`)
e hoje é específico do o(library). Por isso restam classes `hextra-*` e utilitários `hx:*` do Tailwind;
eles são usados de verdade e podem ficar.

Convenção: o que é do projeto tem prefixo **`bo-`** (parciais, classes CSS, scripts).

## Layouts (`layouts/`)

| Arquivo | Para quê |
|---|---|
| `baseof.html`, `home.html`, `404.html` | estrutura base, home e página 404 |
| `_default/single.html` | página de material (usa o parcial `bo-pagina`) |
| `docs/list.html` | página de uma disciplina ou seção de `content/docs/` |
| `_default/materiais.html` | índice `/docs` (períodos e extras) |
| `_default/lab.html`, `jogo.html`, `mapa.html`, `graficador.html` | páginas do laboratório (`content/lab/`) |
| `_default/conselho.html`, `colaboradores.html` | Conselho dos Sábios e colaboradores |
| `_shortcodes/` | `viz` (animações), `quiz` e `questao`, `fila`, `details` |
| `_markup/` | como o Markdown vira HTML (código, imagens, links, tabelas, alertas, fórmulas) |

As páginas especiais são escolhidas pelo `layout:` no front matter do arquivo em `content/`.

## Parciais (`layouts/_partials/`)

Os `bo-*` são do projeto:

| Parcial | Função |
|---|---|
| `bo-pagina`, `bo-periodo`, `bo-hero`, `bo-mhead` | corpo da página de material, selo/classe por período e cabeçalhos |
| `bo-crumbs`, `bo-voltar`, `bo-toc-mobile`, `bo-edit-url` | breadcrumbs, link de voltar, sumário no celular e link "editar no GitHub" |
| `bo-fold`, `bo-recolher` | seções recolhíveis (`<details>`) geradas no build; `bo-recolher` carrega o JS de apoio |
| `bo-credits`, `bo-av`, `bo-sabios`, `bo-materiais-de` | autores, avatar, dados de `data/conselho.yaml` e materiais de cada pessoa |
| `bo-cx` | lista de complexidades usada em `/docs` e no selo dos períodos |
| `bo-tree`, `bo-historico` | índice de páginas em JSON (head.html) e os materiais atualizados recentemente na home |
| `bo-jsonld`, `bo-math-titulo`, `bo-logo`, `bo-consent` | dados estruturados (SEO), fórmulas em títulos, logo e aviso de cookies |

Os demais (`head`, `navbar`, `sidebar`, `toc`, `footer`, `search`, `scripts/`, `components/`, `utils/`) vêm do tema original.

## Dados

- `data/icons.yaml` (neste tema): ícones SVG usados pelo parcial `utils/icon.html`.
- Dados do conteúdo ficam em `data/` na **raiz do repositório** (`disciplinas`, `extras`, `conselho`, `jogo`, `graficador`).

## Assets (`assets/`)

| Pasta | Conteúdo |
|---|---|
| `css/` | `variables.css`, `styles.css` + `typography.css` (Tailwind, compilados em `compiled/main.css`) e `projeto/` (CSS próprio, **leia o README da pasta**) |
| `js/core/` | scripts de todas as páginas (tema, menu, sumário, copiar código, leitura...), incluídos automaticamente |
| `js/head/`, `js/vendor/` | script que roda no `<head>` e o FlexSearch |
| `viz/` | motor das animações de algoritmos (`docs/GUIA-ANIMACOES.md`) |
| `quiz/` | motor dos quizzes (`docs/GUIA-QUIZ.md`) |
| `graficador/` | graficador de funções (`expr.js` é testado; `graficador.js` é um arquivo único, sem testes) |
| `json/search-data.json` | índice da busca, gerado pelo Hugo |

## Antes de abrir um PR

Depois de mexer em `styles.css`, `typography.css` ou nas classes `hx:*` dos templates, rode `npm run build:css`
e inclua o `compiled/main.css` no commit. O CI falha se ele estiver desatualizado. As demais checagens estão em
`docs/DESENVOLVIMENTO.md`.
