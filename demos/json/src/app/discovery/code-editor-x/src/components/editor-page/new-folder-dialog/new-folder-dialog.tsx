"use client"
import { useState, useCallback, useEffect, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog'
import { Button } from '../../ui/button'
import { useProject } from '../../../lib/project-provider'
import { cn } from '../../../lib/utils'

// ============================================
// Types
// ============================================

interface NewFolderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  parentFolderId?: string | null
  onFolderCreated?: (folderId: string) => void
}

// ============================================
// Helpers
// ============================================

// eslint-disable-next-line no-control-regex -- Intentional: checking for invalid folder name characters
const INVALID_CHARS_REGEX = /[<>:"/\\|?*\x00-\x1F]/

function validateFolderName(
  name: string,
  existingNames: string[]
): string | null {
  if (!name.trim()) {
    return 'Folder name cannot be empty'
  }
  if (INVALID_CHARS_REGEX.test(name)) {
    return 'Folder name contains invalid characters'
  }
  if (existingNames.includes(name.toLowerCase())) {
    return 'A folder with this name already exists'
  }
  return null
}

// ============================================
// NewFolderDialog Component
// ============================================

export function NewFolderDialog({
  open,
  onOpenChange,
  parentFolderId = null,
  onFolderCreated,
}: NewFolderDialogProps) {
  const { currentProject, createFolder } = useProject()
  const [folderName, setFolderName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Get existing folder names in the target folder
  const existingNames = useMemo(
    () =>
      currentProject
        ? Object.values(currentProject.nodes)
            .filter(
              (node) =>
                node.parentId === parentFolderId && node.type === 'folder'
            )
            .map((node) => node.name.toLowerCase())
        : [],
    [currentProject, parentFolderId]
  )

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setFolderName('')
      setError(null)
      setIsCreating(false)
    }
  }, [open])

  // Validate as user types
  useEffect(() => {
    if (folderName) {
      const validationError = validateFolderName(folderName, existingNames)
      setError(validationError)
    } else {
      setError(null)
    }
  }, [folderName, existingNames])

  const handleCreate = useCallback(async () => {
    const validationError = validateFolderName(folderName, existingNames)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsCreating(true)
    try {
      const folder = await createFolder(parentFolderId, folderName)
      onFolderCreated?.(folder.id)
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create folder')
    } finally {
      setIsCreating(false)
    }
  }, [
    folderName,
    existingNames,
    parentFolderId,
    createFolder,
    onFolderCreated,
    onOpenChange,
  ])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !error && folderName.trim()) {
        handleCreate()
      }
    },
    [error, folderName, handleCreate]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for the new folder.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-3 py-4">
          <div className="space-y-2">
            <label
              htmlFor="folder-name"
              className="text-sm font-medium text-[var(--text-primary)]"
            >
              Folder Name
            </label>
            <input
              id="folder-name"
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="my-folder"
              autoFocus
              className={cn(
                'w-full rounded-md border bg-[var(--bg-base)] px-3 py-2',
                'text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                'focus:ring-2 focus:ring-[var(--color-primary-500)] focus:outline-none',
                error
                  ? 'border-[var(--color-error-500)]'
                  : 'border-[var(--border-default)]'
              )}
            />
            {error && (
              <p className="text-xs text-[var(--color-error-500)]">{error}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!folderName.trim() || !!error || isCreating}
          >
            {isCreating ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewFolderDialog
