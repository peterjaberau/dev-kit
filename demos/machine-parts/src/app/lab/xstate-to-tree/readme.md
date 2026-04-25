# StateNodeComponent

- Node Header
- Node Content (Not Expanded)
  - hasChildren --> collapse/expand
  - name --> Text "Machine name"
  - description --> Text "Machine description"
  - isInitial --> Badge "Initial"
  - hasChildren  ---> Badge "6 children"
  - hasEdges --> Badge "3 transitions"
  - tags --> Badge ["tag1", "tag2", "tag3"]
  - entryActions --> Button ["entryAction1", "entryAction2"]
  - exitActions --> Button ["exitAction1", "exitAction2"]
  - Invokes --> Button ["invoke1", "invoke2"] (src + id)
  - Meta --> Code "meta" (array, json or string)


- Node Content (Expanded)
  - edges (iterate edges)
    - ******TransitionEdgeComponent
      - eventType --> Text
      - hasGuard --> Badge "Guard"
      - hasActions --> Badge ["actionType 1", "actionType 2"]


  - hasChildren (iterate children)
    - *****Node Content (Not Expanded)