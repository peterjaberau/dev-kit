'use client'
import React, { CSSProperties, RefObject } from 'react';

import { useFullScreen } from '../../hooks/useFullScreen';
import { MdFullscreenExit as ExitIcon } from "react-icons/md";
import { MdFullscreen as EnterIcon } from "react-icons/md";
import { IconButton } from '@chakra-ui/react'


type FullScreenLabelKeys = 'enter' | 'exit';

/**
 * Properties for `FullScreenControl` component.
 */
export interface FullScreenControlProps {
  /**
   * HTML id
   */
  id?: string;

  /**
   * HTML class
   */
  className?: string;

  /**
   * HTML CSS style
   */
  style?: CSSProperties;

  /**
   * If defined, this container will be taken for the fullscreen instead of the sigma one.
   */
  container?: RefObject<HTMLElement | null>;

  /**
   * It's possible to customize the button, by passing to JSX Element.
   * First one is for the "enter fullscreen", and the second to "exit fullscreen".
   * Example :
   * ```jsx
   * <FullScreenControl>
   *   <BiFullscreen />
   *   <BiExitFullscreen />
   * </FullScreenControl>
   * ```
   */
  children?: [React.JSX.Element, React.JSX.Element];

  /**
   * Map of the labels we use in the component.
   * This is usefull for I18N
   */
  labels?: { [Key in FullScreenLabelKeys]?: string };
}

/**
 * The `FullScreenControl` create a UI button that allows the user to display the graph in fullscreen
 *
 * ```jsx
 * <SigmaContainer>
 *   <ControlsContainer>
 *     <FullScreenControl />
 *   </ControlsContainer>
 * </SigmaContainer>
 * ```
 *
 * See {@link FullScreenControlProps} for the component's properties.
 *
 * @category Component
 */
export const FullScreenControl: React.FC<FullScreenControlProps> = ({
  id,
  className,
  style,
  container,
  children,
  labels = {},
}: FullScreenControlProps) => {
  // Get Sigma
  const { isFullScreen, toggle } = useFullScreen(container?.current);

  // Common html props for the div
  const htmlProps = {
    className: `react-sigma-control ${className || ''}`,
    id,
    style,
  };

  if (!document.fullscreenEnabled) return null;

  return (
    <div {...htmlProps}>
      <IconButton size='2xs' variant={'ghost'}
        onClick={toggle}
        title={isFullScreen ? labels['exit'] || 'Exit fullscreen' : labels['enter'] || 'Enter fullscreen'}
      >
        {children && !isFullScreen && children[0]}
        {children && isFullScreen && children[1]}
        {!children && !isFullScreen && <EnterIcon  />}
        {!children && isFullScreen && <ExitIcon  />}
      </IconButton>
    </div>
  );
};
