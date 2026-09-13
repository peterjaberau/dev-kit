"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import type { DockviewTheme } from "#adaptive-view/react"
import { useDesktop } from "./selectors"
import { useDesktopTheme, useDockviewTheme } from "./providers"
import { ControllerDockview, type ControllerDockviewProps, DesktopDesigner } from "./designer"
import "./styles/designer.css"
import "./styles/desktop.css"
import "./styles/dockview.css"

export interface DesktopRenderProps {
  theme: DockviewTheme
  onReady: () => void
  renderController: (controller: ControllerDockviewProps) => React.ReactNode
}

export interface DesktopProps {
  children: (props: DesktopRenderProps) => React.ReactNode
}

export default function Desktop({ children }: DesktopProps) {
  const { desktopRef, sendToDesktop, desktopContext } = useDesktop()
  const { desktopThemeName, desktopTheme } = useDesktopTheme()
  const { dockviewTheme, dockviewThemeContext, sendToDockviewTheme } = useDockviewTheme()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const syncingLayoutFromUrl = React.useRef(false)
  const frameRef = React.useRef<HTMLElement>(null)
  const previousCssOverrideKeys = React.useRef<string[]>([])
  const { desktopDesignerOpen, ready, selectedLayoutProfileId } = desktopContext.layout
  const urlLayoutProfileId = searchParams.get("layout")
  const themeMetadata = dockviewThemeContext.metadata.dockviewThemeMeta
  const selectedBaseTheme =
    dockviewThemeContext.presets.dockviewThemes.find(({ name }: any) => name === dockviewTheme.name) ?? dockviewTheme
  const desktopThemeVariables = React.useMemo(
    () =>
      Object.fromEntries(
        Object.entries(desktopTheme ?? {}).map(([key, value]) => [`--desktop-theme-${key}`, value]),
      ) as React.CSSProperties,
    [desktopTheme],
  )

  React.useEffect(() => {
    const currentProfileId = desktopRef.getSnapshot().context.layout.selectedLayoutProfileId
    if (currentProfileId !== urlLayoutProfileId) {
      syncingLayoutFromUrl.current = true
      sendToDesktop({ type: "onSelectLayoutProfile", params: { profileId: urlLayoutProfileId } })
    }
  }, [desktopRef, sendToDesktop, urlLayoutProfileId])

  React.useEffect(() => {
    if (syncingLayoutFromUrl.current) {
      if (selectedLayoutProfileId === urlLayoutProfileId) syncingLayoutFromUrl.current = false
      return
    }
    if (selectedLayoutProfileId === urlLayoutProfileId) return

    const nextParams = new URLSearchParams(searchParams.toString())
    if (selectedLayoutProfileId) nextParams.set("layout", selectedLayoutProfileId)
    else nextParams.delete("layout")
    const nextQuery = nextParams.toString()
    router.replace(`${pathname}${nextQuery ? `?${nextQuery}` : ""}`)
  }, [pathname, router, searchParams, selectedLayoutProfileId, urlLayoutProfileId])

  React.useEffect(() => {
    const dockviewRoot = frameRef.current?.querySelector<HTMLElement>('[class*="dockview-theme"]')
    if (!dockviewRoot) return

    for (const key of previousCssOverrideKeys.current) {
      if (!(key in dockviewTheme.cssOverrides)) dockviewRoot.style.removeProperty(key)
    }
    for (const [key, value] of Object.entries(dockviewTheme.cssOverrides)) {
      if (value !== undefined) dockviewRoot.style.setProperty(key, String(value))
    }
    previousCssOverrideKeys.current = Object.keys(dockviewTheme.cssOverrides)
  }, [dockviewTheme])

  const markReady = React.useCallback(() => sendToDesktop({ type: "onMarkReady" }), [sendToDesktop])

  return (
    <main
      className="adaptive-desktop"
      data-color-scheme={dockviewTheme.colorScheme ?? "dark"}
      data-desktop-theme={desktopThemeName}
      style={desktopThemeVariables}
    >
      <header className="adaptive-desktop__toolbar">
        <div className="adaptive-desktop__actions">
          <label>
            <span>Theme</span>
            <select
              value={dockviewTheme.name}
              onChange={(event) =>
                sendToDockviewTheme({
                  type: "onSelectDockviewTheme",
                  params: { dockviewTheme: event.target.value },
                })
              }
            >
              {themeMetadata.map((option: any) => (
                <option key={option.name} value={option.name}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className={desktopDesignerOpen ? "is-active" : ""}
            aria-pressed={desktopDesignerOpen}
            onClick={() => sendToDesktop({ type: "onToggleDesktopDesigner" })}
          >
            Controls &amp; Theme
          </button>
        </div>
      </header>

      <section ref={frameRef} className="adaptive-desktop__frame">
        {children({
          theme: dockviewTheme,
          onReady: markReady,
          renderController: (controller) => (
            <DesktopDesigner
              open={desktopDesignerOpen}
              onClose={() => sendToDesktop({ type: "onCloseDesktopDesigner" })}
              state={dockviewTheme}
              onChange={(patch) => sendToDockviewTheme({ type: "onUpdateDockviewTheme", params: { patch } })}
              onCssChange={(patch) => sendToDockviewTheme({ type: "onUpdateDockviewThemeCss", params: { patch } })}
              onReset={() => sendToDockviewTheme({ type: "onResetDockviewTheme" })}
              baseTheme={selectedBaseTheme}
              containerEl={frameRef.current}
              controller={<ControllerDockview {...controller} />}
            />
          ),
        })}

        <div
          className={`adaptive-desktop__loader${ready ? "is-ready" : ""}`}
          role="status"
          aria-label="Loading adaptive desktop"
          aria-hidden={ready}
        >
          <span />
        </div>
      </section>
    </main>
  )
}
