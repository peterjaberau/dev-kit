"use client"

import React from 'react';
import _ from 'lodash';
import {
  Generate,
  isLayout,
  JsonSchema,
  UISchemaElement,
} from '#jSchemaBuilder/core';
import { JsonFormsDispatch } from '#jSchemaBuilder/react';

interface CombinatorPropertiesProps {
  schema: JsonSchema;
  combinatorKeyword: 'oneOf' | 'anyOf';
  path: string;
}

export class CombinatorProperties extends React.Component<
  CombinatorPropertiesProps,
  // TODO fix @typescript-eslint/ban-types
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
> {
  render() {
    const { schema, combinatorKeyword, path } = this.props;

    const otherProps: JsonSchema = _.omit(
      schema,
      combinatorKeyword
    ) as JsonSchema;
    const foundUISchema: UISchemaElement = Generate.uiSchema(
      otherProps,
      'VerticalLayout'
    );
    let isLayoutWithElements = false;
    if (foundUISchema !== null && isLayout(foundUISchema)) {
      isLayoutWithElements = foundUISchema.elements.length > 0;
    }

    if (isLayoutWithElements) {
      return (
        <JsonFormsDispatch
          schema={otherProps}
          path={path}
          uischema={foundUISchema}
        />
      );
    }

    return null;
  }
}

export default CombinatorProperties;
