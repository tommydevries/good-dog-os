import type { CommandId, ContentLibrary, DogProfile, Problem } from '../types'

/**
 * Union of core foundation commands and the commands each selected problem trains,
 * with prerequisites pulled in, ordered so prerequisites come first.
 */
export function selectCommands(
  _profile: DogProfile,
  library: ContentLibrary,
  problems: Problem[],
): CommandId[] {
  const cmdById = new Map(library.commands.map((c) => [c.id, c]))
  const wanted = new Set<CommandId>()

  for (const c of library.commands) if (c.core) wanted.add(c.id)
  for (const p of problems) for (const cid of p.trains) wanted.add(cid)

  const addPrereqs = (id: CommandId) => {
    const cmd = cmdById.get(id)
    if (!cmd) return
    for (const pre of cmd.prerequisites) {
      if (!wanted.has(pre)) {
        wanted.add(pre)
        addPrereqs(pre)
      }
    }
  }
  for (const id of [...wanted]) addPrereqs(id)

  // teachingOrder already lists prerequisites before dependents.
  const ordered = library.teachingOrder.filter((id) => wanted.has(id))
  for (const id of wanted) if (!ordered.includes(id)) ordered.push(id)
  return ordered
}
