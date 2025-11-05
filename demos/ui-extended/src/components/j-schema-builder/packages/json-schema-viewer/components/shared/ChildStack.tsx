"use client"

import { SchemaNode } from '@stoplight/json-schema-tree';
import { Box, Card, Flex } from '@chakra-ui/react';
import type { ChangeType } from '@stoplight/types';
import * as React from 'react';

import { NESTING_OFFSET } from '../../consts';
import { useJSVOptionsContext } from '../../context';
import { SchemaRow, SchemaRowProps } from '../SchemaRow';

type ChildStackProps = {
  schemaNode: SchemaNode;
  childNodes: readonly SchemaNode[];
  currentNestingLevel: number;
  className?: string;
  parentNodeId?: string;
  RowComponent?: React.FC<SchemaRowProps>;
  parentChangeType?: ChangeType;
};

export const ChildStack = React.memo(
  ({
    childNodes,
    currentNestingLevel,
    className,
    RowComponent = SchemaRow,
    parentNodeId,
    parentChangeType,
  }: ChildStackProps) => {
    const { renderRootTreeLines } = useJSVOptionsContext();
    const rootLevel = renderRootTreeLines ? 0 : 1;
    const isRootLevel = currentNestingLevel < rootLevel;

    let ml: any;
    if (!isRootLevel) {
      ml = currentNestingLevel === rootLevel ? 'px' : 7;
    }

    return (
          <Flex
            flex={1}
            flexDirection='column'
            data-id='shared-child-stack'
            fontSize="sm"
            w={'100%'}
            // borderLeft={isRootLevel ? 'none' : '1px solid'}
            // borderLeftColor={isRootLevel ? undefined : 'border.info'}
            // data-level={currentNestingLevel}
          >
            {childNodes.map((childNode: SchemaNode) => (
              <RowComponent
                key={childNode.id}
                schemaNode={childNode}
                nestingLevel={currentNestingLevel + 1}
                pl={isRootLevel ? undefined : NESTING_OFFSET}
                parentNodeId={parentNodeId}
                parentChangeType={parentChangeType}
              />
            ))}
          </Flex>
    );
  },
);
