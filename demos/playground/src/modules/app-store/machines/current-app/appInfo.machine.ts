import { assign, setup } from "xstate"
const defaults: any = {
  updatedAt: "",
  updatedBy: "",
  appId: "",
  appName: "",
  public: false,
  appActivity: {
    modifier: "",
    modifiedAt: "",
  },
}

export const appInfoMachine = setup({
  types: {} as any,
  actions: {},
  actors: {},
  guards: {},
}).createMachine({
  initial: "idle",
  context: ({ input }: any) => ({
    ...defaults,
    ...input,
  }),
  states: {
    idle: {
      on: {},
    },
  },
})
