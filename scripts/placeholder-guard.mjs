// Prompt 2 — near-white placeholder guard. Site-specific, deliberately NOT in the shared
// harness: it encodes a measurement decision about THIS site's captures.
//
// inventory.mjs paints every placeholder in the dominant colour sampled from the reference
// capture. That is the honest number and it stays in assets/INVENTORY.md. But a placeholder
// painted #fdfcfa sits under body text at ~1.05:1 against the page ground, and the
// render-truth gate (A-13) then reports the whole band UNMEASURABLE rather than failing it —
// the band's real contrast never gets scored at all. Two sibling sites shipped that hole.
//
// So: keep the honest hex in the table, repaint the FILE to a mountable mid-neutral, and
// flag it. #6f7276 clears 4.5:1 against both white and near-black, so whichever way the
// Prompt 5 palette lands, the band stays measurable.
//
//   node scripts/placeholder-guard.mjs [--json]
import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

const REPAINT_HEX = '#6f7276';
const NEAR_WHITE = 0.88; // sRGB-weighted luminance, 0..1

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

function svg(slotId, w, h, fill, refHex) {
  const fs = Math.max(11, Math.min(Math.round(Math.min(w, h) / 12), 28));
  const small = Math.max(10, Math.round(fs * 0.72));
  const flag = refHex
    ? `\n  <text x="50%" y="50%" dy="${fs * 2 + 12}" fill="#ffffff" fill-opacity="0.6" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="${small}" text-anchor="middle" dominant-baseline="middle">repainted from ${refHex}</text>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${slotId} placeholder">
  <rect width="${w}" height="${h}" fill="${fill}"/>
  <text x="50%" y="50%" fill="#ffffff" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="${fs}" font-weight="600" text-anchor="middle" dominant-baseline="middle">${slotId}</text>
  <text x="50%" y="50%" dy="${fs + 6}" fill="#ffffff" fill-opacity="0.75" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" font-size="${small}" text-anchor="middle" dominant-baseline="middle">${w}x${h}</text>${flag}
</svg>
`;
}

const root = process.cwd();
const inv = JSON.parse(await readFile(path.join(root, '.harness', 'inventory.json'), 'utf8'));
const flagged = [];

for (const g of inv.generated) {
  if (lum(g.hex) <= NEAR_WHITE) continue;
  const name = path.basename(g.file, '.svg');
  await writeFile(path.join(root, g.file), svg(name, g.w, g.h, REPAINT_HEX, g.hex), 'utf8');
  flagged.push({ slotId: g.slotId, file: g.file, refHex: g.hex, lum: Math.round(lum(g.hex) * 1000) / 1000 });
}

if (process.argv.includes('--json')) console.log(JSON.stringify(flagged, null, 2));
console.log(`near-white threshold ${NEAR_WHITE}; repainted ${flagged.length}/${inv.generated.length} placeholder files to ${REPAINT_HEX}`);
for (const f of flagged) console.log(`  ${f.slotId.padEnd(52)} ref ${f.refHex} (lum ${f.lum})`);
