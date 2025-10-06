import { setup } from "xstate"

/**
 * tokens = {
 *   "default-font-family": {
 *     "$schema": "https://opensource.adobe.com/spectrum-tokens/schemas/token-types/alias.json",
 *     "value": "{sans-serif-font-family}",
 *     "uuid": "45d43d4e-a4e4-4c5f-94ec-644a81300eb0"
 *   },
 *   "heading-size-xxxl": {
 *     "component": "heading",
 *     "$schema": "https://opensource.adobe.com/spectrum-tokens/schemas/token-types/alias.json",
 *     "value": "{font-size-1300}",
 *     "uuid": "db884bf9-e7b5-420a-b408-bd9a4d6bb0a4"
 *   },
 * }
 *
 * dictionary = [
 *   {
 *     "value": "default-font-family",
 *     "type": "token",
 *     "metadata": ""
 *   },
 * ]
 *
 *
 */


const rootMachine = setup({
  actions: {},
  actors: {},
  guards: {}
}).createMachine({

  context: (({ input }) => {
    return {
      dictionary: [],
    }
  })

})
