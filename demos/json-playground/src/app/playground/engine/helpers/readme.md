| Scenario / Boundary | JSON form | Why | Example payload | Code |
|-------------------|-----------|-----|-----------------|------|
| **In-memory logic (JS runtime)** | Parsed (object) | JS operates on objects | `{ a: 1 }` | `const data = { a: 1 }` |
| **Passing data between functions** | Parsed (object) | No conversion needed | `{ a: 1 }` | `fn({ a: 1 })` |
| **Storing in DB / KV / cache** | **Serialized JSON (string)** | Compact, storage-safe | `'{"a":1}'` | `JSON.stringify(obj)` |
| **Sending over network (API, fetch)** | **Serialized JSON (string)** | Transport format | `'{"a":1}'` | `fetch(url, { body: JSON.stringify(obj) })` |
| **Saving to localStorage** | **Serialized JSON (string)** | Storage APIs require string | `'{"a":1}'` | `localStorage.setItem(key, JSON.stringify(obj))` |
| **Logging / debugging** | Raw JSON (string) | Human-readable | `'{"a":1}'` | `console.log(JSON.stringify(obj))` |
| **User editing / text editor** | Raw JSON (string) | Editable text | `'{"a":1}'` | `editor.value = JSON.stringify(obj)` |
| **Re-entering JS logic from storage** | Parsed (object) | Restore structure | `{ a: 1 }` | `JSON.parse(serialized)` |

**Rule:**
- **Serialize (`JSON.stringify`) at system boundaries**
- **Parse (`JSON.parse`) when entering JS logic**