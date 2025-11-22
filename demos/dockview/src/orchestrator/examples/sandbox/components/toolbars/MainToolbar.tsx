'use client'
import { chakra, Flex } from '@chakra-ui/react'
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
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <ToolbarGroup>
          {/* Main Tools */}
          <Flex gapX={1} bgColor={'bg.subtle'} borderRadius={'md'} p={1}>
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
          </Flex>

          {/* Error Display */}
          {flowError && (
            <Flex alignItems={'center'} gapX={2} py={1} px={3} bgColor={'bg.error'} color={'fg.error'} borderRadius={'md'} fontSize={'sm'}>
              <chakra.span>⚠️</chakra.span>
              <chakra.span>{flowError}</chakra.span>
            </Flex>
          )}
        </ToolbarGroup>

        <ToolbarGroup>
          {/* Example Selector */}
          <Flex alignItems="center" gapX={2}>
            <chakra.label fontSize={'sm'} fontWeight={'medium'} color={'fg.info'}>Examples:</chakra.label>
            <Select
              value={selectedExample}
              onChange={onExampleChange}
              options={examples}
              placeholder="Choose example..."
              style={{
                minWidth: '200px'
              }}
            />
          </Flex>

          {/* Layout Controls */}
          <Flex gapX={1} borderRadius={'lg'} p={1}>
            {layoutOptions.map((layout) => (
              <ToolbarButton
                key={layout.id}
                active={panelLayout === layout.id}
                onClick={() => onLayoutChange(layout.id)}
                variant="secondary"
                className="px-2 py-1 text-xs"
              >
                {layout.icon}
              </ToolbarButton>
            ))}
          </Flex>

          {/* Action Buttons */}
          <ToolbarButton
            onClick={onSave}
            variant="primary"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            💾 Save Flow
          </ToolbarButton>
          <ToolbarButton
            onClick={onExport}
            variant="primary"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            🚀 Export
          </ToolbarButton>
        </ToolbarGroup>
      </Flex>
    </Toolbar>
  );
}
