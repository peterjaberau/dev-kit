import React, { useCallback, useContext } from 'react';

import { token } from '#atlas-ui/primitives/css';
import { chakra, Flex, Heading } from '@chakra-ui/react';
import { CloseButton } from './close-button';

import { OnCloseContext, SetIsOpenContext } from './flyout-menu-item-context';

const headerStyles = {
  root: {
    paddingInlineStart: token('space.050'),
    paddingBlockEnd: token('space.075'),
    display: 'flex',
    flexDirection: 'column',
    gap: token('space.075'),
  },
  flex: {
    justifyContent: 'space-between',
    gap: token('space.200'),
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
    paddingInlineStart: token('space.025')
  },
};

export interface FlyoutHeaderProps {
    /**
     * The actions to display within the flyout header.
     */
    children?: React.ReactNode;

    /**
     * A unique string that appears as data attribute data-testid in the
     * rendered code, serving as a hook for automated tests.
     */
    testId?: string;

    /**
     * The title of the flyout menu.
     */
    title: string;

    /**
     * The accessible label for the close button in the flyout header.
     *
     * Used as the aria-label for the close button to ensure screen reader
     * accessibility.
     */
    closeButtonLabel: string;
}

/**
 * __FlyoutHeader__
 *
 * The header section of a flyout menu. This component displays the title, and
 * close button, as well as any other provided actions relevant to the menu.
 * This component should be placed first within the FlyoutMenuItemContent.
 */
export const FlyoutHeader = (props: FlyoutHeaderProps) => {
    const { children, testId, title, closeButtonLabel } = props;

    const setIsOpen = useContext(SetIsOpenContext);
    const onClose = useContext(OnCloseContext);

    const handleClose = useCallback(() => {
        onClose?.();
        setIsOpen(false);
    }, [setIsOpen, onClose]);

    return (
        <chakra.div css={headerStyles.root}>
            {
                // The reason we are putting the close button first in the DOM and then
                // reordering them is to ensure that users of assistive technology get
                // all the context of a modal when initial focus is placed on the close
                // button, since it's the first interactive element.
            }
                <Flex css={headerStyles.flex}>
                    <CloseButton
                        label={closeButtonLabel}
                        onClick={handleClose}
                    />
                    <Heading size="xs" as="span">{title}</Heading>
                </Flex>
                {children}
        </chakra.div>
    )
};
