'use client'
import React from "react";
import {
  Button as ChakraButton,
  IconButton,
  Flex,
  Text,
  Menu,
  Dialog,
  Collapsible as ChakraCollapsible,
  SimpleGrid,
  Field,
  HStack,
  Input as ChakraInput,
  Stack, Portal,
} from "@chakra-ui/react"
import { PlusCircle, Trash2, ChevronDown, ChevronUp, ListPlus, XCircle } from "lucide-react";
import { SchemaField } from "./FieldEditor";
import { showSuccess, showError } from "@/utils/toast"; // Ensure showError is imported if used
import { COUNTRIES_EN, PRIORITY_OPTIONS, CURRENCY_CODES, DAYS_OF_WEEK, MONTHS_OF_YEAR } from "@/utils/predefinedOptions";

interface FieldDropdownOptionsProps {
  field: SchemaField;
  onFieldChange: (field: SchemaField) => void;
}

const FieldDropdownOptions: React.FC<FieldDropdownOptionsProps> = React.memo(({
  field,
  onFieldChange,
}) => {
  const [isDropdownOptionsOpen, setIsDropdownOptionsOpen] = React.useState(true);
  const [newOption, setNewOption] = React.useState("");
  const [isClearConfirmOpen, setIsClearConfirmOpen] = React.useState(false); // New state for confirmation dialog

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      const updatedOptions = [...(field.options || []), newOption.trim()];
      onFieldChange({ ...field, options: updatedOptions });
      setNewOption("");
    }
  };

  const handleRemoveOption = (optionToRemove: string) => {
    const updatedOptions = (field.options || []).filter(
      (option) => option !== optionToRemove
    );
    onFieldChange({ ...field, options: updatedOptions });
  };

  const handleEditOption = (oldOption: string, newText: string) => {
    const updatedOptions = (field.options || []).map((option) =>
      option === oldOption ? newText.trim() : option
    );
    onFieldChange({ ...field, options: updatedOptions });
  };

  const handlePopulateOptions = (options: string[], collectionName: string) => {
    onFieldChange({ ...field, options: options });
    showSuccess(`Dropdown options populated with ${collectionName}!`);
  };

  const handleClearAllOptions = () => {
    onFieldChange({ ...field, options: [] });
    showSuccess("All dropdown options cleared!");
    setIsClearConfirmOpen(false);
  };

  return (
    <ChakraCollapsible.Root open={isDropdownOptionsOpen} onOpenChange={() => setIsDropdownOptionsOpen(!isDropdownOptionsOpen)} >
      <ChakraCollapsible.Trigger asChild>
        <ChakraButton variant="ghost">
          {isDropdownOptionsOpen ? <ChevronUp /> : <ChevronDown />}
          Options for {field.name || "Unnamed Dropdown"}:
        </ChakraButton>
      </ChakraCollapsible.Trigger>
      <ChakraCollapsible.Content p={6} borderWidth={isDropdownOptionsOpen ? 1: 0} >
        <SimpleGrid gap={6}>
          <Field.Root>
            <Field.Label>Dropdown Options</Field.Label>
            <HStack gap={4} w={'full'}>
              <ChakraInput
                id={`field-options-${field.id}`}
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add new option"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddOption();
                  }
                }}
              />

              <IconButton onClick={handleAddOption} variant="outline" size="sm">
                <PlusCircle />
              </IconButton>
              <Menu.Root positioning={{ placement: "bottom" }}>
                <Menu.Trigger asChild>
                  <IconButton variant="outline" size="sm" aria-label="Populate options from collection">
                    <ListPlus />
                  </IconButton>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>

                      <Menu.Item value={'Countries'} onSelect={() => handlePopulateOptions(COUNTRIES_EN, "Countries")}>
                        Populate with Countries
                      </Menu.Item>
                      <Menu.Item value={'Priority Levels'} onSelect={() => handlePopulateOptions(PRIORITY_OPTIONS, "Priority Levels")}>
                        Populate with Priority Levels
                      </Menu.Item>
                      <Menu.Item value={'Currency Codes'} onSelect={() => handlePopulateOptions(CURRENCY_CODES, "Currency Codes")}>
                        Populate with Currency Codes
                      </Menu.Item>
                      <Menu.Item value={'Days of the Week'} onSelect={() => handlePopulateOptions(DAYS_OF_WEEK, "Days of the Week")}>
                        Populate with Days of the Week
                      </Menu.Item>
                      <Menu.Item value={'Months of the Year'} onSelect={() => handlePopulateOptions(MONTHS_OF_YEAR, "Months of the Year")}>
                        Populate with Months of the Year
                      </Menu.Item>

                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
              <Dialog.Root open={isClearConfirmOpen} onOpenChange={() => setIsClearConfirmOpen(!isClearConfirmOpen)}>
                <Dialog.Trigger asChild>
                  <IconButton variant="solid" size="sm" colorPalette={'ref'} aria-label="Clear all options">
                    <XCircle />
                  </IconButton>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Are you absolutely sure?</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        This action cannot be undone. This will permanently delete all options for this dropdown field.
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                          <ChakraButton variant="outline">Cancel</ChakraButton>
                        </Dialog.ActionTrigger>
                        <ChakraButton variant="solid" colorPalette={"red"} onClick={handleClearAllOptions}>
                          Clear All
                        </ChakraButton>
                      </Dialog.Footer>


                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            </HStack>
          </Field.Root>


          {field.options && field.options.length > 0 ? (
            <Stack gap={2} >
              {field.options.map((option, index) => (
                <Flex key={index} alignItems={'center'} gap={4}>
                  <ChakraInput
                    value={option}
                    onChange={(e) => handleEditOption(option, e.target.value)}
                  />
                  <IconButton
                    variant="solid"
                    colorPalette={'red'}
                    size="sm"
                    onClick={() => handleRemoveOption(option)}
                  >
                    <Trash2 />
                  </IconButton>
                </Flex>
              ))}
            </Stack>
          ) : (
            <Text color={'fg.muted'} textStyle="sm">No options added yet.</Text>
          )}
        </SimpleGrid>
      </ChakraCollapsible.Content>
    </ChakraCollapsible.Root>
  );
});

FieldDropdownOptions.displayName = "FieldDropdownOptions";

export default FieldDropdownOptions;
