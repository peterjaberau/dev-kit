"use client"

import React from 'react';
import {
  CellProps,
  isTimeControl,
  RankedTester,
  rankWith,
  WithClassname,
} from '#jSchemaBuilder/core';
import { withJsonFormsCellProps } from '#jSchemaBuilder/react';
import { AntdTimePicker } from '../antd-controls/AntdTimePicker';

export const TimeCell = (props: CellProps & WithClassname) => (
  <AntdTimePicker {...props} />
);
export const timeCellTester: RankedTester = rankWith(2, isTimeControl);

export default withJsonFormsCellProps(TimeCell);
