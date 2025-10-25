'use client'
import React, { useState } from 'react';
import type { Categorization, Category, LayoutProps } from '#jSchemaBuilder/core';
import {
  TranslateProps,
  withJsonFormsLayoutProps,
  withTranslateProps,
} from '#jSchemaBuilder/react';
import { CategorizationList } from './CategorizationList';
import { SingleCategory } from './SingleCategory';
import { withAjvProps, withVanillaControlProps } from '../../util';
import type { AjvProps, VanillaRendererProps } from '../../util';

export interface CategorizationState {
  selectedCategory: Category;
}

interface CategorizationProps {
  selected?: number;
  onChange?(selected: number, prevSelected: number): void;
}

export const CategorizationRenderer = ({
  data,
  uischema,
  schema,
  path,
  selected,
  t,
  visible,
  getStyleAsClassName,
  onChange,
  ajv,
  config,
}: LayoutProps &
  VanillaRendererProps &
  TranslateProps &
  CategorizationProps &
  AjvProps | any) => {
  const categorization = uischema as Categorization;
  const elements = categorization.elements as (Category | Categorization)[];
  const classNames = getStyleAsClassName('categorization');
  const masterClassNames = getStyleAsClassName('categorization.master');
  const detailClassNames = getStyleAsClassName('categorization.detail');
  const subcategoriesClassName = getStyleAsClassName('category.subcategories');
  const groupClassName = getStyleAsClassName('category.group');

  const [previousCategorization, setPreviousCategorization] =
    useState<Categorization>(uischema as Categorization);
  const [activeCategory, setActiveCategory] = useState<number>(selected ?? 0);

  const safeCategory =
    activeCategory >= categorization.elements.length ? 0 : activeCategory;

  if (categorization !== previousCategorization) {
    setActiveCategory(0);
    setPreviousCategorization(categorization);
  }

  const onCategorySelected = (categoryIndex: number | any) => () => {
    if (onChange) {
      return onChange(categoryIndex, safeCategory);
    }
    return setActiveCategory(categoryIndex);
  };

  return (
    <div
      className={classNames}
      hidden={visible === null || visible === undefined ? false : !visible}
    >
      <div className={masterClassNames}>
        <CategorizationList
          elements={elements}
          selectedCategory={elements[safeCategory] as Category}
          data={data}
          ajv={ajv}
          config={config}
          depth={0}
          onSelect={onCategorySelected}
          subcategoriesClassName={subcategoriesClassName}
          groupClassName={groupClassName}
          t={t}
        />
      </div>
      <div className={detailClassNames}>
        <SingleCategory
          category={elements[safeCategory] as Category}
          schema={schema}
          path={path}
          key={safeCategory}
        />
      </div>
    </div>
  );
};

export default withAjvProps(
  withVanillaControlProps(
    withTranslateProps(withJsonFormsLayoutProps(CategorizationRenderer))
  )
);
