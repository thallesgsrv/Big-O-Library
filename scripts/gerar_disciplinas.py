#!/usr/bin/env python3
"""Cria content/docs/NN-periodo/<slug>/index.md para cada disciplina de uma lista.

Uso:
    python3 scripts/gerar_disciplinas.py grade.txt          # cria
    python3 scripts/gerar_disciplinas.py grade.txt --dry    # só mostra o que faria

Formato do grade.txt (uma disciplina por linha, '#' comenta, '|' separa):
    periodo | slug | Título | prereqs separados por vírgula (slugs, opcional)
    1 | prog1 | Programação 1 |
    2 | prog2 | Programação 2 | prog1
    opt | algoritmos-avancados | Algoritmos Avançados | eda

Nunca sobrescreve: se a pasta já existir (index.md ou _index.md), pula.
O campo prereq alimenta o grafo de /lab/mapa.
"""
import re, sys, datetime
from pathlib import Path

DOCS = Path(__file__).resolve().parent.parent / "content" / "docs"

TEMPLATE = """---
title: {title}
weight: {weight}
description: {title}.
prereq: [{prereq}]
autores: []
date: {date}
---

Em breve: conteúdo desta disciplina.

## Contribuição

Se você tiver materiais úteis desta disciplina, pode colaborar com a biblioteca e ajudar a enriquecer esta seção.
"""

def pasta_periodo(p: str) -> Path:
    if p.lower() in ("opt", "optativa", "optativas"):
        return DOCS / "optativas"
    if not p.isdigit():
        sys.exit(f"período inválido: {p!r} (use 1..9 ou opt)")
    return DOCS / f"{int(p):02d}-periodo"

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry" in sys.argv
    if not args:
        sys.exit(__doc__)
    peso = {}
    criados = pulados = 0
    for n, raw in enumerate(Path(args[0]).read_text(encoding="utf-8").splitlines(), 1):
        linha = raw.strip()
        if not linha or linha.startswith("#"):
            continue
        campos = [c.strip() for c in linha.split("|")]
        if len(campos) < 3:
            sys.exit(f"linha {n}: esperado 'periodo | slug | Título | prereqs'")
        periodo, slug, titulo = campos[:3]
        prereq = [x.strip() for x in (campos[3] if len(campos) > 3 else "").split(",") if x.strip()]
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug):
            sys.exit(f"linha {n}: slug inválido {slug!r} (minúsculas, números e hífen)")
        base = pasta_periodo(periodo)
        pasta = base / slug
        if (pasta / "index.md").exists() or (pasta / "_index.md").exists():
            print(f"pula   {pasta.relative_to(DOCS)} (já existe)"); pulados += 1; continue
        peso[base] = peso.get(base, 0) + 1
        conteudo = TEMPLATE.format(title=titulo.replace(":", " -") if ": " in titulo else titulo,
                                   weight=peso[base], prereq=", ".join(prereq),
                                   date=datetime.date.today().isoformat())
        print(f"cria   {pasta.relative_to(DOCS)}/index.md")
        if not dry:
            pasta.mkdir(parents=True, exist_ok=True)
            (pasta / "index.md").write_text(conteudo, encoding="utf-8")
        criados += 1
    print(f"\n{criados} criada(s), {pulados} já existiam." + (" (dry-run)" if dry else ""))

if __name__ == "__main__":
    main()
