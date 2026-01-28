"use client"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { EditorSettings } from '../types'

const SETTINGS_STORAGE_KEY = 'editorx-settings'

const DEFAULT_SETTINGS: EditorSettings = {
  theme: 'dark',
  fontSize: 14,
  fontFamily: '"JetBrains Mono", "Fira Code", monospace',
  tabSize: 2,
  lineNumbers: true,
  wordWrap: false,
  minimap: false,
  bracketPairColorization: true,
  autoSave: true,
  autoSaveDelay: 1000,
}

interface SettingsContextValue {
  settings: EditorSettings
  updateSettings: (updates: Partial<EditorSettings>) => void
  resetSettings: () => void
}

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined
)

function getStoredSettings(): EditorSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS

  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<EditorSettings>
      return { ...DEFAULT_SETTINGS, ...parsed }
    }
  } catch {
    // Invalid JSON, return defaults
  }

  return DEFAULT_SETTINGS
}

interface SettingsProviderProps {
  children: ReactNode
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<EditorSettings>(getStoredSettings)

  // Persist settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // localStorage might be full or unavailable
    }
  }, [settings])

  const updateSettings = useCallback((updates: Partial<EditorSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }, [])

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
  }, [])

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
