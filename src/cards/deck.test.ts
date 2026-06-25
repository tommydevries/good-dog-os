import { describe, it, expect } from 'vitest'
import { eligibleCards, drawCard, dimensionToStage } from './deck'
import { cards, commands } from '../content'

const commandIds = new Set(commands.map((c) => c.id))

describe('card content integrity', () => {
  it('every card targets a real command', () => {
    expect(cards.length).toBeGreaterThan(0)
    for (const card of cards) {
      expect(commandIds.has(card.command), `${card.id} -> ${card.command}`).toBe(true)
    }
  })

  it('every card has a valid dimension and level and non-empty text', () => {
    const dims = new Set(['learn', 'duration', 'distance', 'distraction'])
    for (const card of cards) {
      expect(dims.has(card.dimension), `${card.id} dimension`).toBe(true)
      expect([1, 2, 3]).toContain(card.level)
      expect(card.title.length).toBeGreaterThan(0)
      expect(card.how.length).toBeGreaterThan(0)
      expect(card.win.length).toBeGreaterThan(0)
    }
  })

  it('card ids are unique', () => {
    const ids = cards.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('deck logic', () => {
  it('filters to plan commands, falling back to the whole deck', () => {
    const planCards = eligibleCards(cards, ['sit'])
    expect(planCards.length).toBeGreaterThan(0)
    expect(planCards.every((c) => c.command === 'sit')).toBe(true)

    expect(eligibleCards(cards, [])).toEqual(cards)
    expect(eligibleCards(cards, ['no-such-command'])).toEqual(cards) // fallback
  })

  it('draws a card from the pool', () => {
    const card = drawCard(cards, () => 0)
    expect(card).toBe(cards[0])
  })

  it('avoids redrawing the excluded card', () => {
    const pool = cards.slice(0, 3)
    const next = drawCard(pool, () => 0, pool[0].id)
    expect(next).not.toBeNull()
    expect(next!.id).not.toBe(pool[0].id)
  })

  it('returns null for an empty pool', () => {
    expect(drawCard([])).toBeNull()
  })

  it('maps dimensions to proofing stages', () => {
    expect(dimensionToStage('learn')).toBe('learning')
    expect(dimensionToStage('duration')).toBe('duration')
    expect(dimensionToStage('distance')).toBe('distance')
    expect(dimensionToStage('distraction')).toBe('distraction')
  })
})
