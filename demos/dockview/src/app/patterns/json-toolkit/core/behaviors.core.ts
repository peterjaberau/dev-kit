import { corePriority } from "./priority"

export const coreInsertBehaviors = [
  defineBehavior({
    on: "insert.text",
    actions: [
      ({ snapshot, event }, { activeDecorators, activeAnnotations }) => [
        raise({
          type: "insert.child",
          child: {
            _type: snapshot.context.schema.span.name,
            text: event.text,
          },
        }),
      ],
    ],
  }),
]

export const coreBehaviorsConfig = [...coreInsertBehaviors]