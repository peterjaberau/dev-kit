import { assign } from "xstate"
import { getJsonRepresentationType } from './functions'

// manager
const jsonRepresentationTypeHandler = assign(({ context, event }: any, params) => {
  const json = params;
  context.execution.json = {

  }



}