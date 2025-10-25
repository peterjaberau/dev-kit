/* eslint-disable react/display-name */

import React from 'react';
import {
  GroupLayout,
  LayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
  withIncreasedRank,
} from '#jSchemaBuilder/core';
import { withJsonFormsLayoutProps } from '#jSchemaBuilder/react';
import { Card, Heading } from '@chakra-ui/react';
import { LayoutRenderer, LayoutRendererProps } from '../util/layout';

export const groupTester: RankedTester = rankWith(1, uiTypeIs('Group'));

const GroupComponent = React.memo(
  ({ visible, enabled, uischema, ...props }: LayoutRendererProps) => {
    const groupLayout = uischema as GroupLayout;
    return (
      <Card.Root hidden={!visible} mb='10px' w='100%'>
        <Card.Header>
          <Heading size='md'>{groupLayout.label}</Heading>
        </Card.Header>
        <Card.Body>
          <LayoutRenderer
            {...props}
            visible={visible}
            enabled={enabled}
            elements={groupLayout.elements}
          />
        </Card.Body>
      </Card.Root>
    );
  }
);

export const GroupLayoutRenderer = ({
  uischema,
  schema,
  path,
  visible,
  enabled,
  renderers,
  cells,
  direction,
}: LayoutProps) => {
  const groupLayout = uischema as GroupLayout;

  return (
    <GroupComponent
      elements={groupLayout.elements}
      schema={schema}
      path={path}
      direction={direction}
      visible={visible}
      enabled={enabled}
      uischema={uischema}
      renderers={renderers}
      cells={cells}
    />
  );
};

export default withJsonFormsLayoutProps(GroupLayoutRenderer);

export const antdGroupTester: RankedTester = withIncreasedRank(1, groupTester);
