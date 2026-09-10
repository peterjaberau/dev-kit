'use client';

import './styles.css';

import AdvaptiveViewDesktop, { AdvaptiveViewDesktopProp } from './app';
import RenderAdaptiveView from "#adaptive-view/app"

export default function AdaptiveViewDesktopSandbox(
    props: AdvaptiveViewDesktopProp
) {
    return (
      <div className="app" style={{ height: "100%", width: "100%" }}>
        <RenderAdaptiveView>
          <AdvaptiveViewDesktop {...props} />
        </RenderAdaptiveView>
      </div>
    )
}
