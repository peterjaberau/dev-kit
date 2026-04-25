import { getRoots, getChildren, getOutEdges, getRelativeDistance, type GraphNode, type GraphEdge } from '@statelyai/graph';
import { useMemo } from 'react';
import { MachineHeader } from './components/machine/MachineHeader';
import { MachineRoot } from "./components/machine/MachineRoot"
import { MachineStateList } from "./components/machine/MachineStateList"
import { MachineTransitions } from "./components/machine/MachineTransitions"
import { StateNodeVisual } from './StateNodeViz';
import { TransitionVisual } from './TransitionViz';
import { StateNodeData, TransitionData, MachineGraph } from './utils';

interface MachineVizProps {
  graph: MachineGraph;
}

export function MachineVisual({ graph }: MachineVizProps) {
  const roots = getRoots(graph) as GraphNode<StateNodeData>[];
  if (roots.length === 0) return null;

  const root: any = roots[0];
  const topLevelStates = getChildren(graph, root.id) as GraphNode<StateNodeData>[];
  const rootEdges = getOutEdges(graph, root.id) as GraphEdge<TransitionData>[];

  const sortedStates = useMemo(() => {
    return [...topLevelStates].sort((a, b) => {
      const da = getRelativeDistance(graph, a.id) ?? Infinity;
      const db = getRelativeDistance(graph, b.id) ?? Infinity;
      return da - db;
    });
  }, [topLevelStates, graph]);

  return (
    <MachineRoot>
      <MachineHeader name={root.data.key} description={root.data.description} />

      {rootEdges.length > 0 && (
        <MachineTransitions>
          {rootEdges.map((edge, i) => (
            <TransitionVisual
              key={edge.id}
              edge={edge}
              graph={graph}
              sourceId={root.id}
              isFirst={i === 0}
            />
          ))}
        </MachineTransitions>
      )}

      <MachineStateList>
        {sortedStates.map((child) => (
          <StateNodeVisual
            key={child.id}
            node={child}
            graph={graph}
            isInitial={root.data.initialId === child.id}
          />
        ))}
      </MachineStateList>
    </MachineRoot>
  );
}

export function MachineViz(props: MachineVizProps) {
  return <MachineVisual {...props} />;
}
