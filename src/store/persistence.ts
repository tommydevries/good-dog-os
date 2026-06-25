import type { DogProfile, ProgressState, RationaleEntry, TrainingPlan } from '../types'

export const SCHEMA_VERSION = 1
export const STORAGE_KEY = 'good-dog-os'

export interface PersistedState {
  schemaVersion: number
  profile: DogProfile | null
  plan: TrainingPlan | null
  rationale: RationaleEntry[]
  progress: ProgressState
}

export const emptyProgress = (): ProgressState => ({
  commandStatus: {},
  completedWeeks: [],
  updatedAt: null,
})

export const emptyPersisted = (): PersistedState => ({
  schemaVersion: SCHEMA_VERSION,
  profile: null,
  plan: null,
  rationale: [],
  progress: emptyProgress(),
})

/** Load and validate persisted state. Any problem returns a clean empty state. */
export function loadPersisted(storage: Storage = localStorage): PersistedState {
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return emptyPersisted()
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || parsed.schemaVersion !== SCHEMA_VERSION) {
      return emptyPersisted()
    }
    return {
      ...emptyPersisted(),
      profile: parsed.profile ?? null,
      plan: parsed.plan ?? null,
      rationale: Array.isArray(parsed.rationale) ? parsed.rationale : [],
      progress: { ...emptyProgress(), ...(parsed.progress ?? {}) },
      schemaVersion: SCHEMA_VERSION,
    }
  } catch {
    return emptyPersisted()
  }
}

export function savePersisted(state: PersistedState, storage: Storage = localStorage): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage unavailable or over quota: degrade silently, state stays in memory.
  }
}

export function clearPersisted(storage: Storage = localStorage): void {
  try {
    storage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
