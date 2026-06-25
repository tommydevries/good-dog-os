import type { ReactNode } from 'react'

type Tone = 'neutral' | 'forest' | 'clay'

const tones: Record<Tone, string> = {
  neutral: 'bg-sand text-ink/70',
  forest: 'bg-forest-light text-forest-dark',
  clay: 'bg-clay/15 text-clay',
}

export function Tag({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  )
}
