'use client';

import { Box, Text } from '@chakra-ui/react';
import JsonView from 'react18-json-view';
import { useLayoutPanel } from '../../layout-manager/selectors';

export interface ViewLayoutPanelInspectorProps {
    panelId: string;
}

export function ViewLayoutPanelInspector({
    panelId,
}: ViewLayoutPanelInspectorProps) {
    const { panelState } = useLayoutPanel(panelId);

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
          collapsed={2}
        />
      </Box>
    )
}
