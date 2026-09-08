'use client';

import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useInstanceManager } from '../../instance-manager/selectors';

export function ViewInstances() {
    const { instanceRefs } = useInstanceManager();

    return (
        <Stack width="full" height="full" overflowY="auto" gap="2" padding="2">
            {Object.entries(instanceRefs).map(([id, actorRef]) => (
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
