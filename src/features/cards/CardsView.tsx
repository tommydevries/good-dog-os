import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cards, dimensions, dimensionOrder } from '../../content'
import { eligibleCards, drawCard, dimensionToStage } from '../../cards/deck'
import { useAppStore } from '../../store/useAppStore'
import { Button } from '../../design'
import { TrainingCardView } from './TrainingCardView'

export function CardsView() {
  const plan = useAppStore((s) => s.plan)
  const setCommandStage = useAppStore((s) => s.setCommandStage)
  const pool = eligibleCards(cards, plan?.coreCommandIds)

  const [card, setCard] = useState(() => drawCard(pool))
  const [doneCount, setDoneCount] = useState(0)

  const draw = () => setCard((prev) => drawCard(pool, Math.random, prev?.id))
  const markDone = () => {
    if (card) {
      setCommandStage(card.command, dimensionToStage(card.dimension))
      setDoneCount((c) => c + 1)
    }
    draw()
  }

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <header className="mb-6 text-center">
        <h1 className="font-serif text-3xl text-forest">Training cards</h1>
        <p className="mx-auto mt-1 max-w-xs text-sm text-ink/60">
          {plan ? `Drawn from ${plan.dogName}'s plan. ` : 'Grab a card and go do it. '}
          Pick one a day, or let everyone draw their own.
        </p>
      </header>

      <AnimatePresence mode="wait">
        {card ? (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 14, rotate: -1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.2 }}
          >
            <TrainingCardView card={card} />
          </motion.div>
        ) : (
          <p className="text-center text-ink/60">No cards available.</p>
        )}
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-center gap-3">
        <Button onClick={markDone} disabled={!card}>
          Did it
        </Button>
        <Button variant="secondary" onClick={draw} disabled={!card}>
          Draw another
        </Button>
      </div>

      {doneCount > 0 && (
        <p className="mt-4 text-center text-sm font-medium text-forest">
          Nice. {doneCount} card{doneCount > 1 ? 's' : ''} done today.
        </p>
      )}

      <div className="mt-10 rounded-xl2 border border-forest-light/50 bg-white/60 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/40">
          The deck key
        </p>
        <ul className="space-y-1.5 text-xs text-ink/70">
          {dimensionOrder.map((d) => (
            <li key={d} className="flex items-center gap-2">
              <span
                className="h-3 w-3 flex-none rounded-sm"
                style={{ background: dimensions[d].color }}
              />
              <span>
                <span className="font-semibold text-ink">{dimensions[d].label}</span> —{' '}
                {dimensions[d].intent}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-ink/50">Dots in the corner = difficulty (1 to 3).</p>
      </div>

      <div className="mt-8 text-center">
        <Link
          to={plan ? '/plan' : '/'}
          className="text-sm font-semibold text-forest hover:underline"
        >
          {plan ? 'Back to the plan' : 'Home'}
        </Link>
      </div>
    </main>
  )
}
