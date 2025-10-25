"use client"

import React, { useState, useMemo } from 'react';
import merge from 'lodash/merge';
import { Button, Steps } from 'antd';
import {
  and,
  Categorization,
  categorizationHasCategory,
  Category,
  deriveLabelForUISchemaElement,
  isVisible,
  optionIs,
  RankedTester,
  rankWith,
  StatePropsOfLayout,
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

export const categorizationStepperTester: RankedTester = rankWith(
  2,
  and(
    uiTypeIs('Categorization'),
    categorizationHasCategory,
    optionIs('variant', 'stepper')
  )
);

export interface CategorizationStepperState {
  activeCategory: number;
}

export interface CategorizationStepperLayoutRendererProps
  extends StatePropsOfLayout,
    AjvProps,
    TranslateProps {
  data: any;
}

export const CategorizationStepperLayoutRenderer = (
  props: CategorizationStepperLayoutRendererProps
) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  const handleStep = (step: number) => {
    setActiveCategory(step);
  };

  const {
    data,
    path,
    renderers,
    schema,
    uischema,
    visible,
    cells,
    config,
    ajv,
    t,
  } = props;
  const categorization = uischema as Categorization;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const buttonWrapperStyle = {
    textAlign: 'right' as const,
    width: '100%',
    margin: '1em auto',
  };
  const buttonNextStyle = {
    float: 'right' as const,
  };
  const buttonStyle = {
    marginRight: '1em',
  };
  const categories: any = useMemo(
    () =>
      categorization.elements.filter((category: Category | any) =>
        isVisible(category, data, undefined, ajv)
      ),
    [categorization, data, ajv]
  );
  const childProps: AntdLayoutRendererProps = {
    elements: categories[activeCategory].elements,
    schema,
    path,
    direction: 'column',
    visible,
    renderers,
    cells,
  };
  const tabLabels = useMemo(() => {
    return categories.map((e: Category) => deriveLabelForUISchemaElement(e, t));
  }, [categories, t]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <Steps current={activeCategory} style={{ marginBottom: '10px' }}>
        {categories.map((_: Category, idx: number) => (
          <Steps.Step
            key={tabLabels[idx]}
            title={tabLabels[idx]}
            onClick={() => handleStep(idx)}
          />
        ))}
      </Steps>
      <div>
        <AntdLayoutRenderer {...childProps} />
      </div>
      {appliedUiSchemaOptions.showNavButtons ? (
        <div style={buttonWrapperStyle}>
          <Button
            style={buttonNextStyle}
            color='primary'
            disabled={activeCategory >= categories.length - 1}
            onClick={() => handleStep(activeCategory + 1)}
          >
            Next
          </Button>
          <Button
            style={buttonStyle}
            color='default'
            disabled={activeCategory <= 0}
            onClick={() => handleStep(activeCategory - 1)}
          >
            Previous
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default withAjvProps(
  withTranslateProps(
    withJsonFormsLayoutProps(CategorizationStepperLayoutRenderer)
  )
);
