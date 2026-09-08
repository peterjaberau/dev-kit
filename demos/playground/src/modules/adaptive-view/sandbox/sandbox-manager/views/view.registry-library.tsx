'use client';

import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { WrapperWithScrollArea } from "#plugins/registry-manager-plugin/components/wrapper-with-scroll-area"

import { useInstanceManager } from '../../instance-manager/selectors';

export function ViewRegistryLibrary() {
    const { instancesList } = useInstanceManager();

    return (
      <WrapperWithScrollArea>
        <Stack width="full"   gap="2" padding="2">
          {instancesList.map(({ id, name }) => (
            <Flex key={id} align="center" justify="space-between" gap="3">
              <Text truncate>{name}</Text>
              <Button size="xs" variant="outline" onClick={() => console.log({ id, name })}>
                Inspect
              </Button>
            </Flex>
          ))}
        </Stack>
      </WrapperWithScrollArea>
    )
}
