import type { TrainingCard } from '../../types'
import { dimensions, getCommand } from '../../content'

export function TrainingCardView({ card }: { card: TrainingCard }) {
  const meta = dimensions[card.dimension]
  const commandName = getCommand(card.command)?.name ?? card.command
  return (
    <div className="overflow-hidden rounded-xl2 border border-forest-light/60 bg-white shadow-md">
      <div
        className="flex items-center justify-between px-5 py-3 text-white"
        style={{ background: meta.color }}
      >
        <span className="text-xs font-bold uppercase tracking-wide">{meta.label}</span>
        <span className="flex gap-1" aria-label={`level ${card.level} of 3`}>
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`h-2 w-2 rounded-full ${n <= card.level ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs italic text-ink/50">{meta.intent}</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-ink/40">
          {commandName}
        </p>
        <h3 className="mt-1 font-serif text-2xl text-forest">{card.title}</h3>
        <p className="mt-3 text-sm text-ink/80">
          <span className="font-semibold">Do this:</span> {card.how}
        </p>
        <p className="mt-3 rounded-lg bg-sand px-3 py-2 text-sm text-forest-dark">
          <span className="font-semibold">Win:</span> {card.win}
        </p>
      </div>
    </div>
  )
}
