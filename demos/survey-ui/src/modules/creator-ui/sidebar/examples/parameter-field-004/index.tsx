import { Accordion, Box, Code, Container, Flex, Heading, Span, Stack, Text } from '@chakra-ui/react'
import type React from 'react'
import { LuChevronDown } from 'react-icons/lu'
import { collapsibleParameterData as parameterData } from './data'

const Index = () => {
  return (
    <Container maxW="5xl" py="8">
      <Heading as="h3" mb="6">
        Properties
      </Heading>
      <Box borderWidth="1px" rounded="l2">
        <Flex
          bg="bg.subtle"
          borderBottomWidth="1px"
          px="4"
          py="3"
          fontWeight="medium"
          flex="1"
          textStyle="sm"
          roundedTop="l2"
        >
          <Span>Prop</Span>
          <Span flex="1">Type</Span>
        </Flex>

        <Accordion.Root multiple>
          {parameterData.map((param) => (
            <Accordion.Item key={param.prop} value={param.name} _last={{ borderBottomWidth: '0' }}>
              <Accordion.ItemTrigger colorPalette="gray" px="4" rounded="none">
                <Flex flex="1" align="center">
                  <Box fontFamily="mono" textStyle="xs" color="purple.fg">
                    {param.name}
                  </Box>
                </Flex>

                <Flex flex="1" align="center">
                  <Stack gap="1" flex="1">
                    <Box textStyle="xs" fontFamily="mono">
                      <Span color="colorPalette.fg">{param.type}</Span>
                      {param.defaultValue && (
                        <Span color="fg.muted">{` (default: ${param.defaultValue})`}</Span>
                      )}
                    </Box>
                  </Stack>

                  <Accordion.ItemIndicator>
                    <LuChevronDown />
                  </Accordion.ItemIndicator>
                </Flex>
              </Accordion.ItemTrigger>

              <Accordion.ItemContent rounded="none">
                <Accordion.ItemBody py="0" bg="bg.subtle">
                  <Box bg="bg.subtle" p="4" borderTopWidth="1px" w="full">
                    <Stack gap="3" textStyle="sm">
                      <PropertyField label="Name">
                        <Code flex="1" size="sm" variant="plain">
                          {param.name}
                        </Code>
                      </PropertyField>

                      <PropertyField label="Description">
                        <Text flex="1" color="fg.muted">
                          {param.description}
                        </Text>
                      </PropertyField>

                      <PropertyField label="Type">
                        <Code flex="1" size="sm" variant="plain" colorPalette="purple">
                          {param.type}
                        </Code>
                      </PropertyField>

                      {param.defaultValue && (
                        <PropertyField label="Default">
                          <Code alignSelf="flex-start" flex="1" variant="plain" size="sm">
                            {param.defaultValue}
                          </Code>
                        </PropertyField>
                      )}
                    </Stack>
                  </Box>
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Box>
    </Container>
  )
}

interface PropertyFieldProps {
  label: string
  children: React.ReactNode
}

const PropertyField = ({ label, children }: PropertyFieldProps) => {
  return (
    <Flex gap="2">
      <Span flex="1" textStyle="sm">
        {label}
      </Span>
      {children}
    </Flex>
  )
}

export default Index
