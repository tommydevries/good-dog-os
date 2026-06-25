// Render src/content/cards.json into a print-ready, cuttable card sheet (HTML).
// The same data drives the in-app deck, so the physical and digital decks never drift.
// Usage: node scripts/build-card-deck.mjs [outfile]
//   then open the HTML and print to PDF (or use the Chrome pipeline).
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const cards = JSON.parse(readFileSync(join(here, '../src/content/cards.json'), 'utf8'))
const out = process.argv[2] || join(here, '../training-cards.html')

const DIM = {
  learn: { label: 'Learn', color: '#33502f' },
  duration: { label: 'Duration', color: '#c2603f' },
  distance: { label: 'Distance', color: '#3b6ea5' },
  distraction: { label: 'Distraction', color: '#a9821f' },
}
const titleCase = (id) =>
  id.split('-').map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(' ')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const dots = (lvl) => [1, 2, 3].map((n) => (n <= lvl ? '●' : '○')).join('')

const cardHtml = (c) => {
  const m = DIM[c.dimension] || DIM.learn
  return `<div class="card">
  <div class="band" style="background:${m.color}"><span>${m.label}</span><span class="dots">${dots(c.level)}</span></div>
  <div class="body">
    <div class="cmd">${esc(titleCase(c.command))}</div>
    <div class="title">${esc(c.title)}</div>
    <div class="how"><b>Do this:</b> ${esc(c.how)}</div>
    <div class="win"><b>Win:</b> ${esc(c.win)}</div>
  </div>
</div>`
}

const css = `
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; color: #1b1b1b; }
.sheet-head { text-align: center; padding: 6px 0 14px; }
.sheet-head h1 { font-family: Georgia, serif; color: #33502f; font-size: 20pt; margin: 0; }
.sheet-head p { color: #666; font-size: 9.5pt; margin: 4px 0 0; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.18in; }
.card {
  border: 1.5px dashed #b4b4b4; border-radius: 10px; overflow: hidden;
  height: 2.95in; display: flex; flex-direction: column; background: #fff;
  page-break-inside: avoid; break-inside: avoid;
}
.band { display: flex; justify-content: space-between; align-items: center;
  padding: 7px 11px; color: #fff; font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.band .dots { letter-spacing: 2px; font-size: 8pt; }
.body { padding: 11px 13px; font-size: 9pt; line-height: 1.35; }
.cmd { font-size: 7.5pt; color: #8a8a8a; text-transform: uppercase; letter-spacing: 0.06em; }
.title { font-family: Georgia, serif; font-size: 13.5pt; color: #33502f; margin: 2px 0 8px; }
.how { margin-bottom: 8px; }
.win { background: #eef1ec; color: #33502f; padding: 6px 8px; border-radius: 6px; }
b { font-weight: 700; }
`

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Good Dog Training Cards</title>
<style>${css}</style></head><body>
<div class="sheet-head"><h1>Good Dog Training Cards</h1><p>Cut along the dashed lines. Drop them in a jar and let everyone grab one a day.</p></div>
<div class="grid">
${cards.map(cardHtml).join('\n')}
</div>
<script>window.__ready = true</script>
</body></html>`

writeFileSync(out, html)
console.log(`wrote ${out} (${cards.length} cards)`)
