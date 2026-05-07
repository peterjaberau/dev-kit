"use client"

import { cn } from "@/lib/utils"

type Env = "production" | "staging" | "preview" | "development" | "local"

interface IndicatorEnvironmentBadgeProps {
  env?: Env
  branch?: string
  className?: string
}

const envConfig: Record<Env, { label: string; dot: string; text: string }> = {
  production: {
    label: "Production",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  staging: {
    label: "Staging",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-300",
  },
  preview: {
    label: "Preview",
    dot: "bg-sky-500",
    text: "text-sky-700 dark:text-sky-300",
  },
  development: {
    label: "Development",
    dot: "bg-violet-500",
    text: "text-violet-700 dark:text-violet-300",
  },
  local: {
    label: "Local",
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
  },
}

export const IndicatorEnvironmentBadgeDemo: IndicatorEnvironmentBadgeProps = {
  env: "staging",
  branch: "feat/onboarding-v3",
}

export function IndicatorEnvironmentBadge({ env = "production", branch, className }: IndicatorEnvironmentBadgeProps) {
  const config = envConfig[env]

  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card inline-flex items-center gap-2 rounded-full border px-2.5 py-1 shadow-sm">
        <span className={cn("size-1.5 rounded-full", config.dot)} aria-hidden="true" />
        <span className={cn("text-xs font-semibold uppercase tracking-wider", config.text)}>{config.label}</span>
        {branch && (
          <>
            <span className="bg-border h-3 w-px" aria-hidden="true" />
            <span className="text-muted-foreground font-mono text-xs">{branch}</span>
          </>
        )}
      </div>
    </div>
  )
}
