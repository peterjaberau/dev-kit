'use client'
import isEmpty from 'lodash/isEmpty';
import React, { FunctionComponent } from 'react';
import {
  GroupLayout,
  LayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '#jSchemaBuilder/core';
import { withJsonFormsLayoutProps } from '#jSchemaBuilder/react';
import { renderChildren } from './util';
import type { VanillaRendererProps } from '../index';
import { withVanillaControlProps } from '../util';
import { Fieldset, Stack } from '@chakra-ui/react'

/**
 * Default tester for a group layout.
 *
 * @type {RankedTester}
 */
export const groupTester: RankedTester = rankWith(1, uiTypeIs('Group'));

export const GroupLayoutRenderer = (
  props: LayoutProps & VanillaRendererProps
) => {
  const { data: _data, ...otherProps } = props;
  // We don't hand over data to the layout renderer to avoid rerendering it with every data change
  return <GroupLayoutRendererComponent {...otherProps} />;
};

const GroupLayoutRendererComponent: FunctionComponent<
  LayoutProps & VanillaRendererProps
> = React.memo(function GroupLayoutRendererComponent({
  schema,
  uischema,
  path,
  enabled,
  visible,
  label,
  getStyle,
  getStyleAsClassName,
}: LayoutProps & VanillaRendererProps | any) {
  const group = uischema as GroupLayout;
  const elementsSize = group.elements ? group.elements.length : 0;
  const classNames = getStyleAsClassName('group.layout');
  const childClassNames = ['group-layout-item']
    .concat(getStyle('group.layout.item', elementsSize))
    .join(' ');



  return (
    <>
      <Fieldset.Root hidden={visible === undefined || visible === null ? false : !visible}>
        <Stack>
          {!isEmpty(label) && <Fieldset.Legend>{label}</Fieldset.Legend>}
        </Stack>
        <Fieldset.Content>
          {renderChildren(group, schema, childClassNames, path, enabled)}
        </Fieldset.Content>
      </Fieldset.Root>
    </>
  )
});

export default withVanillaControlProps(
  withJsonFormsLayoutProps(GroupLayoutRenderer)
);
