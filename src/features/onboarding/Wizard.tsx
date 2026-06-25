import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  'w-full rounded-xl2 border border-forest-light bg-white px-4 py-2.5 text-ink focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest'

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
      className={`rounded-xl2 border px-4 py-3 text-left transition-colors ${
        selected
          ? 'border-forest bg-forest-light/60 text-forest-dark'
          : 'border-forest-light bg-white hover:bg-sand'
      }`}
    >
      <div className="text-sm font-semibold">{title}</div>
      {sub && <div className="text-xs text-ink/60">{sub}</div>}
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
    <main className="mx-auto max-w-xl px-6 py-12">
      <div className="mb-8">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-sand">
          <div
            className="h-full rounded-full bg-forest transition-all"
            style={{ width: `${((step + 1) / STEP_COUNT) * 100}%` }}
          />
        </div>
        <p className="mt-3 text-xs uppercase tracking-wide text-ink/50">
          Step {step + 1} of {STEP_COUNT}
        </p>
        <h1 className="font-serif text-3xl text-forest">{STEP_TITLES[step]}</h1>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {step === 0 && (
            <>
              <div>
                <label htmlFor="dog-name" className="mb-1 block text-sm font-medium">
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
                  <label htmlFor="dog-breed" className="mb-1 block text-sm font-medium">
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
                  <label htmlFor="dog-age" className="mb-1 block text-sm font-medium">
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
                <label htmlFor="household" className="mb-1 block text-sm font-medium">
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
                <p className="mt-1 text-xs text-ink/60">
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
        </motion.div>
      </AnimatePresence>

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
