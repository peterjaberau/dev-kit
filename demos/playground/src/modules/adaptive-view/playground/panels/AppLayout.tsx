import { useCallback, useEffect, useRef, useState } from "react"
import { useSettingsStore } from "../store/settings"
import { useSummonStore } from "../store/summon"
import { useGlobalRegionStore } from "../store/globalRegion"
import { exitMaximizedPanel, isUnclaimedEscape, toggleMaximizeActivePanel } from "../store/dockview"
import { saveRegionState } from "../lib/commands"
import { GlobalDock } from "./GlobalDock"
import { RepoDock } from "./RepoDock"

export function AppLayout() {
  const settings = useSettingsStore((s) => s.settings)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Load sizes + collapsed from settings once (drag state — don't re-apply later).
  const settingsLoaded = useRef(false)
  useEffect(() => {
    if (settingsLoaded.current || !settings) return
    settingsLoaded.current = true
  }, [settings])


 return (
   <div ref={containerRef}>
     <GlobalDock />
     <RepoDock />
   </div>
 )
}