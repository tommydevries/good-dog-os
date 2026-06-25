import { create } from 'zustand'
import type {
  CommandId,
  DogProfile,
  ProgressState,
  ProofStage,
  RationaleEntry,
  TrainingPlan,
} from '../types'
import { generatePlan } from '../engine/generatePlan'
import { library } from '../content'
import {
  SCHEMA_VERSION,
  clearPersisted,
  emptyProgress,
  loadPersisted,
  savePersisted,
} from './persistence'

export interface AppState {
  profile: DogProfile | null
  plan: TrainingPlan | null
  rationale: RationaleEntry[]
  progress: ProgressState
  generate: (profile: DogProfile) => void
  setCommandStage: (commandId: CommandId, stage: ProofStage) => void
  toggleWeek: (week: number) => void
  reset: () => void
}

type DataSlice = Pick<AppState, 'profile' | 'plan' | 'rationale' | 'progress'>

function save(slice: DataSlice) {
  savePersisted({
    schemaVersion: SCHEMA_VERSION,
    profile: slice.profile,
    plan: slice.plan,
    rationale: slice.rationale,
    progress: slice.progress,
  })
}

const initial = loadPersisted()

export const useAppStore = create<AppState>((set, get) => ({
  profile: initial.profile,
  plan: initial.plan,
  rationale: initial.rationale,
  progress: initial.progress,

  generate: (profile) => {
    const { plan, rationale } = generatePlan(profile, library)
    const next: DataSlice = { profile, plan, rationale, progress: emptyProgress() }
    set(next)
    save(next)
  },

  setCommandStage: (commandId, stage) => {
    const prev = get().progress
    const progress: ProgressState = {
      ...prev,
      commandStatus: { ...prev.commandStatus, [commandId]: stage },
      updatedAt: new Date().toISOString(),
    }
    set({ progress })
    save({ ...get(), progress })
  },

  toggleWeek: (week) => {
    const prev = get().progress
    const completedWeeks = prev.completedWeeks.includes(week)
      ? prev.completedWeeks.filter((w) => w !== week)
      : [...prev.completedWeeks, week].sort((a, b) => a - b)
    const progress: ProgressState = {
      ...prev,
      completedWeeks,
      updatedAt: new Date().toISOString(),
    }
    set({ progress })
    save({ ...get(), progress })
  },

  reset: () => {
    clearPersisted()
    set({ profile: null, plan: null, rationale: [], progress: emptyProgress() })
  },
}))
