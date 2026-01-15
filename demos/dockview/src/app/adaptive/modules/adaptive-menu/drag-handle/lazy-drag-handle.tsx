import dynamic from "next/dynamic"

/**
 * Exposing this for use by custom components
 */
export const LazyDragHandle = dynamic(() => import("./drag-handle"), { ssr: false })
