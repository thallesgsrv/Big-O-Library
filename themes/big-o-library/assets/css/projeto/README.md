# Estilo do projeto (`css/projeto/`)

Todo o CSS próprio do o(library) mora aqui. O `head.html` junta os arquivos **pelo nome**,
depois de `variables.css` e do `compiled/main.css` (Tailwind). Em produção viram um único
arquivo minificado; no `hugo server` cada arquivo é carregado separado.

## Regras para mexer

- **A ordem é a cascata.** Os prefixos numéricos (`00`, `10`, `20`...) definem a ordem. Uma regra
  em um arquivo pode sobrescrever outra de um arquivo anterior. Não renomeie nem reordene sem
  conferir o resultado no navegador, nos temas claro e escuro.
- Para criar um arquivo novo, escolha um número que o coloque onde a cascata precisa.
- Este CSS não é compilado: use CSS comum e as variáveis de `variables.css` (`--ac`, `--card`, `--line`...).
- Se alterar `styles.css`, `typography.css` ou algo que o Tailwind processe, rode `npm run build:css`.

## Onde está cada coisa

| Arquivo | Conteúdo |
|---|---|
| `00-base` | base, links, tipografia de `.content` |
| `10-cabecalho`, `11-logo` | barra de navegação e logo animada |
| `20-home`, `22-home-secoes` | hero e seções da home |
| `21-card` | card de período, extras, lab e disciplina |
| `30-materiais-e-optativas` | página `/docs` |
| `31-pagina`, `32-disciplina` | página de material, breadcrumbs, seções |
| `33-colaboradores`, `34-rodape` | colaboradores e rodapé |
| `40-acessibilidade` | foco visível |
| `41` a `47` | menu mobile, créditos, leitura no celular, sumário mobile, seções recolhíveis, cookies, impressão, 404 |
| `50-conselho-mesa`, `51-conselho-cards` | Conselho dos Sábios |
| `60-jogo`, `70-mapa` | páginas do lab |
| `80-navegacao-e-ajustes` | progresso de leitura, voltar ao topo, paginação e outros ajustes tardios |
| `81-polimento` | polimento visual geral |
| `90-terminal` | janela de terminal e sintaxe de código |
| `91` a `95` | transições, histórico da home, fila, árvores, leitura prolongada e celular |

## Componentes definidos em mais de um arquivo

O CSS cresceu em camadas, então um componente costuma ter regras em vários arquivos. Antes de
alterar um, liste todos os pontos:

```bash
grep -l "bo-consent" themes/big-o-library/assets/css/projeto/*.css
```

Os casos mais espalhados hoje:

- **Aviso de cookies** (`.bo-consent`): `45`, `46` e `80`.
- **Impressão** (`@media print`): `46`, `80` e `95`.
- **Créditos** (`.bo-credits-person`): `41`, `42` e `80`.
- **Seções** (`.bo-sec`): `32`, `40`, `42`, `44`, `46`, `80`, `81` e `95`.
- **Botões** (`.bo-b1`, `.bo-b2`): `20`, `22`, `40` e `81`.
- **Terminal** (`.bo-term`): `80`, `90` e `95`.

Unificar essas regras é possível, mas precisa de conferência visual nos dois temas; foi deixado
de fora de propósito.
