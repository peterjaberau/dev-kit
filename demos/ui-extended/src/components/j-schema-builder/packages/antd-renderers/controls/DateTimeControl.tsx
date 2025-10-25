"use client"

import {
  ControlProps,
  RankedTester,
  isDateTimeControl,
  rankWith,
} from '#jSchemaBuilder/core';
import { withJsonFormsControlProps } from '#jSchemaBuilder/react';
import React from 'react';
import { AntdDateTimePicker } from '../antd-controls/AntdDateTimePicker';

import { InputControl } from './InputControl';

export const DateTimeControl = (props: ControlProps) => (
  <InputControl {...props} input={AntdDateTimePicker} />
);

export const dateTimeControlTester: RankedTester = rankWith(
  2,
  isDateTimeControl
);

export default withJsonFormsControlProps(DateTimeControl);
