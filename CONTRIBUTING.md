# Como contribuir

Obrigado por querer ajudar! Cada disciplina da Big-O-Library é **um arquivo markdown** em `content/docs/`.

**Guia completo (estrutura, padrões, exemplos e modelo):**
👉 https://thallesgsrv.github.io/Big-O-Library/contribuir/ (fonte: [`content/contribuir.md`](content/contribuir.md))

## Resumo rápido

1. Crie `content/docs/NN-periodo/nome-da-disciplina/index.md` (pasta em minúsculas, sem acento).
2. Use o modelo: `hugo new --kind disciplina docs/NN-periodo/nome-da-disciplina/index.md`
3. Preencha `title`, `weight`, `description`, `autores` (seu usuário do GitHub) e `date`. O restante do markdown é livre: cada disciplina pode ter as seções que fizerem sentido (o modelo é só um ponto de partida).
4. Confira o resultado com `hugo server`.
5. Abra um Pull Request. Prefere não usar Git? Abra uma [issue](https://github.com/thallesgsrv/Big-O-Library/issues/new?template=novo-material.md).

Material de terceiros: linke a fonte original, não copie o conteúdo.
