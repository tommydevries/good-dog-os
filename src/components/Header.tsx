import { Link, useLocation } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden>
      <rect width="64" height="64" rx="16" fill="#2c4327" />
      <g fill="#fffdf8">
        <ellipse cx="32" cy="41" rx="11" ry="9" />
        <circle cx="17" cy="29" r="5" />
        <circle cx="26.5" cy="22" r="5" />
        <circle cx="37.5" cy="22" r="5" />
        <circle cx="47" cy="29" r="5" />
      </g>
    </svg>
  )
}

export function Header() {
  const plan = useAppStore((s) => s.plan)
  const { pathname } = useLocation()
  const nav = plan
    ? [
        { to: '/plan', label: 'Plan' },
        { to: '/cards', label: 'Cards' },
        { to: '/progress', label: 'Progress' },
      ]
    : []

  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Good Dog OS home">
          <Logo />
          <span className="font-display text-base font-semibold tracking-tightish text-forest">
            Good Dog OS
          </span>
        </Link>
        {nav.length > 0 && (
          <nav className="flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname === n.to
                    ? 'bg-forest-tint text-forest-dark'
                    : 'text-ink-soft hover:text-forest'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
