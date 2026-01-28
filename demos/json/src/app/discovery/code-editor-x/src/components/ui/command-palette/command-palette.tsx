"use client"
import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { Dialog, DialogContent } from '../dialog'
import { ScrollArea } from '../scroll-area'
import { cn } from '../../../lib/utils'
import { Search, Sparkles } from '../icons'

// ============================================
// Types
// ============================================

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  shortcut?: string[]
  keywords?: string[]
  onSelect: () => void
}

export interface CommandGroup {
  id: string
  label: string
  items: CommandItem[]
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups: CommandGroup[]
  placeholder?: string
}

// ============================================
// Command Palette Component
// ============================================

export function CommandPalette({
  open,
  onOpenChange,
  groups,
  placeholder = 'Search commands or ask AI...',
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Flatten all items for keyboard navigation
  const filteredGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const searchText = query.toLowerCase()
        return (
          item.label.toLowerCase().includes(searchText) ||
          item.description?.toLowerCase().includes(searchText) ||
          item.keywords?.some((k) => k.toLowerCase().includes(searchText))
        )
      }),
    }))
    .filter((group) => group.items.length > 0)

  const allItems = filteredGroups.flatMap((group) => group.items)

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [open])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < allItems.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : allItems.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (allItems[selectedIndex]) {
            allItems[selectedIndex].onSelect()
            onOpenChange(false)
          }
          break
        case 'Escape':
          e.preventDefault()
          onOpenChange(false)
          break
      }
    },
    [allItems, selectedIndex, onOpenChange]
  )

  let itemIndex = -1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showClose={false}
        className="max-w-2xl overflow-hidden p-0"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b border-[var(--border-default)] px-4">
          <Search size={18} className="shrink-0 text-[var(--text-tertiary)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="h-14 flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="shrink-0 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results */}
        <ScrollArea className="max-h-[400px]">
          <div className="p-2">
            {filteredGroups.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Sparkles size={32} className="mb-3 text-[var(--text-muted)]" />
                <p className="text-sm text-[var(--text-secondary)]">
                  No results found
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Try a different search term
                </p>
              </div>
            ) : (
              filteredGroups.map((group) => (
                <div key={group.id} className="mb-2">
                  <div className="px-2 py-1.5 text-xs font-semibold text-[var(--text-muted)]">
                    {group.label}
                  </div>
                  {group.items.map((item) => {
                    itemIndex++
                    const isSelected = itemIndex === selectedIndex
                    return (
                      <CommandItemRow
                        key={item.id}
                        item={item}
                        isSelected={isSelected}
                        onSelect={() => {
                          item.onSelect()
                          onOpenChange(false)
                        }}
                      />
                    )
                  })}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[var(--border-default)] px-4 py-2 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-[var(--interactive-normal)] px-1.5 py-0.5">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-[var(--interactive-normal)] px-1.5 py-0.5">
                ↵
              </kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-[var(--interactive-normal)] px-1.5 py-0.5">
                Esc
              </kbd>
              Close
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles size={12} />
            <span>AI Powered</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ============================================
// Command Item Row
// ============================================

interface CommandItemRowProps {
  item: CommandItem
  isSelected: boolean
  onSelect: () => void
}

function CommandItemRow({ item, isSelected, onSelect }: CommandItemRowProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'flex w-full items-center gap-3 rounded-md px-2 py-2 text-left',
        'transition-colors',
        isSelected
          ? 'bg-[var(--interactive-hover)] text-[var(--text-primary)]'
          : 'text-[var(--text-secondary)] hover:bg-[var(--interactive-hover)] hover:text-[var(--text-primary)]'
      )}
    >
      {item.icon && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--interactive-normal)] text-[var(--text-tertiary)]">
          {item.icon}
        </span>
      )}
      <div className="flex-1 overflow-hidden">
        <div className="truncate text-sm font-medium">{item.label}</div>
        {item.description && (
          <div className="truncate text-xs text-[var(--text-muted)]">
            {item.description}
          </div>
        )}
      </div>
      {item.shortcut && (
        <div className="flex shrink-0 items-center gap-1">
          {item.shortcut.map((key, i) => (
            <kbd
              key={i}
              className="rounded bg-[var(--interactive-normal)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)]"
            >
              {key}
            </kbd>
          ))}
        </div>
      )}
    </button>
  )
}

export default CommandPalette
