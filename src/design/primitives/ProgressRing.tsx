interface Props {
  value: number // 0..1
  size?: number
  label?: string
}

export function ProgressRing({ value, size = 64, label }: Props) {
  const clamped = Math.max(0, Math.min(1, value))
  const stroke = 6
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
      aria-label={label ?? `${pct}% complete`}
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#cdd9c9" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#33502f"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-forest text-xs font-semibold"
      >
        {pct}%
      </text>
    </svg>
  )
}
