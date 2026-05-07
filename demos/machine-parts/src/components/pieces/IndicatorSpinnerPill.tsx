"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Tone = "primary" | "foreground" | "muted"

interface IndicatorSpinnerPillProps {
  label?: string
  tone?: Tone
  className?: string
}

const toneClasses: Record<Tone, string> = {
  primary: "text-primary",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
}

export const IndicatorSpinnerPillDemo: IndicatorSpinnerPillProps = {
  label: "Syncing workspace",
  tone: "primary",
}

export function IndicatorSpinnerPill({ label, tone = "primary", className }: IndicatorSpinnerPillProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card inline-flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-sm">
        <Loader2 className={cn("size-3.5 animate-spin", toneClasses[tone])} aria-hidden="true" />
        {label && <span className="text-card-foreground text-sm font-medium">{label}</span>}
      </div>
    </div>
  )
}
