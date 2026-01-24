import { fromPromise } from "xstate"
import { config as configDefaults } from "../../store"
import { createRandomId } from "./functions"
import { stableJson } from '../utilities'

/**
 * JSON representations cheat-sheet
 *
 * ┌────────────┬───────────────────────────────┬──────────────────────────────────────────┐
 * │ State      │ Example                       │ Usage / Conversion                       │
 * ├────────────┼────────────────────────────── ┼──────────────────────────────────────────┤
 * │ Serialized │ "{\"user\":{\"id\":1,\"name\" │ • Stored in DB / document                │
 * │ JSON       │ :\"Alice\"},\"active\":true}" │ • Compact, transport-safe                │
 * │ (string)   │                               │                                          │
 * │            │                               │ → Raw (pretty):                          │
 * │            │                               │   JSON.stringify(JSON.parse(s), null, 2) │
 * │            │                               │ → Parsed (runtime):                      │
 * │            │                               │   JSON.parse(s)                          │
 * ├────────────┼───────────────────────────────┼──────────────────────────────────────────┤
 * │ Raw JSON   │ {                             │ • Human-readable JSON text               │
 * │ (string)   │   "user": {                   │ • Used in editors / files                │
 * │            │     "id": 1,                  │                                          │
 * │            │     "name": "Alice"           │ → Serialized (compact):                  │
 * │            │   },                          │   JSON.stringify(JSON.parse(r))          │
 * │            │   "active": true              │ → Parsed (runtime):                      │
 * │            │ }                             │   JSON.parse(r)                          │
 * ├────────────┼───────────────────────────────┼──────────────────────────────────────────┤
 * │ Parsed JSON│ { user: { id: 1,              │ • Runtime JS object                      │
 * │ (object)   │   name: "Alice" },            │ • Used by logic / UI / state machines    │
 * │            │   active: true }              │                                          │
 * │            │                               │ → Raw (pretty):                          │
 * │            │                               │   JSON.stringify(o, null, 2)             │
 * │            │                               │ → Serialized (compact):                  │
 * │            │                               │   JSON.stringify(o)                      │
 * └────────────┴───────────────────────────────┴──────────────────────────────────────────┘
 *
 * Rule of thumb:
 * - Serialized → storage / transport
 * - Raw        → readability / editing
 * - Parsed     → computation / runtime
 */

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



// export const createJsonStable = async (input: any = {}) => {
//
//   const intialJson =
//
// }

export const withJsonAccessor = (doc) => {
  if (!doc || doc.type !== "raw") return doc

  return {
    ...doc,
    json() {
      return JSON.parse(doc.contents)
    },
  }
}