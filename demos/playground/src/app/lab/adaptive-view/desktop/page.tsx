"use client"

import { Suspense, useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import AdaptiveViewDesktopSandbox from "#adaptive-view/sandbox/desktop"

function DesktopAdaptiveViewContent() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const dockviewProfileId = searchParams.get("layout")

  const onDockviewProfileChange = useCallback(
    (profileId: string | null) => {
      if (profileId === dockviewProfileId) return
      const nextParams = new URLSearchParams(searchParams.toString())
      if (profileId) nextParams.set("layout", profileId)
      else nextParams.delete("layout")
      const query = nextParams.toString()
      router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false })
    },
    [dockviewProfileId, pathname, router, searchParams],
  )

  return (
    <AdaptiveViewDesktopSandbox
      dockviewProfileId={dockviewProfileId}
      onDockviewProfileChange={onDockviewProfileChange}
    />
  )
}

export default function DesktopAdaptiveViewPage() {
  return (
    <Suspense fallback={null}>
      <DesktopAdaptiveViewContent />
    </Suspense>
  )
}
