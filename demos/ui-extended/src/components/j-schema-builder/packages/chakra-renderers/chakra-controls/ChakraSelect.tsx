
import React, { useMemo } from 'react';
import { EnumCellProps, WithClassname } from '#jSchemaBuilder/core';

import { NativeSelect } from '@chakra-ui/react';
import merge from 'lodash/merge';
import { i18nDefaults } from '../util';
import { TranslateProps } from '#jSchemaBuilder/react';

export const ChakraSelect = (
  props: EnumCellProps & WithClassname & TranslateProps
) => {
  const {
    data,
    className,
    id,
    enabled,
    schema,
    t,
    uischema,
    path,
    handleChange,
    options = [],
    config,
  } = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const selectStyle = appliedUiSchemaOptions.trim ? {} : { width: '100%' };
  const noneOptionLabel = useMemo(
    () => t('enum.none', i18nDefaults['enum.none'], { schema, uischema, path }),
    [t, schema, uischema, path]
  );

  return (
    <>
      {/* <Select.Root
        className={className}
        id={id}
        disabled={!enabled}
        // autoFocus={appliedUiSchemaOptions.focus}
        value={data || ''}
        collection={options as any}
        onValueChange={(e) => handleChange(path, e.value)}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder='Select framework' />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {options.map((optionValue) => (
                <Select.Item item={optionValue} key={optionValue.value}>
                  {optionValue.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root> */}
      <NativeSelect.Root
        className={className}
        id={id}
        disabled={!enabled}
        // autoFocus={appliedUiSchemaOptions.focus}

        style={selectStyle}
      >
        <NativeSelect.Field
          value={data || ''}
          onChange={(ev) =>
            handleChange(
              path,
              ev.currentTarget.value == '0' ? undefined : ev.currentTarget.value
            )
          }
        >
          <option value={''} key={'jsonforms.enum.none'}>
            {noneOptionLabel}
          </option>
          ,
          {options.map((optionValue) => (
            <option value={optionValue.value} key={optionValue.value}>
              {optionValue.label}
            </option>
          ))}
        </NativeSelect.Field>
      </NativeSelect.Root>
    </>
  );
};
