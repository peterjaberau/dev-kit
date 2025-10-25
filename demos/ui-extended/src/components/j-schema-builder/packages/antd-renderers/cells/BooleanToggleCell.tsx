"use client"

import React from 'react';
import {
  and,
  CellProps,
  isBooleanControl,
  optionIs,
  RankedTester,
  rankWith,
  WithClassname,
} from '#jSchemaBuilder/core';
import { withJsonFormsCellProps } from '#jSchemaBuilder/react';
import { AntdToggle } from '../antd-controls/AntdToggle';

export const BooleanToggleCell = (props: CellProps & WithClassname) => {
  return <AntdToggle {...props} />;
};

export const booleanToggleCellTester: RankedTester = rankWith(
  3,
  and(isBooleanControl, optionIs('toggle', true))
);

export default withJsonFormsCellProps(BooleanToggleCell);
