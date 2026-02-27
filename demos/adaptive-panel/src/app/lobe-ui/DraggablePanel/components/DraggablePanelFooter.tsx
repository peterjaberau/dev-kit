'use client';

import { cx } from 'antd-style';
import { memo } from 'react';

import { Flexbox } from "react-layout-kit"
import { type DivProps } from '../type';

import { styles } from './style';

export type DraggablePanelFooterProps = DivProps;

export const DraggablePanelFooter = memo<DraggablePanelFooterProps>(({ className, ...rest }) => {
  return (
    <Flexbox
      data-part={"draggable-panel-footer"}
      horizontal
      align={"center"}
      className={cx(styles.footer, className)}
      flex={"none"}
      gap={8}
      justify={"flex-start"}
      {...rest}
    />
  )
})

