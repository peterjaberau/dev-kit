"use client"

import { cn } from "@/lib/utils"

type Tone = "primary" | "foreground" | "muted"

interface ProgressLoadingDotsProps {
  label?: string
  tone?: Tone
  className?: string
}

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary",
  foreground: "bg-foreground",
  muted: "bg-muted-foreground",
}

export const ProgressLoadingDotsDemo: ProgressLoadingDotsProps = {
  label: "Thinking",
  tone: "primary",
}

export function ProgressLoadingDots({ label, tone = "primary", className }: ProgressLoadingDotsProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card inline-flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-sm">
        <div className="flex items-center gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn("size-1.5 animate-pulse rounded-full", toneClasses[tone])}
              style={{
                animationDelay: `${i * 160}ms`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
        {label && <span className="text-muted-foreground text-xs font-medium">{label}</span>}
      </div>
    </div>
  )
}
