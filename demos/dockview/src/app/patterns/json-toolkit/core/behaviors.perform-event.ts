import { defaultKeyGenerator } from "./utils"
import { abstractBehaviors } from "./behaviors.abstract"
import { isAbstractBehaviorEvent, isCustomBehaviorEvent, isNativeBehaviorEvent } from "./behaviors.types"

function eventCategory(event: BehaviorEvent) {
  return isNativeBehaviorEvent(event)
    ? "native"
    : isAbstractBehaviorEvent(event)
      ? "synthetic"
      : isCustomBehaviorEvent(event)
        ? "custom"
        : "synthetic"
}

export function performEvent({
  mode,
  behaviors,
  remainingEventBehaviors,
  event,
  editor,
  converters,
  keyGenerator,
  readOnly,
  schema,
  nativeEvent,
  sendBack,
}) {
  const eventBehaviors = [...remainingEventBehaviors, ...abstractBehaviors].filter((behavior) => {
    // Catches all events
    if (behavior.on === "*") {
      return true
    }

    const [listenedNamespace] =
      behavior.on.includes("*") && behavior.on.includes(".") ? behavior.on.split(".") : [undefined]
    const [eventNamespace] = event.type.includes(".") ? event.type.split(".") : [undefined]

    // Handles scenarios like a Behavior listening for `select.*` and the event
    // `select.block` is fired.
    if (listenedNamespace !== undefined && eventNamespace !== undefined && listenedNamespace === eventNamespace) {
      return true
    }

    // Handles scenarios like a Behavior listening for `select.*` and the event
    // `select` is fired.
    if (listenedNamespace !== undefined && eventNamespace === undefined && listenedNamespace === event.type) {
      return true
    }

    return behavior.on === event.type
  })
}
