"use client"

import { cn } from "@/lib/utils"

type Tone = "neutral" | "primary" | "foreground" | "emerald" | "sky" | "violet" | "amber" | "rose"

interface MonitoringTokenBucketProps {
  total?: number
  remaining?: number
  tone?: Tone
  className?: string
}

const dotClasses: Record<Tone, string> = {
  neutral: "bg-muted-foreground",
  primary: "bg-primary",
  foreground: "bg-foreground",
  emerald: "bg-emerald-500",
  sky: "bg-sky-500",
  violet: "bg-violet-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
}

export const MonitoringTokenBucketDemo: MonitoringTokenBucketProps = {
  total: 10,
  remaining: 7,
  tone: "sky",
}

export function MonitoringTokenBucket({ total = 10, remaining = 0, tone = "sky", className }: MonitoringTokenBucketProps) {
  const safeTotal = Math.max(1, total)
  const safeRemaining = Math.min(safeTotal, Math.max(0, remaining))

  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex items-center gap-3 rounded-full border px-3 py-2 shadow-sm">
        <div className="flex items-center gap-1" aria-hidden="true">
          {Array.from({ length: safeTotal }).map((_, i) => (
            <span key={i} className={cn("size-2 rounded-full", i < safeRemaining ? dotClasses[tone] : "bg-muted")} />
          ))}
        </div>
        <span className="text-card-foreground text-xs font-semibold tabular-nums">
          {safeRemaining}
          <span className="text-muted-foreground">/{safeTotal}</span>
        </span>
      </div>
    </div>
  )
}
