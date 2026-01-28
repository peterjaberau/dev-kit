"use client"
import { useState, useEffect, useCallback } from 'react'
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

interface NotesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// ============================================
// Storage helpers
// ============================================

const NOTES_STORAGE_KEY = 'editorx-project-notes'

function getStoredNotes(projectId: string): string {
  try {
    const stored = localStorage.getItem(NOTES_STORAGE_KEY)
    if (stored) {
      const notes = JSON.parse(stored) as Record<string, string>
      return notes[projectId] || ''
    }
  } catch {
    // Ignore parse errors
  }
  return ''
}

function saveNotes(projectId: string, content: string): void {
  try {
    const stored = localStorage.getItem(NOTES_STORAGE_KEY)
    const notes: Record<string, string> = stored ? JSON.parse(stored) : {}
    notes[projectId] = content
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes))
  } catch {
    // Ignore storage errors
  }
}

// ============================================
// NotesDialog Component
// ============================================

export function NotesDialog({ open, onOpenChange }: NotesDialogProps) {
  const { currentProject } = useProject()
  const [notes, setNotes] = useState('')
  const [isSaved, setIsSaved] = useState(true)

  // Load notes when dialog opens - sync with localStorage (external system)
  useEffect(() => {
    if (open && currentProject) {
      const storedNotes = getStoredNotes(currentProject.id)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: syncing with localStorage on dialog open
      setNotes(storedNotes)
      setIsSaved(true)
    }
  }, [open, currentProject])

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNotes(e.target.value)
      setIsSaved(false)
    },
    []
  )

  const handleSave = useCallback(() => {
    if (currentProject) {
      saveNotes(currentProject.id, notes)
      setIsSaved(true)
    }
  }, [currentProject, notes])

  const handleClose = useCallback(() => {
    // Auto-save on close if there are unsaved changes
    if (!isSaved && currentProject) {
      saveNotes(currentProject.id, notes)
    }
    onOpenChange(false)
  }, [isSaved, currentProject, notes, onOpenChange])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Cmd/Ctrl + S to save
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    },
    [handleSave]
  )

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Project Notes</DialogTitle>
          <DialogDescription>
            Keep track of ideas, todos, and notes for{' '}
            <span className="font-medium text-[var(--text-primary)]">
              {currentProject?.name || 'this project'}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <textarea
            value={notes}
            onChange={handleNotesChange}
            onKeyDown={handleKeyDown}
            placeholder="Write your notes here..."
            rows={12}
            className={cn(
              'w-full resize-none rounded-md border border-[var(--border-default)]',
              'bg-[var(--bg-base)] px-3 py-2',
              'text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
              'focus:ring-2 focus:ring-[var(--color-primary-500)] focus:outline-none'
            )}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>
              {notes.length} character{notes.length !== 1 ? 's' : ''}
            </span>
            <span>{isSaved ? 'Saved' : 'Unsaved changes'}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSave} disabled={isSaved}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NotesDialog
