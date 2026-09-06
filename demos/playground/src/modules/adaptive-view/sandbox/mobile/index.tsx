'use client';

import './styles.css';

import AdvaptiveViewMobile, { AdvaptiveViewMobileProps } from './app';

export default function AdvaptiveViewMobileSandbox(
    props: AdvaptiveViewMobileProps
) {
    return (
        <div className="app" style={{ height: '100%', width: '100%' }}>
            <AdvaptiveViewMobile {...props} />
        </div>
    );
}
