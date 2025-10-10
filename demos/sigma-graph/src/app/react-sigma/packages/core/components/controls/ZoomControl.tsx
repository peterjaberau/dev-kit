'use client'
import React, { CSSProperties } from 'react';

import { LuZoomIn as ZoomInIcon, LuZoomOut as ZoomOutIcon } from 'react-icons/lu'
import { RiResetLeftFill as ZoomResetIcon } from "react-icons/ri";
import { IconButton } from '@chakra-ui/react'
import { useCamera } from '../../hooks/useCamera';

type ZoomLabelKeys = 'zoomIn' | 'zoomOut' | 'reset';

/**
 * Properties for `ZoomControl` component
 */
export interface ZoomControlProps {
  /**
   * HTML class that will be added to all div button wrapper
   */
  className?: string;

  /**
   * HTML CSS style that will be added to all div button wrapper
   */
  style?: CSSProperties;

  /**
   * Number of ms for the zoom animation (default is 200ms)
   */
  animationDuration?: number;

  /**
   * It's possible to customize the button, by passing to JSX Element.
   * First one is for the "zoom in", second for "zoom out" and third for "view whole graph".
   * Example :
   * ```jsx
   * <ZoomControl>
   *   <BsZoomIn />
   *   <BsZoomOut />
   *   <BiReset />
   * </FullScreenControl>
   * ```
   */
  children?: [React.JSX.Element, React.JSX.Element, React.JSX.Element];

  /**
   * Map of the labels we use in the component.
   * This is usefull for I18N
   */
  labels?: { [Key in ZoomLabelKeys]?: string };
}

/**
 * The `ZoomControl` create three UI buttons that allows the user to
 * - zoom in
 * - zoom out
 * - reset zoom (ie. see the whole graph)
 *
 * ```jsx
 * <SigmaContainer>
 *   <ControlsContainer>
 *     <ZoomControl />
 *   </ControlsContainer>
 * </SigmaContainer>
 * ```
 *
 * See {@link ZoomControlProps} for the component's properties.
 *
 * @category Component
 */
export const ZoomControl: React.FC<ZoomControlProps> = ({
  className,
  style,
  animationDuration = 200,
  children,
  labels = {},
}: ZoomControlProps) => {
  const { zoomIn, zoomOut, reset } = useCamera({ duration: animationDuration, factor: 1.5 });

  // Common html props for the div wrapper
  const htmlProps = {
    style,
    className: `react-sigma-control ${className || ''}`,
  };

  return (
    <>
      <div {...htmlProps}>
        <IconButton size='2xs' variant='ghost' onClick={() => zoomIn()} title={labels['zoomIn'] || 'Zoom In'}>
          {children ? children[0] : <ZoomInIcon />}
        </IconButton>
      </div>
      <div {...htmlProps}>
        <IconButton size='2xs' variant='ghost' onClick={() => zoomOut()} title={labels['zoomOut'] || 'Zoom Out'}>
          {children ? children[1] : <ZoomOutIcon />}
        </IconButton>
      </div>
      <div {...htmlProps}>
        <IconButton size='2xs' variant='ghost' onClick={() => reset()} title={labels['reset'] || 'See whole graph'}>
          {children ? children[2] : <ZoomResetIcon />}
        </IconButton>
      </div>
    </>
  );
};
