"use client"

import {
  ControlProps,
  RankedTester,
  isDateControl,
  rankWith,
} from '#jSchemaBuilder/core';
import { withJsonFormsControlProps } from '#jSchemaBuilder/react';
import React from 'react';
import { AntdDatePicker } from '../antd-controls/AntdDatePicker';

import { InputControl } from './InputControl';

export const DateControl = (props: ControlProps) => (
  <InputControl {...props} input={AntdDatePicker} />
);

export const dateControlTester: RankedTester = rankWith(4, isDateControl);

export default withJsonFormsControlProps(DateControl);
