export interface Webhook {
  id: string
  name: string
  url: string
  description?: string
  events: string[]
  status: 'active' | 'inactive' | 'failing'
  secret?: string
  lastTriggered: string | null
  createdAt: string
  successRate?: number
  totalDeliveries?: number
  avgLatency?: number
}

export interface WebhookEvent {
  id: string
  webhookId: string
  event: string
  status: 'success' | 'failed' | 'pending'
  statusCode: number | null
  latency: number | null
  timestamp: string
  requestBody?: string
  responseBody?: string
  requestHeaders?: Record<string, string>
  responseHeaders?: Record<string, string>
  attempts: number
  nextRetry?: string | null
}

export interface DeliveryMetric {
  date: string
  deliveries: number
  color: 'green.solid' | 'red.solid'
}

export const webhookDeliveryMetrics: DeliveryMetric[] = [
  { date: '2025-02-28', deliveries: 4, color: 'green.solid' },
  { date: '2025-03-01', deliveries: 3, color: 'green.solid' },
  { date: '2025-03-02', deliveries: 5, color: 'green.solid' },
  { date: '2025-03-03', deliveries: 2, color: 'green.solid' },
  { date: '2025-03-04', deliveries: 4, color: 'green.solid' },
  { date: '2025-03-05', deliveries: 1, color: 'red.solid' },
  { date: '2025-03-06', deliveries: 3, color: 'green.solid' },
  { date: '2025-03-07', deliveries: 5, color: 'green.solid' },
  { date: '2025-03-08', deliveries: 4, color: 'green.solid' },
  { date: '2025-03-09', deliveries: 2, color: 'green.solid' },
  { date: '2025-03-10', deliveries: 3, color: 'green.solid' },
  { date: '2025-03-11', deliveries: 1, color: 'red.solid' },
  { date: '2025-03-12', deliveries: 4, color: 'green.solid' },
  { date: '2025-03-13', deliveries: 3, color: 'green.solid' },
]

export const webhooks: Webhook[] = [
  {
    id: 'wh_001',
    name: 'Payment Events',
    url: 'https://api.example.com/webhooks/payments',
    description: 'Receives payment lifecycle events including charges, refunds, and disputes.',
    events: ['payment.success', 'payment.failed', 'refund.created'],
    status: 'active',
    secret: 'whsec_abc123def456ghi789',
    lastTriggered: '2 minutes ago',
    createdAt: 'Jan 5, 2025',
    successRate: 99.8,
    totalDeliveries: 12847,
    avgLatency: 142,
  },
  {
    id: 'wh_002',
    name: 'User Signup',
    url: 'https://hooks.slack.com/services/T00/B00/xxxx',
    description: 'Notifies Slack channel when a new user signs up.',
    events: ['user.created'],
    status: 'active',
    secret: 'whsec_jkl012mno345pqr678',
    lastTriggered: '1 hour ago',
    createdAt: 'Jan 10, 2025',
    successRate: 100,
    totalDeliveries: 3421,
    avgLatency: 98,
  },
  {
    id: 'wh_003',
    name: 'Order Updates',
    url: 'https://api.example.com/webhooks/orders',
    description: 'Tracks order lifecycle from creation through fulfillment.',
    events: ['order.created', 'order.updated', 'order.shipped', 'order.delivered'],
    status: 'failing',
    secret: 'whsec_stu901vwx234yz567',
    lastTriggered: '3 days ago',
    createdAt: 'Dec 20, 2024',
    successRate: 45.2,
    totalDeliveries: 8934,
    avgLatency: 312,
  },
  {
    id: 'wh_004',
    name: 'Analytics Reports',
    url: 'https://api.example.com/webhooks/analytics',
    description: 'Delivers generated analytics reports to your endpoint.',
    events: ['report.generated'],
    status: 'inactive',
    secret: 'whsec_abc890def123ghi456',
    lastTriggered: null,
    createdAt: 'Nov 15, 2024',
    successRate: 0,
    totalDeliveries: 0,
    avgLatency: 0,
  },
  {
    id: 'wh_005',
    name: 'Invoice Notifications',
    url: 'https://billing.example.com/hooks/invoices',
    description: 'Sends invoice events for billing automation.',
    events: ['invoice.created', 'invoice.paid', 'invoice.overdue'],
    status: 'active',
    secret: 'whsec_mno789pqr012stu345',
    lastTriggered: '15 minutes ago',
    createdAt: 'Feb 1, 2025',
    successRate: 98.5,
    totalDeliveries: 2156,
    avgLatency: 156,
  },
]

