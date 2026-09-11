import { useCallback, useEffect, useRef, useState } from "react"
import { usePanelFocusEffect } from "../PanelApiContext"
import { LinkIcon, UnlinkIcon, WarningIcon } from "../../icons"
import { useDelayedBusy } from "../shared/useDelayedBusy"
import { useRowDragReorder } from "../shared/useRowDragReorder"
import { useDelayedFlag } from "../shared/useDelayedFlag"
import { chakra, Card, Button, IconButton, HStack, EmptyState, Badge } from "@chakra-ui/react"

/** localStorage key for the line-height ↔ lane-width link toggle (default on). */
import type { RegionPlacement } from "../../lib/types"
import { notify } from "../../store/notifications"
import { Section, Row, FieldNote, SettingsGroup } from "./primitives"
import { ALL_PANELS, SUPPRESSIBLE_SUMMON_PANELS } from "../registry"

import { useSettingsStore } from "../../store/settings"

/** Global Settings panel — edits global-scope settings (DESIGN-v0.2.md §F.6). */
export function GlobalSettingsPanel() {
  return (
    <Card.Root>
      <Card.Body>
        <SettingsGroup id="appearance" title="Appearance" caption="How LeGit looks">
          <GeneralSection />
        </SettingsGroup>
        <SettingsGroup id="behavior" title="Behavior" caption="How LeGit acts">
          <AutoOpenPanelsSection />
        </SettingsGroup>
      </Card.Body>
    </Card.Root>
  )
}

// Shared column widths so the control column lines up across the separate
// General and Commits-graph grids (both start at the same left origin, so
// identical label + gutter columns make their inputs/buttons align vertically).
// Em-based: they scale with the grids' --fz-lg font size.
const SETTINGS_LABEL_COL = "10.5em"
const SETTINGS_GUTTER_COL = "1.9em" // matches the link IconButton width
const SETTINGS_GRID_COLS = `${SETTINGS_LABEL_COL} ${SETTINGS_GUTTER_COL} min-content max-content`

function GeneralSection() {
  const placement = useSettingsStore((s) => s.settings?.global_region_placement ?? "left")
  const setRegionPlacement = useSettingsStore((s) => s.setRegionPlacement)
  const { busy: saving, run } = useDelayedBusy()

  const selectPlacement = (p: RegionPlacement) => {
    if (p === placement) return
    void run(() => setRegionPlacement(p))
  }

  return (
    <Section title="General">
      <FieldNote>writes to: global settings — base UI size &amp; dock placement for all panels</FieldNote>
      <chakra.div
        css={{
          display: "grid",
          // label · gutter · control · range — shared shape/widths with Commits
          // graph so the control column aligns across the two sections.
          gridTemplateColumns: SETTINGS_GRID_COLS,
          gap: "6px 10px",
          alignItems: "center",
          marginTop: 8,
          width: "fit-content",
          fontSize: "lg",
        }}
      >
        <chakra.span color="fg.subtle" style={{ gridColumn: 1, gridRow: 1, whiteSpace: "nowrap" }}>
          Layout orientation
        </chakra.span>
        <chakra.div style={{ gridColumn: "3 / -1", gridRow: 1, display: "flex", gap: 8 }}>
          <Button
            size={"sm"}
            variant={placement === "top" ? "solid" : "outline"}
            disabled={saving}
            onClick={() => selectPlacement("top")}
          >
            Top / Bottom
          </Button>
          <Button
            size={"sm"}
            variant={placement === "left" ? "solid" : "outline"}
            disabled={saving}
            onClick={() => selectPlacement("left")}
          >
            Left / Right
          </Button>
        </chakra.div>
      </chakra.div>
    </Section>
  )
}

