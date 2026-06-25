import { Link } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

export function Home() {
  const plan = useAppStore((s) => s.plan)
  return (
    <main className="mx-auto flex min-h-[78vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="animate-rise">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-1.5 text-2xs font-medium uppercase tracking-wide text-ink-soft shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" />
          Force-free · No account · Runs in your browser
        </p>
        <h1 className="text-balance font-display text-hero font-semibold text-forest">
          Train your dog like you mean it.
        </h1>
        <p className="mx-auto mt-6 max-w-measure text-balance text-lg leading-relaxed text-ink-soft">
          Answer a few questions and Good Dog OS builds a personalized, week-by-week plan, a deck of
          practice cards, and a progress tracker. From a real method, not vibes.
        </p>
        <div className="mt-9 flex items-center justify-center gap-3">
          <Link
            to="/start"
            className="rounded-full bg-forest px-7 py-3.5 text-sm font-medium text-paper shadow-sm transition-all duration-150 hover:bg-forest-dark active:scale-[0.985]"
          >
            Build my plan
          </Link>
          {plan && (
            <Link
              to="/plan"
              className="rounded-full px-6 py-3.5 text-sm font-medium text-forest transition-colors hover:bg-forest-tint"
            >
              View my plan
            </Link>
          )}
        </div>
        <Link
          to="/cards"
          className="mt-6 inline-block text-sm text-ink-faint underline-offset-4 hover:text-forest hover:underline"
        >
          or just grab a training card
        </Link>
      </div>
    </main>
  )
}
