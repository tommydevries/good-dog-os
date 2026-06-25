import type { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className = '', ...rest }: Props) {
  return (
    <div
      className={`rounded-xl2 border border-line bg-paper p-5 shadow-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
