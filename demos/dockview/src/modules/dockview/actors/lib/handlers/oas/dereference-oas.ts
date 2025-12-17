import { fromPromise } from 'xstate'
import Oas from "oas"

export const dereferenceOas = fromPromise(async ({ input }: any) => {
  const { oas } = input
  return await oas.dereference()
})
