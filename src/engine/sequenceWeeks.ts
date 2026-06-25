import type { CommandId, ContentLibrary, DogProfile, GameId, Problem, ProgramWeek } from '../types'

export interface ScheduleInputs {
  commands: CommandId[]
  problems: Problem[]
  recommendedGameIds: GameId[]
}

/** Commands taught per week. More time and experience pack more in, shortening the plan. */
function commandsPerWeek(profile: DogProfile): number {
  let load = 1
  if (profile.minutesPerDay > 20) load++
  if (profile.minutesPerDay > 35) load++
  if (profile.experience === 'experienced') load++
  return Math.max(1, Math.min(3, load))
}

/** Lay commands across foundation weeks, then add proofing, real-world, and polish weeks. */
export function sequenceWeeks(
  profile: DogProfile,
  library: ContentLibrary,
  inputs: ScheduleInputs,
): ProgramWeek[] {
  const { commands, recommendedGameIds } = inputs
  const perWeek = commandsPerWeek(profile)
  const nameOf = (id: CommandId) => library.commands.find((c) => c.id === id)?.name ?? id

  const gamePool = recommendedGameIds.length ? recommendedGameIds : library.games.map((g) => g.id)
  let gameCursor = 0
  const nextGames = (n: number): GameId[] => {
    const out: GameId[] = []
    for (let k = 0; k < n && gamePool.length > 0; k++) {
      out.push(gamePool[gameCursor % gamePool.length])
      gameCursor++
    }
    return out
  }

  const weeks: ProgramWeek[] = []
  let week = 1

  for (let i = 0; i < commands.length; i += perWeek) {
    const slice = commands.slice(i, i + perWeek)
    const headline = slice[slice.length - 1]
    weeks.push({
      week: week++,
      phase: 'foundation',
      focus: `Teach ${slice.map(nameOf).join(', ')}`,
      commandIds: slice,
      milestone: library.milestones[headline] ?? `${nameOf(headline)} is reliable in a quiet room.`,
      gameIds: nextGames(2),
    })
  }

  weeks.push({
    week: week++,
    phase: 'proofing',
    focus: 'Add distance, duration, and the first distractions to everything he knows',
    commandIds: [],
    milestone: 'Holds a one-minute stay across the room with mild distractions.',
    gameIds: nextGames(2),
  })
  weeks.push({
    week: week++,
    phase: 'real-world',
    focus: 'Take it outside: the backyard, then the front yard, then a quiet park',
    commandIds: [],
    milestone: 'Responds to name, sit, and recall outdoors with moderate distraction.',
    gameIds: nextGames(2),
  })
  weeks.push({
    week: week++,
    phase: 'polish',
    focus: 'Greetings, loose-leash polish, variable rewards, and maintenance',
    commandIds: [],
    milestone: 'Responds the first time across the house, yard, and a walk.',
    gameIds: nextGames(2),
  })

  return weeks
}
