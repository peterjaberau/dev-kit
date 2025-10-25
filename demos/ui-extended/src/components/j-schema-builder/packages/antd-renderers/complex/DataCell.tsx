"use client"

import {
  ControlElement,
  encode,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  Resolve,
} from '#jSchemaBuilder/core';
import { DispatchCell } from '#jSchemaBuilder/react';
import { Form } from 'antd';
import isEmpty from 'lodash/isEmpty';
import React from 'react';

export interface DataCellProps {
  path: string;
  propName?: string;
  schema: JsonSchema;
  rootSchema: JsonSchema;
  errors: string;
  enabled: boolean;
  renderers?: JsonFormsRendererRegistryEntry[];
  cells?: JsonFormsCellRendererRegistryEntry[];
}

const controlWithoutLabel = (scope: string): ControlElement => ({
  type: 'Control',
  scope: scope,
  label: false,
});

const DataCell = ({
  path,
  propName,
  schema,
  rootSchema,
  errors,
  enabled,
  renderers,
  cells,
}: DataCellProps | any) => {
  const isValid = isEmpty(errors);

  return (
    <Form.Item
      hasFeedback={!isValid}
      validateStatus={isValid ? 'success' : 'error'}
      help={errors}
      style={{ marginBottom: 0 }}
    >
      {schema.properties ? (
        <DispatchCell
          schema={Resolve.schema(
            schema,
            `#/properties/${encode(propName)}`,
            rootSchema
          )}
          uischema={controlWithoutLabel(`#/properties/${encode(propName)}`)}
          path={path}
          enabled={enabled}
          renderers={renderers}
          cells={cells}
        />
      ) : (
        <DispatchCell
          schema={schema}
          uischema={controlWithoutLabel('#')}
          path={path}
          enabled={enabled}
          renderers={renderers}
          cells={cells}
        />
      )}
    </Form.Item>
  );
};

export default DataCell;