export const webhookEvents: WebhookEvent[] = [
  {
    id: 'evt_001',
    webhookId: 'wh_001',
    event: 'payment.success',
    status: 'success',
    statusCode: 200,
    latency: 124,
    timestamp: 'Mar 6, 2025 14:32:01',
    requestBody: JSON.stringify(
      {
        id: 'pay_abc123',
        amount: 9900,
        currency: 'usd',
        status: 'succeeded',
        customer: 'cus_xyz789',
      },
      null,
      2,
    ),
    responseBody: JSON.stringify({ received: true }, null, 2),
    requestHeaders: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': 'sha256=abc123...',
      'X-Webhook-ID': 'evt_001',
    },
    responseHeaders: {
      'Content-Type': 'application/json',
    },
    attempts: 1,
    nextRetry: null,
  },
  {
    id: 'evt_002',
    webhookId: 'wh_001',
    event: 'payment.failed',
    status: 'failed',
    statusCode: 500,
    latency: 3021,
    timestamp: 'Mar 6, 2025 14:28:45',
    requestBody: JSON.stringify(
      {
        id: 'pay_def456',
        amount: 4500,
        currency: 'usd',
        status: 'failed',
        error: 'card_declined',
      },
      null,
      2,
    ),
    responseBody: JSON.stringify({ error: 'Internal Server Error' }, null, 2),
    requestHeaders: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': 'sha256=def456...',
      'X-Webhook-ID': 'evt_002',
    },
    responseHeaders: {
      'Content-Type': 'application/json',
    },
    attempts: 3,
    nextRetry: 'Mar 6, 2025 15:28:45',
  },
  {
    id: 'evt_003',
    webhookId: 'wh_001',
    event: 'refund.created',
    status: 'success',
    statusCode: 200,
    latency: 89,
    timestamp: 'Mar 6, 2025 13:15:22',
    requestBody: JSON.stringify(
      {
        id: 'ref_ghi789',
        payment: 'pay_abc123',
        amount: 9900,
        reason: 'customer_request',
      },
      null,
      2,
    ),
    responseBody: JSON.stringify({ received: true }, null, 2),
    requestHeaders: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': 'sha256=ghi789...',
      'X-Webhook-ID': 'evt_003',
    },
    responseHeaders: {
      'Content-Type': 'application/json',
    },
    attempts: 1,
    nextRetry: null,
  },
  {
    id: 'evt_004',
    webhookId: 'wh_002',
    event: 'user.created',
    status: 'success',
    statusCode: 200,
    latency: 210,
    timestamp: 'Mar 6, 2025 12:45:00',
    requestBody: JSON.stringify(
      {
        id: 'usr_jkl012',
        email: 'jane@example.com',
        name: 'Jane Doe',
        plan: 'pro',
      },
      null,
      2,
    ),
    responseBody: JSON.stringify({ ok: true }, null, 2),
    requestHeaders: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': 'sha256=jkl012...',
      'X-Webhook-ID': 'evt_004',
    },
    responseHeaders: {
      'Content-Type': 'application/json',
    },
    attempts: 1,
    nextRetry: null,
  },
  {
    id: 'evt_005',
    webhookId: 'wh_003',
    event: 'order.created',
    status: 'failed',
    statusCode: 502,
    latency: 5000,
    timestamp: 'Mar 3, 2025 09:12:33',
    requestBody: JSON.stringify(
      {
        id: 'ord_mno345',
        total: 15900,
        items: 3,
        customer: 'cus_pqr678',
      },
      null,
      2,
    ),
    responseBody: JSON.stringify({ error: 'Bad Gateway' }, null, 2),
    requestHeaders: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': 'sha256=mno345...',
      'X-Webhook-ID': 'evt_005',
    },
    responseHeaders: {},
    attempts: 3,
    nextRetry: null,
  },
  {
    id: 'evt_006',
    webhookId: 'wh_001',
    event: 'payment.success',
    status: 'success',
    statusCode: 200,
    latency: 156,
    timestamp: 'Mar 6, 2025 11:20:15',
    requestBody: JSON.stringify(
      {
        id: 'pay_stu901',
        amount: 2500,
        currency: 'usd',
        status: 'succeeded',
      },
      null,
      2,
    ),
    responseBody: JSON.stringify({ received: true }, null, 2),
    requestHeaders: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': 'sha256=stu901...',
      'X-Webhook-ID': 'evt_006',
    },
    responseHeaders: {
      'Content-Type': 'application/json',
    },
    attempts: 1,
    nextRetry: null,
  },
  {
    id: 'evt_007',
    webhookId: 'wh_005',
    event: 'invoice.paid',
    status: 'success',
    statusCode: 200,
    latency: 98,
    timestamp: 'Mar 6, 2025 10:05:44',
    requestBody: JSON.stringify(
      {
        id: 'inv_vwx234',
        amount: 9900,
        customer: 'cus_yz567',
        paid: true,
      },
      null,
      2,
    ),
    responseBody: JSON.stringify({ received: true }, null, 2),
    requestHeaders: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': 'sha256=vwx234...',
      'X-Webhook-ID': 'evt_007',
    },
    responseHeaders: {
      'Content-Type': 'application/json',
    },
    attempts: 1,
    nextRetry: null,
  },
  {
    id: 'evt_008',
    webhookId: 'wh_003',
    event: 'order.shipped',
    status: 'pending',
    statusCode: null,
    latency: null,
    timestamp: 'Mar 6, 2025 14:35:00',
    requestBody: JSON.stringify(
      {
        id: 'ord_abc890',
        tracking: 'TRK123456789',
        carrier: 'fedex',
      },
      null,
      2,
    ),
    responseBody: undefined,
    requestHeaders: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': 'sha256=abc890...',
      'X-Webhook-ID': 'evt_008',
    },
    responseHeaders: {},
    attempts: 1,
    nextRetry: 'Mar 6, 2025 14:40:00',
  },
  {
    id: 'evt_009',
    webhookId: 'wh_001',
    event: 'payment.success',
    status: 'success',
    statusCode: 200,
    latency: 112,
    timestamp: 'Mar 6, 2025 09:45:12',
    requestBody: JSON.stringify(
      { id: 'pay_evt009', amount: 7500, currency: 'usd', status: 'succeeded' },
      null,
      2,
    ),
    responseBody: JSON.stringify({ received: true }, null, 2),
    requestHeaders: { 'Content-Type': 'application/json', 'X-Webhook-ID': 'evt_009' },
    responseHeaders: { 'Content-Type': 'application/json' },
    attempts: 1,
    nextRetry: null,
  },
  {
    id: 'evt_010',
    webhookId: 'wh_002',
    event: 'user.created',
    status: 'success',
    statusCode: 200,
    latency: 178,
    timestamp: 'Mar 5, 2025 16:22:08',
    requestBody: JSON.stringify(
      { id: 'usr_evt010', email: 'bob@example.com', name: 'Bob Smith', plan: 'free' },
      null,
      2,
    ),
    responseBody: JSON.stringify({ ok: true }, null, 2),
    requestHeaders: { 'Content-Type': 'application/json', 'X-Webhook-ID': 'evt_010' },
    responseHeaders: { 'Content-Type': 'application/json' },
    attempts: 1,
    nextRetry: null,
  },
  {
    id: 'evt_011',
    webhookId: 'wh_003',
    event: 'order.created',
    status: 'success',
    statusCode: 200,
    latency: 245,
    timestamp: 'Mar 5, 2025 11:30:00',
    requestBody: JSON.stringify(
      { id: 'ord_evt011', total: 4200, items: 2, customer: 'cus_evt011' },
      null,
      2,
    ),
    responseBody: JSON.stringify({ received: true }, null, 2),
    requestHeaders: { 'Content-Type': 'application/json', 'X-Webhook-ID': 'evt_011' },
    responseHeaders: { 'Content-Type': 'application/json' },
    attempts: 1,
    nextRetry: null,
  },
  {
    id: 'evt_012',
    webhookId: 'wh_001',
    event: 'payment.failed',
    status: 'failed',
    statusCode: 503,
    latency: 8000,
    timestamp: 'Mar 5, 2025 08:15:42',
    requestBody: JSON.stringify(
      { id: 'pay_evt012', amount: 12000, currency: 'usd', status: 'failed' },
      null,
      2,
    ),
    responseBody: JSON.stringify({ error: 'Service Unavailable' }, null, 2),
    requestHeaders: { 'Content-Type': 'application/json', 'X-Webhook-ID': 'evt_012' },
    responseHeaders: {},
    attempts: 2,
    nextRetry: null,
  },
  {
    id: 'evt_013',
    webhookId: 'wh_005',
    event: 'invoice.paid',
    status: 'success',
    statusCode: 200,
    latency: 134,
    timestamp: 'Mar 4, 2025 14:00:22',
    requestBody: JSON.stringify(
      { id: 'inv_evt013', amount: 19900, customer: 'cus_evt013', paid: true },
      null,
      2,
    ),
    responseBody: JSON.stringify({ received: true }, null, 2),
    requestHeaders: { 'Content-Type': 'application/json', 'X-Webhook-ID': 'evt_013' },
    responseHeaders: { 'Content-Type': 'application/json' },
    attempts: 1,
    nextRetry: null,
  },
  {
    id: 'evt_014',
    webhookId: 'wh_003',
    event: 'order.shipped',
    status: 'success',
    statusCode: 200,
    latency: 189,
    timestamp: 'Mar 4, 2025 10:45:33',
    requestBody: JSON.stringify(
      { id: 'ord_evt014', tracking: 'TRK987654321', carrier: 'ups' },
      null,
      2,
    ),
    responseBody: JSON.stringify({ received: true }, null, 2),
    requestHeaders: { 'Content-Type': 'application/json', 'X-Webhook-ID': 'evt_014' },
    responseHeaders: { 'Content-Type': 'application/json' },
    attempts: 1,
    nextRetry: null,
  },
  {
    id: 'evt_015',
    webhookId: 'wh_001',
    event: 'refund.created',
    status: 'success',
    statusCode: 200,
    latency: 95,
    timestamp: 'Mar 3, 2025 17:20:15',
    requestBody: JSON.stringify(
      { id: 'ref_evt015', payment: 'pay_evt009', amount: 2500, reason: 'duplicate' },
      null,
      2,
    ),
    responseBody: JSON.stringify({ received: true }, null, 2),
    requestHeaders: { 'Content-Type': 'application/json', 'X-Webhook-ID': 'evt_015' },
    responseHeaders: { 'Content-Type': 'application/json' },
    attempts: 1,
    nextRetry: null,
  },
]

