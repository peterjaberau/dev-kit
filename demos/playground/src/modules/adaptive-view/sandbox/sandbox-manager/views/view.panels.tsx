'use client';

import {
    Badge,
    Button,
    Card,
    Container,
    HStack,
    Icon,
    Input,
    InputGroup,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { useLayoutManager } from '../../layout-manager/selectors';

const categories = ['All'] as const;

export function ViewPanels() {
    const { panelsList } = useLayoutManager();
    const [search, setSearch] = useState('');
    const normalizedSearch = search.toLowerCase();
    const filteredPanels = panelsList.filter((panel) =>
        panel.name.toLowerCase().includes(normalizedSearch)
    );

    return (
        <Container maxW="2xl" py="5">
            <Stack gap="6">
                <InputGroup flex="1" startElement={<LuSearch />}>
                    <Input
                        placeholder="Search panels..."
                        size="sm"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </InputGroup>

                <HStack gap="2" flexWrap="wrap">
                    {categories.map((category) => (
                        <Button key={category} size="xs" variant="solid">
                            {category}
                        </Button>
                    ))}
                </HStack>

                <Stack gap="3">
                    {filteredPanels.map((panel) => (
                        <Card.Root key={panel.id} size="sm" variant="outline">
                            <Card.Body>
                                <HStack gap="2">
                                    <Card.Title textStyle="sm">
                                        {panel.name}
                                    </Card.Title>
                                    <Badge size="sm" variant="outline">
                                        {panel.id}
                                    </Badge>
                                </HStack>
                            </Card.Body>
                        </Card.Root>
                    ))}
                </Stack>

                {filteredPanels.length === 0 && (
                    <Stack align="center" py="10" gap="2">
                        <Icon fontSize="2xl" color="fg.muted">
                            <LuSearch />
                        </Icon>
                        <Text color="fg.muted" textStyle="sm">
                            No panels found
                        </Text>
                    </Stack>
                )}
            </Stack>
        </Container>
    );
}
