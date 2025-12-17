import { fromPromise } from 'xstate'
import Oas from "oas"

export const createOasInstance = fromPromise(async ({ input }: any) => {
  const { apiSpec } = input
  const oas = new Oas(apiSpec)

  return oas
})
