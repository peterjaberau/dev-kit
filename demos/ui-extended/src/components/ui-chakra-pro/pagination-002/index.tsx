import { Box, Button, Flex, HStack, Separator, Span } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

const previous = {
  href: '#',
  title: 'Getting Started',
  description: 'Start your journey with us.',
}

const next = {
  href: '#',
  title: 'FAQs and Troubleshooting',
  description: 'Common questions and answers.',
}

const Index = () => {
  return (
    <Box w="full" maxW="4xl" mx="auto" p="6">
      <Flex as="nav" aria-label="Pagination" bg="bg.muted" rounded="lg" mx="-1" p="1">
        {/* Previous Link */}
        <Button asChild variant="ghost" gap="1" h="16" flexShrink="0" ps="3" pe="6">
          <a href={previous.href}>
            <PaginationDirection type="prev" />
          </a>
        </Button>

        {/* Next Link */}
        <Button
          asChild
          variant="outline"
          h="16"
          bg="bg"
          flex="1"
          flexShrink="1"
          justifyContent="end"
          gap="4"
          _hover={{
            borderColor: 'colorPalette.emphasized',
          }}
        >
          <a href={next.href}>
            <Box position="relative" minW="0" flexShrink="1" ps="4" textAlign="end" textStyle="sm">
              <Box truncate fontWeight="semibold">
                {next.title}
              </Box>
              <Box truncate fontWeight="normal">
                {next.description}
              </Box>
            </Box>
            <PaginationSeparator />
            <PaginationDirection type="next" />
          </a>
        </Button>
      </Flex>
    </Box>
  )
}

const PaginationDirection = ({ type }: { type: 'prev' | 'next' }) => {
  return (
    <HStack display="inline-flex" gap="1">
      {type === 'prev' && <LuChevronLeft size="24" color="fg.muted" />}
      <Span color="fg.muted" hideBelow="sm" textStyle="sm" fontWeight="medium">
        {type === 'next' ? 'Next' : 'Previous'}
      </Span>
      {type === 'next' && <LuChevronRight size="24" color="fg.muted" />}
    </HStack>
  )
}

const PaginationSeparator = () => (
  <Separator
    orientation="vertical"
    h="8"
    bg="border.muted"
    flexShrink="0"
    display={{ base: 'none', sm: 'block' }}
  />
)
export default Index
