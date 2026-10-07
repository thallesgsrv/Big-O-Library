#!/usr/bin/env python3
import re, sys, pathlib, urllib.request

CSS_URL = ("https://fonts.googleapis.com/css2?"
           "family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500"
           "&family=IBM+Plex+Mono:wght@400;500;600&display=swap")
SUBSETS = {"latin", "latin-ext"}
PRELOAD = lambda fam, style, weight: (fam == "IBM Plex Mono" and weight == "400") or \
                                     (fam == "Fraunces" and style == "normal" and weight == "600")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

root = pathlib.Path(__file__).resolve().parent.parent
fonts_dir = root / "static" / "fonts"
partial = root / "layouts" / "_partials" / "fontes.html"

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=30).read()

def main():
    css = get(CSS_URL).decode("utf-8")
    blocks = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*@font-face\s*\{(.*?)\}", css, re.S)
    if not blocks:
        sys.exit("Não consegui interpretar o CSS do Google Fonts (formato mudou?).")
    fonts_dir.mkdir(parents=True, exist_ok=True)
    cache, faces, preloads = {}, [], []
    for subset, body in blocks:
        if subset not in SUBSETS:
            continue
        decl = dict((k.strip(), v.strip()) for k, v in re.findall(r"([\w-]+)\s*:\s*([^;]+);", body))
        fam = decl["font-family"].strip("'\"")
        style, weight = decl.get("font-style", "normal"), decl.get("font-weight", "400")
        url = re.search(r"url\((https?://[^)]+)\)", decl["src"]).group(1)
        if url not in cache:
            name = "{}-{}-{}-{}.woff2".format(fam.lower().replace(" ", "-"), style, weight.replace(" ", "_"), subset)
            (fonts_dir / name).write_bytes(get(url))
            cache[url] = name
            print("baixado", name)
        name = cache[url]
        extra = "".join("{}:{};".format(k, v) for k, v in decl.items()
                        if k not in ("font-family", "font-style", "font-weight", "src", "unicode-range", "font-display"))
        faces.append("@font-face{{font-family:'{f}';font-style:{s};font-weight:{w};font-display:swap;{x}"
                     "src:url({{{{ \"fonts/{n}\" | relURL | safeURL }}}}) format('woff2');unicode-range:{u}}}"
                     .format(f=fam, s=style, w=weight, x=extra, n=name, u=decl.get("unicode-range", "U+0-10FFFF")))
        if subset == "latin" and PRELOAD(fam, style, weight):
            preloads.append('<link rel="preload" as="font" type="font/woff2" href="{{{{ "fonts/{}" | relURL }}}}" crossorigin>'.format(name))
    partial.parent.mkdir(parents=True, exist_ok=True)
    partial.write_text("{{- /* GERADO por scripts/baixar_fontes.py — não edite à mão. */ -}}\n"
                       + "\n".join(preloads) + "\n<style>\n" + "\n".join(faces) + "\n</style>\n", encoding="utf-8")
    print("\nOK:", partial.relative_to(root), "+", len(cache), "arquivos em static/fonts/")
    print("Agora ative em hugo.yaml:  params.fontesLocais: true")

if __name__ == "__main__":
    main()

