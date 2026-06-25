import { describe, it, expect } from 'vitest'
import {
  SCHEMA_VERSION,
  STORAGE_KEY,
  clearPersisted,
  emptyPersisted,
  loadPersisted,
  savePersisted,
  type PersistedState,
} from './persistence'

function fakeStorage(): Storage {
  const m = new Map<string, string>()
  return {
    get length() {
      return m.size
    },
    clear: () => m.clear(),
    getItem: (k: string) => (m.has(k) ? m.get(k)! : null),
    key: (i: number) => [...m.keys()][i] ?? null,
    removeItem: (k: string) => {
      m.delete(k)
    },
    setItem: (k: string, v: string) => {
      m.set(k, v)
    },
  }
}

const sample: PersistedState = {
  schemaVersion: SCHEMA_VERSION,
  profile: {
    name: 'Tracker',
    breedId: 'golden',
    ageMonths: 7,
    householdSize: 4,
    problems: ['counter-surfing'],
    minutesPerDay: 15,
    experience: 'beginner',
  },
  plan: null,
  rationale: [],
  progress: { commandStatus: { sit: 'proofed' }, completedWeeks: [1, 2], updatedAt: '2026-06-25' },
}

describe('persistence', () => {
  it('round-trips a saved state', () => {
    const s = fakeStorage()
    savePersisted(sample, s)
    expect(loadPersisted(s)).toEqual(sample)
  })

  it('returns empty state when nothing is stored', () => {
    expect(loadPersisted(fakeStorage())).toEqual(emptyPersisted())
  })

  it('discards state from a different schema version', () => {
    const s = fakeStorage()
    s.setItem(STORAGE_KEY, JSON.stringify({ ...sample, schemaVersion: 999 }))
    expect(loadPersisted(s)).toEqual(emptyPersisted())
  })

  it('returns empty state on corrupt JSON without throwing', () => {
    const s = fakeStorage()
    s.setItem(STORAGE_KEY, 'not json{')
    expect(() => loadPersisted(s)).not.toThrow()
    expect(loadPersisted(s)).toEqual(emptyPersisted())
  })

  it('backfills a missing progress shape', () => {
    const s = fakeStorage()
    s.setItem(STORAGE_KEY, JSON.stringify({ schemaVersion: SCHEMA_VERSION, profile: null }))
    const loaded = loadPersisted(s)
    expect(loaded.progress).toEqual({ commandStatus: {}, completedWeeks: [], updatedAt: null })
  })

  it('clears stored state', () => {
    const s = fakeStorage()
    savePersisted(sample, s)
    clearPersisted(s)
    expect(loadPersisted(s)).toEqual(emptyPersisted())
  })
})
