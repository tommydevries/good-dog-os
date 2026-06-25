import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { library } from '../../content'
import { useAppStore } from '../../store/useAppStore'
import { Button } from '../../design'
import {
  STEP_COUNT,
  STEP_TITLES,
  emptyDraft,
  stepValid,
  toProfile,
  type WizardDraft,
} from './useWizard'
import type { ExperienceLevel } from '../../types'

const MINUTE_OPTIONS = [
  { value: 10, label: '~10 min', sub: 'One short session' },
  { value: 15, label: '15–20 min', sub: '2–3 short sessions' },
  { value: 25, label: '25–35 min', sub: 'A few focused sessions' },
  { value: 45, label: '45+ min', sub: 'Intensive' },
]

const EXPERIENCE: { value: ExperienceLevel; label: string }[] = [
  { value: 'beginner', label: 'New to this' },
  { value: 'some', label: 'Some experience' },
  { value: 'experienced', label: 'Experienced' },
]

const inputClass =
  'w-full rounded-2xl border border-line bg-paper px-4 py-3 text-ink shadow-sm transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25'

function Choice({
  selected,
  onClick,
  title,
  sub,
}: {
  selected: boolean
  onClick: () => void
  title: string
  sub?: string
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-left transition-all duration-150 active:scale-[0.99] ${
        selected
          ? 'border-forest bg-forest-tint text-forest-dark shadow-sm ring-1 ring-forest/30'
          : 'border-line bg-paper hover:border-forest-light hover:bg-cream'
      }`}
    >
      <div className="text-sm font-medium">{title}</div>
      {sub && <div className="mt-0.5 text-xs text-ink-faint">{sub}</div>}
    </button>
  )
}

export function Wizard() {
  const navigate = useNavigate()
  const generate = useAppStore((s) => s.generate)
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<WizardDraft>(emptyDraft)
  const update = (patch: Partial<WizardDraft>) => setDraft((d) => ({ ...d, ...patch }))

  const valid = stepValid(step, draft)
  const last = step === STEP_COUNT - 1

  const next = () => {
    if (!valid) return
    if (last) {
      generate(toProfile(draft))
      navigate('/plan')
      return
    }
    setStep((s) => s + 1)
  }

  const toggleProblem = (id: string) =>
    update({
      problems: draft.problems.includes(id)
        ? draft.problems.filter((p) => p !== id)
        : [...draft.problems, id],
    })

  return (
    <main className="mx-auto max-w-xl px-6 py-14">
      <div className="mb-9">
        <div className="flex gap-1.5">
          {Array.from({ length: STEP_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? 'bg-forest' : 'bg-sand'
              }`}
            />
          ))}
        </div>
        <p className="mt-4 text-2xs font-medium uppercase tracking-wide text-ink-faint">
          Step {step + 1} of {STEP_COUNT}
        </p>
        <h1 className="mt-1 font-display text-display font-semibold text-forest">
          {STEP_TITLES[step]}
        </h1>
      </div>

      <div key={step} className="animate-rise space-y-6">
        {step === 0 && (
          <>
            <div>
              <label htmlFor="dog-name" className="mb-1.5 block text-sm font-medium">
                Dog&apos;s name
              </label>
              <input
                id="dog-name"
                className={inputClass}
                value={draft.name}
                onChange={(e) => update({ name: e.target.value })}
                placeholder="e.g. Tracker"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dog-breed" className="mb-1.5 block text-sm font-medium">
                  Breed
                </label>
                <select
                  id="dog-breed"
                  className={inputClass}
                  value={draft.breedId}
                  onChange={(e) => update({ breedId: e.target.value })}
                >
                  {library.breeds.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="dog-age" className="mb-1.5 block text-sm font-medium">
                  Age (months)
                </label>
                <input
                  id="dog-age"
                  type="number"
                  min={1}
                  max={240}
                  className={inputClass}
                  value={draft.ageMonths ?? ''}
                  onChange={(e) =>
                    update({ ageMonths: e.target.value === '' ? null : Number(e.target.value) })
                  }
                  placeholder="7"
                />
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <label htmlFor="household" className="mb-1.5 block text-sm font-medium">
                How many people share the training?
              </label>
              <input
                id="household"
                type="number"
                min={1}
                max={12}
                className={inputClass}
                value={draft.householdSize}
                onChange={(e) => update({ householdSize: Math.max(1, Number(e.target.value)) })}
              />
              <p className="mt-1.5 text-xs text-ink-faint">
                Everyone uses the same words and rewards, so consistency matters.
              </p>
            </div>
            <fieldset>
              <legend className="mb-2 text-sm font-medium">Your experience</legend>
              <div className="grid grid-cols-3 gap-3">
                {EXPERIENCE.map((e) => (
                  <Choice
                    key={e.value}
                    selected={draft.experience === e.value}
                    onClick={() => update({ experience: e.value })}
                    title={e.label}
                  />
                ))}
              </div>
            </fieldset>
          </>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="mb-2 text-sm font-medium">
              Pick the problems to focus on (or none for a foundation plan)
            </legend>
            <div className="space-y-3">
              {library.problems.map((p) => (
                <Choice
                  key={p.id}
                  selected={draft.problems.includes(p.id)}
                  onClick={() => toggleProblem(p.id)}
                  title={p.name}
                  sub={p.why}
                />
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="mb-2 text-sm font-medium">
              How much time can you train per day?
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {MINUTE_OPTIONS.map((m) => (
                <Choice
                  key={m.value}
                  selected={draft.minutesPerDay === m.value}
                  onClick={() => update({ minutesPerDay: m.value })}
                  title={m.label}
                  sub={m.sub}
                />
              ))}
            </div>
          </fieldset>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </Button>
        <Button onClick={next} disabled={!valid}>
          {last ? 'Generate plan' : 'Next'}
        </Button>
      </div>
    </main>
  )
}
