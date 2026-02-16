import { useId } from 'react';

// Exposing a hook as a convenience for consumers, so they don't need to import
// from ds-lib themselves.
/**
 * Returns a unique ID for use by layout elements and skip links.
 * You can use this for custom skip links.
 */

/**
 * Returns an ID for use by the layout element and skip links.
 *
 * If the consumer has already provided an ID, it will be used instead.
 * Otherwise, a unique ID will be returned.
 */
export function useLayoutId({
	providedId,
}: {
	/**
	 * The ID provided by the consumer. If provided, it will be used instead.
	 */
	providedId?: string;
} = {}): string {
	const id: any = providedId

	return id;
}
