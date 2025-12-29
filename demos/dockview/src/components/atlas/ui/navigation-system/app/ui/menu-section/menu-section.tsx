import React, { type ReactNode, useId } from 'react';


import { MenuListItem } from '../menu-item/menu-list-item';

import { MenuSectionContext } from './menu-section-context';

type MenuSectionProps = {
	/**
	 * The contents of the menu section.
	 * Should contain a `MenuSectionHeading`, and a `Divider` if appropriate.
	 */
	children?: ReactNode;
	/**
	 * Wraps the `MenuSection` in a `MenuListItem` so that it can validly be the child of a `MenuList`
	 *
	 * In the future this will become the default behavior, and the prop will be removed.
	 */
	isMenuListItem?: boolean;

	/**
	 * A unique string that appears as data attribute `data-testid` in the rendered code, serving as a hook for automated tests.
	 *
	 * It is applied to the outer rendered element.
	 *
	 * Right now, it is only applied when `isMenuListItem:true`
	 */
	testId?: string;
};

/**
 * __MenuSection__
 *
 * A composable component for grouping menu items, along with a heading (`MenuSectionHeading`) and a divider (`Divider`).
 *
 * Usage example:
 * ```tsx
 * <MenuSection>
 *   <MenuSectionHeading>Section heading</MenuSectionHeading>
 *   <MenuList>
 *     <MenuItem>Item 1</MenuItem>
 *     <MenuItem>Item 2</MenuItem>
 *   </MenuList>
 *   <Divider />
 * </MenuSection>
 * ```
 */
export const MenuSection = ({
	children,
	testId,
	isMenuListItem = false,
}: MenuSectionProps | any) => {
	const id = useId();

	const content = (
		<MenuSectionContext.Provider value={id}>
			<div role="group" aria-labelledby={`${id}-heading`}>
				{children}
			</div>
		</MenuSectionContext.Provider>
	);

	if (isMenuListItem) {
		return <MenuListItem>{content}</MenuListItem>;
	}

	// Legacy. isMenuListItem should become default.
	return content;
};
