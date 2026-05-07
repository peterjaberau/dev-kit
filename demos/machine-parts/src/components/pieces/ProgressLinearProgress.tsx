"use client"

import { cn } from "@/lib/utils"

type Tone = "primary" | "foreground" | "success"

interface ProgressLinearProgressProps {
  value?: number
  label?: string
  tone?: Tone
  className?: string
}

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary",
  foreground: "bg-foreground",
  success: "bg-emerald-500",
}

export const ProgressLinearProgressDemo: ProgressLinearProgressProps = {
  value: 68,
  label: "Deployment",
  tone: "success",
}

export function ProgressLinearProgress({ value = 0, label, tone = "primary", className }: ProgressLinearProgressProps) {
  const pct = Math.max(0, Math.min(100, value))

  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="flex w-full max-w-64 flex-col gap-1.5">
        <div className="flex items-center justify-between">
          {label && <span className="text-card-foreground text-sm font-medium">{label}</span>}
          <span className="text-muted-foreground text-sm font-semibold tabular-nums">{pct}%</span>
        </div>
        <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
          <div className={cn("h-full rounded-full transition-all", toneClasses[tone])} style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}
