interface Props {
  value: number // 0..1
  size?: number
  label?: string
}

export function ProgressRing({ value, size = 64, label }: Props) {
  const clamped = Math.max(0, Math.min(1, value))
  const stroke = 7
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - clamped)
  const pct = Math.round(clamped * 100)

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label ?? `${pct} percent complete`}
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e3dccd" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#2c4327"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.2,0.7,0.2,1)' }}
      />
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-forest font-display text-sm font-semibold"
      >
        {pct}%
      </text>
    </svg>
  )
}
