import { ReactElement, useCallback, useRef } from 'react';
import * as React from 'react';
import { BiExpand } from "react-icons/bi";


import { chakra, Icon } from '@chakra-ui/react';

import { PanelMenu } from './PanelMenu';

interface Props {
  children?: React.ReactNode;
  menu?: any[];
  title?: string;
  offset?: number;
  dragClass?: string;
  onOpenMenu?: () => void;
}

export function HoverWidget({ menu, title, dragClass, children, offset = -32, onOpenMenu }: Props) {
  const draggableRef = useRef<HTMLDivElement>(null);
  // Capture the pointer to keep the widget visible while dragging
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    draggableRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    draggableRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  if (children === undefined || React.Children.count(children) === 0) {
    return null;
  }

  return (
    <chakra.div
      css={{
        display: 'flex',
        position: 'absolute',
        zIndex: 1,
        right: -1,
        boxSizing: 'content-box',
        alignItems: 'center',
        background: 'bg.subtle',
        color: 'fg',
        border: '1px solid',
        borderColor: 'border.subtle',
        borderBottomLeftRadius: 'md',
        height: 4,
        boxShadow: 'md',
        gap: 1,
        paddingX: 0,
        paddingY: 1,
        top: offset === 0 ? -1 : offset
      }}
      className={'show-on-hover'}
    >
      {dragClass && (
        <chakra.div
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 4,
            height: '100%',

            cursor: 'move',
          }}
          className={dragClass}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          ref={draggableRef}
        >
          <Icon
            color={'fg.muted'}
          css={{
            transform: 'rotate(45deg)',
            '&:hover': {
              color: 'fg.info',
            },

          }}
          >
            <BiExpand />
          </Icon>
        </chakra.div>
      )}
      {children}
      {menu && (
        <PanelMenu
          menuItems={menu}
          title={title}
          placement="bottom"
          css={{
            background: 'inherit',
            border: 'none',
          }}
          onOpenMenu={onOpenMenu}
        />
      )}
    </chakra.div>
  );
}

