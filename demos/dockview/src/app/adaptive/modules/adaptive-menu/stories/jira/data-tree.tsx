
export const filterKey = Symbol('filter');
export const projectKey = Symbol("project")
export const topLevelItemKey = Symbol("top-level")

export const dataTree = [
  {
    id: "for-you",
    name: "For You",
    href: "#",
    icon: null,
    children: [],
  },
  {
    id: "recent",
    name: "Recent",
    href: "#",
    icon: null,
    children: [],
  },
  {
    id: "starred",
    name: "Starred",
    href: "#",
    icon: null,
    children: [],
  },
  {
    id: "projects",
    name: "Projects",
    href: "#",
    icon: null,
    isOpen: true,
    children: [
      {
        id: "projects-starred",
        name: "Starred",
        href: "#",
        icon: null,
        isOpen: true,
        children: [
          {
            id: "id:0",
            href: "#",
            name: "Modernize typography",
            icon: null,
          },
          {
            id: "id:1",
            href: "#",
            name: "F1 sponsorship",
            icon: null,
          },
          {
            id: "id:2",
            href: "#",
            name: "Mobile application",
            icon: null,
          },
        ],
      },
      {
        id: "projects-recent",
        name: "Recent",
        href: "#",
        icon: null,
        isOpen: true,
        children: [
          {
            id: "id:3",
            href: "#",
            name: "Attachments",
            icon: null,
          },
          {
            id: "id:4",
            href: "#",
            name: "Audit",
            icon: null,
          },
          {
            id: "id:5",
            href: "#",
            name: "Dark mode",
            icon: null,
          },
          {
            id: "id:6",
            href: "#",
            name: "Visualization",
            icon: null,
          },
          {
            id: "id:7",
            href: "#",
            name: "Basketball tournament",
            icon: null,
          },
        ],
      },
    ],
  },
  {
    id: "filters",
    name: "Filters",
    href: "#",
    icon: null,
    children: [
      {
        id: "id:8",
        name: "Filter 1",
        href: "#",
        icon: null,
        isOpen: true,
        children: [
          {
            id: "id:9",
            name: "Filter 1.1",
            href: "#",
            icon: null,
            children: [],
          },
          {
            id: "id:10",
            name: "Filter 1.2",
            href: "#",
            icon: null,
            children: [],
          },
          {
            id: "id:11",
            name: "Filter 1.3",
            href: "#",
            icon: null,
            children: [],
          },
        ],
      },
      {
        id: "id:12",
        name: "Filter 2",
        href: "#",
        icon: null,
        isOpen: true,
        children: [
          {
            id: "id:13",
            name: "Filter 2.1",
            href: "#",
            icon: null,
            isOpen: true,
            children: [
              {
                id: "id:14",
                name: "Filter 2.1.1",
                href: "#",
                icon: null,
                children: [],
              },
              {
                id: "id:15",
                name: "Filter 2.1.2",
                href: "#",
                icon: null,
                children: [],
              },
              {
                id: "id:16",
                name: "Filter 2.1.3",
                href: "#",
                icon: null,
                children: [],
              },
            ],
          },
          {
            id: "id:17",
            name: "Filter 2.2",
            href: "#",
            icon: null,
            children: [],
          },
        ],
      },
      {
        id: "id:18",
        name: "Filter 3",
        href: "#",
        icon: null,
        children: [],
      },
      {
        id: "id:19",
        name: "Filter 4",
        href: "#",
        icon: null,
        children: [],
      },
    ],
  },
]
export const dataHelpers: any = {
  topLevelSymbolKeys: {
    "for-your": {
      value: "for-you",
      [topLevelItemKey]: true,
    },
    recent: {
      value: "recent",
      [topLevelItemKey]: true,
    },
    starred: {
      value: "starred",
      [topLevelItemKey]: true,
    },
    projects: {
      value: "projects",
      [topLevelItemKey]: true,
    },
    filters: {
      value: "filters",
      [topLevelItemKey]: true,
    },
  },
}



export const getFilterData = ({filter}: any) => {
  return {
    id: filter.id,
    [filterKey]: true,
  };
}
export const isFilterData = (data: any) => {
  return data[filterKey] === true;
}


