"use client"

import React, { useMemo } from 'react';
import { EnumCellProps, WithClassname } from '#jSchemaBuilder/core';

import { Select } from 'antd';
import merge from 'lodash/merge';
import { i18nDefaults } from '../util';
import { TranslateProps } from '#jSchemaBuilder/react';

const { Option } = Select;
export const AntdSelect = (
  props: EnumCellProps &
    WithClassname &
    TranslateProps & { inputProps?: React.ComponentProps<typeof Select> }
) => {
  const {
    data,
    className,
    id,
    enabled,
    schema,
    uischema,
    path,
    handleChange,
    options,
    config,
    inputProps,
    t,
  }: any = props;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const noneOptionLabel = useMemo(
    () => t('enum.none', i18nDefaults['enum.none'], { schema, uischema, path }),
    [t, schema, uischema, path]
  );

  const selectStyle = appliedUiSchemaOptions.trim ? {} : { width: '100%' };

  return (
    <Select
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      value={data !== undefined ? data : ''}
      onChange={(value) => handleChange(path, value || undefined)}
      style={selectStyle}
      placeholder={appliedUiSchemaOptions.placeholder}
      allowClear={enabled}
      {...inputProps}
    >
      {[
        <Option value={''} key='jsonforms.enum.none'>
          <em>{noneOptionLabel}</em>
        </Option>,
      ].concat(
        options.map((optionValue: any) => (
          <Option value={optionValue.value} key={optionValue.value}>
            {optionValue.label}
          </Option>
        ))
      )}
    </Select>
  );
};
