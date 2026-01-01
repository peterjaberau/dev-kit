/*
ui/drag-drop
 */
export const DraggableItem = ({ id, index, mode = "list", children, getData, onDragStart, onDrop }: any) => {
  return <></>
}
export const DropTargetItem = () => {
  return <></>
}

/*
navigation/drag-drop
 */
//draggable-label-item
export const DraggableLabelItem = () => {
  return <></>
}

// draggable-sidebar-item
export const DraggableSidebarProject = () => {
  return <></>
}
export const DraggableSidebarGroup = () => {
  return <></>
}

// drop-target-label-item
export const DropTargetLabelItem = () => {
  return <></>
}

// drop-target-sidebar-item
export const DropTargetSidebarProject = () => {
  return <></>
}
export const DropTargetSidebarGroup = () => {
  return <></>
}

// ui/draggable-wrapper
export const DraggableWrapper = () => {
  return <></>
}

// ui/drop-target-wrapper
export const DropTargetWrapper = () => {
  return <></>
}

/*
navigation
 */
export const DraggableProjectGroupItem = () => {
  return <></>
}
export const DraggableProjectItem = () => {
  return <></>
}
export const ProjectGroupItem = () => {
  return <></>
}

/*
  Hooks
 */
export const useDragAndDrop = () => {}
export const useLabelDragDrop = () => {
  return {}
}
export const useResetSortOnDrag = () => {
  return {}
}
export const useSidebarDragDrop = () => {
  return {}
}

/*
  utils
 */
//drag-and-drop
export const extractDropPayload = () => {}
export const calculateInsertIndex = () => {}
export const reorderItems = () => {}
export const calculateReorderIndex = () => {}

//array-operations
export const reorderInArray = () => {}
export const removeFromArray = () => {}
export const insertAtIndex = () => {}
export const moveItemBetweenArrays = () => {}
export const moveItemToIndex = () => {}

//group-utils
export const findGroupById = () => {}
export const collectProjectIdsFromGroup = () => {}
export const getAllGroupsFlat = () => {}
export const resolveGroup = () => {}

//object-utils
export const isPlainObject = () => {}
export const clearNullValues = () => {}
export const mergeDeep = () => {}

/*
  lib
 */
// dnd/active-target-bus
export const beginDragIfNeeded = () => {}
export const broadcastActiveTarget = () => {}
export const subscribeActiveTarget = () => {}

//label
export const findContainingLabel = () => {}
export const resolveLabelTargetLocation = () => {}
export const calculateLabelMove = () => {}
export const isValidLabelOperation = () => {}
export const validateLabelDrop = () => {}

//sidebar
export const findContainingGroup = () => {}
export const getGroupById = () => {}
export const findGroupByIdRecursive = () => {}
export const resolveTargetLocation = () => {}
export const calculateMove = () => {}
export const isValidSidebarOperation = () => {}
export const validateDrop = () => {}

//core
export const allGroupsAtom = () => {}
export const projectGroupsAtom = () => {}
export const labelGroupsAtom = () => {}
export const addProjectGroupAtom = () => {}
export const updateProjectGroupAtom = () => {}
export const deleteProjectGroupAtom = () => {}
export const findProjectGroupByIdAtom = () => {}
export const flattenProjectGroupsAtom = () => {}
export const projectsInGroupsAtom = () => {}
export const addProjectToGroupAtom = () => {}
export const removeProjectFromGroupAtom = () => {}
export const moveProjectBetweenGroupsAtom = () => {}
export const moveProjectToGroupAtom = () => {}
export const removeProjectFromGroupWithIndexAtom = () => {}
export const projectGroupTreeAtom = () => {}
export const projectGroupBreadcrumbsAtom = () => {}
export const projectGroupProjectCountAtom = () => {}
export const groupAnalysisAtom = () => {}
export const reorderProjectWithinGroupAtom = () => {}
export const reorderProjectWithinRootAtom = () => {}
export const reorderGroupAtom = () => {}
export const findGroupContainingProjectAtom = () => {}
export const rootProjectGroupsAtom = () => {}

export const labelsMapAtom = () => {}
export const labelByIdAtom = () => {}
export const labelByNameAtom = () => {}
export const labelNamesFromIdsAtom = () => {}
export const labelsFromIdsAtom = () => {}
export const addLabelAtom = () => {}
export const addLabelAndWaitForRealIdAtom = () => {}
export const updateLabelAtom = () => {}
export const deleteLabelAtom = () => {}
export const reorderLabelsAtom = () => {}
export const labelAtoms = () => {}

export const currentProjectIdAtom = () => {}
export const inboxProjectAtom = () => {}
export const addProjectAtom = () => {}
export const updateProjectAtom = () => {}
export const updateProjectsAtom = () => {}
export const deleteProjectAtom = () => {}
export const deleteProjectsAtom = () => {}
export const visibleProjectsAtom = () => {}
export const allProjectsAtom = () => {}
export const projectIdsAtom = () => {}
export const projectByIdAtom = () => {}
export const currentProjectAtom = () => {}
export const addProjectSectionAtom = () => {}
export const renameProjectSectionAtom = () => {}
export const setDefaultProjectSectionAtom = () => {}
export const reorderProjectSectionsAtom = () => {}
export const moveProjectSectionAtom = () => {}
export const addProjectSectionAtPositionAtom = () => {}
export const projectAtoms = () => {}

export const addTaskAtom = () => {}
export const updateTasksAtom = () => {}
export const updateTaskAtom = () => {}
export const deleteTasksAtom = () => {}
export const deleteTaskAtom = () => {}
export const toggleTaskAtom = () => {}
export const addCommentAtom = () => {}
export const bulkActionsAtom = () => {}
export const activeTasksAtom = () => {}
export const moveTaskAtom = () => {}
export const moveTaskBetweenSectionsAtom = () => {}
export const reorderTaskInViewAtom = () => {}
export const addTaskToViewAtom = () => {}
export const removeTaskFromViewAtom = () => {}
export const getTasksForViewAtom = () => {}
export const orderedTasksByProjectAtom = () => {}
export const orderedTasksBySectionAtom = () => {}
export const taskAtoms = () => {}

export const isValidProjectId = () => {}
export const isValidGroupId = () => {}
export const isStandardViewId = () => {}
export const editingProjectIdAtom = () => {}
export const startEditingProjectAtom = () => {}
export const stopEditingProjectAtom = () => {}
export const editingLabelIdAtom = () => {}
export const startEditingLabelAtom = () => {}
export const stopEditingLabelAtom = () => {}
export const editingSectionIdAtom = () => {}
export const startEditingSectionAtom = () => {}
export const stopEditingSectionAtom = () => {}
export const editingGroupIdAtom = () => {}
export const startEditingGroupAtom = () => {}
export const stopEditingGroupAtom = () => {}
export const pathnameAtom = () => {}
export const setPathnameAtom = () => {}
export const navigationAtoms = () => {}
