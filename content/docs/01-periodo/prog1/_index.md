---
title: Programação 1
weight: 1
description: Lógica de programação e primeiros programas.
rotulo: Conteúdos
autores:
  - thallesgsrv
baseadoEm:
  - daltonserey
date: 2026-10-06
---


## Sobre

Programação 1 (P1) e Laboratório de Programação 1 (LP1) costumam parecer fáceis no começo, e esse é o perigo: quem relaxa nas primeiras unidades chega despreparado onde a matéria realmente muda de nível. Esta página é um roteiro para estudar a disciplina com foco em **entender**, não em decorar. Os exemplos usam Python.

Os **exercícios** de cada unidade são disponibilizados pelos professores na VM da disciplina. Esta página traz a explicação e os exemplos para você chegar preparado a eles.

## Antes de começar

**Chegue rápido na Unidade 06.** Ela costuma ser a mais difícil, porque muda a forma como você escreve código: em vez de um script que roda de cima para baixo, você passa a dividir o problema em **funções**. Quem passa dessa unidade vê a disciplina voltar a ficar fácil. Por isso, não deixe as unidades anteriores se arrastarem.

**Como estudar:**

- Digite o código dos exemplos em vez de copiar e colar. Os erros que você comete digitando são os que mais ensinam.
- Se algo não fizer sentido, releia, e releia de novo. Nada escrito por outra pessoa é impossível de entender.
- Depois de entender um exemplo, mude-o: troque valores, quebre de propósito, veja a mensagem de erro. Erro de programação não é fracasso, é informação.
- Faça os exercícios da VM antes de olhar qualquer solução.
- Quando travar, simule o código **no papel**, linha por linha, anotando o valor de cada variável. É a habilidade mais valiosa da disciplina.

### Atenção às restrições dos exercícios

Em algumas unidades, os professores **proíbem funções e recursos prontos do Python** (como fatiamento, `split`, `sum`, `max`, `sorted` e outros), porque o objetivo é você aprender a construir a solução. Os exemplos desta página evitam a maioria desses recursos de propósito (usamos só o básico, como `len` e `range`; quando aparece algo como `in`, avisamos). Antes de entregar qualquer exercício, **leia o enunciado e veja o que é permitido naquela unidade**.

## Como resolver problemas: o método de Pólya

Programar é, antes de tudo, resolver problemas. O livro *How to Solve It*, de George Pólya (há exemplares na biblioteca), é uma recomendação do professor Dalton Serey, e as etapas abaixo vêm dele:

1. **Compreensão: o que é o problema?** Quais são as entradas? O que precisa sair? Dá para explicar com suas palavras?
2. **Planejamento: como resolver?** Já resolvi algo parecido? Dá para quebrar em partes menores? Teste a ideia com papel e exemplos antes de digitar.
3. **Execução:** escreva o código seguindo o plano, uma parte por vez, testando cada parte.
4. **Validação e verificação:** o resultado está certo para vários casos, inclusive os esquisitos (zero, negativo, vazio)? Normalmente você volta e revisa todas as etapas anteriores.

### Exemplo: média de três notas

1. **Compreender:** entram três números, sai um número, a média.
2. **Planejar:** somar as três notas e dividir por 3.
3. **Executar:**

```python
n1 = float(input("Nota 1: "))
n2 = float(input("Nota 2: "))
n3 = float(input("Nota 3: "))

media = (n1 + n2 + n3) / 3
print(f"Média: {media:.2f}")
```

4. **Validar:** com 7, 8 e 9 deve sair 8.00. Com 0, 0 e 0, deve sair 0.00.

### O princípio KISS

**KISS** significa *keep it simple, stupid* (mantenha simples). Uma máxima parecida: *faça a coisa mais simples que possa funcionar*. Código simples é mais fácil de entender, de testar e de consertar. Comece pelo jeito mais direto de resolver. Só complique se for necessário.

## Material de referência

Boa parte dos exemplos e da ordem dos temas segue o curso de Programação I do prof. [Dalton Serey](https://daltonserey.github.io/curso-p1/) (UFCG), que tem textos e slides para cada unidade, incluindo uma unidade 0 sobre terminal e Bash. O crédito é dele, e todo o material de terceiros mantém sua licença e seus direitos autorais.
