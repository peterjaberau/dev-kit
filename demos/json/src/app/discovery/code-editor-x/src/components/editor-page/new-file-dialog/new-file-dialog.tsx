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
import type { FileLanguage } from '../../../types'
import { cn } from '../../../lib/utils'

// ============================================
// Types
// ============================================

interface NewFileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  parentFolderId?: string | null
  onFileCreated?: (fileId: string) => void
}

// ============================================
// Helpers
// ============================================

// eslint-disable-next-line no-control-regex -- Intentional: checking for invalid filename characters
const INVALID_CHARS_REGEX = /[<>:"/\\|?*\x00-\x1F]/

function getLanguageFromExtension(fileName: string): FileLanguage {
  const ext = fileName.split('.').pop()?.toLowerCase()
  const languageMap: Record<string, FileLanguage> = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    html: 'html',
    htm: 'html',
    css: 'css',
    json: 'json',
    md: 'markdown',
    markdown: 'markdown',
    py: 'python',
    rs: 'rust',
    go: 'go',
  }
  return languageMap[ext || ''] || 'plaintext'
}

function validateFileName(
  name: string,
  existingNames: string[]
): string | null {
  if (!name.trim()) {
    return 'File name cannot be empty'
  }
  if (INVALID_CHARS_REGEX.test(name)) {
    return 'File name contains invalid characters'
  }
  if (existingNames.includes(name.toLowerCase())) {
    return 'A file with this name already exists'
  }
  return null
}

// ============================================
// NewFileDialog Component
// ============================================

export function NewFileDialog({
  open,
  onOpenChange,
  parentFolderId = null,
  onFileCreated,
}: NewFileDialogProps) {
  const { currentProject, createFile } = useProject()
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Get existing file names in the target folder
  const existingNames = useMemo(
    () =>
      currentProject
        ? Object.values(currentProject.nodes)
            .filter(
              (node) => node.parentId === parentFolderId && node.type === 'file'
            )
            .map((node) => node.name.toLowerCase())
        : [],
    [currentProject, parentFolderId]
  )

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setFileName('')
      setError(null)
      setIsCreating(false)
    }
  }, [open])

  // Validate as user types
  useEffect(() => {
    if (fileName) {
      const validationError = validateFileName(fileName, existingNames)
      setError(validationError)
    } else {
      setError(null)
    }
  }, [fileName, existingNames])

  const detectedLanguage = getLanguageFromExtension(fileName)

  const handleCreate = useCallback(async () => {
    const validationError = validateFileName(fileName, existingNames)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsCreating(true)
    try {
      const file = await createFile(parentFolderId, fileName, detectedLanguage)
      onFileCreated?.(file.id)
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create file')
    } finally {
      setIsCreating(false)
    }
  }, [
    fileName,
    existingNames,
    parentFolderId,
    detectedLanguage,
    createFile,
    onFileCreated,
    onOpenChange,
  ])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !error && fileName.trim()) {
        handleCreate()
      }
    },
    [error, fileName, handleCreate]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New File</DialogTitle>
          <DialogDescription>
            Enter a name for the new file. The language will be auto-detected
            from the extension.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-3 py-4">
          <div className="space-y-2">
            <label
              htmlFor="file-name"
              className="text-sm font-medium text-[var(--text-primary)]"
            >
              File Name
            </label>
            <input
              id="file-name"
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="example.ts"
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

          {fileName && !error && (
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <span>Language:</span>
              <span className="rounded bg-[var(--interactive-hover)] px-2 py-0.5 font-mono text-xs">
                {detectedLanguage}
              </span>
            </div>
          )}
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
            disabled={!fileName.trim() || !!error || isCreating}
          >
            {isCreating ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewFileDialog
