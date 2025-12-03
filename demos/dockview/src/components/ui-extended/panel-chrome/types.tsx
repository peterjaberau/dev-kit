import { CSSProperties, PropsWithChildren, ReactElement, ReactNode, useId, useState } from 'react';
import * as React from 'react';
import { LoadingState } from './constants'

export type PanelChromeProps = (AutoSize | FixedDimensions) & (Collapsible | HoverHeader);

interface BaseProps {
  padding?: PanelPadding;
  title?: string | React.ReactElement;
  description?: string | (() => string);
  titleItems?: ReactNode;
  menuItems?: any[];
  dragClass?: string;
  dragClassCancel?: string;
  onDragStart?: (e: React.PointerEvent) => void;
  selectionId?: string;
  /**
   * Use only to indicate loading or streaming data in the panel.
   * Any other values of loadingState are ignored.
   */
  loadingState?: LoadingState;
  /**
   * Used to display status message (used for panel errors currently)
   */
  statusMessage?: string;
  /**
   * Handle opening error details view (like inspect / error tab)
   */
  statusMessageOnClick?: (e: React.SyntheticEvent) => void;
  /**
   * @deprecated use `actions' instead
   **/
  leftItems?: ReactNode[];
  actions?: ReactNode;
  displayMode?: 'default' | 'transparent';
  onCancelQuery?: () => void;
  /**
   * callback when opening the panel menu
   */
  onOpenMenu?: () => void;
  /**
   * Used for setting panel attention
   */
  onFocus?: () => void;
  /**
   * Debounce the event handler, if possible
   */
  onMouseMove?: () => void;
  onMouseEnter?: () => void;
  /**
   * If true, the VizPanelMenu will always be visible in the panel header. Defaults to false.
   */
  showMenuAlways?: boolean;
  /**
   * Content to display in the sub-header area below the main header.
   * Can contain text, pills, links, buttons, or any other React elements.
   */
  subHeaderContent?: ReactNode;
}

interface FixedDimensions extends BaseProps {
  width: number;
  height: number;
  children: (innerWidth: number, innerHeight: number) => ReactNode;
}

interface AutoSize extends BaseProps {
  width?: never;
  height?: never;
  children: ReactNode;
}

interface Collapsible {
  collapsible: boolean;
  collapsed?: boolean;
  /**
   * callback when collapsing or expanding the panel
   */
  onToggleCollapse?: (collapsed: boolean) => void;
  hoverHeader?: never;
  hoverHeaderOffset?: never;
}

interface HoverHeader {
  collapsible?: never;
  collapsed?: never;
  showMenuAlways?: never;
  onToggleCollapse?: never;
  hoverHeader?: boolean;
  hoverHeaderOffset?: number;
}

export type PanelPadding = 'none' | 'md';


export enum SeriesVisibilityChangeMode {
  ToggleSelection = 'select',
  AppendToSelection = 'append',
}

export type OnSelectRangeCallback = (selections: RangeSelection2D[]) => void;

export interface RangeSelection1D {
  from: number;
  to: number;
}

export interface RangeSelection2D {
  x?: RangeSelection1D;
  y?: RangeSelection1D;
}
