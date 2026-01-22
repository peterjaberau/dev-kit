import { assertEvent, assign, emit, enqueueActions, setup, type ActorRefFrom } from "xstate"




export const instanceMachine = setup({
  actions: {
    'handle behavior event': (({context, event, self}) => {
      }),
  }
}).createMachine({})
