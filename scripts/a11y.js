#!/usr/bin/env node
//
//
//
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain' };

function servir(dir) {
  dir = path.resolve(dir);
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      let f = path.join(dir, decodeURIComponent(req.url.split('?')[0]));
      if (!f.startsWith(dir)) { res.writeHead(403); return res.end(); }
      if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
      if (!fs.existsSync(f)) { res.writeHead(404, { 'content-type': TIPOS['.html'] }); return res.end(fs.existsSync(path.join(dir, '404.html')) ? fs.readFileSync(path.join(dir, '404.html')) : 'não encontrado'); }
      res.writeHead(200, { 'content-type': TIPOS[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(res);
    }).listen(0, '127.0.0.1', () => resolve(srv));
  });
}

function listarPaginas(dir) {
  const out = [];
  (function andar(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) andar(p);
      else if (e.name === 'index.html') out.push('/' + path.relative(dir, path.dirname(p)).split(path.sep).join('/') + (path.dirname(p) === dir ? '' : '/'));
      else if (e.name === '404.html') out.push('/404.html');
    }
  })(dir);
  return out.sort();
}

async function main({ executablePath, args = ['--no-sandbox', '--disable-setuid-sandbox'], dir = process.env.SITE_DIR || 'public',
  temas = (process.env.TEMAS || 'claro,escuro').split(','), shard = process.env.SHARD || '1/1',
  paginas = process.env.PAGINAS ? process.env.PAGINAS.split(',') : null, log = console.log } = {}) {
  const puppeteer = require('puppeteer-core');
  const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
  if (!fs.existsSync(path.join(dir, 'index.html'))) throw new Error(`"${dir}/index.html" não existe: compile o site antes (hugo --baseURL / -d ${dir})`);
  const [i, n] = shard.split('/').map(Number);
  let urls = paginas || listarPaginas(dir);
  urls = urls.filter((_, k) => k % n === i - 1);

  const srv = await servir(dir);
  const base = `http://127.0.0.1:${srv.address().port}`;
  const browser = await puppeteer.launch({ executablePath, args, headless: 'shell' });
  let violacoes = 0, auditadas = 0;
  try {
    for (const tema of temas) {
      for (const u of urls) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 900 });
        await page.evaluateOnNewDocument(t => { try { localStorage.setItem('color-theme', t); } catch (e) { /* sem storage */ } }, tema === 'escuro' ? 'dark' : 'light');
        const resp = await page.goto(base + u, { waitUntil: 'load' });
        if (!resp || resp.status() !== 200) throw new Error(`${u} respondeu ${resp ? resp.status() : 'sem resposta'}; confira SITE_DIR e se o site foi compilado com --baseURL /`);
        await page.evaluate(t => document.documentElement.classList.toggle('dark', t === 'escuro'), tema);
        await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true; }));
        await page.evaluate(axeSrc);
        const r = await page.evaluate(async () => {
          const res = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] } });
          const violations = res.violations.map(v => v.id !== 'empty-table-header' ? v : {
            ...v, nodes: v.nodes.filter(n => { const e = document.querySelector(n.target[0]); return !(e && e.querySelector('.katex-mathml')); }) })
            .filter(v => v.nodes.length);
          return { violations };
        });
        auditadas++;
        for (const v of r.violations) {
          violacoes += v.nodes.length;
          log(`✗ ${u} [${tema}] ${v.id} (${v.impact}) x${v.nodes.length}: ${v.help}`);
          for (const no of v.nodes.slice(0, 3)) log(`    ${no.target.join(' ')}  ${(no.any[0] && no.any[0].message || '').slice(0, 140)}`);
        }
        await page.close();
      }
    }
  } finally { await browser.close(); srv.close(); }
  log(`\n${auditadas} auditorias (${urls.length} páginas × ${temas.length} tema(s)), ${violacoes} violação(ões)`);
  return violacoes;
}

module.exports = { main, listarPaginas };

if (require.main === module) {
  const executablePath = process.env.CHROME_PATH;
  if (!executablePath) { console.error('Defina CHROME_PATH com o caminho do Chrome/Chromium.'); process.exit(2); }
  main({ executablePath }).then(v => process.exit(v ? 1 : 0)).catch(e => { console.error(e.message); process.exit(2); });
}
