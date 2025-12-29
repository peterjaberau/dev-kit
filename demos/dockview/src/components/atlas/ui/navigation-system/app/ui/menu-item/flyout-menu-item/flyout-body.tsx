import { token } from '#atlas-ui/primitives/css';
import { chakra } from '@chakra-ui/react';

import React from 'react';


const bodyStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    height: '100%',
    justifyContent: 'start',
    marginInlineStart: token('space.negative.100'),
    marginInlineEnd: token('space.negative.100'),
    paddingInlineStart: token('space.100'),
    paddingInlineEnd: token('space.100')
  }
};

export interface FlyoutBodyProps {
    /**
     * The content to display within the main body of the flyout menu.
     * Typically includes the primary interactive elements.
     */
    children?: React.ReactNode;

    /**
	 * A unique string that appears as data attribute data-testid in the
     * rendered code, serving as a hook for automated tests.
     */
}

/**
 * __Flyout menu item body__
 *
 * The main section of a flyout menu. This component is used to render the
 * primary contents of the flyout menu. This component should be placed between
 * FlyoutHeader and FlyoutFooter (if present), as is scrollable if the content
 * exceeds the available space.
 */
export const FlyoutBody = (props: FlyoutBodyProps) => {
    const { children } = props;

    return (
        <chakra.div css={bodyStyles.root}>
            {children}
        </chakra.div>
    )
};
