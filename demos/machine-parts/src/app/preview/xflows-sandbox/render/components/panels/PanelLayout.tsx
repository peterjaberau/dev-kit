import React from 'react';
import { SplitLayout, SplitPanel } from '../ui/Layout';
import { chakra }  from "@chakra-ui/react"

interface PanelLayoutProps {
  layout: 'full' | 'split-2' | 'split-3';
  selectedPanel: string;
  panelComponents: Record<string, React.ReactNode>;
}

export function PanelLayout({ layout, selectedPanel, panelComponents }: PanelLayoutProps) {
  if (layout === 'full') {
    return (
      <chakra.div css={{ h: 'full'}}>
        {panelComponents[selectedPanel]}
      </chakra.div>
    );
  }

  if (layout === 'split-2') {
    return (
      <SplitLayout>
        <SplitPanel size="flex-1">
          {panelComponents.editor}
        </SplitPanel>
        <SplitPanel size="flex-1">
          {panelComponents.renderer}
        </SplitPanel>
      </SplitLayout>
    );
  }

  if (layout === 'split-3') {
    return (
      <SplitLayout>
        <SplitPanel size="1/3">
          {panelComponents.editor}
        </SplitPanel>
        <SplitPanel size="1/3">
          {panelComponents.renderer}
        </SplitPanel>
        <SplitPanel size="1/3">
          {panelComponents[selectedPanel === 'editor' || selectedPanel === 'renderer' ? 'inspector' : selectedPanel]}
        </SplitPanel>
      </SplitLayout>
    );
  }

  return null;
}
