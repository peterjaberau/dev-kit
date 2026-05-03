import React, { useState, useEffect } from 'react';
import { FlowOrchestrator } from "@xflows/core"
import { HttpActionPlugin } from "@xflows/plugin-http"
import { FlowComponent } from "@xflows/plugin-react"

import { createHeadlessHost, Services } from '@xflows/core';
import { createReactRenderer, asReactView } from '@xflows/adapter-react';
import type { ViewRegistry } from '@xflows/renderer-core';
import { Badge, Button, Card, chakra, Checkbox, HStack, Input, SimpleGrid, Stack } from "@chakra-ui/react"

import salesFlow from '../../../xflows/render/flows/sales-flow.json';

const QuoteStartView = asReactView(({ nodeId, contextSlice, send }: any) => (
  <Card.Root>
    <Card.Body css={{ p: 6 }}>
      <Card.Title css={{ fontSize: "xl", mb: 4 }}>Quote Start [{nodeId}]</Card.Title>
      <Stack gap={4}>
        <chakra.div>
          <chakra.label css={{ display: "block", fontSize: "sm", fontWeight: "medium", color: "gray.700", mb: 1 }}>
            Channel
          </chakra.label>
          <Input type="text" defaultValue={contextSlice.session?.channel || 'web'} />
        </chakra.div>
        <Button w="full" colorPalette="blue" onClick={() => send({ type: 'NEXT', payload: { step: 'coverage' } })}>
          Continue to Coverage
        </Button>
      </Stack>
    </Card.Body>
  </Card.Root>
));

const CoverageView = asReactView(({ nodeId, contextSlice, send }: any) => (
  <Card.Root>
    <Card.Body css={{ p: 6 }}>
      <Card.Title css={{ fontSize: "xl", mb: 4 }}>Coverage [{nodeId}]</Card.Title>
      <Stack gap={4}>
        <Stack gap={2}>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Basic Coverage</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Enhanced Coverage</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Premium Coverage</Checkbox.Label>
          </Checkbox.Root>
        </Stack>
        <HStack gap={2}>
          <Button flex={1} variant="subtle" onClick={() => send({ type: 'BACK' })}>
            Back
          </Button>
          <Button flex={1} colorPalette="blue" onClick={() => send({ type: 'NEXT', payload: { step: 'summary' } })}>
            Continue to Summary
          </Button>
        </HStack>
      </Stack>
    </Card.Body>
  </Card.Root>
));

const SummaryView = asReactView(({ nodeId, contextSlice, send }: any) => (
  <Card.Root>
    <Card.Body css={{ p: 6 }}>
      <Card.Title css={{ fontSize: "xl", mb: 4 }}>Summary [{nodeId}]</Card.Title>
      <Stack gap={4}>
        <chakra.div css={{ bg: "gray.50", p: 4, borderRadius: "lg" }}>
          <chakra.h4 css={{ fontWeight: "medium", mb: 2 }}>Configuration Preview:</chakra.h4>
          <chakra.pre css={{ fontSize: "sm", color: "gray.600", overflow: "auto" }}>
            {JSON.stringify(contextSlice, null, 2)}
          </chakra.pre>
        </chakra.div>
        <Button w="full" colorPalette="green" onClick={() => send({ type: 'CONFIRM' })}>
          Confirm Quote
        </Button>
      </Stack>
    </Card.Body>
  </Card.Root>
));

