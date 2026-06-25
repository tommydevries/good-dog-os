import { Card } from '../../design'

export function SafetyNotes({ notes }: { notes: string[] }) {
  if (notes.length === 0) return null
  return (
    <Card className="border-clay/40 bg-clay/5">
      <h2 className="mb-2 font-serif text-lg text-clay">Safety first</h2>
      <ul className="space-y-2 text-sm text-ink/80">
        {notes.map((n, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden>•</span>
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
