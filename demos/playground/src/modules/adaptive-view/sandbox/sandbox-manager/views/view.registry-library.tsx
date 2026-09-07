'use client';

import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useInstanceManager } from '../../instance-manager/selectors';

export function ViewRegistryLibrary() {
    const { metadata } = useInstanceManager();

    return (
        <Stack width="full" height="full" overflowY="auto" gap="2" padding="2">
            {metadata.registryNames.map((name) => (
                <Flex
                    key={name}
                    align="center"
                    justify="space-between"
                    gap="3"
                >
                    <Text truncate>{name}</Text>
                    <Button
                        size="xs"
                        variant="outline"
                        onClick={() => console.log(name)}
                    >
                        Inspect
                    </Button>
                </Flex>
            ))}
        </Stack>
    );
}
