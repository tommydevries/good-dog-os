import type { Command, CommandId, ProgressState, ProofStage, TrainingPlan } from '../../types'

export const STAGE_ORDER: ProofStage[] = [
  'not-started',
  'learning',
  'duration',
  'distance',
  'distraction',
  'proofed',
]

export const STAGE_LABEL: Record<ProofStage, string> = {
  'not-started': 'Not started',
  learning: 'Learning',
  duration: 'Duration',
  distance: 'Distance',
  distraction: 'Distraction',
  proofed: 'Proofed',
}

/** Levels shown on the ladder (everything past not-started). */
export const LADDER_STAGES: ProofStage[] = STAGE_ORDER.slice(1)
export const MAX_STAGE = STAGE_ORDER.length - 1

export const stageIndex = (s: ProofStage): number => STAGE_ORDER.indexOf(s)

export function commandStage(progress: ProgressState, id: CommandId): ProofStage {
  return progress.commandStatus[id] ?? 'not-started'
}

/** A command is locked while any in-plan prerequisite has not been started. */
export function isLocked(
  command: Command,
  progress: ProgressState,
  planIds: CommandId[],
): boolean {
  const inPlan = new Set(planIds)
  return command.prerequisites.some(
    (p) => inPlan.has(p) && commandStage(progress, p) === 'not-started',
  )
}

export interface ProgressStats {
  totalCommands: number
  proofed: number
  started: number
  completion: number // 0..1, weighted by how far each command has progressed
  weeksDone: number
  totalWeeks: number
}

export function computeStats(plan: TrainingPlan, progress: ProgressState): ProgressStats {
  const ids = plan.coreCommandIds
  const total = ids.length
  let proofed = 0
  let started = 0
  let sum = 0
  for (const id of ids) {
    const stage = commandStage(progress, id)
    const idx = stageIndex(stage)
    sum += idx
    if (idx > 0) started++
    if (stage === 'proofed') proofed++
  }
  const completion = total === 0 ? 0 : sum / (MAX_STAGE * total)
  return {
    totalCommands: total,
    proofed,
    started,
    completion,
    weeksDone: progress.completedWeeks.length,
    totalWeeks: plan.totalWeeks,
  }
}
