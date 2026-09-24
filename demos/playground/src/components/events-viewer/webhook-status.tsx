import type { BadgeProps, ColorPalette } from '@chakra-ui/react'
import { Badge, Status } from '@chakra-ui/react'
import type { Webhook } from './data'

const webhookStatusConfig: Record<Webhook['status'], { color: ColorPalette; label: string }> = {
  active: { color: 'green', label: 'Active' },
  inactive: { color: 'gray', label: 'Inactive' },
  failing: { color: 'red', label: 'Failing' },
}

interface WebhookStatusProps extends Status.RootProps {
  status: Webhook['status']
  hideLabel?: boolean
}

export const WebhookStatus = (props: WebhookStatusProps) => {
  const { status, hideLabel, ...rest } = props
  const { color } = webhookStatusConfig[status]
  return (
    <Status.Root colorPalette={color} textTransform="capitalize" {...rest}>
      <Status.Indicator />
      {hideLabel ? null : status}
    </Status.Root>
  )
}

interface WebhookStatusBadgeProps extends BadgeProps {
  status: Webhook['status']
}

export const WebhookStatusBadge = (props: WebhookStatusBadgeProps) => {
  const { status, ...rest } = props
  const { color, label } = webhookStatusConfig[status]
  return (
    <Badge variant="subtle" colorPalette={color} {...rest}>
      {label}
    </Badge>
  )
}

const statusCodeColor = (code: number | null): ColorPalette => {
  if (!code) return 'gray'
  if (code >= 200 && code < 300) return 'green'
  if (code >= 400) return 'red'
  return 'yellow'
}

interface WebhookStatusCodeBadgeProps extends BadgeProps {
  code: number | null
}

export const WebhookStatusCodeBadge = (props: WebhookStatusCodeBadgeProps) => {
  const { code, ...rest } = props
  return (
    <Badge variant="subtle" size="sm" colorPalette={statusCodeColor(code)} {...rest}>
      {code ?? '—'}
    </Badge>
  )
}
