```json

{
  "dragTeeState": [
    "idle",
    "is-dragging",
    "preview",
    "is-dragging-over"
  ],
  "dragTreeItemState": [
    "idle",
    "dragging",
    "preview",
    "parent-of-instruction"
  ],
  "treeProps": [
    "draggable",
    "canDrop",
    "canSelect",
    "blockInstructions"
  ],
  "TreeContext": [
    "isOpen",
    "isCurrent"
  ],
  "treeItemProps": [
    "parentOf"
  ],
  "instruction": {
    "id": null,
    "operations": {
      "combine": ["blocked", "available"],
      "reorder-above": ["available", "not-available"],
      "reorder-below": ["available", "not-available"],
      "make-child": ["available", "not-available"],
      "reparent": ["available", "not-available"]
    }
  },
  "instruction": {
    "input": null,
    "element": null,
    "operations": {
      "? isDraft = true": {
        "combine": [
          "blocked"
        ]
      }
    }
  }
}


```
"reorder-above",
"reorder-below",
"make-child",
"reparent"
