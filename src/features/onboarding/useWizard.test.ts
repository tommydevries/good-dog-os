import { describe, it, expect } from 'vitest'
import { emptyDraft, stepValid, toProfile, type WizardDraft } from './useWizard'

function draft(overrides: Partial<WizardDraft> = {}): WizardDraft {
  return { ...emptyDraft(), ...overrides }
}

describe('wizard helpers', () => {
  it('step 0 requires a name and a valid age', () => {
    expect(stepValid(0, draft())).toBe(false)
    expect(stepValid(0, draft({ name: 'Tracker' }))).toBe(false)
    expect(stepValid(0, draft({ name: 'Tracker', ageMonths: 7 }))).toBe(true)
    expect(stepValid(0, draft({ name: 'Tracker', ageMonths: 0 }))).toBe(false)
    expect(stepValid(0, draft({ name: '   ', ageMonths: 7 }))).toBe(false)
  })

  it('problems step is always valid (problems are optional)', () => {
    expect(stepValid(2, draft())).toBe(true)
  })

  it('assembles a profile, trimming the name and defaulting a missing age', () => {
    const profile = toProfile(
      draft({ name: '  Tracker  ', ageMonths: null, problems: ['recall'] }),
    )
    expect(profile.name).toBe('Tracker')
    expect(profile.ageMonths).toBe(12)
    expect(profile.problems).toEqual(['recall'])
  })
})
