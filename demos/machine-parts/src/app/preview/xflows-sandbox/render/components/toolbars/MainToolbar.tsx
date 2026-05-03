import { chakra } from "@chakra-ui/react"
import { Select, Toolbar, ToolbarGroup, ToolbarButton, ToolbarSeparator } from '../ui';

interface MainToolbarProps {
  selectedPanel: string;
  onPanelChange: (panel: string) => void;
  selectedExample: string;
  onExampleChange: (example: string) => void;
  panelLayout: string;
  onLayoutChange: (layout: string) => void;
  flowError: string | null;
  onSave: () => void;
  onExport: () => void;
  examples: Array<{ value: string; label: string; group?: string }>;
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
  examples
}: MainToolbarProps) {
  const mainTools = [
    { id: 'editor', label: 'Editor', icon: '📝' },
    { id: 'renderer', label: 'Renderer', icon: '🎨' }
  ];

  const debugTools = [
    { id: 'inspector', label: 'Inspector', icon: '🔍' },
    { id: 'events', label: 'Events', icon: '⚡' },
    { id: 'services', label: 'Services', icon: '🌐' },
    { id: 'performance', label: 'Perf', icon: '📊' }
  ];

  const layoutOptions = [
    { id: 'full', label: 'Full', icon: '⬜' },
    { id: 'split-2', label: 'Split 2', icon: '⇄' },
    { id: 'split-3', label: 'Split 3', icon: '⧉' }
  ];

  return (
    <Toolbar>
      <chakra.div
        data-id="main-toolbar"
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ToolbarGroup>
          {/* Main Tools */}
          <chakra.div
            css={{
              display: "flex",
              padding: 1,
              borderRadius: "lg",
              backgroundColor: "bg.subtle",
            }}
          >
            {mainTools.map((tool) => (
              <ToolbarButton
                key={tool.id}
                active={selectedPanel === tool.id}
                onClick={() => onPanelChange(tool.id)}
                variant="primary"
              >
                {tool.icon} {tool.label}
              </ToolbarButton>
            ))}

            <ToolbarSeparator />

            {debugTools.map((tool) => (
              <ToolbarButton
                key={tool.id}
                active={selectedPanel === tool.id}
                onClick={() => onPanelChange(tool.id)}
                variant="debug"
              >
                {tool.icon} {tool.label}
              </ToolbarButton>
            ))}
          </chakra.div>

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
        </ToolbarGroup>

        <ToolbarGroup>
          {/* Example Selector */}
          <chakra.div
            css={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
            >
            <chakra.label
              css={{
                fontSize: 'sm',
                fontWeight: 'medium',
                color: 'gray.700'
              }}
              >Examples:</chakra.label>
            <Select
              value={selectedExample}
              onChange={onExampleChange}
              options={examples}
              placeholder="Choose example..."
              css={{
                minW: '200px'
              }}
            />
          </chakra.div>

          {/* Layout Controls */}
          <chakra.div
            css={{
              display: 'flex',
              gap: 1,
              bordeRadius: 'lg',
              bg: 'bg.subtle',
              p: 1
            }}
            >
            {layoutOptions.map((layout) => (
              <ToolbarButton
                key={layout.id}
                active={panelLayout === layout.id}
                onClick={() => onLayoutChange(layout.id)}
                variant="secondary"

              >
                {layout.icon}
              </ToolbarButton>
            ))}
          </chakra.div>

          {/* Action Buttons */}
          <ToolbarButton onClick={onSave} variant="primary" >
            💾 Save Flow
          </ToolbarButton>
          <ToolbarButton onClick={onExport} variant="primary" >
            🚀 Export
          </ToolbarButton>
        </ToolbarGroup>
      </chakra.div>
    </Toolbar>
  )
}
