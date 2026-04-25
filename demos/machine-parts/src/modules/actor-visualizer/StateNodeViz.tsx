import {
  getChildren,
  getOutEdges,
  getRelativeDistance,
  type GraphNode,
  type GraphEdge,
} from '@statelyai/graph';
import { useMemo } from 'react';
import { useSelector } from '@xstate/store-react';
import { StateNodeActions } from "./components/state-node/StateNodeActions"
import { StateNodeCard } from "./components/state-node/StateNodeCard"
import { StateNodeChildren } from "./components/state-node/StateNodeChildren"
import { StateNodeDescription } from "./components/state-node/StateNodeDescription"
import { StateNodeHeader } from "./components/state-node/StateNodeHeader"
import { StateNodeInvocation } from "./components/state-node/StateNodeInvocation"
import { StateNodeRoot } from "./components/state-node/StateNodeRoot"
import { StateNodeTransitionItem } from "./components/state-node/StateNodeTransitionItem"
import { StateNodeTransitionList } from "./components/state-node/StateNodeTransitionList"
import { TransitionVisual } from './TransitionViz';
import { StateNodeData, TransitionData, MachineGraph, getEventCategory } from "./utils"
import { appStore } from './lib/store';

interface StateNodeVizProps {
  node: GraphNode<StateNodeData>;
  graph: MachineGraph;
  isInitial?: boolean;
  isRegion?: boolean;
}

export function StateNodeVisual({ node, graph, isInitial, isRegion }: StateNodeVizProps) {
  const children = getChildren(graph, node.id) as GraphNode<StateNodeData>[];
  const outEdges = getOutEdges(graph, node.id) as GraphEdge<TransitionData>[];
  const { data } = node;
  const isHighlighted = useSelector(appStore, (s) =>
    s.context.highlights.has(node.id),
  );
  const isSimActive = useSelector(appStore, (s) =>
    s.context.simActiveIds.has(node.id),
  );

  const isAtomic = data.type === 'atomic' || data.type === null;
  const isFinal = data.type === 'final';
  const isParallel = data.type === 'parallel';
  const isHistory = data.type === 'history';
  const isChoice =
    isAtomic &&
    data.invocations.length === 0 &&
    outEdges.length > 1 &&
    outEdges.every(
      (e) =>
        getEventCategory(e.data.eventType) === 'always' && e.data.guard,
    );

  const sortedChildren = useMemo(() => {
    if (isParallel) return children; // parallel regions don't have ordering
    return [...children].sort((a, b) => {
      const da = getRelativeDistance(graph, a.id) ?? Infinity;
      const db = getRelativeDistance(graph, b.id) ?? Infinity;
      return da - db;
    });
  }, [children, graph, isParallel]);

  return (
    <StateNodeRoot id={node.id}>
      <StateNodeCard
        isAtomic={isAtomic}
        isFinal={isFinal}
        isHighlighted={isHighlighted}
        isRegion={isRegion}
        isSimActive={isSimActive}
      >
        <StateNodeHeader
          historyType={data.historyType}
          isChoice={isChoice}
          isFinal={isFinal}
          isHistory={isHistory}
          isInitial={isInitial}
          isParallel={isParallel}
          label={data.key}
        />

        {data.description && (
          <StateNodeDescription description={data.description} />
        )}

        {data.invocations.length > 0 && (
          <StateNodeInvocation invocations={data.invocations} />
        )}

        {(data.entry.length > 0 || data.exit.length > 0) && (
          <StateNodeActions entry={data.entry} exit={data.exit} />
        )}

        {children.length > 0 && (
          <StateNodeChildren isParallel={isParallel}>
            {sortedChildren.map((child) => (
              <StateNodeVisual
                key={child.id}
                node={child}
                graph={graph}
                isInitial={data.initialId === child.id}
                isRegion={isParallel}
              />
            ))}
          </StateNodeChildren>
        )}
      </StateNodeCard>

      {outEdges.length > 0 && (
        <StateNodeTransitionList>
          {outEdges.map((edge) => (
            <StateNodeTransitionItem key={edge.id}>
              <TransitionVisual
                edge={edge}
                graph={graph}
                sourceId={node.id}
                isFirst={false}
              />
            </StateNodeTransitionItem>
          ))}
        </StateNodeTransitionList>
      )}
    </StateNodeRoot>
  );
}

export function StateNodeViz(props: StateNodeVizProps) {
  return <StateNodeVisual {...props} />;
}
