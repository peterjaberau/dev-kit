import { setup, assign } from "xstate"

export const elevatorMachine = setup({}).createMachine({
  id: "elevator",
  initial: "idle",
  context: {},
  states: {
    idle: {
      on: {
        CALL: "moving",
      },
    },
    moving: {
      on: {
        ARRIVED: "doorOpening",
        EMERGENCY_STOP: "emergency",
      },
    },
    doorOpening: {
      on: {
        FULLY_OPEN: "doorOpen",
      },
    },
    doorOpen: {
      on: {
        TIMER_EXPIRED: "doorClosing",
        OBSTRUCTION: "doorOpen",
        CALL: "doorClosing",
      },
    },
    doorClosing: {
      on: {
        FULLY_CLOSED: "idle",
        OBSTRUCTION: "doorOpening",
      },
    },
    emergency: {
      on: {
        RESET: "idle",
      },
    },
  },
})


