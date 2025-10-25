
import range from 'lodash/range';
import React from 'react';
import {
  ArrayLayoutProps,
  computeLabel,
  // computeLabel,
  createDefaultValue,
} from '#jSchemaBuilder/core';
import map from 'lodash/map';
import ExpandPanelRenderer from './ExpandPanelRenderer';
import merge from 'lodash/merge';
import { Accordion, Box } from '@chakra-ui/react';
import { ArrayLayoutToolbar } from './ArrayToolbar';
import NoData from '../util/NoData';

interface ArrayLayoutState {
  expanded: number;
  [key: string]: any
}
export class ArrayLayout extends React.PureComponent<
  ArrayLayoutProps,
  ArrayLayoutState
> {
  state: ArrayLayoutState = {
    expanded: NaN,
  };
  innerCreateDefaultValue = () => createDefaultValue(this.props.schema);
  handleChange = (key: number) => {
    this.setState({
      expanded: key,
    });
  };
  isExpanded = (index: number) => this.state.expanded === index;
  render() {
    const {
      data,
      path,
      schema,
      uischema,
      errors,
      addItem,
      renderers,
      cells,
      label,
      required,
      rootSchema,
      config,
      uischemas,
      translations,
    }: any = this.props;
    const appliedUiSchemaOptions = merge(
      {},
      config,
      this.props.uischema.options
    );

    return (
      <Box w='100%'>
        <ArrayLayoutToolbar
          translations={translations}
          label={computeLabel(
            label,
            required,
            appliedUiSchemaOptions.hideRequiredAsterisk
          )}
          errors={errors}
          path={path}
          addItem={addItem}
          createDefault={this.innerCreateDefaultValue}
        />
        {data > 0 ? (
          <Accordion.Root multiple>
            {map(range(data), (index) => {
              return (
                <ExpandPanelRenderer
                  index={index}
                  translations={translations}
                  schema={schema}
                  path={path}
                  renderers={renderers}
                  uischema={uischema}
                  uischemas={uischemas}
                  cells={cells}
                  key={`${path}_${index}`}
                  rootSchema={rootSchema}
                  enableMoveUp={index != 0}
                  enableMoveDown={index < data - 1}
                  config={config}
                  childLabelProp={appliedUiSchemaOptions.elementLabelProp}
                  enabled={false}
                  expanded={false}
                />
              );
            })}
          </Accordion.Root>
        ) : (
          <NoData title='No data' />
        )}
      </Box>
    );
  }
}
