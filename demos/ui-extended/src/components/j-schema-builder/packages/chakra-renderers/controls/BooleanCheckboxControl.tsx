
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import {
  ControlProps,
  isBooleanControl,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { withJsonFormsControlProps } from '#jSchemaBuilder/react';
import { Field } from '@chakra-ui/react';
import Hidden from '../util/Hidden';
import { ChakraCheckbox } from '../chakra-controls/ChakraCheckbox';

export const BooleanCheckboxControl = ({
  data,
  visible,
  required,
  label,
  description,
  id,
  enabled,
  uischema,
  schema,
  rootSchema,
  handleChange,
  errors,
  path,
  config,
}: ControlProps) => {
  const isValid = isEmpty(errors);
  // const appliedUiSchemaOptions = merge({}, config, uischema.options);

  return (
    <Hidden hidden={!visible}>
      <Field.Root id={id} invalid={!isValid} required={required} my='12px'>
        {/* <Field.Label
          requiredIndicator={
            <Text as='span' ms='0.5' color='blue.600' fontWeight='bold'>
              {appliedUiSchemaOptions.hideRequiredAsterisk ? '' : '*'}
            </Text>
          }
        >
        </Field.Label> */}
        <ChakraCheckbox
          id={`${id}-input`}
          isValid={isValid}
          data={data}
          enabled={enabled}
          visible={visible}
          path={path}
          label={label}
          uischema={uischema}
          schema={schema}
          rootSchema={rootSchema}
          handleChange={handleChange}
          errors={errors}
          config={config}
        />
        <Field.HelperText>{description}</Field.HelperText>
        <Field.ErrorText>{errors}</Field.ErrorText>
      </Field.Root>
    </Hidden>
  );
};

export const booleanCheckboxControlTester: RankedTester = rankWith(
  2,
  isBooleanControl
);

export default withJsonFormsControlProps(BooleanCheckboxControl);
