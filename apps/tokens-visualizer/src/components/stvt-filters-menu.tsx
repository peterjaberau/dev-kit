import React, { useCallback, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Switch,
  FormControl,
  FormLabel,
  Heading,
  useRadioGroup,
  useTheme,
} from '@chakra-ui/react';

// --- Placeholder/Mock Data (Assuming these were imported from '#/layout-consts') ---
// NOTE: Replace these with your actual imports.
const ORDERED_TOKEN_FILTER_CATEGORIES = ['theme', 'type', 'status'];
const CATEGORIZED_TOKEN_FILTERS = {
  theme: ['dark', 'light', 'monochrome'],
  type: ['icon', 'component', 'utility'],
  status: ['draft', 'published'],
};
const CATEGORIZED_TOKEN_FILTER_LABELS = {
  theme: 'Color Theme',
  type: 'Token Type',
  status: 'Development Status',
};
// ---------------------------------------------------------------------------------

// Define the props for the React component
interface StvtFiltersMenuProps {
  // Current active filters (array of strings)
  filters: string[];
  // Callback function to handle filter changes
  onFiltersSelected: (activeFilters: string[]) => void;
}

/**
 * A filter menu component using Chakra UI switches and field groups.
 * Replaces LitElement's render logic and Spectrum Web Components.
 */
export const StvtFiltersMenu: React.FC<StvtFiltersMenuProps> = ({
                                                                  filters,
                                                                  onFiltersSelected,
                                                                }) => {
  // Use a Set for O(1) lookups to check if a filter is active
  const activeFiltersSet = useMemo(() => new Set(filters), [filters]);

  /**
   * Handles the change event from any switch, calculates the new active filters,
   * and dispatches the change via the `onFiltersSelected` callback prop.
   */
  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;

      // Create a new Set from the current active filters
      const newActiveFilters = new Set(activeFiltersSet);

      if (checked) {
        newActiveFilters.add(value);
      } else {
        newActiveFilters.delete(value);
      }

      // Convert the Set back to a sorted array for consistent output
      const updatedFilters = Array.from(newActiveFilters).sort();

      // Dispatch the update via the prop (Replaces dispatchCustomEvent)
      onFiltersSelected(updatedFilters);
    },
    [activeFiltersSet, onFiltersSelected],
  );

  /**
   * Generates a list of switches for a given category.
   * Replaces the `listOfOptions` method.
   */
  const renderOptionSwitches = useCallback(
    (category: string) => {
      return CATEGORIZED_TOKEN_FILTERS[category].map((filterName) => (
        <HStack key={filterName} spacing={3} width="100%" justify="space-between">
          <FormLabel
            htmlFor={`filter-${filterName}`}
            mb="0" // Remove default bottom margin
            textTransform="capitalize"
            fontWeight="normal" // Less emphasis than the category label
          >
            {filterName}
          </FormLabel>
          <Switch
            id={`filter-${filterName}`}
            value={filterName}
            isChecked={activeFiltersSet.has(filterName)}
            onChange={handleFilterChange}
            // Equivalent to Spectrum's 'emphasized' switch style if needed,
            // though Chakra switches have a clean modern look by default.
            colorScheme="blue"
          />
        </HStack>
      ));
    },
    [activeFiltersSet, handleFilterChange],
  );

  /**
   * Generates the categorized lists of switches.
   * Replaces the `listOfCategorizedOptionLists` getter.
   */
  const listOfCategorizedOptionLists = useMemo(() => {
    return ORDERED_TOKEN_FILTER_CATEGORIES.map((category) => (
      <VStack
        key={category}
        align="stretch"
        spacing={2}
        p={4}
        borderWidth="1px"
        borderRadius="md"
        // Mimicking the field-group structure
        width="100%"
      >
        {/* Replaces sp-field-label and handles the category label */}
        <Heading as="h3" size="md" mb={2}>
          {CATEGORIZED_TOKEN_FILTER_LABELS[category]}
        </Heading>

        {/* Replaces sp-field-group and contains the switches */}
        <FormControl as={VStack} spacing={3} align="stretch">
          {renderOptionSwitches(category)}
        </FormControl>
      </VStack>
    ));
  }, [renderOptionSwitches]);

  // --- Render ---
  return (
    <Box
      // Equivalent to the :host CSS block for layout
      position="relative"
      display="block"
      paddingBottom="20px"
      width="100%"
    >
      <VStack spacing={6} align="stretch">
        {listOfCategorizedOptionLists}
      </VStack>
    </Box>
  );
};
