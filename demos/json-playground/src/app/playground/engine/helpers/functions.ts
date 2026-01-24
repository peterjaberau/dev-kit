import { customRandom } from "nanoid"

export const createRandomId = () => {
  const nanoid = customRandom("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 12, (bytes) => {
    const array = new Uint8Array(bytes)
    crypto.getRandomValues(array)
    return array
  })

  return nanoid()
}

/**
 * args:
 * @param json - The JSON input which can be in various forms.
 * returns:
 * - "serialized" → Compact JSON string (no newlines / indentation)
 * - "raw"        → Pretty / human-readable JSON string
 * - "parsed"     → Parsed JSON object
 * - "unknown"    → Not valid JSON
 *
 * Rule of thumb:
 * - Serialized → storage / transport
 * - Raw        → readability / editing
 * - Parsed     → computation / runtime
 */

/** return true if value is parsed JSON object otherwise return false */
export const isParsedJson = (value: any) =>
  value !== null && typeof value === "object" && (Array.isArray(value) || value.constructor === Object)

/** return true if value is JSON string object otherwise return false */
export const isJsonString = (value: any) => typeof value === "string"

/** return parsed json either if the input is a string or not, otherwise returns null */
export const makeParsedJson = (input: any) => {
  if (isParsedJson(input)) return input

  if (isJsonString(input)) {
    try {
      const parsed = JSON.parse(input)
      return isParsedJson(parsed) ? parsed : null
    } catch {
      return null
    }
  }

  return null
}

/** return string json but not beautified. the input could be parsed then stringify, if string then return the input as it */
export const makeMinifiedJson = (input: any) => {
  const parsed = makeParsedJson(input)
  if (!parsed) return null
  return JSON.stringify(parsed)
}

/** return string beautified json. the input could be js object or string. either ways it should return responses beautified default ident = 2.
 * friendly: frme makeFriendlyJson, default indent=2
 */
export const makeFriendlyJson = (input: any, options = { indent: 2 }) => {
  const parsed = makeParsedJson(input)
  if (!parsed) return null
  return JSON.stringify(parsed, null, options.indent)
}

/** return string beautified json. the input could be js object or string. either ways it should return responses.
 * parsed: from makeParsedJson
 * minified: from makeMinifiedJson
 * friendly: frme makeFriendlyJson, default indent=2
 */
export const makePresentationJson = (input: any, options = { indent: 2 }) => {
  const parsed = makeParsedJson(input)
  if (!parsed) return null

  return {
    parsed,
    serialized: JSON.stringify(parsed),
    friendly: makeFriendlyJson(parsed, options),
  }
}

export const canParseJson = (value: any): boolean => makeParsedJson(value) !== null

export function stabilizeJsonStructure(json: unknown, keyOrder: string[] = []): unknown {
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
    return json.map((c) => stabilizeJsonStructure(c, keyOrder))
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
    return json.map((c) => stabilizeJsonStructure(c))
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
      result[key] = stabilizeJsonStructure((json as Record<string, unknown>)[key])
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
      result[key] = stabilizeJsonStructure((json as Record<string, unknown>)[key])
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
