import type { ContentLibrary, DogProfile, GenerateResult, TrainingPlan } from '../types'
import { selectProblems } from './selectProblems'
import { selectCommands } from './selectCommands'
import { applyModifiers } from './applyModifiers'
import { sequenceWeeks } from './sequenceWeeks'
import { buildRationale } from './rationale'

function ageLabel(months: number): string {
  if (months < 6) return `${months}-month-old puppy`
  if (months < 18) return `${months}-month-old adolescent`
  const years = Math.max(1, Math.round(months / 12))
  return `${years}-year-old adult`
}

/**
 * Pure entry point. Same input always yields the same output.
 * Composes the engine steps and assembles the plan plus its rationale.
 */
export function generatePlan(profile: DogProfile, library: ContentLibrary): GenerateResult {
  const problems = selectProblems(profile, library)
  const commands = selectCommands(profile, library, problems)
  const { recommendedGameIds, safetyNotes, growthPlateRisk } = applyModifiers(profile, library)
  const weeks = sequenceWeeks(profile, library, { commands, problems, recommendedGameIds })
  const totalWeeks = weeks.length
  const rationale = buildRationale(
    profile,
    library,
    problems,
    commands,
    totalWeeks,
    growthPlateRisk,
  )

  const dogName = profile.name.trim() || 'Your dog'
  const breed = library.breeds.find((b) => b.id === profile.breedId)
  const breedName = breed?.name ?? 'dog'

  const plan: TrainingPlan = {
    dogName,
    profileSummary: `${dogName}, a ${ageLabel(profile.ageMonths)} ${breedName}, with a ${profile.experience} handler training about ${profile.minutesPerDay} minutes a day.`,
    prioritizedProblemIds: problems.map((p) => p.id),
    coreCommandIds: commands,
    weeks,
    recommendedGameIds,
    safetyNotes,
    totalWeeks,
  }

  return { plan, rationale }
}
