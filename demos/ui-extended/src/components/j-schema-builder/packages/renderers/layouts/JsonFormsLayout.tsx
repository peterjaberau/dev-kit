'use client'
import React from 'react';
import { RendererProps } from '#jSchemaBuilder/core';
import { VanillaRendererProps, WithChildren } from '../index';
import { Stack } from '@chakra-ui/react'

export const JsonFormsLayout = ({
  className,
  children,
  visible,
}: RendererProps & VanillaRendererProps & WithChildren | any) => {


  return (
    <Stack
      alignItems={'center'}
      w={'full'}
      flex={1}
      // className={className}
      hidden={visible === undefined || visible === null ? false : !visible}
    >
      {children}
    </Stack>
  );
};
