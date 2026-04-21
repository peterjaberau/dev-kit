import { setup, assign } from "xstate"

export const otpVerificationMachine = setup({
  types: {
    context: {} as {
      attempts: number
      resendCount: number
    },
    events: {} as
      | { type: "SUBMIT_CODE" }
      | { type: "CODE_VALID" }
      | { type: "CODE_INVALID" }
      | { type: "RESEND_CODE" }
      | { type: "EDIT_NUMBER" },
  },
}).createMachine({
  id: "otpVerification",
  initial: "enteringCode",
  context: {
    attempts: 0,
    resendCount: 0,
  },
  states: {
    enteringCode: {
      initial: "ready",
      states: {
        ready: {
          after: {
            90000: {
              target: "#otpVerification.expired",
            },
          },
          on: {
            SUBMIT_CODE: {
              target: "verifying",
            },
            RESEND_CODE: {
              target: "cooldown",
              actions: assign({
                resendCount: ({ context }: any) => context.resendCount + 1,
              }),
            },
            EDIT_NUMBER: {
              target: "#otpVerification.editingNumber",
            },
          },
        },
        verifying: {
          on: {
            CODE_VALID: {
              target: "#otpVerification.verified",
            },
            CODE_INVALID: [
              {
                guard: ({ context }) => context.attempts >= 2,
                target: "#otpVerification.locked",
              },
              {
                target: "ready",
                actions: assign({
                  attempts: ({ context }) => context.attempts + 1,
                }),
              },
            ],
          },
        },
        cooldown: {
          after: {
            30000: {
              target: "ready",
            },
          },
        },
      },
    },
    editingNumber: {
      on: {
        RESEND_CODE: {
          target: "enteringCode.cooldown",
        },
      },
    },
    verified: {
      type: "final",
    },
    expired: {
      on: {
        RESEND_CODE: {
          target: "enteringCode.cooldown",
        },
      },
    },
    locked: {
      on: {
        EDIT_NUMBER: {
          target: "editingNumber",
        },
      },
    },
  },
})
