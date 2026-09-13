import * as React from "react"
import { DockviewTheme } from "#adaptive-view/react"
import { LM, DockviewThemeState, DockviewThemeCssOverrides, generateDockviewThemeCodeSnippet } from "./theme-utils"
import { ToggleRow } from "./toggle-row"
import { Card, Slider, Field, inputStyle, Btn } from "./designer-kit"

// Collapsible section card. Thin wrapper over the kit `Card` so the many
// `<Section>` call sites below stay tidy; each maps a subject to an icon chip.
const Section = (props: { title: string; icon?: string; defaultOpen?: boolean; children: React.ReactNode }) => (
  <Card title={props.title} icon={props.icon ?? "tune"} defaultOpen={props.defaultOpen ?? false}>
    {props.children}
  </Card>
)

// Numeric slider. The kit `Slider` already matches this call signature.
const SliderRow = Slider

const TextRow = (props: {
  label: string
  varName?: keyof DockviewThemeCssOverrides
  value: string
  containerEl?: HTMLElement | null
  themeKey?: string
  onChange: (v: string) => void
}) => {
  const [computed, setComputed] = React.useState("")

  React.useEffect(() => {
    if (!props.varName || !props.containerEl) return
    const id = requestAnimationFrame(() => {
      const dvRoot = props.containerEl!.querySelector('[class*="dockview-theme"]') as HTMLElement | null
      if (!dvRoot) return
      setComputed(getComputedStyle(dvRoot).getPropertyValue(props.varName!).trim())
    })
    return () => cancelAnimationFrame(id)
  }, [props.containerEl, props.varName, props.themeKey])

  const displayed = props.value || computed

  return (
    <Field label={props.label}>
      <input
        type="text"
        className="dv-designer-input"
        value={displayed}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="inherit"
        style={{
          ...inputStyle,
          color: props.value ? LM.text : LM.faint,
        }}
      />
    </Field>
  )
}

const isHexColor = (v: string) => /^#[0-9a-fA-F]{6}$/.test(v)

const ColorRow = (props: {
  label: string
  varName: keyof DockviewThemeCssOverrides
  value: string
  onChange: (v: string) => void
  containerEl: HTMLElement | null
  themeKey: string
}) => {
  const [placeholder, setPlaceholder] = React.useState("")

  React.useEffect(() => {
    if (!props.containerEl) return
    const id = requestAnimationFrame(() => {
      const dvRoot = props.containerEl!.querySelector('[class*="dockview-theme"]') as HTMLElement | null
      if (!dvRoot) return
      setPlaceholder(getComputedStyle(dvRoot).getPropertyValue(props.varName).trim())
    })
    return () => cancelAnimationFrame(id)
  }, [props.containerEl, props.varName, props.themeKey])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 2px",
      }}
    >
      <input
        type="color"
        value={isHexColor(props.value) ? props.value : isHexColor(placeholder) ? placeholder : "#000000"}
        onChange={(e) => props.onChange(e.target.value)}
        style={{
          width: 26,
          height: 26,
          padding: 2,
          border: `1px solid ${LM.border}`,
          borderRadius: LM.radiusChip,
          cursor: "pointer",
          background: LM.inputBg,
          flexShrink: 0,
        }}
        title="Pick color"
      />
      <span
        style={{
          flex: 1,
          fontSize: 12,
          color: LM.text,
          fontFamily: LM.ui,
        }}
      >
        {props.label}
      </span>
      <input
        type="text"
        className="dv-designer-input"
        value={props.value || placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        style={{
          ...inputStyle,
          width: 104,
          flexShrink: 0,
          color: props.value ? LM.text : LM.faint,
        }}
      />
      {props.value && (
        <button
          onClick={() => props.onChange("")}
          style={{
            background: "none",
            border: "none",
            color: LM.faint,
            cursor: "pointer",
            padding: "0 2px",
            fontSize: 15,
            lineHeight: 1,
            flexShrink: 0,
          }}
          title="Reset to theme default"
        >
          ×
        </button>
      )}
    </div>
  )
}

