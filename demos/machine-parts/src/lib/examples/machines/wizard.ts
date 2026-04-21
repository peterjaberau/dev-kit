import { setup, assign } from "xstate"

export const wizardMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  },
}).createMachine({
  id: "wizard",
  initial: "personalInfo",
  states: {
    personalInfo: {
      initial: "editing",
      states: {
        editing: {
          on: { VALIDATE: "validating" },
        },
        validating: {
          on: {
            VALID: "#wizard.address",
            INVALID: "editing",
          },
        },
      },
    },
    address: {
      initial: "editing",
      states: {
        editing: {
          on: {
            VALIDATE: "validating",
            BACK: "#wizard.personalInfo",
          },
        },
        validating: {
          on: {
            VALID: "#wizard.review",
            INVALID: "editing",
          },
        },
      },
    },
    review: {
      on: {
        SUBMIT: "submitting",
        BACK: "address",
      },
    },
    submitting: {
      on: {
        SUCCESS: "complete",
        ERROR: "review",
      },
    },
    complete: {
      type: "final",
    },
  },
})
