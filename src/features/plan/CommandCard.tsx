import { getCommand, getDrillForCommand } from '../../content'
import { Card, Tag } from '../../design'

export function CommandCard({ commandId }: { commandId: string }) {
  const c = getCommand(commandId)
  if (!c) return null
  const drill = getDrillForCommand(commandId)
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{c.name}</h3>
        {c.core && <Tag tone="forest">core</Tag>}
      </div>
      <p className="text-sm text-ink/70">{c.meaning}</p>
      <p className="mt-2 text-xs text-ink/50">Signal: {c.signal}</p>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-ink/80">
        {c.teach.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ol>
      <p className="mt-2 text-xs text-clay">Watch out: {c.mistake}</p>
      {drill && (
        <p className="mt-2 text-xs text-ink/50">
          Goal: {drill.success}
        </p>
      )}
    </Card>
  )
}
