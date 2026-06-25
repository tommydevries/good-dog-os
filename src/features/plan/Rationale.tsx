import type { RationaleEntry } from '../../types'
import { Card } from '../../design'

export function Rationale({ entries }: { entries: RationaleEntry[] }) {
  if (entries.length === 0) return null
  return (
    <section>
      <h2 className="mb-3 font-display text-2xl font-semibold text-forest">Why this plan</h2>
      <Card>
        <ul className="space-y-3">
          {entries.map((e, i) => (
            <li key={i}>
              <p className="text-sm font-semibold text-forest-dark">{e.choice}</p>
              <p className="text-sm text-ink/70">{e.because}</p>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}
