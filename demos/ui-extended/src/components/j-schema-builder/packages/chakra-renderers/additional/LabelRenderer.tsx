
import React from 'react';
import {
  LabelElement,
  OwnPropsOfRenderer,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '#jSchemaBuilder/core';
import { withJsonFormsLayoutProps } from '#jSchemaBuilder/react';
import Hidden from '../util/Hidden';
import { Heading } from '@chakra-ui/react';

/**
 * Default tester for a label.
 * @type {RankedTester}
 */
export const labelRendererTester: RankedTester = rankWith(1, uiTypeIs('Label'));

/**
 * Default renderer for a label.
 */
export const LabelRenderer = ({ uischema, visible }: OwnPropsOfRenderer) => {
  const labelElement: LabelElement = uischema as LabelElement;
  return (
    <Hidden hidden={!visible}>
      <Heading size='md'>
        {labelElement.text !== undefined &&
          labelElement.text !== null &&
          labelElement.text}
      </Heading>
    </Hidden>
  );
};

export default withJsonFormsLayoutProps(LabelRenderer);
