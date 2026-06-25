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
    <main className="mx-auto max-w-3xl space-y-10 px-6 py-12">
      <header>
        <p className="text-xs uppercase tracking-wide text-ink/50">
          {plan.totalWeeks}-week plan
        </p>
        <h1 className="font-serif text-4xl text-forest">{plan.dogName}’s training plan</h1>
        <p className="mt-2 text-ink/70">{plan.profileSummary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            to="/cards"
            className="rounded-xl2 bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-dark"
          >
            Draw a training card
          </Link>
          <Link
            to="/progress"
            className="rounded-xl2 bg-sand px-5 py-2.5 text-sm font-semibold text-forest-dark transition-colors hover:bg-forest-light"
          >
            Track progress
          </Link>
          <Button variant="secondary" onClick={regenerate}>
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
        <h2 className="mb-3 font-serif text-2xl text-forest">Your commands</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {plan.coreCommandIds.map((id) => (
            <CommandCard key={id} commandId={id} />
          ))}
        </div>
      </section>

      <GamesList gameIds={plan.recommendedGameIds} />
      <Rationale entries={rationale} />

      <footer className="border-t border-forest-light/60 pt-6 text-xs text-ink/50">
        Good Dog OS uses force-free methods and is not a substitute for a professional trainer or
        veterinarian. For aggression, fear, or anything that worries you, consult a certified
        trainer or a veterinary behaviorist.
      </footer>
    </main>
  )
}
