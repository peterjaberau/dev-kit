import { fromPromise } from 'xstate'
import Oas from "oas"

export const createInstanceOAS = fromPromise(async ({ input }: any) => {
  const { dataset } = input
  return new Oas(dataset)

})
