// components/shared/summary-card.tsx
interface SummaryCardProps {
  title: string
  value: string | number
  subtitle?: string
}

export function SummaryCard({ title, value, subtitle }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {subtitle ? (
        <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  )
}
