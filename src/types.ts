// Domain model for Good Dog OS.
// Content records reference each other by stable string ids, never by object identity.

export type CommandId = string
export type ProblemId = string
export type DrillId = string
export type GameId = string
export type BreedId = string

export type ExperienceLevel = 'beginner' | 'some' | 'experienced'
export type DogSize = 'small' | 'medium' | 'large'
export type EnergyLevel = 'low' | 'medium' | 'high'
export type GameImpact = 'none' | 'low' | 'medium' | 'high'
export type GameCategory = 'nose' | 'thinking' | 'fetch' | 'hideseek' | 'water' | 'tug' | 'flirt' | 'impulse'
export type CommandCategory = 'foundation' | 'manners' | 'impulse' | 'recall'

export interface Command {
  id: CommandId
  name: string
  signal: string
  meaning: string
  /** Priority core: teach these first. */
  core: boolean
  category: CommandCategory
  /** Commands that should be solid before this one. */
  prerequisites: CommandId[]
  teach: string[]
  mistake: string
}

export interface Drill {
  id: DrillId
  commandId: CommandId
  name: string
  goal: string
  steps: string[]
  success: string
}

export interface Problem {
  id: ProblemId
  name: string
  /** Higher is addressed sooner. Safety problems rank highest. */
  urgency: number
  why: string
  manage: string[]
  trains: CommandId[]
  note?: string
}

export interface Game {
  id: GameId
  name: string
  category: GameCategory
  impact: GameImpact
  summary: string
  steps?: string[]
}

export interface Breed {
  id: BreedId
  name: string
  size: DogSize
  energy: EnergyLevel
  traits: string[]
  note?: string
}

export interface ContentLibrary {
  commands: Command[]
  drills: Drill[]
  problems: Problem[]
  games: Game[]
  breeds: Breed[]
  /** Order foundation commands are taught in. */
  teachingOrder: CommandId[]
  /** Per-command end-of-week milestone text. */
  milestones: Record<CommandId, string>
}

// ---- Profile (wizard output) ----

export interface DogProfile {
  name: string
  breedId: BreedId
  ageMonths: number
  householdSize: number
  problems: ProblemId[]
  minutesPerDay: number
  experience: ExperienceLevel
}

// ---- Generated plan ----

export type ProgramPhase = 'foundation' | 'proofing' | 'real-world' | 'polish'

export interface ProgramWeek {
  week: number
  phase: ProgramPhase
  focus: string
  commandIds: CommandId[]
  milestone: string
  gameIds: GameId[]
}

export interface RationaleEntry {
  choice: string
  because: string
}

export interface TrainingPlan {
  dogName: string
  profileSummary: string
  prioritizedProblemIds: ProblemId[]
  coreCommandIds: CommandId[]
  weeks: ProgramWeek[]
  recommendedGameIds: GameId[]
  safetyNotes: string[]
  totalWeeks: number
}

export interface GenerateResult {
  plan: TrainingPlan
  rationale: RationaleEntry[]
}

// ---- Progress (Phase 2) ----

export type ProofStage =
  | 'not-started'
  | 'learning'
  | 'duration'
  | 'distance'
  | 'distraction'
  | 'proofed'

export interface ProgressState {
  commandStatus: Record<CommandId, ProofStage>
  completedWeeks: number[]
  updatedAt: string | null
}
