import { useState, useEffect, useCallback } from 'react';
import { FlowComponent } from '@xflows/plugin-react';
import type { FlowConfig } from '@xflows/core';
import { Button, Card, chakra, HStack } from "@chakra-ui/react"

interface FlowRendererProps {
  flow: unknown;
}

export function FlowRenderer({ flow }: FlowRendererProps) {
  const [currentState, setCurrentState] = useState<string | null>(null);
  const [renderTime, setRenderTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [flowConfig, setFlowConfig] = useState<FlowConfig | null>(null);

  const convertToFlowConfig = useCallback((oldFlow: unknown): FlowConfig => {
    if (!oldFlow || typeof oldFlow !== 'object') {
      return {
        id: 'empty',
        name: 'Empty Flow',
        initialStep: 'welcome',
        context: {},
        steps: [
          {
            id: 'welcome',
            name: 'Welcome',
            view: {
              type: 'display',
              title: 'Welcome',
              message: 'No flow loaded'
            },
            navigation: {
              onNext: 'complete'
            }
          },
          {
            id: 'complete',
            name: 'Complete',
            view: {
              type: 'success',
              title: 'Complete',
              message: 'Flow completed'
            },
            navigation: {}
          }
        ]
      };
    }

    const flowObj = oldFlow as Record<string, unknown>;
    const states = flowObj.states as Record<string, unknown> || {};
    const steps = Object.entries(states).map(([id, state]) => {
      const stateObj = state as Record<string, unknown>;
      const meta = stateObj.meta as Record<string, unknown> || {};
      const view = meta.view as Record<string, unknown> || {};
      const on = stateObj.on as Record<string, unknown> || {};

      return {
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        view: {
          type: 'display' as const,
          title: (view.title as string) || id.charAt(0).toUpperCase() + id.slice(1),
          message: (view.message as string) || `Step: ${id}`,
          ...view
        },
        navigation: {
          onNext: (on.NEXT as string) || (stateObj.type === 'final' ? undefined : 'complete'),
          onBack: on.BACK as string,
          onError: on.ERROR as string,
          onCancel: on.CANCEL as string
        }
      };
    });

    return {
      id: (flowObj.id as string) || 'converted-flow',
      name: (flowObj.name as string) || 'Converted Flow',
      initialStep: (flowObj.initial as string) || 'welcome',
      context: (flowObj.context as Record<string, unknown>) || {},
      steps
    };
  }, []);

  useEffect(() => {
    if (!flow) return;

    try {
      setError(null);
      const startTime = performance.now();

      const convertedFlow = convertToFlowConfig(flow);
      setFlowConfig(convertedFlow);
      setCurrentState(convertedFlow.initialStep);
      setRenderTime(performance.now() - startTime);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to convert flow';
      setError(errorMessage);
      console.error('Flow conversion error:', err);
    }
  }, [flow, convertToFlowConfig]);

  if (error) {
    return (
      <chakra.div css={{ h: "full", display: "flex", alignItems: "center", justifyContent: "center", bg: "red.50" }}>
        <Card.Root css={{ borderColor: "red.200", maxW: "md" }}>
          <Card.Body css={{ p: 6, textAlign: "center" }}>
            <chakra.div css={{ w: 12, h: 12, bg: "red.500", borderRadius: "full", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 4, color: "white" }}>
              !
            </chakra.div>
            <Card.Title css={{ color: "red.800", mb: 2 }}>Render Error</Card.Title>
            <Card.Description css={{ color: "red.600", mb: 4 }}>{error}</Card.Description>
            <Button colorPalette="red" onClick={() => window.location.reload()}>
              Reload
            </Button>
          </Card.Body>
        </Card.Root>
      </chakra.div>
    );
  }

  return (
    <chakra.div css={{ h: "full", display: "flex", flexDirection: "column", bg: "bg.panel" }}>
      <chakra.div css={{ bg: "gray.50", borderBottomWidth: "1px", borderColor: "gray.200", px: 4, py: 3 }}>
        <HStack justify="space-between">
          <HStack gap={4}>
            <chakra.h3 css={{ fontSize: "lg", fontWeight: "semibold", color: "gray.900" }}>Flow Renderer</chakra.h3>
            <HStack css={{ px: 2, py: 1, bg: "green.50", borderRadius: "full", borderWidth: "1px", borderColor: "green.200" }}>
              <chakra.div css={{ w: 2, h: 2, bg: "green.500", borderRadius: "full", animation: "pulse 1s infinite" }} />
              <chakra.span css={{ fontSize: "xs", fontWeight: "medium", color: "green.700" }}>Live</chakra.span>
            </HStack>
            <chakra.div css={{ fontSize: "sm", color: "gray.600" }}>
              State: <chakra.span css={{ fontFamily: "mono", fontWeight: "medium" }}>{currentState || 'None'}</chakra.span>
            </chakra.div>
          </HStack>
          <chakra.div css={{ fontSize: "xs", color: "gray.500" }}>{renderTime.toFixed(2)}ms</chakra.div>
        </HStack>
      </chakra.div>

      <chakra.div css={{ flex: 1, overflow: "auto", p: 6, bg: "gray.50" }}>
        {flowConfig ? (
          <chakra.div css={{ maxW: "2xl", mx: "auto" }}>
            <FlowComponent flowConfig={flowConfig} className="flow-renderer" />
          </chakra.div>
        ) : (
          <chakra.div css={{ h: "full", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <chakra.div css={{ textAlign: "center" }}>
              <chakra.div css={{ w: 16, h: 16, bg: "gray.200", borderRadius: "full", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 4, color: "gray.400" }}>
                ◌
              </chakra.div>
              <chakra.h3 css={{ fontSize: "lg", fontWeight: "medium", color: "gray.900", mb: 2 }}>No flow loaded</chakra.h3>
              <chakra.p css={{ color: "gray.500" }}>Load a flow example to start testing.</chakra.p>
            </chakra.div>
          </chakra.div>
        )}
      </chakra.div>
    </chakra.div>
  );
}
