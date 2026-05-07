"use client"

import Image from "next/image"
import { ChevronDown, Mail, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface AutomationWorkflowNodeField {
  label: string
  value: string
}

interface AutomationWorkflowNodeProps {
  kind?: string
  app?: string
  event?: string
  image?: string
  alt?: string
  fields?: AutomationWorkflowNodeField[]
  configureLabel?: string
  className?: string
}

export const AutomationWorkflowNodeDemo: AutomationWorkflowNodeProps = {
  kind: "Action",
  app: "Gmail",
  event: "Send email",
  image: "https://oud.pics/sm/l/gmail.jpeg",
  alt: "Gmail",
  configureLabel: "Configure",
  fields: [
    { label: "To", value: "{{customer.email}}" },
    { label: "Subject", value: "Your receipt is ready" },
    { label: "Template", value: "receipt-v3" },
  ],
}

export function AutomationWorkflowNode({
  kind = "Step",
  app = "App",
  event = "Event",
  image,
  alt,
  fields = [],
  configureLabel = "Configure",
  className,
}: AutomationWorkflowNodeProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col overflow-hidden rounded-md border shadow-sm">
        <div className="border-border flex items-center gap-2 border-b px-3 py-2">
          {image ? (
            <span className="bg-muted relative size-7 shrink-0 overflow-hidden rounded-md">
              <Image src={image} alt={alt ?? app} fill sizes="28px" className="object-cover" />
            </span>
          ) : (
            <span
              className="bg-muted-foreground text-background flex size-7 shrink-0 items-center justify-center rounded-md"
              aria-hidden="true"
            >
              <Mail className="size-3.5" />
            </span>
          )}
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">{kind}</span>
            <span className="text-card-foreground truncate text-sm font-semibold">
              {app} · {event}
            </span>
          </div>
          <button type="button" className="text-muted-foreground hover:text-foreground" aria-label="More">
            <MoreVertical className="size-4" />
          </button>
        </div>
        <div className="flex flex-col">
          {fields.map((f, i) => (
            <div
              key={i}
              className="border-border flex items-center justify-between gap-2 border-t px-3 py-1.5 first:border-t-0"
            >
              <span className="text-muted-foreground text-xs">{f.label}</span>
              <span className="text-card-foreground truncate font-mono text-xs">{f.value}</span>
            </div>
          ))}
          <div className="border-border bg-muted/40 text-muted-foreground flex items-center justify-center gap-1 border-t py-1.5 text-xs">
            <ChevronDown className="size-3" aria-hidden="true" />
            <span>{configureLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
