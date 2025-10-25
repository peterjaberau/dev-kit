"use client"

import React from 'react';
import {
  ControlProps,
  isNumberControl,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { AntdInputNumber } from '../antd-controls/AntdInputNumber';
import { InputControl } from './InputControl';
import { withJsonFormsControlProps } from '#jSchemaBuilder/react';

export const NumberControl = (props: ControlProps) => (
  <InputControl {...props} input={AntdInputNumber} />
);

export const numberControlTester: RankedTester = rankWith(2, isNumberControl);

export default withJsonFormsControlProps(NumberControl);
