"use client"

import React, { useCallback, useState } from 'react';

import {
  CombinatorRendererProps,
  createCombinatorRenderInfos,
  createDefaultValue,
  isAnyOfControl,
  JsonSchema,
  RankedTester,
  rankWith,
} from '#jSchemaBuilder/core';
import { JsonFormsDispatch, withJsonFormsAnyOfProps } from '#jSchemaBuilder/react';
import { Tabs } from 'antd';
import CombinatorProperties from './CombinatorProperties';
import isEmpty from 'lodash/isEmpty';
import { TabSwitchConfirmDialog } from './TabSwitchConfirmDialog';

export const AnyOfRenderer = ({
  handleChange,
  schema,
  rootSchema,
  indexOfFittingSchema,
  visible,
  path,
  renderers,
  cells,
  uischema,
  uischemas,
  id,
  data,
}: CombinatorRendererProps) => {
  const [selectedAnyOf, setSelectedAnyOf] = useState(indexOfFittingSchema || 0);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [newSelectedIndex, setNewSelectedIndex] = useState(0);

  const handleClose = useCallback(
    () => setConfirmDialogOpen(false),
    [setConfirmDialogOpen]
  );

  const handleTabChange = useCallback(
    (value: string) => {
      const newIndex = parseInt(value);
      if (
        isEmpty(data) ||
        typeof data ===
          typeof createDefaultValue(
            anyOfRenderInfos[newIndex].schema,
            rootSchema
          )
      ) {
        setSelectedAnyOf(newIndex);
      } else {
        setNewSelectedIndex(newIndex);
        setConfirmDialogOpen(true);
      }
    },
    [setConfirmDialogOpen, setSelectedAnyOf, data]
  );

  const openNewTab = (newIndex: number) => {
    handleChange(
      path,
      createDefaultValue(anyOfRenderInfos[newIndex].schema, rootSchema)
    );
    setSelectedAnyOf(newIndex);
  };

  const confirm = useCallback(() => {
    openNewTab(newSelectedIndex);
    setConfirmDialogOpen(false);
  }, [handleChange, createDefaultValue, newSelectedIndex]);

  const anyOf = 'anyOf';
  const anyOfRenderInfos: any = createCombinatorRenderInfos(
    (schema as JsonSchema | any).anyOf,
    rootSchema,
    anyOf,
    uischema,
    path,
    uischemas
  );

  if (!visible) {
    return null;
  }

  return (
    <>
      <CombinatorProperties
        schema={schema}
        combinatorKeyword={anyOf}
        path={path}
        rootSchema={rootSchema}
      />
      <Tabs
        defaultActiveKey={selectedAnyOf.toString()}
        onChange={handleTabChange}
        items={anyOfRenderInfos.map(
          (anyOfRenderInfo: any, anyOfIndex: any) =>
            ({
              label: anyOfRenderInfo.label,
              key: String(anyOfIndex),
              children: selectedAnyOf === anyOfIndex && (
                <JsonFormsDispatch
                  schema={anyOfRenderInfo.schema}
                  uischema={anyOfRenderInfo.uischema}
                  path={path}
                  renderers={renderers}
                  cells={cells}
                />
              ),
            } as any)
        )}
      ></Tabs>
      <TabSwitchConfirmDialog
        cancel={handleClose}
        confirm={confirm}
        id={'anyOf-' + id}
        open={confirmDialogOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export const anyOfControlTester: RankedTester = rankWith(3, isAnyOfControl);

export default withJsonFormsAnyOfProps(AnyOfRenderer);