export const DesignerDockviewTheme = (props: {
  state: DockviewThemeState
  onChange: (patch: Partial<DockviewThemeState>) => void
  onCssChange: (patch: Partial<DockviewThemeCssOverrides>) => void
  baseTheme: DockviewTheme
  containerEl: HTMLElement | null
}) => {
  const [themeDefaults, setThemeDefaults] = React.useState<Record<string, number>>({})

  React.useEffect(() => {
    if (!props.containerEl) return
    const read = () => {
      const dvRoot = props.containerEl!.querySelector('[class*="dockview-theme"]') as HTMLElement | null
      if (!dvRoot) return
      const val = (v: string, fb: number) => parseInt(getComputedStyle(dvRoot).getPropertyValue(v)) || fb
      const fval = (v: string, fb: number) => parseFloat(getComputedStyle(dvRoot).getPropertyValue(v)) || fb
      setThemeDefaults({
        "--dv-tabs-and-actions-container-height": val("--dv-tabs-and-actions-container-height", 35),
        "--dv-tabs-and-actions-container-font-size": val("--dv-tabs-and-actions-container-font-size", 13),
        "--dv-border-radius": val("--dv-border-radius", 0),
        "--dv-spacing-padding": val("--dv-spacing-padding", 0),
        "--dv-tab-border-radius": val("--dv-tab-border-radius", 0),
        "--dv-sash-border-radius": val("--dv-sash-border-radius", 0),
        "--dv-floating-group-dragging-opacity": fval("--dv-floating-group-dragging-opacity", 0.5),
      })
    }
    const id = requestAnimationFrame(read)
    return () => cancelAnimationFrame(id)
  }, [props.containerEl, props.baseTheme])

  const [showExport, setShowExport] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const css = props.state.cssOverrides

  const set = (patch: Partial<DockviewThemeCssOverrides>) => props.onCssChange(patch)

  const computedVar = (varName: string, fallback: number): number => {
    const override = css[varName as keyof DockviewThemeCssOverrides]
    if (override !== undefined && override !== "") return parseInt(override) || fallback
    return themeDefaults[varName] ?? fallback
  }

  const draggingOpacity =
    css["--dv-floating-group-dragging-opacity"] !== undefined
      ? parseFloat(css["--dv-floating-group-dragging-opacity"])
      : (themeDefaults["--dv-floating-group-dragging-opacity"] ?? 0.5)

  const tabH = computedVar("--dv-tabs-and-actions-container-height", 35)
  const tabFs = computedVar("--dv-tabs-and-actions-container-font-size", 13)
  const borderRadius = computedVar("--dv-border-radius", 0)
  const spacingPadding = computedVar("--dv-spacing-padding", 0)
  const tabBorderRadius = computedVar("--dv-tab-border-radius", 0)
  const sashBorderRadius = computedVar("--dv-sash-border-radius", 0)

  const code = generateDockviewThemeCodeSnippet(props.baseTheme, props.state)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const colorRow = (label: string, varName: keyof DockviewThemeCssOverrides) => (
    <ColorRow
      key={varName}
      label={label}
      varName={varName}
      value={css[varName] ?? ""}
      onChange={(v) => set({ [varName]: v || undefined } as Partial<DockviewThemeCssOverrides>)}
      containerEl={props.containerEl}
      themeKey={props.baseTheme.name}
    />
  )

  return (
    <>
      {/* Layout */}
      <Section title="Layout" icon="space_dashboard" defaultOpen>
        <SliderRow label="Gap" value={props.state.gap} min={0} max={20} onChange={(v) => props.onChange({ gap: v })} />
        <SliderRow
          label="Spacing Padding"
          value={spacingPadding}
          min={0}
          max={30}
          unit="px"
          onChange={(v) =>
            set({
              "--dv-spacing-padding": `${v}px`,
            })
          }
        />
        <SliderRow
          label="Tab Bar Height"
          value={tabH}
          min={20}
          max={60}
          unit="px"
          onChange={(v) =>
            set({
              "--dv-tabs-and-actions-container-height": `${v}px`,
            })
          }
        />
        <SliderRow
          label="Font Size"
          value={tabFs}
          min={10}
          max={18}
          unit="px"
          onChange={(v) =>
            set({
              "--dv-tabs-and-actions-container-font-size": `${v}px`,
            })
          }
        />
      </Section>

      {/* Radius */}
      <Section title="Radius" icon="rounded_corner" defaultOpen>
        <SliderRow
          label="Border Radius"
          value={borderRadius}
          min={0}
          max={20}
          unit="px"
          onChange={(v) =>
            set({
              "--dv-border-radius": `${v}px`,
            })
          }
        />
        <SliderRow
          label="Tab Border Radius"
          value={tabBorderRadius}
          min={0}
          max={20}
          unit="px"
          onChange={(v) =>
            set({
              "--dv-tab-border-radius": `${v}px`,
            })
          }
        />
        <SliderRow
          label="Sash Border Radius"
          value={sashBorderRadius}
          min={0}
          max={20}
          unit="px"
          onChange={(v) =>
            set({
              "--dv-sash-border-radius": `${v}px`,
            })
          }
        />
      </Section>

      {/* Tabs & Groups */}
      <Section title="Tabs & Groups" icon="tab">
        <ToggleRow
          label="Tab Animation"
          value={props.state.tabAnimation}
          options={[
            { value: "default", label: "default" },
            { value: "smooth", label: "smooth" },
          ]}
          onChange={(v) =>
            props.onChange({
              tabAnimation: v as "smooth" | "default",
            })
          }
        />
        <ToggleRow
          label="Group Indicator"
          value={props.state.tabGroupIndicator}
          options={[
            { value: "wrap", label: "wrap" },
            { value: "none", label: "none" },
          ]}
          onChange={(v) =>
            props.onChange({
              tabGroupIndicator: v as "wrap" | "none",
            })
          }
        />
      </Section>

      {/* DnD */}
      <Section title="Drag & Drop" icon="drag_pan">
        <ToggleRow
          label="DnD Overlay"
          value={props.state.dndOverlayMounting}
          options={[
            {
              value: "relative",
              label: "relative",
            },
            {
              value: "absolute",
              label: "absolute",
            },
          ]}
          onChange={(v) =>
            props.onChange({
              dndOverlayMounting: v as "relative" | "absolute",
            })
          }
        />
        <ToggleRow
          label="DnD Panel Target"
          value={props.state.dndPanelOverlay}
          options={[
            { value: "content", label: "content" },
            { value: "group", label: "group" },
          ]}
          onChange={(v) =>
            props.onChange({
              dndPanelOverlay: v as "content" | "group",
            })
          }
        />
        <ToggleRow
          label="Tab Indicator"
          value={props.state.dndTabIndicator}
          options={[
            { value: "fill", label: "fill" },
            { value: "line", label: "line" },
          ]}
          onChange={(v) =>
            props.onChange({
              dndTabIndicator: v as "fill" | "line",
            })
          }
        />
        {colorRow("Drag-over bg", "--dv-drag-over-background-color")}
        <TextRow
          label="Drag-over border"
          varName="--dv-drag-over-border"
          value={props.state.dndOverlayBorder}
          containerEl={props.containerEl}
          themeKey={props.baseTheme.name}
          onChange={(v) => props.onChange({ dndOverlayBorder: v })}
        />
      </Section>

      {/* Backgrounds */}
      <Section title="Backgrounds" icon="format_color_fill">
        {colorRow("Panel background", "--dv-group-view-background-color")}
        {colorRow("Tab bar background", "--dv-tabs-and-actions-container-background-color")}
        {colorRow("Separator", "--dv-separator-border")}
        {colorRow("Pane header border", "--dv-paneview-header-border-color")}
      </Section>

      {/* Active Group Tabs */}
      <Section title="Active Group Tabs" icon="palette">
        {colorRow("Visible tab bg", "--dv-activegroup-visiblepanel-tab-background-color")}
        {colorRow("Hidden tab bg", "--dv-activegroup-hiddenpanel-tab-background-color")}
        {colorRow("Visible tab text", "--dv-activegroup-visiblepanel-tab-color")}
        {colorRow("Hidden tab text", "--dv-activegroup-hiddenpanel-tab-color")}
      </Section>

      {/* Inactive Group Tabs */}
      <Section title="Inactive Group Tabs" icon="palette">
        {colorRow("Visible tab bg", "--dv-inactivegroup-visiblepanel-tab-background-color")}
        {colorRow("Hidden tab bg", "--dv-inactivegroup-hiddenpanel-tab-background-color")}
        {colorRow("Visible tab text", "--dv-inactivegroup-visiblepanel-tab-color")}
        {colorRow("Hidden tab text", "--dv-inactivegroup-hiddenpanel-tab-color")}
      </Section>

      {/* Chrome */}
      <Section title="Chrome" icon="contrast">
        {colorRow("Tab divider", "--dv-tab-divider-color")}
        {colorRow("Icon hover bg", "--dv-icon-hover-background-color")}
        {colorRow("Active sash", "--dv-active-sash-color")}
        {colorRow("Sash", "--dv-sash-color")}
        {colorRow("Scrollbar", "--dv-scrollbar-background-color")}
      </Section>

      {/* Floating */}
      <Section title="Floating" icon="flip_to_front">
        <Slider
          label="Dragging Opacity"
          value={draggingOpacity}
          min={0}
          max={1}
          step={0.05}
          format={(v) => v.toFixed(2)}
          onChange={(v) =>
            set({
              "--dv-floating-group-dragging-opacity": String(v),
            })
          }
        />
        <TextRow
          label="Group Border"
          varName="--dv-floating-group-border"
          value={css["--dv-floating-group-border"] ?? ""}
          containerEl={props.containerEl}
          themeKey={props.baseTheme.name}
          onChange={(v) =>
            set({
              "--dv-floating-group-border": v || undefined,
            })
          }
        />
        <TextRow
          label="Box Shadow"
          varName="--dv-floating-box-shadow"
          value={css["--dv-floating-box-shadow"] ?? ""}
          containerEl={props.containerEl}
          themeKey={props.baseTheme.name}
          onChange={(v) =>
            set({
              "--dv-floating-box-shadow": v || undefined,
            })
          }
        />
        <TextRow
          label="Border"
          varName="--dv-floating-border"
          value={css["--dv-floating-border"] ?? ""}
          containerEl={props.containerEl}
          themeKey={props.baseTheme.name}
          onChange={(v) =>
            set({
              "--dv-floating-border": v || undefined,
            })
          }
        />
      </Section>

      {/* Export */}
      <Section title="Export" icon="code">
        <div style={{ padding: "4px 0" }}>
          <Btn
            onClick={() => setShowExport((v) => !v)}
            icon={showExport ? "visibility_off" : "visibility"}
            style={{
              marginBottom: showExport ? 8 : 0,
            }}
          >
            {showExport ? "Hide" : "Show"} code
          </Btn>
          {showExport && (
            <div>
              <pre
                className="dv-trade-scroll"
                style={{
                  background: LM.inputBg,
                  border: `1px solid ${LM.border}`,
                  borderRadius: LM.radiusSm,
                  padding: "8px 10px",
                  fontSize: 10.5,
                  color: LM.muted,
                  overflow: "auto",
                  fontFamily: LM.mono,
                  whiteSpace: "pre",
                  margin: 0,
                  maxHeight: 240,
                }}
              >
                {code}
              </pre>
              <Btn
                onClick={handleCopy}
                primary={copied}
                icon={copied ? "check" : "content_copy"}
                style={{
                  marginTop: 6,
                  width: "100%",
                }}
              >
                {copied ? "Copied!" : "Copy to clipboard"}
              </Btn>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
