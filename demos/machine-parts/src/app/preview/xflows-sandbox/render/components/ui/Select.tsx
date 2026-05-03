import React from 'react';
import { chakra, NativeSelect } from '@chakra-ui/react'

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    group?: string;
  }>;
  placeholder?: string;
  className?: string;
  css?: any,
}

export function Select({ value, onChange, options, placeholder = 'Select...',css, className = '' }: SelectProps) {
  const groupedOptions = options.reduce((acc, option) => {
    const group = option.group || 'default';
    if (!acc[group]) acc[group] = [];
    acc[group].push(option);
    return acc;
  }, {} as Record<string, typeof options>);

  return (
    <NativeSelect.Root
      size={'sm'}
      css={{
        ...css,
      }}
      className={className}
    >
      <NativeSelect.Field placeholder={placeholder} value={value} onChange={(e) => onChange(e.currentTarget.value)}>
        {/*<option value="">{placeholder}</option>*/}
        {Object.entries(groupedOptions).map(([group, groupOptions]) => (
          <optgroup key={group} label={group === "default" ? undefined : group}>
            {groupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
      </NativeSelect.Field>
    </NativeSelect.Root>
  )
}
