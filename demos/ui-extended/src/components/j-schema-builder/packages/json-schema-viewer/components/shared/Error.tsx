"use client"

import { isReferenceNode, isRegularNode, ReferenceNode, SchemaNode, SchemaNodeKind } from '@stoplight/json-schema-tree';
import { Box, Icon } from '@chakra-ui/react';
import { FaExclamationTriangle } from "react-icons/fa";

import { Tooltip } from '@dev-kit/components'
import * as React from 'react';

import { isFlattenableNode } from '../../tree';
import { getInternalSchemaError } from '../../utils/getInternalSchemaError';

function useRefNode(schemaNode: SchemaNode) {
  return React.useMemo<ReferenceNode | null>(() => {
    if (isReferenceNode(schemaNode)) {
      return schemaNode;
    }

    if (
      isRegularNode(schemaNode) &&
      (isFlattenableNode(schemaNode) ||
        (schemaNode.primaryType === SchemaNodeKind.Array && schemaNode.children?.length === 1))
    ) {
      return (schemaNode.children?.find(isReferenceNode) as ReferenceNode | undefined) ?? null;
    }

    return null;
  }, [schemaNode]);
}

export const Error: React.FC<{ schemaNode: SchemaNode }> = ({ schemaNode }) => {
  const refNode = useRefNode(schemaNode);
  const error = getInternalSchemaError(schemaNode) ?? refNode?.error;

  if (typeof error !== 'string') return null;

  return (
    <Tooltip
      data-id='shared-error'
      content={error}
    >
      <Icon size={'xs'} color={'fg.error'}>
        <FaExclamationTriangle />
      </Icon>
    </Tooltip>

  );
};
