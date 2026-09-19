import { assign, enqueueActions, setup } from "xstate"

export type EventSubscriptions = Record<string, string[]>

const defaultSubscriptions: EventSubscriptions = {
  "dockview.*": ["desktop"],
}

const matchesEvent = (subscription: string, eventType: string) =>
  subscription === eventType || (subscription.endsWith("*") && eventType.startsWith(subscription.slice(0, -1)))

export const eventsMachine = setup({
  actions: {
    subscribe: assign(({ context, event }: any) => {
      const subscriptions = { ...context.subscriptions }
      for (const eventType of event.params.eventTypes) {
        subscriptions[eventType] = Array.from(new Set([...(subscriptions[eventType] ?? []), event.params.systemId]))
      }
      return { subscriptions }
    }),
    unsubscribe: assign(({ context, event }: any) => {
      const subscriptions = { ...context.subscriptions }
      for (const eventType of event.params.eventTypes) {
        subscriptions[eventType] = (subscriptions[eventType] ?? []).filter(
          (systemId: string) => systemId !== event.params.systemId,
        )
        if (!subscriptions[eventType].length) delete subscriptions[eventType]
      }
      return { subscriptions }
    }),
    routeInspectedEvent: enqueueActions(({ context, event, system, enqueue }: any) => {
      const routedEvent = event.params.event
      const systemIds = new Set<string>()

      for (const [subscription, subscribers] of Object.entries(context.subscriptions) as [string, string[]][]) {
        if (matchesEvent(subscription, routedEvent.type)) subscribers.forEach((systemId) => systemIds.add(systemId))
      }

      for (const systemId of systemIds) {
        const target = system.get(systemId)
        if (target) enqueue.sendTo(target, routedEvent)
      }
    }),
  },
}).createMachine({
  id: "events",
  initial: "ready",
  context: ({ input }: any) => ({
    subscriptions: {
      ...defaultSubscriptions,
      ...(input?.subscriptions ?? {}),
    } as EventSubscriptions,
  }),
  states: {
    ready: {
      on: {
        "events.inspected": { actions: "routeInspectedEvent" },
        "events.subscribe": { actions: "subscribe" },
        "events.unsubscribe": { actions: "unsubscribe" },
      },
    },
  },
})
