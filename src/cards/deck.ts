import type { CardDimension, CommandId, ProofStage, TrainingCard } from '../types'

/**
 * Narrow the deck to cards whose command is in the dog's plan. Falls back to the
 * whole deck when no plan is given or nothing matches, so a draw always works.
 */
export function eligibleCards(
  deck: TrainingCard[],
  planCommandIds?: CommandId[],
): TrainingCard[] {
  if (!planCommandIds || planCommandIds.length === 0) return deck
  const set = new Set(planCommandIds)
  const filtered = deck.filter((c) => set.has(c.command))
  return filtered.length > 0 ? filtered : deck
}

/** Draw one card. rng is injectable for tests; excludeId avoids drawing the same card twice. */
export function drawCard(
  pool: TrainingCard[],
  rng: () => number = Math.random,
  excludeId?: string,
): TrainingCard | null {
  const candidates =
    excludeId && pool.length > 1 ? pool.filter((c) => c.id !== excludeId) : pool
  if (candidates.length === 0) return null
  const idx = Math.min(candidates.length - 1, Math.floor(rng() * candidates.length))
  return candidates[idx]
}

/** A completed card nudges that command's proofing stage forward. */
export function dimensionToStage(dimension: CardDimension): ProofStage {
  switch (dimension) {
    case 'learn':
      return 'learning'
    case 'duration':
      return 'duration'
    case 'distance':
      return 'distance'
    case 'distraction':
      return 'distraction'
  }
}
