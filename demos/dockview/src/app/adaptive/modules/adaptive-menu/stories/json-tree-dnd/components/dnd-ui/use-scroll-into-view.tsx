import { useEffect, useRef } from 'react';

import invariant from 'tiny-invariant';

import { useAreAllAncestorsExpanded } from './control.context';

type WaitingState = {
	type: 'waiting-to-be-selected-and-all-ancestors-expanded' | 'waiting-to-be-unselected';
};

function scrollIntoView(element: HTMLDivElement): void {

	const elementWithScrollMethod = element as HTMLDivElement & {
		scrollIntoViewIfNeeded?: (centerIfNeeded?: boolean) => void;
	};

	if (typeof elementWithScrollMethod.scrollIntoViewIfNeeded === 'function') {
		elementWithScrollMethod.scrollIntoViewIfNeeded(true);
		return;
	}

	// JSDOM does not support scrollIntoView, so defensively using it (see https://github.com/jsdom/jsdom/issues/1695)
	element.scrollIntoView?.({
    // We are using `nearest` to prevent scrolling on user interaction when the menu item is already in view.
    block: "nearest",
  })
}

/**
 * Scrolls the element into view once it is selected, and once all its ancestors (expandable
 * parent menu items) are expanded.
 *
 * Once that has happened, we don't want to scroll it into view again until it has been unselected.
 * This is to prevent the menu item from being scrolled into view again if the user collapses a
 * parent and then expands it again, without changing what menu item is selected.
 */
export function useScrollIntoView({
	elementRef,
	isSelected,
}: any): void {
	const areAllAncestorsExpanded = useAreAllAncestorsExpanded();

	const waitingStateRef = useRef<WaitingState>({
		type: 'waiting-to-be-selected-and-all-ancestors-expanded',
	});

	useEffect(() => {
		if (waitingStateRef.current.type === 'waiting-to-be-selected-and-all-ancestors-expanded') {
			const shouldScroll = areAllAncestorsExpanded && isSelected;

			if (!shouldScroll) {
				return;
			}

			const element = elementRef.current;
			invariant(element, 'Element ref must be set');
			scrollIntoView(element);

			// Now that we are scrolled the menu item into view, we need to wait for the menu item to
			// be unselected before checking again.
			waitingStateRef.current.type = 'waiting-to-be-unselected';
			return;
		}

		if (waitingStateRef.current.type === 'waiting-to-be-unselected') {
			if (!isSelected) {
				waitingStateRef.current.type = 'waiting-to-be-selected-and-all-ancestors-expanded';
			}

			return;
		}
	}, [areAllAncestorsExpanded, elementRef, isSelected]);
}
