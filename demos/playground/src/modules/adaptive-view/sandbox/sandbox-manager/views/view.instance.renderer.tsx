'use client';

import { Text } from '@chakra-ui/react';
import { RegistryViewer } from '#plugins/registry-manager-plugin/view';
import { useInstance } from '../../instance-manager/selectors';

export interface ViewInstanceRendererProps {
    instanceId: string;
}

export function ViewInstanceRenderer({
    instanceId,
}: ViewInstanceRendererProps) {
    const { instancePlugin, instanceProps } = useInstance(instanceId);

    if (!instancePlugin) {
        return <Text padding="3">Instance not found: {instanceId}</Text>;
    }

    return (
        <RegistryViewer
            componentId={instancePlugin}
            options={instanceProps}
        />
    );
}
