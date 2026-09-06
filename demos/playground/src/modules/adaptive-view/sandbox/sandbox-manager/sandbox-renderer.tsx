'use client';

import * as React from 'react';
import SandboxManager, { SandboxManagerRenderProps } from './manager';
import { SandboxManagerProvider } from './provider';
import type { SandboxManagerStoreInput } from './store';

export type { SandboxManagerRenderProps } from './manager';

export interface SandboxRendererProps extends SandboxManagerStoreInput {
    children: (props: SandboxManagerRenderProps) => React.ReactNode;
}

export function SandboxRenderer({
    children,
    initialTheme,
    layoutProfiles,
}: SandboxRendererProps) {
    return (
        <SandboxManagerProvider input={{ initialTheme, layoutProfiles }}>
            <SandboxManager>{children}</SandboxManager>
        </SandboxManagerProvider>
    );
}

export default SandboxRenderer;
