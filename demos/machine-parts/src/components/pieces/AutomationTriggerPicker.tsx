"use client"

import Image from "next/image"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface AutomationTriggerPickerApp {
  src: string
  alt: string
}

interface AutomationTriggerPickerProps {
  placeholder?: string
  heading?: string
  apps?: AutomationTriggerPickerApp[]
  className?: string
}

export const AutomationTriggerPickerDemo: AutomationTriggerPickerProps = {
  placeholder: "Search trigger apps",
  heading: "Popular",
  apps: [
    { src: "https://oud.pics/sm/l/stripe.jpeg", alt: "Stripe" },
    { src: "https://oud.pics/sm/l/gmail.jpeg", alt: "Gmail" },
    { src: "https://oud.pics/sm/l/slack.svg", alt: "Slack" },
    { src: "https://oud.pics/sm/l/notion.png", alt: "Notion" },
  ],
}

export function AutomationTriggerPicker({ placeholder = "Search", heading = "Popular", apps = [], className }: AutomationTriggerPickerProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col gap-2 rounded-md border p-3 shadow-sm">
        <div className="border-border flex items-center gap-2 rounded-sm border px-2 py-1.5">
          <Search className="text-muted-foreground size-3.5" aria-hidden="true" />
          <span className="text-muted-foreground flex-1 text-xs">{placeholder}</span>
          <kbd className="border-border bg-muted text-muted-foreground rounded-sm border px-1 font-mono text-xs">
            ⌘K
          </kbd>
        </div>
        <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">{heading}</span>
        <div className="grid grid-cols-4 gap-2">
          {apps.slice(0, 4).map((a, i) => (
            <button
              key={i}
              type="button"
              className="hover:border-border hover:bg-muted flex flex-col items-center gap-1 rounded-sm border border-transparent p-1.5 text-center"
            >
              <span className="bg-muted relative size-8 overflow-hidden rounded-md">
                <Image src={a.src} alt={a.alt} fill sizes="32px" className="object-cover" />
              </span>
              <span className="text-card-foreground max-w-full truncate text-xs">{a.alt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
