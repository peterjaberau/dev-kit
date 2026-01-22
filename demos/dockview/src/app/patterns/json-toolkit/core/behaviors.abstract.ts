import { defineBehavior } from "./behaviors.types"

export const abstractModifyBehaviors = [
  defineBehavior({
    on: "modify.indent",
    actions: [({ event }) => [{ type: "execute", event: { type: "modify.indent", indent: event.indent } }]],
  }),
]

export const abstractLogBehaviors = [
  defineBehavior({
    on: "log",
    actions: [
      ({ event, snapshot }) => [
        {
          type: "effect",
          effect: () => console.log("---abstractLogBehaviors---", { snapshot, context: snapshot.context, event }),
        },
      ],
    ],
  }),
]

export const abstractBehaviors = [...abstractModifyBehaviors, ...abstractLogBehaviors]
