#!/usr/bin/env python3
"""Importa o PPC (disciplinas.json) para data/disciplinas.yaml, o arquivo que alimenta o mapa de pré-requisitos.

Fonte: https://github.com/daltonserey/ppc-2023-em-dados (dados/disciplinas.json)

    python3 scripts/importar_ppc.py                      # só mostra o relatório (não escreve nada)
    python3 scripts/importar_ppc.py --escrever           # reescreve data/disciplinas.yaml
    python3 scripts/importar_ppc.py --json caminho.json  # usa um arquivo local em vez de baixar

O que o script resolve, porque o JSON não vem pronto para virar grafo:
  - os pré-requisitos chegam quebrados pelo parser de PDF ("Cálculo Diferencial e Integral I" vira duas
    entradas); aqui o texto é recomposto e casado, pela maior sequência de palavras, com os nomes oficiais;
  - "CO-REQUISITO:" vira `coreq` (cursar junto), que não desenha seta no grafo;
  - o JSON não tem período: os das obrigatórias ficam na tabela OBRIGATORIAS abaixo (são as 36 primeiras
    do PPC) e todas as outras entram como optativas (periodo: 0);
  - Algoritmos Avançados I a IV viram um só nó, o da página content/docs/optativas/algoritmos-avancados;
  - entradas repetidas no JSON são ignoradas.

O que já estava escrito à mão no YAML (nome, descricao, período de quem não tem pasta) é preservado.
Depois de rodar, `python3 scripts/validar.py` confere ids, pré-requisitos e ciclos.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
import urllib.request
from pathlib import Path

import yaml

RAIZ = Path(__file__).resolve().parent.parent
ARQ = RAIZ / "data" / "disciplinas.yaml"
URL = "https://raw.githubusercontent.com/daltonserey/ppc-2023-em-dados/refs/heads/master/dados/disciplinas.json"

# nome no PPC -> (id do site, período). O id é o nome da pasta em content/docs/ quando ela existe.
OBRIGATORIAS = [
    ("Fundamentos de Matemática para Ciência da Computação I", "fmcc1", 1),
    ("Introdução à Computação", "introducao-a-computacao", 1),
    ("Laboratório de Programação I", "lab-p1", 1),
    ("Programação I", "prog1", 1),
    ("Direito e Cidadania", "direito", 1),
    ("Fundamentos de Matemática para Ciência da Computação II", "fmcc2", 2),
    ("Cálculo Diferencial e Integral I", "calculo1", 2),
    ("Laboratório de Programação II", "lab-prog2", 2),
    ("Programação II", "prog2", 2),
    ("Economia", "economia", 2),
    ("Lógica para Computação", "logica", 3),
    ("Cálculo Diferencial e Integral II", "calculo2", 3),
    ("Laboratório de Estruturas de Dados e Algoritmos", "leda", 3),
    ("Estruturas de Dados e Algoritmos", "eda", 3),
    ("Álgebra Linear I", "algebra-linear", 3),
    ("Teoria da Computação", "teoria-da-computacao", 4),
    ("Introdução à Probabilidade", "introducao-a-probabilidade", 4),
    ("Organização e Arquitetura de Computadores", "oac", 4),
    ("Banco de Dados I", "banco-de-dados-1", 4),
    ("Teoria dos Grafos", "teoria-dos-grafos", 4),
    ("Paradigmas de Linguagens de Programação", "plp", 4),
    ("Inteligência Artificial", "inteligencia-artificial", 5),
    ("Estatística Aplicada", "estatistica-aplicada", 5),
    ("Sistemas Operacionais", "sistemas-operacionais", 5),
    ("Projeto de Software", "projeto-de-software", 5),
    ("Engenharia de Software", "engenharia-de-software", 5),
    ("Redes de Computadores", "redes-de-computadores", 5),
    ("Programação Concorrente", "programacao-concorrente", 6),
    ("Análise de Sistemas", "analise-de-sistemas", 6),
    ("Análise e Técnicas de Algoritmos", "ata", 6),
    ("Compiladores", "compiladores", 7),
    ("Metodologia Científica", "metodologia-cientifica", 7),
    ("Língua Portuguesa", "lingua-portuguesa", 8),
    ("Projeto em Computação I", "projeto-em-computacao-1", 8),
    ("Trabalho de Conclusão de Curso", "tcc", 9),
    ("Projeto em Computação II", "projeto-em-computacao-2", 9),
]
# várias disciplinas do PPC que o site cobre com uma página só
AGRUPADAS = {f"Algoritmos Avançados {n}": "algoritmos-avancados" for n in ("I", "II", "III", "IV")}
# nomes abreviados que aparecem nos pré-requisitos (o PDF corta o fim do nome)
APELIDOS = {"Laboratório de Estruturas de Dados": "leda"}
# ids das optativas quando o nome gera um id longo demais
IDS_OPTATIVAS = {
    "Administração de Sistemas Gerenciadores de Bancos de Dados": "administracao-de-sgbd",
    "Desenvolvimento de Software Integrado à Operação da Infraestrutura": "software-integrado-a-infraestrutura",
    "Desenvolvimento de Software com Agentes e IA Generativa": "software-com-agentes-e-ia",
    "Libras - Língua Brasileira de Sinais": "libras",
    "Avaliação de Desempenho de Sistemas Discretos": "avaliacao-de-desempenho",
    "Reconhecimento de Padrões e Redes Neurais": "padroes-e-redes-neurais",
    "Recuperação da Informação e Busca na Web": "recuperacao-da-informacao",
}

PARADA = {"a", "as", "o", "os", "de", "da", "do", "das", "dos", "e", "para", "em", "com", "na", "no"}
ROMANOS = {"i": "1", "ii": "2", "iii": "3", "iv": "4"}
IGNORAR = {"creditos"}  # lixo do PDF ("créditos Programação para Web I")


def sem_acento(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFKD", s) if not unicodedata.combining(c))


def tokens(s: str) -> list[str]:
    s = sem_acento(s).lower().replace("co-requisito:", " @co ")
    return [ROMANOS.get(t, t) for t in re.findall(r"@co|[a-z0-9]+", s) if t not in PARADA]


def slug(nome: str) -> str:
    if nome in IDS_OPTATIVAS:
        return IDS_OPTATIVAS[nome]
    pal = [ROMANOS.get(t, t) for t in re.findall(r"[a-z0-9]+", sem_acento(nome).lower())]
    return "-".join(pal)


def carregar_json(origem: str | None) -> list[dict]:
    if origem and not origem.startswith("http"):
        return json.loads(Path(origem).read_text(encoding="utf-8"))
    with urllib.request.urlopen(origem or URL, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--json", help="arquivo ou URL do disciplinas.json (padrão: o repositório do PPC)")
    ap.add_argument("--escrever", action="store_true", help="reescreve data/disciplinas.yaml")
    args = ap.parse_args()

    bruto = carregar_json(args.json)
    avisos: list[str] = []

    # 1) deduplica por nome
    ppc: dict[str, dict] = {}
    for d in bruto:
        if d["nome"] in ppc:
            avisos.append(f"repetida no JSON e ignorada: {d['nome']}")
            continue
        ppc[d["nome"]] = d

    # 2) nome oficial -> id (e período)
    atual = {d["id"]: d for d in (yaml.safe_load(ARQ.read_text(encoding="utf-8")) or {}).get("disciplinas", [])}
    periodo_de = {i: p for _, i, p in OBRIGATORIAS}
    id_de: dict[str, str] = {n: i for n, i, _ in OBRIGATORIAS}
    id_de.update(AGRUPADAS)
    id_de.update(APELIDOS)
    for nome in ppc:
        if nome not in id_de:
            id_de[nome] = slug(nome)
    id_de_nos = {n: i for n, i in id_de.items() if n not in APELIDOS}
    faltando = [n for n, _, _ in OBRIGATORIAS if n not in ppc]
    if faltando:
        avisos.append("obrigatórias que não estão no JSON: " + ", ".join(faltando))
    ids = list(id_de_nos.values())
    repetidos = {i for i in ids if ids.count(i) > 1 and i != "algoritmos-avancados"}
    if repetidos:
        print("ERRO: ids repetidos ao gerar optativas:", ", ".join(sorted(repetidos)), file=sys.stderr)
        return 1

    # 3) recompõe os pré-requisitos casando a maior sequência de palavras com um nome oficial
    por_tokens = {tuple(tokens(n)): i for n, i in id_de.items()}
    maior = max(len(k) for k in por_tokens)

    def resolver(nome: str, lista: list[str]) -> tuple[list[str], list[str]]:
        t = tokens(" ".join(lista))
        pre, co, i, em_co = [], [], 0, False
        while i < len(t):
            if t[i] == "@co":
                em_co, i = True, i + 1
                continue
            for n in range(min(maior, len(t) - i), 0, -1):
                achou = por_tokens.get(tuple(t[i:i + n]))
                if achou:
                    alvo = co if em_co else pre
                    if achou not in alvo and achou != id_de[nome]:
                        alvo.append(achou)
                    i += n
                    break
            else:
                if t[i] not in IGNORAR:
                    avisos.append(f"{nome}: palavra solta no pré-requisito: {t[i]!r}")
                i += 1
        return pre, co

    # 4) monta as entradas
    entradas: dict[str, dict] = {}
    for nome, d in ppc.items():
        i = id_de[nome]
        pre, co = resolver(nome, d["prerequisitos"])
        e = entradas.setdefault(i, {"id": i, "nomes": [], "prereq": [], "coreq": [], "ppc": d})
        e["nomes"].append(nome)
        for p in pre:
            if p not in e["prereq"]:
                e["prereq"].append(p)
        for c in co:
            if c not in e["coreq"]:
                e["coreq"].append(c)

    pastas = {p.name for p in (RAIZ / "content" / "docs").glob("*/*") if p.is_dir()}
    for i, e in entradas.items():
        e["periodo"] = periodo_de.get(i, 0)
        e["pasta"] = i in pastas
        e["antigo"] = atual.get(i, {})

    # 5) validações do grafo
    for i, e in entradas.items():
        for p in e["prereq"] + e["coreq"]:
            if p not in entradas:
                avisos.append(f"{i}: aponta para {p}, que não existe")
        for p in e["prereq"]:
            if p in entradas and e["periodo"] and entradas[p]["periodo"] >= e["periodo"]:
                avisos.append(f"{i} (período {e['periodo']}) depende de {p} (período {entradas[p]['periodo']})")
    estado: dict[str, int] = {}

    def visita(u: str, trilha: list[str]) -> None:
        if estado.get(u) == 2:
            return
        if estado.get(u) == 1:
            avisos.append("ciclo: " + " -> ".join(trilha + [u]))
            return
        estado[u] = 1
        for v in entradas[u]["prereq"]:
            if v in entradas:
                visita(v, trilha + [u])
        estado[u] = 2

    for i in entradas:
        visita(i, [])

    # 6) relatório: o que muda nas obrigatórias em relação ao YAML atual
    print(f"{len(ppc)} disciplinas no JSON -> {len(entradas)} nós "
          f"({sum(1 for e in entradas.values() if e['periodo'])} obrigatórias, "
          f"{sum(1 for e in entradas.values() if not e['periodo'])} optativas)\n")
    mudou = 0
    for i, e in entradas.items():
        if not e["antigo"]:
            continue
        antes, depois = sorted(e["antigo"].get("prereq") or []), sorted(e["prereq"])
        if antes != depois:
            mudou += 1
            print(f"  {i:28} prereq: {antes or '[]'} -> {depois or '[]'}")
    print(f"\n{mudou} disciplinas já existentes mudam de pré-requisito.")
    com_co = [(i, e["coreq"]) for i, e in entradas.items() if e["coreq"]]
    print("co-requisitos:", "; ".join(f"{i} + {', '.join(c)}" for i, c in com_co))
    if avisos:
        print("\nAvisos:")
        for a in avisos:
            print("  -", a)

    if not args.escrever:
        print("\n(nada foi escrito; use --escrever para atualizar data/disciplinas.yaml)")
        return 1 if any(a.startswith(("ciclo", "ERRO")) for a in avisos) else 0

    ARQ.write_text(gerar(entradas, atual), encoding="utf-8")
    print(f"\nEscrito: {ARQ.relative_to(RAIZ)}")
    return 0


CABECALHO = """\
# ─────────────────────────────────────────────────────────────────────────────
#  MAPA DE PRÉ-REQUISITOS  (/lab/mapa)
#  Cada bloco abaixo é uma disciplina do curso (um nó do grafo). Não precisa
#  existir pasta/página para ela: sem página, o nó aparece normal no grafo,
#  só que sem link para material (é uma disciplina só para o mapa).
#
#  Os dados vêm do PPC e são gerados por `python3 scripts/importar_ppc.py --escrever`
#  (fonte: github.com/daltonserey/ppc-2023-em-dados). Dá para editar à mão, mas uma
#  nova importação reescreve os pré-requisitos, créditos, carga horária e ementa.
#  Nome, descrição e período de quem não tem pasta são preservados.
#
#  id             Nome curto, sem espaços nem acentos. Se a disciplina tem página
#                 em content/docs/, use exatamente o nome da pasta dela (ex.: eda,
#                 calculo1): o nó passa a abrir o material e usa o título e a
#                 descrição da página. É também o nome usado em `prereq` das outras.
#  nome           Nome que aparece no nó. Obrigatório só quando NÃO existe pasta
#                 (com pasta, vale o título da página; se escrever aqui, este vence).
#  periodo        1 a 9. Optativa: 0 (ou apague a linha). Com pasta em
#                 docs/NN-periodo/ ou docs/optativas/, o período vem de lá e esta
#                 linha é opcional.
#  prereq         Lista de `id` das disciplinas que vêm antes (desenha a seta).
#                 Vazio ou apagado = sem pré-requisito.
#  coreq          Lista de `id` para cursar junto (co-requisito). Aparece no painel,
#                 sem seta.
#  creditos       Créditos (mostrado no painel).
#  carga_horaria  Horas (mostrado no painel).
#  descricao      (opcional) Frase mostrada no painel quando não há página.
#  ementa         (opcional) Ementa oficial; é mostrada quando não há página nem descrição.
#
#  Exemplo de disciplina SEM pasta:
#    - id: calculo-vetorial
#      nome: Cálculo Vetorial
#      periodo: 4
#      prereq: [calculo2, algebra-linear]
#
#  Um `prereq:` escrito no front matter de uma página ainda funciona, mas só
#  quando a disciplina não está listada aqui. Este arquivo tem prioridade.
#  O build avisa no terminal se algum `prereq` apontar para um id que não existe.
# ─────────────────────────────────────────────────────────────────────────────
disciplinas:
"""


def gerar(entradas: dict[str, dict], atual: dict[str, dict]) -> str:
    def lista(xs: list[str]) -> str:
        return "[" + ", ".join(xs) + "]"

    def texto(s: str) -> str:
        return s if re.fullmatch(r"[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 ,.()-]*", s) and ": " not in s else json.dumps(s, ensure_ascii=False)

    def bloco(e: dict) -> str:
        ant, d = e["antigo"], e["ppc"]
        out = [f"  - id: {e['id']}"]
        nome = ant.get("nome") or (None if e["pasta"] else e["nomes"][0])
        if nome:
            out.append(f"    nome: {texto(nome)}")
        if not e["pasta"]:
            out.append(f"    periodo: {e['periodo']}")
        out.append(f"    prereq: {lista(e['prereq'])}")
        if e["coreq"]:
            out.append(f"    coreq: {lista(e['coreq'])}")
        out.append(f"    creditos: {d['creditos']}")
        out.append(f"    carga_horaria: {d['carga_horaria']}")
        if ant.get("descricao"):
            out.append(f"    descricao: {texto(ant['descricao'])}")
        if not e["pasta"] and d.get("ementa"):
            ementa = re.sub(r"\s+", " ", d["ementa"]).strip()
            out.append("    ementa: " + json.dumps(ementa, ensure_ascii=False))
        return "\n".join(out)

    ordem_antiga = list(atual)
    partes = [CABECALHO]
    for p in range(1, 10):
        do_periodo = [e for e in entradas.values() if e["periodo"] == p]
        do_periodo.sort(key=lambda e: (ordem_antiga.index(e["id"]) if e["id"] in ordem_antiga else 99, e["id"]))
        partes.append(f"  # {p}º período\n" + "\n".join(bloco(e) for e in do_periodo) + "\n")
    opt = sorted((e for e in entradas.values() if not e["periodo"]), key=lambda e: sem_acento(e["nomes"][0]).lower())
    partes.append("  # Optativas (periodo: 0)\n" + "\n".join(bloco(e) for e in opt) + "\n")
    return "\n".join(partes)


if __name__ == "__main__":
    sys.exit(main())
