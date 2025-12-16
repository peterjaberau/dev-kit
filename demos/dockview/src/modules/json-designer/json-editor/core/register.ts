import { renderersMap, registerRenderer } from './factory';

declare global {
  interface Window {
    JSONEditorCustomRenderers?: Record<string, any>;
  }
}

/**
 * Provides two special ways to register renderers
 * 1. Automatically load pre-registered custom renderers: Automatically load and register renderers in window.JSONEditorCustomRenderers.
 * 2. Inform json-editor to register a new renderer via postMessage: Indirectly register the renderer without directly depending on json-editor.
 */

// Automatically load pre-registered custom renderers
export function autoPreRegisterJSONEditorCustomRenderers() {
  if (window.JSONEditorCustomRenderers) {
    Object.keys(window.JSONEditorCustomRenderers).forEach(
      (rendererType: string) => {
        if (renderersMap[rendererType]) {
          console.warn(
            `[json-editor]: Pre-registration of renderer failed because a renderer with the same name (${rendererType}) already exists.`,
          );
        } else {
          const curRenderer = window.JSONEditorCustomRenderers?.[rendererType];
          if (curRenderer) {
            registerRenderer({
              type: rendererType,
              component: curRenderer,
            });
          }
        }
      },
    );
  }
}

// Automatically load and register renderers in window.JSONEditorCustomRenderers
autoPreRegisterJSONEditorCustomRenderers();

/**
 * PostMessage renderer dynamic registration mechanism
 Example of dynamic registration:
 AddJSONCustomRenderer('new-type', {
 type: 'new-type',
 weight: 0,
 framework: 'react',
 component: newJsonRenderer,
 config: {xx configuration},
 });

 window.postMessage(
 {
 type: 'json-editor-renderer-register-event',
 eventMsg: '[json-editor]: Register a custom renderer',
 jsonRenderer: {
 type: 'new-type',
 // component: newJsonRenderer,
 },
 },
 '*',
 );
 */
window.addEventListener(
  'message',
  (event: MessageEvent) => {
    if (!event.data) {
      return;
    }
    if (
      event.data.type === 'json-editor-renderer-register-event' &&
      event.data.jsonRenderer &&
      event.data.jsonRenderer.type
    ) {
      const curType = event.data.jsonRenderer.type;
      if (renderersMap[curType]) {
        console.warn(
          `[json-editor]: Dynamic renderer registration failed because a renderer with the same name (${curType}) already exists.`,
        );
      } else {
        console.info('[json-editor]: Responding to dynamically registered renderer events:', curType);
        const curRenderer = getJSONCustomRenderer(curType);
        if (curRenderer) {
          registerRenderer({
            type: curType,
            component: curRenderer,
          });
        }
      }
    }
  },
  false,
);

export function AddJSONCustomRenderer(
  componentType: string,
  rendererComponent: any,
) {
  if (window && !window.JSONEditorCustomRenderers) {
    window.JSONEditorCustomRenderers = {};
  }
  if (
    window.JSONEditorCustomRenderers &&
    !window.JSONEditorCustomRenderers[componentType]
  ) {
    window.JSONEditorCustomRenderers[componentType] = rendererComponent;
    return componentType;
  } else {
    console.error(
      `[json-editor]: Renderer registration failed due to a duplicate renderer (${componentType}).`
    );
  }
  return undefined;
}

export function getJSONCustomRenderer(componentType: string) {
  if (
    window &&
    window.JSONEditorCustomRenderers &&
    window.JSONEditorCustomRenderers[componentType]
  ) {
    return window.JSONEditorCustomRenderers[componentType].component;
  }
  return undefined;
}
