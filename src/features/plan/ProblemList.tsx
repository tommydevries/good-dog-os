import { getCommand, getProblem } from '../../content'
import { Card, Tag } from '../../design'

export function ProblemList({ problemIds }: { problemIds: string[] }) {
  if (problemIds.length === 0) return null
  return (
    <section>
      <h2 className="mb-3 font-serif text-2xl text-forest">What we’ll fix, in order</h2>
      <div className="space-y-4">
        {problemIds.map((pid, i) => {
          const p = getProblem(pid)
          if (!p) return null
          return (
            <Card key={pid}>
              <div className="mb-1 flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-forest text-xs font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="font-semibold">{p.name}</h3>
              </div>
              <p className="text-sm text-ink/70">{p.why}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink/50">
                Manage it
              </p>
              <ul className="mt-1 space-y-1 text-sm text-ink/80">
                {p.manage.map((m, j) => (
                  <li key={j} className="flex gap-2">
                    <span aria-hidden>•</span>
                    {m}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink/50">
                Train
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {p.trains.map((c) => (
                  <Tag key={c} tone="forest">
                    {getCommand(c)?.name ?? c}
                  </Tag>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
