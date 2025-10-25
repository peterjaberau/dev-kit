
import React from 'react';
import {
  and,
  ControlProps,
  isOneOfEnumControl,
  optionIs,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { withVanillaControlProps } from '../util';
import type { VanillaRendererProps } from '../index';
import { withJsonFormsOneOfEnumProps } from '#jSchemaBuilder/react';
import { RadioGroupInput } from './RadioGroup';

export const OneOfRadioGroupControl = (
  props: ControlProps & VanillaRendererProps
) => {
  return <RadioGroupInput {...props} />;
};

export const oneOfRadioGroupControlTester: RankedTester = rankWith(
  20,
  and(isOneOfEnumControl, optionIs('format', 'radio'))
);

export default withVanillaControlProps(
  withJsonFormsOneOfEnumProps(OneOfRadioGroupControl)
);
