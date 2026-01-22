import { setup } from "xstate"

export function defineBehavior(config) {
  return config
}

export const toggleBehavior = defineBehavior({
  on: "toggle",
  guard: ({ snapshot, event }) => {
    const currentValue = snapshot[event.key]
    if (typeof currentValue === "boolean") {
      return { key: event.key }
    }
    return false
  },
  actions: [
    ({ snapshot }, { key }) => [
      {
        type: "assign",
        updater: (context) => ({
          ...context,
          [key]: !context[key],
        }),
      },
    ],
  ],
})

export function runBehaviors({ behaviors, context, event, assign, raise }) {
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

function executeAction(action, assign, raise) {
  switch (action.type) {
    case "assign":
      assign(action.updater)
      break

    case "raise":
      raise(action.event)
      break
  }
}

export const machine = setup().createMachine({
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
              /*
              The machine does ONE thing:
              delegate the event to behaviors
              */
              runBehaviors({
                behaviors,
                context,
                event,

                // Adapter to XState assign
                assign: (updater) => {
                  Object.assign(context, updater(context))
                },

                // Not used here, but supported
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
 *
 * ↓
 * machine receives event
 *
 * ↓
 * machine delegates to runBehaviors
 *
 * ↓
 * toggleBehavior matches event type
 *
 * ↓
 * guard checks if isOpen is boolean
 *
 * ↓
 * assign action flips value
 *
 * ↓
 * context updated
 */