import { chakra } from '@chakra-ui/react'
import { Box, Flex, Stack, Text, Tooltip, UnstyledButton } from '@mantine/core'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'

const ChakraBox = chakra(Box) as any
const ChakraText = chakra(Text) as any
const ChakraUnstyledButton = chakra(UnstyledButton) as any

export function MetadataProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

interface MetadataValueProps {
  label: string
  value: string | string[]
}

function TruncatedValue({ value, isExpanded }: { value: string; isExpanded: boolean }) {
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth)
    }
  }, [value])

  return (
    <Tooltip
      label={isTruncated && !isExpanded ? value : null}
      multiline
      w={300}
      withinPortal
    >
      <ChakraText
        ref={textRef}
        component="div"
        css={{
          fontSize: 'sm',
          padding: 'xs',
          userSelect: 'all',
          color: 'text',
          lineHeight: 1.4,
          whiteSpace: isExpanded ? 'pre-wrap' : 'nowrap',
          overflow: isExpanded ? 'visible' : 'hidden',
          textOverflow: isExpanded ? 'unset' : 'ellipsis',
          wordBreak: isExpanded ? 'break-word' : 'normal',
          minWidth: 0,
          width: '100%',
        }}
      >
        {value}
      </ChakraText>
    </Tooltip>
  )
}

function MultiValueDisplay({
  values,
  isExpanded,
}: {
  values: string[]
  isExpanded: boolean
}) {
  if (isExpanded) {
    return (
      <Stack gap="xs">
        {values.map((value, index) => (
          <Flex key={index} align="center" gap="xs">
            <ChakraText
              css={{
                fontSize: 'xs',
                color: 'mantine.colors.gray[5]',
                fontWeight: 'medium',
                flexShrink: 0,
                _dark: {
                  color: 'mantine.colors.dark[3]',
                },
              }}
            >
              •
            </ChakraText>
            <ChakraBox
              css={{
                minHeight: '32px',
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <TruncatedValue value={value} isExpanded={true} />
            </ChakraBox>
          </Flex>
        ))}
      </Stack>
    )
  }

  return (
    <ChakraBox
      css={{
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        padding: 'xs',
        gap: 'xs',
        flexWrap: 'wrap',
        minWidth: 0, // Allow shrinking
        overflow: 'hidden', // Prevent overflow
      }}
    >
      {values.map((value, index) => (
        <Flex key={index} align="center" gap="xs" style={{ minWidth: 0 }}>
          <ChakraText
            css={{
              fontSize: 'sm',
              padding: '[4px 8px]',
              backgroundColor: 'white',
              color: 'text',
              borderRadius: 'sm',
              border: '1px solid',
              borderColor: 'mantine.colors.gray[3]',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 'min(200px, 100%)',
              minWidth: '60px',
              flex: '0 1 auto',
              userSelect: 'all',
              _dark: {
                backgroundColor: 'mantine.colors.dark[9]',
                borderColor: 'mantine.colors.dark[4]',
              },
            }}
            title={value}
          >
            {value}
          </ChakraText>
          {index < values.length - 1 && (
            <ChakraText
              css={{
                fontSize: 'xs',
                color: 'mantine.colors.gray[5]',
                fontWeight: 'medium',
                flexShrink: 0,
                _dark: {
                  color: 'mantine.colors.dark[3]',
                },
              }}
            >
              •
            </ChakraText>
          )}
        </Flex>
      ))}
    </ChakraBox>
  )
}

export function MetadataValue({ label, value }: MetadataValueProps) {
  const elements = Array.isArray(value)
    ? value
    : typeof value === 'string' && value.includes('\n')
    ? value.split('\n').map(s => s.trim()).filter(Boolean)
    : [value]

  const hasMultipleElements = elements.length > 1
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      {hasMultipleElements
        ? (
          <ChakraUnstyledButton
            onClick={handleToggle}
            css={{
              fontSize: 'xs',
              color: 'text.dimmed',
              justifySelf: 'end',
              textAlign: 'right',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 'xs',
              padding: '[4px 8px]',
              borderRadius: 'sm',
              whiteSpace: 'nowrap',
              transition: 'all 150ms ease',
              _hover: {
                backgroundColor: 'mantine.colors.gray[1]',
                color: 'mantine.colors.primary[6]',
                _dark: {
                  backgroundColor: 'mantine.colors.dark[7]',
                  color: 'mantine.colors.primary[4]',
                },
              },
            }}
          >
            <Flex align="center" gap="xs">
              <Text component="span" size="xs" fw={700}>
                {label}:
              </Text>
              <ChakraText
                component="span"
                css={{
                  fontSize: 'xs',
                  fontWeight: 'medium',
                  color: 'mantine.colors.gray[6]',
                  backgroundColor: 'mantine.colors.gray[1]',
                  padding: '[1px 4px]',
                  borderRadius: 'xs',
                  _dark: {
                    color: 'mantine.colors.dark[2]',
                    backgroundColor: 'mantine.colors.dark[6]',
                  },
                }}
              >
                {elements.length}
              </ChakraText>
              {isExpanded ? <IconChevronDown size={12} /> : <IconChevronRight size={12} />}
            </Flex>
          </ChakraUnstyledButton>
        )
        : (
          <ChakraText
            component="div"
            css={{
              fontSize: 'xs',
              color: 'text.dimmed',
              justifySelf: 'end',
              textAlign: 'right',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              padding: '[4px 8px]',
              fontWeight: '[700]',
            }}
          >
            {label}:
          </ChakraText>
        )}

      <ChakraBox
        css={{
          justifySelf: 'stretch',
          alignSelf: 'start',
        }}
      >
        {hasMultipleElements
          ? (
            <MultiValueDisplay
              values={elements}
              isExpanded={isExpanded}
            />
          )
          : (
            <ChakraBox
              css={{
                minHeight: '32px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TruncatedValue value={elements[0] || ''} isExpanded={isExpanded} />
            </ChakraBox>
          )}
      </ChakraBox>
    </>
  )
}
