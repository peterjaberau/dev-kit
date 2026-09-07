'use client';

import { Box } from '@chakra-ui/react';
import JsonView from 'react18-json-view';
import type { DockviewApi } from '#adaptive-view/react';

export interface ViewLayoutInspectorProps {
    api: DockviewApi;
}

export function ViewLayoutInspector({ api }: ViewLayoutInspectorProps) {
    const layoutState = api.toJSON();

    return (
        <Box width="full" height="full" overflow="auto" padding="2">
            <JsonView
                key={JSON.stringify(layoutState)}
                src={layoutState}
                collapsed={1}
            />
        </Box>
    );
}
