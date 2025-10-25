"use client"

import {
  ArrayLayoutProps,
  ArrayTranslations,
  RankedTester,
  isObjectArrayControl,
  isPrimitiveArrayControl,
  or,
  rankWith,
} from '#jSchemaBuilder/core';
import {
  withArrayTranslationProps,
  withJsonFormsArrayLayoutProps,
  withTranslateProps,
} from '#jSchemaBuilder/react';
import React, { useCallback, useState } from 'react';
import { DeleteDialog } from './DeleteDialog';
import { TableControl } from './TableControl';

export const ArrayControlRenderer = (
  props: ArrayLayoutProps & { translations: ArrayTranslations }
) => {
  const [open, setOpen] = useState(false);
  const [path, setPath]: any = useState(undefined);
  const [rowData, setRowData] = useState(undefined);
  const { removeItems, visible, translations }: any = props;

  const openDeleteDialog = useCallback(
    (p: string | any, rowIndex: number | any) => {
      setOpen(true);
      setPath(p);
      setRowData(rowIndex);
    },
    [setOpen, setPath, setRowData]
  );
  const deleteCancel = useCallback(() => setOpen(false), [setOpen]);
  const deleteConfirm = useCallback(() => {
    const p = path.substring(0, path.lastIndexOf('.'));
    removeItems(p, [rowData])();
    setOpen(false);
  }, [setOpen, path, rowData]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <TableControl
        {...props}
        openDeleteDialog={openDeleteDialog}
        translations={translations}
      />
      <DeleteDialog
        open={open}
        onCancel={deleteCancel}
        onConfirm={deleteConfirm}
        acceptText={translations.deleteDialogAccept}
        declineText={translations.deleteDialogDecline}
        title={translations.deleteDialogTitle}
        message={translations.deleteDialogMessage}
      />
    </>
  );
};

export const arrayControlTester: RankedTester = rankWith(
  3,
  or(isObjectArrayControl, isPrimitiveArrayControl)
);

export default withJsonFormsArrayLayoutProps(
  withTranslateProps(withArrayTranslationProps(ArrayControlRenderer))
);
