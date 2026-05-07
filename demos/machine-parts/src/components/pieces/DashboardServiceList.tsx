"use client"

import { cn } from "@/lib/utils"

type Status = "up" | "degraded" | "down"

interface DashboardServiceListService {
  name: string
  status: Status
  uptime: string
}

interface DashboardServiceListProps {
  heading?: string
  upLabel?: string
  degradedLabel?: string
  downLabel?: string
  services?: DashboardServiceListService[]
  className?: string
}

const DOT: Record<Status, string> = {
  up: "bg-emerald-500",
  degraded: "bg-amber-500",
  down: "bg-rose-500",
}

export const DashboardServiceListDemo: DashboardServiceListProps = {
  heading: "Services",
  upLabel: "Operational",
  degradedLabel: "Degraded",
  downLabel: "Outage",
  services: [
    { name: "API", status: "up", uptime: "99.99%" },
    { name: "Ingest", status: "degraded", uptime: "99.82%" },
    { name: "Billing", status: "up", uptime: "99.97%" },
    { name: "Workers", status: "up", uptime: "99.95%" },
  ],
}

export function DashboardServiceList({
  heading = "Services",
  upLabel = "Operational",
  degradedLabel = "Degraded",
  downLabel = "Outage",
  services = [],
  className,
}: DashboardServiceListProps) {
  const labels: Record<Status, string> = {
    up: upLabel,
    degraded: degradedLabel,
    down: downLabel,
  }
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col gap-1 rounded-md border p-3 shadow-sm">
        <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">{heading}</span>
        <ul className="divide-border flex flex-col divide-y">
          {services.map((s) => (
            <li key={s.name} className="flex items-center justify-between gap-2 py-1.5">
              <div className="flex min-w-0 items-center gap-2">
                <span className="relative flex size-2" aria-hidden="true">
                  {s.status !== "down" && (
                    <span className={cn("absolute inset-0 animate-ping rounded-full opacity-60", DOT[s.status])} />
                  )}
                  <span className={cn("relative size-2 rounded-full", DOT[s.status])} />
                </span>
                <span className="text-card-foreground truncate text-xs font-medium">{s.name}</span>
                <span className="text-muted-foreground truncate text-xs">{labels[s.status]}</span>
              </div>
              <span className="text-card-foreground shrink-0 font-mono text-xs tabular-nums">{s.uptime}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
