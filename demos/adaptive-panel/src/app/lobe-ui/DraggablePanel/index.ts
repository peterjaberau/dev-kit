'use client';

import { type ReactNode, type RefAttributes } from 'react';

import { DraggablePanelBody, DraggablePanelContainer, DraggablePanelFooter, DraggablePanelHeader } from "./components"
import { DraggablePanel as DraggablePanelParent } from "./DraggablePanel"
import { type DraggablePanelProps } from './type';

interface IDraggablePanel {
  (props: DraggablePanelProps & RefAttributes<HTMLDivElement>): ReactNode;
  Body: typeof DraggablePanelBody;
  Container: typeof DraggablePanelContainer;
  Footer: typeof DraggablePanelFooter;
  Header: typeof DraggablePanelHeader;
}

const DraggablePanel = DraggablePanelParent as unknown as IDraggablePanel;

DraggablePanel.Body = DraggablePanelBody;
DraggablePanel.Container = DraggablePanelContainer;
DraggablePanel.Footer = DraggablePanelFooter;
DraggablePanel.Header = DraggablePanelHeader;

export default DraggablePanel;
export { DraggablePanelBody, type DraggablePanelBodyProps } from "./components/DraggablePanelBody"
export {
  DraggablePanelContainer,
  type DraggablePanelContainerProps,
} from './components/DraggablePanelContainer';
export { DraggablePanelFooter, type DraggablePanelFooterProps } from "./components/DraggablePanelFooter"
export { DraggablePanelHeader, type DraggablePanelHeaderProps } from "./components/DraggablePanelHeader"
export type * from './type';
