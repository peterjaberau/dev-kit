"use client"

import {
  and,
  ArrayLayoutProps,
  ArrayTranslations,
  composePaths,
  computeLabel,
  createDefaultValue,
  findUISchema,
  isObjectArray,
  RankedTester,
  rankWith,
  uiTypeIs,
} from '#jSchemaBuilder/core';
import {
  JsonFormsDispatch,
  withArrayTranslationProps,
  withJsonFormsArrayLayoutProps,
  withTranslateProps,
} from '#jSchemaBuilder/react';
import { Col, Empty, List, Row } from 'antd';

import range from 'lodash/range';
import React, { useCallback, useMemo, useState } from 'react';
import { ArrayLayoutToolbar } from '../layouts/ArrayToolbar';
import ListWithDetailMasterItem from './ListWithDetailMasterItem';
import merge from 'lodash/merge';

export const ListWithDetailRenderer = ({
  uischemas,
  schema,
  uischema,
  path,
  enabled,
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
  rootSchema,
  description,
  disableAdd,
  disableRemove,
  translations,
}: ArrayLayoutProps & { translations: ArrayTranslations } | any) => {
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
    () => createDefaultValue(schema, rootSchema),
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
        uischema,
        rootSchema
      ),
    [uischemas, schema, uischema.scope, path, uischema, rootSchema]
  );
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const doDisableAdd = disableAdd || appliedUiSchemaOptions.disableAdd;
  const doDisableRemove = disableRemove || appliedUiSchemaOptions.disableRemove;

  React.useEffect(() => {
    setSelectedIndex(undefined);
  }, [schema]);

  if (!visible) {
    return null;
  }

  return (
    <ArrayLayoutToolbar
      translations={translations}
      label={computeLabel(
        label,
        required,
        appliedUiSchemaOptions.hideRequiredAsterisk
      )}
      description={description}
      errors={errors}
      path={path}
      enabled={enabled}
      addItem={addItem}
      createDefault={handleCreateDefaultValue}
      disableAdd={doDisableAdd}
    >
      <Row gutter={8}>
        <Col xs={6}>
          {data > 0 ? (
            <List
              dataSource={range(data)}
              renderItem={(_item, index) => (
                <ListWithDetailMasterItem
                  index={index}
                  path={path}
                  schema={schema}
                  enabled={enabled}
                  handleSelect={handleListItemClick}
                  removeItem={handleRemoveItem}
                  selected={selectedIndex === index}
                  key={index}
                  uischema={foundUISchema}
                  childLabelProp={appliedUiSchemaOptions.elementLabelProp}
                  translations={translations}
                  disableRemove={doDisableRemove}
                />
              )}
            ></List>
          ) : (
            <Empty description={translations.noDataMessage} />
          )}
        </Col>
        <Col xs={18}>
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
            <Empty description={translations.noSelection} />
          )}
        </Col>
      </Row>
    </ArrayLayoutToolbar>
  );
};

export const listWithDetailTester: RankedTester = rankWith(
  4,
  and(uiTypeIs('ListWithDetail'), isObjectArray)
);

export default withJsonFormsArrayLayoutProps(
  withTranslateProps(withArrayTranslationProps(ListWithDetailRenderer))
);
