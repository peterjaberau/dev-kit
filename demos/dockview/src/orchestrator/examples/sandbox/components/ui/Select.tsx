'use client'
import React from 'react';
import { chakra } from "@chakra-ui/react"
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
  style?: any
  css?: any
}

export function Select({ value, onChange, options, placeholder = 'Select...', className = '', style=undefined, css = undefined }: SelectProps) {
  const groupedOptions = options.reduce((acc, option) => {
    const group = option.group || 'default';
    if (!acc[group]) acc[group] = [];
    acc[group].push(option);
    return acc;
  }, {} as Record<string, typeof options>);

  return (
    <chakra.select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      css={{
        paddingX: 3,
        paddingY: 1.5,
        fontSize: 'sm',
        backgroundColor: 'white',
        border: '1px solid',
        borderColor: 'gray.300',
        borderRadius: 'md',
        _hover: {
          borderColor: 'gray.400',
        },
        _focus: {
          borderColor: 'blue.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
        },
        transitionProperty: 'colors',
        ...css
      }}
      style={style}
    >
      <option value="">{placeholder}</option>
      {Object.entries(groupedOptions).map(([group, groupOptions]) => (
        <optgroup key={group} label={group === 'default' ? undefined : group}>
          {groupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </optgroup>
      ))}
    </chakra.select>
  );
}
