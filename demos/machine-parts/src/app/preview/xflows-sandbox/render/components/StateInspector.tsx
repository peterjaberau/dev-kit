import { useState } from 'react';
import { Badge, Button, chakra, HStack, Stack } from "@chakra-ui/react"

interface StateInspectorProps {
  flow: any;
}

export function StateInspector({ flow }: StateInspectorProps) {
  const [selectedState, setSelectedState] = useState<string | null>(flow?.initial || null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['states']));

  const toggleNode = (nodeKey: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeKey)) {
      newExpanded.delete(nodeKey);
    } else {
      newExpanded.add(nodeKey);
    }
    setExpandedNodes(newExpanded);
  };

  const renderObjectNode = (key: string, value: any, path: string = '', level: number = 0) => {
    const nodeKey = path ? `${path}.${key}` : key;
    const hasChildren = typeof value === 'object' && value !== null;
    const isExpanded = expandedNodes.has(nodeKey);
    const isSelected = selectedState === key && path === 'states';

    return (
      <chakra.div key={nodeKey} css={{ fontSize: "sm", ml: `${level * 16}px` }}>
        <HStack
          gap={1}
          css={{
            py: 1,
            cursor: "pointer",
            borderRadius: "md",
            fontWeight: path === 'states' ? "medium" : undefined,
            ...(isSelected ? { bg: "blue.50", color: "blue.700" } : {}),
            _hover: { bg: "gray.100" },
          }}
          onClick={() => {
            if (path === 'states') {
              setSelectedState(key);
            }
            if (hasChildren) {
              toggleNode(nodeKey);
            }
          }}
        >
          <chakra.span css={{ w: 4 }}>{hasChildren ? (isExpanded ? '📂' : '📁') : '📄'}</chakra.span>
          <chakra.span css={{ color: "blue.600" }}>{key}:</chakra.span>
          {!hasChildren && (
            <chakra.span css={{ ml: 2, color: "gray.600" }}>
              {typeof value === 'string' ? `"${value}"` :
               typeof value === 'boolean' ? (value ? 'true' : 'false') :
               JSON.stringify(value)}
            </chakra.span>
          )}
        </HStack>

        {isExpanded && hasChildren && (
          <chakra.div>
            {Object.entries(value).map(([subKey, subValue]) =>
              renderObjectNode(subKey, subValue, nodeKey, level + 1)
            )}
          </chakra.div>
        )}
      </chakra.div>
    );
  };

  const renderTransitions = () => {
    const state = selectedState ? flow?.states?.[selectedState] : null;
    if (!state?.on) return null;

    return (
      <chakra.div css={{ mt: 4 }}>
        <chakra.h5 css={{ fontWeight: "medium", color: "gray.700", mb: 2 }}>🔄 Transitions</chakra.h5>
        <Stack gap={2}>
          {Object.entries(state.on).map(([event, target]) => {
            const targetStr = Array.isArray(target) ? target.join(' | ') : String(target);
            return (
              <HStack key={event} css={{ p: 2, bg: "gray.50", borderRadius: "md", borderWidth: "1px" }}>
                <chakra.span css={{ color: "blue.600", fontWeight: "medium" }}>{event}</chakra.span>
                <chakra.span css={{ mx: 2, color: "gray.400" }}>→</chakra.span>
                <chakra.span css={{ color: "green.600", fontFamily: "mono" }}>{targetStr}</chakra.span>
              </HStack>
            );
          })}
        </Stack>
      </chakra.div>
    );
  };

  const renderStateDetails = () => {
    if (!selectedState || !flow?.states?.[selectedState]) {
      return (
        <chakra.div css={{ textAlign: "center", color: "gray.500", py: 8 }}>
          <chakra.p css={{ fontSize: "lg", mb: 2 }}>🔍</chakra.p>
          <chakra.p>Select a state from the tree to inspect its details</chakra.p>
        </chakra.div>
      );
    }

    const state = flow.states[selectedState];

    return (
      <Stack gap={4}>
        <chakra.div>
          <chakra.h5 css={{ fontWeight: "medium", color: "gray.700", mb: 2 }}>📍 State: {selectedState}</chakra.h5>
          <chakra.div css={{ bg: "gray.50", p: 3, borderRadius: "md", borderWidth: "1px" }}>
            <Stack gap={2} css={{ fontSize: "sm" }}>
              {state.type && <chakra.div><chakra.span css={{ color: "blue.600" }}>Type:</chakra.span> {state.type}</chakra.div>}
              {state.view?.moduleId && <chakra.div><chakra.span css={{ color: "blue.600" }}>View:</chakra.span> {state.view.moduleId}</chakra.div>}
              {state.view?.slot && <chakra.div><chakra.span css={{ color: "blue.600" }}>Slot:</chakra.span> {state.view.slot}</chakra.div>}
            </Stack>
          </chakra.div>
        </chakra.div>

        {renderTransitions()}

        {state.guards && (
          <chakra.div>
            <chakra.h5 css={{ fontWeight: "medium", color: "gray.700", mb: 2 }}>🛡️ Guards</chakra.h5>
            <Stack gap={2}>
              {state.guards.map((guard: any, i: number) => (
                <chakra.div key={i} css={{ bg: "yellow.50", p: 2, borderRadius: "md", borderWidth: "1px", fontSize: "sm" }}>
                  <chakra.pre css={{ fontSize: "xs" }}>{JSON.stringify(guard, null, 2)}</chakra.pre>
                </chakra.div>
              ))}
            </Stack>
          </chakra.div>
        )}

        {state.onEntry && (
          <chakra.div>
            <chakra.h5 css={{ fontWeight: "medium", color: "gray.700", mb: 2 }}>⏩ Entry Actions</chakra.h5>
            <chakra.div css={{ bg: "green.50", p: 2, borderRadius: "md", borderWidth: "1px", fontSize: "sm" }}>
              <chakra.pre css={{ fontSize: "xs" }}>{JSON.stringify(state.onEntry, null, 2)}</chakra.pre>
            </chakra.div>
          </chakra.div>
        )}

        {state.onExit && (
          <chakra.div>
            <chakra.h5 css={{ fontWeight: "medium", color: "gray.700", mb: 2 }}>⏸️ Exit Actions</chakra.h5>
            <chakra.div css={{ bg: "red.50", p: 2, borderRadius: "md", borderWidth: "1px", fontSize: "sm" }}>
              <chakra.pre css={{ fontSize: "xs" }}>{JSON.stringify(state.onExit, null, 2)}</chakra.pre>
            </chakra.div>
          </chakra.div>
        )}
      </Stack>
    );
  };

  const renderStateDiagram = () => {
    if (!flow?.states) return null;

    const states = Object.keys(flow.states);
    const initialState = flow.initial;
    const finalStates = states.filter(state => flow.states[state].type === 'final');

    return (
      <chakra.div css={{ mt: 4, p: 4, bg: "gray.50", borderRadius: "md", borderWidth: "1px" }}>
        <chakra.h4 css={{ fontWeight: "medium", color: "gray.700", mb: 3 }}>🗺️ State Diagram</chakra.h4>
        <Stack gap={4}>
          {initialState && (
            <HStack justify="center">
              <Badge colorPalette="blue">🎯 {initialState}</Badge>
            </HStack>
          )}

          <HStack wrap="wrap" gap={1} justify="center">
            {states.filter(s => s !== initialState && !finalStates.includes(s)).map(state => (
              <Badge key={state} colorPalette={selectedState === state ? "blue" : "gray"}>📦 {state}</Badge>
            ))}
          </HStack>

          {finalStates.length > 0 && (
            <HStack wrap="wrap" gap={1} justify="center">
              {finalStates.map(state => (
                <Badge key={state} colorPalette="green">✅ {state}</Badge>
              ))}
            </HStack>
          )}
        </Stack>
      </chakra.div>
    );
  };

  if (!flow) {
    return (
      <chakra.div css={{ h: "full", display: "flex", alignItems: "center", justifyContent: "center", bg: "gray.50" }}>
        <chakra.div css={{ textAlign: "center", color: "gray.500" }}>
          <chakra.p css={{ fontSize: "lg", mb: 2 }}>🔍</chakra.p>
          <chakra.p>No flow loaded</chakra.p>
          <chakra.p css={{ fontSize: "sm", mt: 1 }}>Load a flow in the editor to inspect its states</chakra.p>
        </chakra.div>
      </chakra.div>
    );
  }

  return (
    <chakra.div css={{ h: "full", display: "flex", flexDirection: "column", bg: "bg.panel" }}>
      <chakra.div css={{ borderBottomWidth: "1px", px: 4, py: 2, bg: "gray.50" }}>
        <HStack justify="space-between">
          <chakra.span css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700" }}>🔍 State Inspector</chakra.span>
          <HStack gap={2}>
            <Button size="xs" variant="subtle">🗜️ Collapse All</Button>
            <Button size="xs" colorPalette="green" variant="subtle">📄 Expand All</Button>
          </HStack>
        </HStack>
      </chakra.div>

      <Stack gap={4} css={{ flex: 1, overflow: "auto", p: 4 }}>
        <chakra.div>
          <chakra.h3 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 2 }}>📋 Flow Structure</chakra.h3>
          <chakra.div css={{ bg: "bg.panel", borderWidth: "1px", borderRadius: "md", p: 2, maxH: 40, overflow: "auto" }}>
            {renderObjectNode('states', flow.states)}
          </chakra.div>
        </chakra.div>

        {renderStateDiagram()}

        <chakra.div>
          <chakra.h3 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 2 }}>⚙️ State Details</chakra.h3>
          <chakra.div css={{ bg: "bg.panel", borderWidth: "1px", borderRadius: "md", p: 4 }}>
            {renderStateDetails()}
          </chakra.div>
        </chakra.div>

        <chakra.div>
          <chakra.h3 css={{ fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 2 }}>📋 Context</chakra.h3>
          <chakra.div css={{ bg: "bg.panel", borderWidth: "1px", borderRadius: "md", p: 2, maxH: 32, overflow: "auto" }}>
            <chakra.pre css={{ fontSize: "xs", color: "gray.600" }}>
              {JSON.stringify(flow.context || {}, null, 2)}
            </chakra.pre>
          </chakra.div>
        </chakra.div>
      </Stack>

      <chakra.div css={{ borderTopWidth: "1px", px: 4, py: 2, bg: "gray.50" }}>
        <HStack justify="space-between" css={{ fontSize: "sm", color: "gray.600" }}>
          <HStack gap={4}>
            <chakra.span>📍 States: {Object.keys(flow?.states || {}).length}</chakra.span>
            <chakra.span>🎯 Selected: {selectedState || 'None'}</chakra.span>
          </HStack>
          <Badge colorPalette="blue">Live ✓</Badge>
        </HStack>
      </chakra.div>
    </chakra.div>
  );
}
