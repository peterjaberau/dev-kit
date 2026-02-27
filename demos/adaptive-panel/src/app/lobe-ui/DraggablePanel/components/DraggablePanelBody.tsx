'use client';

import { cx } from 'antd-style';
import { memo } from 'react';

import { Flexbox } from "react-layout-kit"
import { type DivProps } from '../type';

import { styles } from './style';

export type DraggablePanelBodyProps = DivProps;

export const DraggablePanelBody = memo<DraggablePanelBodyProps>(({ className, ...rest }) => {
  return <Flexbox data-part={"draggable-panel-body"} className={cx(styles.body, className)} flex={1} {...rest} />
})

