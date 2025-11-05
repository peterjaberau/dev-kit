"use client"

import { Box, Text } from '@chakra-ui/react';
import { Dictionary } from '@stoplight/types';
import * as React from 'react';

import { useJSVOptionsContext } from '../../context';

export interface IProperties {
  required: boolean;
  deprecated: boolean;
  validations: Dictionary<unknown>;
}

export const useHasProperties = ({ required, deprecated, validations: { readOnly, writeOnly } }: IProperties) => {
  const { viewMode } = useJSVOptionsContext();

  const showVisibilityValidations = viewMode === 'standalone' && !!readOnly !== !!writeOnly;

  return deprecated || showVisibilityValidations || required;
};

export const Properties: React.FunctionComponent<IProperties> = ({
  required,
  deprecated,
  validations: { readOnly, writeOnly },
}) => {
  const { viewMode } = useJSVOptionsContext();

  // Show readOnly writeOnly validations only in standalone mode and only if just one of them is present
  const showVisibilityValidations = viewMode === 'standalone' && !!readOnly !== !!writeOnly;
  const visibility = showVisibilityValidations ? (
    readOnly ? (
      <Text textStyle={'sm'} color={'fg.muted'}>
        read-only
      </Text>

    ) : (
      <Text textStyle={'sm'} color={'fg.muted'}>
        write-only
      </Text>

    )
  ) : null;

  return (
    <>
      {deprecated ? (
          <Text textStyle={'sm'} color={'fg.error'}>
            deprecated
          </Text>
      ) : null}
      {visibility}
      {required && (
        <Text textStyle={'sm'} color={'fg.error'}>
          required
        </Text>
      )}
    </>
  );
};
