"use client"

import { cn } from "@/lib/utils"

type LinkStatus = "healthy" | "degraded" | "broken"

interface MonitoringServiceLinkProps {
  from?: string
  to?: string
  latency?: string
  status?: LinkStatus
  className?: string
}

const linkStyles: Record<LinkStatus, { line: string; dot: string; text: string }> = {
  healthy: {
    line: "bg-emerald-500",
    dot: "bg-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
  },
  degraded: {
    line: "bg-amber-500",
    dot: "bg-amber-500",
    text: "text-amber-700 dark:text-amber-400",
  },
  broken: {
    line: "bg-rose-500",
    dot: "bg-rose-500",
    text: "text-rose-700 dark:text-rose-400",
  },
}

export const MonitoringServiceLinkDemo: MonitoringServiceLinkProps = {
  from: "api",
  to: "db",
  latency: "42ms",
  status: "healthy",
}

export function MonitoringServiceLink({ from = "a", to = "b", latency, status = "healthy", className }: MonitoringServiceLinkProps) {
  const styles = linkStyles[status]

  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-72 items-center gap-2 rounded-full border px-3 py-2 shadow-sm">
        <span className="text-card-foreground font-mono text-xs">{from}</span>
        <div className="relative flex flex-1 items-center">
          <span className={cn("size-1.5 shrink-0 rounded-full", styles.dot)} aria-hidden="true" />
          <span className={cn("h-0.5 flex-1", styles.line)} aria-hidden="true" />
          <span className={cn("size-1.5 shrink-0 rounded-full", styles.dot)} aria-hidden="true" />
          {latency && (
            <span
              className={cn(
                "bg-card absolute left-1/2 -translate-x-1/2 px-1.5 text-xs font-medium tabular-nums",
                styles.text,
              )}
            >
              {latency}
            </span>
          )}
        </div>
        <span className="text-card-foreground font-mono text-xs">{to}</span>
      </div>
    </div>
  )
}
