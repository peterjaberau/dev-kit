import { setup, assign } from "xstate"

export const parallelMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  },
}).createMachine({
  id: "parallel",
  initial: "preparing",
  states: {
    preparing: {
      states: {
        grindBeans: {
          initial: "grindingBeans",
          states: {
            grindingBeans: {
              on: {
                BEANS_GROUND: {
                  target: "beansGround",
                },
              },
            },
            beansGround: {
              type: "final",
            },
          },
        },
        boilWater: {
          initial: "boilingWater",
          states: {
            boilingWater: {
              on: {
                WATER_BOILED: {
                  target: "waterBoiled",
                },
              },
            },
            waterBoiled: {
              type: "final",
            },
          },
        },
      },
      type: "parallel",
      onDone: {
        target: "makingCoffee",
      },
    },
    makingCoffee: {},
  },
})
