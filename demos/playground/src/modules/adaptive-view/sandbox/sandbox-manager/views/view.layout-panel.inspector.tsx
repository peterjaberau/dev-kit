'use client';

import { Box, Text } from '@chakra-ui/react';
import JsonView from 'react18-json-view';
import type { DockviewApi } from '#adaptive-view/react';

export interface ViewLayoutPanelInspectorProps {
    api: DockviewApi;
    panelId: string;
}

export function ViewLayoutPanelInspector({
    api,
    panelId,
}: ViewLayoutPanelInspectorProps) {
    const panelState = api.getPanel(panelId)?.toJSON();

    if (!panelState) {
        return <Text padding="3">Panel not found: {panelId}</Text>;
    }

    return (
      <Box width="full" height="full" overflow="auto" padding="2">
        <JsonView
          key={`${panelId}:${JSON.stringify(panelState)}`}
          src={panelState}
          style={{
            fontSize: "14px",
            fontWeight: "bold",
          }}
          theme="github"
          collapsed={1}
        />
      </Box>
    )
}
