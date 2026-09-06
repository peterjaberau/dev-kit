import * as React from 'react';

export type PanelRendererApi = {
    isVisible: boolean;
    onDidVisibilityChange: (
        callback: (event: { isVisible: boolean }) => void
    ) => { dispose: () => void };
};

export function usePanelRenderer(
    api: PanelRendererApi | undefined
): boolean {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setVisible(api.isVisible);
        const disposable = api.onDidVisibilityChange((event) =>
            setVisible(event.isVisible)
        );
        return () => disposable.dispose();
    }, [api]);

    return visible;
}

export const PanelRenderer: React.FC<{
    api: PanelRendererApi | undefined;
    children: React.ReactNode;
}> = ({ api, children }) => {
    const visible = usePanelRenderer(api);
    return <div style={{ height: '100%' }}>{visible ? children : null}</div>;
};
