/**
 * Common props for layout slots.
 *
 * Does not include `children`, because we want to provide tailored JSDocs for each layout slot.
 */
export type CommonSlotProps = {
  /**
   * The `id` attribute of the slot. Used to connect the layout slot's skip link to the layout element.
   * If not provided, a unique ID will be generated.
   */
  id?: string
  css?: any
  /**
   * A unique string that appears as data attribute `data-testid` in the rendered code, serving as a hook for automated tests.
   */
  testId?: string
}
