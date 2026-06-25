// Render src/content/cards.json into a print-ready, cuttable card sheet (HTML).
// The same data drives the in-app deck, so the physical and digital decks never drift.
// Usage: node scripts/build-card-deck.mjs [outfile]
//   then open the HTML and print to PDF (or use the Chrome pipeline).
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const cards = JSON.parse(readFileSync(join(here, '../src/content/cards.json'), 'utf8'))
const DIM = JSON.parse(readFileSync(join(here, '../src/content/dimensions.json'), 'utf8'))
const DIM_ORDER = ['learn', 'duration', 'distance', 'distraction']
const out = process.argv[2] || join(here, '../training-cards.html')
const titleCase = (id) =>
  id.split('-').map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w)).join(' ')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const dots = (lvl) => [1, 2, 3].map((n) => (n <= lvl ? '●' : '○')).join('')

const cardHtml = (c) => {
  const m = DIM[c.dimension] || DIM.learn
  return `<div class="card">
  <div class="band" style="background:${m.color}"><span>${m.label}</span><span class="dots">${dots(c.level)}</span></div>
  <div class="body">
    <div class="intent">${esc(m.intent)}</div>
    <div class="cmd">${esc(titleCase(c.command))}</div>
    <div class="title">${esc(c.title)}</div>
    <div class="how"><b>Do this:</b> ${esc(c.how)}</div>
    <div class="win"><b>Win:</b> ${esc(c.win)}</div>
  </div>
</div>`
}

const legendCard = () => `<div class="card legend">
  <div class="band"><span>The deck key</span></div>
  <div class="body">
    <div class="legintro">Each card is one small training rep. The color and word tell you the style:</div>
    ${DIM_ORDER.map((k) => {
      const d = DIM[k]
      return `<div class="legrow"><span class="swatch" style="background:${d.color}"></span><span><b>${esc(d.label)}</b> &mdash; ${esc(d.intent)}</span></div>`
    }).join('\n    ')}
    <div class="legnote">Dots in the corner show how hard it is (1 to 3 filled). Grab a card, do what it says, and treat when he wins.</div>
  </div>
</div>`

// Landscape sheet, 4 cards across by 2 high (8 per page), sized to cut out.
const css = `
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; color: #1b1b1b; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.12in; }
.card {
  border: 1.5px dashed #b4b4b4; border-radius: 8px; overflow: hidden;
  height: 3.35in; display: flex; flex-direction: column; background: #fff;
  page-break-inside: avoid; break-inside: avoid;
}
.band { display: flex; justify-content: space-between; align-items: center;
  padding: 5px 8px; color: #fff; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; }
.band .dots { letter-spacing: 1.5px; font-size: 7pt; }
.body { padding: 8px 10px; font-size: 7.6pt; line-height: 1.32; }
.cmd { font-size: 6.5pt; color: #8a8a8a; text-transform: uppercase; letter-spacing: 0.06em; }
.title { font-family: Georgia, serif; font-size: 11.5pt; color: #33502f; margin: 1px 0 6px; line-height: 1.1; }
.intent { font-size: 7pt; color: #777; font-style: italic; margin-bottom: 5px; }
.how { margin-bottom: 6px; }
.win { background: #eef1ec; color: #33502f; padding: 4px 7px; border-radius: 5px; }
b { font-weight: 700; }
.legend .band { background: #2a2a2a; }
.legintro { font-size: 7.4pt; color: #444; margin-bottom: 7px; line-height: 1.3; }
.legrow { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; font-size: 7.7pt; }
.swatch { width: 12px; height: 12px; border-radius: 3px; flex: none; }
.legnote { margin-top: 8px; font-size: 6.8pt; color: #666; line-height: 1.35; }
`

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Good Dog Training Cards</title>
<style>${css}</style></head><body>
<div class="grid">
${[legendCard(), ...cards.map(cardHtml)].join('\n')}
</div>
<script>window.__ready = true</script>
</body></html>`

writeFileSync(out, html)
console.log(`wrote ${out} (${cards.length} cards)`)
