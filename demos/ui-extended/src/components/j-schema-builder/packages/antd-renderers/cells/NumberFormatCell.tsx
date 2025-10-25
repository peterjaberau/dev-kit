"use client"

import React from 'react';
import {
  CellProps,
  Formatted,
  isNumberFormatControl,
  RankedTester,
  rankWith,
  WithClassname,
} from '#jSchemaBuilder/core';
import { withJsonFormsCellProps } from '#jSchemaBuilder/react';
import { AntdInputNumberFormat } from '../antd-controls/AntdInputNumberFormat';

export const NumberFormatCell = (
  props: CellProps & WithClassname & Formatted<number>
) => <AntdInputNumberFormat {...props} />;
/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const numberFormatCellTester: RankedTester = rankWith(
  4,
  isNumberFormatControl
);

export default withJsonFormsCellProps(NumberFormatCell);
