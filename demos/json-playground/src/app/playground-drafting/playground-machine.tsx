import { setup } from "xstate"

export const playgroundApi = {
  types: {
    events: [
      {
        type: 'add editor'
      },
      {
        type: 'editor.mutation',
      }
    ]
  }

}


export const playgroundMachine = setup({

}).createMachine({

})