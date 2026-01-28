'use client'
// import { useNavigate } from 'react-router-dom'
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from '../../lib/theme-provider'
import { useSettings } from '../../lib/settings-provider'
import { ScrollArea } from '../../components/ui/scroll-area'
import { Button } from '../../components/ui/button'
import {
  ChevronLeft,
  Code,
  Settings,
  Check,
  Sun,
  Moon,
  Monitor,
  Keyboard,
  Info,
  Eye,
  Cloud,
  Puzzle,
  BrandGithub,
} from '../../components/ui/icons'
import { cn } from '../../lib/utils'
import { useState, type ReactNode } from 'react'

// ============================================
// Types
// ============================================

interface SettingsSectionProps {
  title: string
  description?: string
  children: ReactNode
}

interface SettingsRowProps {
  label: string
  description?: string
  children: ReactNode
}

interface SidebarItem {
  id: string
  label: string
  icon: ReactNode
}

// ============================================
// Sidebar Navigation
// ============================================

const sidebarItems: SidebarItem[] = [
  { id: 'appearance', label: 'Appearance', icon: <Eye size={18} /> },
  { id: 'editor', label: 'Editor', icon: <Code size={18} /> },
  { id: 'keyboard', label: 'Keyboard Shortcuts', icon: <Keyboard size={18} /> },
  { id: 'extensions', label: 'Extensions', icon: <Puzzle size={18} /> },
  { id: 'sync', label: 'Settings Sync', icon: <Cloud size={18} /> },
  { id: 'about', label: 'About', icon: <Info size={18} /> },
]

// ============================================
// Custom UI Components
// ============================================

function Switch({
  checked,
  onCheckedChange,
  disabled = false,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors',
        'focus-visible:ring-2 focus-visible:ring-[var(--accent-purple)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        checked ? 'bg-[var(--accent-purple)]' : 'bg-[var(--bg-inset)]'
      )}
    >
      <span
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform',
          checked ? 'translate-x-[18px]' : 'translate-x-0.5'
        )}
      />
    </button>
  )
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string | number
  onChange: (value: string) => void
  options: { value: string | number; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'h-8 min-w-[120px] rounded-md border border-[var(--border-default)] bg-[var(--bg-inset)] px-3 text-sm text-[var(--text-primary)]',
        'focus:border-[var(--accent-purple)] focus:ring-2 focus:ring-[var(--accent-purple)]/50 focus:outline-none',
        'appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")] bg-[length:16px] bg-[right_8px_center] bg-no-repeat pr-8'
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className={cn(
        'h-8 w-20 rounded-md border border-[var(--border-default)] bg-[var(--bg-inset)] px-3 text-center text-sm text-[var(--text-primary)]',
        'focus:border-[var(--accent-purple)] focus:ring-2 focus:ring-[var(--accent-purple)]/50 focus:outline-none',
        '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
      )}
    />
  )
}

// ============================================
// Layout Components
// ============================================

