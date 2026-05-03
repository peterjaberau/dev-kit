import { useState, useMemo, useEffect } from 'react';
import type React from 'react';
import { useFlow } from '@xflows/plugin-react';
import demoFlow from '../flows/demo-flow.json';
import ViewRenderer from './ViewRenderer';
import FlowDebugger from './FlowDebugger';
import { Card, Stack, HStack, Button, Flex } from "@chakra-ui/react"
import type { ViewConfig, FlowConfig } from '@xflows/core';

const FlowDemo: React.FC = () => {
  const [showDebugger, setShowDebugger] = useState(false);

  // Stabilize the flow config reference
  const stableFlowConfig = useMemo(() => demoFlow as FlowConfig, []);
  
  // Use the flow hook
  const { state, send, view, context } = useFlow(stableFlowConfig);

  const handleEvent = (event: string, data?: unknown) => {
    // recordSubmittedData(event, data)
    send(event, data);
  };

  const handleBack = () => {
    send('BACK');
  };

  const handleNext = (data?: unknown) => {
    if (data === 'CALL_API') {
      send('CALL_API');
    } else {
      send('NEXT', data);
    }
  };

  return (
    <>
      <Card.Header css={{ py: 2, borderBottom: "1px solid", borderBottomColor: "border", flexShrink: 0 }}>
        <HStack>
          <Stack css={{ flex: 1, alignItems: "flex-start" }}>
            <Card.Title data-testid="machine-name">XFlows React Demo</Card.Title>
            <Card.Description data-testid="root-description">
              Complete framework demonstration with React integration
            </Card.Description>
          </Stack>
          <HStack>
            <Button
              size={"xs"}
              colorPalette={showDebugger ? "red" : "gray"}
              onClick={() => setShowDebugger(!showDebugger)}
            >
              {showDebugger ? "Hide" : "Show"} Debugger
            </Button>
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body css={{ flex: 1, minH: 0, overflow: "hidden" }}>
        <HStack alignItems={"stretch"} css={{ h: "full", minH: 0 }}>
          <Flex flex={1} minH={0}>
            <ViewRenderer
              view={view as ViewConfig}
              // context={mergedContext}
              context={context}
              onNext={handleNext}
              onBack={handleBack}
              onEvent={handleEvent}
            />
          </Flex>
          {showDebugger && (
            // <FlowDebugger state={debuggerState} context={mergedContext} currentStep={state.value as string} />
            <FlowDebugger state={state} context={context} currentStep={state.value as string} />
          )}
        </HStack>
      </Card.Body>
    </>
  )
};

export default FlowDemo;
