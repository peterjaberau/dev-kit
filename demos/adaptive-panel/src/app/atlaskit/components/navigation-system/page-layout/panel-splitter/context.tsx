import { createContext, type RefObject } from 'react';

import { type ResizeBounds } from './types';
export type PanelSplitterContextType = {
  panelId?: symbol
  panelRef: RefObject<HTMLDivElement | null>
  panelWidth: number
  onCompleteResize: (newWidth: number) => void
  getResizeBounds: () => ResizeBounds
  portalRef: RefObject<HTMLDivElement | null>
  resizingCssVar: string
  position: "start" | "end"
  isEnabled?: boolean
  shortcut?: any
}

export const PanelSplitterContext: import("react").Context<PanelSplitterContextType | null> = createContext<PanelSplitterContextType | null>(null);

export const OnDoubleClickContext: import("react").Context<(() => void) | undefined> = createContext<(() => void) | undefined>(undefined);
