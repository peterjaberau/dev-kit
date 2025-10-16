'use client'
import {
  Button,
  Card,
  createListCollection,
  Field,
  Icon,
  Input,
  Portal,
  RadioCard,
  Select,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import { LuCreditCard } from 'react-icons/lu'
import { SiApple, SiPaypal } from 'react-icons/si'

const months = createListCollection({
  items: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
})

const MonthSelect = () => {
  return (
    <Select.Root collection={months} width="320px">
      <Select.HiddenSelect />
      <Select.Label>Month</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Month" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {months.items.map((month) => (
              <Select.Item item={month} key={month}>
                {month}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const years = createListCollection({
  items: ['2023', '2024', '2025'],
})

const YearSelect = () => {
  return (
    <Select.Root collection={years} width="320px">
      <Select.HiddenSelect />
      <Select.Label>Year</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Year" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {years.items.map((year) => (
              <Select.Item item={year} key={year}>
                {year}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const paymentMethods = [
  { value: 'card', label: 'Card', icon: LuCreditCard },
  { value: 'paypal', label: 'Paypal', icon: SiPaypal },
  { value: 'apple', label: 'Apple', icon: SiApple },
]

const Index = () => {
  return (
    <Card.Root variant="elevated" boxShadow="lg">
      <Card.Header>
        <Card.Title>Payment Method</Card.Title>
        <Card.Description>
          Add a payment method to your account to start your subscription.
        </Card.Description>
      </Card.Header>
      <Card.Body gap="4">
        <RadioCard.Root defaultValue="card" orientation="vertical" align="center">
          <SimpleGrid columns={3} gap="4">
            {paymentMethods.map((option) => (
              <RadioCard.Item key={option.value} value={option.value}>
                <RadioCard.ItemHiddenInput />
                <RadioCard.ItemControl>
                  <Icon size="md">
                    <option.icon />
                  </Icon>
                  <RadioCard.ItemText>{option.label}</RadioCard.ItemText>
                </RadioCard.ItemControl>
              </RadioCard.Item>
            ))}
          </SimpleGrid>
        </RadioCard.Root>

        <Field.Root>
          <Field.Label>Owner</Field.Label>
          <Input />
        </Field.Root>
        <Field.Root>
          <Field.Label>Card Number</Field.Label>
          <Input />
        </Field.Root>

        <Stack direction="row" gap="3">
          <MonthSelect />
          <YearSelect />
          <Field.Root>
            <Field.Label>CVV</Field.Label>
            <Input />
          </Field.Root>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Button flex="1">Continue</Button>
      </Card.Footer>
    </Card.Root>
  )
}
export default Index
