
import React from 'react';
import merge from 'lodash/merge';
import {
  and,
  Categorization,
  categorizationHasCategory,
  Category,
  isVisible,
  optionIs,
  RankedTester,
  rankWith,
  StatePropsOfLayout,
  uiTypeIs,
} from '#jSchemaBuilder/core';
import {
  RendererComponent,
  withJsonFormsLayoutProps,
} from '#jSchemaBuilder/react';
import { Button, Steps, ButtonGroup } from '@chakra-ui/react';
import {
  AjvProps,
  LayoutRenderer,
  LayoutRendererProps,
  withAjvProps,
} from '../util/layout';
import Hidden from '../util/Hidden';

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
    AjvProps {
  data: any;
}

const StepsItem = Steps.Item as any;

export class CategorizationStepperLayoutRenderer extends RendererComponent<
  CategorizationStepperLayoutRendererProps,
  CategorizationStepperState
> {
  state = {
    activeCategory: 0,
  };

  handleStep = (step: number) => {
    this.setState({ activeCategory: step });
  };

  render() {
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
    } = this.props;
    const categorization = uischema as Categorization;
    const activeCategory = this.state.activeCategory;
    const appliedUiSchemaOptions = merge({}, config, uischema.options);
    const childProps: LayoutRendererProps = {
      elements: categorization.elements[activeCategory].elements,
      schema,
      path,
      direction: 'column',
      visible,
      renderers,
      cells,
    };
    const categories = categorization.elements.filter(
      (category: Category | any) => isVisible(category, data, '', ajv)
    );
    return (
      <Hidden hidden={!visible}>
        <Steps.Root defaultValue={activeCategory} mb='4'>
          <Steps.List>
            {categories.map((item: Category | any, idx: number) => (
              <StepsItem
                key={`${item.label}_${idx}`}
                index={idx}
                title={item.label}
                onClick={() => this.handleStep(idx)}
              >
                <Steps.Indicator />
                <Steps.Title>{item.label}</Steps.Title>
                <Steps.Separator />
              </StepsItem>
            ))}
          </Steps.List>
        </Steps.Root>
        <div>
          <LayoutRenderer {...childProps} />
        </div>
        {appliedUiSchemaOptions.showNavButtons ? (
          <ButtonGroup w='100%' margin='4' justifyContent='end'>
            <Button
              color='secondary'
              disabled={activeCategory <= 0}
              onClick={() => this.handleStep(activeCategory - 1)}
            >
              Previous
            </Button>
            <Button
              color='primary'
              disabled={activeCategory >= categories.length - 1}
              onClick={() => this.handleStep(activeCategory + 1)}
            >
              Next
            </Button>
          </ButtonGroup>
        ) : (
          <></>
        )}
      </Hidden>
    );
  }
}

export default withJsonFormsLayoutProps(
  withAjvProps(CategorizationStepperLayoutRenderer)
);
