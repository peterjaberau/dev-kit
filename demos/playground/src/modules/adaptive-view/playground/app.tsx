'use client'
import { useEffect, useState } from "react"
import { useLayoutsStore } from "./store/layouts"
import { useSettingsStore } from "./store/settings"
import { AppLayout } from "./panels/AppLayout"

type BootPhase = "init" | "repos" | "done"
const BOOT_SUBTITLE: Record<BootPhase, string> = {
  init: "Initiating…",
  repos: "restoring repositories…",
  done: "done…",
}

export const App = () => {
  const initSettings = useSettingsStore((s) => s.init)
  const initLayouts = useLayoutsStore((s) => s.init)
  const [bootPhase, setBootPhase] = useState<BootPhase>("init")

  useEffect(() => {
    (async () => {
      try {
        try {
          await initSettings()
        } finally {
        }
        setBootPhase("repos")
        initLayouts().catch((e) => console.warn("failed to load layouts", e))
      } finally {
        setBootPhase("done")
      }
    })()
  }, [initSettings, initLayouts])

  if (bootPhase !== "done") {
    return <div>{BOOT_SUBTITLE[bootPhase]}</div>
  }

  return <AppLayout />
}
