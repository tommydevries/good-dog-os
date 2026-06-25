import type { ReactNode } from 'react'

type Tone = 'neutral' | 'forest' | 'clay'

const tones: Record<Tone, string> = {
  neutral: 'bg-sand text-ink-soft',
  forest: 'bg-forest-tint text-forest-dark ring-1 ring-forest-light',
  clay: 'bg-clay-tint text-clay',
}

export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
