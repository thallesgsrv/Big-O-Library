# Copilot instructions for Big-O-Library

- This repo is a Hugo static site, not an application backend. Most changes are content authoring, navigation structure, and theme-level styling for a university materials library.
- Primary site config is `hugo.yaml`; it wires the `hextra` theme, default language (`pt-BR`), search, menu entries, and GitHub Pages deployment settings.
- Content lives under `content/` and drives navigation through the folder structure plus front matter. Section landing pages use `_index.md`; individual pages often use `index.md` inside a discipline folder.
- Examples of the expected structure: `content/docs/_index.md`, `content/docs/01-periodo/_index.md`, and `content/docs/01-periodo/prog1/index.md`. Preserve the period > discipline > material hierarchy.
- Use `title` and `weight` in front matter to control page titles and ordering; the site is organized around academic periods and disciplines rather than arbitrary article collections.
- The homepage is customized in `content/index.md` with `layout: hextra-home`; keep the landing-page branding and callouts consistent with the project’s academic identity.
- Global visual tweaks belong in `assets/css/custom.css`; keep overrides minimal and theme-aware instead of rewriting the theme.
- Generated output is in `public/`; do not edit it directly. Treat it as build output, not source.
- Local development command: `hugo server -D --disableFastRender --port 1313` from the repo root. This renders the site for preview and hot reloads content changes.
- Production build: `hugo --gc --minify` (used by `.github/workflows/hugo.yml` for GitHub Pages publishing).
- If you need to modify theme behavior, inspect `themes/hextra/AGENTS.md` before making assumptions; the project is built on the Hextra theme and its conventions matter.
- Prefer Markdown content changes in `content/` over editing theme internals unless the task is explicitly about design or layout.
- For new sections, follow the naming pattern `content/docs/<periodo>/<disciplina>/index.md` and add a matching `_index.md` when creating a landing page.
- Preserve the project’s academic tone: educational, clear, and collaborative. Material sections should read like a course library, not a product blog.
- Math rendering is enabled via `markup.goldmark.extensions.passthrough`; if you add equations or notation-heavy content, keep that in mind.
- Do not add backend code, application state, or unrelated JS frameworks. This project’s architecture is intentionally lightweight and static.
- Before finalizing content changes, verify the build locally with Hugo and confirm the navigation still matches the intended academic ordering.
