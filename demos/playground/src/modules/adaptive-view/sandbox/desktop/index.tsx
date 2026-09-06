'use client';

import './styles.css';
import '#adaptive-view/styles/dockview.css';

import App, { DockviewDemoProps } from './app';

export default function DesktopAdaptiveViewSandbox(
    props: DockviewDemoProps
) {
    return (
        <div className="app" style={{ height: '100%', width: '100%' }}>
            <App {...props} />
        </div>
    );
}
