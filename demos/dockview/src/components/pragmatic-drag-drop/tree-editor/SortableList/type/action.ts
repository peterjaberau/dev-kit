// Add a node

export interface AddItemAction {

  /**
   * Action type

   */
  type: 'addItem';

  /**
   * The new node

   */
  item: any;

  /**
   * The position of the new node

   * @default undefined

   */
  index?: number;

}

// Move a node

export interface MoveItemAction {

  /**
   * Action type

   */
  type: 'moveItem';

  /**
   * Current node index

   */
  activeIndex: number;

  /**
   * Target node index

   */
  overIndex: number;

}

// Remove a node

export interface RemoveItemAction {

  /**
   * Action type

   */
  type: 'removeItem';

  /**
   * The position of the node to be removed

   */
  index: number;

}

// Modify a node

export interface UpdateItemAction {

  /**
   * Action type

   */
  type: 'updateItem';

  /**
   * The position of the node to be modified

   */
  index: number;

  /**
   * The content of the modified node

   */
  item: any;

}
/**
 * Internal method for updating item data

 */
export type SortableListDispatchPayload =

  | MoveItemAction

  | AddItemAction

  | RemoveItemAction

  | UpdateItemAction;
