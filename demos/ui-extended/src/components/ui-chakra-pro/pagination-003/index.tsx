import { Button, HStack, Span, Stack } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

const previous: PaginationItem = {
  href: '#',
  title: 'Getting Started',
  description: 'Start your journey with us.',
}

const next: PaginationItem = {
  href: '#',
  title: 'Installation',
  description: 'Install the package and get started.',
}

const Index = () => {
  return (
    <HStack justify="space-between" gap="4">
      <PaginationLink item={previous} direction="prev" />
      <PaginationLink item={next} direction="next" />
    </HStack>
  )
}

interface PaginationItem {
  href: string
  title: string
  description: string
}

interface PaginationLinkProps {
  item: PaginationItem
  direction: 'prev' | 'next'
}

const PaginationLink = (props: PaginationLinkProps) => {
  const { item, direction } = props

  const prev = direction === 'prev'
  const directionText = prev ? 'Previous' : 'Next'

  return (
    <Stack justify={prev ? 'flex-start' : 'flex-end'} gap="4">
      <Button asChild variant="subtle" colorPalette="gray" size="xs" fontWeight="medium">
        <a href={item.href}>
          {prev && <LuChevronLeft />}
          <Span textStyle="sm" fontWeight="medium">
            {directionText}
          </Span>
          {!prev && <LuChevronRight />}
        </a>
      </Button>
      <Span textStyle="sm" fontWeight="semibold" asChild tabIndex={-1}>
        <a href={item.href}>{item.title}</a>
      </Span>
    </Stack>
  )
}
export default Index
