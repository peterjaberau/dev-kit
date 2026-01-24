import { fromPromise } from "xstate"
import { Schema } from "@jsonhero/json-schema-fns";
import { inferSchema } from "@jsonhero/schema-infer";
import { makeParsedJson } from './functions'
import { config as configDefaults } from "../../store"
import { createRandomId } from "./functions"
import { stableJson } from "../utilities"

export const getConfigDefaultsOperation = fromPromise(async ({ input }) => {
  return configDefaults
})

export const makeDocFromJson = async (input: any = {}) => {
  // 1. Prepare input
  const rawContent = input?.content ?? null
  const id = createRandomId()

  // 2. Validate / normalize
  let content = rawContent

  if (rawContent !== null && typeof rawContent === "string") {
    try {
      // validate JSON
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

export const makeStabeJson: any = (input: any = {}) => {
  const { json, keyOrder = [] } = input

  /**
   * CASE 1 — Array of objects with a shared shape
   * This block applies ONLY when:
   * - json is an array
   * - array is not empty
   * - every item is a non-null object
   *
   * Use case:
   * API responses, database rows, table-like JSON
   *
   * FROM:
   * [
   *   { id: 1, name: "A" },
   *   { name: "B", id: 2 }
   * ]
   *
   * (Second object matches the first object’s shape but key order differs)
   *
   * TO:
   * [
   *   { id: 1, name: "A" },
   *   { id: 2, name: "B" }
   * ]
   *
   * (Key order is derived from the FIRST element and applied to all)
   */
  if (Array.isArray(json) && json.length > 0 && json.every((c) => typeof c === "object" && c !== null)) {
    const keyOrder = Object.keys(json[0])
    return json.map((c) => makeStabeJson(c, keyOrder))
  }

  /**
   * CASE 2 — Array without a uniform object schema
   * This block applies when:
   * - json is an array
   * - BUT elements are primitives or mixed types
   *
   * Use case:
   * lists, mixed payloads, partial JSON data
   *
   * FROM:
   * [1, { b: 2, a: 1 }]
   *
   * (No consistent object schema to infer ordering from)
   *
   * TO:
   * [1, { b: 2, a: 1 }]
   *
   * (Array order preserved; objects are NOT reordered)
   */
  if (Array.isArray(json)) {
    return json.map((c) => makeStabeJson(c))
  }

  /**
   * CASE 3 — Object with an inherited key order
   * This block applies when:
   * - json is an object
   * - keyOrder was passed down from CASE 1
   *
   * Use case:
   * individual items inside an array of objects
   *
   * keyOrder: ["id", "name"]
   *
   * FROM:
   * { name: "B", id: 2 }
   *
   * (Same object shape as others, but unordered keys)
   *
   * TO:
   * { id: 2, name: "B" }
   *
   * (Keys reordered to match the array’s canonical schema)
   */
  if (typeof json === "object" && json !== null && keyOrder.length > 0) {
    const keys = Object.keys(json)
    const sortedKeys = keys.sort((a, b) => {
      const aIndex = keyOrder.indexOf(a)
      const bIndex = keyOrder.indexOf(b)

      if (aIndex === -1 || bIndex === -1) {
        return 0
      }

      return aIndex - bIndex
    })
    const result = {} as Record<string, unknown>
    for (const key of sortedKeys) {
      result[key] = makeStabeJson((json as Record<string, unknown>)[key])
    }
    return result
  }

  /**
   * CASE 4 — Standalone or nested object without schema context
   * This block applies when:
   * - json is an object
   * - BUT no keyOrder is available
   *
   * Use case:
   * configuration objects, nested maps, arbitrary JSON
   *
   * FROM:
   * { b: 2, a: { y: 2, x: 1 } }
   *
   * (No external reference to determine preferred key order)
   *
   * TO:
   * { b: 2, a: { y: 2, x: 1 } }
   *
   * (Key order preserved; recursion only stabilizes children)
   */
  if (typeof json === "object" && json !== null) {
    const result = {} as Record<string, unknown>
    for (const key of Object.keys(json)) {
      result[key] = makeStabeJson((json as Record<string, unknown>)[key])
    }
    return result
  }

  /**
   * CASE 5 — Primitive JSON values
   * This block applies when:
   * - json is a primitive (string, number, boolean, null)
   *
   * Use case:
   * leaf values in any JSON structure
   *
   * FROM: "text", 123, true, null
   * TO:   "text", 123, true, null
   */
  return json
}

/** input: parsed JSON, basically the stable one and infer a JSON Schema from it */
export const makeSchemaFromJson: any = (input: any) => {
  const { json, includeSchema } = input


  const result = inferSchema(json).toJSONSchema({ includeSchema })

  console.log("--- makeSchemaFromJson ----", {
    json,
    result,
  })

  return inferSchema(json).toJSONSchema({ includeSchema })
}