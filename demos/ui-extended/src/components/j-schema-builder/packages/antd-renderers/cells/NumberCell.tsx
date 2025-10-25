"use client"

import React from 'react';
import {
  CellProps,
  isNumberControl,
  RankedTester,
  rankWith,
  WithClassname,
} from '#jSchemaBuilder/core';
import { withJsonFormsCellProps } from '#jSchemaBuilder/react';
import { AntdInputNumber } from '../antd-controls/AntdInputNumber';

export const NumberCell = (props: CellProps & WithClassname) => (
  <AntdInputNumber {...props} />
);
/**
 * Default tester for number controls.
 * @type {RankedTester}
 */
export const numberCellTester: RankedTester = rankWith(2, isNumberControl);
export default withJsonFormsCellProps(NumberCell);
