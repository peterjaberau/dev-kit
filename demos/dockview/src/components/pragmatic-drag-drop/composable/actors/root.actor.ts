// root.machine.ts
import { setup, assign, spawnChild, ActorRefFrom } from "xstate";
import { createResourceActor } from "./resource.actor";

type ResourceActor = ActorRefFrom<
  ReturnType<typeof createResourceActor>
>;

interface RootContext {
  resources: Record<string, ResourceActor>;
}

type RootEvent =
  | {
  type: "spawn.resource";
  key: string;
}
  | {
  type: "remove.resource";
  key: string;
};

export const rootActor = setup({
  types: {
    context: {} as RootContext,
    events: {} as RootEvent,
  },
}).createMachine({
  id: "root",
  initial: "running",
  context: {
    resources: {},
  },
  states: {
    running: {
      on: {
        "spawn.resource": {
          actions: assign({
            resources: ({ context }, event) => {
              if (context.resources[event.key]) {
                return context.resources;
              }

              const actor = spawnChild(
                createResourceActor(),
                { id: event.key }
              );

              return {
                ...context.resources,
                [event.key]: actor,
              };
            },
          }),
        },

        "remove.resource": {
          actions: assign({
            resources: ({ context }, event) => {
              const { [event.key]: _, ...rest } = context.resources;
              return rest;
            },
          }),
        },
      },
    },
  },
});
