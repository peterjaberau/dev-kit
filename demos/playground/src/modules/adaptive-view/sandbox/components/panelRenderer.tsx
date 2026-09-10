import * as React from 'react';
import { WrapperWithScrollArea } from './ui';

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
    scrollable?: boolean;
}> = ({ api, children, scrollable = true }) => {
    const visible = usePanelRenderer(api);

    if (!visible) {
        return <div style={{ width: '100%', height: '100%' }} />;
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                minWidth: 0,
                minHeight: 0,
                overflow: 'hidden',
            }}
        >
            {scrollable ? (
                <WrapperWithScrollArea>{children}</WrapperWithScrollArea>
            ) : (
                children
            )}
        </div>
    );
};
