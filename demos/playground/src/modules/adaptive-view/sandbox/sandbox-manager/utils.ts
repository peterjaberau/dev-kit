import { DockviewApi } from '#adaptive-view/react';
import { DEFAULT_LAYOUT_JSON } from './defaultLayout';

export const nextId = (() => {
    let counter = 0;

    return () => counter++;
})();

export function loadDockviewLayout(api: DockviewApi, data?: unknown): void {
    const layout = JSON.parse(
        JSON.stringify(data ?? DEFAULT_LAYOUT_JSON)
    );
    api.fromJSON(layout);
}
