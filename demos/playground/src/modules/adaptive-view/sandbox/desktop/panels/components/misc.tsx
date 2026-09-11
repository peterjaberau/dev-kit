import { useSandboxColors } from "#adaptive-view/sandbox/sandbox-manager/sandboxTheme"
import * as React from "react"

export const Chip: React.FC<{
  children: React.ReactNode
  tone?: "green" | "red" | "blue" | "yellow" | "neutral"
  solid?: boolean
}> = ({ children, tone = "neutral", solid }) => {
  const c = useSandboxColors()
  const map = {
    green: [c.green, c.greenBg],
    red: [c.red, c.redBg],
    blue: [c.blue, c.blueBg],
    yellow: [c.yellow, "rgba(250,204,21,0.12)"],
    neutral: [c.textMuted, c.chip],
  } as const
  const [fg, bg] = map[tone]
  // On a solid bright fill, dark text reads better on green/yellow, white on
  // red/blue/neutral, which keeps chips legible instead of low-contrast white.
  const solidText = tone === "green" || tone === "yellow" ? "#04060c" : "#ffffff"
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.04em",
        padding: "1px 5px",
        borderRadius: 3,
        textTransform: "uppercase",
        color: solid ? solidText : fg,
        background: solid ? fg : bg,
        border: solid ? "none" : `1px solid ${fg}33`,
        lineHeight: 1.5,
      }}
    >
      {children}
    </span>
  )
}

