import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from './useAppStore'
import type { DogProfile } from '../types'

const profile: DogProfile = {
  name: 'Tracker',
  breedId: 'golden',
  ageMonths: 7,
  householdSize: 4,
  problems: ['counter-surfing'],
  minutesPerDay: 15,
  experience: 'beginner',
}

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.getState().reset()
  })

  it('generates a plan from a profile', () => {
    useAppStore.getState().generate(profile)
    const s = useAppStore.getState()
    expect(s.profile).toEqual(profile)
    expect(s.plan?.coreCommandIds).toContain('place')
    expect(s.rationale.length).toBeGreaterThan(0)
  })

  it('records a command stage and a completed week', () => {
    useAppStore.getState().generate(profile)
    useAppStore.getState().setCommandStage('sit', 'proofed')
    useAppStore.getState().toggleWeek(2)
    const p = useAppStore.getState().progress
    expect(p.commandStatus.sit).toBe('proofed')
    expect(p.completedWeeks).toContain(2)
    expect(p.updatedAt).not.toBeNull()
  })

  it('toggles a week off when toggled twice', () => {
    useAppStore.getState().generate(profile)
    useAppStore.getState().toggleWeek(3)
    useAppStore.getState().toggleWeek(3)
    expect(useAppStore.getState().progress.completedWeeks).not.toContain(3)
  })

  it('reset clears the plan and profile', () => {
    useAppStore.getState().generate(profile)
    useAppStore.getState().reset()
    const s = useAppStore.getState()
    expect(s.profile).toBeNull()
    expect(s.plan).toBeNull()
    expect(s.progress.completedWeeks).toEqual([])
  })
})
