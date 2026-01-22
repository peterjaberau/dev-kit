// machine.ts
import { setup, assign } from "xstate"
import type { MachineContext, BehaviorEvent } from "./events"
import { toggleBehavior } from "./behavior.toggle"
import { runBehaviors } from "./behaviorRunner"

const behaviors = [toggleBehavior]

export const machine = setup({
  types: {
    context: {} as MachineContext,
    events: {} as BehaviorEvent,
  },
}).createMachine({
  id: "example",
  initial: "idle",

  context: {
    isOpen: false,
    isEnabled: true,
  },

  states: {
    idle: {
      on: {
        toggle: {
          actions: [
            ({ context, event }) => {
              runBehaviors({
                behaviors,
                context,
                event,
                assign: (updater) => {
                  Object.assign(context, updater(context))
                },
                raise: () => {},
              })
            },
          ],
        },
      },
    },
  },
})


/**
 * actor.send({ type: 'toggle', key: 'isOpen' })
 * // isOpen: false → true
 *
 * actor.send({ type: 'toggle', key: 'isEnabled' })
 * // isEnabled: true → false
 */