
import React from 'react';
import { chakra } from "@chakra-ui/react"

const stickyHeaderStyles = {
  root: {
    position: "sticky",
    zIndex: 1,
    insetBlockStart: 0,
  },
}

/**
 * The sticky header of the main layout area.
 */
export function MainStickyHeader({
	children,
	css,
	testId,
}: {
	/**
	 * A unique string that appears as data attribute `data-testid` in the rendered code, serving as a hook for automated tests.
	 */
	testId?: string;
	/**
	 * The content of the layout area.
	 */
	children?: React.ReactNode;
	/**
	 * Bounded style overrides.
	 */
	css?: any;
}) {
	return (
    <chakra.div
      data-testid={testId}
      css={{
        ...stickyHeaderStyles.root,
        ...css,
      }}
    >
      {children}
    </chakra.div>
  )
}
