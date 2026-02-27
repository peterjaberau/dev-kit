'use client';

import { cx } from 'antd-style';
import { memo } from 'react';

import { Flexbox } from "react-layout-kit"
import { type DivProps } from '../type';

import { styles } from './style';

export type DraggablePanelContainerProps = DivProps;

export const DraggablePanelContainer = memo<DraggablePanelContainerProps>(({ className, ...rest }) => {
  return <Flexbox data-part={"draggable-panel-container"} className={cx(styles.container, className)} {...rest} />
});

