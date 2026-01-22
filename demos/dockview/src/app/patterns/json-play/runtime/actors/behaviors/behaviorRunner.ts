//This is the simplified equivalent of performEvent.

// behaviorRunner.ts
import type { Behavior, BehaviorAction } from "./behavior"

export function runBehaviors<TContext, TEvent extends { type: string }>({
  behaviors,
  context,
  event,
  assign,
  raise,
}: {
  behaviors: Array<Behavior<TContext, TEvent>>
  context: TContext
  event: TEvent
  assign: (updater: (ctx: TContext) => TContext) => void
  raise: (event: any) => void
}) {
  for (const behavior of behaviors) {
    if (behavior.on !== event.type) continue

    const guardResult = behavior.guard ? behavior.guard({ snapshot: context, event }) : true

    if (!guardResult) continue

    for (const actionFn of behavior.actions) {
      const actions = actionFn({ snapshot: context, event }, guardResult)

      for (const action of actions) {
        executeAction(action, assign, raise)
      }
    }
  }
}

function executeAction(
  action: BehaviorAction,
  assign: (updater: (ctx: any) => any) => void,
  raise: (event: any) => void,
) {
  switch (action.type) {
    case "assign":
      assign(action.updater)
      break
    case "raise":
      raise(action.event)
      break
  }
}
