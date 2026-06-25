import type { ProgramPhase, ProgramWeek } from '../../types'
import { getCommand, getGame } from '../../content'
import { Card, Tag } from '../../design'

const phaseTone: Record<ProgramPhase, 'forest' | 'neutral' | 'clay'> = {
  foundation: 'forest',
  proofing: 'neutral',
  'real-world': 'neutral',
  polish: 'clay',
}
const phaseLabel: Record<ProgramPhase, string> = {
  foundation: 'Foundation',
  proofing: 'Proofing',
  'real-world': 'Real world',
  polish: 'Polish',
}

export function ProgramTimeline({ weeks }: { weeks: ProgramWeek[] }) {
  return (
    <section>
      <h2 className="mb-3 font-serif text-2xl text-forest">The {weeks.length}-week program</h2>
      <div className="space-y-3">
        {weeks.map((w) => (
          <Card key={w.week}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Week {w.week}</h3>
              <Tag tone={phaseTone[w.phase]}>{phaseLabel[w.phase]}</Tag>
            </div>
            <p className="mt-1 text-sm text-ink/80">{w.focus}</p>
            {w.commandIds.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {w.commandIds.map((c) => (
                  <Tag key={c}>{getCommand(c)?.name ?? c}</Tag>
                ))}
              </div>
            )}
            <p className="mt-2 text-sm">
              <span className="font-medium text-forest">Milestone:</span> {w.milestone}
            </p>
            {w.gameIds.length > 0 && (
              <p className="mt-1 text-xs text-ink/60">
                Games: {w.gameIds.map((g) => getGame(g)?.name ?? g).join(', ')}
              </p>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
