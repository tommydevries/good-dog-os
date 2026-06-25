import type { CommandId, ContentLibrary, DogProfile, Problem, RationaleEntry } from '../types'

/** A short, structured list of choices traced back to profile facts. */
export function buildRationale(
  profile: DogProfile,
  _library: ContentLibrary,
  problems: Problem[],
  commands: CommandId[],
  totalWeeks: number,
  growthPlateRisk: boolean,
): RationaleEntry[] {
  const entries: RationaleEntry[] = []

  if (problems.length > 0) {
    problems.forEach((p, i) => {
      entries.push({
        choice: `Prioritized ${p.name}${i === 0 ? ' first' : ''}`,
        because:
          i === 0 && p.urgency >= 100
            ? `${p.name} is a safety issue, so it leads the plan.`
            : `You flagged it, and it ranks ${i === 0 ? 'highest' : 'by urgency'} among your concerns.`,
      })
    })
  } else {
    entries.push({
      choice: 'Built a foundation plan',
      because:
        'No specific problems were selected, so the plan teaches the core obedience and recall every dog needs.',
    })
  }

  entries.push({
    choice: `Teaching ${commands.length} commands, foundation first`,
    because:
      'Each command is sequenced so its prerequisites are solid before the skills that depend on them.',
  })

  entries.push({
    choice: `A ${totalWeeks}-week program`,
    because: `Paced to about ${profile.minutesPerDay} minutes a day and a ${profile.experience} handler. More time and experience compress the schedule.`,
  })

  if (growthPlateRisk) {
    entries.push({
      choice: 'Joint-safe games only',
      because: `At ${profile.ageMonths} months his growth plates are still open, so high-impact games are held back until he is mature.`,
    })
  }

  return entries
}
