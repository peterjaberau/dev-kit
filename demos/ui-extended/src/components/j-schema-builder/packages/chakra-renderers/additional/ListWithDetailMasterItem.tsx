"use client"

import { StatePropsOfMasterItem } from '#jSchemaBuilder/core';
import { withJsonFormsMasterListItemProps } from '#jSchemaBuilder/react';
import React, { useMemo } from 'react';
import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import { Tooltip } from '../components/ui/tooltip';
import { LuTrash2 } from 'react-icons/lu';

const ListWithDetailMasterItem = ({
  index,
  childLabel,
  selected,
  handleSelect,
  removeItem,
  path,
  translations,
}: StatePropsOfMasterItem) => {
  const avatarStyle = useMemo(
    () => (selected ? { bgColor: 'blue.600' } : {}),
    [selected]
  );

  return (
    <Flex
      justifyContent='space-between'
      alignItems='center'
      key={index}
      onClick={handleSelect(index)}
      _active={{
        bgColor: 'gray.100',
      }}
      w='100%'
    >
      <Flex alignItems='center'>
        <Avatar.Root size={'sm'} bgColor='gray.200' me='2' {...avatarStyle}>
          <Avatar.Fallback>{`${index + 1}`}</Avatar.Fallback>
        </Avatar.Root>
        <Text>{childLabel}</Text>
      </Flex>
      <Tooltip content={translations.removeTooltip} key='action_1'>
        <IconButton
          onClick={removeItem(path, index)}
          aria-label={translations.removeAriaLabel || ''}
        >
          <LuTrash2 />
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default withJsonFormsMasterListItemProps(ListWithDetailMasterItem) as any;
