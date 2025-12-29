import { token } from '#atlas-ui/primitives/css';
import { chakra } from '@chakra-ui/react';


import React from 'react';

const footerStyles = {
  root: {
    borderBlockStartWidth: token('border.width'),
    borderBlockStartStyle: 'solid',
    borderBlockStartColor: token('color.border'),
    paddingBlockStart: token('space.100')
  }
};

export interface FlyoutFooterProps {
    /**
     * The content to display within the flyout footer. Typically used for
     * supplementary actions or information.
     */
    children?: React.ReactNode;

    /**
     * A unique string that appears as data attribute data-testid in the
     * rendered code, serving as a hook for automated tests.
     */
}

/**
 * __Flyout menu item footer__
 *
 * The footer section of a flyout menu. This component can display
 * supplementary actions or information at the bottom of the flyout menu. This
 * component should be placed after FlyoutBody within the FlyoutMenuItemContent.
 */
export const FlyoutFooter = (props: FlyoutFooterProps) => {
    const { children } = props;

    return (
        <chakra.div  css={footerStyles.root}>
            {children}
        </chakra.div>
    )
};
