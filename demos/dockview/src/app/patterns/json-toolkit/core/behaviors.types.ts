export const defineBehavior = (behavior) => {
  return behavior
}

/** actions */

export const execute = (event) => {
  return { type: "execute", event }
}

export const forward = (event) => {
  return { type: "forward", event }
}

export const raise = (event) => {
  return { type: "raise", event }
}

export const effect = (effect) => {
  return { type: "effect", effect }
}


/** events */

export const syntheticBehaviorEventTypes = [
  "annotation.add",
  "annotation.remove",
  "block.set",
  "block.unset",
  "child.set",
  "child.unset",
  "decorator.add",
  "decorator.remove",
  "delete",
  "history.redo",
  "history.undo",
  "insert.block",
  "insert.child",
  "insert.text",
  "move.backward",
  "move.block",
  "move.forward",
  "select",
] as const

export const abstractBehaviorEventTypes = [
  "annotation.set",
  "annotation.toggle",
  "decorator.toggle",
  "delete.backward",
  "delete.block",
  "delete.child",
  "delete.forward",
  "delete.text",
  "deserialize",
  "deserialize.data",
  "deserialization.success",
  "deserialization.failure",
  "insert.blocks",
  "insert.break",
  "insert.inline object",
  "insert.soft break",
  "insert.span",
  "list item.add",
  "list item.remove",
  "list item.toggle",
  "move.block down",
  "move.block up",
  "select.block",
  "select.previous block",
  "select.next block",
  "serialize",
  "serialize.data",
  "serialization.success",
  "serialization.failure",
  "split",
  "style.add",
  "style.remove",
  "style.toggle",
] as const

export const isSyntheticBehaviorEvent = (event) => {
  return !isCustomBehaviorEvent(event) && !isNativeBehaviorEvent(event) && !isAbstractBehaviorEvent(event)
}

export const isAbstractBehaviorEvent = (event) => {
  return abstractBehaviorEventTypes.includes(event.type)
}

export const nativeBehaviorEventTypes = [
  "clipboard.copy",
  "clipboard.cut",
  "clipboard.paste",
  "drag.dragstart",
  "drag.drag",
  "drag.dragend",
  "drag.dragenter",
  "drag.dragover",
  "drag.dragleave",
  "drag.drop",
  "input.*",
  "keyboard.keydown",
  "keyboard.keyup",
  "mouse.click",
]

export const isNativeBehaviorEvent = (event) => {
  return nativeBehaviorEventTypes.includes(event.type)
}

export const isCustomBehaviorEvent = (event) => {
  return event.type.startsWith("custom.")
}
