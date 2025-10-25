
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import {
  and,
  ControlProps,
  isBooleanControl,
  optionIs,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { withJsonFormsControlProps } from '#jSchemaBuilder/react';
import { Field } from '@chakra-ui/react';
import Hidden from '../util/Hidden';
import { ChakraToggle } from '../chakra-controls/ChakraToggle';

export const BooleanToggleControl = ({
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

  return (
    <Hidden hidden={!visible}>
      <Field.Root id={id} invalid={!isValid} required={required}>
        <Field.Label>{label}</Field.Label>
        <ChakraToggle
          id={`${id}-input`}
          isValid={isValid}
          data={data}
          enabled={enabled}
          visible={visible}
          path={path}
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

export const booleanToggleControlTester: RankedTester = rankWith(
  3,
  and(isBooleanControl, optionIs('toggle', true))
);

export default withJsonFormsControlProps(BooleanToggleControl);
