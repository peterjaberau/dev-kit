"use client"

import { Check, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"

type RunStatus = "success" | "running" | "failed"

interface AutomationRunLogRun {
  id: string
  status: RunStatus
  duration: string
  time: string
}

interface AutomationRunLogProps {
  workflow?: string
  headerLabel?: string
  runs?: AutomationRunLogRun[]
  className?: string
}

const STATUS: Record<RunStatus, { label: string; classes: string; bar: string }> = {
  success: {
    label: "Success",
    classes: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-500",
  },
  running: {
    label: "Running",
    classes: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    bar: "bg-sky-500",
  },
  failed: {
    label: "Failed",
    classes: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
    bar: "bg-rose-500",
  },
}

export const AutomationRunLogDemo: AutomationRunLogProps = {
  workflow: "Stripe → Slack",
  headerLabel: "Recent runs",
  runs: [
    { id: "run_8a2k", status: "success", duration: "412 ms", time: "2m ago" },
    { id: "run_7f9p", status: "running", duration: "—", time: "now" },
    { id: "run_7e1q", status: "failed", duration: "1.2 s", time: "8m ago" },
    { id: "run_7d3m", status: "success", duration: "388 ms", time: "14m ago" },
  ],
}

export function AutomationRunLog({
  workflow = "Workflow",
  headerLabel = "Recent runs",
  runs = [],
  className,
}: AutomationRunLogProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col gap-1 rounded-md border p-3 shadow-sm">
        <div className="flex items-baseline justify-between gap-2 pb-1">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">{headerLabel}</span>
          <span className="text-card-foreground truncate text-xs">{workflow}</span>
        </div>
        <ul className="divide-border flex flex-col divide-y">
          {runs.map((r) => {
            const cfg = STATUS[r.status]
            return (
              <li key={r.id} className="flex items-center gap-2 py-1.5">
                <span
                  className={cn("flex size-5 shrink-0 items-center justify-center rounded-full", cfg.classes)}
                  aria-hidden="true"
                >
                  {r.status === "success" && <Check className="size-3" strokeWidth={3} />}
                  {r.status === "running" && <Loader2 className="size-3 animate-spin" />}
                  {r.status === "failed" && <X className="size-3" strokeWidth={3} />}
                </span>
                <span className="text-card-foreground flex-1 truncate font-mono text-xs">{r.id}</span>
                <span className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums">{r.duration}</span>
                <span className="text-muted-foreground w-16 shrink-0 text-right text-xs">{r.time}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
