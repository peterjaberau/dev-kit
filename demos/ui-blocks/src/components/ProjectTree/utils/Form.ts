

export const createResourceKind = ({
  name,
  path,
  isAddingFolder,
  class: resourceClass,
  order,
  protocol,
}: any) => {
  if (isAddingFolder) {
    return {
      DIR: {
        name,
        path,
        class: resourceClass,
        order,
      },
    };
  }

  return {
    ITEM: {
      name,
      path,
      class: resourceClass,
      order,
      headers: [],
      queryParams: [],
      pathParams: [],
      protocol,
    },
  };
};

export const convertResourceInfoToCreateInput = (resource: any, newProjectPath: string = ""): any => {
  if (resource.kind === "Dir") {
    return {
      DIR: {
        name: resource.name,
        path: newProjectPath,
        class: resource.class,
        order: resource.order ?? 0,
      },
    }
  } else {
    return {
      ITEM: {
        name: resource.name,
        path: newProjectPath,
        class: resource.class,
        order: resource.order ?? 0,
        protocol: resource.protocol ?? "Get",
        headers: [],
        queryParams: [],
        pathParams: [],
      },
    }
  }
}
