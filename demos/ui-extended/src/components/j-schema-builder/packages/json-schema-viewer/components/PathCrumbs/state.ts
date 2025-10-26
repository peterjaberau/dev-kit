"use client"

import { isRegularNode, isRootNode, SchemaNode } from '@stoplight/json-schema-tree';
import { atom } from 'jotai';

import { hoveredNodeAtom } from '../SchemaRow/state';

export const showPathCrumbsAtom = atom<boolean>(false);

export const pathCrumbsAtom = atom(get => {
  const node = get(hoveredNodeAtom);

  if (!node) return [];

  return propertyPathToObjectPath(node as SchemaNode);
});

function propertyPathToObjectPath(node: SchemaNode | any) {
  const objectPath: string[] = [];

  let currentNode: SchemaNode | null | any = node as any;
  while (currentNode && !isRootNode(currentNode)) {
    if (isRegularNode(currentNode)) {
      const pathPart = currentNode.subpath[currentNode.subpath.length - 1];

      if (currentNode.primaryType === 'array') {
        const key = `${pathPart || ''}[]`;
        if (objectPath[objectPath.length - 1]) {
          objectPath[objectPath.length - 1] = key;
        } else {
          objectPath.push(key);
        }
      } else if (
        pathPart &&
        //@ts-ignore
        (currentNode.subpath.length !== 2 || !['allOf', 'oneOf', 'anyOf'].includes(currentNode.subpath[0]))
      ) {
        //@ts-ignore
        objectPath.push(currentNode.subpath[currentNode.subpath.length - 1]);
      }
    }

    currentNode = currentNode.parent;
  }

  return objectPath.reverse();
}
