# Guia pedagógico do Big-O Library

Este guia diz **como escrever um material** para que ele seja fácil de estudar, sem perder rigor. Cada regra traz o
nível de evidência por trás dela, para você saber o que é resultado de pesquisa e o que ainda é aposta de design.

Os números e as ressalvas vêm de estudos que conferimos nas fontes originais; a lista completa está na seção
[Referências](#referências). Quando um resultado vale só para certos contextos, isso está dito aqui.

## Como ler os níveis de evidência

- **Experimental:** testado em experimentos ou meta-análises, no tipo de situação que se parece com a nossa.
- **Teórica:** deriva de um princípio bem estabelecido (como a teoria da carga cognitiva), mas sem teste direto no nosso
  formato.
- **Hipótese:** decisão de design razoável que precisa ser validada com os nossos leitores.

## A estrutura de um material

Use como ponto de partida e adapte. Nem todo material precisa de todas as etapas, e a ordem pode mudar.

| Etapa | O que fazer | Onde fica hoje |
|---|---|---|
| Objetivo | Dizer o que a pessoa vai conseguir fazer no final (verbos observáveis: aplicar, decidir, explicar). | Seção "Sobre", lista "Ao final você deve conseguir" |
| Pré-requisitos | Listar o que ajuda ter visto antes, com links. | Callout `> [!NOTE]` logo depois da abertura |
| Intuição | Um exemplo concreto ou pergunta antes da definição formal, quando o assunto for abstrato. | Primeiros parágrafos da seção do conceito |
| Explicação formal | Definição e raciocínio com o rigor necessário. | Corpo do material |
| Exemplo resolvido | Resolução completa, passo a passo, sem pular etapas que um iniciante não faria sozinho. | Seções "Exemplo" |
| Interpretação | Dizer por que cada passo foi dado, não só qual foi. | Coluna "Por quê" nas tabelas, comentários entre passos |
| Erros comuns | Os tropeços mais frequentes e a causa de cada um, sem julgamento. | Seção "Erros comuns" |
| Resumo | Uma linha por ideia central. | Seção "Resumo" |
| Prática | Exercícios do básico ao avançado, **sempre com gabarito** (`details`) ou quiz. | Seção "Exercícios" |
| Revisão ativa | Perguntas que exigem lembrar, não só reler. | `{{< quiz >}}` |

### Adapte ao tipo de conteúdo

- **Conceito teórico:** intuição, definição, exemplo, contraexemplo, erro comum.
- **Algoritmo:** ideia em uma frase, passo a passo com um exemplo pequeno, código, custo e quando usar.
- **Demonstração:** primeiro a ideia geral da prova (o "mapa"), depois os passos, cada um com a justificativa. Se a
  prova for longa, quebre em lemas com subtítulos.
- **Método de cálculo ou resolução:** receita numerada, exemplo resolvido, depois um exemplo parecido para a pessoa
  tentar.

## Carga cognitiva e segmentação

- **Dividir explicações longas em etapas** com subtítulos ajuda quem está aprendendo. (Experimental: Rey et al., 2019,
  efeito pequeno a médio. Atenção: os estudos são sobre animações e vídeos, e o efeito foi maior para quem já tinha
  conhecimento prévio; para texto é uma extrapolação.)
- **Sinalizar o que importa** com destaque visual (negrito, callouts, cores consistentes) melhora a retenção.
  (Experimental: Alpizar et al., 2020, d = 0,38.) Use poucos tipos de destaque e sempre com o mesmo significado.
- **Cortar o que não ajuda a entender** (princípio da coerência). Piadas, imagens e histórias sem relação com o
  conceito atrapalham mais do que ajudam, principalmente para iniciantes. (Experimental: Sundararajan e Adesope, 2020.)
- **Meta de tamanho:** o `scripts/validar.py` avisa quando uma seção `##` passa de ~800 palavras. É um lembrete, não
  uma regra: listas de exercícios podem ser longas.

## Exemplos resolvidos

- Estudar exemplos resolvidos ajuda tanto no primeiro contato com uma habilidade quanto na prática.
  (Experimental: Barbieri et al., 2023, g = 0,48, em matemática.)
- Prefira exemplos **corretos**. Nessa meta-análise, exemplos incorretos sozinhos ou misturados com corretos não
  ajudaram mais.
- **Não acrescente perguntas de autoexplicação dentro dos exemplos de matemática.** Na mesma meta-análise, o efeito
  foi menor quando havia essas perguntas. Em vez disso, escreva você mesmo a justificativa de cada passo.
- O que vale para matemática pode não valer para programação ou lógica; aqui é uma extrapolação razoável, não um
  fato.

## Memória de longo prazo

- **Recuperação ativa** (tentar lembrar antes de ver a resposta) é consistentemente melhor do que reler.
  (Experimental: Agarwal, Nunes e Blunt, 2021, revisão sistemática.) Por isso o gabarito fica recolhido e os
  exercícios pedem que a pessoa tente primeiro.
- **Revisão espaçada** ajuda. (Experimental: Mawson e Kang, 2025, d = 0,54 em salas de aula.) Convide a pessoa a voltar
  aos exercícios que errou depois de alguns dias, sem prometer um intervalo exato: não há um número ideal para todo
  mundo.
- **Prática intercalada** (misturar tipos de problema) ajuda mais quando os tipos são parecidos entre si, como métodos
  de ordenação. (Experimental: Brunmair e Richter, 2019, g = 0,42, com resultados fracos em matemática e textos.) Use
  em listas de revisão, não no primeiro contato com o assunto. (Hipótese de aplicação.)
- **Feedback corretivo:** todo exercício precisa de gabarito ou explicação. (Teórica; o `validar.py` avisa se faltar.)

## Pausas e duração

Não há evidência de um intervalo fixo ideal, e o Pomodoro não foi validado para estudo. Pausas curtas (até 10 minutos)
reduzem cansaço e aumentam disposição, mas não melhoraram o desempenho em tarefas muito exigentes
(Albulescu et al., 2022). Por isso o material **não impõe** cronômetros. Ele só oferece pontos naturais de parada:
seções curtas, "Resumo" e exercícios no final.

## Tipografia e leitura

| Decisão | Valor | Evidência |
|---|---|---|
| Tamanho do texto corrido | 17 px no celular, 18 px em telas largas | Experimental: Rello, Pielot e Marcos (2016) viram melhor leitura e compreensão até 18 pt e pior compreensão com 10 e 12 pt. Estudo único, com 104 pessoas. |
| Tabelas | 15 px | Hipótese (extrapolação do estudo acima). |
| Código | 14,5 px (13,5 px no celular) | Hipótese (extrapolação). |
| Altura da linha | 1,75 | Sem mudança: o mesmo estudo achou efeito só nos extremos (0,8 e 1,8). |
| Largura da linha | ~70 caracteres | Experimental, mas antigo e modesto: compreensão maior com ~55 caracteres (Dyson e Haselgrove, 2001) e sem diferença entre 25 e 100 (Dyson e Kipping, 1998). Mantida na faixa 45–90. |
| Fonte monoespaçada no corpo | mantida | É a identidade do projeto. Não achamos evidência para trocar nem para manter; está na lista de testes. |

Contraste: os textos de leitura passam o nível AA da WCAG (as únicas exceções medidas são o logotipo e separadores
decorativos). Elementos de interface que carregam significado (bordas
tracejadas, linhas de diagramas) precisam de pelo menos 3:1: use `var(--mute)`, não `var(--axis)`.

Leitura em tela costuma render pior compreensão do que no papel, principalmente com pressa e em textos
informativos (Delgado et al., 2018, 171.055 participantes). Por isso o site evita contagem de tempo, e a folha de
estilo de impressão é mantida.

## Tom de voz

A biblioteca fala como alguém que domina o assunto e explica sem pressa. Linguagem conversacional tem apoio
experimental: aumenta retenção e transferência em estudos curtos, mas o efeito diminui em sessões mais longas que ~35
minutos (Ginns, Martin e Marsh, 2013). Humor e histórias fora do assunto podem atrapalhar, principalmente iniciantes, embora o efeito seja pequeno
(Sundararajan e Adesope, 2020). Então:

- **Use a linguagem informal para conduzir:** aberturas, transições, avisos, comentários sobre erros e orientação dos
  exercícios. Exemplos: "Bora entender isso.", "Olha só.", "Calma, vamos por partes.", "Aqui está o pulo do gato.",
  "Até aqui, tranquilo?", "Esse é um erro bem comum.", "Não precisa decorar isso agora."
- **Mantenha a terminologia técnica exata** dentro de definições, teoremas e passos. O informal fica em volta, não
  dentro da definição.
- **Evite piada solta.** Se um comentário bem-humorado não ajuda a entender, corte. Fique longe de fórmulas e figuras.
- **Não use gíria em toda frase.** Uma ou duas marcas por seção bastam.
- **Nunca julgue quem erra.** "Esse é um erro bem comum" e "faz parte do treino" no lugar de "isso é fácil" ou "é só".
- **Evite "é só", "basta" e "simples" para coisas que o leitor ainda está aprendendo.**

Antes e depois:

- Ruim: "É só jogar o número na fórmula e pronto."
- Melhor: "Olha só: podemos substituir diretamente o valor na expressão. Mas antes, vamos entender por que essa
  substituição funciona."

## Lista de conferência antes de abrir o PR

- [ ] O material diz o que a pessoa vai conseguir fazer no final?
- [ ] Os pré-requisitos estão listados, com link?
- [ ] Há um exemplo concreto antes (ou logo depois) de cada definição abstrata?
- [ ] Os exemplos resolvidos mostram o porquê de cada passo?
- [ ] Todo exercício numerado tem gabarito ou quiz?
- [ ] Nenhuma seção `##` ficou enorme sem subtítulos?
- [ ] O tom é próximo, sem gíria demais e sem piada solta?
- [ ] As fórmulas foram conferidas?

## Referências

Resumo ou texto original conferido para todas. Os números vêm dos próprios artigos; onde não conferimos volume ou
páginas, eles foram omitidos.

- Agarwal, P. K., Nunes, L. D., & Blunt, J. R. (2021). Retrieval practice consistently benefits student learning: a
  systematic review of applied research in schools and classrooms. *Educational Psychology Review*.
  <https://doi.org/10.1007/s10648-021-09595-9>
- Albulescu, P., et al. (2022). "Give me a break!" A systematic review and meta-analysis on the efficacy of micro-breaks
  for increasing well-being and performance. *PLOS ONE, 17*(8), e0272460.
  <https://doi.org/10.1371/journal.pone.0272460>
- Alpizar, D., Adesope, O. O., & Wong, R. M. (2020). A meta-analysis of signaling principle in multimedia learning
  environments. *Educational Technology Research and Development, 68*(5), 2095–2119.
  <https://doi.org/10.1007/s11423-020-09748-7>
- Barbieri, C. A., Miller-Cotto, D., Clerjuste, S. N., & Chawla, K. (2023). A meta-analysis of the worked examples
  effect on mathematics performance. *Educational Psychology Review, 35*, 11.
  <https://doi.org/10.1007/s10648-023-09745-1>
- Brunmair, M., & Richter, T. (2019). Similarity matters: a meta-analysis of interleaved learning and its moderators.
  *Psychological Bulletin, 145*(11), 1029–1052. <https://doi.org/10.1037/bul0000209>
- Carpenter, S. K., Pan, S. C., & Butler, A. C. (2022). The science of effective learning with spacing and retrieval
  practice. *Nature Reviews Psychology*. <https://doi.org/10.1038/s44159-022-00089-1>
- Delgado, P., Vargas, C., Ackerman, R., & Salmerón, L. (2018). Don't throw away your printed books: a meta-analysis on
  the effects of reading media on reading comprehension. *Educational Research Review, 25*, 23–38.
  <https://doi.org/10.1016/j.edurev.2018.09.003>
- Dyson, M. C., & Haselgrove, M. (2001). The influence of reading speed and line length on the effectiveness of reading
  from screen. *International Journal of Human-Computer Studies, 54*(4), 585–612.
- Dyson, M. C., & Kipping, G. J. (1998). The effects of line length and method of movement on patterns of reading from
  screen. *Visible Language, 32*, 150–181.
- Ginns, P., Martin, A. J., & Marsh, H. W. (2013). Designing instructional text in a conversational style: a
  meta-analysis. *Educational Psychology Review, 25*(4), 445–472. <https://doi.org/10.1007/s10648-013-9228-0>
- Mawson, R. D., & Kang, S. H. K. (2025). The distributed practice effect on classroom learning: a meta-analytic review
  of applied research. *Behavioral Sciences, 15*(6), 771. <https://doi.org/10.3390/bs15060771>
- Noetel, M., et al. (2022). Multimedia design for learning: an overview of reviews with meta-meta-analysis. *Review of
  Educational Research*. <https://doi.org/10.3102/00346543211052329>
- Rello, L., Pielot, M., & Marcos, M.-C. (2016). Make it big! The effect of font size and line spacing on online
  readability. *Proceedings of CHI 2016*, 3637–3648. <https://doi.org/10.1145/2858036.2858204>
- Rey, G. D., et al. (2019). A meta-analysis of the segmenting effect. *Educational Psychology Review*.
  <https://doi.org/10.1007/s10648-018-9456-4>
- Sundararajan, N., & Adesope, O. (2020). Keep it coherent: a meta-analysis of the seductive details effect.
  *Educational Psychology Review, 32*(3), 707–734. <https://doi.org/10.1007/s10648-020-09522-4>
