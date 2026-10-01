---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
weight: 1
description: Uma frase curta (até ~90 caracteres) sobre a disciplina.
autores:
  - seu-usuario-github
date: {{ now.Format "2006-01-02" }}
---

<!-- Modelo sugerido: remova, renomeie ou acrescente seções conforme a disciplina. Só o cabeçalho acima é obrigatório. -->

Um parágrafo de abertura: o que a disciplina estuda e para que serve.

## Objetivos

- objetivo 1
- objetivo 2

## Conteúdo previsto

- tópico 1
- tópico 2

## Materiais

### Livros e apostilas

- [Título do livro](https://exemplo.com) — Autor (ano)

### Listas de exercícios

- [Lista 1 — tema](https://exemplo.com) — fonte

## Contribuição

Se você tiver materiais úteis desta disciplina, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.
