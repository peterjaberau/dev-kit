export { registerComponent, getRegistryNames } from "./registry-core"
export { ComponentRenderer } from "./registry"

/**
 *
 * import { registerComponent } from "@/registry"
 *
 * ------- Single component register -------
 * registerComponent("patterns-", {
 *   "item-simple": () => import("#app/patterns/item-simple"),
 * })
 *
 * ------- Bulk components register -------
 * registerComponent("patterns-", {
 *   "item-simple": () => import("#app/patterns/item-simple"),
 *   "item-story": () => import("#app/patterns/item"),
 * })
 *
 *
 * ------- Consuming a component -------
 * import { ComponentRenderer } from "@/registry"
 * <ComponentRenderer id="patterns-item-simple" />
 *
 */