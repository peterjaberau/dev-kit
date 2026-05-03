import { chakra, HStack, Button, IconButton, Group } from "@chakra-ui/react"
import { Select } from "../ui"
import {
  LuMaximize as FullIcon,
  LuColumns2 as Split2Icon,
  LuColumns3 as Split3Icon,
  LuCode as EditorIcon,
  LuAppWindow as RendererIcon,
  LuSave as SaveIcon,
  LuDownload as ExportIcon,
} from "react-icons/lu"

interface MainToolbarProps {
  selectedPanel: string
  onPanelChange: (panel: string) => void
  selectedExample: string
  onExampleChange: (example: string) => void
  panelLayout: string
  onLayoutChange: (layout: string) => void
  flowError: string | null
  onSave: () => void
  onExport: () => void
  examples: Array<{ value: string; label: string; group?: string }>
}

export function MainToolbar({
  selectedPanel,
  onPanelChange,
  selectedExample,
  onExampleChange,
  panelLayout,
  onLayoutChange,
  flowError,
  onSave,
  onExport,
  examples,
}: MainToolbarProps) {
  const mainTools = [
    { id: "editor", label: "Editor", icon: <EditorIcon /> },
    { id: "renderer", label: "Renderer", icon: <RendererIcon /> },
  ]

  const debugTools = [
    { id: "inspector", label: "Inspector", icon: "🔍" },
    { id: "events", label: "Events", icon: "⚡" },
    { id: "services", label: "Services", icon: "🌐" },
    { id: "performance", label: "Perf", icon: "📊" },
  ]

  const layoutOptions = [
    { id: "full", label: "Full", icon: <FullIcon /> },
    { id: "split-2", label: "Split 2", icon: <Split2Icon /> },
    { id: "split-3", label: "Split 3", icon: <Split3Icon /> },
  ]

  return (
    <HStack
      data-id="main-toolbar"
      css={{
        px: 1,
        py: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Main Tools */}
      <HStack gap={4}>
        <Group attached>
          {mainTools.map((tool) => (
            <Button
              key={tool.id}
              size={"xs"}
              onClick={() => onPanelChange(tool.id)}
              variant={selectedPanel === tool.id ? "solid" : "surface"}
              colorPalette={selectedPanel === tool.id ? "blue" : "gray"}
            >
              {tool.icon} {tool.label}
            </Button>
          ))}
        </Group>

        <Group attached>
          {debugTools.map((tool) => (
            <Button
              key={tool.id}
              size={"xs"}
              onClick={() => onPanelChange(tool.id)}
              variant={selectedPanel === tool.id ? "solid" : "surface"}
              colorPalette={selectedPanel === tool.id ? "blue" : "gray"}
            >
              {tool.icon} {tool.label}
            </Button>
          ))}
        </Group>

        {/* Error Display */}
        {flowError && (
          <chakra.div
            css={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderRadius: "md",
              bg: "bg.error",
              px: 3,
              py: 1,
              fontSize: "sm",
              color: "red.700",
            }}
          >
            <chakra.span>⚠️</chakra.span>
            <chakra.span>{flowError}</chakra.span>
          </chakra.div>
        )}
      </HStack>

      <HStack gap={4}>
        {/* Example Selector */}
        <Select value={selectedExample} onChange={onExampleChange} options={examples} placeholder="Choose example..." />

        {/* Layout Controls */}
        <Group attached>
          {layoutOptions.map((layout) => (
            <IconButton
              key={layout.id}
              size={"xs"}
              onClick={() => onLayoutChange(layout.id)}
              variant={panelLayout === layout.id ? "solid" : "surface"}
              colorPalette={panelLayout === layout.id ? "blue" : "gray"}
            >
              {layout.icon}
            </IconButton>
          ))}
        </Group>

        {/* Action Buttons */}
        <Group>
          <IconButton size={"xs"} onClick={onSave} variant="surface">
            <SaveIcon />
          </IconButton>
          <IconButton size={"xs"} onClick={onExport} variant="surface">
            <ExportIcon />
          </IconButton>
        </Group>

      </HStack>
    </HStack>
  )
}
