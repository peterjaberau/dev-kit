'use client'
import { useState, useCallback, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog'
import { Button } from '../../ui/button'
import { ScrollArea } from '../../ui/scroll-area'
import {
  BrandReact,
  BrandNodejs,
  JavaScript,
  TypeScript,
  Html,
  Python,
  File,
} from '../../ui/icons'
import { useProject } from '../../../lib/project-provider'
import {
  projectTemplates,
  type ProjectTemplate,
  type TemplateIcon,
} from '../../../lib/project-templates'
import { cn } from '../../../lib/utils'

// ============================================
// Icon Renderer
// ============================================

function TemplateIconComponent({
  icon,
  className,
}: {
  icon: TemplateIcon
  className?: string
}) {
  const iconProps = { size: 24, className }

  switch (icon) {
    case 'react':
      return <BrandReact {...iconProps} />
    case 'javascript':
      return <JavaScript {...iconProps} />
    case 'typescript':
      return <TypeScript {...iconProps} />
    case 'html':
      return <Html {...iconProps} />
    case 'python':
      return <Python {...iconProps} />
    case 'nodejs':
      return <BrandNodejs {...iconProps} />
    case 'file':
    default:
      return <File {...iconProps} />
  }
}

// ============================================
// Types
// ============================================

interface NewProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProjectCreated?: (projectId: string) => void
}

// ============================================
// TemplateCard Component
// ============================================

interface TemplateCardProps {
  template: ProjectTemplate
  isSelected: boolean
  onSelect: () => void
}

function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'group relative flex flex-col items-start rounded-lg border p-4 text-left transition-all',
        'hover:border-[var(--color-primary-500)] hover:bg-[var(--interactive-hover)]',
        isSelected
          ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10 ring-2 ring-[var(--color-primary-500)]'
          : 'border-[var(--border-default)] bg-[var(--bg-elevated)]'
      )}
    >
      {/* Icon */}
      <div className="mb-3 text-[var(--text-secondary)]">
        <TemplateIconComponent icon={template.icon} />
      </div>

      {/* Template info */}
      <h3 className="font-medium text-[var(--text-primary)]">
        {template.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs text-[var(--text-secondary)]">
        {template.description}
      </p>

      {/* File count badge */}
      {template.files.length > 0 && (
        <span className="mt-2 inline-flex items-center rounded-full bg-[var(--bg-base)] px-2 py-0.5 text-xs text-[var(--text-muted)]">
          {template.files.length} file{template.files.length !== 1 ? 's' : ''}
        </span>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary-500)] text-white">
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </button>
  )
}

// ============================================
// NewProjectDialog Component
// ============================================

export function NewProjectDialog({
  open,
  onOpenChange,
  onProjectCreated,
}: NewProjectDialogProps) {
  const { createProjectFromTemplate } = useProject()
  const [selectedTemplate, setSelectedTemplate] =
    useState<ProjectTemplate | null>(null)
  const [projectName, setProjectName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<'template' | 'name'>('template')

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedTemplate(null)
      setProjectName('')
      setError(null)
      setIsCreating(false)
      setStep('template')
    }
  }, [open])

  // Auto-generate project name based on template
  useEffect(() => {
    if (selectedTemplate && step === 'name' && !projectName) {
      setProjectName(`My ${selectedTemplate.name} Project`)
    }
  }, [selectedTemplate, step, projectName])

  const handleTemplateSelect = useCallback((template: ProjectTemplate) => {
    setSelectedTemplate(template)
    setError(null)
  }, [])

  const handleContinue = useCallback(() => {
    if (!selectedTemplate) {
      setError('Please select a template')
      return
    }
    setStep('name')
  }, [selectedTemplate])

  const handleBack = useCallback(() => {
    setStep('template')
    setError(null)
  }, [])

  const handleCreate = useCallback(async () => {
    if (!selectedTemplate) return

    const name = projectName.trim() || `My ${selectedTemplate.name} Project`

    setIsCreating(true)
    setError(null)

    try {
      const project = await createProjectFromTemplate(name, selectedTemplate)
      onProjectCreated?.(project.id)
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project')
    } finally {
      setIsCreating(false)
    }
  }, [
    selectedTemplate,
    projectName,
    createProjectFromTemplate,
    onProjectCreated,
    onOpenChange,
  ])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && step === 'name' && !isCreating) {
        handleCreate()
      }
    },
    [step, isCreating, handleCreate]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {step === 'template' ? 'Create New Project' : 'Name Your Project'}
          </DialogTitle>
          <DialogDescription>
            {step === 'template'
              ? 'Choose a template to get started quickly, or start from scratch.'
              : 'Give your project a name.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'template' ? (
          <ScrollArea className="h-[400px] px-3">
            <div className="grid grid-cols-2 gap-3 py-4 pr-4 sm:grid-cols-3">
              {projectTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={() => handleTemplateSelect(template)}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="space-y-4 px-3 py-4">
            {/* Selected template preview */}
            {selectedTemplate && (
              <div className="flex items-center gap-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] p-3">
                <div className="text-[var(--text-secondary)]">
                  <TemplateIconComponent icon={selectedTemplate.icon} />
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    {selectedTemplate.name}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {selectedTemplate.description}
                  </p>
                </div>
              </div>
            )}

            {/* Project name input */}
            <div className="space-y-2">
              <label
                htmlFor="project-name"
                className="text-sm font-medium text-[var(--text-primary)]"
              >
                Project Name
              </label>
              <input
                id="project-name"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="My Awesome Project"
                autoFocus
                className={cn(
                  'w-full rounded-md border bg-[var(--bg-base)] px-3 py-2',
                  'text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                  'focus:ring-2 focus:ring-[var(--color-primary-500)] focus:outline-none',
                  'border-[var(--border-default)]'
                )}
              />
            </div>

            {/* Files preview */}
            {selectedTemplate && selectedTemplate.files.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-[var(--text-secondary)]">
                  Files included:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTemplate.files.map((file) => (
                    <span
                      key={file.path}
                      className="rounded bg-[var(--interactive-hover)] px-2 py-0.5 font-mono text-xs text-[var(--text-secondary)]"
                    >
                      {file.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <p className="px-3 text-xs text-[var(--color-error-500)]">{error}</p>
        )}

        <DialogFooter>
          {step === 'template' ? (
            <>
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleContinue} disabled={!selectedTemplate}>
                Continue
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={isCreating}
              >
                Back
              </Button>
              <Button onClick={handleCreate} disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create Project'}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewProjectDialog
