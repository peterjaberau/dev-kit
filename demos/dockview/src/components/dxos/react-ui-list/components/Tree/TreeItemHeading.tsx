import { chakra, Button, Icon, } from '@chakra-ui/react';
import React, { type KeyboardEvent, type MouseEvent, forwardRef, memo, useCallback } from 'react';
import { PiPlaceholder as IconPlaceholder } from "react-icons/pi";


// TODO(wittjosiah): Consider whether there should be a separate disabled prop which was visually distinct
//   rather than just making the item unselectable.
export type TreeItemHeadingProps = {
  className?: string;
  css?: any;
  iconHue?: string;
  disabled?: boolean;
  current?: boolean;
  onSelect?: (option: boolean) => void;
};

export const TreeItemHeading = memo(
  forwardRef<HTMLButtonElement, TreeItemHeadingProps>(
    ({ css, iconHue, disabled, current, onSelect }, forwardedRef) => {

      const handleSelect = useCallback(
        (event: MouseEvent) => {
          onSelect?.(event.altKey);
        },
        [onSelect],
      );

      const handleButtonKeydown = useCallback(
        (event: KeyboardEvent) => {
          if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            onSelect?.(event.altKey);
          }
        },
        [onSelect],
      );

      return (

        <Button
          ref={forwardedRef}
          variant='ghost'
          css={{
            flexGrow: 1,
            paddingInlineStart: '0.5rem',
            _hover: { backgroundColor: 'transparent' },
            _disabled: { cursor: 'default', opacity: 1 },
            ...css,
          }}
          // classNames={[
          //   'grow gap-2 pis-0.5 hover:bg-transparent dark:hover:bg-transparent',
          //   'disabled:cursor-default disabled:opacity-100',
          //   className,
          // ]}
          disabled={disabled}
          onClick={handleSelect}
          onKeyDown={handleButtonKeydown}
          size={'sm'}
          {...(current && { 'aria-current': 'location' })}
        >
          <IconPlaceholder />
          {/*{icon && <Icon icon={icon ?? 'ph--placeholder--regular'} size={5} classNames={['mlb-1', styles?.icon]} />}*/}

        </Button>
      );
    },
  ),
);
