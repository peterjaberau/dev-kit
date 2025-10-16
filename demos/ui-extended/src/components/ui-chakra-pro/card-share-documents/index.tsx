'use client'

import {
  Avatar,
  Box,
  Card,
  createListCollection,
  IconButton,
  Input,
  Portal,
  Select,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import { LuCheck, LuCopy } from 'react-icons/lu'

const Index = () => {
  return (
    <Card.Root variant="elevated" boxShadow="lg">
      <Card.Header>
        <Card.Title>Share Document</Card.Title>
        <Card.Description>
          Share this document with your team members and collaborate in real-time.
        </Card.Description>
      </Card.Header>
      <Card.Body gap="4">
        <Stack gap="3" direction="row">
          <Input
            defaultValue="hhttps://pro.chakra-ui.com/"
            readOnly
            placeholder="Link to document"
          />
          <CopyButton url="https://pro.chakra-ui.com/" />
        </Stack>
        <Separator />
        <Text textStyle="sm" fontWeight="medium">
          Members with access
        </Text>
        {members.map((member) => (
          <Member key={member.name} {...member} />
        ))}
      </Card.Body>
    </Card.Root>
  )
}

const members = [
  {
    name: 'Segun Adebayo',
    avatar: 'https://avatars.githubusercontent.com/u/6916170?v=4',
    email: 'segun@chakra-ui.com',
  },
  {
    name: 'Christian Schröter',
    avatar: 'https://avatars.githubusercontent.com/u/1846056?v=4',
    email: 'chris@chakra-ui.com',
  },
  {
    name: 'Philipp Körner',
    avatar: 'https://avatars.githubusercontent.com/u/153984143?v=4',
    email: 'phil@chakra-ui.com',
  },
]

type Props = {
  name: string
  avatar: string
  email: string
}

const Member = (props: Props) => {
  const { name, avatar, email } = props
  return (
    <Stack direction="row" gap="8" justify="space-between" align="center">
      <Stack direction="row" gap="3">
        <Avatar.Root>
          <Avatar.Fallback name={name} />
          <Avatar.Image src={avatar} />
        </Avatar.Root>
        <Box>
          <Text textStyle="sm" fontWeight="medium">
            {name}
          </Text>
          <Text textStyle="sm" color="fg.muted">
            {email}
          </Text>
        </Box>
      </Stack>
      <PermissionSelect defaultValue={['Read']} width="20" />
    </Stack>
  )
}

const PermissionSelect = (props: Omit<Select.RootProps, 'collection'>) => {
  const collection = createListCollection({ items: ['Write', 'Read'] })
  return (
    <Select.Root collection={collection} size="sm" {...props}>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Permission" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item item={item} key={item}>
                {item}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

type CopyButtonProps = {
  url: string
}

const CopyButton = (props: CopyButtonProps) => {
  const { url } = props
  const [_, copy] = useCopyToClipboard()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (visible) return
    const timer = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [visible])

  const handleClick = () => {
    copy(url)
    setVisible(false)
  }

  return (
    <IconButton
      variant="outline"
      colorPalette="gray"
      aria-label="Copy code to clipboard"
      onClick={handleClick}
    >
      {visible ? <LuCopy /> : <LuCheck />}
    </IconButton>
  )
}
export default Index
