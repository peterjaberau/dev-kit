"use client"

import React from 'react';
import {
  EnumCellProps,
  isOneOfEnumControl,
  RankedTester,
  rankWith,
  WithClassname,
} from '#jSchemaBuilder/core';
import {
  TranslateProps,
  withJsonFormsOneOfEnumCellProps,
  withTranslateProps,
} from '#jSchemaBuilder/react';
import { AntdSelect } from '../antd-controls/AntdSelect';

export const OneOfEnumCell = (
  props: EnumCellProps & WithClassname & TranslateProps
) => <AntdSelect {...props} />;

/**
 * Default tester for oneOf enum controls.
 * @type {RankedTester}
 */
export const oneOfEnumCellTester: RankedTester = rankWith(
  2,
  isOneOfEnumControl
);

export default withJsonFormsOneOfEnumCellProps(
  withTranslateProps(React.memo(OneOfEnumCell)),
  false
);