export const getProjectData = ({project, groupName}: any) => {
  return {
    id: project.id,
    groupName,
    [projectKey]: true,
  };
}
export const isProjectData = (data: any) => {
  return data[projectKey] === true
}


export const topLevelItems = ["for-you", "recent", "starred", "projects", "filters"]
export const getInitialData = () => {
  return {
    lastAction: null,
    topLevelItems: Array.from(topLevelItems),
    projects: {
      starred: [
        {
          id: "id:0",
          href: "#",
          name: "Modernize typography",
          icon: null,
        },
        {
          id: "id:1",
          href: "#",
          name: "F1 sponsorship",
          icon: null,
        },
        {
          id: "id:2",
          href: "#",
          name: "Mobile application",
          icon: null,
        },
      ],
      recent: [
        {
          id: "id:3",
          href: "#",
          name: "Attachments",
          icon: null,
        },
        {
          id: "id:4",
          href: "#",
          name: "Audit",
          icon: null,
        },
        {
          id: "id:5",
          href: "#",
          name: "Dark mode",
          icon: null,
        },
        {
          id: "id:6",
          href: "#",
          name: "Visualization",
          icon: null,
        },
        {
          id: "id:7",
          href: "#",
          name: "Basketball tournament",
          icon: null,
        },
      ],
    },
    filters: [
      {
        id: "id:8",
        name: "Filter 1",
        href: "#",
        icon: null,
        isOpen: true,
        children: [
          {
            id: "id:9",
            name: "Filter 1.1",
            href: "#",
            icon: null,
            children: [],
          },
          {
            id: "id:10",
            name: "Filter 1.2",
            href: "#",
            icon: null,
            children: [],
          },
          {
            id: "id:11",
            name: "Filter 1.3",
            href: "#",
            icon: null,
            children: [],
          },
        ],
      },
      {
        id: "id:12",
        name: "Filter 2",
        href: "#",
        icon: null,
        isOpen: true,
        children: [
          {
            id: "id:13",
            name: "Filter 2.1",
            href: "#",
            icon: null,
            isOpen: true,
            children: [
              {
                id: "id:14",
                name: "Filter 2.1.1",
                href: "#",
                icon: null,
                children: [],
              },
              {
                id: "id:15",
                name: "Filter 2.1.2",
                href: "#",
                icon: null,
                children: [],
              },
              {
                id: "id:16",
                name: "Filter 2.1.3",
                href: "#",
                icon: null,
                children: [],
              },
            ],
          },
          {
            id: "id:17",
            name: "Filter 2.2",
            href: "#",
            icon: null,
            children: [],
          },
        ],
      },
      {
        id: "id:18",
        name: "Filter 3",
        href: "#",
        icon: null,
        children: [],
      },
      {
        id: "id:19",
        name: "Filter 4",
        href: "#",
        icon: null,
        children: [],
      },
    ],
  }
}
export const getTopLevelItemData = (value: any) => {
  return {
    value,
    [topLevelItemKey]: true,
  }
}
export const isTopLevelItemData = (data: any) => {
  return data[topLevelItemKey] === true;
}

const topLevelMap: any = {
  "for-you": ({ index, amountOfMenuItems }: any) =>
    `render ForYouMenuItem - index='${index}  -  amountOfMenuItems${amountOfMenuItems}`,
  starred: ({ index, amountOfMenuItems }: any) =>
    `render StarredMenuItem - index='${index}  -  amountOfMenuItems${amountOfMenuItems}`,
  recent: ({ index, amountOfMenuItems }: any) =>
    `render RecentMenuItem - index='${index}  -  amountOfMenuItems${amountOfMenuItems}`,
  projects: ({ data, index, amountOfMenuItems }: any) =>
    `render ProjectsMenuItem - project=${data.projects} index='${index}  -  amountOfMenuItems${amountOfMenuItems}`,
  filters: ({ data, index, amountOfMenuItems }: any) =>
    `render FiltersMenuItem -   filters=${data.filters} index='${index}  -  amountOfMenuItems${amountOfMenuItems}`,
}

