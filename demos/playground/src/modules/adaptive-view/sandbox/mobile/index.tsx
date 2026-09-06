'use client';

import './styles.css';
import '#adaptive-view/styles/dockview.css';

import App, { AppProps } from './app';

export default function MobileAdaptiveViewSandbox(props: AppProps) {
    return (
        <div className="app" style={{ height: '100%', width: '100%' }}>
            <App {...props} />
        </div>
    );
}
