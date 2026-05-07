"use client"

import { cn } from "@/lib/utils"

type Tone = "neutral" | "primary" | "foreground" | "sky" | "emerald" | "violet" | "amber" | "rose"

interface FitnessBodyCompositionProps {
  weight?: string
  bodyFat?: string
  muscle?: string
  waterPct?: string
  measuredAt?: string
  label?: string
  tone?: Tone
  className?: string
}

const labelClasses: Record<Tone, string> = {
  neutral: "text-muted-foreground",
  primary: "text-primary",
  foreground: "text-foreground",
  sky: "text-sky-700 dark:text-sky-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  violet: "text-violet-700 dark:text-violet-300",
  amber: "text-amber-700 dark:text-amber-300",
  rose: "text-rose-700 dark:text-rose-300",
}

export const FitnessBodyCompositionDemo: FitnessBodyCompositionProps = {
  weight: "74.2 kg",
  bodyFat: "16.8%",
  muscle: "38.6 kg",
  waterPct: "58.2%",
  measuredAt: "Smart scale · this morning",
  label: "Body composition",
  tone: "emerald",
}

export function FitnessBodyComposition({
  weight,
  bodyFat,
  muscle,
  waterPct,
  measuredAt,
  label = "Body composition",
  tone = "emerald",
  className,
}: FitnessBodyCompositionProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col gap-2 rounded-xl border p-3 shadow-sm">
        <span className={cn("text-xs font-semibold uppercase tracking-wide", labelClasses[tone])}>{label}</span>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted flex flex-col gap-0.5 rounded-md p-2">
            <span className="text-muted-foreground text-xs">Weight</span>
            <span className="text-card-foreground font-mono text-lg font-bold">{weight}</span>
          </div>
          <div className="bg-muted flex flex-col gap-0.5 rounded-md p-2">
            <span className="text-muted-foreground text-xs">Body fat</span>
            <span className="text-card-foreground font-mono text-lg font-bold">{bodyFat}</span>
          </div>
          <div className="bg-muted flex flex-col gap-0.5 rounded-md p-2">
            <span className="text-muted-foreground text-xs">Muscle mass</span>
            <span className="text-card-foreground font-mono text-lg font-bold">{muscle}</span>
          </div>
          <div className="bg-muted flex flex-col gap-0.5 rounded-md p-2">
            <span className="text-muted-foreground text-xs">Water</span>
            <span className="text-card-foreground font-mono text-lg font-bold">{waterPct}</span>
          </div>
        </div>
        {measuredAt && <span className="text-muted-foreground text-xs italic">{measuredAt}</span>}
      </div>
    </div>
  )
}
