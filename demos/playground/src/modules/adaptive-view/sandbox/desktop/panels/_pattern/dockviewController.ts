
export interface SystemTabGroupSnapshot {
  activePanelId?: string
  panelIds: string[]
}

export interface SystemLayoutData {
  layout?: any
  configById: Record<string, Record<string, unknown>>
  globalVariables: Record<string, unknown>
  userNodes: Record<string, unknown>
  playbackConfig?: Record<string, unknown>
  version?: number
  /** Private field used by this product to round-trip DockView tab groups. */
  __embodiflow?: {
    tabGroups?: Record<string, SystemTabGroupSnapshot>
  }
}

export interface OpenPanelInput {
  type: string;
  id?: string;
  title?: string;
  config?: unknown;
  position?: {
    referencePanel?: string;
    direction: 'above' | 'below' | 'left' | 'right' | 'within';
  };
  activate?: boolean;
}

export interface DockviewController {
  openPanel: (input: OpenPanelInput) => string | null;
  duplicatePanel: (panelId: string) => string | null;
  exportLayout: () => SystemLayoutData | null;
  importLayout: (value: unknown) => { restored: number; degraded: number; skipped: number };
  reapplyAutoLayout: () => boolean;
}

let controller: DockviewController | null = null;

export function setDockviewController(next: DockviewController | null): void {
  controller = next;
}

export function getDockviewController(): DockviewController | null {
  return controller;
}

export function openDockviewPanel(input: OpenPanelInput): string | null {
  return controller?.openPanel(input) ?? null;
}

export function exportDockviewLayout(): SystemLayoutData | null {
  return controller?.exportLayout() ?? null
}

export function importDockviewLayout(
  value: unknown,
): { restored: number; degraded: number; skipped: number } {
  return controller?.importLayout(value) ?? { restored: 0, degraded: 0, skipped: 0 };
}

export function reapplyAutoDockviewLayout(): boolean {
  return controller?.reapplyAutoLayout() ?? false;
}
