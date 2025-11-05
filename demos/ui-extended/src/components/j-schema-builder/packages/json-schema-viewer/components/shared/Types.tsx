"use client"

import {
  isBooleanishNode,
  isReferenceNode,
  isRegularNode,
  RegularNode,
  SchemaCombinerName,
  SchemaNode,
  SchemaNodeKind,
} from '@stoplight/json-schema-tree';
import { chakra } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react';
import * as React from 'react';

import { printName } from '../../utils';
import { getApplicableFormats } from '../../utils/getApplicableFormats';

function shouldRenderName(type: SchemaNodeKind | SchemaCombinerName | '$ref'): boolean {
  return type === SchemaNodeKind.Array || type === SchemaNodeKind.Object || type === '$ref';
}

function getTypes(schemaNode: RegularNode): Array<SchemaNodeKind | SchemaCombinerName> {
  return [schemaNode.types, schemaNode.combiners].reduce<Array<SchemaNodeKind | SchemaCombinerName>>(
    (values, value) => {
      if (value === null) {
        return values;
      }

      values.push(...value);
      return values;
    },
    [],
  );
}

export const Types: React.FunctionComponent<{ schemaNode: SchemaNode }> = ({ schemaNode }) => {
  if (isReferenceNode(schemaNode)) {
    return (
      <chakra.span
        data-id='shared-types'
        textOverflow="truncate" data-test="property-type-ref">
        {schemaNode.value ?? '$ref'}
      </chakra.span>
    );
  }

  if (isBooleanishNode(schemaNode)) {
    return (
      <chakra.span
        data-id='shared-types'
        textOverflow="truncate" color="fg.muted" data-test="property-type">
        {schemaNode.fragment ? 'any' : 'never'}
      </chakra.span>
    );
  }

  if (!isRegularNode(schemaNode)) {
    return null;
  }

  const formats = getApplicableFormats(schemaNode);
  const types = getTypes(schemaNode);

  if (types.length === 0) {
    return (
      <chakra.span
        data-id='shared-types'
        textOverflow="truncate" color="fg.muted" data-test="property-type">
        {formats === null ? 'any' : `<${formats[1]}>`}
      </chakra.span>
    );
  }

  const rendered = types.map((type, i, { length }) => {
    let printedName;
    if (shouldRenderName(type)) {
      printedName = printName(schemaNode);
    }

    printedName ??= type + (formats === null || formats[0] !== type ? '' : `<${formats[1]}>`);

    return (
      <React.Fragment key={type}>
        <chakra.span textOverflow="truncate" color="fg.muted" data-test="property-type">
          {printedName}
        </chakra.span>

        {i < length - 1 && (
          <chakra.span key={`${i}-sep`} color="fg.muted">
            {' or '}
          </chakra.span>
        )}
      </React.Fragment>
    );
  });

  return rendered.length > 1 ? (
    <Box data-id="shared-types" textOverflow="truncate">
      {rendered}
    </Box>
  ) : (
    <>{rendered}</>
  )
};
Types.displayName = 'JsonSchemaViewer.Types';
