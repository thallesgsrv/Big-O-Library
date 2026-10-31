#!/usr/bin/env python3
"""Valida o conteúdo e os dados do Big-O-Library antes do build.

Uso (na raiz do repositório):

    python3 scripts/validar.py
    python3 scripts/validar.py --strict

Dependência: PyYAML (`pip install pyyaml`; já vem instalado em quase todo Linux/macOS com Python).

O que confere (as regras estão em content/contribuir.md):
  - front matter de cada página em content/docs: title, weight, description, autores e date
  - weight inteiro e sem repetição entre páginas irmãs (mesmo nível da mesma pasta)
  - date válida e que não esteja no futuro (o Hugo não publica páginas com data futura)
  - descrição curta (aviso acima de 120 caracteres; o guia sugere ~90)
  - {{< viz algoritmo="..." >}} só com algoritmos que existem em assets/viz/viz.js
  - data/disciplinas.yaml: ids únicos, pré-requisitos que existem, sem ciclos, nó sem pasta com nome e período
  - data/conselho.yaml: foto existe em static/images/conselho/
  - baseadoEm aponta para alguém que está no Conselho
"""
from __future__ import annotations

import datetime as dt
import re
import sys
from collections import defaultdict
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("PyYAML não encontrado. Instale com: pip install pyyaml")

RAIZ = Path(__file__).resolve().parent.parent
DOCS = RAIZ / "content" / "docs"
TEMA = RAIZ / "themes" / "big-o-library"
DESC_MAX = 120
CHAVES_CONHECIDAS = {
    "title", "weight", "description", "autores", "date", "summary", "prereq", "baseadoEm", "rotulo",
    "layout", "hideEdit", "toc", "draft", "lastmod", "images", "canonical", "noindex", "excludeSearch",
    "aliases", "slug", "url", "keywords", "tags",
}

erros: list[str] = []
avisos: list[str] = []


def erro(onde: str, msg: str) -> None:
    erros.append(f"{onde}: {msg}")


def aviso(onde: str, msg: str) -> None:
    avisos.append(f"{onde}: {msg}")


def rel(p: Path) -> str:
    return str(p.relative_to(RAIZ))


def front_matter(arq: Path):
    """Devolve (dict, corpo). Em caso de erro registra e devolve (None, texto)."""
    texto = arq.read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", texto, re.S)
    if not m:
        erro(rel(arq), "sem front matter (o arquivo precisa começar com ---)")
        return None, texto
    try:
        fm = yaml.safe_load(m.group(1)) or {}
    except yaml.YAMLError as e:
        erro(rel(arq), f"front matter com YAML inválido: {str(e).splitlines()[0]}")
        return None, m.group(2)
    if not isinstance(fm, dict):
        erro(rel(arq), "front matter não é um mapa chave: valor")
        return None, m.group(2)
    return fm, m.group(2)


def to_date(v):
    if isinstance(v, dt.datetime):
        return v.date()
    if isinstance(v, dt.date):
        return v
    if isinstance(v, str):
        try:
            return dt.date.fromisoformat(v[:10])
        except ValueError:
            return None
    return None


def algoritmos_registrados() -> set[str]:
    js = (TEMA / "assets" / "viz" / "viz.js").read_text(encoding="utf-8")
    bloco = js[js.index("const ALGOS = {"):js.index("function mount")]
    return set(re.findall(r"^    ([a-z]+): \{", bloco, re.M))


def conselho() -> tuple[set[str], list[dict]]:
    dados = yaml.safe_load((RAIZ / "data" / "conselho.yaml").read_text(encoding="utf-8")) or {}
    profs = dados.get("professores") or []
    ids = set()
    for p in profs:
        for k in ("id", "github"):
            if p.get(k):
                ids.add(str(p[k]).lower())
        if p.get("nome"):
            ids.add(re.sub(r"[^a-z0-9]", "", str(p["nome"]).lower()))
    return ids, profs


