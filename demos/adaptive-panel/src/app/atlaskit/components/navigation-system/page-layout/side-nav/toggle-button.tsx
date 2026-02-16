
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { bind } from 'bind-event-listener';
import { chakra  } from '@chakra-ui/react';
import {
  TbLayoutSidebarLeftCollapse as SidebarCollapseIcon,
  TbLayoutSidebarRightCollapse as SidebarExpandIcon,
} from "react-icons/tb"
import { useOpenLayerObserver } from '#atlaskit/components/layering/entry-points/experimental/open-layer-observer';

import { IconButton } from '@chakra-ui/react';

import { useIsSideNavShortcutEnabled } from './is-side-nav-shortcut-enabled-context';
import { SideNavToggleButtonAttachRef } from './toggle-button-context';
import { useSideNavVisibility } from './use-side-nav-visibility';
import { useToggleSideNav } from './use-toggle-side-nav';
import { SideNavVisibilityState } from './visibility-context';

export type SideNavVisibilityChangeAnalyticsAttributes = {
	isSideNavVisible: boolean;
};



// For duplicate "mouseenter" issue when changing icons (see below)
const silentIconStyles = {
	// So we don't mess up any flex logic inside of button
	display: 'contents',
	// Don't let movement over icons be relevant for events
	pointerEvents: 'none',
};


export const SideNavToggleButton = ({
	defaultCollapsed = false,
	expandLabel,
	collapseLabel,
	testId,
	interactionName,
	onClick,
}: {

	defaultCollapsed?: boolean;
	/**
	 * The label when the toggle button will expand the side nav.
	 */
	expandLabel: React.ReactNode;
	/**
	 * The label when the toggle button will collapse the side nav.
	 */
	collapseLabel: React.ReactNode;
	/**
	 * A unique string that appears as data attribute `data-testid` in the rendered code, serving as a hook for automated tests.
	 */
	testId?: string;
	/**
	 * An optional name used to identify events for [React UFO (Unified Frontend Observability) press interactions](https://developer.atlassian.com/platform/ufo/react-ufo/react-ufo/getting-started/#quick-start--press-interactions). For more information, see [React UFO integration into Design System components](https://go.atlassian.com/react-ufo-dst-integration).
	 */
	interactionName?: string;
	/**
	 * The callback function that is called when the toggle button is clicked.
	 */
	onClick?: (
		e: any,

	) => void;
}) => {

	const {
		isExpandedOnDesktop: isSideNavExpandedOnDesktop,
		isExpandedOnMobile: isSideNavExpandedOnMobile,
	} = useSideNavVisibility({ defaultCollapsed });

	const sideNavState = useContext(SideNavVisibilityState);

	// When default state is provided to `Root` the state in context will already be
	// initialized in SSR
	const [isSideNavExpanded, setIsSideNavExpanded] = useState<boolean>(
		sideNavState === null ? !defaultCollapsed : isSideNavExpandedOnDesktop,
	);

	const ref = useContext(SideNavToggleButtonAttachRef);

	/**
	 * Addresses HOT-121458 by ensuring that the toggle button element in context is always up to date.
	 *
	 * My theory is that something to do with SSR, hydration and suspense was causing the
	 * underlying HTML element to change but without causing the toggle button to remount.
	 *
	 * This meant the effect calling `ref()` did not re-run, and the value in context became stale.
	 */
	const [element, setElement] = useState<HTMLButtonElement | null>(null);
	useEffect(() => {
		ref(element);
	}, [element, ref]);

	useEffect(() => {
		const { matches } = window.matchMedia('(min-width: 64rem)');
		setIsSideNavExpanded(matches ? isSideNavExpandedOnDesktop : isSideNavExpandedOnMobile);
	}, [isSideNavExpandedOnDesktop, isSideNavExpandedOnMobile]);

	useEffect(() => {
		// When screen size changes, ensure we use the correct visibility state
		const mediaQueryList = window.matchMedia('(min-width: 64rem)');
		return bind(mediaQueryList, {
			type: 'change',
			listener() {
				setIsSideNavExpanded(
					mediaQueryList.matches ? isSideNavExpandedOnDesktop : isSideNavExpandedOnMobile,
				);
			},
		});
	}, [isSideNavExpandedOnDesktop, isSideNavExpandedOnMobile]);

	const toggleVisibility = useToggleSideNav({ trigger: 'toggle-button' });

	const openLayerObserver = useOpenLayerObserver();

	const handleClick = useCallback(
		(event: any) => {
			onClick?.(event);

			toggleVisibility();


		},
		[isSideNavExpanded, onClick, openLayerObserver, toggleVisibility],
	);

	const handlePointerEnter = useCallback(() => {


		// Hovers don't do anything on mobile, so not capturing
		const isDesktop = window.matchMedia('(min-width: 64rem)').matches;
		if (!isDesktop) {
			return;
		}


	}, [isSideNavExpanded]);

	/**
	 * ## Behaviour
	 * It is intentional that collapse icon will be used while the flyout is open.
	 * The icon is tied to the expanded / collapse state, and not the flyout state.
	 *
	 * ## Why a function?
	 * Unfortunately, changing the icon inside an <IconButton> when the user is over
	 * the button will cause the svg element to be replaced, which can trigger a
	 * "mouseenter" event. This is problematic when the user is already over the button,
	 * as it can result in a "mouseenter" event after the user manually entered the button.
	 *
	 * `icon` accepts a function for the `icon` prop (ie a render prop), so we don't need to
	 * memoize it, or pull it out into a new function
	 */

	const isShortcutEnabled = useIsSideNavShortcutEnabled();


	return (
    <IconButton appearance="subtle" onClick={handleClick} onPointerEnter={handlePointerEnter} ref={setElement}>
      {isSideNavExpanded ? <SidebarCollapseIcon  /> : <SidebarExpandIcon  />}
    </IconButton>
  )
};
