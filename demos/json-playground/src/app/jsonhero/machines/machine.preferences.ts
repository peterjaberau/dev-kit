import { setup, assign } from "xstate"

/**
 * Preferences state machine
 * This machine is a 1-to-1 behavioral replacement for the React PreferencesProvider
 * logic shown earlier. It loads preferences once, applies defaults, keeps them in
 * memory, and automatically persists changes to localStorage.
 */
export const preferencesMachine = setup({
  actions: {
    /**
     * Load preferences from localStorage on startup.
     * - Reads the stored value
     * - Parses JSON (or falls back to an empty object)
     * - Applies default values for missing / falsy keys
     * - Stores the result in machine context as the source of truth
     */
    loadPreferences: assign(() => {
      // Read raw preferences string from localStorage
      const saved = localStorage.getItem("preferences")

      // Parse saved preferences or fall back to an empty object
      const parsed = JSON.parse(saved || "{}")

      // Default preferences (same as PreferencesDefaults in the provider)
      const defaults = {
        indent: 2,
      }

      // Apply defaults exactly like the provider:
      // if the value is falsy, replace it with the default
      for (const [key, value] of Object.entries(defaults)) {
        if (!parsed[key]) {
          parsed[key] = value
        }
      }

      // Return new context values (no direct mutation)
      return {
        preferences: parsed,
      }
    }),

    /**
     * Update preferences in memory and persist them.
     * This mirrors `setPreferences` + the saving `useEffect`.
     *
     * Expected event shape:
     * {
     *   type: "preferences.update",
     *   preferences: { ...partialUpdates }
     * }
     */
    updatePreferences: assign(({ context, event }) => {
      // Merge existing preferences with incoming partial updates
      const nextPreferences = {
        ...context.preferences,
        ...event.preferences,
      }

      // Persist updated preferences immediately
      // (equivalent to the saving useEffect in the provider)
      localStorage.setItem("preferences", JSON.stringify(nextPreferences))

      // Store updated preferences back into context
      return {
        preferences: nextPreferences,
      }
    }),
  },
}).createMachine({
  id: "preferences",

  // Initial state matches the provider's "mount" phase
  initial: "loading",

  // Machine context holds preferences as the single source of truth
  context: {
    preferences: undefined,
  },

  states: {
    /**
     * Loading state
     * Runs once on startup to load and normalize preferences.
     */
    loading: {
      // Load preferences immediately when the machine starts
      entry: "loadPreferences",

      // Automatically move to ready after loading completes
      always: "ready",
    },

    /**
     * Ready state
     * Preferences are loaded and can be read or updated.
     */
    ready: {
      on: {
        /**
         * Update preferences event.
         * Triggers an in-memory update and automatic persistence.
         */
        "preferences.update": {
          actions: "updatePreferences",
        },
      },
    },
  },
})

export const usePreferences = () => {

}