'use client'
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { JsonSchema, Layout } from '#jSchemaBuilder/core';
import { JsonFormsDispatch, useJsonForms } from '#jSchemaBuilder/react';
export interface RenderChildrenProps {
  layout: Layout;
  schema: JsonSchema;
  className: string;
  path: string;
}
import { Box } from '@chakra-ui/react'

export const renderChildren = (
  layout: Layout,
  schema: JsonSchema,
  className: string,
  path: string,
  enabled: boolean
) => {
  if (isEmpty(layout.elements)) {
    return [];
  }

  const { renderers, cells } = useJsonForms();

  return layout.elements.map((child, index) => {
    return (
      <Box w={'full'} className={className} key={`${path}-${index}`}>
        <JsonFormsDispatch
          renderers={renderers}
          cells={cells}
          uischema={child}
          schema={schema}
          path={path}
          enabled={enabled}
        />
      </Box>
    );
  });
};
