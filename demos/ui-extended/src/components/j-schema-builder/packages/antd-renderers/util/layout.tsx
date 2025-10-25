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
import { Col, Row } from 'antd';

export interface AntdLayoutRendererProps extends OwnPropsOfRenderer {
  elements: UISchemaElement[];
  direction: 'row' | 'column';
}

export const renderColumnLayoutElements = (
  elements: UISchemaElement[],
  schema: JsonSchema,
  path: string,
  enabled: boolean,
  renderers?: JsonFormsRendererRegistryEntry[],
  cells?: JsonFormsCellRendererRegistryEntry[]
) => {
  return (
    <>
      {elements.map((child, index) => (
        <Row key={`${path}-${index}`}>
          <Col span={24}>
            <JsonFormsDispatch
              uischema={child}
              schema={schema}
              path={path}
              enabled={enabled}
              renderers={renderers}
              cells={cells}
            />
          </Col>
        </Row>
      ))}
    </>
  );
};

export const renderRowLayoutElements = (
  elements: UISchemaElement[],
  schema: JsonSchema,
  path: string,
  enabled: boolean,
  renderers?: JsonFormsRendererRegistryEntry[],
  cells?: JsonFormsCellRendererRegistryEntry[]
) => {
  return (
    <Row gutter={8} style={{ width: '100%' }}>
      {elements.map((child, index) => (
        <Col key={`${path}-${index}`} span={Math.floor(24 / elements.length)}>
          <JsonFormsDispatch
            uischema={child}
            schema={schema}
            path={path}
            enabled={enabled}
            renderers={renderers}
            cells={cells}
          />
        </Col>
      ))}
    </Row>
  );
};

const AntdLayoutRendererComponent = ({
  visible,
  elements,
  schema,
  path,
  enabled,
  direction,
  renderers,
  cells,
}: AntdLayoutRendererProps | any) => {
  if (isEmpty(elements) || !visible) {
    return null;
  } else {
    if (direction === 'column') {
      return renderColumnLayoutElements(
        elements,
        schema,
        path,
        enabled,
        renderers,
        cells
      );
    }
    return renderRowLayoutElements(
      elements,
      schema,
      path,
      enabled,
      renderers,
      cells
    );
  }
};
export const AntdLayoutRenderer = React.memo(AntdLayoutRendererComponent);

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

export interface AntdLabelableLayoutRendererProps
  extends AntdLayoutRendererProps {
  label?: string;
}
