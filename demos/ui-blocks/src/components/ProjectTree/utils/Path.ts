import { sortObjectsByOrder } from "#utils";
import { join } from "lodash";

import { ProjectTreeNode, ProjectTreeRootNode } from "../types";

export const getPathWithoutName = async (node: any) => {
  const newSegments = node.path.segments.filter((segment: string) => segment !== node.name)

  return {
    segments: newSegments,
    raw: newSegments.length ? newSegments.join("/") : "",
  }
}

export const getPathWithoutParentPath = async (path: any, parentPath: any) => {
  const newSegments = path.segments.filter((segment: string) => !parentPath.segments.includes(segment))

  return {
    segments: newSegments,
    raw: newSegments.length ? newSegments.join("/") : "",
  }
}

export const removePathBeforeName = async (path: any, name: string) => {
  const nameIndex = path.segments.findIndex((segment: string) => segment === name)

  if (nameIndex === -1) {
    return {
      segments: path.segments,
      raw: path.raw,
    }
  }

  const newSegments = path.segments.slice(nameIndex)

  return {
    segments: newSegments,
    raw: newSegments.length ? newSegments.join("/") : "",
  }
}

export const prepareNestedDirResourcesForDrop = async (
  resources: any[]
): Promise<any[]> => {
  const rootResourceName = resources[0].name;

  const resourcesPreparedForDrop: any[] = [];

  for await (const resource of resources) {
    const newResourcePath = await removePathBeforeName(resource.path, rootResourceName);

    resourcesPreparedForDrop.push({
      ...resource,
      path: newResourcePath,
    });
  }

  const resourcesWithoutName = await Promise.all(
    resourcesPreparedForDrop.map(async (resource) => {
      const pathWithoutName = await getPathWithoutName(resource);

      return {
        ...resource,
        path: pathWithoutName,
      };
    })
  );

  return resourcesWithoutName;
};

export const prepareResourcesForCreation = async (
  resources: any[]
): Promise<any[]> => {
  const rootResourceName = resources[0].name;

  const resourcesPreparedForDrop: any[] = [];

  for await (const resource of resources) {
    const newResourcePath = await removePathBeforeName(resource.path, rootResourceName);

    resourcesPreparedForDrop.push({
      ...resource,
      path: newResourcePath,
    });
  }

  const resourcesWithoutName = await Promise.all(
    resourcesPreparedForDrop.map(async (resource) => {
      const pathWithoutName = await getPathWithoutName(resource);

      return {
        ...resource,
        path: pathWithoutName,
      };
    })
  );

  return resourcesWithoutName;
};

export const makeItemUpdatePayload = ({
  id,
  order,
  path,
}: {
  id: string;
  order?: number;
  path?: string;
}): any => ({
  ITEM: {
    id,
    ...(order !== undefined ? { order } : {}),
    ...(path !== undefined ? { path } : {}),
    queryParamsToAdd: [],
    queryParamsToUpdate: [],
    queryParamsToRemove: [],
    pathParamsToAdd: [],
    pathParamsToUpdate: [],
    pathParamsToRemove: [],
    headersToAdd: [],
    headersToUpdate: [],
    headersToRemove: [],
  },
});

export const makeDirUpdatePayload = ({
  id,
  order,
  path,
}: {
  id: string;
  order?: number;
  path?: string;
}): any => ({
  DIR: {
    id,
    ...(order !== undefined ? { order } : {}),
    ...(path !== undefined ? { path } : {}),
  },
});

export const siblingsAfterRemovalPayload = ({
  nodes,
  removedNode,
}: {
  nodes: ProjectTreeNode[];
  removedNode: ProjectTreeNode;
}) => {
  const sortedChildren = sortObjectsByOrder(nodes);
  return sortedChildren
    .filter((c: any) => c.id !== removedNode.id && c.order! > removedNode.order!)
    .map((resource: any) =>
      resource.kind === "Dir"
        ? makeDirUpdatePayload({ id: resource.id, order: resource.order! - 1 })
        : makeItemUpdatePayload({ id: resource.id, order: resource.order! - 1 }),
    )
};

export const reorderedNodesForSameDirPayload = ({
  nodes,
  movedId,
  moveToIndex,
}: {
  nodes: ProjectTreeNode[];
  movedId: string;
  moveToIndex: number;
}) => {
  const nodeToMove = nodes.find((n) => n.id === movedId);

  if (!nodeToMove) {
    console.error("Node to move not found", { movedId, nodes });
    return [];
  }

  const sortedParentNodes = sortObjectsByOrder(nodes);
  const updatedSourceNodesPayload = [
    ...sortedParentNodes.slice(0, moveToIndex).filter((resource: any) => resource.id !== nodeToMove.id),
    nodeToMove,
    ...sortedParentNodes.slice(moveToIndex).filter((resource: any) => resource.id !== nodeToMove.id),
  ]
    .map((resource, index) => ({
      ...resource,
      order: index + 1,
    }))
    .filter((resource) => {
      const nodeInLocation = nodes.find((n) => n.id === resource.id)
      return nodeInLocation?.order !== resource.order
    })
    .map((resource) => {
      if (resource.kind === "Dir") {
        return makeDirUpdatePayload({ id: resource.id, order: resource.order })
      } else {
        return makeItemUpdatePayload({ id: resource.id, order: resource.order })
      }
    })

  return updatedSourceNodesPayload;
};

export const reorderedNodesForDifferentDirPayload = ({
  node,
  newNode,
  moveToIndex,
}: {
  node: ProjectTreeNode | ProjectTreeRootNode;
  newNode: ProjectTreeNode;
  moveToIndex: number;
}) => {
  const sortedTargetNodes = sortObjectsByOrder(node.childNodes);

  const targetResourcesToUpdate = [
    ...sortedTargetNodes.slice(0, moveToIndex),
    newNode,
    ...sortedTargetNodes.slice(moveToIndex),
  ]
    .map((resource, index) => ({
      ...resource,
      order: index + 1,
    }))
    .filter((node) => {
      const nodeInLocation = node.childNodes.find((n: any) => n.id === node.id)
      return nodeInLocation?.order !== node.order;
    })
    .map((resource) => {
      const isAlreadyInLocation = node.childNodes.some((n) => n.id === resource.id);
      const newResourcePath = isAlreadyInLocation ? undefined : "path" in node ? node.path.raw : "";

      if (resource.kind === "Dir") {
        return makeDirUpdatePayload({
          id: resource.id,
          order: resource.order,
          path: newResourcePath,
        });
      } else {
        return makeItemUpdatePayload({
          id: resource.id,
          order: resource.order,
          path: newResourcePath,
        });
      }
    });

  return targetResourcesToUpdate;
};

export const resolveParentPath = (parentNode: ProjectTreeNode | ProjectTreeRootNode): string =>
  "path" in parentNode ? parentNode.path.raw : "";
