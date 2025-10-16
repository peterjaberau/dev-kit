'use client'
import type { ButtonProps, DialogRootProps, IconButtonProps } from '@chakra-ui/react'
import {
  Button,
  Dialog,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Kbd,
  Portal,
  Span,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'

export const SearchDialog = (props: Omit<DialogRootProps, 'children'>) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Dialog.Root {...props}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p="4">
            <InputGroup startElement={<Icon as={LuSearch} />}>
              <Input
                rounded="xl"
                bg="bg.muted"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                _focus={{
                  bg: 'bg.subtle',
                }}
              />
            </InputGroup>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

interface SearchBarTriggerProps extends ButtonProps {
  hideKbd?: boolean
  placeholder?: string
}

export const SearchBarTrigger = (props: SearchBarTriggerProps) => {
  const { hideKbd, placeholder = 'Search...', ...rest } = props
  return (
    <Button
      w="full"
      px="2.5"
      textStyle="sm"
      variant="outline"
      colorPalette="gray"
      justifyContent="space-between"
      {...rest}
    >
      <HStack gap="3" fontWeight="normal">
        <Icon as={LuSearch} boxSize="4" color="fg.muted" />
        <Span color="fg.muted">{placeholder}</Span>
      </HStack>
      {!hideKbd && <CommandKbd />}
    </Button>
  )
}

const MAC_REGEX = /(Mac|iPhone|iPod|iPad)/i
const CommandKbd = () => {
  const [modKey, setModKey] = useState('')
  useEffect(() => {
    const isMac = MAC_REGEX.test(navigator?.platform)
    setModKey(isMac ? '⌘' : '^')
  }, [])
  return (
    <Kbd size="sm" variant="plain" colorPalette="gray" visibility={modKey ? 'visible' : 'hidden'}>
      {modKey} K
    </Kbd>
  )
}

export const SearchButtonTrigger = (props: IconButtonProps) => {
  return (
    <IconButton size="xs" variant="ghost" aria-label="Search" colorPalette="gray" {...props}>
      <LuSearch />
    </IconButton>
  )
}
