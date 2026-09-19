import type { OpenPanelInput } from '.';
import { createPanelInstanceId } from '.';
import { getSystemAdapter, getPanelDefinition } from './registry';
import type { SystemLayoutData } from './systemLayout';


/**
 * Build a System-compatible layout JSON with a single panel.
 * Host apps use this instead of hand-authoring `layout` / `configById`.
 */
export function createSinglePanelLayout(input: OpenPanelInput): SystemLayoutData {
  const definition = getPanelDefinition(input.type);
  const panelId = input.id ?? createPanelInstanceId(input.type);
  const config = definition.configSchema.parse(input.config ?? definition.createDefaultConfig());
  const title = input.title ?? definition.defaultTitle;
  const adapter = getSystemAdapter(input.type);
  const systemConfig = adapter.toConfig({
    config,
    extras: {},
    title,
  });

  return {
    layout: panelId,
    configById: {
      [panelId]: systemConfig,
    },
    globalVariables: {},
    userNodes: {},
  };
}
