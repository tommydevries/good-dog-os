import { describe, it, expect } from 'vitest'
import { computeStats, isLocked, commandStage } from './stats'
import { generatePlan } from '../../engine/generatePlan'
import { library, getCommand } from '../../content'
import type { DogProfile, ProgressState } from '../../types'

const profile: DogProfile = {
  name: 'Tracker',
  breedId: 'golden',
  ageMonths: 7,
  householdSize: 4,
  problems: ['counter-surfing'],
  minutesPerDay: 15,
  experience: 'beginner',
}

const empty = (): ProgressState => ({ commandStatus: {}, completedWeeks: [], updatedAt: null })

describe('progress stats', () => {
  const { plan } = generatePlan(profile, library)

  it('reports zero progress for an empty state', () => {
    const s = computeStats(plan, empty())
    expect(s.completion).toBe(0)
    expect(s.proofed).toBe(0)
    expect(s.started).toBe(0)
    expect(s.totalWeeks).toBe(plan.totalWeeks)
  })

  it('reports full progress when every command is proofed', () => {
    const progress = empty()
    for (const id of plan.coreCommandIds) progress.commandStatus[id] = 'proofed'
    const s = computeStats(plan, progress)
    expect(s.completion).toBe(1)
    expect(s.proofed).toBe(plan.coreCommandIds.length)
  })

  it('weights partial progress between 0 and 1', () => {
    const progress = empty()
    progress.commandStatus[plan.coreCommandIds[0]] = 'distance'
    const s = computeStats(plan, progress)
    expect(s.completion).toBeGreaterThan(0)
    expect(s.completion).toBeLessThan(1)
    expect(s.started).toBe(1)
  })

  it('counts completed weeks', () => {
    const progress = empty()
    progress.completedWeeks = [1, 2, 3]
    expect(computeStats(plan, progress).weeksDone).toBe(3)
  })
})

describe('command locks', () => {
  const planIds = ['name', 'come', 'sit', 'down']
  it('locks a command whose prerequisite has not started', () => {
    const come = getCommand('come')! // prereq: name
    expect(isLocked(come, empty(), planIds)).toBe(true)
  })

  it('unlocks once the prerequisite is started', () => {
    const come = getCommand('come')!
    const progress = empty()
    progress.commandStatus['name'] = 'learning'
    expect(isLocked(come, progress, planIds)).toBe(false)
    expect(commandStage(progress, 'name')).toBe('learning')
  })

  it('a command with no prerequisites is never locked', () => {
    const name = getCommand('name')!
    expect(isLocked(name, empty(), planIds)).toBe(false)
  })
})
