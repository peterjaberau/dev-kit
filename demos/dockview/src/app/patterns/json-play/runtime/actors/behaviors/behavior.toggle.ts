// behavior.toggle.ts
import { defineBehavior } from "./behavior"
import type { MachineContext, ToggleEvent } from "./events"

export const toggleBehavior = defineBehavior<MachineContext, ToggleEvent>({
  on: "toggle",

  guard: ({ snapshot, event }) => {
    const value = snapshot[event.key]
    if (typeof value === "boolean") {
      return { key: event.key }
    }
    return false
  },

  actions: [
    ({ snapshot }, { key }) => [
      {
        type: "assign",
        updater: (context: MachineContext) => ({
          ...context,
          [key]: !context[key],
        }),
      },
    ],
  ],
})
