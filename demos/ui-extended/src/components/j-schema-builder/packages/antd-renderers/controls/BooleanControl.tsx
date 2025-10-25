"use client"

import React from 'react';
import {
  isBooleanControl,
  RankedTester,
  rankWith,
  ControlProps,
} from '#jSchemaBuilder/core';
import { withJsonFormsControlProps } from '#jSchemaBuilder/react';
import { AntdCheckbox } from '../antd-controls/AntdCheckbox';
import { InputControl } from './InputControl';

export const BooleanControl = (props: ControlProps) => (
  <InputControl {...props} input={AntdCheckbox} />
);

export const booleanControlTester: RankedTester = rankWith(2, isBooleanControl);
export default withJsonFormsControlProps(BooleanControl);
