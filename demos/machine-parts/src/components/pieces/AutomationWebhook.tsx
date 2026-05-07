"use client"

import { Copy, Webhook } from "lucide-react"
import { cn } from "@/lib/utils"

interface AutomationWebhookProps {
  url?: string
  method?: "POST" | "GET" | "PUT" | "DELETE"
  lastReceived?: string
  secretSet?: boolean
  headerLabel?: string
  signedLabel?: string
  className?: string
}

const methodClasses = {
  POST: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  GET: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  PUT: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  DELETE: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
}

export const AutomationWebhookDemo: AutomationWebhookProps = {
  url: "https://hooks.beste.co/wf/8a2k4f1m9n",
  method: "POST",
  lastReceived: "Last event 14s ago",
  secretSet: true,
  headerLabel: "Webhook",
  signedLabel: "Signed",
}

export function AutomationWebhook({
  url = "https://example.com/webhook",
  method = "POST",
  lastReceived,
  secretSet,
  headerLabel = "Webhook",
  signedLabel = "Signed",
  className,
}: AutomationWebhookProps) {
  return (
    <div className={cn("relative flex size-full items-center justify-center p-4", className)}>
      <div className="border-border bg-card flex w-full max-w-80 flex-col gap-2 rounded-md border p-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <Webhook className="text-muted-foreground size-3.5" aria-hidden="true" />
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">{headerLabel}</span>
          {secretSet && (
            <span className="text-muted-foreground ml-auto inline-flex items-center gap-1 text-xs">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {signedLabel}
            </span>
          )}
        </div>
        <div className="border-border bg-muted/50 flex items-center gap-1.5 overflow-hidden rounded-sm border py-1 pl-1.5 pr-1">
          <span className={cn("shrink-0 rounded-sm px-1.5 py-0.5 font-mono text-xs font-bold", methodClasses[method])}>
            {method}
          </span>
          <span className="text-card-foreground flex-1 truncate font-mono text-xs">{url}</span>
          <button
            type="button"
            className="text-muted-foreground hover:bg-card hover:text-foreground flex size-6 shrink-0 items-center justify-center rounded-sm"
            aria-label="Copy URL"
          >
            <Copy className="size-3" />
          </button>
        </div>
        {lastReceived && (
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" aria-hidden="true" />
            {lastReceived}
          </div>
        )}
      </div>
    </div>
  )
}
