import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { Button } from '../../design'
import { SafetyNotes } from './SafetyNotes'
import { ProblemList } from './ProblemList'
import { ProgramTimeline } from './ProgramTimeline'
import { CommandCard } from './CommandCard'
import { GamesList } from './GamesList'
import { Rationale } from './Rationale'

export function PlanView() {
  const navigate = useNavigate()
  const plan = useAppStore((s) => s.plan)
  const profile = useAppStore((s) => s.profile)
  const rationale = useAppStore((s) => s.rationale)
  const generate = useAppStore((s) => s.generate)
  const reset = useAppStore((s) => s.reset)

  if (!plan || !profile) return <Navigate to="/start" replace />

  const regenerate = () => generate(profile)
  const startOver = () => {
    reset()
    navigate('/start')
  }

  return (
    <main className="mx-auto max-w-3xl space-y-12 px-6 py-12">
      <header className="animate-rise">
        <p className="text-2xs font-medium uppercase tracking-wide text-ink-faint">
          {plan.totalWeeks}-week plan
        </p>
        <h1 className="mt-1 font-display text-display font-semibold text-forest">
          {plan.dogName}’s training plan
        </h1>
        <p className="mt-3 max-w-measure text-ink-soft">{plan.profileSummary}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to="/cards"
            className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-paper shadow-sm transition-all duration-150 hover:bg-forest-dark active:scale-[0.985]"
          >
            Draw a training card
          </Link>
          <Link
            to="/progress"
            className="rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-forest-dark ring-1 ring-line transition-colors hover:bg-cream"
          >
            Track progress
          </Link>
          <Button variant="ghost" onClick={regenerate}>
            Regenerate
          </Button>
          <Button variant="ghost" onClick={startOver}>
            Start over
          </Button>
        </div>
      </header>

      <SafetyNotes notes={plan.safetyNotes} />
      <ProblemList problemIds={plan.prioritizedProblemIds} />
      <ProgramTimeline weeks={plan.weeks} />

      <section>
        <h2 className="mb-4 font-display text-2xl font-semibold text-forest">Your commands</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {plan.coreCommandIds.map((id) => (
            <CommandCard key={id} commandId={id} />
          ))}
        </div>
      </section>

      <GamesList gameIds={plan.recommendedGameIds} />
      <Rationale entries={rationale} />
    </main>
  )
}
