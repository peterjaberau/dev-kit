"use client"

import React from 'react';

import { Avatar, Float } from '@chakra-ui/react';
import { Tooltip } from '../components/ui/tooltip';
import { PiWarningCircle } from 'react-icons/pi';

export interface ValidationProps {
  errorMessages: string;
  id: string;
}

const ValidationIcon: React.FC<ValidationProps> = ({ errorMessages, id }) => {
  const errorCount = errorMessages && errorMessages.split('\n').length;
  return (
    !!errorCount && (
      <Tooltip id={id} content={errorMessages}>
        <Avatar.Root>
          <Avatar.Icon>
            <PiWarningCircle />
          </Avatar.Icon>
          <Float placement='bottom-end' offsetX='1' offsetY='1'>
            {errorCount}
          </Float>
        </Avatar.Root>
      </Tooltip>
    )
  );
};

export default ValidationIcon;
