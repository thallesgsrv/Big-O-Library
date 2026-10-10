#!/usr/bin/env python3
"""Baixa FlexSearch (busca) e KaTeX (CSS das fórmulas) para dentro do tema.

Assim o `hugo` compila sem internet e sem depender do jsdelivr. Só precisa
rodar de novo para atualizar versão. Usa apenas a biblioteca padrão do Python
e o registro do npm (tarballs oficiais dos pacotes).

Atenção ao KaTeX: o CSS tem que ser da mesma linha do KaTeX embutido no Hugo.
  Hugo < 0.166.0   ->  KaTeX 0.16.x   (é o caso do Hugo 0.165.0 do site)
  Hugo >= 0.166.0  ->  KaTeX 0.18.x
Ao subir a versão do Hugo, troque KATEX_VERSION aqui e rode o script.
"""
import io
import json
import pathlib
import re
import sys
import tarfile
import urllib.request

FLEXSEARCH_VERSION = "0.8.143"
KATEX_VERSION = "0.16.47"

root = pathlib.Path(__file__).resolve().parent.parent
theme = root / "themes" / "big-o-library"
js_dir = theme / "assets" / "js" / "vendor"
css_dir = theme / "assets" / "css" / "vendor"
fonts_dir = theme / "static" / "vendor" / "katex" / "fonts"


def tarball(pacote, versao):
    url = "https://registry.npmjs.org/{0}/-/{0}-{1}.tgz".format(pacote, versao)
    print("baixando", url)
    dados = urllib.request.urlopen(url, timeout=60).read()
    tar = tarfile.open(fileobj=io.BytesIO(dados), mode="r:gz")
    # os arquivos vêm sob o prefixo "package/"
    return {m.name[len("package/"):]: tar.extractfile(m).read()
            for m in tar.getmembers() if m.isfile()}


def flexsearch():
    arquivos = tarball("flexsearch", FLEXSEARCH_VERSION)
    js_dir.mkdir(parents=True, exist_ok=True)
    destino = js_dir / "flexsearch.bundle.min.js"
    destino.write_bytes(arquivos["dist/flexsearch.bundle.min.js"])
    print("  ->", destino.relative_to(root))


def katex():
    arquivos = tarball("katex", KATEX_VERSION)
    versao = json.loads(arquivos["package.json"])["version"]
    css = arquivos["dist/katex.min.css"].decode("utf-8")

    # Só woff2: todo navegador atual suporta, e woff/ttf eram ~2/3 do peso de fontes.
    css = re.sub(r',url\(fonts/[^)]+\.woff\) format\("woff"\)', "", css)
    css = re.sub(r',url\(fonts/[^)]+\.ttf\) format\("truetype"\)', "", css)
    if ".woff)" in css or ".ttf)" in css:
        sys.exit("O CSS do KaTeX mudou de formato; ajuste as expressões regulares.")
    # O Hugo publica o CSS em /css/; as fontes ficam em /vendor/katex/fonts/.
    css = css.replace("url(fonts/", "url(../vendor/katex/fonts/")

    css_dir.mkdir(parents=True, exist_ok=True)
    (css_dir / "katex.min.css").write_text(
        "/* KaTeX {} (MIT). GERADO por scripts/baixar_vendor.py — não edite à mão. */\n".format(versao) + css,
        encoding="utf-8")
    print("  ->", (css_dir / "katex.min.css").relative_to(root))

    fonts_dir.mkdir(parents=True, exist_ok=True)
    for antigo in fonts_dir.glob("*.woff2"):
        antigo.unlink()
    n = 0
    for nome, conteudo in arquivos.items():
        if nome.startswith("dist/fonts/") and nome.endswith(".woff2"):
            (fonts_dir / nome.split("/")[-1]).write_bytes(conteudo)
            n += 1
    print("  ->", n, "fontes em", fonts_dir.relative_to(root))


if __name__ == "__main__":
    flexsearch()
    katex()
    print("\nOK. Confira que hugo.yaml aponta para esses arquivos "
          "(params.search.flexsearch.js e params.math.katex.css).")
