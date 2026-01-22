Behaviors allows to customize how users interact with the machine actor by hooking into events during the runtime experience.

All behaviors follow this process:

- Listen for an event.
- Use a guard to decide if they should run or not.
- Trigger a set of actions to perform on the editor.

Behaviors are defined with the defineBehavior helper

```typescript
defineBehavior({
  on: 'insert.text',
  guard: ({snapshot, event}) => event.text === 'a',
  actions: [
    ({snapshot, event}) => [
      {type: 'execute', event: {type: 'insert.text', text: 'A'}},
    ],
  ],
})
```

Revisiting the three step process above:

on listens for the event.
guard handles the conditional.
actions sends, or invokes, the desired actions