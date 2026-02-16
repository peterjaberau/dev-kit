
import type { ReactNode } from 'react';
import { chakra } from '@chakra-ui/react';
const styles = {
  root: {
    paddingInline: "12px",
    paddingBlockStart: "12px",
    paddingBlockEnd: "4px",
  },
}

/**
 * The top part of the side nav.
 */
export const SideNavHeader = ({
	children,
}: {
	/**
	 * The content of the layout area.
	 */
	children: ReactNode;
}) => {
	return (
		<chakra.div
			css={styles.root}

		>
			{children}
		</chakra.div>
	);
};
