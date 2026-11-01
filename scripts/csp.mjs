// Inyecta una Content-Security-Policy en cada HTML de la exportación estática (out/).
//
// GitHub Pages no permite cabeceras HTTP propias, así que la política va en una
// <meta http-equiv>. En vez de permitir cualquier script en línea ('unsafe-inline'),
// se calcula el hash SHA-256 de cada <script> en línea que genera Next.js y solo
// esos quedan autorizados. Se ejecuta tras `next build`, por eso no afecta a `next dev`.
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = "out";

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const path = join(dir, e.name);
      if (e.isDirectory()) return htmlFiles(path);
      return e.name.endsWith(".html") ? [path] : [];
    }),
  );
  return files.flat();
}

function policy(scriptHashes) {
  return [
    "default-src 'self'",
    `script-src 'self' ${scriptHashes.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "worker-src 'self'",
    "object-src 'none'",
    "frame-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

const files = await htmlFiles(OUT);
let total = 0;

for (const file of files) {
  let html = await readFile(file, "utf8");
  if (html.includes('http-equiv="Content-Security-Policy"')) continue;

  const hashes = new Set();
  for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\ssrc=/.test(attrs) || body.length === 0) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }

  const meta = `<meta http-equiv="Content-Security-Policy" content="${policy([...hashes])}"/>`;
  // Justo detrás de <meta charset>, antes de cualquier script.
  html = html.replace(/(<head[^>]*>(?:\s*<meta charSet="utf-8"\/>)?)/i, `$1${meta}`);
  await writeFile(file, html);
  total += hashes.size;
}

console.log(`CSP: ${files.length} páginas, ${total} scripts en línea autorizados por hash`);
