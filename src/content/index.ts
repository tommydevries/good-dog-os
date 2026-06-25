import type {
  Breed,
  Command,
  ContentLibrary,
  Drill,
  Game,
  Problem,
} from '../types'
import { commands } from './commands'
import { drills } from './drills'
import { problems } from './problems'
import { games } from './games'
import { breeds } from './breeds'
import { teachingOrder, milestones } from './programTemplates'

export const library: ContentLibrary = {
  commands,
  drills,
  problems,
  games,
  breeds,
  teachingOrder,
  milestones,
}

function indexBy<T extends { id: string }>(items: T[]): Map<string, T> {
  const map = new Map<string, T>()
  for (const item of items) map.set(item.id, item)
  return map
}

const commandIndex = indexBy(commands)
const drillIndex = indexBy(drills)
const problemIndex = indexBy(problems)
const gameIndex = indexBy(games)
const breedIndex = indexBy(breeds)
const drillByCommand = new Map<string, Drill>(drills.map((d) => [d.commandId, d]))

export const getCommand = (id: string): Command | undefined => commandIndex.get(id)
export const getProblem = (id: string): Problem | undefined => problemIndex.get(id)
export const getGame = (id: string): Game | undefined => gameIndex.get(id)
export const getBreed = (id: string): Breed | undefined => breedIndex.get(id)
export const getDrill = (id: string): Drill | undefined => drillIndex.get(id)
export const getDrillForCommand = (commandId: string): Drill | undefined =>
  drillByCommand.get(commandId)

export { commands, drills, problems, games, breeds, teachingOrder, milestones }
