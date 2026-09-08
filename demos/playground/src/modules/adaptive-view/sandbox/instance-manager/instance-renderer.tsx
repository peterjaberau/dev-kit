'use client';

import { RegistryViewer } from '#plugins/registry-manager-plugin/view';
import { useInstance } from './selectors';

export interface InstanceRendererProps {
    instanceId: string;
}

export function InstanceRenderer({ instanceId }: InstanceRendererProps) {
    const { instancePlugin, instanceProps } = useInstance(instanceId);

    if (!instancePlugin) {
        return null;
    }

    return (
        <div
            data-sandbox-theme-isolated
            style={{ width: '100%', height: '100%', minWidth: 0, minHeight: 0 }}
        >
            <RegistryViewer
                componentId={instancePlugin}
                options={instanceProps}
            />
        </div>
    );
}

export default InstanceRenderer;
