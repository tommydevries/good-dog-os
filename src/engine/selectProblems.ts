import type { ContentLibrary, DogProfile, Problem } from '../types'

/** Map the profile's chosen problems to records, highest urgency first. */
export function selectProblems(profile: DogProfile, library: ContentLibrary): Problem[] {
  const byId = new Map(library.problems.map((p) => [p.id, p]))
  const selected = profile.problems
    .map((id) => byId.get(id))
    .filter((p): p is Problem => Boolean(p))
  return [...selected].sort((a, b) => b.urgency - a.urgency)
}
