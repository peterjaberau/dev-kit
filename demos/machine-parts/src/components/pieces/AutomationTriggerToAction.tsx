"use client"

import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import { ArrowDown, Calendar, CreditCard, FileText, GitBranch, Hash, Mail, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

type AppPreset = "slack" | "gmail" | "stripe" | "calendar" | "github" | "notion" | "discord"

interface AutomationTriggerToActionStep {
  preset?: AppPreset
  src?: string
  alt?: string
  event: string
}

interface AutomationTriggerToActionProps {
  trigger?: AutomationTriggerToActionStep
  action?: AutomationTriggerToActionStep
  triggerLabel?: string
  actionLabel?: string
  className?: string
}

const APPS: Record<AppPreset, { label: string; icon: LucideIcon; tile: string }> = {
  slack: { label: "Slack", icon: Hash, tile: "bg-violet-500 text-white" },
  gmail: { label: "Gmail", icon: Mail, tile: "bg-rose-500 text-white" },
  stripe: {
    label: "Stripe",
    icon: CreditCard,
    tile: "bg-indigo-500 text-white",
  },
  calendar: {
    label: "Calendar",
    icon: Calendar,
    tile: "bg-sky-500 text-white",
  },
  github: {
    label: "GitHub",
    icon: GitBranch,
    tile: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
  },
  notion: {
    label: "Notion",
    icon: FileText,
    tile: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
  },
  discord: {
    label: "Discord",
    icon: MessageSquare,
    tile: "bg-indigo-600 text-white",
  },
}

export const AutomationTriggerToActionDemo: AutomationTriggerToActionProps = {
  triggerLabel: "When",
  actionLabel: "Then",
  trigger: {
    src: "https://oud.pics/sm/l/stripe.jpeg",
    alt: "Stripe",
    event: "Payment received",
  },
  action: {
    src: "https://oud.pics/sm/l/slack.svg",
    alt: "Slack",
    event: "Send #revenue alert",
  },
}

function Tile({ step }: { step: AutomationTriggerToActionStep }) {
  if (step.src) {
    return (
      <span className="bg-muted relative size-9 shrink-0 overflow-hidden rounded-md">
        <Image src={step.src} alt={step.alt ?? ""} fill sizes="36px" className="object-cover" />
      </span>
    )
  }
  if (step.preset) {
    const cfg = APPS[step.preset]
    const Icon = cfg.icon
    return (
      <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-md", cfg.tile)} aria-hidden="true">
        <Icon className="size-4" />
      </span>
    )
  }
  return <span className="bg-muted size-9 shrink-0 rounded-md" aria-hidden="true" />
}

function labelFor(step: AutomationTriggerToActionStep) {
  if (step.alt) return step.alt
  if (step.preset) return APPS[step.preset].label
  return "App"
}

function Row({ kind, step }: { kind: string; step: AutomationTriggerToActionStep }) {
  return (
    <div className="border-border flex items-center gap-2 rounded-md border p-2">
      <Tile step={step} />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">{kind}</span>
          <span className="text-card-foreground truncate text-xs font-semibold">{labelFor(step)}</span>
        </div>
        <span className="text-muted-foreground truncate text-xs">{step.event}</span>
      </div>
    </div>
  )
}

export function AutomationTriggerToAction({
  trigger = { preset: "slack", event: "Trigger event" },
  action = { preset: "gmail", event: "Action event" },
  triggerLabel = "When",
  actionLabel = "Then",
  className,
}: AutomationTriggerToActionProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col gap-1 rounded-md border p-3 shadow-sm">
        <Row kind={triggerLabel} step={trigger} />
        <div className="flex items-center justify-center py-0.5">
          <span
            className="border-border bg-muted flex size-5 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <ArrowDown className="text-muted-foreground size-3" />
          </span>
        </div>
        <Row kind={actionLabel} step={action} />
      </div>
    </div>
  )
}
