'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import NextLink from 'next/link';
import {
  Accordion,
  Box,
  Button as ChakraButton,
  createListCollection,
  Field as ChakraField,
  HStack,
  IconButton,
  Input as ChakraInput,
  NumberInput as ChakraNumberInput,
  Portal,
  Select,
  Span,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { RiGithubFill, RiMoonLine, RiSunLine } from 'react-icons/ri';
import {
  ACCENTS,
  DEFAULT_ACCENT,
  STORAGE_KEY as ACCENT_STORAGE_KEY,
  isAccentId,
} from '../../content/accents';

export type SelectOption = { value: string; label: string };

export function InspectorButton({
  active,
  tone,
  variant,
  size,
  ...props
}: Omit<React.ComponentProps<typeof ChakraButton>, 'variant' | 'size'> & {
  active?: boolean;
  tone?: 'default' | 'danger';
  variant?: 'default' | 'primary' | 'secondary' | 'strong' | 'subtle';
  size?: 'default' | 'compact' | 'hero';
}) {
  return (
    <ChakraButton
      size={size === 'hero' ? 'md' : size === 'default' ? 'sm' : 'xs'}
      variant={active || variant === 'primary' || variant === 'strong' ? 'solid' : 'outline'}
      colorPalette={tone === 'danger' ? 'red' : active ? 'blue' : 'gray'}
      {...props}
    />
  );
}

export function InspectorButtonGroup({ children }: { children: ReactNode }) {
  return (
    <HStack gap="2" flexWrap="wrap">
      {children}
    </HStack>
  );
}

export function InspectorField({
  label,
  hint,
  control,
}: {
  label: string;
  hint?: string;
  control: ReactNode;
}) {
  return (
    <ChakraField.Root orientation="horizontal">
      <ChakraField.Label
        color="fg.muted"
        textStyle="xs"
        fontWeight="normal"
        minWidth="var(--field-label-width)">
        <Box minW="0">
        <Text fontSize="xs">{label}</Text>
        {hint ? (
          <Text fontSize="xs" color="fg.muted">
            {hint}
          </Text>
        ) : null}
        </Box>
      </ChakraField.Label>
      <Box flex="1" minW="0">{control}</Box>
    </ChakraField.Root>
  );
}

export function InspectorSelect({
  value,
  onChange,
  options,
  disabled,
  ariaLabel,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  ariaLabel?: string;
  placeholder?: string;
}) {
  const collection = useMemo(
    () => createListCollection({ items: options }),
    [options],
  );

  return (
    <Select.Root
      collection={collection}
      size="xs"
      width="full"
      value={value ? [value] : []}
      disabled={disabled}
      onValueChange={(event) => onChange(event.value[0] ?? '')}>
      <Select.HiddenSelect aria-label={ariaLabel} />
      <Select.Control>
        <Select.Trigger minHeight="6">
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((option) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

export function InspectorNumberInput({
  value,
  onChange,
  placeholder,
  disabled,
  min = 0,
  max,
  ariaLabel,
}: {
  value: number | '';
  onChange: (value: number | null) => void;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  ariaLabel?: string;
}) {
  return (
    <ChakraNumberInput.Root
      size="xs"
      width="full"
      value={value === '' ? '' : String(value)}
      disabled={disabled}
      min={min}
      max={max}
      onValueChange={({ value: next }) => {
        if (next === '') onChange(null);
        else {
          const parsed = Number(next);
          if (!Number.isNaN(parsed)) onChange(parsed);
        }
      }}>
      <ChakraNumberInput.Control />
      <ChakraNumberInput.Input
        aria-label={ariaLabel}
        placeholder={placeholder}
      />
    </ChakraNumberInput.Root>
  );
}

export function InspectorSwitch({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <Switch.Root
      size="sm"
      checked={checked}
      disabled={disabled}
      onCheckedChange={({ checked: next }) => onChange(next)}>
      <Switch.HiddenInput />
      <Switch.Control />
    </Switch.Root>
  );
}

export function InspectorAccordion({
  children,
  defaultOpen = [],
}: {
  children: ReactNode;
  defaultOpen?: string[];
}) {
  return (
    <Accordion.Root
      multiple
      defaultValue={defaultOpen}
      variant="plain">
      {children}
    </Accordion.Root>
  );
}

export function InspectorAccordionItem({
  value,
  title,
  children,
}: {
  value: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Accordion.Item value={value} borderBottomWidth="1px" borderColor="border.muted">
      <Accordion.ItemTrigger px="4" py="4">
        <Span flex="1" textAlign="start" textStyle="xs" fontWeight="medium">
          {title}
        </Span>
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody px="4" pt="0" pb="4">
          <Stack gap="2" css={{ '--field-label-width': '76px' }}>
            {children}
          </Stack>
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}

export function InspectorInput(
  props: React.ComponentProps<typeof ChakraInput>,
) {
  return <ChakraInput size="xs" width="32" {...props} />;
}

export function InspectorAppearanceFooter() {
  const [currentAccent, setCurrentAccent] = useState(DEFAULT_ACCENT);

  useEffect(() => {
    const stored = document.documentElement.dataset.accent;
    if (isAccentId(stored)) setCurrentAccent(stored);
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try {
      localStorage.setItem('view-theme', next);
    } catch {}
  }

  return (
    <HStack
      flexShrink="0"
      justify="space-between"
      gap="2"
      px="3"
      py="2"
      borderTopWidth="1px">
      <HStack gap="1">
        <IconButton size="xs" variant="ghost" aria-label="GitHub repository" asChild>
          <NextLink
            href="https://github.com/yangshun/view"
            target="_blank"
            rel="noopener noreferrer">
            <RiGithubFill />
          </NextLink>
        </IconButton>
        <IconButton
          size="xs"
          variant="ghost"
          aria-label="Toggle color theme"
          onClick={toggleTheme}>
          <Box _light={{ display: 'none' }}>
            <RiSunLine />
          </Box>
          <Box display="none" _light={{ display: 'block' }}>
            <RiMoonLine />
          </Box>
        </IconButton>
      </HStack>
      <Select.Root
        collection={ACCENT_COLLECTION}
        size="xs"
        width="28"
        value={[currentAccent]}
        onValueChange={(event) => {
            const next = event.value[0];
            if (!isAccentId(next)) return;
            document.documentElement.dataset.accent = next;
            setCurrentAccent(next);
            try {
              localStorage.setItem(ACCENT_STORAGE_KEY, next);
            } catch {}
          }}>
        <Select.HiddenSelect aria-label="Accent color" />
        <Select.Control>
          <Select.Trigger minHeight="6">
            <Select.ValueText />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {ACCENT_COLLECTION.items.map((accent) => (
                <Select.Item item={accent} key={accent.value}>
                  {accent.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </HStack>
  );
}

const ACCENT_COLLECTION = createListCollection({
  items: ACCENTS.map((accent) => ({
    label: accent.label,
    value: accent.id,
  })),
});
