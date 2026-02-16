import type { ResizeBound } from './types';

export function convertResizeBoundToPixels(resizeBound: ResizeBound): number {
	if (resizeBound.endsWith('vw')) {
		// Max width was provided in `vw` units, so is relative to the viewport width.
		// e.g. 50vw = 50% of the viewport width.
		// `parseInt` will remove the `vw` suffix.
		const maxWidthFraction = parseInt(resizeBound) / 100;
		return Math.floor(window.innerWidth * maxWidthFraction);
	}

	// Max width was provided in `px` units, so we can parse it directly.
	// `parseInt` will remove the `px` suffix.
	return Math.floor(parseInt(resizeBound));
}
