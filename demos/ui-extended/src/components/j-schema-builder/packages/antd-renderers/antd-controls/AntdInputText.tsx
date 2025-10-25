"use client"

import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import { CellProps, WithClassname } from '#jSchemaBuilder/core';
import { AutoComplete, AutoCompleteProps, Input } from 'antd';
import { PasswordProps } from 'antd/es/input';
import every from 'lodash/every';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import merge from 'lodash/merge';
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDebouncedChange, useFocus } from '../util';

const eventToValue = (ev: any) => {
  if (ev.target) {
    return ev.target.value === '' ? undefined : ev.target.value;
  }
  return ev === '' ? undefined : ev;
};

type ElementType<T> = T extends (infer U)[] ? U : never;
type AutoCompleteOption = ElementType<AutoCompleteProps['options']>;

export const AntdInputText = React.memo(function AntdInputText(
  props: CellProps &
    WithClassname & {
      inputProps?: React.ComponentProps<
        | typeof Input
        | typeof Input.TextArea
        | typeof Input.Password
        | typeof AutoComplete
      >;
    }
) {
  const [pointed, setPointed] = useState(false);
  const [focused, onFocus, onBlur] = useFocus();

  const {
    data,
    config,
    className,
    id,
    enabled,
    uischema,
    path,
    handleChange,
    schema,
    inputProps,
  } = props;
  const maxLength = schema.maxLength;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  const [inputText, onChange, _onClear] = useDebouncedChange(
    handleChange,
    '',
    data,
    path,
    eventToValue
  );

  let InputComponent: React.ComponentType<any> = Input;

  const specificProps: Record<string, any> = {};

  const suggestions = appliedUiSchemaOptions?.suggestion;

  if (isArray(suggestions) && every(suggestions, isString)) {
    const options: AutoCompleteOption[] = (suggestions as string[]).map(
      (suggestion) => ({ value: suggestion })
    );
    InputComponent = AutoComplete;

    (specificProps as AutoCompleteProps).options = options;
    (specificProps as AutoCompleteProps).filterOption = true;
    (specificProps as AutoCompleteProps).popupMatchSelectWidth = true;
  }

  const inputStyle: CSSProperties =
    !appliedUiSchemaOptions.trim || maxLength === undefined
      ? { width: '100%' }
      : {};

  if (appliedUiSchemaOptions.multi) {
    inputStyle.resize = 'vertical';
    inputStyle.overflow = 'auto';
    InputComponent = Input.TextArea;

    specificProps.rows = 5;
    specificProps.autoSize = { minRows: 5, maxRows: 5 };
  }

  if (schema.format === 'password') {
    InputComponent = Input.Password;

    (specificProps as PasswordProps).visibilityToggle = true; // be able to display the password as plain text
  }

  const onMouseOver = useCallback(() => setPointed(true), []);
  const onMouseLeave = useCallback(() => setPointed(false), []);

  const inputRef: any = useRef(null);

  useEffect(() => {
    const inputWrapper: any =
      inputRef.current?.input?.parentElement ||
      inputRef.current?.textarea?.parentElement;

    if (inputWrapper) {
      inputWrapper.addEventListener('mouseover', onMouseOver);
      inputWrapper.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      if (inputWrapper) {
        inputWrapper.removeEventListener('mouseover', onMouseOver);
        inputWrapper.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [inputRef]);

  return (
    <InputComponent
      ref={inputRef}
      value={inputText}
      onChange={onChange}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      style={inputStyle}
      maxLength={maxLength}
      allowClear={{
        clearIcon:
          enabled && pointed && inputText ? <CloseCircleFilled /> : <></>,
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={appliedUiSchemaOptions.placeholder}
      count={
        maxLength !== undefined ? { max: maxLength, show: focused } : undefined
      }
      {...specificProps}
      {...inputProps}
    />
  );
});
