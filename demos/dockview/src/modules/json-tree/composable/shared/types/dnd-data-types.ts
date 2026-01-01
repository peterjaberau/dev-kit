import { ProjectGroup } from './data-types'

export interface GroupLocation {
  /** The group containing the item */
  group: ProjectGroup
  /** Index of the item within the group */
  index: number
}

export interface MoveResult {
  /** Updates to apply to groups */
  updates: Array<{
    groupId: string
    newItems: Array<string | ProjectGroup>
  }>
}
