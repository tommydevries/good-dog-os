import type { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className = '', ...rest }: Props) {
  return (
    <div
      className={`rounded-xl2 border border-forest-light/60 bg-white/70 p-5 shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
