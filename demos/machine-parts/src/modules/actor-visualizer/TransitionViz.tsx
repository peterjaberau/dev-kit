import type { GraphEdge } from '@statelyai/graph';
import { useSelector } from '@xstate/store-react';
import { useRef } from 'react';
import { TransitionActions } from './components/transition/TransitionActions';
import { TransitionDescription } from "./components/transition/TransitionDescription"
import { TransitionEvent } from "./components/transition/TransitionEvent"
import { TransitionGuard } from "./components/transition/TransitionGuard"
import { TransitionRoot } from "./components/transition/TransitionRoot"
import { TransitionTimerProgress } from "./components/transition/TransitionTimerProgress"
import { TransitionData, MachineGraph, getRelativeTarget, getEventCategory, useTick } from "./utils"
import {
  appStore,
  getNextSimAllIds,
  getActiveTimerProgress,
} from './lib/store';

interface TransitionVizProps {
  edge: GraphEdge<TransitionData>;
  graph: MachineGraph;
  sourceId: string;
  isFirst?: boolean;
}

export function TransitionVisual({
  edge,
  graph,
  sourceId,
  isFirst,
}: TransitionVizProps) {
  const { data }: any = edge;
  const mode = useSelector(appStore, (s) => s.context.mode);
  const isSim = mode === 'sim';
  const isActive = useSelector(appStore, (s) =>
    s.context.simActiveIds.has(sourceId),
  );
  const targetDisplay = data.isTargetless
    ? null
    : getRelativeTarget(sourceId, edge.targetId, graph);

  const prefix = data.guardPrefix;
  const eventCategory = getEventCategory(data.eventType);
  const highlightedIdsRef = useRef<string[]>([]);

  // Tick to animate progress bar for active after-timers
  useTick(isSim && eventCategory === 'after');

  const timerProgress =
    isSim && eventCategory === 'after'
      ? getActiveTimerProgress(data.eventType)
      : null;

  const simEvent = {
    type: data.eventType,
    ...(data.guard ? { '@xstate.guard': data.guard } : {}),
  };

  return (
    <TransitionRoot
      isActive={isActive}
      isFirst={isFirst}
      isSim={isSim}
      onClick={() => {
        if (isSim && data.eventType && eventCategory !== 'always') {
          appStore.trigger.simSend({ event: simEvent });
        }
      }}
      onMouseEnter={() => {
        if (isSim) {
          // Highlight what would become active if this event were sent
          const nextIds = [...getNextSimAllIds(simEvent)];
          highlightedIdsRef.current = nextIds;
          if (nextIds.length > 0) {
            appStore.trigger.highlight({ ids: nextIds });
          }
        } else if (!data.isTargetless) {
          highlightedIdsRef.current = [edge.targetId];
          appStore.trigger.highlight({ ids: [edge.targetId] });
        }
      }}
      onMouseLeave={() => {
        if (highlightedIdsRef.current.length > 0) {
          appStore.trigger.unhighlight({ ids: highlightedIdsRef.current });
          highlightedIdsRef.current = [];
        }
      }}
    >
      {timerProgress !== null && (
        <TransitionTimerProgress progress={timerProgress} />
      )}

      <TransitionGuard guard={data.guard} prefix={prefix} />
      <TransitionEvent
        category={eventCategory}
        displayEvent={data.displayEvent}
        isSim={isSim}
        targetDisplay={targetDisplay}
        targetId={edge.targetId}
      />

      {data.description && (
        <TransitionDescription description={data.description} />
      )}

      {data.actions.length > 0 && (
        <TransitionActions actions={data.actions} />
      )}
    </TransitionRoot>
  );
}

export function TransitionViz(props: TransitionVizProps) {
  return <TransitionVisual {...props} />;
}
