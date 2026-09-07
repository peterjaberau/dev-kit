'use client';

import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useInstanceManager } from '../../instance-manager/selectors';

export function ViewInstances() {
    const { instanceChildren } = useInstanceManager();

    return (
        <Stack width="full" height="full" overflowY="auto" gap="2" padding="2">
            {Object.entries(instanceChildren).map(([id, actorRef]) => (
                <Flex
                    key={id}
                    align="center"
                    justify="space-between"
                    gap="3"
                >
                    <Text truncate>{id}</Text>
                    <Button
                        size="xs"
                        variant="outline"
                        onClick={() => console.log(actorRef?.getSnapshot())}
                    >
                        Inspect
                    </Button>
                </Flex>
            ))}
        </Stack>
    );
}
