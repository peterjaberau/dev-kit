import { fromPromise } from "xstate"
import { config as configDefaults } from "../../store"
import { createRandomId } from "./functions"

export const getConfigDefaultsOperation = fromPromise(async ({ input }) => {
  return configDefaults
})

export  const createDocFromJson = async (input: any = {}) => {
  // 1. Prepare input
  const rawContent = input?.content ?? null
  const id = createRandomId()



  // 2. Validate / normalize
  let content = rawContent

  if (rawContent !== null && typeof rawContent === "string") {
    try {
      JSON.parse(rawContent)
    } catch {
      throw new Error("Invalid JSON content")
    }
  }

  // 3. Assemble payload
  const doc = {
    id,
    type: "raw",
    title: input?.title ?? "Untitled",
    readOnly: input?.options?.readOnly ?? false,
    content,
  }

  // 4. Return
  return doc
}

