import type { TrainingCard } from '../../types'
import { dimensions, getCommand } from '../../content'

export function TrainingCardView({ card }: { card: TrainingCard }) {
  const meta = dimensions[card.dimension]
  const commandName = getCommand(card.command)?.name ?? card.command
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper shadow-lift">
      <div
        className="flex items-center justify-between px-5 py-3.5 text-paper"
        style={{ background: meta.color }}
      >
        <span className="text-xs font-semibold uppercase tracking-wide">{meta.label}</span>
        <span className="flex gap-1" aria-label={`level ${card.level} of 3`}>
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`h-2 w-2 rounded-full ${n <= card.level ? 'bg-paper' : 'bg-paper/30'}`}
            />
          ))}
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs italic text-ink-faint">{meta.intent}</p>
        <p className="mt-2 text-2xs font-medium uppercase tracking-wide text-ink-faint">
          {commandName}
        </p>
        <h3 className="mt-1.5 font-display text-2xl font-semibold text-forest">{card.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-ink">
          <span className="font-semibold">Do this:</span> {card.how}
        </p>
        <p className="mt-4 rounded-xl bg-forest-tint px-4 py-2.5 text-sm text-forest-dark">
          <span className="font-semibold">Win:</span> {card.win}
        </p>
      </div>
    </div>
  )
}
