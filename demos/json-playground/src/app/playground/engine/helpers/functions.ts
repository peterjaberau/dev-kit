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

export const isJsonPrimitive = (value: any) =>
  value === null ||
  typeof value === "string" ||
  typeof value === "number" ||
  typeof value === "boolean"

/**
 * Check if value is already a parsed JSON object or array
 *
 * FROM: { "a": 1 }        → true
 * FROM: [1, 2]            → true
 * FROM: '{"a":1}'         → false
 * FROM: "text"            → false
 */
export const isParsedJson = (value: any) =>
  value !== null &&
  typeof value === "object" &&
  (Array.isArray(value) || value.constructor === Object)

/**
 * Check if value is a string (not necessarily valid JSON)
 *
 * FROM: '{"a":1}' → true
 * FROM: "hello"   → true
 * FROM: { a: 1 }  → false
 */
export const isJsonString = (value: any) => typeof value === "string"

/**
 * Parse input into a JSON object/array if possible
 *
 * FROM: '{"a":1}'     → { a: 1 }
 * FROM: { a: 1 }      → { a: 1 }
 * FROM: "hello"       → null
 * FROM: 123           → null
 */
export const makeParsedJson = (input: any) => {

  if (isJsonPrimitive(input)) return input

  if (isParsedJson(input)) return input

  if (isJsonString(input)) {
    try {
      const parsed = JSON.parse(input)
      return isParsedJson(parsed) || isJsonPrimitive(parsed) ? parsed : null
    } catch {
      return null
    }
  }

  return null
}

/**
 * Return a fully minified JSON string (no whitespace)
 *
 * FROM: { a: 1 }              → '{"a":1}'
 * FROM: '{ "a": 1 }'          → '{"a":1}'
 */
export const makeMinifiedJson = (input: any) => {
  const parsed = makeParsedJson(input)
  if (!parsed) return null
  return JSON.stringify(parsed)
}

/**
 * Return a canonical JSON STRING representation
 * (same output as minified, different semantic intent)
 *
 * FROM: { a: 1 }              → '{"a":1}'
 * FROM: '{ "a": 1 }'          → '{"a":1}'
 */
export const makeStringJson = (input: any) => {
  const parsed = makeParsedJson(input)
  if (!parsed) return null
  return JSON.stringify(parsed)
}

/**
 * Return human-friendly (pretty-printed) JSON
 *
 * FROM: { a: 1 } →
 * {
 *   "a": 1
 * }
 */
export const makeFriendlyJson = (input: any, options = { indent: 2 }) => {
  const parsed = makeParsedJson(input)
  if (!parsed) return null
  return JSON.stringify(parsed, null, options.indent)
}

/**
 * Return compacted JSON (single line, readable spacing)
 *
 * FROM: { a: 1, b: 2 } →
 * '{ "a": 1, "b": 2 }'
 */
export const makeCompactedJson = (input: any) => {
  const parsed = makeParsedJson(input)
  if (!parsed) return null

  return JSON.stringify(parsed)
    .replace(/:/g, ": ")
    .replace(/,/g, ", ")
}

/**
 * Return all common JSON representations at once
 *
 * FROM: { a: 1 } →
 * {
 *   parsed:   { a: 1 },
 *   string:   '{"a":1}',
 *   minified: '{"a":1}',
 *   compacted:'{ "a": 1 }',
 *   friendly: '{\n  "a": 1\n}'
 * }
 */
export const makeJsonPresentation = (input: any, options = { indent: 2 }) => {
  const parsed = makeParsedJson(input)
  if (!parsed) return null

  return {
    parsed,
    string: makeStringJson(parsed),
    minified: makeMinifiedJson(parsed),
    compacted: makeCompactedJson(parsed),
    friendly: makeFriendlyJson(parsed, options),
  }
}

export const canParseJson = (value: any): boolean => makeParsedJson(value) !== null

