# Guia: como colocar um quiz em qualquer página

Você escreve as perguntas em Markdown e o site cuida do resto: clique para responder, correção na hora, explicação, placar, resultado e (no fim) uma frase do Conselho dos Sábios. Fórmulas `$...$` funcionam normalmente.

## Modelo para copiar e colar

Cole em qualquer `.md` de `content/` (por exemplo, na seção "Exercícios") e troque os textos:

    {{< quiz titulo="nome do quiz" >}}

    {{< questao >}}
    Enunciado da pergunta. Pode ter **negrito**, fórmulas como $p\to q$, código e tabelas.

    - [ ] alternativa errada
    - [x] alternativa certa
    - [ ] outra errada
    - [ ] mais uma errada
    ---
    Explicação que aparece depois da resposta (opcional).
    {{< /questao >}}

    {{< questao >}}
    Segunda pergunta...

    - [x] certa
    - [ ] errada
    ---
    Por que a certa é a certa.
    {{< /questao >}}

    {{< /quiz >}}

Só isso. Rode `hugo server` e abra a página.

## As regras do formato

| Quero... | Como escrever |
| --- | --- |
| Marcar a alternativa certa | `- [x] texto` (as erradas são `- [ ] texto`) |
| Explicação depois da resposta | uma linha só com `---` depois das alternativas; tudo o que vem depois é a explicação |
| Quebra de linha dentro de uma alternativa | escreva a continuação na linha seguinte, com recuo (ela vira uma nova linha dentro do mesmo botão) |
| Mais de uma certa ("marque todas") | marque mais de uma com `[x]`: o quiz mostra o botão *verificar* sozinho |
| Fórmulas | `$p\to q$` nas alternativas, no enunciado e na explicação |
| Tabela ou código no enunciado | escreva normalmente antes da primeira alternativa |

Exemplo de alternativa com duas linhas:

    - [x] $p\leftrightarrow q$
          (V quando os dois têm o mesmo valor)
    - [ ] $p\oplus q$
          (V quando os dois têm valores diferentes)

## Parâmetros

`{{< quiz >}}` (todos opcionais):

| Parâmetro | Valores | O que faz |
| --- | --- | --- |
| `titulo` | texto | nome que aparece na barra de cima (`$ ./quiz titulo`) |
| `modo` | `um-por-vez` (padrão) ou `lista` | `um-por-vez`: uma pergunta por vez, com barra de progresso e botão *próxima*. `lista`: todas as perguntas na página, cada uma independente, com o resultado no fim |
| `embaralhar` | `true` | embaralha a ordem das alternativas a cada tentativa |
| `conselho` | `false` | tira a frase do Conselho da tela de resultado |

`{{< questao >}}` (opcional):

| Parâmetro | Valores | O que faz |
| --- | --- | --- |
| `fixa` | `true` | não embaralha as alternativas desta pergunta (use em "Tautologia / Contradição / Contingência", "Vale / Não vale", "Válido e correto / ...") |

## Quando usar cada formato

- **Várias perguntas, estilo jogo:** `modo` padrão. Bom para uma lista de exercícios do mesmo tipo (classificar 7 fórmulas).
- **Várias perguntas para ler com calma:** `modo="lista"`.
- **Uma pergunta só (questão avulsa):** coloque uma única `{{< questao >}}` dentro do `{{< quiz >}}`. Ele aparece sem barra, placar nem tela de resultado, só a pergunta, a explicação e o botão *tentar de novo*. Ótimo para trocar um exercício com "Gabarito" por uma versão clicável, sem mudar a numeração da página.

## Dicas para escrever boas perguntas

- **O erro tem que ensinar.** Use como alternativas erradas os enganos mais comuns (a recíproca em vez da contrapositiva, esquecer de trocar `∧` por `∨` no De Morgan). A explicação vale mais que o certo/errado.
- **Quatro alternativas no máximo** para respostas de uma linha. Passou disso, vira lista longa.
- **Perguntas de construir** (montar uma tabela, desenhar uma árvore) continuam como exercício com `{{< details title="Gabarito" >}}`. O quiz serve para escolher, classificar e conferir.
- **Letra acentuada não vai dentro de `$...$`.** O KaTeX recusa e o build falha (`Accented Unicode text character`). Deixe o texto fora das fórmulas: `$p$ é verdadeira`, e não `$p é verdadeira$`. Se precisar de texto dentro, use `\text{é}`.
- **Não coloque texto solto entre as `{{< questao >}}`**: tudo que for conteúdo vai dentro de uma pergunta (no enunciado).

## Se o build falhar

O Hugo avisa a linha exata do problema:

| Mensagem | Causa |
| --- | --- |
| `precisa de pelo menos 2 alternativas` | faltou o formato `- [ ] texto` (note o espaço dentro dos colchetes) |
| `marque a alternativa certa com '- [x]'` | nenhuma alternativa tem `[x]` |
| `falta o enunciado` | não há texto antes da primeira alternativa |

## Como funciona (para quem quiser mexer)

- `themes/big-o-library/layouts/_shortcodes/quiz.html`: moldura, parâmetros e carregamento de CSS/JS (uma vez por página).
- `themes/big-o-library/layouts/_shortcodes/questao.html`: lê o Markdown da pergunta, valida e gera o HTML (fórmulas já renderizadas no build).
- `themes/big-o-library/assets/quiz/quiz.js`: só mostra, esconde e corrige. Tem teclado: letras `A` a `J` ou números `1` a `9` escolhem a alternativa (com o foco dentro do quiz), `Enter` avança.
- `themes/big-o-library/assets/quiz/quiz.css`: visual (mesmos tokens do site, claro e escuro). Classes com prefixo `.bo-qz`.
- Sem JavaScript, as perguntas aparecem todas, com a alternativa certa marcada com ✓.
