import type { PanelDefinition, PanelSystemAdapter } from './types';
import { canvasFoxgloveAdapter, imageFoxgloveAdapter } from '../Image/foxgloveAdapter';
import { rawMessagesPanelDefinition } from '../RawMessages';
import { rawMessagesFoxgloveAdapter } from '../RawMessages/foxgloveAdapter';
import { unavailablePanelDefinition } from '../Unavailable';
import { unavailableFoxgloveAdapter } from '../Unavailable/foxgloveAdapter';

const definitions = [
  rawMessagesPanelDefinition,
  imagePanelDefinition,
  unavailablePanelDefinition,
] as unknown as readonly PanelDefinition[];

const definitionMap = new Map<string, PanelDefinition>(
  definitions.map((definition) => [definition.type, definition]),
);

/**
 * Map from Foxglove panel type string (as encoded in the id prefix) to the
 * adapter we want to use. Legacy `Joints` entries still map to JointStatePlot;
 * Foxglove `Plot` now maps to rosview's generic Plot panel.
 */
const systemAdapters = new Map<string, PanelSystemAdapter>([
  ['Image', imageFoxgloveAdapter],
  ['Canvas', canvasFoxgloveAdapter],
  ['RawMessages', rawMessagesFoxgloveAdapter],
  ['Unavailable', unavailableFoxgloveAdapter],
]);

export function getPanelDefinitions(): PanelDefinition[] {
  return [...definitions] as PanelDefinition[];
}

export function getAddablePanelDefinitions(): PanelDefinition[] {
  return getPanelDefinitions().filter(
    (definition) => definition.type !== 'Unavailable' && !definition.hideFromPanelPicker,
  );
}

export function getPanelDefinition(type: string): PanelDefinition {
  const definition = definitionMap.get(type);
  if (!definition) {
    return unavailablePanelDefinition as PanelDefinition;
  }
  return definition;
}

export function hasPanelDefinition(type: string): type is string {
  return definitionMap.has(type as string);
}

/**
 * Resolve the Foxglove adapter for a given Foxglove panel-type string
 * (e.g. from `id.split('!')[0]`). Returns the `Unavailable` adapter when no
 * match exists so callers always get a valid object.
 */
export function getSystemAdapter(systemType: string): PanelSystemAdapter {
  return systemAdapters.get(systemType) ?? unavailableFoxgloveAdapter;
}

/** Whether our product knows how to render panels of the given system type. */
export function hasSystemAdapter(systemType: string): boolean {
  return systemAdapters.has(systemType)
}
