import { assign, setup } from "xstate"

const defaults = {
  userID: "",
  uid: "",
  nickname: "",
  language: "",
  email: "",
  avatar: "",
  createdAt: "",
  updatedAt: "",
}

export const currentUserMachine = setup({
  types: {} as any,
  actions: {
  },
  actors: {},
  guards: {},
}).createMachine({
  id: "currentUser",
  initial: "idle",
  context: ({ input }: any) => ({
    ...defaults,
    ...input,
  }),
  states: {
    idle: {
      on: {
      },
    },
  },
})