export function XFlowsOrchestrator() {
  const [currentNodeId, setCurrentNodeId] = useState<string>('');
  const [contextSlice, setContextSlice] = useState<any>({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const viewRegistry: ViewRegistry = new Map([
      ['quote-start', { factory: QuoteStartView }],
      ['coverage', { factory: CoverageView }],
      ['summary', { factory: SummaryView }],
    ]) as any;

    const services: Services = {
      http: async (config: any, ctx: any) => {
        console.log("HTTP Service:", config, ctx)
        return { success: true, data: config.url }
      },
      analytics: async (config: any, ctx: any) => {
        console.log("Analytics Service:", config, ctx)
        return { tracked: true }
      },
    }

    const apis = {
      lifecycle: {
        enter: (path: string[]) => {
          console.log('Enter:', path);
          setCurrentNodeId(path[path.length - 1] || '');
        },
        leave: (path: string[]) => console.log('Leave:', path),
      },
      readFrom: (ev: any, path?: string) => {
        if (path) return ev.payload?.[path] ?? ev?.[path];
        return ev.payload ?? ev;
      },
      track: (event: string, props?: Record<string, any>) => {
        console.log('Track:', event, props);
      },
    };

    const host = createHeadlessHost(salesFlow, { services, apis });
    const actor = host.spawnActor();

    actor.subscribe((snapshot: any) => {
      const state = snapshot.value;
      setCurrentNodeId(typeof state === 'string' ? state : JSON.stringify(state));
      setContextSlice(snapshot.context || {});
      setIsComplete(snapshot.status === 'done');
    });

    actor.start();

    return () => actor.stop();
  }, []);

  return (
    <Stack gap={8}>
      <Card.Root>
        <Card.Body css={{ p: 6 }}>
          <Card.Title css={{ fontSize: "2xl", mb: 4 }}>🏢 Enterprise Flow Orchestrator</Card.Title>
          <Card.Description css={{ color: "gray.600", mb: 6 }}>
            This demonstrates the enterprise-ready XFlows orchestrator using consolidated packages.
          </Card.Description>

          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
            <Stack gap={4}>
              <chakra.h3 css={{ fontSize: "lg", fontWeight: "medium" }}>Current State</chakra.h3>
              <chakra.div css={{ bg: "gray.50", p: 4, borderRadius: "lg" }}>
                <Stack gap={2}>
                  <chakra.div>
                    <chakra.span css={{ fontSize: "sm", fontWeight: "medium", color: "gray.500" }}>Node ID:</chakra.span>
                    <chakra.span css={{ ml: 2, fontSize: "sm", color: "blue.600" }}>{currentNodeId}</chakra.span>
                  </chakra.div>
                  <chakra.div>
                    <chakra.span css={{ fontSize: "sm", fontWeight: "medium", color: "gray.500" }}>Status:</chakra.span>
                    <Badge ml={2} colorPalette={isComplete ? "green" : "blue"}>{isComplete ? 'Complete' : 'Running'}</Badge>
                  </chakra.div>
                </Stack>
              </chakra.div>
            </Stack>

            <Stack gap={4}>
              <chakra.h3 css={{ fontSize: "lg", fontWeight: "medium" }}>Context Slice</chakra.h3>
              <chakra.div css={{ bg: "gray.50", p: 4, borderRadius: "lg" }}>
                <chakra.pre css={{ fontSize: "xs", color: "gray.600", overflow: "auto", maxH: 32 }}>
                  {JSON.stringify(contextSlice, null, 2)}
                </chakra.pre>
              </chakra.div>
            </Stack>
          </SimpleGrid>
        </Card.Body>
      </Card.Root>

      {currentNodeId && !isComplete && (
        <Card.Root>
          <Card.Body css={{ p: 6 }}>
            <Card.Title css={{ fontSize: "lg", mb: 4 }}>Active Flow Node</Card.Title>

            {currentNodeId.includes('quote.start') && (
              <QuoteStartView nodeId={currentNodeId} contextSlice={contextSlice} send={() => {}} />
            )}

            {currentNodeId.includes('coverage') && (
              <CoverageView nodeId={currentNodeId} contextSlice={contextSlice} send={() => {}} />
            )}

            {currentNodeId.includes('summary') && (
              <SummaryView nodeId={currentNodeId} contextSlice={contextSlice} send={() => {}} />
            )}
          </Card.Body>
        </Card.Root>
      )}

      {isComplete && (
        <chakra.div css={{ bg: "green.50", borderWidth: "1px", borderColor: "green.200", borderRadius: "lg", p: 6, textAlign: "center", color: "green.800" }}>
          <chakra.h3 css={{ fontSize: "lg", fontWeight: "medium", mb: 2 }}>✅ Flow Completed Successfully!</chakra.h3>
          <chakra.p>You have reached the final state of the sales flow.</chakra.p>
        </chakra.div>
      )}

      <chakra.div css={{ bg: "blue.50", borderWidth: "1px", borderColor: "blue.200", borderRadius: "lg", p: 6 }}>
        <chakra.h3 css={{ fontSize: "lg", fontWeight: "medium", color: "blue.900", mb: 4 }}>📦 Packages in Use</chakra.h3>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} css={{ fontSize: "sm" }}>
          <chakra.div>
            <chakra.strong css={{ color: "blue.800" }}>@xflows/core</chakra.strong>
            <chakra.div css={{ color: "blue.700", mt: 1 }}>Flow orchestration engine</chakra.div>
          </chakra.div>
          <chakra.div>
            <chakra.strong css={{ color: "blue.800" }}>@xflows/adapter-react</chakra.strong>
            <chakra.div css={{ color: "blue.700", mt: 1 }}>React integration layer</chakra.div>
          </chakra.div>
          <chakra.div>
            <chakra.strong css={{ color: "blue.800" }}>@xflows/renderer-core</chakra.strong>
            <chakra.div css={{ color: "blue.700", mt: 1 }}>UI contracts & types</chakra.div>
          </chakra.div>
        </SimpleGrid>
      </chakra.div>
    </Stack>
  );
}
