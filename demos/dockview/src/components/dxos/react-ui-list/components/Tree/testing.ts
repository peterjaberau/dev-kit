import { type Instruction } from '@atlaskit/pragmatic-drag-and-drop-hitbox/tree-item';

import { faker } from '@faker-js/faker';


export const createTree: any = (n = 4, d = 4) => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  icon:
    d === 3
      ? undefined
      : faker.helpers.arrayElement([
          'ph--planet--regular',
          'ph--sailboat--regular',
          'ph--house--regular',
          'ph--gear--regular',
        ]),
  items: d > 0 ? faker.helpers.multiple(() => createTree(n, d - 1), { count: n }) : [],
});

const removeItem = (tree: any, source: any) => {
  const parent = getTestItem(tree, source.path.slice(1, -1));
  const index = parent.items!.findIndex(({ id }: any) => id === source.id);
  const item = parent.items[index];
  parent.items!.splice(index, 1);
  return item;
};

const getTestItem = (tree: any, path: string[]) => {
  let item = tree;
  for (const part of path) {
    item = item.items!.find(({ id }: any) => id === part)!;
  }
  return item;
};

// TODO(wittjosiah): Reconcile with plugin-navtree/testing/vistor.
export const updateState = ({
  state,
  instruction,
  source,
  target,
}: any) => {
  switch (instruction.type) {
    case 'reorder-above': {
      const item = removeItem(state, source);
      const parent = getTestItem(state, target.path.slice(1, -1));
      const index = parent.items!.findIndex(({ id }: any) => id === target.id);
      parent.items!.splice(index, 0, item);
      break;
    }

    case 'reorder-below': {
      const item = removeItem(state, source);
      const parent = getTestItem(state, target.path.slice(1, -1));
      const index = parent.items!.findIndex(({ id }: any) => id === target.id);
      parent.items!.splice(index + 1, 0, item);
      break;
    }

    case 'make-child': {
      const item = removeItem(state, source);
      const parent = getTestItem(state, target.path.slice(1));
      parent.items!.push(item);
      break;
    }

    case 'instruction-blocked':
      break;

    default:
      console.log('Unsupported instruction', instruction);
      break;
  }
};
