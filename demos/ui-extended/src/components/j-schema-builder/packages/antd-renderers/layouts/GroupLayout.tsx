"use client"

import React from 'react';
import { Card } from 'antd';
import {
  GroupLayout,
  LayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
  withIncreasedRank,
} from '#jSchemaBuilder/core';
import {
  AntdLabelableLayoutRendererProps,
  AntdLayoutRenderer,
} from '../util/layout';
import { withJsonFormsLayoutProps } from '#jSchemaBuilder/react';

export const groupTester: RankedTester = rankWith(1, uiTypeIs('Group'));
const style: { [x: string]: any } = { marginBottom: '10px', width: '100%' };

const GroupComponent = React.memo(function GroupComponent({
  visible,
  enabled,
  uischema,
  label,
  ...props
}: AntdLabelableLayoutRendererProps) {
  const groupLayout = uischema as GroupLayout;
  return (
    <Card hidden={!visible} title={label} style={style}>
      <AntdLayoutRenderer
        {...props}
        visible={visible}
        enabled={enabled}
        elements={groupLayout.elements}
      />
    </Card>
  );
});

export const GroupLayoutRenderer = ({
  uischema,
  schema,
  path,
  visible,
  enabled,
  renderers,
  cells,
  direction,
  label,
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
      label={label}
    />
  );
};

export default withJsonFormsLayoutProps(GroupLayoutRenderer);

export const antdGroupTester: RankedTester = withIncreasedRank(1, groupTester);
