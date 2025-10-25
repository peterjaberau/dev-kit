
import React, { useState } from 'react';
import {
  ControlProps,
  isDescriptionHidden,
  OwnPropsOfEnum,
} from '#jSchemaBuilder/core';
import { RadioGroup, Field, HStack } from '@chakra-ui/react';
import type { VanillaRendererProps } from '../index';
import merge from 'lodash/merge';

export const RadioGroupInput = ({
  id,
  label,
  options,
  required,
  description,
  errors,
  uischema,
  visible,
  config,
  enabled,
  path,
  handleChange,
}: ControlProps & VanillaRendererProps & OwnPropsOfEnum) => {
  const [isFocused, setFocus] = useState(false);
  const isValid = errors.length === 0;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const showDescription = !isDescriptionHidden(
    visible,
    description,
    isFocused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );
  return (
    <Field.Root
      as='fieldset'
      invalid={!isValid}
      disabled={!enabled}
      required={required}
      hidden={!visible}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <Field.Label as='legend'>{label}</Field.Label>

      <RadioGroup.Root
        name={id}
        onValueChange={(e) => handleChange(path, e.value)}
      >
        <HStack gap='8px'>
          {options &&
            options.map((option) => (
              <RadioGroup.Item
                key={option.label}
                value={option.value}
                id={option.value}
                // checked={data === option.value}
              >
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
        </HStack>
      </RadioGroup.Root>
      <Field.HelperText>{showDescription ? description : ''}</Field.HelperText>
      <Field.ErrorText>{errors}</Field.ErrorText>
    </Field.Root>
  );
};
