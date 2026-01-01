// root.machine.ts
import { setup, assign, spawnChild, ActorRefFrom } from "xstate"
import { createResourceActor } from "./resource.actor"

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
            resources: ({ context, event }: any) => {
              if (context.resources[event.key]) {
                return context.resources
              }

              const actor = spawnChild(createResourceActor(), { id: event.key })

              return {
                ...context.resources,
                [event.key]: actor,
              }
            },
          }),
        },

        "remove.resource": {
          actions: assign({
            resources: ({ context }, event) => {
              const { [event.key]: _, ...rest } = context.resources
              return rest
            },
          }),
        },
      },
    },
  },
})
