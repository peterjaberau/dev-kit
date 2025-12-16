import React from 'react';
import { isObject } from '$utils/typeof';
import withStore from '$core/withStore';
import { BaseRendererProps } from '$types/index';

// Stores the json-editor renderer
export const renderersMap: {
  [key: string]: React.ComponentType<BaseRendererProps>;
} = {};

interface WidgetConfig {
  type?: string;
  component?: React.ComponentType<any>;
  [key: string]: any;
}

export function Renderer(widgetConfig: WidgetConfig) {
  return function (component: React.ComponentType<any>) {
    const renderer = registerRenderer({
      ...widgetConfig,
      component: component,
    });
    return renderer?.component;
  };
}

// Register renderer
export function registerRenderer(
  widgetConfig: WidgetConfig,
): WidgetConfig | undefined {
  if (!widgetConfig.type) {
    console.warn('[json-editor]: Renderer registration failed. Please set the renderer\'s type.');
    return;
  } else if (!widgetConfig.component) {
    console.warn(
      '[json-editor]: Renderer registration failed. Please set the component corresponding to the renderer.'
    );
    return;
  }

  if (widgetConfig.type && typeof widgetConfig.type === 'string') {
    widgetConfig.type = widgetConfig.type.toLowerCase();
  }

  if (renderersMap[widgetConfig.type]) {
    console.warn(
      `[json-editor]: Renderer registration failed. A renderer with the same name already exists (${widgetConfig.type}). Please try a different type.`,
    );
    return;
  }

  // Inject store
  const witchStoreRenderer = withStore(widgetConfig.component);

  renderersMap[widgetConfig.type] = witchStoreRenderer;
  return widgetConfig;
}

// Unregister renderer
export function unRegisterRenderer(widgetConfig: WidgetConfig | string): void {
  const widgetType = isObject(widgetConfig)
    ? (widgetConfig as WidgetConfig).type
    : typeof widgetConfig === 'string'
      ? widgetConfig
      : '';
  if (widgetType && typeof widgetType === 'string') {
    delete renderersMap[widgetType];
  }
}

export function loadRenderer(
  widgetSchema: any,
  path: string,
): React.ReactElement {
  return (
    <div className="RuntimeError">
      Error: No matching renderer found.
      <p>Path: {path}</p>
      <pre>
        <code>{JSON.stringify(widgetSchema, null, 2)}</code>
      </pre>
    </div>
  );
}
