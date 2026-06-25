import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'

export function Home() {
  const plan = useAppStore((s) => s.plan)
  return (
    <main className="mx-auto flex min-h-[82vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="mb-4 inline-block rounded-full bg-sand px-3 py-1 text-xs font-medium text-forest-dark">
          Force-free · No account · Runs in your browser
        </p>
        <h1 className="font-serif text-5xl text-forest sm:text-6xl">Good Dog OS</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink/70">
          Answer a few questions about your dog and get a personalized, week-by-week training plan
          built from a real method.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/start"
            className="rounded-xl2 bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-dark"
          >
            Build my plan
          </Link>
          {plan && (
            <Link
              to="/plan"
              className="rounded-xl2 px-6 py-3 text-sm font-semibold text-forest transition-colors hover:bg-sand"
            >
              View my plan
            </Link>
          )}
        </div>
        <Link to="/cards" className="mt-4 inline-block text-sm text-ink/50 hover:text-forest">
          or just grab a training card
        </Link>
      </motion.div>
    </main>
  )
}