function NumberField({
  label,
  value,
  min,
  max,
  step = 1,
  disabled,
  onCommit,
  grid = false,
  row,
}: {
  label: string
  value: number
  min: number
  max: number
  /** Rounding granularity for committed values. Defaults to whole numbers. */
  step?: number
  disabled?: boolean
  onCommit: (value: number) => void
  /** Render as grid cells (label · input · range) via `display: contents`, so
   *  multiple fields align in a shared grid. Cells are placed at explicit
   *  columns 1/3/4 (column 2 is a gutter the caller uses for the link toggle). */
  grid?: boolean
  /** 1-based grid row for this field's cells (grid mode). */
  row?: number
}) {
  // Local draft so typing doesn't clamp/persist mid-edit.
  const [draft, setDraft] = useState(String(value))
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep the field in sync when the stored value changes elsewhere (e.g. Reset).
  useEffect(() => {
    setDraft(String(value))
  }, [value])

  const commit = (raw: string) => {
    const parsed = Number(raw)
    if (!Number.isFinite(parsed)) {
      setDraft(String(value))
      return
    }
    const snapped = Math.round(parsed / step) * step
    const clamped = Math.min(max, Math.max(min, snapped))
    setDraft(String(clamped))
    if (clamped !== value) onCommit(clamped)
  }

  // Commit on the native `change` event: it fires when the spinner arrows step
  // the value (so it applies immediately) and on blur/Enter, but not on every
  // typed keystroke — those only fire `input` (React onChange) and update the
  // draft. Reads `el.value` directly since the draft state update is async.
  const commitRef = useRef(commit)
  commitRef.current = commit
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    const onChangeNative = () => commitRef.current(el.value)
    el.addEventListener("change", onChangeNative)
    return () => el.removeEventListener("change", onChangeNative)
  }, [])

  const input = (
    <input
      ref={inputRef}
      type="number"
      min={min}
      max={max}
      step={step}
      value={draft}
      disabled={disabled}
      style={{ width: grid ? "5em" : 72, ...(grid ? { gridColumn: 3, gridRow: row } : {}) }}
      onChange={(e) => setDraft(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur()
      }}
    />
  )
  const range = (
    <chakra.span
      color="fg.subtle"
      css={{
        fontSize: "sm",
        fontVariantNumeric: "tabular-nums",
        ...(grid ? { gridColumn: 4, gridRow: row } : {}),
      }}
    >
      px ({min}–{max})
    </chakra.span>
  )

  if (grid) {
    // Cells participate in the parent grid at explicit columns (label 1,
    // input 3, range 4; column 2 is a gutter the caller uses for the link
    // toggle) so all fields align regardless of label length.
    return (
      <chakra.label style={{ display: "contents" }}>
        <chakra.span color="fg.subtle" css={{ gridColumn: 1, gridRow: row }}>
          {label}
        </chakra.span>
        {input}
        {range}
      </chakra.label>
    )
  }

  return (
    <chakra.label css={{ display: "flex", alignItems: "center", gap: 6, fontSize: "lg" }}>
      <chakra.span color={"fg.subtle"}>{label}</chakra.span>
      {input}
      {range}
    </chakra.label>
  )
}

/** Stable empty default so the store selector doesn't return a fresh array. */
const EMPTY_PANELS: string[] = []

function AutoOpenPanelsSection() {
  const suppressed = useSettingsStore((s) => s.settings?.suppressed_auto_open_panels ?? EMPTY_PANELS)
  const setSuppressed = useSettingsStore((s) => s.setSuppressedAutoOpenPanels)
  const { busy: saving, run } = useDelayedBusy()

  const titleFor = (id: string) => ALL_PANELS.find((p) => p.id === id)?.title ?? id

  const toggle = (id: string, autoOpen: boolean) => {
    // autoOpen = keep it in the auto-open set (not suppressed).
    const next = autoOpen
      ? suppressed.filter((p) => p !== id)
      : suppressed.includes(id)
        ? suppressed
        : [...suppressed, id]
    return run(() => setSuppressed(next))
  }

  return (
    <Section title="Auto-open panels">
      <FieldNote>writes to: global settings — applies to all repos</FieldNote>
      <FieldNote>
        When you click a commit, file, or hunk, LeGit opens the matching detail panel. Uncheck one to stop it popping
        open — it still updates live when you already have it open.
      </FieldNote>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
        {SUPPRESSIBLE_SUMMON_PANELS.map((id) => {
          const autoOpen = !suppressed.includes(id)
          return (
            <chakra.label
              key={id}
              css={{ display: "flex", alignItems: "center", gap: 6, fontSize: "lg", cursor: "pointer" }}
            >
              <input type="checkbox" checked={autoOpen} disabled={saving} onChange={() => toggle(id, !autoOpen)} />
              {titleFor(id)}
            </chakra.label>
          )
        })}
      </div>
    </Section>
  )
}
