"use client"
import React from "react"
import {
  SimpleGrid,
  GridItem,
  Field,
  HStack,
  Input as ChakraInput,
  IconButton,
  Menu,
  Button as ChakraButton,
  createListCollection,
  Select as ChakraSelect,
  Collapsible as ChakraCollapsible,
  Portal,
  Text,
} from "@chakra-ui/react"
import { ChevronDown, ChevronUp, ListPlus } from "lucide-react" // Import ListPlus icon
import { toTitleCase } from "@/lib/utils"
import { SchemaField, SchemaFieldType } from "./FieldEditor"
import { REGEX_URL, REGEX_EMAIL, REGEX_IPV4, REGEX_IPV6 } from "@/lib/regexes" // Import regex constants

interface FieldAdvancedOptionsProps {
  field: SchemaField
  onFieldChange: (field: SchemaField) => void
}

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD - United States Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "JPY", label: "JPY - Japanese Yen" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "AUD", label: "A$ - Australian Dollar" },
  { value: "CHF", label: "CHF - Swiss Franc" },
  { value: "CNY", label: "CNY - Chinese Yuan" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "BRL", label: "BRL - Brazilian Real" },
]

const currencyOptionsCollection = createListCollection({
  items: CURRENCY_OPTIONS,
})

const regexOptionsCollection = createListCollection({
  items: [
    { value: REGEX_URL, label: "URL" },
    { value: REGEX_EMAIL, label: "Email" },
    { value: REGEX_IPV4, label: "IPv4" },
    { value: REGEX_IPV6, label: "IPv6" },
  ],
})