export interface WebhookDelivery {
  id: string
  endpoint: string
  eventType: string
  status: WebhookEvent['status']
  statusCode: number | null
  duration: string
  timestamp: string
}

export const webhookDeliveries: WebhookDelivery[] = webhookEvents.map((e) => {
  const webhook = webhooks.find((w) => w.id === e.webhookId)
  const url = webhook?.url ?? ''
  const endpoint = url.replace(/^https?:\/\//, '')
  return {
    id: e.id,
    endpoint,
    eventType: e.event,
    status: e.status,
    statusCode: e.statusCode,
    duration: e.latency ? `${e.latency}ms` : '—',
    timestamp: e.timestamp,
  }
})

export const availableEvents = [
  { group: 'Payment', events: ['payment.success', 'payment.failed', 'payment.refunded'] },
  { group: 'User', events: ['user.created', 'user.updated', 'user.deleted'] },
  {
    group: 'Order',
    events: ['order.created', 'order.updated', 'order.shipped', 'order.delivered'],
  },
  { group: 'Invoice', events: ['invoice.created', 'invoice.paid', 'invoice.overdue'] },
  { group: 'Report', events: ['report.generated', 'report.failed'] },
  {
    group: 'Subscription',
    events: ['subscription.created', 'subscription.cancelled', 'subscription.renewed'],
  },
]

export const deliveryEventTypes = [...new Set(webhookDeliveries.map((d) => d.eventType))].sort()

export const deliveryStatusFilterOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'success', label: 'Success (2xx)' },
  { value: 'error', label: 'Error (4xx / 5xx)' },
] as const

export const timeRangeFilterOptions = [
  { value: '1h', label: 'Last 1 hour' },
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
] as const

export const testEventTypes = availableEvents.flatMap((g) => g.events)
