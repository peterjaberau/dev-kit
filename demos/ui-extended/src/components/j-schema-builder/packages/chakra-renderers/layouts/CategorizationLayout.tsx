"use client"

import React from 'react';
import {
  and,
  Categorization,
  Category,
  isVisible,
  RankedTester,
  rankWith,
  StatePropsOfLayout,
  Tester,
  UISchemaElement,
  uiTypeIs,
} from '#jSchemaBuilder/core';
import {
  RendererComponent,
  withJsonFormsLayoutProps,
} from '#jSchemaBuilder/react';
import {
  AjvProps,
  LayoutRenderer as LayoutRenderer,
  LayoutRendererProps as LayoutRendererProps,
  withAjvProps,
} from '../util/layout';
import Hidden from '../util/Hidden';
import { Tabs } from '@chakra-ui/react';

export const isSingleLevelCategorization: Tester = and(
  uiTypeIs('Categorization'),
  (uischema: UISchemaElement): boolean => {
    const categorization = uischema as Categorization;

    return (
      categorization.elements &&
      categorization.elements.reduce(
        (acc, e) => acc && e.type === 'Category',
        true
      )
    );
  }
);

export const categorizationTester: RankedTester = rankWith(
  1,
  isSingleLevelCategorization
);
export interface CategorizationState {
  activeCategory: number;
}

export interface CategorizationLayoutRendererProps
  extends StatePropsOfLayout,
    AjvProps {
  selected?: number;
  ownState?: boolean;
  data?: any;
  onChange?(selected: number, prevSelected: number): void;
}

export class CategorizationLayoutRenderer extends RendererComponent<
  CategorizationLayoutRendererProps,
  CategorizationState
> {
  state = {
    activeCategory: 0,
  };

  render() {
    const {
      data,
      path,
      renderers,
      cells,
      schema,
      uischema,
      visible,
      enabled,
      selected,
      ajv,
    } = this.props;
    const categorization: any = uischema as Categorization;
    const value: any = this.hasOwnState() ? this.state.activeCategory : selected;
    const childProps: LayoutRendererProps = {
      elements: categorization.elements[value].elements,
      schema,
      path,
      direction: 'column',
      enabled,
      visible,
      renderers,
      cells,
    };

    const categories = categorization.elements.filter((category: Category | any) =>
      isVisible(category, data, undefined, ajv)
    );
    return (
      <Hidden hidden={!visible}>
        <Tabs.Root defaultValue={value.toString()}>
          <Tabs.List>
            {categories.map((e: Category, idx: number) => (
              <Tabs.Trigger
                key={idx}
                value={idx.toString()}
                onClick={() => this.handleChange(idx)}
              >
                {e.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <LayoutRenderer {...childProps} />
        </Tabs.Root>
      </Hidden>
    );
  }

  hasOwnState = () => {
    return this.props.ownState !== undefined ? this.props.ownState : true;
  };

  private handleChange = (value: number) => {
    if (this.props.onChange) {
      this.props.onChange(value, this.state.activeCategory);
    }
    const hasOwnState = this.hasOwnState();
    if (hasOwnState) {
      this.setState({ activeCategory: value });
    }
  };
}

export default withJsonFormsLayoutProps(
  withAjvProps(CategorizationLayoutRenderer)
);
