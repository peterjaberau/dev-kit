import { Flex, Icon } from '@chakra-ui/react';
import { LuChevronRight, LuChevronDown } from 'react-icons/lu'
import * as React from 'react';

export const Caret = ({ isExpanded }: any) => (
  <Flex data-id='shared-caret' pl={3} w={8} ml={-8} color="fg.muted" role="button" justifyContent="center">
    <Icon size={'xs'}>
      {isExpanded ? <LuChevronDown /> : <LuChevronRight />}
    </Icon>
  </Flex>
);
