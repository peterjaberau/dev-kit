"use client"

import React, { useState, useMemo } from 'react';
import {
  and,
  Categorization,
  Category,
  deriveLabelForUISchemaElement,
  isVisible,
  RankedTester,
  rankWith,
  StatePropsOfLayout,
  Tester,
  UISchemaElement,
  uiTypeIs,
} from '#jSchemaBuilder/core';
import {
  TranslateProps,
  withJsonFormsLayoutProps,
  withTranslateProps,
} from '#jSchemaBuilder/react';
import {
  AjvProps,
  AntdLayoutRenderer,
  AntdLayoutRendererProps,
  withAjvProps,
} from '../util/layout';
import { Tabs } from 'antd';

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
    AjvProps,
    TranslateProps {
  selected?: number;
  ownState?: boolean;
  data?: any;
  onChange?(selected: number, prevSelected: number): void;
}

export const CategorizationLayoutRenderer = (
  props: CategorizationLayoutRendererProps
) => {
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
    onChange,
    ajv,
    t,
  } = props;
  const categorization = uischema as Categorization;
  const [previousCategorization, setPreviousCategorization] =
    useState<Categorization>(uischema as Categorization);
  const [activeCategory, setActiveCategory] = useState<number>(selected ?? 0);
  const categories = useMemo(
    () =>
      categorization.elements.filter((category: Category | any) =>
        isVisible(category, data, undefined, ajv)
      ),
    [categorization, data, ajv]
  );

  if (categorization !== previousCategorization) {
    setActiveCategory(0);
    setPreviousCategorization(categorization);
  }

  const safeCategory =
    activeCategory >= categorization.elements.length ? 0 : activeCategory;
  const childProps: AntdLayoutRendererProps = {
    elements: categories[safeCategory] ? categories[safeCategory].elements : [],
    schema,
    path,
    direction: 'column',
    enabled,
    visible,
    renderers,
    cells,
  };
  const onTabChange = (value: string) => {
    const category = parseInt(value);

    if (onChange) {
      onChange(category, safeCategory);
    }
    setActiveCategory(category);
  };

  const tabLabels = useMemo(() => {
    return categories.map((e: Category | any) => deriveLabelForUISchemaElement(e, t));
  }, [categories, t]);

  if (!visible) {
    return null;
  }

  return (
    <Tabs
      defaultActiveKey={safeCategory?.toString()}
      onChange={onTabChange}
      items={categories.map(
        (_, idx: number) =>
          ({
            label: tabLabels[idx],
            key: String(idx),
            children: <AntdLayoutRenderer {...childProps} />,
          } as any)
      )}
    ></Tabs>
  );
};

export default withAjvProps(
  withTranslateProps(withJsonFormsLayoutProps(CategorizationLayoutRenderer))
);
