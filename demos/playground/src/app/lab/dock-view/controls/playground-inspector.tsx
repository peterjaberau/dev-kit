"use client"

import { useEffect, useState } from "react"
import { Box, HStack, Text } from "@chakra-ui/react"
import { usePlaygroundController } from "./use-playground-controller"
import {
  InspectorAccordion as AccordionRoot,
  InspectorAccordionItem as AccordionItem,
  InspectorButton as Button,
  InspectorButtonGroup as ButtonGroup,
  InspectorField as Field,
  InspectorInput as Input,
  InspectorNumberInput as NumberInput,
  InspectorSelect as Select,
  InspectorSwitch as SwitchInput,
} from "./playground-inspector-controls"

const DIRECTIONS: any[] = [
  { value: "right", label: "Right" },
  { value: "left", label: "Left" },
  { value: "bottom", label: "Down" },
  { value: "top", label: "Up" },
]

export function PlaygroundInspector() {
  const {
    panels,
    selectedPanelId,
    selectedTabId,
    panel,
    tab,
    global,
    themeId,
    themes,
    presets,
    presetId,
    hasSaved,
    copied,
    error,
    send,
  } = usePlaygroundController()
  const [splitDir, setSplitDir] = useState<any>("right")
  useEffect(() => {
    send({ type: "inspector.mount" })
  }, [send])
  const onSelectPanel = (id: string) => send({ type: "inspector.selectPanel", id })
  const onSelectTab = (id: string) => send({ type: "inspector.selectTab", id })
  const onGlobalChange = (patch: any) => send({ type: "inspector.global", patch })
  const onThemeChange = (id: string) => send({ type: "inspector.theme", id })
  const panelOptions = panels.map((p: any) => ({
    value: p.id,
    label: `${p.tabs[0]?.title ?? p.id} · ${p.kindLabel}`,
  }))
  const tabOptions = (panel?.tabs ?? []).map((t: any) => ({
    value: t.id,
    label: t.title,
  }))
  const moveTargets = panels
    .filter((p) => p.id !== selectedPanelId)
    .map((p: any) => ({ value: p.id, label: `${p.tabs[0]?.title ?? p.id}` }))

  const patchPanel = (patch: any) => send({ type: "inspector.patchPanel", patch })
  const addTab = () => send({ type: "inspector.addTab" })
  const splitPanel = () => send({ type: "inspector.splitPanel", direction: splitDir })
  const removePanel = () => send({ type: "inspector.removePanel" })
  const reset = () => send({ type: "inspector.reset" })
  const loadPreset = (id: string) => send({ type: "inspector.preset", id })
  const saveLayout = () => send({ type: "inspector.save" })
  const restoreLayout = () => send({ type: "inspector.restore" })
  const exportLayout = () => send({ type: "inspector.export" })
  const toggleMaximize = () => send({ type: "inspector.maximizePanel" })
  const toggleFloat = () => send({ type: "inspector.floatPanel" })
  const togglePopout = () => send({ type: "inspector.popoutPanel" })
  const focusPanel = () => send({ type: "inspector.focusPanel" })
  const tabLocked = tab ? !tab.closable && !tab.draggable : false
  const setTabBehavior = (patch: any) => send({ type: "inspector.tabBehavior", patch })
  const renameTab = (title: string) => send({ type: "inspector.renameTab", title })
  const moveTab = (id: string) => send({ type: "inspector.moveTab", id })
  const floatTab = () => send({ type: "inspector.floatTab" })
  const popoutTab = () => send({ type: "inspector.popoutTab" })
  const removeTab = () => send({ type: "inspector.removeTab" })

  return (
    <Box
      as="aside"
      flexShrink="0"
      width="full"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      borderWidth="1px"
      borderColor="border.muted"
      borderRadius="lg"
      bg="bg.panel"
      color="fg"
      aria-label="Playground controls"
    >
      <Box as="header" px="4" py="3" borderBottomWidth="1px" borderColor="border.muted">
        <HStack justify="space-between" gap="3">
          <Text fontSize="sm" fontWeight="bold">
            Inspector Controls
          </Text>
          <Button variant="subtle" size="compact" tone="danger" onClick={reset}>
            Reset
          </Button>
        </HStack>
      </Box>
      <Box>
        {error ? (
          <Text role="alert" color="fg.error" px="4" py="2">
            {error}
          </Text>
        ) : null}
        <AccordionRoot defaultOpen={["workspace", "panel", "tab"]}>
          <AccordionItem value="workspace" title="Workspace">
            <Field
              label="Preset"
              hint="Replace the whole workspace"
              control={
                <Select
                  value={presetId}
                  onChange={loadPreset}
                  options={presets.map((p: any) => ({
                    value: p.id,
                    label: p.label,
                  }))}
                  placeholder="Load preset…"
                  ariaLabel="Preset"
                />
              }
            />
            <ButtonGroup>
              <Button variant="subtle" size="compact" onClick={saveLayout}>
                Save
              </Button>
              <Button variant="subtle" size="compact" onClick={restoreLayout} disabled={!hasSaved}>
                Restore
              </Button>
              <Button variant="subtle" size="compact" onClick={exportLayout}>
                {copied ? "Copied!" : "Export JSON"}
              </Button>
            </ButtonGroup>
            <Field
              label="Resizable"
              hint="All dividers"
              control={<SwitchInput checked={global.resizable} onChange={(v) => onGlobalChange({ resizable: v })} />}
            />
            <Field
              label="Action menu button"
              control={
                <SwitchInput
                  checked={global.showActionsButton}
                  onChange={(v) => onGlobalChange({ showActionsButton: v })}
                />
              }
            />
            <Field
              label="New-tab button"
              control={
                <SwitchInput
                  checked={global.showNewTabButton}
                  onChange={(v) => onGlobalChange({ showNewTabButton: v })}
                />
              }
            />
            <Field
              label="Handle hit size (px)"
              control={
                <NumberInput
                  value={global.resizeHandleHitSize}
                  onChange={(v) => onGlobalChange({ resizeHandleHitSize: v ?? 24 })}
                  ariaLabel="Handle hit size (px)"
                />
              }
            />
            <Field
              label="Default min %"
              control={
                <NumberInput
                  value={global.minSize}
                  onChange={(v) => onGlobalChange({ minSize: v ?? 10 })}
                  ariaLabel="Default min %"
                />
              }
            />
            <Field
              label="Theme"
              control={
                <Select
                  value={themeId}
                  onChange={onThemeChange}
                  options={themes.map((t: any) => ({
                    value: t.id,
                    label: t.label,
                  }))}
                  ariaLabel="Theme"
                />
              }
            />
          </AccordionItem>

          <AccordionItem value="panel" title="Selected panel">
            {panels.length === 0 ? (
              <Text fontSize="xs" color="fg.muted">
                No panels. Load a preset or reset the workspace.
              </Text>
            ) : (
              <>
                <Field
                  label="Panel"
                  control={
                    <Select
                      value={selectedPanelId ?? ""}
                      onChange={onSelectPanel}
                      options={panelOptions}
                      ariaLabel="Panel"
                    />
                  }
                />
                {panel ? (
                  <>
                    <Field
                      label="Add tab"
                      control={
                        <Button variant="subtle" size="compact" onClick={addTab}>
                          Add tab
                        </Button>
                      }
                    />
                    <Field
                      label="Split panel"
                      control={
                        <HStack gap="1.5">
                          <Select
                            ariaLabel="Split direction"
                            value={splitDir}
                            onChange={(v) => setSplitDir(v as any)}
                            options={DIRECTIONS}
                          />
                          <Button variant="subtle" size="compact" onClick={splitPanel}>
                            Split
                          </Button>
                        </HStack>
                      }
                    />
                    <Field
                      label="Resizable"
                      control={<SwitchInput checked={panel.resizable} onChange={(v) => patchPanel({ resizable: v })} />}
                    />
                    <Field
                      label="Draggable"
                      control={<SwitchInput checked={panel.draggable} onChange={(v) => patchPanel({ draggable: v })} />}
                    />
                    <Field
                      label="Droppable"
                      control={<SwitchInput checked={panel.droppable} onChange={(v) => patchPanel({ droppable: v })} />}
                    />
                    <Field
                      label="Locked"
                      hint="Resize + drag + drop off"
                      control={
                        <SwitchInput
                          checked={!panel.resizable && !panel.draggable && !panel.droppable}
                          onChange={(v) =>
                            patchPanel({
                              resizable: !v,
                              draggable: !v,
                              droppable: !v,
                            })
                          }
                        />
                      }
                    />
                    <Field
                      label="Min size %"
                      control={
                        <NumberInput
                          value={typeof panel.minSize === "number" ? panel.minSize : ""}
                          placeholder="auto"
                          onChange={(v) => patchPanel({ minSize: v })}
                          ariaLabel="Min size %"
                        />
                      }
                    />
                    <Field
                      label="Max size %"
                      control={
                        <NumberInput
                          value={typeof panel.maxSize === "number" ? panel.maxSize : ""}
                          placeholder="auto"
                          onChange={(v) => patchPanel({ maxSize: v })}
                          ariaLabel="Max size %"
                        />
                      }
                    />
                    <ButtonGroup>
                      <Button variant="subtle" size="compact" active={panel.fullScreen} onClick={toggleMaximize}>
                        {panel.fullScreen ? "Restore" : "Maximize"}
                      </Button>
                      <Button
                        variant="subtle"
                        size="compact"
                        active={panel.container === "floating"}
                        onClick={toggleFloat}
                      >
                        {panel.container === "floating" ? "Dock" : "Float"}
                      </Button>
                      <Button variant="subtle" size="compact" active={panel.poppedOut} onClick={togglePopout}>
                        {panel.poppedOut ? "Return" : "Pop out"}
                      </Button>
                      <Button
                        variant="subtle"
                        size="compact"
                        onClick={focusPanel}
                        disabled={panel.container !== "floating"}
                      >
                        Focus
                      </Button>
                      <Button variant="subtle" size="compact" tone="danger" onClick={removePanel}>
                        Remove panel
                      </Button>
                    </ButtonGroup>
                  </>
                ) : null}
              </>
            )}
          </AccordionItem>

          <AccordionItem value="tab" title="Selected tab">
            {!panel || panel.tabs.length === 0 ? (
              <Text fontSize="xs" color="fg.muted">
                This panel has no tabs.
              </Text>
            ) : (
              <>
                <Field
                  label="Tab"
                  control={
                    <Select value={selectedTabId ?? ""} onChange={onSelectTab} options={tabOptions} ariaLabel="Tab" />
                  }
                />
                {tab ? (
                  <>
                    <RenameField key={tab.id} initialTitle={tab.title} onRename={renameTab} />
                    <Field
                      label="Closable"
                      control={<SwitchInput checked={tab.closable} onChange={(v) => setTabBehavior({ closable: v })} />}
                    />
                    <Field
                      label="Draggable"
                      control={
                        <SwitchInput checked={tab.draggable} onChange={(v) => setTabBehavior({ draggable: v })} />
                      }
                    />
                    <Field
                      label="Locked"
                      hint="Close + drag off"
                      control={
                        <SwitchInput
                          checked={tabLocked}
                          onChange={(v) => setTabBehavior(v ? { locked: true } : { closable: true, draggable: true })}
                        />
                      }
                    />
                    {moveTargets.length > 0 ? (
                      <Field
                        label="Move to"
                        control={
                          <Select
                            value=""
                            onChange={moveTab}
                            options={moveTargets}
                            placeholder="Move to panel…"
                            ariaLabel="Move to"
                          />
                        }
                      />
                    ) : null}
                    <ButtonGroup>
                      <Button variant="subtle" size="compact" onClick={floatTab}>
                        Float tab
                      </Button>
                      <Button variant="subtle" size="compact" onClick={popoutTab}>
                        Pop out tab
                      </Button>
                      <Button
                        variant="subtle"
                        size="compact"
                        tone="danger"
                        onClick={removeTab}
                        disabled={!tab.closable}
                      >
                        Close tab
                      </Button>
                    </ButtonGroup>
                  </>
                ) : null}
              </>
            )}
          </AccordionItem>
        </AccordionRoot>
      </Box>
    </Box>
  )
}

function RenameField({ initialTitle, onRename }: { initialTitle: string; onRename: (title: string) => void }) {
  const [draft, setDraft] = useState(initialTitle)
  return (
    <Field
      label="Title"
      control={
        <HStack
          as="form"
          gap="1.5"
          onSubmit={(event) => {
            event.preventDefault()
            onRename(draft)
          }}
        >
          <Input aria-label="Tab title" value={draft} onChange={(event) => setDraft(event.target.value)} />
          <Button variant="subtle" size="compact" type="submit">
            Rename
          </Button>
        </HStack>
      }
    />
  )
}
