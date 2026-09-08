'use client';

import { LayoutManagerContext } from './provider';

export function useLayoutManager() {
    const layoutManagerRef = LayoutManagerContext.useActorRef();
    const layoutManagerState = LayoutManagerContext.useSelector(
        (state) => state
    );
    const layoutManagerContext = layoutManagerState.context;
    const api = layoutManagerContext.api;
    const panelIds = api?.panels.map((panel) => panel.id) ?? [];
    const panelsList =
        api?.panels.map((panel) => ({
            id: panel.id,
            name: panel.title ?? panel.id,
        })) ?? [];
    const metadata = {
        panelsList,
    };

    return {
        layoutManagerRef,
        layoutManagerState,
        layoutManagerContext,
        layoutManagerSnapshot: layoutManagerRef.getSnapshot(),
        layoutManagerId: layoutManagerRef.id,
        api,
        sentToLayoutManager: layoutManagerRef.send,
        panelIds,
        panelsList,
        metadata,
    };
}

export function useLayoutPanel(panelId: string) {
    const {
        layoutManagerRef,
        layoutManagerState,
        layoutManagerContext,
        layoutManagerSnapshot,
        api,
        sentToLayoutManager,
    } = useLayoutManager();
    const panel = api?.getPanel(panelId);

    return {
        layoutManagerRef,
        layoutManagerState,
        layoutManagerContext,
        layoutManagerSnapshot,
        api,
        sentToLayoutManager,
        panel,
        panelApi: panel?.api,
        panelId,
    };
}
