// behavior.ts
export type BehaviorGuardResult<T = unknown> = boolean | T

export type BehaviorActionFn<TContext, TEvent, TGuardResult> = (
  args: { snapshot: TContext; event: TEvent },
  guardResult: TGuardResult,
) => BehaviorAction[]

export type BehaviorAction =
  | {
      type: "assign"
      updater: (context: any) => any
    }
  | {
      type: "raise"
      event: any
    }

export type Behavior<TContext, TEvent> = {
  on: TEvent["type"]
  guard?: (args: { snapshot: TContext; event: TEvent }) => BehaviorGuardResult
  actions: Array<BehaviorActionFn<TContext, TEvent, any>>
}

export function defineBehavior<TContext, TEvent>(behavior: Behavior<TContext, TEvent>) {
  return behavior
}
