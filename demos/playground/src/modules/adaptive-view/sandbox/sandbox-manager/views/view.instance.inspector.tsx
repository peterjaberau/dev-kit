'use client';

import { Box, Text } from '@chakra-ui/react';
import JsonView from 'react18-json-view';
import { useInstance } from '../../instance-manager/selectors';

export interface ViewInstanceInspectorProps {
    instanceId: string;
}

export function ViewInstanceInspector({
    instanceId,
}: ViewInstanceInspectorProps) {
    const { instanceState } = useInstance(instanceId);

    if (!instanceState) {
        return <Text padding="3">Instance not found: {instanceId}</Text>;
    }

    const snapshotJson = {
        status: instanceState.status,
        value: instanceState.value,
        context: instanceState.context,
        output: instanceState.output,
        error: instanceState.error,
        children: Object.keys(instanceState.children),
    };

    return (
        <Box width="full" height="full" overflow="auto" padding="2">
            <JsonView
                key={`${instanceId}:${JSON.stringify(snapshotJson)}`}
                src={snapshotJson}
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
                theme="github"
                collapsed={1}
            />
        </Box>
    );
}
