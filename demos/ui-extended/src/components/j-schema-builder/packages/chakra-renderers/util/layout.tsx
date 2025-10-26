"use client"

import isEmpty from 'lodash/isEmpty';
import React, { ComponentType } from 'react';

import Ajv from 'ajv';
import type { UISchemaElement } from '#jSchemaBuilder/core';
import {
  getAjv,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  OwnPropsOfRenderer,
} from '#jSchemaBuilder/core';
import { JsonFormsDispatch, useJsonForms } from '#jSchemaBuilder/react';
import { Box, Fieldset, Stack } from '@chakra-ui/react';

export const renderLayoutElements = (
  elements: UISchemaElement[],
  schema: JsonSchema,
  path: string,
  enabled: boolean,
  renderers?: JsonFormsRendererRegistryEntry[],
  cells?: JsonFormsCellRendererRegistryEntry[]
) => {
  return elements.map((child, index) => (
    <Box key={`${path}-${index}`} w='100%'>
      <JsonFormsDispatch
        uischema={child}
        schema={schema}
        path={path}
        enabled={enabled}
        renderers={renderers}
        cells={cells}
      />
    </Box>
  ));
};

export interface LayoutRendererProps extends OwnPropsOfRenderer {
  elements: UISchemaElement[];
  direction: 'row' | 'column';
}
export const LayoutRenderer = ({
  // visible,
  elements,
  schema,
  path,
  enabled,
  direction,
  renderers,
  cells,
}: LayoutRendererProps) => {
  if (isEmpty(elements)) {
    return null;
  } else {
    return (
      <Stack direction={direction} w='100%'>
        <Fieldset.Root>
          {renderLayoutElements(
            elements,
            schema as JsonSchema,
            path as string,
            enabled as boolean,
            renderers,
            cells
          )}
        </Fieldset.Root>
      </Stack>
    );
  }
};

export interface AjvProps {
  ajv: Ajv;
}
// TODO fix @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/ban-types
export const withAjvProps = <P extends {}>(
  Component: ComponentType<AjvProps & P>
) =>
  function WithAjvProps(props: P) {
    const ctx = useJsonForms();
    const ajv = getAjv({ jsonforms: { ...ctx } });

    return <Component {...props} ajv={ajv} />;
  };
