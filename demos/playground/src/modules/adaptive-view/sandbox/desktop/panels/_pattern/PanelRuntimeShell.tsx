import { PanelDefinition, PanelSettingsContext, PanelInstanceSnapshot } from "./types"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ensurePanelConfig, usePanelConfig, setPanelConfig, getPanelConfig, removePanelConfig } from "./panelConfigStore"
import { upsertPanelState, removePanelState } from "./panelStateRegistry"
import { registerPanelActions, unregisterPanelActions } from "./panelActionRegistry"
import { registerPanelSettings, unregisterPanelSettings } from "./panelSettingsRegistry"
import { PanelErrorBoundary } from "./PanelErrorBoundary"

interface PanelRuntimeShellProps {
  panelId: string
  panelTitle: string
  definition: PanelDefinition
  initialConfig: any
  onDuplicate: (panelId: string) => void
  onClose: (panelId: string) => void
  /** Preserved internal panel type (when id's prefix differs from internal type). */
  systemType?: string
  /** Preserved unknown internal config fields for round-trip export. */
  extras?: Record<string, unknown>
}

export function PanelRuntimeShell({
  panelId,
  panelTitle,
  definition,
  initialConfig,
  onDuplicate,
  onClose,
  systemType,
  extras,
}: PanelRuntimeShellProps): React.ReactElement {
  // Seed the config store with our initial value (idempotent across strict-mode
  // double mounts) and read back the live value so external edits (e.g. from
  // the Sidebar) trigger re-renders via `useSyncExternalStore`.
  useMemo(() => ensurePanelConfig(panelId, initialConfig), [panelId, initialConfig])
  const storeConfig = usePanelConfig(panelId)
  const config = storeConfig !== undefined ? storeConfig : initialConfig

  const [resetKey, setResetKey] = useState(0)

  const setConfig = useCallback<PanelSettingsContext["setConfig"]>(
    (next) => {
      // Read the freshest value from the store so functional updates see
      // changes that may have happened since the last render.
      const prev = getPanelConfig(panelId) ?? initialConfig
      const resolved: any = typeof next === "function" ? (next as (p: any) => any)(prev) : next
      setPanelConfig(panelId, resolved)
    },
    [initialConfig, panelId],
  )

  // Keep the panel state registry in sync so layout export / sidebar lookups
  // see the current config + title. Cleared on unmount.
  useEffect(() => {
    const snapshot: PanelInstanceSnapshot = {
      id: panelId,
      type: definition.type,
      title: panelTitle,
      config,
      configVersion: definition.configSchema.version,
      systemType,
      extras,
    }
    upsertPanelState(snapshot)
  }, [config, definition.configSchema.version, definition.type, extras, systemType, panelId, panelTitle])

  useEffect(() => {
    return () => {
      removePanelState(panelId)
      removePanelConfig(panelId)
    }
  }, [panelId])

  useEffect(() => {
    if (definition.type !== "JointStatePlot") return
    console.warn(
      `[panelview] JointStatePlot panel "${panelId}" is deprecated and will be removed in the next version. ` +
        "Please use the Plot panel for joint state visualization.",
    )
  }, [definition.type, panelId])

  const resetPanel = useCallback((): void => {
    setPanelConfig(panelId, definition.createDefaultConfig())
    setResetKey((value) => value + 1)
  }, [definition, panelId])

  const handleCopyPanelId = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(panelId)
    } catch (error) {
      console.warn("Failed to copy panel id", error)
    }
  }, [panelId])

  const handleDuplicate = useCallback(() => onDuplicate(panelId), [onDuplicate, panelId])
  const handleClose = useCallback(() => onClose(panelId), [onClose, panelId])

  // Register the action handlers so `PanelTabHeader` can invoke them from a
  // different subtree. Re-register on every relevant dep change.
  useEffect(() => {
    registerPanelActions(panelId, {
      hasSettings: definition.renderSettings != null,
      openSettingsSidebar: () => {
        // useSidebarStore.getState().openSettingsFor(panelId)
      },
      resetPanel,
      copyPanelId: () => {
        void handleCopyPanelId()
      },
      duplicatePanel: handleDuplicate,
      closePanel: handleClose,
    })
    return () => {
      unregisterPanelActions(panelId)
    }
  }, [definition.renderSettings, handleCopyPanelId, handleClose, handleDuplicate, panelId, resetPanel])

  // Register the settings renderer so the sidebar can render it when this
  // panel is active. We pass a thunk that closes over the *latest* deps via
  // `useEffect`'s dep array.
  useEffect(() => {
    if (definition.renderSettings == null) {
      return
    }
    const renderer = definition.renderSettings
    registerPanelSettings(panelId, (ctx: any) => renderer(ctx as unknown as PanelSettingsContext))
    return () => {
      unregisterPanelSettings(panelId)
    }
  }, [definition, panelId])

  return (
    <PanelErrorBoundary panelName={definition.type} panelId={panelId} onReset={resetPanel}>
      <div key={resetKey} className="h-full min-h-0 w-full overflow-hidden">
        {definition.render({
          panelId,
          panelTitle,
          config,
          setConfig,
          resetPanel,
        })}
      </div>
    </PanelErrorBoundary>
  )
}
