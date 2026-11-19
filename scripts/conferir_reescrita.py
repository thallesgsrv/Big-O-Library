#!/usr/bin/env python3
"""Trava de segurança para reescritas de texto em content/docs.

Compara cada arquivo .md alterado (em relação a um commit, por padrão HEAD) e garante que a reescrita mexeu só na
prosa. Estes elementos precisam ficar **idênticos**:

  - fórmulas em linha ($...$, \\(...\\)) e em bloco ($$...$$, \\[...\\])
  - blocos de código (``` ... ```) e código em linha (`...`)
  - shortcodes ({{< ... >}} e {{% ... %}}), incluindo o texto dentro de gabaritos e quizzes
  - links e imagens (destinos)
  - front matter (exceto `description`, que pode ser melhorada)

Elementos **novos** são permitidos e listados (por exemplo, um link de pré-requisito ou um callout). Remoção ou
alteração de qualquer item acima faz o script falhar.

Uso:

    python3 scripts/conferir_reescrita.py            # compara com HEAD
    python3 scripts/conferir_reescrita.py abc1234    # compara com outro commit
"""
from __future__ import annotations

import re
import subprocess
import sys
from collections import Counter
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent

PADROES = {
    "fórmula em bloco": re.compile(r"\$\$.*?\$\$|\\\[.*?\\\]", re.S),
    "bloco de código": re.compile(r"```.*?```", re.S),
    "shortcode": re.compile(r"\{\{[<%].*?[>%]\}\}", re.S),
}
LINHA = {
    "fórmula em linha": re.compile(r"(?<!\$)\$(?!\$)([^$\n]+?)(?<!\$)\$(?!\$)|\\\((.+?)\\\)"),
    "código em linha": re.compile(r"(?<!`)`([^`\n]+)`(?!`)"),
    "destino de link": re.compile(r"\]\(([^)\s]+)"),
}


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def extrai(texto: str) -> dict[str, Counter]:
    fm = re.match(r"^---\n(.*?)\n---\n", texto, re.S)
    front = fm.group(1) if fm else ""
    front = re.sub(r"^description:.*$", "", front, flags=re.M)
    corpo = texto[fm.end():] if fm else texto
    out: dict[str, Counter] = {"front matter": Counter([norm(front)])}
    resto = corpo
    for nome, rx in PADROES.items():
        achados = [norm(m.group(0)) for m in rx.finditer(resto)]
        out[nome] = Counter(achados)
        resto = rx.sub(" ", resto)
    for nome, rx in LINHA.items():
        achados = [norm("".join(g or "" for g in m.groups())) for m in rx.finditer(resto)]
        out[nome] = Counter(achados)
    return out


def antigo(ref: str, caminho: str) -> str | None:
    r = subprocess.run(["git", "show", f"{ref}:{caminho}"], cwd=RAIZ, capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


def main() -> int:
    ref = sys.argv[1] if len(sys.argv) > 1 else "HEAD"
    nomes = subprocess.run(["git", "diff", "--name-only", ref, "--", "content"], cwd=RAIZ,
                           capture_output=True, text=True).stdout.split()
    falhas = 0
    for nome in nomes:
        if not nome.endswith(".md"):
            continue
        antes = antigo(ref, nome)
        if antes is None:
            print(f"  novo   {nome}")
            continue
        depois = (RAIZ / nome).read_text(encoding="utf-8")
        a, d = extrai(antes), extrai(depois)
        problemas, novos = [], []
        for k in a:
            perdidos = a[k] - d[k]
            ganhos = d[k] - a[k]
            for item, n in perdidos.items():
                problemas.append(f"{k} removido/alterado (x{n}): {item[:90]}")
            for item, n in ganhos.items():
                if k == "front matter":
                    problemas.append("front matter alterado")
                else:
                    novos.append(f"{k}: {item[:70]}")
        if problemas:
            falhas += 1
            print(f"  FALHA  {nome}")
            for p in problemas[:8]:
                print(f"           - {p}")
            if len(problemas) > 8:
                print(f"           … e mais {len(problemas) - 8}")
        else:
            extra = f" (+{len(novos)} novo(s))" if novos else ""
            print(f"  ok     {nome}{extra}")
    print(f"\n{len(nomes)} arquivo(s) alterado(s), {falhas} com problema")
    return 1 if falhas else 0


if __name__ == "__main__":
    sys.exit(main())
