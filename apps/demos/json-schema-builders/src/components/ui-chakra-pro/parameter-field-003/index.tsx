import { Badge, Container, Heading, Table, Text } from '@chakra-ui/react'
import { type DocsParameter, parameters } from './data'

const Index = () => {
  return (
    <Container maxW="5xl" py="8">
      <Heading as="h3" mb="6">
        Properties
      </Heading>
      <Table.Root rounded="lg" size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader minW="20ch">Prop</Table.ColumnHeader>
            <Table.ColumnHeader minW="10ch">Default</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {parameters.map((param) => (
            <ParameterRow key={param.name} item={param} />
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  )
}

interface ParameterRowProps {
  item: DocsParameter
}

const ParameterRow = ({ item }: ParameterRowProps) => {
  const { name, type, defaultValue = '-', description } = item

  return (
    <Table.Row>
      <Table.Cell verticalAlign="top" py="4">
        <Text fontFamily="mono" textStyle="xs" color="purple.fg">
          {name}
        </Text>
      </Table.Cell>
      <Table.Cell verticalAlign="top" py="4">
        <Text fontFamily="mono" textStyle="sm" color="fg.muted">
          {defaultValue}
        </Text>
      </Table.Cell>
      <Table.Cell verticalAlign="top" py="4">
        <Badge variant="subtle" size="sm" fontFamily="mono">
          {type}
        </Badge>
        <Text mt="2" textStyle="sm" color="fg.muted" lineHeight="relaxed">
          {description}
        </Text>
      </Table.Cell>
    </Table.Row>
  )
}
export default Index
