import { token } from '#atlas-ui/primitives/css';
import { chakra } from '@chakra-ui/react';
import { type ReactNode } from 'react';


import { useMenuSectionContext } from './menu-section-context';

const styles = {
  root: {
    color: token('color.text.subtlest'),
    font: token('font.heading.xxsmall'),
    paddingBlock: token('space.100'),
    paddingInlineStart: token('space.075'),
  },
};

/**
 * __MenuSectionHeading__
 *
 * The label for the menu section group.
 */
export const MenuSectionHeading = ({
	children,
}: {
	/**
	 * The text of the heading.
	 */
	children: ReactNode;
}): any => {
	const id = useMenuSectionContext();

	return (
		// Not using Text primitive so we can add padding styles without adding an extra wrapper element.
		// eslint-disable-next-line @atlaskit/design-system/use-primitives-text
		<chakra.p css={styles.root} id={`${id}-heading`}>
			{children}
		</chakra.p>
	);
};
