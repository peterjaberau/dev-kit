"use client"

import { Plane } from "lucide-react"
import { cn } from "@/lib/utils"

interface Segment {
  depart: string
  departCode: string
  arrive: string
  arriveCode: string
  duration: string
}

interface TravelTripSegmentProps {
  segments?: Segment[]
  layover?: string
  className?: string
}

export const TravelTripSegmentDemo: TravelTripSegmentProps = {
  segments: [
    {
      depart: "09:40",
      departCode: "IST",
      arrive: "12:20",
      arriveCode: "CDG",
      duration: "3h 40m",
    },
    {
      depart: "14:50",
      departCode: "CDG",
      arrive: "17:05",
      arriveCode: "LHR",
      duration: "1h 15m",
    },
  ],
  layover: "2h 30m layover in Paris",
}

export function TravelTripSegment({ segments = [], layover, className }: TravelTripSegmentProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col gap-2 rounded-lg border p-3 shadow-sm">
        {segments.map((seg, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3 text-xs">
              <div className="flex flex-col">
                <span className="text-card-foreground font-mono font-semibold">{seg.depart}</span>
                <span className="text-muted-foreground">{seg.departCode}</span>
              </div>
              <div className="text-muted-foreground flex flex-1 items-center gap-1">
                <span className="border-border h-px flex-1 border-t border-dashed" aria-hidden="true" />
                <Plane className="size-3" aria-hidden="true" />
                <span className="border-border h-px flex-1 border-t border-dashed" aria-hidden="true" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-card-foreground font-mono font-semibold">{seg.arrive}</span>
                <span className="text-muted-foreground">{seg.arriveCode}</span>
              </div>
            </div>
            <span className="text-muted-foreground text-xs">{seg.duration}</span>
            {idx < segments.length - 1 && layover && (
              <div className="bg-muted/60 text-muted-foreground flex items-center gap-2 rounded-md px-2 py-1 text-xs">
                <span className="size-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                {layover}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
