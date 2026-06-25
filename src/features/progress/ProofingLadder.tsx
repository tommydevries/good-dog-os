import type { Command } from '../../types'
import { useAppStore } from '../../store/useAppStore'
import {
  LADDER_STAGES,
  STAGE_LABEL,
  STAGE_ORDER,
  commandStage,
  isLocked,
  stageIndex,
} from './stats'

const SHORT: Record<string, string> = {
  learning: 'Learn',
  duration: 'Dur',
  distance: 'Dist',
  distraction: 'Distr',
  proofed: 'Done',
}

export function ProofingLadder({ command, planIds }: { command: Command; planIds: string[] }) {
  const progress = useAppStore((s) => s.progress)
  const setCommandStage = useAppStore((s) => s.setCommandStage)

  const stage = commandStage(progress, command.id)
  const idx = stageIndex(stage)
  const locked = isLocked(command, progress, planIds)

  return (
    <div className="rounded-xl2 border border-forest-light/50 bg-white/70 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold">
          {command.name}
          {locked && <span className="ml-2 text-xs font-normal text-ink/40">locked</span>}
        </span>
        <span className="text-xs text-ink/50">{STAGE_LABEL[stage]}</span>
      </div>
      <div className="flex gap-1" role="group" aria-label={`${command.name} progress`}>
        {LADDER_STAGES.map((st, i) => {
          const level = i + 1
          const filled = idx >= level
          const next = stage === st ? STAGE_ORDER[level - 1] : st
          return (
            <button
              key={st}
              type="button"
              disabled={locked}
              onClick={() => setCommandStage(command.id, next)}
              aria-label={`set ${command.name} to ${STAGE_LABEL[st]}`}
              className={`flex-1 rounded-md py-1 text-[10px] font-semibold transition-colors disabled:opacity-50 ${
                filled ? 'bg-forest text-white' : 'bg-sand text-ink/50 hover:bg-forest-light'
              }`}
            >
              {SHORT[st]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
