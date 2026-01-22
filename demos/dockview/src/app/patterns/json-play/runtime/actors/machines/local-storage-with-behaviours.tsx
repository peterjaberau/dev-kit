import { setup, assign } from "xstate"

export function defineBehavior(config) {
  return config
}

export function runBehaviors({ behaviors, event, sendBack }) {
  for (const behavior of behaviors) {
    if (behavior.on !== event.type) continue

    const guardResult = behavior.guard ? behavior.guard({ event }) : true

    if (!guardResult) continue

    for (const actionFn of behavior.actions) {
      const actions = actionFn({ event }, guardResult)

      for (const action of actions) {
        if (action.type === "execute") {
          sendBack(action.event)
        }

        if (action.type === "raise") {
          sendBack(action.event)
        }
      }
    }
  }
}

export const loadBehavior = defineBehavior({
  on: "init",

  actions: [
    () => [
      {
        type: "execute",
        event: { type: "load-from-storage" },
      },
    ],
  ],
})

export const setItemBehavior = defineBehavior({
  on: "setItem",

  actions: [
    ({ event }) => [
      {
        type: "execute",
        event: {
          type: "apply-set",
          key: event.key,
          value: event.value,
        },
      },
    ],
  ],
})

export const getItemBehavior = defineBehavior({
  on: "getItem",

  actions: [
    ({ event }) => [
      {
        type: "execute",
        event: {
          type: "apply-get",
          key: event.key,
        },
      },
    ],
  ],
})

export const removeItemBehavior = defineBehavior({
  on: "removeItem",

  actions: [
    ({ event }) => [
      {
        type: "execute",
        event: {
          type: "apply-remove",
          key: event.key,
        },
      },
      {
        type: "execute",
        event: { type: "persist" },
      },
    ],
  ],
})

export const persistBehavior = defineBehavior({
  on: "persist",

  actions: [
    ({ snapshot }) => [
      {
        type: "effect",
        run: () => {
          localStorage.setItem(snapshot.appKey, JSON.stringify(snapshot.store))
        },
      },
    ],
  ],
})

export const clearBehavior = defineBehavior({
  on: "clear",

  actions: [
    () => [
      {
        type: "execute",
        event: { type: "apply-clear" },
      },
      {
        type: "execute",
        event: { type: "persist" },
      },
    ],
  ],
})

const behaviors = [loadBehavior, setItemBehavior, getItemBehavior, removeItemBehavior, clearBehavior]

export const localStorageMachine = setup({
  actions: {
    loadFromStorage: assign(({ context }) => {
      const raw = localStorage.getItem(context.appKey)

      if (raw) {
        context.store = JSON.parse(raw)
      } else {
        context.store = {}
        localStorage.setItem(context.appKey, JSON.stringify(context.store))
      }
    }),

    applySet: assign(({ context, event }) => {
      context.store[event.key] = event.value
      context.result = event.value
    }),

    applyGet: assign(({ context, event }) => {
      context.result = context.store[event.key]
    }),

    applyRemove: assign(({ context, event }) => {
      delete context.store[event.key]
      context.result = undefined
    }),

    applyClear: assign(({ context }) => {
      context.store = {}
      context.result = undefined
    }),

    persist: ({ context }) => {
      localStorage.setItem(context.appKey, JSON.stringify(context.store))
    },
  },
}).createMachine({
  id: "localStorage",

  context: ({ input }) => ({
    appKey: input?.appKey || "__json_play__",
    config: {},
    current: {},
    store: {},
    result: undefined,
  }),

  entry: ({ self }) => {
    runBehaviors({
      behaviors,
      event: { type: "init" },
      sendBack: self.send,
    })
  },

  on: {
    "*": {
      actions: ({ self, event }) => {
        runBehaviors({
          behaviors,
          event,
          sendBack: self.send,
        })
      },
    },

    "load-from-storage": { actions: "loadFromStorage" },
    "apply-set": { actions: "applySet" },
    "apply-get": { actions: "applyGet" },
    "apply-remove": { actions: "applyRemove" },
    "apply-clear": { actions: "applyClear" },
    persist: { actions: "persist" },
  },
})
