
import React, { FunctionComponent } from 'react';
import {
  LabelProps,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '#jSchemaBuilder/core';
import { withJsonFormsLabelProps } from '#jSchemaBuilder/react';
import type { VanillaRendererProps } from '../index';
import { withVanillaControlProps } from '../util';
import { Field } from '@chakra-ui/react';

/**
 * Default tester for a label.
 * @type {RankedTester}
 */
export const labelRendererTester: RankedTester = rankWith(1, uiTypeIs('Label'));

/**
 * Default renderer for a label.
 */
export const LabelRenderer: FunctionComponent<
  LabelProps & VanillaRendererProps | any
> = ({ text, visible, getStyleAsClassName }) => {

  const classNames = getStyleAsClassName('label-control');
  const isHidden = !visible;

  return (
    <Field.Label hidden={isHidden} className={classNames}>
      {text}
    </Field.Label>
  );
};

export default withVanillaControlProps(withJsonFormsLabelProps(LabelRenderer));
