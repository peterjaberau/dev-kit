import { useState } from 'react';
import { FlowEditor } from './FlowEditor';
import { FlowRenderer } from './FlowRenderer';
import { StateInspector } from './StateInspector';
import { EventTester } from './EventTester';
import { ServiceDebugger } from './ServiceDebugger';
import { PerformanceMonitor } from './PerformanceMonitor';
import { LayoutManager } from './panels/LayoutManager';
import { PanelLayout } from './panels/PanelLayout';
import { data } from "../data"

export function FlowSandbox() {
  const [activeFlow, setActiveFlow] = useState<any>(null);
  const [flowError, setFlowError] = useState<string | null>(null);
  const [selectedPanel, setSelectedPanel] = useState<'editor' | 'renderer' | 'inspector' | 'events' | 'services' | 'performance'>('editor');
  const [panelLayout, setPanelLayout] = useState<'full' | 'split-2' | 'split-3'>('split-2');
  const [selectedExample, setSelectedExample] = useState<string>('');
  const [currentState, setCurrentState] = useState<string>('');
  const [eventCount] = useState<number>(0);
  const [renderTime] = useState<number>(0);
  const [updateCount, setUpdateCount] = useState<number>(0);

  const handleFlowChange = (newFlow: any, error: string | null) => {
    setFlowError(error);
    if (!error) {
      setActiveFlow(newFlow);
      console.log('Flow changed:', newFlow);
    } else {
      console.error('Flow error:', error);
    }
  };

  const loadExample = (exampleId: string) => {
    if (!exampleId) {
      setActiveFlow(null);
      setSelectedExample('');
      setCurrentState('');
      setFlowError(null);
      return;
    }
    
    const example: any = data.find(ex => ex.id === exampleId);
    if (!example) {
      console.error('Example not found:', exampleId);
      return;
    }

    console.log('📦 Loading example:', example.name);
    const exampleFlow = example.flow || example;
    setActiveFlow(exampleFlow);
    setSelectedExample(exampleId);
    setCurrentState(exampleFlow.initial || exampleFlow.initialStep || '');
    setFlowError(null);
    setUpdateCount(prev => prev + 1);
  };

  const handleSave = () => {
    console.log('💾 Saving flow...', activeFlow);
    // TODO: Implement save functionality
  };

  const handleExport = () => {
    console.log('🚀 Exporting flow...', activeFlow);
    // TODO: Implement export functionality
  };

  // Prepare examples for selector
  const examples = data.map((ex) => ({
    value: ex.id,
    label: ex.name,
    group: ex.category || "Demos",
  }))

  const panelComponents = {
    editor: (
      <FlowEditor
        data-id="flow-editor"
        initialFlow={activeFlow}
        onFlowChange={handleFlowChange}
        error={flowError}
      />
    ),
    renderer: <FlowRenderer data-id="flow-renderer" flow={activeFlow} />,
    inspector: <StateInspector data-id="state-inspector" flow={activeFlow} />,
    events: <EventTester data-id="event-tester" flow={activeFlow} />,
    services: <ServiceDebugger data-id="service-debugger" />,
    performance: <PerformanceMonitor data-id="performance-monitor" />,
  }

  return (
    <LayoutManager
      data-id="layout-manager"
      selectedPanel={selectedPanel}
      onPanelChange={(panel) => setSelectedPanel(panel as any)}
      selectedExample={selectedExample}
      onExampleChange={loadExample}
      panelLayout={panelLayout}
      onLayoutChange={(layout) => setPanelLayout(layout as any)}
      flowError={flowError}
      onSave={handleSave}
      onExport={handleExport}
      examples={examples}
      flowId={activeFlow?.id || "untitled"}
      currentState={currentState}
      eventCount={eventCount}
      renderTime={renderTime}
      memoryUsage="45MB"
      updateCount={updateCount}
    >
      <PanelLayout
        data-id="panel-layout"
        layout={panelLayout}
        selectedPanel={selectedPanel}
        panelComponents={panelComponents}
      />
    </LayoutManager>
  )
}
