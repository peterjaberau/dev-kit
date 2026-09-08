'use client';

import {
    Badge,
    Box,
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
import { type MouseEvent, useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import {
    useLayoutManager,
    useSandboxLayout,
} from '../../layout-manager/selectors';

const categories = ['All'] as const;

export function ViewLayoutPanels() {
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
                        <LayoutPanelCard
                            key={panel.id}
                            id={panel.id}
                            name={panel.name}
                        />
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

interface LayoutPanelCardProps {
    id: string;
    name: string;
}

function LayoutPanelCard({ id, name }: LayoutPanelCardProps) {
    const { selectedPanelId, sentToSandboxLayout } = useSandboxLayout();
    const selected = selectedPanelId === id;

    const handleSelect = (event: MouseEvent<HTMLButtonElement>) => {
        sentToSandboxLayout?.({
            type: 'ON_SELECT_PANEL',
            panelId: event.currentTarget.value,
        });
    };

    return (
        <Card.Root size="sm" variant={selected ? 'elevated' : 'outline'}>
            <Card.Body>
                <HStack gap="4">
                    <Box flex="1">
                        <HStack gap="2">
                            <Card.Title textStyle="sm">{name}</Card.Title>
                            <Badge size="sm" variant="outline">
                                {id}
                            </Badge>
                        </HStack>
                    </Box>
                    <Button
                        type="button"
                        value={id}
                        onClick={handleSelect}
                        size="sm"
                        variant={selected ? 'solid' : 'outline'}
                        colorPalette={selected ? 'blue' : 'gray'}
                        bg={selected ? undefined : 'bg'}
                        aria-pressed={selected}
                    >
                        {selected ? 'Selected' : 'Select'}
                    </Button>
                </HStack>
            </Card.Body>
        </Card.Root>
    );
}
