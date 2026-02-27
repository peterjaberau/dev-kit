'use client';

import { chakra, useSlotRecipe } from '@chakra-ui/react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Resizable } from 're-resizable';
import { draggablePanelRecipe } from './style';

export interface DraggablePanelProps {
  headerHeight?: number;
  fullscreen?: boolean;
  pin?: boolean;
  mode?: 'fixed' | 'float';
  children?: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  expandable?: boolean;
  defaultExpand?: boolean;
  expand?: boolean;
  onExpandChange?: (v: boolean) => void;
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
}

const DEFAULT_WIDTH = 280;
const DEFAULT_HEIGHT = 180;

const DraggablePanel = memo<DraggablePanelProps>(
  ({
    headerHeight = 0,
    fullscreen,
    pin = true,
    mode = 'fixed',
    children,
    placement = 'right',
    expandable = true,
    defaultExpand = true,
    expand,
    onExpandChange,
    destroyOnClose,
    style,
  }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [internalExpand, setInternalExpand] = useState(defaultExpand);
    const isControlled = expand !== undefined;
    const isExpand = isControlled ? expand : internalExpand;

    const setExpand = (v: boolean) => {
      if (!isControlled) setInternalExpand(v);
      onExpandChange?.(v);
    };

    const recipe = useSlotRecipe({ recipe: draggablePanelRecipe });
    const styles = recipe({
      mode,
      placement,
      fullscreen,
      expanded: isExpand,
    });

    const isVertical = placement === 'top' || placement === 'bottom';

    const defaultSize = useMemo(() => {
      if (isVertical) return { height: DEFAULT_HEIGHT, width: '100%' };
      return { width: DEFAULT_WIDTH, height: '100%' };
    }, [isVertical]);

    const Arrow = useMemo(() => {
      switch (placement) {
        case 'top':
          return ChevronDown;
        case 'bottom':
          return ChevronUp;
        case 'left':
          return ChevronRight;
        default:
          return ChevronLeft;
      }
    }, [placement]);

    useEffect(() => {
      if (pin) return;
      const el = ref.current;
      if (!el) return;

      const enter = () => !isExpand && setExpand(true);
      const leave = () => isExpand && setExpand(false);

      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      return () => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      };
    }, [pin, isExpand]);

    if (fullscreen) {
      return (
        <chakra.aside
          ref={ref}
          css={styles.root}
          style={
            {
              '--panel-header-height': `${headerHeight}px`,
            } as React.CSSProperties
          }
        >
          {children}
        </chakra.aside>
      );
    }

    return (
      <chakra.aside
        ref={ref}
        css={styles.root}
        style={
          {
            '--panel-header-height': `${headerHeight}px`,
            ...style,
          } as React.CSSProperties
        }
      >
        {expandable && (
          <chakra.div className="draggable-panel__toggle" css={styles.toggle}>
            <chakra.div onClick={() => setExpand(!isExpand)}>
              <chakra.div css={styles.handlerIcon} transform={`rotate(${isExpand ? 180 : 0}deg)`}>
                <Arrow size={16} strokeWidth={1.5} />
              </chakra.div>
            </chakra.div>
          </chakra.div>
        )}

        {!destroyOnClose || isExpand ? (
          <Resizable defaultSize={defaultSize} enable={{ [placement]: true }} style={{ display: 'flex' }}>
            <chakra.div css={styles.inner} w="100%" h="100%">
              {children}
            </chakra.div>
          </Resizable>
        ) : null}
      </chakra.aside>
    );
  },
);

export default DraggablePanel;
