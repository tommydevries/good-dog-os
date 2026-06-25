import type { ContentLibrary, DogProfile, GameId, GameImpact } from '../types'

export interface Modifiers {
  recommendedGameIds: GameId[]
  safetyNotes: string[]
  growthPlateRisk: boolean
}

const IMPACT_ORDER: Record<GameImpact, number> = { none: 0, low: 1, medium: 2, high: 3 }

/** Breed- and age-based adjustments: safety notes and joint-safe game filtering. */
export function applyModifiers(profile: DogProfile, library: ContentLibrary): Modifiers {
  const breed = library.breeds.find((b) => b.id === profile.breedId)
  const size = breed?.size ?? 'medium'
  const energy = breed?.energy ?? 'medium'
  const growthPlateRisk = profile.ageMonths < 18 && (size === 'large' || size === 'medium')

  const safetyNotes: string[] = []
  if (growthPlateRisk) {
    safetyNotes.push(
      'Growth plates are still open until roughly 12 to 18 months. Skip repeated hard jumping, forced running on pavement, and dock-diving jumps for now, and check with your vet before any jumping sport.',
    )
  }
  if (profile.ageMonths < 6) {
    safetyNotes.push(
      'Under 6 months: keep sessions very short and make gentle socialization to people, places, surfaces, and sounds the top priority.',
    )
  }
  if (energy === 'high') {
    safetyNotes.push(
      'This is a high-energy breed. Meet his exercise and enrichment needs before expecting focus; a tired dog trains better.',
    )
  }
  if (breed?.note) safetyNotes.push(breed.note)

  let games = [...library.games]
  if (growthPlateRisk) {
    games = games.filter((g) => g.impact === 'none' || g.impact === 'low')
  }
  games.sort((a, b) => IMPACT_ORDER[a.impact] - IMPACT_ORDER[b.impact])

  return { recommendedGameIds: games.map((g) => g.id), safetyNotes, growthPlateRisk }
}
