"use client"


import React from 'react';
import { CellProps, WithClassname } from '#jSchemaBuilder/core';
import { Switch } from '@chakra-ui/react';

export const ChakraToggle = React.memo((props: CellProps & WithClassname) => {
  const { data, className, enabled, path, handleChange } = props;
  const checked = !!data;

  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={(ev) => handleChange(path, ev.checked)}
      className={className}
      disabled={!enabled}
      // autoFocus={!!appliedUiSchemaOptions.focus}
    >
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label />
    </Switch.Root>
  );
});
