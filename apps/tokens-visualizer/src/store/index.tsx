import { createStoreHook } from "@xstate/store/react"

export const useStore: any = createStoreHook({
  context: {
    session: "",
    data: [],
    profile: {
      id: null,
    },
    count: 0,
    active: false,
  } as any,
  on: {
    inc: (context: any, event: { by: number }, enqueue: any) => {
      enqueue.emit.increased({ by: event.by })

      return {
        ...context,
        count: context.count + event.by,
      }
    },

    toggleActive: (context: any) => {
      return {
        ...context,
        active: !context.active,
      }
    },

    setToggle: (context: any, event: any) => {
      return {
        ...context,
        [event.key]: !context[event.key],
      }
    },
  },
  emits: {
    increased: (payload: { by: number }) => {
      console.log("--increased---", payload)
    },
    onActiveChange: (payload: any) => {
      console.log("--onActiveChange---", payload)
    },
    toggled: (payload: any) => {
      console.log("--toggled---", payload)
    },
  },
})
