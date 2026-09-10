'use client';

import * as React from 'react';
import SandboxManager, { SandboxManagerRenderProps } from './manager';
import { SandboxManagerProvider } from './provider';
import type { SandboxManagerStoreInput } from './store';
import { InstanceManagerProvider } from '../instance-manager/provider';
import type { InstanceManagerInput } from '../instance-manager/machines';
import { LayoutManagerProvider } from '../layout-manager/provider';
import { StoreManagerProvider } from '../store-manager/provider';

export type { SandboxManagerRenderProps } from './manager';

export interface SandboxRendererProps extends SandboxManagerStoreInput {
    instanceManagerInput: InstanceManagerInput;
    children: (props: SandboxManagerRenderProps) => React.ReactNode;
}

export function SandboxRenderer({
    children,
    initialTheme,
    layoutProfiles,
    instanceManagerInput,
}: SandboxRendererProps) {
    return (
        <StoreManagerProvider>
            <InstanceManagerProvider input={instanceManagerInput}>
                <LayoutManagerProvider>
                    <SandboxManagerProvider input={{ initialTheme, layoutProfiles }}>
                        <SandboxManager>{children}</SandboxManager>
                    </SandboxManagerProvider>
                </LayoutManagerProvider>
            </InstanceManagerProvider>
        </StoreManagerProvider>
    );
}

export default SandboxRenderer;
