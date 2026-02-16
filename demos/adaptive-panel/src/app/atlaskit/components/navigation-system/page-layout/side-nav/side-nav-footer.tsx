import type { ReactNode } from 'react';
import { chakra } from '@chakra-ui/react';

const styles = {
  root: {
    paddingBlockStart: "12px",
    paddingInlineEnd: "12px",
    paddingBlockEnd: "12px",
    paddingInlineStart: "12px",
    borderBlockStartWidth: "1px",
    borderBlockStartStyle: "solid",
    borderBlockStartColor: "gray.200",
  },
}

/**
 * The bottom part of the side nav.
 */
export const SideNavFooter = ({
	/**
	 * The content of the layout area.
	 */
	children,
	css,
}: {
	/**
	 * The content of the layout area.
	 */
	children: ReactNode;
	/**
	 * Bounded style overrides.
	 */
	css?: any;
}) => {
	return (
    <chakra.div
      css={{
        ...styles.root,
        ...css,
      }}
    >
      {children}
    </chakra.div>
  )
};
