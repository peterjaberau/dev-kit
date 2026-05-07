"use client"

import { cn } from "@/lib/utils"

interface TravelTripStatStat {
  value: string
  label: string
}

interface TravelTripStatProps {
  year?: string
  stats?: TravelTripStatStat[]
  className?: string
}

export const TravelTripStatDemo: TravelTripStatProps = {
  year: "This year",
  stats: [
    { value: "18", label: "Countries" },
    { value: "42", label: "Flights" },
    { value: "96,240", label: "Miles" },
  ],
}

export function TravelTripStat({ year, stats = [], className }: TravelTripStatProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-72 flex-col gap-1.5 rounded-lg border p-2.5 shadow-sm">
        {year && <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">{year}</span>}
        <div className="grid grid-cols-3 gap-1.5">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-muted/60 flex flex-col gap-0.5 rounded-md px-2 py-1.5">
              <span className="text-card-foreground font-mono text-base font-bold tabular-nums">{stat.value}</span>
              <span className="text-muted-foreground text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
