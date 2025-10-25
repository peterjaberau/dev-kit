'use client'
import React, { useMemo } from 'react';
import {
  Category,
  Categorization,
  deriveLabelForUISchemaElement,
  Translator,
  isVisible,
} from '#jSchemaBuilder/core';
import { isCategorization } from './tester';
import { AjvProps } from '../../util';

const getCategoryClassName = (
  category: Category,
  selectedCategory: Category
): string => (selectedCategory === category ? 'selected' : '');

export interface CategorizationProps {
  elements: (Category | Categorization)[];
  selectedCategory: Category;
  depth: number;
  data: any;
  onSelect: any;
  subcategoriesClassName: string;
  groupClassName: string;
  t: Translator;
  config: unknown;
}

export const CategorizationList = ({
  selectedCategory,
  elements,
  data,
  depth,
  onSelect,
  subcategoriesClassName,
  groupClassName,
  t,
  ajv,
  config,
}: CategorizationProps & AjvProps) => {
  const filteredElements = useMemo(() => {
    return elements.filter((category: Category | Categorization) =>
      isVisible(category, data, undefined, ajv, config)
    );
  }, [elements, data, ajv, config]);

  const categoryLabels = useMemo(
    () => filteredElements.map((cat) => deriveLabelForUISchemaElement(cat, t)),
    [filteredElements, t]
  );

  return (
    <ul className={subcategoriesClassName}>
      {filteredElements.map((category, idx) => {
        if (isCategorization(category)) {
          return (
            <li key={categoryLabels[idx]} className={groupClassName}>
              <span>{categoryLabels[idx]}</span>
              <CategorizationList
                selectedCategory={selectedCategory}
                elements={category.elements}
                data={data}
                ajv={ajv}
                config={config}
                depth={depth + 1}
                onSelect={onSelect}
                subcategoriesClassName={subcategoriesClassName}
                groupClassName={groupClassName}
                t={t}
              />
            </li>
          );
        } else {
          return (
            <li
              key={categoryLabels[idx]}
              onClick={onSelect(idx)}
              className={getCategoryClassName(category, selectedCategory)}
            >
              <span>{categoryLabels[idx]}</span>
            </li>
          );
        }
      })}
    </ul>
  );
};
