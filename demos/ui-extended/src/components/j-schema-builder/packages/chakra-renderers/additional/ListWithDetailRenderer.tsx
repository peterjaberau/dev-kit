"use client"

import {
  ArrayLayoutProps,
  composePaths,
  computeLabel,
  createDefaultValue,
  findUISchema,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '#jSchemaBuilder/core';
import {
  JsonFormsDispatch,
  withJsonFormsArrayLayoutProps,
} from '#jSchemaBuilder/react';
import range from 'lodash/range';
import merge from 'lodash/merge';
import React, { useCallback, useMemo, useState } from 'react';
import { Box, Flex, Separator, VStack } from '@chakra-ui/react';

import NoData from '../util/NoData';
import { ArrayLayoutToolbar } from '../layouts/ArrayToolbar';
import ListWithDetailMasterItem from './ListWithDetailMasterItem';
import Hidden from '../util/Hidden';

export const ListWithDetailRenderer = ({
  uischemas,
  schema,
  uischema,
  path,
  errors,
  visible,
  label,
  required,
  removeItems,
  addItem,
  data,
  renderers,
  cells,
  config,
  translations,
}: ArrayLayoutProps | any) => {
  const [selectedIndex, setSelectedIndex]: any = useState(undefined);
  const handleRemoveItem = useCallback(
    (p: string, value: any) => () => {
      removeItems(p, [value])();
      if (selectedIndex === value) {
        setSelectedIndex(undefined);
      } else if (selectedIndex > value) {
        setSelectedIndex(selectedIndex - 1);
      }
    },
    [removeItems, setSelectedIndex]
  );
  const handleListItemClick = useCallback(
    (index: number) => () => setSelectedIndex(index),
    [setSelectedIndex]
  );
  const handleCreateDefaultValue = useCallback(
    () => createDefaultValue(schema),
    [createDefaultValue]
  );
  const foundUISchema = useMemo(
    () =>
      findUISchema(
        uischemas,
        schema,
        uischema.scope,
        path,
        undefined,
        uischema
      ),
    [uischemas, schema, uischema.scope, path, uischema]
  );
  const appliedUiSchemaOptions = merge({}, config, uischema.options);

  return (
    <Hidden hidden={!visible}>
      <Box w='100%'>
        <ArrayLayoutToolbar
          translations={translations}
          label={computeLabel(
            label,
            required,
            appliedUiSchemaOptions.hideRequiredAsterisk
          )}
          errors={errors}
          path={path}
          addItem={addItem}
          createDefault={handleCreateDefaultValue}
        />
        <Flex direction='row' gap='2'>
          <Box flex={1}>
            <VStack w='100%' separator={<Separator />}>
              {range(data).map((_item, index) => (
                <ListWithDetailMasterItem
                  translations={translations}
                  index={index}
                  path={path}
                  schema={schema}
                  handleSelect={handleListItemClick}
                  removeItem={handleRemoveItem}
                  selected={selectedIndex === index}
                  key={index}
                  enabled={false}
                />
              ))}
            </VStack>
          </Box>
          <Box flex={3}>
            {selectedIndex !== undefined ? (
              <JsonFormsDispatch
                renderers={renderers}
                cells={cells}
                visible={visible}
                schema={schema}
                uischema={foundUISchema}
                path={composePaths(path, `${selectedIndex}`)}
              />
            ) : (
              <NoData title='No Row Selected' />
            )}
          </Box>
        </Flex>
      </Box>
    </Hidden>
  );
};

export const listWithDetailTester: RankedTester = rankWith(
  4,
  uiTypeIs('ListWithDetail')
);

export default withJsonFormsArrayLayoutProps(ListWithDetailRenderer);
