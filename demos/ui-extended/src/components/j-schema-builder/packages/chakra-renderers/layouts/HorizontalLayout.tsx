
import React from 'react';
import {
  HorizontalLayout,
  LayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '#jSchemaBuilder/core';
import { withJsonFormsLayoutProps } from '#jSchemaBuilder/react';
import { LayoutRenderer, LayoutRendererProps } from '../util/layout';

/**
 * Default tester for a horizontal layout.
 * @type {RankedTester}
 */
export const horizontalLayoutTester: RankedTester = rankWith(
  2,
  uiTypeIs('HorizontalLayout')
);

export const HorizontalLayoutRenderer = ({
  uischema,
  renderers,
  cells,
  schema,
  path,
  enabled,
  visible,
}: LayoutProps) => {
  const layout = uischema as HorizontalLayout;
  const childProps: LayoutRendererProps = {
    elements: layout.elements,
    schema,
    path,
    enabled,
    direction: 'row',
    visible,
  };

  return <LayoutRenderer {...childProps} renderers={renderers} cells={cells} />;
};

export default withJsonFormsLayoutProps(HorizontalLayoutRenderer);
