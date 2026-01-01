// resource.actor.ts
import { setup, assign } from "xstate";

export interface ResourceContext<T = unknown> {
  data: T | null;
  error?: unknown;
}

export type ResourceEvent<TUpdate = unknown> =
  | { type: "set"; data: T }
  | { type: "update"; payload: TUpdate }
  | { type: "fail"; error: unknown };

export const createResourceActor = <TData, TUpdate = unknown>() =>
  setup({
    types: {
      context: {} as ResourceContext<TData>,
      events: {} as ResourceEvent<TUpdate>,
    },
  }).createMachine({
    id: "resource",
    initial: "idle",
    context: {
      data: null,
    },
    states: {
      idle: {
        on: {
          set: {
            actions: assign({
              data: (_, e) => e.data,
            }),
          },
          update: "updating",
        },
      },
      updating: {
        on: {
          set: {
            target: "idle",
            actions: assign({
              data: (_, e) => e.data,
            }),
          },
          fail: {
            target: "idle",
            actions: assign({
              error: (_, e) => e.error,
            }),
          },
        },
      },
    },
  });