const FieldAdvancedOptions: React.FC<FieldAdvancedOptionsProps> = React.memo(({ field, onFieldChange }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange({ ...field, title: e.target.value })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange({ ...field, description: e.target.value })
  }

  const handleExampleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange({ ...field, example: e.target.value })
  }

  const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : parseFloat(e.target.value)
    onFieldChange({ ...field, minValue: value })
  }

  const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : parseFloat(e.target.value)
    onFieldChange({ ...field, maxValue: value })
  }

  const handleMinItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : parseInt(e.target.value, 10)
    onFieldChange({ ...field, minItems: value })
  }

  const handleMaxItemsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : parseInt(e.target.value, 10)
    onFieldChange({ ...field, maxItems: value })
  }

  const handleCurrencyChange = (e: any) => {
    if (e?.value?.length > 0) {
      const value = e?.value[0]
      onFieldChange({ ...field, currency: value })
    }
  }

  const handlePatternChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange({ ...field, pattern: e.target.value })
  }

  const handleMinLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : parseInt(e.target.value, 10)
    onFieldChange({ ...field, minLength: value })
  }

  const handleMaxLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? undefined : parseInt(e.target.value, 10)
    onFieldChange({ ...field, maxLength: value })
  }

  const handleSelectPredefinedPattern = (pattern: RegExp, name: string) => {
    onFieldChange({ ...field, pattern: pattern.source })
    // Optionally show a toast message
    // showSuccess(`Pattern for ${name} applied!`);
  }

  const isNumberLikeType = field.type === "int" || field.type === "float" || field.type === "currency"

  return (
    <ChakraCollapsible.Root open={isAdvancedOpen} onOpenChange={() => setIsAdvancedOpen(!isAdvancedOpen)} w={"full"}>
      <ChakraCollapsible.Trigger asChild>
        <ChakraButton variant="ghost">
          {isAdvancedOpen ? <ChevronUp /> : <ChevronDown />}
          Advanced options
        </ChakraButton>
      </ChakraCollapsible.Trigger>
      <ChakraCollapsible.Content p={6} borderWidth={isAdvancedOpen ? 1 : 0}>
        <SimpleGrid columns={2} gap={6}>
          <Field.Root>
            <Field.Label>Title (Optional)</Field.Label>
            <ChakraInput
              id={`field-title-${field.id}`}
              value={field.title || ""}
              onChange={handleTitleChange}
              placeholder={field.name ? toTitleCase(field.name) : "e.g., Product Name"}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Description (Optional)</Field.Label>
            <ChakraInput
              id={`field-description-${field.id}`}
              value={field.description || ""}
              onChange={handleDescriptionChange}
              placeholder="e.g., Name of the product"
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Example Value (Optional)</Field.Label>
            <ChakraInput
              id={`field-example-${field.id}`}
              value={field.example || ""}
              onChange={handleExampleChange}
              placeholder="e.g., 'Laptop', 123, '2023-10-26'"
            />
          </Field.Root>

          {isNumberLikeType && (
            <>
              <Field.Root>
                <Field.Label>Min Value (Optional)</Field.Label>
                <ChakraInput
                  id={`field-min-value-${field.id}`}
                  type="number"
                  value={field.minValue === undefined ? "" : field.minValue}
                  onChange={handleMinValueChange}
                  placeholder="e.g., 0"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Max Value (Optional)</Field.Label>
                <ChakraInput
                  id={`field-max-value-${field.id}`}
                  type="number"
                  value={field.maxValue === undefined ? "" : field.maxValue}
                  onChange={handleMaxValueChange}
                  placeholder="e.g., 100"
                />
              </Field.Root>
            </>
          )}

          {field.isMultiple && (
            <>
              <Field.Root>
                <Field.Label>Min Items (Optional)</Field.Label>
                <ChakraInput
                  id={`field-min-items-${field.id}`}
                  type="number"
                  value={field.minItems === undefined ? "" : field.minItems}
                  onChange={handleMinItemsChange}
                  placeholder="e.g., 1"
                  min="0"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Max Items (Optional)</Field.Label>
                <ChakraInput
                  id={`field-max-items-${field.id}`}
                  type="number"
                  value={field.maxItems === undefined ? "" : field.maxItems}
                  onChange={handleMaxItemsChange}
                  placeholder="e.g., 10"
                  min="0"
                />
              </Field.Root>
            </>
          )}

          {field.type === "currency" && (
            <GridItem colSpan={2}>
              <ChakraSelect.Root
                collection={currencyOptionsCollection}
                // @ts-ignore
                value={[field.currency] || []}
                onValueChange={handleCurrencyChange}
              >
                <ChakraSelect.HiddenSelect />
                <ChakraSelect.Label>Currency (Optional)</ChakraSelect.Label>

                <ChakraSelect.Control>
                  <ChakraSelect.Trigger>
                    <ChakraSelect.ValueText placeholder="Select currency" />
                  </ChakraSelect.Trigger>
                  <ChakraSelect.IndicatorGroup>
                    <ChakraSelect.Indicator />
                  </ChakraSelect.IndicatorGroup>
                </ChakraSelect.Control>
                <Portal>
                  <ChakraSelect.Positioner>
                    <ChakraSelect.Content>
                      {currencyOptionsCollection.items.map((currencyOptionItem) => (
                        <ChakraSelect.Item item={currencyOptionItem} key={currencyOptionItem.value}>
                          {currencyOptionItem.label}
                          <ChakraSelect.ItemIndicator />
                        </ChakraSelect.Item>
                      ))}
                    </ChakraSelect.Content>
                  </ChakraSelect.Positioner>
                </Portal>
              </ChakraSelect.Root>
            </GridItem>
          )}

          {field.type === "string" && (
            <>
              <GridItem colSpan={2}>
                <HStack gap={2}>
                  <Field.Root
                    css={{
                      flex: 1,
                    }}
                  >
                    <Field.Label>Pattern (Regex, Optional)</Field.Label>
                    <HStack alignItems="center" gap={2} w={"full"}>
                      <ChakraInput
                        id={`field-pattern-${field.id}`}
                        value={field.pattern || ""}
                        onChange={handlePatternChange}
                        placeholder="e.g., ^[A-Z]{2}\\d{4}$"
                      />
                      <Menu.Root positioning={{ placement: "bottom" }}>
                        <Menu.Trigger asChild>
                          <IconButton variant="outline" size="sm" aria-label="Select predefined pattern">
                            <ListPlus />
                          </IconButton>
                        </Menu.Trigger>
                        <Portal>
                          <Menu.Positioner>
                            <Menu.Content>
                              <Menu.Item value="URL" onSelect={() => handleSelectPredefinedPattern(REGEX_URL, "URL")}>
                                URL
                              </Menu.Item>
                              <Menu.Item
                                value="Email"
                                onSelect={() => handleSelectPredefinedPattern(REGEX_EMAIL, "Email")}
                              >
                                Email
                              </Menu.Item>
                              <Menu.Item
                                value="IPv4"
                                onSelect={() => handleSelectPredefinedPattern(REGEX_IPV4, "IPv4")}
                              >
                                IPv4
                              </Menu.Item>
                              <Menu.Item
                                value="IPv6"
                                onSelect={() => handleSelectPredefinedPattern(REGEX_IPV6, "IPv6")}
                              >
                                IPv6
                              </Menu.Item>
                            </Menu.Content>
                          </Menu.Positioner>
                        </Portal>
                      </Menu.Root>
                    </HStack>
                    <Field.HelperText>Regular expression to validate string format</Field.HelperText>
                  </Field.Root>
                </HStack>
              </GridItem>

              <Field.Root>
                <Field.Label>Min Length (Optional)</Field.Label>
                <ChakraInput
                  id={`field-min-length-${field.id}`}
                  type="number"
                  value={field.minLength === undefined ? "" : field.minLength}
                  onChange={handleMinLengthChange}
                  placeholder="e.g., 5"
                  min="0"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Max Length (Optional)</Field.Label>
                <ChakraInput
                  id={`field-max-length-${field.id}`}
                  type="number"
                  value={field.maxLength === undefined ? "" : field.maxLength}
                  onChange={handleMaxLengthChange}
                  placeholder="e.g., 255"
                  min="0"
                />
              </Field.Root>
            </>
          )}
        </SimpleGrid>
      </ChakraCollapsible.Content>
    </ChakraCollapsible.Root>
  )
})

FieldAdvancedOptions.displayName = "FieldAdvancedOptions"

export default FieldAdvancedOptions
