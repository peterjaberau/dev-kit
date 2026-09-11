import * as React from "react"
import { useSandboxColors } from "#adaptive-view/sandbox/sandbox-manager/sandboxTheme"
import { UI } from "#adaptive-view/sandbox/desktop/constants"

export const Section: React.FC<{
  children: React.ReactNode
  alt?: boolean
}> = ({ children, alt }) => {
  const c = useSandboxColors()
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: alt ? c.bgAlt : c.bg,
        color: c.text,
        userSelect: "none",
        // Base UI font is sans; numbers opt into mono via `tnum`.
        fontFamily: UI,
        fontSize: 12,
        overflow: "hidden",
        boxSizing: "border-box",
        // Isolate each panel's layout + paint so a fast-ticking panel
        // (order book, tiles) doesn't invalidate the rest of the page.
        contain: "layout paint",
        // A distinct surface + hairline + top highlight so each panel
        // reads as its own card on the dockview frame, whatever theme
        // is active (panel backgrounds intentionally differ from the
        // dock's group background).
        border: `1px solid ${c.border}`,
        boxShadow: `inset 0 1px 0 ${c.isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)"}`,
      }}
    >
      {children}
    </div>
  )
}

export const SectionHeader: React.FC<{
  children: React.ReactNode
  pad?: string
}> = ({ children, pad = "9px 12px 8px" }) => {
  const c = useSandboxColors()
  return (
    <div
      style={{
        padding: pad,
        background: c.headerGrad,
        borderBottom: `1px solid ${c.border}`,
        boxShadow: c.shadow,
        flexShrink: 0,
        position: "relative",
        zIndex: 1,
      }}
    >
      {children}
    </div>
  )
}

export const SectionLabel: React.FC<{
  children: React.ReactNode
  right?: React.ReactNode
}> = ({ children, right }) => {
  const c = useSandboxColors()
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 10px",
        fontSize: 9.5,
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        color: c.textMuted,
        background: c.bgSubtle,
        borderBottom: `1px solid ${c.borderSubtle}`,
        borderTop: `1px solid ${c.borderSubtle}`,
        flexShrink: 0,
      }}
    >
      <span>{children}</span>
      {right != null && <span style={{ color: c.textFaint }}>{right}</span>}
    </div>
  )
}
