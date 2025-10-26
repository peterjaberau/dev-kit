"use client"

import React from 'react';
import { ArrayTranslations } from '#jSchemaBuilder/core';
import { Dialog, Button, Portal, CloseButton } from '@chakra-ui/react';

export interface DeleteDialogProps {
  open: boolean;
  onClose(): void;
  onConfirm(): void;
  onCancel(): void;
  translations: ArrayTranslations;
}

export interface WithDeleteDialogSupport {
  openDeleteDialog(path: string, data: number): void;
}

export const DeleteDialog = React.memo(
  ({ open, onClose, onConfirm, onCancel, translations }: DeleteDialogProps) => {
    // const cancelRef = React.useRef(null);

    return (
      <Dialog.Root
        size={'xs'}
        open={open}
        // leastDestructiveRef={cancelRef}
        onOpenChange={onClose}
      >
        <Portal>
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header fontSize='lg' fontWeight='bold'>
                <Dialog.Title>{translations.deleteDialogTitle}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>{translations.deleteDialogMessage}</Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant='outline' onClick={onCancel}>
                    {translations.deleteDialogDecline}
                  </Button>
                </Dialog.ActionTrigger>
                <Button onClick={onConfirm}>
                  {translations.deleteDialogAccept}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size='sm' />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  }
);
