'use client';

import './styles.css';

import AdvaptiveViewDesktop, { AdvaptiveViewDesktopProp } from './app';

export default function AdaptiveViewDesktopSandbox(
    props: AdvaptiveViewDesktopProp
) {
    return (
        <div className="app" style={{ height: '100%', width: '100%' }}>
            <AdvaptiveViewDesktop {...props} />
        </div>
    );
}
