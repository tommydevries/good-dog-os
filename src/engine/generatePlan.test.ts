import { describe, it, expect } from 'vitest'
import { generatePlan } from './generatePlan'
import { library } from '../content'
import type { DogProfile } from '../types'

function makeProfile(overrides: Partial<DogProfile> = {}): DogProfile {
  return {
    name: 'Tracker',
    breedId: 'golden',
    ageMonths: 7,
    householdSize: 4,
    problems: ['counter-surfing'],
    minutesPerDay: 15,
    experience: 'beginner',
    ...overrides,
  }
}

describe('generatePlan', () => {
  it('prioritizes the selected problem and selects the commands it trains', () => {
    const { plan } = generatePlan(makeProfile(), library)
    expect(plan.prioritizedProblemIds).toContain('counter-surfing')
    expect(plan.coreCommandIds).toEqual(
      expect.arrayContaining(['place', 'leave-it', 'off']),
    )
    expect(plan.weeks.length).toBeGreaterThan(0)
    expect(plan.weeks[0].phase).toBe('foundation')
    expect(plan.dogName).toBe('Tracker')
  })

  it('flags growth plates for a young large breed and drops high-impact games', () => {
    const { plan } = generatePlan(makeProfile(), library)
    expect(plan.safetyNotes.join(' ')).toMatch(/growth plate/i)
    expect(plan.recommendedGameIds).not.toContain('two-ball-fetch') // high impact
    expect(plan.recommendedGameIds).not.toContain('flirt-pole') // medium impact
    expect(plan.recommendedGameIds).toContain('find-it') // zero impact
  })

  it('does not flag growth plates for an adult dog', () => {
    const { plan } = generatePlan(makeProfile({ ageMonths: 30 }), library)
    expect(plan.safetyNotes.join(' ')).not.toMatch(/growth plate/i)
    expect(plan.recommendedGameIds).toContain('two-ball-fetch')
  })

  it('gives an experienced owner with more time a shorter program than a beginner with little time', () => {
    const fast = generatePlan(
      makeProfile({ experience: 'experienced', minutesPerDay: 45 }),
      library,
    ).plan
    const slow = generatePlan(
      makeProfile({ experience: 'beginner', minutesPerDay: 10 }),
      library,
    ).plan
    expect(fast.totalWeeks).toBeLessThan(slow.totalWeeks)
  })

  it('orders problems by urgency, recall first', () => {
    const { plan } = generatePlan(
      makeProfile({ problems: ['counter-surfing', 'recall', 'energy'] }),
      library,
    )
    expect(plan.prioritizedProblemIds[0]).toBe('recall')
  })

  it('falls back to a foundation plan when no problems are selected', () => {
    const { plan } = generatePlan(makeProfile({ problems: [] }), library)
    expect(plan.prioritizedProblemIds).toEqual([])
    expect(plan.coreCommandIds).toEqual(expect.arrayContaining(['name', 'sit', 'down']))
    expect(plan.weeks.length).toBeGreaterThan(0)
  })

  it('includes prerequisite commands automatically', () => {
    // recall trains "come" (prereq: name) and energy trains "stay" (prereq: sit)
    const { plan } = generatePlan(
      makeProfile({ problems: ['recall', 'energy'] }),
      library,
    )
    expect(plan.coreCommandIds).toContain('name')
    expect(plan.coreCommandIds).toContain('sit')
    // a command never appears before its prerequisite
    const idx = (id: string) => plan.coreCommandIds.indexOf(id)
    expect(idx('name')).toBeLessThan(idx('come'))
    expect(idx('sit')).toBeLessThan(idx('stay'))
  })

  it('is deterministic: same profile yields an identical plan', () => {
    const a = generatePlan(makeProfile(), library)
    const b = generatePlan(makeProfile(), library)
    expect(a).toEqual(b)
  })

  it('clamps extreme ages to a valid program', () => {
    for (const ageMonths of [1, 120]) {
      const { plan } = generatePlan(makeProfile({ ageMonths }), library)
      expect(plan.totalWeeks).toBeGreaterThanOrEqual(5)
      expect(plan.totalWeeks).toBeLessThanOrEqual(16)
      expect(plan.weeks.length).toBe(plan.totalWeeks)
    }
  })

  it('gives every prioritized problem a rationale entry', () => {
    const { plan, rationale } = generatePlan(
      makeProfile({ problems: ['recall', 'counter-surfing'] }),
      library,
    )
    for (const pid of plan.prioritizedProblemIds) {
      const name = library.problems.find((p) => p.id === pid)!.name
      expect(
        rationale.some((r) => r.choice.includes(name) || r.because.includes(name)),
        `rationale mentions ${name}`,
      ).toBe(true)
    }
  })

  it('every week references real commands and games', () => {
    const { plan } = generatePlan(makeProfile(), library)
    const commandIds = new Set(library.commands.map((c) => c.id))
    const gameIds = new Set(library.games.map((g) => g.id))
    for (const week of plan.weeks) {
      for (const c of week.commandIds) expect(commandIds.has(c)).toBe(true)
      for (const g of week.gameIds) expect(gameIds.has(g)).toBe(true)
      expect(week.focus.length).toBeGreaterThan(0)
    }
  })
})
