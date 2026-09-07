'use client';

import { Box, Text } from '@chakra-ui/react';
import JsonView from 'react18-json-view';
import type { DockviewApi } from '#adaptive-view/react';

export interface ViewLayoutGroupInspectorProps {
    api: DockviewApi;
    groupId: string;
}

export function ViewLayoutGroupInspector({
    api,
    groupId,
}: ViewLayoutGroupInspectorProps) {
    const groupState = api.getGroup(groupId)?.toJSON();

    if (!groupState) {
        return <Text padding="3">Group not found: {groupId}</Text>;
    }

    return (
        <Box width="full" height="full" overflow="auto" padding="2">
            <JsonView
                key={`${groupId}:${JSON.stringify(groupState)}`}
                src={groupState}
                collapsed={1}
            />
        </Box>
    );
}