def validar_paginas() -> None:
    hoje = dt.date.today()
    ids_conselho, _ = conselho()
    viz_ok = algoritmos_registrados()
    por_pasta: dict[Path, list[tuple[Path, int]]] = defaultdict(list)
    n = 0

    for arq in sorted(DOCS.rglob("*.md")):
        n += 1
        fm, corpo = front_matter(arq)
        if fm is None:
            continue
        onde = rel(arq)
        nivel_alto = arq.name == "_index.md" and len(arq.relative_to(DOCS).parts) <= 2
        obrigatorios = ["title", "weight"] if nivel_alto else ["title", "weight", "description", "autores", "date"]
        for k in obrigatorios:
            if fm.get(k) in (None, "", []):
                erro(onde, f"falta `{k}` no front matter")

        for k in fm:
            if k not in CHAVES_CONHECIDAS:
                aviso(onde, f"chave desconhecida no front matter: `{k}` (erro de digitação?)")

        w = fm.get("weight")
        if w is not None:
            if isinstance(w, bool) or not isinstance(w, int):
                erro(onde, f"`weight` precisa ser um número inteiro (achei {w!r})")
            else:
                por_pasta[arq.parent.parent].append((arq, w))

        d = fm.get("date")
        if d is not None:
            dd = to_date(d)
            if dd is None:
                erro(onde, f"`date` inválida: {d!r} (use AAAA-MM-DD)")
            elif dd > hoje:
                erro(onde, f"`date` no futuro ({dd}): o Hugo não publica a página")

        desc = fm.get("description")
        if isinstance(desc, str) and len(desc) > DESC_MAX:
            aviso(onde, f"`description` com {len(desc)} caracteres (sugerido: até ~{DESC_MAX})")

        aut = fm.get("autores")
        if aut is not None and not (isinstance(aut, list) and all(isinstance(a, str) and a.strip() for a in aut)):
            erro(onde, "`autores` precisa ser uma lista de usuários do GitHub")

        for b in fm.get("baseadoEm") or []:
            if str(b).lower() not in ids_conselho:
                erro(onde, f"`baseadoEm`: '{b}' não está em data/conselho.yaml (pelo id ou github)")

        for m in re.finditer(r"\{\{<\s*viz\s+algoritmo=\"([^\"]+)\"", corpo):
            if m.group(1) not in viz_ok:
                erro(onde, f"viz: algoritmo '{m.group(1)}' não existe em viz.js (existem: {', '.join(sorted(viz_ok))})")

    for pasta, itens in por_pasta.items():
        vistos: dict[int, Path] = {}
        for arq, w in itens:
            if w in vistos:
                erro(rel(arq), f"`weight: {w}` repetido (já usado em {rel(vistos[w])}): a ordem fica indefinida")
            else:
                vistos[w] = arq
    print(f"  {n} páginas em content/docs verificadas")


def validar_disciplinas() -> None:
    arq = RAIZ / "data" / "disciplinas.yaml"
    dados = yaml.safe_load(arq.read_text(encoding="utf-8")) or {}
    lista = dados.get("disciplinas") or []
    pastas = {p.name for p in DOCS.glob("*/*") if p.is_dir()} | {p.name for p in DOCS.glob("optativas/*") if p.is_dir()}
    ids: dict[str, dict] = {}
    for d in lista:
        i = d.get("id")
        if not i:
            erro("data/disciplinas.yaml", f"entrada sem `id`: {d}")
            continue
        if i in ids:
            erro("data/disciplinas.yaml", f"id repetido: {i}")
        ids[i] = d
        if i not in pastas:
            if not d.get("nome"):
                erro("data/disciplinas.yaml", f"'{i}' não tem pasta em content/docs, então precisa de `nome`")
            p = d.get("periodo")
            if p is None or not isinstance(p, int) or not 0 <= p <= 9:
                erro("data/disciplinas.yaml", f"'{i}' não tem pasta, então precisa de `periodo` de 0 a 9")
    for i, d in ids.items():
        for pr in d.get("prereq") or []:
            if pr not in ids:
                erro("data/disciplinas.yaml", f"'{i}' tem pré-requisito inexistente: '{pr}'")
    cor: dict[str, int] = {}

    def visita(u: str, trilha: list[str]) -> None:
        cor[u] = 1
        for v in ids[u].get("prereq") or []:
            if v not in ids:
                continue
            if cor.get(v) == 1:
                erro("data/disciplinas.yaml", "ciclo de pré-requisitos: " + " -> ".join(trilha + [u, v]))
            elif cor.get(v) is None:
                visita(v, trilha + [u])
        cor[u] = 2

    for i in ids:
        if cor.get(i) is None:
            visita(i, [])
    de_periodo = {p.name for p in DOCS.glob("[0-9][0-9]-periodo/*") if p.is_dir()}
    for p in sorted(de_periodo):
        if p not in ids:
            aviso("data/disciplinas.yaml", f"a pasta '{p}' não está no mapa de pré-requisitos")
    print(f"  {len(ids)} disciplinas no mapa verificadas")


def validar_conselho() -> None:
    _, profs = conselho()
    for p in profs:
        f = p.get("foto")
        if f and not (RAIZ / "static" / "images" / "conselho" / f).is_file():
            erro("data/conselho.yaml", f"foto '{f}' de {p.get('nome')} não existe em static/images/conselho/")
        elif f:
            kb = (RAIZ / "static" / "images" / "conselho" / f).stat().st_size / 1024
            if kb > 60:
                aviso("data/conselho.yaml", f"foto '{f}' tem {kb:.0f} KB (o ideal é ~240 px e menos de 30 KB)")
    print(f"  {len(profs)} sábios do Conselho verificados")


def main() -> int:
    strict = "--strict" in sys.argv
    print("Validando conteúdo e dados…")
    validar_paginas()
    validar_disciplinas()
    validar_conselho()
    for a in avisos:
        print(f"  aviso: {a}")
    for e in erros:
        print(f"  ERRO:  {e}")
    print(f"\n{len(erros)} erro(s), {len(avisos)} aviso(s)")
    return 1 if erros or (strict and avisos) else 0


if __name__ == "__main__":
    sys.exit(main())
