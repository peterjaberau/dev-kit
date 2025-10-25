
import React from 'react';
import {
  ControlProps,
  isOneOfEnumControl,
  OwnPropsOfEnum,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import {
  withJsonFormsOneOfEnumProps,
  withTranslateProps,
} from '#jSchemaBuilder/react';
import { ChakraSelect } from '../chakra-controls/ChakraSelect';
import { InputControlWrapper } from './InputControlWrapper';

export const OneOfEnumControl = (props: ControlProps & OwnPropsOfEnum) => (
  <InputControlWrapper {...props} input={ChakraSelect} />
);

export const oneOfEnumControlTester: RankedTester = rankWith(
  5,
  isOneOfEnumControl
);

export default withJsonFormsOneOfEnumProps(
  withTranslateProps(OneOfEnumControl)
);
