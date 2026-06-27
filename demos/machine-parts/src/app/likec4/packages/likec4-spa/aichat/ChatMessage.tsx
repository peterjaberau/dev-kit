import { RichText } from '#likec4/core'
import { Markdown } from '#likec4/diagram/custom'
import { chakra, Text as Txt } from '@chakra-ui/react'
import { Notification } from '@mantine/core'
import {
  ChatMessage as TanstackChatMessage,
} from '@tanstack/ai-react-ui'
import { type TypedUIMessage, useChatContext } from './ChatContext'

const ChakraTanstackChatMessage = chakra(TanstackChatMessage) as any

export function ChatMessages() {
  const { messages, error } = useChatContext()
  return (
    <>
      {messages.map((message: TypedUIMessage) => <ChatMessage message={message} key={message.id} />)}
      {error && (
        <Notification
          styles={{
            icon: {
              alignSelf: 'flex-start',
            },
          }}
          color={'red'}
          title={'Oops, something went wrong'}
          withCloseButton={false}>
          <Txt
            fontSize={'sm'}
            fontFamily="mono"
            whiteSpace="pre"
            my="xs">
            {error.message}
            {error.stack && '\n' + error.stack}
          </Txt>
        </Notification>
      )}
    </>
  )
}

export const ChatMessage = ({ message }: { message: TypedUIMessage }) => {
  const role = message.role
  return (
    <ChakraTanstackChatMessage
      message={message}
      userClassName="likec4-ai-user-message"
      css={{
        '& .likec4-ai-user-message': {
          color: 'text.bright',
          alignSelf: 'flex-end',
          paddingInline: '2',
          paddingBlock: '1',
          marginInlineEnd: '2',
          rounded: 'sm',
          backgroundColor: 'default.hover',
          whiteSpace: 'pre-wrap',
        },
      }}
      textPartRenderer={role === 'user' ? UserMessageTextPart : MarkdownTextPart} />
  )
}

const UserMessageTextPart = ({ content }: { content: string }) => {
  return <>{content}</>
}

const MarkdownTextPart = ({ content }: { content: string }) => {
  return (
    <Markdown
      textScale={0.95}
      value={RichText.from({ md: content })}
    />
  )
}
