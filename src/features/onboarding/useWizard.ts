import type { BreedId, DogProfile, ExperienceLevel, ProblemId } from '../../types'

export interface WizardDraft {
  name: string
  breedId: BreedId
  ageMonths: number | null
  householdSize: number
  problems: ProblemId[]
  minutesPerDay: number
  experience: ExperienceLevel
}

export const STEP_TITLES = [
  'Your dog',
  'Your household',
  'What to work on',
  'Time to train',
] as const

export const STEP_COUNT = STEP_TITLES.length

export function emptyDraft(): WizardDraft {
  return {
    name: '',
    breedId: 'golden',
    ageMonths: null,
    householdSize: 2,
    problems: [],
    minutesPerDay: 15,
    experience: 'beginner',
  }
}

/** Per-step validation: gates the Next button. */
export function stepValid(step: number, d: WizardDraft): boolean {
  switch (step) {
    case 0:
      return (
        d.name.trim().length > 0 && d.ageMonths !== null && d.ageMonths >= 1 && d.ageMonths <= 240
      )
    case 1:
      return d.householdSize >= 1
    case 2:
      return true // problems are optional; an empty set yields a foundation plan
    case 3:
      return d.minutesPerDay > 0
    default:
      return true
  }
}

export function toProfile(d: WizardDraft): DogProfile {
  return {
    name: d.name.trim(),
    breedId: d.breedId,
    ageMonths: d.ageMonths ?? 12,
    householdSize: d.householdSize,
    problems: d.problems,
    minutesPerDay: d.minutesPerDay,
    experience: d.experience,
  }
}
