"use client"
import { useState } from 'react'
import { DevToolbar, DevToolbarSection, DevToolbarButton, DevToolbarInfo, DevToolbarToggle } from '#components/ui-common/dev-bar'
import { LuLayers as Layers, LuPalette as Palette, LuSettings as Settings, LuInfo as Info, LuActivity as Activity, LuTerminal as Terminal, LuDatabase as Database } from 'react-icons/lu'
import { TbBoxAlignBottomFilled as Position } from "react-icons/tb";
import { Stack, Button, Wrap, WrapItem } from '@chakra-ui/react'

export const DemoDevBar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [pageTheme, setPageTheme] = useState<'light' | 'dark'>('dark')
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'pane'>('bottom-right')
  const [clicks, setClicks] = useState(0)
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)

  // Theme settings
  const [animations, setAnimations] = useState(true)
  const [compactMode, setCompactMode] = useState(false)
  const [soundEffects, setSoundEffects] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Layers,
      content: (
        <div>
          <DevToolbarSection title="Demo Stats" theme={theme}>
            <DevToolbarInfo label="Theme" value={theme} theme={theme} />
            <DevToolbarInfo label="Position" value={position} theme={theme} />
            <DevToolbarInfo label="Button Clicks" value={clicks} theme={theme} />
            <DevToolbarInfo label="Timestamp" value={new Date().toLocaleTimeString()} theme={theme} />
          </DevToolbarSection>

          <DevToolbarSection title="Quick Actions" theme={theme}>
            <div className="flex gap-2 flex-wrap">
              <DevToolbarButton onClick={() => setClicks(c => c + 10)} variant="primary">
                +10 Clicks
              </DevToolbarButton>
              <DevToolbarButton onClick={() => setClicks(0)} variant="danger">
                Reset
              </DevToolbarButton>
              <DevToolbarButton
                onClick={() => {
                  console.log('Refreshing data...');
                  window.location.reload();
                }}
                variant="success"
              >
                🔄 Refresh
              </DevToolbarButton>
            </div>
          </DevToolbarSection>
        </div>
      )
    },
    {
      id: 'positions',
      label: 'Positions',
      icon: Position,
      content: (
        <Stack>
          <Button size='sm' width='full' onClick={() => setIsToolbarOpen(!isToolbarOpen)}>
            {isToolbarOpen ? 'Start Closed' : 'Start Open'} on Position Change
          </Button>
        <Wrap w='full'>
          <Button size='sm' onClick={() => setPosition('top-left')}>Top Left</Button>
          <Button size='sm' onClick={() => setPosition('top-right')}>Top Right</Button>
          <Button size='sm' onClick={() => setPosition('bottom-left')}>Bottom Left</Button>
          <Button size='sm' onClick={() => setPosition('bottom-right')}>Bottom Right</Button>
          <Button size='sm' onClick={() => setPosition('pane')}>Pane Mode</Button>
        </Wrap></Stack>
      )
    },
    {
      id: 'theme',
      label: 'Theme',
      icon: Palette,
      content: (
        <div>
          <DevToolbarSection title="Appearance" theme={theme}>
            <DevToolbarToggle
              checked={theme === 'dark'}
              onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              label="Dark Mode"
              theme={theme}
            />
            <DevToolbarToggle
              checked={compactMode}
              onChange={setCompactMode}
              label="Compact Mode"
              theme={theme}
            />
            <DevToolbarToggle
              checked={animations}
              onChange={setAnimations}
              label="Animations"
              theme={theme}
            />
          </DevToolbarSection>

          <DevToolbarSection title="Behavior" theme={theme}>
            <DevToolbarToggle
              checked={soundEffects}
              onChange={setSoundEffects}
              label="Sound Effects"
              theme={theme}
            />
            <DevToolbarToggle
              checked={autoRefresh}
              onChange={setAutoRefresh}
              label="Auto Refresh"
              theme={theme}
            />
          </DevToolbarSection>
        </div>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      content: (
        <DevToolbarSection title="Configuration" theme={theme}>
          <DevToolbarInfo label="Version" value="0.2.0" theme={theme} />
          <DevToolbarInfo label="React" value="19.1.0" theme={theme} />
          <DevToolbarInfo label="Next.js" value="15.4.6" theme={theme} />
          <DevToolbarInfo label="Build" value="Production" theme={theme} />
        </DevToolbarSection>
      )
    },
    {
      id: 'console',
      label: 'Console',
      icon: Terminal,
      content: (
        <DevToolbarSection title="Activity Log" theme={theme}>
          <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', lineHeight: 1.4 }}>
            <div style={{ color: theme === 'light' ? '#6b7280' : '#9ca3af' }}>[{new Date().toLocaleTimeString()}] Page loaded</div>
            <div style={{ color: theme === 'light' ? '#2563eb' : '#60a5fa' }}>[{new Date().toLocaleTimeString()}] Theme: {theme}</div>
            <div style={{ color: theme === 'light' ? '#059669' : '#10b981' }}>[{new Date().toLocaleTimeString()}] Position: {position}</div>
            <div style={{ color: theme === 'light' ? '#d97706' : '#fbbf24' }}>[{new Date().toLocaleTimeString()}] Clicks: {clicks}</div>
          </div>
        </DevToolbarSection>
      )
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: Activity,
      content: (
        <DevToolbarSection title="Metrics" theme={theme}>
          <DevToolbarInfo label="FPS" value="60" theme={theme} />
          <DevToolbarInfo label="Memory" value="12.3 MB" theme={theme} />
          <DevToolbarInfo label="CPU" value="2%" theme={theme} />
          <DevToolbarInfo label="Network" value="Idle" theme={theme} />
        </DevToolbarSection>
      )
    },
    {
      id: 'data',
      label: 'Data',
      icon: Database,
      content: (
        <DevToolbarSection title="Application State">
          <pre className="text-xs bg-gray-900 p-2 rounded overflow-x-auto">
{JSON.stringify({
  theme,
  position,
  clicks,
  timestamp: Date.now()
}, null, 2)}
          </pre>
        </DevToolbarSection>
      )
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      content: (
        <div>
          <DevToolbarSection title="@arach/devbar">
            <div className="text-xs space-y-2">
              <p>A minimal, beautiful development toolbar for React applications.</p>
              <p className="text-gray-400">Created with ❤️ by arach</p>
            </div>
          </DevToolbarSection>

          <DevToolbarSection title="Features">
            <ul className="text-xs space-y-1">
              <li>✓ 5 positioning modes</li>
              <li>✓ Chrome DevTools-style pane</li>
              <li>✓ Resizable with drag handle</li>
              <li>✓ Light/Dark theme support</li>
              <li>✓ Keyboard shortcuts (ESC)</li>
            </ul>
          </DevToolbarSection>
        </div>
      )
    }
  ]

  return (
    <DevToolbar
      key={position}
      tabs={tabs}
      position={position}
      theme={theme}
      title="Dev bar demo"
      hideInProduction={false}
      defaultPaneHeight="500px"
      defaultOpen={isToolbarOpen}
    />
  )
}
