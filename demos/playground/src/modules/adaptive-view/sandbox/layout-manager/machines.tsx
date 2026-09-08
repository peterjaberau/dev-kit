'use client';

import { assign, setup } from 'xstate';
import type { DockviewApi } from '#adaptive-view/react';

type LayoutManagerContext = {
    api: DockviewApi | undefined;
};

type LayoutManagerEvent = {
    type: 'ON_READY';
    api: DockviewApi;
};

export const layoutManagerMachine = setup({
    types: {
        context: {} as LayoutManagerContext,
        events: {} as LayoutManagerEvent,
    },
    actions: {
        setApi: assign({
            api: ({ event }) => event.api,
        }),
    },
}).createMachine({
    id: 'layout-manager',
    initial: 'waiting',
    context: {
        api: undefined,
    },
    states: {
        waiting: {
            on: {
                ON_READY: {
                    actions: 'setApi',
                    target: 'ready',
                },
            },
        },
        ready: {
            on: {
                ON_READY: {
                    actions: 'setApi',
                },
            },
        },
    },
});
