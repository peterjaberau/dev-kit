"use client"
import { useState, type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../ui/dialog'
import { Button } from '../../ui/button'
import {
  BrandGithub,
  BrandNpm,
  BrandDocker,
  BrandVercel,
  BrandAws,
  BrandSlack,
} from '../../ui/icons'
import { cn } from '../../../lib/utils'

// ============================================
// Types
// ============================================

interface IntegrationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Integration {
  id: string
  name: string
  description: string
  icon: ReactNode
  color: string
  isConnected: boolean
}

// ============================================
// Default Integrations
// ============================================

const defaultIntegrations: Integration[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connect your GitHub repositories',
    icon: <BrandGithub size={24} />,
    color: 'bg-[#24292e]',
    isConnected: false,
  },
  {
    id: 'npm',
    name: 'npm',
    description: 'Manage npm packages',
    icon: <BrandNpm size={24} />,
    color: 'bg-[#CB3837]',
    isConnected: false,
  },
  {
    id: 'docker',
    name: 'Docker',
    description: 'Build and deploy containers',
    icon: <BrandDocker size={24} />,
    color: 'bg-[#2496ED]',
    isConnected: false,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy to the edge network',
    icon: <BrandVercel size={24} />,
    color: 'bg-[#000000]',
    isConnected: false,
  },
  {
    id: 'aws',
    name: 'AWS',
    description: 'Amazon Web Services integration',
    icon: <BrandAws size={24} />,
    color: 'bg-[#FF9900]',
    isConnected: false,
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications in Slack',
    icon: <BrandSlack size={24} />,
    color: 'bg-[#4A154B]',
    isConnected: false,
  },
]

// ============================================
// IntegrationCard Component
// ============================================

interface IntegrationCardProps {
  integration: Integration
  onToggleConnect: (id: string) => void
}

function IntegrationCard({
  integration,
  onToggleConnect,
}: IntegrationCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border border-[var(--border-default)] p-4',
        'bg-[var(--bg-base)] transition-colors hover:border-[var(--border-hover)]'
      )}
    >
      <div className="mb-3 flex items-start justify-between">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-lg text-white',
            integration.color
          )}
        >
          {integration.icon}
        </div>
        <div
          className={cn(
            'flex h-2 w-2 rounded-full',
            integration.isConnected
              ? 'bg-[var(--color-success-500)]'
              : 'bg-[var(--text-muted)]'
          )}
          title={integration.isConnected ? 'Connected' : 'Not connected'}
        />
      </div>

      <h4 className="mb-1 text-sm font-medium text-[var(--text-primary)]">
        {integration.name}
      </h4>
      <p className="mb-4 flex-1 text-xs text-[var(--text-secondary)]">
        {integration.description}
      </p>

      <Button
        variant={integration.isConnected ? 'outline' : 'default'}
        size="sm"
        onClick={() => onToggleConnect(integration.id)}
        className="w-full"
      >
        {integration.isConnected ? 'Disconnect' : 'Connect'}
      </Button>
    </div>
  )
}

// ============================================
// IntegrationDialog Component
// ============================================

export function IntegrationDialog({
  open,
  onOpenChange,
}: IntegrationDialogProps) {
  const [integrations, setIntegrations] =
    useState<Integration[]>(defaultIntegrations)

  const handleToggleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id ? { ...int, isConnected: !int.isConnected } : int
      )
    )
  }

  const connectedCount = integrations.filter((i) => i.isConnected).length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Integrations</DialogTitle>
          <DialogDescription>
            Connect your favorite tools and services.{' '}
            {connectedCount > 0 && (
              <span className="text-[var(--color-success-500)]">
                {connectedCount} connected
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 px-3 py-4 sm:grid-cols-3">
          {integrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onToggleConnect={handleToggleConnect}
            />
          ))}
        </div>

        <p className="text-center text-xs text-[var(--text-muted)]">
          More integrations coming soon
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default IntegrationDialog