function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="text-base font-medium text-[var(--text-primary)]">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-[var(--text-muted)]">{description}</p>
        )}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function SettingsRow({ label, description, children }: SettingsRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg px-4 py-3 hover:bg-[var(--bg-hover)]">
      <div className="flex-1 pr-4">
        <div className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </div>
        {description && (
          <div className="mt-0.5 text-xs text-[var(--text-muted)]">
            {description}
          </div>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

// ============================================
// Settings Panels
// ============================================

function AppearanceSettings() {
  const { theme, setTheme } = useTheme()

  const themeOptions = [
    { value: 'light', label: 'Light', icon: <Sun size={20} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={20} /> },
    { value: 'system', label: 'System', icon: <Monitor size={20} /> },
  ] as const

  return (
    <div>
      <SettingsSection
        title="Theme"
        description="Select the color theme for the editor"
      >
        <div className="grid grid-cols-3 gap-3 px-4">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                theme === option.value
                  ? 'border-[var(--accent-purple)] bg-[var(--accent-purple)]/10'
                  : 'border-[var(--border-default)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)]'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  theme === option.value
                    ? 'bg-[var(--accent-purple)] text-white'
                    : 'bg-[var(--bg-inset)] text-[var(--text-secondary)]'
                )}
              >
                {option.icon}
              </div>
              <span
                className={cn(
                  'text-sm font-medium',
                  theme === option.value
                    ? 'text-[var(--accent-purple)]'
                    : 'text-[var(--text-secondary)]'
                )}
              >
                {option.label}
              </span>
              {theme === option.value && (
                <Check size={16} className="text-[var(--accent-purple)]" />
              )}
            </button>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Interface"
        description="Customize the appearance of the editor interface"
      >
        <SettingsRow
          label="Compact Mode"
          description="Reduce padding and spacing for a denser UI"
        >
          <Switch checked={false} onCheckedChange={() => {}} />
        </SettingsRow>
        <SettingsRow
          label="Show Activity Bar"
          description="Display the sidebar activity bar"
        >
          <Switch checked={true} onCheckedChange={() => {}} />
        </SettingsRow>
        <SettingsRow
          label="Show Status Bar"
          description="Display the bottom status bar"
        >
          <Switch checked={true} onCheckedChange={() => {}} />
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}

function EditorSettings() {
  const { settings, updateSettings } = useSettings()

  const fontFamilyOptions = [
    {
      value: '"JetBrains Mono", "Fira Code", monospace',
      label: 'JetBrains Mono',
    },
    { value: '"Fira Code", monospace', label: 'Fira Code' },
    { value: '"Source Code Pro", monospace', label: 'Source Code Pro' },
    { value: '"Cascadia Code", monospace', label: 'Cascadia Code' },
    { value: 'monospace', label: 'System Monospace' },
  ]

  const tabSizeOptions = [
    { value: 2, label: '2 spaces' },
    { value: 4, label: '4 spaces' },
    { value: 8, label: '8 spaces' },
  ]

  return (
    <div>
      <SettingsSection
        title="Font"
        description="Configure the editor font settings"
      >
        <SettingsRow
          label="Font Family"
          description="The font used in the editor"
        >
          <Select
            value={settings.fontFamily}
            onChange={(value) => updateSettings({ fontFamily: value })}
            options={fontFamilyOptions}
          />
        </SettingsRow>
        <SettingsRow label="Font Size" description="The font size in pixels">
          <NumberInput
            value={settings.fontSize}
            onChange={(value) => updateSettings({ fontSize: value })}
            min={10}
            max={24}
          />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Formatting"
        description="Configure code formatting behavior"
      >
        <SettingsRow
          label="Tab Size"
          description="The number of spaces per tab"
        >
          <Select
            value={settings.tabSize}
            onChange={(value) => updateSettings({ tabSize: Number(value) })}
            options={tabSizeOptions}
          />
        </SettingsRow>
        <SettingsRow
          label="Word Wrap"
          description="Wrap long lines to fit the editor width"
        >
          <Switch
            checked={settings.wordWrap}
            onCheckedChange={(checked) => updateSettings({ wordWrap: checked })}
          />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Display"
        description="Configure visual editor elements"
      >
        <SettingsRow
          label="Line Numbers"
          description="Show line numbers in the gutter"
        >
          <Switch
            checked={settings.lineNumbers}
            onCheckedChange={(checked) =>
              updateSettings({ lineNumbers: checked })
            }
          />
        </SettingsRow>
        <SettingsRow
          label="Minimap"
          description="Show a minimap overview of the code"
        >
          <Switch
            checked={settings.minimap}
            onCheckedChange={(checked) => updateSettings({ minimap: checked })}
          />
        </SettingsRow>
        <SettingsRow
          label="Bracket Pair Colorization"
          description="Colorize matching bracket pairs"
        >
          <Switch
            checked={settings.bracketPairColorization}
            onCheckedChange={(checked) =>
              updateSettings({ bracketPairColorization: checked })
            }
          />
        </SettingsRow>
      </SettingsSection>

      <SettingsSection
        title="Auto Save"
        description="Configure automatic file saving"
      >
        <SettingsRow
          label="Enable Auto Save"
          description="Automatically save files after changes"
        >
          <Switch
            checked={settings.autoSave}
            onCheckedChange={(checked) => updateSettings({ autoSave: checked })}
          />
        </SettingsRow>
        <SettingsRow
          label="Auto Save Delay"
          description="Delay in milliseconds before auto saving"
        >
          <Select
            value={settings.autoSaveDelay}
            onChange={(value) =>
              updateSettings({ autoSaveDelay: Number(value) })
            }
            options={[
              { value: 500, label: '500ms' },
              { value: 1000, label: '1 second' },
              { value: 2000, label: '2 seconds' },
              { value: 5000, label: '5 seconds' },
            ]}
          />
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}

function KeyboardShortcuts() {
  const shortcuts = [
    {
      category: 'General',
      items: [
        { keys: ['Ctrl', 'P'], action: 'Quick Open' },
        { keys: ['Ctrl', 'Shift', 'P'], action: 'Command Palette' },
        { keys: ['Ctrl', ','], action: 'Open Settings' },
        { keys: ['Ctrl', 'B'], action: 'Toggle Sidebar' },
        { keys: ['Ctrl', '`'], action: 'Toggle Terminal' },
      ],
    },
    {
      category: 'Editor',
      items: [
        { keys: ['Ctrl', 'S'], action: 'Save File' },
        { keys: ['Ctrl', 'Z'], action: 'Undo' },
        { keys: ['Ctrl', 'Shift', 'Z'], action: 'Redo' },
        { keys: ['Ctrl', 'F'], action: 'Find' },
        { keys: ['Ctrl', 'H'], action: 'Find and Replace' },
        { keys: ['Ctrl', 'D'], action: 'Select Next Occurrence' },
        { keys: ['Ctrl', '/'], action: 'Toggle Line Comment' },
      ],
    },
    {
      category: 'Navigation',
      items: [
        { keys: ['Ctrl', 'G'], action: 'Go to Line' },
        { keys: ['Ctrl', 'Tab'], action: 'Switch Tab' },
        { keys: ['Ctrl', 'W'], action: 'Close Tab' },
        { keys: ['Alt', '←'], action: 'Go Back' },
        { keys: ['Alt', '→'], action: 'Go Forward' },
      ],
    },
  ]

  return (
    <div>
      {shortcuts.map((section) => (
        <SettingsSection key={section.category} title={section.category}>
          <div className="space-y-1">
            {section.items.map((shortcut) => (
              <div
                key={shortcut.action}
                className="flex items-center justify-between rounded-lg px-4 py-2.5 hover:bg-[var(--bg-hover)]"
              >
                <span className="text-sm text-[var(--text-primary)]">
                  {shortcut.action}
                </span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, i) => (
                    <span key={i}>
                      <kbd className="rounded border border-[var(--border-default)] bg-[var(--bg-inset)] px-2 py-1 text-xs font-medium text-[var(--text-secondary)] shadow-sm">
                        {key}
                      </kbd>
                      {i < shortcut.keys.length - 1 && (
                        <span className="mx-0.5 text-[var(--text-muted)]">
                          +
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SettingsSection>
      ))}
    </div>
  )
}

function ExtensionsSettings() {
  const extensions = [
    {
      name: 'GitHub Copilot',
      description: 'AI pair programming',
      enabled: true,
    },
    { name: 'Prettier', description: 'Code formatter', enabled: true },
    { name: 'ESLint', description: 'JavaScript linter', enabled: true },
    { name: 'GitLens', description: 'Git supercharged', enabled: false },
    {
      name: 'Live Share',
      description: 'Real-time collaboration',
      enabled: false,
    },
  ]

  return (
    <div>
      <SettingsSection
        title="Installed Extensions"
        description="Manage your installed extensions"
      >
        {extensions.map((ext) => (
          <SettingsRow
            key={ext.name}
            label={ext.name}
            description={ext.description}
          >
            <Switch checked={ext.enabled} onCheckedChange={() => {}} />
          </SettingsRow>
        ))}
      </SettingsSection>

      <div className="px-4">
        <Button variant="outline" className="w-full">
          <Puzzle size={16} className="mr-2" />
          Browse Extensions
        </Button>
      </div>
    </div>
  )
}

function SyncSettings() {
  return (
    <div>
      <SettingsSection
        title="Settings Sync"
        description="Synchronize your settings across devices"
      >
        <div className="mx-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-inset)]">
            <Cloud size={24} className="text-[var(--text-muted)]" />
          </div>
          <h4 className="mb-2 font-medium text-[var(--text-primary)]">
            Sign in to sync settings
          </h4>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            Keep your settings, keybindings, and extensions synchronized across
            all your devices.
          </p>
          <div className="flex flex-col gap-2">
            <Button variant="default" className="w-full">
              <BrandGithub size={16} className="mr-2" />
              Sign in with GitHub
            </Button>
            <Button variant="outline" className="w-full">
              Sign in with Email
            </Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Sync Options">
        <SettingsRow label="Settings" description="Sync editor settings">
          <Switch checked={true} onCheckedChange={() => {}} disabled />
        </SettingsRow>
        <SettingsRow label="Keyboard Shortcuts" description="Sync keybindings">
          <Switch checked={true} onCheckedChange={() => {}} disabled />
        </SettingsRow>
        <SettingsRow label="Extensions" description="Sync installed extensions">
          <Switch checked={true} onCheckedChange={() => {}} disabled />
        </SettingsRow>
        <SettingsRow label="UI State" description="Sync panel layout and state">
          <Switch checked={false} onCheckedChange={() => {}} disabled />
        </SettingsRow>
      </SettingsSection>
    </div>
  )
}

function AboutSettings() {
  const { resetSettings } = useSettings()

  return (
    <div>
      <SettingsSection title="About EditorX">
        <div className="mx-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-elevated)] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-emerald-500">
              <Code size={28} className="text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)]">
                EditorX
              </h4>
              <p className="text-sm text-[var(--text-muted)]">
                Version 1.0.0 (Build 2024.01)
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <p>
              A modern, browser-based code editor built with React, TypeScript,
              and CodeMirror.
            </p>
            <p className="text-[var(--text-muted)]">
              Made with care by the EditorX team.
            </p>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Quick Links">
        <SettingsRow
          label="Documentation"
          description="Learn how to use EditorX"
        >
          <Button variant="ghost" size="sm">
            Open
          </Button>
        </SettingsRow>
        <SettingsRow
          label="Report an Issue"
          description="Found a bug? Let us know"
        >
          <Button variant="ghost" size="sm">
            Report
          </Button>
        </SettingsRow>
        <SettingsRow
          label="Release Notes"
          description="See what's new in this version"
        >
          <Button variant="ghost" size="sm">
            View
          </Button>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="Data">
        <div className="space-y-2 px-4">
          <Button variant="outline" className="w-full" onClick={resetSettings}>
            Reset All Settings
          </Button>
          <p className="text-center text-xs text-[var(--text-muted)]">
            This will reset all settings to their default values.
          </p>
        </div>
      </SettingsSection>
    </div>
  )
}

// ============================================
// Main Settings Page
// ============================================

export function SettingsPage() {
  // const navigate = useNavigate()
  const router = useRouter()
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('appearance')

  const renderContent = () => {
    switch (activeSection) {
      case 'appearance':
        return <AppearanceSettings />
      case 'editor':
        return <EditorSettings />
      case 'keyboard':
        return <KeyboardShortcuts />
      case 'extensions':
        return <ExtensionsSettings />
      case 'sync':
        return <SyncSettings />
      case 'about':
        return <AboutSettings />
      default:
        return <AppearanceSettings />
    }
  }

  const activeItem = sidebarItems.find((item) => item.id === activeSection)

  return (
    <div className="flex h-screen flex-col bg-[var(--bg-base)]">
      {/* Header */}
      <header className="flex h-14 items-center gap-4 border-b border-[var(--border-default)] bg-[var(--bg-elevated)] px-4">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          // onClick={() => navigate(-1)}
          onClick={() => router.back()}
        >
          <ChevronLeft size={18} />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Settings size={20} className="text-[var(--text-muted)]" />
          <span className="font-semibold text-[var(--text-primary)]">Settings</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 border-r border-[var(--border-default)] bg-[var(--bg-base)]">
          <ScrollArea className="h-full p-3">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    activeSection === item.id
                      ? "bg-[var(--bg-hover)] text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]",
                  )}
                >
                  <span className={activeSection === item.id ? "text-[var(--accent-purple)]" : ""}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Content Header */}
          <div className="border-b border-[var(--border-default)] px-6 py-4">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">{activeItem?.label}</h2>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1">
            <div className="max-w-2xl p-6">{renderContent()}</div>
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}
