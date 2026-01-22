export const mapFromEvent =
  () =>
    ({ event }) =>
      event
export const mapFromInput =
  (selector) =>
    ({ context }) =>
      selector(context)
export const mapFromContext =
  (selector) =>
    ({ context }) =>
      selector(context)

/**
 * PARAM MAPPING HELPERS
 *
 * These helpers reduce repetition when mapping data into `action.params`
 * in XState machines. Each helper makes the *source of the params explicit*.
 *
 * ──────────────────────────────────────────────────────────────
 * fromEvent()
 * ──────────────────────────────────────────────────────────────
 * Use when an action is driven directly by the triggering event.
 *
 * Example:
 *
 *   on: {
 *     setItem: {
 *       actions: {
 *         type: setItem,
 *         params: fromEvent()
 *       }
 *     }
 *   }
 *
 * If the event is:
 *   { type: "setItem", key: "a", value: 1 }
 *
 * The action receives:
 *   params === { key: "a", value: 1 }
 *
 * No manual mapping is required.
 */

/**
 * ──────────────────────────────────────────────────────────────
 * fromInput(selector)
 * ──────────────────────────────────────────────────────────────
 * Use when an action runs during machine setup (entry / invoke)
 * and needs data derived from the machine's initial input.
 *
 * The selector receives the machine context as it was initialized.
 *
 * Example:
 *
 *   entry: {
 *     type: load,
 *     params: fromInput((context) => ({
 *       appKey: context.appKey
 *     }))
 *   }
 *
 * This makes it explicit that the params come from *initial input*,
 * not from an event.
 */

/**
 * ──────────────────────────────────────────────────────────────
 * fromContext(selector)
 * ──────────────────────────────────────────────────────────────
 * Use when an action needs data from the *current, live context*.
 *
 * This is appropriate for follow-up effects or persistence actions
 * that must reflect state changes that happened earlier in the step.
 *
 * Example:
 *
 *   actions: [
 *     updateState,
 *     {
 *       type: persist,
 *       params: fromContext((context) => ({
 *         appKey: context.appKey
 *       }))
 *     }
 *   ]
 *
 * Even though `fromInput` and `fromContext` are implemented the same,
 * they communicate different intent and should not be interchanged.
 */
