import type { BadgeProps, ColorPalette } from '@chakra-ui/react'
import { Badge, Icon, Status, Timeline } from '@chakra-ui/react'
import { LuCheck, LuCircleAlert, LuLoader } from 'react-icons/lu'
import type { WebhookEvent } from './data'

const webhookEventStatusConfig: Record<
  WebhookEvent['status'],
  { color: ColorPalette; label: string; icon: React.ElementType }
> = {
  success: { color: 'green', label: 'Delivered', icon: LuCheck },
  failed: { color: 'red', label: 'Failed', icon: LuCircleAlert },
  pending: { color: 'yellow', label: 'Pending', icon: LuLoader },
}

interface WebhookEventStatusIconProps {
  status: WebhookEvent['status']
}

export const WebhookEventStatusIcon = (props: WebhookEventStatusIconProps) => {
  const { status } = props
  const config = webhookEventStatusConfig[status]
  return <config.icon />
}

export const WebhookEventStatusIconWithColor = (props: WebhookEventStatusIconProps) => {
  const { status } = props
  const config = webhookEventStatusConfig[status]
  const StatusIcon = config.icon
  return (
    <Icon color={`${config.color}.fg`}>
      <StatusIcon />
    </Icon>
  )
}

interface WebhookEventStatusIndicatorProps {
  status: WebhookEvent['status']
}

export const WebhookEventStatusIndicator = (props: WebhookEventStatusIndicatorProps) => {
  const { status } = props
  const config = webhookEventStatusConfig[status]
  return (
    <Timeline.Indicator colorPalette={config.color}>
      <WebhookEventStatusIcon status={status} />
    </Timeline.Indicator>
  )
}

interface WebhookEventStatusProps extends Status.RootProps {
  status: WebhookEvent['status']
  statusCode?: number | null
  hideLabel?: boolean
}

export const WebhookEventStatus = (props: WebhookEventStatusProps) => {
  const { status, statusCode, hideLabel, ...rest } = props
  const { color, label } = webhookEventStatusConfig[status]
  const display = statusCode != null ? String(statusCode) : label
  return (
    <Status.Root colorPalette={color} size="sm" {...rest}>
      <Status.Indicator />
      {hideLabel ? null : display}
    </Status.Root>
  )
}

interface WebhookEventStatusBadgeProps extends BadgeProps {
  status: WebhookEvent['status']
}

export const WebhookEventStatusBadge = (props: WebhookEventStatusBadgeProps) => {
  const { status, ...rest } = props
  const { color, label } = webhookEventStatusConfig[status]
  return (
    <Badge variant="subtle" colorPalette={color} {...rest}>
      {label}
    </Badge>
  )
}
