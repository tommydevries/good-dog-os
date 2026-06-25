import { Link, Navigate } from 'react-router-dom'
import type { Command } from '../../types'
import { useAppStore } from '../../store/useAppStore'
import { getCommand } from '../../content'
import { ProgressRing } from '../../design'
import { computeStats } from './stats'
import { ProofingLadder } from './ProofingLadder'

export function ProgressView() {
  const plan = useAppStore((s) => s.plan)
  const progress = useAppStore((s) => s.progress)
  const toggleWeek = useAppStore((s) => s.toggleWeek)

  if (!plan) return <Navigate to="/start" replace />

  const stats = computeStats(plan, progress)
  const planCommands = plan.coreCommandIds
    .map((id) => getCommand(id))
    .filter((c): c is Command => Boolean(c))

  return (
    <main className="mx-auto max-w-2xl space-y-12 px-6 py-12">
      <header className="flex animate-rise items-center gap-5">
        <ProgressRing
          value={stats.completion}
          size={92}
          label={`${Math.round(stats.completion * 100)} percent of the plan`}
        />
        <div>
          <h1 className="font-display text-display font-semibold text-forest">
            {plan.dogName}’s progress
          </h1>
          <p className="mt-1.5 text-sm text-ink-soft">
            {stats.proofed} of {stats.totalCommands} commands proofed · {stats.weeksDone} of{' '}
            {stats.totalWeeks} weeks done
          </p>
          <Link
            to="/cards"
            className="mt-2 inline-block text-sm font-medium text-forest hover:underline"
          >
            Draw a training card
          </Link>
        </div>
      </header>

      <section>
        <h2 className="mb-1 font-display text-2xl font-semibold text-forest">Skills</h2>
        <p className="mb-4 max-w-measure text-sm text-ink-soft">
          Tap a level to mark where each command is. Cards you finish move these on their own.
          Commands stay locked until their prerequisite is started.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {planCommands.map((c) => (
            <ProofingLadder key={c.id} command={c} planIds={plan.coreCommandIds} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold text-forest">Program weeks</h2>
        <div className="space-y-2">
          {plan.weeks.map((w) => {
            const done = progress.completedWeeks.includes(w.week)
            return (
              <button
                key={w.week}
                type="button"
                onClick={() => toggleWeek(w.week)}
                aria-pressed={done}
                className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${
                  done ? 'border-forest bg-forest-tint' : 'border-line bg-paper hover:bg-cream'
                }`}
              >
                <span
                  className={`grid h-5 w-5 flex-none place-items-center rounded-md border text-xs ${
                    done
                      ? 'border-forest bg-forest text-paper'
                      : 'border-ink-faint text-transparent'
                  }`}
                  aria-hidden
                >
                  ✓
                </span>
                <span className="text-sm">
                  <span className="font-semibold">Week {w.week}.</span> {w.focus}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <div className="text-center">
        <Link to="/plan" className="text-sm font-medium text-forest hover:underline">
          Back to the plan
        </Link>
      </div>
    </main>
  )
}