const _data = getInitialData()

const _renderTopLevel = () => {
  return _data.topLevelItems.map((item, index, array) => {
    return topLevelMap[item]({ data: _data, index, amountOfMenuItems: array.length })
  })
}




export const logData = () => {
  console.log("----logData-------", {
    getTopLevelItemData: {
      "for-your": getTopLevelItemData('for-you'),
      recent: getTopLevelItemData('recent'),
      starred: getTopLevelItemData('starred'),
      projects: getTopLevelItemData('projects'),
      filters: getTopLevelItemData('filters'),
    },

    data: getInitialData(),
    renderTopLevel: _renderTopLevel(),
  })
}


const logDataResult = {
  // getFilterData: getFilterData("filters"),
  getTopLevelItemData: {
    "for-your": {
      value: "for-you",
    },
    recent: {
      value: "recent",
    },
    starred: {
      value: "starred",
    },
    projects: {
      value: "projects",
    },
    filters: {
      value: "filters",
    },
  },
  data: {
    lastAction: null,
    topLevelItems: ["for-you", "recent", "starred", "projects", "filters"],
    projects: {
      starred: [
        {
          id: "id:0",
          href: "#",
          name: "Modernize typography",
          icon: null,
        },
        {
          id: "id:1",
          href: "#",
          name: "F1 sponsorship",
          icon: null,
        },
        {
          id: "id:2",
          href: "#",
          name: "Mobile application",
          icon: null,
        },
      ],
      recent: [
        {
          id: "id:3",
          href: "#",
          name: "Attachments",
          icon: null,
        },
        {
          id: "id:4",
          href: "#",
          name: "Audit",
          icon: null,
        },
        {
          id: "id:5",
          href: "#",
          name: "Dark mode",
          icon: null,
        },
        {
          id: "id:6",
          href: "#",
          name: "Visualization",
          icon: null,
        },
        {
          id: "id:7",
          href: "#",
          name: "Basketball tournament",
          icon: null,
        },
      ],
    },
    filters: [
      {
        id: "id:8",
        name: "Filter 1",
        href: "#",
        icon: null,
        isOpen: true,
        children: [
          {
            id: "id:9",
            name: "Filter 1.1",
            href: "#",
            icon: null,
            children: [],
          },
          {
            id: "id:10",
            name: "Filter 1.2",
            href: "#",
            icon: null,
            children: [],
          },
          {
            id: "id:11",
            name: "Filter 1.3",
            href: "#",
            icon: null,
            children: [],
          },
        ],
      },
      {
        id: "id:12",
        name: "Filter 2",
        href: "#",
        icon: null,
        isOpen: true,
        children: [
          {
            id: "id:13",
            name: "Filter 2.1",
            href: "#",
            icon: null,
            isOpen: true,
            children: [
              {
                id: "id:14",
                name: "Filter 2.1.1",
                href: "#",
                icon: null,
                children: [],
              },
              {
                id: "id:15",
                name: "Filter 2.1.2",
                href: "#",
                icon: null,
                children: [],
              },
              {
                id: "id:16",
                name: "Filter 2.1.3",
                href: "#",
                icon: null,
                children: [],
              },
            ],
          },
          {
            id: "id:17",
            name: "Filter 2.2",
            href: "#",
            icon: null,
            children: [],
          },
        ],
      },
      {
        id: "id:18",
        name: "Filter 3",
        href: "#",
        icon: null,
        children: [],
      },
      {
        id: "id:19",
        name: "Filter 4",
        href: "#",
        icon: null,
        children: [],
      },
    ],
  },
  renderTopLevel: [
    "render ForYouMenuItem - index='0  -  amountOfMenuItems5",
    "render RecentMenuItem - index='1  -  amountOfMenuItems5",
    "render StarredMenuItem - index='2  -  amountOfMenuItems5",
    "render ProjectsMenuItem - project=[object Object] index='3  -  amountOfMenuItems5",
    "render FiltersMenuItem -   filters=[object Object],[object Object],[object Object],[object Object] index='4  -  amountOfMenuItems5",
  ],
}