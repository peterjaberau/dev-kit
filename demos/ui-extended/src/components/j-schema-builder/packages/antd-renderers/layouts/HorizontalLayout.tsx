"use client"

import React from 'react';
import {
  HorizontalLayout,
  LayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '#jSchemaBuilder/core';
import { withJsonFormsLayoutProps } from '#jSchemaBuilder/react';
import { AntdLayoutRenderer, AntdLayoutRendererProps } from '../util/layout';

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
  const childProps: AntdLayoutRendererProps = {
    elements: layout.elements,
    schema,
    path,
    enabled,
    direction: 'row',
    visible,
  };

  return (
    <AntdLayoutRenderer {...childProps} renderers={renderers} cells={cells} />
  );
};

export default withJsonFormsLayoutProps(HorizontalLayoutRenderer);
