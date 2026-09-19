"use client"

import * as React from "react"
import type { DockviewTheme } from "#adaptive-view/react"
import { useDesktop } from "./selectors"
import { useDesktopTheme, useDockviewTheme } from "./providers"
import { ControllerDockview, DesktopDesigner } from "./designer"
import "./styles/designer.css"
import "./styles/desktop.css"
import "./styles/dockview.css"

export interface DesktopRenderProps {
  theme: DockviewTheme
  renderController: () => React.ReactNode
}

export interface DesktopProps {
  children: (props: DesktopRenderProps) => React.ReactNode
}

export default function Desktop({ children }: DesktopProps) {
  const { sendToDesktop, desktopContext, isReady } = useDesktop()
  const { desktopThemeName, desktopTheme } = useDesktopTheme()
  const { dockviewTheme, dockviewThemeContext, sendToDockviewTheme } = useDockviewTheme()
  const frameRef = React.useRef<HTMLElement>(null)
  const previousCssOverrideKeys = React.useRef<string[]>([])
  const { desktopDesignerOpen } = desktopContext.layout
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
          renderController: () => (
            <DesktopDesigner
              open={desktopDesignerOpen}
              onClose={() => sendToDesktop({ type: "onCloseDesktopDesigner" })}
              state={dockviewTheme}
              onChange={(patch) => sendToDockviewTheme({ type: "onUpdateDockviewTheme", params: { patch } })}
              onCssChange={(patch) => sendToDockviewTheme({ type: "onUpdateDockviewThemeCss", params: { patch } })}
              onReset={() => sendToDockviewTheme({ type: "onResetDockviewTheme" })}
              baseTheme={selectedBaseTheme}
              containerEl={frameRef.current}
              controller={<ControllerDockview />}
            />
          ),
        })}

        <div
          className={`adaptive-desktop__loader${isReady ? "is-ready" : ""}`}
          role="status"
          aria-label="Loading adaptive desktop"
          aria-hidden={isReady}
        >
          <span />
        </div>
      </section>
    </main>
  )
}
