
import React from 'react';
import { CellProps, WithClassname } from '#jSchemaBuilder/core';
import { Checkbox } from '@chakra-ui/react';

export const ChakraCheckbox = React.memo(
  (props: CellProps & WithClassname & { label: string }) => {
    const { data, className, enabled, path, handleChange, label } = props;
    const checked = !!data;

    return (
      <Checkbox.Root
        checked={checked}
        onCheckedChange={(ev) => handleChange(path, ev.checked)}
        className={className}
        disabled={!enabled}
        // autoFocus={!!appliedUiSchemaOptions.focus}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label fontSize='md' fontWeight='medium'>
          {label}
        </Checkbox.Label>
      </Checkbox.Root>
    );
  }
);
